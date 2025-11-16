// api/seed.js
require('dotenv').config();
const mongoose = require('mongoose');
const Laptop = require('./models/laptop');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://admin:password@mongo:27017/toko?authSource=admin';

const sample = [
  {
    name: "ASUS TUF Gaming F15",
    brand: "ASUS",
    model: "FX507Z",
    price: 14500000,
    stock: 20,
    category: "Gaming",
    images: ["https://via.placeholder.com/600x400?text=ASUS+TUF+F15"],
    specs: { cpu: "Intel i7", ram: "16GB", storage: "512GB SSD", gpu: "RTX 3050", screen: "15.6\" FHD 144Hz", os: "Windows 11" },
    rating: 4.7,
    description: "Laptop gaming kencang dan stabil."
  },
  {
    name: "Lenovo IdeaPad Slim 3",
    brand: "Lenovo",
    model: "Ideapad-3",
    price: 6990000,
    stock: 15,
    category: "Ultrabook",
    images: ["https://via.placeholder.com/600x400?text=Lenovo+IdeaPad+Slim+3"],
    specs: { cpu: "Intel i5", ram: "8GB", storage: "256GB SSD", gpu: "Integrated", screen: "14\" FHD", os: "Windows 11" },
    rating: 4.3,
    description: "Ringan dan pas untuk kerja kantor / mahasiswa."
  },
  {
    name: "Acer Swift 5",
    brand: "Acer",
    model: "SF514",
    price: 11500000,
    stock: 10,
    category: "Ultrabook",
    images: ["https://via.placeholder.com/600x400?text=Acer+Swift+5"],
    specs: { cpu: "Intel i5", ram: "8GB", storage: "512GB SSD", gpu: "Integrated", screen: "14\" FHD", os: "Windows 11" },
    rating: 4.4,
    description: "Ringan, baterai tahan lama dan ringkas."
  },
  {
    name: "HP Victus 15",
    brand: "HP",
    model: "Victus-15",
    price: 12990000,
    stock: 8,
    category: "Gaming",
    images: ["https://via.placeholder.com/600x400?text=HP+Victus+15"],
    specs: { cpu: "AMD Ryzen 7", ram: "16GB", storage: "512GB SSD", gpu: "RTX 3050", screen: "15.6\" FHD 144Hz", os: "Windows 11" },
    rating: 4.5,
    description: "Performa solid untuk gaming dan konten."
  },
  {
    name: "Dell Inspiron 15",
    brand: "Dell",
    model: "Inspiron-3511",
    price: 8500000,
    stock: 18,
    category: "Office",
    images: ["https://via.placeholder.com/600x400?text=Dell+Inspiron+15"],
    specs: { cpu: "Intel i5", ram: "8GB", storage: "512GB SSD", gpu: "Integrated", screen: "15.6\" FHD", os: "Windows 11" },
    rating: 4.2,
    description: "Cocok untuk kerja kantor dan sekolah."
  },
  {
    name: "MacBook Air M1",
    brand: "Apple",
    model: "M1-2020",
    price: 16500000,
    stock: 6,
    category: "Ultrabook",
    images: ["https://via.placeholder.com/600x400?text=MacBook+Air+M1"],
    specs: { cpu: "Apple M1", ram: "8GB", storage: "256GB SSD", gpu: "Integrated", screen: "13.3\" Retina", os: "macOS" },
    rating: 4.8,
    description: "Ringan dan sangat efisien untuk produktivitas."
  },
  {
    name: "MSI Modern 14",
    brand: "MSI",
    model: "Modern-14",
    price: 10490000,
    stock: 12,
    category: "Productivity",
    images: ["https://via.placeholder.com/600x400?text=MSI+Modern+14"],
    specs: { cpu: "Intel i5", ram: "8GB", storage: "512GB SSD", gpu: "Integrated", screen: "14\" FHD", os: "Windows 11" },
    rating: 4.3,
    description: "Seimbang antara performa dan desain ringkas."
  }
];

async function run() {
  try {
    console.log('Connecting to', MONGO_URI);
    await mongoose.connect(MONGO_URI);
    const count = await Laptop.countDocuments();
    if (count > 0) {
      console.log('Already seeded (documents found:', count + ')');
      process.exit(0);
    }
    const inserted = await Laptop.insertMany(sample);
    console.log('Inserted', inserted.length, 'documents');
    process.exit(0);
  } catch (err) {
    console.error('Seed error:', err);
    process.exit(1);
  }
}

run();
