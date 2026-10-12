/* HOMENUP — Firebase bağlantısı (admin.html, urun.html ve homen2.html ortak kullanır)
   1) Aşağıdaki firebaseConfig alanını kendi projenin bilgileriyle doldur.
   2) Bu dosyadan ÖNCE firebase-app-compat, firebase-firestore-compat ve
      firebase-auth-compat script'leri yüklenmiş olmalı. */
(function () {
  var firebaseConfig = {
    apiKey: "AIzaSyDD8d_fqaEEqVLaZoHKxTOAfMGinkPVQrM",
    authDomain: "homenup-8c6ce.firebaseapp.com",
    projectId: "homenup-8c6ce",
    appId: "1:785637094317:web:f5bfe1da7c3904d6422724"
  };

  var KEY = "homenup_urunler";
  window.katalog = null;
  if (!window.firebase || firebaseConfig.apiKey.indexOf("BURAYA") === 0) return;

  try {
    firebase.initializeApp(firebaseConfig);
    var ref = firebase.firestore().collection("magaza").doc("katalog");

    window.katalog = {
      auth: firebase.auth(),
      oku: function () {
        return ref.get().then(function (s) { return s.exists ? s.data().liste : null; });
      },
      yaz: function (liste) {
        return ref.set({ liste: JSON.parse(JSON.stringify(liste)) });
      },
      /* Mağaza sayfaları için: sunucudaki listeyi çek, değiştiyse sayfayı bir kez yenile */
      esitle: function () {
        return this.oku().then(function (l) {
          if (!l) return;
          var yeni = JSON.stringify(l);
          if (localStorage.getItem(KEY) !== yeni) {
            localStorage.setItem(KEY, yeni);
            if (!sessionStorage.getItem("hn_yenilendi")) {
              sessionStorage.setItem("hn_yenilendi", "1");
              location.reload();
            }
          } else {
            sessionStorage.removeItem("hn_yenilendi");
          }
        }).catch(function () { /* çevrimdışıysa önbellekteki liste kullanılır */ });
      }
    };
  } catch (e) {
    console.error("Firebase başlatılamadı:", e);
  }
})();
(function () {
  var firebaseConfig = {
    apiKey: "AIzaSyDD8d_fqaEEqVLaZoHKxTOAfMGinkPVQrM",
    authDomain: "homenup-8c6ce.firebaseapp.com",
    projectId: "homenup-8c6ce",
    appId: "1:785637094317:web:3692bcc5465a4114422724"
  };

  var KEY = "homenup_urunler";
  window.katalog = null;
  if (!window.firebase || firebaseConfig.apiKey.indexOf("BURAYA") === 0) return;

  try {
    firebase.initializeApp(firebaseConfig);
    var ref = firebase.firestore().collection("magaza").doc("katalog");

    window.katalog = {
      auth: firebase.auth(),

      oku: function () {
        return ref.get().then(function (s) {
          return s.exists ? s.data().liste : null;
        });
      },

      yaz: function (liste) {
        return ref.set({
          liste: JSON.parse(JSON.stringify(liste))
        });
      },

      esitle: function () {
        return this.oku().then(function (l) {
          if (!l) return;

          var yeni = JSON.stringify(l);

          if (localStorage.getItem(KEY) !== yeni) {
            localStorage.setItem(KEY, yeni);

            if (!sessionStorage.getItem("hn_yenilendi")) {
              sessionStorage.setItem("hn_yenilendi", "1");
              location.reload();
            }
          } else {
            sessionStorage.removeItem("hn_yenilendi");
          }
        }).catch(function () {
          /* çevrimdışıysa önbellekteki liste kullanılır */
        });
      }
    };
  } catch (e) {
    console.error("Firebase başlatılamadı:", e);
  }
})();
