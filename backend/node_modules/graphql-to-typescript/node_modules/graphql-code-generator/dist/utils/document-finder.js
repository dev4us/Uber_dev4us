"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractDocumentStringFromCodeFile = function (fileContent) {
    var matches = fileContent.match(/gql`([\s\S\n\r.]*?)`/gm);
    if (matches === null) {
        matches = fileContent.match(/(['"](query|subscription|fragment|mutation) .*?['"])/gm);
    }
    return (matches || []).map(function (item) { return item.replace(/\$\{.*?\}/g, '').replace(/(gql|`)/g, ''); }).join();
};
//# sourceMappingURL=document-finder.js.map