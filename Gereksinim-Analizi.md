TRANSFERA – Gereksinim Analizi

1. Kullanıcı Kaydı
API: POST /users/register
Kullanıcıdan ad, soyad, e-posta ve şifre alınır. Şifre hashlenerek kaydedilir. Aynı e-posta ile tekrar kayıt engellenir.

2. Kullanıcı Girişi
API: POST /users/login
E-posta ve şifre doğrulanır. Başarılı girişte JWT veya oturum anahtarı üretilir.

3. Profil Görüntüleme
API: GET /users/{id}
Kullanıcı kendi profil bilgilerini görüntüleyebilir. Yetkilendirme kontrolü yapılır.

4. Oyuncuları Listeleme
API: GET /players
Sistemdeki tüm oyuncular listelenir. Filtreleme ve pagination desteklenir.

5. Oyuncu Detayı Görüntüleme
API: GET /players/{playerId}
Oyuncunun yaş, pozisyon, takım, istatistik ve piyasa değeri bilgileri gösterilir.

6. Transferleri Listeleme
API: GET /transfers
Gerçekleşmiş transferler tarih, kulüp ve bonservis bilgileriyle listelenir.

7. Favori Takım Silme
API: DELETE /users/{id}/favorites/teams/{teamId}
Kullanıcı kendi favori takım listesinden silme işlemi yapabilir.

8. Transfer Tahmini Oluşturma (AI)
API: POST /ai/transfer-predictions
Yapay zekâ; performans, sözleşme süresi ve piyasa trendlerine göre olası transfer tahmini üretir.

9. Profil Güncelleme
API: PUT /users/{id}
Kullanıcı profil bilgilerini güncelleyebilir.

10. Şifre Değiştirme
API: PUT /users/{id}/password
Mevcut şifre doğrulanarak yeni şifre hashlenip kaydedilir.

11. Favori Oyuncu Ekleme
API: POST /users/{id}/favorites/players
Oyuncu favorilere eklenir. Tekrar ekleme engellenir.

12. Takımları Listeleme
API: GET /teams
Tüm takımlar listelenir. Lig/ülke bazlı filtreleme yapılabilir.

13. Takım Detayı Görüntüleme
API: GET /teams/{teamId}
Takımın kadro, lig durumu ve transfer geçmişi gösterilir.

14. Favori Oyuncu Silme
API: DELETE /users/{id}/favorites/players/{playerId}
Kullanıcı kendi favori oyuncu listesinden silme işlemi yapabilir.

15. Oyuncu Transfer Geçmişi
API: GET /players/{playerId}/transfers
Oyuncunun transfer geçmişi kronolojik olarak listelenir.

16. Oyuncu Değer Tahmini (AI)
API: GET /ai/player-value/{playerId}
AI modeli oyuncunun gelecekteki tahmini piyasa değerini hesaplar.

17. Kullanıcı Çıkışı
API: POST /users/logout
Mevcut oturum sonlandırılır, token geçersiz hale getirilir.

18. Hesap Silme
API: DELETE /users/{id}
Kullanıcının hesabı kalıcı olarak silinir.

19. Favori Takım Ekleme
API: POST /users/{id}/favorites/teams
Kullanıcı favori takım ekleyebilir.

20. Bildirim Tercihlerini Güncelleme
API: PUT /users/{id}/notifications
Transfer veya maç bildirim ayarları güncellenir.

21. Piyasa Değeri Görüntüleme
API: GET /players/{playerId}/market-value
Oyuncunun mevcut piyasa değeri ve geçmiş değişimleri gösterilir.

22. Yetkili Transfer Güncelleme
API: PUT /transfers/{transferId}
Sadece yetkili kullanıcılar transfer bilgilerini güncelleyebilir (rol bazlı kontrol).

23. Takım Kadrosu Görüntüleme
API: GET /teams/{teamId}/squad
Takımın güncel oyuncu listesi detaylı şekilde sunulur.

24. Transfer Trend Analizi (AI)
API: GET /ai/transfer-trends
AI modeli geçmiş verileri analiz ederek transfer piyasası eğilimlerini raporlar.

Tüm Gereksinimler

1. Kullanıcı Kaydı (İbrahim Mert Bozdoğan)
2. Kullanıcı Girişi (İbrahim Mert Bozdoğan)
3. Profil Görüntüleme (İbrahim Mert Bozdoğan)
4. Oyuncuları Listeleme (İbrahim Mert Bozdoğan)
5. Oyuncu Detayı Görüntüleme (İbrahim Mert Bozdoğan)
6. Transferleri Listeleme (İbrahim Mert Bozdoğan)
7. Favori Takım Silme (İbrahim Mert Bozdoğan)
8. Transfer Tahmini Oluşturma (İbrahim Mert Bozdoğan)
9. Profil Güncelleme (Mustafa Alican Kutsal)
10. Şifre Değiştirme (Mustafa Alican Kutsal)
11. Favori Oyuncu Ekleme (Mustafa Alican Kutsal)
12. Takımları Listeleme (Mustafa Alican Kutsal)
13. Takım Detayı Görüntüleme (Mustafa Alican Kutsal)
14. Favori Oyuncu Silme (Mustafa Alican Kutsal)
15. Oyuncu Transfer Geçmişi (Mustafa Alican Kutsal)
16. Oyuncu Değer Tahmini (Mustafa Alican Kutsal)
17. Kullanıcı Çıkışı (Mehmet Orhan)
18. Hesap Silme (Mehmet Orhan)
19. Favori Takım Ekleme (Mehmet Orhan)
20. Bildirim Tercihlerini Güncelleme (Mehmet Orhan)
21. Piyasa Değeri Görüntüleme (Mehmet Orhan)
22. Yetkili Transfer Güncelleme (Mehmet Orhan)
23. Takım Kadrosu Görüntüleme (Mehmet Orhan)
24. Trend Analizi (Mehmet Orhan)

Gereksinim Dağılımları
1. [İbrahim Mert Bozdoğan Gereksinimler](./İbrahim Mert Bozdoğan/İbrahim Mert Bozdoğan-Gereksinimler.md)
2. [Mehmet Orhan Gereksinimler](./Mehmet Orhan/Mehmet Orhan-Gereksinimler.md)
3. [Mustafa Alican KUTSAL](./Mustafa Alican KUTSAL/Mustafa Alican KUTSAL-Gereksinimler.md)