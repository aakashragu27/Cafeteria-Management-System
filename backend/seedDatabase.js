import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Menu from './models/Menu.js';

dotenv.config();

const sampleMenuItems = [
  {
    name: 'Pancakes',
    category: 'Breakfast',
    price: 8.99,
    description: 'Fluffy pancakes with maple syrup',
    available: true
  },
  {
    name: 'Omelette',
    category: 'Breakfast',
    price: 9.99,
    description: 'Cheese and vegetable omelette',
    available: true
  },
  {
    name: 'Cappuccino',
    category: 'Beverages',
    price: 4.50,
    description: 'Espresso with steamed milk',
    available: true
  },
  {
    name: 'Iced Coffee',
    category: 'Beverages',
    price: 3.99,
    description: 'Cold brewed coffee with ice',
    available: true
  },
  {
    name: 'Croissant',
    category: 'Pastry',
    price: 3.50,
    description: 'Buttery French croissant',
    available: true
  },
  {
    name: 'Chocolate Cake',
    category: 'Pastry',
    price: 5.99,
    description: 'Rich chocolate layer cake',
    available: true
  },
  {
    name: 'Club Sandwich',
    category: 'Sandwiches',
    price: 10.99,
    description: 'Turkey, bacon, and cheese sandwich',
    available: true
  },
  {
    name: 'Grilled Cheese',
    category: 'Sandwiches',
    price: 7.99,
    description: 'Classic grilled cheese sandwich',
    available: true
  }
];

async function initializeDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing menu items
    await Menu.deleteMany({});
    console.log('Cleared existing menu items');

    // Insert sample data
    const insertedItems = await Menu.insertMany(sampleMenuItems);
    console.log(`Inserted ${insertedItems.length} menu items`);

    await mongoose.connection.close();
    console.log('Database initialization complete');
  } catch (error) {
    console.error('Error initializing database:', error);
    process.exit(1);
  }
}

initializeDatabase();
