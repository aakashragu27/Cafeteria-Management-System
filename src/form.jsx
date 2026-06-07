import React, { useState } from 'react';
import { submitContact } from './services/api.js';

function MyForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });

  const [detailsContent, setDetailsContent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await submitContact({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: `Contact form submission from ${formData.name}`
      });

      const content = (
        <div>
          <p style={{ color: 'green' }}>✓ Message submitted successfully!</p>
          <p>Name: {response.data.name}</p>
          <p>Email: {response.data.email}</p>
          <p>Phone: {response.data.phone}</p>
        </div>
      );
      setDetailsContent(content);
      setFormData({
        name: '',
        email: '',
        phone: ''
      });
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to submit form. Make sure backend is running.');
      setDetailsContent(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} required />

        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} required />

        <label htmlFor="phone">Phone:</label>
        <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleInputChange} />

        <button type="submit" disabled={loading}>{loading ? 'Submitting...' : 'Submit'}</button>
      </form>
      {error && <div className='details' style={{ color: 'red' }}>{error}</div>}
      <div className='details'>
        {detailsContent}
      </div>
    </div>
  );
}

export default MyForm;

