const generalPrayers = {
    "Bar'chu": "This prayer opens up the service. We ask ourselves if we're ready to pray and if we're ready to be blessed. In fact, the word 'Bar'chu' means 'to bless' in Hebrew. So, are you ready to receive that blessing?",
    "Sh'ma": "This is one of the most important prayers in Judaism. In this prayer, we tell the people of Israel to listen to us, and to remember that God is one (Adonai Echad). The word 'Sh'ma' means 'to listen' in Hebrew. Think of it as the ultimate call to 'tune in'!",
    "V'ahavta": "This prayer instructs us to follow God's commandments. Some of the commandments we see in this prayer are to 'love Adonai with all your heart and with all your soul'. We also see commandments to 'inscribe them on the doorposts of your house and on your gates'. You've probably done this before, with a mezuzah! If you haven't, maybe it's time to get one and give your door some spiritual flair!",
    "Mi Chamocha": "This is the prayer the Israelites sang as they left Egypt and crossed the split Red Sea. In this prayer, we praise God for everything He does, asking, 'Who else is like you, O God?' The word 'Mi' means 'who' in Hebrew, so you can probably guess what 'Chamocha' means! Spoiler alert: It's 'like you'!",
    "Adonai S'fatai": "This begins the 'Amidah' (which means 'standing') section of the service. In this prayer, we ask God to 'open our lips' so that we can praise Him in the upcoming prayers. So, are your lips ready to sing God's praises?",
    "Avot V'Imahot": "This prayer means 'fathers and mothers,' and talks about our ancestors, including Abraham, Isaac, Jacob, Sarah, Rebecca, Rachel, and Leah. It's like saying 'hey, thanks, ancestors!' and acknowledging their role in the Jewish story.",
    "Kaddish": "The Kaddish is a prayer of praise to God and is traditionally recited in memory of the deceased. It praises God's greatness and expresses a hope for peace and redemption. It's like sending a message of peace to heaven.",
    "Aleinu": "This prayer reflects on God's sovereignty and calls for the ultimate recognition of God's oneness. It's recited at the conclusion of services, reminding us of our mission to serve God. It's like a spiritual mic drop at the end of the service.",
    "V'kabel": "A prayer of acceptance and affirmation of God's will. It is often recited when Jews gather for communal prayers, calling for the renewal of the covenant between God and Israel. It's like saying 'let's keep the faith, together.'",
    "Tefilat HaDerech": "This is the prayer for travelers. In it, we ask God for protection and a safe journey, trusting that He will guide and watch over us. It's like asking for a spiritual GPS on your travels."
};

const morningPrayers = {
    "Yotzer Or": "This prayer talks about God's creation of light and darkness, and how God's creation is renewed every day. It's like saying, 'Good morning, world!' to the universe.",
    "Modeh Ani": "This prayer is said upon waking up. It is a simple but powerful way to thank God for restoring our soul, and for another day of life. Think of it as a gratitude reminder right when you wake up.",
    "Ahavat Olam": "This prayer, recited during the morning service, speaks of God’s eternal love for us and His command to teach our children about His ways. It's like a reminder that love is eternal, especially in the morning!",
    "Birkat Hashachar": "A series of blessings that acknowledge the morning, thanking God for the various aspects of our daily lives, such as the ability to see, walk, and function. It's like a checklist of gratitude!",
    "Asher Yatzar": "This prayer expresses gratitude for the way the human body functions and asks for continued health. It is traditionally recited after using the restroom. Definitely a blessing we don't always think about until we need it!",
    "Hashkiveinu": "A prayer asking God to protect us from harm as we go about our day. It’s like asking God to be your personal bodyguard throughout the day."
};

const nighttimePrayers = {
    "Sh'ma Al HaMitah": "This is the prayer said before going to sleep. It is a short version of the Sh'ma, reminding us of God's oneness and asking for His protection as we sleep. It's like a bedtime 'goodnight' to God!",
    "Bedtime Shema": "Said before sleep, this prayer expresses our trust in God to watch over us throughout the night, ensuring our safety and peace. It's like sending a nightly text to God: 'Good night, please protect me!'",
    "Hashkiveinu (Night)": "The nighttime version of the morning prayer. It asks God to shelter us under His wings, protect us from evil, and grant peace to our souls while we sleep. It's like curling up under God's wings for a peaceful night.",
    "Tefilat HaLev": "This prayer is recited before sleep, asking God to guard our hearts and minds, keeping us safe and at peace through the night. Think of it as a spiritual 'do not disturb' sign for your soul.",
    "Maariv Aravim": "This prayer is recited in the evening service, recognizing God's sovereignty over the universe and His role in bringing the evening and night upon us. It's like saying, 'God, you’ve got the night shift covered!'",
    "Alenu (Night)": "A version of the Aleinu prayer for the night, recited at the end of the day, reinforcing God's sovereignty and our devotion to serving Him, particularly as we end our day. It's like a nightcap for your soul!"
};

const specialPrayers = {
    "G'vurot": "The G'vurot prayer speaks of God's might and power, describing His ability to heal, forgive, and give life. It is part of the Amidah and emphasizes God's control over life and death. A reminder that God’s strength is always by our side.",
    "Daily Blessings": {
        "Blessing for Bread": "Blessed are You, Lord our God, King of the Universe, who brings forth bread from the earth. It's like saying, 'thanks for the carbs!'",
        "Blessing for Wine": "Blessed are You, Lord our God, King of the Universe, who creates the fruit of the vine. Whether it's grape juice or wine, this one's for the blessings in the glass!",
        "Blessing for Fruits": "Blessed are You, Lord our God, King of the Universe, who creates the fruit of the tree. A little 'thanks for the snacks' moment in the day."
    },
    "Shabbat Blessings": {
        "Kiddush": "This is the blessing recited over wine or grape juice to sanctify the Shabbat. It celebrates the creation of the world and God's rest on the seventh day. Cheers to Shabbat!",
        "Lecha Dodi": "This song welcomes the Shabbat, inviting the 'Sabbath Bride' to come and join in the celebration of rest and holiness. It's like saying, 'Shabbat, you’re invited to the party!'",
        "Blessing for Lighting Candles": "Blessed are You, Lord our God, King of the Universe, who has sanctified us with His commandments, and commanded us to kindle the light of the Shabbat. A little light, a lot of holiness.",
        "Hamotzi": "This is the blessing recited before eating bread, particularly on Shabbat. It thanks God for providing sustenance, saying, 'Blessed are You, Lord our God, King of the Universe, who brings forth bread from the earth.' Bread and blessings – what could be better?"
    },
    "Chatzi Kaddish": "The Chatzi Kaddish is a prayer recited between sections of the service, particularly before the Torah reading, calling for peace and praising God. It's like a peaceful pause in the middle of the service.",
    "Torah Blessings": {
        "Before Torah Reading": "Blessed are You, Lord our God, King of the Universe, who has chosen us from all peoples and given us the Torah. It's like saying, 'thank you for giving us the ultimate guidebook!'",
        "After Torah Reading": "Blessed are You, Lord our God, King of the Universe, who gave us the Torah of truth, and implanted everlasting life within us. Blessed are You, Lord, giver of the Torah. A spiritual 'thank you' for the wisdom we’ve just received."
    },
    "Mi Shebeirach": "This prayer is traditionally said for those in need of healing, asking God to grant them a full recovery and strength. It's like a big spiritual 'get well soon' card."
};

