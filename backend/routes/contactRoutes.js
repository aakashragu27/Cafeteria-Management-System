import express from 'express';
import Contact from '../models/Contact.js';

const router = express.Router();

// Get all contacts
router.get('/', async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create contact message
router.post('/', async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const newContact = new Contact({
      name,
      email,
      phone,
      subject,
      message
    });

    const savedContact = await newContact.save();
    res.status(201).json(savedContact);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update contact status
router.put('/:id', async (req, res) => {
  try {
    const { status } = req.body;
    const updatedContact = await Contact.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );
    if (!updatedContact) return res.status(404).json({ error: 'Contact not found' });
    res.json(updatedContact);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
