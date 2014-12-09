'use strict';

var Node = require('./node');

function Doctype(node) {
    if (!(this instanceof Doctype)) {
        return new Doctype(node);
    }

    Node.call(this, node);

    Object.defineProperties(this, {
        nodeType: {
            value: 10
        }
    });
}

Doctype.prototype = Object.create(Node.prototype);
Doctype.prototype.constructor = Doctype;

module.exports = Doctype;
