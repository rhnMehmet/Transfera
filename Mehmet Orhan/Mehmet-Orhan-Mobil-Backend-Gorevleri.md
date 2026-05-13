# Mehmet Orhan'ın Mobil Backend Görevleri

**Mobil Front-end ile Back-end Bağlanmış Test Videosu:** [Video](https://youtu.be/_DCc-6TLuBI)

Mobil uygulama için ayrı bir backend yazılmamıştır. Expo tabanlı mobil uygulama, web tarafı ile aynı Transfera backend servislerine bağlanır. Aşağıdaki görevler, mobil frontend'in Mehmet Orhan tarafından geliştirilen REST API servislerini nasıl kullandığını açıklar.

## 1. Kullanıcı Çıkışı Servisi

- **API Endpoint:** `POST /users/logout`
- **Görev:** Mobil uygulamada aktif kullanıcı oturumunu güvenli şekilde kapatma
- **İşlevler:**
  - Çıkış butonuna basıldığında kullanıcıdan onay alma
  - Backend'e çıkış isteği gönderme
  - Başarılı veya hatalı durumda yerel oturum verisini temizleme
  - Kullanıcıyı giriş ekranına yönlendirme
- **Teknik Detaylar:**
  - Bearer token ile yetkilendirme
  - `AsyncStorage` içindeki token ve kullanıcı verisinin silinmesi
  - Hata durumunda bile local logout akışının devam etmesi

## 2. Hesap Silme Servisi

- **API Endpoint:** `DELETE /users/{id}`
- **Görev:** Mobil tarafta kullanıcı hesabını kalıcı olarak silme akışını yönetme
- **İşlevler:**
  - Silinecek kullanıcı ID'sini backend'e gönderme
  - Yetki kontrolüne uygun şekilde isteği tetikleme
  - Başarılı durumda ilgili ekranı güncelleme
  - Gerekirse kullanıcı listesini veya oturum durumunu yenileme
- **Teknik Detaylar:**
  - Kimlik doğrulama ile korunan endpoint kullanımı
  - Admin kullanıcı detay ekranı ile entegrasyon
  - Başarısız işlemde hata mesajı gösterimi

## 3. Favori Takım Ekleme Servisi

- **API Endpoint:** `POST /users/{id}/favorites/teams`
- **Görev:** Mobil uygulamada seçilen takımı kullanıcı favorilerine ekleme
- **İşlevler:**
  - Ligler ekranından veya takım detayından takım seçme
  - Seçilen takımın ID bilgisini backend'e gönderme
  - Başarılı işlem sonrası favori listesini anında güncelleme
  - Aynı takımın tekrar eklenmesini backend kurallarıyla kontrol etme
- **Teknik Detaylar:**
  - Token ile korunan kullanıcı işlemi
  - Ortak backend nedeniyle web ve mobil favori listesinin senkron çalışması
  - UI üzerinde ekle/sil durumunun anlık yenilenmesi

## 4. Bildirim Tercihlerini Güncelleme Servisi

- **API Endpoint:** `PUT /users/{id}/notifications`
- **Görev:** Mobil profil ekranında kullanıcı bildirim tercihlerini güncelleme
- **İşlevler:**
  - Transfer bildirimi, maç alarmı ve bülten tercihini alma
  - Tercihleri backend'e kaydetme
  - Güncel tercihleri ekranda tekrar gösterme
  - Kullanıcı deneyimini kişiselleştirme
- **Teknik Detaylar:**
  - Profil ekranı ve admin kullanıcı detay ekranı ile entegrasyon
  - Boolean tipindeki tercih alanlarını request body içinde gönderme
  - Güncelleme sonrası session/user state yenileme

## 5. Piyasa Değeri Görüntüleme Servisi

- **API Endpoint:** `GET /players/{playerId}/market-value`
- **Görev:** Mobil oyuncu detay ekranında oyuncunun piyasa değerini gösterme
- **İşlevler:**
  - Oyuncu ID'sine göre değer bilgisini çekme
  - Güncel değer, para birimi ve tahmini görünümü sunma
  - Oyuncunun transfer potansiyelini kullanıcıya gösterme
- **Teknik Detaylar:**
  - Oyuncu detay ekranında veri kartları ile gösterim
  - Değer bilgisinin AI/player-value akışıyla birlikte okunabilir sunulması
  - Eksik veri durumunda fallback gösterimi

## 6. Admin Paneli Kullanıcı Listeleme Servisi

- **API Endpoint:** `GET /admin/users`
- **Görev:** Mobil admin ekranında tüm kullanıcıları listeleme
- **İşlevler:**
  - Sistem kullanıcılarını kart yapısında gösterme
  - Kullanıcı adı, e-posta, rol ve özet bilgileri sunma
  - Kullanıcı detay sayfasına geçiş sağlama
- **Teknik Detaylar:**
  - Sadece admin rolüyle erişim
  - Arama ve filtreleme destekli liste görünümü
  - Ortak backend üzerinden web ile aynı kullanıcı veri kaynağının kullanılması

## 7. Takım Kadrosu Görüntüleme Servisi

- **API Endpoint:** `GET /teams/{teamId}/squad`
- **Görev:** Mobil takım detay ekranında ilgili takımın kadrosunu listeleme
- **İşlevler:**
  - Oyuncu listesini takım bazlı çekme
  - Pozisyon, isim ve temel performans bilgilerini gösterme
  - Oyuncu detay sayfasına geçiş sağlama
- **Teknik Detaylar:**
  - Takım detay ekranında kadro kartları ile gösterim
  - Tek takım odağında veri yükleme
  - Büyük listelerde loading state yönetimi

## 8. AI Takım Raporu Servisi

- **API Endpoint:** `GET /ai/team-report/{teamId}`
- **Görev:** Mobil takım detay ekranındaki yapay zeka destekli kulüp profilini gerçek backend verisiyle doldurma
- **İşlevler:**
  - Takımın genel skorunu gösterme
  - Kadro derinliği ve transfer dengesini sunma
  - Ortalama yaş, rating ve lig sırası gibi metrikleri gösterme
  - AI önerilerini ve rapor başlığını kullanıcıya sunma
- **Teknik Detaylar:**
  - Takım detay yüklenirken AI raporunun paralel istekle çekilmesi
  - `Promise.allSettled` ile ana veri ve AI verisinin birlikte yönetilmesi
  - Veri gelmezse fallback metinlerle ekranın bozulmaması

## 9. Yorum Silme Servisi

- **API Endpoint:** `DELETE /api/comments/{commentId}`
- **Görev:** Mobil uygulamada kullanıcı veya admin tarafından yorum silme işlemini gerçekleştirme
- **İşlevler:**
  - Silinecek yorum ID'sini gönderme
  - Başarılı işlem sonrası yorum listesini güncelleme
  - Profil, yorumlar ve admin ekranlarında ortak silme akışı sağlama
- **Teknik Detaylar:**
  - Yetkilendirme kontrolü ile çağrı yapılması
  - Mobil kart bileşenlerinde silme aksiyonunun tanımlanması
  - Silme sonrası tekrar fetch veya state güncellemesi

## 10. Yorum Listeleme Servisi

- **API Endpoint:** `GET /api/comments`
- **Görev:** Mobil uygulamadaki yorumlar sekmesinde yorumları listeleme
- **İşlevler:**
  - Tüm yorumları backend'den çekme
  - Hangi yorumun hangi takım veya oyuncuya ait olduğunu gösterme
  - Kullanıcı bazlı veya ekran bazlı görünüm sağlama
- **Teknik Detaylar:**
  - Yorum hedefi çözümleme (oyuncu / takım adı)
  - Profil ekranı, genel yorum ekranı ve admin detay ekranı ile ortak kullanım
  - Loading ve boş durum kartlarının yönetilmesi
