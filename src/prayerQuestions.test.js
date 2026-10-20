import { lessons } from './prayerLessons';
import { getQuestions } from './prayerQuestions';

test.each(lessons)('$id has five distinct authored multiple-choice questions with valid answers and explanations', (lesson) => {
    const questions = getQuestions(lesson);
    expect(questions).toHaveLength(5);
    expect(new Set(questions.map((item) => item.prompt)).size).toBe(questions.length);
    questions.forEach((item) => {
        expect(item.prompt.length).toBeGreaterThan(20);
        expect(item.prompt).toContain('?');
        expect(item.options).toHaveLength(3);
        expect(new Set(item.options).size).toBe(3);
        expect(item.options.filter((option) => option === item.answer)).toHaveLength(1);
        expect(item.explanation.length).toBeGreaterThan(30);
        expect(item.options.every((option) => typeof option === 'string' && option.trim())).toBe(true);
    });
});

test('has 130 questions across the entire prayer catalog', () => {
    expect(lessons.reduce((total, lesson) => total + getQuestions(lesson).length, 0)).toBe(130);
});
