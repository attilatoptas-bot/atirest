const http = require('http');
const fs = require('fs'); // Dosya okuma modülü


const sunucu = http.createServer((req, res) => {

  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  let dosyaAdi='';  

  if (req.url === '/') {
    dosyaAdi = 'index.html';
    res.statusCode = 200;
  } else if (req.url === '/hakkimda') {
    dosyaAdi = 'hakkimda.html';
    res.statusCode = 200;
  } else if (req.url === '/iletisim') {
    dosyaAdi = 'iletisim.html';
    res.statusCode = 200;
  } else {
    // Olmayan bir sayfaya girilirse 404 hatası ver
    res.statusCode = 404;
    return res.end('<h1>404 - Sayfa Bulunamadı!</h1><a href="/">Ana Sayfaya Dön</a>');
  }

  // Seçilen HTML dosyasını oku ve ekrana bas
  fs.readFile(dosyaAdi, (hata, veri) => {
    if (hata) {
      res.statusCode = 500;
      res.end('Sunucu hatası oluştu.');
    } else {
      res.end(veri);
    }
  });
});


sunucu.listen(3000, '127.0.0.1', () => {
  console.log('Site yayında! Tarayıcıdan http://localhost:3000 adresine gidin.');
});
