/* 英文 困難版：仿學測歷屆試題（長句詞彙、短文克漏字、篇章結構、閱讀測驗、圖表題） */
(function () {
  var O = QH.opts;
  function sh(a) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; }

  // 詞彙題：[句子, 正解, 干擾1, 干擾2, 干擾3, 解析]
  var VOC = [
    ["The new manager has such a ___ schedule that she can hardly find time to eat lunch, let alone take a vacation.", "tight", "hasty", "diligent", "routine", "such a tight schedule that…：行程緊湊到……。hasty 倉促的、diligent 勤勉的、routine 例行的。"],
    ["Although she started out as an ___ photographer taking pictures on weekends, her works are now displayed in national galleries.", "amateur", "official", "instant", "elementary", "Although 前後對比：業餘（amateur）→ 現在作品進國家美術館。"],
    ["The company announced a ___ for a sales assistant, and more than two hundred people applied within a week.", "vacancy", "career", "expectation", "inspiration", "announce a vacancy：公布職缺。"],
    ["The experts warned that the rising sea levels would raise ___ concerns about the safety of coastal cities.", "grave", "swift", "brutal", "harsh", "raise grave concerns：引起嚴重關切。"],
    ["Built more than three hundred years ago, the bridge has stood the ___ of time and still carries traffic today.", "test", "trial", "proof", "check", "stand the test of time：經得起時間考驗。"],
    ["Ken did almost nothing for the project, yet he took the ___ for its success in front of the boss.", "credit", "advantage", "revenge", "remedy", "take the credit for：居功、搶功；take advantage of 是利用。"],
    ["During the rush hour, Tom had to ___ his way through the crowd to get off the train.", "elbow", "crash", "tumble", "struggle", "elbow one's way：用手肘擠出一條路。"],
    ["The singer ___ the ceremony with her presence, making the evening unforgettable for her fans.", "graced", "praised", "addressed", "credited", "grace … with one's presence：蒞臨增光。"],
    ["Please wait at the platform; the next train is ___ to arrive in three minutes.", "due", "apt", "bound", "docked", "be due to V：預定……；bound for 是開往。"],
    ["Military service used to be ___ for all young men in the country, but it has now become voluntary.", "compulsory", "forceful", "realistic", "distinctive", "used to be compulsory, but now voluntary：強制的 vs. 自願的（對比線索）。"],
    ["The storm ___ the city's transportation system, leaving thousands of commuters stranded for hours.", "crippled", "accelerated", "rendered", "ventured", "cripple：使癱瘓、重創。"],
    ["The drain was ___ with leaves and plastic bags, so the street flooded after the heavy rain.", "choked", "disturbed", "enclosed", "injected", "be choked with：被……堵塞。"],
    ["The scientist offered strong evidence to ___ the claim that the drug had no side effects.", "counter", "provoke", "expose", "convert", "counter a claim：反駁說法。"],
    ["The effects of the new medicine are not yet ___; doctors need several more months to observe the patients.", "visible", "identical", "available", "remarkable", "not yet visible：還看不出效果。"]
  ];

  // ---------- 0 詞彙題單字 ----------
  addHard('eng', 0, VOC.map(function (v) { return ["長句詞彙題", v[0], [v[1], v[2], v[3], v[4]], v[5]]; }));

  // ---------- 1 文意選填與綜合測驗 ----------
  addHard('eng', 1, [
    ["綜合測驗", "Bees communicate in surprising ways. When a worker bee finds a rich source of food, it returns to the hive and performs a \"waggle dance.\" The angle of the dance ___ the direction of the food, while its length tells how far away it is.", ["indicates", "indicating", "to indicate", "indicated"], "句子主詞 The angle of the dance 後缺主要動詞 → 填 indicates（現在式、單數）。"],
    ["綜合測驗", "Many people believe that cracking your knuckles causes arthritis. ___, studies have found no link between the two; the popping sound simply comes from gas bubbles in the joints.", ["It turns out", "As a result", "In addition", "For example"], "前句是一般看法、後句揭露真相 → it turns out（原來）。"],
    ["綜合測驗", "The city once had dozens of bookstores. Since online shopping became popular, however, small shops have been closing one after another, and only a few ___ open today.", ["remain", "remained", "remaining", "to remain"], "only a few（主詞）後缺動詞，描述現在 → remain。"],
    ["綜合測驗", "Astronauts often look puffy in the face during their first days in space. In the absence of gravity, body fluids move upward, ___ the face to swell.", ["causing", "caused", "causes", "to be caused"], "句子已有主要動詞 move，表結果的附帶動作用分詞 causing。"],
    ["綜合測驗", "The museum, ___ was built in 1908, is the oldest in the country.", ["which", "that", "where", "what"], "逗號後非限定用法不能用 that；先行詞是物、後面缺主詞 → which。"],
    ["篇章結構", "Choose the sentence that best fills the blank.\n\"Night markets are an important part of Taiwanese culture. ___ For example, visitors can try stinky tofu, bubble tea, and oyster omelets all in one place. Many markets also offer games and cheap clothing.\"", ["They offer a wide variety of local foods at low prices.", "Night markets first appeared in the 19th century.", "However, some people complain about the noise.", "As a result, the government closed several markets."], "空格後是 For example 舉食物 → 空格放主題句（食物種類多、便宜）。"],
    ["篇章結構", "Choose the sentence that best fills the blank.\n\"Sleep plays a key role in memory. During deep sleep, the brain replays what we learned during the day. ___ Students who stay up all night before an exam often remember less than those who sleep well.\"", ["This process helps move information into long-term memory.", "Another factor is the amount of caffeine we drink.", "For example, some animals sleep standing up.", "Thus, dreams are meaningless."], "空格前講大腦重播所學 → This process 承接，並引出後面的實例。Another factor 前面沒有提過第一個因素。"],
    ["文意選填", "In a passage, the blank appears as: \"The festival has ___ its traditional character even after two hundred years of change.\" Which word from the list fits best?", ["retained", "survived", "noted", "celebration"], "has + p.p.，後面有受詞 its traditional character → retained（保留）。survive 多為不及物或接災難；noted 是形容詞；celebration 是名詞。"],
    ["文意選填", "In a passage, the blank appears as: \"Smartphones have become a ___ rather than a luxury for most young people.\" Which word from the list fits best?", ["necessity", "career", "sensation", "professional"], "a ___ rather than a luxury → 名詞且與「奢侈品」對比 → necessity（必需品）。"]
  ]);

  // ---------- 2 常考搭配詞 ----------
  addHard('eng', 2, [
    ["搭配詞情境", "The heavy snow ___ traffic to a halt, and the government had to send soldiers to clear the roads.", ["brought", "made", "took", "gave"], "bring … to a halt：使……停頓。"],
    ["搭配詞情境", "The charity has made an urgent ___ for blankets and warm clothes for the earthquake victims.", ["appeal", "approach", "operation", "observation"], "make an appeal for：呼籲、懇求。"],
    ["搭配詞情境", "Lack of exercise and an unhealthy diet can ___ rise to a number of serious diseases.", ["give", "make", "take", "bring"], "give rise to：導致、引起。"],
    ["搭配詞情境", "The volunteers took turns keeping ___ of the elderly man's medicine schedule.", ["track", "watch", "care", "record"], "keep track of：追蹤、記錄。"],
    ["搭配詞情境", "Without proper planning, the new policy could ___ disaster for small businesses.", ["spell", "cast", "tell", "write"], "spell disaster：招致災難。"]
  ]);

  // ---------- 3 文法 ----------
  addHard('eng', 3, [
    ["進階文法", "Not until the lights went out ___ that the power had been cut.", ["did we realize", "we realized", "we did realize", "had realized we"], "Not until … 放句首要倒裝：did + S + VR。"],
    ["進階文法", "___ the instructions carefully, he would not have broken the machine.", ["Had he read", "If he read", "Did he read", "He had read"], "與過去事實相反，If he had read 省略 if 後倒裝成 Had he read。"],
    ["進階文法", "The number of tourists visiting the island ___ greatly over the past decade.", ["has increased", "have increased", "increased", "is increasing"], "主詞是 The number（單數）；over the past decade 持續到現在 → 現在完成式。"],
    ["進階文法", "It is essential that every passenger ___ a seat belt during takeoff.", ["wear", "wears", "wore", "is wearing"], "It is essential/necessary that S + (should) VR。"],
    ["進階文法", "___ by the loud noise, the baby began to cry.", ["Frightened", "Frightening", "To frighten", "Having frightened"], "嬰兒「被」嚇到 → p.p.。"],
    ["進階文法", "The scientist, together with her assistants, ___ working on the project since last year.", ["has been", "have been", "were", "are"], "A together with B 動詞跟 A；since last year → 現在完成進行式。"],
    ["進階文法", "Politicians can often be seen ___ temples before elections.", ["visiting", "to visiting", "visit", "visited"], "感官動詞被動：be seen + Ving（看到正在進行）或 to VR；選項中只有 visiting 正確。"],
    ["進階文法", "To avoid conflicts and reach agreements ___ the goal of every negotiation.", ["should be", "should being", "being", "to be"], "不定詞片語當主詞，後面要接主要動詞 should be。"]
  ]);

  // ---------- 4 題型解法（閱讀測驗） ----------
  var CHART = ["Reading", "Sports", "Gaming", "Music", "Volunteering"];
  addHard('eng', 4, [
    { t: "圖表閱讀", g: function (R) {
      var vals = CHART.map(function () { return R.int(10, 60); }), hi = vals.indexOf(Math.max.apply(null, vals)), lo = vals.indexOf(Math.min.apply(null, vals));
      var trues = [CHART[hi] + " was the most popular activity among the students surveyed.", CHART[lo] + " was chosen by the smallest percentage of students.", "The gap between the most and least popular activities was " + (vals[hi] - vals[lo]) + " percentage points."];
      var falses = ["More students chose " + CHART[lo] + " than " + CHART[hi] + ".", "The chart shows that " + CHART[hi] + " improves students' grades.", "All five activities were chosen by more than half of the students.", "The percentages show the number of hours students spend on each activity."];
      var t = R.pick(trues), f = sh(falses).slice(0, 3);
      return ["The chart shows the percentage of high school students who chose each activity as a favorite free-time activity (students could choose more than one). Which statement is supported by the chart?", [t].concat(f),
        "正解：" + t + "\n圖表只顯示比例；不能推論因果（improves grades），也不是時數。可複選，比例加總可超過 100%。",
        QF.bars(CHART, vals, "%", "Favorite free-time activities")];
    } },
    ["閱讀測驗", "Read the passage:\n\"For centuries, people believed that the Mona Lisa's smile changed depending on where viewers stood. Recently, scientists found that the effect comes from the way our eyes process light and shadow. When we look directly at her mouth, it seems less like a smile; when we look at her eyes, our side vision picks up the shadows, and she appears to smile more.\"\nWhat is the passage mainly about?", ["A scientific explanation of why the Mona Lisa's smile seems to change", "The history of how the Mona Lisa was painted", "Why the Mona Lisa is the most famous painting in the world", "How to take better photos of famous paintings"], "主旨要涵蓋全文：舊看法 → 科學解釋（光影與視覺）。"],
    ["閱讀測驗", "Read the passage:\n\"Ten years ago, the village had only an elementary school and a small clinic. After a high-speed rail station opened nearby, young families began moving in, and land prices doubled. Now, the town council is discussing whether to build a junior high school.\"\nWhat can be inferred from the passage?", ["The new rail station made the area more attractive to families.", "The village has always been crowded.", "Land prices dropped after the station opened.", "The council has already built a junior high school."], "推論要有文中證據：車站開通 → 年輕家庭移入、地價上漲、討論蓋國中。"],
    ["閱讀測驗", "Read the passage:\n\"Some birds can recognize human faces. In one study, researchers wore masks while catching crows. Years later, when people wore the same masks, the crows shouted at them, even though most of the birds had never been caught themselves. This suggests that they learned it from other crows.\"\nWhat does \"it\" in the last sentence refer to?", ["That the masked faces were dangerous", "How to catch other birds", "How to wear masks", "The researchers' names"], "it 指前文的整件事：戴那種面具的人是危險的（沒被抓過的烏鴉也會叫）。"],
    ["閱讀測驗", "Read the passage:\n\"The drop in sales last month was only a blip. By the end of the quarter, the company's profits had returned to their usual high level.\"\nThe word \"blip\" is closest in meaning to ___.", ["a short, temporary change", "a permanent decline", "a serious crisis", "a careful plan"], "後句說很快恢復 → blip＝短暫的插曲。"]
  ]);
})();
