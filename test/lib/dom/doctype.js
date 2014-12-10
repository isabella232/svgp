'use strict';

var expect = require('chai').expect;
var Node = require('../../../lib/dom/node');
var Doctype = require('../../../lib/dom/doctype');

var doctype = Doctype({ nodeValue: 'data' });

describe('lib/dom/text', function() {
    describe('interface', function() {
        it('Doctype should exist', function() {
            expect(Doctype).to.exist;
        });

        it('Doctype should be an instance of Function', function() {
            expect(Doctype).to.be.an.instanceof(Function);
        });

        it('Doctype() should be an instance of Node and Text', function() {
            expect(doctype).to.be.an.instanceof(Node);
            expect(doctype).to.be.an.instanceof(Doctype);
        });

        it('Doctype() should have nodeType 10', function() {
            expect(doctype.nodeType).to.be.equal(10);
        });

        it('Doctype() should have nodeValue "data"', function() {
            expect(doctype.nodeValue).to.be.equal('data');
        });
    });
});
