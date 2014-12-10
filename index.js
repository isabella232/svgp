'use strict';

var fs = require('fs');
var data = fs.readFileSync('./tmp/test.svg', 'utf-8');

var Parser = require('./lib/parser');
var Serializer = require('./lib/serializer');

data = Parser().parse(data);
data = Serializer({ pretty: true }).serialize(data);

console.log(data);
