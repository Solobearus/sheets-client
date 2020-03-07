import React from 'react'
import { render, fireEvent, waitForElement, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Sheet from './Sheet'

afterEach(cleanup)

describe('Sheet component', () => {
    let props;

    beforeEach(() => {
        props = {
            test: "test"
        }
    });

    it('should render without crashing', () => {
        const { getByTestId } = render(<Sheet {...props}/>);
        const linkElement = getByTestId('Sheet');
        expect(linkElement).toBeInTheDocument();
    });
});