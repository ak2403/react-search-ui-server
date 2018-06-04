const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const searchClient = require('./elasticsearch/connect');
const listgroup = require('./routes/index');
// require('./models/repos');
// require('./elasticsearch/indices');
const app = express();



// searchClient.search({
//     index: 'repos',
//     type: 'collections',
//     body: {
//         query: {
//             match: { "name": "lis" }
//         },
//     }
// }, function (error, response, status) {
//     if (error) {
//         console.log("search error: " + error)
//     }
//     else {
//         console.log("--- Response ---");
//         console.log(response);
//         console.log("--- Hits ---");
//         response.hits.hits.forEach(function (hit) {
//             console.log(hit);
//         })
//     }
// });

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://akspikey:thats11310104007@ds235850.mlab.com:35850/listgroup')
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log(err));

app.use(bodyParser.json());
app.use('/repo', listgroup);

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", '*');
    res.header("Access-Control-Allow-Credentials", true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
    next();
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log('Server running'))