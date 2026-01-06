require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());

// Avoid strictQuery deprecation noise (optional)
mongoose.set('strictQuery', false);

const start = async () => {
  try {
    const uri = process.env.MONGO_URI;
    if (!uri) {
      throw new Error('MONGO_URI not set in .env');
    }

    // wait for connection
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // socketTimeoutMS: 45000, // optional tuning
    });

    console.log('MongoDB connected (state = %d)', mongoose.connection.readyState);

    // Register routes after DB is connected if some route code requires DB on load
    app.use('/api/auth', require('./routes/auth'));
    app.use('/api/services', require('./routes/services'));
    app.use('/api/bookings', require('./routes/bookings'));
    app.use('/api/providers', require('./routes/providers'));

    app.get('/', (req, res) => res.json({ message: 'HomeServi Backend API' }));

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

  } catch (err) {
    console.error('Failed to connect to MongoDB:', err);
    process.exit(1);
  }
};

mongoose.connection.on('error', err => console.error('Mongoose connection error:', err));
mongoose.connection.on('disconnected', () => console.warn('Mongoose disconnected'));

start();
