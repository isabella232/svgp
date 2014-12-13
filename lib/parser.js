'use strict';

var sax = require('sax');
var Document = require('./dom/document');
var Element = require('./dom/element');
var Text = require('./dom/text');
var Comment = require('./dom/comment');
var CDATA = require('./dom/cdata');
var ProcInst = require('./dom/procInst');
var Doctype = require('./dom/doctype');

// default options
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
    // auto-instance
    if (!(this instanceof Parser)) {
        return new Parser(opts);
    }

    // clone default options to not touch the original
    this.opts = JSON.parse(JSON.stringify(options));

    // extend options
    if (opts) {
        Object.keys(opts).forEach(function(k) {
            this.opts[k] = opts[k];
        }, this);
    }

    // new sax-parser instance
    this.sax = sax.parser(this.opts.strict, this.opts);
}

Parser.prototype.parse = function(data) {
    var that = this;

    // document root, very first "current node"
    this.document = Document();
    // current node
    this.current = this.document;
    // stack of nested nodes to go up `onclosetag`
    this.stack = [];

    this.sax.onopentag = function(data) {
        // create new Element
        var elem = Element({
            tagName: data.name,
            prefix: data.prefix,
            parentNode: that.current
        });
        var attrs = data.attributes;

        // create attributes if they exists
        Object.keys(attrs).forEach(function(attrName) {
            var attr = attrs[attrName];

            elem.setAttribute(attr.local, attr.value, attr.prefix);
        });

        // append new element to current node
        that.current.appendChild(elem);
        // change current node to new element
        that.current = elem;
        // and save it to stack
        that.stack.push(that.current);
    };

    this.sax.onclosetag = function() {
        // remove the last element from stack
        that.stack.pop();
        // re-new the current node with the new last from stack
        that.current = that.stack[that.stack.length - 1];
    };

    this.sax.ontext = function(data) {
        that.current.appendChild(Text({
            parentNode: that.current,
            nodeValue: data
        }));
    };

    this.sax.ondoctype = function(data) {
        that.current.appendChild(Doctype({
            parentNode: that.current,
            nodeValue: data.trim()
        }));
    };

    this.sax.onprocessinginstruction = function(obj) {
        that.current.appendChild(ProcInst({
            parentNode: that.current,
            nodeValue: obj.name + ' ' + obj.body
        }));
    };

    this.sax.oncomment = function(data) {
        that.current.appendChild(Comment({
            parentNode: that.current,
            nodeValue: data
        }));
    };

    this.sax.oncdata = function(data) {
        that.current.appendChild(CDATA({
            parentNode: that.current,
            nodeValue: data
        }));
    };

    this.sax.onerror = function(err) {
        // https://github.com/isaacs/sax-js#events
        // "The error will be hanging out on parser.error,
        // and must be deleted before parsing can continue"
        this.error = null;

        throw new Error(err);
    };

    // write to the stream and start the parsing process
    this.sax.write(data).close();

    return this.document;
};

module.exports = Parser;
