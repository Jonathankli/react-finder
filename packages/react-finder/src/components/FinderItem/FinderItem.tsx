import React, { useMemo } from "react";
import { IconEye, IconFile, IconFolder } from "@tabler/icons";
import { FinderItemProps, FinderItemSettings, SELECT_TYPE } from "../../types";
import { Item, ItemAction, ItemActions, ItemIcon, ItemTitle } from "./styles";

const FinderItem = (props: FinderItemProps) => {
    const { item, hasChildren, open, active = false, defaultItemSettings } = props;

    const actions = useItemActions(item.data, defaultItemSettings ?? {}, open);

    const icon = hasChildren || item.isFolder ? <IconFolder /> : <IconFile />;

    return (
        <Item
            active={active}
            onClick={() => (hasChildren ? open() : open(SELECT_TYPE.DETAILS))}
        >
            <ItemIcon>{icon}</ItemIcon>
            <ItemTitle>{item.name}</ItemTitle>
            <ItemActions>
                {actions.map((action) => (
                    <ItemAction
                        onClick={(e) => action.onClick(item, "item", e)}
                        title={action.name}
                    >
                        <action.Icon />
                    </ItemAction>
                ))}
            </ItemActions>
        </Item>
    );
};

export const useItemActions = (
    itemSetting: FinderItemSettings,
    defaultItemSettings: FinderItemSettings,
    open: (type?: SELECT_TYPE) => void
) =>
    useMemo(() => {
        const actions = itemSetting?.actions ?? [];
        const mergeDefaultActions =
            itemSetting?.mergeDefaultActions === undefined
                ? true //default
                : itemSetting.mergeDefaultActions;

        const defaultUseOpenAction =
            defaultItemSettings?.useOpenAction === undefined
                ? true //default
                : defaultItemSettings.useOpenAction;

        const useOpenAction =
            itemSetting?.useOpenAction === undefined
                ? defaultUseOpenAction //default
                : itemSetting.useOpenAction;

        if(useOpenAction && itemSetting?.hasDetails ) {
            actions.push({
                name: "Open",
                Icon: IconEye,
                onClick: (item, context, event) => {
                    open(SELECT_TYPE.DETAILS)
                }
            })
        }

        if (mergeDefaultActions) {
            actions.push(...(defaultItemSettings?.actions ?? []));
        }
        return actions;
    }, [defaultItemSettings, itemSetting]);

export default FinderItem;
