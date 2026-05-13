# Transfera Jenkins Kurulumu

Bu proje icin Jenkins, hoca sunumundaki akisa uygun olacak sekilde Docker uzerinden calistirilir. Bilgisayarda Jenkins kurulu olmak zorunda degildir.

## Eklenen Dosyalar

- `Jenkinsfile`
- `docker-compose.jenkins.yaml`
- `jenkins/Dockerfile`

## Jenkins'i Docker ile Baslatma

Proje klasorunde su komutu calistir:

```powershell
docker compose -f docker-compose.jenkins.yaml up -d --build
```

Jenkins arayuzu:

- `http://localhost:8080`

## Ilk Giris  

Ilk admin sifresini almak icin:

```powershell
docker exec transfera_jenkins cat /var/jenkins_home/secrets/initialAdminPassword
```


Sonra:

1. `http://localhost:8080` adresini ac
2. sifreyi gir
3. `Install suggested plugins`
4. istersen kullanici olustur, istersen `Skip and continue as admin`

## Pipeline Olusturma

1. `New Item`
2. isim olarak `transfera-pipeline`
3. `Pipeline` sec
4. `Pipeline script from SCM`
5. SCM: `Git`
6. Repository URL: kendi GitHub repo adresin
7. Branch: `*/main`
8. Script Path: `Jenkinsfile`
9. `Save`
10. `Build Now`

Sunumdaki ekran goruntusundeki alanlarla eslestirme:

- `Branches to build`: `*/main`
- `Script Path`: `Jenkinsfile`
- `Lightweight checkout`: acik kalabilir
- Pipeline ilk calismada arka planda bir `Checkout SCM` adimi da gosterebilir; bu normaldir

## GitHub Webhook ve Tunnel

Sunumdaki ornekte Jenkins yerel makinada `localhost:8080` uzerinden calistigi icin GitHub webhook'unun Jenkins'e ulasabilmesi icin gecici bir public URL kullanilir. Bunun icin Cloudflare Tunnel kullanilabilir.

### 1. Cloudflare tunnel baslat

Windows PowerShell ornegi:

```powershell
cloudflared tunnel --url http://localhost:8080
```

Komut calisinca su tipte bir adres verir:

```text
https://ornek-adres.trycloudflare.com
```

### 2. GitHub webhook ekle

GitHub repo ayarlari:

1. `Settings`
2. `Webhooks`
3. `Add webhook`
4. `Payload URL` alanina:

```text
https://ornek-adres.trycloudflare.com/github-webhook/
```

5. `Content type`: `application/x-www-form-urlencoded`
6. `Secret`: bos birakilabilir
7. `Enable SSL verification`: acik
8. `Just the push event` sec
9. `Add webhook`

Bu repodaki `Jenkinsfile` icinde `githubPush()` tetigi tanimlidir. Bu nedenle `main` dalina her `push` geldiginde Jenkins build'i otomatik baslatabilir.

### 3. Jenkins tarafinda kontrol et

- Pipeline ayarlarinda repo adresi dogru olmali
- Branch `*/main` olmali
- Jenkins'in GitHub eklentileri yuklu olmali
- Tunnel kapandiysa GitHub webhook URL'i gecersiz hale gelir; yeni tunnel acildiginda webhook URL'i guncellenmelidir

## Pipeline Ne Yapar

`Jenkinsfile` su adimlari calistirir:

1. kodu alir
2. `docker compose -f docker-compose.ci.yaml config` ile CI compose dosyasini dogrular
3. mevcut containerlari durdurur
4. projeyi `docker compose -f docker-compose.ci.yaml up -d --build` ile yeniden kaldirir
5. backend container icinde `http://127.0.0.1:3000/api/health` adresine gercek HTTP istegi atar
6. frontend container icinde `http://127.0.0.1:5173` adresine gercek HTTP istegi atar
7. `post` adiminda container durumunu listeler

Blue Ocean veya Stage View ekraninda asagidakine yakin bir akis gorursun:

- `Checkout SCM`
- `Checkout`
- `Docker Compose Validation`
- `Build and Deploy`
- `Health Check`
- `Post Actions`

## Neden Ayri CI Compose Dosyasi Var

`docker-compose.yaml` gelistirme icin kaynak klasorlerini bind mount eder. Jenkins container icinden `docker compose` calistiginda bu mount path'leri host tarafinda dogru cozulemeyebilir. Bu nedenle pipeline icin source bind mount icermeyen `docker-compose.ci.yaml` kullanilir.

## Manuel Test Komutlari

```powershell
docker compose ps
docker compose logs transfera_backend
docker compose logs transfera_frontend
docker compose logs mongo
docker compose -f docker-compose.jenkins.yaml logs jenkins
```

## Jenkins'i Kapatma

```powershell
docker compose -f docker-compose.jenkins.yaml down
```

## Not

Sunumdaki beklentiye gore repoda `Jenkinsfile` bulunmasi ve Docker uzerinden frontend ile REST API'nin calistiginin gosterilmesi gerekir. Bu altyapi o beklentiye gore hazirlandi.

Bu repoda zaten tamamlanmis kisimlar:

- `Jenkinsfile` mevcut
- Jenkins icin ozel Docker imaji mevcut
- Ayrik `docker-compose.jenkins.yaml` mevcut
- Ayrik `docker-compose.ci.yaml` mevcut
- Backend health endpoint mevcut: `/api/health`
- Docker Desktop uzerinde Jenkins, frontend, backend ve Mongo birlikte kalkiyor

Sunumla tam eslesmesi icin manuel yapilacak kisimlar:

- GitHub webhook eklemek
- Gerekirse Cloudflare tunnel URL'ini guncellemek
- Jenkins UI icinde pipeline'i `Pipeline script from SCM` olarak tanimlamak
- Bir `push` atip webhook tetigini gostermek
