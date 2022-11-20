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
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
require("./styles.css");
var react_dnd_1 = require("react-dnd");
var FinderItemDrag = function (props) {
    var itemId = props.itemId, handleDrop = props.handleDrop, hasChildren = props.hasChildren, open = props.open;
    var refTimer = (0, react_1.useRef)(null);
    var _a = (0, react_dnd_1.useDrag)(function () { return ({
        type: "Item",
        item: { id: itemId },
        collect: function (monitor) { return ({
            isDragging: monitor.isDragging(),
        }); }
    }); }), isDragging = _a[0].isDragging, dragRef = _a[1];
    var _b = (0, react_dnd_1.useDrop)(function () { return ({
        accept: "Item",
        drop: function (data, monitor) {
            handleDrop(data.id, itemId);
        },
        collect: function (monitor) { return ({
            isOver: monitor.isOver(),
        }); }
    }); }, [handleDrop]), isOver = _b[0].isOver, dropRef = _b[1];
    (0, react_1.useEffect)(function () {
        if (refTimer.current || (refTimer.current && !isOver)) {
            clearTimeout(refTimer.current);
        }
        if (!hasChildren || !isOver) {
            return;
        }
        refTimer.current = setTimeout(function () {
            open();
        }, 1000);
    }, [isOver]);
    var attachRef = function (el) {
        dropRef(el);
        dragRef(el);
    };
    return (react_1.default.createElement("div", { className: "finder-item-drag ".concat(isOver ? "isOver" : ""), ref: attachRef }, props.children));
};
exports.default = FinderItemDrag;
