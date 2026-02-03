(function () {
  const root = document.documentElement;

  // init theme
  const saved = localStorage.getItem("theme");
  if (saved) root.setAttribute("data-theme", saved);

  const btn = document.getElementById("themeToggle");
  if (btn) {
    btn.addEventListener("click", () => {
      const cur = root.getAttribute("data-theme") || "light";
      const next = cur === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      localStorage.setItem("theme", next);
    });
  }

  // search
  const q = document.getElementById("q");
  const results = document.getElementById("results");
  if (!q || !results || typeof DATA_URL === "undefined") return;

  let posts = [];
  fetch(DATA_URL)
    .then(r => r.json())
    .then(data => {
      posts = data || [];
      render("");
    });

  function render(query) {
    const s = (query || "").trim().toLowerCase();
    const filtered = !s ? posts : posts.filter(p => {
      const hay = [
        p.title,
        p.date,
        ...(p.tags || []),
        ...(p.categories || [])
      ].join(" ").toLowerCase();
      return hay.includes(s);
    });

    results.innerHTML = filtered.map(p => `
      <li>
        <a href="${p.url}">${escapeHtml(p.title)}</a>
        <span class="muted">${p.date}</span>
      </li>
    `).join("");
  }

  q.addEventListener("input", () => render(q.value));

  function escapeHtml(str){
    return String(str).replace(/[&<>"']/g, m => ({
      "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"
    }[m]));
  }
})();
(function () {
  const root = document.documentElement;

  // init theme
  const saved = localStorage.getItem("theme");
  if (saved) root.setAttribute("data-theme", saved);

  const btn = document.getElementById("themeToggle");
  if (btn) {
    btn.addEventListener("click", () => {
      const cur = root.getAttribute("data-theme") || "light";
      const next = cur === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      localStorage.setItem("theme", next);
    });
  }

  // search
  const q = document.getElementById("q");
  const results = document.getElementById("results");
  if (!q || !results || typeof DATA_URL === "undefined") return;

  let posts = [];
  fetch(DATA_URL)
    .then(r => r.json())
    .then(data => {
      posts = data || [];
      render("");
    });

  function render(query) {
    const s = (query || "").trim().toLowerCase();
    const filtered = !s ? posts : posts.filter(p => {
      const hay = [
        p.title,
        p.date,
        ...(p.tags || []),
        ...(p.categories || [])
      ].join(" ").toLowerCase();
      return hay.includes(s);
    });

    results.innerHTML = filtered.map(p => `
      <li>
        <a href="${p.url}">${escapeHtml(p.title)}</a>
        <span class="muted">${p.date}</span>
      </li>
    `).join("");
  }

  q.addEventListener("input", () => render(q.value));

  function escapeHtml(str){
    return String(str).replace(/[&<>"']/g, m => ({
      "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"
    }[m]));
  }
})();
