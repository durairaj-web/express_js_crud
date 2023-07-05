"use strict"

const { DataTypes } = require('sequelize');
const db = require('../services/database')

const User = db.define('users', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    position: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

User.sync()

module.exports = User