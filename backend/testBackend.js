import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

async function testBackendSetup() {
  console.log('🧪 Testing Cafeteria Backend Setup...\n');

  try {
    // Test 1: Health Check
    console.log('1️⃣  Testing Health Check...');
    const healthResponse = await axios.get(`${API_URL}/health`);
    console.log('✅ Health Check:', healthResponse.data);

    // Test 2: Get Menu Items
    console.log('\n2️⃣  Testing Get Menu Items...');
    const menuResponse = await axios.get(`${API_URL}/menu`);
    console.log(`✅ Found ${menuResponse.data.length} menu items`);
    if (menuResponse.data.length > 0) {
      console.log('Sample item:', menuResponse.data[0]);
    }

    // Test 3: Get Menu by Category
    console.log('\n3️⃣  Testing Get Menu by Category...');
    const categoryResponse = await axios.get(`${API_URL}/menu?category=Breakfast`);
    console.log(`✅ Found ${categoryResponse.data.length} Breakfast items`);

    // Test 4: Create Contact
    console.log('\n4️⃣  Testing Create Contact...');
    const contactData = {
      name: 'Test User',
      email: 'test@example.com',
      phone: '1234567890',
      message: 'This is a test message'
    };
    const contactResponse = await axios.post(`${API_URL}/contact`, contactData);
    console.log('✅ Contact created:', {
      id: contactResponse.data._id,
      name: contactResponse.data.name,
      status: contactResponse.data.status
    });

    // Test 5: Create Order
    console.log('\n5️⃣  Testing Create Order...');
    const orderData = {
      customerName: 'John Doe',
      email: 'john@example.com',
      phone: '9876543210',
      items: [
        { name: 'Coffee', price: 3.50, quantity: 2 },
        { name: 'Croissant', price: 3.50, quantity: 1 }
      ],
      totalPrice: 10.50,
      specialNotes: 'Extra hot coffee'
    };
    const orderResponse = await axios.post(`${API_URL}/orders`, orderData);
    console.log('✅ Order created:', {
      id: orderResponse.data._id,
      customer: orderResponse.data.customerName,
      status: orderResponse.data.status,
      total: orderResponse.data.totalPrice
    });

    // Test 6: Get All Orders
    console.log('\n6️⃣  Testing Get All Orders...');
    const ordersResponse = await axios.get(`${API_URL}/orders`);
    console.log(`✅ Found ${ordersResponse.data.length} orders`);

    console.log('\n✅ All tests passed! Backend is working correctly.\n');
  } catch (error) {
    console.error('❌ Test failed:');
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Data:', error.response.data);
    } else if (error.request) {
      console.error('No response received. Make sure backend is running on port 5000');
    } else {
      console.error('Error:', error.message);
    }
    process.exit(1);
  }
}

// Run tests
testBackendSetup();
