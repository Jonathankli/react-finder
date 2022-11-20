import React from "react";
import { IconEye, IconFile, IconFolder } from "@tabler/icons";
import { FinderItem as FinderItemType } from "../../types";
import "./styles.css";
import { SELECT_TYPE } from "../../hooks/useFolders";

export interface FinderItemProps {
    item: FinderItemType;
    hasChildren: boolean;
    open(type?: SELECT_TYPE): void;
    active?: boolean;
}

const FinderItem = (props: FinderItemProps) => {
    const { item, hasChildren, open, active = false } = props;

    const actions =
        hasChildren && item.data?.hasDetails ? (
            <div className="finder-item-actions">
                <IconEye onClick={open.bind(this, SELECT_TYPE.DETAILS)} />
            </div>
        ) : null;
    const icon = hasChildren ? <IconFolder /> : <IconFile />;

    return (
        <div
            className={`finder-item ${active ? "isActive" : ""}`}
            onClick={() => (hasChildren ? open() : open(SELECT_TYPE.DETAILS))}
        >
            <div className="finder-item-icon">{icon}</div>
            <p className="finder-item-title">{item.name}</p>
            {actions}
        </div>
    );
};

export default FinderItem;
