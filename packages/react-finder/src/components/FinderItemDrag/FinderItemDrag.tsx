import React, { useEffect, useRef } from "react";
import "./styles.ts";
import { ConnectableElement, useDrag, useDrop } from "react-dnd";
import { ItemDrag } from "./styles";

export interface FinderItemDragProps {
    itemId: string;
    children: any;
    hasChildren: boolean;
    open(): void
    handleDrop(itemId: string, targetId: string): void;
}

const FinderItemDrag = (props: FinderItemDragProps) => {
    const { itemId, handleDrop, hasChildren, open } = props;

    const refTimer = useRef<NodeJS.Timer | null>(null);

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
            isOver: monitor.isOver(),
        })
    }), [handleDrop])

    useEffect(() => {
        if(refTimer.current || (refTimer.current && !isOver)) {
            clearTimeout(refTimer.current);
        }
        if(!hasChildren || !isOver) {
            return;
        }
        
        refTimer.current = setTimeout(() => {         
            open();
        }, 1000)
    }, [isOver])

    const attachRef = (el: ConnectableElement) => {
        dropRef(el)
        dragRef(el)
    }

    return (
        <ItemDrag isOver={isOver} ref={attachRef}>
            {props.children}
        </ItemDrag>
    );
};

export default FinderItemDrag;
