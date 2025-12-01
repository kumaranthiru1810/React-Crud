const contactcontorls = require('../controller/contactControl');
const express = require('express');
const router = express.Router();

router.post('/contact' , contactcontorls.contactDedails);

module.exports = router;