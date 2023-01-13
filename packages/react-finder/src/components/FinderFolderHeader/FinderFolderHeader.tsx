import React, { useMemo } from "react";
import {
    FinderFolderHeaderProps,
    FinderItemSettings,
    ItemAction,
} from "../../types";
import { FolderHeader, FolderActions, FolderAction } from "./styles";

const FinderFolderHeader = (props: FinderFolderHeaderProps) => {
    const { folder, defaultItemSettings } = props;

    const actions = useFolderActions(
        folder.item?.data ?? {},
        defaultItemSettings ?? {}
    );

    return (
        <FolderHeader>
            <p>{folder.name}</p>
            <FolderActions>
                {actions.map((action) => (
                    <FolderAction
                        onClick={(e) => action.onClick(folder.item, "folder", e)}
                        title={action.name}
                    >
                        <action.Icon />
                    </FolderAction>
                ))}
            </FolderActions>
        </FolderHeader>
    );
};

export const useFolderActions = (
    itemSetting: FinderItemSettings,
    defaultItemSettings: FinderItemSettings
) =>
    useMemo(() => {
        const actions = itemSetting?.folderActions ?? [];
        const useItemActionsInFolder =
            itemSetting?.useItemActionsInFolder === undefined
                ? true //default
                : itemSetting.useItemActionsInFolder;
        const mergeDefaultActions =
            itemSetting?.mergeDefaultActions === undefined
                ? true //default
                : itemSetting.mergeDefaultActions;

        if (useItemActionsInFolder) {
            actions.push(...(itemSetting?.actions ?? []));
        }
        if (mergeDefaultActions) {
            const _useItemActionsInFolder =
                defaultItemSettings?.useItemActionsInFolder === undefined
                    ? true
                    : defaultItemSettings.useItemActionsInFolder;
            if (_useItemActionsInFolder) {
                actions.push(...(defaultItemSettings?.actions ?? []));
            }
            actions.push(...(defaultItemSettings?.folderActions ?? []));
        }
        return actions as ItemAction[];
    }, [defaultItemSettings, itemSetting]);

export default FinderFolderHeader;
