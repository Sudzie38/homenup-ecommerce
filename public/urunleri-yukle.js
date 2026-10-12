/* Admin panelindeki ürünleri ana sayfadaki "Çok satanlar" alanına basar.
   Kayıt yoksa sayfadaki elle yazılmış kartlar olduğu gibi kalır. */
(function () {
  function oku(k) {
    try { return JSON.parse(localStorage.getItem(k)); } catch (e) { return null; }
  }
  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }
  function tl(n) { return Number(n).toLocaleString("tr-TR") + " TL"; }

  var urunler = oku("homenup_urunler");
  var alan = document.querySelector("#urunler .urunler");

  if (alan && urunler && urunler.length) {
    alan.innerHTML = urunler.map(function (u, i) {
      return '<a href="urun.html?id=' + (i + 1) + '" class="urun">' +
        '<div class="kare">' +
        (u.rozet ? '<span class="rozet">' + esc(u.rozet) + '</span>' : '') +
        '<img src="' + esc(u.res[0] || "") + '" alt="' + esc(u.ad) + '" loading="lazy" onerror="this.remove()">' +
        '</div>' +
        '<p class="ad">' + esc(u.ad) + '</p>' +
        '<p class="fiyat">' + (u.eski ? '<span class="eski">' + tl(u.eski) + '</span>' : '') + tl(u.fiyat) + '</p>' +
        '</a>';
    }).join("");
  }

  /* Sepet sayısını üst barda göstericek */
  var sepet = oku("homenup_sepet") || [];
  var adet = sepet.reduce(function (t, k) { return t + k.adet; }, 0);
  var btn = document.querySelector(".sepet");
  if (btn) btn.textContent = "Sepet (" + adet + ")";
})();
