import React from 'react'
import {render, fireEvent, waitFor, screen, within, findByTestId, findByText} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import TestComponent from './TestComponent'
import { initTree } from './mock/basic'
import { DROP_ON_ITEM_OPTIONS, FinderDetailProps, FinderItemProps, FolderFactory } from '../types'

describe('Customize', () => {
    
    test('renders custom item component', async () => {

        const Item = (props: FinderItemProps) => {
            return (
                <>Custom item {props.item.name}</>
            )
        }

        render(<TestComponent initTree={initTree} Item={Item}/>)

        await screen.findByText('Custom item Folder');
        await screen.findByText('Custom item Item');

    })
    
    test('renders custom detail component', async () => {

        const ItemDetail = (props: FinderDetailProps) => {
            return (
                <>Custom detail {props.item.name}</>
            )
        }

        render(<TestComponent initTree={initTree} ItemDetail={ItemDetail}/>)

        fireEvent.click(await screen.findByText("Item"))

        await screen.findByText('Custom detail Item');

    })
    
    
    test('activates item on click', async () => {

        const Item = (props: FinderItemProps) => {
            
            return (
                <div onClick={() => props.open()}>Custom {props.item.name} {props.active ? "Aktiv" : ""} </div>
            )
        }

        render(<TestComponent initTree={initTree} Item={Item}/>)

        expect(screen.queryByText("Custom Folder Aktiv")).toBeNull();
        fireEvent.click(await screen.findByText("Custom Folder"))
        await screen.findByText('Custom Folder Aktiv');

    })
    
    test('renders custom title', async () => {

        render(<TestComponent initTree={initTree} title="Custom Title" />)

        await screen.findByText('Custom Title');

    })

})
