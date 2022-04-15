const geomask = require("geomask");
const core = require("./core.js");

function maskImageData(options) {
  return core.maskImageData({ ...options, edition: "full", geomask });
}

function maskCanvas(options) {
  return core.maskCanvas({ ...options, edition: "full", geomask });
}

const geocanvas = { maskImageData, maskCanvas };

if (typeof define === "function" && define.amd)
  define(function () {
    return geocanvas;
  });
if (typeof module === "object") module.exports = geocanvas;
if (typeof self === "object") self.geocanvas = geocanvas;
if (typeof window === "object") window.geocanvas = geocanvas;
