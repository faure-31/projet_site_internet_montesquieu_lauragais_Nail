/* Recherche simple dans les pages de la démonstration */
(function () {
  function norm(s) {
    return (s || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
  }
  var input = document.getElementById('q');
  var list = document.getElementById('results');
  var info = document.getElementById('results-info');
  if (!input || !list || !window.SEARCH_INDEX) { return; }

  function run(q) {
    list.textContent = '';
    var words = norm(q).split(/\s+/).filter(Boolean);
    if (!words.length) { info.textContent = ''; return; }
    var hits = window.SEARCH_INDEX.filter(function (p) {
      var hay = norm(p.t + ' ' + p.d + ' ' + p.s);
      return words.every(function (w) { return hay.indexOf(w) !== -1; });
    });
    info.textContent = hits.length + (hits.length > 1 ? ' pages trouvées' : ' page trouvée');
    hits.forEach(function (p) {
      var li = document.createElement('li');
      var a = document.createElement('a');
      a.href = p.u; a.textContent = p.t;
      var d = document.createElement('p');
      d.textContent = p.d || p.s;
      li.appendChild(a); li.appendChild(d); list.appendChild(li);
    });
  }

  var q0 = new URLSearchParams(location.search).get('q') || '';
  input.value = q0;
  run(q0);
  document.getElementById('search-form').addEventListener('submit', function (e) {
    e.preventDefault();
    history.replaceState(null, '', '?q=' + encodeURIComponent(input.value));
    run(input.value);
  });
})();
