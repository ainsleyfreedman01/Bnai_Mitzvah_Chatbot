import { categories, findLessons, lessons, normalize, shuffleOptions } from './prayerLessons';

test('shuffles a copy without losing or duplicating answers', () => {
    const original = ['correct', 'second', 'third'];
    expect(shuffleOptions(original, () => 0)).toEqual(['second', 'third', 'correct']);
    expect(original).toEqual(['correct', 'second', 'third']);
    expect(shuffleOptions(original, () => 0.99)).toEqual(original);
});

test('the correct answer can occupy every position', () => {
    const original = ['correct', 'second', 'third'];
    const positions = [0, 0.4, 0.99].map((value) => shuffleOptions(original, () => value).indexOf('correct'));
    expect(new Set(positions)).toEqual(new Set([0, 1, 2]));
});

test('normalizes punctuation, case, and whitespace', () => {
    expect(normalize("  V’AHAVTA  ")).toBe('vahavta');
    expect(normalize("Sh‘ma")).toBe(normalize("Sh'ma"));
    expect(normalize(' Mi   Chamocha ')).toBe('mi chamocha');
});

test.each([
    ['shema', 'shema'],
    ["  SH’MA ", 'shema'],
    ['gevurot', 'gvurot'],
    ['candles', 'candles'],
    ['before', 'torah-before'],
    ['Blessing After the Reading of the Torah', 'torah-after'],
    ['lecha dodi', 'lcha-dodi'],
    ['avot', 'avot'],
])('finds %s without a category', (query, id) => {
    expect(findLessons(query).map((lesson) => lesson.id)).toContain(id);
});

test('keeps ambiguous matches visible and respects explicit category filters', () => {
    expect(findLessons('kedushah')).toHaveLength(2);
    expect(findLessons('kedushah', 'morning')).toHaveLength(1);
    expect(findLessons('shema', 'torah')).toHaveLength(0);
    expect(findLessons('not a known prayer')).toHaveLength(0);
    expect(findLessons('')).toHaveLength(lessons.length);
});

test('preserves all five categories and unique lesson identifiers', () => {
    expect(categories).toHaveLength(5);
    expect(new Set(lessons.map((lesson) => lesson.id)).size).toBe(lessons.length);
    expect(lessons).toHaveLength(26);
    categories.forEach((category) => expect(lessons.some((lesson) => lesson.category === category.id)).toBe(true));
});

test.each(lessons)('$id has a complete authored lesson and exactly one correct option', (lesson) => {
    ['name', 'meaning', 'idea', 'reflection', 'example', 'question', 'answer'].forEach((field) => {
        expect(typeof lesson[field]).toBe('string');
        expect(lesson[field].trim()).not.toBe('');
    });
    expect(categories.some((category) => category.id === lesson.category)).toBe(true);
    expect(lesson.options).toHaveLength(3);
    expect(new Set(lesson.options).size).toBe(3);
    expect(lesson.options.filter((option) => option === lesson.answer)).toHaveLength(1);
    lesson.aliases.forEach((alias) => expect(findLessons(alias, lesson.category)).toContain(lesson));
});
