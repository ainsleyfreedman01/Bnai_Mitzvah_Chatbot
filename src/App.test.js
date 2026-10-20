import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';

test('finds a prayer and studies it through multiple-choice answers inside the chat', () => {
    render(<App />);
    expect(screen.getByRole('heading', { name: "b'nAI Mitzvah" })).toBeInTheDocument();
    fireEvent.change(screen.getByLabelText('Your message'), { target: { value: '  SH’MA  ' } });
    fireEvent.click(screen.getByRole('button', { name: 'Send', exact: true }));
    expect(screen.getByText(/Adonai Echad/)).toBeInTheDocument();
    expect(screen.getByText(/There are 5 multiple-choice questions/)).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Start questions' }));
    fireEvent.click(screen.getByRole('button', { name: 'Blessing bread before eating' }));
    expect(screen.getByText(/Let's look again/)).toBeInTheDocument();
    expect(screen.getByText(/Why:/)).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Try this question again' }));
    fireEvent.click(screen.getByRole('button', { name: 'Listening and declaring that God is one' }));
    expect(screen.getByText(/That's the idea!/)).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Next question' }));
    expect(screen.getByText(/Question 2 of 5/)).toBeInTheDocument();
});
