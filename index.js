const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const searchClient = require('./elasticsearch/connect');
const listgroup = require('./routes/index');
require('./models/listgroup');
const app = express();

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://akspikey:thats11310104007@ds235850.mlab.com:35850/listgroup')
.then(() => console.log("MongoDB connected"))
.catch(err => console.log(err));

app.use(bodyParser.json());
app.use('/api/listgroup', listgroup);


app.listen('5000', () => console.log('Server running'))