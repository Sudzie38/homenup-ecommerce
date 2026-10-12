/* =====================================================
   HOMENUP – Ortak Giriş / Kayıt Modalı
   Her sayfada </body>'den önce şu 3 satırla eklenir:
   <script src="https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js"></script>
   <script src="https://www.gstatic.com/firebasejs/10.12.2/firebase-auth-compat.js"></script>
   <script src="hesap.js"></script>
   ===================================================== */
(function(){

  /* ---------- FIREBASE ---------- */
  var firebaseConfig = {
    apiKey: "AIzaSyDD8d_fqaEEqVLaZoHKxTOAfMGinkPVQrM",
    authDomain: "homenup-8c6ce.firebaseapp.com",
    projectId: "homenup-8c6ce",
    appId: "1:785637094317:web:3692bcc5465a4114422724"
  };
  if(!firebase.apps.length){ firebase.initializeApp(firebaseConfig); }
  var auth = firebase.auth();

  /* ---------- CSS ---------- */
  var css = `
  .modal-arka{--m-kagit:var(--kagit,#fff);--m-zemin:var(--zemin,#F3F3F1);--m-yazi:var(--murekkep,#16181B);--m-soluk:var(--soluk,#6E7278);--m-cizgi:var(--cizgi,#E2E2DE);--m-vurgu:var(--vurgu,#1F4B43);--m-vurgu-yazi:var(--vurgu-yazi,#fff);
    position:fixed;inset:0;z-index:9999;background:rgba(22,24,27,.55);-webkit-backdrop-filter:blur(4px);backdrop-filter:blur(4px);display:flex;align-items:center;justify-content:center;padding:20px;opacity:0;visibility:hidden;transition:opacity .2s ease,visibility .2s ease;font-family:"Instrument Sans",-apple-system,"Segoe UI",Roboto,sans-serif;line-height:1.5}
  .modal-arka *{box-sizing:border-box}
  .modal-arka.acik{opacity:1;visibility:visible}
  .modal-arka .modal{width:100%;max-width:400px;background:var(--m-kagit);color:var(--m-yazi);border:1px solid var(--m-cizgi);border-radius:8px;padding:32px 28px 28px;position:relative;transform:translateY(12px);transition:transform .2s ease;max-height:100%;overflow-y:auto}
  .modal-arka.acik .modal{transform:translateY(0)}
  .modal-kapat{position:absolute;top:12px;right:12px;width:34px;height:34px;border:0;background:transparent;color:var(--m-soluk);font-size:22px;line-height:1;cursor:pointer;border-radius:50%}
  .modal-kapat:hover{background:var(--m-zemin);color:var(--m-yazi)}
  .modal-logo{font-family:"Instrument Serif",Georgia,serif;font-weight:400;font-size:30px;letter-spacing:-.01em;margin:0 0 4px}
  .modal-alt{color:var(--m-soluk);font-size:14px;margin:0 0 22px}
  .sekmeler{display:flex;border-bottom:1px solid var(--m-cizgi);margin-bottom:22px}
  .sekme{flex:1;padding:10px 0;background:none;border:0;border-bottom:2px solid transparent;margin-bottom:-1px;font:inherit;font-size:15px;color:var(--m-soluk);cursor:pointer}
  .sekme.aktif{color:var(--m-yazi);border-bottom-color:var(--m-vurgu);font-weight:500}
  .alan{margin-bottom:14px}
  .alan label{display:block;font-size:13px;font-weight:500;margin-bottom:6px}
  .alan input{width:100%;padding:12px 14px;font:inherit;font-size:16px;background:var(--m-kagit);color:var(--m-yazi);border:1px solid var(--m-cizgi);border-radius:4px}
  .alan input:focus{outline:none;border-color:var(--m-vurgu);box-shadow:0 0 0 3px color-mix(in srgb,var(--m-vurgu) 20%,transparent)}
  .alan small{display:block;margin-top:6px;font-size:12px;color:var(--m-soluk)}
  .modal-btn{width:100%;padding:13px;border:0;border-radius:4px;background:var(--m-vurgu);color:var(--m-vurgu-yazi);font:inherit;font-size:15px;font-weight:500;cursor:pointer;margin-top:4px}
  .modal-btn:hover{filter:brightness(1.08)}
  .modal-btn:disabled{opacity:.6;cursor:wait}
  .modal-btn.ikincil{background:transparent;color:var(--m-yazi);border:1px solid var(--m-cizgi);display:flex;align-items:center;justify-content:center;gap:10px}
  .modal-btn.ikincil:hover{background:var(--m-zemin);filter:none}
  .ayrac{display:flex;align-items:center;gap:12px;margin:18px 0;color:var(--m-soluk);font-size:13px}
  .ayrac::before,.ayrac::after{content:"";flex:1;height:1px;background:var(--m-cizgi)}
  .mesaj{display:none;font-size:14px;padding:10px 12px;border-radius:4px;margin-bottom:14px;background:var(--m-zemin);border:1px solid var(--m-cizgi)}
  .mesaj.goster{display:block}
  .mesaj.hata{color:#B3261E;border-color:#B3261E}
  .hesap-bilgi{text-align:center}
  .hesap-bilgi .eposta{font-weight:500;word-break:break-all;margin:6px 0 22px}
  .gizli{display:none!important}
  .hesap{border:1px solid var(--cizgi,#E2E2DE);border-radius:999px;padding:7px 16px;font-size:14px;white-space:nowrap;background:transparent;color:inherit;cursor:pointer;font-family:inherit;flex-shrink:0;max-width:200px;overflow:hidden;text-overflow:ellipsis}
  .hesap:hover{background:var(--zemin,#F3F3F1)}
  .hesap.yuzen{position:fixed;top:12px;right:12px;z-index:9000;background:var(--kagit,#fff)}
  `;
  var st = document.createElement("style");
  st.textContent = css;
  document.head.appendChild(st);

  /* ---------- HTML ---------- */
  var html = `
  <div class="modal-arka" id="hesapModal" role="dialog" aria-modal="true" aria-labelledby="modalBaslik">
    <div class="modal">
      <button class="modal-kapat" type="button" data-kapat aria-label="Kapat">&times;</button>

      <div id="formGorunum">
        <h2 class="modal-logo" id="modalBaslik">HOMENUP</h2>
        <p class="modal-alt" id="modalAlt">Hesabına giriş yap.</p>
        <div class="sekmeler">
          <button class="sekme aktif" type="button" id="sekmeGiris">Giriş Yap</button>
          <button class="sekme" type="button" id="sekmeKayit">Kayıt Ol</button>
        </div>
        <div class="mesaj" id="modalMesaj"></div>
        <div class="alan">
          <label for="mEmail">E-posta</label>
          <input type="email" id="mEmail" autocomplete="email" placeholder="ornek@mail.com">
        </div>
        <div class="alan">
          <label for="mSifre">Şifre</label>
          <input type="password" id="mSifre" autocomplete="current-password" placeholder="Şifren">
          <small id="sifreIpucu" class="gizli">En az 12 karakter olmalı.</small>
        </div>
        <button class="modal-btn" type="button" id="anaBtn">Giriş Yap</button>
        <div class="ayrac">veya</div>
        <button class="modal-btn ikincil" type="button" id="googleBtn">
          <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true"><path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9.1 3.6l6.8-6.8C35.8 2.4 30.3 0 24 0 14.6 0 6.5 5.4 2.6 13.2l7.9 6.1C12.4 13.6 17.7 9.5 24 9.5z"/><path fill="#4285F4" d="M46.5 24.5c0-1.6-.1-3.1-.4-4.5H24v9h12.7c-.6 3-2.3 5.5-4.8 7.2l7.5 5.8c4.4-4.1 7.1-10.1 7.1-17.5z"/><path fill="#FBBC05" d="M10.5 28.7A14.5 14.5 0 0 1 9.5 24c0-1.6.3-3.2.8-4.7l-7.9-6.1A24 24 0 0 0 0 24c0 3.9.9 7.5 2.6 10.8l7.9-6.1z"/><path fill="#34A853" d="M24 48c6.5 0 11.9-2.1 15.9-5.8l-7.5-5.8c-2.1 1.4-4.9 2.3-8.4 2.3-6.3 0-11.6-4.1-13.5-9.8l-7.9 6.1C6.5 42.6 14.6 48 24 48z"/></svg>
          Google ile devam et
        </button>
      </div>

      <div id="hesapGorunum" class="hesap-bilgi gizli">
        <h2 class="modal-logo">Hesabım</h2>
        <p class="modal-alt">Şu hesapla giriş yapıldı:</p>
        <div class="eposta" id="hesapEposta"></div>
        <button class="modal-btn ikincil" type="button" id="cikisBtn">Çıkış Yap</button>
      </div>
    </div>
  </div>`;

  function baslat(){
    var kap = document.createElement("div");
    kap.innerHTML = html;
    document.body.appendChild(kap.firstElementChild);

    var modal = document.getElementById("hesapModal");
    var hesapBtn = document.getElementById("hesapBtn");
    var aktifSekme = "giris";

    /* Sayfada #hesapBtn yoksa sağ üstte yüzen buton oluştur */
    if(!hesapBtn){
      hesapBtn = document.createElement("button");
      hesapBtn.id = "hesapBtn";
      hesapBtn.className = "hesap yuzen";
      hesapBtn.textContent = "Giriş Yap";
      document.body.appendChild(hesapBtn);
    }
    hesapBtn.removeAttribute("onclick");
    hesapBtn.addEventListener("click", hesapPenceresi);

    function $(id){ return document.getElementById(id); }

    function hesapPenceresi(){
      var user = auth.currentUser;
      $("formGorunum").classList.toggle("gizli", !!user);
      $("hesapGorunum").classList.toggle("gizli", !user);
      if(user){ $("hesapEposta").textContent = user.email || ""; }
      mesajGoster("");
      modal.classList.add("acik");
      if(!user){ setTimeout(function(){ $("mEmail").focus(); }, 150); }
    }
    window.hesapPenceresi = hesapPenceresi;

    function modalKapat(){ modal.classList.remove("acik"); }

    function mesajGoster(metin){
      var m = $("modalMesaj");
      m.textContent = metin || "";
      m.className = "mesaj" + (metin ? " goster hata" : "");
    }

    function sekmeDegistir(hangi){
      aktifSekme = hangi;
      var kayit = hangi === "kayit";
      $("sekmeGiris").classList.toggle("aktif", !kayit);
      $("sekmeKayit").classList.toggle("aktif", kayit);
      $("anaBtn").textContent = kayit ? "Hesap Oluştur" : "Giriş Yap";
      $("modalAlt").textContent = kayit ? "Yeni hesap oluştur." : "Hesabına giriş yap.";
      $("sifreIpucu").classList.toggle("gizli", !kayit);
      $("mSifre").autocomplete = kayit ? "new-password" : "current-password";
      mesajGoster("");
    }

    function hataMetni(error){
      switch(error.code){
        case "auth/email-already-in-use": return "Bu e-posta adresi zaten kayıtlı.";
        case "auth/invalid-email": return "Geçerli bir e-posta adresi gir.";
        case "auth/weak-password": return "Şifre çok zayıf. En az 12 karakter kullan.";
        case "auth/invalid-credential":
        case "auth/wrong-password":
        case "auth/user-not-found": return "E-posta veya şifre yanlış.";
        case "auth/too-many-requests": return "Çok fazla deneme yapıldı. Biraz sonra tekrar dene.";
        case "auth/network-request-failed": return "Bağlantı hatası. İnternetini kontrol et.";
        default: return "Bir hata oluştu: " + error.message;
      }
    }

    function formGonder(){
      var email = $("mEmail").value.trim();
      var sifre = $("mSifre").value;
      var btn = $("anaBtn");

      if(!email || !sifre){ mesajGoster("E-posta ve şifre gerekli."); return; }
      if(aktifSekme === "kayit" && sifre.length < 12){
        mesajGoster("Şifre en az 12 karakter olmalıdır."); return;
      }

      btn.disabled = true;
      var islem = aktifSekme === "kayit"
        ? auth.createUserWithEmailAndPassword(email, sifre)
        : auth.signInWithEmailAndPassword(email, sifre);

      islem.then(function(){
        btn.disabled = false;
        $("mSifre").value = "";
        modalKapat();
      }).catch(function(error){
        console.error(error);
        btn.disabled = false;
        mesajGoster(hataMetni(error));
      });
    }

    function googleIleGiris(){
      auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(modalKapat).catch(function(error){
        if(error.code === "auth/popup-closed-by-user" || error.code === "auth/cancelled-popup-request") return;
        console.error(error);
        mesajGoster(hataMetni(error));
      });
    }

    function cikisYap(){
      auth.signOut().then(modalKapat).catch(function(error){
        console.error(error);
        alert("Çıkış yapılırken hata oluştu.");
      });
    }

    /* Olaylar */
    modal.addEventListener("click", function(e){ if(e.target === modal) modalKapat(); });
    modal.querySelector("[data-kapat]").addEventListener("click", modalKapat);
    $("sekmeGiris").addEventListener("click", function(){ sekmeDegistir("giris"); });
    $("sekmeKayit").addEventListener("click", function(){ sekmeDegistir("kayit"); });
    $("anaBtn").addEventListener("click", formGonder);
    $("googleBtn").addEventListener("click", googleIleGiris);
    $("cikisBtn").addEventListener("click", cikisYap);
    document.addEventListener("keydown", function(e){
      if(e.key === "Escape") modalKapat();
      if(e.key === "Enter" && modal.classList.contains("acik") && e.target.closest && e.target.closest(".alan")) formGonder();
    });

    /* Buton yazısını oturum durumuna göre güncelle */
    auth.onAuthStateChanged(function(user){
      hesapBtn.textContent = user ? (user.email || "Hesabım") : "Giriş Yap";
    });
  }

  if(document.readyState === "loading"){
    document.addEventListener("DOMContentLoaded", baslat);
  } else {
    baslat();
  }
})();
