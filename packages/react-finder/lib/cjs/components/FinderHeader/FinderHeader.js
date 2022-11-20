"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var icons_1 = require("@tabler/icons");
require("./styles.css");
var FinderHeader = function (props) {
    var _a = props.title, title = _a === void 0 ? "Finder" : _a;
    return (react_1.default.createElement("div", { className: 'finder-header' },
        react_1.default.createElement("p", null, title),
        react_1.default.createElement(icons_1.IconX, null)));
};
exports.default = FinderHeader;
