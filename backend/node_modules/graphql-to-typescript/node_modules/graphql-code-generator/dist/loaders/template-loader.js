"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var handlebars = require("handlebars");
var fs = require("fs");
var templates_1 = require("../engine/templates");
exports.loadFromPath = function (filePath) {
    if (fs.existsSync(filePath)) {
        return fs.readFileSync(filePath, 'utf8');
    }
    else {
        throw new Error("Template file " + filePath + " does not exists!");
    }
};
var getGeneratorTemplate = function (templateName) {
    return templates_1.getGenerators().find(function (item) { return (item.aliases || []).indexOf(templateName.toLowerCase()) > -1; });
};
exports.getTemplateGenerator = function (template) {
    return new Promise(function (resolve, reject) {
        var generatorTemplate = getGeneratorTemplate(template);
        if (generatorTemplate) {
            resolve(generatorTemplate);
        }
        else {
            var allowedTemplates = templates_1.getGenerators().map(function (item) { return item.aliases; }).reduce(function (a, b) { return a.concat(b); }).join(', ');
            reject("Unknown template language specified: " + template + ", available are: " + allowedTemplates);
        }
    });
};
exports.compileTemplate = function (compileContext, templatePath) {
    return handlebars.compile(exports.loadFromPath(templatePath))(compileContext);
};
//# sourceMappingURL=template-loader.js.map