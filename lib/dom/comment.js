'use strict';

var Node = require('./node');

function Comment(node) {
    // auto-instance
    if (!(this instanceof Comment)) {
        return new Comment(node);
    }

    // call super constructor
    Node.call(this, node);

    Object.defineProperties(this, {
        nodeType: {
            value: 8
        }
    });
}

// inheritance
Comment.prototype = Object.create(Node.prototype);
Comment.prototype.constructor = Comment;

module.exports = Comment;
