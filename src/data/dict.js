// ============================================================================
// DICTIONARY
//
// kind:  "sg"    — Singapore / local Chinese usage (the words zbschools misses)
//        "idiom" — 成语 / 惯用语 (incl. multi-clause ones that span a comma)
//        "name"  — proper noun
//        "word"  — ordinary multi-character word
//        "char"  — single character
//
// senses: ordered list of meanings. Client wants numbered 翻译 with BOTH the
//         English gloss and the Chinese gloss, like zbschools.
// ex:     example sentences. Reference site shows up to ~20; we show all we have.
// syn:    近义词 — near-synonyms. Each { w, py, en }, and `note` where the
//         distinction matters (近义词辨析), because "similar" is not "same".
// ant:    反义词 — antonyms, same shape.
// rel:    相关词 — related vocabulary (used where a word has no true synonym,
//         e.g. food nouns: 沙爹 has no synonym, but 烤鸡翅/肉干 are its neighbours).
// trad:   only present when it differs from the simplified form.
//
// PRODUCTION: back this with CC-CEDICT (~120k) + a curated Singapore-Chinese
// overlay (新加坡华语词汇) + a 成语 table, served from Postgres/IndexedDB.
// The overlay is the differentiator — CC-CEDICT alone does NOT have 菜头粿.
// ============================================================================

export const DICT = {
  // ══════════════════════════════════════════════════════════════════
  // ★ SINGAPORE CHINESE — the words the incumbent site gets wrong
  // ══════════════════════════════════════════════════════════════════
  "沙爹": {
    py: "shā diē", kind: "sg",
    senses: [
      { en: "satay — skewered meat grilled over charcoal, served with peanut sauce", zh: "串起来烤的肉串，蘸花生酱吃的本地美食" },
    ],
    syn: [
      { w: "沙嗲", py: "shā diā", en: "satay (alternative written form)", note: "同一个马来语 sate 的另一种音译写法，两种都通行。" },
    ],
    rel: [
      { w: "烤鸡翅", py: "kǎo jī chì", en: "grilled chicken wings" },
      { w: "肉串", py: "ròu chuàn", en: "meat skewer" },
      { w: "花生酱", py: "huā shēng jiàng", en: "peanut sauce / peanut butter" },
      { w: "烧烤", py: "shāo kǎo", en: "barbecue" },
      { w: "老巴刹", py: "lǎo bā shā", en: "Lau Pa Sat" },
    ],
    ex: [
      { zh: "我给理查德介绍了新加坡版的烧烤：沙爹和烤鸡翅。", py: "Wǒ gěi Lǐchádé jièshào le Xīnjiāpō bǎn de shāokǎo: shādiē hé kǎo jīchì.", en: "I introduced Richard to the Singapore version of barbecue: satay and grilled chicken wings." },
      { zh: "老巴刹的沙爹街到了晚上才开档。", py: "Lǎo Bāshā de shādiē jiē dào le wǎnshang cái kāi dàng.", en: "The satay street at Lau Pa Sat only opens for business at night." },
      { zh: "这家的沙爹酱特别香。", py: "Zhè jiā de shādiē jiàng tèbié xiāng.", en: "This stall's satay sauce is especially fragrant." },
      { zh: "沙爹要蘸花生酱才好吃。", py: "Shādiē yào zhàn huāshēngjiàng cái hǎochī.", en: "Satay only tastes right dipped in peanut sauce." },
      { zh: "他一个人吃了二十串沙爹。", py: "Tā yī gè rén chī le èrshí chuàn shādiē.", en: "He ate twenty sticks of satay by himself." },
      { zh: "沙爹是马来同胞的传统美食。", py: "Shādiē shì Mǎlái tóngbāo de chuántǒng měishí.", en: "Satay is a traditional food of our Malay community." },
      { zh: "烤沙爹的炭火香味飘得很远。", py: "Kǎo shādiē de tànhuǒ xiāngwèi piāo de hěn yuǎn.", en: "The charcoal aroma of grilling satay carries a long way." },
      { zh: "请给我十串鸡肉沙爹。", py: "Qǐng gěi wǒ shí chuàn jīròu shādiē.", en: "Ten sticks of chicken satay, please." },
    ],
    note: "马来语 sate 的音译。中国大陆的词典多半查不到这个词 —— 参考网站正是在这里把它拆成「沙」＋「爹」。",
  },
  "菜头粿": {
    py: "cài tóu guǒ", kind: "sg",
    senses: [
      { en: "fried radish cake (chai tow kway) — steamed radish cake cut up and fried with egg and preserved turnip", zh: "萝卜糕切块后和蛋、菜脯一起炒的本地小吃" },
    ],
    ex: [
      { zh: "桌上有沙爹、烤鸡翅、福建炒虾面和“鸳鸯”菜头粿。", py: "Zhuō shàng yǒu shādiē, kǎo jīchì, Fújiàn chǎo xiā miàn hé “yuānyāng” càitóuguǒ.", en: "On the table were satay, grilled chicken wings, Hokkien prawn mee and “yuanyang” fried radish cake." },
      { zh: "菜头粿有黑的也有白的。", py: "Càitóuguǒ yǒu hēi de yě yǒu bái de.", en: "Fried radish cake comes in a black version and a white version." },
    ],
    note: "潮州话借词。“粿”是米制糕点；“菜头”是萝卜。",
  },
  "老巴刹": {
    py: "Lǎo Bā shā", kind: "sg",
    senses: [
      { en: "Lau Pa Sat — the historic Telok Ayer market in Singapore's CBD, now a hawker centre", zh: "新加坡中央商业区的历史建筑，现为著名小贩中心" },
    ],
    ex: [
      { zh: "陈振声带马尔斯到老巴刹吃夜宵。", py: "Chén Zhènshēng dài Mǎ'ěrsī dào Lǎo Bāshā chī yèxiāo.", en: "Chan Chun Sing took Marles to Lau Pa Sat for a late-night supper." },
      { zh: "去年黄循财总理曾带马克龙到老巴刹吃本地美食。", py: "Qùnián Huáng Xúncái zǒnglǐ céng dài Mǎkèlóng dào Lǎo Bāshā chī běndì měishí.", en: "Last year PM Lawrence Wong took Macron to Lau Pa Sat for local food." },
    ],
    note: "“巴刹”来自马来语 pasar（市场）。",
  },
  "巴刹": {
    py: "bā shā", kind: "sg",
    senses: [
      { en: "market; wet market", zh: "菜市场" },
    ],
    ex: [
      { zh: "妈妈每天早上都去巴刹买菜。", py: "Māma měitiān zǎoshang dōu qù bāshā mǎi cài.", en: "Mum goes to the wet market every morning to buy groceries." },
    ],
    note: "马来语 pasar 的音译，中国大陆一般说“菜市场”。",
  },
  "福建炒虾面": {
    py: "Fú jiàn chǎo xiā miàn", kind: "sg",
    senses: [
      { en: "Hokkien prawn mee — noodles fried in a rich prawn-and-pork stock", zh: "用虾汤和猪骨汤炒的面，本地经典小吃" },
    ],
    ex: [
      { zh: "福建炒虾面要配上参巴辣椒才够味。", py: "Fújiàn chǎo xiā miàn yào pèi shàng sānbā làjiāo cái gòu wèi.", en: "Hokkien prawn mee needs sambal chilli to really taste right." },
    ],
  },
  "斑兰": {
    py: "bān lán", kind: "sg",
    senses: [
      { en: "pandan — a fragrant screwpine leaf used in Southeast Asian cooking", zh: "东南亚常用的香料植物，叶子有香味" },
    ],
    ex: [
      { zh: "视频里还出现了斑兰蛋糕。", py: "Shìpín lǐ hái chūxiàn le bānlán dàngāo.", en: "A pandan cake also appeared in the video." },
    ],
    note: "马来语 pandan 的音译。",
  },
  "斑兰蛋糕": {
    py: "bān lán dàn gāo", kind: "sg",
    senses: [
      { en: "pandan chiffon cake — a light green sponge cake flavoured with pandan", zh: "用斑兰叶调味的淡绿色戚风蛋糕" },
    ],
    ex: [
      { zh: "斑兰蛋糕是很受欢迎的伴手礼。", py: "Bānlán dàngāo shì hěn shòu huānyíng de bànshǒulǐ.", en: "Pandan cake is a very popular gift to bring home." },
    ],
  },
  "肉干": {
    py: "ròu gān", kind: "sg",
    senses: [
      { en: "bak kwa — sweet barbecued meat jerky, eaten especially at Chinese New Year", zh: "烤过的甜味肉片，华人农历新年的应节食品" },
    ],
    ex: [
      { zh: "陆军总长蔡德贤也曾用鸡肉肉干和外国军官破冰。", py: "Lùjūn zǒngzhǎng Cài Déxián yě céng yòng jīròu ròugān hé wàiguó jūnguān pòbīng.", en: "The Chief of Army, Chua Teck Hian, has also used chicken bak kwa to break the ice with foreign officers." },
      { zh: "新年前买肉干要排很长的队。", py: "Xīnnián qián mǎi ròugān yào pái hěn cháng de duì.", en: "You have to queue for a long time to buy bak kwa before New Year." },
    ],
  },
  "巴士": {
    py: "bā shì", kind: "sg",
    senses: [
      { en: "bus", zh: "公共汽车" },
    ],
    ex: [
      { zh: "下班时，我赶着搭巴士回家。", py: "Xiàbān shí, wǒ gǎn zhe dā bāshì huí jiā.", en: "After work, I rushed to catch the bus home." },
    ],
    note: "新加坡、香港用语；中国大陆一般说“公交车”或“公共汽车”。",
  },
  "夜宵": {
    py: "yè xiāo", kind: "word", trad: "夜宵",
    senses: [{ en: "late-night snack; supper", zh: "晚上吃的点心或饭" }],
    ex: [{ zh: "这顿夜宵不只是吃东西。", py: "Zhè dùn yèxiāo bù zhǐshì chī dōngxi.", en: "This supper was not only about eating." }],
  },
  "小吃": {
    py: "xiǎo chī", kind: "word",
    senses: [
      { en: "snack; street food; a light local dish", zh: "分量小、价钱便宜的地方风味食品" },
      { en: "cold dish served as an appetiser", zh: "饭馆里的冷盘" },
    ],
    ex: [
      { zh: "外交不一定要山珍海味，小吃也能立大功。", py: "Wàijiāo bù yīdìng yào shānzhēn-hǎiwèi, xiǎochī yě néng lì dà gōng.", en: "Diplomacy doesn't need lavish delicacies — street food can do great work too." },
      { zh: "这样的小吃场面没有国宴那么正式。", py: "Zhèyàng de xiǎochī chǎngmiàn méiyǒu guóyàn nàme zhèngshì.", en: "A street-food setting like this isn't as formal as a state banquet." },
    ],
  },
  "美食": {
    py: "měi shí", kind: "word",
    senses: [{ en: "fine food; delicious food; cuisine", zh: "好吃的食物" }],
    ex: [{ zh: "让他更为了解新加坡这个美食天堂的魅力。", py: "Ràng tā gèng wéi liǎojiě Xīnjiāpō zhège měishí tiāntáng de mèilì.", en: "So he could better appreciate the charm of Singapore, this food paradise." }],
  },
  "美食天堂": {
    py: "měi shí tiān táng", kind: "word",
    senses: [{ en: "food paradise; a food lover's heaven", zh: "美食非常丰富的地方" }],
    ex: [{ zh: "新加坡被称为美食天堂。", py: "Xīnjiāpō bèi chēngwéi měishí tiāntáng.", en: "Singapore is known as a food paradise." }],
  },
  "鸳鸯": {
    py: "yuān yāng", kind: "word", trad: "鴛鴦",
    senses: [
      { en: "mandarin ducks", zh: "一种水鸟，常成双成对" },
      { en: "a devoted couple (figurative)", zh: "比喻恩爱的夫妻或情侣" },
      { en: "a pairing of two contrasting things served together (local F&B usage, e.g. coffee-tea, or black-and-white radish cake)", zh: "本地餐饮用语：两种东西合在一起，如咖啡加茶、黑白菜头粿" },
    ],
    ex: [
      { zh: "桌上有“鸳鸯”菜头粿。", py: "Zhuō shàng yǒu “yuānyāng” càitóuguǒ.", en: "On the table was “yuanyang” radish cake — the black and white versions together." },
      { zh: "我要一杯鸳鸯，半咖啡半茶。", py: "Wǒ yào yī bēi yuānyāng, bàn kāfēi bàn chá.", en: "I'd like a yuanyang — half coffee, half tea." },
    ],
  },
  "烤鸡翅": {
    py: "kǎo jī chì", kind: "word", trad: "烤雞翅",
    senses: [{ en: "grilled chicken wings", zh: "烤过的鸡翅膀" }],
    ex: [{ zh: "沙爹和烤鸡翅是老巴刹的招牌。", py: "Shādiē hé kǎo jīchì shì Lǎo Bāshā de zhāopái.", en: "Satay and grilled chicken wings are Lau Pa Sat's signature dishes." }],
  },
  "葡式蛋挞": {
    py: "pú shì dàn tà", kind: "word", trad: "葡式蛋撻",
    senses: [{ en: "Portuguese egg tart", zh: "葡萄牙式的蛋挞" }],
    ex: [{ zh: "他也尝了葡式蛋挞。", py: "Tā yě cháng le pú shì dàntà.", en: "He also tried the Portuguese egg tarts." }],
  },
  "烧烤": {
    py: "shāo kǎo", kind: "word", trad: "燒烤",
    senses: [
      { en: "barbecue; to grill or roast over fire", zh: "把食物放在火上烤" },
      { en: "barbecued food", zh: "烤好的食物" },
    ],
    ex: [{ zh: "烧烤美食对澳洲人丝毫不陌生。", py: "Shāokǎo měishí duì Àozhōu rén sīháo bù mòshēng.", en: "Barbecue food is not the least bit unfamiliar to Australians." }],
  },
  "国宴": {
    py: "guó yàn", kind: "word", trad: "國宴",
    senses: [{ en: "state banquet", zh: "国家元首为外宾举行的正式宴会" }],
    ex: [{ zh: "这样的小吃场面没有国宴那么正式。", py: "Zhèyàng de xiǎochī chǎngmiàn méiyǒu guóyàn nàme zhèngshì.", en: "A street-food setting like this isn't as formal as a state banquet." }],
  },
  "大餐": {
    py: "dà cān", kind: "word", trad: "大餐",
    senses: [{ en: "a big meal; a feast; a lavish dinner", zh: "丰盛的一顿饭" }],
    ex: [{ zh: "外交不一定要靠大餐。", py: "Wàijiāo bù yīdìng yào kào dàcān.", en: "Diplomacy doesn't necessarily rely on lavish dinners." }],
  },
  "食物": { py: "shí wù", kind: "word", senses: [{ en: "food", zh: "可以吃的东西" }], ex: [{ zh: "一起吃点熟悉又轻松的食物。", py: "Yīqǐ chī diǎn shúxī yòu qīngsōng de shíwù.", en: "Eating some familiar, relaxed food together." }] },
  "本地": { py: "běn dì", kind: "word", senses: [{ en: "local; this locality", zh: "本身所在的地方" }], ex: [{ zh: "带马克龙到老巴刹吃本地美食。", py: "Dài Mǎkèlóng dào Lǎo Bāshā chī běndì měishí.", en: "Took Macron to Lau Pa Sat to eat local food." }] },
  "河鲈": { py: "hé lú", kind: "word", trad: "河鱸", senses: [{ en: "perch (freshwater fish); Fr. perche", zh: "一种淡水鱼" }], ex: [{ zh: "视频里出现了瑞士河鲈。", py: "Shìpín lǐ chūxiàn le Ruìshì hélú.", en: "Swiss perch appeared in the video." }] },
  "刷卡": { py: "shuā kǎ", kind: "word", senses: [{ en: "to swipe / tap a card (access card, credit card)", zh: "把卡在机器上刷一下" }], ex: [{ zh: "我像往常一样刷卡进办公室。", py: "Wǒ xiàng wǎngcháng yīyàng shuākǎ jìn bàngōngshì.", en: "As usual, I tapped my card and entered the office." }] },

  // ══════════════════════════════════════════════════════════════════
  // ★ IDIOMS 成语 / 惯用语 — including 6-, 7-, 8- and 9-character ones
  // ══════════════════════════════════════════════════════════════════
  "山珍海味": {
    py: "shān zhēn hǎi wèi", kind: "idiom",
    senses: [
      { en: "delicacies from land and sea; a lavish spread of rare and expensive food", zh: "山里和海里出产的珍贵食品，泛指丰盛名贵的菜肴" },
    ],
    ex: [
      { zh: "外交不一定要山珍海味。", py: "Wàijiāo bù yīdìng yào shānzhēn-hǎiwèi.", en: "Diplomacy doesn't have to involve lavish delicacies." },
      { zh: "桌上摆满了山珍海味，他却只想喝一碗粥。", py: "Zhuō shàng bǎi mǎn le shānzhēn-hǎiwèi, tā què zhǐ xiǎng hē yī wǎn zhōu.", en: "The table was laden with delicacies, yet all he wanted was a bowl of congee." },
    ],
    lit: "山里的珍品，海里的美味",
  },
  "一年一度": {
    py: "yī nián yī dù", kind: "idiom",
    senses: [{ en: "annual; once a year", zh: "每年一次" }],
    ex: [
      { zh: "在一年一度的香格里拉对话期间……", py: "Zài yī nián yī dù de Xiānggélǐlā Duìhuà qījiān……", en: "During the annual Shangri-La Dialogue…" },
      { zh: "这是一年一度的盛事。", py: "Zhè shì yī nián yī dù de shèngshì.", en: "This is an annual grand occasion." },
    ],
  },
  "民以食为天": {
    py: "mín yǐ shí wéi tiān", kind: "idiom", trad: "民以食為天",
    senses: [
      { en: "food is the people's heaven — eating is the people's first necessity; nothing matters more to ordinary people than food", zh: "老百姓把粮食看作生活中最重要的东西" },
    ],
    ex: [
      { zh: "民以食为天，美食比演讲能更快拉近人与人之间的距离。", py: "Mín yǐ shí wéi tiān, měishí bǐ yǎnjiǎng néng gèng kuài lājìn rén yǔ rén zhī jiān de jùlí.", en: "Food is the people's heaven — good food closes the distance between people faster than speeches do." },
      { zh: "民以食为天，粮食安全是头等大事。", py: "Mín yǐ shí wéi tiān, liángshí ānquán shì tóuděng dàshì.", en: "Food is the people's heaven; food security is a matter of the first importance." },
    ],
    lit: "百姓把食物当作天",
    note: "★ 五字成语 — 分词系统必须整体识别，不能拆成「民／以／食／为／天」。",
  },
  "举手之劳": {
    py: "jǔ shǒu zhī láo", kind: "idiom", trad: "舉手之勞",
    senses: [
      { en: "a mere lifting of the hand — something that takes almost no effort at all", zh: "抬一抬手就能做到的事，形容事情很容易做" },
    ],
    syn: [
      { w: "不费吹灰之力", py: "bù fèi chuī huī zhī lì", en: "without the slightest effort", note: "偏重「毫不费力」；「举手之劳」偏重「顺手帮个小忙」，多用于助人。" },
      { w: "轻而易举", py: "qīng ér yì jǔ", en: "easy to do; effortless", note: "形容事情本身容易，不一定牵涉帮助别人。" },
      { w: "顺手", py: "shùn shǒu", en: "while one is at it; conveniently", note: "口语，是「举手之劳」的白话说法。" },
      { w: "小事一桩", py: "xiǎo shì yī zhuāng", en: "just a small matter; no big deal", note: "多用于回应别人的感谢。" },
    ],
    ant: [
      { w: "费尽心思", py: "fèi jìn xīn si", en: "to rack one's brains; to go to great lengths" },
      { w: "大费周章", py: "dà fèi zhōu zhāng", en: "to go to a great deal of trouble" },
      { w: "袖手旁观", py: "xiù shǒu páng guān", en: "to look on and do nothing", note: "行为上的反义：不肯出这一点点力。" },
    ],
    ex: [
      { zh: "他进门时连声说“谢谢”，我笑着回应：“只是举手之劳。”", py: "Tā jìn mén shí liánshēng shuō “xièxie”, wǒ xiào zhe huíyìng: “Zhǐshì jǔshǒu-zhīláo.”", en: "He kept saying “thank you” as he came in; I smiled and replied, “It was nothing at all.”" },
      { zh: "别小看举手之劳，很多人连举手之劳都做不了。", py: "Bié xiǎokàn jǔshǒu-zhīláo, hěn duō rén lián jǔshǒu-zhīláo dōu zuò bù liǎo.", en: "Don't belittle a small kindness — many people can't even manage that much." },
      { zh: "举手之劳，其实并不难。", py: "Jǔshǒu-zhīláo, qíshí bìng bù nán.", en: "A small kindness really isn't hard at all." },
      { zh: "你无意中的举手之劳，可能是别人记住一整天的善意。", py: "Nǐ wúyì zhōng de jǔshǒu-zhīláo, kěnéng shì biéren jìzhù yī zhěng tiān de shànyì.", en: "Your unthinking small kindness may be the goodwill someone remembers all day." },
      { zh: "帮你拿一下，只是举手之劳，不用客气。", py: "Bāng nǐ ná yīxià, zhǐshì jǔshǒu-zhīláo, bùyòng kèqi.", en: "Let me carry that — it's no trouble at all, don't mention it." },
      { zh: "顺手关灯是举手之劳，却能省下不少电。", py: "Shùnshǒu guān dēng shì jǔshǒu-zhīláo, què néng shěng xià bùshǎo diàn.", en: "Switching off the light as you go is effortless, yet it saves a lot of electricity." },
      { zh: "对你来说是举手之劳，对他来说可能是雪中送炭。", py: "Duì nǐ lái shuō shì jǔshǒu-zhīláo, duì tā lái shuō kěnéng shì xuězhōng-sòngtàn.", en: "What costs you nothing may, to him, be help exactly when it's needed most." },
      { zh: "请别人让个座，本是举手之劳的事。", py: "Qǐng biéren ràng gè zuò, běn shì jǔshǒu-zhīláo de shì.", en: "Giving up a seat is, after all, the easiest thing in the world." },
      { zh: "他总说这是举手之劳，从不邀功。", py: "Tā zǒng shuō zhè shì jǔshǒu-zhīláo, cóng bù yāo gōng.", en: "He always says it was nothing, and never claims credit." },
      { zh: "扶老人过马路是举手之劳，我们都做得到。", py: "Fú lǎorén guò mǎlù shì jǔshǒu-zhīláo, wǒmen dōu zuò de dào.", en: "Helping an elderly person across the road takes almost nothing — any of us can do it." },
      { zh: "举手之劳的善意，往往最能温暖人心。", py: "Jǔshǒu-zhīláo de shànyì, wǎngwǎng zuì néng wēnnuǎn rénxīn.", en: "The kindness that costs least is often the kindness that warms most." },
      { zh: "捡起地上的垃圾不过是举手之劳。", py: "Jiǎn qǐ dì shàng de lājī bùguò shì jǔshǒu-zhīláo.", en: "Picking up litter off the ground takes no effort at all." },
    ],
    lit: "抬一下手的辛劳",
  },
  "微不足道": {
    py: "wēi bù zú dào", kind: "idiom",
    senses: [
      { en: "too trivial to be worth mentioning; negligible; insignificant", zh: "非常渺小，不值得一提" },
    ],
    syn: [
      { w: "不足挂齿", py: "bù zú guà chǐ", en: "not worth mentioning", note: "多用于自谦，说自己的功劳或付出很小。" },
      { w: "微乎其微", py: "wēi hū qí wēi", en: "extremely tiny; minuscule", note: "偏重「数量／比例极小」，不含「不值一提」的评价。" },
      { w: "无关紧要", py: "wú guān jǐn yào", en: "of no consequence; unimportant", note: "偏重「不重要」，不一定小。" },
      { w: "九牛一毛", py: "jiǔ niú yī máo", en: "a hair from nine oxen — a drop in the bucket", note: "强调跟整体相比小得可怜。" },
    ],
    ant: [
      { w: "举足轻重", py: "jǔ zú qīng zhòng", en: "of decisive importance; pivotal" },
      { w: "至关重要", py: "zhì guān zhòng yào", en: "of the utmost importance" },
      { w: "非同小可", py: "fēi tóng xiǎo kě", en: "no small matter; serious" },
    ],
    ex: [
      { zh: "那些看似微不足道的小举动，往往才最打动人心。", py: "Nàxiē kàn sì wēibùzúdào de xiǎo jǔdòng, wǎngwǎng cái zuì dǎdòng rénxīn.", en: "Those seemingly trivial little acts are often the ones that move people most." },
      { zh: "这样的小事，也许微不足道，也许不会被记住。", py: "Zhèyàng de xiǎoshì, yěxǔ wēibùzúdào, yěxǔ bù huì bèi jìzhù.", en: "Small things like this may be too trivial to mention, and may never be remembered." },
      { zh: "在浩瀚的宇宙中，人类显得微不足道。", py: "Zài hàohàn de yǔzhòu zhōng, rénlèi xiǎnde wēibùzúdào.", en: "In the vast universe, humanity seems insignificant." },
      { zh: "他的付出看似微不足道，其实意义重大。", py: "Tā de fùchū kàn sì wēibùzúdào, qíshí yìyì zhòngdà.", en: "What he gave looked negligible, but its significance was great." },
      { zh: "跟他的贡献相比，我做的这点事微不足道。", py: "Gēn tā de gòngxiàn xiāngbǐ, wǒ zuò de zhè diǎn shì wēibùzúdào.", en: "Next to his contribution, what I did counts for nothing." },
      { zh: "别把这些微不足道的小事放在心上。", py: "Bié bǎ zhèxiē wēibùzúdào de xiǎoshì fàng zài xīn shàng.", en: "Don't take these trifling little things to heart." },
      { zh: "一个微不足道的错误，可能造成很大的损失。", py: "Yī gè wēibùzúdào de cuòwù, kěnéng zàochéng hěn dà de sǔnshī.", en: "One seemingly negligible mistake can cause a heavy loss." },
      { zh: "他的名字在名单上微不足道，成绩却最好。", py: "Tā de míngzì zài míngdān shàng wēibùzúdào, chéngjì què zuì hǎo.", en: "His name went unnoticed on the list, yet his results were the best." },
      { zh: "对灾民来说，这笔捐款绝不是微不足道的。", py: "Duì zāimín lái shuō, zhè bǐ juānkuǎn jué bù shì wēibùzúdào de.", en: "To the disaster victims, this donation is anything but trivial." },
      { zh: "再微不足道的善意，也值得被看见。", py: "Zài wēibùzúdào de shànyì, yě zhídé bèi kànjiàn.", en: "Even the smallest kindness deserves to be seen." },
    ],
    lit: "微小得不值得说",
  },
  "视而不见": {
    py: "shì ér bù jiàn", kind: "idiom", trad: "視而不見",
    senses: [
      { en: "to look but not see; to turn a blind eye; to deliberately ignore", zh: "睁着眼睛却当作没看见，形容不重视、不理会" },
    ],
    syn: [
      { w: "熟视无睹", py: "shú shì wú dǔ", en: "to be inured to the sight of; to ignore what one sees every day", note: "偏重「看惯了所以不当一回事」，带有麻木的意味。" },
      { w: "充耳不闻", py: "chōng ěr bù wén", en: "to turn a deaf ear", note: "同一结构，但针对「听」；两者常连用。" },
      { w: "置若罔闻", py: "zhì ruò wǎng wén", en: "to pay no heed; to disregard entirely" },
      { w: "袖手旁观", py: "xiù shǒu páng guān", en: "to look on with folded arms", note: "「视而不见」是不看；「袖手旁观」是看了也不动手。" },
    ],
    ant: [
      { w: "明察秋毫", py: "míng chá qiū háo", en: "to see with perfect clarity; to miss nothing" },
      { w: "一目了然", py: "yī mù liǎo rán", en: "clear at a glance" },
      { w: "挺身而出", py: "tǐng shēn ér chū", en: "to step forward boldly", note: "行为上的反义：看见了就出手。" },
    ],
    ex: [
      { zh: "明明不费吹灰之力，为什么还有那么多人选择视而不见？", py: "Míngmíng bù fèi chuīhuī zhī lì, wèishénme hái yǒu nàme duō rén xuǎnzé shì'érbùjiàn?", en: "It takes no effort at all — so why do so many still choose to turn a blind eye?" },
      { zh: "对身边的困难视而不见，是一种冷漠。", py: "Duì shēnbiān de kùnnan shì'érbùjiàn, shì yī zhǒng lěngmò.", en: "Turning a blind eye to the hardship around you is a form of indifference." },
      { zh: "他对问题视而不见，结果越拖越糟。", py: "Tā duì wèntí shì'érbùjiàn, jiéguǒ yuè tuō yuè zāo.", en: "He turned a blind eye to the problem, and it only got worse." },
      { zh: "我们不能对环境污染视而不见。", py: "Wǒmen bù néng duì huánjìng wūrǎn shì'érbùjiàn.", en: "We cannot turn a blind eye to environmental pollution." },
      { zh: "老师对学生的进步从不视而不见。", py: "Lǎoshī duì xuéshēng de jìnbù cóng bù shì'érbùjiàn.", en: "A teacher never overlooks a student's progress." },
      { zh: "他视而不见地走了过去，仿佛什么都没发生。", py: "Tā shì'érbùjiàn de zǒu le guòqù, fǎngfú shénme dōu méi fāshēng.", en: "He walked past as if he'd seen nothing, as if nothing had happened." },
      { zh: "对错误视而不见，等于纵容错误。", py: "Duì cuòwù shì'érbùjiàn, děngyú zòngróng cuòwù.", en: "To ignore a wrong is to condone it." },
      { zh: "行人跌倒了，路人却视而不见。", py: "Xíngrén diēdǎo le, lùrén què shì'érbùjiàn.", en: "A pedestrian fell, yet passers-by looked right through him." },
    ],
    lit: "看了却没看见",
  },
  "不费吹灰之力": {
    py: "bù fèi chuī huī zhī lì", kind: "idiom", trad: "不費吹灰之力",
    senses: [
      { en: "without even the effort of blowing away ash — effortlessly; with the greatest of ease", zh: "连吹掉灰尘的力气都不用，形容做事非常容易" },
    ],
    syn: [
      { w: "轻而易举", py: "qīng ér yì jǔ", en: "easy to do; effortless", note: "最常见的同义说法，语气较平实。" },
      { w: "易如反掌", py: "yì rú fǎn zhǎng", en: "as easy as turning over one's hand" },
      { w: "举手之劳", py: "jǔ shǒu zhī láo", en: "a mere lifting of the hand", note: "多用于「帮别人一个小忙」的语境。" },
      { w: "手到擒来", py: "shǒu dào qín lái", en: "to get it the moment one reaches out", note: "强调有把握、一出手就成功。" },
    ],
    ant: [
      { w: "费尽心机", py: "fèi jìn xīn jī", en: "to rack one's brains; to scheme hard" },
      { w: "千辛万苦", py: "qiān xīn wàn kǔ", en: "through untold hardships" },
      { w: "来之不易", py: "lái zhī bù yì", en: "hard-won; not easily come by" },
    ],
    ex: [
      { zh: "明明不费吹灰之力，为什么还有那么多人选择视而不见？", py: "Míngmíng bù fèi chuīhuī zhī lì, wèishénme hái yǒu nàme duō rén xuǎnzé shì'érbùjiàn?", en: "It takes no effort at all — so why do so many people still look away?" },
      { zh: "他不费吹灰之力就解决了这个问题。", py: "Tā bù fèi chuīhuī zhī lì jiù jiějué le zhège wèntí.", en: "He solved the problem without the slightest effort." },
      { zh: "这道题对他来说不费吹灰之力。", py: "Zhè dào tí duì tā lái shuō bù fèi chuīhuī zhī lì.", en: "This question costs him no effort whatsoever." },
      { zh: "他不费吹灰之力就赢了比赛。", py: "Tā bù fèi chuīhuī zhī lì jiù yíng le bǐsài.", en: "He won the match without breaking a sweat." },
      { zh: "有了这个工具，整理资料不费吹灰之力。", py: "Yǒu le zhège gōngjù, zhěnglǐ zīliào bù fèi chuīhuī zhī lì.", en: "With this tool, sorting the data takes no effort at all." },
      { zh: "别以为成功可以不费吹灰之力。", py: "Bié yǐwéi chénggōng kěyǐ bù fèi chuīhuī zhī lì.", en: "Don't imagine success comes without effort." },
      { zh: "让门开着等他，本是不费吹灰之力的事。", py: "Ràng mén kāi zhe děng tā, běn shì bù fèi chuīhuī zhī lì de shì.", en: "Holding the door for him costs absolutely nothing." },
    ],
    lit: "连吹掉灰的力气都不花",
    note: "★ 六字成语。",
  },
  "袖手旁观": {
    py: "xiù shǒu páng guān", kind: "idiom", trad: "袖手旁觀",
    senses: [
      { en: "to look on with folded arms; to stand by and do nothing while others need help", zh: "把手放在袖子里在旁边看着，比喻不帮忙、不参与" },
    ],
    syn: [
      { w: "坐视不管", py: "zuò shì bù guǎn", en: "to sit by and do nothing" },
      { w: "置身事外", py: "zhì shēn shì wài", en: "to keep oneself outside the affair", note: "偏重「不让自己牵涉进去」。" },
      { w: "隔岸观火", py: "gé àn guān huǒ", en: "to watch the fire from the other bank", note: "带幸灾乐祸的意味，比「袖手旁观」更冷。" },
      { w: "作壁上观", py: "zuò bì shàng guān", en: "to watch from the ramparts; to stay on the sidelines" },
    ],
    ant: [
      { w: "挺身而出", py: "tǐng shēn ér chū", en: "to step forward boldly" },
      { w: "见义勇为", py: "jiàn yì yǒng wéi", en: "to act bravely for a just cause" },
      { w: "拔刀相助", py: "bá dāo xiāng zhù", en: "to draw one's sword to help; to come to the rescue" },
      { w: "两肋插刀", py: "liǎng lèi chā dāo", en: "to go through thick and thin for a friend" },
    ],
    ex: [
      { zh: "好心反被误会，于是选择袖手旁观。", py: "Hǎoxīn fǎn bèi wùhuì, yúshì xuǎnzé xiùshǒu-pángguān.", en: "Their good intentions were misread, so they chose to stand by and do nothing." },
      { zh: "面对不公平的事，我们不能袖手旁观。", py: "Miànduì bù gōngpíng de shì, wǒmen bù néng xiùshǒu-pángguān.", en: "We cannot stand idly by in the face of injustice." },
      { zh: "同事有难，他从不袖手旁观。", py: "Tóngshì yǒu nàn, tā cóng bù xiùshǒu-pángguān.", en: "When a colleague is in trouble, he never just stands and watches." },
      { zh: "大家都在帮忙，你怎么能袖手旁观？", py: "Dàjiā dōu zài bāngmáng, nǐ zěnme néng xiùshǒu-pángguān?", en: "Everyone's helping — how can you just look on?" },
      { zh: "他袖手旁观了半天，一句话也没说。", py: "Tā xiùshǒu-pángguān le bàntiān, yī jù huà yě méi shuō.", en: "He stood by for ages without saying a word." },
      { zh: "看到有人跌倒还袖手旁观，实在说不过去。", py: "Kàndào yǒu rén diēdǎo hái xiùshǒu-pángguān, shízài shuō bù guòqù.", en: "To watch someone fall and do nothing is really indefensible." },
      { zh: "环境问题人人有责，谁都不该袖手旁观。", py: "Huánjìng wèntí rénrén yǒu zé, shéi dōu bù gāi xiùshǒu-pángguān.", en: "The environment is everyone's responsibility; no one should stand aside." },
    ],
    lit: "把手藏在袖中，在一旁看着",
  },
  "多一事不如少一事": {
    py: "duō yī shì bù rú shǎo yī shì", kind: "idiom",
    senses: [
      { en: "better to have one thing less to deal with than one more — it's best not to get involved; don't invite trouble", zh: "多做一件事不如少做一件事，指不愿多管闲事、怕麻烦" },
    ],
    ex: [
      { zh: "有些人是习惯了冷漠，觉得“多一事不如少一事”。", py: "Yǒuxiē rén shì xíguàn le lěngmò, juéde “duō yī shì bù rú shǎo yī shì”.", en: "Some people have grown used to indifference, feeling it's best not to get involved." },
      { zh: "他抱着多一事不如少一事的心态，什么都不管。", py: "Tā bào zhe duō yī shì bù rú shǎo yī shì de xīntài, shénme dōu bù guǎn.", en: "With a don't-invite-trouble attitude, he stayed out of everything." },
    ],
    note: "★ 八字惯用语 — 必须整体识别。",
  },
  "事不关己，己不劳心": {
    py: "shì bù guān jǐ, jǐ bù láo xīn", kind: "idiom", trad: "事不關己，己不勞心",
    senses: [
      { en: "if a matter doesn't concern me, I won't trouble my mind over it — an attitude of studied detachment", zh: "事情跟自己没关系，就不去费心，形容对他人的事漠不关心" },
    ],
    ex: [
      { zh: "更多时候，是一种“事不关己，己不劳心”的心态。", py: "Gèng duō shíhou, shì yī zhǒng “shì bù guān jǐ, jǐ bù láo xīn” de xīntài.", en: "More often, it is an attitude of “if it doesn't concern me, I won't trouble myself.”" },
    ],
    note: "★ 跨逗号的九字惯用语 — 分词器必须能跨过标点整体匹配。这正是参考网站做不到的。",
  },
  "事不关己": {
    py: "shì bù guān jǐ", kind: "idiom", trad: "事不關己",
    senses: [{ en: "the matter does not concern me", zh: "事情跟自己没有关系" }],
    ex: [{ zh: "他总是一副事不关己的样子。", py: "Tā zǒngshì yī fù shìbùguānjǐ de yàngzi.", en: "He always looks as if it's none of his business." }],
  },
  "离弦的箭": {
    py: "lí xián de jiàn", kind: "idiom", trad: "離弦的箭",
    senses: [
      { en: "like an arrow loosed from the bowstring — extremely fast, and unable to turn back", zh: "比喻速度极快，一去不回" },
    ],
    ex: [
      { zh: "我立刻拔腿狂奔，像离弦的箭一样冲过去。", py: "Wǒ lìkè bátuǐ kuángbēn, xiàng lí xián de jiàn yīyàng chōng guòqù.", en: "I broke into a sprint and shot over like an arrow off the bowstring." },
    ],
  },
  "拔腿狂奔": {
    py: "bá tuǐ kuáng bēn", kind: "idiom",
    senses: [{ en: "to take to one's heels and run flat out", zh: "抬起腿飞快地跑" }],
    ex: [{ zh: "我立刻拔腿狂奔。", py: "Wǒ lìkè bátuǐ kuángbēn.", en: "I immediately broke into a sprint." }],
  },
  "再熟悉不过": {
    py: "zài shú xī bù guò", kind: "idiom",
    senses: [{ en: "could not be more familiar; utterly familiar", zh: "非常熟悉，不能再熟悉了" }],
    ex: [{ zh: "我想起一个再熟悉不过的场景。", py: "Wǒ xiǎngqǐ yī gè zài shúxī bùguò de chǎngjǐng.", en: "I recalled a scene I could not know better." }],
    note: "“再……不过”是常见的固定格式，表示程度最高。",
  },
  "举手投足": {
    py: "jǔ shǒu tóu zú", kind: "idiom", trad: "舉手投足",
    senses: [{ en: "every gesture and movement; one's bearing", zh: "一举一动，指人的姿态动作" }],
    ex: [{ zh: "他举手投足都很有礼貌。", py: "Tā jǔshǒu-tóuzú dōu hěn yǒu lǐmào.", en: "Every gesture of his is courteous." }],
  },
  "急匆匆": {
    py: "jí cōng cōng", kind: "word",
    senses: [{ en: "in a great hurry; hurriedly", zh: "非常匆忙的样子" }],
    ex: [{ zh: "做什么都急匆匆，根本没有留意到身边的人。", py: "Zuò shénme dōu jí cōngcōng, gēnběn méiyǒu liúyì dào shēnbiān de rén.", en: "Rushing at everything, never noticing the people around them." }],
  },
  "立大功": {
    py: "lì dà gōng", kind: "word",
    senses: [{ en: "to render great service; to perform a great feat", zh: "建立很大的功劳" }],
    ex: [{ zh: "小吃也能立大功。", py: "Xiǎochī yě néng lì dà gōng.", en: "Street food can do great work too." }],
  },
  "破冰": {
    py: "pò bīng", kind: "word", trad: "破冰",
    senses: [
      { en: "to break the ice — to ease initial awkwardness between people", zh: "打破人与人之间最初的隔阂或尴尬" },
      { en: "to break through ice (literally, as an icebreaker ship does)", zh: "把冰打破" },
    ],
    ex: [
      { zh: "蔡德贤也曾用鸡肉肉干和外国军官破冰。", py: "Cài Déxián yě céng yòng jīròu ròugān hé wàiguó jūnguān pòbīng.", en: "Chua Teck Hian has also used chicken bak kwa to break the ice with foreign officers." },
      { zh: "一句玩笑就替我们破了冰。", py: "Yī jù wánxiào jiù tì wǒmen pò le bīng.", en: "A single joke broke the ice for us." },
    ],
  },

  // ══════════════════════════════════════════════════════════════════
  // MULTI-SENSE SHOWCASE WORDS — these prove the numbered 翻译 panel
  // ══════════════════════════════════════════════════════════════════
  "打开": {
    py: "dǎ kāi", kind: "word", trad: "打開",
    senses: [
      { en: "to open (a door, a box, a book)", zh: "使关闭的东西不再关闭" },
      { en: "to switch on; to turn on (a light, a device)", zh: "开启电器或开关" },
      { en: "to open up (a topic, a market, a situation)", zh: "使局面、话题等展开" },
      { en: "to unfold; to spread out", zh: "把折叠的东西展开" },
    ],
    ex: [
      { zh: "小吃也能帮忙打开话题。", py: "Xiǎochī yě néng bāngmáng dǎkāi huàtí.", en: "Street food can help open up a conversation." },
      { zh: "请打开窗户，让空气流通。", py: "Qǐng dǎkāi chuānghu, ràng kōngqì liútōng.", en: "Please open the window and let the air circulate." },
      { zh: "他打开电脑开始工作。", py: "Tā dǎkāi diànnǎo kāishǐ gōngzuò.", en: "He turned on the computer and began working." },
      { zh: "这项政策打开了新的市场。", py: "Zhè xiàng zhèngcè dǎkāi le xīn de shìchǎng.", en: "This policy opened up a new market." },
      { zh: "她打开地图，找到了那条路。", py: "Tā dǎkāi dìtú, zhǎodào le nà tiáo lù.", en: "She unfolded the map and found the road." },
    ],
  },
  "放下": {
    py: "fàng xià", kind: "word",
    senses: [
      { en: "to put down; to set down (an object)", zh: "把拿着的东西搁下" },
      { en: "to lay aside; to let go of (a worry, a grudge, a burden)", zh: "不再放在心上" },
      { en: "to lower (a blind, a curtain)", zh: "使降下来" },
    ],
    ex: [
      { zh: "一起吃点熟悉的食物，往往比较容易放下紧张感。", py: "Yīqǐ chī diǎn shúxī de shíwù, wǎngwǎng bǐjiào róngyì fàngxià jǐnzhāng gǎn.", en: "Sharing familiar food often makes it easier to let go of the tension." },
      { zh: "他放下行李，坐了下来。", py: "Tā fàngxià xíngli, zuò le xiàlái.", en: "He put down his luggage and sat down." },
      { zh: "放下过去，才能走向未来。", py: "Fàngxià guòqù, cái néng zǒuxiàng wèilái.", en: "Only by letting go of the past can you move towards the future." },
    ],
  },
  "带": {
    py: "dài", kind: "char", trad: "帶",
    senses: [
      { en: "to bring; to carry with one", zh: "随身拿着" },
      { en: "to lead; to take (someone somewhere)", zh: "领着别人去某处" },
      { en: "belt; strap; ribbon", zh: "长条形可以捆绑的东西" },
      { en: "zone; belt; area", zh: "某一区域，如热带、地带" },
      { en: "to look after; to raise (a child)", zh: "照看、抚养" },
    ],
    ex: [
      { zh: "陈振声带马尔斯到老巴刹吃夜宵。", py: "Chén Zhènshēng dài Mǎ'ěrsī dào Lǎo Bāshā chī yèxiāo.", en: "Chan Chun Sing took Marles to Lau Pa Sat for supper." },
      { zh: "记得带伞，今天会下雨。", py: "Jìde dài sǎn, jīntiān huì xià yǔ.", en: "Remember to bring an umbrella; it'll rain today." },
      { zh: "这条皮带是爸爸送的。", py: "Zhè tiáo pídài shì bàba sòng de.", en: "This leather belt was a gift from my father." },
      { zh: "新加坡位于热带地区。", py: "Xīnjiāpō wèiyú rèdài dìqū.", en: "Singapore lies in the tropical zone." },
      { zh: "奶奶帮忙带孩子。", py: "Nǎinai bāngmáng dài háizi.", en: "Grandma helps look after the children." },
    ],
  },
  "点": {
    py: "diǎn", kind: "char", trad: "點",
    senses: [
      { en: "a dot; a spot; a point", zh: "小的痕迹或圆点" },
      { en: "a little; a bit (measure word for small quantities)", zh: "表示少量" },
      { en: "o'clock", zh: "时间单位" },
      { en: "to order (food); to select", zh: "指定要什么，如点菜" },
      { en: "to nod (the head)", zh: "头向下微动" },
      { en: "an item; an aspect; a respect", zh: "方面、项目" },
    ],
    ex: [
      { zh: "一起吃点熟悉又轻松的食物。", py: "Yīqǐ chī diǎn shúxī yòu qīngsōng de shíwù.", en: "Eating a bit of familiar, easy food together." },
      { zh: "自己学到一点：民以食为天。", py: "Zìjǐ xuédào yī diǎn: mín yǐ shí wéi tiān.", en: "I learnt one thing: food is the people's heaven." },
      { zh: "我们三点钟见面。", py: "Wǒmen sān diǎn zhōng jiànmiàn.", en: "We'll meet at three o'clock." },
      { zh: "你想点什么菜？", py: "Nǐ xiǎng diǎn shénme cài?", en: "What dishes would you like to order?" },
      { zh: "他点了点头，表示同意。", py: "Tā diǎn le diǎn tóu, biǎoshì tóngyì.", en: "He nodded to show agreement." },
    ],
  },
  "靠": {
    py: "kào", kind: "char",
    senses: [
      { en: "to lean on; to lean against", zh: "身体倚着别的东西" },
      { en: "to rely on; to depend on", zh: "依赖" },
      { en: "to be near; to draw close to", zh: "挨近" },
      { en: "trustworthy; reliable (as in 可靠)", zh: "值得信赖" },
    ],
    ex: [
      { zh: "外交也不一定要靠大餐。", py: "Wàijiāo yě bù yīdìng yào kào dàcān.", en: "Diplomacy needn't rely on lavish dinners either." },
      { zh: "他靠在墙上休息。", py: "Tā kào zài qiáng shàng xiūxi.", en: "He leaned against the wall to rest." },
      { zh: "成功要靠努力。", py: "Chénggōng yào kào nǔlì.", en: "Success depends on hard work." },
      { zh: "请靠边站。", py: "Qǐng kào biān zhàn.", en: "Please stand to one side." },
    ],
  },
  "根本": {
    py: "gēn běn", kind: "word",
    senses: [
      { en: "at all; simply (used with a negative for emphasis)", zh: "用在否定句中，加强语气" },
      { en: "fundamental; essential; basic", zh: "最主要的、最重要的" },
      { en: "root; foundation; basis", zh: "事物的根源或基础" },
    ],
    ex: [
      { zh: "做什么都急匆匆，根本没有留意到身边的人需要帮助。", py: "Zuò shénme dōu jí cōngcōng, gēnběn méiyǒu liúyì dào shēnbiān de rén xūyào bāngzhù.", en: "Rushing at everything, they simply never notice that someone nearby needs help." },
      { zh: "这是一个根本问题。", py: "Zhè shì yī gè gēnběn wèntí.", en: "This is a fundamental question." },
      { zh: "教育是国家发展的根本。", py: "Jiàoyù shì guójiā fāzhǎn de gēnběn.", en: "Education is the foundation of a nation's development." },
    ],
  },
  "温暖": {
    py: "wēn nuǎn", kind: "word", trad: "溫暖",
    senses: [
      { en: "warm (of weather, a room, a colour)", zh: "不冷不热，暖和" },
      { en: "warm; kind; heart-warming (of feelings, people)", zh: "使人心里感到舒服、亲切" },
      { en: "to warm; to bring warmth to (someone)", zh: "使人感到温暖" },
      { en: "warmth (as a noun)", zh: "温暖的感觉" },
    ],
    ex: [
      { zh: "它们却有可能成为一个人一天里最温暖的时刻。", py: "Tāmen què yǒu kěnéng chéngwéi yī gè rén yī tiān lǐ zuì wēnnuǎn de shíkè.", en: "Yet they may become the warmest moment of someone's whole day." },
      { zh: "温暖可以传递温暖。", py: "Wēnnuǎn kěyǐ chuándì wēnnuǎn.", en: "Warmth can pass warmth on." },
      { zh: "有些人从小就没有被温暖以待，自然也学不会如何温暖别人。", py: "Yǒuxiē rén cóngxiǎo jiù méiyǒu bèi wēnnuǎn yǐ dài, zìrán yě xué bù huì rúhé wēnnuǎn biéren.", en: "Some were never treated with warmth growing up, so of course they never learnt how to warm others." },
      { zh: "不必伟大，但愿温暖常在。", py: "Bùbì wěidà, dàn yuàn wēnnuǎn cháng zài.", en: "No need to be great — may warmth simply always be there." },
      { zh: "南方的冬天比较温暖。", py: "Nánfāng de dōngtiān bǐjiào wēnnuǎn.", en: "Winters in the south are fairly warm." },
    ],
  },
  "习惯": {
    py: "xí guàn", kind: "word", trad: "習慣",
    senses: [
      { en: "habit; custom; practice (noun)", zh: "长期养成、不易改变的行为" },
      { en: "to be used to; to get accustomed to (verb)", zh: "对某种情况感到适应" },
    ],
    ex: [
      { zh: "有些人是习惯了冷漠。", py: "Yǒuxiē rén shì xíguàn le lěngmò.", en: "Some people have simply grown used to indifference." },
      { zh: "早睡早起是个好习惯。", py: "Zǎo shuì zǎo qǐ shì gè hǎo xíguàn.", en: "Sleeping and rising early is a good habit." },
      { zh: "我还不习惯这里的天气。", py: "Wǒ hái bù xíguàn zhèlǐ de tiānqì.", en: "I'm not used to the weather here yet." },
    ],
  },
  "简单": {
    py: "jiǎn dān", kind: "word", trad: "簡單",
    senses: [
      { en: "simple; uncomplicated", zh: "不复杂" },
      { en: "casual; perfunctory; brief", zh: "草率、不细致" },
      { en: "ordinary; commonplace (usually in the negative: 不简单 = remarkable)", zh: "平凡（多用于否定，「不简单」表示很了不起）" },
    ],
    ex: [
      { zh: "这些小吃看起来简单，却能让人先坐下来聊天。", py: "Zhèxiē xiǎochī kàn qǐlái jiǎndān, què néng ràng rén xiān zuò xiàlái liáotiān.", en: "These snacks look simple, yet they get people to sit down and chat first." },
      { zh: "他能做到这一点，真不简单。", py: "Tā néng zuòdào zhè yī diǎn, zhēn bù jiǎndān.", en: "For him to pull that off is really quite remarkable." },
    ],
  },
  "交流": {
    py: "jiāo liú", kind: "word",
    senses: [
      { en: "to exchange; to communicate; to interact", zh: "互相沟通、往来" },
      { en: "exchange; communication (noun)", zh: "沟通往来的行为" },
    ],
    ex: [
      { zh: "却让两国代表可以比较自在地交流。", py: "Què ràng liǎng guó dàibiǎo kěyǐ bǐjiào zìzài de jiāoliú.", en: "Yet it lets the two countries' representatives interact more freely." },
      { zh: "文化交流有助于增进了解。", py: "Wénhuà jiāoliú yǒuzhù yú zēngjìn liǎojiě.", en: "Cultural exchange helps deepen mutual understanding." },
    ],
  },
  "关照": {
    py: "guān zhào", kind: "word", trad: "關照",
    senses: [
      { en: "to look after; to keep an eye on; to show consideration for", zh: "照顾、照看" },
      { en: "to notify verbally; to let someone know", zh: "口头通知" },
    ],
    ex: [
      { zh: "多一个眼神的关照，多一次善意的举动。", py: "Duō yī gè yǎnshén de guānzhào, duō yī cì shànyì de jǔdòng.", en: "One more caring glance, one more act of goodwill." },
      { zh: "请多多关照。", py: "Qǐng duōduō guānzhào.", en: "Please take good care of me. (a polite set phrase)" },
    ],
  },
  "顺手": {
    py: "shùn shǒu", kind: "word", trad: "順手",
    senses: [
      { en: "conveniently; while one is at it; without extra effort", zh: "顺便，不费额外的力气" },
      { en: "smoothly; without a hitch", zh: "顺利" },
      { en: "handy; easy to use", zh: "用起来方便" },
    ],
    ex: [
      { zh: "于是，我顺手按了一下“自动开门”的按钮。", py: "Yúshì, wǒ shùnshǒu àn le yīxià “zìdòng kāimén” de ànniǔ.", en: "So I reached over and pressed the “hold door” button." },
      { zh: "出门时顺手把灯关掉。", py: "Chūmén shí shùnshǒu bǎ dēng guāndiào.", en: "Switch off the light on your way out." },
      { zh: "这把刀用起来很顺手。", py: "Zhè bǎ dāo yòng qǐlái hěn shùnshǒu.", en: "This knife is very handy to use." },
    ],
  },

  // ══════════════════════════════════════════════════════════════════
  // PROPER NOUNS
  // ══════════════════════════════════════════════════════════════════
  "新加坡": { py: "Xīn jiā pō", kind: "name", senses: [{ en: "Singapore", zh: "东南亚岛国" }], ex: [{ zh: "新加坡是个美食天堂。", py: "Xīnjiāpō shì gè měishí tiāntáng.", en: "Singapore is a food paradise." }] },
  "澳洲": { py: "Ào zhōu", kind: "name", senses: [{ en: "Australia", zh: "澳大利亚" }], ex: [{ zh: "推进新加坡和澳洲的防务合作。", py: "Tuījìn Xīnjiāpō hé Àozhōu de fángwù hézuò.", en: "To advance defence cooperation between Singapore and Australia." }] },
  "澳洲人": { py: "Ào zhōu rén", kind: "name", senses: [{ en: "Australian (person)", zh: "澳大利亚人" }], ex: [{ zh: "烧烤美食对澳洲人丝毫不陌生。", py: "Shāokǎo měishí duì Àozhōu rén sīháo bù mòshēng.", en: "Barbecue is not the least bit unfamiliar to Australians." }] },
  "陈振声": { py: "Chén Zhèn shēng", kind: "name", trad: "陳振聲", senses: [{ en: "Chan Chun Sing — Singapore's Coordinating Minister for Public Services and Minister for Defence", zh: "新加坡公共服务统筹部长兼国防部长" }], ex: [{ zh: "陈振声带马尔斯到老巴刹吃夜宵。", py: "Chén Zhènshēng dài Mǎ'ěrsī dào Lǎo Bāshā chī yèxiāo.", en: "Chan Chun Sing took Marles to Lau Pa Sat for supper." }] },
  "王乙康": { py: "Wáng Yǐ kāng", kind: "name", senses: [{ en: "Ong Ye Kung — Singapore's Coordinating Minister for Social Policies and Minister for Health", zh: "新加坡社会政策统筹部长兼保健卫生部长" }], ex: [{ zh: "王乙康也有类似看法。", py: "Wáng Yǐkāng yě yǒu lèisì kànfǎ.", en: "Ong Ye Kung holds a similar view." }] },
  "黄循财": { py: "Huáng Xún cái", kind: "name", trad: "黃循財", senses: [{ en: "Lawrence Wong — Prime Minister of Singapore", zh: "新加坡总理" }], ex: [{ zh: "黄循财总理曾带法国总统马克龙到老巴刹。", py: "Huáng Xúncái zǒnglǐ céng dài Fǎguó zǒngtǒng Mǎkèlóng dào Lǎo Bāshā.", en: "PM Lawrence Wong once took French President Macron to Lau Pa Sat." }] },
  "蔡德贤": { py: "Cài Dé xián", kind: "name", trad: "蔡德賢", senses: [{ en: "Chua Teck Hian — Singapore's Chief of Army", zh: "新加坡陆军总长" }], ex: [{ zh: "陆军总长蔡德贤曾用鸡肉肉干破冰。", py: "Lùjūn zǒngzhǎng Cài Déxián céng yòng jīròu ròugān pòbīng.", en: "Chief of Army Chua Teck Hian once used chicken bak kwa to break the ice." }] },
  "马尔斯": { py: "Mǎ ěr sī", kind: "name", trad: "馬爾斯", senses: [{ en: "Marles — Richard Marles, Australia's Deputy Prime Minister and Defence Minister", zh: "理查德·马尔斯，澳洲副总理兼防长" }], ex: [{ zh: "他和马尔斯一边吃，一边讨论防务合作。", py: "Tā hé Mǎ'ěrsī yībiān chī, yībiān tǎolùn fángwù hézuò.", en: "He and Marles ate while discussing defence cooperation." }] },
  "理查德": { py: "Lǐ chá dé", kind: "name", senses: [{ en: "Richard (given name)", zh: "英文名 Richard 的音译" }], ex: [{ zh: "我给理查德介绍了新加坡版的烧烤。", py: "Wǒ gěi Lǐchádé jièshào le Xīnjiāpō bǎn de shāokǎo.", en: "I introduced Richard to the Singapore version of barbecue." }] },
  "马克龙": { py: "Mǎ kè lóng", kind: "name", trad: "馬克龍", senses: [{ en: "Macron — Emmanuel Macron, President of France", zh: "法国总统马克龙" }], ex: [{ zh: "黄循财总理曾带马克龙到老巴刹。", py: "Huáng Xúncái zǒnglǐ céng dài Mǎkèlóng dào Lǎo Bāshā.", en: "PM Lawrence Wong once took Macron to Lau Pa Sat." }] },
  "香格里拉对话": { py: "Xiāng gé lǐ lā Duì huà", kind: "name", trad: "香格里拉對話", senses: [{ en: "the Shangri-La Dialogue — Asia's premier annual defence and security summit, held in Singapore", zh: "在新加坡举行的亚洲年度防务与安全峰会" }], ex: [{ zh: "在一年一度的香格里拉对话期间……", py: "Zài yī nián yī dù de Xiānggélǐlā Duìhuà qījiān……", en: "During the annual Shangri-La Dialogue…" }] },
  "世界卫生大会": { py: "Shì jiè Wèi shēng Dà huì", kind: "name", trad: "世界衛生大會", senses: [{ en: "the World Health Assembly (WHA)", zh: "世界卫生组织的最高决策机构" }], ex: [{ zh: "他在日内瓦参加世界卫生大会。", py: "Tā zài Rìnèiwǎ cānjiā Shìjiè Wèishēng Dàhuì.", en: "He attended the World Health Assembly in Geneva." }] },
  "日内瓦": { py: "Rì nèi wǎ", kind: "name", trad: "日內瓦", senses: [{ en: "Geneva", zh: "瑞士城市" }], ex: [{ zh: "他在日内瓦参加会议。", py: "Tā zài Rìnèiwǎ cānjiā huìyì.", en: "He attended the conference in Geneva." }] },
  "瑞士": { py: "Ruì shì", kind: "name", senses: [{ en: "Switzerland", zh: "欧洲国家" }], ex: [{ zh: "视频里出现了瑞士河鲈。", py: "Shìpín lǐ chūxiàn le Ruìshì hélú.", en: "Swiss perch appeared in the video." }] },
  "法国": { py: "Fǎ guó", kind: "name", trad: "法國", senses: [{ en: "France", zh: "欧洲国家" }], ex: [{ zh: "法国总统马克龙来访。", py: "Fǎguó zǒngtǒng Mǎkèlóng láifǎng.", en: "French President Macron paid a visit." }] },
  "福建": { py: "Fú jiàn", kind: "name", senses: [{ en: "Fujian province; Hokkien (the dialect group)", zh: "中国东南省份；也指福建话／闽南话" }], ex: [{ zh: "福建炒虾面是本地名菜。", py: "Fújiàn chǎo xiā miàn shì běndì míngcài.", en: "Hokkien prawn mee is a famous local dish." }] },

  // ══════════════════════════════════════════════════════════════════
  // PASSAGE 1 — general vocabulary
  // ══════════════════════════════════════════════════════════════════
  "外交": { py: "wài jiāo", kind: "word", senses: [{ en: "diplomacy; foreign affairs", zh: "国家之间的往来和交涉" }, { en: "diplomatic", zh: "与外交有关的" }], ex: [{ zh: "外交不一定要山珍海味。", py: "Wàijiāo bù yīdìng yào shānzhēn-hǎiwèi.", en: "Diplomacy doesn't have to involve lavish delicacies." }, { zh: "他在外交部工作了十年。", py: "Tā zài Wàijiāobù gōngzuò le shí nián.", en: "He worked at the foreign ministry for ten years." }] },
  "不一定": { py: "bù yī dìng", kind: "word", senses: [{ en: "not necessarily; not certain", zh: "不见得，未必" }], ex: [{ zh: "外交不一定只发生在会议室里。", py: "Wàijiāo bù yīdìng zhǐ fāshēng zài huìyìshì lǐ.", en: "Diplomacy doesn't only happen in meeting rooms." }] },
  "一定": { py: "yī dìng", kind: "word", senses: [{ en: "certainly; definitely", zh: "必然，肯定" }, { en: "fixed; specified; given", zh: "规定的、特定的" }, { en: "a certain amount of; a degree of", zh: "某种程度的" }], ex: [{ zh: "他一定会来。", py: "Tā yīdìng huì lái.", en: "He will definitely come." }, { zh: "这需要一定的时间。", py: "Zhè xūyào yīdìng de shíjiān.", en: "This needs a certain amount of time." }] },
  "发生": { py: "fā shēng", kind: "word", trad: "發生", senses: [{ en: "to happen; to occur; to take place", zh: "出现，产生" }], ex: [{ zh: "外交不一定只发生在会议室里。", py: "Wàijiāo bù yīdìng zhǐ fāshēng zài huìyìshì lǐ.", en: "Diplomacy doesn't only happen in meeting rooms." }] },
  "会议室": { py: "huì yì shì", kind: "word", trad: "會議室", senses: [{ en: "meeting room; conference room", zh: "开会用的房间" }], ex: [{ zh: "他们在会议室里谈了两个小时。", py: "Tāmen zài huìyìshì lǐ tán le liǎng gè xiǎoshí.", en: "They talked in the meeting room for two hours." }] },
  "会议": { py: "huì yì", kind: "word", trad: "會議", senses: [{ en: "meeting; conference", zh: "有组织的讨论活动" }], ex: [{ zh: "明天有一个重要会议。", py: "Míngtiān yǒu yī gè zhòngyào huìyì.", en: "There's an important meeting tomorrow." }] },
  "最近": { py: "zuì jìn", kind: "word", senses: [{ en: "recently; lately", zh: "不久以前，近来" }, { en: "nearest; closest", zh: "距离最短的" }], ex: [{ zh: "最近，新加坡两名部长分享了视频。", py: "Zuìjìn, Xīnjiāpō liǎng míng bùzhǎng fēnxiǎng le shìpín.", en: "Recently, two Singapore ministers shared videos." }] },
  "部长": { py: "bù zhǎng", kind: "word", trad: "部長", senses: [{ en: "minister (of a government ministry)", zh: "政府各部的首长" }], ex: [{ zh: "新加坡两名部长在社交媒体分享视频。", py: "Xīnjiāpō liǎng míng bùzhǎng zài shèjiāo méitǐ fēnxiǎng shìpín.", en: "Two Singapore ministers shared videos on social media." }] },
  "社交媒体": { py: "shè jiāo méi tǐ", kind: "word", trad: "社交媒體", senses: [{ en: "social media", zh: "供人们互动分享的网络平台" }], ex: [{ zh: "他常在社交媒体上分享生活。", py: "Tā cháng zài shèjiāo méitǐ shàng fēnxiǎng shēnghuó.", en: "He often shares his life on social media." }] },
  "分享": { py: "fēn xiǎng", kind: "word", senses: [{ en: "to share (joy, an experience, content)", zh: "和别人一同享受或说出来" }], ex: [{ zh: "两名部长在社交媒体分享的视频。", py: "Liǎng míng bùzhǎng zài shèjiāo méitǐ fēnxiǎng de shìpín.", en: "The videos the two ministers shared on social media." }] },
  "视频": { py: "shì pín", kind: "word", trad: "視頻", senses: [{ en: "video (clip)", zh: "影像片段" }], ex: [{ zh: "视频里还出现了斑兰蛋糕。", py: "Shìpín lǐ hái chūxiàn le bānlán dàngāo.", en: "Pandan cake also appeared in the video." }] },
  "话题": { py: "huà tí", kind: "word", trad: "話題", senses: [{ en: "topic of conversation; subject", zh: "谈话的中心内容" }], ex: [{ zh: "小吃也能帮忙打开话题。", py: "Xiǎochī yě néng bāngmáng dǎkāi huàtí.", en: "Snacks can help open up a topic of conversation." }] },
  "帮忙": { py: "bāng máng", kind: "word", trad: "幫忙", senses: [{ en: "to help; to lend a hand", zh: "帮助别人做事" }], ex: [{ zh: "小吃也能帮忙打开话题。", py: "Xiǎochī yě néng bāngmáng dǎkāi huàtí.", en: "Snacks can help open up a conversation." }] },
  "来自": { py: "lái zì", kind: "word", trad: "來自", senses: [{ en: "to come from; to originate from", zh: "从某处来" }], ex: [{ zh: "对来自不同国家的人来说……", py: "Duì láizì bùtóng guójiā de rén lái shuō……", en: "For people from different countries…" }] },
  "不同": { py: "bù tóng", kind: "word", senses: [{ en: "different; not the same", zh: "不一样" }], ex: [{ zh: "来自不同国家的人。", py: "Láizì bùtóng guójiā de rén.", en: "People from different countries." }] },
  "国家": { py: "guó jiā", kind: "word", trad: "國家", senses: [{ en: "country; nation; state", zh: "有一定领土和政权的政治实体" }], ex: [{ zh: "来自不同国家的人。", py: "Láizì bùtóng guójiā de rén.", en: "People from different countries." }] },
  "熟悉": { py: "shú xī", kind: "word", senses: [{ en: "familiar; well acquainted with", zh: "知道得很清楚" }, { en: "to get to know well; to familiarise oneself with", zh: "使自己了解清楚" }], ex: [{ zh: "一起吃点熟悉又轻松的食物。", py: "Yīqǐ chī diǎn shúxī yòu qīngsōng de shíwù.", en: "Eating some familiar, relaxed food together." }, { zh: "我想起一个再熟悉不过的场景。", py: "Wǒ xiǎngqǐ yī gè zài shúxī bùguò de chǎngjǐng.", en: "I recalled an all-too-familiar scene." }] },
  "轻松": { py: "qīng sōng", kind: "word", trad: "輕鬆", senses: [{ en: "relaxed; light-hearted; easy", zh: "不紧张，不费力" }], ex: [{ zh: "熟悉又轻松的食物。", py: "Shúxī yòu qīngsōng de shíwù.", en: "Familiar, relaxing food." }] },
  "往往": { py: "wǎng wǎng", kind: "word", senses: [{ en: "often; frequently; more often than not", zh: "表示某种情况时常出现" }], ex: [{ zh: "那些小举动，往往才最打动人心。", py: "Nàxiē xiǎo jǔdòng, wǎngwǎng cái zuì dǎdòng rénxīn.", en: "Those small acts are often the ones that move people most." }] },
  "比较": { py: "bǐ jiào", kind: "word", trad: "比較", senses: [{ en: "comparatively; fairly; rather", zh: "表示程度，相当于「还算」" }, { en: "to compare; to contrast", zh: "把两者放在一起对比" }], ex: [{ zh: "往往比较容易放下紧张感。", py: "Wǎngwǎng bǐjiào róngyì fàngxià jǐnzhāng gǎn.", en: "It's often rather easier to set aside the tension." }] },
  "容易": { py: "róng yì", kind: "word", senses: [{ en: "easy; not difficult", zh: "不难做" }, { en: "likely; apt to", zh: "很可能发生" }], ex: [{ zh: "比较容易放下紧张感。", py: "Bǐjiào róngyì fàngxià jǐnzhāng gǎn.", en: "It's easier to let go of the tension." }] },
  "紧张": { py: "jǐn zhāng", kind: "word", trad: "緊張", senses: [{ en: "nervous; tense; keyed up", zh: "心里不安，不放松" }, { en: "tight; in short supply (of resources, time)", zh: "供应不足" }], ex: [{ zh: "比较容易放下紧张感。", py: "Bǐjiào róngyì fàngxià jǐnzhāng gǎn.", en: "It's easier to let go of the tension." }, { zh: "考试前他很紧张。", py: "Kǎoshì qián tā hěn jǐnzhāng.", en: "He was very nervous before the exam." }] },
  "期间": { py: "qī jiān", kind: "word", trad: "期間", senses: [{ en: "during; in the course of; period", zh: "某个时期之内" }], ex: [{ zh: "在香格里拉对话期间。", py: "Zài Xiānggélǐlā Duìhuà qījiān.", en: "During the Shangri-La Dialogue." }] },
  "公共服务": { py: "gōng gòng fú wù", kind: "word", trad: "公共服務", senses: [{ en: "public service", zh: "为大众提供的服务" }], ex: [{ zh: "公共服务统筹部长兼国防部长陈振声。", py: "Gōnggòng fúwù tǒngchóu bùzhǎng jiān guófáng bùzhǎng Chén Zhènshēng.", en: "Coordinating Minister for Public Services and Minister for Defence, Chan Chun Sing." }] },
  "统筹": { py: "tǒng chóu", kind: "word", trad: "統籌", senses: [{ en: "to plan and coordinate as a whole; coordinating", zh: "统一筹划、协调" }], ex: [{ zh: "公共服务统筹部长。", py: "Gōnggòng fúwù tǒngchóu bùzhǎng.", en: "Coordinating Minister for Public Services." }] },
  "国防": { py: "guó fáng", kind: "word", trad: "國防", senses: [{ en: "national defence", zh: "保卫国家的防务" }], ex: [{ zh: "他是国防部长。", py: "Tā shì guófáng bùzhǎng.", en: "He is the Minister for Defence." }] },
  "兼": { py: "jiān", kind: "char", senses: [{ en: "concurrently; to hold two posts at once", zh: "同时担任两个职务" }, { en: "double; twice", zh: "加倍" }], ex: [{ zh: "公共服务统筹部长兼国防部长。", py: "Gōnggòng fúwù tǒngchóu bùzhǎng jiān guófáng bùzhǎng.", en: "Coordinating Minister for Public Services and concurrently Minister for Defence." }] },
  "副总理": { py: "fù zǒng lǐ", kind: "word", trad: "副總理", senses: [{ en: "deputy prime minister; vice-premier", zh: "总理的副手" }], ex: [{ zh: "澳洲副总理兼防长理查德·马尔斯。", py: "Àozhōu fù zǒnglǐ jiān fángzhǎng Lǐchádé Mǎ'ěrsī.", en: "Australia's Deputy PM and Defence Minister, Richard Marles." }] },
  "总理": { py: "zǒng lǐ", kind: "word", trad: "總理", senses: [{ en: "prime minister; premier", zh: "政府首脑" }], ex: [{ zh: "黄循财总理。", py: "Huáng Xúncái zǒnglǐ.", en: "Prime Minister Lawrence Wong." }] },
  "总统": { py: "zǒng tǒng", kind: "word", trad: "總統", senses: [{ en: "president (of a republic)", zh: "共和国的国家元首" }], ex: [{ zh: "法国总统马克龙。", py: "Fǎguó zǒngtǒng Mǎkèlóng.", en: "French President Macron." }] },
  "防长": { py: "fáng zhǎng", kind: "word", trad: "防長", senses: [{ en: "defence minister (abbreviation of 国防部长)", zh: "国防部长的简称" }], ex: [{ zh: "澳洲副总理兼防长。", py: "Àozhōu fù zǒnglǐ jiān fángzhǎng.", en: "Australia's Deputy PM and Defence Minister." }] },
  "陌生": { py: "mò shēng", kind: "word", senses: [{ en: "unfamiliar; strange; not known before", zh: "不熟悉" }], ex: [{ zh: "烧烤美食对澳洲人丝毫不陌生。", py: "Shāokǎo měishí duì Àozhōu rén sīháo bù mòshēng.", en: "Barbecue is not at all unfamiliar to Australians." }] },
  "丝毫": { py: "sī háo", kind: "word", trad: "絲毫", senses: [{ en: "the slightest bit; a trace (usually with a negative)", zh: "极小的一点儿（多用于否定）" }], ex: [{ zh: "对澳洲人丝毫不陌生。", py: "Duì Àozhōu rén sīháo bù mòshēng.", en: "Not the least bit unfamiliar to Australians." }] },
  "介绍": { py: "jiè shào", kind: "word", trad: "介紹", senses: [{ en: "to introduce (a person, a thing)", zh: "使双方认识或了解" }, { en: "to recommend", zh: "推荐" }], ex: [{ zh: "我给理查德介绍了新加坡版的烧烤。", py: "Wǒ gěi Lǐchádé jièshào le Xīnjiāpō bǎn de shāokǎo.", en: "I introduced Richard to the Singapore version of barbecue." }] },
  "了解": { py: "liǎo jiě", kind: "word", trad: "瞭解", senses: [{ en: "to understand; to know well", zh: "知道得清楚" }, { en: "to find out; to look into", zh: "调查、打听" }], ex: [{ zh: "让他更为了解新加坡的魅力。", py: "Ràng tā gèng wéi liǎojiě Xīnjiāpō de mèilì.", en: "So he could better appreciate Singapore's charm." }] },
  "魅力": { py: "mèi lì", kind: "word", senses: [{ en: "charm; glamour; appeal", zh: "很能吸引人的力量" }], ex: [{ zh: "了解新加坡这个美食天堂的魅力。", py: "Liǎojiě Xīnjiāpō zhège měishí tiāntáng de mèilì.", en: "To appreciate the charm of Singapore, this food paradise." }] },
  "天堂": { py: "tiān táng", kind: "word", senses: [{ en: "heaven; paradise", zh: "极乐世界，比喻美好的地方" }], ex: [{ zh: "新加坡是美食天堂。", py: "Xīnjiāpō shì měishí tiāntáng.", en: "Singapore is a food paradise." }] },
  "讨论": { py: "tǎo lùn", kind: "word", trad: "討論", senses: [{ en: "to discuss; to talk over", zh: "就某个问题交换意见" }], ex: [{ zh: "一边吃，一边讨论如何推进防务合作。", py: "Yībiān chī, yībiān tǎolùn rúhé tuījìn fángwù hézuò.", en: "Eating while discussing how to advance defence cooperation." }] },
  "如何": { py: "rú hé", kind: "word", senses: [{ en: "how; in what way", zh: "怎么，怎样" }], ex: [{ zh: "讨论如何推进合作。", py: "Tǎolùn rúhé tuījìn hézuò.", en: "Discussing how to advance cooperation." }] },
  "推进": { py: "tuī jìn", kind: "word", trad: "推進", senses: [{ en: "to advance; to push forward (a project, a cause)", zh: "使工作或事业向前发展" }, { en: "to propel (physically)", zh: "推动向前移动" }], ex: [{ zh: "推进新加坡和澳洲的防务合作。", py: "Tuījìn Xīnjiāpō hé Àozhōu de fángwù hézuò.", en: "To advance defence cooperation between Singapore and Australia." }] },
  "防务": { py: "fáng wù", kind: "word", trad: "防務", senses: [{ en: "defence affairs", zh: "有关国防的事务" }], ex: [{ zh: "两国的防务合作。", py: "Liǎng guó de fángwù hézuò.", en: "Defence cooperation between the two countries." }] },
  "合作": { py: "hé zuò", kind: "word", senses: [{ en: "to cooperate; cooperation", zh: "一起工作，共同完成" }], ex: [{ zh: "推进防务合作。", py: "Tuījìn fángwù hézuò.", en: "To advance defence cooperation." }] },
  "场面": { py: "chǎng miàn", kind: "word", trad: "場面", senses: [{ en: "scene; occasion; setting", zh: "一定场合下的情景" }], ex: [{ zh: "这样的小吃场面没有国宴那么正式。", py: "Zhèyàng de xiǎochī chǎngmiàn méiyǒu guóyàn nàme zhèngshì.", en: "A street-food setting like this isn't as formal as a state banquet." }] },
  "正式": { py: "zhèng shì", kind: "word", senses: [{ en: "formal; official", zh: "合乎规矩的，公开的" }], ex: [{ zh: "没有国宴那么正式。", py: "Méiyǒu guóyàn nàme zhèngshì.", en: "Not as formal as a state banquet." }] },
  "代表": { py: "dài biǎo", kind: "word", senses: [{ en: "representative; delegate (noun)", zh: "受委派办事的人" }, { en: "to represent; to stand for", zh: "代替；象征" }], ex: [{ zh: "让两国代表可以比较自在地交流。", py: "Ràng liǎng guó dàibiǎo kěyǐ bǐjiào zìzài de jiāoliú.", en: "Letting the two countries' representatives interact more freely." }] },
  "自在": { py: "zì zài", kind: "word", senses: [{ en: "at ease; comfortable; unconstrained", zh: "舒服，不受拘束" }], ex: [{ zh: "两国代表可以比较自在地交流。", py: "Liǎng guó dàibiǎo kěyǐ bǐjiào zìzài de jiāoliú.", en: "The representatives could interact more at ease." }] },
  "社会政策": { py: "shè huì zhèng cè", kind: "word", trad: "社會政策", senses: [{ en: "social policy", zh: "有关社会事务的政策" }], ex: [{ zh: "社会政策统筹部长王乙康。", py: "Shèhuì zhèngcè tǒngchóu bùzhǎng Wáng Yǐkāng.", en: "Coordinating Minister for Social Policies, Ong Ye Kung." }] },
  "保健卫生": { py: "bǎo jiàn wèi shēng", kind: "word", trad: "保健衛生", senses: [{ en: "health and healthcare", zh: "保护健康、讲究卫生" }], ex: [{ zh: "保健卫生部长王乙康。", py: "Bǎojiàn wèishēng bùzhǎng Wáng Yǐkāng.", en: "Minister for Health, Ong Ye Kung." }] },
  "类似": { py: "lèi sì", kind: "word", trad: "類似", senses: [{ en: "similar; analogous; of the same kind", zh: "大致相像" }], ex: [{ zh: "王乙康也有类似看法。", py: "Wáng Yǐkāng yě yǒu lèisì kànfǎ.", en: "Ong Ye Kung holds a similar view." }, { zh: "类似的例子不只一个。", py: "Lèisì de lìzi bù zhǐ yī gè.", en: "There's more than one such example." }] },
  "看法": { py: "kàn fǎ", kind: "word", senses: [{ en: "view; opinion; way of looking at something", zh: "对事物的认识和意见" }], ex: [{ zh: "王乙康也有类似看法。", py: "Wáng Yǐkāng yě yǒu lèisì kànfǎ.", en: "Ong Ye Kung holds a similar view." }] },
  "参加": { py: "cān jiā", kind: "word", trad: "參加", senses: [{ en: "to take part in; to attend; to join", zh: "加入某种活动或组织" }], ex: [{ zh: "他在日内瓦参加世界卫生大会。", py: "Tā zài Rìnèiwǎ cānjiā Shìjiè Wèishēng Dàhuì.", en: "He attended the World Health Assembly in Geneva." }] },
  "演讲": { py: "yǎn jiǎng", kind: "word", trad: "演講", senses: [{ en: "speech; lecture; to give a talk", zh: "对着听众说话" }], ex: [{ zh: "美食比演讲能更快拉近距离。", py: "Měishí bǐ yǎnjiǎng néng gèng kuài lājìn jùlí.", en: "Good food closes the distance faster than speeches." }] },
  "拉近": { py: "lā jìn", kind: "word", senses: [{ en: "to draw closer; to narrow (a distance or gap)", zh: "使距离变小" }], ex: [{ zh: "美食能更快拉近人与人之间的距离。", py: "Měishí néng gèng kuài lājìn rén yǔ rén zhī jiān de jùlí.", en: "Food closes the distance between people faster." }] },
  "距离": { py: "jù lí", kind: "word", trad: "距離", senses: [{ en: "distance; gap", zh: "两者之间相隔的长度" }, { en: "to be apart from", zh: "相隔" }], ex: [{ zh: "拉近人与人之间的距离。", py: "Lājìn rén yǔ rén zhī jiān de jùlí.", en: "To close the distance between people." }] },
  "之间": { py: "zhī jiān", kind: "word", trad: "之間", senses: [{ en: "between; among", zh: "在两者或多者中间" }], ex: [{ zh: "人与人之间的距离。", py: "Rén yǔ rén zhī jiān de jùlí.", en: "The distance between people." }] },
  "例子": { py: "lì zi", kind: "word", senses: [{ en: "example; instance", zh: "用来说明的事例" }], ex: [{ zh: "类似的例子不只一个。", py: "Lèisì de lìzi bù zhǐ yī gè.", en: "There's more than one such example." }] },
  "军官": { py: "jūn guān", kind: "word", trad: "軍官", senses: [{ en: "military officer", zh: "军队中的干部" }], ex: [{ zh: "用鸡肉肉干和外国军官破冰。", py: "Yòng jīròu ròugān hé wàiguó jūnguān pòbīng.", en: "Using chicken bak kwa to break the ice with foreign officers." }] },
  "陆军": { py: "lù jūn", kind: "word", trad: "陸軍", senses: [{ en: "army; land forces", zh: "在陆地作战的军队" }], ex: [{ zh: "陆军总长蔡德贤。", py: "Lùjūn zǒngzhǎng Cài Déxián.", en: "Chief of Army, Chua Teck Hian." }] },
  "总长": { py: "zǒng zhǎng", kind: "word", trad: "總長", senses: [{ en: "chief; chief of staff", zh: "某一部门的最高长官" }], ex: [{ zh: "陆军总长。", py: "Lùjūn zǒngzhǎng.", en: "Chief of Army." }] },
  "外国": { py: "wài guó", kind: "word", trad: "外國", senses: [{ en: "foreign country; foreign", zh: "本国以外的国家" }], ex: [{ zh: "和外国军官破冰。", py: "Hé wàiguó jūnguān pòbīng.", en: "Breaking the ice with foreign officers." }] },
  "看起来": { py: "kàn qǐ lái", kind: "word", trad: "看起來", senses: [{ en: "it looks as if; to appear; seemingly", zh: "从外表上判断" }], ex: [{ zh: "这些小吃看起来简单。", py: "Zhèxiē xiǎochī kàn qǐlái jiǎndān.", en: "These snacks look simple." }] },
  "聊天": { py: "liáo tiān", kind: "word", senses: [{ en: "to chat; to make small talk", zh: "闲谈" }], ex: [{ zh: "让人先坐下来聊天。", py: "Ràng rén xiān zuò xiàlái liáotiān.", en: "Getting people to sit down and chat first." }] },
  "事情": { py: "shì qing", kind: "word", senses: [{ en: "matter; affair; thing (to be done)", zh: "人类生活中的一切活动和现象" }], ex: [{ zh: "再谈更正式的事情。", py: "Zài tán gèng zhèngshì de shìqing.", en: "Then discuss more formal matters." }] },
  "东西": { py: "dōng xi", kind: "word", trad: "東西", senses: [{ en: "thing; object; stuff", zh: "泛指各种物件" }, { en: "east and west (dōng xī)", zh: "东边和西边（读 dōng xī）" }], ex: [{ zh: "这顿夜宵不只是吃东西。", py: "Zhè dùn yèxiāo bù zhǐshì chī dōngxi.", en: "This supper wasn't just about eating." }] },
  "一边": { py: "yī biān", kind: "word", trad: "一邊", senses: [{ en: "at the same time; simultaneously (一边…一边…)", zh: "两个动作同时进行" }, { en: "one side", zh: "一个方面或一侧" }], ex: [{ zh: "他和马尔斯一边吃，一边讨论合作。", py: "Tā hé Mǎ'ěrsī yībiān chī, yībiān tǎolùn hézuò.", en: "He and Marles ate while discussing cooperation." }] },
  "不只": { py: "bù zhǐ", kind: "word", senses: [{ en: "not only; more than", zh: "不仅仅" }], ex: [{ zh: "类似的例子不只一个。", py: "Lèisì de lìzi bù zhǐ yī gè.", en: "There's more than one such example." }] },
  "只是": { py: "zhǐ shì", kind: "word", senses: [{ en: "merely; only; just", zh: "仅仅是" }, { en: "however; but", zh: "不过" }], ex: [{ zh: "只是举手之劳。", py: "Zhǐshì jǔshǒu-zhīláo.", en: "It was nothing at all." }] },
  "曾": { py: "céng", kind: "char", senses: [{ en: "once; formerly; ever (in the past)", zh: "表示从前经历过" }], ex: [{ zh: "黄循财总理曾带马克龙到老巴刹。", py: "Huáng Xúncái zǒnglǐ céng dài Mǎkèlóng dào Lǎo Bāshā.", en: "PM Lawrence Wong once took Macron to Lau Pa Sat." }] },
  "去年": { py: "qù nián", kind: "word", senses: [{ en: "last year", zh: "今年的前一年" }], ex: [{ zh: "去年，黄循财总理曾带马克龙到老巴刹。", py: "Qùnián, Huáng Xúncái zǒnglǐ céng dài Mǎkèlóng dào Lǎo Bāshā.", en: "Last year, PM Lawrence Wong took Macron to Lau Pa Sat." }] },
  "鸡肉": { py: "jī ròu", kind: "word", trad: "雞肉", senses: [{ en: "chicken (meat)", zh: "鸡的肉" }], ex: [{ zh: "他用鸡肉肉干破冰。", py: "Tā yòng jīròu ròugān pòbīng.", en: "He used chicken bak kwa to break the ice." }] },
  "顿": { py: "dùn", kind: "char", trad: "頓", senses: [{ en: "measure word for meals", zh: "用于饭食的量词" }, { en: "to pause", zh: "停顿" }, { en: "suddenly; immediately", zh: "立刻" }], ex: [{ zh: "这顿夜宵不只是吃东西。", py: "Zhè dùn yèxiāo bù zhǐshì chī dōngxi.", en: "This supper wasn't just about eating." }] },

  // ══════════════════════════════════════════════════════════════════
  // PASSAGE 2 — general vocabulary
  // ══════════════════════════════════════════════════════════════════
  "今天": { py: "jīn tiān", kind: "word", senses: [{ en: "today", zh: "说话时的这一天" }, { en: "the present; nowadays", zh: "现在，目前" }], ex: [{ zh: "今天早上，我像往常一样刷卡进办公室。", py: "Jīntiān zǎoshang, wǒ xiàng wǎngcháng yīyàng shuākǎ jìn bàngōngshì.", en: "This morning, I tapped in to the office as usual." }] },
  "早上": { py: "zǎo shang", kind: "word", senses: [{ en: "morning; early morning", zh: "天刚亮到八九点钟的时间" }], ex: [{ zh: "今天早上我很早就出门了。", py: "Jīntiān zǎoshang wǒ hěn zǎo jiù chūmén le.", en: "I left home very early this morning." }] },
  "往常": { py: "wǎng cháng", kind: "word", senses: [{ en: "as usual; in the past; habitually", zh: "过去的一般情况" }], ex: [{ zh: "我像往常一样刷卡进办公室。", py: "Wǒ xiàng wǎngcháng yīyàng shuākǎ jìn bàngōngshì.", en: "I tapped into the office as I always do." }] },
  "一样": { py: "yī yàng", kind: "word", trad: "一樣", senses: [{ en: "the same; alike", zh: "没有差别" }, { en: "like; as (in 像…一样)", zh: "用于比喻，「像……一样」" }], ex: [{ zh: "像离弦的箭一样冲过去。", py: "Xiàng lí xián de jiàn yīyàng chōng guòqù.", en: "Shot over like an arrow off the bowstring." }] },
  "办公室": { py: "bàn gōng shì", kind: "word", trad: "辦公室", senses: [{ en: "office", zh: "办理公事的房间" }], ex: [{ zh: "我刷卡进办公室。", py: "Wǒ shuākǎ jìn bàngōngshì.", en: "I tapped my card and entered the office." }] },
  "完全": { py: "wán quán", kind: "word", senses: [{ en: "completely; entirely; wholly", zh: "全部，一点不剩" }, { en: "complete; whole", zh: "齐全，没有缺少" }], ex: [{ zh: "门还没完全关上。", py: "Mén hái méi wánquán guān shàng.", en: "The door hadn't fully closed yet." }] },
  "关上": { py: "guān shàng", kind: "word", trad: "關上", senses: [{ en: "to shut; to close", zh: "使门窗等合上" }], ex: [{ zh: "门还没完全关上。", py: "Mén hái méi wánquán guān shàng.", en: "The door hadn't fully closed." }] },
  "不远处": { py: "bù yuǎn chù", kind: "word", trad: "不遠處", senses: [{ en: "not far away; nearby", zh: "距离不远的地方" }], ex: [{ zh: "我看到不远处一位同事正快步走来。", py: "Wǒ kàndào bù yuǎn chù yī wèi tóngshì zhèng kuàibù zǒu lái.", en: "I saw a colleague not far off striding towards me." }] },
  "同事": { py: "tóng shì", kind: "word", senses: [{ en: "colleague; co-worker", zh: "在同一单位工作的人" }], ex: [{ zh: "一位同事正快步走来。", py: "Yī wèi tóngshì zhèng kuàibù zǒu lái.", en: "A colleague was striding over." }] },
  "快步": { py: "kuài bù", kind: "word", senses: [{ en: "at a brisk pace; with quick steps", zh: "很快的脚步" }], ex: [{ zh: "他快步走来。", py: "Tā kuàibù zǒu lái.", en: "He came striding briskly over." }] },
  "显然": { py: "xiǎn rán", kind: "word", trad: "顯然", senses: [{ en: "obviously; evidently; clearly", zh: "很容易看出来" }], ex: [{ zh: "显然也要进门。", py: "Xiǎnrán yě yào jìn mén.", en: "Clearly he wanted to come in too." }] },
  "于是": { py: "yú shì", kind: "word", trad: "於是", senses: [{ en: "thereupon; so; consequently", zh: "表示后一件事紧接着前一件事" }], ex: [{ zh: "于是，我顺手按了一下按钮。", py: "Yúshì, wǒ shùnshǒu àn le yīxià ànniǔ.", en: "So I reached over and pressed the button." }] },
  "自动": { py: "zì dòng", kind: "word", trad: "自動", senses: [{ en: "automatic", zh: "不用人操作就能运转" }, { en: "voluntarily; of one's own accord", zh: "自己主动" }], ex: [{ zh: "我按了一下“自动开门”的按钮。", py: "Wǒ àn le yīxià “zìdòng kāimén” de ànniǔ.", en: "I pressed the “automatic door” button." }] },
  "开门": { py: "kāi mén", kind: "word", trad: "開門", senses: [{ en: "to open the door", zh: "把门打开" }, { en: "to open for business", zh: "商店开始营业" }], ex: [{ zh: "他不肯伸手按住“开门”键。", py: "Tā bù kěn shēnshǒu àn zhù “kāimén” jiàn.", en: "He wouldn't reach out and hold the “open door” button." }] },
  "按钮": { py: "àn niǔ", kind: "word", trad: "按鈕", senses: [{ en: "push button", zh: "用手按的开关" }], ex: [{ zh: "我按了一下按钮。", py: "Wǒ àn le yīxià ànniǔ.", en: "I pressed the button." }] },
  "按": { py: "àn", kind: "char", senses: [{ en: "to press; to push down", zh: "用手向下压" }, { en: "to hold down; to restrain", zh: "压住，控制" }, { en: "according to; in accordance with", zh: "依照" }], ex: [{ zh: "我顺手按了一下按钮。", py: "Wǒ shùnshǒu àn le yīxià ànniǔ.", en: "I casually pressed the button." }, { zh: "请按时到达。", py: "Qǐng ànshí dàodá.", en: "Please arrive on time." }] },
  "动作": { py: "dòng zuò", kind: "word", trad: "動作", senses: [{ en: "movement; action; gesture", zh: "身体的活动" }], ex: [{ zh: "这不过是一两秒钟的小动作。", py: "Zhè bùguò shì yī liǎng miǎozhōng de xiǎo dòngzuò.", en: "It was a small gesture of a second or two." }] },
  "秒钟": { py: "miǎo zhōng", kind: "word", trad: "秒鐘", senses: [{ en: "second (of time)", zh: "时间单位" }], ex: [{ zh: "一两秒钟的小动作。", py: "Yī liǎng miǎozhōng de xiǎo dòngzuò.", en: "A gesture of a second or two." }] },
  "不过": { py: "bù guò", kind: "word", trad: "不過", senses: [{ en: "only; merely; no more than", zh: "仅仅，只是" }, { en: "but; however", zh: "表示转折" }, { en: "extremely (after an adjective, as in 再好不过)", zh: "用在形容词后，表示程度最高" }], ex: [{ zh: "这不过是一两秒钟的小动作。", py: "Zhè bùguò shì yī liǎng miǎozhōng de xiǎo dòngzuò.", en: "This was merely a gesture of a second or two." }, { zh: "我想去，不过没时间。", py: "Wǒ xiǎng qù, bùguò méi shíjiān.", en: "I'd like to go, but I don't have time." }] },
  "连声": { py: "lián shēng", kind: "word", trad: "連聲", senses: [{ en: "to say repeatedly; one after another", zh: "一声接一声地说" }], ex: [{ zh: "他进门时连声说“谢谢”。", py: "Tā jìn mén shí liánshēng shuō “xièxie”.", en: "He kept saying “thank you” as he came in." }] },
  "回应": { py: "huí yìng", kind: "word", trad: "回應", senses: [{ en: "to respond; to reply; a response", zh: "对别人的话或行动作出反应" }], ex: [{ zh: "我笑着回应：“只是举手之劳。”", py: "Wǒ xiào zhe huíyìng: “Zhǐshì jǔshǒu-zhīláo.”", en: "I smiled and replied, “It was nothing.”" }] },
  "随口": { py: "suí kǒu", kind: "word", trad: "隨口", senses: [{ en: "to say offhandedly; without thinking", zh: "不加思索地说出" }], ex: [{ zh: "他随口回了一句。", py: "Tā suíkǒu huí le yī jù.", en: "He replied offhandedly." }] },
  "小看": { py: "xiǎo kàn", kind: "word", senses: [{ en: "to belittle; to underestimate; to look down on", zh: "轻视，看不起" }], ex: [{ zh: "别小看举手之劳。", py: "Bié xiǎokàn jǔshǒu-zhīláo.", en: "Don't underestimate a small kindness." }] },
  "随即": { py: "suí jí", kind: "word", trad: "隨即", senses: [{ en: "immediately afterwards; thereupon", zh: "紧接着，马上" }], ex: [{ zh: "我一愣，随即颔首微笑。", py: "Wǒ yī lèng, suíjí hànshǒu wēixiào.", en: "I was momentarily taken aback, then nodded and smiled." }] },
  "颔首": { py: "hàn shǒu", kind: "word", trad: "頷首", senses: [{ en: "to nod (the head) — a formal, literary word", zh: "点头（书面语）" }], ex: [{ zh: "我随即颔首微笑。", py: "Wǒ suíjí hànshǒu wēixiào.", en: "I then nodded and smiled." }] },
  "微笑": { py: "wēi xiào", kind: "word", senses: [{ en: "to smile; a smile", zh: "不出声地笑" }], ex: [{ zh: "我们的社会，或许就会多一点微笑。", py: "Wǒmen de shèhuì, huòxǔ jiù huì duō yīdiǎn wēixiào.", en: "Our society might then have a few more smiles." }] },
  "生活": { py: "shēng huó", kind: "word", senses: [{ en: "life; daily living", zh: "人的日常活动" }, { en: "to live", zh: "生存，过日子" }], ex: [{ zh: "生活中，那些看似微不足道的小举动……", py: "Shēnghuó zhōng, nàxiē kàn sì wēibùzúdào de xiǎo jǔdòng……", en: "In life, those seemingly trivial small acts…" }] },
  "看似": { py: "kàn sì", kind: "word", senses: [{ en: "to look as if; seemingly", zh: "看上去好像" }], ex: [{ zh: "那些看似微不足道的小举动。", py: "Nàxiē kàn sì wēibùzúdào de xiǎo jǔdòng.", en: "Those seemingly trivial small acts." }] },
  "举动": { py: "jǔ dòng", kind: "word", trad: "舉動", senses: [{ en: "act; move; gesture", zh: "行为，动作" }], ex: [{ zh: "多一次善意的举动。", py: "Duō yī cì shànyì de jǔdòng.", en: "One more act of goodwill." }] },
  "打动": { py: "dǎ dòng", kind: "word", trad: "打動", senses: [{ en: "to move (emotionally); to touch (someone's heart)", zh: "使人感动" }], ex: [{ zh: "往往才最打动人心。", py: "Wǎngwǎng cái zuì dǎdòng rénxīn.", en: "Are often the ones that move people most." }] },
  "人心": { py: "rén xīn", kind: "word", senses: [{ en: "the human heart; people's feelings; popular sentiment", zh: "人的心思、感情" }], ex: [{ zh: "人心可以唤醒人心。", py: "Rénxīn kěyǐ huànxǐng rénxīn.", en: "One heart can awaken another." }] },
  "想起": { py: "xiǎng qǐ", kind: "word", senses: [{ en: "to recall; to think of; to remember", zh: "回忆起来" }], ex: [{ zh: "我想起一个再熟悉不过的场景。", py: "Wǒ xiǎngqǐ yī gè zài shúxī bùguò de chǎngjǐng.", en: "I recalled an all-too-familiar scene." }] },
  "场景": { py: "chǎng jǐng", kind: "word", trad: "場景", senses: [{ en: "scene; setting; situation", zh: "情景，画面" }], ex: [{ zh: "一个再熟悉不过的场景。", py: "Yī gè zài shúxī bùguò de chǎngjǐng.", en: "An all-too-familiar scene." }] },
  "电梯": { py: "diàn tī", kind: "word", trad: "電梯", senses: [{ en: "lift; elevator", zh: "楼房里用电力升降的设备" }], ex: [{ zh: "电梯即将关门。", py: "Diàntī jíjiāng guān mén.", en: "The lift doors were about to close." }] },
  "即将": { py: "jí jiāng", kind: "word", trad: "即將", senses: [{ en: "about to; on the point of; soon", zh: "马上就要" }], ex: [{ zh: "电梯即将关门。", py: "Diàntī jíjiāng guān mén.", en: "The lift was about to close." }] },
  "明明": { py: "míng míng", kind: "word", senses: [{ en: "clearly; obviously (often implying a contrast with what follows)", zh: "显然如此，用来强调" }], ex: [{ zh: "有人明明看到了后面还有人快步赶来。", py: "Yǒu rén míngmíng kàndào le hòumiàn hái yǒu rén kuàibù gǎn lái.", en: "Someone clearly saw others hurrying up behind." }, { zh: "明明不费吹灰之力。", py: "Míngmíng bù fèi chuīhuī zhī lì.", en: "It plainly takes no effort at all." }] },
  "赶来": { py: "gǎn lái", kind: "word", trad: "趕來", senses: [{ en: "to hurry over; to rush here", zh: "急忙来到" }], ex: [{ zh: "后面还有人快步赶来。", py: "Hòumiàn hái yǒu rén kuàibù gǎn lái.", en: "Someone was hurrying up behind." }] },
  "不肯": { py: "bù kěn", kind: "word", senses: [{ en: "unwilling to; refuse to", zh: "不愿意" }], ex: [{ zh: "却不肯伸手按住“开门”键。", py: "Què bù kěn shēnshǒu àn zhù “kāimén” jiàn.", en: "Yet refuses to reach out and hold the “open door” button." }] },
  "伸手": { py: "shēn shǒu", kind: "word", senses: [{ en: "to stretch out one's hand; to reach out", zh: "把手伸出去" }, { en: "to ask for help or money", zh: "向人要东西或帮助" }], ex: [{ zh: "不肯伸手按住“开门”键。", py: "Bù kěn shēnshǒu àn zhù “kāimén” jiàn.", en: "Refusing to reach out and hold the door button." }] },
  "有时候": { py: "yǒu shí hou", kind: "word", trad: "有時候", senses: [{ en: "sometimes; at times", zh: "偶尔，不是经常" }], ex: [{ zh: "有时候，是冷漠；有时候，是无意识。", py: "Yǒu shíhou, shì lěngmò; yǒu shíhou, shì wúyìshí.", en: "Sometimes it's indifference; sometimes it's just obliviousness." }] },
  "冷漠": { py: "lěng mò", kind: "word", senses: [{ en: "indifferent; cold; unconcerned", zh: "对人对事不关心、不热情" }], ex: [{ zh: "有些人是习惯了冷漠。", py: "Yǒuxiē rén shì xíguàn le lěngmò.", en: "Some people have grown used to indifference." }] },
  "无意识": { py: "wú yì shí", kind: "word", trad: "無意識", senses: [{ en: "unconscious; unaware; not deliberate", zh: "没有意识到，不是故意的" }], ex: [{ zh: "有时候，是无意识。", py: "Yǒu shíhou, shì wúyìshí.", en: "Sometimes it's simply not noticing." }] },
  "心态": { py: "xīn tài", kind: "word", trad: "心態", senses: [{ en: "mentality; state of mind; attitude", zh: "心理状态" }], ex: [{ zh: "是一种“事不关己，己不劳心”的心态。", py: "Shì yī zhǒng “shì bù guān jǐ, jǐ bù láo xīn” de xīntài.", en: "It's a “not my business, not my worry” mentality." }] },
  "下班": { py: "xià bān", kind: "word", senses: [{ en: "to finish work; to get off work", zh: "结束一天的工作" }], ex: [{ zh: "下班时，我赶着搭巴士回家。", py: "Xiàbān shí, wǒ gǎn zhe dā bāshì huí jiā.", en: "After work, I rushed to catch the bus home." }] },
  "车站": { py: "chē zhàn", kind: "word", trad: "車站", senses: [{ en: "station; bus stop", zh: "车辆停靠上下客的地方" }], ex: [{ zh: "巴士正准备驶离车站。", py: "Bāshì zhèng zhǔnbèi shǐ lí chēzhàn.", en: "The bus was about to pull away from the stop." }] },
  "陌生人": { py: "mò shēng rén", kind: "word", senses: [{ en: "a stranger", zh: "不认识的人" }], ex: [{ zh: "一位陌生人朝司机扬了扬手。", py: "Yī wèi mòshēngrén cháo sījī yáng le yáng shǒu.", en: "A stranger waved to the driver." }] },
  "司机": { py: "sī jī", kind: "word", trad: "司機", senses: [{ en: "driver (of a vehicle)", zh: "开车的人" }], ex: [{ zh: "司机于是稍等了几秒。", py: "Sījī yúshì shāo děng le jǐ miǎo.", en: "The driver waited a few seconds." }] },
  "示意": { py: "shì yì", kind: "word", senses: [{ en: "to signal; to indicate by a gesture or look", zh: "用动作或眼神表示意思" }], ex: [{ zh: "示意还有人赶来。", py: "Shìyì hái yǒu rén gǎn lái.", en: "Signalling that someone else was coming." }] },
  "稍等": { py: "shāo děng", kind: "word", senses: [{ en: "to wait a moment", zh: "等一会儿" }], ex: [{ zh: "司机于是稍等了几秒。", py: "Sījī yúshì shāo děng le jǐ miǎo.", en: "So the driver waited a few seconds." }] },
  "顺利": { py: "shùn lì", kind: "word", trad: "順利", senses: [{ en: "smoothly; without a hitch", zh: "没有阻碍，进行得很好" }], ex: [{ zh: "我顺利上了车。", py: "Wǒ shùnlì shàng le chē.", en: "I got on the bus without a problem." }] },
  "道谢": { py: "dào xiè", kind: "word", trad: "道謝", senses: [{ en: "to express thanks; to thank someone", zh: "向人表示感谢" }], ex: [{ zh: "我连声向那位陌生人道谢。", py: "Wǒ liánshēng xiàng nà wèi mòshēngrén dàoxiè.", en: "I thanked the stranger again and again." }] },
  "记住": { py: "jì zhù", kind: "word", trad: "記住", senses: [{ en: "to remember; to commit to memory", zh: "牢牢地记在心里" }], ex: [{ zh: "也许不会被记住。", py: "Yěxǔ bù huì bèi jìzhù.", en: "Perhaps they won't be remembered." }] },
  "时刻": { py: "shí kè", kind: "word", trad: "時刻", senses: [{ en: "moment; point in time", zh: "某一个时间点" }, { en: "constantly; always", zh: "每时每刻" }], ex: [{ zh: "成为一个人一天里最温暖的时刻。", py: "Chéngwéi yī gè rén yī tiān lǐ zuì wēnnuǎn de shíkè.", en: "Becoming the warmest moment of someone's day." }] },
  "无意中": { py: "wú yì zhōng", kind: "word", trad: "無意中", senses: [{ en: "inadvertently; unintentionally; without meaning to", zh: "不是故意的，偶然地" }], ex: [{ zh: "你无意中的举手之劳，可能是别人记住一整天的善意。", py: "Nǐ wúyì zhōng de jǔshǒu-zhīláo, kěnéng shì biéren jìzhù yī zhěng tiān de shànyì.", en: "Your unthinking small kindness may be the goodwill someone remembers all day." }] },
  "善意": { py: "shàn yì", kind: "word", senses: [{ en: "goodwill; kindness; good intentions", zh: "好的心意" }], ex: [{ zh: "多一次善意的举动。", py: "Duō yī cì shànyì de jǔdòng.", en: "One more act of goodwill." }] },
  "不禁": { py: "bù jīn", kind: "word", senses: [{ en: "cannot help but; can't refrain from", zh: "忍不住" }], ex: [{ zh: "可我也不禁思考。", py: "Kě wǒ yě bùjīn sīkǎo.", en: "Yet I can't help wondering." }] },
  "思考": { py: "sī kǎo", kind: "word", senses: [{ en: "to think deeply; to ponder; to reflect", zh: "深入地想，进行思维活动" }], ex: [{ zh: "我不禁思考，为什么不是每个人都愿意？", py: "Wǒ bùjīn sīkǎo, wèishénme bù shì měi gè rén dōu yuànyì?", en: "I can't help wondering why not everyone is willing." }] },
  "愿意": { py: "yuàn yì", kind: "word", trad: "願意", senses: [{ en: "to be willing; to want to", zh: "心里肯，同意做" }], ex: [{ zh: "为什么不是每个人都愿意为他人多做一点？", py: "Wèishénme bù shì měi gè rén dōu yuànyì wèi tārén duō zuò yīdiǎn?", en: "Why isn't everyone willing to do a bit more for others?" }] },
  "他人": { py: "tā rén", kind: "word", senses: [{ en: "other people; others", zh: "别人" }], ex: [{ zh: "为他人多做这一点点。", py: "Wèi tārén duō zuò zhè yīdiǎndiǎn.", en: "To do this little bit more for others." }] },
  "选择": { py: "xuǎn zé", kind: "word", trad: "選擇", senses: [{ en: "to choose; to select", zh: "挑选" }, { en: "choice; option", zh: "挑选的结果或可能" }], ex: [{ zh: "为什么还有那么多人选择视而不见？", py: "Wèishénme hái yǒu nàme duō rén xuǎnzé shì'érbùjiàn?", en: "Why do so many still choose to look away?" }] },
  "觉得": { py: "jué de", kind: "word", trad: "覺得", senses: [{ en: "to feel; to think; to sense", zh: "产生某种感觉或看法" }], ex: [{ zh: "觉得“多一事不如少一事”。", py: "Juéde “duō yī shì bù rú shǎo yī shì”.", en: "Feeling it's best not to get involved." }] },
  "等于": { py: "děng yú", kind: "word", trad: "等於", senses: [{ en: "to equal; to amount to; to be the same as", zh: "相当于" }], ex: [{ zh: "帮别人等于给自己添麻烦。", py: "Bāng biéren děngyú gěi zìjǐ tiān máfan.", en: "Helping others amounts to making trouble for yourself." }] },
  "添麻烦": { py: "tiān má fan", kind: "word", trad: "添麻煩", senses: [{ en: "to cause trouble; to be a bother", zh: "给人增加麻烦" }], ex: [{ zh: "帮别人等于给自己添麻烦。", py: "Bāng biéren děngyú gěi zìjǐ tiān máfan.", en: "Helping others just makes trouble for yourself." }] },
  "麻烦": { py: "má fan", kind: "word", trad: "麻煩", senses: [{ en: "trouble; bother; inconvenience", zh: "费事，不容易办" }, { en: "to trouble someone (polite)", zh: "请人帮忙时的客气话" }], ex: [{ zh: "给自己添麻烦。", py: "Gěi zìjǐ tiān máfan.", en: "To make trouble for oneself." }] },
  "专注": { py: "zhuān zhù", kind: "word", trad: "專注", senses: [{ en: "to concentrate on; absorbed in; focused", zh: "集中精神在一件事上" }], ex: [{ zh: "有些人是太专注于自己的生活节奏。", py: "Yǒuxiē rén shì tài zhuānzhù yú zìjǐ de shēnghuó jiézòu.", en: "Some are too absorbed in the rhythm of their own lives." }] },
  "节奏": { py: "jié zòu", kind: "word", trad: "節奏", senses: [{ en: "rhythm; tempo; pace", zh: "有规律的轻重快慢变化" }], ex: [{ zh: "太专注于自己的生活节奏。", py: "Tài zhuānzhù yú zìjǐ de shēnghuó jiézòu.", en: "Too absorbed in one's own pace of life." }] },
  "留意": { py: "liú yì", kind: "word", senses: [{ en: "to pay attention to; to take notice of; to keep an eye out", zh: "注意，当心" }], ex: [{ zh: "根本没有留意到身边的人需要帮助。", py: "Gēnběn méiyǒu liúyì dào shēnbiān de rén xūyào bāngzhù.", en: "Never noticing that someone nearby needs help." }] },
  "身边": { py: "shēn biān", kind: "word", trad: "身邊", senses: [{ en: "at one's side; nearby; around one", zh: "在自己旁边" }], ex: [{ zh: "留意身边的人。", py: "Liúyì shēnbiān de rén.", en: "Notice the people around you." }] },
  "帮助": { py: "bāng zhù", kind: "word", trad: "幫助", senses: [{ en: "to help; help; assistance", zh: "替人出力、出主意" }], ex: [{ zh: "身边的人需要帮助。", py: "Shēnbiān de rén xūyào bāngzhù.", en: "The people around you need help." }] },
  "害怕": { py: "hài pà", kind: "word", senses: [{ en: "to be afraid; to fear", zh: "心里发慌，怕" }], ex: [{ zh: "有些人是害怕被误解。", py: "Yǒuxiē rén shì hàipà bèi wùjiě.", en: "Some are afraid of being misunderstood." }] },
  "误解": { py: "wù jiě", kind: "word", trad: "誤解", senses: [{ en: "to misunderstand; a misunderstanding", zh: "理解得不正确" }], ex: [{ zh: "害怕被误解。", py: "Hàipà bèi wùjiě.", en: "Afraid of being misunderstood." }] },
  "误会": { py: "wù huì", kind: "word", trad: "誤會", senses: [{ en: "to misunderstand; a misunderstanding", zh: "错误地理解对方的意思" }], ex: [{ zh: "好心反被误会。", py: "Hǎoxīn fǎn bèi wùhuì.", en: "Good intentions are misread instead." }] },
  "好心": { py: "hǎo xīn", kind: "word", senses: [{ en: "good intentions; kind-hearted", zh: "善良的心意" }], ex: [{ zh: "好心反被误会。", py: "Hǎoxīn fǎn bèi wùhuì.", en: "Kindness gets misunderstood instead." }] },
  "从小": { py: "cóng xiǎo", kind: "word", trad: "從小", senses: [{ en: "from childhood; since one was small", zh: "从小时候起" }], ex: [{ zh: "有些人从小就没有被温暖以待。", py: "Yǒuxiē rén cóngxiǎo jiù méiyǒu bèi wēnnuǎn yǐ dài.", en: "Some were never treated with warmth from childhood." }] },
  "自然": { py: "zì rán", kind: "word", senses: [{ en: "naturally; of course", zh: "理所当然地" }, { en: "nature; the natural world", zh: "大自然" }, { en: "natural; not forced", zh: "不勉强，不做作" }], ex: [{ zh: "自然也学不会如何温暖别人。", py: "Zìrán yě xué bù huì rúhé wēnnuǎn biéren.", en: "Naturally they never learn how to warm others." }] },
  "始终": { py: "shǐ zhōng", kind: "word", trad: "始終", senses: [{ en: "all along; from beginning to end; consistently", zh: "从开始到结束，一直" }], ex: [{ zh: "但我始终相信，人心可以唤醒人心。", py: "Dàn wǒ shǐzhōng xiāngxìn, rénxīn kěyǐ huànxǐng rénxīn.", en: "But I have always believed one heart can awaken another." }] },
  "相信": { py: "xiāng xìn", kind: "word", senses: [{ en: "to believe; to trust; to be convinced", zh: "认为正确、可靠而不怀疑" }], ex: [{ zh: "我始终相信，温暖可以传递温暖。", py: "Wǒ shǐzhōng xiāngxìn, wēnnuǎn kěyǐ chuándì wēnnuǎn.", en: "I have always believed that warmth passes warmth on." }] },
  "唤醒": { py: "huàn xǐng", kind: "word", trad: "喚醒", senses: [{ en: "to wake someone up; to awaken; to rouse", zh: "叫醒；使觉悟" }], ex: [{ zh: "人心可以唤醒人心。", py: "Rénxīn kěyǐ huànxǐng rénxīn.", en: "One heart can awaken another." }] },
  "传递": { py: "chuán dì", kind: "word", trad: "傳遞", senses: [{ en: "to pass on; to transmit; to relay", zh: "由一方传给另一方" }], ex: [{ zh: "温暖可以传递温暖。", py: "Wēnnuǎn kěyǐ chuándì wēnnuǎn.", en: "Warmth can pass warmth on." }] },
  "正如": { py: "zhèng rú", kind: "word", senses: [{ en: "just as; exactly as", zh: "就像" }], ex: [{ zh: "正如有人说的……", py: "Zhèngrú yǒu rén shuō de……", en: "Just as someone once said…" }] },
  "改变": { py: "gǎi biàn", kind: "word", trad: "改變", senses: [{ en: "to change; to transform; to alter", zh: "变得和原来不一样" }], ex: [{ zh: "世界不会因为一个人的善意而改变。", py: "Shìjiè bù huì yīnwèi yī gè rén de shànyì ér gǎibiàn.", en: "The world won't change because of one person's kindness." }] },
  "照亮": { py: "zhào liàng", kind: "word", senses: [{ en: "to light up; to illuminate", zh: "使变得明亮" }], ex: [{ zh: "一个人的善意，可能会照亮另一个人的世界。", py: "Yī gè rén de shànyì, kěnéng huì zhàoliàng lìng yī gè rén de shìjiè.", en: "One person's kindness may light up another's world." }] },
  "世界": { py: "shì jiè", kind: "word", trad: "世界", senses: [{ en: "the world", zh: "地球上的一切；也指人的生活范围" }], ex: [{ zh: "照亮另一个人的世界。", py: "Zhàoliàng lìng yī gè rén de shìjiè.", en: "To light up another person's world." }] },
  "体贴": { py: "tǐ tiē", kind: "word", trad: "體貼", senses: [{ en: "considerate; thoughtful; attentive to others' needs", zh: "细心地为别人着想" }], ex: [{ zh: "如果每个人都愿意多一份体贴……", py: "Rúguǒ měi gè rén dōu yuànyì duō yī fèn tǐtiē……", en: "If everyone were willing to be a little more considerate…" }] },
  "眼神": { py: "yǎn shén", kind: "word", senses: [{ en: "the expression in one's eyes; a look; a glance", zh: "眼睛所表现出的神情" }], ex: [{ zh: "多一个眼神的关照。", py: "Duō yī gè yǎnshén de guānzhào.", en: "One more caring glance." }] },
  "社会": { py: "shè huì", kind: "word", trad: "社會", senses: [{ en: "society; the community", zh: "由人群组成的整体" }], ex: [{ zh: "我们的社会，或许就会多一些信任。", py: "Wǒmen de shèhuì, huòxǔ jiù huì duō yīxiē xìnrèn.", en: "Our society might then have a little more trust." }] },
  "或许": { py: "huò xǔ", kind: "word", trad: "或許", senses: [{ en: "perhaps; maybe; possibly", zh: "也许" }], ex: [{ zh: "我们的社会，或许就会多一些信任。", py: "Wǒmen de shèhuì, huòxǔ jiù huì duō yīxiē xìnrèn.", en: "Our society might then have a little more trust." }] },
  "信任": { py: "xìn rèn", kind: "word", senses: [{ en: "to trust; trust; confidence in someone", zh: "相信并敢于托付" }], ex: [{ zh: "多一些信任，多一点微笑。", py: "Duō yīxiē xìnrèn, duō yīdiǎn wēixiào.", en: "A little more trust, a few more smiles." }] },
  "理解": { py: "lǐ jiě", kind: "word", senses: [{ en: "to understand; to comprehend; understanding", zh: "懂得，明白" }], ex: [{ zh: "多一份理解。", py: "Duō yī fèn lǐjiě.", en: "A little more understanding." }] },
  "其实": { py: "qí shí", kind: "word", trad: "其實", senses: [{ en: "actually; in fact; as a matter of fact", zh: "表示所说的是实际情况" }], ex: [{ zh: "举手之劳，其实并不难。", py: "Jǔshǒu-zhīláo, qíshí bìng bù nán.", en: "A small kindness really isn't hard." }] },
  "并不": { py: "bìng bù", kind: "word", trad: "並不", senses: [{ en: "not at all; by no means (emphatic negation)", zh: "加强否定语气" }], ex: [{ zh: "其实并不难。", py: "Qíshí bìng bù nán.", en: "It really isn't hard at all." }] },
  "不必": { py: "bù bì", kind: "word", senses: [{ en: "need not; not have to", zh: "不需要" }], ex: [{ zh: "不必伟大，但愿温暖常在。", py: "Bùbì wěidà, dàn yuàn wēnnuǎn cháng zài.", en: "No need to be great — may warmth simply always remain." }] },
  "伟大": { py: "wěi dà", kind: "word", trad: "偉大", senses: [{ en: "great; mighty; noble", zh: "品格崇高，影响巨大" }], ex: [{ zh: "不必伟大。", py: "Bùbì wěidà.", en: "There's no need to be great." }] },
  "但愿": { py: "dàn yuàn", kind: "word", trad: "但願", senses: [{ en: "if only; may it be that; I wish that", zh: "只希望" }], ex: [{ zh: "但愿温暖常在。", py: "Dàn yuàn wēnnuǎn cháng zài.", en: "May warmth always remain." }] },
  "成为": { py: "chéng wéi", kind: "word", trad: "成為", senses: [{ en: "to become; to turn into", zh: "变成" }], ex: [{ zh: "愿你我都能成为这样的人。", py: "Yuàn nǐ wǒ dōu néng chéngwéi zhèyàng de rén.", en: "May you and I both become such people." }] },
  "也许": { py: "yě xǔ", kind: "word", trad: "也許", senses: [{ en: "perhaps; maybe", zh: "可能，或许" }], ex: [{ zh: "这样的小事，也许微不足道。", py: "Zhèyàng de xiǎoshì, yěxǔ wēibùzúdào.", en: "Small things like this may seem trivial." }] },
  "可能": { py: "kě néng", kind: "word", senses: [{ en: "possibly; maybe; probably", zh: "也许，或许" }, { en: "possible", zh: "能够实现的" }, { en: "possibility", zh: "可能性" }], ex: [{ zh: "可能是别人记住一整天的善意。", py: "Kěnéng shì biéren jìzhù yī zhěng tiān de shànyì.", en: "May be the kindness someone remembers all day." }] },
  "小事": { py: "xiǎo shì", kind: "word", senses: [{ en: "a small matter; a trifle", zh: "不重要的事" }], ex: [{ zh: "这样的小事，也许微不足道。", py: "Zhèyàng de xiǎoshì, yěxǔ wēibùzúdào.", en: "Such small things may seem trivial." }] },
  "一整天": { py: "yī zhěng tiān", kind: "word", senses: [{ en: "the whole day; all day long", zh: "整整一天" }], ex: [{ zh: "别人记住一整天的善意。", py: "Biéren jìzhù yī zhěng tiān de shànyì.", en: "The kindness someone remembers all day." }] },
  "为什么": { py: "wèi shén me", kind: "word", trad: "為什麼", senses: [{ en: "why; for what reason", zh: "询问原因" }], ex: [{ zh: "为什么不是每个人都愿意？", py: "Wèishénme bù shì měi gè rén dōu yuànyì?", en: "Why isn't everyone willing?" }] },
  "每个人": { py: "měi gè rén", kind: "word", trad: "每個人", senses: [{ en: "everyone; each person", zh: "所有的人，人人" }], ex: [{ zh: "如果每个人都愿意多一份体贴。", py: "Rúguǒ měi gè rén dōu yuànyì duō yī fèn tǐtiē.", en: "If everyone were willing to be a bit more considerate." }] },
  "有些人": { py: "yǒu xiē rén", kind: "word", senses: [{ en: "some people", zh: "一部分人" }], ex: [{ zh: "有些人是习惯了冷漠。", py: "Yǒuxiē rén shì xíguàn le lěngmò.", en: "Some people have grown used to indifference." }] },
  "别人": { py: "bié ren", kind: "word", trad: "別人", senses: [{ en: "other people; others; someone else", zh: "自己以外的人" }], ex: [{ zh: "学不会如何温暖别人。", py: "Xué bù huì rúhé wēnnuǎn biéren.", en: "Never learning how to warm others." }] },
  "自己": { py: "zì jǐ", kind: "word", senses: [{ en: "oneself; one's own", zh: "本人" }], ex: [{ zh: "帮别人等于给自己添麻烦。", py: "Bāng biéren děngyú gěi zìjǐ tiān máfan.", en: "Helping others just makes trouble for yourself." }] },
  "我们": { py: "wǒ men", kind: "word", trad: "我們", senses: [{ en: "we; us", zh: "说话人和其他人" }], ex: [{ zh: "我们的社会，或许就会多一些信任。", py: "Wǒmen de shèhuì, huòxǔ jiù huì duō yīxiē xìnrèn.", en: "Our society might have a little more trust." }] },
  "如果": { py: "rú guǒ", kind: "word", senses: [{ en: "if; in the event that", zh: "表示假设" }], ex: [{ zh: "如果每个人都愿意……", py: "Rúguǒ měi gè rén dōu yuànyì……", en: "If everyone were willing…" }] },
  "一句话": { py: "yī jù huà", kind: "word", trad: "一句話", senses: [{ en: "a sentence; a remark; in a word", zh: "一个句子；简单地说" }], ex: [{ zh: "正如一句话所说……", py: "Zhèngrú yī jù huà suǒ shuō……", en: "As the saying goes…" }] },
  "冲过去": { py: "chōng guò qù", kind: "word", trad: "衝過去", senses: [{ en: "to rush over; to dash across", zh: "很快地跑过去" }], ex: [{ zh: "我像离弦的箭一样冲过去。", py: "Wǒ xiàng lí xián de jiàn yīyàng chōng guòqù.", en: "I shot over like an arrow off the bowstring." }] },
  "立刻": { py: "lì kè", kind: "word", senses: [{ en: "immediately; at once; right away", zh: "马上" }], ex: [{ zh: "我立刻拔腿狂奔。", py: "Wǒ lìkè bátuǐ kuángbēn.", en: "I immediately broke into a run." }] },
  "远远地": { py: "yuǎn yuǎn de", kind: "word", trad: "遠遠地", senses: [{ en: "from afar; from a distance", zh: "从很远的地方" }], ex: [{ zh: "远远地看到我要搭的巴士。", py: "Yuǎnyuǎn de kàndào wǒ yào dā de bāshì.", en: "From a distance I saw the bus I needed." }] },
  "回家": { py: "huí jiā", kind: "word", senses: [{ en: "to go home; to return home", zh: "回到家里" }], ex: [{ zh: "我赶着搭巴士回家。", py: "Wǒ gǎn zhe dā bāshì huí jiā.", en: "I rushed to catch the bus home." }] },
  "上车": { py: "shàng chē", kind: "word", trad: "上車", senses: [{ en: "to board a vehicle; to get on", zh: "登上车辆" }], ex: [{ zh: "上车前，我连声道谢。", py: "Shàngchē qián, wǒ liánshēng dàoxiè.", en: "Before boarding, I thanked him repeatedly." }] },
  "一位": { py: "yī wèi", kind: "word", senses: [{ en: "one (person) — 位 is the polite measure word for people", zh: "「位」是对人的敬称量词" }], ex: [{ zh: "一位同事正快步走来。", py: "Yī wèi tóngshì zhèng kuàibù zǒu lái.", en: "A colleague was walking briskly over." }] },
  "进门": { py: "jìn mén", kind: "word", trad: "進門", senses: [{ en: "to enter (a door); to come in", zh: "从门口走进去" }], ex: [{ zh: "他进门时连声说“谢谢”。", py: "Tā jìn mén shí liánshēng shuō “xièxie”.", en: "He kept saying “thank you” as he entered." }] },
  "谢谢": { py: "xiè xie", kind: "word", trad: "謝謝", senses: [{ en: "thank you; thanks", zh: "表示感谢" }], ex: [{ zh: "他连声说“谢谢”。", py: "Tā liánshēng shuō “xièxie”.", en: "He kept saying “thank you”." }] },
  "多做": { py: "duō zuò", kind: "word", senses: [{ en: "to do more", zh: "做得更多" }], ex: [{ zh: "为他人多做这一点点。", py: "Wèi tārén duō zuò zhè yīdiǎndiǎn.", en: "To do this little bit more for others." }] },
};

// ============================================================================
// COMMON SINGLE CHARACTERS
// Fallback layer so that every character in the passage is still clickable
// even when it isn't part of a multi-character word. Only merged in where the
// character isn't already a headword above.
// ============================================================================
const CHARS = {
  "的": { py: "de", kind: "char", senses: [{ en: "possessive / attributive particle", zh: "结构助词，表示领属或修饰" }] },
  "了": { py: "le", kind: "char", senses: [{ en: "particle marking a completed action or a change of state", zh: "助词，表示动作完成或情况变化" }] },
  "是": { py: "shì", kind: "char", senses: [{ en: "to be; is; am; are", zh: "表示判断" }, { en: "yes; correct", zh: "对，正确" }] },
  "在": { py: "zài", kind: "char", senses: [{ en: "at; in; on", zh: "表示地点" }, { en: "to exist; to be present", zh: "存在" }, { en: "in the middle of doing (progressive)", zh: "表示动作正在进行" }] },
  "我": { py: "wǒ", kind: "char", senses: [{ en: "I; me", zh: "自称" }] },
  "你": { py: "nǐ", kind: "char", senses: [{ en: "you (singular)", zh: "称对方" }] },
  "他": { py: "tā", kind: "char", senses: [{ en: "he; him", zh: "称男性第三者" }] },
  "它": { py: "tā", kind: "char", senses: [{ en: "it (non-human)", zh: "称人以外的事物" }] },
  "它们": { py: "tā men", kind: "word", trad: "它們", senses: [{ en: "they; them (non-human)", zh: "称多个人以外的事物" }] },
  "们": { py: "men", kind: "char", trad: "們", senses: [{ en: "plural marker for pronouns and people", zh: "表示复数的词尾" }] },
  "这": { py: "zhè", kind: "char", trad: "這", senses: [{ en: "this", zh: "指较近的人或事物" }] },
  "这样": { py: "zhè yàng", kind: "word", trad: "這樣", senses: [{ en: "like this; such; in this way", zh: "如此，这么" }] },
  "这些": { py: "zhè xiē", kind: "word", trad: "這些", senses: [{ en: "these", zh: "指较近的多个事物" }] },
  "这个": { py: "zhè ge", kind: "word", trad: "這個", senses: [{ en: "this one; this", zh: "指某一个较近的事物" }] },
  "这时": { py: "zhè shí", kind: "word", trad: "這時", senses: [{ en: "at this moment; just then", zh: "在这个时候" }] },
  "那": { py: "nà", kind: "char", senses: [{ en: "that", zh: "指较远的人或事物" }] },
  "那些": { py: "nà xiē", kind: "word", senses: [{ en: "those", zh: "指较远的多个事物" }] },
  "那么": { py: "nà me", kind: "word", trad: "那麼", senses: [{ en: "so; to that degree", zh: "表示程度" }, { en: "in that case; then", zh: "表示承接" }] },
  "有": { py: "yǒu", kind: "char", senses: [{ en: "to have; to possess", zh: "领有" }, { en: "there is; there are", zh: "存在" }] },
  "没有": { py: "méi yǒu", kind: "word", senses: [{ en: "not have; there is not", zh: "「有」的否定" }, { en: "did not (past negation)", zh: "否定过去的动作" }] },
  "还有": { py: "hái yǒu", kind: "word", trad: "還有", senses: [{ en: "also; in addition; there is still", zh: "另外还" }] },
  "不": { py: "bù", kind: "char", senses: [{ en: "not; no", zh: "表示否定" }] },
  "也": { py: "yě", kind: "char", senses: [{ en: "also; too; as well", zh: "表示同样" }] },
  "就": { py: "jiù", kind: "char", senses: [{ en: "then; right away; at once", zh: "表示紧接着" }, { en: "only; merely", zh: "仅仅" }, { en: "precisely; exactly", zh: "正是" }] },
  "都": { py: "dōu", kind: "char", senses: [{ en: "all; both; entirely", zh: "表示总括" }, { en: "already (dōu)", zh: "表示已经" }] },
  "很": { py: "hěn", kind: "char", senses: [{ en: "very; quite", zh: "表示程度高" }] },
  "和": { py: "hé", kind: "char", senses: [{ en: "and; with", zh: "连接并列的词" }, { en: "peace; harmony", zh: "和平，和谐" }] },
  "与": { py: "yǔ", kind: "char", trad: "與", senses: [{ en: "and; with (more formal than 和)", zh: "跟，同（书面语）" }] },
  "但": { py: "dàn", kind: "char", senses: [{ en: "but; yet; however", zh: "表示转折" }] },
  "却": { py: "què", kind: "char", trad: "卻", senses: [{ en: "but; yet; however (indicates a turn contrary to expectation)", zh: "表示转折，跟前面的意思相反" }] },
  "而": { py: "ér", kind: "char", senses: [{ en: "and; yet; but (connective)", zh: "连词，连接前后成分" }] },
  "之": { py: "zhī", kind: "char", senses: [{ en: "of (literary possessive, ≈ 的)", zh: "书面语的「的」" }, { en: "him; her; it (literary object pronoun)", zh: "书面语的代词" }] },
  "中": { py: "zhōng", kind: "char", senses: [{ en: "middle; centre; in; among", zh: "中间，里面" }, { en: "China (as in 中文, 中国)", zh: "中国" }] },
  "里": { py: "lǐ", kind: "char", trad: "裡", senses: [{ en: "inside; in", zh: "内部" }, { en: "li — a traditional unit of distance (500m)", zh: "长度单位" }] },
  "上": { py: "shàng", kind: "char", senses: [{ en: "on; above; upper", zh: "位置在高处" }, { en: "to go up; to board", zh: "从低到高；登上" }, { en: "previous; last (上次)", zh: "前一个" }] },
  "下": { py: "xià", kind: "char", senses: [{ en: "under; below; down", zh: "位置在低处" }, { en: "to go down; to get off", zh: "从高到低" }, { en: "next (下次)", zh: "后一个" }] },
  "前": { py: "qián", kind: "char", senses: [{ en: "front; ahead", zh: "位置在正面" }, { en: "before; previous", zh: "时间在先" }] },
  "后面": { py: "hòu miàn", kind: "word", trad: "後面", senses: [{ en: "behind; at the back", zh: "在后边" }] },
  "更": { py: "gèng", kind: "char", senses: [{ en: "even more; still more", zh: "表示程度加深" }] },
  "更多": { py: "gèng duō", kind: "word", senses: [{ en: "more; even more", zh: "数量增加" }] },
  "最": { py: "zuì", kind: "char", senses: [{ en: "most; -est (superlative)", zh: "表示程度最高" }] },
  "才": { py: "cái", kind: "char", senses: [{ en: "only then; not until", zh: "表示事情发生得晚" }, { en: "only; merely", zh: "仅仅" }, { en: "talent; ability", zh: "才能" }] },
  "又": { py: "yòu", kind: "char", senses: [{ en: "again; once more", zh: "表示重复" }, { en: "and also; both… and…", zh: "表示并列" }] },
  "还": { py: "hái", kind: "char", trad: "還", senses: [{ en: "still; yet", zh: "表示继续" }, { en: "also; in addition", zh: "另外" }] },
  "已": { py: "yǐ", kind: "char", senses: [{ en: "already", zh: "表示完成" }] },
  "正": { py: "zhèng", kind: "char", senses: [{ en: "just now; in the middle of (doing)", zh: "表示动作正在进行" }, { en: "upright; straight; correct", zh: "不歪，端正" }] },
  "先": { py: "xiān", kind: "char", senses: [{ en: "first; before; earlier", zh: "时间或次序在前" }] },
  "再": { py: "zài", kind: "char", senses: [{ en: "again; once more", zh: "表示重复" }, { en: "then (after doing something else)", zh: "表示先后顺序" }] },
  "大": { py: "dà", kind: "char", senses: [{ en: "big; large; great", zh: "体积、面积等超过一般" }] },
  "小": { py: "xiǎo", kind: "char", senses: [{ en: "small; little; young", zh: "体积、数量等不及一般" }] },
  "多": { py: "duō", kind: "char", senses: [{ en: "many; much; more", zh: "数量大" }, { en: "how (in questions of degree)", zh: "用于疑问，表示程度" }] },
  "少": { py: "shǎo", kind: "char", senses: [{ en: "few; little; less", zh: "数量小" }] },
  "好": { py: "hǎo", kind: "char", senses: [{ en: "good; fine; well", zh: "优点多的" }, { en: "easy to (do)", zh: "容易" }, { en: "very; quite (intensifier)", zh: "表示程度深" }] },
  "说": { py: "shuō", kind: "char", trad: "說", senses: [{ en: "to speak; to say; to talk", zh: "用话表达意思" }, { en: "to explain; to tell", zh: "解释，说明" }] },
  "看": { py: "kàn", kind: "char", senses: [{ en: "to look at; to see; to watch", zh: "用眼睛观察" }, { en: "to read", zh: "阅读" }, { en: "to think; to regard as", zh: "认为" }, { en: "to visit", zh: "探望" }] },
  "看到": { py: "kàn dào", kind: "word", senses: [{ en: "to see; to catch sight of", zh: "看见" }] },
  "想": { py: "xiǎng", kind: "char", senses: [{ en: "to think", zh: "开动脑筋" }, { en: "to want to; would like to", zh: "打算，希望" }, { en: "to miss; to long for", zh: "怀念" }] },
  "做": { py: "zuò", kind: "char", senses: [{ en: "to do; to make", zh: "进行某种活动" }, { en: "to work as; to act as", zh: "担任" }] },
  "去": { py: "qù", kind: "char", senses: [{ en: "to go; to leave", zh: "从一个地方到另一个地方" }, { en: "to remove; to get rid of", zh: "除掉" }] },
  "来": { py: "lái", kind: "char", trad: "來", senses: [{ en: "to come", zh: "从别处到这里" }] },
  "来说": { py: "lái shuō", kind: "word", trad: "來說", senses: [{ en: "as far as … is concerned; speaking of (对…来说)", zh: "用于「对……来说」的固定格式" }] },
  "到": { py: "dào", kind: "char", senses: [{ en: "to arrive; to reach", zh: "达到" }, { en: "to; up to (a place or time)", zh: "表示终点" }] },
  "走": { py: "zǒu", kind: "char", senses: [{ en: "to walk; to go", zh: "用脚移动" }, { en: "to leave; to depart", zh: "离开" }] },
  "走来": { py: "zǒu lái", kind: "word", trad: "走來", senses: [{ en: "to walk over; to come towards", zh: "朝这边走过来" }] },
  "吃": { py: "chī", kind: "char", senses: [{ en: "to eat", zh: "把食物放进嘴里" }] },
  "让": { py: "ràng", kind: "char", trad: "讓", senses: [{ en: "to let; to allow; to make (someone do)", zh: "使，容许" }, { en: "to yield; to give way", zh: "把方便或好处给别人" }] },
  "给": { py: "gěi", kind: "char", trad: "給", senses: [{ en: "to give", zh: "使对方得到" }, { en: "for; to (marks the beneficiary)", zh: "介词，引出对象" }] },
  "对": { py: "duì", kind: "char", trad: "對", senses: [{ en: "towards; to; regarding", zh: "介词，引出对象" }, { en: "correct; right", zh: "正确" }, { en: "a pair", zh: "两个，一双" }] },
  "从": { py: "cóng", kind: "char", trad: "從", senses: [{ en: "from; since", zh: "表示起点" }] },
  "向": { py: "xiàng", kind: "char", senses: [{ en: "towards; to; facing", zh: "介词，表示方向" }] },
  "把": { py: "bǎ", kind: "char", senses: [{ en: "particle placing the object before the verb", zh: "介词，把宾语提到动词前" }, { en: "measure word for things with a handle", zh: "用于有把手的东西" }, { en: "to hold; to grasp", zh: "握住" }] },
  "被": { py: "bèi", kind: "char", senses: [{ en: "by (marks the passive voice)", zh: "介词，表示被动" }, { en: "quilt; blanket", zh: "睡觉时盖的东西" }] },
  "用": { py: "yòng", kind: "char", senses: [{ en: "to use; with (by means of)", zh: "使用" }, { en: "use; usefulness", zh: "用处" }] },
  "能": { py: "néng", kind: "char", senses: [{ en: "can; to be able to", zh: "有能力做" }, { en: "energy; capability", zh: "能力，能量" }] },
  "会": { py: "huì", kind: "char", trad: "會", senses: [{ en: "can; to know how to", zh: "懂得怎样做" }, { en: "will; be likely to", zh: "表示可能" }, { en: "meeting; gathering", zh: "聚会" }] },
  "要": { py: "yào", kind: "char", senses: [{ en: "to want; to need", zh: "希望得到" }, { en: "will; be going to", zh: "表示将要" }, { en: "important", zh: "重要的" }] },
  "可以": { py: "kě yǐ", kind: "word", senses: [{ en: "can; may; be permitted to", zh: "表示许可或可能" }, { en: "not bad; passable", zh: "还好，过得去" }] },
  "可": { py: "kě", kind: "char", senses: [{ en: "but; yet", zh: "表示转折" }, { en: "can; may", zh: "能够，可以" }] },
  "为": { py: "wèi", kind: "char", trad: "為", senses: [{ en: "for; for the sake of", zh: "表示目的或对象" }, { en: "because of", zh: "由于" }, { en: "to be; to act as (wéi)", zh: "作为，是（读 wéi）" }] },
  "因为": { py: "yīn wèi", kind: "word", trad: "因為", senses: [{ en: "because; since", zh: "表示原因" }] },
  "所以": { py: "suǒ yǐ", kind: "word", senses: [{ en: "therefore; so; as a result", zh: "表示结果" }] },
  "所说": { py: "suǒ shuō", kind: "word", trad: "所說", senses: [{ en: "what is said; as said", zh: "所说的内容" }] },
  "时": { py: "shí", kind: "char", trad: "時", senses: [{ en: "time; hour", zh: "时间" }, { en: "when; at the time of", zh: "表示时候" }] },
  "天": { py: "tiān", kind: "char", senses: [{ en: "day", zh: "一昼夜" }, { en: "sky; heaven", zh: "天空" }, { en: "weather", zh: "天气" }] },
  "年": { py: "nián", kind: "char", senses: [{ en: "year", zh: "时间单位" }] },
  "人": { py: "rén", kind: "char", senses: [{ en: "person; people; human being", zh: "能制造并使用工具的高等动物" }] },
  "心": { py: "xīn", kind: "char", senses: [{ en: "heart", zh: "人体器官" }, { en: "mind; feelings; intention", zh: "思想、感情" }, { en: "centre; core", zh: "中心" }] },
  "手": { py: "shǒu", kind: "char", senses: [{ en: "hand", zh: "人体上肢前端" }, { en: "a person skilled at something (如 高手)", zh: "掌握某种技能的人" }] },
  "门": { py: "mén", kind: "char", trad: "門", senses: [{ en: "door; gate", zh: "房屋的出入口" }, { en: "category; class", zh: "类别" }] },
  "车": { py: "chē", kind: "char", trad: "車", senses: [{ en: "vehicle; car", zh: "有轮子的交通工具" }] },
  "站": { py: "zhàn", kind: "char", senses: [{ en: "to stand", zh: "直立" }, { en: "station; stop", zh: "车站" }] },
  "坐": { py: "zuò", kind: "char", senses: [{ en: "to sit", zh: "臀部着物体" }, { en: "to travel by (a vehicle)", zh: "乘坐" }] },
  "坐下来": { py: "zuò xià lái", kind: "word", trad: "坐下來", senses: [{ en: "to sit down", zh: "坐下" }] },
  "进": { py: "jìn", kind: "char", trad: "進", senses: [{ en: "to enter; to go in", zh: "由外到内" }, { en: "to advance; to make progress", zh: "向前，进步" }] },
  "进来": { py: "jìn lái", kind: "word", trad: "進來", senses: [{ en: "to come in; to enter", zh: "从外面到里面来" }] },
  "出现": { py: "chū xiàn", kind: "word", trad: "出現", senses: [{ en: "to appear; to emerge; to show up", zh: "显露出来" }] },
  "开": { py: "kāi", kind: "char", trad: "開", senses: [{ en: "to open", zh: "使关闭的东西张开" }, { en: "to switch on; to start (a machine)", zh: "启动" }, { en: "to drive (a vehicle)", zh: "驾驶" }, { en: "to hold (a meeting); to run (a shop)", zh: "举行；经营" }] },
  "关": { py: "guān", kind: "char", trad: "關", senses: [{ en: "to close; to shut", zh: "使开着的东西合上" }, { en: "to switch off; to turn off", zh: "使停止运转" }, { en: "to concern; relation (as in 关系)", zh: "关联，牵涉" }] },
  "关门": { py: "guān mén", kind: "word", trad: "關門", senses: [{ en: "to close the door", zh: "把门关上" }, { en: "to close for business", zh: "商店停止营业" }] },
  "敞": { py: "chǎng", kind: "char", senses: [{ en: "to leave open; wide open", zh: "张开，不关闭" }, { en: "spacious; roomy", zh: "宽阔" }] },
  "等": { py: "děng", kind: "char", senses: [{ en: "to wait", zh: "停留着不进行下一步" }, { en: "etc.; and so on", zh: "表示列举未尽" }, { en: "grade; rank; class", zh: "级别" }] },
  "冲": { py: "chōng", kind: "char", trad: "衝", senses: [{ en: "to rush; to dash; to charge", zh: "很快地向前闯" }, { en: "to rinse; to flush (chōng)", zh: "用水浇" }] },
  "搭": { py: "dā", kind: "char", senses: [{ en: "to take (a bus, plane, etc.); to travel by", zh: "乘坐交通工具" }, { en: "to put up; to build (a shelter)", zh: "架起，支起" }] },
  "赶": { py: "gǎn", kind: "char", trad: "趕", senses: [{ en: "to hurry; to rush", zh: "加快行动" }, { en: "to catch (a bus, a train)", zh: "赶上" }, { en: "to drive away; to chase off", zh: "驱逐" }] },
  "赶着": { py: "gǎn zhe", kind: "word", trad: "趕著", senses: [{ en: "to be in a rush to; hurrying to", zh: "急着要做某事" }] },
  "朝": { py: "cháo", kind: "char", senses: [{ en: "towards; facing", zh: "介词，表示方向" }, { en: "dynasty; imperial court (cháo)", zh: "朝代，朝廷" }] },
  "扬": { py: "yáng", kind: "char", trad: "揚", senses: [{ en: "to raise; to lift up (a hand, a flag)", zh: "高高举起" }, { en: "to spread; to make known", zh: "传播" }] },
  "几": { py: "jǐ", kind: "char", trad: "幾", senses: [{ en: "a few; several", zh: "表示不定的数目" }, { en: "how many? (in questions)", zh: "询问数目" }] },
  "秒": { py: "miǎo", kind: "char", senses: [{ en: "second (unit of time)", zh: "时间单位，六十分之一分钟" }] },
  "位": { py: "wèi", kind: "char", senses: [{ en: "polite measure word for people", zh: "对人的敬称量词" }, { en: "position; place; seat", zh: "所在的地方" }] },
  "名": { py: "míng", kind: "char", senses: [{ en: "measure word for people (esp. by profession or rank)", zh: "用于人的量词" }, { en: "name", zh: "名字" }, { en: "famous; well-known", zh: "出名的" }] },
  "个": { py: "gè", kind: "char", trad: "個", senses: [{ en: "the general-purpose measure word", zh: "最通用的量词" }] },
  "种": { py: "zhǒng", kind: "char", trad: "種", senses: [{ en: "kind; sort; type (measure word)", zh: "表示类别的量词" }, { en: "seed; species", zh: "种子；物种" }, { en: "to plant; to sow (zhòng)", zh: "栽种（读 zhòng）" }] },
  "次": { py: "cì", kind: "char", senses: [{ en: "time; occurrence (measure word)", zh: "表示动作次数的量词" }, { en: "second (in order); next", zh: "第二的，次一等的" }] },
  "份": { py: "fèn", kind: "char", senses: [{ en: "portion; share; a measure word for abstract things (a bit of warmth, of trust)", zh: "整体里的一部分；也用作抽象事物的量词" }] },
  "句": { py: "jù", kind: "char", senses: [{ en: "sentence; measure word for sentences and remarks", zh: "句子；用于言语的量词" }] },
  "声": { py: "shēng", kind: "char", trad: "聲", senses: [{ en: "sound; voice", zh: "声音" }, { en: "tone (in Chinese pronunciation)", zh: "声调" }, { en: "measure word for utterances or cries", zh: "用于声音的量词" }] },
  "连": { py: "lián", kind: "char", trad: "連", senses: [{ en: "even (连…都/也 = even … does not)", zh: "「连……都／也」表示强调" }, { en: "to connect; to join", zh: "连接" }, { en: "in succession; one after another", zh: "接连不断" }] },
  "别": { py: "bié", kind: "char", trad: "別", senses: [{ en: "don't (imperative)", zh: "表示禁止或劝阻" }, { en: "other; another", zh: "另外的" }, { en: "to separate; to part", zh: "分离" }] },
  "每": { py: "měi", kind: "char", senses: [{ en: "every; each", zh: "指全体中的任何一个" }] },
  "需要": { py: "xū yào", kind: "word", senses: [{ en: "to need; to require", zh: "应该有" }, { en: "needs; requirements", zh: "对事物的要求" }] },
  "谈": { py: "tán", kind: "char", trad: "談", senses: [{ en: "to talk; to discuss; to speak about", zh: "说话，讨论" }] },
  "一起": { py: "yī qǐ", kind: "word", senses: [{ en: "together", zh: "同一处；共同" }] },
  "一下": { py: "yī xià", kind: "word", senses: [{ en: "once; briefly; for a moment (softens the verb)", zh: "用在动词后，表示动作短暂或轻松" }] },
  "一点": { py: "yī diǎn", kind: "word", trad: "一點", senses: [{ en: "a little; a bit", zh: "少量" }] },
  "一些": { py: "yī xiē", kind: "word", senses: [{ en: "some; a few", zh: "不定的少量" }] },
  "一句": { py: "yī jù", kind: "word", senses: [{ en: "one sentence; a remark", zh: "一个句子" }] },
  "一愣": { py: "yī lèng", kind: "word", senses: [{ en: "to be momentarily stunned; to be taken aback", zh: "一时发呆" }] },
  "另": { py: "lìng", kind: "char", senses: [{ en: "another; other; separately", zh: "别的，此外" }] },
  "两": { py: "liǎng", kind: "char", trad: "兩", senses: [{ en: "two (used before measure words)", zh: "数目，用在量词前" }, { en: "both sides; a couple of", zh: "双方；几个" }] },
  "两国": { py: "liǎng guó", kind: "word", trad: "兩國", senses: [{ en: "the two countries; bilateral", zh: "两个国家" }] },
  "学": { py: "xué", kind: "char", trad: "學", senses: [{ en: "to study; to learn", zh: "获得知识或技能" }, { en: "subject of study; -ology", zh: "学科" }] },
  "学到": { py: "xué dào", kind: "word", trad: "學到", senses: [{ en: "to learn (and acquire); to pick up", zh: "学习并掌握" }] },
  "笑": { py: "xiào", kind: "char", senses: [{ en: "to laugh; to smile", zh: "露出愉快的表情" }, { en: "to laugh at; to mock", zh: "讥笑" }] },
  "笑着": { py: "xiào zhe", kind: "word", trad: "笑著", senses: [{ en: "smilingly; with a smile", zh: "带着笑容地" }] },
  "回": { py: "huí", kind: "char", senses: [{ en: "to return; to go back", zh: "从别处到原处" }, { en: "to reply; to answer", zh: "答复" }, { en: "time; occasion (measure word)", zh: "次，回数" }] },
  "桌": { py: "zhuō", kind: "char", senses: [{ en: "table; desk", zh: "有平面和腿的家具" }] },
  "版": { py: "bǎn", kind: "char", senses: [{ en: "edition; version", zh: "书籍或事物的某一形式" }, { en: "printing plate", zh: "印刷用的底板" }] },
  "驶离": { py: "shǐ lí", kind: "word", trad: "駛離", senses: [{ en: "to drive away from; to pull out of", zh: "车、船开走，离开" }] },
  "准备": { py: "zhǔn bèi", kind: "word", trad: "準備", senses: [{ en: "to prepare; to get ready", zh: "事先安排好" }, { en: "to intend to; to plan to", zh: "打算" }] },
  "按住": { py: "àn zhù", kind: "word", senses: [{ en: "to hold down; to press and keep pressed", zh: "按着不放" }] },
  "键": { py: "jiàn", kind: "char", trad: "鍵", senses: [{ en: "key; button (on a keyboard or panel)", zh: "机器或乐器上用手按的部分" }] },
  "常在": { py: "cháng zài", kind: "word", senses: [{ en: "to be always present; to always remain", zh: "一直存在" }] },
  "愿": { py: "yuàn", kind: "char", trad: "願", senses: [{ en: "to wish; may it be that", zh: "希望" }, { en: "willing", zh: "乐意" }] },
  "以待": { py: "yǐ dài", kind: "word", senses: [{ en: "so as to treat (someone in a certain way) — literary", zh: "用某种态度对待（书面语）" }] },
  "说得": { py: "shuō de", kind: "word", trad: "說得", senses: [{ en: "to speak (in such a way) — verb + 得 + description", zh: "「说」加补语，描述说的程度" }] },
  "真好": { py: "zhēn hǎo", kind: "word", senses: [{ en: "really good; how nice", zh: "确实很好" }] },
  "真": { py: "zhēn", kind: "char", senses: [{ en: "really; truly; indeed", zh: "确实，的确" }, { en: "true; real; genuine", zh: "跟客观事实相符" }] },
  "扬手": { py: "yáng shǒu", kind: "word", trad: "揚手", senses: [{ en: "to raise / wave one's hand", zh: "把手举起来挥动" }] },
  "做不了": { py: "zuò bù liǎo", kind: "word", senses: [{ en: "to be unable to do; cannot manage", zh: "没有能力做到" }] },
  "学不会": { py: "xué bù huì", kind: "word", trad: "學不會", senses: [{ en: "unable to learn; never learns how to", zh: "学了也不能掌握" }] },
  "帮别人": { py: "bāng bié ren", kind: "word", trad: "幫別人", senses: [{ en: "to help others", zh: "帮助他人" }] },
  "给自己": { py: "gěi zì jǐ", kind: "word", trad: "給自己", senses: [{ en: "for oneself; to oneself", zh: "为自己" }] },
  "反": { py: "fǎn", kind: "char", senses: [{ en: "on the contrary; instead", zh: "反而，相反地" }, { en: "to turn over; to reverse", zh: "翻转" }, { en: "to oppose; anti-", zh: "反对" }] },
  "太": { py: "tài", kind: "char", senses: [{ en: "too; excessively", zh: "表示程度过分" }, { en: "extremely; very", zh: "表示程度很高" }] },
  "先后": { py: "xiān hòu", kind: "word", trad: "先後", senses: [{ en: "one after another; in succession", zh: "前后相继" }] },
  "更快": { py: "gèng kuài", kind: "word", senses: [{ en: "faster; more quickly", zh: "速度更高" }] },
  "更为": { py: "gèng wéi", kind: "word", trad: "更為", senses: [{ en: "even more; still more (formal)", zh: "更加（书面语）" }] },
  "比": { py: "bǐ", kind: "char", senses: [{ en: "than; compared with", zh: "用于比较" }, { en: "to compare", zh: "较量，对比" }] },
  "先坐": { py: "xiān zuò", kind: "word", senses: [{ en: "to sit first", zh: "先坐下" }] },

  // Remaining function words, so no character in either passage is dead text.
  "一": { py: "yī", kind: "char", senses: [{ en: "one; a; an", zh: "数目字" }, { en: "the whole; entire (as in 一天)", zh: "整个，满" }, { en: "as soon as (一…就…)", zh: "「一……就……」表示紧接着" }] },
  "只": { py: "zhǐ", kind: "char", senses: [{ en: "only; merely", zh: "仅仅" }, { en: "measure word for animals, one of a pair (zhī)", zh: "量词，用于动物等（读 zhī）" }] },
  "感": { py: "gǎn", kind: "char", senses: [{ en: "to feel; to sense", zh: "觉得" }, { en: "feeling; sense (as a suffix: 紧张感)", zh: "感觉，用作词尾" }, { en: "to be grateful; to be moved", zh: "感激，感动" }] },
  "地": { py: "de", kind: "char", senses: [{ en: "adverbial particle — attaches to a word to modify a verb", zh: "结构助词，用在状语后" }, { en: "earth; ground; land (dì)", zh: "地面，土地（读 dì）" }] },
  "像": { py: "xiàng", kind: "char", senses: [{ en: "to resemble; to be like", zh: "相似" }, { en: "such as; for example", zh: "比如" }, { en: "image; portrait", zh: "人物的形象" }] },
  "没": { py: "méi", kind: "char", senses: [{ en: "not; have not (negates 有 and past actions)", zh: "表示否定，多用于「没有」" }, { en: "to sink; to submerge (mò)", zh: "沉下去（读 mò）" }] },
  "着": { py: "zhe", kind: "char", trad: "著", senses: [{ en: "particle marking a continuing state or manner (笑着说)", zh: "助词，表示动作持续或方式" }] },
  "话": { py: "huà", kind: "char", trad: "話", senses: [{ en: "words; speech; what is said", zh: "说出来的语言" }, { en: "to talk about", zh: "谈论" }] },
  "候": { py: "hòu", kind: "char", senses: [{ en: "to wait", zh: "等待" }, { en: "time; season (in 时候, 气候)", zh: "时节，时间" }] },
  "时候": { py: "shí hou", kind: "word", trad: "時候", senses: [{ en: "time; moment; when", zh: "某个时间点或时段" }] },
  "更多时候": { py: "gèng duō shí hou", kind: "word", trad: "更多時候", senses: [{ en: "more often than not; most of the time", zh: "多数的时候" }] },
  "吗": { py: "ma", kind: "char", trad: "嗎", senses: [{ en: "question particle, turning a statement into a yes/no question", zh: "疑问助词" }] },
  "呢": { py: "ne", kind: "char", senses: [{ en: "sentence-final particle — softens a question or marks continuation", zh: "语气助词，用于疑问或停顿" }] },
  "于": { py: "yú", kind: "char", trad: "於", senses: [{ en: "at; in; from; than (literary preposition)", zh: "介词，表示时间、地点、比较等" }] },
  "什么": { py: "shén me", kind: "word", trad: "什麼", senses: [{ en: "what", zh: "疑问代词" }, { en: "something; anything", zh: "表示不确定的事物" }] },
  "做什么": { py: "zuò shén me", kind: "word", trad: "做什麼", senses: [{ en: "to do what; whatever one does", zh: "干什么" }] },
  "难": { py: "nán", kind: "char", trad: "難", senses: [{ en: "difficult; hard", zh: "不容易" }, { en: "hard to bear; unpleasant (难看, 难过)", zh: "使人不舒服" }] },
  "那位": { py: "nà wèi", kind: "word", senses: [{ en: "that (person) — polite", zh: "指那个人（敬称）" }] },
  "一点点": { py: "yī diǎn diǎn", kind: "word", trad: "一點點", senses: [{ en: "a tiny bit; just a little", zh: "极少的一点" }] },
  "多一份": { py: "duō yī fèn", kind: "word", senses: [{ en: "one more measure of; a little more (of something abstract)", zh: "增加一份" }] },
  "多一个": { py: "duō yī gè", kind: "word", trad: "多一個", senses: [{ en: "one more", zh: "增加一个" }] },
  "多一次": { py: "duō yī cì", kind: "word", senses: [{ en: "one more time", zh: "增加一次" }] },
  "多一点": { py: "duō yī diǎn", kind: "word", trad: "多一點", senses: [{ en: "a little more", zh: "增加一点" }] },
  "多一些": { py: "duō yī xiē", kind: "word", senses: [{ en: "somewhat more", zh: "增加一些" }] },
  "你我": { py: "nǐ wǒ", kind: "word", senses: [{ en: "you and I", zh: "你和我" }] },
  "生活中": { py: "shēng huó zhōng", kind: "word", senses: [{ en: "in life; in daily living", zh: "在日常生活里" }] },
  "很多人": { py: "hěn duō rén", kind: "word", senses: [{ en: "many people", zh: "许多人" }] },
  "那么多人": { py: "nà me duō rén", kind: "word", trad: "那麼多人", senses: [{ en: "so many people", zh: "如此多的人" }] },
  "有人": { py: "yǒu rén", kind: "word", senses: [{ en: "someone; some people; there is someone", zh: "某个人；某些人" }] },
  "有可能": { py: "yǒu kě néng", kind: "word", senses: [{ en: "it is possible that; may well", zh: "存在可能性" }] },
  "小举动": { py: "xiǎo jǔ dòng", kind: "word", trad: "小舉動", senses: [{ en: "a small act; a little gesture", zh: "微小的行为" }] },
  "小动作": { py: "xiǎo dòng zuò", kind: "word", trad: "小動作", senses: [{ en: "a small movement; a slight gesture", zh: "细微的动作" }] },
  "一两": { py: "yī liǎng", kind: "word", trad: "一兩", senses: [{ en: "one or two; a couple of", zh: "一个或两个" }] },
  "这句话": { py: "zhè jù huà", kind: "word", trad: "這句話", senses: [{ en: "this remark; these words", zh: "这一句" }] },
  "这一点": { py: "zhè yī diǎn", kind: "word", trad: "這一點", senses: [{ en: "this point; this particular thing", zh: "这个方面" }] },
  "不也": { py: "bù yě", kind: "word", senses: [{ en: "isn't it also…? (rhetorical)", zh: "反问语气：难道不也是" }] },
  "正是": { py: "zhèng shì", kind: "word", senses: [{ en: "precisely is; exactly", zh: "恰恰是" }] },
  "不只是": { py: "bù zhǐ shì", kind: "word", senses: [{ en: "not merely; more than just", zh: "不仅仅是" }] },
  "不远": { py: "bù yuǎn", kind: "word", trad: "不遠", senses: [{ en: "not far", zh: "距离近" }] },
  "处": { py: "chù", kind: "char", trad: "處", senses: [{ en: "place; spot", zh: "地方" }, { en: "to get along with; to handle (chǔ)", zh: "相处；处理（读 chǔ）" }] },
  "键": { py: "jiàn", kind: "char", trad: "鍵", senses: [{ en: "key; button", zh: "用手按的部件" }] },
};

for (const [k, v] of Object.entries(CHARS)) {
  if (!DICT[k]) DICT[k] = v;
}

// ============================================================================
// THESAURUS LAYER — 近义词 / 反义词 / 相关词, plus extra example sentences.
//
// Kept separate from the headword definitions so the lexicographic content can
// be maintained (or generated, or bought in) independently of the entries.
// `syn` entries carry a `note` wherever the near-synonyms are NOT
// interchangeable — 近义词辨析 is the part students actually need, and it is
// exactly what a bare synonym list fails to teach.
//
// `ex` here is APPENDED to whatever the entry already has, never replaced.
// ============================================================================
const ENRICH = {
  "山珍海味": {
    syn: [
      { w: "美味佳肴", py: "měi wèi jiā yáo", en: "delicious food; fine dishes" },
      { w: "珍馐美馔", py: "zhēn xiū měi zhuàn", en: "rare delicacies", note: "书面语，比「山珍海味」更文雅。" },
      { w: "大鱼大肉", py: "dà yú dà ròu", en: "rich, meaty food", note: "口语，有时带贬义（太油腻、不健康）。" },
    ],
    ant: [
      { w: "粗茶淡饭", py: "cū chá dàn fàn", en: "coarse tea and plain rice — simple fare" },
      { w: "家常便饭", py: "jiā cháng biàn fàn", en: "everyday home cooking; a common occurrence" },
      { w: "清汤寡水", py: "qīng tāng guǎ shuǐ", en: "thin soup and plain water — meagre food" },
    ],
    ex: [
      { zh: "他吃惯了山珍海味，反而怀念妈妈煮的粥。", py: "Tā chī guàn le shānzhēn-hǎiwèi, fǎn'ér huáiniàn māma zhǔ de zhōu.", en: "Used to lavish delicacies, he found himself missing his mother's congee." },
      { zh: "宴席上山珍海味样样都有。", py: "Yànxí shàng shānzhēn-hǎiwèi yàngyàng dōu yǒu.", en: "The banquet had every delicacy imaginable." },
      { zh: "友情不是山珍海味，而是一碗热汤。", py: "Yǒuqíng bù shì shānzhēn-hǎiwèi, ér shì yī wǎn rè tāng.", en: "Friendship isn't a feast of delicacies; it's a bowl of hot soup." },
    ],
  },
  "民以食为天": {
    syn: [
      { w: "衣食为先", py: "yī shí wéi xiān", en: "food and clothing come first" },
      { w: "吃饭是头等大事", py: "chī fàn shì tóu děng dà shì", en: "eating is the number-one priority", note: "白话说法，语气较轻。" },
    ],
    ex: [
      { zh: "民以食为天，难怪一顿饭能谈成一笔生意。", py: "Mín yǐ shí wéi tiān, nánguài yī dùn fàn néng tán chéng yī bǐ shēngyì.", en: "Food is the people's heaven — no wonder a meal can close a deal." },
      { zh: "民以食为天，食以安为先。", py: "Mín yǐ shí wéi tiān, shí yǐ ān wéi xiān.", en: "Food is the people's heaven, and safety is food's first principle." },
    ],
  },
  "多一事不如少一事": {
    syn: [
      { w: "明哲保身", py: "míng zhé bǎo shēn", en: "to play safe and keep out of trouble", note: "书面语，偏重「保全自己」。" },
      { w: "不管闲事", py: "bù guǎn xián shì", en: "to mind one's own business" },
      { w: "事不关己", py: "shì bù guān jǐ", en: "it's none of my business" },
    ],
    ant: [
      { w: "见义勇为", py: "jiàn yì yǒng wéi", en: "to act bravely for a just cause" },
      { w: "挺身而出", py: "tǐng shēn ér chū", en: "to step forward boldly" },
      { w: "古道热肠", py: "gǔ dào rè cháng", en: "warm-hearted and ready to help" },
    ],
    ex: [
      { zh: "抱着多一事不如少一事的想法，他什么都不肯管。", py: "Bào zhe duō yī shì bù rú shǎo yī shì de xiǎngfǎ, tā shénme dōu bù kěn guǎn.", en: "Holding to a don't-invite-trouble outlook, he refused to get involved in anything." },
      { zh: "多一事不如少一事，这种心态让社会越来越冷漠。", py: "Duō yī shì bù rú shǎo yī shì, zhè zhǒng xīntài ràng shèhuì yuèláiyuè lěngmò.", en: "“Better not to get involved” — this mindset makes society colder and colder." },
    ],
  },
  "事不关己，己不劳心": {
    syn: [
      { w: "多一事不如少一事", py: "duō yī shì bù rú shǎo yī shì", en: "better not to get involved" },
      { w: "明哲保身", py: "míng zhé bǎo shēn", en: "to keep out of trouble to protect oneself" },
      { w: "漠不关心", py: "mò bù guān xīn", en: "utterly indifferent" },
    ],
    ant: [
      { w: "古道热肠", py: "gǔ dào rè cháng", en: "warm-hearted; always ready to help" },
      { w: "关怀备至", py: "guān huái bèi zhì", en: "to show the utmost care and concern" },
    ],
    ex: [
      { zh: "事不关己，己不劳心 —— 这正是冷漠的开始。", py: "Shì bù guān jǐ, jǐ bù láo xīn —— zhè zhèng shì lěngmò de kāishǐ.", en: "“Not my business, not my worry” — that is precisely where indifference begins." },
    ],
  },
  "破冰": {
    syn: [
      { w: "打破僵局", py: "dǎ pò jiāng jú", en: "to break a deadlock" },
      { w: "打开话题", py: "dǎ kāi huà tí", en: "to open up a conversation" },
      { w: "拉近距离", py: "lā jìn jù lí", en: "to close the distance between people" },
    ],
    ant: [
      { w: "僵持", py: "jiāng chí", en: "to be deadlocked; at a standstill" },
      { w: "冷场", py: "lěng chǎng", en: "an awkward silence; the room goes cold" },
    ],
    ex: [
      { zh: "一句玩笑就替我们破了冰。", py: "Yī jù wánxiào jiù tì wǒmen pò le bīng.", en: "A single joke broke the ice for us." },
      { zh: "会议开始前，他先用一个小游戏破冰。", py: "Huìyì kāishǐ qián, tā xiān yòng yī gè xiǎo yóuxì pòbīng.", en: "Before the meeting began, he used a small game to break the ice." },
      { zh: "美食是最好的破冰工具。", py: "Měishí shì zuì hǎo de pòbīng gōngjù.", en: "Good food is the best icebreaker there is." },
    ],
  },
  "温暖": {
    syn: [
      { w: "暖和", py: "nuǎn huo", en: "warm (of weather / a room)", note: "只用于温度，不能形容感情。" },
      { w: "亲切", py: "qīn qiè", en: "kind; cordial; warm (of manner)", note: "只形容态度，不能形容天气。" },
      { w: "热情", py: "rè qíng", en: "enthusiastic; warm-hearted", note: "偏重「主动、有热度」，比「温暖」外放。" },
      { w: "暖心", py: "nuǎn xīn", en: "heart-warming", note: "近年的口语说法，多形容小举动。" },
    ],
    ant: [
      { w: "寒冷", py: "hán lěng", en: "cold (of weather)" },
      { w: "冷漠", py: "lěng mò", en: "indifferent; cold (of people)" },
      { w: "冷淡", py: "lěng dàn", en: "cool; unenthusiastic" },
    ],
    ex: [
      { zh: "他的一句话，让我心里一暖。", py: "Tā de yī jù huà, ràng wǒ xīn lǐ yī nuǎn.", en: "One remark from him warmed my heart." },
      { zh: "这是一个温暖的故事。", py: "Zhè shì yī gè wēnnuǎn de gùshi.", en: "This is a heart-warming story." },
      { zh: "阳光温暖着大地。", py: "Yángguāng wēnnuǎn zhe dàdì.", en: "The sunlight warms the earth." },
    ],
  },
  "冷漠": {
    syn: [
      { w: "冷淡", py: "lěng dàn", en: "cool; indifferent", note: "程度较轻，多指态度不热情。" },
      { w: "漠不关心", py: "mò bù guān xīn", en: "utterly unconcerned" },
      { w: "麻木不仁", py: "má mù bù rén", en: "numb; devoid of feeling", note: "程度最重，指对痛苦毫无感觉。" },
    ],
    ant: [
      { w: "热情", py: "rè qíng", en: "warm; enthusiastic" },
      { w: "温暖", py: "wēn nuǎn", en: "warm; kind" },
      { w: "关心", py: "guān xīn", en: "to care about" },
      { w: "热心", py: "rè xīn", en: "warm-hearted; eager to help" },
    ],
    ex: [
      { zh: "都市生活让人变得冷漠。", py: "Dūshì shēnghuó ràng rén biàn de lěngmò.", en: "City life makes people indifferent." },
      { zh: "他冷漠地看了我一眼，转身就走。", py: "Tā lěngmò de kàn le wǒ yī yǎn, zhuǎnshēn jiù zǒu.", en: "He gave me one cold look and turned away." },
    ],
  },
  "善意": {
    syn: [
      { w: "好意", py: "hǎo yì", en: "good intentions; kindness", note: "更口语；「善意」略正式。" },
      { w: "美意", py: "měi yì", en: "kind thought; kind offer" },
      { w: "好心", py: "hǎo xīn", en: "kind-heartedness" },
    ],
    ant: [
      { w: "恶意", py: "è yì", en: "malice; ill will" },
      { w: "敌意", py: "dí yì", en: "hostility" },
    ],
    ex: [
      { zh: "他的批评是善意的。", py: "Tā de pīpíng shì shànyì de.", en: "His criticism was well-meant." },
      { zh: "请不要误解我的善意。", py: "Qǐng bùyào wùjiě wǒ de shànyì.", en: "Please don't misread my good intentions." },
      { zh: "一个人的善意，可能会照亮另一个人的世界。", py: "Yī gè rén de shànyì, kěnéng huì zhàoliàng lìng yī gè rén de shìjiè.", en: "One person's kindness may light up another's world." },
    ],
  },
  "简单": {
    syn: [
      { w: "容易", py: "róng yì", en: "easy", note: "「容易」说「做起来不难」；「简单」说「结构不复杂」。" },
      { w: "简易", py: "jiǎn yì", en: "simple and easy; simplified" },
      { w: "朴素", py: "pǔ sù", en: "plain; unadorned", note: "偏重外表不华丽。" },
    ],
    ant: [
      { w: "复杂", py: "fù zá", en: "complicated" },
      { w: "繁琐", py: "fán suǒ", en: "tedious and over-elaborate" },
      { w: "困难", py: "kùn nan", en: "difficult" },
    ],
    ex: [
      { zh: "道理很简单，做起来却很难。", py: "Dàolǐ hěn jiǎndān, zuò qǐlái què hěn nán.", en: "The principle is simple; the doing is hard." },
      { zh: "他的想法太简单了。", py: "Tā de xiǎngfǎ tài jiǎndān le.", en: "His thinking is too simplistic." },
    ],
  },
  "习惯": {
    syn: [
      { w: "习性", py: "xí xìng", en: "habits and disposition", note: "多用于动物或长期形成的性情。" },
      { w: "惯例", py: "guàn lì", en: "convention; established practice", note: "指群体的做法，不是个人的。" },
      { w: "适应", py: "shì yìng", en: "to adapt to", note: "作动词时与「习惯」近义，但强调过程。" },
    ],
    ant: [
      { w: "不惯", py: "bù guàn", en: "not used to" },
      { w: "陌生", py: "mò shēng", en: "unfamiliar" },
    ],
    ex: [
      { zh: "他习惯早起。", py: "Tā xíguàn zǎo qǐ.", en: "He is in the habit of getting up early." },
      { zh: "坏习惯很难改。", py: "Huài xíguàn hěn nán gǎi.", en: "Bad habits are hard to break." },
      { zh: "我慢慢习惯了这里的生活。", py: "Wǒ mànmàn xíguàn le zhèlǐ de shēnghuó.", en: "I gradually got used to life here." },
    ],
  },
  "熟悉": {
    syn: [
      { w: "熟识", py: "shú shí", en: "to be well acquainted with (a person)", note: "多用于人；「熟悉」人和事都可以。" },
      { w: "了解", py: "liǎo jiě", en: "to understand; to know well", note: "偏重「懂得内容」，「熟悉」偏重「常接触」。" },
    ],
    ant: [
      { w: "陌生", py: "mò shēng", en: "unfamiliar; strange" },
      { w: "生疏", py: "shēng shū", en: "out of practice; rusty; distant" },
    ],
    ex: [
      { zh: "这条路我很熟悉。", py: "Zhè tiáo lù wǒ hěn shúxī.", en: "I know this road well." },
      { zh: "他对本地文化非常熟悉。", py: "Tā duì běndì wénhuà fēicháng shúxī.", en: "He is very familiar with the local culture." },
    ],
  },
  "打开": {
    syn: [
      { w: "开启", py: "kāi qǐ", en: "to open; to initiate", note: "书面语，多用于抽象事物（开启新时代）。" },
      { w: "拉开", py: "lā kāi", en: "to pull open" },
      { w: "展开", py: "zhǎn kāi", en: "to unfold; to spread out; to launch (an activity)" },
    ],
    ant: [
      { w: "关上", py: "guān shàng", en: "to close; to shut" },
      { w: "合上", py: "hé shàng", en: "to close (a book, the lid)" },
      { w: "关闭", py: "guān bì", en: "to shut down; to close (formal)" },
    ],
    ex: [
      { zh: "一句问候就打开了话匣子。", py: "Yī jù wènhòu jiù dǎkāi le huàxiázi.", en: "A single greeting got the conversation flowing." },
      { zh: "请打开课本第十页。", py: "Qǐng dǎkāi kèběn dì shí yè.", en: "Please open your textbook to page ten." },
    ],
  },
  "帮助": {
    syn: [
      { w: "帮忙", py: "bāng máng", en: "to help; to lend a hand", note: "口语，是离合词：可以说「帮个忙」。" },
      { w: "协助", py: "xié zhù", en: "to assist", note: "正式，多用于工作场合。" },
      { w: "援助", py: "yuán zhù", en: "to aid (esp. materially, on a large scale)" },
    ],
    ant: [
      { w: "妨碍", py: "fáng ài", en: "to hinder; to obstruct" },
      { w: "阻挠", py: "zǔ náo", en: "to thwart; to stand in the way of" },
    ],
    ex: [
      { zh: "谢谢你的帮助。", py: "Xièxie nǐ de bāngzhù.", en: "Thank you for your help." },
      { zh: "留意身边的人是不是需要帮助。", py: "Liúyì shēnbiān de rén shì bù shì xūyào bāngzhù.", en: "Notice whether the people around you need help." },
    ],
  },
  "相信": {
    syn: [
      { w: "信任", py: "xìn rèn", en: "to trust", note: "「信任」是对人的托付；「相信」可以对事（相信这是真的）。" },
      { w: "深信", py: "shēn xìn", en: "to firmly believe" },
      { w: "确信", py: "què xìn", en: "to be certain of" },
    ],
    ant: [
      { w: "怀疑", py: "huái yí", en: "to doubt; to suspect" },
      { w: "质疑", py: "zhì yí", en: "to call into question" },
    ],
    ex: [
      { zh: "我相信人心可以唤醒人心。", py: "Wǒ xiāngxìn rénxīn kěyǐ huànxǐng rénxīn.", en: "I believe one heart can awaken another." },
      { zh: "他不相信这是真的。", py: "Tā bù xiāngxìn zhè shì zhēn de.", en: "He doesn't believe it's true." },
    ],
  },
  "误解": {
    syn: [
      { w: "误会", py: "wù huì", en: "to misunderstand", note: "几乎通用；「误会」更口语，多指人与人之间。" },
      { w: "曲解", py: "qū jiě", en: "to twist the meaning of", note: "含贬义，暗示故意歪曲。" },
    ],
    ant: [
      { w: "理解", py: "lǐ jiě", en: "to understand" },
      { w: "谅解", py: "liàng jiě", en: "to understand and forgive" },
    ],
    ex: [
      { zh: "他害怕自己的好意被误解。", py: "Tā hàipà zìjǐ de hǎoyì bèi wùjiě.", en: "He is afraid his goodwill will be misread." },
      { zh: "这是一场误解，希望你别放在心上。", py: "Zhè shì yī chǎng wùjiě, xīwàng nǐ bié fàng zài xīn shàng.", en: "It was a misunderstanding — I hope you won't take it to heart." },
    ],
  },
  "体贴": {
    syn: [
      { w: "细心", py: "xì xīn", en: "careful; attentive", note: "偏重「不粗心」；「体贴」偏重「为别人着想」。" },
      { w: "周到", py: "zhōu dào", en: "thoughtful; thorough (of service or arrangements)" },
      { w: "关怀", py: "guān huái", en: "to show care and concern" },
    ],
    ant: [
      { w: "冷漠", py: "lěng mò", en: "indifferent" },
      { w: "粗心", py: "cū xīn", en: "careless" },
    ],
    ex: [
      { zh: "他是个很体贴的人。", py: "Tā shì gè hěn tǐtiē de rén.", en: "He is a very considerate person." },
      { zh: "多一份体贴，社会就多一份温暖。", py: "Duō yī fèn tǐtiē, shèhuì jiù duō yī fèn wēnnuǎn.", en: "A little more consideration, and society is a little warmer." },
    ],
  },
  "小吃": {
    syn: [
      { w: "点心", py: "diǎn xīn", en: "light refreshments; dim sum", note: "偏甜点或茶点；「小吃」多指街边熟食。" },
      { w: "美食", py: "měi shí", en: "good food; cuisine", note: "范围更大，不限于小份量。" },
    ],
    rel: [
      { w: "小贩中心", py: "xiǎo fàn zhōng xīn", en: "hawker centre" },
      { w: "熟食中心", py: "shú shí zhōng xīn", en: "cooked-food centre" },
      { w: "夜宵", py: "yè xiāo", en: "late-night snack" },
    ],
    ex: [
      { zh: "新加坡的小吃闻名世界。", py: "Xīnjiāpō de xiǎochī wénmíng shìjiè.", en: "Singapore's street food is world-famous." },
      { zh: "小贩中心里各种小吃应有尽有。", py: "Xiǎofàn zhōngxīn lǐ gè zhǒng xiǎochī yīng yǒu jìn yǒu.", en: "The hawker centre has every kind of snack you could want." },
    ],
  },
  "菜头粿": {
    rel: [
      { w: "萝卜糕", py: "luó bo gāo", en: "radish cake (standard Mandarin term)", note: "中国大陆的说法；新加坡多说「菜头粿」。" },
      { w: "粿", py: "guǒ", en: "a rice-flour cake (Teochew/Hokkien)" },
      { w: "菜脯", py: "cài pú", en: "preserved radish" },
    ],
    ex: [
      { zh: "黑的菜头粿加了甜酱油。", py: "Hēi de càitóuguǒ jiā le tián jiàngyóu.", en: "The black version of the radish cake has sweet dark soy added." },
      { zh: "我要一份白的菜头粿，不要辣。", py: "Wǒ yào yī fèn bái de càitóuguǒ, bùyào là.", en: "One plate of white radish cake, no chilli please." },
    ],
  },
  "老巴刹": {
    rel: [
      { w: "巴刹", py: "bā shā", en: "market (from Malay pasar)" },
      { w: "小贩中心", py: "xiǎo fàn zhōng xīn", en: "hawker centre" },
      { w: "沙爹街", py: "shā diē jiē", en: "Satay Street — the road beside Lau Pa Sat that closes at night for satay stalls" },
    ],
    ex: [
      { zh: "老巴刹是新加坡的历史建筑。", py: "Lǎo Bāshā shì Xīnjiāpō de lìshǐ jiànzhù.", en: "Lau Pa Sat is a historic building in Singapore." },
      { zh: "晚上的老巴刹特别热闹。", py: "Wǎnshang de Lǎo Bāshā tèbié rènao.", en: "Lau Pa Sat is especially lively at night." },
    ],
  },
  "举动": {
    syn: [
      { w: "行为", py: "xíng wéi", en: "behaviour; conduct", note: "范围更大，可指长期的行为方式。" },
      { w: "动作", py: "dòng zuò", en: "movement; motion", note: "偏重身体的动作本身。" },
      { w: "举止", py: "jǔ zhǐ", en: "bearing; demeanour", note: "指整体的仪态，不是单一动作。" },
    ],
    ex: [
      { zh: "一个小小的举动，温暖了他一整天。", py: "Yī gè xiǎoxiǎo de jǔdòng, wēnnuǎn le tā yī zhěng tiān.", en: "One tiny gesture warmed his whole day." },
    ],
  },
  "顺手": {
    syn: [
      { w: "顺便", py: "shùn biàn", en: "in passing; while one is at it", note: "「顺便」强调「趁着做另一件事」；「顺手」强调「手边正好」。" },
      { w: "随手", py: "suí shǒu", en: "casually, without thinking about it" },
    ],
    ex: [
      { zh: "他顺手替我按住了电梯。", py: "Tā shùnshǒu tì wǒ àn zhù le diàntī.", en: "He casually held the lift for me." },
    ],
  },
  "交流": {
    syn: [
      { w: "沟通", py: "gōu tōng", en: "to communicate", note: "偏重「让彼此理解」，常用于解决分歧。" },
      { w: "往来", py: "wǎng lái", en: "contact; dealings" },
      { w: "互动", py: "hù dòng", en: "to interact" },
    ],
    ant: [
      { w: "隔阂", py: "gé hé", en: "estrangement; a barrier between people" },
      { w: "封闭", py: "fēng bì", en: "closed off; isolated" },
    ],
    ex: [
      { zh: "两国之间的文化交流越来越频繁。", py: "Liǎng guó zhī jiān de wénhuà jiāoliú yuèláiyuè pínfán.", en: "Cultural exchange between the two countries grows ever more frequent." },
    ],
  },
  "陌生": {
    syn: [
      { w: "生疏", py: "shēng shū", en: "unfamiliar; rusty", note: "可指技能荒废（手生），「陌生」不行。" },
      { w: "不熟", py: "bù shú", en: "not familiar (colloquial)" },
    ],
    ant: [
      { w: "熟悉", py: "shú xī", en: "familiar" },
      { w: "亲切", py: "qīn qiè", en: "cordial; familiar and warm" },
    ],
    ex: [
      { zh: "烧烤对澳洲人一点也不陌生。", py: "Shāokǎo duì Àozhōu rén yīdiǎn yě bù mòshēng.", en: "Barbecue is not at all unfamiliar to Australians." },
    ],
  },
  "微笑": {
    syn: [
      { w: "笑容", py: "xiào róng", en: "a smile (the expression itself)", note: "名词；「微笑」可作动词。" },
      { w: "莞尔", py: "wǎn ěr", en: "to smile faintly (literary)" },
    ],
    ant: [
      { w: "皱眉", py: "zhòu méi", en: "to frown" },
      { w: "板脸", py: "bǎn liǎn", en: "to keep a straight, stern face" },
    ],
    ex: [
      { zh: "他对我微微一笑。", py: "Tā duì wǒ wēiwēi yī xiào.", en: "He gave me a slight smile." },
    ],
  },
  "理解": {
    syn: [
      { w: "了解", py: "liǎo jiě", en: "to know about; to be informed of", note: "「了解」偏重知道情况；「理解」偏重想通道理。" },
      { w: "明白", py: "míng bai", en: "to understand; to get it", note: "口语。" },
      { w: "谅解", py: "liàng jiě", en: "to understand and forgive" },
    ],
    ant: [
      { w: "误解", py: "wù jiě", en: "to misunderstand" },
      { w: "困惑", py: "kùn huò", en: "to be puzzled" },
    ],
    ex: [
      { zh: "多一份理解，就少一份冲突。", py: "Duō yī fèn lǐjiě, jiù shǎo yī fèn chōngtū.", en: "A little more understanding means a little less conflict." },
    ],
  },
  "信任": {
    syn: [
      { w: "相信", py: "xiāng xìn", en: "to believe", note: "「相信」可以对事；「信任」只对人（或机构）。" },
      { w: "信赖", py: "xìn lài", en: "to rely on and trust", note: "含「依靠」的意思，程度更深。" },
    ],
    ant: [
      { w: "怀疑", py: "huái yí", en: "to doubt" },
      { w: "猜忌", py: "cāi jì", en: "to be suspicious and jealous of" },
    ],
    ex: [
      { zh: "信任是需要时间建立的。", py: "Xìnrèn shì xūyào shíjiān jiànlì de.", en: "Trust takes time to build." },
    ],
  },
};

for (const [w, e] of Object.entries(ENRICH)) {
  const d = DICT[w];
  if (!d) continue;
  if (e.syn) d.syn = e.syn;
  if (e.ant) d.ant = e.ant;
  if (e.rel) d.rel = e.rel;
  if (e.ex) d.ex = [...(d.ex || []), ...e.ex];   // append, never replace
}

// ── simplified → traditional map (for the 简/繁 toggle) ─────────────
export const SIMP_TO_TRAD = Object.fromEntries(
  Object.entries(DICT)
    .filter(([, e]) => e.trad)
    .map(([s, e]) => [s, e.trad])
);

// ── Character component breakdown (illustrative subset) ─────────────
// PRODUCTION: use a CHISE / IDS decomposition dataset.
export const COMPONENTS = {
  "想": [
    { c: "相", role: "phonetic", note: "xiāng — carries the sound" },
    { c: "心", role: "semantic", note: "heart — the act of thinking/feeling" },
  ],
  "思": [
    { c: "田", role: "top", note: "field (historically 囟, the skull)" },
    { c: "心", role: "semantic", note: "heart — the seat of thought" },
  ],
  "温": [
    { c: "氵", role: "semantic", note: "water radical — warmth of water" },
    { c: "昷", role: "phonetic", note: "wēn — carries the sound" },
  ],
  "暖": [
    { c: "日", role: "semantic", note: "sun — the source of warmth" },
    { c: "爰", role: "phonetic", note: "yuán — carries the sound" },
  ],
  "举": [
    { c: "兴", role: "top", note: "raised-hands component" },
    { c: "手", role: "semantic", note: "hand — to lift or raise" },
  ],
  "劳": [
    { c: "艹", role: "top", note: "simplified from 熒 (fire above)" },
    { c: "力", role: "semantic", note: "strength — effort, toil" },
  ],
  "冷": [
    { c: "冫", role: "semantic", note: "ice radical — cold" },
    { c: "令", role: "phonetic", note: "lìng — carries the sound" },
  ],
  "漠": [
    { c: "氵", role: "semantic", note: "water radical — originally 'desert'" },
    { c: "莫", role: "phonetic", note: "mò — carries the sound" },
  ],
  "视": [
    { c: "礻", role: "semantic", note: "originally 示 'to show'" },
    { c: "见", role: "semantic", note: "to see — looking" },
  ],
  "沙": [
    { c: "氵", role: "semantic", note: "water radical" },
    { c: "少", role: "phonetic", note: "shǎo — carries the sound" },
  ],
  "爹": [
    { c: "父", role: "semantic", note: "father radical" },
    { c: "多", role: "phonetic", note: "duō — carries the sound" },
  ],
  "笑": [
    { c: "⺮", role: "semantic", note: "bamboo radical" },
    { c: "夭", role: "phonetic", note: "yāo — carries the sound" },
  ],
  "谢": [
    { c: "讠", role: "semantic", note: "speech radical — an act of words" },
    { c: "射", role: "phonetic", note: "shè — carries the sound" },
  ],
};
