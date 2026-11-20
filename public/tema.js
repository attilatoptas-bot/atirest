const buton = document.getElementById('tema-degistir');

// Buton metnini mevcut temaya göre ayarla
if (document.documentElement.classList.contains('karanlik-mod') && buton) {
  buton.textContent = '☀️ Aydınlık Mod';
}

// Butona tıklandığında temayı değiştir ve kaydet
if (buton) {
  buton.addEventListener('click', () => {
    document.documentElement.classList.toggle('karanlik-mod');
    
    if (document.documentElement.classList.contains('karanlik-mod')) {
      localStorage.setItem('tema', 'karanlik');
      buton.textContent = '☀️ Aydınlık Mod';
    } else {
      localStorage.setItem('tema', 'aydinlik');
      buton.textContent = '🌙 Karanlık Mod';
    }
  });
}
