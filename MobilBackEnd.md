# Mobil Backend (REST API Baglantisi) Gorev Dagilimi

**REST API Adresi:** [transfera-backend.vercel.app](https://transfera-backend.vercel.app/api/health)

Bu dokumanda, Transfera mobil uygulamasinin mevcut REST API ile iletisimini saglayan backend entegrasyon gorevleri listelenmektedir. Mobil istemci icin ayri bir backend yazilmaz; mobil taraf, web uygulamasinin kullandigi ayni Express tabanli servisleri kullanir.

---

## Grup Uyelerinin Mobil Backend Gorevleri

1. [Mehmet Orhan'in Mobil Backend Gorevleri](Mehmet%20Orhan/Mehmet-Orhan-Mobil-Backend-Gorevleri.md)
2. [Mustafa Alican Kutsal'in Mobil Backend Gorevleri](Mustafa%20Alican%20KUTSAL/Mustafa-Alican-Kutsal-Mobil-Backend-Gorevleri.md)
3. [Ibrahim Mert Bozdogan'in Mobil Backend Gorevleri](%C4%B0brahim%20Mert%20Bozdo%C4%9Fan/%C4%B0brahim-Mert-Bozdo%C4%9Fan-Mobil-Backend-Gorevleri.md)

---

## Transfera Icin Genel Mobil Backend Prensipleri

### 1. HTTP Client Yapilandirmasi
- **Base URL:** `https://transfera-backend.vercel.app`
- **Temel servis gruplari:** `/users`, `/players`, `/teams`, `/transfers`, `/ai`, `/admin`, `/api/comments`
- **Timeout:** Request timeout 30 saniye, baglanti timeout 10 saniye
- **Headers:**
  - `Content-Type: application/json`
  - `Authorization: Bearer {token}` (korumali endpoint'lerde)

### 2. Authentication ve Session Yonetimi
- `POST /users/login` ve `POST /users/register` ile auth akislarinin yonetilmesi
- JWT token'in secure storage veya `AsyncStorage` benzeri guvenli alanda saklanmasi
- `POST /users/logout` sonrasinda local session verisinin temizlenmesi
- `GET /users/:id`, `PUT /users/:id`, `PUT /users/:id/password` gibi korumali endpoint'lerde token'in otomatik eklenmesi

### 3. Ortak Veri Kaynagi Mantigi
- Mobil uygulama ile web uygulamasi ayni kullanici, favori, yorum ve AI servislerini kullanir
- Favori oyuncu ve favori takim islemlerinde web ve mobil verisinin senkron kalmasi beklenir
- Admin akislarinda mobil istemci de ayni rol bazli yetki yapisini kullanir

### 4. Hata Yonetimi
- Network timeout, baglanti kopmasi ve 5xx hatalari ayri ele alinmalidir
- 401/403 durumlarinda kullanici tekrar girise yonlendirilmelidir
- 404 ve validation hatalarinda kullaniciya anlasilir mesajlar gosterilmelidir
- Gecici ag hatalarinda sinirli retry mekanizmasi uygulanmalidir

### 5. Cache ve Veri Yenileme Stratejisi
- `GET /players`, `GET /teams`, `GET /admin/users`, `GET /api/comments` gibi liste endpoint'leri gecici olarak cache'lenebilir
- `PUT`, `POST` ve `DELETE` isteklerinden sonra ilgili liste veya detay verisi invalidation ile yenilenmelidir
- Oyuncu, takim ve yorum ekranlarinda stale veri yerine kontrollu refresh tercih edilmelidir

### 6. Mobilde Kullanilan Ana Endpoint Gruplari
- **Kullanici:** `POST /users/register`, `POST /users/login`, `POST /users/logout`, `GET /users/:id`, `PUT /users/:id`, `PUT /users/:id/password`
- **Favoriler:** `POST /users/:id/favorites/players`, `DELETE /users/:id/favorites/players/:playerId`, `POST /users/:id/favorites/teams`, `DELETE /users/:id/favorites/teams/:teamId`
- **Bildirim Tercihleri:** `PUT /users/:id/notifications`
- **Oyuncular:** `GET /players`, `GET /players/:playerId`, `GET /players/:playerId/market-value`
- **Takimlar:** `GET /teams`, `GET /teams/:teamId`, `GET /teams/:teamId/squad`
- **Yapay Zeka:** `POST /ai/transfer-predictions`, `GET /ai/team-report/:teamId`, `GET /ai/player-value/:playerId`
- **Yorumlar:** `GET /api/comments`, `POST /api/comments`, `PUT /api/comments/:commentId`, `DELETE /api/comments/:commentId`
- **Admin:** `GET /admin/users` ve admin kullanici yonetimi endpoint'leri

### 7. Loading, Logging ve Debug
- Her API cagrisinda loading, success ve error durumlari ayrica izlenmelidir
- Development modunda request/response logging aktif tutulmalidir
- Yorum, favori ve AI tahmin akislarinda hata ayiklama icin ekran bazli loglama kullanilmalidir
- Vercel uzerindeki servis sagligi `GET /api/health` ile takip edilmelidir
