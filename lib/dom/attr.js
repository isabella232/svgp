'use strict';

var Node = require('./node');

function Attr(attr) {
    if (!(this instanceof Attr)) {
        return new Attr(attr);
    }

    Node.call(this, attr);

    Object.defineProperties(Attr.prototype, {
        name: {
            get: function() {
                return attr.name;
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

Attr.prototype = Object.create(Node.prototype);
Attr.prototype.constructor = Attr;

module.exports = Attr;
