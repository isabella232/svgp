'use strict';

var expect = require('chai').expect;
var Node = require('../../../lib/dom/node');
var ProcInst = require('../../../lib/dom/procInst');

var procInst = ProcInst({
    nodeValue: 'xml version="1.0" encoding="utf-8"'
});

describe('lib/dom/procinst', function() {
    describe('interface', function() {
        it('ProcInst should exist', function() {
            expect(ProcInst).to.exist;
        });

        it('procInst should be an instance of Function', function() {
            expect(ProcInst).to.be.an.instanceof(Function);
        });

        it('procInst() should be an instance of Node and procInst', function() {
            expect(procInst).to.be.an.instanceof(Node);
            expect(procInst).to.be.an.instanceof(ProcInst);
        });

        it('procInst() should have .nodeType=7', function() {
            expect(procInst.nodeType).to.be.equal(7);
        });

        it('procInst() should have .nodeValue="…"', function() {
            expect(procInst.nodeValue).to.be.equal('xml version="1.0" encoding="utf-8"');
        });
    });
});
