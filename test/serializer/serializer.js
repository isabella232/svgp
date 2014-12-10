'use strict';

var fs = require('fs');
var path = require('path');
var expect = require('chai').expect;
var Parser = require('../../lib/parser');
var Serializer = require('../../lib/serializer');

function parseFixtureData(fixtureFilename) {
    var fixturePath = path.resolve(__dirname, '../fixtures/', fixtureFilename);
    var data = fs.readFileSync(fixturePath, 'utf-8');
    var parser = Parser();

    return parser.parse(data);
}

function serializeFixtureData(fixtureFilename) {
    var data = parseFixtureData(fixtureFilename);
    var serializer = Serializer();

    return serializer.serialize(data);
}

describe('Serializer', function() {
    describe('interface', function() {
        it('Serializer should exist', function() {
            expect(Serializer).to.exist;
        });

        it('Serializer should be an instance of Function', function() {
            expect(Serializer).to.be.an.instanceof(Function);
        });

        it('Serializer() should be an instance of Parser', function() {
            expect(Serializer()).to.be.an.instanceof(Serializer);
        });
    });

    describe('options', function() {
        it('Serializer() should have default options', function() {
            var serializer = Serializer();

            expect(serializer).to.have.ownProperty('opts').that.is.an('object');
            expect(serializer).to.have.deep.property('opts.tagOpenStart');
            expect(serializer).to.have.deep.property('opts.tagOpenEnd');
            expect(serializer).to.have.deep.property('opts.tagCloseStart');
            expect(serializer).to.have.deep.property('opts.tagCloseEnd');
            expect(serializer).to.have.deep.property('opts.tagShortStart');
            expect(serializer).to.have.deep.property('opts.tagShortEnd');
            expect(serializer).to.have.deep.property('opts.attrValueStart');
            expect(serializer).to.have.deep.property('opts.attrValueEnd');
            expect(serializer).to.have.deep.property('opts.commentStart');
            expect(serializer).to.have.deep.property('opts.commentEnd');
            expect(serializer).to.have.deep.property('opts.cdataStart');
            expect(serializer).to.have.deep.property('opts.cdataEnd');
            expect(serializer).to.have.deep.property('opts.textStart');
            expect(serializer).to.have.deep.property('opts.textEnd');
            expect(serializer).to.have.deep.property('opts.indent');
            expect(serializer).to.have.deep.property('opts.pretty');
        });

        it('Serializer({ ... }) should extend default options', function() {
            var serializer = Serializer({
                pretty: true
            });

            expect(serializer).to.have.deep.property('opts.pretty', true);
        });
    });

    describe('serialize()', function() {
        before(function() {
            this.serializer = Serializer();
        });

        it('simple element', function() {
            var data = serializeFixtureData('element.simple.xml');

            expect(data).to.be.equal(
                '<svg/>'
            );
        });

        it('element nesting', function() {
            var data = serializeFixtureData('element.nesting.xml');

            expect(data).to.be.equal(
                '<svg><g/></svg>'
            );
        });

        it('element attrs', function() {
            var data = serializeFixtureData('element.attrs.xml');

            expect(data).to.be.equal(
                '<svg attr="val" xmlns:xlink="http://www.w3.org/1999/xlink"/>'
            );
        });

        it('text', function() {
            var data = serializeFixtureData('text.xml');

            expect(data).to.be.equal(
                '<svg>text</svg>'
            );
        });

        it('comment', function() {
            var data = serializeFixtureData('comment.xml');

            expect(data).to.be.equal(
                '<!--comment--><svg/>'
            );
        });

        it('doctype', function() {
            var data = serializeFixtureData('doctype.xml');

            expect(data).to.be.equal(
                '<!DOCTYPE doctype string><svg/>'
            );
        });

        it('processing instruction', function() {
            var data = serializeFixtureData('procinst.xml');

            expect(data).to.be.equal(
                '<?xml version="1.0" encoding="utf-8"?><svg/>'
            );
        });

        it('CDATA', function() {
            var data = serializeFixtureData('cdata.xml');

            expect(data).to.be.equal(
                '<svg><![CDATA[raw]]></svg>'
            );
        });

        it('pretty', function() {
            var data = parseFixtureData('multiple.nesting.xml');

            data = Serializer({ pretty: true }).serialize(data);

            expect(data).to.be.equal(
                '<svg>\n' +
                '    <g>\n' +
                '        <g>\n' +
                '            text1 text2\n' +
                '        </g>\n' +
                '    </g>\n' +
                '</svg>\n'
            );
        });
    });
});
