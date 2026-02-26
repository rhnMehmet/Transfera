1️⃣ Kullanıcı Kaydı
API Metodu: POST /users/register
Açıklama: Kullanıcıların yeni bir hesap oluşturarak sisteme kayıt olmasını sağlar. Kullanıcıdan ad, soyad, e-posta ve şifre bilgileri alınır. Şifre güvenli şekilde hashlenerek veritabanına kaydedilir. Aynı e-posta adresiyle tekrar kayıt yapılması engellenir.

2️⃣ Kullanıcı Girişi
API Metodu: POST /users/login
Açıklama: Kullanıcının e-posta ve şifre bilgileriyle sisteme giriş yapmasını sağlar. Kimlik doğrulama başarılı olursa JWT veya oturum anahtarı oluşturulur ve kullanıcıya iletilir.

3️⃣ Profil Görüntüleme
API Metodu: GET /users/{id}
Açıklama: Kullanıcının sistemde kayıtlı profil bilgilerinin görüntülenmesini sağlar. Yetkilendirme kontrolü yapılır ve sadece ilgili kullanıcı kendi profilini görüntüleyebilir.

4️⃣ Oyuncuları Listeleme
API Metodu: GET /players
Açıklama: Sistemde kayıtlı tüm oyuncuların liste halinde getirilmesini sağlar. Filtreleme ve sayfalama (pagination) desteği içerir.

5️⃣ Oyuncu Detayı Görüntüleme
API Metodu: GET /players/{playerId}
Açıklama: Seçilen oyuncunun yaş, pozisyon, takım, istatistik ve piyasa değeri gibi detaylı bilgilerinin görüntülenmesini sağlar.

6️⃣ Transferleri Listeleme
API Metodu: GET /transfers
Açıklama: Gerçekleşmiş transferlerin tarih, kulüp ve bonservis bilgileriyle birlikte listelenmesini sağlar.

7️⃣ Favori Takım Silme
API Metodu: DELETE /users/{id}/favorites/teams/{teamId}
Açıklama: Kullanıcının daha önce favori listesine eklediği bir takımı favorilerinden kaldırmasını sağlar. İşlem öncesinde kimlik doğrulama yapılır ve kullanıcı yalnızca kendi favori listesinden silme işlemi gerçekleştirebilir. Başarılı işlem sonrası ilgili takım kullanıcının favori listesinden çıkarılır.
8️⃣ 🤖 Transfer Tahmini Oluşturma
API Metodu: POST /ai/transfer-predictions
Açıklama: Yapay zekâ modeli, oyuncu performans verileri, sözleşme süresi ve piyasa trendlerini analiz ederek olası transfer tahmini oluşturur. Sonuçta tahmini kulüp ve gerçekleşme olasılığı sunulur.