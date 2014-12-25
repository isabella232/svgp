'use strict';

function Node(node) {
    // auto-instance
    if (!(this instanceof Node)) {
        return new Node(node);
    }

    // node defaults
    node = node || {};
    node.attributes = node.attributes || {};
    node.childNodes = node.childNodes || [];

    Object.defineProperties(this, {
        hasAttributes: {
            value: function() {
                return !!Object.keys(node.attributes).length;
            }
        },
        nodeValue: {
            get: function() {
                return node.nodeValue;
            }
        },
        attributes: {
            get: function() {
                return node.attributes;
            }
        },
        parentNode: {
            get: function() {
                return node.parentNode;
            },
            set: function(parentNode) {
                node.parentNode = parentNode;
            }
        },
        hasChildNodes: {
            value: function() {
                return !!node.childNodes.length;
            }
        },
        childNodes: {
            get: function() {
                return node.childNodes;
            }
        },
        firstChild: {
            get: function() {
                return node.childNodes[ 0 ];
            }
        },
        lastChild: {
            get: function() {
                return node.childNodes[ node.childNodes.length - 1 ];
            }
        },
        appendChild: {
            value: function(child) {
                child.parentNode = node;
                node.childNodes.push(child);
            }
        }
    });
}

module.exports = Node;
