# İbrahim Mert Bozdoğan'ın Mobil Frontend Görevleri

**Mobile Front-end Demo Videosu:** [Mobil Frontend video](https://youtu.be/YsfaX9PBtG8)

Mobil frontend, Transfera projesinin Expo tabanlı istemcisidir. Aşağıdaki maddeler, İbrahim Mert Bozdoğan'ın web frontend görevlerinin mobil uygulamadaki ekran ve kullanıcı deneyimi karşılığını açıklar.

## 1. Yorum Güncelleme Ekranı

- **API Endpoint:** `PUT /comments/{commentId}`
- **Görev:** Kullanıcının mobil uygulamada yazdığı yorumu düzenleyebilmesini sağlayan arayüzü geliştirmek
- **UI Bileşenleri:**
  - Düzenlenebilir yorum kartı
  - `Güncelle` butonu
  - Metin giriş alanı
  - `İptal` akışı
- **Form Validasyonu:**
  - Boş yorum gönderimini engelleme
  - İçeriğin anlamlı uzunlukta olmasını kontrol etme
- **Kullanıcı Deneyimi:**
  - Profil ekranında kendi yorumlarını görüp düzenleyebilme
  - Admin kullanıcı detayında yorum yönetimi
  - Güncelleme sonrası anında liste yenilenmesi
- **Teknik Detaylar:**
  - Yorum state yönetimi
  - Inline edit akışı
  - Hata yönetimi ve geri bildirim mesajları

## 2. Kullanıcı Girişi (Login) Ekranı

- **API Endpoint:** `POST /users/login`
- **Görev:** Mobil uygulamanın giriş ekran tasarımını ve kullanıcı doğrulama akışını hazırlamak
- **UI Bileşenleri:**
  - E-posta input alanı
  - Şifre input alanı
  - `Giriş Yap` butonu
  - `Kayıt Ol` sekmesi / geçişi
  - Hata mesajı alanı
  - Loading göstergesi
- **Form Validasyonu:**
  - E-posta format kontrolü
  - Boş alan kontrolü
  - Şifre alanının boş geçilmemesi
- **Kullanıcı Deneyimi:**
  - Başarılı giriş sonrası otomatik uygulama akışına geçiş
  - Hatalı girişte anlaşılır uyarı
  - Açılışta splash sonrası auth ekranına düşme
- **Teknik Detaylar:**
  - `AsyncStorage` ile oturum saklama
  - Session state yönetimi
  - Boot/splash sonrası auth yönlendirmesi

## 3. Profil Görüntüleme Ekranı

- **API Endpoint:** `GET /users/{id}`
- **Görev:** Mobil profil ekranında kullanıcı bilgilerini ve geçmiş yorumlarını göstermek
- **UI Bileşenleri:**
  - Profil başlık kartı
  - E-posta ve rol bilgisi
  - Bildirim tercihleri bölümü
  - Önceki yorumlar listesi
  - Çıkış yap butonu
- **Kullanıcı Deneyimi:**
  - Profil bilgilerinin tek ekranda sade görünmesi
  - Kullanıcı yorumlarına erişebilme
  - Profil ve güvenlik işlemlerini aynı yerden yönetebilme
- **Teknik Detaylar:**
  - Session user ile backend verisinin birlikte kullanımı
  - Profil ekranı içinde alt kart yapısı
  - Yorum listesinin zenginleştirilmiş hedef bilgisiyle gösterimi

## 4. Oyuncuları Listeleme Ekranı

- **API Endpoint:** `GET /players`
- **Görev:** Mobil dashboard ve favori arama akışlarında oyuncu listesini göstermeye yönelik arayüzü oluşturmak
- **UI Bileşenleri:**
  - Oyuncu seçim kartları
  - Arama input'u
  - Lig bazlı filtreleme görünümü
  - Seçili oyuncu kartı
- **Kullanıcı Deneyimi:**
  - Dashboard AI modülünde oyuncu seçimini kolaylaştırma
  - Favori oyuncu aramasını mobilde akıcı hale getirme
  - Uzun listelerde kullanımı sadeleştirme
- **Teknik Detaylar:**
  - Yerel filtreleme ile performans iyileştirmesi
  - Oyuncu katalog verisini yeniden kullanma
  - Liste ve seçim state'lerinin ayrıştırılması

## 5. Oyuncu Detayı Ekranı

- **API Endpoint:** `GET /players/{playerId}`
- **Görev:** Mobil uygulamada seçilen oyuncunun tüm temel bilgilerini gösteren detay ekranını geliştirmek
- **UI Bileşenleri:**
  - Oyuncu hero kartı
  - Takım / lig / pozisyon / yaş kartları
  - Milliyet ve doğum tarihi alanı
  - Performans özeti bölümü
  - Transfer geçmişi bölümü
  - Favori oyuncu ekle butonu
- **Kullanıcı Deneyimi:**
  - Oyuncu bilgilerine tek ekranda ulaşma
  - Takım bağlamı ile lig bilgisini görme
  - Favori ekleme ve yorum yazma akışına erişim
- **Teknik Detaylar:**
  - Dynamic route benzeri navigation kullanımı
  - API verisi + context fallback ile detay tamamlama
  - Piyasa değeri ve AI tahmin verilerini aynı ekranda birleştirme

## 6. Transferleri Listeleme Ekranı

- **API Endpoint:** `GET /transfers`
- **Görev:** Mobil uygulamada transfer verilerini kullanıcıya okunabilir biçimde sunmak
- **UI Bileşenleri:**
  - Transfer kartları
  - Oyuncu adı
  - Kaynak kulüp / hedef kulüp bilgisi
  - Tarih alanı
  - Ücret veya işlem tipi alanı
- **Kullanıcı Deneyimi:**
  - Oyuncu ve takım bağlamında transfer geçmişini kolay okuma
  - Eski webdeki dağınık görünüm yerine sade mobil liste
  - Uzun içerikte rahat scroll
- **Teknik Detaylar:**
  - Transfer verisini normalize ederek kartlara bağlama
  - Oyuncu detay ve takım detay ekranlarında tekrar kullanım
  - Tarih/fallback formatlama

## 7. Favori Takım Silme Ekranı

- **API Endpoint:** `DELETE /users/{id}/favorites/teams/{teamId}`
- **Görev:** Mobil favoriler ekranında kullanıcıya favori takımı kaldırma arayüzü sunmak
- **UI Bileşenleri:**
  - Favori takım kartı
  - `Sil` butonu
  - `Detay` butonu
  - Arama ve filtre alanı
- **Kullanıcı Deneyimi:**
  - Tek dokunuşla favoriden çıkarma
  - Liste güncellenince anında sonucu görme
  - Takım detayına geri gidebilme
- **Teknik Detaylar:**
  - Favori takımlar state'i
  - Lokal kullanıcı nesnesini yenileme
  - Silme sonrası UI refresh

## 8. Transfer Tahmini (AI) Ekranı

- **API Endpoint:** `POST /ai/transfer-predictions`
- **Görev:** Mobil dashboard ekranında AI destekli transfer uyum tahmin modülünü tasarlamak ve çalıştırmak
- **UI Bileşenleri:**
  - Kaynak lig seçimi
  - Oyuncu seçimi
  - Hedef lig seçimi
  - Hedef takım seçimi
  - Uyum yüzdesi kartları
  - Tahmin özeti alanı
- **Kullanıcı Deneyimi:**
  - Oyuncunun hedef lig veya takıma uyumunu hızlı karşılaştırma
  - Seçimler değiştikçe anlamlı sonuç görme
  - Kart bazlı, mobilde okunabilir AI özet sunumu
- **Teknik Detaylar:**
  - Dashboard state yönetimi
  - API'ye seçim bağlamını gönderme
  - Sonuçları yüzde ve metin olarak görselleştirme
