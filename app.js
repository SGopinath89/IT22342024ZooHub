const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const animalRoutes = require('./routes/animalRoutes');
const contactRoutes = require('./routes/contactRoutes');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/animals', animalRoutes);
app.use('/api/contact', contactRoutes);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

module.exports = app;
