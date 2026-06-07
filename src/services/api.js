import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Menu APIs
export const getMenuItems = (category = null) => {
  const params = category ? { category } : {};
  return apiClient.get('/menu', { params });
};

export const getMenuItemById = (id) => apiClient.get(`/menu/${id}`);

// Order APIs
export const createOrder = (orderData) => apiClient.post('/orders', orderData);

export const getOrders = () => apiClient.get('/orders');

export const getOrderById = (id) => apiClient.get(`/orders/${id}`);

export const updateOrderStatus = (id, status) => 
  apiClient.put(`/orders/${id}`, { status });

// Contact APIs
export const submitContact = (contactData) => apiClient.post('/contact', contactData);

export const getContacts = () => apiClient.get('/contact');

export default apiClient;
