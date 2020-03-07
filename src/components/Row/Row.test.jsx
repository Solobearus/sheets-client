import React from 'react'
import { render, fireEvent, waitForElement, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Row from './Row'

afterEach(cleanup)

describe('Row component', () => {
    let props;

    beforeEach(() => {
        props = {
            test: "test"
        }
    });

    it('should render without crashing', () => {
        const { getByTestId } = render(<Row {...props}/>);
        const linkElement = getByTestId('Row');
        expect(linkElement).toBeInTheDocument();
    });
});