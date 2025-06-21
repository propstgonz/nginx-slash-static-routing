document.addEventListener("DOMContentLoaded", () => {
  const box = document.createElement("div");
  box.style.position = "fixed";
  box.style.bottom = "10px";
  box.style.left = "10px";
  box.style.backgroundColor = "#ffeb3b";
  box.style.color = "#000";
  box.style.padding = "10px 14px";
  box.style.fontFamily = "monospace";
  box.style.fontSize = "13px";
  box.style.borderRadius = "8px";
  box.style.border = "1px solid #000";
  box.style.boxShadow = "0 2px 6px rgba(0,0,0,0.2)";
  box.style.zIndex = "9999";
  box.style.whiteSpace = "pre-line";

  const perf = performance.timing;
  const now = performance.now();

  const info = [
    `⏱ Load: ${Math.round(now)} ms`,
    `📄 Height: ${document.documentElement.scrollHeight}px`,
    `📜 Scripts: ${document.scripts.length}`,
    `🎨 Stylesheets: ${document.styleSheets.length}`
  ];

  try {
    if (performance.memory) {
      info.push(`🧠 Heap: ${Math.round(performance.memory.usedJSHeapSize / 1048576)} MB`);
    }
  } catch (e) {
    info.push(`🧠 Heap: n/a`);
  }

  box.textContent = info.join("\n");
  document.body.appendChild(box);
});
