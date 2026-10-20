import { lessons } from './prayerLessons';

const excerpts = [...new Set(lessons.flatMap((lesson) => [
    ...(lesson.excerpts || []),
    ...(lesson.isTranslation ? [lesson.meaning] : []),
]))].sort((a, b) => b.length - a.length);
const excerptPattern = new RegExp(`(${excerpts.map((text) => text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`, 'gi');
const excerptSet = new Set(excerpts.map((text) => text.toLowerCase()));

export default function PrayerText({ text }) {
    return text.split(excerptPattern).map((part, index) => (
        excerptSet.has(part.toLowerCase()) ? <em key={index}>{part}</em> : part
    ));
}
