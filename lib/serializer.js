'use strict';

// default options
var options = {
    doctypeStart: '<!DOCTYPE ',
    doctypeEnd: '>',
    procInstStart: '<?',
    procInstEnd: '?>',
    tagOpenStart: '<',
    tagOpenEnd: '>',
    tagCloseStart: '</',
    tagCloseEnd: '>',
    tagShortStart: '<',
    tagShortEnd: '/>',
    attrValueStart: '="',
    attrValueEnd: '"',
    commentStart: '<!--',
    commentEnd: '-->',
    cdataStart: '<![CDATA[',
    cdataEnd: ']]>',
    textStart: '',
    textEnd: '',
    indent: '    ',
    pretty: false
};

var Serializer = function(opts) {
    // auto-instance
    if (!(this instanceof Serializer)) {
        return new Serializer(opts);
    }

    // clone default options to not touch the original
    this.opts = JSON.parse(JSON.stringify(options));

    // extend options
    if (opts) {
        Object.keys(opts).forEach(function(k) {
            this.opts[k] = opts[k];
        }, this);
    }

    // prettify
    if (this.opts.pretty) {
        this.opts.doctypeEnd += '\n';
        this.opts.procInstEnd += '\n';
        this.opts.commentEnd += '\n';
        this.opts.cdataEnd += '\n';
        this.opts.tagShortEnd += '\n';
        this.opts.tagOpenEnd += '\n';
        this.opts.tagCloseEnd += '\n';
        this.opts.textEnd += '\n';
    }

    // current indentation level
    this.indentLevel = 0;
};

Serializer.prototype.serialize = function(node) {
    var str = '';

    if (node.hasChildNodes()) {
        // deeper
        this.indentLevel++;

        for (var i = 0, l = node.childNodes.length; i < l; i++) {
            var child = node.childNodes[i];

            switch (child.nodeType) {
                case 1:
                    str += this.elem(child);
                    break;
                case 3:
                    str += this.text(child.nodeValue);
                    break;
                case 4:
                    str += this.cdata(child.nodeValue);
                    break;
                case 7:
                    str += this.processingInstruction(child.nodeValue);
                    break;
                case 8:
                    str += this.comment(child.nodeValue);
                    break;
                case 10:
                    str += this.doctype(child.nodeValue);
                    break;
            }
        }

        // outside
        this.indentLevel--;
    }

    return str;
};

// create an indent for the current level
Serializer.prototype.indent = function() {
    var indent = '';

    if (this.opts.pretty) {
        for (var i = 1; i < this.indentLevel; i++) {
            indent += this.opts.indent;
        }
    }

    return indent;
};

Serializer.prototype.doctype = function(doctype) {
    return this.opts.doctypeStart +
           doctype +
           this.opts.doctypeEnd;
};

Serializer.prototype.processingInstruction = function(data) {
    return this.opts.procInstStart +
           data +
           this.opts.procInstEnd;
};

Serializer.prototype.cdata = function(cdata) {
    return this.opts.cdataStart +
           cdata +
           this.opts.cdataEnd;
};

Serializer.prototype.comment = function(comment) {
    return this.opts.commentStart +
           comment +
           this.opts.commentEnd;
};

Serializer.prototype.elem = function(elem) {
    // empty elements become short tags
    if (!elem.hasChildNodes()) {
        return this.indent() +
               this.opts.tagShortStart +
               elem.tagName +
               this.attrs(elem) +
               this.opts.tagShortEnd;
    }

    // elements with childNodes going to recursion
    return this.indent() +
           this.opts.tagOpenStart +
           elem.tagName +
           this.attrs(elem) +
           this.opts.tagOpenEnd +
           this.serialize(elem) +
           this.indent() +
           this.opts.tagCloseStart +
           elem.tagName +
           this.opts.tagCloseEnd;
};

Serializer.prototype.attrs = function(elem) {
    var attrs = '';

    if (elem.hasAttributes()) {
        /*eslint-disable guard-for-in */
        for (var attrName in elem.attributes) {
            var attr = elem.attributes[attrName];

            attrs += ' ' +
                     attrName +
                     this.opts.attrValueStart +
                     attr.value +
                     this.opts.attrValueEnd;
        }
        /*eslint-enable guard-for-in */
    }

    return attrs;
};

Serializer.prototype.text = function(text) {
    return this.indent() +
           this.opts.textStart +
           text +
           this.opts.textEnd;
};

module.exports = Serializer;
