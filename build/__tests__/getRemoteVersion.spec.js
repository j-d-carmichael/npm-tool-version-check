"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const getRemoteVersion_1 = (0, tslib_1.__importDefault)(require("../getRemoteVersion"));
const semver_1 = (0, tslib_1.__importDefault)(require("semver"));
it('should return a semver for a url', async () => {
    const out = await (0, getRemoteVersion_1.default)('https://raw.githubusercontent.com/johndcarmichael/npm-tool-version-check/master/package.json');
    expect(typeof out).toBe('string');
    expect(semver_1.default.valid(out)).not.toBe(null);
});
it('should return a semver for an npm package name', async () => {
    const out = await (0, getRemoteVersion_1.default)('npm-tool-version-check');
    expect(typeof out).toBe('string');
    expect(semver_1.default.valid(out)).not.toBe(null);
});
