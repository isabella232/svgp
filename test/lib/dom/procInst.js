'use strict';

var expect = require('chai').expect;
var Node = require('../../../lib/dom/node');
var ProcInst = require('../../../lib/dom/procInst');

var procInst = ProcInst({
    target: 'xml',
    data: 'version="1.0" encoding="utf-8"'
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

        it('procInst() should have .target="xml"', function() {
            expect(procInst.target).to.be.equal('xml');
        });

        it('procInst() should have .data="…"', function() {
            expect(procInst.data).to.be.equal('version="1.0" encoding="utf-8"');
        });

        it('procInst() should allow to change .data', function() {
            procInst.data = 'version="2.0" encoding="utf-8"';

            expect(procInst.data).to.be.equal('version="2.0" encoding="utf-8"');
        });
    });
});
