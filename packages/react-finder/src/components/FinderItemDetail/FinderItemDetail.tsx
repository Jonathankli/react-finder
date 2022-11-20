import React from "react";
import { IconFile } from "@tabler/icons";
import { FinderItem } from "../../types";
import { Detail, DetailIcon, DetailTitle } from "./styles";

export interface FinderDetailProps {
    item: FinderItem;
}

const FinderDetail = (props: FinderDetailProps) => {
    const { item } = props;

    return (
        <Detail>
            <DetailIcon>
                <IconFile />
            </DetailIcon>
            <DetailTitle>{item.name}</DetailTitle>
        </Detail>
    );
};

export default FinderDetail;
