/// <reference types="react" />
import "./styles.css";
export interface FinderItemDragProps {
    itemId: string;
    children: any;
    hasChildren: boolean;
    open(): void;
    handleDrop(itemId: string, targetId: string): void;
}
declare const FinderItemDrag: (props: FinderItemDragProps) => JSX.Element;
export default FinderItemDrag;
