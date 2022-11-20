import React from "react";
import { IconEye, IconFile, IconFolder } from "@tabler/icons";
import { FinderItemProps, SELECT_TYPE } from "../../types";
import { Item, ItemIcon, ItemTitle } from "./styles";

const FinderItem = (props: FinderItemProps) => {
    const { item, hasChildren, open, active = false } = props;

    const actions =
        hasChildren && item.data?.hasDetails ? (
            <div className="finder-item-actions">
                <IconEye onClick={open.bind(this, SELECT_TYPE.DETAILS)} />
            </div>
        ) : null;
    const icon = hasChildren || item.isFolder ? <IconFolder /> : <IconFile />;

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
