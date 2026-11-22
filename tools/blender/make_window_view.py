"""Tone-map the window-view panorama (equirectangular HDR) to the JPG the website shows outside the windows.
  blender -b -P tools/blender/make_window_view.py
No re-bake needed: the website draws this behind the windows."""
import bpy, os
import numpy as np
here = os.path.dirname(os.path.abspath(__file__))
src = bpy.data.images.load(os.path.join(here, "assets", "view_city.hdr"))
w, h = src.size
px = np.empty(w * h * 4, np.float32); src.pixels.foreach_get(px)
rgb = px.reshape(h, w, 4)[..., :3]
band = rgb[int(h * .45):int(h * .75)]                      # horizon band sets the exposure
rgb = rgb * (0.30 / np.exp(np.log(band.mean(-1) + 1e-4).mean()))
out = np.clip(rgb * (2.51 * rgb + .03) / (rgb * (2.43 * rgb + .59) + .14), 0, 1)
out = np.where(out <= .0031308, out * 12.92, 1.055 * out ** (1 / 2.4) - .055)
img = bpy.data.images.new("view", w, h)
img.pixels.foreach_set(np.concatenate([out, np.ones((h, w, 1))], 2).astype(np.float32).ravel())
img.file_format = 'JPEG'
img.filepath_raw = os.path.abspath(os.path.join(here, "..", "..", "public", "experience", "window-view.jpg"))
bpy.context.scene.render.image_settings.quality = 88
img.save(quality=88)
