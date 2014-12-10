'use strict';

var expect = require('chai').expect;
var Node = require('../../../lib/dom/node');
var Document = require('../../../lib/dom/document');

var document = Document();

describe('lib/dom/document', function() {
    describe('interface', function() {
        it('Document should exist', function() {
            expect(Document).to.exist;
        });

        it('Document should be an instance of Function', function() {
            expect(Document).to.be.an.instanceof(Function);
        });

        it('Document() should be an instance of Node and Document', function() {
            expect(document).to.be.an.instanceof(Node);
            expect(document).to.be.an.instanceof(Document);
        });

        it('Document() should have .nodeType=9', function() {
            expect(document.nodeType).to.be.equal(9);
        });

        it('Document() should have all the necessary methods', function() {
            expect(document).to.have.property('createElement').that.is.a('function');
            expect(document).to.have.property('createTextNode').that.is.a('function');
            expect(document).to.have.property('createComment').that.is.a('function');
            expect(document).to.have.property('createProcessingInstruction').that.is.a('function');
            expect(document).to.have.property('createCDATASection').that.is.a('function');
            expect(document).to.have.property('createDocumentType').that.is.a('function');
        });
    });

    describe('methods', function() {
        it('createElement()', function() {
            var elem = document.createElement('g');

            expect(elem.nodeType).to.be.equal(1);
        });

        it('createTextNode()', function() {
            var elem = document.createTextNode('text');

            expect(elem.nodeType).to.be.equal(3);
        });

        it('createComment()', function() {
            var elem = document.createComment('comment');

            expect(elem.nodeType).to.be.equal(8);
        });

        it('createProcessingInstruction()', function() {
            var elem = document.createProcessingInstruction(
                'xml',
                'version="1.0" encoding="utf-8"'
            );

            expect(elem.nodeType).to.be.equal(7);
        });

        it('createCDATASection()', function() {
            var elem = document.createCDATASection('data');

            expect(elem.nodeType).to.be.equal(4);
        });

        it('createDocumentType()', function() {
            var elem = document.createDocumentType('data');

            expect(elem.nodeType).to.be.equal(10);
        });
    });
});
