'use strict';

var fs = require('fs');
var path = require('path');
var expect = require('chai').expect;
var Parser = require('../../lib/parser');

describe('Parser', function() {
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
        before(function() {
            this.parser = Parser();
        });

        it('error', function() {
            var fixturePath = path.resolve(__dirname, './fixtures/error.xml');
            var data = fs.readFileSync(fixturePath, 'utf-8');
            var parser = this.parser.parse.bind(this.parser, data);

            expect(parser).to.throw('Non-whitespace before first tag');
        });

        it('simple element', function() {
            var fixturePath = path.resolve(__dirname, './fixtures/element.simple.xml');
            var data = fs.readFileSync(fixturePath, 'utf-8');
            var childNodes;

            data = this.parser.parse(data);
            childNodes = data.childNodes;

            expect(childNodes.length).to.be.equal(1);
            expect(childNodes[0].nodeType).to.be.equal(1);
            expect(childNodes[0].tagName).to.be.equal('svg');
            expect(childNodes[0].childNodes.length).to.be.equal(0);
        });

        it('element nesting', function() {
            var fixturePath = path.resolve(__dirname, './fixtures/element.nesting.xml');
            var data = fs.readFileSync(fixturePath, 'utf-8');
            var childNodes;

            data = this.parser.parse(data);
            childNodes = data.childNodes[0];

            expect(childNodes.childNodes.length).to.be.equal(1);
            expect(childNodes.childNodes[0].nodeType).to.be.equal(1);
            expect(childNodes.childNodes[0].tagName).to.be.equal('g');
        });

        it('element attrs', function() {
            var fixturePath = path.resolve(__dirname, './fixtures/element.attrs.xml');
            var data = fs.readFileSync(fixturePath, 'utf-8');
            var attrs;

            data = this.parser.parse(data);
            attrs = data.childNodes[0].attributes;

            expect(Object.keys(attrs).length).to.be.equal(2);
            expect(attrs['xmlns:xlink'].name).to.be.equal('xlink');
            expect(attrs['xmlns:xlink'].prefix).to.be.equal('xmlns');
            expect(attrs['xmlns:xlink'].value).to.be.equal('http://www.w3.org/1999/xlink');
        });

        it('text', function() {
            var fixturePath = path.resolve(__dirname, './fixtures/text.xml');
            var data = fs.readFileSync(fixturePath, 'utf-8');
            var root;

            data = this.parser.parse(data);
            root = data.childNodes[0];

            expect(root.childNodes.length).to.be.equal(1);
            expect(root.childNodes[0].nodeType).to.be.equal(3);
            expect(root.childNodes[0].nodeValue).to.be.equal('text');
        });

        it('comment', function() {
            var fixturePath = path.resolve(__dirname, './fixtures/comment.xml');
            var data = fs.readFileSync(fixturePath, 'utf-8');
            var childNodes;

            data = this.parser.parse(data);
            childNodes = data.childNodes;

            expect(childNodes.length).to.be.equal(2);
            expect(childNodes[0].nodeType).to.be.equal(8);
            expect(childNodes[0].nodeValue).to.be.equal('comment');
        });

        it('doctype', function() {
            var fixturePath = path.resolve(__dirname, './fixtures/doctype.xml');
            var data = fs.readFileSync(fixturePath, 'utf-8');
            var childNodes;

            data = this.parser.parse(data);
            childNodes = data.childNodes;

            expect(childNodes.length).to.be.equal(2);
            expect(childNodes[0].nodeType).to.be.equal(10);
            expect(childNodes[0].nodeValue).to.be.equal('doctype string');
        });

        it('processing instruction', function() {
            var fixturePath = path.resolve(__dirname, './fixtures/procinst.xml');
            var data = fs.readFileSync(fixturePath, 'utf-8');
            var childNodes;

            data = this.parser.parse(data);
            childNodes = data.childNodes;

            expect(childNodes.length).to.be.equal(2);
            expect(childNodes[0].nodeType).to.be.equal(7);
            expect(childNodes[0].target).to.be.equal('xml');
            expect(childNodes[0].data).to.be.equal('version="1.0" encoding="utf-8"');
        });

        it('CDATA', function() {
            var fixturePath = path.resolve(__dirname, './fixtures/cdata.xml');
            var data = fs.readFileSync(fixturePath, 'utf-8');
            var root;

            data = this.parser.parse(data);
            root = data.childNodes[0];

            expect(root.childNodes.length).to.be.equal(1);
            expect(root.childNodes[0].nodeType).to.be.equal(4);
            expect(root.childNodes[0].nodeValue).to.be.equal('raw');
        });
    });
});
