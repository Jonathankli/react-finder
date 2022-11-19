import React from 'react';
import { FinderFolderType } from '../Finder/Finder';
import './styles.css';

export interface FinderFolderProps {
    depth: number
    folder: FinderFolderType
    Item: any;
    selectItem(id: string): void
    deselectItem(): void
    hasChildren(id: string): boolean
}

const FinderFolder = (props: FinderFolderProps) => {

    const {
        folder,
        Item,
        selectItem,
        deselectItem,
        hasChildren,
    } = props;

    const handleItemClick = (id: string) => {
        if(folder.activeItem === id) {
            deselectItem();
            return;
        }
        selectItem(id);
    }

    return ( 
        <div className='finder-folder'>
            <ul>
                {folder.items.map(item => (
                    <li key={item.id}>
                        <Item
                            item={item}
                            hasChildren={hasChildren(item.id)}
                            open={handleItemClick.bind(this, item.id)}
                            active={item.id === folder.activeItem}
                        />
                    </li>
                ))}
            </ul>
        </div>
    );
}
 
export default FinderFolder;