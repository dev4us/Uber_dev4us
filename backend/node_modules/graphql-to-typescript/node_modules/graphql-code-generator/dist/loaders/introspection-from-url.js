"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var introspectionQuery_1 = require("graphql/utilities/introspectionQuery");
var request = require("request");
exports.introspectionFromUrl = function (url, headers) {
    var splittedHeaders = headers.map(function (header) {
        var _a = header.split(/\s*:\s*/), name = _a[0], value = _a[1];
        return _b = {},
            _b[name] = value,
            _b;
        var _b;
    });
    var extraHeaders = {};
    if (splittedHeaders.length > 0) {
        extraHeaders = splittedHeaders.reduce(function (a, b) {
            return Object.assign({}, a, b);
        });
    }
    return new Promise(function (resolve, reject) {
        request.post({
            url: url,
            json: {
                query: introspectionQuery_1.introspectionQuery.replace('locations', '')
            },
            headers: Object.assign({
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }, extraHeaders)
        }, function (err, response, body) {
            if (err) {
                reject(err);
                return;
            }
            var bodyJson = body.data;
            if (!bodyJson || (body.errors && body.errors.length > 0)) {
                reject('Unable to download schema from remote: ' + body.errors.map(function (item) { return item.message; }).join(', '));
                return;
            }
            resolve(bodyJson);
        });
    });
};
//# sourceMappingURL=introspection-from-url.js.map