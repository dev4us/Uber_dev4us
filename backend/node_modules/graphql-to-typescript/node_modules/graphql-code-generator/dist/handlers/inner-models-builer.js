"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var definition_1 = require("graphql/type/definition");
var kinds_1 = require("graphql/language/kinds");
var utils_1 = require("../utils/utils");
var pascalCase = require("pascal-case");
var camelCase = require("camel-case");
var typeFromAST_1 = require("graphql/utilities/typeFromAST");
exports.buildInnerModelsArray = function (schema, rootObject, flattenInnerTypes, selections, primitivesMap, appendTo, result) {
    if (result === void 0) { result = []; }
    (selections ? selections.selections : []).forEach(function (selectionNode) {
        switch (selectionNode.kind) {
            case kinds_1.FIELD:
                var isAliased = false;
                var fieldName = selectionNode.name.value;
                var propertyName = fieldName;
                if (selectionNode.alias && selectionNode.alias.value) {
                    isAliased = true;
                    propertyName = selectionNode.alias.value;
                }
                var field = utils_1.getFieldDef(rootObject, selectionNode);
                if (!field) {
                    return [];
                }
                var rawType = field.type;
                var actualType = definition_1.getNamedType(rawType);
                if (actualType instanceof definition_1.GraphQLObjectType || actualType instanceof definition_1.GraphQLInterfaceType) {
                    var modelName = utils_1.handleNameDuplications(pascalCase(fieldName), result);
                    if (!appendTo) {
                        // Means we are on the root object, and we need to create the root interface result
                        appendTo = {
                            isRoot: true,
                            name: fieldName,
                            fields: [],
                            fragmentsUsed: [],
                            inlineFragments: [],
                            innerTypes: []
                        };
                        result.push(appendTo);
                    }
                    appendTo.fields.push({
                        name: propertyName,
                        schemaFieldName: fieldName,
                        type: isAliased ? pascalCase(propertyName) + '_' + modelName : modelName,
                        isAliased: isAliased,
                        isArray: utils_1.isArray(rawType),
                        isRequired: utils_1.isRequired(rawType)
                    });
                    var model = {
                        name: isAliased ? pascalCase(propertyName) + '_' + modelName : modelName,
                        fields: [],
                        fragmentsUsed: [],
                        inlineFragments: [],
                        schemaTypeName: String(actualType)
                    };
                    var resultArr_1 = result;
                    if (!flattenInnerTypes) {
                        appendTo.innerTypes = resultArr_1 = appendTo.innerTypes || [];
                        resultArr_1.push(model);
                    }
                    else {
                        result.push(model);
                    }
                    exports.buildInnerModelsArray(schema, actualType, flattenInnerTypes, selectionNode.selectionSet, primitivesMap, model, resultArr_1);
                }
                else {
                    appendTo.fields.push({
                        name: propertyName,
                        isAliased: isAliased,
                        schemaFieldName: fieldName,
                        type: utils_1.getTypeName(primitivesMap, actualType),
                        isArray: utils_1.isArray(rawType),
                        isRequired: utils_1.isRequired(rawType)
                    });
                }
                break;
            case kinds_1.FRAGMENT_SPREAD:
                var fragmentName = selectionNode.name.value;
                appendTo.fragmentsUsed.push({
                    fieldName: camelCase(fragmentName),
                    typeName: pascalCase(fragmentName)
                });
                appendTo.usingFragments = appendTo.fragmentsUsed.length > 0;
                break;
            case kinds_1.INLINE_FRAGMENT:
                var root = typeFromAST_1.typeFromAST(schema, selectionNode.typeCondition);
                var schemaTypeName = selectionNode.typeCondition.name.value;
                var name_1 = schemaTypeName + 'InlineFragment';
                var fragmentModel = {
                    name: name_1,
                    fields: [],
                    fragmentsUsed: [],
                    inlineFragments: [],
                    isInlineFragment: true,
                    schemaTypeName: schemaTypeName
                };
                appendTo.inlineFragments.push({
                    typeName: schemaTypeName,
                    onModel: selectionNode.typeCondition.name.value,
                });
                appendTo.hasInlineFragments = appendTo.inlineFragments.length > 0;
                var resultArr = result;
                if (!flattenInnerTypes) {
                    appendTo.innerTypes = resultArr = appendTo.innerTypes || [];
                    resultArr.push(fragmentModel);
                }
                else {
                    result.push(fragmentModel);
                }
                exports.buildInnerModelsArray(schema, root, flattenInnerTypes, selectionNode.selectionSet, primitivesMap, fragmentModel, resultArr);
                break;
            default:
                break;
        }
    });
    return result;
};
//# sourceMappingURL=inner-models-builer.js.map