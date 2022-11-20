import React, { useCallback, useMemo, useState } from "react";
import { v4 } from "uuid";
import { DROP_ON_ITEM_OPTIONS, FinderFolder, FinderItem } from "../types";

export enum SELECT_TYPE {
    DETAILS,
    CHILDREN,
}

export type FolderFactory = (item: FinderItem, targetItem: FinderItem) => FinderItem;

const defaultFolderFactory: FolderFactory = (item, targetItem) => ({
    id: v4(),
    name: "Neuer Ordner",
    parent: targetItem.parent
})

const useFolder = (
    tree: FinderItem[],
    setTree: React.Dispatch<React.SetStateAction<FinderItem[]>>,
    contentRef: React.MutableRefObject<HTMLInputElement>,
    dropOnFile: DROP_ON_ITEM_OPTIONS,
    folderFactory: FolderFactory = defaultFolderFactory
) => {
    const [activeItems, setActiveItems] = useState<string[]>([]);
    const [detailView, setDetailView] = useState<SELECT_TYPE>(
        SELECT_TYPE.CHILDREN
    );

    const hasChildren = useCallback(
        (id: string): boolean => {
            return tree.some((item) => item.parent === id);
        },
        [tree]
    );

    const folders: FinderFolder[] = useMemo(() => {
        const folder: FinderFolder[] = activeItems.map((item, depth) => ({
            id: item,
            items: tree.filter((child) => child.parent === item),
            activeItem:
                activeItems.length > depth ? activeItems[depth + 1] : null,
        }));
        folder.unshift({
            id: "root",
            items: tree.filter((item) => !item.parent),
            activeItem: activeItems.length > 0 ? activeItems[0] : null,
        });
        if (
            !folder[folder.length - 1].items.length ||
            detailView === SELECT_TYPE.DETAILS
        ) {
            folder.pop();
        }
        return folder;
    }, [tree, activeItems, detailView]);

    const detailItem: FinderItem | null = useMemo(() => {
        const id = activeItems.at(-1);
        if (id && (!hasChildren(id) || detailView === SELECT_TYPE.DETAILS)) {
            const item = tree.find((item) => item.id === id);
            if (!item) return null;
            setTimeout(() => {
                contentRef.current.scrollTo({
                    top: 0,
                    left:
                        contentRef.current.scrollWidth -
                        contentRef.current.offsetWidth,
                    behavior: "smooth",
                });
            }, 10);
            return item;
        }
        return null;
    }, [tree, activeItems, detailView, contentRef, hasChildren]);

    const selectItem = (
        depth: number,
        id: string,
        type: SELECT_TYPE = SELECT_TYPE.CHILDREN
    ) => {
        const item = tree.find((item) => item.id === id);
        if (!item) {
            throw new Error("Item with id '" + id + "' not found.");
        }
        if (detailView !== type) {
            setDetailView(type);
        }
        setActiveItems((prev) => {
            if (prev.length < depth) {
                throw new Error("Parent is not selected!");
            }
            if (prev.length === depth) {
                return [...prev, id];
            }
            return [...prev.slice(0, depth), id];
        });
    };

    const deselectItem = (
        depth: number,
        type: SELECT_TYPE = SELECT_TYPE.CHILDREN
    ) => {
        if (detailView !== type) {
            setDetailView(type);
        }
        setActiveItems((prev) => {
            if (prev.length < depth) {
                throw new Error("Parent is not selected!");
            }

            return prev.slice(0, depth);
        });
    };

    const getParents = (itemId: string, first = true): FinderItem[] => {
        if(itemId === "root") {
            return [];
        }
        const item = tree.find(item => item.id === itemId);
        if(!item) {
            throw new Error("Item not found!");
        }
        if(item.parent && first) {
            return getParents(item.parent, false);
        }
        if(!item.parent) {
            return [item];
        }
        return [
            item,
            ...getParents(item.parent, false)
        ]
    }

    const handleDrop = (itemId: string, targetId: string) => {
        const parents = getParents(targetId);

        if(parents.find(parent => parent.id === itemId) || itemId === targetId) {
            console.error("Can not net item in it self!");
            return;
        }
        
        setTree(prev => {
            const itemIndex = prev.findIndex(item => item.id === itemId);
            if(itemIndex === -1) {
                throw new Error("Item not found!");
            }
            
            if(targetId === "root") {
                const copy = prev.slice();
                copy[itemIndex].parent = null;
                return copy;
            }

            const parentIndex = prev.findIndex(item => item.id === targetId);
            if(parentIndex === -1) {
                throw new Error("Target not found!");
            }
            const isFolder = hasChildren(targetId);
            const _dropOnFile = prev[parentIndex].dropOnFile ? prev[parentIndex].dropOnFile : dropOnFile;

            if(isFolder || _dropOnFile === DROP_ON_ITEM_OPTIONS.DIRECT_CHILD) {
                const copy = prev.slice();
                copy[itemIndex].parent = targetId;
                return copy;
            }

            if(_dropOnFile === DROP_ON_ITEM_OPTIONS.FORBID) {
                return prev;
            }
            if(_dropOnFile === DROP_ON_ITEM_OPTIONS.CREATE_FOLDER) {
                const _parent = folderFactory(prev[itemIndex], prev[parentIndex]);
                const copy = prev.slice();
                copy.push(_parent);
                copy[itemIndex].parent = _parent.id;
                copy[parentIndex].parent = _parent.id;
                return copy;
            }

            return prev;

        });

        if(activeItems.includes(itemId)) {
            const parentDepth = activeItems.indexOf(itemId)-1;
            const parentId = activeItems[parentDepth];
            selectItem(parentDepth, parentId);
        }
    }    

    return {
        activeItems,
        folders,
        detailItem,
        selectItem,
        deselectItem,
        hasChildren,
        handleDrop,
    };
};

export default useFolder;