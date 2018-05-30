const searchClient = require('./connect');

searchClient.indices.create({
    index: 'repos'
}, function (err, resp, status) {
    if (err) {
        return;
    }
});
