import React, { useEffect, useRef } from "react";
import "./styles.css";
import { useDrag, useDrop } from "react-dnd";
var FinderItemDrag = function (props) {
    var itemId = props.itemId, handleDrop = props.handleDrop, hasChildren = props.hasChildren, open = props.open;
    var refTimer = useRef(null);
    var _a = useDrag(function () { return ({
        type: "Item",
        item: { id: itemId },
        collect: function (monitor) { return ({
            isDragging: monitor.isDragging(),
        }); }
    }); }), isDragging = _a[0].isDragging, dragRef = _a[1];
    var _b = useDrop(function () { return ({
        accept: "Item",
        drop: function (data, monitor) {
            handleDrop(data.id, itemId);
        },
        collect: function (monitor) { return ({
            isOver: monitor.isOver(),
        }); }
    }); }, [handleDrop]), isOver = _b[0].isOver, dropRef = _b[1];
    useEffect(function () {
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
    return (React.createElement("div", { className: "finder-item-drag ".concat(isOver ? "isOver" : ""), ref: attachRef }, props.children));
};
export default FinderItemDrag;
