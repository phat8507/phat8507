(function () {
  const root = document.documentElement;

  // 1) Init theme từ localStorage
  const saved = localStorage.getItem("theme");
  if (saved) root.setAttribute("data-theme", saved);

  // 2) Toggle dark mode
  const btn = document.getElementById("themeToggle");
  if (btn) {
    btn.addEventListener("click", () => {
      const cur = root.getAttribute("data-theme") || "light";
      const next = cur === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      localStorage.setItem("theme", next);
    });
  }

  // 3) Search (dùng assets/search.json)
  const q = document.getElementById("q");
  const results = document.getElementById("results");
  if (!q || !results || typeof DATA_URL === "undefined") return;

  let posts = [];

  fetch(DATA_URL)
    .then((r) => r.json())
    .then((data) => {
      posts = Array.isArray(data) ? data : [];
      render("");
    })
    .catch(() => {
      results.innerHTML = "<li>Không tải được dữ liệu search.json</li>";
    });

  function render(query) {
    const s = (query || "").trim().toLowerCase();

    const filtered = !s
      ? posts
      : posts.filter((p) => {
          const hay = [
            p.title,
            p.date,
            ...(p.tags || []),
            ...(p.categories || []),
          ]
            .join(" ")
            .toLowerCase();
          return hay.includes(s);
        });

    results.innerHTML = filtered
      .map(
        (p) => `
        <li>
          <a href="${p.url}">${escapeHtml(p.title)}</a>
          <span class="muted">${p.date}</span>
        </li>
      `
      )
      .join("");
  }

  q.addEventListener("input", () => render(q.value));

  function escapeHtml(str) {
    return String(str).replace(/[&<>"']/g, (m) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    }[m]));
  }
})();

