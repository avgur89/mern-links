const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
const colors = require('colors');
const connectDB = require('./config/db');
const authRouter = require('./routes/auth.routes');
const linkRouter = require('./routes/link.routes');
const redirectRouter = require('./routes/redirect.routes');

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
app.use(express.json({ extended: true }));

// Mount routes
app.use('/api/auth', authRouter);
app.use('/api/link', linkRouter);
app.use('/t', redirectRouter);

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
