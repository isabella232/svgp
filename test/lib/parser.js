'use strict';

var fs = require('fs');
var path = require('path');
var expect = require('chai').expect;
var Parser = require('../../lib/parser');

function getFixtureData(fixtureFilename) {
    var fixturePath = path.resolve(__dirname, '../fixtures/', fixtureFilename);
    var data = fs.readFileSync(fixturePath, 'utf-8');

    return data;
}

function parseFixtureData(fixtureFilename) {
    var parser = Parser();
    var data = getFixtureData(fixtureFilename);

    return parser.parse(data);
}

describe('lib/parser', function() {
    describe('interface', function() {
        it('Parser should exist', function() {
            expect(Parser).to.exist;
        });

        it('Parser should be an instance of Function', function() {
            expect(Parser).to.be.an.instanceof(Function);
        });

        it('Parser() should be an instance of Parser', function() {
            expect(Parser()).to.be.an.instanceof(Parser);
        });
    });

    describe('options', function() {
        it('Parser() should have default options', function() {
            var parser = Parser();

            expect(parser).to.have.ownProperty('opts').that.is.an('object');
            expect(parser).to.have.deep.property('opts.strict');
            expect(parser).to.have.deep.property('opts.trim');
            expect(parser).to.have.deep.property('opts.normalize');
            expect(parser).to.have.deep.property('opts.lowercase');
            expect(parser).to.have.deep.property('opts.xmlns');
            expect(parser).to.have.deep.property('opts.position');
        });

        it('Parser({ ... }) should extend default options', function() {
            var parser = Parser({
                strict: false,
                trim: false
            });

            expect(parser).to.have.deep.property('opts.strict', false);
            expect(parser).to.have.deep.property('opts.trim', false);
        });
    });

    describe('parse()', function() {
        it('error', function() {
            var data = getFixtureData('error.xml');
            var parser = Parser();
            var parse = parser.parse.bind(parser, data);

            expect(parse).to.throw('Non-whitespace before first tag');
        });

        it('simple element', function() {
            var data = parseFixtureData('element.simple.xml');
            var childNodes = data.childNodes;

            expect(childNodes.length).to.be.equal(1);
            expect(childNodes[0].nodeType).to.be.equal(1);
            expect(childNodes[0].tagName).to.be.equal('svg');
            expect(childNodes[0].childNodes.length).to.be.equal(0);
        });

        it('element nesting', function() {
            var data = parseFixtureData('element.nesting.xml');
            var childNodes = data.childNodes[0];

            expect(childNodes.childNodes.length).to.be.equal(1);
            expect(childNodes.childNodes[0].nodeType).to.be.equal(1);
            expect(childNodes.childNodes[0].tagName).to.be.equal('g');
            expect(childNodes.childNodes[0].parentNode.tagName).to.be.equal(childNodes.tagName);
        });

        it('element attrs', function() {
            var data = parseFixtureData('element.attrs.xml');
            var attrs = data.childNodes[0].attributes;

            expect(Object.keys(attrs).length).to.be.equal(2);
            expect(attrs['xmlns:xlink'].name).to.be.equal('xlink');
            expect(attrs['xmlns:xlink'].prefix).to.be.equal('xmlns');
            expect(attrs['xmlns:xlink'].value).to.be.equal('http://www.w3.org/1999/xlink');
        });

        it('text', function() {
            var data = parseFixtureData('text.xml');
            var root = data.childNodes[0];

            expect(root.childNodes.length).to.be.equal(1);
            expect(root.childNodes[0].nodeType).to.be.equal(3);
            expect(root.childNodes[0].nodeValue).to.be.equal('text');
        });

        it('comment', function() {
            var data = parseFixtureData('comment.xml');
            var childNodes = data.childNodes;

            expect(childNodes.length).to.be.equal(2);
            expect(childNodes[0].nodeType).to.be.equal(8);
            expect(childNodes[0].nodeValue).to.be.equal('comment');
        });

        it('doctype', function() {
            var data = parseFixtureData('doctype.xml');
            var childNodes = data.childNodes;

            expect(childNodes.length).to.be.equal(2);
            expect(childNodes[0].nodeType).to.be.equal(10);
            expect(childNodes[0].nodeValue).to.be.equal('doctype string');
        });

        it('processing instruction', function() {
            var data = parseFixtureData('procinst.xml');
            var childNodes = data.childNodes;

            expect(childNodes.length).to.be.equal(2);
            expect(childNodes[0].nodeType).to.be.equal(7);
            expect(childNodes[0].nodeValue).to.be.equal('xml version="1.0" encoding="utf-8"');
        });

        it('CDATA', function() {
            var data = parseFixtureData('cdata.xml');
            var root = data.childNodes[0];

            expect(root.childNodes.length).to.be.equal(1);
            expect(root.childNodes[0].nodeType).to.be.equal(4);
            expect(root.childNodes[0].nodeValue).to.be.equal('raw');
        });

        it('entities', function() {
            var data = parseFixtureData('entities.xml');
            var attrs = data.lastChild.attributes;

            expect(attrs['xmlns:x'].value).to.be.equal('http://ns.adobe.com/Extensibility/1.0/');
            expect(attrs['xmlns:graph'].value).to.be.equal('http://ns.adobe.com/Graphs/1.0/');
        });
    });
});
