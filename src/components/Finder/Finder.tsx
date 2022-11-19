import React, { useRef } from "react";
import useFolder from "../../hooks/useFolders";
import FinderFolder from "../FinderFolder/FinderFolder";
import FinderHeader from "../FinderHeader/FinderHeader";
import { default as FinderItemDefault } from "../FinderItem/FinderItem";
import FinderDetail from "../FinderItemDetail/FinderItemDetail";
import "./styles.css";

export interface FinderItem {
    id: string;
    hasDetails?: boolean;
    parent?: string | null;
    name?: string;
    component?: any;
    data?: any;
}

export interface FinderFolderType {
    id: string;
    items: FinderItem[];
    activeItem: string | null;
}
export enum DROP_ON_ITEM_OPTIONS {
    CREATE_FOLDER,
    DIRECT_CHILD,
    FORBID,
}

interface FinderProps {
    tree: FinderItem[];
    dropOnFileAction?: DROP_ON_ITEM_OPTIONS;
    Item?: any;
    ItemDetail?: any;
}

const Finder = (props: FinderProps) => {
    const {
        tree,
        dropOnFileAction = DROP_ON_ITEM_OPTIONS.FORBID,
        Item = FinderItemDefault,
        ItemDetail = FinderDetail,
    } = props;

    const contentRef = useRef() as React.MutableRefObject<HTMLInputElement>;
    const { folders, detailItem, selectItem, deselectItem, hasChildren } =
        useFolder(tree, contentRef);

    return (
        <div className="finder">
            <FinderHeader />
            <div className="finder-content" ref={contentRef}>
                <div className="finder-folders">
                    {folders.map((folder, depth) => (
                        <FinderFolder
                            key={folder.id}
                            depth={depth}
                            folder={folder}
                            selectItem={selectItem.bind(this, depth)}
                            deselectItem={deselectItem.bind(this, depth)}
                            hasChildren={hasChildren}
                            Item={Item}
                        />
                    ))}
                </div>
                <div className="finder-detail">
                    {detailItem && (
                        <ItemDetail item={ItemDetail} />
                    )}
                </div>
            </div>
        </div>
    );
};

export default Finder;
