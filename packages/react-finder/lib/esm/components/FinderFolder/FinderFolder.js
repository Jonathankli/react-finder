var _this = this;
import React from "react";
import { useDrop } from "react-dnd";
import FinderItemDrag from "../FinderItemDrag/FinderItemDrag";
import "./styles.css";
var FinderFolder = function (props) {
    var folder = props.folder, Item = props.Item, selectItem = props.selectItem, deselectItem = props.deselectItem, hasChildren = props.hasChildren, handleDrop = props.handleDrop;
    var _a = useDrop(function () { return ({
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
    return (React.createElement("div", { className: "finder-folder", ref: dropRef },
        React.createElement("ul", null, folder.items.map(function (item) {
            var Component = item.Component ? item.Component : Item;
            return (React.createElement("li", { key: item.id },
                React.createElement(FinderItemDrag, { itemId: item.id, handleDrop: handleDrop, open: handleItemClick.bind(_this, item.id), hasChildren: hasChildren(item.id) },
                    React.createElement(Component, { item: item, hasChildren: hasChildren(item.id), open: handleItemClick.bind(_this, item.id), active: item.id === folder.activeItem }))));
        }))));
};
export default FinderFolder;
