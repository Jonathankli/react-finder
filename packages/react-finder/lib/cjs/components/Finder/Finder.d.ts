import React from "react";
import "./styles.css";
import { DROP_ON_ITEM_OPTIONS, FinderItem } from "../../types";
interface FinderProps {
    tree: FinderItem[];
    setTree: React.Dispatch<React.SetStateAction<FinderItem[]>>;
    dropOnFile?: DROP_ON_ITEM_OPTIONS;
    Item?: any;
    ItemDetail?: any;
}
declare const Finder: (props: FinderProps) => JSX.Element;
export default Finder;
