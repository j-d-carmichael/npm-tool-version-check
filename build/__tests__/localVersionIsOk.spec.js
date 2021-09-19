"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const localVersionIsOk_1 = (0, tslib_1.__importDefault)(require("../localVersionIsOk"));
it('should pass', function () {
    expect((0, localVersionIsOk_1.default)('1.0.0', '1.0.0')).toBe(true);
});
