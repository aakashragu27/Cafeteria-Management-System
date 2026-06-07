# Cafeteria Website - Backend API

Express.js + MongoDB REST API for the Cafeteria website ordering system.

## 📋 Table of Contents

- [Getting Started](#getting-started)
- [API Endpoints](#api-endpoints)
- [Database Models](#database-models)
- [Configuration](#configuration)
- [Running the Server](#running-the-server)
- [Testing](#testing)

## 🚀 Getting Started

### Prerequisites

- Node.js v14+
- MongoDB (local or MongoDB Atlas)

### Installation

```bash
npm install
```

### Environment Setup

Create a `.env` file with:

```env
MONGODB_URI=mongodb://localhost:27017/cafeteria
PORT=5000
NODE_ENV=development
JWT_SECRET=your_secret_key
```

## 📚 API Endpoints

### Menu Management

#### Get All Menu Items
```
GET /api/menu
```
Query Parameters:
- `category` (optional): Filter by category (Breakfast, Lunch, Beverages, Pastry, Sandwiches)

Example:
```
GET /api/menu?category=Breakfast
```

Response:
```json
[
  {
	"_id": "507f1f77bcf86cd799439011",
	"name": "Pancakes",
	"category": "Breakfast",
	"price": 8.99,
	"description": "Fluffy pancakes with maple syrup",
	"available": true,
	"createdAt": "2024-01-15T10:30:00Z"
  }
]
```

#### Get Menu Item by ID
```
GET /api/menu/:id
```

#### Create Menu Item (Admin)
```
POST /api/menu
Content-Type: application/json

{
  "name": "Espresso",
  "category": "Beverages",
  "price": 3.99,
  "description": "Strong espresso shot",
  "available": true
}
```

#### Update Menu Item (Admin)
```
PUT /api/menu/:id
Content-Type: application/json

{
  "price": 4.99,
  "available": true
}
```

#### Delete Menu Item (Admin)
```
DELETE /api/menu/:id
```

### Order Management

#### Get All Orders
```
GET /api/orders
```

Response:
```json
[
  {
	"_id": "507f1f77bcf86cd799439012",
	"customerName": "John Doe",
	"email": "john@example.com",
	"phone": "1234567890",
	"items": [
	  {
		"name": "Coffee",
		"price": 3.50,
		"quantity": 2
	  }
	],
	"totalPrice": 7.00,
	"status": "pending",
	"createdAt": "2024-01-15T11:00:00Z"
  }
]
```

#### Get Order by ID
```
GET /api/orders/:id
```

#### Create Order
```
POST /api/orders
Content-Type: application/json

{
  "customerName": "Jane Smith",
  "email": "jane@example.com",
  "phone": "9876543210",
  "items": [
	{
	  "name": "Cappuccino",
	  "price": 4.50,
	  "quantity": 1
	},
	{
	  "name": "Croissant",
	  "price": 3.50,
	  "quantity": 2
	}
  ],
  "totalPrice": 11.50,
  "deliveryAddress": "123 Main St",
  "specialNotes": "Extra hot"
}
```

#### Update Order Status
```
PUT /api/orders/:id
Content-Type: application/json

{
  "status": "confirmed"
}
```

Valid statuses: `pending`, `confirmed`, `preparing`, `ready`, `completed`, `cancelled`

#### Delete Order
```
DELETE /api/orders/:id
```

### Contact Messages

#### Get All Contacts
```
GET /api/contact
```

#### Create Contact Message
```
POST /api/contact
Content-Type: application/json

{
  "name": "Alice Johnson",
  "email": "alice@example.com",
  "phone": "5555555555",
  "subject": "Inquiry",
  "message": "I have a question about catering"
}
```

#### Update Contact Status
```
PUT /api/contact/:id
Content-Type: application/json

{
  "status": "reviewed"
}
```

Valid statuses: `new`, `reviewed`, `responded`

### Health Check

```
GET /api/health
```

Response:
```json
{
  "status": "Backend is running"
}
```

## 🗄️ Database Models

### Menu Schema
```javascript
{
  name: String (required),
  category: String (enum: ['Breakfast', 'Lunch', 'Beverages', 'Pastry', 'Sandwiches']),
  price: Number (required),
  description: String,
  image: String,
  available: Boolean (default: true),
  createdAt: Date (default: now)
}
```

### Order Schema
```javascript
{
  customerName: String (required),
  email: String (required),
  phone: String (required),
  items: [
	{
	  menuId: ObjectId,
	  name: String,
	  price: Number,
	  quantity: Number
	}
  ],
  totalPrice: Number (required),
  status: String (enum: ['pending', 'confirmed', 'preparing', 'ready', 'completed', 'cancelled']),
  deliveryAddress: String,
  specialNotes: String,
  createdAt: Date (default: now),
  updatedAt: Date (default: now)
}
```

### Contact Schema
```javascript
{
  name: String (required),
  email: String (required),
  phone: String,
  subject: String,
  message: String (required),
  status: String (enum: ['new', 'reviewed', 'responded'], default: 'new'),
  createdAt: Date (default: now)
}
```

## ⚙️ Configuration

### Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `MONGODB_URI` | `mongodb://localhost:27017/cafeteria` | MongoDB connection string |
| `PORT` | `5000` | Server port |
| `NODE_ENV` | `development` | Environment (development/production) |
| `JWT_SECRET` | `your_jwt_secret_key_change_this_in_production` | JWT secret for authentication |

## ▶️ Running the Server

### Development Mode (with auto-reload)
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

### Initialize Database with Sample Data
```bash
npm run seed
```

### Run Tests
```bash
npm test
```

## 🧪 Testing

A test script is included to verify all endpoints are working:

```bash
npm test
```

This will:
1. Check health endpoint
2. Get menu items
3. Get items by category
4. Create a contact message
5. Create an order
6. Get all orders

All tests should pass if backend is properly configured.

## 📁 Project Structure

```
backend/
├── models/
│   ├── Menu.js          # Menu item schema
│   ├── Order.js         # Order schema
│   └── Contact.js       # Contact message schema
├── routes/
│   ├── menuRoutes.js    # Menu endpoints
│   ├── orderRoutes.js   # Order endpoints
│   └── contactRoutes.js # Contact endpoints
├── server.js            # Main server file
├── seedDatabase.js      # Sample data initialization
├── testBackend.js       # Test script
├── package.json
├── .env
└── .gitignore
```

## 🔗 CORS Configuration

CORS is enabled by default to allow requests from `http://localhost:5173` (Vite frontend).

To modify CORS settings, edit the `cors()` middleware in `server.js`:

```javascript
app.use(cors({
  origin: 'http://localhost:3000', // Change as needed
  credentials: true
}));
```

## 🐛 Common Issues

### MongoDB Connection Failed
- Ensure MongoDB is running
- Check connection string in `.env`
- Verify network access (if using Atlas)

### Port 5000 Already in Use
- Change `PORT` in `.env`
- Or kill the process using the port

### CORS Errors
- Ensure backend is running on correct port
- Check CORS configuration in `server.js`

## 📖 Dependencies

- **express**: Web framework
- **mongoose**: MongoDB ODM
- **dotenv**: Environment variable management
- **cors**: Cross-origin request handling
- **bcryptjs**: Password hashing (for future auth)
- **jsonwebtoken**: JWT authentication (for future auth)
- **express-validator**: Input validation (for future use)
- **nodemon**: Development auto-reload

## 📝 License

ISC

## 👥 Support

For issues or questions about the backend API, check:
1. BACKEND_SETUP.md in root directory
2. INTEGRATION_GUIDE.md in root directory
3. MongoDB documentation: https://docs.mongodb.com/
4. Express.js documentation: https://expressjs.com/
