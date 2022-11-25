import React from 'react'
import {render, fireEvent, waitFor, screen, within, findByTestId, findByText} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import TestComponent from './TestComponent'
import { initTree } from './mock/basic'
import { DROP_ON_ITEM_OPTIONS, FolderFactory } from '../types'

describe('Move', () => {
    
    test('opens folder on hover', async () => {

        render(<TestComponent initTree={initTree} />)

        const folder = await screen.findByText('Folder');
        const item = await screen.findByText('Item');

        expect(screen.queryByTestId('folder')).toBeNull();

        fireEvent.dragStart(item);
        fireEvent.dragEnter(folder);
        fireEvent.dragOver(folder);

        await waitFor(() => screen.queryByTestId('folder'), {timeout: 1500})

    })

    test('move item in folder', async () => {

        render(<TestComponent initTree={initTree} />)

        const folder = await screen.findByText('Folder');
        const item = await screen.findByText('Item');
    
        fireEvent.dragStart(item);
        fireEvent.dragEnter(folder);
        fireEvent.dragOver(folder);
        fireEvent.drop(folder);

        expect(screen.queryByText('Item')).toBeNull();

        fireEvent.click(folder);

        await screen.findByText('Item');

    })

    test('move item in folder container', async () => {

        render(<TestComponent initTree={initTree} />)
        
        const folder = await screen.findByText('Folder');
        const item = await screen.findByText('Item');

        fireEvent.click(folder);
        const rootFolderContainer = await screen.findByTestId('root');
        const folderContainer = await screen.findByTestId('folder');
    
        fireEvent.dragStart(item);
        fireEvent.dragEnter(folderContainer);
        fireEvent.dragOver(folderContainer);
        fireEvent.drop(folderContainer);
        
        expect(within(rootFolderContainer).queryByText('Item')).toBeNull();
        within(folderContainer).findByText('Item');

    })

    test('prevent folder contain it self', async () => {

        render(<TestComponent initTree={initTree} />)
        
        const folder = await screen.findByText('Folder');

        fireEvent.click(folder);
        const folderContainer = await screen.findByTestId('folder');
        const rootContainer = await screen.findByTestId('root');
    
        fireEvent.dragStart(folder);
        fireEvent.dragEnter(folderContainer);
        fireEvent.dragOver(folderContainer);
        fireEvent.drop(folderContainer);

        expect(within(folderContainer).queryByText('Folder')).toBeNull();
        await within(rootContainer).findByText('Folder');

    })

    test('add driect child to file', async () => {

        render(<TestComponent initTree={initTree} dropOnFile={DROP_ON_ITEM_OPTIONS.DIRECT_CHILD} />)
        
        const item = await screen.findByText('Item');
        const item2 = await screen.findByText('Item 2');
    
        fireEvent.dragStart(item2);
        fireEvent.dragEnter(item);
        fireEvent.dragOver(item);
        fireEvent.drop(item);

        expect(screen.queryByText('Item 2')).toBeNull();

        fireEvent.click(item);
        const itemFolderContainer = await screen.findByTestId('item');
        await within(itemFolderContainer).findByText('Item 2');

    })

    test('create folder on drop', async () => {

        const folderFactory: FolderFactory = (item, targetItem) => ({
            id: "newFolder",
            name: "New Folder"
        })

        render(<TestComponent initTree={initTree} dropOnFile={DROP_ON_ITEM_OPTIONS.CREATE_FOLDER} folderFactory={folderFactory} />)
        
        const item = await screen.findByText('Item');
        const item2 = await screen.findByText('Item 2');
    
        fireEvent.dragStart(item2);
        fireEvent.dragEnter(item);
        fireEvent.dragOver(item);
        fireEvent.drop(item);

        const newFolder = await screen.findByText("New Folder");

        fireEvent.click(newFolder);
        const newFolderContainer = await screen.findByTestId('newFolder');
        await within(newFolderContainer).findByText('Item 2');
        await within(newFolderContainer).findByText('Item');

    })

    test('restict drop file on file', async () => {

        render(<TestComponent initTree={initTree} dropOnFile={DROP_ON_ITEM_OPTIONS.FORBID} />)
        
        const item = await screen.findByText('Item');
        const item2 = await screen.findByText('Item 2');
    
        fireEvent.dragStart(item2);
        fireEvent.dragEnter(item);
        fireEvent.dragOver(item);
        fireEvent.drop(item);

        const rootFolderContainer = await screen.findByTestId('root');

        await within(rootFolderContainer).findByText('Item 2');
        await within(rootFolderContainer).findByText('Item');

    })

})
