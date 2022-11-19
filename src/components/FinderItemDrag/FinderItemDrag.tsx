import React from "react";
import "./styles.css";
import { useDrag } from "react-dnd";

export interface FinderItemDragProps {
    itemId: string;
    children: any
}

const FinderItemDrag = (props: FinderItemDragProps) => {
    const { itemId } = props;

    const [{isDragging}, dragRef] = useDrag(() => ({
        type: "Item",
        item: {id: itemId},
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        })
    }))

    return (
        <div className={`finder-item-drag`} ref={dragRef}>
            {props.children}
        </div>
    );
};

export default FinderItemDrag;
