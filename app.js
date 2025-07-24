require('dotenv').config();
const express = require('express');
const { paginateResults } = require('./middlewares/promptMiddleware');
const connectDB = require('./config/db');
const logger = require('./utils/logger');

const app = express();

// Connect to MongoDB
connectDB();

// Global Middleware
app.use(express.json());
app.use(paginateResults); // Only if you want pagination on all routes

// Routes
const promptRoutes = require('./routes/promptRoutes');
app.use('/api/prompts', promptRoutes);

// Error Handling Middleware
app.use((err, req, res, next) => {
  logger.error(err.stack);
  res.status(500).json({ error: 'Something broke!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  logger.info(`promptiFy running on port ${PORT}`);
});