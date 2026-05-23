/* ==========================================================================
   animations.js
   SPA navigation (no full-page reload on nav clicks) + scroll-reveal +
   masthead scroll-shadow + page progress bar
   ========================================================================== */
'use strict';

// ─── 1. Top progress bar ────────────────────────────────────────────────────
const npBar = document.createElement('div');
npBar.id = 'np-bar';
document.body.insertBefore(npBar, document.body.firstChild);

let npEndTimer = null;
function npStart() {
  clearTimeout(npEndTimer);
  npBar.style.cssText = 'width:0;opacity:1;transition:none';
  npBar.offsetWidth; // force reflow
  npBar.style.cssText = 'width:65%;opacity:1;transition:width 10s cubic-bezier(0.05,0.05,0,1)';
}
function npDone() {
  clearTimeout(npEndTimer);
  npBar.style.cssText = 'width:100%;opacity:1;transition:width 0.12s ease';
  npEndTimer = setTimeout(() => {
    npBar.style.cssText = 'width:100%;opacity:0;transition:opacity 0.35s ease';
  }, 220);
}

// ─── 2. SPA Navigation ──────────────────────────────────────────────────────
const pageWrap = document.getElementById('page-content');
let navBusy = false;

function spNavigate(url) {
  if (navBusy) return;
  navBusy = true;
  npStart();

  // Fade current content out
  pageWrap.style.transition = 'opacity 0.15s ease, transform 0.15s ease';
  pageWrap.style.opacity = '0';
  pageWrap.style.transform = 'translateY(8px)';

  fetch(url)
    .then(r => { if (!r.ok) throw new Error(r.status); return r.text(); })
    .then(html => {
      const doc = new DOMParser().parseFromString(html, 'text/html');
      const newWrap = doc.getElementById('page-content');
      if (!newWrap) { location.href = url; return; }

      // Swap content + meta
      pageWrap.innerHTML = newWrap.innerHTML;
      document.title = doc.title;

      // Sync nav "selected" state
      document.querySelectorAll('.masthead__menu-item').forEach(li => li.classList.remove('selected'));
      doc.querySelectorAll('.masthead__menu-item.selected').forEach(srcLi => {
        const srcHref = srcLi.querySelector('a')?.getAttribute('href');
        if (!srcHref) return;
        document.querySelectorAll('.masthead__menu-item a').forEach(a => {
          if (a.getAttribute('href') === srcHref) {
            a.closest('.masthead__menu-item').classList.add('selected');
          }
        });
      });

      history.pushState({}, '', url);
      window.scrollTo(0, 0);
      npDone();

      // Fade new content in from slight upward offset
      pageWrap.style.transform = 'translateY(-8px)';
      pageWrap.style.transition = 'none';
      pageWrap.offsetWidth; // reflow
      pageWrap.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
      pageWrap.style.opacity = '1';
      pageWrap.style.transform = 'translateY(0)';

      setTimeout(() => {
        // Clear inline styles so CSS hover/other transitions work normally
        pageWrap.style.transition = '';
        pageWrap.style.opacity = '';
        pageWrap.style.transform = '';
        navBusy = false;
        onContentLoaded();
      }, 320);
    })
    .catch(() => { location.href = url; navBusy = false; });
}

// Intercept clicks on top-nav links only (use capture so we beat jQuery)
document.addEventListener('click', function (e) {
  const a = e.target.closest('.greedy-nav .visible-links a');
  if (!a || a.closest('#theme-toggle')) return;
  const href = a.getAttribute('href');
  if (!href || href.startsWith('#') || /^https?:\/\//.test(href)) return;
  if (new URL(href, location.origin).pathname === location.pathname) return;
  e.preventDefault();
  e.stopPropagation();
  spNavigate(href);
}, true);

// Browser back/forward
window.addEventListener('popstate', () => spNavigate(location.pathname));

// Stamp the initial state so popstate can go back to it
history.replaceState({}, '', location.href);

// ─── 3. Masthead scroll shadow ───────────────────────────────────────────────
const masthead = document.querySelector('.masthead');
if (masthead) {
  const syncMastheadClass = () =>
    masthead.classList.toggle('masthead--scrolled', window.scrollY > 20);
  window.addEventListener('scroll', syncMastheadClass, { passive: true });
  syncMastheadClass();
}

// ─── 4. Scroll-reveal ───────────────────────────────────────────────────────
function initReveal() {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      el.classList.remove('sr');
      el.classList.add('sr-visible');
      // Clear the delay so hover transitions are snappy after reveal
      el.addEventListener('transitionend', () => {
        el.style.transitionDelay = '';
      }, { once: true });
      io.unobserve(el);
    });
  }, { threshold: 0, rootMargin: '0px 0px 0px 0px' });

  const items = document.querySelectorAll('.news-list li');
  items.forEach((el, i) => {
    if (el.classList.contains('sr-visible')) return; // already revealed
    el.classList.add('sr');
    el.style.transitionDelay = `${Math.min(i * 0.045, 0.28)}s`;
    io.observe(el);
  });
}

// ─── 5. Wired up after each content load ────────────────────────────────────
function onContentLoaded() {
  initReveal();
}

document.addEventListener('DOMContentLoaded', onContentLoaded);
