const geomask = require("geomask/lite");
const core = require("./core.js");

// basically have to provide everything you do in core except geomask
function maskImageData(options) {
  return core.maskImageData({ ...options, edition: "lite", geomask });
}

function maskCanvas(options) {
  return core.maskCanvas({ ...options, edition: "lite", geomask });
}

const geocanvas = { maskImageData, maskCanvas };

if (typeof define === "function" && define.amd)
  define(function () {
    return geocanvas;
  });
if (typeof module === "object") module.exports = geocanvas;
if (typeof self === "object") self.geocanvas = geocanvas;
if (typeof window === "object") window.geocanvas = geocanvas;
