# İbrahim Mert BOZDOĞAN'ın REST API Metotları

**API Test Videosu:** [Link buraya eklenecek](https://example.com)

## 1. Yorum Güncelleme
**Endpoint:** PUT /comments/{commentId}  
**Path Parameters:** commentId (string, required) - Yorum ID'si  

**Request Body:**
```json
{
  "content": "Güncellenmiş yorum metni"
}
```

**Authentication:** Bearer Token gerekli  
**Response:** 200 OK - Yorum başarıyla güncellendi  

---

## 2. Kullanıcı Girişi
**Endpoint:** POST /users/login  

**Request Body:**
```json
{
  "email": "admin@test.com",
  "password": "123456"
}
```

**Response:** 200 OK - Giriş başarılı  

```json
{
  "token": "jwt_token_example",
  "user": {
    "id": "1",
    "firstName": "Admin",
    "lastName": "Hesap",
    "email": "admin@test.com",
    "role": "ADMIN"
  }
}
```

---

## 3. Profil Görüntüleme
**Endpoint:** GET /users/{id}  
**Path Parameters:** id (string, required) - Kullanıcı ID'si  

**Authentication:** Bearer Token gerekli  
**Response:** 200 OK - Kullanıcı bilgileri getirildi  

```json
{
  "id": "1",
  "firstName": "Admin",
  "lastName": "Hesap",
  "email": "admin@test.com",
  "role": "ADMIN",
  "createdAt": "2026-04-05T10:00:00Z"
}
```

---

## 4. Oyuncuları Listeleme
**Endpoint:** GET /players  

**Query Parameters (opsiyonel):**  
- page (number)  
- limit (number)  
- position (string)  

**Response:** 200 OK - Oyuncular listelendi  

```json
[
  {
    "id": "101",
    "name": "Lionel Messi",
    "position": "RW",
    "team": "Inter Miami",
    "marketValue": 35000000
  },
  {
    "id": "102",
    "name": "Kylian Mbappe",
    "position": "ST",
    "team": "PSG",
    "marketValue": 180000000
  }
]
```

---

## 5. Oyuncu Detayı Görüntüleme
**Endpoint:** GET /players/{playerId}  
**Path Parameters:** playerId (string, required) - Oyuncu ID'si  

**Response:** 200 OK - Oyuncu detayları getirildi  

```json
{
  "id": "101",
  "name": "Lionel Messi",
  "age": 37,
  "position": "RW",
  "team": "Inter Miami",
  "statistics": {
    "goals": 20,
    "assists": 15
  },
  "marketValue": 35000000
}
```

---

## 6. Transferleri Listeleme
**Endpoint:** GET /transfers  

**Response:** 200 OK - Transferler listelendi  

```json
[
  {
    "player": "Kylian Mbappe",
    "from": "Monaco",
    "to": "PSG",
    "fee": 180000000,
    "date": "2018-07-01"
  }
]
```

---

## 7. Favori Takım Silme
**Endpoint:** DELETE /users/{id}/favorites/teams/{teamId}  
**Path Parameters:**  
- id (string, required) - Kullanıcı ID'si  
- teamId (string, required) - Takım ID'si  

**Authentication:** Bearer Token gerekli  
**Response:** 204 No Content - Takım favorilerden kaldırıldı  

---

## 8. Transfer Tahmini Oluşturma
**Endpoint:** POST /ai/transfer-predictions  

**Request Body:**
```json
{
  "playerId": "102"
}
```

**Response:** 200 OK - Transfer tahmini oluşturuldu  

```json
{
  "player": "Kylian Mbappe",
  "predictedClub": "Real Madrid",
  "probability": 0.87
}
```
