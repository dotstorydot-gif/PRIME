"""
Prime Wooden Works - one connected showroom house: living room -> dining room -> bedroom -> closets,
joined by doorways (architecture + styling + lighting).

Builds the room procedurally, bakes physically based lighting (Cycles path
tracing: direct + indirect / global illumination + colour) into per-object
lightmap textures, and exports a compressed GLB for the website.

Run headless:
  blender -b -P tools/blender/build_house.py -- --out public/experience/house.glb [--samples 256] [--res 2048]

Coordinates match the website scene: Blender (x, y, z) -> three.js (x, z, -y).
Product pieces are NOT part of this file; they are loaded separately so accurate
product models can be dropped in without re-baking the room.
"""
import bpy, bmesh, math, os, sys
from mathutils import Vector, Euler

argv = sys.argv[sys.argv.index("--") + 1:] if "--" in sys.argv else []
def arg(name, default):
    return argv[argv.index(name) + 1] if name in argv else default

OUT = os.path.abspath(arg("--out", "house.glb"))
TEX_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "_bake", "house")
os.makedirs(TEX_DIR, exist_ok=True)
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
    uv = me.uv_layers.new(name="UVMap")
    for i, c in enumerate([(0, 0), (1, 0), (1, 1), (0, 1)]): uv.data[i].uv = c
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

ASSETS = os.path.join(os.path.dirname(os.path.abspath(__file__)), "assets")

def mat_pbr(name, short, tile_m, tint=None, tint_amt=0.0, bump=0.2, rot90=False, sheen=0.0):
    """Photo-scanned PBR material (Poly Haven, CC0), box-projected at real-world scale."""
    m, b, nt = principled(name, (1, 1, 1), 0.5)
    tc = nt.nodes.new("ShaderNodeTexCoord")
    mp = nt.nodes.new("ShaderNodeMapping")
    mp.inputs["Scale"].default_value = (1 / tile_m,) * 3
    if rot90:
        mp.inputs["Rotation"].default_value = (0, math.pi / 2, math.pi / 2)
    nt.links.new(tc.outputs["Object"], mp.inputs["Vector"])

    def img(kind, colour):
        n = nt.nodes.new("ShaderNodeTexImage")
        n.image = bpy.data.images.load(os.path.join(ASSETS, f"{short}_{kind}.jpg"), check_existing=True)
        n.image.colorspace_settings.name = 'sRGB' if colour else 'Non-Color'
        n.projection = 'BOX'; n.projection_blend = 0.25
        nt.links.new(mp.outputs["Vector"], n.inputs["Vector"])
        return n

    diff, rough = img("diff", True), img("rough", False)
    col = diff.outputs["Color"]
    if tint:
        # keep the scanned surface detail (luminance) but set the interior's colour palette
        grey = nt.nodes.new("ShaderNodeHueSaturation"); grey.inputs["Saturation"].default_value = 0.0
        nt.links.new(col, grey.inputs["Color"])
        mix = nt.nodes.new("ShaderNodeMix"); mix.data_type = 'RGBA'; mix.blend_type = 'SOFT_LIGHT'
        mix.inputs["Factor"].default_value = tint_amt
        mix.inputs["A"].default_value = (*srgb(tint), 1)
        nt.links.new(grey.outputs["Color"], mix.inputs["B"])
        col = mix.outputs["Result"]
    nt.links.new(col, b.inputs["Base Color"])
    nt.links.new(rough.outputs["Color"], b.inputs["Roughness"])
    if sheen: b.inputs["Sheen Weight"].default_value = sheen
    add_bump(nt, b, rough.outputs["Color"], bump, 0.003)
    return m

M = {
    "wall": mat_pbr("Plaster", "plaster", 2.2, "#EFE4D4", 0.5, bump=0.12),
    "ceiling": mat_pbr("Ceiling", "plaster", 2.2, "#F7F2EA", 0.3, bump=0.06),
    "floor": mat_pbr("OakFloor", "floor", 2.4, bump=0.15),
    "trav": mat_pbr("OakPanel", "oakpanel", 1.6, bump=0.1),
    "skirt": principled("Skirting", srgb("#E9E0D2"), 0.5)[0],
    "steel": principled("Steel", srgb("#232323"), 0.35, 0.8)[0],
    "boucle": mat_pbr("Boucle", "boucle", 0.45, "#EDE5D7", 0.6, bump=0.4, sheen=0.4),
    "linen_olive": mat_pbr("Olive", "linen", 0.35, "#86906A", 0.6, bump=0.3, sheen=0.3),
    "linen_sand": mat_pbr("Sand", "linen", 0.35, "#C4A57F", 0.6, bump=0.3, sheen=0.3),
    "grasscloth": mat_pbr("Grasscloth", "linen", 0.5, "#D9CBB4", 0.75, bump=0.35),
    "walnut": mat_pbr("Walnut", "oakpanel", 1.0, "#5A3A26", 0.85, bump=0.08),
    "chairfab": mat_pbr("ChairFabric", "linen", 0.3, "#D4C29E", 0.65, bump=0.3, sheen=0.3),
    "brass": principled("Brass", srgb("#C9A55C"), 0.3, 1.0)[0],
    "shade": principled("Shade", srgb("#EDE2CF"), 0.9)[0],
    "pendantglow": mat_emit("PendantGlow", "#FFE2B8", 12),
    "curtain": mat_pbr("Curtain", "linen", 0.4, "#F1EADF", 0.7, bump=0.2, sheen=0.3),
    "rug": mat_pbr("Jute", "linen", 0.6, "#B9A384", 0.8, bump=0.5),
    "tv": principled("TV", srgb("#0A0A0B"), 0.08)[0],
    "ceramic": principled("Ceramic", srgb("#E2D9C9"), 0.75)[0],
    "ceramic2": principled("Ceramic2", srgb("#B9A381"), 0.7)[0],
    "book": principled("Books", srgb("#E7DFD2"), 0.85)[0],
    "frame": principled("ArtFrame", srgb("#C8A986"), 0.5)[0],
    "canvas": mat_plaster("Canvas", "#E9DDCB"),
    "led": mat_emit("CoveLED", "#FFD9A8", 18),
    "downlight": mat_emit("Downlight", "#FFF0DA", 30),
    "sky": mat_emit("Daylight", "#FFFFFF", 1.0),
}

# ---------------------------------------------------------------- architecture
# One continuous house. Every room is built in its own local frame (the same
# 7.2 x 7 m shell the single rooms used) and then shifted along +y (= deeper
# into the house; three.js -z). Rooms share their partition walls; each
# partition has a walnut-cased doorway on the left so the walk is continuous.
DOOR_X0, DOOR_X1, DOOR_H = -3.3, -2.1, 2.3
ROOM_PITCH = (YB - YF) + WALL_T          # 7.15 m from one room's frame to the next
W, D = X1 - X0, YB - YF
cx, cy = (X0 + X1) / 2, (YB + YF) / 2
wy, wz = (WIN_Y0 + WIN_Y1) / 2, (WIN_Z0 + WIN_Z1) / 2
BACKDROPS = []

def doorway_wall(name, y):
    """Partition wall at local y with a cased doorway between DOOR_X0..DOOR_X1."""
    xa, xb = X0 - WALL_T, X1 + WALL_T
    box(f"{name}L", (DOOR_X0 - xa, WALL_T, H), ((xa + DOOR_X0) / 2, y, H / 2), M["wall"])
    box(f"{name}R", (xb - DOOR_X1, WALL_T, H), ((DOOR_X1 + xb) / 2, y, H / 2), M["wall"])
    dw, dc = DOOR_X1 - DOOR_X0, (DOOR_X0 + DOOR_X1) / 2
    box(f"{name}Head", (dw, WALL_T, H - DOOR_H), (dc, y, (DOOR_H + H) / 2), M["wall"])
    # walnut lining in the reveal + architraves on both faces
    lt = WALL_T + 0.03
    box(f"{name}JambL", (0.025, lt, DOOR_H), (DOOR_X0 + 0.0125, y, DOOR_H / 2), M["walnut"])
    box(f"{name}JambR", (0.025, lt, DOOR_H), (DOOR_X1 - 0.0125, y, DOOR_H / 2), M["walnut"])
    box(f"{name}JambT", (dw, lt, 0.025), (dc, y, DOOR_H - 0.0125), M["walnut"])
    for s in (-1, 1):
        fy = y + s * (WALL_T / 2 + 0.01)
        box(f"{name}Arch{s}L", (0.07, 0.02, DOOR_H + 0.07), (DOOR_X0 - 0.035, fy, (DOOR_H + 0.07) / 2), M["walnut"])
        box(f"{name}Arch{s}R", (0.07, 0.02, DOOR_H + 0.07), (DOOR_X1 + 0.035, fy, (DOOR_H + 0.07) / 2), M["walnut"])
        box(f"{name}Arch{s}T", (dw + 0.14, 0.02, 0.07), (dc, fy, DOOR_H + 0.035), M["walnut"])
    box(f"{name}Threshold", (dw, WALL_T, 0.008), (dc, y, 0.004), M["floor"])


def downlight(x, y, power=70, angle=58):
    cyl(f"DL_{x:.1f}_{y:.1f}", 0.045, 0.045, 0.005, (x, y, BAND_Z0 - 0.003), M["downlight"], verts=24, bake=False)
    ld = bpy.data.lights.new(f"Spot_{x:.1f}_{y:.1f}", 'SPOT')
    ld.energy = power; ld.spot_size = math.radians(angle); ld.spot_blend = 0.55
    ld.color = (1.0, 0.86, 0.68); ld.shadow_soft_size = 0.04
    lo = link(bpy.data.objects.new(ld.name, ld)); lo.location = (x, y, BAND_Z0 - 0.02)


def shell(kind, front_wall, back_door):
    plane(f"Floor_{kind}", (W, D), (cx, cy, 0), M["floor"])
    plane(f"Ceiling_{kind}", (W, D), (cx, cy, H), M["ceiling"], rot=(math.pi, 0, 0))
    if back_door:
        doorway_wall(f"Partition_{kind}", YB + WALL_T / 2)
    else:
        box("WallBack", (W + 2 * WALL_T, WALL_T, H), (cx, YB + WALL_T / 2, H / 2), M["wall"])
    if front_wall:  # only the first room; later rooms use the previous room's partition
        box("WallFront", (W + 2 * WALL_T, WALL_T, H), (cx, YF - WALL_T / 2, H / 2), M["wall"])
    box("WallLeft", (WALL_T, D, H), (X0 - WALL_T / 2, cy, H / 2), M["wall"])
    rx = X1 + WALL_T / 2
    box("WallRightBack", (WALL_T, YB - WIN_Y1, H), (rx, (YB + WIN_Y1) / 2, H / 2), M["wall"])
    box("WallRightFront", (WALL_T, WIN_Y0 - YF, H), (rx, (WIN_Y0 + YF) / 2, H / 2), M["wall"])
    box("WallRightSill", (WALL_T, WIN_Y1 - WIN_Y0, WIN_Z0), (rx, wy, WIN_Z0 / 2), M["wall"])
    box("WallRightHead", (WALL_T, WIN_Y1 - WIN_Y0, H - WIN_Z1), (rx, wy, (WIN_Z1 + H) / 2), M["wall"])

    if kind == "living":
        box("FeatureWall", (3.4, 0.04, BAND_Z0), (0, YB - 0.02, BAND_Z0 / 2), M["trav"])
    elif kind == "dining":
        box("FeatureWall", (3.6, 0.03, BAND_Z0), (0, YB - 0.015, BAND_Z0 / 2), M["grasscloth"])
    elif kind == "bedroom":  # oak-panelled headboard wall
        box("FeatureWall", (3.6, 0.04, BAND_Z0), (0, YB - 0.02, BAND_Z0 / 2), M["trav"])
    # closets: the Prime wardrobes (live models) line the walls, so the walls stay plain

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

    # skirting (split around the doorway)
    if back_door:
        box("SkirtBackL", (DOOR_X0 - X0 - 0.07, 0.015, 0.09), ((X0 + DOOR_X0 - 0.07) / 2, YB - 0.0075, 0.045), M["skirt"])
        box("SkirtBackR", (X1 - DOOR_X1 - 0.07, 0.015, 0.09), ((DOOR_X1 + 0.07 + X1) / 2, YB - 0.0075, 0.045), M["skirt"])
    else:
        box("SkirtBack", (W, 0.015, 0.09), (cx, YB - 0.0075, 0.045), M["skirt"])
    box("SkirtLeft", (0.015, D, 0.09), (X0 + 0.0075, cy, 0.045), M["skirt"])

    # steel window frame + daylight backdrop (the window view)
    for y in (WIN_Y0, wy, WIN_Y1):
        box(f"Mullion{y:.2f}", (0.06, 0.05, WIN_Z1 - WIN_Z0), (X1 + 0.03, y, wz), M["steel"])
    for z in (WIN_Z0, 1.75, WIN_Z1):
        box(f"Transom{z:.2f}", (0.06, WIN_Y1 - WIN_Y0, 0.05), (X1 + 0.03, wy, z), M["steel"])
    bd = plane(f"DaylightBackdrop_{kind}", (6, ROOM_PITCH), (X1 + 3.0, cy, 1.5), M["sky"], rot=(0, -math.pi / 2, 0), bake=False)
    bd.visible_shadow = False
    BACKDROPS.append(bd)
    win_d = bpy.data.lights.new(f"WindowFill_{kind}", 'AREA')
    win_d.shape = 'RECTANGLE'; win_d.size = WIN_Y1 - WIN_Y0; win_d.size_y = WIN_Z1 - WIN_Z0
    win_d.energy = 420; win_d.color = (1.0, 0.95, 0.88)
    win = link(bpy.data.objects.new(win_d.name, win_d))
    win.location = (X1 + 0.05, wy, wz); win.rotation_euler = (0, -math.pi / 2, 0)

    # downlights
    for x in (-2.4, -0.8, 0.8, 2.4):
        if back_door and x < DOOR_X1:
            continue
        downlight(x, YB - 0.35)
    for y in (1.6, 0.0, -1.6, -3.0):
        downlight(X0 + 0.35, y)
    for x in (-2.4, 2.4):
        downlight(x, YF + 0.35, 40)


# ---------------------------------------------------------------- styling (not Prime products; never interactive)
VASE = [(0.0, 0.0), (0.05, 0.0), (0.085, 0.06), (0.09, 0.12), (0.07, 0.2), (0.03, 0.24), (0.035, 0.26)]

def living_styling():
    box("Rug", (3.3, 2.6, 0.012), (0, -0.55, 0.006), M["rug"])
    sy = -1.78
    box("SofaBase", (2.5, 0.98, 0.3), (0, sy, 0.25), M["boucle"], bevel=0.06)
    box("SofaSeatL", (1.18, 0.8, 0.16), (-0.6, sy + 0.05, 0.47), M["boucle"], bevel=0.06)
    box("SofaSeatR", (1.18, 0.8, 0.16), (0.6, sy + 0.05, 0.47), M["boucle"], bevel=0.06)
    box("SofaBack", (2.5, 0.24, 0.48), (0, sy - 0.37, 0.62), M["boucle"], bevel=0.08)
    box("SofaArmL", (0.22, 0.98, 0.38), (-1.2, sy, 0.5), M["boucle"], bevel=0.08)
    box("SofaArmR", (0.22, 0.98, 0.38), (1.2, sy, 0.5), M["boucle"], bevel=0.08)
    box("CushionA", (0.5, 0.14, 0.42), (-0.85, sy - 0.2, 0.74), M["linen_sand"], rot=(0.2, 0.05, 0.15), bevel=0.05)
    box("CushionB", (0.48, 0.14, 0.4), (0.9, sy - 0.2, 0.74), M["linen_olive"], rot=(0.2, -0.04, -0.2), bevel=0.05)
    box("TV", (1.6, 0.035, 0.92), (0, YB - 0.06, 1.5), M["tv"])
    box("ArtFrame", (0.04, 0.95, 1.18), (X0 + 0.03, 0.4, 1.68), M["frame"])
    box("ArtCanvas", (0.01, 0.85, 1.08), (X0 + 0.055, 0.4, 1.68), M["canvas"])
    lathe("VaseTV", VASE, (-0.72, 2.82, 0.70), M["ceramic"])
    lathe("VaseTable", VASE, (-0.15, -0.15, 0.42), M["ceramic2"], 0.6)
    lathe("VaseSideboard", VASE, (-3.32, 0.95, 0.75), M["ceramic"], 0.9)
    box("CoffeeBooks", (0.3, 0.22, 0.04), (0.18, 0.0, 0.44), M["book"])


def dining_styling():
    box("Rug", (3.6, 2.6, 0.012), (0, 0.3, 0.006), M["rug"])
    # oval-back upholstered dining chairs (staging only; Prime's catalogue has no chairs)
    def torus(name, major, minor, loc, rot, scale, mat):
        bpy.ops.mesh.primitive_torus_add(major_radius=major, minor_radius=minor, major_segments=64, minor_segments=16,
                                         location=loc, rotation=rot)
        ob = bpy.context.active_object; ob.name = name; ob.scale = scale
        bpy.ops.object.transform_apply(location=False, rotation=False, scale=True)
        ob.data.materials.append(mat); bpy.ops.object.shade_smooth(); BAKE.append(ob)
        return ob

    def chair(name, x, y, rot):
        g = []
        g.append(box(f"{name}Rail", (0.5, 0.48, 0.06), (0, 0, 0.42), M["walnut"], bevel=0.008))
        g.append(box(f"{name}Seat", (0.5, 0.49, 0.075), (0, 0.005, 0.485), M["chairfab"], bevel=0.03))
        for i, (lx, ly, tilt) in enumerate([(-0.215, 0.2, 0.0), (0.215, 0.2, 0.0), (-0.215, -0.2, -0.08), (0.215, -0.2, -0.08)]):
            g.append(cyl(f"{name}Leg{i}", 0.016, 0.022, 0.4, (lx, ly - tilt * 0.2, 0.2), M["walnut"], verts=16, rot=(tilt, 0, 0)))
        for i, lx in enumerate((-0.13, 0.13)):
            g.append(cyl(f"{name}Post{i}", 0.014, 0.014, 0.16, (lx, -0.225, 0.58), M["walnut"], verts=12, rot=(-0.12, 0, 0)))
        g.append(torus(f"{name}Frame", 0.2, 0.018, (0, -0.25, 0.86), (math.pi / 2 - 0.14, 0, 0), (1.0, 1.28, 1.0), M["walnut"]))
        bpy.ops.mesh.primitive_cylinder_add(vertices=64, radius=0.19, depth=0.035, location=(0, -0.25, 0.86), rotation=(math.pi / 2 - 0.14, 0, 0))
        pan = bpy.context.active_object; pan.name = f"{name}Panel"; pan.scale = (1.0, 1.27, 1.0)
        bpy.ops.object.transform_apply(location=False, rotation=False, scale=True)
        bev = pan.modifiers.new("soft", 'BEVEL'); bev.width = 0.012; bev.segments = 4
        pan.data.materials.append(M["chairfab"]); bpy.ops.object.shade_smooth(); BAKE.append(pan)
        g.append(pan)
        for o in g:
            o.location = Vector((x, y, 0)) + Euler((0, 0, rot)).to_matrix() @ o.location
            o.rotation_euler = (Euler((0, 0, rot)).to_matrix() @ o.rotation_euler.to_matrix()).to_euler()
    ty = 0.3
    for i, x in enumerate((-0.75, 0.0, 0.75)):
        chair(f"ChairN{i}", x, ty + 0.78, math.pi)
        chair(f"ChairS{i}", x, ty - 0.78, 0.0)
    chair("ChairE", 1.55, ty, math.pi / 2)
    chair("ChairW", -1.55, ty, -math.pi / 2)
    cyl("PendantShade", 0.32, 0.36, 0.22, (0, ty, 1.68), M["shade"], verts=64)
    cyl("PendantRod", 0.006, 0.006, BAND_Z1 - 1.79, (0, ty, (BAND_Z1 + 1.79) / 2 + 0.1), M["brass"], verts=12)
    cyl("PendantDiffuser", 0.3, 0.3, 0.01, (0, ty, 1.565), M["pendantglow"], verts=64, bake=False)
    pl = bpy.data.lights.new("PendantLight", 'POINT'); pl.energy = 160; pl.color = (1.0, 0.85, 0.65); pl.shadow_soft_size = 0.25
    link(bpy.data.objects.new("PendantLight", pl)).location = (0, ty, 1.5)
    box("ArtFrame", (1.5, 0.04, 0.95), (0, YB - 0.05, 1.75), M["frame"])
    box("ArtCanvas", (1.4, 0.01, 0.85), (0, YB - 0.075, 1.75), M["canvas"])
    lathe("VaseBuffetA", VASE, (-0.55, 2.74, 0.85), M["ceramic"], 1.3)
    lathe("VaseBuffetB", VASE, (0.6, 2.74, 0.85), M["ceramic2"], 0.9)
    lathe("Centrepiece", VASE, (0.0, ty, 0.76), M["ceramic"], 0.8)
    box("TableRunner", (1.4, 0.38, 0.004), (0, ty, 0.762), M["grasscloth"])


def bedroom_styling():
    # Prime Cloud Bed (live model) stands centred on the panelled wall, head at y=3.0;
    # Motif nightstands either side (tops at 0.50 m); Carve dresser on the left wall at y=-0.5.
    box("Rug", (3.2, 2.5, 0.012), (0, 0.75, 0.006), M["rug"])
    for s in (-1, 1):
        x = s * 1.5
        lathe(f"LampBase{s}", [(0.0, 0.0), (0.06, 0.0), (0.075, 0.05), (0.07, 0.14), (0.03, 0.22), (0.012, 0.3)],
              (x, 2.77, 0.50), M["ceramic"])
        cyl(f"LampShade{s}", 0.13, 0.16, 0.2, (x, 2.77, 0.88), M["shade"], verts=48)
        lt = bpy.data.lights.new(f"Lamp{s}", 'POINT'); lt.energy = 18; lt.color = (1.0, 0.82, 0.6); lt.shadow_soft_size = 0.08
        link(bpy.data.objects.new(lt.name, lt)).location = (x, 2.77, 0.86)
    # artwork above the dresser
    box("ArtFrame", (0.04, 1.1, 0.8), (X0 + 0.03, -0.5, 1.6), M["frame"])
    box("ArtCanvas", (0.01, 1.0, 0.7), (X0 + 0.055, -0.5, 1.6), M["canvas"])
    lathe("VaseDresser", VASE, (-3.38, -0.95, 0.85), M["ceramic"], 1.1)
    box("DresserBooks", (0.22, 0.3, 0.06), (-3.36, -0.1, 0.88), M["book"])
    # sheer curtain panels beside the window
    for y in (WIN_Y0 - 0.2, WIN_Y1 + 0.2):
        box(f"Curtain{y:.1f}", (0.06, 0.42, BAND_Z0 - 0.04), (X1 - 0.12, y, (BAND_Z0 - 0.04) / 2 + 0.02), M["curtain"])
    # bench-free foot: a throw folded on the bed is part of the live model; nothing else here


def closet_styling():
    # Prime Vista Dressing (live model) along the back wall, Prime Suite wardrobe wall on the left.
    box("Rug", (1.6, 3.2, 0.012), (0.4, 0.2, 0.006), M["rug"])
    # round upholstered ottoman in the middle of the dressing room
    cyl("Ottoman", 0.42, 0.42, 0.42, (0.4, 0.2, 0.21), M["boucle"], verts=64)
    cyl("OttomanTop", 0.4, 0.38, 0.03, (0.4, 0.2, 0.435), M["boucle"], verts=64)


ROOMS = [("living", living_styling), ("dining", dining_styling), ("bedroom", bedroom_styling), ("closet", closet_styling)]
for i, (kind, styling) in enumerate(ROOMS):
    before = set(scene.objects)
    shell(kind, front_wall=(i == 0), back_door=(i < len(ROOMS) - 1))
    styling()
    for ob in set(scene.objects) - before:
        ob.location.y += i * ROOM_PITCH

# ---------------------------------------------------------------- daylight
sun_d = bpy.data.lights.new("Sun", 'SUN')
sun_d.energy = 5.0; sun_d.angle = math.radians(1.2); sun_d.color = (1.0, 0.88, 0.72)
sun = link(bpy.data.objects.new("Sun", sun_d))
sun.rotation_euler = Vector((-1.0, -0.25, -0.62)).to_track_quat('-Z', 'Y').to_euler()

world = bpy.data.worlds.new("World"); scene.world = world; world.use_nodes = True
wnt = world.node_tree
bg = wnt.nodes["Background"]; bg.inputs["Strength"].default_value = 1.0
env = wnt.nodes.new("ShaderNodeTexEnvironment")
env.image = bpy.data.images.load(os.path.join(ASSETS, "sky.hdr"))
wmap = wnt.nodes.new("ShaderNodeMapping"); wmap.inputs["Rotation"].default_value = (0, 0, math.radians(110))
wnt.links.new(wnt.nodes.new("ShaderNodeTexCoord").outputs["Generated"], wmap.inputs["Vector"])
wnt.links.new(wmap.outputs["Vector"], env.inputs["Vector"])
wnt.links.new(env.outputs["Color"], bg.inputs["Color"])

# Window view for the website: render the HDRI as seen through a window into an image
# mapped on the backdrops (camera-only, so they never block light during the bake).
view_path = os.path.join(TEX_DIR, "window_view.jpg")
vcam_d = bpy.data.cameras.new("ViewCam"); vcam_d.lens = 14
vcam = link(bpy.data.objects.new("ViewCam", vcam_d))
vcam.location = (X1 - 2.0, wy, 1.5); vcam.rotation_euler = (math.pi / 2, 0, -math.pi / 2)
for ob in scene.objects:
    if ob.type == 'MESH': ob.hide_render = True
scene.render.engine = 'CYCLES'; scene.cycles.samples = 16
scene.camera = vcam; scene.render.resolution_x, scene.render.resolution_y = 1800, 1200
scene.render.image_settings.file_format = 'JPEG'; scene.render.filepath = view_path
bpy.ops.render.render(write_still=True)
for ob in scene.objects:
    if ob.type == 'MESH': ob.hide_render = False
bpy.data.objects.remove(vcam)
skym = M["sky"]; snt = skym.node_tree
snode = snt.nodes.new("ShaderNodeTexImage"); snode.image = bpy.data.images.load(view_path)
snt.links.new(snode.outputs["Color"], next(n for n in snt.nodes if n.type == 'EMISSION').inputs["Color"])
for bd in BACKDROPS:
    bd.visible_diffuse = bd.visible_glossy = bd.visible_transmission = bd.visible_volume_scatter = False

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
scene.view_settings.exposure = 0.9

# ---------------------------------------------------------------- optional preview still
if PREVIEW:
    cam_d = bpy.data.cameras.new("Cam"); cam_d.lens = 22
    cam = link(bpy.data.objects.new("Cam", cam_d))
    cam.location = (-1.25, -3.8, 1.72)
    cam.rotation_euler = (Vector((0.5, 1.4, 0.75)) - cam.location).to_track_quat('-Z', 'Y').to_euler()
    scene.camera = cam
    scene.render.resolution_x, scene.render.resolution_y = 1600, 1000
    scene.render.image_settings.file_format = 'PNG'; scene.render.filepath = os.path.abspath(PREVIEW)
    bpy.ops.render.render(write_still=True)
    print("[prime] preview written", PREVIEW)

# ---------------------------------------------------------------- bake lighting into textures
# Two passes per surface, combined in numpy:
#   1. COLOUR (albedo) at full resolution - noise-free, keeps the scanned material detail sharp
#   2. LIGHT (direct + indirect GI, no colour) at 1/4 resolution, many samples, then smoothed
# final = tonemap(albedo * light * exposure), using the same exposure as the Blender preview.
import numpy as np

EXPOSURE = 1.45  # web exposure (ACES curve below is brighter than Blender's AgX)
scene.render.bake.margin = 16
scene.render.bake.margin_type = 'EXTEND'
cyc.bake_type = 'DIFFUSE'

def area(ob):
    return sum(p.area for p in ob.data.polygons) * max(ob.scale) ** 2

def blur(a, r):
    """separable box blur, 3 passes ~ gaussian; a: (h, w, c)"""
    if r < 1: return a
    k = 2 * r + 1
    for _ in range(3):
        for axis in (0, 1):
            p = np.pad(a, [(r, r) if i == axis else (0, 0) for i in range(3)], mode='edge')
            c = np.cumsum(p, axis=axis, dtype=np.float64)
            c = np.concatenate([np.zeros_like(np.take(c, [0], axis=axis)), c], axis=axis)
            a = (np.take(c, range(k, c.shape[axis]), axis=axis) - np.take(c, range(0, c.shape[axis] - k), axis=axis)) / k
    return a.astype(np.float32)

def srgb_to_lin(c):
    return np.where(c <= 0.04045, c / 12.92, ((c + 0.055) / 1.055) ** 2.4)

def lin_to_srgb(c):
    c = np.clip(c, 0, 1)
    return np.where(c <= 0.0031308, c * 12.92, 1.055 * c ** (1 / 2.4) - 0.055)

def tonemap(x):
    # ACES filmic fit (Narkowicz) - soft highlight roll-off like a camera
    return np.clip((x * (2.51 * x + 0.03)) / (x * (2.43 * x + 0.59) + 0.14), 0, 1)

def bake_into(img, color, direct_indirect, samples):
    scene.render.bake.use_pass_color = color
    scene.render.bake.use_pass_direct = direct_indirect
    scene.render.bake.use_pass_indirect = direct_indirect
    cyc.samples = samples
    nt.nodes.active = node; node.image = img
    bpy.ops.object.bake(type='DIFFUSE')


for ob in BAKE:
    ob.data.materials[0] = ob.data.materials[0].copy()
    bpy.ops.object.select_all(action='DESELECT')
    bpy.context.view_layer.objects.active = ob; ob.select_set(True)
    bpy.ops.object.mode_set(mode='EDIT'); bpy.ops.mesh.select_all(action='SELECT')
    bpy.ops.uv.smart_project(angle_limit=math.radians(66), island_margin=0.02)
    bpy.ops.object.mode_set(mode='OBJECT')
    a = area(ob)
    size = RES if a > 6 else RES // 2 if a > 1.5 else RES // 4 if a > 0.3 else 256
    lsize = max(64, size // 4)
    nt = ob.data.materials[0].node_tree
    node = nt.nodes.new("ShaderNodeTexImage")

    print(f"[prime] baking {ob.name}: colour {size}px, light {lsize}px")
    img_c = bpy.data.images.new(f"c_{ob.name}", size, size, float_buffer=True)
    bake_into(img_c, True, False, 4)
    img_l = bpy.data.images.new(f"l_{ob.name}", lsize, lsize, float_buffer=True)
    bake_into(img_l, False, True, SAMPLES)

    light = np.array(img_l.pixels[:], dtype=np.float32).reshape(lsize, lsize, 4)[..., :3]
    light = blur(light, max(1, lsize // 96))
    img_l.pixels[:] = np.concatenate([light, np.ones((lsize, lsize, 1), np.float32)], 2).ravel()
    img_l.scale(size, size)  # bilinear upsample to the colour resolution
    light = np.array(img_l.pixels[:], dtype=np.float32).reshape(size, size, 4)[..., :3]
    albedo = np.array(img_c.pixels[:], dtype=np.float32).reshape(size, size, 4)[..., :3]  # linear

    hdr = albedo * light * EXPOSURE
    lum = (hdr * np.array([0.2126, 0.7152, 0.0722], np.float32)).sum(-1, keepdims=True)
    hdr = lum + (hdr - lum) * 0.72  # gentle desaturation, like a photographic film response
    out = lin_to_srgb(tonemap(hdr))
    final = bpy.data.images.new(f"bake_{ob.name}", size, size)  # 8-bit sRGB
    final.pixels[:] = np.concatenate([out, np.ones((size, size, 1), np.float32)], 2).ravel()
    final.filepath_raw = os.path.join(TEX_DIR, f"{ob.name}.png"); final.file_format = 'PNG'; final.save()
    node.image = final
    bpy.data.images.remove(img_c); bpy.data.images.remove(img_l)

    for n in list(nt.nodes):
        if n.name != node.name and n.type != "OUTPUT_MATERIAL":
            nt.nodes.remove(n)
    outn = next(n for n in nt.nodes if n.type == 'OUTPUT_MATERIAL')
    bsdf = nt.nodes.new("ShaderNodeBsdfPrincipled")
    nt.links.new(node.outputs["Color"], bsdf.inputs["Base Color"])
    nt.links.new(bsdf.outputs[0], outn.inputs[0])
    ob.data.materials[0].name = "BAKED_" + ob.name

# emissive objects: export emission colour as base colour, flagged by name
for ob in EMISSIVE:
    m = ob.data.materials[0]
    if not m.name.startswith("EMIT_"):
        e = next((n for n in m.node_tree.nodes if n.type == 'EMISSION'), None)
        col = e.inputs["Color"].default_value[:] if e else (1, 1, 1, 1)
        tex = next((n.image for n in m.node_tree.nodes if n.type == 'TEX_IMAGE'), None)
        m.node_tree.nodes.clear()
        bsdf = m.node_tree.nodes.new("ShaderNodeBsdfPrincipled")
        out = m.node_tree.nodes.new("ShaderNodeOutputMaterial")
        bsdf.inputs["Base Color"].default_value = col
        if tex:  # e.g. the window view keeps its image
            tn = m.node_tree.nodes.new("ShaderNodeTexImage"); tn.image = tex
            m.node_tree.links.new(tn.outputs["Color"], bsdf.inputs["Base Color"])
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
