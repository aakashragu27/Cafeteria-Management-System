# 🚀 QUICK REFERENCE CARD

## Installation Checklist

```
☐ 1. cd backend && npm install
☐ 2. cd .. && npm install  
☐ 3. Setup MongoDB (local or Atlas)
☐ 4. Update backend/.env with MongoDB URI
☐ 5. Test: cd backend && npm run seed
```

## Starting the Application

```
Terminal 1:                 Terminal 2:
cd backend                  npm run dev
npm run dev
```

## API Endpoints at a Glance

```
GET    /api/health                    Health check
GET    /api/menu                      All items
GET    /api/menu?category=Breakfast   Filter items
GET    /api/menu/:id                  Single item
POST   /api/menu                      Create item
PUT    /api/menu/:id                  Update item
DELETE /api/menu/:id                  Delete item

GET    /api/orders                    All orders
GET    /api/orders/:id                Single order
POST   /api/orders                    Create order
PUT    /api/orders/:id                Update status
DELETE /api/orders/:id                Delete order

GET    /api/contact                   All messages
POST   /api/contact                   Submit form
PUT    /api/contact/:id               Update status
```

## Backend Commands

```bash
npm run dev       # Start dev server
npm start         # Start production
npm run seed      # Load sample data
npm test          # Run tests
npm run setup     # Run setup helper
```

## Frontend API Usage

```javascript
// Import
import { 
  getMenuItems, 
  createOrder, 
  submitContact 
} from './services/api.js';

// Use
const items = await getMenuItems();
const order = await createOrder(data);
const contact = await submitContact(data);
```

## Creating an Order

```javascript
const order = {
  customerName: 'John Doe',
  email: 'john@example.com',
  phone: '1234567890',
  items: [
	{ name: 'Coffee', price: 3.50, quantity: 2 }
  ],
  totalPrice: 7.00,
  deliveryAddress: '123 Main St',
  specialNotes: 'Extra hot'
};

const result = await createOrder(order);
```

## Troubleshooting

```
Backend won't start
  → MongoDB running?
  → Port 5000 available?
  → npm install done?

Form submissions fail
  → Backend running on 5000?
  → Check browser console

Database connection error
  → MongoDB URI correct in .env?
  → MongoDB service running?
```

## File Structure

```
backend/
├── models/            ← Database schemas
├── routes/            ← API endpoints
├── server.js          ← Start here
├── .env               ← Configuration
└── package.json

src/
├── services/
│   └── api.js         ← Use this for API calls
└── form.jsx           ← Updated to use backend
```

## Environment Setup

```env
# backend/.env
MONGODB_URI=mongodb://localhost:27017/cafeteria
PORT=5000
NODE_ENV=development
JWT_SECRET=your_secret_key
```

## Sample Data

```bash
cd backend
npm run seed
# Creates sample menu items in database
```

## Test Backend

```bash
cd backend
npm test
# Tests all API endpoints
```

## Deployment URLs

```
Development:
Backend:   http://localhost:5000
Frontend:  http://localhost:5173

Production:
Backend:   https://your-backend.com
Frontend:  https://your-frontend.com
```

## Key Technologies

```
Frontend: React 18 + Vite + Bootstrap
Backend:  Express.js + Node.js
Database: MongoDB + Mongoose
HTTP:     Axios
```

## API Response Format

```json
Success (201):
{
  "_id": "507f1f77bcf86cd799439012",
  "name": "Item name",
  ...
}

Error (400):
{
  "error": "Error message"
}
```

## Status Codes

```
200  OK
201  Created
400  Bad Request
404  Not Found
500  Server Error
```

## Order Statuses

```
pending      → New order
confirmed    → Confirmed by admin
preparing    → Being prepared
ready        → Ready for pickup/delivery
completed    → Order completed
cancelled    → Order cancelled
```

## Contact Statuses

```
new         → New inquiry
reviewed    → Reviewed by admin
responded   → Response sent
```

## Important Files

```
backend/server.js          ← Main backend entry
backend/models/*.js        ← Data schemas
backend/routes/*.js        ← API endpoints
src/services/api.js        ← Frontend API client
backend/.env               ← Configuration
```

## Common Errors & Fixes

```
ECONNREFUSED (MongoDB)
  → Start MongoDB service

Cannot find module
  → npm install in backend/ and root

CORS Error
  → Backend running on port 5000

ValidationError
  → Check required fields in request

Port already in use
  → Change PORT in .env or kill process
```

## Performance Tips

```
✅ Use npm run seed for sample data
✅ Check database indexes
✅ Monitor with npm test
✅ Use env variables for secrets
✅ Enable CORS for frontend only
```

## Security Checklist

```
☐ Change JWT_SECRET in .env
☐ Use HTTPS in production
☐ Validate all inputs
☐ Enable database backups
☐ Use strong MongoDB password
☐ Implement rate limiting
☐ Log errors and requests
☐ Keep dependencies updated
```

## Documentation

```
BACKEND_SETUP.md              → Setup help
INTEGRATION_GUIDE.md          → Integration steps
backend/README.md             → API details
ARCHITECTURE.md               → System design
DEPLOYMENT_GUIDE.md           → Deploy to prod
BACKEND_INTEGRATION_COMPLETE.md → Overview
```

## Support

```
Setup Issues:     See BACKEND_SETUP.md
API Questions:    See backend/README.md
Architecture:     See ARCHITECTURE.md
Deployment:       See DEPLOYMENT_GUIDE.md
Integration:      See INTEGRATION_GUIDE.md
```

## Quick Test

```bash
# Terminal 1
cd backend && npm run dev

# Terminal 2 (after backend starts)
curl http://localhost:5000/api/health
# Response: {"status":"Backend is running"}
```

## Development Workflow

```
1. Make changes to code
2. Backend auto-reloads (nodemon)
3. Frontend auto-reloads (Vite)
4. Test in browser
5. Check console for errors
6. Commit changes to git
```

## Database Management

```
View data:     MongoDB Atlas dashboard
Backup:        MongoDB Atlas backups
Restore:       Import from backup
Query:         Use MongoDB Compass
```

## Next Features to Add

```
☐ User authentication
☐ Payment processing
☐ Email notifications
☐ Admin dashboard
☐ Order tracking
☐ Reviews and ratings
☐ Inventory management
☐ Analytics
```

---

**Everything you need to start developing!**

For detailed information, see the comprehensive documentation files.
