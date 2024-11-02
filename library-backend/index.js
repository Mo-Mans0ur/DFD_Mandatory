import express from 'express';
import sequelize from './config/database.js';
import dotenv from 'dotenv';
import booksRouter from './routes/books.js';
import authRouter from './routes/auth.js';

dotenv.config();
const app = express();

app.use(express.json());

// Mount routes
app.use('/books', booksRouter);
app.use('/auth', authRouter);

// Test database connection
sequelize.authenticate()
    .then(() => console.log('Database connected'))
    .catch(error => console.log('Error connecting to the database:', error));

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
