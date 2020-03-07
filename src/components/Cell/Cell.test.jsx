import React from 'react'
import { render, fireEvent, waitForElement, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Cell from './Cell'

afterEach(cleanup)

describe('Cell component', () => {
    let props;

    beforeEach(() => {
        props = {
            test: "test"
        }
    });

    it('should render without crashing', () => {
        const { getByTestId } = render(<Cell {...props}/>);
        const linkElement = getByTestId('Cell');
        expect(linkElement).toBeInTheDocument();
    });
});