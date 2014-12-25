'use strict';

var Node = require('./node');
var Element = require('./element');
var Text = require('./text');
var Comment = require('./comment');
var CDATA = require('./cdata');
var ProcInst = require('./procInst');

function Document(node) {
    // auto-instance
    if (!(this instanceof Document)) {
        return new Document(node);
    }

    // call super constructor
    Node.call(this, node);

    Object.defineProperties(this, {
        nodeType: {
            value: 9
        },
        createElement: {
            value: function(tagName, prefix) {
                return Element({
                    tagName: tagName,
                    prefix: prefix
                });
            }
        },
        createTextNode: {
            value: function(data) {
                return Text({
                    nodeValue: data
                });
            }
        },
        createComment: {
            value: function(data) {
                return Comment({
                    nodeValue: data
                });
            }
        },
        createProcessingInstruction: {
            value: function(data) {
                return ProcInst({
                    nodeValue: data
                });
            }
        },
        createCDATASection: {
            value: function(data) {
                return CDATA({
                    nodeValue: data
                });
            }
        }
    });
}

// inheritance
Document.prototype = Object.create(Node.prototype);
Document.prototype.constructor = Document;

module.exports = Document;
