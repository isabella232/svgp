'use strict';

var Node = require('./node');

function CDATA(node) {
    if (!(this instanceof CDATA)) {
        return new CDATA(node);
    }

    Node.call(this, node);

    Object.defineProperties(this, {
        nodeType: {
            value: 4
        }
    });
}

CDATA.prototype = Object.create(Node.prototype);
CDATA.prototype.constructor = CDATA;

module.exports = CDATA;
