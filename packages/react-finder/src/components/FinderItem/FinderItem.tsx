import React, { useMemo } from "react";
import { IconEye, IconFile, IconFolder } from "@tabler/icons";
import {
    FinderItem,
    FinderItemProps,
    ItemAction as ItemActionType,
    SELECT_TYPE,
} from "../../types";
import { Item, ItemAction, ItemActions, ItemIcon, ItemTitle } from "./styles";

const FinderItem = (props: FinderItemProps) => {
    const {
        item,
        hasChildren,
        toggle,
        active = false,
    } = props;

    const actions = useItemActions(props);
    const Icon = useItemIcon(props);

    return (
        <Item
            active={active}
            onClick={() => hasChildren ? toggle() : toggle(SELECT_TYPE.DETAILS)}
        >
            <ItemIcon>
                <Icon />
            </ItemIcon>
            <ItemTitle>{item.name}</ItemTitle>
            <ItemActions>
                {actions.map((action, i) => (
                    <ItemAction
                        key={i}
                        onClick={(e) => {
                            e.stopPropagation();
                            action.onClick(item, "item", e)
                        }}
                        title={action.name}
                    >
                        <action.Icon />
                    </ItemAction>
                ))}
            </ItemActions>
        </Item>
    );
};

export const useItemIcon = (props: FinderItemProps) =>
    useMemo(() => {
        const defaultFolderIcon =
            props.defaultItemSettings?.FolderIcon === undefined
                ? IconFolder
                : props.defaultItemSettings.FolderIcon;
        const defaultItemIcon =
            props.defaultItemSettings?.ItemIcon === undefined
                ? IconFile
                : props.defaultItemSettings.ItemIcon;
        const folderIcon =
            props.item.data?.FolderIcon === undefined
                ? defaultFolderIcon
                : props.item.data.FolderIcon;
        const itemIcon =
            props.item.data?.ItemIcon === undefined
                ? defaultItemIcon
                : props.item.data.ItemIcon;
        return props.hasChildren || props.item.isFolder ? folderIcon : itemIcon;
    }, [props.defaultItemSettings, props.item, props.hasChildren]);

export const useItemActions = (props: FinderItemProps) =>
    useMemo<ItemActionType[]>(() => {
        const actions = props.item.data?.actions ?? [];
        const mergeDefaultActions =
            props.item.data?.mergeDefaultActions === undefined
                ? true //default
                : props.item.data.mergeDefaultActions;

        const defaultUseOpenAction =
            props.defaultItemSettings?.useOpenAction === undefined
                ? true //default
                : props.defaultItemSettings.useOpenAction;

        const useOpenAction =
            props.item.data?.useOpenAction === undefined
                ? defaultUseOpenAction //default
                : props.item.data.useOpenAction;

        if (useOpenAction && props.item.data?.hasDetails) {
            actions.push({
                name: "Open",
                Icon: IconEye,
                onClick: () => {
                    props.toggle(SELECT_TYPE.DETAILS);
                },
            });
        }

        if (mergeDefaultActions) {
            actions.push(...(props.defaultItemSettings?.actions ?? []));
        }
        return actions;
    }, [props.defaultItemSettings, props.item.data, props.toggle]);

export default FinderItem;
