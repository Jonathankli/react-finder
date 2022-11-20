import React from 'react';
import { IconX } from '@tabler/icons';
import { Header, HeaderTitle } from './styles';

interface FinderHeaderProps {
    title?: string 
}

const FinderHeader = (props: FinderHeaderProps) => {

    const {
        title = "Finder"
    } = props;

    return ( 
        <Header>
            <HeaderTitle>{title}</HeaderTitle>
            <IconX />
        </Header>
    );
}
 
export default FinderHeader;