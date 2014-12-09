'use strict';

var Node = require('./node');

function ProcInst(node) {
    if (!(this instanceof ProcInst)) {
        return new ProcInst(node);
    }

    Node.call(this, node);

    Object.defineProperties(this, {
        nodeType: {
            value: 7
        },
        target: {
            get: function() {
                return node.target;
            }
        },
        data: {
            get: function() {
                return node.data;
            },
            set: function(newData) {
                node.data = newData;
            }
        }
    });
}

ProcInst.prototype = Object.create(Node.prototype);
ProcInst.prototype.constructor = ProcInst;

module.exports = ProcInst;
