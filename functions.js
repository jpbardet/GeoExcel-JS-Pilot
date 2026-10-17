/* GeoExcel JavaScript pilot. No workbook reads, writes or network requests. */
(function (root) {
  "use strict";
  function GeoExcel_Version() {
    return "GeoExcel JS 0.1.0";
  }
  root.GeoExcel_Version = GeoExcel_Version;
  if (typeof CustomFunctions !== "undefined") {
    CustomFunctions.associate("GEOEXCEL_VERSION", GeoExcel_Version);
  }
})(typeof globalThis !== "undefined" ? globalThis : this);
