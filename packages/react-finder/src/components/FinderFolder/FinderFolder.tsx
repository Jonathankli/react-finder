import React from "react";
import { useDrop } from "react-dnd";
import {
    FinderFolder,
    FinderItemSettings,
    FolderHeaderComponent,
    ItemComponent,
    SELECT_TYPE,
} from "../../types";
import renderComponent from "../../util/renderComponent";
import FinderItemDrag from "../FinderItemDrag/FinderItemDrag";
import { Folder, FolderList } from "./styles";

export interface FinderFolderProps {
    depth: number;
    folder: FinderFolder;
    Item: ItemComponent;
    selectType: SELECT_TYPE;
    FolderHeader: FolderHeaderComponent;
    selectItem(id: string, type?: SELECT_TYPE): void;
    deselectItem(type?: SELECT_TYPE): void;
    hasChildren(id: string): boolean;
    handleDrop(itemId: string, targetId: string): void;
    defaultItemSettings: any | FinderItemSettings;
}

const FinderFolder = (props: FinderFolderProps) => {
    const {
        folder,
        Item,
        FolderHeader,
        selectType: _selectType,
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

    const toggle = (id: string, selectType: SELECT_TYPE = SELECT_TYPE.CHILDREN) => {
        if(selectType !== _selectType) {
            selectItem(id, selectType);
            return;
        }
        if (folder.activeItem === id) {
            deselectItem(SELECT_TYPE.CHILDREN);
            return;
        }
        selectItem(id, selectType);
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
                                toggle={toggle.bind(this, item.id)}
                                open={selectItem.bind(this, item.id)}
                                close={deselectItem}
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
