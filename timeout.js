// timeout.js — EmbedPing (VieStatic-style)
// AB, this is the whole engine in ONE FILE.

(function () {
  const script = document.currentScript;
  const target = script.getAttribute("data-url");
  if (!target) return console.error("EmbedPing: missing data-url");

  const position = script.getAttribute("data-position") || "bottom-right";
  const theme = script.getAttribute("data-theme") || "auto";
  const interval = Number(script.getAttribute("data-interval") || 5000);

  // Create shadow DOM container
  const container = document.createElement("div");
  container.style.position = "fixed";
  container.style.zIndex = "999999";
  container.style.pointerEvents = "none";

  const posMap = {
    "top-left": { top: "12px", left: "12px" },
    "top-right": { top: "12px", right: "12px" },
    "bottom-left": { bottom: "12px", left: "12px" },
    "bottom-right": { bottom: "12px", right: "12px" }
  };
  Object.assign(container.style, posMap[position]);

  const shadow = container.attachShadow({ mode: "open" });

  // Inject CSS
  const style = document.createElement("style");
  style.textContent = `
    .badge {
      font-family: system-ui, sans-serif;
      font-size: 13px;
      padding: 6px 10px;
      border-radius: 8px;
      background: var(--bg);
      color: var(--fg);
      box-shadow: 0 2px 6px rgba(0,0,0,0.15);
      pointer-events: auto;
      user-select: none;
      transition: background 0.2s, color 0.2s;
    }

    :host([theme="light"]) {
      --bg: #ffffff;
      --fg: #111111;
    }
    :host([theme="dark"]) {
      --bg: #1a1a1a;
      --fg: #f5f5f5;
    }
    :host([theme="auto"]) {
      --bg: color-mix(in srgb, #fff 60%, #000);
      --fg: #111;
    }

    .green { color: #2ecc71; }
    .yellow { color: #f1c40f; }
    .red { color: #e74c3c; }
    .gray { color: #7f8c8d; }
  `;
  shadow.appendChild(style);

  // Badge element
  const badge = document.createElement("div");
  badge.className = "badge gray";
  badge.textContent = "…";
  shadow.appendChild(badge);

  document.body.appendChild(container);

  // Ping engine
  async function ping(url) {
    const start = performance.now();

    try {
      // Try HEAD
      const res = await fetch(url, { method: "HEAD" });
      if (res.ok) return performance.now() - start;
    } catch (_) {}

    try {
      // Try no-cors
      await fetch(url, { mode: "no-cors" });
      return performance.now() - start;
    } catch (_) {}

    // Try Image fallback
    await new Promise((resolve) => {
      const img = new Image();
      img.onload = resolve;
      img.onerror = resolve;
      img.src = url + "?t=" + Date.now();
    });
    return performance.now() - start;
  }

  function update(ms) {
    if (!ms || ms === Infinity) {
      badge.className = "badge gray";
      badge.textContent = "Offline";
      return;
    }

    let color = "green";
    if (ms > 150 && ms <= 500) color = "yellow";
    if (ms > 500) color = "red";

    badge.className = "badge " + color;
    badge.textContent = Math.round(ms) + "ms";
  }

  async function loop() {
    const ms = await ping(target).catch(() => Infinity);
    update(ms);
    setTimeout(loop, interval);
  }

  // Apply theme
  shadow.host.setAttribute("theme", theme);

  // Start
  loop();
})();
