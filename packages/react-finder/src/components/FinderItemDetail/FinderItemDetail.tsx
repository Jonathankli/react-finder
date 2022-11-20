import React from "react";
import { IconFile } from "@tabler/icons";
import "./styles.css";
import { FinderItem } from "../../types";

export interface FinderDetailProps {
    item: FinderItem;
}

const FinderDetail = (props: FinderDetailProps) => {
    const { item } = props;

    return (
        <div className={`finderdetail`}>
            <div className="finderdetail-icon">
                <IconFile />
            </div>
            <p className="finderdetail-title">{item.name}</p>
        </div>
    );
};

export default FinderDetail;
