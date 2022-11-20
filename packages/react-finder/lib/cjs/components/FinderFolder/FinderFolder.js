"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var react_dnd_1 = require("react-dnd");
var FinderItemDrag_1 = __importDefault(require("../FinderItemDrag/FinderItemDrag"));
require("./styles.css");
var FinderFolder = function (props) {
    var folder = props.folder, Item = props.Item, selectItem = props.selectItem, deselectItem = props.deselectItem, hasChildren = props.hasChildren, handleDrop = props.handleDrop;
    var _a = (0, react_dnd_1.useDrop)(function () { return ({
        accept: "Item",
        drop: function (data, monitor) {
            if (monitor.didDrop())
                return;
            handleDrop(data.id, folder.id);
        },
        collect: function (monitor) { return ({
            isOver: monitor.isOver({ shallow: false }),
        }); },
    }); }, [handleDrop]), isOver = _a[0].isOver, dropRef = _a[1];
    var handleItemClick = function (id) {
        if (folder.activeItem === id) {
            deselectItem();
            return;
        }
        selectItem(id);
    };
    return (react_1.default.createElement("div", { className: "finder-folder", ref: dropRef },
        react_1.default.createElement("ul", null, folder.items.map(function (item) {
            var Component = item.Component ? item.Component : Item;
            return (react_1.default.createElement("li", { key: item.id },
                react_1.default.createElement(FinderItemDrag_1.default, { itemId: item.id, handleDrop: handleDrop, open: handleItemClick.bind(_this, item.id), hasChildren: hasChildren(item.id) },
                    react_1.default.createElement(Component, { item: item, hasChildren: hasChildren(item.id), open: handleItemClick.bind(_this, item.id), active: item.id === folder.activeItem }))));
        }))));
};
exports.default = FinderFolder;
