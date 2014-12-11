'use strict';

var expect = require('chai').expect;
var Node = require('../../../lib/dom/node');
var Document = require('../../../lib/dom/document');
var Attr = require('../../../lib/dom/attr');

var document = Document();

var node = Node({
    nodeValue: 'text',
    attributes: {
        test: Attr({
            name: 'test',
            value: 'value'
        })
    },
    childNodes: [
        document.createTextNode('text1'),
        document.createTextNode('text2')
    ],
    parentNode: document
});

var emptyNode = Node();

describe('lib/dom/node', function() {
    describe('class', function() {
        it('Node should exist', function() {
            expect(Node).to.exist;
        });

        it('Node should be an instance of Function', function() {
            expect(Node).to.be.an.instanceof(Function);
        });
    });

    describe('instance', function() {
        it('should be an instance of Node', function() {
            expect(node).to.be.an.instanceof(Node);
        });

        it('.nodeValue', function() {
            expect(node.nodeValue).to.be.equal('text');
            expect(emptyNode.nodeValue).to.be.undefined;
        });

        it('.hasAttributes()', function() {
            expect(node.hasAttributes()).to.be.true;
            expect(emptyNode.hasAttributes()).to.be.false;
        });

        it('.attributes', function() {
            expect(node.attributes).to.be.an('object');
            expect(Object.keys(node.attributes).length).to.be.equal(1);
            expect(emptyNode.attributes).to.be.an('object');
            expect(Object.keys(emptyNode.attributes).length).to.be.equal(0);
        });

        it('.hasChildNodes()', function() {
            expect(node.hasChildNodes()).to.be.true;
            expect(emptyNode.hasChildNodes()).to.be.false;
        });

        it('.childNodes', function() {
            expect(node.childNodes).to.be.an('array').that.have.length(2);
            expect(emptyNode.childNodes).to.be.an('array').that.have.length(0);
        });

        it('.firstChild', function() {
            expect(node.firstChild).to.have.property('nodeValue', 'text1');
            expect(emptyNode.firstChild).to.be.undefined;
        });

        it('.lastChild', function() {
            expect(node.lastChild).to.have.property('nodeValue', 'text2');
            expect(emptyNode.lastChild).to.be.undefined;
        });

        it('.appendChild()', function() {
            node.appendChild(document.createTextNode('text3'));

            expect(node.lastChild).to.have.property('nodeValue', 'text3');
        });

        it('.parentNode', function() {
            expect(node.parentNode).to.be.equal(document);
            expect(emptyNode.parentNode).to.be.undefined;
        });
    });
});
