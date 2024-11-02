import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Loan = sequelize.define('Loan', {
    LoanID: {
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
    LoanDate: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    ReturnDate: {
        type: DataTypes.DATE,
        allowNull: true,
    },
});

export default Loan;
