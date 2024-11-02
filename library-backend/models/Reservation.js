import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Reservation = sequelize.define('Reservation', {
    ReservationID: {
        type: DataTypes.STRING,
        primaryKey: true,
    },
    BookID: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    MemberID: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    ReservationDate: {
        type: DataTypes.DATE,
        allowNull: false,
    },
});

export default Reservation;
