"use strict"

let mysql = require('mysql2');

let connection = mysql.createConnection({
	host: process.env.DATABASE_HOST,
	user: process.env.DATABASE_USER,
	password: process.env.DATABASE_PASSWORD,
	database: process.env.DATABASE_NAME,
	authPlugins: {
		mysql_native_password: () => () => Buffer.from('your_password'), // Use the native MySQL password authentication mode
		// Add other authentication mode handlers if necessary
		// ...
	  }
});

connection.connect(function(error){
	if(!!error) {
		console.log(error);
	}
});

module.exports = connection;