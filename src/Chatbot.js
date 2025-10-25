import { useState, useEffect } from 'react';
import './Chatbot.css';

const generalPrayers = {
    "bar'chu": "This prayer opens up the service. We ask ourselves if we're ready to pray and if we're ready to be blessed. In fact, the word 'Bar'chu' means 'to bless' in Hebrew.",
    "bar’chu": "This prayer opens up the service. We ask ourselves if we're ready to pray and if we're ready to be blessed. In fact, the word 'Bar'chu' means 'to bless' in Hebrew.",
    "bar‘chu": "This prayer opens up the service. We ask ourselves if we're ready to pray and if we're ready to be blessed. In fact, the word 'Bar'chu' means 'to bless' in Hebrew.",
    "sh'ma": "This is one of the most important prayers in Judaism. In this prayer, we tell the people of Israel to listen to us, and to remember that God is one (Adonai Echad). The word 'Sh'ma' means 'to listen' in Hebrew. Think of it as the ultimate call to 'tune in'!",
    "sh’ma": "This is one of the most important prayers in Judaism. In this prayer, we tell the people of Israel to listen to us, and to remember that God is one (Adonai Echad). The word 'Sh'ma' means 'to listen' in Hebrew. Think of it as the ultimate call to 'tune in'!",
    "sh‘ma": "This is one of the most important prayers in Judaism. In this prayer, we tell the people of Israel to listen to us, and to remember that God is one (Adonai Echad). The word 'Sh'ma' means 'to listen' in Hebrew. Think of it as the ultimate call to 'tune in'!",
    "v'ahavta": "This prayer instructs us to follow God's commandments. Some of the commandments we see in this prayer are to 'love Adonai with all your heart and with all your soul'. We also see commandments to 'inscribe them on the doorposts of your house and on your gates'. You've probably done this before, with a mezuzah! If you haven't, maybe it's time to get one and give your door some spiritual flair!",
    "v’ahavta": "This prayer instructs us to follow God's commandments. Some of the commandments we see in this prayer are to 'love Adonai with all your heart and with all your soul'. We also see commandments to 'inscribe them on the doorposts of your house and on your gates'. You've probably done this before, with a mezuzah! If you haven't, maybe it's time to get one and give your door some spiritual flair!",
    "v‘ahavta": "This prayer instructs us to follow God's commandments. Some of the commandments we see in this prayer are to 'love Adonai with all your heart and with all your soul'. We also see commandments to 'inscribe them on the doorposts of your house and on your gates'. You've probably done this before, with a mezuzah! If you haven't, maybe it's time to get one and give your door some spiritual flair!",
    "mi chamocha": "This is the prayer the Israelites sang as they left Egypt and crossed the split Red Sea. In this prayer, we praise God for everything He does, asking, 'Who else is like you, O God?' The word 'Mi' means 'who' in Hebrew, so you can probably guess what 'Chamocha' means! Spoiler alert: It's 'like you'!",
    "adonai s'fatai": "This begins the 'Amidah' (which means 'standing') section of the service. In this prayer, we ask God to 'open our lips' so that we can praise Him in the upcoming prayers. So, are your lips ready to sing God's praises?",
    "adonai s’fatai": "This begins the 'Amidah' (which means 'standing') section of the service. In this prayer, we ask God to 'open our lips' so that we can praise Him in the upcoming prayers. So, are your lips ready to sing God's praises?",
    "adonai s‘fatai": "This begins the 'Amidah' (which means 'standing') section of the service. In this prayer, we ask God to 'open our lips' so that we can praise Him in the upcoming prayers. So, are your lips ready to sing God's praises?",
    "avot v’imahot": "This prayer means 'fathers and mothers,' and talks about our ancestors, including Abraham, Isaac, Jacob, Sarah, Rebecca, Rachel, and Leah. It's like saying 'hey, thanks, ancestors!' and acknowledging their role in the Jewish story.",
    "avot v'imahot": "This prayer means 'fathers and mothers,' and talks about our ancestors, including Abraham, Isaac, Jacob, Sarah, Rebecca, Rachel, and Leah. It's like saying 'hey, thanks, ancestors!' and acknowledging their role in the Jewish story.",
    "avot v‘imahot": "This prayer means 'fathers and mothers,' and talks about our ancestors, including Abraham, Isaac, Jacob, Sarah, Rebecca, Rachel, and Leah. It's like saying 'hey, thanks, ancestors!' and acknowledging their role in the Jewish story.",    
    "avot": "This prayer means 'fathers and mothers,' and talks about our ancestors, including Abraham, Isaac, Jacob, Sarah, Rebecca, Rachel, and Leah. It's like saying 'hey, thanks, ancestors!' and acknowledging their role in the Jewish story.",
    "g'vurot": "This prayer talks about God's strength, but not in a superhero way—more like the power to help people, heal the sick, bring rain for crops, and even revive the dead. It reminds us that real strength isn’t just about being powerful, but about using that power to support and uplift others. Think of it as a reminder that kindness, healing, and helping those in need are some of the greatest strengths of all!",
    "g’vurot": "This prayer talks about God's strength, but not in a superhero way—more like the power to help people, heal the sick, bring rain for crops, and even revive the dead. It reminds us that real strength isn’t just about being powerful, but about using that power to support and uplift others. Think of it as a reminder that kindness, healing, and helping those in need are some of the greatest strengths of all!",
    "g‘vurot": "This prayer talks about God's strength, but not in a superhero way—more like the power to help people, heal the sick, bring rain for crops, and even revive the dead. It reminds us that real strength isn’t just about being powerful, but about using that power to support and uplift others. Think of it as a reminder that kindness, healing, and helping those in need are some of the greatest strengths of all!",
    "mourner’s kaddish": "The Mourner's Kaddish is actually not about mourning at all! It is a prayer of praise to God and is traditionally recited in memory of the deceased. It praises God's greatness and expresses a hope for peace and redemption. It's like sending a message of peace to heaven.",
    "mourner's kaddish": "The Mourner's Kaddish is actually not about mourning at all! It is a prayer of praise to God and is traditionally recited in memory of the deceased. It praises God's greatness and expresses a hope for peace and redemption. It's like sending a message of peace to heaven.",
    "mourner‘s kaddish": "The Mourner's Kaddish is actually not about mourning at all! It is a prayer of praise to God and is traditionally recited in memory of the deceased. It praises God's greatness and expresses a hope for peace and redemption. It's like sending a message of peace to heaven.",
    "aleinu": "This prayer reflects on God's sovereignty and calls for the ultimate recognition of God's oneness. It's recited at the conclusion of services, reminding us of our mission to serve God. It's like a spiritual mic drop at the end of the service.",
    "chatzi kaddish": "The word 'Chatzi' means 'half' in Hebrew, so think of this prayer as being half of the Kaddish prayer!",
    "mi shebeirach": "This prayer is traditionally said for those in need of healing, asking God to grant them a full recovery and strength. It's like a big spiritual 'get well soon' card."
};

const morningPrayers = {
    "yotzer": "This prayer talks about God's creation of light and darkness, and how God's creation is renewed every day. It's like saying, 'Good morning, world!' to the universe.",
    "yotzer or": "This prayer talks about God's creation of light and darkness, and how God's creation is renewed every day. It's like saying, 'Good morning, world!' to the universe.",
    "modeh ani": "This prayer is said upon waking up. It is a simple but powerful way to thank God for restoring our soul, and for another day of life. Think of it as a gratitude reminder right when you wake up.",
    "ahavah rabbah": "This prayer expresses God's great love for us and asks for wisdom and understanding to follow the Torah. It’s like saying, 'God loves us so much, and we want to live up to that love!'",
    "k'dushah": "The K’dushah is a moment in the Amidah where we sanctify God's name, often with words like 'Holy, Holy, Holy' (Kadosh, Kadosh, Kadosh). It’s like a spiritual standing ovation for God!",
    "k’dushah": "The K’dushah is a moment in the Amidah where we sanctify God's name, often with words like 'Holy, Holy, Holy' (Kadosh, Kadosh, Kadosh). It’s like a spiritual standing ovation for God!",
    "k‘dushah": "The K’dushah is a moment in the Amidah where we sanctify God's name, often with words like 'Holy, Holy, Holy' (Kadosh, Kadosh, Kadosh). It’s like a spiritual standing ovation for God!",
    "daily miracles": "These blessings, part of the morning prayers, thank God for the small, everyday miracles we experience—like opening our eyes and having strength to stand. It’s a reminder that even the little things in life are worth appreciating."
};

const eveningPrayers = {
    "ahavat olam": "This prayer, recited during the evening service, speaks of God’s eternal love for us and His command to teach our children about His ways. It's like a reminder that love is eternal, especially in the evening!",
    "hashkiveinu": "A prayer asking God to protect us from harm as we sleep. It’s like asking God to be your personal bodyguard throughout the night.",
    "maariv aravim": "This prayer is recited in the evening service, recognizing God's sovereignty over the universe and His role in bringing the evening and night upon us. It's like saying, 'God, you’ve got the night shift covered!'",
    "maariv": "This prayer is recited in the evening service, recognizing God's sovereignty over the universe and His role in bringing the evening and night upon us. It's like saying, 'God, you’ve got the night shift covered!'",
    "k'dushah": "Just like in the morning service, this prayer is part of the Amidah and sanctifies God's name. In the evening, it’s a moment to reflect on holiness before ending the day.",
    "k’dushah": "Just like in the morning service, this prayer is part of the Amidah and sanctifies God's name. In the evening, it’s a moment to reflect on holiness before ending the day.",
    "k‘dushah": "Just like in the morning service, this prayer is part of the Amidah and sanctifies God's name. In the evening, it’s a moment to reflect on holiness before ending the day."
};

const shabbatBlessings = {
    "kiddush": "This is the blessing recited over wine or grape juice to sanctify the Shabbat. It celebrates the creation of the world and God's rest on the seventh day. Cheers to Shabbat!",
    "l'cha dodi": "This song welcomes the Shabbat, inviting the 'Sabbath Bride' to come and join in the celebration of rest and holiness. It's like saying, 'Shabbat, you’re invited to the party!'",
    "l’cha dodi": "This song welcomes the Shabbat, inviting the 'Sabbath Bride' to come and join in the celebration of rest and holiness. It's like saying, 'Shabbat, you’re invited to the party!',",
    "l‘cha dodi": "This song welcomes the Shabbat, inviting the 'Sabbath Bride' to come and join in the celebration of rest and holiness. It's like saying, 'Shabbat, you’re invited to the party!',",
    "candle": "Blessed are You, Lord our God, King of the Universe, who has sanctified us with His commandments, and commanded us to kindle the light of the Shabbat. A little light, a lot of holiness.",
    "candles": "Blessed are You, Lord our God, King of the Universe, who has sanctified us with His commandments, and commanded us to kindle the light of the Shabbat. A little light, a lot of holiness.",
    "hamotzi": "This is the blessing recited before eating bread, particularly on Shabbat. It thanks God for providing sustenance, saying, 'Blessed are You, Lord our God, King of the Universe, who brings forth bread from the earth.' Bread and blessings – what could be better?"
};

const torahBlessings = {
    "before": "Blessed are You, Lord our God, King of the Universe, who has chosen us from all peoples and given us the Torah. It's like saying, 'thank you for giving us the ultimate guidebook!'",
    "after": "Blessed are You, Lord our God, King of the Universe, who gave us the Torah of truth, and implanted everlasting life within us. Blessed are You, Lord, giver of the Torah. A spiritual 'thank you' for the wisdom we’ve just received."
};

function Chatbot() {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [isFirstMessage, setIsFirstMessage] = useState(true);
    const [thoughtDone, setThoughtDone] = useState(false);
    const [conversationOver, setConversationOver] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [prayer, setPrayer] = useState(null);
    const [awaitingThoughts, setAwaitingThoughts] = useState(false);
    const [yesOrNo, setYesOrNo] = useState(false);

    // Use effect hook to send the initial greeting when the component mounts
    useEffect(() => {
        if (isFirstMessage) {
            setMessages([
                {
                    text: `Hello! I can help you with learning about the meanings behind some of the different prayers for your b'nai mitzvah. 
                    
                        Which type of prayer would you like to look at?
                    
                        You can choose from:

                        • General Prayers
                        • Morning Prayers
                        • Evening Prayers
                        • Shabbat Blessings
                        • Torah Blessings

                        If you would like to look at another prayer, please type the word 'restart'.

                        Happy learning!`,
                    sender: 'chatbot'
                }
            ]);
            setIsFirstMessage(false);
        }
    }, [isFirstMessage]);

    // Handle the user input and generate responses
    const handleInput = (e) => {
        e.preventDefault();
        const userMessage = input;
        setMessages((prevMessages) => [
            ...prevMessages,
            { text: userMessage, sender: 'user' },
        ]);
        setInput('');

        let botResponse = "";
        if (awaitingThoughts) {
            botResponse = getThoughts(userMessage, prayer);
            setAwaitingThoughts(false);
            setThoughtDone(true);
            setYesOrNo(true);
        } else if (yesOrNo) {
            botResponse = restartOrEnd(userMessage);
            setYesOrNo(false);
        } else if (userMessage.toLowerCase().includes("stuck") || userMessage.toLowerCase().includes("don't understand")) {
            botResponse = "I'm sorry you're having trouble. Would you like to take a break and come back to this? Or perhaps you'd like to try asking your rabbi, or someone else you feel could provide additional help? You can type the word 'restart' when you'd like to come back and start fresh."
        } else if (userMessage.toLowerCase().includes("hate") || userMessage.toLowerCase().includes("suck") || userMessage.toLowerCase().includes("don't understand") || userMessage.toLowerCase().includes("confused")) {
            botResponse = "I'm sorry you're feeling that way. Would you like to take a break and come back to this? You can type the word 'restart' when you'd like to come back and start fresh."
        } else if (userMessage.toLowerCase().includes("restart")) {
            setSelectedCategory(null);
            setPrayer(null);
            setAwaitingThoughts(false);
            botResponse = `Which type of prayer would you like to look at?
                    
                        You can choose from:

                        • General Prayers
                        • Morning Prayers
                        • Evening Prayers
                        • Shabbat Blessings
                        • Torah Blessings

                        If you would like to look at another prayer, please type the word 'restart'.`
        } else if (userMessage.toLowerCase().includes("general")) {
            setSelectedCategory("general");
            botResponse = `You've chosen General Prayers. 
            
            Which prayer would you like to learn about? 
            
            I can help you with:

            • Bar'chu 
            • Sh'ma
            • V'ahavta
            • Mi Chamocha
            • Adonai S'fatai
            • Avot v'Imahot
            • G'vurot
            • Aleinu
            • Mourner's Kaddish
            • Chatzi Kaddish
            • Mi Shebeirach`;
        } else if (userMessage.toLowerCase().includes("morning")) {
            setSelectedCategory("morning");
            botResponse = `You've chosen Morning Prayers. 
            
            Which prayer would you like to learn about? 
            
            I can help you with:

            • Modeh Ani
            • Yotzer Or
            • Ahavah Rabbah
            • K'dushah
            • Daily Miracles`;
        } else if (userMessage.toLowerCase().includes("evening")) {
            setSelectedCategory("evening");
            botResponse = `You've chosen Evening Prayers. 
            
            Which prayer would you like to learn about? 
            
            I can help you with:
            
            • Ahavat Olam
            • K'dushah
            • Hashkiveinu
            • Maariv Aravim`;
        } else if (userMessage.toLowerCase().includes("shabbat")) {
            setSelectedCategory("shabbat");
            botResponse = `You've chosen Shabbat Blessings. 
            
            Which prayer would you like to learn about? 
            
            I can help you with:
            
            • Candle Blessing
            • Kiddush
            • Hamotzi
            • L'cha Dodi`;
        } else if (userMessage.toLowerCase().includes("torah")) {
            // Default response about Torah Blessings
            setSelectedCategory("torah");
            botResponse = `You've chosen Torah Blessings. 

            Which prayer would you like to learn about? 

            I can help you with:

            • Blessing Before the Reading of the Torah
            • Blessing After the Reading of the Torah`;
        } else if (generalPrayers[userMessage.toLowerCase()] && selectedCategory === "general") {
            botResponse = generalPrayers[userMessage.toLowerCase()];
            setPrayer(userMessage.toLowerCase());
            botResponse+= "\n What are your thoughts about this prayer?";
            setAwaitingThoughts(true);
        } else if (selectedCategory === "general") {
            botResponse = "That isn't in my general prayers catalog. Please try again.";
        } else if (morningPrayers[userMessage.toLowerCase()] && selectedCategory === "morning") {
            botResponse = morningPrayers[userMessage.toLowerCase()];
            setPrayer(userMessage.toLowerCase());
            botResponse+= "\n What are your thoughts about this prayer?";
            setAwaitingThoughts(true);
        } else if (selectedCategory === "morning") {
            botResponse = "That isn't in my morning prayers catalog. Please try again.";
        } else if (eveningPrayers[userMessage.toLowerCase()] && selectedCategory === "evening") {
            botResponse = eveningPrayers[userMessage.toLowerCase()];
            setPrayer(userMessage.toLowerCase());
            botResponse += "\n What are your thoughts about this prayer?";
            setAwaitingThoughts(true);
        } else if (selectedCategory === "evening") {
            botResponse = "That isn't in my evening prayers catalog. Please try again.";
        } else if (shabbatBlessings[userMessage.toLowerCase()] && selectedCategory === "shabbat") {
            botResponse = shabbatBlessings[userMessage.toLowerCase()];
            setPrayer(userMessage.toLowerCase());
            botResponse += "\n What are your thoughts about this prayer?";
            setAwaitingThoughts(true);
        } else if (selectedCategory === "shabbat") {
            botResponse = "That isn't in my Shabbat blessings catalog. Please try again.";
        } else if (torahBlessings[userMessage.toLowerCase()] && selectedCategory === "torah") {
            botResponse = torahBlessings[userMessage.toLowerCase()];
            setPrayer(userMessage.toLowerCase());
            botResponse += "\n What are your thoughts about this prayer?";
            setAwaitingThoughts(true);
        } else if (selectedCategory === "torah") {
            botResponse = "That isn't in my Torah blessings catalog. Please try again.";
        } else {
            botResponse = "Sorry, I didn't understand that. Please try again.";
        }

        setTimeout(() => {
            setMessages((prevMessages) => [
                ...prevMessages,
                { text: botResponse, sender: 'chatbot' },
            ]);
        }, 1000);
    };

    const getThoughts = (userMessage, prayer) => {
        let thoughtResponse = "";
        setThoughtDone(false);
        
        if (userMessage.toLowerCase().includes("hate") || userMessage.toLowerCase().includes("suck") || userMessage.toLowerCase().includes("don't understand") || userMessage.toLowerCase().includes("confused")) {
            thoughtResponse = "I'm sorry you're feeling frustrated. It's totally normal to hit a bump in the road when learning. Take a deep breath, and when you're ready, type 'restart' to reset. You're doing so well, and progress comes with patience!";
        } else if ((prayer === "bar'chu" || prayer === "bar’chu" || prayer === "bar‘chu") && (userMessage.toLowerCase().includes("beginning") || userMessage.toLowerCase().includes("start"))) {
            thoughtResponse = "Yes, exactly! The Bar'chu marks the beginning of the service—it's fantastic that you're noticing these meaningful moments!";
        } else if ((prayer === "bar'chu" || prayer === "bar’chu" || prayer === "bar‘chu") && userMessage.toLowerCase().includes("bless")) {
            thoughtResponse = "So thoughtful! The Bar'chu is all about blessings and preparing our hearts for prayer. You’re connecting beautifully with the prayer!";
        } else if ((prayer === "sh'ma" || prayer === "sh’ma" || prayer === "sh‘ma") && userMessage.toLowerCase().includes("listen")) {
            thoughtResponse = "Absolutely! Listening deeply is key in the Sh'ma. It’s a reminder to really hear and absorb the message of God's oneness. You’re on a great path!";
        } else if ((prayer === "sh'ma" || prayer === "sh’ma" || prayer === "sh‘ma") && userMessage.toLowerCase().includes("important")) {
            thoughtResponse = "You're spot on! The Sh'ma is a foundational prayer in Judaism, a powerful declaration of faith. Keep diving deeper like this!";
        } else if ((prayer === "v'ahavta" || prayer === "v’ahavta" || prayer === "v‘ahavta") && userMessage.toLowerCase().includes("commandments")) {
            thoughtResponse = "Well done recognizing the importance of commandments! The V'ahavta encourages us to carry God's teachings with us each day. Keep up the great thinking!";
        } else if ((prayer === "v'ahavta" || prayer === "v’ahavta" || prayer === "v‘ahavta") && userMessage.toLowerCase().includes("love")) {
            thoughtResponse = "What a beautiful insight! Loving God with all your heart, soul, and might is at the heart of the V'ahavta. You're thinking deeply, and it’s awesome!";
        } else if (prayer === "mi chamocha" && userMessage.toLowerCase().includes("egypt")) {
            thoughtResponse = "Exactly! The Mi Chamocha celebrates the incredible moment when the Israelites crossed the Red Sea. You’re making wonderful connections!";
        } else if (prayer === "mi chamocha" && userMessage.toLowerCase().includes("like")) {
            thoughtResponse = "Absolutely! There’s no one like Adonai, and this prayer reflects God's incomparable greatness. You’re nailing it!";
        } else if ((prayer === "adonai s'fatai" || prayer === "adonai s’fatai" || prayer === "adonai s‘fatai") && userMessage.toLowerCase().includes("open")) {
            thoughtResponse = "Love this! Opening our lips in prayer invites us to connect with God in a meaningful way. You’re thinking about this so thoughtfully!";
        } else if ((prayer === "adonai s'fatai" || prayer === "adonai s’fatai" || prayer === "adonai s‘fatai") && userMessage.toLowerCase().includes("praise")) {
            thoughtResponse = "Exactly! Praising God is central to this prayer—it sets a positive tone for the rest of the service. Well done!";
        } else if ((prayer === "avot v'imahot" || prayer === "avot" || prayer === "avot v’imahot" || prayer === "avot v‘imahot") && userMessage.toLowerCase().includes("ancestors")) {
            thoughtResponse = "Beautiful insight! This prayer reminds us to honor our ancestors and the faith they passed down. Some people even rise on their toes when saying their names—how cool is that?";
        } else if ((prayer === "g'vurot" || prayer === "g’vurot" || prayer === "g‘vurot") && (userMessage.toLowerCase().includes("power") || userMessage.toLowerCase().includes("strength"))) {
            thoughtResponse = "Yes, exactly! G'vurot celebrates God’s power, not just in physical strength, but in healing, sustaining, and renewal. You're really reflecting deeply!";
        } else if ((prayer === "mourner's kaddish" || prayer === "mourner’s kaddish" || prayer === "mourner‘s kaddish") && userMessage.toLowerCase().includes("peace")) {
            thoughtResponse = "Such a thoughtful reflection! The Mourner's Kaddish emphasizes peace and connection to God in moments of loss. Beautiful insight!";
        } else if ((prayer === "mourner's kaddish" || prayer === "mourner’s kaddish" || prayer === "mourner‘s kaddish") && userMessage.toLowerCase().includes("mourning")) {
            thoughtResponse = "Exactly! While it’s called the Mourner’s Kaddish, it’s actually a prayer of praise rather than mourning. You're diving into this beautifully!";
        } else if (prayer === "aleinu" && userMessage.toLowerCase().includes("sovereignty")) {
            thoughtResponse = "Yes! The Aleinu speaks about God’s sovereignty and our role in acknowledging it. You're really connecting with the prayer!";
        } else if (prayer === "aleinu" && userMessage.toLowerCase().includes("mission")) {
            thoughtResponse = "Great insight! The Aleinu reminds us of our mission to serve God—keep reflecting on this meaningful prayer!";
        } else if (prayer === "chatzi kaddish" && userMessage.toLowerCase().includes("half")) {
            thoughtResponse = "Exactly! The Chatzi Kaddish is a 'half' of the Kaddish, preparing us for the next part of the service. Great attention to detail!";
        } else if (prayer === "mi shebeirach" && userMessage.toLowerCase().includes("recovery")) {
            thoughtResponse = "Such a wonderful thought! The Mi Shebeirach is all about healing and recovery. Next time you say it, maybe think of someone who could use some extra strength!";
        } else if (prayer === "mi shebeirach" && userMessage.toLowerCase().includes("strength")) {
            thoughtResponse = "Exactly! Strength, both physical and emotional, is a key part of this prayer. You’ve made such a beautiful connection!";
        } else if ((prayer === "yotzer" || prayer === "yotzer or") && userMessage.toLowerCase().includes("light")) {
            thoughtResponse = "Yes! The Yotzer is all about light and darkness, and how God’s creation is renewed every day. Such a thoughtful insight!";
        } else if ((prayer === "yotzer" || prayer === "yotzer or") && userMessage.toLowerCase().includes("creation")) {
            thoughtResponse = "Exactly! The Yotzer reflects on how God’s creation unfolds, with light and darkness being renewed daily. Keep up the amazing insights!";
        } else if (prayer === "modeh ani" && userMessage.toLowerCase().includes("gratitude")) {
            thoughtResponse = "Yes! The Modeh Ani is a beautiful prayer of gratitude for another day of life. Keep cultivating that gratitude—it’s so powerful!";
        } else if (prayer === "ahavah rabbah" && userMessage.toLowerCase().includes("wisdom")) {
            thoughtResponse = "Exactly! The Ahavah Rabbah reflects God's great love for us and asks for wisdom to follow the Torah. Keep up your great thinking!";
        } else if ((prayer === "k'dushah" || prayer === "k’dushah" || prayer === "k‘dushah") && (userMessage.toLowerCase().includes("holy") || userMessage.toLowerCase().includes("holiness")) && selectedCategory === "morning") {
            thoughtResponse = "Yes! The K'dushah is a sacred moment in the Amidah where we sanctify God's name, often with words like 'Holy, Holy, Holy.' Such a great prayer to reflect on!";
        } else if ((prayer === "k'dushah" || prayer === "k’dushah" || prayer === "k‘dushah") && (userMessage.toLowerCase().includes("holy") || userMessage.toLowerCase().includes("holiness")) && selectedCategory === "evening") {
            thoughtResponse = "Exactly! The K'dushah is a beautiful moment where we declare God’s holiness. You’re really paying attention to the details!";
        } else if (prayer === "daily miracles" && userMessage.toLowerCase().includes("miracles")) {
            thoughtResponse = "Nice work! The Daily Miracles is a prayer of thanks for the small miracles we experience every day. So meaningful!";
        } else if (prayer === "ahavat olam" && userMessage.toLowerCase().includes("love")) {
            thoughtResponse = "Yes! The Ahavat Olam celebrates God’s boundless love for us and encourages wisdom to follow the Torah. You're making wonderful connections!";
        } else if (prayer === "ahavat olam" && userMessage.toLowerCase().includes("eternal")) {
            thoughtResponse = "Yes! The Ahavat Olam highlights God's eternal love and the importance of passing His teachings to our children. Keep reflecting deeply!";
        } else if ((prayer === "maariv aravim" || prayer === "maariv") && userMessage.toLowerCase().includes("universe")) {
            thoughtResponse = "Yes! The Maariv Aravim speaks about God’s sovereignty over the universe and the transition to night. You're thinking deeply about this prayer!";
        } else if ((prayer === "maariv aravim" || prayer === "maariv") && userMessage.toLowerCase().includes("evening")) {
            thoughtResponse = "Exactly! The Maariv Aravim reflects on God’s control over the evening and night. You're really engaging with this prayer thoughtfully!";
        } else if (prayer === "hashkiveinu" && userMessage.toLowerCase().includes("peace")) {
            thoughtResponse = "Yes! The Hashkiveinu is all about asking God for peace and protection as we rest. Keep up the thoughtful reflections!";
        } else if (prayer === "hashkiveinu" && userMessage.toLowerCase().includes("guard")) {
            thoughtResponse = "Exactly! The Hashkiveinu asks God to guard us while we sleep. You’re diving into this prayer with such care!";
        } else if (prayer === "kiddush" && (userMessage.toLowerCase().includes("wine") || userMessage.toLowerCase().includes("grape") || userMessage.toLowerCase().includes("juice") || userMessage.toLowerCase().includes("bless"))) {
            thoughtResponse = "Nice insight! The Kiddush is the prayer where we bless the wine (or grape juice) to celebrate the Sabbath. Keep it up!";
        } else if ((prayer === "l'cha dodi" || prayer === "l’cha dodi" || prayer === "l‘cha dodi") && (userMessage.toLowerCase().includes("shabbat") || userMessage.toLowerCase().includes("sabbath") || userMessage.toLowerCase().includes("welcome"))) {
            thoughtResponse = "Great connection! The L'cha Dodi welcomes the Sabbath and invites the ’Sabbath Bride.’ You're really engaging with the prayer beautifully!";
        } else if (prayer === "hamotzi" && (userMessage.toLowerCase().includes("challah") || userMessage.toLowerCase().includes("sabbath") || userMessage.toLowerCase().includes("bread") || userMessage.toLowerCase().includes("bless"))) {
            thoughtResponse = "Yes! The Hamotzi is a prayer of blessing for the challah bread, especially on Shabbat. Keep those insightful thoughts coming!";
        } else if ((prayer === "candle" || prayer === "candles") && (userMessage.toLowerCase().includes("light") || userMessage.toLowerCase().includes("candle"))) {
            thoughtResponse = "Nice job! The candle blessing honors the commandment to kindle the light of Shabbat. You're making great observations!";
        } else if (prayer === "before" && userMessage.toLowerCase().includes("before")) {
            thoughtResponse = "Beautiful! The Blessing Before the Torah is a moment of gratitude for the Torah, our source of wisdom and light!";
        } else if (prayer === "after" && userMessage.toLowerCase().includes("after")) {
            thoughtResponse = "Well done! The Blessing After the Torah reflects our thanks for the wisdom it brings. Keep thinking deeply!";
        } else if ((prayer === "bar'chu" || prayer === "bar'chu" || prayer === "bar'chu") && userMessage.toLowerCase().includes("ready")) {
            thoughtResponse = "Perfect insight! The Bar'chu is all about asking ourselves if we're ready to pray. You're really tuning into the deeper meaning here!";
        } else if ((prayer === "sh'ma" || prayer === "sh'ma" || prayer === "sh'ma") && userMessage.toLowerCase().includes("one")) {
            thoughtResponse = "Yes! The declaration that 'Adonai is One' (Adonai Echad) is the heart of the Sh'ma. You've captured the essence of this prayer beautifully!";
        } else if ((prayer === "v'ahavta" || prayer === "v'ahavta" || prayer === "v'ahavta") && userMessage.toLowerCase().includes("mezuzah")) {
            thoughtResponse = "Awesome connection! The V'ahavta is why we have mezuzahs on our doorposts. You're linking the prayer to real-life practice—that's fantastic!";
        } else if ((prayer === "v'ahavta" || prayer === "v'ahavta" || prayer === "v'ahavta") && userMessage.toLowerCase().includes("heart")) {
            thoughtResponse = "Beautiful! Loving God with all your heart is such a powerful part of this prayer. You're really connecting with the emotional depth here!";
        } else if (prayer === "mi chamocha" && userMessage.toLowerCase().includes("praise")) {
            thoughtResponse = "Exactly! This prayer is all about praising God for the miraculous things He does. You're getting it!";
        } else if (prayer === "mi chamocha" && (userMessage.toLowerCase().includes("sea") || userMessage.toLowerCase().includes("red sea"))) {
            thoughtResponse = "Yes! The Mi Chamocha celebrates that incredible moment at the Red Sea. What a powerful image to remember!";
        } else if ((prayer === "avot v'imahot" || prayer === "avot" || prayer === "avot v'imahot" || prayer === "avot v'imahot") && (userMessage.toLowerCase().includes("mothers") || userMessage.toLowerCase().includes("fathers"))) {
            thoughtResponse = "Great observation! Recognizing both our fathers and mothers—Abraham, Isaac, Jacob, Sarah, Rebecca, Rachel, and Leah—makes this prayer so inclusive and meaningful!";
        } else if ((prayer === "g'vurot" || prayer === "g'vurot" || prayer === "g'vurot") && (userMessage.toLowerCase().includes("heal") || userMessage.toLowerCase().includes("healing"))) {
            thoughtResponse = "Perfect! G'vurot celebrates God's power to heal the sick. It's a reminder that true strength includes compassion and care. Beautiful insight!";
        } else if ((prayer === "g'vurot" || prayer === "g'vurot" || prayer === "g'vurot") && userMessage.toLowerCase().includes("rain")) {
            thoughtResponse = "Nice catch! The mention of rain in G'vurot reminds us that God provides for our physical needs too. You're paying great attention to detail!";
        } else if ((prayer === "mourner's kaddish" || prayer === "mourner's kaddish" || prayer === "mourner's kaddish") && userMessage.toLowerCase().includes("memory")) {
            thoughtResponse = "Such a thoughtful reflection! Reciting the Kaddish in memory of loved ones is a beautiful way to honor them. You understand the heart of this prayer!";
        } else if (prayer === "aleinu" && (userMessage.toLowerCase().includes("end") || userMessage.toLowerCase().includes("conclusion"))) {
            thoughtResponse = "Yes! The Aleinu comes at the end of services, wrapping things up with a powerful message. It's like the grand finale!";
        } else if (prayer === "chatzi kaddish" && userMessage.toLowerCase().includes("transition")) {
            thoughtResponse = "Great thinking! The Chatzi Kaddish helps transition between different parts of the service. You're really understanding the structure!";
        } else if (prayer === "mi shebeirach" && (userMessage.toLowerCase().includes("healing") || userMessage.toLowerCase().includes("sick"))) {
            thoughtResponse = "Exactly! The Mi Shebeirach is our prayer for those who need healing and strength. Such a compassionate prayer to reflect on!";
        } else if (prayer === "modeh ani" && (userMessage.toLowerCase().includes("wake") || userMessage.toLowerCase().includes("morning") || userMessage.toLowerCase().includes("first"))) {
            thoughtResponse = "Perfect! The Modeh Ani is the very first thing we say when we wake up—starting the day with gratitude. What a beautiful practice!";
        } else if (prayer === "ahavah rabbah" && (userMessage.toLowerCase().includes("love") || userMessage.toLowerCase().includes("torah"))) {
            thoughtResponse = "Yes! This prayer beautifully connects God's love for us with the gift of Torah. You're making wonderful connections!";
        } else if ((prayer === "k'dushah" || prayer === "k'dushah" || prayer === "k'dushah") && userMessage.toLowerCase().includes("kadosh")) {
            thoughtResponse = "Excellent! 'Kadosh' means 'holy,' and saying it three times in the K'dushah really emphasizes God's holiness. You're diving into the Hebrew beautifully!";
        } else if ((prayer === "k'dushah" || prayer === "k'dushah" || prayer === "k'dushah") && userMessage.toLowerCase().includes("stand")) {
            thoughtResponse = "Great observation! The K'dushah is part of the Amidah, which we say while standing. You're noticing the important details!";
        } else if (prayer === "daily miracles" && (userMessage.toLowerCase().includes("everyday") || userMessage.toLowerCase().includes("small"))) {
            thoughtResponse = "Beautiful insight! The Daily Miracles prayer helps us appreciate the small, everyday blessings we often take for granted. Keep cultivating that awareness!";
        } else if (prayer === "ahavat olam" && userMessage.toLowerCase().includes("children")) {
            thoughtResponse = "Wonderful connection! The Ahavat Olam reminds us to teach our children about God's ways. Passing down tradition is so important!";
        } else if (prayer === "hashkiveinu" && (userMessage.toLowerCase().includes("protection") || userMessage.toLowerCase().includes("safe") || userMessage.toLowerCase().includes("sleep"))) {
            thoughtResponse = "Perfect! The Hashkiveinu asks God to keep us safe while we sleep. It's like a spiritual goodnight prayer!";
        } else if ((prayer === "maariv aravim" || prayer === "maariv") && (userMessage.toLowerCase().includes("night") || userMessage.toLowerCase().includes("darkness"))) {
            thoughtResponse = "Yes! The Maariv Aravim acknowledges God's role in bringing the evening and night. You're really connecting with the rhythm of the day!";
        } else if (prayer === "kiddush" && (userMessage.toLowerCase().includes("creation") || userMessage.toLowerCase().includes("rest") || userMessage.toLowerCase().includes("seventh"))) {
            thoughtResponse = "Excellent! The Kiddush celebrates God's creation and rest on the seventh day. You're understanding the deeper meaning of Shabbat!";
        } else if ((prayer === "l'cha dodi" || prayer === "l'cha dodi" || prayer === "l'cha dodi") && (userMessage.toLowerCase().includes("bride") || userMessage.toLowerCase().includes("queen"))) {
            thoughtResponse = "Beautiful! The image of the Sabbath Bride or Queen makes Shabbat feel like a special guest we're welcoming. Love that you picked up on this poetic element!";
        } else if ((prayer === "candle" || prayer === "candles") && (userMessage.toLowerCase().includes("commandment") || userMessage.toLowerCase().includes("mitzvah"))) {
            thoughtResponse = "Exactly! Lighting the Shabbat candles is one of the commandments (mitzvot) that makes Shabbat special. You're making great connections!";
        } else if (prayer === "hamotzi" && userMessage.toLowerCase().includes("earth")) {
            thoughtResponse = "Nice! The Hamotzi thanks God 'who brings forth bread from the earth.' You're paying attention to the beautiful imagery in the prayer!";
        } else if (prayer === "before" && (userMessage.toLowerCase().includes("chosen") || userMessage.toLowerCase().includes("guidebook"))) {
            thoughtResponse = "Perfect insight! The Torah is indeed our ultimate guidebook, and this blessing acknowledges that special gift. Well done!";
        } else if (prayer === "after" && (userMessage.toLowerCase().includes("truth") || userMessage.toLowerCase().includes("everlasting"))) {
            thoughtResponse = "Excellent! The blessing speaks of 'Torah of truth' and 'everlasting life'—such powerful concepts. You're really engaging with the depth here!";
        }

        // Additional general reactions (more coverage)
        else if (userMessage.toLowerCase().includes("nice") || userMessage.toLowerCase().includes("lovely") || userMessage.toLowerCase().includes("pretty")) {
            thoughtResponse = "I'm glad you think so — it's wonderful when a prayer lands with someone. Noticing what's 'nice' about it shows real sensitivity to meaning and feeling!";
        } else if (userMessage.toLowerCase().includes("favorite") || userMessage.toLowerCase().includes("my favorite") || userMessage.toLowerCase().includes("fav")) {
            thoughtResponse = "That's lovely — having a favorite prayer makes it personal and memorable. What about it speaks to you most?";
        } else if (userMessage.toLowerCase().includes("calm") || userMessage.toLowerCase().includes("calming") || userMessage.toLowerCase().includes("soothing") || userMessage.toLowerCase().includes("comforting") || userMessage.toLowerCase().includes("peaceful")) {
            thoughtResponse = "I love that you find it calming — many people use prayer as a way to center themselves. It's a beautiful personal response and very meaningful!";
        } else if (userMessage.toLowerCase().includes("inspiring") || userMessage.toLowerCase().includes("inspire") || userMessage.toLowerCase().includes("uplifting") || userMessage.toLowerCase().includes("uplift") || userMessage.toLowerCase().includes("powerful")) {
            thoughtResponse = "Yes — prayers can be really inspiring and give us new energy or perspective. I'm glad this one lifts you up!";
        } else if (userMessage.toLowerCase().includes("melody") || userMessage.toLowerCase().includes("tune") || userMessage.toLowerCase().includes("chant")) {
            thoughtResponse = "The melody can make a prayer feel extra special — it helps the words stick and the feeling deepen. Which part of the tune do you like?";
        } else if (userMessage.toLowerCase().includes("nostalgic") || userMessage.toLowerCase().includes("reminds me of") || userMessage.toLowerCase().includes("remind")) {
            thoughtResponse = "Such a meaningful reaction — when a prayer brings memories or connections to mind, it becomes part of your story. Thanks for sharing that memory!";
        } else if (userMessage.toLowerCase().includes("community") || userMessage.toLowerCase().includes("together") || userMessage.toLowerCase().includes("family") || userMessage.toLowerCase().includes("friends")) {
            thoughtResponse = "Prayers often connect us to community and the people we love. It's wonderful that it makes you think of those relationships.";
        } else if (userMessage.toLowerCase().includes("comfort") || userMessage.toLowerCase().includes("helps me") || userMessage.toLowerCase().includes("gets me through") || userMessage.toLowerCase().includes("helps")) {
            thoughtResponse = "I'm glad it brings comfort — many people find strength in these words during tough times. That's a really important role for prayer to play.";
        }

        // More prayer-specific small touches
        else if ((prayer === "sh'ma" || prayer === "sh’ma" || prayer === "sh‘ma") && (userMessage.toLowerCase().includes("faith") || userMessage.toLowerCase().includes("belief"))) {
            thoughtResponse = "Absolutely — the Sh'ma is often called the declaration of faith; it's central to Jewish belief and identity. You're touching on something core!";
        } else if ((prayer === "mourner's kaddish" || prayer === "mourner’s kaddish" || prayer === "mourner‘s kaddish") && (userMessage.toLowerCase().includes("honor") || userMessage.toLowerCase().includes("remember") || userMessage.toLowerCase().includes("memory"))) {
            thoughtResponse = "Yes — saying Kaddish in memory of someone is a loving way to honor them. It keeps their memory alive in community.";
        } else if ((prayer === "kiddush") && (userMessage.toLowerCase().includes("cheers") || userMessage.toLowerCase().includes("drink") || userMessage.toLowerCase().includes("wine"))) {
            thoughtResponse = "Cheers! The Kiddush sanctifies the Shabbat over a cup of wine (or grape juice) — a small ritual that signals celebration and rest.";
        } else if (prayer === "hamotzi" && (userMessage.toLowerCase().includes("bless") || userMessage.toLowerCase().includes("food") || userMessage.toLowerCase().includes("grateful"))) {
            thoughtResponse = "Exactly — the Hamotzi is about blessing the bread and recognizing the sustenance we receive. Gratitude for food is a lovely thing to notice!";
        } else if ((prayer === "l'cha dodi" || prayer === "l’cha dodi" || prayer === "l‘cha dodi") && (userMessage.toLowerCase().includes("sing") || userMessage.toLowerCase().includes("dance") || userMessage.toLowerCase().includes("invite"))) {
            thoughtResponse = "L'cha Dodi has such warm, inviting language — it's practically designed to be sung. Glad you picked up on that joyful spirit!";
        } else if ((prayer === "k'dushah" || prayer === "k’dushah" || prayer === "k‘dushah") && userMessage.toLowerCase().includes("holy")) {
            thoughtResponse = "Saying 'Kadosh' (holy) three times is powerful — it creates a moment of awe. Nice attention to the Hebrew and its impact!";
        }

        else {
            thoughtResponse = "Thank you for sharing your thoughts! I really appreciate hearing your insights!";
        }

        thoughtResponse += "\nWould you like to try another prayer?";
        return thoughtResponse;
    };    

    const restartOrEnd = (userMessage) => {
        let chatbotResponse = "";
        if(thoughtDone && (userMessage.toLowerCase().includes("yes") || userMessage.toLowerCase().includes("yeah") || userMessage.toLowerCase().includes("sure") || userMessage.toLowerCase().includes("ok") || userMessage.toLowerCase().includes("yep"))) {
            setSelectedCategory(null);
            setPrayer(null);
            setAwaitingThoughts(false);
            setConversationOver(false);
            chatbotResponse = `Which type of prayer would you like to look at?
                    
                        You can choose from:

                        • General Prayers
                        • Morning Prayers
                        • Evening Prayers
                        • Shabbat Blessings
                        • Torah Blessings

                        If you would like to look at another prayer, please type the word 'restart'.`
        } else if (thoughtDone && (userMessage.toLowerCase().includes("no") || userMessage.toLowerCase().includes("nope") || userMessage.toLowerCase().includes("nah"))) {
            chatbotResponse = "Thanks for learning with me! See you next time!"
            setConversationOver(true);
        }
        return chatbotResponse;
    }

    return (
        <div className="chat-container">
            <div className="chat-box">
                {messages.map((message, index) => (
                    <div
                        key={index}
                        className={`chat-message ${message.sender}-message`}
                    >
                        {message.text}
                    </div>
                ))}
            </div>
            <form onSubmit={handleInput} className="input-container">
                <input
                    type="text"
                    className="chat-input"
                    placeholder={conversationOver ? "This chat has ended. Please restart the page to start a new conversation." : "Ask me about a prayer..."}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    disabled={conversationOver}
                />
                <button type="submit" className="send-btn">Send</button>
            </form>
        </div>
    );
}

export default Chatbot;