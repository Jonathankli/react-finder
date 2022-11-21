import React from 'react'
import {render, fireEvent, waitFor, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import TestComponent from './TestComponent'
import { initTree } from './mock/basic'

describe('Navigate', () => {
    
    test('opens first level', async () => {

        render(<TestComponent initTree={initTree} />)

        await screen.findByText('Folder');
        await screen.findByText('Item');
    
        expect(screen.queryByText('Nested folder')).toBeNull();
        expect(screen.queryByText('Nested item')).toBeNull();
    })

    test('opens folders', async () => {

        render(<TestComponent initTree={initTree} />)

        const folder = await screen.findByText('Folder');
        userEvent.click(folder)

        expect(screen.queryByText('Nested folder')).not.toBeNull();
        expect(screen.queryByText('Nested item')).not.toBeNull();

        userEvent.click(await screen.findByText('Nested folder'));
        expect(screen.queryByText('Double nested item')).not.toBeNull();

    })

    test('opens files', async () => {

        render(<TestComponent initTree={initTree} />)

        const item = await screen.findByText('Item');
        userEvent.click(item)

        expect((await screen.findAllByText('Item')).length).toBe(2);
    })

    test('close singel folder', async () => {

        render(<TestComponent initTree={initTree} />)

        userEvent.click(await screen.findByText('Folder'))
        expect(screen.queryByText('Nested item')).not.toBeNull();

        userEvent.click(await screen.findByText('Folder'))
        expect(screen.queryByText('Nested item')).toBeNull();
    })

    test('close multiple folder', async () => {

        render(<TestComponent initTree={initTree} />)

        userEvent.click(await screen.findByText('Folder'))
        userEvent.click(await screen.findByText('Nested folder'))

        expect(screen.queryByText('Nested item')).not.toBeNull();
        expect(screen.queryByText('Double nested item')).not.toBeNull();

        userEvent.click(await screen.findByText('Folder'))
        expect(screen.queryByText('Nested item')).toBeNull();
        expect(screen.queryByText('Double nested item')).toBeNull();
    })


    test('close files', async () => {

        render(<TestComponent initTree={initTree} />)

        const item = await screen.findByText('Item');
        userEvent.click(item);
        expect((await screen.findAllByText('Item')).length).toBe(2);

        userEvent.click(item);
        expect((await screen.findAllByText('Item')).length).toBe(1);
    })
})
