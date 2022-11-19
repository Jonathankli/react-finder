import React from "react";
import "./styles.css";
import { ConnectableElement, useDrag, useDrop } from "react-dnd";

export interface FinderItemDragProps {
    itemId: string;
    children: any;
    handleDrop(itemId: string, targetId: string): void;
}

const FinderItemDrag = (props: FinderItemDragProps) => {
    const { itemId, handleDrop } = props;

    const [{isDragging}, dragRef] = useDrag(() => ({
        type: "Item",
        item: {id: itemId},
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        })
    }))

    const [{isOver}, dropRef] = useDrop(() => ({
        accept: "Item",
        drop: (data: {id: string}, monitor) => {
            handleDrop(data.id, itemId);
        },
        collect: (monitor) => ({
            isOver: monitor.isOver()
        })
    }), [handleDrop])

    const attachRef = (el: ConnectableElement) => {
        dropRef(el)
        dragRef(el)
    }

    return (
        <div className={`finder-item-drag ${isOver ? "isOver" : ""}`} ref={attachRef}>
            {props.children}
        </div>
    );
};

export default FinderItemDrag;
