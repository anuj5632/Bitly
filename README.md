#  LinkLytics – Smart URL Shortener (Bitly Clone)

 **Live Demo:** [https://ubiquitous-hamster-1daabf.netlify.app/](https://ubiquitous-hamster-1daabf.netlify.app/)

---

##  Overview

**LinkLytics** is a full-stack URL shortening platform inspired by Bitly. It enables users to generate short links, manage them efficiently, and analyze link performance.

This project demonstrates real-world system design with a modern frontend, scalable backend, and clean project architecture.

---

##  Features

*  URL shortening with unique short codes
*  Fast and reliable redirection
*  Basic analytics tracking (clicks, usage)
*  Organized link management
*  Responsive and clean UI
*  Scalable full-stack architecture

---

##  Tech Stack

### Frontend

* Vite
* HTML, Tailwind CSS
* Javascript
* React

### Backend

* Java (Spring Boot)
* Maven

### Database

* For locoal host : MySQL
* Production : Postgre SQL

### Deployment

* Netlify (Frontend)
* Render (Dackend)
* Neon DB (Database)

---

##  Project Structure

```
LinkLytics/
│
├── backend/
│   ├── .mvn/wrapper/        # Maven wrapper files
│   ├── src/                 # Spring Boot source code
│   ├── .env                 # Environment variables
│   ├── pom.xml              # Maven dependencies
│   ├── mvnw / mvnw.cmd      # Maven wrapper scripts
│   └── .gitignore
│
├── frontend/
│   ├── public/              # Static assets
│   ├── src/                 # Frontend source code
│   ├── .env                 # Environment variables
│   ├── index.html
│   ├── package.json         # Dependencies
│   ├── vite.config.js       # Vite configuration
│   ├── tailwind.config.js   # Tailwind config
│   ├── postcss.config.cjs
│   └── eslint.config.js
│
├── .gitignore
├── .gitattributes
└── README.md
```

---

##  How It Works

1. User inputs a long URL in the frontend
2. Frontend sends request to backend API
3. Backend generates a unique short ID
4. URL + ID stored in database
5. Short URL is returned to user
6. On visiting short URL → backend redirects to original link

---

##  Installation & Setup

###  Clone the Repository

```
git clone https://github.com/your-username/linklytics.git
cd linklytics
```

---

###  Backend Setup (Spring Boot)

```
cd backend
./mvnw spring-boot:run
```

Backend runs on:

```
http://localhost:8080
```

---

###  Frontend Setup (Vite)

```
cd frontend
npm install
npm run dev
```

Frontend runs on:

```
http://localhost:5173
```

---

##  Environment Variables

### Backend (.env)

```
PORT=8080
DB_URL=your_database_url
BASE_URL=http://localhost:8080
```

### Frontend (.env)

```
VITE_API_BASE_URL=http://localhost:8080
```

---

##  API Endpoints (Sample)

| Method | Endpoint        | Description              |
| ------ | --------------- | ------------------------ |
| POST   | /shorten        | Create short URL         |
| GET    | /{shortId}      | Redirect to original URL |
| GET    | /analytics/{id} | Get analytics data       |

---

##  Future Enhancements

* Advanced analytics (location, device, browser)
*  Link expiration
*  Mobile app integration

---

##  Contributing

1. Fork the repo
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a pull request

---

##  Author

**Anuj Chandrakar**
ML & Full Stack Developer

---

##  Support

If you found this project helpful, give it a ⭐ and share it!

---

 *Link smarter. Track better. Build faster with LinkLytics.*
