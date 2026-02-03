async function loadPosts() {
  const res = await fetch("./posts.json", { cache: "no-store" });
  if (!res.ok) return [];
  return await res.json();
}

function qs(name) {
  const url = new URL(window.location.href);
  return url.searchParams.get(name) || "";
}

function setFooter() {
  const y = document.getElementById("year");
  const t = document.getElementById("today");
  const now = new Date();

  if (y) y.textContent = String(now.getFullYear());
  if (t) {
    const dd = String(now.getDate()).padStart(2, "0");
    const mm = String(now.getMonth() + 1).padStart(2, "0");
    const yyyy = String(now.getFullYear());
    t.textContent = `${dd}/${mm}/${yyyy}`;
  }
}

function openModal() {
  const m = document.getElementById("searchModal");
  if (!m) return;
  m.classList.add("show");
  m.setAttribute("aria-hidden", "false");
  const input = document.getElementById("searchInput");
  if (input) input.focus();
}

function closeModal() {
  const m = document.getElementById("searchModal");
  if (!m) return;
  m.classList.remove("show");
  m.setAttribute("aria-hidden", "true");
}

function wireSearch(posts) {
  const openBtn = document.getElementById("openSearch");
  const closeBtn = document.getElementById("closeSearch");
  const modal = document.getElementById("searchModal");
  const input = document.getElementById("searchInput");
  const results = document.getElementById("searchResults");

  if (!openBtn || !modal || !input || !results) return;

  openBtn.addEventListener("click", () => {
    openModal();
    renderSearchResults(posts, "", results);
  });

  if (closeBtn) closeBtn.addEventListener("click", closeModal);

  modal.addEventListener("click", (e) => {
    const target = e.target;
    if (target && target.dataset && target.dataset.close) closeModal();
  });

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
      e.preventDefault();
      openModal();
      renderSearchResults(posts, input.value, results);
    }
  });

  input.addEventListener("input", () => {
    renderSearchResults(posts, input.value, results);
  });
}

function renderSearchResults(posts, q, container) {
  const query = (q || "").trim().toLowerCase();
  const filtered = !query ? posts : posts.filter(p => {
    const hay = `${p.title} ${p.summary} ${p.category} ${p.date}`.toLowerCase();
    return hay.includes(query);
  });

  container.innerHTML = filtered.slice(0, 20).map(p => {
    return `
      <div class="result">
        <a href="./${p.url}" class="result-title">${escapeHtml(p.title)}</a>
        <div class="result-meta">${escapeHtml(p.category)} · ${escapeHtml(p.date)}</div>
      </div>
    `;
  }).join("");

  if (filtered.length === 0) {
    container.innerHTML = `<div class="muted">No results.</div>`;
  }
}

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, (c) => {
    return ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#39;" })[c];
  });
}

function renderBlog(posts) {
  const list = document.getElementById("postList");
  const meta = document.getElementById("blogMeta");
  const clear = document.getElementById("clearFilter");
  if (!list) return;

  const cat = qs("category").trim().toLowerCase();
  const q = qs("q").trim().toLowerCase();

  let filtered = posts.slice();

  if (cat) filtered = filtered.filter(p => String(p.category).toLowerCase() === cat);
  if (q) {
    filtered = filtered.filter(p => {
      const hay = `${p.title} ${p.summary} ${p.category} ${p.date}`.toLowerCase();
      return hay.includes(q);
    });
  }

  if (meta) {
    let label = `${filtered.length} posts`;
    if (cat) label += ` in ${cat}`;
    if (q) label += ` matching "${q}"`;
    meta.textContent = label;
  }

  if (clear) clear.hidden = !(cat || q);

  list.innerHTML = filtered
    .sort((a,b) => String(b.date).localeCompare(String(a.date)))
    .map(p => {
      const id = (p.url.split("#")[1] || "").trim();
      return `
        <article class="item" id="${escapeHtml(id)}">
          <h2 class="item-title">${escapeHtml(p.title)}</h2>
          <div class="item-meta">
            <span>${escapeHtml(p.category)}</span>
            <span>·</span>
            <span>${escapeHtml(p.date)}</span>
          </div>
          <p class="text">${escapeHtml(p.summary)}</p>
        </article>
      `;
    }).join("");

  if (filtered.length === 0) list.innerHTML = `<div class="muted">No posts.</div>`;
}

function renderCategories(posts) {
  const el = document.getElementById("catList");
  if (!el) return;

  const map = new Map();
  posts.forEach(p => {
    const c = String(p.category || "uncategorized").toLowerCase();
    map.set(c, (map.get(c) || 0) + 1);
  });

  const cats = Array.from(map.entries()).sort((a,b) => a[0].localeCompare(b[0]));

  el.innerHTML = cats.map(([c, n]) => {
    return `
      <div class="item">
        <h2 class="item-title"><a href="./blog.html?category=${encodeURIComponent(c)}">${escapeHtml(c)}</a></h2>
        <div class="item-meta"><span>${n} posts</span></div>
      </div>
    `;
  }).join("");
}

(async function main() {
  setFooter();

  const posts = await loadPosts();
  wireSearch(posts);

  if (document.getElementById("postList")) renderBlog(posts);
  if (document.getElementById("catList")) renderCategories(posts);
})();
v
