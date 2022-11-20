import React from "react";


export interface FinderProps {
    tree: FinderItem[];
    setTree: React.Dispatch<React.SetStateAction<FinderItem[]>>;
    dropOnFile?: DROP_ON_ITEM_OPTIONS;
    determineChildren?: DETERMINE_CHILDREN_MODE;
    Item?: ItemComponent;
    ItemDetail?: DetailComponent;
}

export interface FinderItemProps {
    item: FinderItem;
    hasChildren: boolean;
    open(type?: SELECT_TYPE): void;
    active?: boolean;
}

export interface FinderDetailProps {
    item: FinderItem;
}

export interface FinderItem {
    id: string;
    parent?: string | null;
    name?: string
    isFolder?: boolean
    hasChildren?: boolean
    Component?: ItemComponent
    dropOnFile?: DROP_ON_ITEM_OPTIONS | DropOnFileCallback; 
    data?: any;
}

export interface FinderFolder {
    id: string;
    items: FinderItem[];
    activeItem: string | null;
}

export type ItemComponent = React.FC | JSX.Element | ((props: FinderItemProps) => JSX.Element)
export type DetailComponent = React.FC | JSX.Element | ((props: FinderDetailProps) => JSX.Element)

export type DropOnFileCallback = (targetItem: FinderItem, dropedItem: FinderItem) => DROP_ON_ITEM_OPTIONS
export type FolderFactory = (item: FinderItem, targetItem: FinderItem) => FinderItem;

export enum DROP_ON_ITEM_OPTIONS {
    CREATE_FOLDER,
    DIRECT_CHILD,
    FORBID,
}

export enum SELECT_TYPE {
    DETAILS,
    CHILDREN,
}

export enum DETERMINE_CHILDREN_MODE {
    NO,
    YES,
    ONLY_MISSING,
}