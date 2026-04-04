openapi: 3.0.3
info:
  title: Transfera API
  version: 1.0.0
  description: >
    TRANSFERA – futbol oyuncularının transfer geçmişi, piyasa değeri, takım bilgileri,
    kullanıcı favorileri ve yorum yönetimini sağlayan RESTful API.
    Yapay zekâ (AI) destekli transfer uyum tahmini, oyuncu değer tahmini ve takım raporu uçları içerir.
    API JWT tabanlı kimlik doğrulama ile korunmaktadır.
  contact:
    name: Mehmet Orhan
    email: mehmetorhan2145@gmail.com

servers:
  - url: https://api.transfera.app
    description: Üretim sunucusu
  - url: https://staging-api.transfera.app
    description: Test sunucusu
  - url: https://localhost:3000
    description: Yerel geliştirme sunucusu

tags:
  - name: Kullanıcılar
    description: Kullanıcı kaydı, giriş, profil ve hesap işlemleri
  - name: Oyuncular
    description: Oyuncu listeleme, detay, transfer geçmişi ve piyasa değeri
  - name: Takımlar
    description: Takım listeleme, detay ve kadro işlemleri
  - name: Transferler
    description: Transfer listeleme işlemleri
  - name: Favoriler
    description: Kullanıcı favori takım ve oyuncu işlemleri
  - name: Bildirimler
    description: Kullanıcı bildirim tercihleri
  - name: Yapay Zekâ
    description: AI tabanlı transfer uyumu, oyuncu değeri ve takım raporu
  - name: Yorumlar
    description: Yorum ekleme, listeleme, güncelleme ve silme
  - name: Admin
    description: Yönetici işlemleri

security:
  - BearerAuth: []

paths:
  /users/register:
    post:
      tags:
        - Kullanıcılar
      summary: Kullanıcı Kaydı
      operationId: registerUser
      security: []
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: "#/components/schemas/UserRegisterInput"
      responses:
        "201":
          description: Kullanıcı başarıyla oluşturuldu
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/User"
        "400":
          description: Geçersiz istek verisi
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/Error"
        "409":
          description: E-posta zaten kayıtlı
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/Error"

  /users/login:
    post:
      tags:
        - Kullanıcılar
      summary: Kullanıcı Girişi
      operationId: loginUser
      security: []
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: "#/components/schemas/UserLoginInput"
      responses:
        "200":
          description: Giriş başarılı, token üretildi
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/AuthResponse"
        "400":
          description: Geçersiz istek verisi
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/Error"
        "401":
          description: E-posta veya şifre hatalı
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/Error"

  /users/logout:
    post:
      tags:
        - Kullanıcılar
      summary: Kullanıcı Çıkışı
      operationId: logoutUser
      responses:
        "204":
          description: Oturum sonlandırıldı
        "401":
          description: Kimlik doğrulama başarısız
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/Error"

  /users/{id}:
    parameters:
      - name: id
        in: path
        required: true
        description: Kullanıcı kimliği
        schema:
          type: string
        example: "usr123"

    get:
      tags:
        - Kullanıcılar
      summary: Profil Görüntüleme
      operationId: getUserProfile
      responses:
        "200":
          description: Profil getirildi
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/UserProfile"
        "401":
          description: Kimlik doğrulama başarısız
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/Error"
        "403":
          description: Yetkisiz erişim
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/Error"
        "404":
          description: Kullanıcı bulunamadı
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/Error"

    put:
      tags:
        - Kullanıcılar
      summary: Profil Güncelleme
      operationId: updateUserProfile
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: "#/components/schemas/UserUpdateInput"
      responses:
        "200":
          description: Profil güncellendi
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/UserProfile"
        "400":
          description: Geçersiz istek verisi
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/Error"
        "401":
          description: Kimlik doğrulama başarısız
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/Error"
        "403":
          description: Yetkisiz işlem
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/Error"
        "404":
          description: Kullanıcı bulunamadı
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/Error"

    delete:
      tags:
        - Kullanıcılar
      summary: Hesap Silme
      operationId: deleteUser
      responses:
        "204":
          description: Hesap silindi
        "401":
          description: Kimlik doğrulama başarısız
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/Error"
        "403":
          description: Yetkisiz işlem
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/Error"
        "404":
          description: Kullanıcı bulunamadı
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/Error"

  /users/{id}/password:
    parameters:
      - name: id
        in: path
        required: true
        schema:
          type: string
        example: "usr123"

    put:
      tags:
        - Kullanıcılar
      summary: Şifre Değiştirme
      operationId: changePassword
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: "#/components/schemas/PasswordChangeInput"
      responses:
        "204":
          description: Şifre değiştirildi
        "400":
          description: Geçersiz istek verisi
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/Error"
        "401":
          description: Kimlik doğrulama başarısız
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/Error"
        "403":
          description: Yetkisiz işlem
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/Error"

  /users/{id}/favorites/players:
    parameters:
      - name: id
        in: path
        required: true
        schema:
          type: string
        example: "usr123"

    post:
      tags:
        - Favoriler
      summary: Favori Oyuncu Ekleme
      operationId: addFavoritePlayer
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: "#/components/schemas/FavoritePlayerAddInput"
      responses:
        "201":
          description: Oyuncu favorilere eklendi
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/Favorites"
        "400":
          description: Geçersiz istek verisi
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/Error"
        "401":
          description: Kimlik doğrulama başarısız
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/Error"
        "404":
          description: Kullanıcı veya oyuncu bulunamadı
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/Error"
        "409":
          description: Oyuncu zaten favorilerde
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/Error"

  /users/{id}/favorites/players/{playerId}:
    parameters:
      - name: id
        in: path
        required: true
        schema:
          type: string
        example: "usr123"
      - name: playerId
        in: path
        required: true
        schema:
          type: string
        example: "ply789"

    delete:
      tags:
        - Favoriler
      summary: Favori Oyuncu Silme
      operationId: deleteFavoritePlayer
      responses:
        "204":
          description: Favori oyuncu silindi
        "401":
          description: Kimlik doğrulama başarısız
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/Error"
        "403":
          description: Yetkisiz işlem
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/Error"
        "404":
          description: Kullanıcı veya oyuncu bulunamadı / favorilerde değil
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/Error"

  /users/{id}/favorites/teams:
    parameters:
      - name: id
        in: path
        required: true
        schema:
          type: string
        example: "usr123"

    post:
      tags:
        - Favoriler
      summary: Favori Takım Ekleme
      operationId: addFavoriteTeam
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: "#/components/schemas/FavoriteTeamAddInput"
      responses:
        "201":
          description: Takım favorilere eklendi
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/Favorites"
        "400":
          description: Geçersiz istek verisi
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/Error"
        "401":
          description: Kimlik doğrulama başarısız
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/Error"
        "404":
          description: Takım veya kullanıcı bulunamadı
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/Error"
        "409":
          description: Takım zaten favorilerde
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/Error"

  /users/{id}/favorites/teams/{teamId}:
    parameters:
      - name: id
        in: path
        required: true
        schema:
          type: string
        example: "usr123"
      - name: teamId
        in: path
        required: true
        schema:
          type: string
        example: "tm456"

    delete:
      tags:
        - Favoriler
      summary: Favori Takım Silme
      operationId: deleteFavoriteTeam
      responses:
        "204":
          description: Favori takım silindi
        "401":
          description: Kimlik doğrulama başarısız
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/Error"
        "403":
          description: Yetkisiz işlem
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/Error"
        "404":
          description: Kullanıcı veya takım bulunamadı / favorilerde değil
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/Error"

  /users/{id}/notifications:
    parameters:
      - name: id
        in: path
        required: true
        schema:
          type: string
        example: "usr123"

    put:
      tags:
        - Bildirimler
      summary: Bildirim Tercihlerini Güncelleme
      operationId: updateNotificationPreferences
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: "#/components/schemas/NotificationPreferencesInput"
      responses:
        "200":
          description: Bildirim tercihleri güncellendi
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/NotificationPreferences"
        "400":
          description: Geçersiz istek verisi
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/Error"
        "401":
          description: Kimlik doğrulama başarısız
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/Error"
        "403":
          description: Yetkisiz işlem
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/Error"
        "404":
          description: Kullanıcı bulunamadı
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/Error"

  /players:
    get:
      tags:
        - Oyuncular
      summary: Oyuncuları Listeleme
      operationId: listPlayers
      security: []
      parameters:
        - name: q
          in: query
          required: false
          description: Arama sorgusu
          schema:
            type: string
          example: "messi"
        - name: teamId
          in: query
          required: false
          description: Takıma göre filtreleme
          schema:
            type: string
          example: "tm456"
        - name: position
          in: query
          required: false
          description: Pozisyona göre filtreleme
          schema:
            type: string
          example: "FW"
        - name: page
          in: query
          required: false
          schema:
            type: integer
            minimum: 1
            default: 1
          example: 1
        - name: limit
          in: query
          required: false
          schema:
            type: integer
            minimum: 1
            maximum: 50
            default: 10
          example: 10
      responses:
        "200":
          description: Oyuncular listelendi
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/PaginatedPlayers"
        "400":
          description: Geçersiz parametre
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/Error"

  /players/{playerId}:
    parameters:
      - name: playerId
        in: path
        required: true
        schema:
          type: string
        example: "ply789"

    get:
      tags:
        - Oyuncular
      summary: Oyuncu Detayı Görüntüleme
      operationId: getPlayer
      security: []
      responses:
        "200":
          description: Oyuncu detayı getirildi
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/Player"
        "404":
          description: Oyuncu bulunamadı
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/Error"

  /players/{playerId}/transfers:
    parameters:
      - name: playerId
        in: path
        required: true
        schema:
          type: string
        example: "ply789"

    get:
      tags:
        - Oyuncular
      summary: Oyuncu Transfer Geçmişi
      operationId: listPlayerTransfers
      security: []
      parameters:
        - name: page
          in: query
          required: false
          schema:
            type: integer
            minimum: 1
            default: 1
          example: 1
        - name: limit
          in: query
          required: false
          schema:
            type: integer
            minimum: 1
            maximum: 50
            default: 10
          example: 10
        - name: order
          in: query
          required: false
          schema:
            type: string
            enum: [asc, desc]
            default: desc
          example: desc
      responses:
        "200":
          description: Transfer geçmişi listelendi
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/PaginatedTransfers"
        "404":
          description: Oyuncu bulunamadı
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/Error"

  /players/{playerId}/market-value:
    parameters:
      - name: playerId
        in: path
        required: true
        schema:
          type: string
        example: "ply789"

    get:
      tags:
        - Oyuncular
      summary: Piyasa Değeri Görüntüleme
      operationId: getPlayerMarketValue
      security: []
      responses:
        "200":
          description: Oyuncunun mevcut piyasa değeri ve geçmiş değişimleri getirildi
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/MarketValueResponse"
        "404":
          description: Oyuncu bulunamadı
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/Error"

  /teams:
    get:
      tags:
        - Takımlar
      summary: Takımları Listeleme
      operationId: listTeams
      security: []
      parameters:
        - name: league
          in: query
          required: false
          schema:
            type: string
          example: "Süper Lig"
        - name: country
          in: query
          required: false
          schema:
            type: string
          example: "Türkiye"
        - name: page
          in: query
          required: false
          schema:
            type: integer
            minimum: 1
            default: 1
          example: 1
        - name: limit
          in: query
          required: false
          schema:
            type: integer
            minimum: 1
            maximum: 50
            default: 10
          example: 10
      responses:
        "200":
          description: Takımlar listelendi
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/PaginatedTeams"
        "400":
          description: Geçersiz parametre
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/Error"

  /teams/{teamId}:
    parameters:
      - name: teamId
        in: path
        required: true
        schema:
          type: string
        example: "tm456"

    get:
      tags:
        - Takımlar
      summary: Takım Detayı Görüntüleme
      operationId: getTeam
      security: []
      responses:
        "200":
          description: Takım detayı getirildi
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/Team"
        "404":
          description: Takım bulunamadı
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/Error"

  /teams/{teamId}/squad:
    parameters:
      - name: teamId
        in: path
        required: true
        schema:
          type: string
        example: "tm456"

    get:
      tags:
        - Takımlar
      summary: Takım Kadrosu Görüntüleme
      operationId: getTeamSquad
      security: []
      responses:
        "200":
          description: Takımın güncel oyuncu listesi getirildi
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/TeamSquad"
        "404":
          description: Takım bulunamadı
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/Error"

  /transfers:
    get:
      tags:
        - Transferler
      summary: Transferleri Listeleme
      operationId: listTransfers
      security: []
      parameters:
        - name: fromClubId
          in: query
          required: false
          schema:
            type: string
          example: "tm001"
        - name: toClubId
          in: query
          required: false
          schema:
            type: string
          example: "tm456"
        - name: startDate
          in: query
          required: false
          schema:
            type: string
            format: date
          example: "2025-01-01"
        - name: endDate
          in: query
          required: false
          schema:
            type: string
            format: date
          example: "2026-12-31"
        - name: page
          in: query
          required: false
          schema:
            type: integer
            minimum: 1
            default: 1
          example: 1
        - name: limit
          in: query
          required: false
          schema:
            type: integer
            minimum: 1
            maximum: 50
            default: 10
          example: 10
      responses:
        "200":
          description: Transferler listelendi
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/PaginatedTransfers"
        "400":
          description: Geçersiz parametre
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/Error"

  /admin/users/{id}:
    parameters:
      - name: id
        in: path
        required: true
        schema:
          type: string
        example: "usr123"

    put:
      tags:
        - Admin
      summary: Admin Paneli Kullanıcı Güncelleme
      operationId: adminUpdateUser
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: "#/components/schemas/AdminUserUpdateInput"
      responses:
        "200":
          description: Kullanıcı admin tarafından güncellendi
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/UserProfile"
        "400":
          description: Geçersiz istek verisi
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/Error"
        "401":
          description: Kimlik doğrulama başarısız
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/Error"
        "403":
          description: Sadece admin erişebilir
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/Error"
        "404":
          description: Kullanıcı bulunamadı
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/Error"

  /ai/transfer-fit-predictions:
    post:
      tags:
        - Yapay Zekâ
      summary: AI Transfer Uyum Tahmini Oluşturma
      operationId: createTransferFitPrediction
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: "#/components/schemas/TransferFitPredictionInput"
      responses:
        "201":
          description: Transfer uyum tahmini oluşturuldu
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/TransferFitPrediction"
        "400":
          description: Geçersiz istek verisi
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/Error"
        "401":
          description: Kimlik doğrulama başarısız
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/Error"
        "404":
          description: Oyuncu veya takım bulunamadı
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/Error"

  /ai/player-value/{playerId}:
    parameters:
      - name: playerId
        in: path
        required: true
        schema:
          type: string
        example: "ply789"

    get:
      tags:
        - Yapay Zekâ
      summary: Oyuncu Değer Tahmini
      operationId: predictPlayerValue
      security: []
      responses:
        "200":
          description: Oyuncunun gelecekteki tahmini piyasa değeri hesaplandı
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/PlayerValuePrediction"
        "404":
          description: Oyuncu bulunamadı
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/Error"

  /ai/team-reports/{teamId}:
    parameters:
      - name: teamId
        in: path
        required: true
        schema:
          type: string
        example: "tm456"

    get:
      tags:
        - Yapay Zekâ
      summary: AI Takım Raporu
      operationId: getTeamReport
      security: []
      responses:
        "200":
          description: Takım performans ve taktik analiz raporu getirildi
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/TeamReport"
        "404":
          description: Takım bulunamadı
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/Error"

  /comments:
    post:
      tags:
        - Yorumlar
      summary: Yorum Ekleme
      operationId: createComment
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: "#/components/schemas/CommentCreateInput"
      responses:
        "201":
          description: Yorum eklendi
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/Comment"
        "400":
          description: Geçersiz istek verisi
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/Error"
        "401":
          description: Kimlik doğrulama başarısız
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/Error"

    get:
      tags:
        - Yorumlar
      summary: Yorum Listeleme
      operationId: listComments
      security: []
      parameters:
        - name: targetType
          in: query
          required: false
          schema:
            type: string
            enum: [player, team, transfer]
          example: "player"
        - name: targetId
          in: query
          required: false
          schema:
            type: string
          example: "ply789"
        - name: userId
          in: query
          required: false
          schema:
            type: string
          example: "usr123"
        - name: page
          in: query
          required: false
          schema:
            type: integer
            minimum: 1
            default: 1
          example: 1
        - name: limit
          in: query
          required: false
          schema:
            type: integer
            minimum: 1
            maximum: 50
            default: 10
          example: 10
      responses:
        "200":
          description: Yorumlar listelendi
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/PaginatedComments"
        "400":
          description: Geçersiz parametre
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/Error"

  /comments/{commentId}:
    parameters:
      - name: commentId
        in: path
        required: true
        schema:
          type: string
        example: "cmt001"

    put:
      tags:
        - Yorumlar
      summary: Yorum Güncelleme
      operationId: updateComment
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: "#/components/schemas/CommentUpdateInput"
      responses:
        "200":
          description: Yorum güncellendi
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/Comment"
        "400":
          description: Geçersiz istek verisi
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/Error"
        "401":
          description: Kimlik doğrulama başarısız
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/Error"
        "403":
          description: Sadece yorum sahibi güncelleyebilir
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/Error"
        "404":
          description: Yorum bulunamadı
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/Error"

    delete:
      tags:
        - Yorumlar
      summary: Yorum Silme
      operationId: deleteComment
      responses:
        "204":
          description: Yorum silindi
        "401":
          description: Kimlik doğrulama başarısız
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/Error"
        "403":
          description: Sadece yorum sahibi veya admin silebilir
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/Error"
        "404":
          description: Yorum bulunamadı
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/Error"

components:
  securitySchemes:
    BearerAuth:
      type: http
      scheme: bearer
      bearerFormat: JWT
      description: JWT tabanlı kimlik doğrulama

  schemas:
    Error:
      type: object
      description: Standart hata yanıtı
      properties:
        message:
          type: string
          example: "Geçersiz istek"
      required:
        - message

    User:
      type: object
      properties:
        _id:
          type: string
          example: "usr123"
        firstName:
          type: string
          example: "Mehmet"
        lastName:
          type: string
          example: "Orhan"
        email:
          type: string
          format: email
          example: "mehmet@example.com"
        role:
          type: string
          enum: [user, admin]
          example: "user"
        createdOn:
          type: string
          format: date-time
          example: "2026-03-04T10:00:00Z"
      required:
        - _id
        - firstName
        - lastName
        - email
        - role

    UserProfile:
      type: object
      properties:
        _id:
          type: string
          example: "usr123"
        firstName:
          type: string
          example: "Mehmet"
        lastName:
          type: string
          example: "Orhan"
        email:
          type: string
          format: email
          example: "mehmet@example.com"
        role:
          type: string
          enum: [user, admin]
          example: "user"
        favoriteTeams:
          type: array
          items:
            type: string
          example: ["tm456", "tm001"]
        favoritePlayers:
          type: array
          items:
            type: string
          example: ["ply789", "ply111"]
        notifications:
          $ref: "#/components/schemas/NotificationPreferences"
      required:
        - _id
        - firstName
        - lastName
        - email
        - role

    UserRegisterInput:
      type: object
      properties:
        firstName:
          type: string
          minLength: 2
          maxLength: 50
          example: "Mehmet"
        lastName:
          type: string
          minLength: 2
          maxLength: 50
          example: "Orhan"
        email:
          type: string
          format: email
          example: "mehmet@example.com"
        password:
          type: string
          format: password
          minLength: 6
          example: "StrongPass123!"
      required:
        - firstName
        - lastName
        - email
        - password

    UserLoginInput:
      type: object
      properties:
        email:
          type: string
          format: email
          example: "mehmet@example.com"
        password:
          type: string
          format: password
          example: "StrongPass123!"
      required:
        - email
        - password

    AuthResponse:
      type: object
      properties:
        token:
          type: string
          example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
        user:
          $ref: "#/components/schemas/User"
      required:
        - token
        - user

    UserUpdateInput:
      type: object
      properties:
        firstName:
          type: string
          minLength: 2
          maxLength: 50
          example: "Mehmet"
        lastName:
          type: string
          minLength: 2
          maxLength: 50
          example: "Orhan"
        email:
          type: string
          format: email
          example: "mehmet@example.com"

    PasswordChangeInput:
      type: object
      properties:
        currentPassword:
          type: string
          format: password
          example: "OldPass123!"
        newPassword:
          type: string
          format: password
          minLength: 6
          example: "NewPass456!"
      required:
        - currentPassword
        - newPassword

    AdminUserUpdateInput:
      type: object
      properties:
        firstName:
          type: string
          example: "Mehmet"
        lastName:
          type: string
          example: "Orhan"
        email:
          type: string
          format: email
          example: "mehmet@example.com"
        role:
          type: string
          enum: [user, admin]
          example: "admin"
        isActive:
          type: boolean
          example: true

    FavoritePlayerAddInput:
      type: object
      properties:
        playerId:
          type: string
          example: "ply789"
      required:
        - playerId

    FavoriteTeamAddInput:
      type: object
      properties:
        teamId:
          type: string
          example: "tm456"
      required:
        - teamId

    Favorites:
      type: object
      properties:
        userId:
          type: string
          example: "usr123"
        teams:
          type: array
          items:
            type: string
          example: ["tm456", "tm001"]
        players:
          type: array
          items:
            type: string
          example: ["ply789"]
      required:
        - userId
        - teams
        - players

    NotificationPreferences:
      type: object
      properties:
        transferNotifications:
          type: boolean
          example: true
        matchNotifications:
          type: boolean
          example: false
        emailNotifications:
          type: boolean
          example: true
      required:
        - transferNotifications
        - matchNotifications
        - emailNotifications

    NotificationPreferencesInput:
      type: object
      properties:
        transferNotifications:
          type: boolean
          example: true
        matchNotifications:
          type: boolean
          example: false
        emailNotifications:
          type: boolean
          example: true

    Player:
      type: object
      properties:
        _id:
          type: string
          example: "ply789"
        name:
          type: string
          example: "Ahmet Yılmaz"
        age:
          type: integer
          minimum: 15
          example: 24
        position:
          type: string
          example: "FW"
        nationality:
          type: string
          example: "Türkiye"
        teamId:
          type: string
          example: "tm456"
        teamName:
          type: string
          example: "Konyaspor"
        stats:
          $ref: "#/components/schemas/PlayerStats"
        marketValue:
          $ref: "#/components/schemas/Money"
      required:
        - _id
        - name
        - age
        - position

    PlayerStats:
      type: object
      properties:
        appearances:
          type: integer
          example: 28
        goals:
          type: integer
          example: 12
        assists:
          type: integer
          example: 7
        minutes:
          type: integer
          example: 2100

    Team:
      type: object
      properties:
        _id:
          type: string
          example: "tm456"
        name:
          type: string
          example: "Konyaspor"
        country:
          type: string
          example: "Türkiye"
        league:
          type: string
          example: "Süper Lig"
        standing:
          type: integer
          example: 6
        recentTransfers:
          type: array
          items:
            $ref: "#/components/schemas/Transfer"
      required:
        - _id
        - name
        - country
        - league

    TeamSquad:
      type: object
      properties:
        teamId:
          type: string
          example: "tm456"
        teamName:
          type: string
          example: "Konyaspor"
        players:
          type: array
          items:
            $ref: "#/components/schemas/Player"
      required:
        - teamId
        - teamName
        - players

    Transfer:
      type: object
      properties:
        _id:
          type: string
          example: "trf999"
        playerId:
          type: string
          example: "ply789"
        playerName:
          type: string
          example: "Ahmet Yılmaz"
        fromClubId:
          type: string
          example: "tm001"
        fromClubName:
          type: string
          example: "Galatasaray"
        toClubId:
          type: string
          example: "tm456"
        toClubName:
          type: string
          example: "Konyaspor"
        fee:
          $ref: "#/components/schemas/Money"
        date:
          type: string
          format: date
          example: "2026-01-15"
      required:
        - _id
        - playerId
        - fromClubId
        - toClubId
        - date

    Money:
      type: object
      properties:
        amount:
          type: number
          format: float
          example: 12.5
        currency:
          type: string
          example: "EUR"
      required:
        - amount
        - currency

    PaginatedPlayers:
      type: object
      properties:
        page:
          type: integer
          example: 1
        limit:
          type: integer
          example: 10
        total:
          type: integer
          example: 1240
        items:
          type: array
          items:
            $ref: "#/components/schemas/Player"
      required:
        - page
        - limit
        - total
        - items

    PaginatedTeams:
      type: object
      properties:
        page:
          type: integer
          example: 1
        limit:
          type: integer
          example: 10
        total:
          type: integer
          example: 120
        items:
          type: array
          items:
            $ref: "#/components/schemas/Team"
      required:
        - page
        - limit
        - total
        - items

    PaginatedTransfers:
      type: object
      properties:
        page:
          type: integer
          example: 1
        limit:
          type: integer
          example: 10
        total:
          type: integer
          example: 9800
        items:
          type: array
          items:
            $ref: "#/components/schemas/Transfer"
      required:
        - page
        - limit
        - total
        - items

    MarketValueResponse:
      type: object
      properties:
        playerId:
          type: string
          example: "ply789"
        current:
          $ref: "#/components/schemas/Money"
        history:
          type: array
          items:
            $ref: "#/components/schemas/MarketValuePoint"
      required:
        - playerId
        - current
        - history

    MarketValuePoint:
      type: object
      properties:
        date:
          type: string
          format: date
          example: "2025-08-01"
        value:
          $ref: "#/components/schemas/Money"
      required:
        - date
        - value

    TransferFitPredictionInput:
      type: object
      properties:
        playerId:
          type: string
          example: "ply789"
        teamId:
          type: string
          example: "tm456"
        includeTacticalAnalysis:
          type: boolean
          example: true
      required:
        - playerId
        - teamId

    TransferFitPrediction:
      type: object
      properties:
        predictionId:
          type: string
          example: "fit001"
        playerId:
          type: string
          example: "ply789"
        teamId:
          type: string
          example: "tm456"
        fitScore:
          type: number
          format: float
          example: 0.87
        tacticalFit:
          type: string
          example: "Yüksek"
        analysis:
          type: string
          example: "Oyuncunun oyun stili takımın geçiş hücumu yapısına uygundur."
        generatedOn:
          type: string
          format: date-time
          example: "2026-04-04T14:00:00Z"
      required:
        - predictionId
        - playerId
        - teamId
        - fitScore
        - tacticalFit
        - analysis
        - generatedOn

    PlayerValuePrediction:
      type: object
      properties:
        playerId:
          type: string
          example: "ply789"
        predictedValue:
          $ref: "#/components/schemas/Money"
        horizonMonths:
          type: integer
          example: 12
        factors:
          type: array
          items:
            type: string
          example:
            - "Performans artışı"
            - "Yaş faktörü"
            - "Lig seviyesi"
      required:
        - playerId
        - predictedValue
        - horizonMonths
        - factors

    TeamReport:
      type: object
      properties:
        teamId:
          type: string
          example: "tm456"
        performanceScore:
          type: number
          format: float
          example: 78.5
        tacticalSummary:
          type: string
          example: "Takım yüksek pres ve hızlı geçiş oyunu oynuyor."
        strengths:
          type: array
          items:
            type: string
          example:
            - "Kanat organizasyonları güçlü"
            - "Geçiş hücumları etkili"
        weaknesses:
          type: array
          items:
            type: string
          example:
            - "Savunma arkası koşulara açık"
            - "Duran top savunması zayıf"
        generatedOn:
          type: string
          format: date-time
          example: "2026-04-04T14:20:00Z"
      required:
        - teamId
        - performanceScore
        - tacticalSummary
        - strengths
        - weaknesses
        - generatedOn

    Comment:
      type: object
      properties:
        _id:
          type: string
          example: "cmt001"
        userId:
          type: string
          example: "usr123"
        targetType:
          type: string
          enum: [player, team, transfer]
          example: "player"
        targetId:
          type: string
          example: "ply789"
        content:
          type: string
          example: "Bu oyuncu takım için çok uygun görünüyor."
        createdAt:
          type: string
          format: date-time
          example: "2026-04-04T15:00:00Z"
        updatedAt:
          type: string
          format: date-time
          example: "2026-04-04T15:10:00Z"
      required:
        - _id
        - userId
        - targetType
        - targetId
        - content
        - createdAt

    CommentCreateInput:
      type: object
      properties:
        targetType:
          type: string
          enum: [player, team, transfer]
          example: "player"
        targetId:
          type: string
          example: "ply789"
        content:
          type: string
          minLength: 1
          maxLength: 1000
          example: "Bu oyuncu takım için çok uygun."
      required:
        - targetType
        - targetId
        - content

    CommentUpdateInput:
      type: object
      properties:
        content:
          type: string
          minLength: 1
          maxLength: 1000
          example: "Yorumu güncelledim."
      required:
        - content

    PaginatedComments:
      type: object
      properties:
        page:
          type: integer
          example: 1
        limit:
          type: integer
          example: 10
        total:
          type: integer
          example: 250
        items:
          type: array
          items:
            $ref: "#/components/schemas/Comment"
      required:
        - page
        - limit
        - total
        - items