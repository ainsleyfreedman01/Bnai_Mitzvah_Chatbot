import { useEffect, useRef, useState } from 'react';
import { categories, findLessons, lessons, normalize, shuffleOptions } from './prayerLessons';
import { getQuestions } from './prayerQuestions';
import ChatMessage from './ChatMessage';
import PrayerText from './PrayerText';
import './Chatbot.css';

const greeting = "### Let's explore the prayers\n\nHello! Let's explore the meaning behind the prayers for your b'nai mitzvah.\n\nWhich type of prayer would you like to look at? Choose below, or type a prayer name.";
const initialChat = () => ({
    messages: [{ sender: 'chatbot', text: greeting }],
    stage: 'choose',
    mode: 'normal',
    category: null,
    lessonId: null,
    questionIndex: -1,
    answerOptions: [],
    feedback: '',
    matches: [],
});
const choice = (id, label, value) => ({ id, label, value });
const moreQuestions = /^(?:(?:please|can you|could you|give me|ask me|i want|i d like)\s+)*(?:(?:a|an|the|some)\s+)*(?:(?:another|next|more|new|repeat|different|follow up|quick)\s+)+questions?(?:\s+(?:please|about this prayer))?$/;

function Chatbot() {
    const [chat, setChat] = useState(initialChat);
    const [input, setInput] = useState('');
    const latestMessage = useRef(null);
    const conversation = useRef(null);
    const inputRef = useRef(null);
    const lesson = lessons.find((item) => item.id === chat.lessonId);
    const questions = lesson ? getQuestions(lesson) : [];
    const currentQuestion = questions[chat.questionIndex];
    const lastQuestion = chat.questionIndex === questions.length - 1;
    const questionText = (index) => `### Question ${index + 1} of ${questions.length}\n\n**${questions[index].prompt}**\n\nChoose one answer below. Each question has one correct answer based on this study guide.`;
    const exhaustedText = () => `### No more prepared questions\n\nYou've reached the end of my ${questions.length} multiple-choice questions for ${lesson.name}. I don't have any more new questions for this prayer.\n\nThis is a limit of this rule-based guide, not the end of what there is to learn.\n\n**Continue the discussion with your tutor:** bring a question that stood out, look at the full prayer together, and ask about your congregation's wording and practice. Nothing has been sent to your tutor.`;

    useEffect(() => {
        const log = conversation.current;
        const message = latestMessage.current;
        if (log && message) {
            log.scrollTop += message.getBoundingClientRect().top - log.getBoundingClientRect().top - 16;
        }
    }, [chat.messages]);

    const respond = (text, changes = {}, userText) => {
        setChat((previous) => ({
            ...previous,
            ...changes,
            messages: [
                ...previous.messages,
                ...(userText ? [{ sender: 'user', text: userText }] : []),
                { sender: 'chatbot', text },
            ],
        }));
    };

    const restart = () => {
        setChat(initialChat());
        setInput('');
    };

    const nextQuestion = (userText) => {
        const index = chat.questionIndex + 1;
        setInput('');
        if (index >= questions.length) {
            respond(exhaustedText(), { stage: 'exhausted', mode: 'normal' }, userText);
        } else {
            respond(questionText(index), {
                stage: 'quiz', questionIndex: index, mode: 'normal',
                answerOptions: shuffleOptions(questions[index].options), feedback: '',
            }, userText);
        }
    };

    const prompt = () => {
        if (chat.stage === 'choose') return greeting;
        if (chat.stage === 'prayers') return 'Which prayer would you like to learn about? Choose below, or type its name.';
        if (chat.stage === 'intro') return `### ${lesson.name}\n\n${lesson.meaning}\n\nChoose Start questions for ${questions.length} multiple-choice questions with explanations.`;
        if (chat.stage === 'quiz') return questionText(chat.questionIndex);
        if (chat.stage === 'feedback') return chat.feedback;
        if (chat.stage === 'exhausted') return exhaustedText();
        return 'Thanks for learning with me! Come back whenever you are ready.';
    };

    const selectPrayer = (item, userText) => {
        setInput('');
        respond(`### ${item.name}\n\n${item.meaning}\n\nThere are ${getQuestions(item).length} multiple-choice questions for this prayer. Each answer comes with an explanation. You can skip, pause, or ask for help at any point.`,
            { lessonId: item.id, category: item.category, stage: 'intro', mode: 'normal', questionIndex: -1, answerOptions: [], feedback: '' }, userText);
    };

    const options = () => {
        if (chat.mode === 'paused') return [choice('return', 'Resume chatting')];
        if (chat.mode === 'help') return [
            ...(lesson ? [
                choice('parts', 'One part at a time'),
                choice('idea', 'Show a key idea'),
                choice('example', 'Give me an example'),
                choice('teacher', 'Question for my tutor'),
            ] : []),
            choice('return', 'Back to our chat'),
            choice('pause', 'Take a break'),
        ];
        if (chat.stage === 'choose') return categories.map((item) => choice('category', item.label, item.id));
        if (chat.stage === 'prayers') return chat.matches.map((item) => choice('prayer',
            chat.category ? item.name : `${item.name} (${categories.find((group) => group.id === item.category).label})`, item.id));
        if (chat.stage === 'intro') return [
            choice('next-question', 'Start questions'),
            choice('example', 'Give me an example'),
        ];
        if (chat.stage === 'quiz') return [
            ...chat.answerOptions.map((option) => choice('answer', option, option)),
            choice('next-question', 'Skip question'),
            choice('meaning', 'Read the meaning again'),
        ];
        if (chat.stage === 'feedback') return [
            choice('next-question', lastQuestion ? 'Finish questions' : 'Next question'),
            choice('retry', 'Try this question again'),
            choice('meaning', 'Read the meaning again'),
        ];
        if (chat.stage === 'exhausted') return [
            choice('teacher', 'Prepare a question for my tutor'),
            choice('another', 'Choose a new prayer'),
            choice('end', "I'm done for now"),
        ];
        return [choice('another', 'Start a new chat')];
    };

    const act = ({ id, label, value }) => {
        if (id === 'restart' || id === 'another') {
            restart();
        } else if (id === 'category') {
            setInput('');
            respond(`You've chosen ${label}.\n\nWhich prayer would you like to learn about?`,
                { category: value, matches: findLessons('', value), stage: 'prayers', mode: 'normal', lessonId: null, questionIndex: -1, answerOptions: [] }, label);
        } else if (id === 'prayer') {
            selectPrayer(lessons.find((item) => item.id === value), label);
        } else if (id === 'help') {
            respond('### Here to help\n\nIt is okay to feel unsure. We can try a smaller step without starting over.',
                { mode: 'help' }, label);
        } else if (id === 'pause') {
            respond('### Take a breath\n\nYour place and any unsent writing will be here while this page stays open.',
                { mode: 'paused' }, label);
        } else if (id === 'return') {
            respond(prompt(), { mode: 'normal' }, label);
        } else if (id === 'parts') {
            respond(`### One part at a time\n\n1. **Start with the name:** ${lesson.name}.\n2. **Focus on one idea:** ${lesson.idea}.\n3. Read the explanation again when you are ready. There is no time limit.`, {}, label);
        } else if (id === 'idea') {
            respond(`### Key idea\n\n${lesson.idea}`, {}, label);
        } else if (id === 'example') {
            respond(`### An everyday connection, not a translation\n\n${lesson.example}`, {}, label);
        } else if (id === 'teacher') {
            respond(`### A question to bring to your tutor\n\n"Can we look at the words of ${lesson.name} together and talk about this idea: ${lesson.idea}?"\n\nThis is just a prompt to discuss or copy. It has not been sent or saved.`, {}, label);
        } else if (id === 'next-question') {
            nextQuestion(label);
        } else if (id === 'answer') {
            const correct = value === currentQuestion.answer;
            const feedback = `### ${correct ? "That's the idea!" : "Let's look again."}\n\n**Correct answer:** ${currentQuestion.answer}\n\n**Why:** ${currentQuestion.explanation}`;
            respond(`${feedback}\n\n${lastQuestion && correct ? exhaustedText() : 'You can continue or revisit this question. There is no penalty for a retry.'}`,
                { stage: lastQuestion && correct ? 'exhausted' : 'feedback', feedback }, label);
            setInput('');
        } else if (id === 'retry') {
            respond(questionText(chat.questionIndex), { stage: 'quiz' }, label);
        } else if (id === 'meaning') {
            respond(`${lesson.meaning}\n\n${prompt()}`, {}, label);
        } else if (id === 'end') {
            respond('Thanks for learning with me! Come back whenever you are ready.', { stage: 'ended' }, label);
        }
        inputRef.current?.focus({ preventScroll: true });
    };

    const send = (event) => {
        event.preventDefault();
        const text = input.trim();
        if (!text) return;
        const command = normalize(text);
        setInput('');
        if (['restart', 'start over', 'another prayer', 'choose another prayer'].includes(command)) {
            restart();
            return;
        }
        if (lesson && moreQuestions.test(command)) {
            nextQuestion(text);
            return;
        }
        if (command === 'help' || /\b(confused|stuck|frustrated)\b|don['\u2019]?t understand|do not understand/i.test(text)) {
            act(choice('help', text));
            return;
        }
        if (chat.mode !== 'normal') {
            if (['resume', 'back', 'continue'].includes(command)) act(choice('return', text));
            else respond('Use the options below to return to our chat, or type "restart" for a fresh start.', {}, text);
            return;
        }
        const selectedOption = options().find((item) => normalize(item.label) === command);
        if (selectedOption) {
            act({ ...selectedOption, label: text });
            return;
        }
        if (chat.stage === 'exhausted') {
            respond(exhaustedText(), {}, text);
        } else if (lesson && chat.stage !== 'ended') {
            respond(`This question set uses multiple-choice answers, not personal reflections. Choose an option below, ask for help, or request the next question.\n\n${prompt()}`, {}, text);
        } else if (chat.stage === 'ended') {
            respond('Choose Start a new chat whenever you would like to study again.', {}, text);
        } else {
            const selectedCategory = categories.find((item) => [item.id, normalize(item.label)].includes(command));
            if (selectedCategory) {
                act(choice('category', selectedCategory.label, selectedCategory.id));
                return;
            }
            const exact = findLessons(text).filter((item) => [item.name, ...item.aliases].some((name) => normalize(name) === command));
            const matches = exact.length ? exact : findLessons(text, chat.category);
            if (matches.length === 1) selectPrayer(matches[0], text);
            else if (matches.length > 1) respond('Choose a matching prayer below. The category helps distinguish prayers with the same name.',
                { stage: 'prayers', matches, category: null }, text);
            else respond('I could not find that prayer. Try a shorter name, choose below, or choose another prayer to see all categories.', {}, text);
        }
    };

    const showingQuestion = chat.stage === 'quiz' && chat.mode === 'normal';
    const availableOptions = options();
    const renderOption = (item) => <button key={`${item.id}-${item.value || item.label}`} type="button"
        aria-label={item.label}
        className={showingQuestion && item.id !== 'answer' ? 'question-action' : undefined}
        onClick={() => act(item)}><PrayerText text={item.label} /></button>;

    return (
        <main className="chat-container">
            <header className="chat-header">
                <h1>b'nAI Mitzvah</h1>
                <p>Discover the meaning behind the prayers.</p>
            </header>
            <div className="chat-box" ref={conversation} role="log" aria-label="Prayer study conversation" aria-live="polite" aria-relevant="additions" tabIndex="0">
                {chat.messages.map((message, index) => (
                    <div key={index} className={`chat-message ${message.sender}-message`} ref={index === chat.messages.length - 1 ? latestMessage : null}>
                        <span className="sr-only">{message.sender === 'user' ? 'You' : 'Prayer guide'}: </span>
                        {message.sender === 'chatbot' ? <ChatMessage text={message.text} /> : <p>{message.text}</p>}
                        {index === chat.messages.length - 1 && (
                            <div className="chat-options" role="group" aria-label="Chat options">
                                <div className="main-options">
                                    {availableOptions.filter((item) => !showingQuestion || item.id === 'answer').map(renderOption)}
                                    {showingQuestion && (
                                        <div className="question-actions">
                                            {availableOptions.filter((item) => item.id !== 'answer').map(renderOption)}
                                        </div>
                                    )}
                                </div>
                                <div className="chat-shortcuts">
                                    {chat.stage !== 'choose' && <button type="button" onClick={() => act(choice('another', 'Choose another prayer'))}>Choose another prayer</button>}
                                    {chat.mode === 'normal' && <button type="button" onClick={() => act(choice('help', 'Help'))}>Help</button>}
                                    <button type="button" onClick={() => act(choice('restart', 'Start over'))}>Start over</button>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
            <form className="input-container" onSubmit={send}>
                <label className="sr-only" htmlFor="chat-input">Your message</label>
                <input id="chat-input" ref={inputRef} value={input} onChange={(event) => setInput(event.target.value)}
                    placeholder="Choose an answer, or type a prayer name or command..." autoComplete="off" />
                <button className="send-btn" type="submit" disabled={!input.trim()}>Send</button>
            </form>
            <p className="chat-note">Rule-based, not AI-generated. Messages are not sent or saved. Ask your tutor about your congregation's practices.</p>
        </main>
    );
}

export default Chatbot;
