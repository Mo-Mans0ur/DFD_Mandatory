import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Book = sequelize.define('Book', {
    BookID: {
        type: DataTypes.STRING,
        primaryKey: true,
    },
    Title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    GenreID: {
        type: DataTypes.STRING,
    },
    PublishedDate: {
        type: DataTypes.DATE,
    },
    ISBN: {
        type: DataTypes.STRING,
        unique: true,
    },
});

export default Book;
