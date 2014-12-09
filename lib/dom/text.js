'use strict';

var Node = require('./node');

function Text(node) {
    // auto-instance
    if (!(this instanceof Text)) {
        return new Text(node);
    }

    // call super constructor
    Node.call(this, node);

    Object.defineProperties(this, {
        nodeType: {
            value: 3
        }
    });
}

// inheritance
Text.prototype = Object.create(Node.prototype);
Text.prototype.constructor = Text;

module.exports = Text;
