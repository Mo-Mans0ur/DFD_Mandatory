import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Genre = sequelize.define('Genre', {
    GenreID: {
        type: DataTypes.STRING,
        primaryKey: true,
    },
    GenreName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

export default Genre;
