1️⃣ Profil Güncelleme 

API Metodu: PUT /users/{id} 
Açıklama: Kullanıcının profil bilgilerinde değişiklik yapmasını sağlar. Güncellenen bilgiler doğrulanarak veritabanına kaydedilir. 



2️⃣ Şifre Değiştirme 

API Metodu: PUT /users/{id}/password 
Açıklama: Kullanıcının mevcut şifresini doğrulayarak yeni şifre belirlemesini sağlar. Yeni şifre güvenli şekilde hashlenerek saklanır. 



3️⃣ Favori Oyuncu Ekleme 

API Metodu: POST /users/{id}/favorites/players 
Açıklama: Kullanıcının ilgilendiği oyuncuları favori listesine eklemesini sağlar. Aynı oyuncunun tekrar eklenmesi engellenir. 



4️⃣ Takımları Listeleme 

API Metodu: GET /teams 
Açıklama: Sistemde bulunan tüm takımların liste halinde getirilmesini sağlar. Lig veya ülke bazlı filtreleme yapılabilir. 



5️⃣ Takım Detayı Görüntüleme 

API Metodu: GET /teams/{teamId} 
Açıklama: Seçilen takımın kadro bilgileri, lig durumu ve transfer geçmişi gibi detaylarını görüntüler. 

 

6️⃣ Favori Oyuncu Silme 
API Metodu: DELETE /users/{id}/favorites/players/{playerId} 
Açıklama: Kullanıcının daha önce favori listesine eklediği bir oyuncuyu favorilerden kaldırmasını sağlar. İşlem öncesinde kullanıcı kimlik doğrulaması yapılır ve sadece ilgili kullanıcı kendi favori listesinden silme işlemi gerçekleştirebilir. Silme işlemi başarılı olduğunda ilgili oyuncu kullanıcının favori listesinden çıkarılır.Şekil 

 

7️⃣ Oyuncu Transfer Geçmişi 

API Metodu: GET /players/{playerId}/transfers 
Açıklama: Oyuncunun geçmiş yıllardaki transfer hareketlerini ve bonservis bedellerini kronolojik sırayla gösterir. 



8️⃣ 🤖 Oyuncu Değer Tahmini 

API Metodu: GET /ai/player-value/{playerId} 
Açıklama: Yapay zekâ algoritması, oyuncunun performans istatistikleri ve yaş faktörünü analiz ederek gelecekteki tahmini piyasa değerini hesaplar. 
