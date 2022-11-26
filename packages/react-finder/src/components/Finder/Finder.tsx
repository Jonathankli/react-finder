import React, { useRef } from "react";
import { DndProvider } from "react-dnd";
import useFolder from "../../hooks/useFolders";
import FinderFolder from "../FinderFolder/FinderFolder";
import FinderHeader from "../FinderHeader/FinderHeader";
import { default as FinderItemDefault } from "../FinderItem/FinderItem";
import FinderItemDetail from "../FinderItemDetail/FinderItemDetail";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DETERMINE_CHILDREN_MODE, DROP_ON_ITEM_OPTIONS, FinderItem, FinderProps } from "../../types";
import {
    Finder as StyledFinder,
    FinderContent,
    FinderDetailContainer,
    FinderFolderContainer,
} from "./styles";
import renderComponent from "../../util/renderComponent";

const Finder = (props: FinderProps) => {
    const {
        tree,
        title,
        setTree,
        dropOnFile = DROP_ON_ITEM_OPTIONS.DIRECT_CHILD,
        determineChildren = DETERMINE_CHILDREN_MODE.ONLY_MISSING,
        Item = FinderItemDefault,
        ItemDetail = FinderItemDetail,
        folderFactory,
        onClose
    } = props;

    const contentRef = useRef() as React.MutableRefObject<HTMLInputElement>;
    const {
        folders,
        detailItem,
        selectItem,
        deselectItem,
        hasChildren,
        handleDrop,
    } = useFolder({ tree, setTree, contentRef, dropOnFile, folderFactory, determineChildren });

    return (
        <DndProvider backend={HTML5Backend}>
            <StyledFinder>
                <FinderHeader title={title} onClose={onClose}/>
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
                        {detailItem && renderComponent(ItemDetail, {item: detailItem})}
                    </FinderDetailContainer>
                </FinderContent>
            </StyledFinder>
        </DndProvider>
    );
};

export default Finder;
