'use strict';

var expect = require('chai').expect;
var Node = require('../../../lib/dom/node');
var Comment = require('../../../lib/dom/comment');

var comment = Comment({ nodeValue: 'comment' });

describe('lib/dom/comment', function() {
    describe('interface', function() {
        it('Comment should exist', function() {
            expect(Comment).to.exist;
        });

        it('Comment should be an instance of Function', function() {
            expect(Comment).to.be.an.instanceof(Function);
        });

        it('Comment() should be an instance of Node and Text', function() {
            expect(comment).to.be.an.instanceof(Node);
            expect(comment).to.be.an.instanceof(Comment);
        });

        it('Comment() should have nodeType 8', function() {
            expect(comment.nodeType).to.be.equal(8);
        });

        it('Comment() should have nodeValue "comment"', function() {
            expect(comment.nodeValue).to.be.equal('comment');
        });
    });
});
