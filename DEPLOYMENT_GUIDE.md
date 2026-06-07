# Deployment Guide

## Overview

This guide covers deploying your Cafeteria website (frontend + backend) to production environments.

## Deployment Options

### Option 1: Deploy to Heroku (Recommended for Beginners)

#### Prerequisites
- Heroku account (free at https://heroku.com)
- Heroku CLI installed
- Git repository with all code
- MongoDB Atlas account (free tier available)

#### Step 1: Setup MongoDB Atlas

1. Go to https://www.mongodb.com/cloud/atlas
2. Create account and sign in
3. Create a free M0 cluster
4. Create database user with password
5. Get connection string: `mongodb+srv://user:pass@cluster.mongodb.net/cafeteria`
6. Add IP address 0.0.0.0/0 to network access (for Heroku)

#### Step 2: Create Heroku Apps

```bash
# Install Heroku CLI if not already installed
# Then login
heroku login

# Create backend app
heroku create your-app-name-backend

# Create frontend app (optional, frontend can be built)
heroku create your-app-name-frontend
```

#### Step 3: Configure Backend Environment Variables

```bash
# Set MongoDB URI
heroku config:set -a your-app-name-backend MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/cafeteria

# Set Node environment
heroku config:set -a your-app-name-backend NODE_ENV=production

# Set JWT secret (generate a strong one)
heroku config:set -a your-app-name-backend JWT_SECRET=$(openssl rand -base64 32)
```

#### Step 4: Deploy Backend

```bash
# Navigate to backend folder
cd backend

# Create Procfile for Heroku
echo "web: node server.js" > Procfile

# Deploy
git push heroku main

# Monitor logs
heroku logs --tail -a your-app-name-backend
```

#### Step 5: Update Frontend API URL

Update `src/services/api.js`:

```javascript
const API_BASE_URL = 'https://your-app-name-backend.herokuapp.com/api';
```

#### Step 6: Build Frontend for Production

```bash
# Back to root directory
cd ..

# Build
npm run build

# The dist/ folder is ready for deployment
```

#### Step 7: Deploy Frontend

**Option A: Deploy to GitHub Pages**
```bash
npm run deploy
```

**Option B: Deploy frontend to Heroku**
```bash
# Create frontend Procfile (serves dist folder)
echo "web: npx serve -s dist -l 5000" > Procfile

# Deploy
git push heroku main
```

### Option 2: Deploy to AWS

#### Backend on AWS EC2 + RDS MongoDB

1. **Create EC2 Instance**
   - Ubuntu 20.04 LTS
   - Security groups: Allow ports 80, 443, 5000
   - Create key pair for SSH access

2. **SSH into Instance**
   ```bash
   ssh -i your-key.pem ubuntu@your-instance-ip
   ```

3. **Install Node.js and Dependencies**
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -
   sudo apt-get install -y nodejs
   ```

4. **Clone Repository**
   ```bash
   git clone https://github.com/your-username/Cafeteria-website.git
   cd Cafeteria-website
   ```

5. **Setup Backend**
   ```bash
   cd backend
   npm install

   # Create .env with production values
   nano .env
   ```

6. **Install PM2 (Process Manager)**
   ```bash
   npm install -g pm2
   pm2 start server.js --name "cafeteria-backend"
   pm2 startup
   pm2 save
   ```

7. **Setup Nginx as Reverse Proxy**
   ```bash
   sudo apt-get install nginx

   # Create nginx config
   sudo nano /etc/nginx/sites-available/default
   ```

   Add configuration:
   ```nginx
   server {
	   listen 80;
	   server_name your-domain.com;

	   location / {
		   proxy_pass http://localhost:5000;
		   proxy_http_version 1.1;
		   proxy_set_header Upgrade $http_upgrade;
		   proxy_set_header Connection 'upgrade';
		   proxy_cache_bypass $http_upgrade;
	   }
   }
   ```

8. **Enable SSL with Let's Encrypt**
   ```bash
   sudo apt-get install certbot python3-certbot-nginx
   sudo certbot --nginx -d your-domain.com
   ```

#### Frontend on AWS S3 + CloudFront

1. **Build Frontend**
   ```bash
   npm run build
   ```

2. **Create S3 Bucket**
   - Upload `dist/` folder contents to S3
   - Enable static website hosting

3. **Setup CloudFront**
   - Create distribution pointing to S3
   - Set default root object to `index.html`

### Option 3: Deploy to DigitalOcean

#### Using DigitalOcean App Platform

1. **Connect GitHub Repository**
   - Sign in to DigitalOcean
   - Create new app
   - Select GitHub repo

2. **Configure Backend Service**
   - Select `backend/` as source directory
   - Set build command: `npm install`
   - Set run command: `npm start`

3. **Add Environment Variables**
   ```
   MONGODB_URI=your-atlas-connection-string
   NODE_ENV=production
   JWT_SECRET=your-secret
   ```

4. **Deploy Frontend as Static Site**
   - Build locally: `npm run build`
   - Upload `dist/` folder to DigitalOcean Spaces

### Option 4: Deploy to Vercel (Frontend) + Railway (Backend)

#### Frontend on Vercel

```bash
npm i -g vercel
vercel login
vercel
```

#### Backend on Railway

1. Sign up at https://railway.app
2. Connect GitHub repository
3. Select `backend` directory
4. Add environment variables
5. Deploy

## Post-Deployment Checklist

### Backend Verification
- [ ] Backend running on production URL
- [ ] API health check responds: `/api/health`
- [ ] Database connection successful
- [ ] CORS headers correct for frontend domain
- [ ] SSL/TLS certificate valid
- [ ] Error logging enabled
- [ ] Database backups configured

### Frontend Verification
- [ ] Frontend loads without errors
- [ ] API calls connect to production backend
- [ ] Forms submit successfully
- [ ] Images and static assets load
- [ ] Responsive design works on mobile
- [ ] Performance acceptable (Lighthouse check)

### Security Checks
- [ ] HTTPS/SSL enabled
- [ ] Sensitive data not in git/logs
- [ ] JWT secret changed from default
- [ ] Database credentials secured
- [ ] Rate limiting enabled
- [ ] CORS properly configured
- [ ] Input validation active

## Environment Variables for Production

### Backend (.env)
```env
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/cafeteria
PORT=5000
NODE_ENV=production
JWT_SECRET=your-very-strong-secret-key-here-change-this
FRONTEND_URL=https://your-frontend-domain.com
```

### Frontend (src/services/api.js)
```javascript
const API_BASE_URL = 'https://your-backend-domain.com/api';
```

## Scaling Considerations

### Database Scaling
- Use MongoDB Atlas auto-scaling
- Enable backup and point-in-time restore
- Consider sharding for high volume

### Backend Scaling
- Use load balancer (Nginx, HAProxy)
- Deploy multiple backend instances
- Use environment variables for configuration
- Implement caching (Redis)

### Frontend Optimization
- Minimize bundle size
- Enable gzip compression
- Use CDN for static assets
- Implement lazy loading

## Monitoring and Maintenance

### Essential Monitoring
```bash
# Check server status
curl https://your-backend.com/api/health

# View logs
tail -f server.log

# Monitor database
# MongoDB Atlas dashboard -> Metrics

# Check performance
# Frontend: Google Lighthouse
# Backend: New Relic, Datadog, or similar
```

### Backup Strategy
- Daily database backups (MongoDB Atlas)
- Code repository backup (GitHub)
- Environment configuration backup (separate secure location)

### Update Strategy
1. Update dependencies regularly
2. Test in staging before production
3. Plan maintenance windows
4. Keep detailed changelog
5. Implement zero-downtime deployments

## Troubleshooting Production Issues

### Backend Not Connecting to Database
- Check MongoDB connection string
- Verify IP whitelist in MongoDB Atlas
- Check network connectivity
- Review server logs: `pm2 logs`

### High Memory Usage
- Check for memory leaks
- Implement caching strategies
- Add more server resources
- Use clustering for load distribution

### Slow API Response Times
- Enable database indexing
- Implement caching
- Use CDN for static assets
- Monitor with APM tools

### Frontend Not Loading
- Check DNS configuration
- Verify SSL certificate
- Check CORS headers
- Review error logs in browser console

## Cost Estimation

| Service | Tier | Cost/Month |
|---------|------|-----------|
| MongoDB Atlas | Free | $0 |
| Heroku | Hobby | $7-50+ |
| AWS EC2 | t3.micro | $10-20 |
| DigitalOcean | Basic | $5+ |
| Vercel | Pro | $20 |
| Railway | Pay as you go | $5-20 |

## Useful Commands

```bash
# Build frontend for production
npm run build

# Start backend server
npm start

# View process logs (if using PM2)
pm2 logs

# Seed production database
npm run seed

# Test backend endpoints
npm test

# Deployment verification
curl https://your-domain/api/health
```

## Security Best Practices

1. **Always use HTTPS/SSL**
2. **Keep dependencies updated**
3. **Use strong passwords/secrets**
4. **Implement rate limiting**
5. **Validate all inputs server-side**
6. **Use environment variables for secrets**
7. **Enable logging and monitoring**
8. **Regular security audits**
9. **Database access controls**
10. **CORS configuration review**

## Support Resources

- Heroku Docs: https://devcenter.heroku.com/
- MongoDB Atlas: https://docs.mongodb.com/atlas/
- Express.js Deploy: https://expressjs.com/en/advanced/best-practice-security.html
- React Build: https://create-react-app.dev/deployment/
- Vercel: https://vercel.com/docs
- Railway: https://docs.railway.app/

---

**Your Cafeteria website is now ready for production deployment!**
