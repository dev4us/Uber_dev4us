"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
exports.introspectionFromFile = function (file) {
    return new Promise(function (resolve, reject) {
        if (fs.existsSync(file)) {
            try {
                var fileContent = fs.readFileSync(file, 'utf8');
                if (!fileContent) {
                    reject("Unable to read local introspection file: " + file);
                }
                var introspection = JSON.parse(fileContent);
                if (introspection.data) {
                    introspection = introspection.data;
                }
                resolve(introspection);
            }
            catch (e) {
                reject(e);
            }
        }
        else {
            reject("Unable to locate local introspection file: " + file);
        }
    });
};
//# sourceMappingURL=introspection-from-file.js.map