import React, { useEffect, useRef } from "react";
import { ConnectableElement, useDrag, useDrop } from "react-dnd";
import { FinderItem, ItemComponent } from "../../types";
import renderComponent from "../../util/renderComponent";
import { ItemDrag } from "./styles";

export interface FinderItemDragProps {
    item: FinderItem;
    hasChildren: boolean;
    open(): void
    handleDrop(itemId: string, targetId: string): void;
    component: ItemComponent
    active: boolean
}

const FinderItemDrag = (props: FinderItemDragProps) => {
    const { item, handleDrop, hasChildren, open, component, active } = props;

    const refTimer = useRef<NodeJS.Timer | null>(null);

    const [{isDragging}, dragRef] = useDrag(() => ({
        type: "Item",
        item: {id: item.id},
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        })
    }))

    const [{isOver}, dropRef] = useDrop(() => ({
        accept: "Item",
        drop: (data: {id: string}, monitor) => {
            handleDrop(data.id, item.id);
        },
        collect: (monitor) => ({
            isOver: monitor.isOver(),
        })
    }), [handleDrop])

    useEffect(() => {
        if(refTimer.current || (refTimer.current && !isOver)) {
            clearTimeout(refTimer.current);
        }
        if(!(hasChildren || item.isFolder) || !isOver) {
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
            {renderComponent(component, {
                item,
                hasChildren,
                open,
                active,
            })}
        </ItemDrag>
    );
};

export default FinderItemDrag;
