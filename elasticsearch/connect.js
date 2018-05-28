const elasticSearch = require('elasticsearch');

const client = new elasticSearch.Client({
    host: 'http://localhost:9200/'
});

module.exports = client;