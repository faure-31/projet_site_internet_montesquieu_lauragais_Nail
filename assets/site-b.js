/* Thème B : taille du texte, contraste, défilements */
(function () {
  var root = document.documentElement;

  function store(k, v) { try { localStorage.setItem(k, v); } catch (e) { /* sans effet */ } }
  function read(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }

  /* Taille du texte */
  var sizes = [].slice.call(document.querySelectorAll('.b-size'));
  function setSize(v) {
    root.style.fontSize = v + '%';
    sizes.forEach(function (b) { b.setAttribute('aria-pressed', b.dataset.size === String(v) ? 'true' : 'false'); });
    store('mq-size', v);
  }
  sizes.forEach(function (b) { b.addEventListener('click', function () { setSize(b.dataset.size); }); });
  var saved = read('mq-size');
  if (saved && ['100', '112.5', '125'].indexOf(saved) !== -1) { setSize(saved); }

  /* Contraste renforcé */
  var hc = document.getElementById('btn-contrast');
  function setContrast(on) {
    root.classList.toggle('hc', on);
    if (hc) { hc.setAttribute('aria-pressed', on ? 'true' : 'false'); }
    store('mq-contrast', on ? '1' : '0');
  }
  if (hc) { hc.addEventListener('click', function () { setContrast(!root.classList.contains('hc')); }); }
  if (read('mq-contrast') === '1') { setContrast(true); }

  /* Défilement des événements */
  document.querySelectorAll('[data-scroller]').forEach(function (box) {
    var track = box.querySelector('.b-track');
    box.querySelectorAll('[data-dir]').forEach(function (b) {
      b.addEventListener('click', function () {
        track.scrollBy({ left: Number(b.dataset.dir) * track.clientWidth * 0.8, behavior: 'smooth' });
      });
    });
  });

  /* Publications : couvertures */
  var pub = document.getElementById('pub');
  if (pub) {
    var slides = [].slice.call(pub.querySelectorAll('.b-cover'));
    var dots = [].slice.call(pub.querySelectorAll('.b-dots button'));
    var title = document.getElementById('pub-title');
    var link = document.getElementById('pub-link');
    var i = 0;
    var show = function (n) {
      i = (n + slides.length) % slides.length;
      slides.forEach(function (el, k) {
        var d = (k - i + slides.length) % slides.length;
        var st = d === 0 ? 'is-active' : (d === 1 ? 'is-next' : (d === slides.length - 1 ? 'is-prev' : 'is-hidden'));
        el.className = 'b-cover ' + st;
        el.setAttribute('aria-hidden', d === 0 ? 'false' : 'true');
      });
      dots.forEach(function (b, k) { b.setAttribute('aria-current', k === i ? 'true' : 'false'); });
      var a = slides[i];
      title.textContent = a.dataset.title;
      if (a.dataset.href) { link.href = a.dataset.href; link.hidden = false; } else { link.hidden = true; }
    };
    pub.querySelectorAll('[data-pub]').forEach(function (b) {
      b.addEventListener('click', function () { show(i + Number(b.dataset.pub)); });
    });
    dots.forEach(function (b, k) { b.addEventListener('click', function () { show(k); }); });
    show(0);
  }
})();
