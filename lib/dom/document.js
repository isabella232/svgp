'use strict';

var Node = require('./node');
var Element = require('./element');
var ProcInst = require('./procInst');
var Attr = require('./attr');

function Document() {
    if (!(this instanceof Document)) {
        return new Document();
    }
}

Document.prototype.createElement = function(tagName, prefix) {
    return Element({
        nodeType: 1,
        tagName: tagName,
        prefix: prefix
    });
};

Document.prototype.createTextNode = function(data) {
    return Node({
        nodeType: 3,
        nodeValue: data
    });
};

Document.prototype.createProcessingInstruction = function(target, data) {
    return ProcInst({
        nodeType: 7,
        target: target,
        data: data
    });
};

Document.prototype.createCDATASection = function(data) {
    return Node({
        nodeType: 4,
        nodeValue: data
    });
};

module.exports = Document;
