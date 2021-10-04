const Sequelize = require('sequelize')


const connection = new Sequelize('guia perguntas','root','1234567',{
    host: 'localhost',
    dialect: 'mysql'
})

module.exports = connection