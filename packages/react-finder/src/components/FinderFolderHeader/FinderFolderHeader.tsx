import React from "react";
import { IconEye, IconPencil } from "@tabler/icons";
import { FinderFolderHeaderProps } from "../../types";
import { FolderHeader, FolderActions, FolderAction} from "./styles";

const FinderFolderHeader = (props: FinderFolderHeaderProps) => {
    const { folder } = props;

    return (
        <FolderHeader>
            <p>{folder.name}</p>
            <FolderActions>
            </FolderActions>
        </FolderHeader>
    );
};

export default FinderFolderHeader;
