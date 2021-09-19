"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const https_1 = (0, tslib_1.__importDefault)(require("https"));
const isHttpsUrl_1 = (0, tslib_1.__importDefault)(require("./isHttpsUrl"));
const child_process_1 = require("child_process");
/**
 * @param jsonUrlOrNPMPackageName - eg: 'https://raw.githubusercontent.com/johndcarmichael/npm-tool-version-check/master/package.json'
 */
exports.default = (jsonUrlOrNPMPackageName) => {
    return new Promise((resolve, reject) => {
        if (!(0, isHttpsUrl_1.default)(jsonUrlOrNPMPackageName)) {
            console.log('Checking version from npm api');
            (0, child_process_1.exec)('npm show ' + jsonUrlOrNPMPackageName + ' time --json', function (err, out) {
                try {
                    return resolve(Object.keys(JSON.parse(out)).pop());
                }
                catch (e) {
                    console.error(e);
                    reject(e);
                }
            });
        }
        else {
            const url = jsonUrlOrNPMPackageName + '?' + new Date().getTime();
            console.log('Checking version with npm-tool-version-check from URL: ' + url);
            https_1.default.get(url, (res) => {
                let a = '';
                res.on('data', (d) => {
                    a += d.toString();
                });
                res.on('close', () => {
                    resolve((JSON.parse(a)).version);
                });
            }).on('error', (e) => {
                return reject(e);
            });
        }
    });
};
