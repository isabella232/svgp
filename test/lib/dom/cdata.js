'use strict';

var expect = require('chai').expect;
var Node = require('../../../lib/dom/node');
var CDATA = require('../../../lib/dom/cdata');

var cdata = CDATA({ nodeValue: 'raw' });

describe('lib/dom/comment', function() {
    describe('interface', function() {
        it('CDATA should exist', function() {
            expect(CDATA).to.exist;
        });

        it('CDATA should be an instance of Function', function() {
            expect(CDATA).to.be.an.instanceof(Function);
        });

        it('CDATA() should be an instance of Node and CDATA', function() {
            expect(cdata).to.be.an.instanceof(Node);
            expect(cdata).to.be.an.instanceof(CDATA);
        });

        it('CDATA() should have .nodeType=4', function() {
            expect(cdata.nodeType).to.be.equal(4);
        });

        it('CDATA() should have .nodeValue="raw"', function() {
            expect(cdata.nodeValue).to.be.equal('raw');
        });
    });
});
