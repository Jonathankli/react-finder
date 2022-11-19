import React, { useCallback, useMemo, useState } from "react";
import { v4 } from "uuid";
import { FinderFolderType, FinderItem } from "../components/Finder/Finder";

export enum SELECT_TYPE {
    DETAILS,
    CHILDREN,
}

const useFolder = (
    tree: FinderItem[],
    setTree: React.Dispatch<React.SetStateAction<FinderItem[]>>,
    contentRef: React.MutableRefObject<HTMLInputElement>
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

    const folders: FinderFolderType[] = useMemo(() => {
        const folder: FinderFolderType[] = activeItems.map((item, depth) => ({
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
        console.log(itemId, targetId, parents);
        
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

            if(!prev.find(item => item.id === targetId)) {
                throw new Error("Target not found!");
            }

            const copy = prev.slice();
            copy[itemIndex].parent = targetId;
            return copy;
        })
console.log(activeItems, itemId);

        if(activeItems.includes(itemId)) {
            const parentDepth = activeItems.indexOf(itemId)-1;
            const parentId = activeItems[parentDepth];
            console.log(parentDepth, parentId);
            
            selectItem(parentDepth, parentId);
        }
    }
console.log(activeItems);
    

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
