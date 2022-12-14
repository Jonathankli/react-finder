import { IconEye, IconPencil } from "@tabler/icons";
import React from "react";
import { useDrop } from "react-dnd";
import {
    FinderFolder,
    FinderItemSettings,
    FolderHeaderComponent,
    ItemComponent,
} from "../../types";
import renderComponent from "../../util/renderComponent";
import FinderFolderHeader from "../FinderFolderHeader/FinderFolderHeader";
import FinderItemDrag from "../FinderItemDrag/FinderItemDrag";
import { Folder, FolderList } from "./styles";

export interface FinderFolderProps {
    depth: number;
    folder: FinderFolder;
    Item: ItemComponent;
    FolderHeader: FolderHeaderComponent;
    selectItem(id: string): void;
    deselectItem(): void;
    hasChildren(id: string): boolean;
    handleDrop(itemId: string, targetId: string): void;
    defaultItemSettings: any | FinderItemSettings;
}

const FinderFolder = (props: FinderFolderProps) => {
    const {
        folder,
        Item,
        FolderHeader,
        selectItem,
        deselectItem,
        hasChildren,
        handleDrop,
        defaultItemSettings,
    } = props;

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
        <Folder ref={dropRef} data-testid={folder.id}>
            {renderComponent(FolderHeader, { folder, defaultItemSettings })}
            <FolderList>
                {folder.items.map((item) => {
                    const Component = item.Component ? item.Component : Item;
                    return (
                        <li key={item.id}>
                            <FinderItemDrag
                                item={item}
                                handleDrop={handleDrop}
                                open={handleItemClick.bind(this, item.id)}
                                hasChildren={hasChildren(item.id)}
                                component={Component}
                                active={item.id === folder.activeItem}
                                defaultItemSettings={defaultItemSettings}
                            />
                        </li>
                    );
                })}
            </FolderList>
        </Folder>
    );
};

export default FinderFolder;
