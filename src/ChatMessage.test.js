import { fireEvent, render, screen, within } from '@testing-library/react';
import ChatMessage from './ChatMessage';
import Chatbot from './Chatbot';

test('renders authored headings, emphasis, paragraphs, and numbered steps', () => {
    render(<ChatMessage text={'### Study together\n\n**Key idea:** Listen.\n\n1. Read the prayer.\n2. **Pause** and think.'} />);
    expect(screen.getByRole('heading', { level: 3, name: 'Study together' })).toBeInTheDocument();
    expect(screen.getByText('Key idea:').tagName).toBe('STRONG');
    expect(screen.getAllByRole('listitem')).toHaveLength(2);
    expect(screen.getByText('Pause').tagName).toBe('STRONG');
});

test('does not interpret HTML or links', () => {
    const { container } = render(<ChatMessage text={'<img src=x onerror=alert(1)>\n\n[link](javascript:alert(1))'} />);
    expect(container.querySelector('img, a, script')).toBeNull();
    expect(screen.getByText('<img src=x onerror=alert(1)>')).toBeInTheDocument();
});

test('formats guide responses but leaves student writing literal', () => {
    render(<Chatbot />);
    fireEvent.change(screen.getByLabelText('Your message'), { target: { value: '### **My words** <b>stay literal</b>' } });
    fireEvent.click(screen.getByRole('button', { name: 'Send', exact: true }));
    const userMessage = screen.getByText('### **My words** <b>stay literal</b>').closest('.user-message');
    expect(userMessage.querySelector('h3, strong, b')).toBeNull();
    fireEvent.click(screen.getByRole('button', { name: 'General Prayers', exact: true }));
    fireEvent.click(screen.getByRole('button', { name: "Sh'ma", exact: true }));
    fireEvent.click(screen.getByRole('button', { name: 'Start questions', exact: true }));
    const latest = within(screen.getByRole('log').lastElementChild);
    expect(latest.getByRole('heading', { name: 'Question 1 of 5' })).toBeInTheDocument();
    expect(latest.getByText("Which idea is central to the Sh'ma?").tagName).toBe('STRONG');
});
