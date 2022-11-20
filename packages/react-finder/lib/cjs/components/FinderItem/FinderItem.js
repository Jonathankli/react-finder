"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var icons_1 = require("@tabler/icons");
require("./styles.css");
var useFolders_1 = require("../../hooks/useFolders");
var FinderItem = function (props) {
    var _a;
    var item = props.item, hasChildren = props.hasChildren, open = props.open, _b = props.active, active = _b === void 0 ? false : _b;
    var actions = hasChildren && ((_a = item.data) === null || _a === void 0 ? void 0 : _a.hasDetails) ? (react_1.default.createElement("div", { className: "finder-item-actions" },
        react_1.default.createElement(icons_1.IconEye, { onClick: open.bind(_this, useFolders_1.SELECT_TYPE.DETAILS) }))) : null;
    var icon = hasChildren ? react_1.default.createElement(icons_1.IconFolder, null) : react_1.default.createElement(icons_1.IconFile, null);
    return (react_1.default.createElement("div", { className: "finder-item ".concat(active ? "isActive" : ""), onClick: function () { return (hasChildren ? open() : open(useFolders_1.SELECT_TYPE.DETAILS)); } },
        react_1.default.createElement("div", { className: "finder-item-icon" }, icon),
        react_1.default.createElement("p", { className: "finder-item-title" }, item.name),
        actions));
};
exports.default = FinderItem;
