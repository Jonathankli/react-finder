"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var icons_1 = require("@tabler/icons");
require("./styles.css");
var FinderDetail = function (props) {
    var item = props.item;
    return (react_1.default.createElement("div", { className: "finderdetail" },
        react_1.default.createElement("div", { className: "finderdetail-icon" },
            react_1.default.createElement(icons_1.IconFile, null)),
        react_1.default.createElement("p", { className: "finderdetail-title" }, item.name)));
};
exports.default = FinderDetail;
