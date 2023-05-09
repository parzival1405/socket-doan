const { send} = require('./controller');

const router = require("express").Router();
router.post('/send', send);

module.exports = router;  