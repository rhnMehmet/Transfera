# Mustafa Alican Kutsal'ın Mobil Frontend Görevleri

**Mobile Front-end Demo Videosu:** [Mobil Frontend Video](https://youtu.be/iFyRsv-fSYs)

Mobil frontend, web uygulamasındaki iş akışlarının telefon ekranına uyarlanmış halidir. Aşağıdaki maddeler, Mustafa Alican Kutsal'ın web frontend görevlerinin mobil arayüz tarafındaki karşılığını aynı formatta özetler.

## 1. Üye Olma (Kayıt) Ekranı

- **API Endpoint:** `POST /users/register`
- **Görev:** Kullanıcı kayıt işlemi için mobil ekran tasarımı ve implementasyonu
- **UI Bileşenleri:**
  - Ad input alanı
  - Soyad input alanı
  - E-posta input alanı
  - Şifre input alanı
  - `Kayıt Ol` butonu
  - `Giriş` / `Kayıt` sekme geçişi
  - Loading göstergesi
- **Form Validasyonu:**
  - E-posta format kontrolü
  - Boş alan kontrolü
  - Şifre alanının boş geçilmemesi
- **Kullanıcı Deneyimi:**
  - Başarılı kayıt sonrası giriş akışına dönme veya aktif oturuma geçme
  - Hata mesajlarını formun altında gösterme
  - Mobilde tek ekranda sade kayıt deneyimi
- **Teknik Detaylar:**
  - Auth ekranında tab tabanlı giriş/kayıt yapısı
  - Form state, error state ve loading state yönetimi
  - Keyboard uyumlu düzen

## 2. Şifre Değiştirme Ekranı

- **API Endpoint:** `PUT /users/{id}/password`
- **Görev:** Mobil profil ekranında kullanıcıya güvenli şifre değiştirme arayüzü sunmak
- **UI Bileşenleri:**
  - Mevcut şifre alanı
  - Yeni şifre alanı
  - `Şifreyi Değiştir` butonu
  - Sonuç mesajı alanı
- **Form Validasyonu:**
  - Boş alan kontrolü
  - Yeni şifrenin kısa olmamasını sağlama
  - Kullanıcıya hatalı girişte uyarı verme
- **Kullanıcı Deneyimi:**
  - Başarılı güncellemede onay mesajı
  - Hata durumunda açıklayıcı geri bildirim
  - Profil ekranı içinde güvenlik işlemini ayrı kartta yapabilme
- **Teknik Detaylar:**
  - Yetkili kullanıcıya ait token ile işlem
  - Profil state'inden kullanıcı ID alma
  - Submit sonrası form state temizleme

## 3. Favori Oyuncu Ekleme Ekranı

- **API Endpoint:** `POST /users/{id}/favorites/players`
- **Görev:** Mobil oyuncu detay ekranında oyuncuyu favorilere ekleme deneyimini tasarlamak
- **UI Bileşenleri:**
  - Oyuncu detay hero alanı
  - `Favori oyuncu ekle` butonu
  - Favoriler sekmesinde oyuncu listesi
- **Kullanıcı Deneyimi:**
  - Tek butonla favoriye ekleme
  - Favoriler ekranında sonucu hemen görme
  - Aynı oyuncu tekrar eklenirse uygun hata/uyarı akışı
- **Teknik Detaylar:**
  - Kullanıcı favori state'inin güncellenmesi
  - Detay ekranı ile favori listesi arasında senkronizasyon
  - API sonucu sonrası UI refresh

## 4. Takımları Listeleme Ekranı

- **API Endpoint:** `GET /teams`
- **Görev:** Mobil ligler ekranında takımları listeleyen arayüzü hazırlamak
- **UI Bileşenleri:**
  - Lig seçim alanı
  - Takım kartları
  - Takım logosu
  - Takım adı
  - Kuruluş yılı
  - `Detay` ve `Ekle` butonları
- **Kullanıcı Deneyimi:**
  - Lig bazlı takım gezintisi
  - Mobilde rahat okunur kart düzeni
  - Takım detayına hızlı geçiş
- **Teknik Detaylar:**
  - Lig değiştikçe yeni takım listesini yükleme
  - Liste ve loading state yönetimi
  - Favori ekleme ile ortak kullanım

## 5. Takım Detayı Görüntüleme Ekranı

- **API Endpoint:** `GET /teams/{teamId}`
- **Görev:** Mobil uygulamada seçilen takımın detaylı bilgilerini sunan ekranı geliştirmek
- **UI Bileşenleri:**
  - Takım profil kartı
  - Ülke / lig / kuruluş yılı kartları
  - Kadro listesi
  - Transfer geçmişi bölümü
  - AI kulüp profili paneli
  - `Geri` butonu
- **Kullanıcı Deneyimi:**
  - Takım bilgilerini tek ekranda inceleyebilme
  - Kadrodan oyuncu detaya geçebilme
  - Uzun içerikte scroll ile rahat gezinme
- **Teknik Detaylar:**
  - Route parametreleriyle takım bağlamını koruma
  - Detay verisini normalize etme
  - Tek ana istekle kadro ve transfer geçmişini yönetme

## 6. Favori Oyuncu Silme Ekranı

- **API Endpoint:** `DELETE /users/{id}/favorites/players/{playerId}`
- **Görev:** Mobil favoriler ekranında favori oyuncuyu listeden kaldırma arayüzünü geliştirmek
- **UI Bileşenleri:**
  - Favori oyuncu kartı
  - `Sil` butonu
  - `Detay` butonu
  - Arama alanı
- **Kullanıcı Deneyimi:**
  - Liste içinden hızlı kaldırma
  - Silme sonrası listenin anında güncellenmesi
  - Oyuncu detay ekranına geri dönebilme
- **Teknik Detaylar:**
  - Favori oyuncu listesinin state ile yönetilmesi
  - Silme sonrası local session güncelleme
  - Kart bileşeninde aksiyon ayrıştırması

## 7. Oyuncu Transfer Geçmişi Ekranı

- **API Endpoint:** `GET /players/{playerId}/transfers`
- **Görev:** Mobil oyuncu detay ekranında transfer geçmişini görsel olarak sunmak
- **UI Bileşenleri:**
  - Transfer kartları
  - Tarih alanı
  - Kaynak kulüp / hedef kulüp bilgisi
  - Ücret veya işlem tipi alanı
- **Kullanıcı Deneyimi:**
  - Oyuncunun kariyer akışını takip edebilme
  - Kronolojik ve okunabilir sıralama
  - Boş geçmişte anlaşılır empty state
- **Teknik Detaylar:**
  - Oyuncu detay ekranı içinde gömülü liste
  - Gelen veriyi mobil kart yapısına çevirme
  - Tarih/fiyat alanlarını formatlama

## 8. Oyuncu Değer Tahmini Ekranı

- **API Endpoint:** `GET /ai/player-value/{playerId}`
- **Görev:** Mobil oyuncu detay ekranında AI destekli değer tahmini alanını tasarlamak
- **UI Bileşenleri:**
  - Mevcut değer kartı
  - 12 aylık projeksiyon kartı
  - Değer aralığı alanı
  - Trend ve AI özet blokları
- **Kullanıcı Deneyimi:**
  - Oyuncunun gelecekteki değerini kolay yorumlama
  - Kart tabanlı temiz görünüm
  - AI verisini mobilde sade sunma
- **Teknik Detaylar:**
  - Oyuncu değeri state'ini ayrı yönetme
  - API sonucu ile UI kartlarını eşleme
  - Eksik veri için fallback kullanma

## 9. Profil Güncelleme Ekranı

- **API Endpoint:** `PUT /users/{id}`
- **Görev:** Mobil profil ekranında kullanıcı bilgilerinin düzenlenmesini sağlayan arayüzü hazırlamak
- **UI Bileşenleri:**
  - Ad alanı
  - Soyad alanı
  - E-posta alanı
  - `Profili Güncelle` butonu
  - Sonuç mesajı alanı
- **Form Validasyonu:**
  - Boş alan kontrolü
  - E-posta format kontrolü
  - Geçersiz veri girişinde uyarı
- **Kullanıcı Deneyimi:**
  - Güncelleme sonrası yeni bilgilerin hemen görünmesi
  - Başarı ve hata mesajlarının net verilmesi
  - Profil ekranı içinde tek noktadan düzenleme
- **Teknik Detaylar:**
  - Kullanıcı state'ini güncelleme
  - Form verisini backend request body ile eşleme
  - Session içindeki kullanıcı bilgisini senkron tutma
