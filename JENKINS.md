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

## Pipeline Ne Yapar

`Jenkinsfile` su adimlari calistirir:

1. kodu alir
2. `docker compose -f docker-compose.ci.yaml config` ile CI compose dosyasini dogrular
3. mevcut containerlari durdurur
4. projeyi `docker compose -f docker-compose.ci.yaml up -d --build` ile yeniden kaldirir
5. backend container icinde `http://localhost:3000/api/health`
6. frontend container icinde `http://localhost:5173`
   adreslerinden saglik kontrolu yapar

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
