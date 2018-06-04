const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reposGroup = new Schema({
    name: {
        type: String,
        required: true
    },
    lists: {
        type: Array
    },
    ownedBy: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const reposSchema = mongoose.model('repos', reposGroup);
module.exports = reposSchema;