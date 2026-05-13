# İbrahim Mert Bozdoğan'ın Mobil Backend Görevleri

**Mobil Front-end ile Back-end Bağlanmış Test Videosu:** [Mobil Backend Video](https://youtu.be/Mf-FTmh4tIA)

Mobil için ayrı bir backend geliştirilmemiştir. Mobil uygulama, web frontend ile aynı Transfera REST API servislerini kullanır. Aşağıdaki maddeler, İbrahim Mert Bozdoğan'ın geliştirdiği API endpointlerinin mobil tarafta nasıl kullanıldığını gösterir.

## 1. Yorum Güncelleme Servisi

- **API Endpoint:** `PUT /comments/{commentId}`
- **Görev:** Mobil uygulamada kullanıcının daha önce yaptığı yorumu düzenleme
- **İşlevler:**
  - Yorum kartı üzerinden güncelleme aksiyonunu başlatma
  - Yeni yorum içeriğini kullanıcıdan alma
  - Güncellenmiş veriyi backend'e gönderme
  - Başarılı işlem sonrası yorum listesini yenileme
- **Teknik Detaylar:**
  - Profil ekranı, yorumlar sekmesi ve admin kullanıcı detayında ortak kullanım
  - Hatalı giriş veya yetki sorunlarında kullanıcıya hata gösterimi
  - Düzenleme sonrası state senkronizasyonu

## 2. Kullanıcı Girişi Servisi

- **API Endpoint:** `POST /users/login`
- **Görev:** Mobil uygulamanın giriş ekranında kullanıcı kimlik doğrulamasını gerçekleştirme
- **İşlevler:**
  - E-posta ve şifre bilgisini formdan alma
  - API'ye giriş isteği gönderme
  - Başarılı girişte token ve kullanıcı bilgisini saklama
  - Kullanıcıyı dashboard akışına yönlendirme
  - Hatalı giriş durumunda kullanıcıya uyarı verme
- **Teknik Detaylar:**
  - `AsyncStorage` ile session yönetimi
  - JWT/Bearer token saklama
  - Retry mekanizması ile geçici ağ hatalarını tolere etme

## 3. Profil Görüntüleme Servisi

- **API Endpoint:** `GET /users/{id}`
- **Görev:** Mobil profil ekranında kullanıcı bilgilerini görüntüleme
- **İşlevler:**
  - Kullanıcı adı, soyadı, e-posta ve rol bilgilerini çekme
  - Profil kartında bu bilgileri gösterme
  - Kullanıcı tercihlerinin ekrana taşınmasını destekleme
- **Teknik Detaylar:**
  - Token ile korunan profil isteği
  - Session ve backend verisinin birlikte yönetilmesi
  - Profil güncelleme sonrası yeniden veri alma

## 4. Oyuncuları Listeleme Servisi

- **API Endpoint:** `GET /players`
- **Görev:** Mobil tarafta oyuncu kataloglarını ve seçim listelerini oluşturma
- **İşlevler:**
  - Dashboard AI seçim ekranında oyuncu havuzu oluşturma
  - Favori oyuncu arama alanında sonuçları listeleme
  - Lig filtresine göre oyuncu seçimini destekleme
- **Teknik Detaylar:**
  - Lig bilgisine göre query parametreli istekler
  - Yerel filtreleme ile arama performansını artırma
  - Liste verisini farklı ekranlarda tekrar kullanabilme

## 5. Oyuncu Detayı Görüntüleme Servisi

- **API Endpoint:** `GET /players/{playerId}`
- **Görev:** Mobil oyuncu detay ekranını gerçek backend verisiyle doldurma
- **İşlevler:**
  - Oyuncu adı, yaş, pozisyon ve takım bilgisini gösterme
  - Lig, milliyet, doğum tarihi ve istatistikleri sunma
  - Transfer geçmişi ve performans özetini hazırlama
- **Teknik Detaylar:**
  - Oyuncu detay açıldığında tekil oyuncu verisini çekme
  - Eksik lig bilgisini takım bağlamı ile tamamlama
  - UI fallback değerleri ile boş alanları kontrol etme

## 6. Transferleri Listeleme Servisi

- **API Endpoint:** `GET /transfers`
- **Görev:** Mobil uygulamada transfer verisini ortak kaynak olarak kullanma
- **İşlevler:**
  - Güncel transfer kayıtlarını alma
  - AI tahmin modüllerine arka plan verisi sağlama
  - Oyuncu ve takım bağlamında transfer özetlerini destekleme
- **Teknik Detaylar:**
  - Liste endpoint'inden gelen veriyi normalize etme
  - Gerekli alanları mobil kartlara uyarlama
  - Boş veya eksik veri durumlarında fallback kullanma

## 7. Favori Takım Silme Servisi

- **API Endpoint:** `DELETE /users/{id}/favorites/teams/{teamId}`
- **Görev:** Mobil favoriler ekranında takımı favori listesinden kaldırma
- **İşlevler:**
  - Seçili takım için silme isteği gönderme
  - İşlem sonrası favori listesini anında güncelleme
  - Kullanıcının web ve mobil favori verisini senkron tutma
- **Teknik Detaylar:**
  - Yetkili kullanıcıya ait token ile çağrı yapılması
  - Favoriler ekranında kart bazlı aksiyon yönetimi
  - Başarılı silme sonrası state güncellemesi

## 8. AI Transfer Uyum Tahmini Servisi

- **API Endpoint:** `POST /ai/transfer-predictions`
- **Görev:** Mobil dashboard ekranında oyuncu için hedef lig veya takım uyum analizini üretme
- **İşlevler:**
  - Seçilen oyuncu için AI tahmin isteği oluşturma
  - Hedef lig / hedef takım senaryosunu hesaplama
  - Uyum yüzdesini ve açıklayıcı özetleri ekranda gösterme
- **Teknik Detaylar:**
  - Dashboard içindeki AI modülü ile entegrasyon
  - Oyuncu, lig ve takım bağlamını request body içinde gönderme
  - Tahmin sonuçlarını performans kartlarıyla görselleştirme

## 9. Yorum Ekleme Servisi

- **API Endpoint:** `POST /comments`
- **Görev:** Mobil oyuncu veya takım detay ekranında yeni yorum oluşturma
- **İşlevler:**
  - Kullanıcıdan yorum metni alma
  - Hedef oyuncu veya hedef takım bilgisiyle birlikte backend'e gönderme
  - Başarılı işlem sonrası yorumları güncelleme
  - Kullanıcının profil geçmişine yorumu yansıtma
- **Teknik Detaylar:**
  - Token ile yetkilendirilmiş POST isteği
  - Form state ve loading yönetimi
  - Başarı ve hata mesajlarının kullanıcıya gösterimi
