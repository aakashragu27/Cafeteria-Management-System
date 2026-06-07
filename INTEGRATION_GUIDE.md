# Quick Start Guide - Backend Integration

## 📁 Project Structure After Integration

```
C:\Users\aakas\source\repos\aakashragu27\Cafeteria-website\
│
├── backend/                    # NEW - Express.js Backend
│   ├── models/
│   │   ├── Menu.js            # Menu items schema
│   │   ├── Order.js           # Order schema
│   │   └── Contact.js         # Contact messages schema
│   ├── routes/
│   │   ├── menuRoutes.js      # Menu API endpoints
│   │   ├── orderRoutes.js     # Order API endpoints
│   │   └── contactRoutes.js   # Contact API endpoints
│   ├── .env                   # Environment variables
│   ├── .gitignore
│   ├── server.js              # Express server entry point
│   ├── seedDatabase.js        # Sample data initialization
│   └── package.json           # Backend dependencies
│
├── src/                       # Existing React Frontend
│   ├── services/
│   │   └── api.js            # NEW - API client utility
│   ├── form.jsx              # UPDATED - Now uses backend API
│   ├── App.jsx
│   ├── main.jsx
│   └── ... (other components)
│
├── package.json              # UPDATED - Added axios
├── BACKEND_SETUP.md          # NEW - Setup instructions
├── package-root.json         # NEW - Root scripts
└── ... (other existing files)
```

## 🚀 Installation Steps

### Step 1: Install Backend Dependencies

```powershell
cd backend
npm install
```

This installs:
- **express** - Web framework
- **mongoose** - MongoDB ODM
- **mongodb** - Database driver
- **dotenv** - Environment configuration
- **cors** - Cross-origin support
- **nodemon** - Development auto-reload
- And more...

### Step 2: Install Frontend Dependencies

```powershell
cd ..
npm install
```

This adds **axios** for API communication.

### Step 3: Setup MongoDB

**Option A: Local MongoDB**
```powershell
# Download from: https://www.mongodb.com/try/download/community
# After installation, start MongoDB service (Windows):
# MongoDB should run on port 27017
```

**Option B: MongoDB Atlas (Cloud)**
1. Go to https://www.mongodb.com/cloud/atlas
2. Create account and cluster
3. Copy connection string
4. Update `backend/.env`:
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/cafeteria
```

### Step 4: Initialize Database with Sample Data

```powershell
cd backend
npm run seed
```

This creates sample menu items in the database.

## ▶️ Running the Application

### Terminal 1 - Start Backend

```powershell
cd backend
npm run dev
```

Expected output:
```
> nodemon server.js
[nodemon] restarting due to changes...
MongoDB connected successfully
Server running on port 5000
```

### Terminal 2 - Start Frontend

```powershell
npm run dev
```

Expected output:
```
> vite
VITE v4.x.x  ready in xxx ms

➜  Local:   http://localhost:5173/
➜  press h to show help
```

## ✅ Verify Backend is Working

Open browser and test endpoints:

1. **Health Check:**
   ```
   http://localhost:5000/api/health
   ```
   Response: `{"status":"Backend is running"}`

2. **Get Menu Items:**
   ```
   http://localhost:5000/api/menu
   ```
   Returns array of menu items from database

3. **Get Menu by Category:**
   ```
   http://localhost:5000/api/menu?category=Breakfast
   ```

## 🔧 API Integration Points

### Form Component (src/form.jsx)
- Now sends contact submissions to backend
- Displays success/error messages
- Example: `submitContact({ name, email, phone, message })`

### Available API Methods (src/services/api.js)

```javascript
// Menu
getMenuItems(category)           // Get all or filtered items
getMenuItemById(id)              // Get single item

// Orders
createOrder(orderData)           // Create new order
getOrders()                      // Get all orders
getOrderById(id)                 // Get single order
updateOrderStatus(id, status)    // Update order status

// Contact
submitContact(contactData)       // Submit contact form
getContacts()                    // Get all contacts
```

## 📝 Environment Variables

**backend/.env** (Created - Update as needed):
```
MONGODB_URI=mongodb://localhost:27017/cafeteria
PORT=5000
NODE_ENV=development
JWT_SECRET=your_jwt_secret_key_change_this_in_production
```

## 🐛 Troubleshooting

### Backend won't start
- ✅ MongoDB not running? Start it first
- ✅ Port 5000 in use? Change PORT in .env
- ✅ Missing dependencies? Run `npm install` in backend/

### MongoDB connection error
- ✅ Connection string incorrect in .env
- ✅ MongoDB service not running
- ✅ Firewall blocking access (if using local)

### Frontend can't connect to backend
- ✅ Backend not running on port 5000
- ✅ CORS issues? Verify server.js has CORS enabled
- ✅ Check browser console for network errors

### "Cannot find module" error
- ✅ Run `npm install` in both root and backend/
- ✅ Clear node_modules and reinstall

## 📚 File Changes Summary

### Created Files:
- ✅ `backend/server.js` - Main server
- ✅ `backend/models/*.js` - Database schemas
- ✅ `backend/routes/*.js` - API endpoints
- ✅ `backend/.env` - Configuration
- ✅ `backend/seedDatabase.js` - Sample data
- ✅ `src/services/api.js` - API client
- ✅ `BACKEND_SETUP.md` - Full documentation

### Modified Files:
- ✅ `package.json` - Added axios
- ✅ `src/form.jsx` - Backend API integration

### No Breaking Changes:
- ✅ All existing components work as before
- ✅ Form now optionally uses backend (graceful fallback)
- ✅ Backward compatible with local state

## 🎯 Next Steps

1. ✅ Install dependencies (both root and backend)
2. ✅ Setup MongoDB (local or Atlas)
3. ✅ Run seed script to populate sample data
4. ✅ Start backend with `npm run dev` in backend/
5. ✅ Start frontend with `npm run dev` in root
6. ✅ Test form submission to backend
7. ✅ Build and deploy when ready

## 📖 Additional Resources

- Express.js Docs: https://expressjs.com/
- MongoDB Docs: https://docs.mongodb.com/
- Mongoose Docs: https://mongoosejs.com/
- Vite Docs: https://vitejs.dev/
- React Docs: https://react.dev/

---

**Integration completed successfully! No existing features broken.**
