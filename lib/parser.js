'use strict';

var sax = require('sax');
var Document = require('./dom/document');

var document = Document();

// https://github.com/isaacs/sax-js#arguments
var options = {
    strict: true,
    trim: true,
    normalize: true,
    lowercase: true,
    xmlns: true,
    position: false
};

function Parser(opts) {
    if (!(this instanceof Parser)) {
        return new Parser(opts);
    }

    this.opts = JSON.parse(JSON.stringify(options));

    if (opts) {
        for (var k in opts) {
            if (opts.hasOwnProperty(k)) {
                this.opts[k] = opts[k];
            }
        }
    }

    this.sax = sax.parser(this.opts.strict, this.opts);
    this.document = Document();
    this.current = this.document;
    this.stack = [];
}

Parser.prototype.parse = function(data, callback) {
    var that = this;

    this.sax.onopentag = function(data) {
        var elem = document.createElement(data.name, data.prefix);
        var attrs = data.attributes;

        if (Object.keys(attrs).length) {
            for (var attrName in attrs) {
                if (attrs.hasOwnProperty(attrName)) {
                    var attr = attrs[attrName];

                    elem.setAttribute(attr.local, attr.value, attr.prefix);
                }
            }
        }

        that.current.appendChild(elem);
        that.current = elem;
        that.stack.push(that.current);
    };

    this.sax.onclosetag = function() {
        that.stack.pop();
        that.current = that.stack[that.stack.length - 1];
    };

    this.sax.ontext = function(data) {
        that.current.appendChild(
            document.createTextNode(data)
        );
    };

    this.sax.ondoctype = function(data) {
        that.current.appendChild(
            document.createDocumentType(data)
        );
    };

    this.sax.onprocessinginstruction = function(obj) {
        that.current.appendChild(
            document.createProcessingInstruction(obj.name, obj.body)
        );
    };

    this.sax.oncomment = function(data) {
        that.current.appendChild(
            document.createComment(data)
        );
    };

    this.sax.oncdata = function(data) {
        that.current.appendChild(
            document.createCDATASection(data)
        );
    };

    this.sax.onerror = function(err) {
        callback(err);

        // https://github.com/isaacs/sax-js#events
        // "The error will be hanging out on Parse.error,
        // and must be deleted before parsing can continue"
        this.error = null;
    };

    this.sax.onend = function() {
        callback(null, that.document);
    };

    this.sax.write(data).close();
};

module.exports = Parser;
