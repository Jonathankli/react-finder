/// <reference types="react" />
import "./styles.css";
import { FinderItem } from "../../types";
export interface FinderDetailProps {
    item: FinderItem;
}
declare const FinderDetail: (props: FinderDetailProps) => JSX.Element;
export default FinderDetail;
