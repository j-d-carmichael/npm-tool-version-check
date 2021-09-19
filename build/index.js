"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
require("colors");
const inquirer_1 = (0, tslib_1.__importDefault)(require("inquirer"));
const wait_1 = (0, tslib_1.__importDefault)(require("./wait"));
const localVersionIsOk_1 = (0, tslib_1.__importDefault)(require("./localVersionIsOk"));
const getRemoteVersion_1 = (0, tslib_1.__importDefault)(require("./getRemoteVersion"));
exports.default = (thisVersion, jsonUrl, packageName) => {
    return new Promise(async (resolve, reject) => {
        let remoteVersion;
        try {
            remoteVersion = await (0, getRemoteVersion_1.default)(thisVersion, jsonUrl);
        }
        catch (e) {
            console.log('Could not check the remote version: ' + e.message);
            console.log(' ');
            return resolve();
        }
        if ((0, localVersionIsOk_1.default)(thisVersion, remoteVersion)) {
            const smiley = '    (ꙨပꙨ)   '.green.bold;
            console.log(smiley + 'This local version looks fresh and shiny, nice!'.green);
            return resolve();
        }
        const error = `WARNING: The version of ${packageName} you are running, ` + thisVersion.bold + ', is' + ' OUTDATED!'.bold;
        console.log(error.red);
        console.log('THERE IS A BETTER VERSION: '.red + remoteVersion.green.bold);
        if (process.env.npm_tool_version_check__quiet) {
            console.log('npm_tool_version_check__quiet is set: bypassing user interaction'.red.bold);
            return resolve();
        }
        const questions = [{
                type: 'confirm',
                name: 'installConfirm',
                message: 'Are you sure you want to continue with an outdated package? This will result in some serious technical dept in the future and prevent security updates arriving...'.red,
                default: false,
            }];
        const answers = await inquirer_1.default.prompt(questions);
        if (answers.installConfirm) {
            const smiley = '   :-| 😬😬   '.red.bold;
            console.log(smiley + 'Ok.. Continuing with the outdated version...'.red);
            await (0, wait_1.default)(1000);
            console.log(smiley + 'Best of luck...'.red);
            await (0, wait_1.default)(1000);
            resolve();
        }
        else {
            const smiley = '    (^‿^)    '.green.bold;
            console.log(smiley + 'Great choice! Update the package and be happy.'.green);
            reject();
        }
    });
};
