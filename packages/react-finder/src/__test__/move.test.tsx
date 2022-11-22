import React from 'react'
import {render, fireEvent, waitFor, screen, within} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import TestComponent from './TestComponent'
import { initTree } from './mock/basic'

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

})
