import React from 'react';
import { IconX } from '@tabler/icons';
import { Header, HeaderTitle } from './styles';

interface FinderHeaderProps {
    title?: string 
    onClose?(): void
}

const FinderHeader = (props: FinderHeaderProps) => {

    const {
        title = "Finder",
        onClose
    } = props;

    return ( 
        <Header>
            <HeaderTitle>{title}</HeaderTitle>
            <IconX onClick={onClose}/>
        </Header>
    );
}
 
export default FinderHeader;