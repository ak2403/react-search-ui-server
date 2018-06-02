const express = require('express');
const mongoose = require('mongoose');
const searchClient = require('../elasticsearch/connect');
require('../models/repos');
const repos = mongoose.model('repos');
let router = express.Router();

router.post('/addRepo', (req, res) => {
    var repo = new repos({
        name: req.body.name
    });
    repo.save().then(resp => {
        // searchClient.index({
        //     index: 'repos',
        //     id: '1',
        //     type: 'collections',
        //     body: {
        //         "name": resp.name,
        //         "lists": []
        //     }
        // }, function (err, resp, status) {
        //     console.log(err);
        // });
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
        // let newFormat = [];
        // resp.lists.map(list => {
        //     newFormat.push({
        //         title: list,
        //         checked: false
        //     })
        // })
        // repos.findOneAndUpdate(req.body, { $set: { lists: newFormat } }, { new: true }, function (err, doc) {
        //     console.log(err, doc)
        // });
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

router.post('/changeRepoList', (req, res) => {

    repos.findOneAndUpdate({ name: req.body.name }, { $set: { lists: req.body.lists } }, { new: true }, (err, doc) => {
        res.json({
            "success": false,
            "repoDetail": doc
        })
    });
})

router.post('/changeRepoName', (req, res) => {
    repos.findOneAndUpdate({ name: req.body.name }, { $set: { name: req.body.rename } }, { new: true }, (err, doc) => {
        res.json({
            "success": false,
            "repoDetail": doc
        })
    });
})

module.exports = router;