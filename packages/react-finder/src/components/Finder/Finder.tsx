import React, { useRef } from "react";
import { DndProvider } from "react-dnd";
import useFolder from "../../hooks/useFolders";
import FinderFolder from "../FinderFolder/FinderFolder";
import FinderHeader from "../FinderHeader/FinderHeader";
import { default as FinderItemDefault } from "../FinderItem/FinderItem";
import FinderDetail from "../FinderItemDetail/FinderItemDetail";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DROP_ON_ITEM_OPTIONS, FinderItem } from "../../types";
import { Finder as StyledFinder, FinderContent, FinderDetailContainer, FinderFolderContainer } from "./styles";


interface FinderProps {
    tree: FinderItem[];
    setTree: React.Dispatch<React.SetStateAction<FinderItem[]>>;
    dropOnFile?: DROP_ON_ITEM_OPTIONS;
    Item?: any;
    ItemDetail?: any;
}

const Finder = (props: FinderProps) => {
    const {
        tree,
        setTree,
        dropOnFile = DROP_ON_ITEM_OPTIONS.CREATE_FOLDER,
        Item = FinderItemDefault,
        ItemDetail = FinderDetail,
    } = props;

    const contentRef = useRef() as React.MutableRefObject<HTMLInputElement>;
    const {
        folders,
        detailItem,
        selectItem,
        deselectItem,
        hasChildren,
        handleDrop,
    } = useFolder(tree, setTree, contentRef, dropOnFile);

    return (
        <DndProvider backend={HTML5Backend}>
            <StyledFinder>
                <FinderHeader />
                <FinderContent ref={contentRef}>
                    <FinderFolderContainer>
                        {folders.map((folder, depth) => (
                            <FinderFolder
                                key={folder.id}
                                depth={depth}
                                folder={folder}
                                selectItem={selectItem.bind(this, depth)}
                                deselectItem={deselectItem.bind(this, depth)}
                                hasChildren={hasChildren}
                                handleDrop={handleDrop}
                                Item={Item}
                            />
                        ))}
                    </FinderFolderContainer>
                    <FinderDetailContainer>
                        {detailItem && <ItemDetail item={ItemDetail} />}
                    </FinderDetailContainer>
                </FinderContent>
            </StyledFinder>
        </DndProvider>
    );
};

export default Finder;
