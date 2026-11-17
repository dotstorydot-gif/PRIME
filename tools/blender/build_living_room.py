"""
Prime Wooden Works - Living room showroom (architecture + styling + lighting).

Builds the room procedurally, bakes physically based lighting (Cycles path
tracing: direct + indirect / global illumination + colour) into per-object
lightmap textures, and exports a compressed GLB for the website.

Run headless:
  blender -b -P tools/blender/build_living_room.py -- --out public/experience/living-room.glb [--samples 256] [--res 2048]

Coordinates match the website scene: Blender (x, y, z) -> three.js (x, z, -y).
Product pieces are NOT part of this file; they are loaded separately so accurate
product models can be dropped in without re-baking the room.
"""
import bpy, bmesh, math, os, sys
from mathutils import Vector

argv = sys.argv[sys.argv.index("--") + 1:] if "--" in sys.argv else []
def arg(name, default):
    return argv[argv.index(name) + 1] if name in argv else default

OUT = os.path.abspath(arg("--out", "living-room.glb"))
SAMPLES = int(arg("--samples", "256"))
RES = int(arg("--res", "2048"))
PREVIEW = arg("--preview", "")  # optional path: also render a still from the entrance

# ---------------------------------------------------------------- dimensions (m)
X0, X1 = -3.6, 3.6          # side walls
YB, YF = 3.0, -4.0          # back wall (three z=-3), front wall (three z=4)
H = 2.95                    # slab ceiling
BAND_Z0, BAND_Z1 = 2.55, 2.75   # dropped ceiling band (cove sits on top)
BAND_W = 0.65
WALL_T = 0.15
WIN_Y0, WIN_Y1 = -1.5, 1.7  # window opening along right wall
WIN_Z0, WIN_Z1 = 0.3, 2.5

# ---------------------------------------------------------------- reset
bpy.ops.wm.read_factory_settings(use_empty=True)
scene = bpy.context.scene
scene.unit_settings.system = 'METRIC'

BAKE = []      # objects whose lighting is baked
EMISSIVE = []  # self-lit objects exported as-is

def link(obj):
    scene.collection.objects.link(obj)
    return obj

def box(name, size, loc, mat, bake=True, rot=(0, 0, 0), bevel=0.0):
    me = bpy.data.meshes.new(name)
    bm = bmesh.new()
    bmesh.ops.create_cube(bm, size=1.0)
    for v in bm.verts:
        v.co = Vector((v.co.x * size[0], v.co.y * size[1], v.co.z * size[2]))
    if bevel > 0:
        bmesh.ops.bevel(bm, geom=list(bm.edges), offset=bevel, segments=4, affect='EDGES', profile=0.5)
    bm.to_mesh(me); bm.free()
    ob = link(bpy.data.objects.new(name, me))
    ob.location = loc; ob.rotation_euler = rot
    ob.data.materials.append(mat)
    (BAKE if bake else EMISSIVE).append(ob)
    return ob

def plane(name, size, loc, mat, rot=(0, 0, 0), bake=True):
    me = bpy.data.meshes.new(name)
    sx, sy = size[0] / 2, size[1] / 2
    me.from_pydata([(-sx, -sy, 0), (sx, -sy, 0), (sx, sy, 0), (-sx, sy, 0)], [], [(0, 1, 2, 3)])
    ob = link(bpy.data.objects.new(name, me))
    ob.location = loc; ob.rotation_euler = rot
    ob.data.materials.append(mat)
    (BAKE if bake else EMISSIVE).append(ob)
    return ob

def cyl(name, r1, r2, h, loc, mat, verts=48, bake=True, rot=(0, 0, 0)):
    bpy.ops.mesh.primitive_cone_add(vertices=verts, radius1=r1, radius2=r2, depth=h, location=loc, rotation=rot)
    ob = bpy.context.active_object; ob.name = name
    ob.data.materials.append(mat)
    bpy.ops.object.shade_smooth()
    (BAKE if bake else EMISSIVE).append(ob)
    return ob

def lathe(name, profile, loc, mat, scale=1.0):
    bm = bmesh.new()
    prev = None
    for r, z in profile:
        v = bm.verts.new((r, 0, z))
        if prev: bm.edges.new((prev, v))
        prev = v
    bmesh.ops.spin(bm, geom=bm.verts[:] + bm.edges[:], angle=math.tau, steps=48, axis=(0, 0, 1), cent=(0, 0, 0))
    bmesh.ops.remove_doubles(bm, verts=bm.verts, dist=1e-4)
    me = bpy.data.meshes.new(name); bm.to_mesh(me); bm.free()
    ob = link(bpy.data.objects.new(name, me))
    ob.location = loc; ob.scale = (scale,) * 3
    ob.data.materials.append(mat)
    for p in ob.data.polygons: p.use_smooth = True
    BAKE.append(ob)
    return ob

# ---------------------------------------------------------------- materials
def principled(name, color, rough=0.5, metal=0.0):
    m = bpy.data.materials.new(name); m.use_nodes = True
    b = m.node_tree.nodes["Principled BSDF"]
    b.inputs["Base Color"].default_value = (*color, 1)
    b.inputs["Roughness"].default_value = rough
    b.inputs["Metallic"].default_value = metal
    return m, b, m.node_tree

def srgb(h):
    h = h.lstrip('#'); c = [int(h[i:i + 2], 16) / 255 for i in (0, 2, 4)]
    return tuple((x / 12.92) if x <= 0.04045 else ((x + 0.055) / 1.055) ** 2.4 for x in c)

def add_bump(nt, bsdf, height_socket, strength=0.15, distance=0.01):
    bump = nt.nodes.new("ShaderNodeBump")
    bump.inputs["Strength"].default_value = strength
    bump.inputs["Distance"].default_value = distance
    nt.links.new(height_socket, bump.inputs["Height"])
    nt.links.new(bump.outputs["Normal"], bsdf.inputs["Normal"])

def mat_plaster(name, hexcol):
    m, b, nt = principled(name, srgb(hexcol), 0.92)
    tc = nt.nodes.new("ShaderNodeTexCoord")
    n = nt.nodes.new("ShaderNodeTexNoise"); n.inputs["Scale"].default_value = 9; n.inputs["Detail"].default_value = 12
    nt.links.new(tc.outputs["Object"], n.inputs["Vector"])
    ramp = nt.nodes.new("ShaderNodeValToRGB")
    ramp.color_ramp.elements[0].color = (*[c * 0.94 for c in srgb(hexcol)], 1)
    ramp.color_ramp.elements[1].color = (*srgb(hexcol), 1)
    nt.links.new(n.outputs["Fac"], ramp.inputs["Fac"]); nt.links.new(ramp.outputs["Color"], b.inputs["Base Color"])
    add_bump(nt, b, n.outputs["Fac"], 0.05)
    return m

def mat_oak_floor():
    m, b, nt = principled("OakFloor", srgb("#C49A6C"), 0.38)
    tc = nt.nodes.new("ShaderNodeTexCoord")
    mp = nt.nodes.new("ShaderNodeMapping")
    nt.links.new(tc.outputs["Object"], mp.inputs["Vector"])
    # 19 cm wide, 1.8 m long planks laid along x, staggered joints
    brick = nt.nodes.new("ShaderNodeTexBrick")
    brick.inputs["Scale"].default_value = 1.0
    brick.inputs["Mortar Size"].default_value = 0.0015
    brick.inputs["Brick Width"].default_value = 1.8
    brick.inputs["Row Height"].default_value = 0.19
    brick.inputs["Bias"].default_value = 0.0
    brick.offset = 0.42
    brick.offset_frequency = 1
    brick.inputs["Color1"].default_value = (*srgb("#C9A173"), 1)
    brick.inputs["Color2"].default_value = (*srgb("#B4875A"), 1)
    brick.inputs["Mortar"].default_value = (*srgb("#6E4C2E"), 1)
    nt.links.new(mp.outputs["Vector"], brick.inputs["Vector"])
    # grain: stretched wave + noise along the plank length (x)
    mg = nt.nodes.new("ShaderNodeMapping"); mg.inputs["Scale"].default_value = (0.35, 22, 1)
    nt.links.new(tc.outputs["Object"], mg.inputs["Vector"])
    wave = nt.nodes.new("ShaderNodeTexWave"); wave.wave_type = 'BANDS'; wave.bands_direction = 'Y'
    wave.inputs["Scale"].default_value = 3; wave.inputs["Distortion"].default_value = 9; wave.inputs["Detail"].default_value = 6
    nt.links.new(mg.outputs["Vector"], wave.inputs["Vector"])
    mix = nt.nodes.new("ShaderNodeMix"); mix.data_type = 'RGBA'; mix.blend_type = 'MULTIPLY'
    mix.inputs["Factor"].default_value = 0.28
    nt.links.new(brick.outputs["Color"], mix.inputs["A"]); nt.links.new(wave.outputs["Color"], mix.inputs["B"])
    nt.links.new(mix.outputs["Result"], b.inputs["Base Color"])
    add_bump(nt, b, brick.outputs["Fac"], 0.25, 0.002)
    return m

def mat_travertine():
    m, b, nt = principled("Travertine", srgb("#DCCBB2"), 0.7)
    tc = nt.nodes.new("ShaderNodeTexCoord")
    mp = nt.nodes.new("ShaderNodeMapping"); mp.inputs["Scale"].default_value = (1.2, 1.2, 14)
    nt.links.new(tc.outputs["Object"], mp.inputs["Vector"])
    wave = nt.nodes.new("ShaderNodeTexWave"); wave.bands_direction = 'Z'
    wave.inputs["Scale"].default_value = 1.4; wave.inputs["Distortion"].default_value = 4; wave.inputs["Detail"].default_value = 8
    nt.links.new(mp.outputs["Vector"], wave.inputs["Vector"])
    ramp = nt.nodes.new("ShaderNodeValToRGB")
    ramp.color_ramp.elements[0].color = (*srgb("#C9B394"), 1)
    ramp.color_ramp.elements[1].color = (*srgb("#E6D8C3"), 1)
    nt.links.new(wave.outputs["Fac"], ramp.inputs["Fac"]); nt.links.new(ramp.outputs["Color"], b.inputs["Base Color"])
    add_bump(nt, b, wave.outputs["Fac"], 0.12)
    return m

def mat_fabric(name, hexcol, scale=180):
    m, b, nt = principled(name, srgb(hexcol), 1.0)
    b.inputs["Sheen Weight"].default_value = 0.4
    n = nt.nodes.new("ShaderNodeTexNoise"); n.inputs["Scale"].default_value = scale; n.inputs["Detail"].default_value = 4
    add_bump(nt, b, n.outputs["Fac"], 0.35, 0.004)
    return m

def mat_emit(name, hexcol, strength):
    m = bpy.data.materials.new(name); m.use_nodes = True
    nt = m.node_tree; nt.nodes.clear()
    e = nt.nodes.new("ShaderNodeEmission"); e.inputs["Color"].default_value = (*srgb(hexcol), 1); e.inputs["Strength"].default_value = strength
    o = nt.nodes.new("ShaderNodeOutputMaterial"); nt.links.new(e.outputs[0], o.inputs[0])
    return m

M = {
    "wall": mat_plaster("Plaster", "#EDE4D6"),
    "ceiling": mat_plaster("Ceiling", "#F6F1EA"),
    "floor": mat_oak_floor(),
    "trav": mat_travertine(),
    "skirt": principled("Skirting", srgb("#E9E0D2"), 0.5)[0],
    "steel": principled("Steel", srgb("#232323"), 0.35, 0.8)[0],
    "boucle": mat_fabric("Boucle", "#ECE5D8"),
    "linen_olive": mat_fabric("Olive", "#8C916E", 120),
    "linen_sand": mat_fabric("Sand", "#C2A983", 120),
    "rug": mat_fabric("Jute", "#D8C8AE", 60),
    "tv": principled("TV", srgb("#0A0A0B"), 0.08)[0],
    "ceramic": principled("Ceramic", srgb("#E2D9C9"), 0.75)[0],
    "ceramic2": principled("Ceramic2", srgb("#B9A381"), 0.7)[0],
    "book": principled("Books", srgb("#E7DFD2"), 0.85)[0],
    "frame": principled("ArtFrame", srgb("#C8A986"), 0.5)[0],
    "canvas": mat_plaster("Canvas", "#E9DDCB"),
    "led": mat_emit("CoveLED", "#FFD9A8", 18),
    "downlight": mat_emit("Downlight", "#FFF0DA", 30),
    "sky": mat_emit("Daylight", "#FFF3E0", 3.2),
}

# ---------------------------------------------------------------- architecture
W, D = X1 - X0, YB - YF
cx, cy = (X0 + X1) / 2, (YB + YF) / 2
plane("Floor", (W, D), (cx, cy, 0), M["floor"])
plane("Ceiling", (W, D), (cx, cy, H), M["ceiling"], rot=(math.pi, 0, 0))
box("WallBack", (W + 2 * WALL_T, WALL_T, H), (cx, YB + WALL_T / 2, H / 2), M["wall"])
box("WallFront", (W + 2 * WALL_T, WALL_T, H), (cx, YF - WALL_T / 2, H / 2), M["wall"])
box("WallLeft", (WALL_T, D, H), (X0 - WALL_T / 2, cy, H / 2), M["wall"])
# right wall around the window opening
rx = X1 + WALL_T / 2
box("WallRightBack", (WALL_T, YB - WIN_Y1, H), (rx, (YB + WIN_Y1) / 2, H / 2), M["wall"])
box("WallRightFront", (WALL_T, WIN_Y0 - YF, H), (rx, (WIN_Y0 + YF) / 2, H / 2), M["wall"])
box("WallRightSill", (WALL_T, WIN_Y1 - WIN_Y0, WIN_Z0), (rx, (WIN_Y0 + WIN_Y1) / 2, WIN_Z0 / 2), M["wall"])
box("WallRightHead", (WALL_T, WIN_Y1 - WIN_Y0, H - WIN_Z1), (rx, (WIN_Y0 + WIN_Y1) / 2, (WIN_Z1 + H) / 2), M["wall"])

# travertine feature wall behind the TV unit (back wall, centre)
box("FeatureWall", (3.4, 0.04, BAND_Z0), (0, YB - 0.02, BAND_Z0 / 2), M["trav"])

# dropped ceiling band with hidden cove LED
bt = BAND_Z1 - BAND_Z0
box("BandBack", (W, BAND_W, bt), (cx, YB - BAND_W / 2, (BAND_Z0 + BAND_Z1) / 2), M["ceiling"])
box("BandFront", (W, BAND_W, bt), (cx, YF + BAND_W / 2, (BAND_Z0 + BAND_Z1) / 2), M["ceiling"])
box("BandLeft", (BAND_W, D - 2 * BAND_W, bt), (X0 + BAND_W / 2, cy, (BAND_Z0 + BAND_Z1) / 2), M["ceiling"])
box("BandRight", (BAND_W, D - 2 * BAND_W, bt), (X1 - BAND_W / 2, cy, (BAND_Z0 + BAND_Z1) / 2), M["ceiling"])
ix0, ix1, iy0, iy1 = X0 + BAND_W, X1 - BAND_W, YF + BAND_W, YB - BAND_W
z_led = BAND_Z1 + 0.012
box("CoveB", (ix1 - ix0, 0.03, 0.02), (cx, iy1 + 0.06, z_led), M["led"], bake=False)
box("CoveF", (ix1 - ix0, 0.03, 0.02), (cx, iy0 - 0.06, z_led), M["led"], bake=False)
box("CoveL", (0.03, iy1 - iy0, 0.02), (ix0 - 0.06, cy, z_led), M["led"], bake=False)
box("CoveR", (0.03, iy1 - iy0, 0.02), (ix1 + 0.06, cy, z_led), M["led"], bake=False)

# skirting
box("SkirtBack", (W, 0.015, 0.09), (cx, YB - 0.0075 - 0.04, 0.045), M["skirt"])
box("SkirtLeft", (0.015, D, 0.09), (X0 + 0.0075, cy, 0.045), M["skirt"])

# steel window frame
wy, wz = (WIN_Y0 + WIN_Y1) / 2, (WIN_Z0 + WIN_Z1) / 2
for y in (WIN_Y0, wy, WIN_Y1):
    box(f"Mullion{y:.2f}", (0.06, 0.05, WIN_Z1 - WIN_Z0), (X1 + 0.03, y, wz), M["steel"])
for z in (WIN_Z0, 1.75, WIN_Z1):
    box(f"Transom{z:.2f}", (0.06, WIN_Y1 - WIN_Y0, 0.05), (X1 + 0.03, wy, z), M["steel"])
backdrop = plane("DaylightBackdrop", (9, 6), (X1 + 3.0, wy, 1.5), M["sky"], rot=(0, -math.pi / 2, 0), bake=False)
backdrop.visible_shadow = False  # let the sun stream through the window

# ---------------------------------------------------------------- downlights (flush in band) + spot lights
def downlight(x, y, power=70, angle=58):
    cyl(f"DL_{x:.1f}_{y:.1f}", 0.045, 0.045, 0.005, (x, y, BAND_Z0 - 0.003), M["downlight"], verts=24, bake=False)
    ld = bpy.data.lights.new(f"Spot_{x:.1f}_{y:.1f}", 'SPOT')
    ld.energy = power; ld.spot_size = math.radians(angle); ld.spot_blend = 0.55
    ld.color = (1.0, 0.86, 0.68); ld.shadow_soft_size = 0.04
    lo = link(bpy.data.objects.new(ld.name, ld)); lo.location = (x, y, BAND_Z0 - 0.02)

for x in (-2.4, -0.8, 0.8, 2.4):
    downlight(x, YB - 0.35)          # wall-wash on the back wall / feature wall
for y in (1.6, 0.0, -1.6, -3.0):
    downlight(X0 + 0.35, y)          # wall-wash on the left wall (sideboard + art)
for x in (-2.4, 2.4):
    downlight(x, YF + 0.35, 40)

# ---------------------------------------------------------------- daylight
sun_d = bpy.data.lights.new("Sun", 'SUN')
sun_d.energy = 5.0; sun_d.angle = math.radians(1.2); sun_d.color = (1.0, 0.88, 0.72)
sun = link(bpy.data.objects.new("Sun", sun_d))
sun.rotation_euler = Vector((-1.0, -0.25, -0.62)).to_track_quat('-Z', 'Y').to_euler()

win_d = bpy.data.lights.new("WindowFill", 'AREA')
win_d.shape = 'RECTANGLE'; win_d.size = WIN_Y1 - WIN_Y0; win_d.size_y = WIN_Z1 - WIN_Z0
win_d.energy = 420; win_d.color = (1.0, 0.95, 0.88)
win = link(bpy.data.objects.new("WindowFill", win_d))
win.location = (X1 + 0.05, wy, wz); win.rotation_euler = (0, -math.pi / 2, 0)

world = bpy.data.worlds.new("World"); scene.world = world; world.use_nodes = True
bg = world.node_tree.nodes["Background"]; bg.inputs["Color"].default_value = (*srgb("#F2E8DA"), 1); bg.inputs["Strength"].default_value = 0.35

# ---------------------------------------------------------------- styling (not Prime products; never interactive)
# rug
box("Rug", (3.3, 2.6, 0.012), (0, -0.55, 0.006), M["rug"])
# sofa (three z=1.78 -> y=-1.78), facing +y toward the TV wall
sy = -1.78
box("SofaBase", (2.5, 0.98, 0.3), (0, sy, 0.25), M["boucle"], bevel=0.06)
box("SofaSeatL", (1.18, 0.8, 0.16), (-0.6, sy + 0.05, 0.47), M["boucle"], bevel=0.06)
box("SofaSeatR", (1.18, 0.8, 0.16), (0.6, sy + 0.05, 0.47), M["boucle"], bevel=0.06)
box("SofaBack", (2.5, 0.24, 0.48), (0, sy - 0.37, 0.62), M["boucle"], bevel=0.08)
box("SofaArmL", (0.22, 0.98, 0.38), (-1.2, sy, 0.5), M["boucle"], bevel=0.08)
box("SofaArmR", (0.22, 0.98, 0.38), (1.2, sy, 0.5), M["boucle"], bevel=0.08)
box("CushionA", (0.5, 0.14, 0.42), (-0.85, sy - 0.2, 0.74), M["linen_sand"], rot=(0.2, 0.05, 0.15), bevel=0.05)
box("CushionB", (0.48, 0.14, 0.4), (0.9, sy - 0.2, 0.74), M["linen_olive"], rot=(0.2, -0.04, -0.2), bevel=0.05)
# wall TV above the TV unit
box("TV", (1.6, 0.035, 0.92), (0, YB - 0.06, 1.5), M["tv"])
# artwork on the left wall above the sideboard (three z=-0.4 -> y=0.4)
box("ArtFrame", (0.04, 0.95, 1.18), (X0 + 0.03, 0.4, 1.68), M["frame"])
box("ArtCanvas", (0.01, 0.85, 1.08), (X0 + 0.055, 0.4, 1.68), M["canvas"])
# ceramics
vase = [(0.0, 0.0), (0.05, 0.0), (0.085, 0.06), (0.09, 0.12), (0.07, 0.2), (0.03, 0.24), (0.035, 0.26)]
lathe("VaseTV", vase, (-0.72, 2.82, 0.70), M["ceramic"])
lathe("VaseTable", vase, (-0.15, -0.15, 0.42), M["ceramic2"], 0.6)
lathe("VaseSideboard", vase, (-3.32, 0.95, 0.75), M["ceramic"], 0.9)
box("CoffeeBooks", (0.3, 0.22, 0.04), (0.18, 0.0, 0.44), M["book"])

# ---------------------------------------------------------------- render settings
scene.render.engine = 'CYCLES'
cyc = scene.cycles
try:
    prefs = bpy.context.preferences.addons["cycles"].preferences
    for backend in ("OPTIX", "CUDA", "HIP", "ONEAPI", "METAL"):
        try:
            prefs.compute_device_type = backend
            prefs.get_devices()
            if any(d.type != 'CPU' for d in prefs.devices):
                for d in prefs.devices: d.use = True
                cyc.device = 'GPU'
                print(f"[prime] using GPU backend {backend}")
                break
        except Exception:
            continue
except Exception as e:
    print("[prime] GPU setup skipped:", e)
cyc.samples = SAMPLES
cyc.use_denoising = True
cyc.max_bounces = 8; cyc.diffuse_bounces = 5
scene.view_settings.view_transform = 'AgX'
scene.view_settings.look = 'AgX - Medium High Contrast'

# ---------------------------------------------------------------- optional preview still
if PREVIEW:
    cam_d = bpy.data.cameras.new("Cam"); cam_d.lens = 22
    cam = link(bpy.data.objects.new("Cam", cam_d))
    cam.location = (-1.25, -3.8, 1.72)
    cam.rotation_euler = (Vector((0.5, 1.4, 0.75)) - cam.location).to_track_quat('-Z', 'Y').to_euler()
    scene.camera = cam
    scene.render.resolution_x, scene.render.resolution_y = 1600, 1000
    scene.render.filepath = os.path.abspath(PREVIEW)
    bpy.ops.render.render(write_still=True)
    print("[prime] preview written", PREVIEW)

# ---------------------------------------------------------------- bake lighting into textures
scene.render.bake.use_pass_direct = True
scene.render.bake.use_pass_indirect = True
scene.render.bake.use_pass_color = True
scene.render.bake.margin = 8
cyc.bake_type = 'DIFFUSE'

def area(ob):
    return sum(p.area for p in ob.data.polygons) * max(ob.scale) ** 2

tex_dir = os.path.join(os.path.dirname(OUT), "_bake")
os.makedirs(tex_dir, exist_ok=True)

for ob in BAKE:
    # unique material per object so each can have its own bake target
    ob.data.materials[0] = ob.data.materials[0].copy()
    bpy.ops.object.select_all(action='DESELECT')
    bpy.context.view_layer.objects.active = ob; ob.select_set(True)
    bpy.ops.object.mode_set(mode='EDIT'); bpy.ops.mesh.select_all(action='SELECT')
    bpy.ops.uv.smart_project(angle_limit=math.radians(66), island_margin=0.01)
    bpy.ops.object.mode_set(mode='OBJECT')
    a = area(ob)
    size = RES if a > 6 else RES // 2 if a > 1.5 else RES // 4 if a > 0.3 else 256
    img = bpy.data.images.new(f"bake_{ob.name}", size, size)
    nt = ob.data.materials[0].node_tree
    node = nt.nodes.new("ShaderNodeTexImage"); node.image = img
    nt.nodes.active = node
    print(f"[prime] baking {ob.name} @ {size}px")
    bpy.ops.object.bake(type='DIFFUSE')
    img.filepath_raw = os.path.join(tex_dir, f"{ob.name}.png"); img.file_format = 'PNG'; img.save()
    # swap the shader for the baked result (website renders it unlit)
    for n in list(nt.nodes):
        if n not in (node,) and n.type != 'OUTPUT_MATERIAL':
            nt.nodes.remove(n)
    out = next(n for n in nt.nodes if n.type == 'OUTPUT_MATERIAL')
    bsdf = nt.nodes.new("ShaderNodeBsdfPrincipled")
    nt.links.new(node.outputs["Color"], bsdf.inputs["Base Color"])
    nt.links.new(bsdf.outputs[0], out.inputs[0])
    ob.data.materials[0].name = "BAKED_" + ob.name

# emissive objects: export emission colour as base colour, flagged by name
for ob in EMISSIVE:
    m = ob.data.materials[0]
    if not m.name.startswith("EMIT_"):
        e = next((n for n in m.node_tree.nodes if n.type == 'EMISSION'), None)
        col = e.inputs["Color"].default_value[:] if e else (1, 1, 1, 1)
        m.node_tree.nodes.clear()
        bsdf = m.node_tree.nodes.new("ShaderNodeBsdfPrincipled")
        out = m.node_tree.nodes.new("ShaderNodeOutputMaterial")
        bsdf.inputs["Base Color"].default_value = col
        m.node_tree.links.new(bsdf.outputs[0], out.inputs[0])
        m.name = "EMIT_" + m.name

# ---------------------------------------------------------------- export
bpy.ops.object.select_all(action='DESELECT')
for ob in BAKE + EMISSIVE: ob.select_set(True)
bpy.ops.export_scene.gltf(
    filepath=OUT, export_format='GLB', use_selection=True, export_apply=True,
    export_image_format='JPEG', export_image_quality=88,
    export_draco_mesh_compression_enable=True, export_lights=False, export_cameras=False,
)
print("[prime] exported", OUT)
