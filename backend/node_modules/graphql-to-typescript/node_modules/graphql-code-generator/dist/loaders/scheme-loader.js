"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var graphql_1 = require("graphql");
exports.validateSchema = function (schema) {
    if (!schema.__schema) {
        throw new Error('Invalid schema provided!');
    }
};
exports.loadSchema = function (schemaObject) {
    exports.validateSchema(schemaObject);
    return graphql_1.buildClientSchema(schemaObject);
};
//# sourceMappingURL=scheme-loader.js.map