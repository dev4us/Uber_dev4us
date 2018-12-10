"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var transform_engine_1 = require("./engine/transform-engine");
exports.Transform = transform_engine_1.Transform;
var template_loader_1 = require("./loaders/template-loader");
exports.getTemplateGenerator = template_loader_1.getTemplateGenerator;
var documents_glob_1 = require("./utils/documents-glob");
exports.documentsFromGlobs = documents_glob_1.documentsFromGlobs;
var introspection_from_url_1 = require("./loaders/introspection-from-url");
exports.introspectionFromUrl = introspection_from_url_1.introspectionFromUrl;
var introspection_from_file_1 = require("./loaders/introspection-from-file");
exports.introspectionFromFile = introspection_from_file_1.introspectionFromFile;
//# sourceMappingURL=index.js.map