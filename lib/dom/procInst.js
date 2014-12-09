'use strict';

var Node = require('./node');

function ProcInst(node) {
    if (!(this instanceof ProcInst)) {
        return new ProcInst(node);
    }

    Node.call(this, attr);

    Object.defineProperties(ProcInst.prototype, {
        target: {
            get: function() {
                return node.target;
            }
        },
        data: {
            get: function() {
                return attr.data;
            },
            set: function(newData) {
                attr.data = newData;
            }
        }
    });
}

ProcInst.prototype = Object.create(Node.prototype);
ProcInst.prototype.constructor = ProcInst;

module.exports = ProcInst;
