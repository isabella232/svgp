'use strict';

var Node = require('./node');

function CDATA(node) {
    // auto-instance
    if (!(this instanceof CDATA)) {
        return new CDATA(node);
    }

    // call super constructor
    Node.call(this, node);

    Object.defineProperties(this, {
        nodeType: {
            value: 4
        }
    });
}

// inheritance
CDATA.prototype = Object.create(Node.prototype);
CDATA.prototype.constructor = CDATA;

module.exports = CDATA;
