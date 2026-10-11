/* 英文：依《英文 學測考古題重點》《英文 題型重點與解法整理》出題（單字自動出題 + 文法 + 題型解法） */
(function () {
  // 單字：'英文|中文|同義群組（選填，同群組不會互當干擾選項）'，以「;」分隔
  var VOCAB = {
    "115 詞彙題": "tight|（行程）緊湊的;amateur|業餘的;vacancy|職缺;initially|起初;consumption|攝取、食用;dread|害怕、畏懼;passion|熱情、熱愛的事物;assault|攻擊、毆打;elbow|用手肘推擠;grave|嚴重的|serious;" +
      "hasty|倉促的;diligent|勤勉的;routine|例行的;official|官方的;instant|立即的;elementary|初級的;career|職業生涯;expectation|期望;inspiration|靈感;genuinely|真誠地;alternatively|或者;fundamentally|根本地;dimension|面向;integration|整合;provision|提供|offer;stress|強調|emph;wander|漫遊;escape|逃離;resource|資源;impact|影響|impact;emphasis|強調（n.）|emph;shatter|打碎;overturn|推翻;condemn|譴責;crash|撞擊;tumble|跌倒;struggle|掙扎;swift|迅速的;brutal|殘忍的;harsh|嚴厲的",
    "114 詞彙題": "container|容器;produce|農產品（n.）;blur|變模糊;offensive|冒犯的;draft|草稿;vacant|空著的、無人居住的;enormous|極大的|big;halt|中止;grace|使增光、蒞臨;verbally|言語上;" +
      "border|邊界;timer|計時器;marker|記號筆;fashion|時尚;brand|品牌;trend|趨勢;trim|修剪;drain|排乾、耗盡;glare|怒視、刺眼;excessive|過度的;furious|狂怒的;stubborn|固執的;text|文本;brush|刷子;plot|情節;casual|隨意的;fragile|易碎的;remote|遙遠的;gigantic|巨大的（指體積）|big;exclusive|獨有的;multiple|多重的;hatch|孵化;possess|擁有;reinforce|強化;praise|稱讚;address|演說、處理;dominantly|佔優勢地;legitimately|合法地;relevantly|相關地",
    "113 詞彙題": "slender|苗條的;emerge|浮現、冒出;due|預定到達的;humidity|濕度;stand|經得起;compulsory|義務的、強制的;credit|功勞、歸功;promise|保證;appeal|呼籲;randomly|隨機地;" +
      "spicy|辣的;slight|輕微的;slippery|滑的;flash|閃爍;rush|衝;float|漂浮;apt|易於……的;bound|開往……的;docked|停靠的;density|密度;circulation|循環;atmosphere|大氣、氣氛;forceful|強而有力的;realistic|實際的;distinctive|獨特的;advantage|優勢;revenge|報復;remedy|補救;propose|提議;contain|包含;confirm|確認;approach|方法;operation|手術、運作;observation|觀察;apparently|顯然;consequently|因此|therefore",
    "112 詞彙題": "sticky|黏的;pose|姿勢;ancestor|祖先;bare|空的、光禿的;sincerity|誠意;recall|記憶力、回想;counter|反駁;cripple|使癱瘓、重創;choke|堵塞;supposedly|據說、理應;" +
      "greasy|油膩的;clumsy|笨拙的;mighty|強大的;clap|拍手;toss|拋擲;snap|快照、啪一聲;sibling|兄弟姊妹;commuter|通勤者;instructor|講師;blank|空白的;hollow|中空的;queer|古怪的;liability|責任、負擔;generosity|慷慨;integrity|正直;resolve|決心;fraction|部分;privilege|特權;provoke|激起;expose|揭露|reveal;convert|轉換;accelerate|加速;render|使成為;venture|冒險;disturb|打擾;enclose|圍住;inject|注射;undoubtedly|無疑地;roughly|大約;understandably|可以理解地",
    "111 詞彙題": "deliver|遞送;assistant|助理;puppet|木偶;potentially|潛在地、可能|potent;tag|加標籤;agreeable|隨和的、令人愉快的;visible|看得見的;eventual|最終的|final;quest|探尋;blush|臉紅;" +
      "advance|推進;offer|提供|offer;stretch|伸展;influence|影響|impact;contribution|貢獻;politician|政治人物;chat|聊天;quiz|小考;variety|綜藝、多樣;delicately|精巧地;ambiguously|含糊地;optionally|可選擇地;flock|群集;roll|滾動;intimate|親密的;ultimate|最終的、終極的|final;identical|相同的;available|可得的;remarkable|顯著的|notable;moderate|適中的;absolute|絕對的;promising|有希望的;trial|試驗|try;route|路線;strike|罷工、打擊;bounce|彈跳;polish|擦亮;transfer|轉移",
    "文意選填": "retain|保留|keep;depend on|取決於;delay|延緩;unproductive|沒生產力的;risk|風險;function|功能;minimal|極少的;dramatic|顯著的、戲劇性的|notable;point to|指出;reference|提及;bearing|帶有;familiar|熟悉的;faithful|信徒、忠實的;survive|倖存;celebration|慶祝;restoration|修復;noted|著名的;silent|沉默的;pass on|傳遞;bridge|橋梁;sorrow|悲傷;departed|過世的;mechanism|機制;house|容納（v.）|hold;manageable|可應付的;fateful|災難性的;bring forth|提出;absorption|吸收;active|活躍的;alert|警示;combat|對抗;option|選擇;effective|有效的;even|使平衡;status|狀態;pass through|通過;reach for|伸手拿;sensation|感覺;risky|危險的;cost|付出代價;witness|見證;professional|專業的;call for|需要|need;try out|嘗試|try;necessity|必要|need",
    "綜合測驗與閱讀": "demonstrate|示範;immigrate|移入;manipulate|操縱;clue|線索;doubt|懷疑;icon|圖示;accommodate|容納|hold;compensate|補償;anticipate|預期;facilitate|促進;disclose|揭露|reveal;fulfill|實現;circulate|流通;emphasize|強調（v.）|emph;recover|恢復;preserve|保存|keep;potential|潛在的|potent;constant|經常的;anonymous|匿名的;decline|衰退;dismiss|解散;revise|修訂;severe|嚴重的|serious;contagious|傳染的;aggressive|侵略性的;initiate|發起;represent|代表;acknowledge|承認;intensify|加劇;disguise|偽裝;confront|面對;tolerate|承受、容忍;justify|證明……合理;obtain|獲得;foster|培養;empathy|同理心;exacerbate|惡化;vicariously|間接地;blip|短暫插曲;considerate|體貼的;contrary|相反的;" +
      "give rise to|產生|cause;make up for|彌補;keep track of|追蹤;look out for|留意;compete for|爭奪;exposure to|接觸;reliance on|依賴;be accompanied by|伴隨;bring about|導致|cause;result in|導致（接結果）|cause;result from|起因於（接原因）;spring up|湧現;spell disaster|招致災難;pose as|假扮成;attend to|照料;engage in|從事;take measures|採取措施;consist of|由……組成;take part in|參與;run out of|用完;look up to|尊敬;put off|延期;in charge of|負責;regardless of|不管;in terms of|就……而言;according to|根據;it turns out|原來;as such|因此|therefore;in other words|換句話說;all in all|總而言之;what is more|此外;other than|除了……以外;out of necessity|出於需要;break the ice|打破僵局;cost an arm and a leg|非常昂貴;miss the boat|錯失良機;add fuel to the fire|火上加油"
  };

  var LIST = [];
  Object.keys(VOCAB).forEach(function (L) {
    VOCAB[L].split(';').forEach(function (s) { var p = s.split('|'); LIST.push({ w: p[0], zh: p[1], g: p[2] || '', L: L }); });
  });

  function shuffle(a) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
  // 干擾選項：意思不同、不同義群組、片語對片語
  function distract(item, key) {
    var pool = shuffle(LIST.filter(function (x) {
      return x !== item && x.zh !== item.zh && x.w !== item.w && (!item.g || x.g !== item.g) && (x.w.indexOf(' ') >= 0) === (item.w.indexOf(' ') >= 0);
    }));
    var out = [], seen = {}; seen[item[key]] = 1;
    for (var i = 0; i < pool.length && out.length < 3; i++) { var v = pool[i][key]; if (!seen[v]) { seen[v] = 1; out.push(v); } }
    return out;
  }
  function vocabUnit(keys) {
    return LIST.filter(function (x) { return keys.indexOf(x.L) >= 0; }).reduce(function (acc, it) {
      var tag = it.L + '單字';
      acc.push({ t: tag, g: function () { return ['「' + it.w + '」的中文意思是？', [it.zh].concat(distract(it, 'zh')), it.w + '：' + it.zh + '（' + it.L + '）']; } });
      acc.push({ t: tag, g: function () { return ['「' + it.zh + '」的英文是？', [it.w].concat(distract(it, 'w')), it.zh + '：' + it.w + '（' + it.L + '）']; } });
      return acc;
    }, []);
  }

  QUIZ_DATA.push({
    id: 'eng', name: '英文', desc: '單字・文法・題型',
    units: [
      { name: '詞彙題單字（111～115）', qs: vocabUnit(['115 詞彙題', '114 詞彙題', '113 詞彙題', '112 詞彙題', '111 詞彙題']) },
      { name: '文意選填與綜合測驗字詞', qs: vocabUnit(['文意選填', '綜合測驗與閱讀']) },
      {
        name: '常考搭配詞',
        qs: [
          ["動詞＋名詞搭配", "This bridge has stood the ___ of time; it is over 300 years old.", ["test", "trial", "exam", "proof"], "stand the test of time：經得起時間考驗。"],
          ["動詞＋名詞搭配", "Tom did nothing, but he took the ___ for the team's success.", ["credit", "advantage", "revenge", "remedy"], "take the credit for：搶功、居功。take advantage of 是利用。"],
          ["動詞＋名詞搭配", "The charity made an ___ for donations after the earthquake.", ["appeal", "approach", "operation", "observation"], "make an appeal for：呼籲。"],
          ["動詞＋名詞搭配", "The man ___ his way through the crowd to catch the train.", ["elbowed", "crashed", "tumbled", "struggled"], "elbow one's way：用手肘擠過人群。"],
          ["動詞＋名詞搭配", "The new policy has raised ___ concerns among parents.", ["grave", "swift", "brutal", "harsh"], "raise grave concerns：引起嚴重關切。"],
          ["形容詞＋名詞搭配", "She has such a ___ schedule that she can't meet us until next month.", ["tight", "hasty", "diligent", "routine"], "a tight schedule：緊湊的行程。such … that 因果線索。"],
          ["形容詞＋名詞搭配", "In some countries, young men must do ___ military service.", ["compulsory", "forceful", "realistic", "distinctive"], "compulsory military service：義務役。"],
          ["形容詞＋名詞搭配", "Hurry up! The next bus is ___ in two minutes.", ["due", "apt", "bound", "docked"], "be due：預定到達。bound for 是開往。"],
          ["形容詞＋名詞搭配", "It took ___ courage for her to speak up against the bully.", ["enormous", "gigantic", "slender", "fragile"], "enormous 可形容程度（courage）；gigantic 多指體積。"],
          ["固定用法", "The adventurers went on a ___ for the lost city.", ["quest", "trial", "route", "strike"], "go on a quest for：探尋。"],
          ["固定用法", "The famous singer ___ the ceremony with her presence.", ["graced", "praised", "addressed", "credited"], "grace … with one's presence：蒞臨增光。"],
          ["固定用法", "The boss was accused of ___ abusing his employees by shouting insults.", ["verbally", "dominantly", "legitimately", "relevantly"], "verbally abuse：言語辱罵。"],
          ["固定用法", "She started as an ___ photographer, but now she is a professional.", ["amateur", "official", "instant", "elementary"], "對比線索 but now … professional → amateur（業餘的）。"],
          ["固定用法", "I'm too busy to go to the store, so I'll have the package ___.", ["delivered", "advanced", "offered", "stretched"], "have + O + p.p.：請人處理（送來）。"]
        ]
      },
      {
        name: '文法',
        qs: [
          ["句子結構", "He sat on the sofa, ___ TV.", ["watching", "watched", "watches", "and watch"], "一句只能有一個主要動詞；第二個動作改成分詞（附帶狀況）。"],
          ["句子結構", "Our body fluids ___ upward when we are in space.", ["redistribute", "redistributing", "to redistribute", "redistributed by"], "主詞後還沒有主要動詞 → 要填動詞。"],
          ["句子結構", "It rained all day, ___ us feel sad.", ["making", "made", "makes", "to making"], "句子已有主要動詞 rained，, which made… 可改成 , making…。"],
          ["主詞動詞一致", "The key to these doors ___ missing.", ["is", "are", "were", "have been"], "真正主詞是 key（單數），to these doors 不算。"],
          ["主詞動詞一致", "Either Amy or her brothers ___ going to pick you up.", ["are", "is", "was", "has"], "either A or B：就近原則，跟 brothers。"],
          ["主詞動詞一致", "What she told us ___ true.", ["is", "are", "were", "be"], "名詞子句當主詞 → 單數。"],
          ["主詞動詞一致", "Every student in the classes ___ a laptop.", ["has", "have", "are having", "having"], "every + 單數名詞 → 單數動詞。"],
          ["主詞動詞一致", "The manager, together with his staff, ___ attending the meeting.", ["is", "are", "were", "have"], "A together with B → 跟前面的 A。"],
          ["時態", "She ___ in this company since 2020.", ["has worked", "worked", "works", "had worked"], "since + 時間點，持續到現在 → 現在完成式。"],
          ["時態", "When the police arrived, the thief ___ away.", ["had run", "has run", "runs", "will run"], "比另一個過去動作更早 → 過去完成式。"],
          ["時態", "As soon as he ___ the results, he will call us.", ["gets", "will get", "got", "has got to"], "時間副詞子句用現在式代替未來式。"],
          ["時態", "We ___ the museum last Sunday.", ["visited", "have visited", "had visited", "visit"], "last Sunday 是明確過去時間 → 過去式，不能用現在完成式。"],
          ["時態", "The company had yet ___ a clear plan at that time.", ["to develop", "developing", "developed", "develop"], "had yet to V：（當時）尚未……。"],
          ["被動語態", "The festival ___ in Tainan every year.", ["is held", "holds", "is holding", "held"], "主詞接受動作 → 被動 be + p.p.。"],
          ["被動語態", "A strange thing ___ last night.", ["happened", "was happened", "is happened", "had been happened"], "happen、occur、appear、take place 是不及物動詞，沒有被動。"],
          ["被動語態", "Taiwan is known ___ its night markets.", ["for", "as", "to", "by"], "be known for（以…聞名）；be known as（以…身分聞名）。"],
          ["被動語態", "The new bridge ___ now; it will open next year.", ["is being built", "is building", "builds", "has built"], "進行式被動：is being + p.p.。"],
          ["不定詞與動名詞", "He finally quit ___ fast food.", ["eating", "to eat", "eat", "ate"], "quit、enjoy、finish、avoid、mind、consider、suggest、deny 後接 Ving。"],
          ["不定詞與動名詞", "She couldn't afford ___ a new car.", ["to buy", "buying", "buy", "bought"], "afford、manage、refuse、fail、tend、seem 後接 to V。"],
          ["不定詞與動名詞", "Don't forget ___ the lights before you leave.", ["to turn off", "turning off", "turn off", "turned off"], "forget to V：忘了「要去」做。"],
          ["不定詞與動名詞", "He devoted himself to ___ the poor.", ["helping", "help", "helped", "be helped"], "devote oneself to 的 to 是介系詞 → Ving。"],
          ["不定詞與動名詞", "The heavy traffic prevented us ___ on time.", ["from arriving", "to arrive", "arrive", "arriving at"], "prevent / stop / keep + O + from Ving。"],
          ["不定詞與動名詞", "This book is worth ___ twice.", ["reading", "to read", "read", "being read by"], "be worth Ving：值得做。"],
          ["使役與感官動詞", "My mom made me ___ my room.", ["clean", "to clean", "cleaning", "cleaned"], "make / have / let + O + VR。"],
          ["使役與感官動詞", "I had my car ___ yesterday.", ["repaired", "repair", "repairing", "to repair"], "東西被別人處理：have + O + p.p.。"],
          ["使役與感官動詞", "The boy was made ___ outside the office.", ["to wait", "wait", "waiting", "waited"], "使役、感官動詞改被動時，原形動詞要補回 to。"],
          ["使役與感官動詞", "She got her brother ___ her with the boxes.", ["to help", "help", "helped", "helps"], "get + O + to V。"],
          ["分詞構句", "___ with modern tools, the workers finished early.", ["Equipped", "Equipping", "To equip", "Equip"], "工人「被配備」工具 → 被動用 p.p.。"],
          ["分詞構句", "___ his homework, he went out to play.", ["Having finished", "Finished", "Having been finished", "To finish"], "時間較早的主動動作：Having + p.p.。"],
          ["分詞構句", "___ in simple English, the book is easy to read.", ["Written", "Writing", "To write", "Having written"], "書「被寫」→ p.p.。"],
          ["分詞構句", "The weather ___ fine, we went hiking.", ["being", "was", "is", "been"], "主詞不同時要保留主詞（獨立分詞構句）。"],
          ["關係詞", "I have a friend ___ mother is a pilot.", ["whose", "who", "whom", "which"], "whose + 名詞：……的。"],
          ["關係詞", "This is the town ___ my grandfather grew up.", ["where", "which", "what", "that"], "後面是完整句子 → 關係副詞 where。"],
          ["關係詞", "This is the town ___ we visited last summer.", ["which", "where", "what", "when"], "後面缺受詞（visited 的受詞）→ which。"],
          ["關係詞", "My sister, ___ lives in Tainan, is a nurse.", ["who", "that", "what", "whom"], "逗號後（非限定用法）不能用 that。"],
          ["關係詞", "This is the best movie ___ I have ever seen.", ["that", "what", "who", "where"], "先行詞有最高級 → 用 that。"],
          ["關係詞", "___ you need now is a good rest.", ["What", "That", "Which", "It"], "what = the thing which，自己包含先行詞。"],
          ["名詞子句", "Do you know where ___?", ["he lives", "does he live", "he does live", "lives he"], "間接問句：疑問詞 + 主詞 + 動詞，不倒裝。"],
          ["名詞子句", "___ he will come or not doesn't matter.", ["Whether", "If", "That", "What"], "放句首、接 or not 用 whether；if 只能放動詞後當受詞。"],
          ["名詞子句", "___ hard he tried, he couldn't open the jar.", ["However", "Whatever", "Whenever", "Whoever"], "however + adj./adv. + S + V：無論多麼。"],
          ["連接詞與轉承語", "___ the heavy rain, the game went on.", ["Despite", "Although", "Because", "Even though"], "despite + 名詞；although + 子句。"],
          ["連接詞與轉承語", "He is a vegetarian; ___, he doesn't eat meat.", ["that is", "however", "otherwise", "meanwhile"], "後句是換句話說 → that is / in other words。"],
          ["連接詞與轉承語", "You should leave now; ___, you'll miss the train.", ["otherwise", "therefore", "besides", "for example"], "否則 → otherwise。"],
          ["連接詞與轉承語", "The plan was costly. ___, it was too risky.", ["Moreover", "However", "Instead", "Otherwise"], "前後都是缺點，補充 → moreover / in addition。"],
          ["連接詞與轉承語", "Mary loves summer, ___ her sister prefers winter.", ["while", "during", "because", "unless"], "while：而、然而（對比）；during 是介系詞。"],
          ["介系詞與片語", "Lack of sleep can result ___ poor memory.", ["in", "from", "of", "to"], "result in + 結果；result from + 原因。"],
          ["介系詞與片語", "We need to find a good balance ___ work and life.", ["between", "among", "within", "through"], "兩者之間 between；三者以上 among。"],
          ["介系詞與片語", "___ Tom, three other students passed the test.", ["Besides", "Except", "Instead of", "Without"], "besides＝除了…還有（包含）；except＝除了…都（不包含）。"],
          ["比較", "Life in the city is busier than ___ in the countryside.", ["that", "those", "it", "one"], "比較同類東西，用 that 代替單數名詞 life。"],
          ["比較", "This phone is ___ cheaper than that one.", ["far", "very", "more", "so"], "修飾比較級用 much、far、even、a lot、still。"],
          ["比較", "Mount Everest is higher than any other ___ in the world.", ["mountain", "mountains", "the mountains", "mountain's"], "比較級 + than any other + 單數名詞 = 最高級。"],
          ["假設語氣", "If I ___ you, I would accept the offer.", ["were", "am", "had been", "will be"], "與現在事實相反：If + 過去式（be 用 were），would + VR。"],
          ["假設語氣", "If she had left earlier, she ___ the bus.", ["would have caught", "would catch", "will catch", "had caught"], "與過去事實相反：If had p.p., would have p.p.。"],
          ["假設語氣", "We could ___ a map; we got lost because we didn't bring one.", ["have used", "use", "used", "be using"], "could have p.p.：過去本來可以卻沒做。"],
          ["假設語氣", "If it ___ tomorrow, we will stay home.", ["rains", "rained", "had rained", "will rain"], "單純條件（可能發生）：If + 現在式，will + VR，不是假設語氣。"],
          ["強調句與虛主詞", "It was in Kaohsiung ___ I first met her.", ["that", "which", "where", "when"], "強調句 It is/was … that …；拿掉 It was … that 仍是完整句。"],
          ["強調句與虛主詞", "It is necessary ___ everyone wear a helmet.", ["that", "to", "for", "what"], "後面接完整子句用 that；接動詞用 to V。"],
          ["代名詞", "I have three cats. One is white, ___ is black, and the other is gray.", ["another", "the other", "other", "others"], "三個：one …, another …, the other …。"],
          ["代名詞", "Some students walk to school; ___ ride bikes.", ["others", "the other", "another", "other"], "不特定的其他人用 others。"],
          ["代名詞", "My phone is broken, so I need to buy a new ___.", ["one", "it", "that", "them"], "it 指同一個；one 指同類的另一個。"]
        ]
      },
      {
        name: '題型解法',
        qs: [
          ["詞彙題", "詞彙題四個選項通常詞性相同，第一步最應該做的是？", ["讀整句找線索（對比、因果、同位語）", "直接選最難的字", "選字尾最長的", "只看空格前一個字"], "步驟：讀整句找線索 → 預測空格意思 → 四個選項都翻一次。"],
          ["詞彙題", "詞彙題句子中出現 such a ___ schedule that it takes weeks…，最主要的解題線索是？", ["such … that 的因果關係", "冠詞 a", "時態", "主詞是單數"], "因果線索：行程緊湊到要花好幾週 → tight。其他常見線索：對比 but、同位語。"],
          ["綜合測驗", "綜合測驗看到選項是同一個字的不同形式（redistribute / redistributed / redistributing），代表在考？", ["文法：先找句子的主要動詞", "單字語意", "轉承語", "拼字"], "有主要動詞就填非動詞（to V / Ving / p.p.），沒有就填動詞並判斷時態。"],
          ["綜合測驗", "綜合測驗遇到轉承語空格，最關鍵的判斷是？", ["前後句的關係：相反、因果、補充或解釋", "空格的位置", "選項的長短", "文章的標題"], "例：揭露真相用 it turns out；因此用 as such、thus。"],
          ["文意選填", "文意選填最有效的第一步是？", ["把 10 個選項分詞性", "從第一格依序硬填", "先填最長的單字", "先讀最後一段"], "a/the ＋ ___ ＋ of → 名詞；may / help / to ＋ ___ → 原形動詞；be ＋ ___ → 形容詞或分詞。"],
          ["文意選填", "文意選填遇到 cost、housed 這類過去式與過去分詞同形的字，要看什麼判斷？", ["空格前是 be 動詞還是主詞", "字母數", "是否為片語", "是否在句尾"], "前面是 be → 被動 p.p.；前面是主詞 → 過去式動詞。"],
          ["篇章結構", "篇章結構中，空格後面接著「For example, …」，空格最可能放？", ["主題句", "結論句", "干擾句", "另一個例子"], "空格後是例子 → 空格放主題句。"],
          ["篇章結構", "篇章結構的選項以「Another factor …」開頭，代表？", ["前面已經提過一個因素", "這是文章第一句", "這是結論", "這是干擾選項"], "Another → 前面已提過一個；Thus → 放結論；This/Such → 找前面對應的名詞。"],
          ["篇章結構", "篇章結構 5 個選項中，干擾選項通常有什麼特徵？", ["與主題相關但接不上前後句", "跟主題完全無關", "文法錯誤", "字數最少"], "干擾選項多半主題相關，但與前後句銜接不起來。"],
          ["閱讀測驗", "閱讀測驗的主旨題，正確答案的特徵是？", ["涵蓋全文，不只講一段", "只描述第一段", "包含最多細節", "用字和原文最像"], "看第一段與最後一段；選涵蓋全文的。"],
          ["閱讀測驗", "閱讀測驗問「NOT mentioned」，最穩的做法是？", ["四個選項都回文找過，排除三個有提到的", "選看起來最不合理的", "只看第一個選項", "選最長的"], "NOT mentioned 題要逐項回文對照。"],
          ["閱讀測驗", "指涉題（this / it / them 指什麼）的解法是？", ["回前一句找名詞或整件事，代回去檢查", "選文章標題", "選最後出現的名詞", "選人名"], "代回原句看是否通順。"],
          ["混合題", "混合題的填充題要求「從文中找單詞」，作答時要特別注意？", ["依句型改成正確字形並拼對", "照抄原字不改", "可以自己換同義字", "寫中文也可以"], "例：innovative → innovation、blend → blended；字形錯或拼錯只得 1 分。"],
          ["混合題", "混合題的多選題常考「兩者都符合」「某條件下才成立」，最好的作法是？", ["列表逐一比對每個人或每段是否符合", "憑印象作答", "只看第一段", "選字數最多的選項"], "多選比對：把每個對象與條件列成表，逐項檢查。"],
          ["中譯英", "中譯英的扣分方式，下列何者正確？", ["每個錯誤扣 0.5 分，句首未大寫、標點錯也扣", "只看意思對不對", "錯一個字就 0 分", "拼字錯誤不扣分"], "每句 4 分；相同錯誤只扣一次。先拆主詞動詞、決定時態，不會的字用簡單同義字替代。"],
          ["中譯英", "中文出現「已經」「一再證明」時，英文時態最常用？", ["現在完成式", "過去進行式", "未來式", "現在簡單式"], "已經 → 完成式；正在 → 進行式。"],
          ["英文作文", "學測英文作文的基本要求是？", ["至少 120 字，照提示分兩段", "至少 300 字，一段即可", "字數不限", "分成五段"], "第一段多為描述，第二段為看法、經驗、理由；每段都要回答到提示的每一項。"],
          ["英文作文", "英文作文的評分項目「不包括」下列何者？", ["字跡是否工整美觀", "內容", "組織", "文法句構與字彙拼字"], "評分看內容、組織、文法句構、字彙拼字四項，給一個整體分數（20 分）。寫完檢查主詞動詞一致、時態、拼字。"]
        ]
      }
    ]
  });
})();
