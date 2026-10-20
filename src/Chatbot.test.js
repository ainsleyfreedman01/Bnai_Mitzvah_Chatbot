import { fireEvent, render, screen, within } from '@testing-library/react';
import Chatbot from './Chatbot';
import { lessons } from './prayerLessons';
import { getQuestions } from './prayerQuestions';

const click = (name) => fireEvent.click(screen.getByRole('button', { name, exact: true }));
const send = (text) => {
    fireEvent.change(screen.getByLabelText('Your message'), { target: { value: text } });
    click('Send');
};
const openPrayer = () => {
    click('General Prayers');
    click("Sh'ma");
    click('Start questions');
};
const currentMessage = () => within(screen.getByRole('log').lastElementChild);
const answerLabels = () => within(screen.getByRole('group', { name: 'Chat options' }))
    .getAllByRole('button').slice(0, 3).map((button) => button.textContent);

test('distinguishes question actions from every answer choice without hinting at correctness', () => {
    render(<Chatbot />);
    openPrayer();
    const actions = ['Skip question', 'Read the meaning again'];
    actions.forEach((name) => expect(screen.getByRole('button', { name, exact: true })).toHaveClass('question-action'));
    actions.forEach((name) => expect(screen.getByRole('button', { name, exact: true }).parentElement).toHaveClass('question-actions'));
    answerLabels().forEach((name) => expect(screen.getByRole('button', { name, exact: true })).not.toHaveClass('question-action'));
    click('Skip question');
    actions.forEach((name) => expect(screen.getByRole('button', { name, exact: true })).toHaveClass('question-action'));
    click('Help');
    expect(screen.getByRole('button', { name: 'One part at a time' })).not.toHaveClass('question-action');
});

test('keeps clickable categories and prayer choices inside the conversation', () => {
    render(<Chatbot />);
    const log = screen.getByRole('log', { name: 'Prayer study conversation' });
    expect(within(log).getByRole('button', { name: 'Torah Blessings' })).toBeInTheDocument();
    click('Torah Blessings');
    expect(screen.queryByRole('button', { name: 'General Prayers' })).not.toBeInTheDocument();
    click('Blessing Before the Reading of the Torah');
    expect(screen.getByText(/chosen us from all peoples/)).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Skip reflection' })).not.toBeInTheDocument();
    click('Start questions');
    expect(screen.getByRole('button', { name: 'Before the reading of the Torah' })).toBeInTheDocument();
});

test('accepts aliases, category names, and prayer names outside the chosen category', () => {
    render(<Chatbot />);
    send('morning');
    expect(screen.getByRole('button', { name: 'Modeh Ani' })).toBeInTheDocument();
    send('candles');
    expect(screen.getByText(/kindle the light of the Shabbat/)).toBeInTheDocument();
});

test('recovers from unmatched names and disambiguates prayers with shared names', () => {
    render(<Chatbot />);
    send('unknown prayer');
    expect(screen.getByText(/I could not find that prayer/)).toBeInTheDocument();
    send('kedushah');
    click("K'dushah (Morning Prayers)");
    expect(screen.getByText(/Kadosh, Kadosh, Kadosh/)).toBeInTheDocument();
});

test('explanatory feedback is shown for correct and incorrect answers and retries keep the order', () => {
    render(<Chatbot />);
    openPrayer();
    const order = answerLabels();
    click('Blessing bread before eating');
    expect(currentMessage().getByText('Correct answer:').parentElement).toHaveTextContent('Correct answer: Listening and declaring that God is one');
    expect(currentMessage().getByText('Why:').parentElement).toHaveTextContent('Why: This is one of the most important');
    click('Try this question again');
    expect(answerLabels()).toEqual(order);
    click('Listening and declaring that God is one');
    expect(currentMessage().getByText(/That's the idea!/)).toBeInTheDocument();
    click('Next question');
    expect(currentMessage().getByText(/Question 2 of 5/)).toBeInTheDocument();
});

test('help and breaks preserve question progress, answer order, feedback, and unsent writing', () => {
    render(<Chatbot />);
    openPrayer();
    const order = answerLabels();
    fireEvent.change(screen.getByLabelText('Your message'), { target: { value: 'Unsent text' } });
    click('Help');
    click('One part at a time');
    expect(currentMessage().getByText(/There is no time limit/)).toBeInTheDocument();
    click('Show a key idea');
    click('Give me an example');
    expect(currentMessage().getByRole('heading', { name: 'An everyday connection, not a translation' })).toBeInTheDocument();
    click('Question for my tutor');
    expect(currentMessage().getByText(/It has not been sent or saved/)).toBeInTheDocument();
    click('Take a break');
    click('Resume chatting');
    expect(answerLabels()).toEqual(order);
    expect(screen.getByLabelText('Your message')).toHaveValue('Unsent text');
    expect(screen.getByLabelText('Your message')).toHaveFocus();
    click('Listening and declaring that God is one');
    click('Help');
    click('Back to our chat');
    expect(currentMessage().getByText(/That's the idea!/)).toBeInTheDocument();
    click('Next question');
    expect(currentMessage().getByText(/Question 2 of 5/)).toBeInTheDocument();
});

test('unrecognized free text does not get graded or advance the question', () => {
    render(<Chatbot />);
    openPrayer();
    send('I help my friends by listening.');
    expect(currentMessage().getByText(/uses multiple-choice answers, not personal reflections/)).toBeInTheDocument();
    expect(currentMessage().getByText(/Question 1 of 5/)).toBeInTheDocument();
    send("I don't understand");
    expect(screen.getByRole('button', { name: 'One part at a time' })).toBeInTheDocument();
    click('Back to our chat');
    send('Listening and declaring that God is one');
    expect(currentMessage().getByText(/That's the idea!/)).toBeInTheDocument();
});

test('answer positions vary between sessions and questions without mutating the bank', () => {
    const random = jest.spyOn(Math, 'random').mockReturnValue(0);
    try {
        render(<Chatbot />);
        openPrayer();
        const first = answerLabels();
        expect(first.indexOf('Listening and declaring that God is one')).toBe(2);
        click('Skip question');
        expect(currentMessage().getByText(/Question 2 of 5/)).toBeInTheDocument();
        click('Start over');
        random.mockReturnValue(0.99);
        openPrayer();
        expect(answerLabels().indexOf('Listening and declaring that God is one')).toBe(0);
        expect(new Set(answerLabels())).toEqual(new Set(first));
    } finally {
        random.mockRestore();
    }
});

test('repeat-question commands advance one sequence and explicitly run out even when skipping', () => {
    render(<Chatbot />);
    send('shema');
    ['give me another question', 'ask me another question', 'more questions', 'repeat questions', 'next question'].forEach((command, index) => {
        send(command);
        expect(currentMessage().getByText(new RegExp(`Question ${index + 1} of 5`))).toBeInTheDocument();
        expect(answerLabels()).toHaveLength(3);
    });
    send('can you give me a different question please');
    expect(currentMessage().getByText(/I don't have any more new questions/)).toBeInTheDocument();
    expect(currentMessage().getByText(/Continue the discussion with your tutor/)).toBeInTheDocument();
    send('more questions');
    expect(currentMessage().getByText(/I don't have any more new questions/)).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Start questions' })).not.toBeInTheDocument();
    click('Help');
    click('Take a break');
    click('Resume chatting');
    expect(currentMessage().getByText(/No more prepared questions/)).toBeInTheDocument();
    click('Prepare a question for my tutor');
    expect(currentMessage().getByText(/It has not been sent or saved/)).toBeInTheDocument();
});

test('an incorrect last answer explains why and can be retried or finished without looping', () => {
    render(<Chatbot />);
    openPrayer();
    for (let index = 0; index < 4; index++) click('Skip question');
    const final = getQuestions(lessons.find((lesson) => lesson.id === 'shema'))[4];
    click(final.options.find((option) => option !== final.answer));
    expect(currentMessage().getByText(/Let's look again/)).toBeInTheDocument();
    expect(currentMessage().getByText(/Why:/)).toBeInTheDocument();
    click('Finish questions');
    expect(currentMessage().getByText(/end of my 5 multiple-choice questions/)).toBeInTheDocument();
    click("I'm done for now");
    click('Start a new chat');
    openPrayer();
    expect(currentMessage().getByText(/Question 1 of 5/)).toBeInTheDocument();
});

test('restart and choosing another prayer clear history, drafts, and question progress', () => {
    render(<Chatbot />);
    openPrayer();
    send('Private writing');
    send('restart');
    expect(screen.queryByText('Private writing')).not.toBeInTheDocument();
    expect(screen.getByLabelText('Your message')).toHaveValue('');
    openPrayer();
    click('Skip question');
    click('Choose another prayer');
    openPrayer();
    expect(currentMessage().getByText(/Question 1 of 5/)).toBeInTheDocument();
});

test.each(lessons)('$id completes five multiple-choice questions with explanations and a tutor handoff', (lesson) => {
    render(<Chatbot />);
    click(categoriesFor(lesson.category));
    click(lesson.name);
    click('Start questions');
    getQuestions(lesson).forEach((item, index) => {
        expect(currentMessage().getByText(new RegExp(`Question ${index + 1} of 5`))).toBeInTheDocument();
        expect(new Set(answerLabels())).toEqual(new Set(item.options));
        click(item.answer);
        expect(currentMessage().getByText(/That's the idea!/)).toBeInTheDocument();
        expect(currentMessage().getByText(new RegExp('Why:'))).toBeInTheDocument();
        if (index < 4) click('Next question');
    });
    expect(currentMessage().getByText(/I don't have any more new questions/)).toBeInTheDocument();
    expect(currentMessage().getByText(/Continue the discussion with your tutor/)).toBeInTheDocument();
});

function categoriesFor(id) {
    return { general: 'General Prayers', morning: 'Morning Prayers', evening: 'Evening Prayers', shabbat: 'Shabbat Blessings', torah: 'Torah Blessings' }[id];
}
