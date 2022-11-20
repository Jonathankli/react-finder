"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var react_dnd_1 = require("react-dnd");
var useFolders_1 = __importDefault(require("../../hooks/useFolders"));
var FinderFolder_1 = __importDefault(require("../FinderFolder/FinderFolder"));
var FinderHeader_1 = __importDefault(require("../FinderHeader/FinderHeader"));
var FinderItem_1 = __importDefault(require("../FinderItem/FinderItem"));
var FinderItemDetail_1 = __importDefault(require("../FinderItemDetail/FinderItemDetail"));
var react_dnd_html5_backend_1 = require("react-dnd-html5-backend");
require("./styles.css");
var types_1 = require("../../types");
var Finder = function (props) {
    var tree = props.tree, setTree = props.setTree, _a = props.dropOnFile, dropOnFile = _a === void 0 ? types_1.DROP_ON_ITEM_OPTIONS.CREATE_FOLDER : _a, _b = props.Item, Item = _b === void 0 ? FinderItem_1.default : _b, _c = props.ItemDetail, ItemDetail = _c === void 0 ? FinderItemDetail_1.default : _c;
    var contentRef = (0, react_1.useRef)();
    var _d = (0, useFolders_1.default)(tree, setTree, contentRef, dropOnFile), folders = _d.folders, detailItem = _d.detailItem, selectItem = _d.selectItem, deselectItem = _d.deselectItem, hasChildren = _d.hasChildren, handleDrop = _d.handleDrop;
    return (react_1.default.createElement(react_dnd_1.DndProvider, { backend: react_dnd_html5_backend_1.HTML5Backend },
        react_1.default.createElement("div", { className: "finder" },
            react_1.default.createElement(FinderHeader_1.default, null),
            react_1.default.createElement("div", { className: "finder-content", ref: contentRef },
                react_1.default.createElement("div", { className: "finder-folders" }, folders.map(function (folder, depth) { return (react_1.default.createElement(FinderFolder_1.default, { key: folder.id, depth: depth, folder: folder, selectItem: selectItem.bind(_this, depth), deselectItem: deselectItem.bind(_this, depth), hasChildren: hasChildren, handleDrop: handleDrop, Item: Item })); })),
                react_1.default.createElement("div", { className: "finder-detail" }, detailItem && react_1.default.createElement(ItemDetail, { item: ItemDetail }))))));
};
exports.default = Finder;
