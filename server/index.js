import express from 'express';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import prRoutes from './routes/pr.routes.js';
import { errorHandler } from './middleware/error-handler.js';

// Load environment variables
dotenv.config();

// ES modules dirname equivalent
const __dirname = dirname(fileURLToPath(import.meta.url));

// Create Express app
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// CORS middleware for development
if (process.env.NODE_ENV !== 'production') {
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  });
}

// API routes
app.use('/api', prRoutes);

// Error handling middleware
app.use(errorHandler);

// Only serve static files in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(join(__dirname, '../dist')));
}

// Start server
const startServer = () => {
  try {
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
      console.log('Environment:', process.env.NODE_ENV || 'development');
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  process.exit(1);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection:', err);
  process.exit(1);
});

startServer();