import express from 'express';
import dotenv from 'dotenv';
import sequelize from './config/database.js';

import authRouter from './routes/authRouter.js';
import booksRouter from './routes/books.js';
import authorsRouter from './routes/authors.js';
import genresRouter from './routes/genres.js';
import membersRouter from './routes/membersRouter.js';
import loansRouter from './routes/loanRouter.js';
import reservationsRouter from './routes/reservations.js';
import userRouter from './routes/userRouter.js';
import adminRouter from './routes/adminRouter.js';


dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());

// Mount API routes under /api
app.use('/api/auth', authRouter);
app.use('/api/books', booksRouter);
app.use('/api/authors', authorsRouter);
app.use('/api/genres', genresRouter);
app.use('/api/members', membersRouter);
app.use('/api/loans', loansRouter);
app.use('/api/reservations', reservationsRouter);
app.use('/api/users', userRouter);
app.use('/api/admin', adminRouter);


// Root route
app.get('/', (req, res) => {
  res.send('Welcome to the API!');
});

// 404 handler
app.use((req, res) => {
  res.status(404).send("Sorry, that route doesn't exist.");
});

// Test database connection and start server
sequelize.authenticate()
    .then(() => {
        console.log('Database connected');
        return sequelize.sync(); // Temporary change to forcefully recreate tables
    })
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    })
    .catch(error => console.log('Error connecting to the database:', error));
