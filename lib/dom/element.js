'use strict';

var Node = require('./node');
var Attr = require('./attr');

function Element(elem) {
    if (!(this instanceof Element)) {
        return new Element(elem);
    }

    Node.call(this, elem);

    Object.defineProperties(this, {
        nodeType: {
            value: 1
        },
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
                    return elem.attributes[name].value;
                }

                return null;
            }
        },
        setAttribute: {
            value: function(name, value, prefix) {
                var attrName = name;

                if (prefix) {
                    if (name) {
                        attrName = prefix + ':' + name;
                    } else {
                        attrName = prefix;
                    }
                }

                elem.attributes[attrName] = Attr({
                    name: name,
                    value: value,
                    prefix: prefix
                });
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
