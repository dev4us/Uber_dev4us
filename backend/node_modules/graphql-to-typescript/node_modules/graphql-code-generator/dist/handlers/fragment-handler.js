"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var pascalCase = require("pascal-case");
var typeFromAST_1 = require("graphql/utilities/typeFromAST");
var printer_1 = require("graphql/language/printer");
var inner_models_builer_1 = require("./inner-models-builer");
exports.handleFragment = function (schema, fragmentNode, primitivesMap, flattenInnerTypes) {
    var rawName = fragmentNode.name.value;
    var fragmentName = pascalCase(rawName);
    var root = typeFromAST_1.typeFromAST(schema, fragmentNode.typeCondition);
    var result = {
        name: fragmentName,
        rawName: rawName,
        isQuery: false,
        isSubscription: false,
        isMutation: false,
        isFragment: true,
        innerTypes: [],
        hasInnerTypes: false,
        variables: [],
        hasVariables: false,
        document: printer_1.print(fragmentNode),
        rootType: []
    };
    var appendTo = {
        name: 'Fragment',
        schemaTypeName: rawName,
        fields: [],
        isObject: true,
        isFragment: true,
        fragmentsUsed: [],
        inlineFragments: []
    };
    result.rootType = [appendTo];
    result.innerTypes = [appendTo].concat(inner_models_builer_1.buildInnerModelsArray(schema, root, flattenInnerTypes, fragmentNode.selectionSet, primitivesMap, appendTo));
    result.hasInnerTypes = result.innerTypes.length > 0;
    return result;
};
//# sourceMappingURL=fragment-handler.js.map