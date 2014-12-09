'use strict';

var Node = require('./node');
var Attr = require('./attr');

function Element(elem) {
    if (!(this instanceof Element)) {
        return new Element(elem);
    }

    Node.call(this, elem);

    Object.defineProperties(Element.prototype, {
        tagName: {
            get: function() {
                return elem.tagName;
            }
        },
        hasAttribute: {
            value: function(name) {
                if (this.hasAttributes()) {
                    if (name in elem.attributes) {
                        return true;
                    }
                }

                return false;
            }
        },
        getAttribute: {
            value: function(name) {
                if (this.hasAttribute(name)) {
                    return elem.attributes[name];
                }

                return null;
            }
        },
        setAttribute: {
            value: function(name, val) {
                elem.attributes[name] = val;
            }
        },
        removeAttribute: {
            value: function(name) {
                delete elem.attributes[name];
            }
        }
    });
}

Element.prototype = Object.create(Node.prototype);
Element.prototype.constructor = Element;

module.exports = Element;
