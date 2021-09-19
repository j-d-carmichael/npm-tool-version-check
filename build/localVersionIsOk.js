"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const semver_1 = (0, tslib_1.__importDefault)(require("semver"));
exports.default = (localSemVer, remoteSemVer) => {
    return !semver_1.default.lt(localSemVer, remoteSemVer);
};
