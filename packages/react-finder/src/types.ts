import React from "react";

export interface FinderItemProps {
    item: FinderItem;
    hasChildren: boolean;
    open(type?: SELECT_TYPE): void;
    active?: boolean;
}

export interface FinderItem {
    id: string;
    parent?: string | null;
    name?: string
    Component?: React.FC | JSX.Element | ((props: FinderItemProps) => JSX.Element);
    dropOnFile?: DROP_ON_ITEM_OPTIONS | DropOnFileCallback; 
    data?: any;
}

export interface FinderFolder {
    id: string;
    items: FinderItem[];
    activeItem: string | null;
}

export enum DROP_ON_ITEM_OPTIONS {
    CREATE_FOLDER,
    DIRECT_CHILD,
    FORBID,
}

export enum SELECT_TYPE {
    DETAILS,
    CHILDREN,
}

export type DropOnFileCallback = (targetItem: FinderItem, dropedItem: FinderItem) => DROP_ON_ITEM_OPTIONS
export type FolderFactory = (item: FinderItem, targetItem: FinderItem) => FinderItem;