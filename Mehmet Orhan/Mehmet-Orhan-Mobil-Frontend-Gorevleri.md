# Mehmet Orhan'ın Mobil Frontend Görevleri

**Mobile Front-end Demo Videosu:** [Video](https://youtu.be/awbm8M9uEbA)

Mobil frontend, Expo + React Native kullanılarak geliştirilmiştir. Aşağıdaki maddeler, Mehmet Orhan'ın web frontend görevlerinin mobil uygulamadaki karşılığını ve mobil ekran tasarımı/uygulama detaylarını açıklar.

## 1. Kullanıcı Çıkışı (Logout) Ekranı

- **API Endpoint:** `POST /users/logout`
- **Görev:** Mobil uygulamada kullanıcının aktif oturumunu güvenli şekilde sonlandırmasını sağlayan arayüzü hazırlamak
- **UI Bileşenleri:**
  - Üst barda `Çıkış` butonu
  - Profil ekranında `Çıkış Yap` butonu
  - Çıkış onay penceresi
  - İşlem durumuna göre geri bildirim akışı
- **Kullanıcı Deneyimi:**
  - Çıkış butonuna basınca `Çıkış yapmak istediğinizden emin misiniz?` sorusunun gelmesi
  - `Vazgeç` ve `Onayla` seçenekleriyle güvenli akış
  - Başarılı çıkış sonrası giriş ekranına yönlendirme
  - Korunan ekranlara tekrar erişimin engellenmesi
- **Teknik Detaylar:**
  - `AsyncStorage` içindeki token ve kullanıcı bilgisinin temizlenmesi
  - Session state'in sıfırlanması
  - Root route'a dönüş ve tab resetleme

## 2. Hesap Silme Ekranı

- **API Endpoint:** `DELETE /users/{id}`
- **Görev:** Mobil arayüzde kullanıcı hesabını silme işlemini başlatan ve yöneten ekran akışını hazırlamak
- **UI Bileşenleri:**
  - Admin kullanıcı detay ekranında `Kullanıcıyı Sil` butonu
  - Onay alma akışı
  - İşlem sonucu için geri bildirim alanı
- **Kullanıcı Deneyimi:**
  - Silme öncesi kullanıcıyı uyaran akış
  - Başarılı işlem sonrası kullanıcı listesinin güncellenmesi
  - Hata durumunda kullanıcı dostu mesaj gösterimi
- **Teknik Detaylar:**
  - Danger aksiyon tasarımı
  - Admin kullanıcı yönetimi ekranı ile entegrasyon
  - Başarılı işlem sonrası liste state'inin yenilenmesi

## 3. Favori Takım Ekleme Ekranı

- **API Endpoint:** `POST /users/{id}/favorites/teams`
- **Görev:** Mobilde takım kartları üzerinden favori takım ekleme deneyimini oluşturmak
- **UI Bileşenleri:**
  - Lig ekranında takım kartları
  - `Ekle` butonu
  - Favoriler sekmesi
  - Takım detayına geçiş butonu
- **Kullanıcı Deneyimi:**
  - Takım kartından tek dokunuşla favoriye ekleme
  - Favori ekranında anında görünme
  - Web ve mobil arasında ortak veri senkronu
- **Teknik Detaylar:**
  - Takım listesi state yönetimi
  - Favori ekleme sonrası lokal kullanıcı verisini güncelleme
  - Tekrarlı ekleme durumlarında hata mesajı gösterme

## 4. Bildirim Tercihleri Ekranı

- **API Endpoint:** `PUT /users/{id}/notifications`
- **Görev:** Mobil profil ekranında kullanıcı bildirim tercihlerini yönetebileceği arayüzü oluşturmak
- **UI Bileşenleri:**
  - Transfer bildirimleri seçeneği
  - Maç alarmları seçeneği
  - Bülten seçeneği
  - `Bildirimleri Kaydet` butonu
- **Kullanıcı Deneyimi:**
  - Açık/kapalı tercihlerin net görünmesi
  - Kaydetme sonrası başarı mesajı
  - Tercihlerin tekrar girişte korunması
- **Teknik Detaylar:**
  - Switch/checkbox benzeri mobil seçim kontrolü
  - Kullanıcı state'ine tercihleri yazma
  - Profil ve admin kullanıcı detayında ortak kullanım

## 5. Oyuncu Piyasa Değeri Ekranı

- **API Endpoint:** `GET /players/{playerId}/market-value`
- **Görev:** Mobil oyuncu detay ekranında piyasa değeri bilgisini görsel olarak sunmak
- **UI Bileşenleri:**
  - Piyasa değeri kartı
  - Güncel değer alanı
  - 12 aylık projeksiyon alanı
  - Trend / tahmin blokları
- **Kullanıcı Deneyimi:**
  - Oyuncu detayında ekonomik görünümün kolay okunması
  - Kart bazlı sade sunum
  - Eksik veri olsa bile ekranın bozulmaması
- **Teknik Detaylar:**
  - Oyuncu değer tahmini verisinin ayrı state ile yönetilmesi
  - Loading sırasında placeholder gösterimi
  - Sayısal verinin okunabilir formata çevrilmesi

## 6. Admin Paneli — Kullanıcılar Ekranı

- **API Endpoint:** `GET /admin/users`
- **Görev:** Mobil admin ekranında tüm kullanıcıları listeleyen ve detay ekranına taşıyan arayüzü geliştirmek
- **UI Bileşenleri:**
  - Kullanıcı kartları
  - Arama alanı
  - Rol bilgisi
  - Kullanıcı detayına gitme butonu
- **Kullanıcı Deneyimi:**
  - Mobilde okunabilir kart düzeni
  - Hızlı kullanıcı arama
  - Admin için sade yönetim akışı
- **Teknik Detaylar:**
  - Admin tab ekranı
  - Liste filtreleme state'i
  - Detay ekranına navigation ile geçiş

## 7. Takım Kadrosu Ekranı

- **API Endpoint:** `GET /teams/{teamId}/squad`
- **Görev:** Mobil takım detay ekranında takım oyuncularını listeleyen arayüzü hazırlamak
- **UI Bileşenleri:**
  - Oyuncu kartları
  - Oyuncu fotoğrafı
  - Pozisyon bilgisi
  - Gol/istatistik alanları
  - Oyuncu detay butonu
- **Kullanıcı Deneyimi:**
  - Uzun listelerde scroll ile rahat kullanım
  - Takım detayından oyuncu detaya hızlı geçiş
  - Yüklenme sürecinde loading göstergesi
- **Teknik Detaylar:**
  - Takım detay ekranı içindeki kadro bölümü
  - Liste performansı için tek akışta veri bağlama
  - Kadro verisinin mobil kart yapısına dönüştürülmesi

## 8. AI Takım Raporu Ekranı

- **API Endpoint:** `GET /ai/team-report/{teamId}`
- **Görev:** Takım detay ekranındaki AI kulüp analizi alanının mobil UI tasarımını ve gösterimini yapmak
- **UI Bileşenleri:**
  - `Kulüp profili` paneli
  - Genel skor kartı
  - Kadro derinliği kartı
  - Transfer dengesi kartı
  - Ortalama yaş / rating / lig sırası kartları
  - AI öneri satırları
- **Kullanıcı Deneyimi:**
  - Metriklerin tek bakışta anlaşılması
  - AI açıklama metninin okunabilir olması
  - Boş veri durumunda fallback içerik
- **Teknik Detaylar:**
  - Takım detay açılışında AI raporunu ekrana bağlama
  - Kart bileşenlerini tekrar kullanılabilir tasarlama
  - Paralel veri yükleme sonrası panel güncellemesi

## 9. Yorum Silme Ekranı

- **API Endpoint:** `DELETE /api/comments/{commentId}`
- **Görev:** Mobil yorum kartlarında silme aksiyonunu kullanıcıya sunmak
- **UI Bileşenleri:**
  - Yorum kartı
  - `Sil` butonu
  - Onay veya uyarı mesajı akışı
- **Kullanıcı Deneyimi:**
  - Silme sonrası yorum listesinin anında güncellenmesi
  - Yetkisiz işlemde uygun hata mesajı
  - Profil ve admin ekranında aynı deneyim
- **Teknik Detaylar:**
  - Yorum kartı bileşeninde ortak aksiyon yönetimi
  - Silme sonrası local refresh
  - Hata durumunda rollback mantığı

## 10. Yorum Listeleme Ekranı

- **API Endpoint:** `GET /api/comments`
- **Görev:** Mobil `Yorumlar` sekmesinde tüm yorumları ve hedeflerini gösteren arayüzü hazırlamak
- **UI Bileşenleri:**
  - Yorum listesi
  - Yazar bilgisi
  - Hedef takım / oyuncu etiketi
  - Tarih ve puan alanı
  - Filtreleme görünümü
- **Kullanıcı Deneyimi:**
  - Yorumun hangi takım veya oyuncuya ait olduğunun net görünmesi
  - Boş liste durumunda anlaşılır empty state
  - Scroll ile rahat okuma
- **Teknik Detaylar:**
  - Hedef adı çözümleme ile veri zenginleştirme
  - Yorumlar ekranı ile profil/admin yorum ekranlarının ortak bileşen kullanması
  - Liste yenileme state yönetimi
