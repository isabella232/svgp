'use strict';

var Node = require('./dom/node');
var Element = require('./dom/element');
var Document = require('./dom/document');

var document = Document();

var elem = document.createElement('test');

elem.setAttribute('ololo', 123);

console.log(elem instanceof Node, elem instanceof Element);
console.log(elem.nodeType);
console.log(elem.attributes);
console.log(elem.hasChildNodes());
