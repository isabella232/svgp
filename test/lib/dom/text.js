'use strict';

var expect = require('chai').expect;
var Node = require('../../../lib/dom/node');
var Text = require('../../../lib/dom/text');

var text = Text({ nodeValue: 'text' });

describe('lib/dom/text', function() {
    describe('interface', function() {
        it('Text should exist', function() {
            expect(Text).to.exist;
        });

        it('Text should be an instance of Function', function() {
            expect(Text).to.be.an.instanceof(Function);
        });

        it('Text() should be an instance of Node and Text', function() {
            expect(text).to.be.an.instanceof(Node);
            expect(text).to.be.an.instanceof(Text);
        });

        it('Text() should have .nodeType=9', function() {
            expect(text.nodeType).to.be.equal(3);
        });

        it('Text() should have .nodeValue="text"', function() {
            expect(text.nodeValue).to.be.equal('text');
        });
    });
});
