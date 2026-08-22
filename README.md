# 📿 Tasbeeh Tracker — Frontend

A simple, clean web app to help you track your daily dhikr (Tasbeeh), set targets, and stay consistent with your remembrance of Allah — one count at a time.

> *"Remember Me; I will remember you."* — (Al-Baqarah, 2:152)

---

## ✨ Features

- 🔐 User authentication (Signup / Login)
- ➕ Add custom Tasbeeh with a name, target count and category
- 🔢 Live tap-to-count counter for each Tasbeeh
- 📊 Personal dashboard to view progress across all Tasbeehs
- 🤲 Dedicated page for the Virtues of Zikr
- 📱 Fully responsive — works smoothly on both mobile and desktop
- ⚡ Optimized for performance and SEO

---

## 🛠️ Technologies Used

- **HTML5**
- **CSS3**
- **Vanilla JavaScript**
- **GitHub Pages** (Hosting)

---

## 🚀 Live Demo

🔗 **Live App:** [https://hafsa-nazir03.github.io/tasbeeh-tracker-frontend/login.html]

---

## 🔗 Backend Repository

🔗 **Backend Repo:** [https://github.com/hafsa-nazir03/tasbeeh-tracker-backend]

🔗 **Live Backend API:** [https://tasbeeh-tracker-backend.vercel.app]

---

## 🏗️ Architecture

```
Frontend (HTML/CSS/JS)  --->  Backend API (Node.js + Express, hosted on Vercel)  --->  MongoDB Atlas
   Hosted on GitHub Pages          JWT-based Authentication                          Cloud Database
```

- The frontend is a static site (plain HTML/CSS/JS) hosted on **GitHub Pages**.
- It communicates with the backend over REST API calls (`config.js` holds the base API URL).
- The backend is deployed separately on **Vercel** and handles authentication, and persistence via **MongoDB Atlas**.
- Auth state is managed client-side using JWT tokens returned by the backend.

---

## 📈 SEO & Lighthouse Results

SEO essentials implemented across pages:
- ✅ Descriptive page titles
- ✅ Meta descriptions
- ✅ Alt text on all images

**Lighthouse Audit (Deployed Site):**

| Category        | Score |
|------------------|-------|
| Performance      | 98    |
| Accessibility    | 100 ✅ (fixed) |
| Best Practices   | 100   |
| SEO              | 100   |

**Accessibility issues found & fixed:**
- ❌ ➜ ✅ Low color contrast on text/buttons — fixed by adjusting colors to meet contrast ratio standards.
- ❌ ➜ ✅ Missing main landmark on the login page — fixed by wrapping page content in a proper `<main>` landmark.
- ❌ ➜ ✅ Improperly placed "Back to Tracker" anchor tag on virtues.html — fixed by repositioning it and making it responsive to improve accessibility and navigation flow.

---

## ⚙️ Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/hafsa-nazir03/tasbeeh-tracker-frontend.git
   cd tasbeeh-tracker-frontend
   ```

2. **Configure the API URL**

   Open `config.js` and make sure it points to your backend (local or deployed):
   ```js
   const API_URL = "https://tasbeeh-tracker-backend.vercel.app";
   ```

3. **Run locally**

   Since this is a static site, you can simply open `login.html` in your browser, or serve it with a local server:
   ```bash
   npx serve .
   ```

4. **Deploy**

   This project is deployed using **GitHub Pages** — pushing to the `main` branch automatically reflects on the live site (or via GitHub repo settings → Pages).

---

## 👩‍💻 Author

**Hafsa Nazir**
