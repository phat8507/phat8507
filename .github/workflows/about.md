---
layout: none
title: About
permalink: /about/
---

<!doctype html>
<html lang="{{ site.lang | default: 'en' }}">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>about — {{ site.title }}</title>
  <link rel="stylesheet" href="{{ '/assets/css/main.css' | relative_url }}">
</head>
<body>
  <header class="topbar">
    <div class="brand"><a class="plain" href="{{ '/' | relative_url }}">{{ site.title }}</a></div>
    <nav class="nav">
      <a href="{{ '/blog/' | relative_url }}">blog</a>
      <a href="{{ '/categories/' | relative_url }}">categories</a>
      <a class="active" href="{{ '/about/' | relative_url }}">about</a>
      <a class="icon" href="{{ '/search/' | relative_url }}" aria-label="Search">⌕</a>
      <button class="icon btn-icon" id="themeToggle" aria-label="Toggle dark mode">◐</button>
    </nav>
  </header>

  <main class="page">
    <h1 class="page-title">about</h1>
    <p>Xin chào, mình là Phát. Đây là nơi mình viết blog hằng ngày.</p>
  </main>

  <footer class="footer">
    <div class="line"></div>
    <div class="footer-row">
      <div>Copyright © {{ "now" | date: "%Y" }} Phat Nguyen; All rights reserved.</div>
      <div>{{ "now" | date: "%-d/%-m/%Y" }}</div>
    </div>
  </footer>

  <script src="{{ '/assets/js/main.js' | relative_url }}"></script>
</body>
</html>
