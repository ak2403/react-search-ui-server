const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const searchClient = require('./elasticsearch/connect');
const listgroup = require('./routes/index');
const cors = require('cors');

//app.use(cors());


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

app.use(cors({
    origin: 'https://react-search-server.herokuapp.com/',
    credentials: true
  }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log('Server running'))