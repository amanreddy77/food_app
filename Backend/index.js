import express from 'express';
import dotenv from 'dotenv';
import Connection from './Database/db.js';
import cors from 'cors';

import router from './Routes/vendorRoutes.js';
import firmRoutes from './Routes/firmRoutes.js';
import productRoutes from './Routes/productRoutes.js';
import userRoutes from './Routes/userRoutes.js';
import orderRoutes from './Routes/orderRoutes.js';
import adminRoutes from './Routes/adminRoutes.js';
import addressRoutes from './Routes/addressRoutes.js';
import paymentRoutes from './Routes/paymentRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 10000;

// MongoDB URI
const URI =
    process.env.MONGODB_URI ||
    `mongodb+srv://amanreddy77:Psreddy77.@cluster0.ngex3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/vendor', router);
app.use('/firm', firmRoutes);
app.use('/product', productRoutes);
app.use('/user', userRoutes);
app.use('/order', orderRoutes);
app.use('/address', addressRoutes);
app.use('/admin', adminRoutes);
app.use('/payments', paymentRoutes);
app.use('/uploads', express.static('uploads'));

// Health Check Route
app.get('/', (req, res) => {
    res.status(200).json({ message: 'Server is running', timestamp: new Date() });
});

// Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Internal Server Error', error: err.message });
});

// Start Server
Connection(URI);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
