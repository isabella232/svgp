'use strict';

var Node = require('./node');

function Attr(attr) {
    // auto-instance
    if (!(this instanceof Attr)) {
        return new Attr(attr);
    }

    // call super constructor
    Node.call(this, attr);

    Object.defineProperties(this, {
        name: {
            get: function() {
                return attr.name;
            }
        },
        prefix: {
            get: function() {
                return attr.prefix;
            }
        },
        value: {
            get: function() {
                return attr.value;
            },
            set: function(newValue) {
                attr.value = newValue;
            }
        }
    });
}

// inheritance
Attr.prototype = Object.create(Node.prototype);
Attr.prototype.constructor = Attr;

module.exports = Attr;
