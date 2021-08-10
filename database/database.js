const Sequelize = require('sequelize')


const connection = new Sequelize('guia perguntas','root','34286066',{
    host: 'localhost',
    dialect: 'mysql'
})

module.exports = connection