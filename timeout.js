(function () {
  const s = document.currentScript;
  const url = s.getAttribute("data-url");
  if (!url) return console.error("EmbedPing: missing data-url");

  const pos = s.getAttribute("data-position") || "bottom-right";
  const theme = s.getAttribute("data-theme") || "auto";
  const interval = Number(s.getAttribute("data-interval") || 4000);
  const size = s.getAttribute("data-size") || "md";

  const wrap = document.createElement("div");
  wrap.style.position = "fixed";
  wrap.style.zIndex = "999999";
  wrap.style.pointerEvents = "none";

  const map = {
    "top-left": { top: "12px", left: "12px" },
    "top-right": { top: "12px", right: "12px" },
    "bottom-left": { bottom: "12px", left: "12px" },
    "bottom-right": { bottom: "12px", right: "12px" }
  };
  Object.assign(wrap.style, map[pos]);

  const shadow = wrap.attachShadow({ mode: "open" });

  const css = document.createElement("style");
  css.textContent = `
    :host {
      --bg-light: #fff;
      --fg-light: #111;
      --bg-dark: #1a1a1a;
      --fg-dark: #f5f5f5;
      --shadow: rgba(0,0,0,0.18);
    }
    :host([theme="light"]) { --bg: var(--bg-light); --fg: var(--fg-light); }
    :host([theme="dark"]) { --bg: var(--bg-dark); --fg: var(--fg-dark); }
    :host([theme="auto"]) {
      --bg: color-mix(in srgb, #fff 60%, #000);
      --fg: #111;
    }
    .badge {
      font-family: system-ui, sans-serif;
      font-weight: 500;
      border-radius: 8px;
      background: var(--bg);
      color: var(--fg);
      box-shadow: 0 2px 6px var(--shadow);
      pointer-events: auto;
      user-select: none;
      transition: 0.2s ease;
      display: inline-flex;
      align-items: center;
      justify-content: center;
    }
    .sm { padding: 4px 8px; font-size: 11px; }
    .md { padding: 6px 10px; font-size: 13px; }
    .lg { padding: 8px 14px; font-size: 15px; }
    .green { color: #2ecc71; }
    .yellow { color: #f1c40f; }
    .red { color: #e74c3c; }
    .gray { color: #7f8c8d; }
  `;
  shadow.appendChild(css);

  const badge = document.createElement("div");
  badge.className = `badge ${size} gray`;
  badge.textContent = "…";
  shadow.appendChild(badge);

  document.body.appendChild(wrap);
  shadow.host.setAttribute("theme", theme);

  async function ping(u) {
    const t = performance.now();
    try {
      const r = await fetch(u, { method: "HEAD", cache: "no-store" });
      if (r.ok) return performance.now() - t;
    } catch (_) {}

    try {
      await fetch(u, { mode: "no-cors", cache: "no-store" });
      return performance.now() - t;
    } catch (_) {}

    await new Promise(res => {
      const img = new Image();
      img.onload = res;
      img.onerror = res;
      img.src = u + "?t=" + Math.random();
    });
    return performance.now() - t;
  }

  function set(ms) {
    if (!ms || ms === Infinity) {
      badge.className = `badge ${size} gray`;
      badge.textContent = "Offline";
      return;
    }
    let c = "green";
    if (ms > 150 && ms <= 500) c = "yellow";
    if (ms > 500) c = "red";
    badge.className = `badge ${size} ${c}`;
    badge.textContent = Math.round(ms) + "ms";
  }

  async function loop() {
    const ms = await ping(url).catch(() => Infinity);
    set(ms);
    setTimeout(loop, interval);
  }

  loop();
})();
