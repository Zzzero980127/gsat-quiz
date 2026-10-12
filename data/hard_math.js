/* 數B 困難版：仿學測歷屆試題（情境題、多步驟、圖形判讀），計算題每次換數字 */
(function () {
  var H = QH, n = H.n, F = H.frac, O = H.opts;
  function gcd(a, b) { return H.gcd(a, b); }
  function lcm(a, b) { return a / gcd(a, b) * b; }
  function fact(k) { var r = 1; for (var i = 2; i <= k; i++) r *= i; return r; }
  function C(a, b) { if (b < 0 || b > a) return 0; var r = 1; for (var i = 1; i <= b; i++) r = r * (a - b + i) / i; return Math.round(r); }
  function NO(ans, cands) { return O(ans, cands, function (k) { return ans + (k % 2 ? (k + 1) / 2 : -k / 2); }); }
  function FO(p, q, cands) { return O(F(p, q), cands, function (k) { return F(p + (k % 2 ? (k + 1) / 2 : -k / 2), q); }); }
  function sg(x) { return x < 0 ? ' − ' + (-x) : ' + ' + x; }
  function pr(x) { return x < 0 ? '(' + n(x) + ')' : String(x); }
  function sh(a) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
  // 分數運算 [p, q]
  function fr(p, q) { q = q || 1; if (q < 0) { p = -p; q = -q; } var g = gcd(p, q); return [p / g, q / g]; }
  function fa(a, b) { return fr(a[0] * b[1] + b[0] * a[1], a[1] * b[1]); }
  function fm(a, b) { return fr(a[0] * b[0], a[1] * b[1]); }
  function fs(a, b) { return fa(a, [-b[0], b[1]]); }
  function fd(a, b) { return fr(a[0] * b[1], a[1] * b[0]); }
  function ft(a) { return F(a[0], a[1]); }
  function line(a, b, c) {
    var s = '';
    if (a) s += (a < 0 ? '−' : '') + (Math.abs(a) === 1 ? '' : Math.abs(a)) + 'x';
    if (b) s += (s ? (b < 0 ? ' − ' : ' + ') : (b < 0 ? '−' : '')) + (Math.abs(b) === 1 ? '' : Math.abs(b)) + 'y';
    if (c) s += (c < 0 ? ' − ' : ' + ') + Math.abs(c);
    return s + ' = 0';
  }
  // 一題四個敘述，恰一個正確
  function judge(R, trues, falses, stem, exp) {
    var t = R.pick(trues), fsx = sh(falses).slice(0, 3);
    return [stem, [t[0]].concat(fsx.map(function (f) { return f[0]; })), '正解：' + t[0] + '（' + t[1] + '）\n' + fsx.map(function (f) { return '✗ ' + f[0] + '：' + f[1]; }).join('\n') + (exp ? '\n' + exp : '')];
  }
  var NORM = [[3, 4, 5], [4, 3, 5], [5, 12, 13], [12, 5, 13], [6, 8, 10], [8, 6, 10]];

  // ---------- 0 數與式 ----------
  addHard('math', 0, [
    { t: '誤差百分比計數', g: function (R) {
      var S = R.int(60, 160), p = R.pick([3, 4, 5, 8, 10]), cnt = 0, lo = null, hi = null;
      for (var N = 0; N <= 400; N++) if (Math.abs(N - S) * 100 < p * S) { cnt++; if (lo === null) lo = N; hi = N; }
      return ['某工廠零件的標準長度為 ' + S + ' 公釐，品管規定「誤差百分比 = |N − ' + S + '| ÷ ' + S + ' × 100%」必須小於 ' + p + '% 才算合格。若量測值 N 只會是整數，合格的 N 共有幾種可能？',
        NO(cnt, [cnt + 2, cnt - 2, 2 * Math.floor(S * p / 100) + 2]),
        '|N − ' + S + '| < ' + S + ' × ' + p + '% = ' + H.dec(S * p / 100, 2) + ' → ' + lo + ' ≤ N ≤ ' + hi + '，共 ' + cnt + ' 個。注意「小於」不含等號，端點若剛好是整數要剔除。'];
    } },
    { t: '距離和的應用', g: function (R) {
      var a = R.int(-8, 2), b = a + R.int(3, 9), k = (b - a) + 2 * R.int(1, 5) + R.pick([0, 1]), cnt = 0, lo = null, hi = null;
      for (var x = -60; x <= 60; x++) if (Math.abs(x - a) + Math.abs(x - b) <= k) { cnt++; if (lo === null) lo = x; hi = x; }
      return ['一條筆直道路上，甲、乙兩站的位置分別在坐標 ' + n(a) + ' 與 ' + n(b) + '（單位：公里）。某超商要設在整數坐標 x 處，並希望「到甲站距離 + 到乙站距離」不超過 ' + k + ' 公里，共有幾個位置可選？',
        NO(cnt, [k + 1, cnt + 2, b - a + 1]),
        '|' + H.lin(a) + '| + |' + H.lin(b) + '| ≤ ' + k + '。兩站之間的點距離和固定為 ' + (b - a) + '；往外每多 1 公里，距離和多 2。解得 ' + n(lo) + ' ≤ x ≤ ' + n(hi) + '，共 ' + cnt + ' 個。'];
    } },
    { t: '根號的估計', g: function (R) {
      var k, m, v, lo, tries = 0;
      do { k = R.int(2, 6); m = R.pick([2, 3, 5, 6, 7, 10, 11, 13]); v = k * Math.sqrt(m); lo = Math.floor(v * 2) / 2; tries++; } while ((v - lo < 0.03 || lo + 0.5 - v < 0.03) && tries < 50);
      function iv(x) { return H.dec(x, 1) + ' 與 ' + H.dec(x + 0.5, 1) + ' 之間'; }
      return ['不使用計算機，判斷 ' + k + '√' + m + ' 落在哪個範圍內？（可利用平方比較）', O(iv(lo), [iv(lo - 0.5), iv(lo + 0.5), iv(lo + 1), iv(lo - 1)]),
        k + '√' + m + ' = √' + k * k * m + '。' + H.dec(lo, 1) + '² = ' + H.dec(lo * lo, 2) + ' < ' + k * k * m + ' < ' + H.dec((lo + 0.5) * (lo + 0.5), 2) + ' = ' + H.dec(lo + 0.5, 1) + '²。'];
    } }
  ]);

  // ---------- 1 多項式函數 ----------
  addHard('math', 1, [
    { t: '直線與拋物線的差函數', g: function (R) {
      var x1, x2, x3, y1, y2, y3, s, N1, D1, tries = 0;
      do {
        x1 = R.int(-3, 2); s = R.int(3, 6); x2 = x1 + s; x3 = R.int(x1 + 1, x2 - 1);
        y1 = R.int(-3, 3); y2 = y1 + R.int(-3, 5); y3 = R.int(-2, 6);
        N1 = y3 * s - y1 * s - (y2 - y1) * (x3 - x1); D1 = (x3 - x1) * (x3 - x2); tries++;
      } while (N1 <= 0 && tries < 100);
      if (N1 <= 0) { x1 = 1; x2 = 5; x3 = 2; y1 = 0; y2 = 4; y3 = 2; s = 4; N1 = 4; D1 = -3; }
      var ans = F(-N1 * s, 4 * D1), a = N1 / (s * D1);
      var f = function (x) { return y1 + (y2 - y1) * (x - x1) / s; }, g = function (x) { return f(x) + a * (x - x1) * (x - x2); };
      return ['坐標平面上，L 為一次函數 y = f(x) 的圖形，Γ 為二次函數 y = g(x) 的圖形。已知 L 與 Γ 交於 ' + H.pt(x1, y1) + '、' + H.pt(x2, y2) + ' 兩點，且點 ' + H.pt(x3, y3) + ' 在 Γ 上。則 g(x) − f(x) 的最大值為何？',
        O(ans, [F(-N1, D1), F(-N1 * s * s, 4 * D1 * s), F(-N1 * s, 2 * D1), F(N1 * s, 4 * s)]),
        '兩圖形交於 x = ' + n(x1) + '、' + n(x2) + ' → g(x) − f(x) = a(' + H.lin(x1) + ')(' + H.lin(x2) + ')。代 x = ' + n(x3) + '：f(' + n(x3) + ') = ' + F(y1 * s + (y2 - y1) * (x3 - x1), s) + '，' + y3 + ' − f(' + n(x3) + ') = ' + F(N1, s) + '，所以 a = ' + F(N1, s) + ' ÷ [' + pr(x3 - x1) + ' × ' + pr(x3 - x2) + '] = ' + F(N1, s * D1) + '。開口向下，最大值在兩根中點：−a × (' + s + '/2)² = ' + ans + '。',
        QF.plot({ range: 8, lines: [[-(y2 - y1) / s, 1, -(y1 - (y2 - y1) * x1 / s), 'L']], fns: [[g, 'Γ', x3 + 0.5]], pts: [[x1, y1], [x2, y2], [x3, y3]] })];
    } },
    { t: '餘式的組合', g: function (R) {
      var a = R.int(-4, 3), b = a + R.int(1, 5), p = R.nz(-5, 5), q = R.int(-8, 8), r1 = p * a + q, r2 = p * b + q;
      function lin(pp, qq) { return (pp === 1 ? '' : pp === -1 ? '−' : n(pp)) + 'x' + (qq ? sg(qq) : ''); }
      return ['多項式 f(x) 除以 (' + H.lin(a) + ') 的餘式為 ' + n(r1) + '，除以 (' + H.lin(b) + ') 的餘式為 ' + n(r2) + '。則 f(x) 除以 (' + H.lin(a) + ')(' + H.lin(b) + ') 的餘式為何？',
        O(lin(p, q), [lin(-p, q) === lin(p, q) ? lin(p, q + 1) : lin(-p, q), lin(p, -q || 1), lin(q || 1, p), lin(p, q + p)]),
        '除式二次 → 餘式設 px + q。餘式定理：f(' + n(a) + ') = ' + n(a) + 'p + q = ' + n(r1) + '、f(' + n(b) + ') = ' + n(b) + 'p + q = ' + n(r2) + '，解得 p = ' + n(p) + '、q = ' + n(q) + '。'];
    } },
    { t: '三次函數的局部近似', g: function (R) {
      var a = R.pick([1, -1, 2, -2]), h = R.int(-3, 3), p = R.nz(-6, 6), k = R.int(-6, 6);
      var cs = [a, -3 * a * h, 3 * a * h * h + p, -a * h * h * h - p * h + k];
      function poly(c) { var s = ''; ['x³', 'x²', 'x', ''].forEach(function (v, i) { var x = c[i]; if (!x) return; var b = (Math.abs(x) === 1 && v ? '' : Math.abs(x)) + v; s += s ? (x < 0 ? ' − ' : ' + ') + b : (x < 0 ? '−' : '') + b; }); return s; }
      function L(m, hh, kk) { var x = hh ? '(x ' + (hh < 0 ? '+ ' + (-hh) : '− ' + hh) + ')' : 'x'; if (m === 1 && hh) x = x.slice(1, -1); return 'y = ' + (m === 1 ? '' : m === -1 ? '−' : n(m)) + x + (kk ? sg(kk) : ''); }
      var ansS = L(p, h, k);
      return ['三次函數 y = ' + poly(cs) + ' 的圖形在其對稱中心附近，最接近下列哪一條直線？',
        O(ansS, [L(a, h, k), L(p, -h, k), L(p, h, -k), L(cs[2], h, k), L(-p, h, k), L(p, h, k + 1), L(p, h, k - 2)]),
        '改寫成 y = ' + n(a) + '(x − h)³ + p(x − h) + k：對稱中心 x = −b ÷ 3a = ' + n(h) + '，y = ' + n(k) + '；展開比較一次項得 p = ' + n(p) + '。中心附近 (x − h)³ 很小，圖形近似 ' + ansS + '。'];
    } },
    { t: '不等式的換元', g: function (R) {
      var r1 = R.int(-4, 3), r2 = r1 + R.int(2, 6), m = R.int(1, 9), c = R.pick([2, 3]);
      var lo = F(r1 + m, c), hi = F(r2 + m, c), B = -(r1 + r2), Cc = r1 * r2;
      function tm(co, v) { return co ? (co < 0 ? ' − ' : ' + ') + (Math.abs(co) === 1 ? '' : Math.abs(co)) + v : ''; }
      return ['已知 x²' + tm(B, 'x') + (Cc ? sg(Cc) : '') + ' < 0 的解為 ' + n(r1) + ' < x < ' + n(r2) + '。則 (' + c + 'x − ' + m + ')²' + tm(B, '(' + c + 'x − ' + m + ')') + (Cc ? sg(Cc) : '') + ' < 0 的解為何？',
        O(lo + ' < x < ' + hi, [F(r1 - m, c) + ' < x < ' + F(r2 - m, c), (c * r1 - m) + ' < x < ' + (c * r2 - m), F(r1 + m, 1) + ' < x < ' + F(r2 + m, 1), F(r1, c) + ' < x < ' + F(r2, c)].map(function (s) { return s.replace(/−0 /g, '0 '); })),
        '令 t = ' + c + 'x − ' + m + '，原式變成 t 的不等式，解為 ' + n(r1) + ' < t < ' + n(r2) + '。所以 ' + n(r1) + ' < ' + c + 'x − ' + m + ' < ' + n(r2) + ' → ' + lo + ' < x < ' + hi + '。'];
    } }
  ]);

  // ---------- 2 直線與圓 ----------
  addHard('math', 2, [
    { t: '平行線距離（領海）', g: function (R) {
      var t = R.pick(NORM), A = t[0], B = t[1] * R.sign(), N = t[2], c = R.int(-30, 30), d = 12, x0 = R.int(-4, 6), y0;
      do { y0 = R.int(-6, 8); } while (A * x0 + B * y0 + c === 0);
      var side = Math.sign(A * x0 + B * y0 + c), c2 = c - side * d * N, c3 = c + side * d * N;
      return ['各國沿岸「領海基線」外側 12 浬內的海域為領海。在以浬為單位的坐標平面上，某國領海基線位於直線 L：' + line(A, B, c) + ' 上，且點 ' + H.pt(x0, y0) + ' 在基線的「內側」（陸地側）。則這段領海位於 L 與下列哪一條直線之間？',
        O(line(A, B, c2), [line(A, B, c3), line(A, B, c - side * d), line(A, B, c + side * d), line(A, B, c - side * 2 * d * N)]),
        '與 L 平行的直線 ' + line(A, B, 0).replace(' = 0', '') + ' + k = 0，距離 |k − ' + pr(c) + '| ÷ ' + N + ' = 12 → k = ' + n(c + d * N) + ' 或 ' + n(c - d * N) + '。內側點代入 L 的值為' + (side > 0 ? '正' : '負') + '，外側要取相反號 → ' + line(A, B, c2) + '。',
        QF.plot({ range: Math.max(10, Math.ceil(Math.abs(c2) / N) + 4), lines: [[A, B, c, 'L', 'acc thick'], [A, B, c2, '', 'dash']], pts: [[x0, y0, '內側點']] })];
    } },
    { t: '摺紙與中垂線', g: function (R) {
      var a = R.nz(-6, 6), b = R.nz(-6, 6), s2 = a * a + b * b;
      return ['在坐標紙上把原點 O 摺到點 P' + H.pt(a, b) + ' 上，摺痕所在的直線與 x 軸交點的 x 坐標為何？',
        FO(s2, 2 * a, [F(s2, a), F(s2, 2 * b), F(a, 2), F(-s2, 2 * a)]),
        '摺痕是 OP 的中垂線：過中點 ' + H.pt(a / 2, b / 2).replace(/\.5/g, '.5') + '，法向量 (' + n(a) + ', ' + n(b) + ') → ' + line(a, b, 0).replace(' = 0', '') + ' = ' + F(s2, 2) + '。令 y = 0 → x = ' + F(s2, 2 * a) + '。',
        QF.plot({ range: 8, lines: [[a, b, -s2 / 2, '摺痕', 'dash']], pts: [[0, 0, ''], [a, b, 'P']] })];
    } },
    { t: '旋轉中心', g: function (R) {
      var px = R.int(-3, 5), py = R.int(-3, 5), ux = R.nz(-5, 5), uy = R.int(-5, 5), sx = px + ux, sy = py + uy, ex = px - uy, ey = py + ux;
      var askR = Math.random() < 0.4, r2 = ux * ux + uy * uy;
      return ['一張星軌照片中，每顆星星都繞著北極星 P 以逆時針方向轉了 90°。已知甲星軌跡的起點為 ' + H.pt(sx, sy) + '、終點為 ' + H.pt(ex, ey) + '，則' + (askR ? '甲星軌跡圓弧的半徑為何？' : '北極星 P 的坐標為何？'),
        askR ? O(H.sqrtS(r2), [H.sqrtS(r2 * 2), H.sqrtS((sx - ex) * (sx - ex) + (sy - ey) * (sy - ey)), String(Math.abs(ux) + Math.abs(uy))]) : O(H.pt(px, py), [H.pt((sx + ex) / 2, (sy + ey) / 2), H.pt(px + 1, py), H.pt(py, px), H.pt(-px, -py)]),
        'P 到起點、終點等距 → P 在兩點連線的中垂線上；且向量 P→終點 是 P→起點 逆時針轉 90°。設 P(p, q)，由 (' + n(ex) + ' − p, ' + n(ey) + ' − q) = (−(' + n(sy) + ' − q), ' + n(sx) + ' − p) 解得 P = ' + H.pt(px, py) + '，半徑 = |PS| = √' + r2 + ' = ' + H.sqrtS(r2) + '。',
        QF.plot({ range: 10, circles: [[px, py, Math.sqrt(r2)]], pts: [[px, py, 'P'], [sx, sy, '起點'], [ex, ey, '終點']] })];
    } },
    { t: '直線與圓的交點個數', g: function (R) {
      var t = R.pick(NORM), A = t[0], B = -t[1], N = t[2], h = R.int(-3, 3), k = R.int(-3, 3), r = R.int(1, 3), base = A * h + B * k, cnt = 2 * r * N + 1;
      return ['雷射光沿直線 ' + line(A, B, 0).replace(' = 0', '') + ' + t = 0 射出（t 為整數），靶面是圓 ' + (h ? '(x ' + (h < 0 ? '+ ' + (-h) : '− ' + h) + ')²' : 'x²') + ' + ' + (k ? '(y ' + (k < 0 ? '+ ' + (-k) : '− ' + k) + ')²' : 'y²') + ' = ' + r * r + '（含邊界）。若雷射光要碰到靶面，t 共有幾種可能？',
        NO(cnt, [2 * r + 1, 2 * r * N, r * N + 1]),
        '碰到圓 ⇔ 圓心到直線距離 ≤ 半徑：|' + n(base) + ' + t| ÷ ' + N + ' ≤ ' + r + ' → ' + n(-base - r * N) + ' ≤ t ≤ ' + n(-base + r * N) + '，共 ' + cnt + ' 個整數。'];
    } }
  ]);

  // ---------- 3 數列與級數 ----------
  addHard('math', 3, [
    { t: '有條件的遞迴', g: function (R) {
      var rr = R.pick([[3, 2], [4, 3], [5, 4]]), k = R.int(5, 7), v = [1, 1], plan = [], bets = [[1, 1]];
      for (var i = 2; i <= k; i++) {
        var p = fm(bets[bets.length - 1], [rr[0], rr[1]]);
        plan.push(p);
        bets.push(p[0] > 2 * p[1] ? fm(p, [1, 2]) : p);
      }
      var ans = bets[k - 1], noHalf = fr(Math.pow(rr[0], k - 1), Math.pow(rr[1], k - 1));
      function nf(f) { return (f[1] === 1 ? (f[0] === 1 ? '' : f[0]) : f[0] + '/' + f[1]) + 'N'; }
      return ['某人購買彩券，第一次投注 N 元。之後每次先把「前一次投注金額」乘以 ' + rr[0] + '/' + rr[1] + ' 當作預定金額；若預定金額大於 2N 元，就把預定金額減半後投注，否則照預定金額投注。此人第 ' + k + ' 次的投注金額為多少元？',
        O(nf(ans), [nf(noHalf), nf(fm(ans, [1, 2])), nf(fm(ans, [rr[0], rr[1]])), nf(fm(noHalf, [1, 2]))]),
        '逐項列表：' + bets.map(function (b, i) { return '第' + (i + 1) + '次 ' + nf(b); }).join('、') + '。有「超過就減半」的條件時直接列表最穩。'];
    } },
    { t: '稀釋問題', g: function (R) {
      var T = R.pick([48, 64, 96, 128, 160, 192]), ask = R.pick(['a2', 'lim', 'b1']);
      var a1 = 3 * T / 4, a2 = 11 * T / 16, lim = F(2 * T, 3), b1 = T / 4;
      var stem = 'A 瓶有含糖 ' + T + ' 公克的紅茶 1000 毫升，B 瓶有不含糖的紅茶 500 毫升。把 A 瓶混勻後倒 500 毫升到 B 瓶，B 瓶混勻後再倒 500 毫升回 A 瓶，稱為一次稀釋。';
      if (ask === 'a2') return [stem + '第 2 次稀釋完，A 瓶的含糖量為多少公克？', NO(a2, [a1, T / 2, T / 4 + T / 2 - 1, 5 * T / 8]),
        '設 A 瓶含糖 a，總糖量 ' + T + ' 不變。倒出一半後 A 剩 a/2，B 有 ' + T + ' − a/2；B 倒回一半 → a(n+1) = a/2 + (' + T + ' − a/2)/2 = a/4 + ' + T / 2 + '。a1 = ' + a1 + '，a2 = ' + a2 + '。'];
      if (ask === 'b1') return [stem + '第 1 次稀釋完，B 瓶的含糖量為多少公克？', NO(b1, [T / 2, a1, T / 8]),
        'a1 = ' + T + '/4 + ' + T / 2 + ' = ' + a1 + '，總糖量不變 → B 瓶 = ' + T + ' − ' + a1 + ' = ' + b1 + '。'];
      return [stem + '重複稀釋很多次後，A 瓶含糖量會趨近多少公克？', O(lim, [String(T / 2), String(T), F(T, 3), String(a1)]),
        'a(n+1) = a/4 + ' + T / 2 + '，穩定值 c = c/4 + ' + T / 2 + ' → c = ' + lim + '（A 瓶體積是 B 的 2 倍，糖量也趨近 2 : 1）。'];
    } },
    { t: '等差數列的公差限制', g: function (R) {
      var a1 = R.int(1, 9), u = R.pick([12, 18, 20, 24, 30, 36]), v = u * R.pick([2, 3]) + R.pick([0, u / 2 | 0, 6]), M = a1 + u, Lst = a1 + v, cnt = 0, ds = [];
      for (var d = 1; d <= v; d++) if (u % d === 0 && v % d === 0) { cnt++; ds.push(d); }
      return ['一個公差為正整數的等差數列，首項為 ' + a1 + '、末項為 ' + Lst + '，且 ' + M + ' 是其中一項。這樣的等差數列共有幾個？',
        NO(cnt, [ds.length + 1, ds.length - 1, gcd(u, v)]),
        '公差 d 必須同時整除 ' + M + ' − ' + a1 + ' = ' + u + ' 與 ' + Lst + ' − ' + a1 + ' = ' + v + '，即 d 是 gcd(' + u + ', ' + v + ') = ' + gcd(u, v) + ' 的正因數：' + ds.join('、') + '，共 ' + cnt + ' 個。'];
    } }
  ]);

  // ---------- 4 排列組合 ----------
  addHard('math', 4, [
    { t: '相鄰鏈', g: function (R) {
      var m = R.int(6, 8), ans = fact(m - 3) * 4;
      return ['將 1, 2, …, ' + m + ' 這 ' + m + ' 個數字排成一個 ' + m + ' 位數。要求 1, 2 相鄰、4, 5 相鄰，而且 5, 6 也相鄰，共可排出幾個 ' + m + ' 位數？',
        NO(ans, [fact(m - 3) * 2, fact(m - 2) * 4, fact(m - 3) * 8, fact(m - 3) * 6]),
        '4-5、5-6 都相鄰 → 5 必在 4、6 中間，「456」或「654」2 種；「12」或「21」2 種。把兩塊各看成一個單位，共 ' + (m - 3) + ' 個單位：' + (m - 3) + '! × 2 × 2 = ' + ans + '。'];
    } },
    { t: '圓上等分點三角形', g: function (R) {
      var m = R.pick([9, 10, 11, 12, 13, 15]), iso = 0, rt = 0, ask = m % 2 === 0 && Math.random() < 0.4 ? 'rt' : 'iso';
      for (var i = 0; i < m; i++) for (var j = i + 1; j < m; j++) for (var k = j + 1; k < m; k++) {
        var a = j - i, b = k - j, c = m - a - b;
        if (a === b || b === c || a === c) iso++;
        if (2 * a === m || 2 * b === m || 2 * c === m) rt++;
      }
      var ans = ask === 'iso' ? iso : rt, tot = C(m, 3);
      return ['圓上有 ' + m + ' 個等分點，任選 3 點作三角形。其中' + (ask === 'iso' ? '等腰三角形（含正三角形）' : '直角三角形') + '共有幾個？',
        NO(ans, [ask === 'iso' ? m * Math.floor((m - 1) / 2) : rt / 2, tot - ans, ans + m]),
        ask === 'iso' ? '用三段弧的格數 (a, b, c)，a + b + c = ' + m + ' 分類。以頂角頂點計：每點可當頂點 ' + Math.floor((m - 1) / 2) + ' 種，共 ' + m * Math.floor((m - 1) / 2) + ' 種' + (m % 3 === 0 ? '，但正三角形被數了 3 次，要扣掉 2 × ' + m / 3 : '') + ' → ' + iso + '。' : '直角 ⇔ 有一邊是直徑。直徑有 ' + m / 2 + ' 條，第三點有 ' + (m - 2) + ' 種 → ' + rt + '。'];
    } },
    { t: '有限制的分配', g: function (R) {
      var m = R.pick([3, 4]), tN = R.pick([2, 3]), tot = 2 * m, cnt = 0;
      for (var mask = 0; mask < (1 << tot); mask++) {
        var bits = 0, tr = 0; for (var i = 0; i < tot; i++) if (mask >> i & 1) { bits++; if (i < tN) tr++; }
        if (bits === m && tr >= 1 && tr <= tN - 1) cnt++;
      }
      return ['公司把 ' + tot + ' 位新人（其中 ' + tN + ' 位會說日語）平均分到甲、乙兩個部門各 ' + m + ' 人，且兩個部門都至少要有 1 位會說日語的人，共有幾種分法？',
        NO(cnt, [C(tot, m), cnt / 2, C(tot, m) - 2 * C(tot - tN, m - tN)]),
        '用餘事件：C(' + tot + ', ' + m + ') 種分法扣掉「會日語的人全在同一部門」：全在甲有 C(' + (tot - tN) + ', ' + (m - tN) + ') 種、全在乙也一樣。' + C(tot, m) + ' − 2 × ' + C(tot - tN, m - tN) + ' = ' + cnt + '。兩部門不同，不用除以 2。'];
    } }
  ]);

  // ---------- 5 機率 ----------
  addHard('math', 5, [
    { t: '恰出現三種', g: function (R) {
      var m = R.pick([4, 5]), k = 4, good = 0, tot = Math.pow(m, k);
      for (var s = 0; s < tot; s++) { var x = s, seen = {}, c = 0; for (var i = 0; i < k; i++) { var d = x % m; x = Math.floor(x / m); if (!seen[d]) { seen[d] = 1; c++; } } if (c === 3) good++; }
      return ['某盒玩共有 ' + m + ' 款公仔，每盒隨機裝 1 款且各款機率相同。小明買了 4 盒，恰好抽到 3 種不同款的機率為何？',
        FO(good, tot, [F(C(m, 3), tot), F(C(m, 3) * 3, tot), F(good, tot * 2), F(C(m, 3) * 36 / 2, tot)]),
        '選哪 3 款 C(' + m + ', 3) × 哪一款重複 3 × 排列 4!/2! = ' + C(m, 3) + ' × 3 × 12 = ' + good + '；樣本空間 ' + m + '⁴ = ' + tot + ' → ' + F(good, tot) + '。'];
    } },
    { t: '系統可靠度', g: function (R) {
      var a = R.int(7, 9), b = R.int(5, 9), c = R.int(5, 9), p = a / 10 * (1 - (1 - b / 10) * (1 - c / 10));
      return ['某系統由三個元件組成：元件甲與「乙、丙並聯的組合」串聯（甲正常，且乙、丙至少一個正常，系統才運作）。甲、乙、丙正常的機率分別為 ' + a / 10 + '、' + b / 10 + '、' + c / 10 + '，且彼此獨立。系統能運作的機率為何？',
        O(H.dec(p, 3), [H.dec(a / 10 * b / 10 * c / 10, 3), H.dec(a / 10 * (b / 10 + c / 10) / 2, 3), H.dec(1 - (1 - a / 10) * (1 - b / 10) * (1 - c / 10), 3), H.dec(a / 10 * Math.max(b, c) / 10, 3)]),
        'P(乙或丙正常) = 1 − (1 − ' + b / 10 + ')(1 − ' + c / 10 + ') = ' + H.dec(1 - (1 - b / 10) * (1 - c / 10), 2) + '；再乘甲：' + a / 10 + ' × ' + H.dec(1 - (1 - b / 10) * (1 - c / 10), 2) + ' = ' + H.dec(p, 3) + '。'];
    } },
    { t: '隨機移動', g: function (R) {
      var cells = 5, st = R.int(1, 5), steps = R.pick([2, 3]), tgt = R.int(1, 5), dist = [0, 0, 0, 0, 0, 0];
      dist[st] = 1;
      for (var s = 0; s < steps; s++) { var nd = [0, 0, 0, 0, 0, 0]; for (var i = 1; i <= cells; i++) { if (!dist[i]) continue; nd[i > 1 ? i - 1 : i] += dist[i] / 2; nd[i < cells ? i + 1 : i] += dist[i] / 2; } dist = nd; }
      var den = Math.pow(2, steps), num = Math.round(dist[tgt] * den);
      return ['一排 5 格（編號 1～5），棋子每次擲公正硬幣：正面往右一格、反面往左一格；若會走出邊界就停在原地。棋子從第 ' + st + ' 格出發，擲 ' + steps + ' 次後停在第 ' + tgt + ' 格的機率為何？',
        FO(num, den, [F(1, 5), F(num + 1, den), F(num, den * 2), F(Math.max(num - 1, 0) || 3, den)]),
        '每一步只看現在位置，逐步計算（出界停留要算進去）。' + steps + ' 步後各格機率：' + [1, 2, 3, 4, 5].map(function (i) { return i + ':' + F(Math.round(dist[i] * den), den); }).join('、') + '。'];
    } }
  ]);

  // ---------- 6 數據分析 ----------
  addHard('math', 6, [
    { t: '統計量綜合判斷', g: function (R) {
      var mx = R.int(50, 80), sx = R.pick([5, 10, 4]), ma = R.int(30, 60), sa = R.pick([6, 12, 15, 20]), r = R.pick([0.6, 0.75, 0.8, -0.5]), c = R.pick([0.5, 2, 1.5]);
      var trues = [['B 的標準差為 ' + H.dec(c * sa, 2), 'σB = |c|σA'], ['B 與身長的相關係數為 ' + n(r), '乘正數倍相關係數不變'], ['以 A 對身長的迴歸直線預測身長 ' + mx + ' 的昆蟲，A 為 ' + ma, '迴歸直線過 (μX, μA)'], ['B 對身長的迴歸直線斜率為 ' + H.dec(c * r * sa / sx, 3), '斜率 = r·σB ÷ σX']];
      var falses = [['B 的標準差為 ' + sa, '要乘 ' + c], ['B 與 A 的相關係數為 ' + c, 'B 是 A 的正倍數，相關係數為 1'], ['B 與身長的相關係數為 ' + H.dec(c * r, 3), '相關係數不受正倍數影響'], ['B 的變異數為 ' + H.dec(c * sa * sa, 2), '變異數要乘 c²'], ['B 對身長的迴歸直線斜率為 ' + H.dec(r * sa / sx, 3), '還要乘 ' + c]];
      var q = judge(R, trues, falses, '研究某昆蟲的身長 X 與體內養分 A 濃度：X 的平均 ' + mx + '、標準差 ' + sx + '；A 的平均 ' + ma + '、標準差 ' + sa + '；X 與 A 的相關係數 ' + n(r) + '。已知每隻昆蟲體內 B 濃度都是 A 濃度的 ' + c + ' 倍。下列敘述何者正確？');
      q.push(QF.table(['', '平均', '標準差', '與身長的相關係數'], [['身長 X', mx, sx, '—'], ['A 濃度', ma, sa, n(r)]]));
      return q;
    } },
    { t: '部分加分後的百分位數', g: function (R) {
      var nn = 20, k = R.pick([20, 25, 30, 40, 60, 70, 75, 80]), top = R.int(3, 8), bonus = R.pick([5, 8, 10]), data = [];
      var cur = R.int(35, 45); for (var i = 0; i < nn; i++) { cur += R.int(1, 4); data.push(cur); }
      function pk(d) { var v = d.length * k / 100; return v === Math.floor(v) ? (d[v - 1] + d[v]) / 2 : d[Math.ceil(v) - 1]; }
      var before = pk(data), nd = data.map(function (x, i) { return i >= nn - top ? x + bonus : x; }).sort(function (a, b) { return a - b; }), after = pk(nd);
      return ['全班 20 人的成績由低到高為：' + data.join('、') + '。老師只把最高分的 ' + top + ' 人各加 ' + bonus + ' 分。加分後，第 ' + k + ' 百分位數為何？（P_k：20 × k% 不是整數取下一個名次；是整數 m 取第 m、m + 1 名平均）',
        NO(after, [before + bonus, before === after ? after + bonus / 2 : before, after + 1]),
        '20 × ' + k + '% = ' + nn * k / 100 + ' → ' + (nn * k / 100 === Math.floor(nn * k / 100) ? '第 ' + nn * k / 100 + '、' + (nn * k / 100 + 1) + ' 名平均' : '第 ' + Math.ceil(nn * k / 100) + ' 名') + '。加分前 P' + k + ' = ' + before + '；只加在最高 ' + top + ' 人（第 ' + (nn - top + 1) + '～20 名），' + (before === after ? '沒有影響到該名次，所以不變' : '影響到該名次') + '，加分後 P' + k + ' = ' + after + '。'];
    } },
    { t: '次數分配圖判讀', g: function (R) {
      var labels = ['1 分', '2 分', '3 分', '4 分', '5 分'], cnt = [R.int(1, 8), R.int(2, 10), R.int(3, 12), R.int(2, 10), R.int(1, 8)], tot = cnt.reduce(function (a, b) { return a + b; }, 0);
      var sum = cnt.reduce(function (a, c, i) { return a + c * (i + 1); }, 0), ask = Math.random() < 0.5 ? 'mean' : 'med';
      var list = []; cnt.forEach(function (c, i) { for (var j = 0; j < c; j++) list.push(i + 1); });
      var med = tot % 2 ? list[(tot - 1) / 2] : (list[tot / 2 - 1] + list[tot / 2]) / 2;
      return ['某餐廳蒐集顧客滿意度（1～5 分）的次數分配如圖。所有顧客評分的' + (ask === 'mean' ? '平均數（四捨五入到小數第二位）' : '中位數') + '為何？',
        ask === 'mean' ? O(H.dec(sum / tot, 2), [H.dec(sum / 5, 2), '3', H.dec(sum / tot + 0.25, 2), H.dec(tot / 5, 2)]) : NO(med, [3, med + 0.5, med - 1]),
        '共 ' + tot + ' 人，總分 ' + sum + '。平均 = ' + sum + ' ÷ ' + tot + ' ≈ ' + H.dec(sum / tot, 2) + '；由小到大第 ' + (tot % 2 ? (tot + 1) / 2 : tot / 2 + '、' + (tot / 2 + 1)) + ' 個是中位數 → ' + med + '。',
        QF.bars(labels, cnt, '人數', '顧客滿意度')];
    } }
  ]);

  // ---------- 7 三角比 ----------
  addHard('math', 7, [
    { t: '兩直線交點距離', g: function (R) {
      var P = R.pick([[75, 30, 'd√2/2'], [90, 30, 'd√3/3'], [120, 30, 'd/2'], [135, 45, 'd√2/2'], [120, 60, 'd'], [150, 30, 'd√3/3'], [105, 60, 'd√6/2']]), d = R.pick([6, 10, 12, 18, 20, 24]);
      var t1 = P[0], t2 = P[1], val = d * Math.sin(t2 * Math.PI / 180) / Math.sin((t1 - t2) * Math.PI / 180);
      function tn(t) { return Math.tan(t * Math.PI / 180); }
      var l1 = t1 === 90 ? [1, 0, 0, 'L1'] : [tn(t1), -1, 0, 'L1'], l2 = [tn(t2), -1, tn(t2) * d, 'L2'];
      return ['坐標平面上，L1 為通過原點且斜角 ' + t1 + '° 的直線，L2 為通過點 (−' + d + ', 0) 且斜角 ' + t2 + '° 的直線。L1 與 L2 的交點到原點的距離約為多少？（四捨五入到小數第一位）',
        O(H.dec(val, 1), [H.dec(d * Math.sin(t1 * Math.PI / 180) / Math.sin((t1 - t2) * Math.PI / 180), 1), H.dec(d / Math.sin((t1 - t2) * Math.PI / 180), 1), H.dec(val * 2, 1), H.dec(d * Math.sin(t2 * Math.PI / 180), 1)]),
        '三角形三頂點：原點 O、(−' + d + ', 0)、交點 P。在 (−' + d + ', 0) 的內角 = ' + t2 + '°，在 O 的內角 = 180° − ' + t1 + '° = ' + (180 - t1) + '°，在 P 的內角 = ' + (t1 - t2) + '°。正弦定理：OP ÷ sin' + t2 + '° = ' + d + ' ÷ sin' + (t1 - t2) + '° → OP = ' + P[2].replace('d', d) + ' ≈ ' + H.dec(val, 1) + '。',
        QF.plot({ range: Math.max(12, Math.ceil(val + 4)), lines: [l1, l2], pts: [[-d, 0, '(−' + d + ', 0)']] })];
    } },
    { t: '兩次仰角測高', g: function (R) {
      var P = R.pick([[30, 60], [30, 45], [45, 60]]), d = 2 * R.int(3, 25), h, hs;
      if (P[0] === 30 && P[1] === 60) { h = d * Math.sqrt(3) / 2; hs = (d / 2) + '√3'; }
      else if (P[0] === 30) { h = d * (Math.sqrt(3) + 1) / 2; hs = (d / 2) + '(√3 + 1)'; }
      else { h = d * (3 + Math.sqrt(3)) / 2; hs = (d / 2) + '(3 + √3)'; }
      return ['小華在平地上朝一座塔直線前進。在 A 點測得塔頂仰角 ' + P[0] + '°，再前進 ' + d + ' 公尺到 B 點，測得仰角 ' + P[1] + '°。塔高為多少公尺？',
        O(hs, [d + '√3', (d / 2) + '(√3 − 1)', String(d), (d / 2) + '√2', d + '(√3 + 1)']),
        '設塔高 h、B 到塔底 x：h = x·tan' + P[1] + '°，h = (x + ' + d + ')·tan' + P[0] + '°。聯立消去 x，得 h = ' + hs + ' ≈ ' + H.dec(h, 1) + ' 公尺。'];
    } },
    { t: '等腰三角形', g: function (R) {
      var t = R.pick([[3, 4, 5], [5, 12, 13], [8, 15, 17], [6, 8, 10], [7, 24, 25]]), k = R.int(1, 3), half = t[0] * k, hgt = t[1] * k, leg = t[2] * k, b = 2 * half, ask = Math.random() < 0.5;
      var cosA = fr(2 * leg * leg - b * b, 2 * leg * leg);
      return ['等腰三角形 ABC 中 AB = AC = ' + leg + '、BC = ' + b + '。' + (ask ? '△ABC 的面積為何？' : 'cos∠A（頂角）的值為何？'),
        ask ? NO(half * hgt, [b * leg / 2, half * leg, half * hgt * 2]) : O(ft(cosA), [F(half, leg), F(hgt, leg), F(-cosA[0], cosA[1]), F(b, 2 * leg)]),
        '作底邊的高：高 = √(' + leg + '² − ' + half + '²) = ' + hgt + '，面積 = ½ × ' + b + ' × ' + hgt + ' = ' + half * hgt + '。頂角用餘弦定理：cosA = (' + leg + '² + ' + leg + '² − ' + b + '²) ÷ (2 × ' + leg + ' × ' + leg + ') = ' + ft(cosA) + '。',
        QF.tri(['BC = ' + b, 'AC = ' + leg, 'AB = ' + leg])];
    } }
  ]);

  // ---------- 8 指數與對數 ----------
  addHard('math', 8, [
    { t: '對數比大小', g: function (R) {
      var a = R.pick([0.2, 0.3, 0.5, 0.8, 2, 3, 5, 8]), L = Math.log(a) / Math.LN10;
      var items = [['log a', L], ['log a²', 2 * L], ['(log a)²', L * L], ['log √a', L / 2]];
      var ord = items.slice().sort(function (x, y) { return x[1] - y[1]; }).map(function (x) { return x[0]; }).join(' < ');
      var wrong = [];
      for (var t = 0; t < 30 && wrong.length < 4; t++) { var w = sh(items).map(function (x) { return x[0]; }).join(' < '); if (w !== ord && wrong.indexOf(w) < 0) wrong.push(w); }
      return ['設 a = ' + a + '，將 log a、log a²、(log a)²、log √a 由小到大排列，下列何者正確？', O(ord, wrong),
        'log ' + a + ' ≈ ' + H.dec(L, 4) + '（' + (a < 1 ? '負數' : '介於 0 與 1') + '）。log a² = 2log a ≈ ' + H.dec(2 * L, 4) + '、log √a = ½log a ≈ ' + H.dec(L / 2, 4) + '、(log a)² ≈ ' + H.dec(L * L, 4) + '。' + (a < 1 ? '負數乘 2 更小。' : '0 到 1 之間的數平方會變小。')];
    } },
    { t: '聯立指數方程式', g: function (R) {
      var x = R.int(-3, 4), y = R.int(-3, 4), p = R.int(1, 3), q = R.int(1, 3), r = R.int(1, 3), s = R.int(1, 3);
      while (p * s - q * r === 0) s = R.int(1, 4);
      var m = p * x + q * y, k = r * x + s * y;
      function pw(base, e) { return base + (e === 1 ? '' : '^' + e); }
      return ['正數 a、b 滿足 ' + pw('a', p) + pw('b', q) + ' = 10^' + pr(m) + '、' + pw('a', r) + pw('b', s) + ' = 10^' + pr(k) + '。則 ab = ?',
        O('10^' + pr(x + y), ['10^' + pr(m + k), '10^' + pr(x - y), '10^' + pr(x * y), '10^' + pr(x + y + 1)]),
        '兩邊取 log，令 X = log a、Y = log b：' + p + 'X + ' + q + 'Y = ' + n(m) + '、' + r + 'X + ' + s + 'Y = ' + n(k) + '，解得 X = ' + n(x) + '、Y = ' + n(y) + '，ab = 10^(X + Y) = 10^' + pr(x + y) + '。'];
    } },
    { t: '指數成長所需時間', g: function (R) {
      var T = R.pick([2, 3, 4, 5, 6]), K = R.pick([[1000, 3], [100, 2], [10000, 4]]), t = Math.ceil(K[1] * T / 0.30103 - 1e-9);
      return ['某細菌每 ' + T + ' 小時數量加倍。從現在起至少要經過幾個整小時，數量才會超過現在的 ' + K[0] + ' 倍？（log 2 ≈ 0.3010）',
        NO(t, [Math.round(K[1] * T / 0.5), Math.floor(K[1] * T / 0.30103) - (Math.floor(K[1] * T / 0.30103) === t ? 1 : 0), t + T]),
        '2^(t/' + T + ') > ' + K[0] + ' → (t/' + T + ')·log 2 > ' + K[1] + ' → t > ' + K[1] * T + ' ÷ 0.3010 ≈ ' + H.dec(K[1] * T / 0.30103, 2) + '，至少 ' + t + ' 小時。'];
    } },
    { t: '連續複利與 ln', g: function (R) {
      var r = R.pick([2, 3, 4, 5, 6]), A = R.pick([120, 135, 150, 180, 200]);
      return ['以連續複利計算，本金 100 萬元、每期利率 ' + r + '%，本利和 100·e^(' + r + 'n/100) 達到 ' + A + ' 萬元所需期數 n 等於下列何者？（ln x 為以 e 為底的對數）',
        O('(100/' + r + ')·ln(' + A + '/100)', ['(' + r + '/100)·ln(' + A + '/100)', '(100/' + r + ')·ln(' + A + ')', 'ln(' + A + '/100) − ' + r + '/100', '(100/' + r + ')·log(' + A + '/100)']),
        '100·e^(' + r + 'n/100) = ' + A + ' → e^(' + r + 'n/100) = ' + A + '/100 → ' + r + 'n/100 = ln(' + A + '/100) → n = (100/' + r + ')·ln(' + A + '/100) ≈ ' + H.dec(100 / r * Math.log(A / 100), 2) + '。'];
    } }
  ]);

  // ---------- 9 三角函數與週期現象 ----------
  addHard('math', 9, [
    { t: '由圖形判斷函數', g: function (R) {
      var a = R.pick([1, 2, 3, -2, -1]), b = R.pick([1, 2, 3]), d = R.int(-1, 3);
      function f(aa, bb, dd) { return 'y = ' + (aa === 1 ? '' : aa === -1 ? '−' : n(aa)) + 'sin(' + (bb === 1 ? '' : bb) + 'x)' + (dd ? sg(dd) : ''); }
      return ['下圖是某函數在 0 ≤ x ≤ 2π 的圖形（虛線標出最大值與最小值），它最可能是下列哪一個函數？',
        O(f(a, b, d), [f(-a, b, d), f(a, b === 3 ? 2 : b + 1, d), f(a, b, -d || 1), f(2 * a, b, d)]),
        '中心線 y = (最大 + 最小) ÷ 2 = ' + n(d) + '；振幅 = (最大 − 最小) ÷ 2 = ' + Math.abs(a) + '；0～2π 內有 ' + b + ' 個完整週期 → 週期 2π/' + b + '，b = ' + b + '；x 從 0 往右先' + (a > 0 ? '上升' : '下降') + ' → a ' + (a > 0 ? '> 0' : '< 0') + '。',
        QF.sine(a, b, d)];
    } },
    { t: '正弦模型求參數', g: function (R) {
      var T = 12, t0 = R.pick([2, 3, 4, 6]), sv = { 2: 0.5, 3: Math.SQRT1_2, 4: Math.sqrt(3) / 2, 6: 1 }, ss = { 2: '1/2', 3: '√2/2', 4: '√3/2', 6: '1' }, a = R.pick([8, 10, 12]);
      var val = { 2: String(a / 2), 3: (a / 2) + '√2', 4: (a / 2) + '√3', 6: String(a) }[t0];
      return ['某地紫外線指數 f(t) = a·sin(πt/12)，其中 t 為早上 6 點後經過的小時數（0 ≤ t ≤ 12）。已知早上 ' + (6 + t0) + ' 點時指數為 ' + val + '，則一天中紫外線指數的最大值為何？',
        NO(a, [a / 2, a * 2, Math.round(a * 0.75)]),
        't = ' + t0 + '：a·sin(' + t0 + 'π/12) = a × ' + ss[t0] + ' = ' + val + ' → a = ' + a + '。sin 最大為 1（t = 6，中午 12 點），最大值 = ' + a + '。'];
    } },
    { t: '三角不等式求時間', g: function (R) {
      var A = R.pick([8, 10, 12]), th = R.pick([['1/2', 2, String(A / 2)], ['√2/2', 3, (A / 2) + '√2'], ['√3/2', 4, (A / 2) + '√3']]), dur = 12 - 2 * th[1];
      return ['同上類型模型 f(t) = ' + A + 'sin(πt/12)（0 ≤ t ≤ 12，t 為早上 6 點後的小時數）。一天中 f(t) ≥ ' + th[2] + ' 的時間共有幾小時？',
        NO(dur, [12 - th[1], th[1] * 2, dur + 2]),
        'sin(πt/12) ≥ ' + th[0] + ' → ' + (th[1] === 2 ? 'π/6' : th[1] === 3 ? 'π/4' : 'π/3') + ' ≤ πt/12 ≤ ' + (th[1] === 2 ? '5π/6' : th[1] === 3 ? '3π/4' : '2π/3') + ' → ' + th[1] + ' ≤ t ≤ ' + (12 - th[1]) + '，共 ' + dur + ' 小時。'];
    } },
    { t: '多個週期同時發生', g: function (R) {
      var p1 = R.int(6, 15), p2 = R.int(8, 20), p3 = R.pick([0, R.int(4, 12)]); while (p2 === p1) p2 = R.int(8, 20);
      var L = lcm(p1, p2); if (p3) L = lcm(L, p3);
      var Tm = L * R.int(3, 8) + R.int(0, L - 1), cnt = Math.floor(Tm / L);
      return ['路口有' + (p3 ? '三' : '兩') + '組廣告燈，分別每 ' + p1 + ' 秒、' + p2 + ' 秒' + (p3 ? '、' + p3 + ' 秒' : '') + '亮一次，第 0 秒同時亮。在 0 < t ≤ ' + Tm + ' 秒內，所有燈同時亮共幾次？',
        NO(cnt, [cnt + 1, Math.floor(Tm / (p1 * p2)), cnt - 1]),
        '同時亮的間隔 = 最小公倍數 ' + L + ' 秒。' + Tm + ' ÷ ' + L + ' = ' + H.dec(Tm / L, 2) + '，不含 t = 0，共 ' + cnt + ' 次。'];
    } }
  ]);

  // ---------- 10 平面向量 ----------
  addHard('math', 10, [
    { t: '平行四邊形區域', g: function (R) {
      var A, B; do { A = [R.int(1, 5), R.int(-2, 3)]; B = [R.int(-2, 3), R.int(1, 5)]; } while (A[0] * B[1] - A[1] * B[0] === 0);
      var good = [[0.5, 0.5], [0.25, 0.75], [1, 0.5], [0.5, 1]][R.int(0, 3)], bads = sh([[1.5, 0.5], [0.5, -0.5], [-0.5, 0.5], [0.5, 1.5], [1.25, 1], [-0.25, -0.5]]).slice(0, 3);
      function P(ab) { return H.pt(ab[0] * A[0] + ab[1] * B[0], ab[0] * A[1] + ab[1] * B[1]); }
      return ['設 O 為原點，OA = ' + H.pt(A[0], A[1]) + '、OB = ' + H.pt(B[0], B[1]) + '。以 OA、OB 為兩邊的平行四邊形（含邊界）中，包含下列哪一點？',
        O(P(good), bads.map(P)),
        '把點寫成 OP = α·OA + β·OB 解聯立；點在平行四邊形內 ⇔ 0 ≤ α ≤ 1 且 0 ≤ β ≤ 1。正解 α = ' + good[0] + '、β = ' + good[1] + '；其他選項的 (α, β) = ' + bads.map(function (b) { return '(' + n(b[0]) + ', ' + n(b[1]) + ')'; }).join('、') + '，有一個超出範圍。',
        QF.plot({ range: 10, lines: [], pts: [[0, 0, 'O'], [A[0], A[1], 'A'], [B[0], B[1], 'B'], [A[0] + B[0], A[1] + B[1], '']] })];
    } },
    { t: '折線與內積', g: function (R) {
      var th = R.pick([60, 90, 120, 45]), i = R.int(1, 3), j = i + R.int(1, 4), p = R.int(1, 4) * 2, q = R.int(1, 4) * 2, ang = ((j - i) * th) % 360, cs = Math.cos(ang * Math.PI / 180), dot = p * q * cs;
      var map = { 0: '1', 45: '√2/2', 90: '0', 135: '−√2/2', 180: '−1', 225: '−√2/2', 270: '0', 315: '√2/2', 60: '1/2', 120: '−1/2', 240: '−1/2', 300: '1/2' };
      function val(c) { if (Math.abs(c - Math.round(c)) < 1e-9) return n(Math.round(c)); if (Math.abs(Math.abs(c) / Math.SQRT2 - Math.round(Math.abs(c) / Math.SQRT2)) < 1e-9) return (c < 0 ? '−' : '') + Math.round(Math.abs(c) / Math.SQRT2) + '√2'; return H.dec(c, 2); }
      return ['機器人在平面上依序走 u1、u2、u3、…，每走完一段就向左轉 ' + th + '°。若 |u' + i + '| = ' + p + '、|u' + j + '| = ' + q + '，則 u' + i + ' · u' + j + ' = ?',
        O(val(dot), [val(p * q * Math.cos(th * Math.PI / 180)), val(-dot) === val(dot) ? val(dot + 1) : val(-dot), val(p * q), val(p * q / 2) === val(dot) ? '1' : val(p * q / 2)]),
        '第 ' + i + ' 段與第 ' + j + ' 段的夾角 = (' + j + ' − ' + i + ') × ' + th + '° = ' + ((j - i) * th) + '°，cos = ' + map[ang] + '。內積 = ' + p + ' × ' + q + ' × ' + (/^−/.test(map[ang]) ? '(' + map[ang] + ')' : map[ang]) + ' = ' + val(dot) + '。'];
    } },
    { t: '向量求面積', g: function (R) {
      var a, b; do { a = [R.int(-5, 6), R.int(-5, 6)]; b = [R.int(-5, 6), R.int(-5, 6)]; } while (a[0] * b[1] - a[1] * b[0] === 0);
      var det = Math.abs(a[0] * b[1] - a[1] * b[0]);
      return ['坐標平面上 O 為原點、A' + H.pt(a[0], a[1]) + '、B' + H.pt(b[0], b[1]) + '，△OAB 的面積為何？',
        FO(det, 2, [String(det), F(Math.abs(a[0] * b[0] + a[1] * b[1]) || det + 1, 2), F(det + 2, 2)]),
        '△OAB 面積 = ½|x1y2 − x2y1| = ½|' + pr(a[0]) + '×' + pr(b[1]) + ' − ' + pr(b[0]) + '×' + pr(a[1]) + '| = ' + F(det, 2) + '。',
        QF.plot({ range: 7, pts: [[0, 0, 'O'], [a[0], a[1], 'A'], [b[0], b[1], 'B']] })];
    } }
  ]);

  // ---------- 11 矩陣 ----------
  addHard('math', 11, [
    { t: '由映射求反方陣', g: function (R) {
      var a, b, c, d; do { a = R.int(-3, 3); b = R.int(-3, 3); c = R.int(-3, 3); d = R.int(-3, 3); } while (Math.abs(a * d - b * c) !== 1);
      function m(x) { return '[[' + x.map(n).slice(0, 2).join(', ') + '], [' + x.map(n).slice(2).join(', ') + ']]'; }
      return ['已知二階方陣 A 滿足 A' + H.pt(a, c) + ' = (1, 0)、A' + H.pt(b, d) + ' = (0, 1)（皆為直行向量）。A 的反方陣 A⁻¹ 為何？',
        O(m([a, b, c, d]), [m([a, c, b, d]), m([d, -b, -c, a]), m([-a, -b, -c, -d]), m([b, a, d, c])]),
        'A 把 u 送到 v ⇔ A⁻¹ 把 v 送回 u。A⁻¹(1, 0) = ' + H.pt(a, c) + ' 是 A⁻¹ 的第 1 行，A⁻¹(0, 1) = ' + H.pt(b, d) + ' 是第 2 行，所以 A⁻¹ = ' + m([a, b, c, d]) + '（注意是「行」不是「列」）。'];
    } },
    { t: '人口移動矩陣', g: function (R) {
      var p = R.pick([10, 20, 30]), q = R.pick([10, 20, 40]), x = R.int(4, 12) * 10, y = R.int(4, 12) * 10, yrs = R.pick([1, 2]);
      var X = x, Y = y; for (var i = 0; i < yrs; i++) { var nx = X * (100 - p) / 100 + Y * q / 100, ny = X * p / 100 + Y * (100 - q) / 100; X = nx; Y = ny; }
      return ['甲、乙兩城每年人口移動：甲城有 ' + p + '% 的人遷到乙城、乙城有 ' + q + '% 的人遷到甲城，其餘留在原地（總人口不變）。今年甲城 ' + x + ' 萬人、乙城 ' + y + ' 萬人，' + yrs + ' 年後甲城約有多少萬人？',
        O(H.dec(X, 2), [H.dec(x, 2), H.dec(X + Y - X === Y ? Y : X + 1, 2), H.dec(x * Math.pow((100 - p) / 100, yrs), 2), H.dec((x + y) / 2, 2)]),
        '寫成矩陣 [[' + (1 - p / 100) + ', ' + q / 100 + '], [' + p / 100 + ', ' + (1 - q / 100) + ']] 乘 (甲, 乙)。每年：新甲 = ' + (1 - p / 100) + '×甲 + ' + q / 100 + '×乙。' + yrs + ' 年後甲 ≈ ' + H.dec(X, 2) + ' 萬、乙 ≈ ' + H.dec(Y, 2) + ' 萬。'];
    } },
    { t: '方陣奇數次方', g: function (R) {
      var a = R.int(-2, 3), b = R.nz(-2, 2), c = R.nz(-2, 2), k = a * a + b * c; if (k === 0) { b = 1; c = 1; k = a * a + 1; }
      var m = R.int(1, 3), e = 2 * m + 1, f = Math.pow(k, m), i = R.int(0, 1), j = R.int(0, 1), A = [a, b, c, -a], ans = f * A[2 * i + j];
      return ['A = [[' + n(a) + ', ' + n(b) + '], [' + n(c) + ', ' + n(-a) + ']]，則 A^' + e + ' 的第 ' + (i + 1) + ' 列第 ' + (j + 1) + ' 行元素為何？',
        NO(ans, [Math.pow(k, m + 1) * A[2 * i + j], f, k * A[2 * i + j]]),
        'A² = ' + n(k) + 'I，所以 A^' + e + ' = (A²)^' + m + '·A = ' + n(f) + 'A，所求 = ' + n(f) + ' × ' + pr(A[2 * i + j]) + ' = ' + n(ans) + '。'];
    } }
  ]);

  // ---------- 12 條件機率與貝氏定理 ----------
  addHard('math', 12, [
    { t: '條件機率與至少兩個', g: function (R) {
      var pool = [[3, 4], [2, 3], [1, 2], [1, 3], [1, 4], [3, 5]], A = R.pick(pool), B = R.pick(pool), Cc = R.pick(pool), ask = R.pick(['p', 'q', 'pq']);
      var a = fr(A[0], A[1]), b = fr(B[0], B[1]), c = fr(Cc[0], Cc[1]), one = [1, 1];
      var nb = fs(one, b), nc = fs(one, c), na = fs(one, a);
      var pB_or_C = fs(one, fm(nb, nc)); // A 中獎條件下至少兩個 = B 或 C 至少一個
      var atl2 = fa(fa(fa(fm(fm(a, b), nc), fm(fm(a, nb), c)), fm(fm(na, b), c)), fm(fm(a, b), c));
      var p = pB_or_C, q = fd(fm(a, pB_or_C), atl2), pq = fd(p, q), ans = ask === 'p' ? p : ask === 'q' ? q : pq;
      return ['甲、乙、丙三個福袋中獎機率分別為 ' + ft(a) + '、' + ft(b) + '、' + ft(c) + '，彼此獨立。設 p 為「甲中獎的條件下，至少兩個福袋中獎」的機率，q 為「至少兩個中獎的條件下，甲中獎」的機率。則 ' + (ask === 'pq' ? 'p ÷ q' : ask) + ' = ?',
        O(ft(ans), [ft(ask === 'p' ? q : p), ft(atl2), ft(fd(q, p)), ft(fm(a, p))]),
        'P(至少兩個) = ' + ft(atl2) + '。p = P(乙或丙中獎) = 1 − (1 − ' + ft(b) + ')(1 − ' + ft(c) + ') = ' + ft(p) + '。q = P(甲且至少兩個) ÷ P(至少兩個) = ' + ft(fm(a, p)) + ' ÷ ' + ft(atl2) + ' = ' + ft(q) + '。p ÷ q = P(至少兩個) ÷ P(甲) = ' + ft(pq) + '。'];
    } },
    { t: '列聯表比例範圍', g: function (R) {
      var P = R.pick([[[1, 2], [1, 3]], [[3, 5], [2, 5]], [[2, 3], [2, 5]], [[1, 2], [2, 5]], [[3, 5], [1, 3]]]), m = P[0], c = P[1], one = [1, 1];
      var lo = fs(fs(one, m), fm(c, [1, 2])), hi = fs(fs(one, c), fm(m, [1, 2]));
      return ['某校健檢：有近視的學生占 ' + ft(m) + '、有蛀牙的占 ' + ft(c) + '。已知「有近視的學生中，有蛀牙的占少數」且「有蛀牙的學生中，有近視的占多數」。設 p 為無近視且無蛀牙的學生比例，則 p 的範圍為何？',
        O(ft(lo) + ' < p < ' + ft(hi), [ft(fs(one, fa(m, c))) + ' < p < ' + ft(hi), ft(lo) + ' < p < ' + ft(fs(one, c)), ft(fm(c, [1, 2])) + ' < p < ' + ft(fm(m, [1, 2])), ft(lo) + ' ≤ p ≤ ' + ft(hi)]),
        '設兩者都有的比例為 x。近視中蛀牙占少數：x < ' + ft(fm(m, [1, 2])) + '；蛀牙中近視占多數：x > ' + ft(fm(c, [1, 2])) + '。p = 1 − ' + ft(m) + ' − ' + ft(c) + ' + x，代入範圍得 ' + ft(lo) + ' < p < ' + ft(hi) + '。',
        QF.table(['', '有近視', '無近視', '總和'], [['有蛀牙', 'x', '', ft(c)], ['無蛀牙', '', 'p', ft(fs(one, c))], ['總和', ft(m), ft(fs(one, m)), '1']])];
    } },
    { t: '貝氏定理樹狀圖', g: function (R) {
      var a = R.pick([20, 30, 40, 60]), f1 = R.pick([80, 90, 95]), f2 = R.pick([30, 40, 50, 60]), ask = Math.random() < 0.5;
      var num = ask ? a * f1 : a * (100 - f1), den = ask ? a * f1 + (100 - a) * f2 : a * (100 - f1) + (100 - a) * (100 - f2);
      return ['某山區登山客有 ' + a + '% 攜帶定位器。遇到迷途時，有定位器者被找到的機率為 ' + f1 + '%，沒有定位器者為 ' + f2 + '%。已知某位迷途登山客' + (ask ? '被找到' : '沒有被找到') + '，他有攜帶定位器的機率為何？',
        FO(num, den, [F(a, 100), F(ask ? f1 : 100 - f1, 100), F(num, 10000), F(den - num, den)]),
        '樹狀圖：先分有無定位器，再分是否被找到。P(有定位器且' + (ask ? '被找到' : '沒找到') + ') = ' + a + '% × ' + (ask ? f1 : 100 - f1) + '%；P(' + (ask ? '被找到' : '沒找到') + ') = 該值 + ' + (100 - a) + '% × ' + (ask ? f2 : 100 - f2) + '%。所求 = ' + num + ' ÷ ' + den + ' = ' + F(num, den) + '。',
        QF.tree(['有定位器', '無定位器', '找到', '沒找到'], a + '%', '找到 ' + f1 + '%', '找到 ' + f2 + '%')];
    } }
  ]);

  // ---------- 13 空間概念 ----------
  addHard('math', 13, [
    { t: '緯線與赤道航行', g: function (R) {
      var dl = 20 * R.int(1, 4), startW = R.int(100, 179), endPos = startW + dl; // 甲往西：西經 startW → 西經 endPos（超過 180 變東經）
      var endTxt = endPos > 180 ? '東經 ' + (360 - endPos) + ' 度' : '西經 ' + endPos + ' 度';
      var bStart = R.int(100, 170), bEnd = bStart + dl / 2, bTxt = function (x) { return x > 180 ? '西經 ' + (360 - x) + ' 度' : x === 180 ? '經度 180 度' : '東經 ' + x + ' 度'; };
      return ['兩艘船以相同速率等速航行：甲船沿北緯 60° 向西、乙船沿赤道向東。某時刻甲船在西經 ' + startW + ' 度、乙船在東經 ' + bStart + ' 度。當甲船到達' + endTxt + '時，乙船在哪裡？',
        O(bTxt(bEnd), [bTxt(bStart + dl), bTxt(bStart + dl / 4), bTxt(bStart + dl * 2), bTxt(bStart + dl / 2 + 10)]),
        '甲沿北緯 60° 走了經度差 ' + dl + '°，緯線圈半徑 = R·cos60° = R/2，路程 = ' + dl + '° 所對弧長的一半。乙在赤道走相同路程，經度差只要 ' + dl / 2 + '°，所以乙到 ' + bTxt(bEnd) + '。',
        QF.globe(60, '北緯 60°')];
    } },
    { t: '單點透視比高度', g: function (R) {
      var g1 = R.int(2, 6), h1 = g1 * R.int(2, 4), g2 = R.int(3, 9), h2 = R.int(3, 12), H1 = R.int(3, 8) * 2;
      var ans = H1 * (h2 / g2) / (h1 / g1);
      return ['單點透視畫中，地面上兩根鉛直柱子：甲柱在畫面上高 ' + h1 + ' 公分、柱底在地平線下方 ' + g1 + ' 公分；乙柱在畫面上高 ' + h2 + ' 公分、柱底在地平線下方 ' + g2 + ' 公分。若甲柱實際高 ' + H1 + ' 公尺，乙柱實際約多高？（四捨五入到小數第二位）',
        O(H.dec(ans, 2), [H.dec(H1 * h2 / h1, 2), H.dec(H1 * g2 / g1, 2), H.dec(H1 * (h2 / g1) / (h1 / g2), 2), H.dec(ans + 1, 2)]),
        '畫面上「柱高 ÷ 柱底到地平線的距離」與實際高度成正比（觀察者眼高固定）。甲：' + h1 + '/' + g1 + ' = ' + H.dec(h1 / g1, 3) + '，乙：' + h2 + '/' + g2 + ' = ' + H.dec(h2 / g2, 3) + '。乙 = ' + H1 + ' × ' + H.dec(h2 / g2, 3) + ' ÷ ' + H.dec(h1 / g1, 3) + ' ≈ ' + H.dec(ans, 2) + ' 公尺。'];
    } },
    { t: '直角四面體', g: function (R) {
      var a = R.int(1, 6), b = R.int(1, 6), c = R.int(1, 6), S2 = a * a * b * b + b * b * c * c + c * c * a * a, area = S2 % 4 === 0 ? H.sqrtS(S2 / 4) : H.sqrtS(S2) + '/2';
      var hasSq = /√/.test(H.sqrtS(S2)); if (!hasSq) area = S2 % 4 === 0 ? H.sqrtS(S2 / 4) : F(Math.round(Math.sqrt(S2)), 2);
      return ['空間中 OA、OB、OC 兩兩垂直，OA = ' + a + '、OB = ' + b + '、OC = ' + c + '。△ABC 的面積為何？',
        O(area, [F(a * b + b * c + c * a, 2), F(a * b * c, 2), H.sqrtS(a * a + b * b + c * c), H.sqrtS(S2)]),
        '先用畢氏定理：AB = √' + (a * a + b * b) + '、BC = √' + (b * b + c * c) + '、CA = √' + (c * c + a * a) + '。直角四面體有公式 (△ABC)² = (△OAB)² + (△OBC)² + (△OCA)² = (' + a * b + '² + ' + b * c + '² + ' + c * a + '²) ÷ 4 = ' + S2 + '/4，面積 = ' + area + '。'];
    } }
  ]);

  // ---------- 14 圓錐曲線 ----------
  addHard('math', 14, [
    { t: '大小燈罩的截痕', g: function (R) {
      return judge(R, [
        ['若 Γ1 是拋物線，則 Γ2 是橢圓', 'β = α大 > α小 → 小燈罩 β > α 為橢圓'],
        ['若 Γ2 是拋物線，則 Γ1 是雙曲線', 'β = α小 < α大 → 大燈罩為雙曲線'],
        ['若 Γ2 是雙曲線，則 Γ1 是雙曲線', 'β < α小 < α大'],
        ['若 Γ1 是橢圓，則 Γ2 是橢圓', 'β > α大 > α小']
      ], [
        ['若 Γ1 是橢圓，則 Γ2 是拋物線', 'β > α大 > α小，Γ2 也是橢圓'],
        ['若 Γ1 是雙曲線，則 Γ2 是拋物線', 'Γ2 三種都有可能，不一定'],
        ['若 Γ1 是拋物線，則 Γ2 是拋物線', 'α大 ≠ α小，不可能同時等於 β'],
        ['若 Γ2 是橢圓，則 Γ1 是橢圓', 'Γ1 可能是橢圓、拋物線或雙曲線'],
        ['若 Γ1 是雙曲線，則 Γ2 是雙曲線', 'Γ2 不一定']
      ], '立燈有大、小兩個燈罩（直圓錐面的一部分，軸線相同、燈源都在頂點），大燈罩照到地面的範圍較大。令大、小燈罩在地面上的光線邊緣分別為圓錐曲線 Γ1、Γ2 的一部分。下列敘述何者正確？',
        '地面與軸的夾角 β 相同；大燈罩半頂角 α大 > α小。β = 90° 圓、β > α 橢圓、β = α 拋物線、β < α 雙曲線。');
    } },
    { t: '橢圓的焦點性質', g: function (R) {
      var t = R.pick([[5, 4, 3], [5, 3, 4], [13, 12, 5], [10, 8, 6], [10, 6, 8], [17, 15, 8]]), a = t[0], b = t[1], c = t[2], ask = Math.random() < 0.5;
      return ['橢圓形回音廳的地板輪廓為 x²/' + a * a + ' + y²/' + b * b + ' = 1（單位：公尺）。站在一個焦點說悄悄話，在另一個焦點最容易聽到。' + (ask ? '兩焦點相距幾公尺？' : '聲音由一個焦點出發、碰到牆面反射後到達另一個焦點，所走的路程為幾公尺？'),
        ask ? NO(2 * c, [c, 2 * a, 2 * b]) : NO(2 * a, [2 * c, a + c, 2 * b]),
        'a = ' + a + '、b = ' + b + '，c = √(a² − b²) = ' + c + '。兩焦點距離 2c = ' + 2 * c + '；橢圓上任一點到兩焦點距離和 = 2a = ' + 2 * a + '。'];
    } },
    { t: '拋物面天線焦點', g: function (R) {
      var c = R.pick([1, 2, 3, 4, 5, 6]) * 10, d = R.pick([5, 10, 15, 20, 40]), half = Math.sqrt(4 * c * d);
      if (half !== Math.round(half)) { d = c; half = 2 * c; }
      var D = 2 * half;
      return ['拋物面天線的剖面是拋物線，開口直徑 ' + D + ' 公分、深度 ' + d + ' 公分。接收器要裝在焦點，焦點距離天線底部（頂點）多少公分？',
        NO(c, [D * D / (4 * d), D / 4, c * 2]),
        '以頂點為原點，拋物線 x² = 4cy 過 (' + half + ', ' + d + ')：' + half + '² = 4c × ' + d + ' → c = ' + c + '。焦點 (0, c)，距頂點 ' + c + ' 公分。'];
    } }
  ]);
})();
