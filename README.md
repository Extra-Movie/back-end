# 🎬 BlockBuster - Movie & TV Streaming Backend API

BlockBuster is a full-featured Node.js backend built with Express and MongoDB. It provides a robust API for managing movies, TV shows, genres, and user accounts. This backend integrates with [The Movie Database (TMDB)](https://www.themoviedb.org/) to fetch real-time movie and TV show data.

---

## 🛠️ Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB + Mongoose
- **Auth:** JWT (JSON Web Tokens)
- **Docs:** Swagger (OpenAPI 3.0)
- **File Upload:** Multer
- **API Integration:** TMDB (axios)

---

## 📁 Project Structure

```bash
├── controllers/
├── middleware/
├── models/
├── routes/
├── services/
├── seed/
├── uploads/
├── app.js
├── server.js
```

---

## 📦 Installation & Setup

1. **Clone the repository**
```bash
git clone https://github.com/your-username/blockbuster-backend.git
cd blockbuster-backend
```

2. **Install dependencies**
```bash
npm install
```

3. **Start the development server**
```bash
npm run dev
```

> Make sure MongoDB is running locally or update your `MONGO_URI`.

---

## 🌐 API Documentation

Swagger docs available at:

```
http://localhost:8000/api-docs
```

---

## 🔐 Authentication Flow

- **Register:** `/api/auth/register`
- **Login:** `/api/auth/login`
- On successful login, a JWT token is returned. Use it in `Authorization` headers as:
  ```
  Authorization: Bearer <your_token>
  ```

---

## 📬 API Endpoints Overview

### 🔐 Auth
- `POST /api/auth/register`
- `POST /api/auth/login`

### 🎥 Movies
- `GET /api/movies`
- `GET /api/movies/top`
- `GET /api/movies/:id`
- `POST /api/movies` *(admin only)*
- `DELETE /api/movies/:id` *(admin only)*

### 📺 TV Shows
- `GET /api/tvshows`
- `GET /api/tvshows/top`
- `GET /api/tvshows/:id`
- `POST /api/tvshows` *(admin only)*
- `DELETE /api/tvshows/:id` *(admin only)*

### 🎭 Genres
- `GET /api/genres/movie`
- `GET /api/genres/tv`

### 👤 Users
- `GET /api/users` *(admin only)*
- `GET /api/users/:id`
- `PUT /api/users/:id`
- `DELETE /api/users/:id`
- `PATCH /api/users/:id` *(admin only: make admin)*

---

## 🧪 Testing

You can use tools like [Postman](https://www.postman.com/) or Swagger UI to test the API.

---

## 📸 Sample Screenshots

_Add Swagger UI screenshots or response samples here if needed._

---

## 🤝 Contribution

1. Fork the repo
2. Create a new branch (`git checkout -b feat/something`)
3. Commit your changes
4. Push to your fork
5. Submit a Pull Request

---