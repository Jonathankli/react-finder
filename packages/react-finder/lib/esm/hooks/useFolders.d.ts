import React from "react";
import { DROP_ON_ITEM_OPTIONS, FinderFolder, FinderItem } from "../types";
export declare enum SELECT_TYPE {
    DETAILS = 0,
    CHILDREN = 1
}
export type FolderFactory = (item: FinderItem, targetItem: FinderItem) => FinderItem;
declare const useFolder: (tree: FinderItem[], setTree: React.Dispatch<React.SetStateAction<FinderItem[]>>, contentRef: React.MutableRefObject<HTMLInputElement>, dropOnFile: DROP_ON_ITEM_OPTIONS, folderFactory?: FolderFactory) => {
    activeItems: string[];
    folders: FinderFolder[];
    detailItem: FinderItem | null;
    selectItem: (depth: number, id: string, type?: SELECT_TYPE) => void;
    deselectItem: (depth: number, type?: SELECT_TYPE) => void;
    hasChildren: (id: string) => boolean;
    handleDrop: (itemId: string, targetId: string) => void;
};
export default useFolder;
