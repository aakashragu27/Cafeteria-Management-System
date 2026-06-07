# Cafeteria Website - Full Stack Setup

This project consists of a React frontend and Express.js backend with MongoDB database.

## Project Structure

```
cafeteria-website/
├── src/                    # React frontend
│   ├── components/
│   ├── pages/
│   ├── services/
│   │   └── api.js         # API client for backend communication
│   ├── App.jsx
│   └── main.jsx
├── backend/               # Express.js backend
│   ├── models/            # MongoDB schemas
│   │   ├── Menu.js
│   │   ├── Order.js
│   │   └── Contact.js
│   ├── routes/            # API routes
│   │   ├── menuRoutes.js
│   │   ├── orderRoutes.js
│   │   └── contactRoutes.js
│   ├── server.js          # Main server file
│   ├── .env               # Environment variables
│   └── package.json
├── package.json           # Frontend dependencies
└── README.md
```

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or MongoDB Atlas cloud)
- npm or yarn

## Setup Instructions

### 1. MongoDB Setup

**Option A: Local MongoDB**
- Download and install from: https://www.mongodb.com/try/download/community
- Start MongoDB service

**Option B: MongoDB Atlas (Cloud)**
- Create account at: https://www.mongodb.com/cloud/atlas
- Create a cluster and get connection string
- Update `backend/.env` with your connection string

### 2. Backend Setup

```powershell
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Update .env file with your MongoDB connection string
# MONGODB_URI=mongodb://localhost:27017/cafeteria

# Start development server
npm run dev

# Or for production
npm start
```

The backend will run on `http://localhost:5000`

### 3. Frontend Setup

```powershell
# In root directory
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

The frontend will run on `http://localhost:5173` (Vite default)

## API Endpoints

### Menu Routes
- `GET /api/menu` - Get all menu items
- `GET /api/menu?category=Breakfast` - Get items by category
- `GET /api/menu/:id` - Get specific menu item
- `POST /api/menu` - Create menu item (admin)
- `PUT /api/menu/:id` - Update menu item (admin)
- `DELETE /api/menu/:id` - Delete menu item (admin)

### Order Routes
- `GET /api/orders` - Get all orders
- `GET /api/orders/:id` - Get specific order
- `POST /api/orders` - Create new order
- `PUT /api/orders/:id` - Update order status
- `DELETE /api/orders/:id` - Delete order

### Contact Routes
- `GET /api/contact` - Get all contact messages
- `POST /api/contact` - Submit contact form
- `PUT /api/contact/:id` - Update contact status

### Health Check
- `GET /api/health` - Check if backend is running

## Using the API Client

The frontend includes an API client utility in `src/services/api.js`:

```javascript
import { getMenuItems, createOrder, submitContact } from './services/api.js';

// Get menu items
const items = await getMenuItems('Breakfast');

// Create order
const order = await createOrder({
  customerName: 'John Doe',
  email: 'john@example.com',
  phone: '1234567890',
  items: [{name: 'Coffee', price: 3.50, quantity: 1}],
  totalPrice: 3.50
});

// Submit contact form
const contact = await submitContact({
  name: 'Jane',
  email: 'jane@example.com',
  message: 'Great service!'
});
```

## Environment Variables

### Backend (.env)
```
MONGODB_URI=mongodb://localhost:27017/cafeteria
PORT=5000
NODE_ENV=development
JWT_SECRET=your_jwt_secret_key_change_this_in_production
```

## Technologies Used

### Frontend
- React 18
- Vite
- React Router
- Bootstrap
- Axios

### Backend
- Express.js
- MongoDB
- Mongoose
- CORS
- JWT (for future authentication)

## Running Both Frontend and Backend

**Terminal 1 - Backend:**
```powershell
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```powershell
npm run dev
```

## Notes

- Ensure MongoDB is running before starting the backend
- Frontend API calls are configured to hit `http://localhost:5000/api`
- For production, update the API_BASE_URL in `src/services/api.js`
- CORS is enabled to allow frontend-backend communication

## Troubleshooting

**MongoDB Connection Error:**
- Ensure MongoDB is running
- Check connection string in `.env`
- Verify network access if using MongoDB Atlas

**CORS Error:**
- Ensure backend is running on port 5000
- Check that CORS is enabled in server.js

**API Calls Fail:**
- Verify backend server is running (`npm run dev` in backend folder)
- Check browser console for error details
- Ensure correct API endpoint URLs
