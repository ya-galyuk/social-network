import {render, screen} from '@testing-library/react';
import AppContainer from "./AppContainer";

test('renders learn react link', () => {
    render(<AppContainer/>);
    const linkElement = screen.getByText(/users/i);
    expect(linkElement).toBeInTheDocument();
});
