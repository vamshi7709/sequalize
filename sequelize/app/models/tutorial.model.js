const Sequelize = require('sequelize')
const sequelize = require('../config/db.config')


const Tutorial = sequelize.define("tutorial", {

        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,

        },

        title: {
            type: Sequelize.STRING,
            allowNull: false

        },
        
        description: {
            type: Sequelize.STRING,
            allowNull: false
        },

        published: {
            type: Sequelize.BOOLEAN,
            
        },

        createdAt: {
           type: Sequelize.DATE,
           allowNull: false,
           defaultValue: Sequelize.NOW

        },

        updatedAt:{
            type: Sequelize.DATE,
            allowNull: false,
            defaultValue: Sequelize.NOW
 
         }
        

         

    });

module.exports = Tutorial;