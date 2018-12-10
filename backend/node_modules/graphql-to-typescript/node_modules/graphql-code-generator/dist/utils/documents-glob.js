"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var glob = require("glob");
exports.documentsFromGlobs = function (documents) {
    return Promise.all(documents.map(function (documentGlob) {
        return new Promise(function (resolve, reject) {
            glob(documentGlob, function (err, files) {
                if (err) {
                    reject(err);
                }
                if (!files || files.length === 0) {
                    reject("Unable to locate files matching glob definition: " + documentGlob);
                }
                resolve(files);
            });
        });
    }))
        .then(function (files) {
        return files.length === 0 ? [] : files.reduce(function (a, b) {
            return a.concat(b);
        });
    });
};
//# sourceMappingURL=documents-glob.js.map