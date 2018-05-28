const express = require('express');
const mongoose = require('mongoose');
require('../models/listgroup');
const repos = mongoose.model('repos');
let router = express.Router();

router.post('/', (req, res) => {
    var repo = new repos({
        name: req.body.name
    });
    repo.save()
    res.json({ "success": true })
});

module.exports = router;