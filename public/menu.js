(function(){
  var btn = document.querySelector('.hamburger');
  var menu = document.getElementById('menu');
  if(btn && menu){
    btn.addEventListener('click', function(){
      var acik = menu.classList.toggle('acik');
      btn.setAttribute('aria-expanded', acik);
      btn.setAttribute('aria-label', acik ? 'Menüyü kapat' : 'Menüyü aç');
    });
    document.addEventListener('keydown', function(e){
      if(e.key === 'Escape'){ menu.classList.remove('acik'); btn.setAttribute('aria-expanded', false); }
    });
  }
  // Bulunduğun sayfanın sekmesini işaretle
  document.querySelectorAll('.menu a').forEach(function(a){
    if(a.href === location.href){ a.setAttribute('aria-current','page'); }
  });
})();
