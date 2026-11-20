/* Configuración: reemplazá estos dos valores con los de tu cuenta de AdSense */
(function () {
  var CLIENT = 'ca-pub-XXXXXXXXXXXXXXXX', SLOT = '0000000000', KEY = 'ads-consent';
  var ready = CLIENT.indexOf('XXXX') < 0 && SLOT !== '0000000000';
  function ads(limited) {
    if (!ready) return;
    window.adsbygoogle = window.adsbygoogle || [];
    if (limited) window.adsbygoogle.requestNonPersonalizedAds = 1;
    document.querySelectorAll('.ad-slot').forEach(function (el) {
      if (el.getAttribute('data-done')) return; el.setAttribute('data-done', '1');
      el.innerHTML = '<ins class="adsbygoogle" style="display:block" data-ad-client="' + CLIENT + '" data-ad-slot="' + SLOT + '" data-ad-format="auto" data-full-width-responsive="true"></ins>';
      try { window.adsbygoogle.push({}) } catch (e) { }
    });
  }
  function get() { try { return localStorage.getItem(KEY) } catch (e) { return null } }
  function pick(v) {
    try { localStorage.setItem(KEY, v) } catch (e) { }
    var b = document.getElementById('cb'); if (b) b.remove();
    ads(v === 'limited');
  }
  function banner() {
    if (document.getElementById('cb')) return;
    var st = document.createElement('style');
    st.textContent = '#cb{position:fixed;left:12px;right:12px;bottom:12px;max-width:640px;margin:auto;padding:14px 16px;background:#2a1c14;color:#f5ece3;border:1px solid #5a4233;border-radius:8px;font:14px/1.45 proxima-nova,\"Proxima Nova\",Montserrat,system-ui,sans-serif;z-index:9999;box-shadow:0 4px 18px rgba(0,0,0,.25)}#cb p{margin:0 0 10px}#cb button{font:inherit;margin-right:8px;padding:7px 12px;border-radius:6px;border:1px solid #5a4233;background:#2a1c14;color:#f5ece3;cursor:pointer}#cb button.p{background:#f0b66b;color:#2b1b12;border-color:#f0b66b}#cb a{color:#f0b66b}';
    document.head.appendChild(st);
    var d = document.createElement('div'); d.id = 'cb'; d.setAttribute('role', 'dialog'); d.setAttribute('aria-label', 'Preferencias de cookies');
    d.innerHTML = '<p>Este sitio usa cookies de Google AdSense para mostrar anuncios. Podés aceptar anuncios personalizados o limitarte a anuncios no personalizados. <a href="privacidad.html">Más información</a></p><button class="p" id="c1">Aceptar</button><button id="c2">Solo no personalizados</button>';
    document.body.appendChild(d);
    document.getElementById('c1').onclick = function () { pick('all') };
    document.getElementById('c2').onclick = function () { pick('limited') };
  }
  window.resetConsent = function () { try { localStorage.removeItem(KEY) } catch (e) { } if (ready) banner() };
  function init() { var c = get(); if (c) ads(c === 'limited'); else if (ready) banner() }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
