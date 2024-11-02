import sequelize from '../config/database.js';
import Book from './Book.js';
import Author from './Author.js';
import Member from './Member.js';
import Loan from './Loan.js';
import Reservation from './Reservation.js';
import Genre from './Genre.js';

Book.belongsTo(Genre, { foreignKey: 'GenreID' });
Book.belongsToMany(Author, { through: 'BookAuthors' });
Loan.belongsTo(Book, { foreignKey: 'BookID' });
Loan.belongsTo(Member, { foreignKey: 'MemberID' });
Reservation.belongsTo(Book, { foreignKey: 'BookID' });
Reservation.belongsTo(Member, { foreignKey: 'MemberID' });

export { sequelize, Book, Author, Genre, Member, Loan, Reservation };
