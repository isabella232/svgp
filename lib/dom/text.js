'use strict';

var Node = require('./node');

function Text(node) {
    if (!(this instanceof Text)) {
        return new Text(node);
    }

    Node.call(this, node);

    Object.defineProperties(this, {
        nodeType: {
            value: 3
        }
    });
}

Text.prototype = Object.create(Node.prototype);
Text.prototype.constructor = Text;

module.exports = Text;
