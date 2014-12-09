'use strict';

var Node = require('./node');

function Comment(node) {
    if (!(this instanceof Comment)) {
        return new Comment(node);
    }

    Node.call(this, node);

    Object.defineProperties(this, {
        nodeType: {
            value: 8
        }
    });
}

Comment.prototype = Object.create(Node.prototype);
Comment.prototype.constructor = Comment;

module.exports = Comment;
