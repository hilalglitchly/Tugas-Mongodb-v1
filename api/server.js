// api/server.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const Laptop = require('./models/laptop'); // pastikan ada api/models/laptop.js

const app = express();
app.use(express.json());

// MONGO URI
const MONGO_URI = process.env.MONGO_URI ||
  (process.env.MONGO_USER && process.env.MONGO_PASSWORD
    ? `mongodb://${encodeURIComponent(process.env.MONGO_USER)}:${encodeURIComponent(process.env.MONGO_PASSWORD)}@${(process.env.MONGO_HOST||'mongo')}:27017/?authSource=admin`
    : `mongodb://${process.env.MONGO_HOST || 'mongo'}:27017/toko`);

console.log('⏳ Connecting to:', MONGO_URI);

mongoose.connect(MONGO_URI, { serverSelectionTimeoutMS: 5000 })
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.error('❌ MongoDB connection error:', err.message));

// --- API routes (must be defined BEFORE static)
app.get('/api/laptops', async (req, res) => {
  try {
    const q = req.query.q;
    const filter = q ? {
      $or: [
        { name: new RegExp(q, 'i') },
        { brand: new RegExp(q, 'i') },
        { category: new RegExp(q, 'i') }
      ]
    } : {};
    const items = await Laptop.find(filter).sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/laptops/:id', async (req, res) => {
  try {
    const item = await Laptop.findById(req.params.id);
    if (!item) return res.status(404).json({ error: 'Not found' });
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/health', (req, res) => res.json({ status: "API running" }));

// serve static AFTER API
app.use(express.static(path.join(__dirname, 'public')));

// SPA fallback that does not swallow /api
app.get('*', (req, res) => {
  if (req.path.startsWith('/api')) return res.status(404).json({ error: 'API route not found' });
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`🚀 API running on http://localhost:${port}`));
