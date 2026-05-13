# Mobil Frontend Gorev Dagilimi

Bu dokumanda, Transfera mobil uygulamasinin kullanici arayuzu ve kullanici deneyimi gorevleri listelenmektedir. Icerik, hocanin repo formatina uygun sekilde duzenlenmis ve mevcut Transfera ekranlari ile ekip gorev dosyalarina uyarlanmistir.

---

## Grup Uyelerinin Mobil Frontend Gorevleri

1. [Mehmet Orhan'in Mobil Frontend Gorevleri](Mehmet%20Orhan/Mehmet-Orhan-Mobil-Frontend-Gorevleri.md)
2. [Mustafa Alican Kutsal'in Mobil Frontend Gorevleri](Mustafa%20Alican%20KUTSAL/Mustafa-Alican-Kutsal-Mobil-Frontend-Gorevleri.md)
3. [Ibrahim Mert Bozdogan'in Mobil Frontend Gorevleri](%C4%B0brahim%20Mert%20Bozdo%C4%9Fan/%C4%B0brahim-Mert-Bozdo%C4%9Fan-Mobil-Frontend-Gorevleri.md)

---

## Transfera Icin Genel Mobil Frontend Prensipleri

### 1. Ekran Mimarisi
- Mobil istemci, web tarafindaki temel akislarin telefon uyumlu karsiligidir
- Ana ekran gruplari: giris/kayit, dashboard, oyuncu detayi, takim detayi, favoriler, profil, yorumlar ve admin
- Navigation yapisi tab + stack mantigiyla tutarli kurgulanmalidir

### 2. Tasarim Sistemi
- **Renk Paleti:** Transfera marka diliyle uyumlu primary, secondary, success ve error renkleri
- **Tipografi:** Baslik, kart ve yardimci metinler icin okunabilir olcekler
- **Spacing:** Tutarli bosluk kullanimi, 8dp tabanli grid sistemi
- **Kart Yapisi:** Oyuncu, takim, yorum ve AI ozetleri icin tekrar kullanilabilir kart bilesenleri

### 3. Responsive ve Platform Uyumlu Tasarim
- Farkli telefon boyutlari ve gerekirse tablet duzenleri desteklenmelidir
- Portrait odakli tasarim yapilmali, landscape durumda da icerik bozulmamalidir
- Safe area, notch ve status bar bosluklari dikkate alinmalidir
- Android icin Material benzeri, iOS icin native hissi veren bilesen secimleri tercih edilmelidir

### 4. Kullanici Deneyimi
- **Loading States:** Liste ve detay ekranlarinda skeleton veya progress indicator kullanimi
- **Error Handling:** Form ve servis hatalarinda anlasilir geri bildirim
- **Empty States:** Favoriler, yorumlar ve arama sonucunda bos durum metinleri
- **Feedback:** Favori ekleme, yorum guncelleme, profil guncelleme gibi islerde toast/snackbar geri bildirimi

### 5. Transfera'ya Ozel Ana Ekranlar
- **Auth Akislari:** Giris, kayit, cikis, sifre degistirme
- **Dashboard:** AI transfer tahmini, oyuncu secimi ve ozet analiz kartlari
- **Oyuncu Akislari:** Oyuncu listeleme, oyuncu detayi, piyasa degeri, transfer gecmisi, favori oyuncu islemleri
- **Takim Akislari:** Lig bazli takim listeleme, takim detayi, kadro, AI takim raporu, favori takim islemleri
- **Sosyal Alanlar:** Yorum listeleme, yorum ekleme, yorum guncelleme, yorum silme
- **Profil ve Admin:** Profil goruntuleme, profil guncelleme, bildirim tercihleri, admin kullanici listesi ve detay akislari

### 6. Erisilebilirlik
- Buton ve dokunma alanlari minimum rahat kullanilabilir boyutta olmalidir
- Form alanlari acik etiket ve hata metinleri icermelidir
- Kontrastli renk kullanimi ve font buyutme destegi saglanmalidir
- Screen reader icin anlamli label/content description eklenmelidir

### 7. Form ve State Yonetimi
- Giris, kayit, profil, sifre ve yorum formlarinda real-time validation uygulanmalidir
- Submit sirasinda butonlar kontrollu sekilde disable edilmelidir
- Hata mesajlari ilgili alanin altinda veya form ustunde net sekilde gosterilmelidir
- Auth state, favoriler ve kullanici profili ekranlar arasi senkron kalmalidir

### 8. Performans ve Veri Sunumu
- Uzun oyuncu, takim ve yorum listelerinde lazy loading veya verimli liste bilesenleri kullanilmalidir
- Gorseller ve logolar optimize edilmeli, gerekiyorsa cache kullanilmalidir
- AI kartlari ve detay ekranlari, kullaniciyi bekletmeden asamali veri gosterebilmelidir
- Animasyonlar sade ve akici olmali, 60 FPS hedeflenmelidir

### 9. Navigation ve Guvenlik
- Korumali ekranlara token olmadan erisim engellenmelidir
- Admin ekranlari sadece admin rolundeki kullanicilar icin acilmalidir
- Back button davranisi auth, detay ve tab akislarinda tutarli olmalidir
- Derin link veya paylasim senaryolari icin oyuncu ve takim detay rotalari belirgin olmalidir
