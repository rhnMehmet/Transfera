1️⃣ Kullanıcı Çıkışı
API Metodu: POST /users/logout

Açıklama: Kullanıcının mevcut oturumunu sonlandırır. Aktif token veya oturum geçersiz hale getirilir.
________________________________________
2️⃣ Hesap Silme
API Metodu: DELETE /users/{id}

Açıklama: Kullanıcının hesabının kalıcı olarak sistemden silinmesini sağlar. Silme işlemi geri alınamaz.
________________________________________
3️⃣ Favori Takım Ekleme
API Metodu: POST /users/{id}/favorites/teams

Açıklama: Kullanıcının ilgilendiği takımları favori listesine eklemesini sağlar.
________________________________________
4️⃣ Bildirim Tercihlerini Güncelleme
API Metodu: PUT /users/{id}/notifications

Açıklama: Kullanıcının transfer veya maç bildirimlerini açıp kapatmasını sağlar.
________________________________________
5️⃣ Piyasa Değeri Görüntüleme
API Metodu: GET /players/{playerId}/market-value

Açıklama: Oyuncunun mevcut piyasa değerini ve değer değişim geçmişini gösterir.
________________________________________
6️⃣ Yetkili Transfer Güncelleme
API Metodu: PUT /transfers/{transferId}

Açıklama: Yetkili kullanıcıların transfer bilgilerini güncellemesini sağlar. Rol bazlı yetkilendirme kontrolü yapılır.
________________________________________
7️⃣ Takım Kadrosu Görüntüleme
API Metodu: GET /teams/{teamId}/squad

Açıklama: Takıma ait güncel oyuncu listesini detaylı şekilde sunar.
________________________________________
8️⃣ Trend Analizi
API Metodu: GET /ai/transfer-trends
Açıklama: Yapay zekâ modeli, geçmiş transfer verilerini analiz ederek transfer piyasasındaki genel eğilimleri, yükselen ligleri ve değer artış trendlerini raporlar.

