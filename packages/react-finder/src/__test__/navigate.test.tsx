import React from 'react'
import {render, fireEvent, waitFor, screen} from '@testing-library/react'
import '@testing-library/jest-dom'
import TestComponent from './TestComponent'
import { initTree } from './mock/basic'

describe('Navigate', () => {
    
    test('opens first level', async () => {

        render(<TestComponent initTree={initTree} />)
    
    })
})
