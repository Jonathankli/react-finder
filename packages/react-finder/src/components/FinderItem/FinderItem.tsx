import React from "react";
import { IconEye, IconFile, IconFolder } from "@tabler/icons";
import { FinderItem as FinderItemType } from "../../types";
import { SELECT_TYPE } from "../../hooks/useFolders";
import { Item, ItemIcon, ItemTitle } from "./styles";

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
        <Item
            active={active}
            onClick={() => (hasChildren ? open() : open(SELECT_TYPE.DETAILS))}
        >
            <ItemIcon>{icon}</ItemIcon>
            <ItemTitle>{item.name}</ItemTitle>
            {actions}
        </Item>
    );
};

export default FinderItem;
