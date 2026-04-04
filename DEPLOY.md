# Transfera Deploy Notes

Bu proje artik tek origin uzerinden yayina alinabilecek sekilde hazirlandi:

- Frontend build alindiginda `backend` bunu otomatik servis eder.
- React route'lari icin backend `index.html` fallback verir.
- Frontend tarafi `VITE_API_BASE_URL` tanimli degilse ayni domain uzerinden API'ye gider.
- API saglik kontrolu icin `GET /api/health` kullanilabilir.

## Onerilen Yayin Modeli

Tek servis olarak yayinlayin:

1. Root dizinden deploy edin.
2. Build komutu olarak `npm run build` kullanin.
3. Start komutu olarak `npm start` kullanin.

Bu akista:

- `postinstall` backend ve frontend bagimliliklarini kurar.
- `build` frontend icin `dist` olusturur.
- `start` backend'i ayaga kaldirir ve varsa `frontend/dist` klasorunu servis eder.

## Gerekli Ortam Degiskenleri

Backend:

- `PORT`
- `MONGODB_URI`
- `JWT_SECRET`
- `JWT_EXPIRES_IN`
- `SPORTMONKS_API_TOKEN`
- `SPORTMONKS_BASE_URL`
- `SPORTMONKS_TIMEOUT`
- `ALLOWED_ORIGINS`

Frontend:

- Ayni origin deploy yapacaksaniz `VITE_API_BASE_URL` bos birakilabilir.
- Frontend ayri bir domain'de olacaksa `VITE_API_BASE_URL=https://api-alanadiniz.com` verin.

## Ayni Origin Onerisi

En az sorunlu kurulum:

- Uygulama: `https://alanadiniz.com`
- API: ayni uygulama icinde
- Saglik kontrolu: `https://alanadiniz.com/api/health`

Bu yapi CORS ve SPA routing problemlerini ciddi sekilde azaltir.
