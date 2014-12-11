'use strict';

var expect = require('chai').expect;
var Node = require('../../../lib/dom/node');
var Element = require('../../../lib/dom/element');
var Attr = require('../../../lib/dom/attr');

var element = Element({
    tagName: 'test',
    attributes: {
        test: Attr({
            name: 'test',
            value: 'value'
        })
    }
});

var emptyElement = Element({ tagName: 'test' });

describe('lib/dom/element', function() {
    describe('class', function() {
        it('Element should exist', function() {
            expect(Element).to.exist;
        });

        it('Element should be an instance of Function', function() {
            expect(Element).to.be.an.instanceof(Function);
        });
    });

    describe('instance', function() {
        it('should be an instance of Node and Element', function() {
            expect(element).to.be.an.instanceof(Node);
            expect(element).to.be.an.instanceof(Element);
        });

        it('.nodeType', function() {
            expect(element.nodeType).to.be.equal(1);
        });

        it('.tagName', function() {
            expect(element.tagName).to.be.equal('test');
        });

        it('.hasAttribute()', function() {
            expect(element.hasAttribute('test')).to.be.true;
            expect(element.hasAttribute('aaa')).to.be.false;
            expect(emptyElement.hasAttribute('aaa')).to.be.false;
        });

        it('.getAttribute()', function() {
            expect(element.getAttribute('test')).to.be.equal('value');
            expect(emptyElement.getAttribute('test')).to.be.undefined;
        });

        it('.setAttribute()', function() {
            element.setAttribute('test2', 'value2');
            element.setAttribute('test3', 'value3', 'prefix');
            element.setAttribute('', 'http://www.w3.org/2000/xmlns/', 'xmlns');

            expect(Object.keys(element.attributes).length).to.be.equal(4);
            expect(element.getAttribute('test2')).to.be.equal('value2');
            expect(element.getAttribute('prefix:test3')).to.be.equal('value3');
            expect(element.getAttribute('xmlns')).to.be.equal('http://www.w3.org/2000/xmlns/');
        });

        it('.removeAttribute()', function() {
            element.removeAttribute('test');

            expect(emptyElement.hasAttributes()).to.be.false;
        });
    });
});
