import { IconX } from '@tabler/icons';
import React from 'react';
import './styles.css';

interface FinderHeaderProps {
    title?: string 
}

const FinderHeader = (props: FinderHeaderProps) => {

    const {
        title = "Finder"
    } = props;

    return ( 
        <div className='finder-header'>
            <p>{title}</p>
            <IconX />
        </div>
    );
}
 
export default FinderHeader;