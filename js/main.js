(function () {
  const C = window.LIGA || {};
  const $ = (s) => document.querySelector(s);
  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const ext = (url) => /^https?:/.test(url) ? ' target="_blank" rel="noopener"' : "";

  /* ---------- Nav ---------- */
  const y = $("#y"); if (y) y.textContent = new Date().getFullYear();
  const nav = $("#nav");
  if (nav) {
    const onScroll = () => nav.classList.toggle("scrolled", scrollY > 40);
    addEventListener("scroll", onScroll, { passive: true }); onScroll();
    $("#menuBtn").addEventListener("click", () => document.body.classList.toggle("menu-open"));
    document.querySelectorAll("#menu a").forEach((a) => a.addEventListener("click", () => document.body.classList.remove("menu-open")));
  }

  /* ---------- Links (substitui o Beacons) ---------- */
  const linkHtml = (l) => `
    <a class="link-item${l.destaque ? " featured" : ""}" href="${esc(l.url)}"${ext(l.url)}>
      <span><strong>${esc(l.titulo)}</strong><small>${esc(l.descricao)}</small></span><span class="arrow">→</span>
    </a>`;
  const linksList = $("#links-list");
  if (linksList && C.links) linksList.innerHTML = C.links.map(linkHtml).join("");
  const proc = (C.links || []).find((l) => l.destaque);
  const cta = $("#cta-processo");
  if (cta && proc && proc.url !== "#") cta.href = proc.url;

  /* ---------- Equipe ---------- */
  const teamPhoto = $("#team-photo");
  if (teamPhoto && C.fotoEquipe) teamPhoto.innerHTML = `<div class="team-photo reveal"><img src="${esc(C.fotoEquipe)}" alt="Equipe da Liga de Mercado Financeiro UTFPR" loading="lazy"></div>`;
  const team = $("#team");
  if (team && C.diretoria) {
    team.innerHTML = C.diretoria.map((m) => {
      const av = m.foto ? `<img src="${esc(m.foto)}" alt="${esc(m.nome)}" loading="lazy">` : esc((m.nome || "?").trim()[0]);
      const inner = `<div class="avatar">${av}</div><h4>${esc(m.nome)}</h4><span>${esc(m.cargo)}</span>`;
      return m.linkedin ? `<a class="member reveal" href="${esc(m.linkedin)}" target="_blank" rel="noopener">${inner}</a>` : `<div class="member reveal">${inner}</div>`;
    }).join("");
  }

  /* ---------- LinkedIn ---------- */
  const li = $("#linkedin-feed");
  const liIcon = '<svg viewBox="0 0 24 24"><path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z"/></svg>';
  if (li) {
    if (C.linkedinWidgetId) {
      // Widget automático (SociableKIT): puxa os posts novos sozinho
      li.classList.add("widget");
      li.innerHTML = `<div class="sk-ww-linkedin-page-post" data-embed-id="${esc(C.linkedinWidgetId)}"></div>`;
      const s = document.createElement("script");
      s.src = "https://widgets.sociablekit.com/linkedin-page-posts/widget.js"; s.async = true; s.defer = true;
      document.body.appendChild(s);
    } else {
      li.innerHTML = (C.linkedinFallback || []).map((p) => `
        <article class="news-card reveal">
          <img src="${esc(p.img)}" alt="" loading="lazy">
          <div class="news-body">
            <div class="news-meta">${liIcon}<span>Liga de Mercado Financeiro UTFPR · ${esc(p.data)}</span></div>
            <h3>${esc(p.titulo)}</h3><p>${esc(p.texto)}</p>
            <a class="link-arrow" href="https://www.linkedin.com/company/ligafinanceira/posts/" target="_blank" rel="noopener">Ler no LinkedIn →</a>
          </div>
        </article>`).join("");
    }
  }

  /* ---------- Instagram ---------- */
  const ig = $("#instagram-feed");
  const renderIg = (items) => {
    ig.innerHTML = items.slice(0, 12).map((p) =>
      `<a href="${esc(p.link)}" target="_blank" rel="noopener" class="reveal"><img src="${esc(p.img)}" alt="${esc(p.alt || "Post do Instagram da Liga")}" loading="lazy"></a>`).join("");
    observe();
  };
  if (ig) {
    renderIg(C.instagramFallback || []);
    if (C.instagramFeedUrl) {
      // Feed automático (Behold.so): busca os posts mais recentes
      fetch(C.instagramFeedUrl).then((r) => r.json()).then((d) => {
        const posts = Array.isArray(d) ? d : d.posts || [];
        const items = posts.map((p) => ({
          img: (p.sizes && p.sizes.medium && p.sizes.medium.mediaUrl) || (p.mediaType === "VIDEO" ? p.thumbnailUrl : p.mediaUrl),
          link: p.permalink,
          alt: (p.caption || "").slice(0, 120)
        })).filter((p) => p.img);
        if (items.length) renderIg(items);
      }).catch(() => {});
    }
  }

  /* ---------- Contadores ---------- */
  const countUp = (el) => {
    const end = +el.dataset.count, pre = el.dataset.prefix || "", start = end > 1000 ? end - 40 : 0, t0 = performance.now(), dur = 1600;
    const tick = (t) => {
      const k = Math.min(1, (t - t0) / dur), e = 1 - Math.pow(1 - k, 3);
      el.textContent = pre + Math.round(start + (end - start) * e);
      if (k < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

  /* ---------- Animações ao rolar ---------- */
  const io = "IntersectionObserver" in window ? new IntersectionObserver((es) => es.forEach((e) => {
    if (!e.isIntersecting) return;
    e.target.classList.add("in");
    if (e.target.dataset.count) countUp(e.target);
    io.unobserve(e.target);
  }), { threshold: 0.12 }) : null;
  function observe() {
    document.querySelectorAll(".reveal:not(.in), [data-count]:not(.in)").forEach((el, i) => {
      if (!io) { el.classList.add("in"); if (el.dataset.count) el.textContent = (el.dataset.prefix || "") + el.dataset.count; return; }
      el.style.transitionDelay = (i % 4) * 0.08 + "s";
      io.observe(el);
    });
  }
  observe();
})();
