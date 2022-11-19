import React from "react";
import { useDrop } from "react-dnd";
import { FinderFolderType } from "../Finder/Finder";
import FinderItemDrag from "../FinderItemDrag/FinderItemDrag";
import "./styles.css";

export interface FinderFolderProps {
    depth: number;
    folder: FinderFolderType;
    Item: any;
    selectItem(id: string): void;
    deselectItem(): void;
    hasChildren(id: string): boolean;
    handleDrop(itemId: string, targetId: string): void;
}

const FinderFolder = (props: FinderFolderProps) => {
    const { folder, Item, selectItem, deselectItem, hasChildren, handleDrop } =
        props;

    const [{ isOver }, dropRef] = useDrop(
        () => ({
            accept: "Item",
            drop: (data: { id: string }, monitor) => {
                if (monitor.didDrop()) return;
                handleDrop(data.id, folder.id);
            },
            collect: (monitor) => ({
                isOver: monitor.isOver({ shallow: false }),
            }),
        }),
        [handleDrop]
    );

    const handleItemClick = (id: string) => {
        if (folder.activeItem === id) {
            deselectItem();
            return;
        }
        selectItem(id);
    };

    return (
        <div className="finder-folder" ref={dropRef}>
            <ul>
                {folder.items.map((item) => (
                    <li key={item.id}>
                        <FinderItemDrag
                            itemId={item.id}
                            handleDrop={handleDrop}
                            open={handleItemClick.bind(this, item.id)}
                            hasChildren={hasChildren(item.id)}
                        >
                            <Item
                                item={item}
                                hasChildren={hasChildren(item.id)}
                                open={handleItemClick.bind(this, item.id)}
                                active={item.id === folder.activeItem}
                            />
                        </FinderItemDrag>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default FinderFolder;
