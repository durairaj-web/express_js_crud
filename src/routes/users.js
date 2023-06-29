"use strict"

let express = require('express');
let router = express.Router();
let userController = require('../controller/userController')
 
router.get('/', userController.list_users);
router.get('/add', userController.add_user)
router.post('/add', userController.insert_user)
router.get('/edit/(:id)', userController.edit_user)
router.post('/update/:id', userController.update_user)
router.get('/delete/(:id)', userController.delete_user)

module.exports = router;