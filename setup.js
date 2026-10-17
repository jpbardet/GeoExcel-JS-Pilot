(async function () {
  "use strict";
  const status = document.getElementById("status");
  const button = document.getElementById("download");
  try {
    if (location.protocol !== "https:") throw new Error("Upload these files to GitHub Pages, then open the HTTPS Pages address to create the manifest. No local server is needed.");
    const base = new URL("./", location.href).href;
    const files = ["manifest.template.xml", "functions.json", "functions.js", "functions.html", "icon-16.png", "icon-32.png", "icon-80.png"];
    const responses = await Promise.all(files.map(async function (file) {
      const response = await fetch(new URL(file, base), {cache:"no-store"});
      if (!response.ok) throw new Error("Could not load " + file + " (" + response.status + "). Check the GitHub Pages deployment.");
      return response;
    }));
    const template = await responses[0].text();
    const metadata = await responses[1].json();
    if (!metadata.functions.some(f => f.id === "GEOEXCEL_VERSION")) throw new Error("Version function metadata is missing.");
    const escapedBase = base.replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/</g,"&lt;");
    const manifest = template.split("{{BASE_URL}}").join(escapedBase);
    const xml = new DOMParser().parseFromString(manifest, "application/xml");
    if (xml.querySelector("parsererror")) throw new Error("The generated manifest is not valid XML.");
    button.onclick = function () {
      const url = URL.createObjectURL(new Blob([manifest], {type:"application/xml"}));
      const a = document.createElement("a");
      a.href = url; a.download = "GeoExcel-manifest.xml"; document.body.appendChild(a); a.click(); a.remove();
      setTimeout(() => URL.revokeObjectURL(url), 30000);
    };
    button.disabled = false;
    status.textContent = "Hosted files available. Ready to download.\nHost: " + base;
  } catch (error) {
    status.textContent = error.message;
  }
})();
