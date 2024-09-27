import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Latest News title', () => {
    render(<App />);
    const titleElement = screen.getByText(/Latest News/i);
    expect(titleElement).toBeInTheDocument();
});
