const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/hakkimda', (req, res) => {
  res.sendFile(path.join(__dirname, 'hakkimda.html'));
});

app.get('/iletisim', (req, res) => {
  res.sendFile(path.join(__dirname, 'iletisim.html'));
});

app.post('/gonder', (req, res) => {
  const gonderenAd = req.body.ad;
  const gonderenMesaj = req.body.mesaj;
  const tarih = new Date().toLocaleString('tr-TR');

  const kayitSatiri = `[${tarih}] ${gonderenAd}: ${gonderenMesaj}\n-------------------------\n`;

  fs.appendFile('mesajlar.txt', kayitSatiri, 'utf8', (hata) => {
    if (hata) {
      return res.status(500).send('Mesaj kaydedilirken bir hata oluştu.');
    }
    res.send(sayfaSablonu(`<h1>Teşekkürler ${gonderenAd}!</h1><p>Mesajınız kaydedildi.</p><a href="/">Ana Sayfa</a>`));
    });
});

// Gizli Mesajlar Sayfası
app.get('/mesajlar', (req, res) => {
  // Basit şifre kontrolü (Örn: /mesajlar?sifre=1234)
  if (req.query.sifre !== '1234') {
    return res.status(403).send('<h1>Erişim Reddedildi!</h1><p>Bu sayfayı görmek için doğru şifreyi girmelisiniz.</p>');
  }

  // mesajlar.txt dosyasını oku
  fs.readFile('mesajlar.txt', 'utf8', (hata, veri) => {
    // Henüz hiç mesaj gönderilmemişse (dosya yoksa)
    if (hata) {
      return res.send('<h1>Gelen Mesajlar</h1><p>Henüz kaydedilmiş bir mesaj yok.</p><a href="/">Ana Sayfa</a>');
    }

    // <pre> etiketi metin dosyasındaki alt satır boşluklarını korur
    res.send(`
      <h1>Gelen Mesajlar</h1>
      <pre style="background:#f4f4f4; padding:15px; border-radius:5px;">${veri}</pre>
      <a href="/">Ana Sayfaya Dön</a>
    `);
  });
});

app.use((req, res) => {
  res.status(404).send('<h1>404 - Sayfa Bulunamadı!</h1><a href="/">Ana Sayfaya Dön</a>');
});


// app.js içinde ortak sayfa şablonu fonksiyonu oluşturun
function sayfaSablonu(icerik) {
  return `
    <!DOCTYPE html>
    <html lang="tr">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <script>
        if (localStorage.getItem('tema') === 'karanlik') {
          document.documentElement.classList.add('karanlik-mod');
        }
      </script>
      <link rel="stylesheet" href="/style.css">
    </head>
    <body>
      <nav>
        <a href="/">Ana Sayfa</a>
        <a href="/hakkimda">Hakkımda</a>
        <a href="/iletisim">İletişim</a>
        <button id="tema-degistir" class="tema-butonu">🌙 Karanlık Mod</button>
      </nav>
      <div class="kutu">${icerik}</div>
      <script src="/tema.js"></script>
    </body>
    </html>
  `;
}

app.listen(3000, () => {
  console.log(`Sunucu ${PORT} portunda yayında`);
});
