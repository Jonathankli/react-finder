import React from "react";
import { IconFile } from "@tabler/icons";
import { FinderDetailProps, FinderItem } from "../../types";
import { Detail, DetailIcon, DetailTitle } from "./styles";

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
