# Swiggy / Zomato Food Discovery Platform 🍔🚀

A full-stack, multi-role food ordering and culinary discovery web application featuring dedicated workflows for customers and food partners (restaurants/kitchens), media uploads via ImageKit CDN, and saved collections.

[![GitHub Repo](https://img.shields.io/badge/GitHub-Repository-181717?style=flat&logo=github)](https://github.com/DeveloperHarshal92/03---Swiggysta.git)
[![React](https://img.shields.io/badge/React-19.2-61DAFB?style=flat&logo=react)](https://react.dev/)
[![Express](https://img.shields.io/badge/Express-5.2-000000?style=flat&logo=express)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-47A248?style=flat&logo=mongodb)](https://mongoosejs.com/)
[![ImageKit](https://img.shields.io/badge/ImageKit-CDN_Storage-0052CC?style=flat)](https://imagekit.io/)

---

## 🌟 Key Features

- **Dual-Role Authentication Ecosystem**: Isolated registration, login, and authorization pathways for regular consumers (`User`) and restaurant partners (`FoodPartner`).
- **Food Partner Vendor Portal**: Dedicated interface allowing restaurants to publish dishes, specify descriptions, pricing, culinary categories, and upload high-res food photography.
- **Interactive Discovery Feed**: Social-style browsing feed for discovering trending dishes, neighborhood restaurants, and culinary specials.
- **Social Engagement & Bookmarks**: Like counters and personal "Saved Dishes" collections stored in MongoDB.
- **Mobile-First UX**: Responsive mobile-friendly bottom navigation, clean CSS custom property design system, and fluid view transitions.

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 19, Vite
- **Routing**: React Router DOM v7
- **Icons**: Lucide React
- **Styling**: Vanilla CSS Design Tokens (`variable.css`, `global.css`, `bottom-nav.css`)
- **Networking**: Axios

### Backend
- **Server Runtime**: Node.js, Express v5
- **Database**: MongoDB, Mongoose v9
- **Media Engine**: ImageKit SDK, Multer
- **Security & Auth**: JWT (JSON Web Tokens), `bcryptjs`, `cookie-parser`

---

## 📁 Repository Architecture

```
03 - Swiggy/
├── Backend/
│   ├── src/
│   │   ├── controllers/     # Auth, Food, FoodPartner controllers
│   │   ├── db/              # MongoDB connection
│   │   ├── middleware/      # JWT auth guard
│   │   ├── models/          # User, FoodPartner, Food, Like, Save
│   │   ├── routes/          # Express API route declarations
│   │   └── services/        # ImageKit cloud media service
│   ├── server.js            # Main backend entry point
│   └── package.json
└── Frontend/
    ├── src/
    │   ├── pages/
    │   │   ├── auth/         # User & Partner Login/Register
    │   │   ├── food-partner/ # CreateFood, Partner Profile
    │   │   └── general/      # Feed, Home, Saved, BottomNav
    │   ├── styles/           # CSS design modules
    │   ├── routes/           # AppRoutes
    │   └── App.jsx
    └── package.json
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- MongoDB Atlas or local MongoDB
- ImageKit account

### 1. Configure & Run Backend
```bash
cd Backend
npm install
```
Create `.env` in `Backend/`:
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
IMAGEKIT_URL_ENDPOINT=your_imagekit_url_endpoint
```
Start server:
```bash
npm run dev
```

### 2. Configure & Run Frontend
```bash
cd ../Frontend
npm install
npm run dev
```

---

## 📡 API Overview

| Route | Method | Role | Description |
| :--- | :--- | :--- | :--- |
| `/api/auth/user/register` | POST | User | Register consumer account |
| `/api/auth/food-partner/register` | POST | Partner | Register restaurant partner |
| `/api/food` | GET | All | Browse food catalog & feed |
| `/api/food` | POST | Partner | Upload new food item with media |
| `/api/food/like/:id` | POST | User | Like / unlike food item |
| `/api/food/save/:id` | POST | User | Save dish to personal collection |

---

## 📄 License
ISC License. Built for portfolio showcase.
