'use strict';

var Node = require('./node');
var Element = require('./element');
var Text = require('./text');
var Comment = require('./text');
var CDATA = require('./cdata');
var ProcInst = require('./procInst');
var Doctype = require('./doctype');

function Document(node) {
    // auto-instance
    if (!(this instanceof Document)) {
        return new Document(node);
    }

    // call super constructor
    Node.call(this, node);
}

// inheritance
Document.prototype = Object.create(Node.prototype);
Document.prototype.constructor = Document;

Document.prototype.createElement = function(tagName, prefix) {
    return Element({
        tagName: tagName,
        prefix: prefix
    });
};

Document.prototype.createTextNode = function(data) {
    return Text({
        nodeValue: data
    });
};

Document.prototype.createComment = function(data) {
    return Comment({
        nodeValue: data
    });
};

Document.prototype.createProcessingInstruction = function(target, data) {
    return ProcInst({
        target: target,
        data: data
    });
};

Document.prototype.createCDATASection = function(data) {
    return CDATA({
        nodeValue: data
    });
};

Document.prototype.createDocumentType = function(data) {
    return Doctype({
        nodeValue: data
    });
};

module.exports = Document;
