# Aqua Vita - Premium Water Experience

Aqua Vita is a modern, premium e-commerce platform dedicated to delivering the finest filtered water products. With a focus on user experience and aesthetic design, Aqua Vita offers a seamless shopping journey for health-conscious consumers.

## 🚀 Experience the Live App

Visit the live application: **[Aqua Vita](https://aqua-vita-psi.vercel.app/)**

**Test Credentials:**
- **Email:** `demo@aquavita.com`
- **Password:** `demo123`

---

## ✨ Features

- **Seamless E-commerce Experience**: Browse products, manage cart, and checkout with ease.
- **User Authentication**: Secure Login and Registration using JWT.
- **Interactive Design**: Glassmorphism UI, smooth animations, and responsive layout.
- **Smart Cart**: Persistent cart functionality synchronized with user accounts.
- **User Profile**: Manage order history and personal details.
- **AI Chatbot**: Intelligent assistant for customer support.
- **Responsive**: Fully optimized for Desktop, Tablet, and Mobile devices.

---

## 🛠️ Technology Stack

### Frontend
- **Framework**: [React](https://react.dev/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Routing**: [React Router](https://reactrouter.com/)
- **Styling**: Vanilla CSS (Custom Design System, Glassmorphism)
- **Icons**: [Lucide React](https://lucide.dev/)

### Backend
- **Runtime**: [Node.js](https://nodejs.org/)
- **Framework**: [Express.js](https://expressjs.com/)
- **Database**: [MongoDB](https://www.mongodb.com/) (Atlas/Local)
- **Authentication**: JWT (JSON Web Tokens)
- **Security**: bcryptjs for password hashing

---

## ⚙️ Installation & Setup

Follow these steps to set up the project locally.

### Prerequisites
- Node.js (v18+ recommended)
- MongoDB (Local instance or Atlas URI)

### 1. Clone the Repository
```bash
git clone https://github.com/AnindyaHazra1/Aqua-Vita.git
cd Aqua-Vita
```

### 2. Backend Setup
Navigate to the server directory and install dependencies:
```bash
cd server
npm install
```

Create a `.env` file in the `server` directory:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/premium_water
JWT_SECRET=your_jwt_secret_key_here
```

Start the backend server:
```bash
npm run dev
```

### 3. Frontend Setup
Open a new terminal, navigate to the client directory, and install dependencies:
```bash
cd client
npm install
```

Create a `.env` file in the `client` directory (optional, defaults to localhost):
```env
VITE_API_URL=http://localhost:5000/api
```

Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`.

---

## 📂 Project Structure

```
Aqua-Vita/
├── client/                 # Frontend React Application
│   ├── src/
│   │   ├── components/     # Reusable UI Components
│   │   ├── context/        # React Context (Auth, Toast)
│   │   ├── pages/          # Application Pages (Home, Shop, etc.)
│   │   └── ...
│   └── ...
├── server/                 # Backend Express Application
│   ├── models/             # Mongoose Models
│   ├── routes/             # API Routes
│   ├── seed/               # Database Seeding Scripts
│   └── ...
└── README.md
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
