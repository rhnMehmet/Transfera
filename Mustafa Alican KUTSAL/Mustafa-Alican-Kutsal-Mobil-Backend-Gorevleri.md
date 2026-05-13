# Mustafa Alican Kutsal'ın Mobil Backend Görevleri

**Mobil Front-end ile Back-end Bağlanmış Test Videosu:** [Mobil Backend Video](https://youtu.be/rXG20U7BqJg)

Mobil uygulama için ayrı backend geliştirilmemiştir. `mobile/` klasöründeki React Native/Expo uygulaması, web uygulamasıyla aynı Transfera backend servislerine bağlanır. Bu dosya, Mustafa Alican Kutsal'ın REST API görevlerinin mobil tarafta nasıl kullanıldığını ders formatına uygun biçimde özetler.

## 1. Üye Olma (Kayıt) Servisi

- **API Endpoint:** `POST /users/register`
- **Görev:** Mobil uygulamada yeni kullanıcı kayıt işlemini gerçekleştiren servis entegrasyonu
- **İşlevler:**
  - Kullanıcı bilgilerini (ad, soyad, e-posta, şifre) toplama
  - Form validasyonu yapma
  - API'ye POST isteği gönderme
  - Başarılı kayıt sonrası kullanıcıyı giriş ekranına veya aktif oturuma yönlendirme
  - Hata durumlarını kullanıcıya gösterme
- **Teknik Detaylar:**
  - Request body modelinin mobil form ile eşlenmesi
  - Geçici backend/ağ sorunlarında retry desteği
  - Auth ekranında giriş ve kayıt sekmeleri arasında geçiş

## 2. Şifre Değiştirme Servisi

- **API Endpoint:** `PUT /users/{id}/password`
- **Görev:** Mobil profil ekranında kullanıcının mevcut şifresini yeni şifre ile değiştirmesi
- **İşlevler:**
  - Eski ve yeni şifre verisini kullanıcıdan alma
  - Yetkili kullanıcı için backend isteği gönderme
  - Başarılı güncellemede bilgilendirme mesajı gösterme
  - Hatalı parola durumunda kullanıcıyı uyarma
- **Teknik Detaylar:**
  - Bearer token ile korunan endpoint
  - Profil ekranı içindeki güvenlik kartı ile entegrasyon
  - Form alanlarının state yönetimi

## 3. Favori Oyuncu Ekleme Servisi

- **API Endpoint:** `POST /users/{id}/favorites/players`
- **Görev:** Mobil oyuncu detay ekranında seçilen oyuncuyu favorilere ekleme
- **İşlevler:**
  - Oyuncu ID bilgisini backend'e gönderme
  - Başarılı işlem sonrası favori ikon/buton durumunu güncelleme
  - Favoriler ekranında oyuncunun görünmesini sağlama
- **Teknik Detaylar:**
  - Ortak backend sayesinde web ve mobil favorilerinin senkron kalması
  - Duplicate ekleme durumunda backend cevabını kullanıcıya anlamlı gösterme
  - Oyuncu detay ve favoriler ekranlarında yeniden kullanılabilir servis

## 4. Takımları Listeleme Servisi

- **API Endpoint:** `GET /teams`
- **Görev:** Mobil ligler ekranında kayıtlı takımları listelemek
- **İşlevler:**
  - Lig seçimine göre takım listesini çekme
  - Takım adı, logo, ülke ve kuruluş yılı gösterme
  - Takım detay ekranına geçiş sağlama
  - Favori takım aramasında katalog veri kaynağı oluşturma
- **Teknik Detaylar:**
  - Query parametre ile lig filtresi kullanımı
  - Liste ekranında loading ve empty-state yönetimi
  - Aynı veriyi farklı ekranlarda tekrar kullanma

## 5. Takım Detayı Görüntüleme Servisi

- **API Endpoint:** `GET /teams/{teamId}`
- **Görev:** Mobil takım detay ekranının tüm ana verisini sağlama
- **İşlevler:**
  - Takım adı, logo, ülke, lig ve kuruluş bilgisini gösterme
  - Kadro verisini ve transfer geçmişini ekrana taşıma
  - AI takım raporu ve yorum akışını destekleme
- **Teknik Detaylar:**
  - Takım detay açılışında tekil veri yükleme
  - Geri dönüşte lig bağlamını koruma
  - Gelen veriyi mobil kart yapısına normalize etme

## 6. Favori Oyuncu Silme Servisi

- **API Endpoint:** `DELETE /users/{id}/favorites/players/{playerId}`
- **Görev:** Mobil favoriler ekranında eklenmiş oyuncuyu listeden kaldırma
- **İşlevler:**
  - İlgili oyuncu için silme isteği gönderme
  - Favori listesini anında güncelleme
  - Detay ekranındaki favori durumunu senkron tutma
- **Teknik Detaylar:**
  - Yetkilendirme kontrollü kullanıcı işlemi
  - Liste state'inin tekrar fetch veya local update ile yenilenmesi
  - UI tarafında silme aksiyon butonu yönetimi

## 7. Oyuncu Transfer Geçmişi Servisi

- **API Endpoint:** `GET /players/{playerId}/transfers`
- **Görev:** Mobil oyuncu detay ekranında oyuncunun transfer geçmişini gösterme
- **İşlevler:**
  - Transfer tarihlerini sıralı biçimde sunma
  - Kaynak ve hedef kulüp bilgisini gösterme
  - Bonservis veya işlem türünü özetleme
- **Teknik Detaylar:**
  - Oyuncu detay kartları içinde kronolojik listeleme
  - Boş transfer geçmişi için fallback görünüm
  - Oyuncu ana verisi ile transfer verisinin birlikte yönetilmesi

## 8. Oyuncu Değer Tahmini Servisi

- **API Endpoint:** `GET /ai/player-value/{playerId}`
- **Görev:** Mobil oyuncu detay ekranında oyuncunun tahmini piyasa değerini ve trendini gösterme
- **İşlevler:**
  - Güncel değer ve 12 aylık projeksiyonu getirme
  - Değer aralığı ve trend bilgisini gösterme
  - Oyuncunun ekonomik görünümünü kullanıcıya sunma
- **Teknik Detaylar:**
  - Oyuncu detay ve dashboard AI kartlarında ortak kullanım
  - Sayısal veriyi mobil okunabilir formatta sunma
  - Eksik veri durumunda güvenli fallback kullanma

## 9. Profil Güncelleme Servisi

- **API Endpoint:** `PUT /users/{id}`
- **Görev:** Mobil profil ekranında kullanıcının kişisel bilgilerini güncelleme
- **İşlevler:**
  - Ad, soyad ve e-posta bilgisini düzenleme
  - Güncel veriyi backend'e gönderme
  - Başarılı işlem sonrası session bilgisini güncelleme
  - Profil ekranında yeni bilgileri anında gösterme
- **Teknik Detaylar:**
  - Token ile korunan kullanıcı güncelleme akışı
  - Form state ve submit loading yönetimi
  - Güncellenen kullanıcı nesnesinin local session'a yazılması
