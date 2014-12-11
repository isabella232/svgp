'use strict';

var expect = require('chai').expect;
var Node = require('../../../lib/dom/node');
var Attr = require('../../../lib/dom/attr');

var attr = Attr({
    name: 'name',
    value: 'value',
    prefix: 'prefix'
});

describe('lib/dom/comment', function() {
    describe('interface', function() {
        it('Attr should exist', function() {
            expect(Attr).to.exist;
        });

        it('Attr should be an instance of Function', function() {
            expect(Attr).to.be.an.instanceof(Function);
        });

        it('Attr() should be an instance of Node and Attr', function() {
            expect(attr).to.be.an.instanceof(Node);
            expect(attr).to.be.an.instanceof(Attr);
        });

        it('Attr() should have .nodeType=2', function() {
            expect(attr.nodeType).to.be.equal(2);
        });

        it('Attr() should have .name="name"', function() {
            expect(attr.name).to.be.equal('name');
        });

        it('Attr() should have .prefix="prefix"', function() {
            expect(attr.prefix).to.be.equal('prefix');
        });

        it('Attr() should have .value="value"', function() {
            expect(attr.value).to.be.equal('value');
        });

        it('Attr() should allow .value changes', function() {
            attr.value = 123;

            expect(attr.value).to.be.equal(123);
        });
    });
});
