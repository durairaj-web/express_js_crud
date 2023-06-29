"use strict"

let express = require('express');
let router = express.Router();
let staticController = require('../controller/staticController')
 
router.get('/', staticController.home);

module.exports = router;