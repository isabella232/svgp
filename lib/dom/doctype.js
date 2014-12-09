'use strict';

var Node = require('./node');

function Doctype(node) {
    // auto-instance
    if (!(this instanceof Doctype)) {
        return new Doctype(node);
    }

    // call super constructor
    Node.call(this, node);

    Object.defineProperties(this, {
        nodeType: {
            value: 10
        }
    });
}

// inheritance
Doctype.prototype = Object.create(Node.prototype);
Doctype.prototype.constructor = Doctype;

module.exports = Doctype;
