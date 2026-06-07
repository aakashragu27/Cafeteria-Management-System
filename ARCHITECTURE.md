# Architecture Overview

## System Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                     CLIENT BROWSER                              │
│                   http://localhost:5173                          │
│                                                                   │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │              React Frontend (Vite)                        │  │
│  │                                                            │  │
│  │  ┌─────────────────────────────────────────────────────┐ │  │
│  │  │  Components                                         │ │  │
│  │  │  ├── Home/                  ├── Header/            │ │  │
│  │  │  ├── Menu/                  ├── Footer/            │ │  │
│  │  │  ├── Order/                 ├── Events/            │ │  │
│  │  │  └── form.jsx ◄────────┐    └── ...                │ │  │
│  │  └─────────────────────────┼─────────────────────────┘ │  │
│  │                             │                           │  │
│  │  ┌─────────────────────────┴────────────────────────┐ │  │
│  │  │  Services Layer (API Client)                     │ │  │
│  │  │  ┌────────────────────────────────────────────┐  │ │  │
│  │  │  │  src/services/api.js                       │  │ │  │
│  │  │  │  - getMenuItems()                          │  │ │  │
│  │  │  │  - createOrder()                           │  │ │  │
│  │  │  │  - submitContact()                         │  │ │  │
│  │  │  │  - updateOrderStatus()                     │  │ │  │
│  │  │  └────────────────────────────────────────────┘  │ │  │
│  │  └────────────────────────────────────────────────┘ │  │
│  │                                                       │  │
│  └─────────────────────────────────────────────────────┘  │
│                            │                               │
│                     AXIOS HTTP CLIENT                      │
│                            │                               │
└────────────────────────────┼────────────────────────────────┘
							 │
				   ┌─────────┴──────────┐
				   │ JSON over HTTP/S   │
				   │   CORS Enabled     │
				   └─────────┬──────────┘
							 │
		┌────────────────────┼────────────────────┐
		│                    │                    │
┌───────▼────────────────────────────────────────────────────────┐
│                EXPRESS.JS BACKEND                              │
│             http://localhost:5000/api                          │
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐ │
│  │              API Routes Layer                            │ │
│  │                                                           │ │
│  │  ┌──────────────────┐  ┌──────────────────┐            │ │
│  │  │  Menu Routes     │  │  Order Routes    │            │ │
│  │  ├──────────────────┤  ├──────────────────┤            │ │
│  │  │ GET /api/menu    │  │ GET /api/orders  │            │ │
│  │  │ POST /api/menu   │  │ POST /api/orders │            │ │
│  │  │ PUT /api/menu    │  │ PUT /api/orders  │            │ │
│  │  │ DELETE /api/menu │  │ DELETE /api/orders            │ │
│  │  └──────────────────┘  └──────────────────┘            │ │
│  │                                                           │ │
│  │  ┌──────────────────┐  ┌──────────────────┐            │ │
│  │  │ Contact Routes   │  │ Health Check     │            │ │
│  │  ├──────────────────┤  ├──────────────────┤            │ │
│  │  │ GET /api/contact │  │ GET /api/health  │            │ │
│  │  │ POST /api/contact│  └──────────────────┘            │ │
│  │  │ PUT /api/contact │                                   │ │
│  │  └──────────────────┘                                   │ │
│  └──────────────────────────────────────────────────────────┘ │
│                            │                                   │
│  ┌──────────────────────────┴──────────────────────────────┐  │
│  │              Business Logic Layer                       │  │
│  │                                                          │  │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐    │  │
│  │  │  Menu       │  │  Order      │  │  Contact    │    │  │
│  │  │  Operations │  │  Operations │  │  Operations │    │  │
│  │  │             │  │             │  │             │    │  │
│  │  │ - CRUD      │  │ - Create    │  │ - Submit    │    │  │
│  │  │ - Filter    │  │ - Track     │  │ - Respond   │    │  │
│  │  │ - Search    │  │ - Update    │  │ - Archive   │    │  │
│  │  └─────────────┘  └─────────────┘  └─────────────┘    │  │
│  └──────────────────────────────────────────────────────────┘  │
│                            │                                    │
│  ┌──────────────────────────┴──────────────────────────────┐  │
│  │              Mongoose (ODM) Layer                       │  │
│  │                                                          │  │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐    │  │
│  │  │ Menu        │  │ Order       │  │ Contact     │    │  │
│  │  │ Schema      │  │ Schema      │  │ Schema      │    │  │
│  │  └─────────────┘  └─────────────┘  └─────────────┘    │  │
│  └──────────────────────────────────────────────────────────┘  │
│                            │                                    │
└────────────────────────────┼────────────────────────────────────┘
							 │
				  ┌──────────┴──────────┐
				  │ Mongoose Queries    │
				  │ (Insert, Update,    │
				  │  Find, Delete)      │
				  └──────────┬──────────┘
							 │
┌────────────────────────────┼────────────────────────────────────┐
│                      MONGODB DATABASE                           │
│                    mongodb://localhost:27017                    │
│                        cafeteria (DB)                           │
│                                                                  │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │         Collections (Tables)                            │   │
│  │                                                          │   │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │   │
│  │  │   menus      │  │   orders     │  │  contacts    │  │   │
│  │  ├──────────────┤  ├──────────────┤  ├──────────────┤  │   │
│  │  │ _id          │  │ _id          │  │ _id          │  │   │
│  │  │ name         │  │ customerName │  │ name         │  │   │
│  │  │ category     │  │ email        │  │ email        │  │   │
│  │  │ price        │  │ phone        │  │ phone        │  │   │
│  │  │ description  │  │ items[]      │  │ subject      │  │   │
│  │  │ image        │  │ totalPrice   │  │ message      │  │   │
│  │  │ available    │  │ status       │  │ status       │  │   │
│  │  │ createdAt    │  │ createdAt    │  │ createdAt    │  │   │
│  │  │              │  │ updatedAt    │  │              │  │   │
│  │  └──────────────┘  └──────────────┘  └──────────────┘  │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                  │
└──────────────────────────────────────────────────────────────────┘
```

## Data Flow Diagram

### User Submits Contact Form

```
User Input
	│
	▼
┌─────────────────────────┐
│ React Form Component    │
│ (src/form.jsx)          │
│ - Collect form data     │
│ - Validate input        │
└─────────────────────────┘
	│
	▼
┌─────────────────────────┐
│ API Service             │
│ (src/services/api.js)   │
│ - submitContact()       │
│ - Create axios request  │
└─────────────────────────┘
	│
	▼ HTTP POST
	│ /api/contact
	│
┌─────────────────────────┐
│ Express Route Handler   │
│ (backend/routes)        │
│ - contactRoutes.js      │
│ - POST /api/contact     │
└─────────────────────────┘
	│
	▼
┌─────────────────────────┐
│ Data Validation         │
│ - Check required fields │
│ - Validate email format │
└─────────────────────────┘
	│
	▼
┌─────────────────────────┐
│ Mongoose Schema         │
│ (backend/models)        │
│ - Contact.js            │
│ - Apply schema rules    │
└─────────────────────────┘
	│
	▼
┌─────────────────────────┐
│ MongoDB Database        │
│ - Insert document       │
│ - Return saved data     │
└─────────────────────────┘
	│
	▼ JSON Response
	│ {_id, name, email...}
	│
┌─────────────────────────┐
│ Frontend receives       │
│ response & state update │
│ - Show success message  │
│ - Clear form inputs     │
└─────────────────────────┘
	│
	▼
User sees success confirmation
```

### User Orders Food

```
User Selects Items & Creates Order
	│
	▼
┌──────────────────────────────────┐
│ React Order Component            │
│ (src/Order/OrderNow.jsx)         │
│ - Add items to cart              │
│ - Enter delivery details         │
│ - Calculate total                │
└──────────────────────────────────┘
	│
	▼
┌──────────────────────────────────┐
│ API Service - createOrder()      │
│ (src/services/api.js)            │
│ Prepare request payload:         │
│ {                                │
│   customerName,                  │
│   email,                         │
│   phone,                         │
│   items: [{name, price, qty}],   │
│   totalPrice,                    │
│   deliveryAddress                │
│ }                                │
└──────────────────────────────────┘
	│
	▼ HTTP POST
	│ /api/orders
	│
┌──────────────────────────────────┐
│ Express Order Route              │
│ (backend/routes/orderRoutes.js)  │
│ POST /api/orders handler         │
└──────────────────────────────────┘
	│
	▼
┌──────────────────────────────────┐
│ Validation                       │
│ - Verify all required fields     │
│ - Validate email format          │
│ - Check items array not empty    │
└──────────────────────────────────┘
	│
	▼
┌──────────────────────────────────┐
│ Mongoose Order Model             │
│ (backend/models/Order.js)        │
│ - Create new Order document      │
│ - Apply schema validation        │
└──────────────────────────────────┘
	│
	▼
┌──────────────────────────────────┐
│ MongoDB Insert Operation         │
│ - Store in 'orders' collection   │
│ - Auto-generate _id              │
│ - Set status = 'pending'         │
│ - Record createdAt timestamp     │
└──────────────────────────────────┘
	│
	▼ Response with order data
	│ {_id, status, totalPrice, ...}
	│
┌──────────────────────────────────┐
│ Frontend receives order         │
│ - Display order confirmation    │
│ - Show order ID                 │
│ - Clear cart                    │
└──────────────────────────────────┘
```

## Technology Stack

```
┌─────────────────────────────────────────────────┐
│           FRONTEND STACK                        │
├─────────────────────────────────────────────────┤
│ React 18.2.0           - UI Library             │
│ Vite 4.2.0             - Build Tool             │
│ React Router 6.9.0     - Routing                │
│ Axios 1.5.0            - HTTP Client            │
│ Bootstrap 5.3.1        - UI Components          │
│ React Bootstrap 2.7.2  - Bootstrap Components   │
├─────────────────────────────────────────────────┤
│  Running on: http://localhost:5173              │
└─────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────┐
│           BACKEND STACK                         │
├─────────────────────────────────────────────────┤
│ Express.js 4.18.2      - Web Framework          │
│ MongoDB 7.5.0          - Database Server        │
│ Mongoose 7.5.0         - Database ODM           │
│ CORS 2.8.5             - Cross-Origin Handling  │
│ Nodemon 3.0.1          - Dev Auto-reload        │
│ JWT 9.1.0              - Authentication         │
│ bcryptjs 2.4.3         - Password Hashing       │
├─────────────────────────────────────────────────┤
│  Running on: http://localhost:5000              │
└─────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────┐
│           DATABASE STACK                        │
├─────────────────────────────────────────────────┤
│ MongoDB Local/Atlas    - NoSQL Database         │
│ Connection: 27017 (local) or Cloud              │
│ Database: cafeteria                             │
│ Collections: menus, orders, contacts            │
└─────────────────────────────────────────────────┘
```

## File Organization

```
cafeteria-website/
│
├── 📁 backend/                    ← NEW BACKEND
│   ├── 📁 models/
│   │   ├── Menu.js
│   │   ├── Order.js
│   │   └── Contact.js
│   ├── 📁 routes/
│   │   ├── menuRoutes.js
│   │   ├── orderRoutes.js
│   │   └── contactRoutes.js
│   ├── server.js                 ← Main entry
│   ├── seedDatabase.js           ← Sample data
│   ├── testBackend.js            ← Tests
│   ├── setup.js                  ← Setup helper
│   ├── .env                      ← Config
│   ├── .gitignore
│   ├── package.json
│   └── README.md
│
├── 📁 src/                        ← EXISTING FRONTEND
│   ├── 📁 services/
│   │   └── api.js               ← NEW API CLIENT
│   ├── form.jsx                 ← UPDATED
│   ├── App.jsx
│   ├── main.jsx
│   └── ...
│
├── 📁 node_modules/             ← Frontend deps
├── package.json                 ← UPDATED
├── vite.config.js
│
├── 📄 BACKEND_SETUP.md          ← NEW
├── 📄 INTEGRATION_GUIDE.md      ← NEW
├── 📄 BACKEND_INTEGRATION_SUMMARY.md  ← NEW
└── 📄 README.md
```

## API Request/Response Examples

### Create Order Request
```
POST /api/orders
Content-Type: application/json

{
  "customerName": "John Doe",
  "email": "john@example.com",
  "phone": "1234567890",
  "items": [
	{
	  "name": "Cappuccino",
	  "price": 4.50,
	  "quantity": 2
	},
	{
	  "name": "Croissant",
	  "price": 3.50,
	  "quantity": 1
	}
  ],
  "totalPrice": 12.50,
  "deliveryAddress": "123 Main St, City",
  "specialNotes": "Extra hot, no sugar"
}
```

### Create Order Response
```json
{
  "_id": "507f1f77bcf86cd799439012",
  "customerName": "John Doe",
  "email": "john@example.com",
  "phone": "1234567890",
  "items": [
	{
	  "menuId": null,
	  "name": "Cappuccino",
	  "price": 4.50,
	  "quantity": 2,
	  "_id": "507f1f77bcf86cd799439013"
	},
	{
	  "menuId": null,
	  "name": "Croissant",
	  "price": 3.50,
	  "quantity": 1,
	  "_id": "507f1f77bcf86cd799439014"
	}
  ],
  "totalPrice": 12.50,
  "status": "pending",
  "deliveryAddress": "123 Main St, City",
  "specialNotes": "Extra hot, no sugar",
  "createdAt": "2024-01-15T14:30:00.000Z",
  "updatedAt": "2024-01-15T14:30:00.000Z",
  "__v": 0
}
```

---

**Full backend infrastructure implemented and integrated successfully!**
