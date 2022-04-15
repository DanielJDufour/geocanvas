# geocanvas: _beta version_ 
> Functions for Working with GeoSpatial Canvas Elements

# install
```bash
npm install geocanvas
```

# basic usage
```js
import { maskCanvas } from 'geocanvas';

// this function is mutable
// modifying the original canvas
maskCanvas({
  // required
  // an HTML Canvas Element
  canvas,

  // required
  // bounding box of the canvas
  // as [xmin, ymin, xmax, ymax]
  // or [west, south, east, north]
  canvas_bbox: [7698736.857788673, 163239.83797837645, 10066450.245949661, 1325082.6679127468],

  // required
  // spatial reference system of the canvas image
  canvas_srs: 3857,

  // optional 
  canvas_pixel_height: 2445.98490512499,

  // optional
  canvas_pixel_width: 2445.98490512499,

  // required
  // a GeoJSON Feature, FeatureCollection, Polygon, or MultiPolygon
  mask: { type: "FeatureCollection", features: [ /* ... */ ] },

  // required
  // spatial reference system of the mask geometry
  mask_srs: 4326,

  // optional parameter
  // accepts "outside" or "inside"
  // default is outside
  // choose whether to make the inside or outside
  // of the mask geometry transparent
  strategy: "outside"
});
