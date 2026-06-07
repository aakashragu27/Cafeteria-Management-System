#!/usr/bin/env node

/**
 * Cafeteria Backend Setup Helper
 * This script helps with initial setup of the backend
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

console.log('\n🚀 Cafeteria Backend Setup Helper\n');

// Check if .env exists
const envPath = path.join(__dirname, '.env');
if (!fs.existsSync(envPath)) {
  console.log('✅ Creating .env file with default values...');
  const envContent = `MONGODB_URI=mongodb://localhost:27017/cafeteria
PORT=5000
NODE_ENV=development
JWT_SECRET=your_jwt_secret_key_change_this_in_production
`;
  fs.writeFileSync(envPath, envContent);
  console.log('   .env file created successfully!');
} else {
  console.log('✅ .env file already exists');
}

// Check if node_modules exists
const nodeModulesPath = path.join(__dirname, 'node_modules');
if (!fs.existsSync(nodeModulesPath)) {
  console.log('\n⚠️  node_modules not found!');
  console.log('   Run: npm install');
} else {
  console.log('✅ Dependencies installed');
}

// Summary
console.log('\n📋 Setup Summary:\n');
console.log('1. Backend is located in: backend/');
console.log('2. Environment file: backend/.env');
console.log('3. Server entry point: backend/server.js');
console.log('4. Available scripts:');
console.log('   - npm run dev    : Start development server');
console.log('   - npm start      : Start production server');
console.log('   - npm run seed   : Load sample data into database');
console.log('   - npm test       : Run backend tests');
console.log('\n✨ Setup complete! Start the backend with: npm run dev\n');
