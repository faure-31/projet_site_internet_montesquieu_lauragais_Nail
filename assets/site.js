/* Menu accessible, formulaire de démonstration, page en construction */
(function () {
  var toggle = document.querySelector('.menu-toggle');
  var menu = document.getElementById('menu');
  if (toggle && menu) {
    toggle.addEventListener('click', function () {
      var open = menu.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  function closeAll(except) {
    document.querySelectorAll('.has-sub.open').forEach(function (li) {
      if (li !== except) {
        li.classList.remove('open');
        li.querySelector('.sub-toggle').setAttribute('aria-expanded', 'false');
      }
    });
  }
  document.querySelectorAll('.sub-toggle').forEach(function (b) {
    b.addEventListener('click', function () {
      var li = b.parentNode;
      var willOpen = !li.classList.contains('open');
      closeAll(li);
      li.classList.toggle('open', willOpen);
      b.setAttribute('aria-expanded', willOpen ? 'true' : 'false');
    });
  });
  document.addEventListener('click', function (e) {
    if (!e.target.closest('.has-sub')) { closeAll(); }
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      var o = document.querySelector('.has-sub.open');
      closeAll();
      if (o) { o.querySelector('.sub-toggle').focus(); }
    }
  });

  /* Formulaire de contact : démonstration uniquement, rien n'est envoyé */
  var f = document.getElementById('form-demo');
  if (f) {
    f.addEventListener('submit', function (e) {
      e.preventDefault();
      var m = document.getElementById('form-msg');
      m.hidden = false;
      m.textContent = "Formulaire de démonstration : le message n'a pas été envoyé. Dans la version finale, il sera transmis à la mairie.";
    });
  }

  /* Page « en construction » : affiche le titre demandé */
  var t = document.getElementById('titre-construction');
  if (t) {
    var p = new URLSearchParams(location.search).get('p');
    if (p) {
      t.textContent = p;
      document.title = p + ' - Montesquieu-Lauragais';
      var bc = document.getElementById('bc-courant');
      if (bc) { bc.textContent = p; }
    }
  }
})();
