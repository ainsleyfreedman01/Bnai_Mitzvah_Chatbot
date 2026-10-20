import { fireEvent, render, screen, within } from '@testing-library/react';
import PrayerText from './PrayerText';
import ChatMessage from './ChatMessage';
import Chatbot from './Chatbot';
import { lessons } from './prayerLessons';

test.each(lessons.filter((lesson) => lesson.excerpts || lesson.isTranslation))('$id formats every declared excerpt without changing its text', (lesson) => {
    const excerpts = [...(lesson.excerpts || []), ...(lesson.isTranslation ? [lesson.meaning] : [])];
    excerpts.forEach((text) => {
        const { container, unmount } = render(<PrayerText text={text} />);
        expect(container.textContent).toBe(text);
        expect(container.querySelector('em')).toHaveTextContent(text);
        unmount();
    });
});

test('formats quoted prayer text inside bold prompts but not ordinary quotations or HTML', () => {
    const { container } = render(<ChatMessage text={'**What does "Adonai Echad" express?**\n\nSay "hello" or <b>ask your tutor</b>.'} />);
    expect(container.querySelector('strong em')).toHaveTextContent('Adonai Echad');
    expect(container.querySelectorAll('em')).toHaveLength(1);
    expect(container.querySelector('b')).toBeNull();
    expect(screen.getByText(/Say "hello"/)).toBeInTheDocument();
});

test('italicizes excerpts in meanings, answers, and feedback while keeping answer matching intact', () => {
    render(<Chatbot />);
    const click = (name) => fireEvent.click(screen.getByRole('button', { name, exact: true }));
    click('General Prayers');
    click('Mi Chamocha');
    const latest = () => screen.getByRole('log').lastElementChild;
    expect(latest().querySelector('em')).toHaveTextContent('Who else is like you, O God?');
    click('Start questions');
    click('Skip question');
    click('Skip question');
    const answer = screen.getByRole('button', { name: "'Who else is like you, O God?'", exact: true });
    expect(answer.querySelector('em')).toHaveTextContent('Who else is like you, O God?');
    fireEvent.click(answer);
    expect(within(latest()).getByRole('heading', { name: "That's the idea!" })).toBeInTheDocument();
    expect(latest().querySelector('em')).toHaveTextContent('Who else is like you, O God?');
});

test('leaves student prayer quotations literal', () => {
    render(<Chatbot />);
    fireEvent.change(screen.getByLabelText('Your message'), { target: { value: '"Adonai Echad"' } });
    fireEvent.click(screen.getByRole('button', { name: 'Send', exact: true }));
    expect(screen.getByText('"Adonai Echad"').closest('.user-message').querySelector('em')).toBeNull();
});
