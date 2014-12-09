'use strict';

var fs = require('fs');
var file = fs.readFileSync('./tmp/test.svg', 'utf-8');

var Parser = require('./lib/parser');
var Serializer = require('./lib/serializer');

Parser().parse(file, function(err, data) {
    if (err) {
        throw err;
    }

    data = Serializer({ pretty: true }).serialize(data);
    console.log(data);
});
