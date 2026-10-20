# b'nAI Mitzvah Chatbot

## Overview  
The **B'nAI Mitzvah Chatbot** is a guided, rule-based study companion for students preparing for their B’nai Mitzvah. Explanations, examples, multiple-choice questions, and answer feedback are authored in advance. No generative AI or external answer service is used.

## Features  
- **Easy Prayer Selection** – Clickable category and prayer options inside the chat, plus typed prayer names with common spelling and punctuation variants.
- **All Multiple Choice** – Every prayer has five distinct knowledge questions (130 across the 26 catalog entries), each with three choices, one correct answer, and an explanation.
- **Clear Progress and Ending** – Questions are labeled “Question 2 of 5.” After the last one, the guide explicitly says it has no more prepared questions and recommends continuing with the tutor.
- **Learning, Not Belief Scoring** – Questions check the provided study material, not personal feelings or beliefs. Students can skip, retry, or stop without penalty.
- **Contextual Help** – Break an idea into smaller steps, see an example, find a question to bring to a teacher, or pause without losing the current step.
- **Reliable Navigation** – Choose another prayer, request help, or start over at any point, including during reflection and breaks.
- **Built with JavaScript & React** – Responsive, keyboard-accessible UI with focus management and announced feedback; no backend or new runtime framework.

## Technologies Used  
- **React** – Frontend framework for the chatbot interface.  
- **JavaScript** – Core logic for chatbot responses.

## How to Use the Chatbot
1. Choose a category and prayer using the buttons in the conversation, or type a prayer name directly (for example, `Shema`, `Sh'ma`, or `candles`).
2. Read the meaning in the chat. Ask for an example if you would like one.
3. Choose **Start questions** for five multiple-choice knowledge questions. Each question has three shuffled answer choices; select one to see the correct answer and an explanation.
4. Choose **Next question**, **Try this question again**, or **Skip question**. There is no penalty for mistakes or skipping.
5. After the final correct answer, skipping the final question, or choosing **Finish questions** after final feedback, the guide explains that its prepared questions have run out and suggests further study with the tutor.

All student questions in the active flow are multiple-choice knowledge checks, not open-ended reflections or ungraded scenario branches. Personal writing is never evaluated as a belief or feeling. Unrecognized text asks the student to choose an option without advancing the question.

Typed requests such as `another question`, `give me another question`, `more questions`, or `repeat questions` start or advance the same sequence, skipping the current question if unanswered. Typing the exact answer text also works. Requests after the last question show the tutor handoff instead of cycling. Finishing the list is not a claim of mastery. Starting a new prayer/chat resets the sequence.

The interface keeps the simple blue-and-white chat bubbles, inline choices, and 24px outer spacing. During questions, skip and re-read controls use neutral gray styling in a separate row below the three blue answer choices; correct and incorrect choices look the same before answering. Guide responses use headings, bold question prompts and feedback labels, spaced paragraphs, and numbered help steps for readability. A small React renderer supports only these authored formatting markers, without interpreting HTML or adding a Markdown dependency. Student writing stays literal.

Use the inline **Help** option at any point. **Take a break** preserves your place and unsent draft while the page remains open. **Start over** or **Choose another prayer** clears the conversation and returns to the categories. Typing `restart` or `help` in the message field also works. Only the latest guide message has active choices, so old buttons cannot change the current conversation accidentally.

### Privacy

Messages appear in the chat history and are held only in React memory on the current page. They are not sent, stored in browser storage, or shared with a teacher. Choosing another prayer, starting over, or reloading clears them. Tutor questions are prompts to copy or discuss, not messages that the app sends.

### Content maintenance

Prayer excerpts in guide messages and answer choices are italicized, including translated excerpts. The catalog's optional `excerpts` lists identify quoted wording explicitly; `isTranslation` marks a complete meaning field as a translated excerpt. This formatting never changes answer strings or treats ordinary quotation marks and student writing as prayer text.

The active catalog is [src/prayerLessons.js](src/prayerLessons.js). Each lesson has a stable ID, category, aliases, explanation, key idea, example, and the original knowledge check. Earlier reflection fields remain in the catalog but are not shown as student questions in the active flow. The older [src/Prayers.js](src/Prayers.js) is not used by the app.

[src/prayerQuestions.js](src/prayerQuestions.js) provides each entry's five-question bank: its original knowledge check plus four new authored questions. Each question has a prompt, correct answer, two distractors, and an explanation. Answers are randomly shuffled once per new question, then remain stable during retries, re-reading, and help. Correctness is checked by answer content, not position. The guide never invents extra questions after the list runs out, and tutor suggestions do not transmit student writing.

The explanations retain the existing guide's meanings; the new prompts and checks are learning aids, not newly established religious authority. Existing translations are excerpts, not complete prayer texts. Have a rabbi, cantor, or educator review all materials before using them as a congregation's curriculum. In particular, confirm service placement and variants (including the existing morning/evening K'dushah entries) against the congregation's practice rather than treating the category labels as universal service instructions.

### Development and verification

- `npm start` starts the local preview.
- `npm run build` produces the production bundle.
- `CI=true npm test -- --watchAll=false --runInBand` runs the lesson-content, navigation/help, and complete study-flow regression tests.

✨ Have fun exploring, learning, and deepening your understanding of these meaningful prayers! ✨
