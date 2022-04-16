// takes in image data array and sets alpha value to 0 for parts outside the mask geometry
function maskImageData({
  data,
  data_bbox,
  data_height,
  data_width,
  data_srs,
  debug = false,
  geomask,
  mask,
  mask_srs,
  reproject,
  strategy = "outside",
  edition
}) {
  if (!["inside", "outside"].includes(strategy)) {
    throw new Error(`[geocanvas] strategy can be either "inside" or "outside". you provided "${strategy}"`);
  }
  const { rows } = geomask[strategy]({
    raster_bbox: data_bbox,
    raster_height: data_height,
    raster_width: data_width,
    raster_srs: data_srs,
    mask,
    mask_srs,
    reproject
  });

  rows.forEach((ranges, r) => {
    if (ranges) {
      const row_offset = r * 4 * data_width;
      ranges.forEach(([start, end]) => {
        for (let c = start; c <= end; c++) {
          data[row_offset + c * 4 + 3] = 0; // set alpha to zero
        }
      });
    }
  });
}

function maskCanvas({
  canvas,
  canvas_bbox,
  canvas_srs,
  geomask,
  mask,
  mask_srs,
  reproject,
  strategy = "outside",
  edition,
  debug = false
}) {
  if (debug) console.log("[geocanvas] starting to mask canvas");
  if (!["inside", "outside"].includes(strategy)) {
    throw new Error(`[geocanvas] strategy can be either "inside" or "outside". you provided "${strategy}"`);
  }
  const context = canvas.getContext("2d");
  const { height, width } = canvas;
  if (debug) console.log(`[geocanvas] canvas height is ${height} pixels`);
  if (debug) console.log(`[geocanvas] canvas width is ${width} pixels`);
  const imageData = context.getImageData(0, 0, width, height);
  maskImageData({
    data: imageData.data,
    data_bbox: canvas_bbox,
    data_height: height,
    data_srs: canvas_srs,
    data_width: width,
    debug,
    geomask,
    mask,
    mask_srs,
    reproject,
    strategy
  });
  if (debug) console.log("[geocanvas] image data after masking:", imageData);
  context.putImageData(imageData, 0, 0);
  if (debug) console.log("[geocanvas] put image data back");
  return canvas;
}

module.exports = { maskImageData, maskCanvas };
