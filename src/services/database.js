"use strict"

let mysql = require('mysql2');

let connection = mysql.createConnection({
	host:'localhost',
	user:'root',
	password:'admin',
	database:'crud',
	authPlugins: {
		mysql_native_password: () => () => Buffer.from('your_password'), // Use the native MySQL password authentication mode
		// Add other authentication mode handlers if necessary
		// ...
	  }
});

connection.connect(function(error){
	if(!!error) {
		console.log(error);
	} else {
		console.log('Database Connected Successfully..!!');
	}
});

module.exports = connection;