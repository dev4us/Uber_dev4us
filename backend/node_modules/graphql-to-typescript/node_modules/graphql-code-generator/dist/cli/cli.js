"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var commander = require("commander");
var introspection_from_url_1 = require("../loaders/introspection-from-url");
var introspection_from_file_1 = require("../loaders/introspection-from-file");
var documents_glob_1 = require("../utils/documents-glob");
var template_loader_1 = require("../loaders/template-loader");
var introspection_from_export_1 = require("../loaders/introspection-from-export");
function collect(val, memo) {
    memo.push(val);
    return memo;
}
exports.initCLI = function (args) {
    commander
        .version(require('../../package.json').version)
        .usage('graphql-codegen [options]')
        .option('-d, --dev', 'Turn on development mode - prints results to console')
        .option('-f, --file <filePath>', 'Parse local GraphQL introspection JSON file')
        .option('-u, --url <graphql-endpoint>', 'Parse remote GraphQL endpoint as introspection file')
        .option('-u, --export <export-file>', 'Path to a JavaScript (es5/6) file that exports (as default export) your `GraphQLSchema` object')
        .option('-h, --header [header]', 'Header to add to the introspection HTTP request when using --url', collect, [])
        .option('-t, --template <template-name>', 'Language/platform name templates')
        .option('-m, --no-schema', 'Generates only client side documents, without server side schema types')
        .option('-c, --no-documents', 'Generates only server side schema types, without client side documents')
        .option('-o, --out <path>', 'Output file(s) path', String, './')
        .arguments('<options> [documents...]')
        .parse(args);
    return commander;
};
exports.cliError = function (err) {
    if (typeof err === 'object') {
        console.log(err);
    }
    console.error('Error: ' + err);
    process.exit(1);
    return;
};
exports.validateCliOptions = function (options) {
    var file = options['file'];
    var url = options['url'];
    var fsExport = options['export'];
    var template = options['template'];
    var out = options['out'];
    if (!file && !url && !fsExport) {
        exports.cliError('Please specify one of --file, --url or --export flags!');
    }
    if (!template) {
        exports.cliError('Please specify language/platform, using --template flag');
    }
};
exports.transformOptions = function (options) {
    var file = options['file'];
    var url = options['url'];
    var fsExport = options['export'];
    var documents = options['args'] || [];
    var template = options['template'];
    var out = options['out'];
    var headers = options['header'] || [];
    var isDev = options['dev'] !== undefined;
    var noSchema = !options['schema'];
    var noDocuments = !options['documents'];
    var result = {};
    var introspectionPromise;
    if (isDev) {
        console.log('Development mode is ON - output will print to console');
    }
    if (file) {
        introspectionPromise = introspection_from_file_1.introspectionFromFile(file);
    }
    else if (url) {
        introspectionPromise = introspection_from_url_1.introspectionFromUrl(url, headers);
    }
    else if (fsExport) {
        introspectionPromise = introspection_from_export_1.introspectionFromExport(fsExport);
    }
    var documentsPromise = documents_glob_1.documentsFromGlobs(documents);
    var generatorTemplatePromise = template_loader_1.getTemplateGenerator(template);
    return Promise.all([
        introspectionPromise,
        documentsPromise,
        generatorTemplatePromise
    ]).then(function (_a) {
        var introspection = _a[0], documents = _a[1], generatorTemplate = _a[2];
        result.introspection = introspection;
        result.documents = documents;
        result.template = generatorTemplate;
        result.outPath = out;
        result.isDev = isDev;
        result.noSchema = noSchema;
        result.noDocuments = noDocuments;
        return result;
    });
};
//# sourceMappingURL=cli.js.map