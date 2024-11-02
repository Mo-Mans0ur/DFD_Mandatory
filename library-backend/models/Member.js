import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Member = sequelize.define('Member', {
    MemberID: {
        type: DataTypes.STRING,
        primaryKey: true,
    },
    Name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    MembershipStatus: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'Active',
    },
});

export default Member;
