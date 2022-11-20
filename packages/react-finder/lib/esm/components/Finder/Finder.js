var _this = this;
import React, { useRef } from "react";
import { DndProvider } from "react-dnd";
import useFolder from "../../hooks/useFolders";
import FinderFolder from "../FinderFolder/FinderFolder";
import FinderHeader from "../FinderHeader/FinderHeader";
import { default as FinderItemDefault } from "../FinderItem/FinderItem";
import FinderDetail from "../FinderItemDetail/FinderItemDetail";
import { HTML5Backend } from "react-dnd-html5-backend";
import "./styles.css";
import { DROP_ON_ITEM_OPTIONS } from "../../types";
var Finder = function (props) {
    var tree = props.tree, setTree = props.setTree, _a = props.dropOnFile, dropOnFile = _a === void 0 ? DROP_ON_ITEM_OPTIONS.CREATE_FOLDER : _a, _b = props.Item, Item = _b === void 0 ? FinderItemDefault : _b, _c = props.ItemDetail, ItemDetail = _c === void 0 ? FinderDetail : _c;
    var contentRef = useRef();
    var _d = useFolder(tree, setTree, contentRef, dropOnFile), folders = _d.folders, detailItem = _d.detailItem, selectItem = _d.selectItem, deselectItem = _d.deselectItem, hasChildren = _d.hasChildren, handleDrop = _d.handleDrop;
    return (React.createElement(DndProvider, { backend: HTML5Backend },
        React.createElement("div", { className: "finder" },
            React.createElement(FinderHeader, null),
            React.createElement("div", { className: "finder-content", ref: contentRef },
                React.createElement("div", { className: "finder-folders" }, folders.map(function (folder, depth) { return (React.createElement(FinderFolder, { key: folder.id, depth: depth, folder: folder, selectItem: selectItem.bind(_this, depth), deselectItem: deselectItem.bind(_this, depth), hasChildren: hasChildren, handleDrop: handleDrop, Item: Item })); })),
                React.createElement("div", { className: "finder-detail" }, detailItem && React.createElement(ItemDetail, { item: ItemDetail }))))));
};
export default Finder;
