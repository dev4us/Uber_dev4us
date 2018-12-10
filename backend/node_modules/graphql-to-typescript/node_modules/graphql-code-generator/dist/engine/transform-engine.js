"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var scheme_loader_1 = require("../loaders/scheme-loader");
var codegen_1 = require("./codegen");
var document_loader_1 = require("../loaders/document-loader");
var template_loader_1 = require("../loaders/template-loader");
var path = require("path");
var mkdirp = require("mkdirp");
var handlebars_helpers_1 = require("../utils/handlebars-helpers");
function Transform(transformedOptions) {
    var templateConfig = transformedOptions.template.config;
    handlebars_helpers_1.initHelpers();
    handlebars_helpers_1.initPartials((templateConfig.partials || []).map(function (partialPath) {
        return {
            content: template_loader_1.loadFromPath(path.resolve(__dirname, transformedOptions.template.config.basePath, partialPath)),
            name: path.basename(partialPath, path.extname(partialPath))
        };
    }));
    handlebars_helpers_1.initTemplateHelpers((templateConfig.helpers || []).map(function (helperPath) {
        return {
            func: require(path.resolve(__dirname, transformedOptions.template.config.basePath, helperPath)),
            name: path.basename(helperPath, path.extname(helperPath))
        };
    }));
    var schema = scheme_loader_1.loadSchema(transformedOptions.introspection);
    var documents = transformedOptions.documents;
    var codegen = codegen_1.prepareCodegen(schema, document_loader_1.loadDocumentsSources(documents), transformedOptions.template.config.primitives, {
        flattenInnerTypes: templateConfig.flattenInnerTypes,
        noSchema: transformedOptions.noSchema,
        noDocuments: transformedOptions.noDocuments
    });
    var strategy = templateConfig.strategy || 'SINGLE_FILE';
    var baseOutPath = path.basename(transformedOptions.outPath);
    if (strategy === 'SINGLE_FILE') {
        if (baseOutPath.indexOf('.') === -1) {
            throw "Generator '" + transformedOptions.template.language + "' uses single-file strategy! Please specify a filename using --out flag!";
        }
        var templatePath = path.resolve(__dirname, transformedOptions.template.config.basePath, transformedOptions.template.config.template);
        var outPath = path.resolve(transformedOptions.outPath);
        var outDir = path.dirname(outPath);
        mkdirp.sync(outDir);
        return [{
                isDev: transformedOptions.isDev,
                content: template_loader_1.compileTemplate(codegen, templatePath),
                path: outPath
            }];
    }
    else if (strategy === 'MULTIPLE_FILES') {
        if (baseOutPath.indexOf('.') > -1) {
            throw "Generator '" + transformedOptions.template.language + "' uses multiple-files strategy! Please specify a directory using --out flag!";
        }
        var resultsArr_1 = [];
        var filesExtension_1 = transformedOptions.template.config.filesExtension;
        var templates_1 = transformedOptions.template.config.templates;
        var outPath = path.resolve(transformedOptions.outPath);
        mkdirp.sync(outPath);
        Object.keys(templates_1).forEach(function (templateName) {
            var templatePath = path.resolve(__dirname, transformedOptions.template.config.basePath, templates_1[templateName]);
            if (templateName === 'model') {
                codegen.models.forEach(function (model) {
                    resultsArr_1.push({
                        isDev: transformedOptions.isDev,
                        content: template_loader_1.compileTemplate(model, templatePath),
                        path: path.resolve(transformedOptions.outPath, model.name + '.model.' + filesExtension_1)
                    });
                });
            }
            if (templateName === 'document') {
                codegen.documents.forEach(function (document) {
                    resultsArr_1.push({
                        isDev: transformedOptions.isDev,
                        content: template_loader_1.compileTemplate(document, templatePath),
                        path: path.resolve(transformedOptions.outPath, document.name + '.document.' + filesExtension_1)
                    });
                });
            }
        });
        resultsArr_1 = resultsArr_1.filter(function (item) { return item.content.length > 0; });
        if (templates_1['index']) {
            var directoryPath_1 = path.resolve(transformedOptions.outPath);
            var indexOutPath = path.resolve(directoryPath_1, 'index.' + filesExtension_1);
            var templatePath = path.resolve(transformedOptions.template.config.basePath, templates_1['index']);
            resultsArr_1.push({
                isDev: transformedOptions.isDev,
                content: template_loader_1.compileTemplate({ files: resultsArr_1.map(function (item) {
                        return {
                            fileName: path.basename(item.path, '.' + filesExtension_1),
                            fullPath: item.path,
                            extension: filesExtension_1,
                            directory: directoryPath_1
                        };
                    }) }, templatePath),
                path: indexOutPath
            });
        }
        return resultsArr_1;
    }
    else {
        throw "Unknown strategy (" + strategy + ") specified in template " + transformedOptions.template.language;
    }
}
exports.Transform = Transform;
exports.default = Transform;
//# sourceMappingURL=transform-engine.js.map