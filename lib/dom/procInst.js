'use strict';

var Node = require('./node');

function ProcInst(node) {
    // auto-instance
    if (!(this instanceof ProcInst)) {
        return new ProcInst(node);
    }

    // call super constructor
    Node.call(this, node);

    Object.defineProperties(this, {
        nodeType: {
            value: 7
        }
    });
}

// inheritance
ProcInst.prototype = Object.create(Node.prototype);
ProcInst.prototype.constructor = ProcInst;

module.exports = ProcInst;
