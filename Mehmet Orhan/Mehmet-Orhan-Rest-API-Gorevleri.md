# Mehmet Orhan - Rest API Görevleri

**API Test Videosu:** [Link buraya eklenecek](https://example.com)

## 1. Kullanıcı Çıkışı
**Endpoint:** POST /users/logout
**Authentication:** Bearer Token gerekli
**Response:** 200 OK - Kullanıcı başarıyla çıkış yaptı

## 2. Hesap Silme
**Endpoint:** DELETE /users/{id}
**Path Parameters:** id (string, required) - Kullanıcı ID'si
**Authentication:** Bearer Token gerekli
**Response:** 204 No Content - Kullanıcı hesabı başarıyla silindi

## 3. Favori Takım Ekleme
**Endpoint:** POST /users/{id}/favorites/teams
**Path Parameters:**id (string, required) - Kullanıcı ID'si
**Request Body:**
```json
{
  "teamId": "12345"
}

```
**Authentication:** Bearer Token gerekli
**Response:** 201 Created - Takım favorilere eklendi

## 4. Bildirim Tercihlerini Güncelleme
**Endpoint:** PUT /users/{id}/notifications  
**Path Parameters:** id (string, required) - Kullanıcı ID'si  

**Request Body:**
```json
{
  "emailNotifications": true,
  "pushNotifications": false,
  "smsNotifications": true
}
```

**Authentication:** Bearer Token gerekli  
**Response:** 200 OK - Bildirim tercihleri güncellendi  

---

## 5. Piyasa Değeri Görüntüleme
**Endpoint:** GET /players/{playerId}/market-value  
**Path Parameters:** playerId (string, required) - Oyuncu ID'si  

**Response:** 200 OK - Oyuncunun piyasa değeri getirildi  

---

## 6. Admin Paneli - Kullanıcı Listeleme
**Endpoint:** GET /admin/users  

**Authentication:** Admin yetkisi gerekli  
**Response:** 200 OK - Kullanıcı listesi başarıyla getirildi  

---

## 7. Takım Kadrosu Görüntüleme
**Endpoint:** GET /teams/{teamId}/squad  
**Path Parameters:** teamId (string, required) - Takım ID'si  

**Response:** 200 OK - Takım kadrosu başarıyla getirildi  

---

## 8. AI Takım Raporu
**Endpoint:** GET /ai/team-report/{teamId}  
**Path Parameters:** teamId (string, required) - Takım ID'si  

**Response:** 200 OK - AI takım raporu oluşturuldu  

---

## 9. Yorum Silme
**Endpoint:** DELETE /api/comments/{commentId}  
**Path Parameters:** commentId (string, required) - Yorum ID'si  

**Authentication:** Bearer Token gerekli  
**Response:** 204 No Content - Yorum başarıyla silindi  

---

## 10. Yorum Listeleme
**Endpoint:** GET /api/comments  

**Query Parameters (opsiyonel):**  
- postId (string) - Belirli bir içeriğe ait yorumlar  

**Response:** 200 OK - Yorumlar başarıyla listelendi  