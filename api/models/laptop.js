// api/models/laptop.js
const mongoose = require('mongoose');

const laptopSchema = new mongoose.Schema({
  name: { type: String, required: true },
  brand: String,
  model: String,
  price: { type: Number, default: 0 },
  stock: { type: Number, default: 0 },
  category: String,
  images: [String],
  specs: {
    cpu: String,
    ram: String,
    storage: String,
    gpu: String,
    screen: String,
    os: String
  },
  rating: { type: Number, default: 0 },
  description: String
}, { timestamps: true });

module.exports = mongoose.model('Laptop', laptopSchema);