# 🚗 CarRental – Full Stack MERN Booking Platform

A production-ready full-stack Car Rental Web Application built using the MERN Stack (MongoDB, Express, React, Node.js).  
The platform enables users to browse, search, and book cars in real-time while providing role-based dashboards for owners to manage vehicle listings and bookings.

Designed with scalability, clean architecture, and modern UI/UX principles.

---

## 🌐 Live Demo

Frontend: https://car-rental-psi-three-49.vercel.app 
Backend API: https://car-rental-server-flame-kappa.vercel.app

---

## ✨ Core Features

### User Features

- Secure authentication (JWT-based login & registration)
- Browse available cars
- Dynamic search and filtering (brand, model, category, transmission, location)
- Location-based car discovery
- Pickup and return date selection
- Real-time availability checking
- Booking history tracking
- Profile data and image management
- Fully responsive UI
- Toast notifications for user feedback

---

### Owner Features

- Role-based access control
- Add new car listings with image upload
- Edit and toggle car availability
- Delete car listings
- View bookings for owned vehicles
- Owner dashboard insights
- Update profile image

---

## 📦 Application Workflow

1. User registers or logs in.
2. User searches cars by location and dates.
3. Backend validates booking availability.
4. Available cars are returned dynamically.
5. User creates a booking.
6. Booking is stored in MongoDB.
7. Owner dashboard reflects updated booking status.

---

## 🏗 Tech Stack

### Frontend

- React 19
- React Router DOM 7
- Axios
- Tailwind CSS 4
- Framer Motion (motion)
- React Hot Toast
- Vite

Environment Variables (client/.env):

```
VITE_CURRENCY=your_currency_symbol
VITE_BASE_URL=your_backend_api_url
```

---

### Backend

- Express 5
- MongoDB & Mongoose
- JWT (jsonwebtoken)
- Bcrypt
- Multer (file uploads)
- ImageKit (cloud image storage)
- CORS
- Dotenv

Environment Variables (server/.env):

```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
IMAGEKIT_URL_ENDPOINT=your_imagekit_url_endpoint
```

---

## 🗂 Project Structure

```
CarRental-MERN/
│
├── client/                # React frontend
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   ├── utils/
│   │   └── assets/
│   └── package.json
│
├── server/                # Express backend
│   ├── controllers/
│   ├── routes/
│   ├── models/
│   ├── middleware/
│   ├── utils/
│   └── server.js
│
└── README.md
```

---

## 🔐 Authentication & Authorization

- Passwords are securely hashed using bcrypt.
- JWT token is generated upon login.
- Protected routes use authentication middleware (`protect`).
- Owner-specific routes are restricted via role validation.

---

## 📡 API Endpoints

### User Routes

| Method | Endpoint | Description |
|--------|----------|------------|
| POST | /api/user/register | Register new user |
| POST | /api/user/login | Login user |
| GET | /api/user/data | Get authenticated user data |
| GET | /api/user/cars | Get all cars |

---

### Booking Routes

| Method | Endpoint | Description |
|--------|----------|------------|
| POST | /api/bookings/check-availability | Check car availability |
| POST | /api/bookings/create | Create booking |
| GET | /api/bookings/user | Get user bookings |
| GET | /api/bookings/owner | Get owner bookings |
| POST | /api/bookings/change-status | Update booking status |

---

### Owner Routes

| Method | Endpoint | Description |
|--------|----------|------------|
| POST | /api/owner/change-role | Become owner |
| POST | /api/owner/add-car | Add new car (with image upload) |
| GET | /api/owner/cars | Get owner cars |
| POST | /api/owner/toggle-car | Toggle car availability |
| POST | /api/owner/delete-car | Delete car |
| GET | /api/owner/dashboard | Get dashboard data |
| POST | /api/owner/update-image | Update profile image |

---

## ⚙ Installation & Setup

### 1. Clone Repository

```bash
git clone https://github.com/psucho924/CarRental-MERN.git
cd CarRental-MERN
```

### 2. Backend Setup

```bash
cd server
npm install
```

Create a `.env` file inside the server folder using the variables listed above.

Run backend:

```bash
npm run dev
```

### 3. Frontend Setup

```bash
cd ../client
npm install
```

Create a `.env` file inside the client folder using the variables listed above.

Run frontend:

```bash
npm run dev
```

---

## 🚀 Deployment

Recommended approach:

Frontend → Vercel  
Backend: Vercel (Serverless Express API)

All environment variables configured securely in Vercel project settings.

---

## 📈 Future Enhancements

- Payment integration (Stripe / Razorpay)
- Review and rating system
- Advanced analytics dashboard
- Calendar-based availability visualization
- Email notifications
- Progressive Web App (PWA) support

---

## 🎯 Resume-Ready Description

Developed a full-stack Car Rental platform using the MERN stack featuring JWT authentication, role-based access control, real-time availability checking, dynamic filtering, image upload with ImageKit integration, and a fully responsive UI built with Tailwind CSS and Framer Motion.

---

## 👨‍💻 Author

Umesh Kumar  
GitHub: https://github.com/psucho924

---

## 📜 License

This project is open-source and available for educational and demonstration purposes.

