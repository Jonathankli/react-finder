import React, { useMemo, useState } from "react";
import { v4 } from "uuid";
import { FinderFolderType, FinderItem } from "../components/Finder/Finder";

export enum SELECT_TYPE {
    DETAILS,
    CHILDREN,
}

const useFolder = (tree: FinderItem[], contentRef: React.MutableRefObject<HTMLInputElement>) => {
    const [activeItems, setActiveItems] = useState<string[]>([]);
    const [detailView, setDetailView] = useState<SELECT_TYPE>(SELECT_TYPE.CHILDREN);

    const hasChildren = (id: string): boolean => {
        return tree.some((item) => item.parent == id);
    };

    const folders: FinderFolderType[] = useMemo(() => {
        const folder: FinderFolderType[] = activeItems.map((item, depth) => ({
            id: v4(),
            items: tree.filter((child) => child.parent === item),
            activeItem:
                activeItems.length > depth ? activeItems[depth + 1] : null,
        }));
        folder.unshift({
            id: v4(),
            items: tree.filter((item) => !item.parent),
            activeItem: activeItems.length > 0 ? activeItems[0] : null,
        });
        if (!folder[folder.length - 1].items.length || detailView === SELECT_TYPE.DETAILS) {
            folder.pop();
        }
        return folder;
    }, [tree, activeItems, detailView ]);

    const detailItem: FinderItem | null = useMemo(() => {
        const id = activeItems.at(-1);
        if(id && (!hasChildren(id) || detailView === SELECT_TYPE.DETAILS)) {
            const item = tree.find(item => item.id === id);
            if(!item) return null;
            contentRef.current.scrollTo({top: 0, left: contentRef.current.scrollWidth - contentRef.current.offsetWidth, behavior: "smooth"});
            return item;
        }
        return null;
    }, [tree, activeItems]);

    const selectItem = (
        depth: number,
        id: string,
        type: SELECT_TYPE = SELECT_TYPE.CHILDREN
    ) => {
        const item = tree.find((item) => item.id === id);
        if (!item) {
            throw new Error("Item with id '" + id + "' not found.");
        }
        if(detailView !== type) {
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

    console.log(detailItem, activeItems);
    

    const deselectItem = (depth: number, type: SELECT_TYPE = SELECT_TYPE.CHILDREN) => {
        if(detailView !== type) {
            setDetailView(type);
        }
        setActiveItems((prev) => {
            if (prev.length < depth) {
                throw new Error("Parent is not selected!");
            }

            return prev.slice(0, depth);
        });
    };

    return {
        activeItems,
        folders,
        detailItem,
        selectItem,
        deselectItem,
        hasChildren,
    };
};

export default useFolder;
