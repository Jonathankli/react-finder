/// <reference types="react" />
import { FinderItem as FinderItemType } from "../../types";
import "./styles.css";
import { SELECT_TYPE } from "../../hooks/useFolders";
export interface FinderItemProps {
    item: FinderItemType;
    hasChildren: boolean;
    open(type?: SELECT_TYPE): void;
    active?: boolean;
}
declare const FinderItem: (props: FinderItemProps) => JSX.Element;
export default FinderItem;
