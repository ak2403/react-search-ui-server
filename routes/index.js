const express = require('express');
const mongoose = require('mongoose');
require('../models/listgroup');
const repos = mongoose.model('repos');
let router = express.Router();

router.post('/addRepo', (req, res) => {
    var repo = new repos({
        name: req.body.name
    });
    repo.save().then(resp => {
        repos.find({}).then(repoList => {
            res.json({
                "success": true,
                "repoLists": repoList
            })
        })
    });
});

router.get('/getRepo', (req, res) => {
    repos.find({}).then(repoList => {
        res.json({
            "repoLists": repoList
        })
    })
});

router.post('/getRepoDetail', (req, res) => {
    repos.findOne(req.body).then(resp => {
        res.json({
            "repoDetail": resp
        })
    })
});

router.post('/addListToRepo', (req, res) => {
    repos.findOneAndUpdate({ name: req.body.repoName }, { $push: { lists: req.body.name } }, { new: true }, function (err, doc) {
        if (err) {
            console.log("Something wrong when updating data!");
        }
        res.json({
            "success": true,
            "repoDetail": doc
        });
    });
});

module.exports = router;