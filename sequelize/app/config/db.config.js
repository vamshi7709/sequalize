//MySQL database connection
const Sequelize = require('sequelize');
const sequelize = new Sequelize('demodatabase', 'root', 'Momdad123@', {

    dialect: 'mysql',
    host: 'localhost',
    
}

);

module.exports = sequelize;