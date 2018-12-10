#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var cli_1 = require("./cli");
var transform_engine_1 = require("../engine/transform-engine");
var fs = require("fs");
var options = cli_1.initCLI(process.argv);
cli_1.validateCliOptions(options);
cli_1.transformOptions(options)
    .then(transform_engine_1.Transform)
    .then(function (generationResult) {
    generationResult.forEach(function (file) {
        if (file.isDev) {
            console.log("================== " + file.path + " ==================");
            console.log(file.content);
        }
        else {
            fs.writeFileSync(file.path, file.content);
            console.log("Generated file written to " + file.path);
        }
    });
})
    .catch(cli_1.cliError);
//# sourceMappingURL=gql-gen.js.map