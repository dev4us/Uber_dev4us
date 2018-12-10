"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var definition_1 = require("graphql/type/definition");
var definition_2 = require("graphql/type/definition");
var pascalCase = require("pascal-case");
exports.isPrimitive = function (primitivesMap, type) {
    return Object.keys(primitivesMap).map(function (key) { return primitivesMap[key]; }).find(function (item) { return item === type; });
};
exports.shouldSkip = function (typeName) {
    return !typeName || typeName.indexOf('__') > -1;
};
exports.isRequired = function (type) {
    return (String(type)).indexOf('!') > -1;
};
exports.isArray = function (type) {
    return (String(type)).indexOf('[') > -1;
};
exports.getTypeName = function (primitivesMap, type) {
    var name = (String(type)).replace(/[\[\]!]/g, '');
    if (primitivesMap[name]) {
        return primitivesMap[name];
    }
    else {
        return name;
    }
};
function getFieldDef(parentType, fieldAST) {
    var name = fieldAST.name.value;
    if (parentType instanceof definition_2.GraphQLObjectType ||
        parentType instanceof definition_1.GraphQLInterfaceType) {
        return parentType.getFields()[name];
    }
}
exports.getFieldDef = getFieldDef;
exports.handleNameDuplications = function (name, existing) {
    if (existing.find(function (model) { return model.name === name; })) {
        return exports.handleNameDuplications('_' + name, existing);
    }
    return name;
};
exports.getRoot = function (schema, operation) {
    switch (operation.operation) {
        case 'query':
            return schema.getQueryType();
        case 'mutation':
            return schema.getMutationType();
        case 'subscription':
            return schema.getSubscriptionType();
        default:
            return;
    }
};
exports.buildName = function (typesMap, name, type) {
    return pascalCase(name) + typesMap[type];
};
//# sourceMappingURL=utils.js.map