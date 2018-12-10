"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Handlebars = require("handlebars");
function isFunction(functionToCheck) {
    var getType = {};
    return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
}
exports.initPartials = function (partials) {
    partials.forEach(function (partial) {
        Handlebars.registerPartial(partial.name, partial.content);
    });
};
exports.initTemplateHelpers = function (helpers) {
    helpers.forEach(function (helper) {
        Handlebars.registerHelper(helper.name, helper.func);
    });
};
exports.initHelpers = function () {
    Handlebars.registerHelper('times', function (n, block) {
        var accum = '';
        for (var i = 0; i < n; ++i) {
            accum += block.fn(i);
        }
        return accum;
    });
    Handlebars.registerHelper('for', function (from, to, incr, block) {
        var accum = '';
        for (var i = from; i < to; i += incr) {
            accum += block.fn(i);
        }
        return accum;
    });
    Handlebars.registerHelper('limitedEach', function (context, block) {
        var ret = '';
        var count = parseInt(block.hash.count);
        for (var i = 0, j = count; i < j; i++) {
            ret = ret + block.fn(context[i], {
                data: {
                    last: i === count - 1,
                    first: i === 0,
                    index: 1
                }
            });
        }
        return ret;
    });
};
//# sourceMappingURL=handlebars-helpers.js.map