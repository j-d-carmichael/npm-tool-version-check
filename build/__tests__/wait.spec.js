"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const wait_1 = (0, tslib_1.__importDefault)(require("../wait"));
it('should resolve after 1 second', async () => {
    const start = new Date();
    await (0, wait_1.default)(1000);
    expect((new Date()).getTime() - start.getTime()).toBeGreaterThanOrEqual(1000);
});
