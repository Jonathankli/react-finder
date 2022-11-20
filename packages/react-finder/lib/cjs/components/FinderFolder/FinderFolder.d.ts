/// <reference types="react" />
import { FinderFolder } from "../../types";
import "./styles.css";
export interface FinderFolderProps {
    depth: number;
    folder: FinderFolder;
    Item: any;
    selectItem(id: string): void;
    deselectItem(): void;
    hasChildren(id: string): boolean;
    handleDrop(itemId: string, targetId: string): void;
}
declare const FinderFolder: (props: FinderFolderProps) => JSX.Element;
export default FinderFolder;
