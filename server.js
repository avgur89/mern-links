const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
const colors = require('colors');
const connectDB = require('./config/db');
const indexRouter = require('./routes/index');

// Load environment variables
dotenv.config({ path: './config/config.env' });

// Environment constants
const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV;

// Connect to database
connectDB();

const app = express();

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Middlewares
app.use(express.json());

// Mount routes
app.use('/', indexRouter);

const server = app.listen(
  PORT,
  console.log(
    `Server is running in ${NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);

// Handle promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  // Close server and exit process
  server.close(() => process.exit(1));
});
