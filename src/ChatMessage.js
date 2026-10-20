import PrayerText from './PrayerText';

const inlineText = (text) => text.split(/(\*\*[^*\n]+\*\*)/g).map((part, index) => (
    part.startsWith('**') && part.endsWith('**')
        ? <strong key={index}><PrayerText text={part.slice(2, -2)} /></strong>
        : <PrayerText key={index} text={part} />
));

export default function ChatMessage({ text }) {
    return (
        <div className="guide-content">
            {text.split(/\n{2,}/).map((block, index) => {
                if (/^### [^\n]+$/.test(block)) {
                    return <h3 key={index}>{inlineText(block.slice(4))}</h3>;
                }
                const lines = block.split('\n');
                if (lines.every((line) => /^\d+\. /.test(line))) {
                    return <ol key={index}>{lines.map((line, item) => <li key={item}>{inlineText(line.replace(/^\d+\. /, ''))}</li>)}</ol>;
                }
                return <p key={index}>{inlineText(block)}</p>;
            })}
        </div>
    );
}
