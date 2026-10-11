/* 數B：依《數B 學測考古題重點》《數B 常考單元與題型整理》出題（計算題多為產生器，每次換新數字） */
(function () {
  var H = QH, n = H.n, F = H.frac, O = H.opts;

  function gcd(a, b) { return H.gcd(a, b); }
  function lcm(a, b) { return a / gcd(a, b) * b; }
  function fact(k) { var r = 1; for (var i = 2; i <= k; i++) r *= i; return r; }
  function C(a, b) { if (b < 0 || b > a) return 0; var r = 1; for (var i = 1; i <= b; i++) r = r * (a - b + i) / i; return Math.round(r); }
  // 數字選項：不夠時往正解兩側補
  function NO(ans, cands) { return O(ans, cands, function (k) { return ans + (k % 2 ? (k + 1) / 2 : -k / 2); }); }
  // 分數選項：不夠時改分子
  function FO(p, q, cands) { return O(F(p, q), cands, function (k) { return F(p + (k % 2 ? (k + 1) / 2 : -k / 2), q); }); }
  var SUP = { 2: '²', 3: '³', 4: '⁴' };
  // 多項式：係數由高次到低次
  function poly(cs, v) {
    v = v || 'x'; var s = '', deg = cs.length - 1;
    cs.forEach(function (c, i) {
      var d = deg - i; if (c === 0) return;
      var a = Math.abs(c), body = (a === 1 && d > 0 ? '' : String(a)) + (d > 0 ? v + (d > 1 ? SUP[d] : '') : '');
      s += s === '' ? (c < 0 ? '−' : '') + body : (c < 0 ? ' − ' : ' + ') + body;
    });
    return s || '0';
  }
  // 直線 ax + by + c
  function line(a, b, c) { return poly([a, 0], 'x').replace(/^0$/, '') + (b ? (a ? (b < 0 ? ' − ' : ' + ') + (Math.abs(b) === 1 ? '' : Math.abs(b)) + 'y' : poly([b, 0], 'y')) : '') + (c ? (c < 0 ? ' − ' : ' + ') + Math.abs(c) : '') + ' = 0'; }
  // k√3 / m 之類
  function rad(k, r, m) { // k√r / m
    m = m || 1; var g = gcd(k, m); k /= g; m /= g;
    var s = (k === 1 ? '' : k) + '√' + r; return m === 1 ? s : s + '/' + m;
  }
  var NORM = [[3, 4, 5], [4, 3, 5], [5, 12, 13], [12, 5, 13], [6, 8, 10], [8, 6, 10]];
  var TRI = [[3, 4, 5], [6, 8, 10], [5, 12, 13], [8, 15, 17], [9, 12, 15], [7, 24, 25], [12, 16, 20]];
  var T60 = [[3, 8, 7], [5, 8, 7], [8, 15, 13], [7, 15, 13], [5, 21, 19]];
  var T120 = [[3, 5, 7], [7, 8, 13], [5, 16, 19], [6, 10, 14]];
  function mat(m) { return '[[' + n(m[0]) + ', ' + n(m[1]) + '], [' + n(m[2]) + ', ' + n(m[3]) + ']]'; }
  function vec(a, b) { return '(' + n(a) + ', ' + n(b) + ')'; }
  // 加號後面的數：+ 3 / − 3；括號包負數：(−3)
  function sg(x) { return x < 0 ? ' − ' + (-x) : ' + ' + x; }
  function pr(x) { return x < 0 ? '(' + n(x) + ')' : String(x); }
  function sq(h, v) { return h === 0 ? (v || 'x') + '²' : '(' + H.lin(h, v) + ')²'; }
  function co(a) { return a === 1 ? '' : a === -1 ? '−' : n(a); }
  function pw(b, e) { return e === 1 ? String(b) : b + (SUP[e] || '^' + e); }

  QUIZ_DATA.push({
    id: 'math', name: '數B', desc: '15 個常考單元',
    units: [
      {
        name: '數與式（實數、絕對值）',
        qs: [
          { t: '絕對值不等式', g: function (R) {
            var a = R.int(-6, 6), r = R.int(2, 9), st = Math.random() < 0.5, ans = st ? 2 * r - 1 : 2 * r + 1;
            return ['滿足 |' + H.lin(a) + '| ' + (st ? '<' : '≤') + ' ' + r + ' 的整數 x 共有幾個？', NO(ans, [2 * r, st ? 2 * r + 1 : 2 * r - 1, r, 2 * r + 2]),
              '|x − a| ' + (st ? '<' : '≤') + ' r ⇔ ' + n(a - r) + ' ' + (st ? '<' : '≤') + ' x ' + (st ? '<' : '≤') + ' ' + n(a + r) + '，整數共 ' + ans + ' 個。' + (st ? '端點不能取。' : '端點可以取。')];
          } },
          { t: '絕對值不等式', g: function (R) {
            var p = R.int(2, 4), k = R.int(8, 24), cnt = 0, lo = null, hi = null;
            for (var x = -40; x <= 40; x++) if (p * Math.abs(x) + x < k) { cnt++; if (lo === null) lo = x; hi = x; }
            return ['滿足 ' + p + '|x| + x < ' + k + ' 的整數 x 共有幾個？', NO(cnt, [cnt + 1, cnt - 1, hi + 1, hi - lo]),
              '分段：x ≥ 0 時 ' + (p + 1) + 'x < ' + k + '；x < 0 時 ' + (1 - p === -1 ? '−x' : n(1 - p) + 'x') + ' < ' + k + '。整數解從 ' + n(lo) + ' 到 ' + n(hi) + '，共 ' + cnt + ' 個。'];
          } },
          { t: '距離和', g: function (R) {
            var a = R.int(-6, 3), b = a + R.int(2, 8), d = b - a, c = R.pick([0, 1, 2]), k = c === 0 ? d + R.int(1, 5) : c === 1 ? d : R.int(1, d - 1);
            var ans = c === 0 ? '2 個' : c === 1 ? '無限多個' : '0 個';
            return ['方程式 |' + H.lin(a) + '| + |' + H.lin(b) + '| = ' + k + ' 的實數解有幾個？', O(ans, ['2 個', '無限多個', '0 個', '1 個']),
              '兩定點 ' + n(a) + '、' + n(b) + ' 距離 ' + d + '。k > ' + d + ' 兩解（在兩點外側）；k = ' + d + ' 整段線段（無限多）；k < ' + d + ' 無解。本題 k = ' + k + '。'];
          } },
          { t: '誤差百分比', g: function (R) {
            var s = R.pick([40, 50, 80, 200, 250, 400, 500]), dl = R.nz(-12, 12), m = s + dl, pct = Math.abs(dl) / s * 100;
            return ['某物標準值為 ' + s + '，測量值為 ' + m + '，誤差百分比為多少？', O(H.dec(pct, 2) + '%', [H.dec(Math.abs(dl) / m * 100, 2) + '%', H.dec(pct * 10, 2) + '%', H.dec(pct / 10, 3) + '%', H.dec(pct + 1, 2) + '%']),
              '誤差百分比 = |測值 − 標準值| ÷ 標準值 × 100% = ' + Math.abs(dl) + ' ÷ ' + s + ' × 100% = ' + H.dec(pct, 2) + '%（分母是標準值）。'];
          } },
          { t: '實數與根號', g: function (R) {
            var k = R.int(2, 5), m = R.pick([2, 3, 5, 6, 7, 10, 11]), v = k * k * m, f = Math.floor(Math.sqrt(v));
            return [k + '√' + m + ' 介於哪兩個連續整數之間？', O(f + ' 與 ' + (f + 1), [(f - 1) + ' 與 ' + f, (f + 1) + ' 與 ' + (f + 2), (k * m - 1) + ' 與 ' + (k * m)]),
              '平方後比較：' + k + '√' + m + ' = √' + v + '，' + f + '² = ' + f * f + ' < ' + v + ' < ' + (f + 1) * (f + 1) + ' = ' + (f + 1) + '²。'];
          } },
          ['實數與根號', '下列敘述何者「一定」正確？', ['有理數 + 無理數 = 無理數', '有理數 × 無理數 = 無理數', '無理數 + 無理數 = 無理數', '無理數 × 無理數 = 無理數'], '有理 + 無理一定是無理；乘法要小心 0（0 × √2 = 0）；√2 + (−√2) = 0、√2 × √2 = 2。'],
          ['實數與根號', '下列何者是無理數？', ['2√10', '√49', '0.333…（循環）', '22/7'], '√49 = 7；循環小數與分數都是有理數；2√10 = √40 是無限不循環小數。']
        ]
      },
      {
        name: '多項式函數',
        qs: [
          { t: '餘式定理', g: function (R) {
            var cs = [R.nz(-3, 3), R.int(-5, 5), R.int(-6, 6), R.int(-9, 9)], k = R.nz(-3, 3);
            function f(x) { return ((cs[0] * x + cs[1]) * x + cs[2]) * x + cs[3]; }
            return ['f(x) = ' + poly(cs) + ' 除以 (' + H.lin(k) + ') 的餘式為何？', NO(f(k), [f(-k), cs[3], f(k) + cs[0]]),
              '餘式定理：f(x) 除以 (x − a) 的餘式 = f(a)。f(' + n(k) + ') = ' + n(f(k)) + '。'];
          } },
          { t: '二次函數頂點', g: function (R) {
            var a = R.pick([1, -1, 2, -2, 3]), h = R.int(-5, 5), k = R.int(-8, 8);
            return ['y = ' + poly([a, -2 * a * h, a * h * h + k]) + ' 的頂點坐標為何？', O(H.pt(h, k), [H.pt(-h, k), H.pt(h, -k), H.pt(-h, -k), H.pt(k, h)]),
              '配方：y = ' + co(a) + sq(h) + (k ? sg(k) : '') + '，頂點 ' + H.pt(h, k) + '，對稱軸 x = ' + n(h) + '。'];
          } },
          { t: '區間最大最小', g: function (R) {
            var a = R.pick([1, 2]), h = R.int(-3, 3), k = R.int(-6, 6), p = h - R.int(1, 3), q = h + R.int(1, 4);
            function f(x) { return a * (x - h) * (x - h) + k; }
            var mx = Math.max(f(p), f(q)), askMax = Math.random() < 0.6, ans = askMax ? mx : k;
            return ['f(x) = ' + poly([a, -2 * a * h, a * h * h + k]) + '，在 ' + n(p) + ' ≤ x ≤ ' + n(q) + ' 的' + (askMax ? '最大值' : '最小值') + '為何？',
              NO(ans, askMax ? [Math.min(f(p), f(q)), k, f(p) === mx ? f(q) + 1 : f(p)] : [Math.min(f(p), f(q)), mx, k - 1]),
              '頂點式 f(x) = ' + co(a) + sq(h) + (k ? sg(k) : '') + '，開口向上。閉區間比較頂點與兩端點：f(' + n(p) + ') = ' + n(f(p)) + '、f(' + n(q) + ') = ' + n(f(q)) + '、頂點值 ' + n(k) + '。'];
          } },
          { t: '三次函數圖形', g: function (R) {
            var a = R.pick([1, -1, 2]), h = R.int(-3, 3), p = R.int(-5, 5), k = R.int(-6, 6);
            var cs = [a, -3 * a * h, 3 * a * h * h + p, -a * h * h * h - p * h + k];
            return ['y = ' + poly(cs) + ' 的圖形對稱中心為何？', O(H.pt(h, k), [H.pt(-h, k), H.pt(h, -k), H.pt(h, cs[3]), H.pt(-h, -k)]),
              '對稱中心 x = −b ÷ 3a = ' + n(h) + '，代回得 y = ' + n(k) + '。也可改寫成 y = a(x − h)³ + p(x − h) + k，(h, k) 為中心，中心附近近似直線斜率 p = ' + n(p) + '。'];
          } },
          { t: '高次不等式', g: function (R) {
            var p = R.int(-5, 3), q = p + R.int(2, 8), st = Math.random() < 0.5, ans = st ? q - p - 1 : q - p + 1;
            return [poly([1, -(p + q), p * q]) + (st ? ' < 0' : ' ≤ 0') + ' 的整數解有幾個？', NO(ans, [st ? q - p + 1 : q - p - 1, q - p, ans + 2]),
              '因式分解 (' + H.lin(p) + ')(' + H.lin(q) + ')' + (st ? ' < 0' : ' ≤ 0') + ' ⇔ ' + n(p) + (st ? ' < x < ' : ' ≤ x ≤ ') + n(q) + '，整數 ' + ans + ' 個。'];
          } },
          { t: '函數對稱', g: function (R) {
            var m = R.nz(-5, 5);
            var lhs = 'f(' + H.lin(-m) + ')', rhs = 'f(−x ' + (m > 0 ? '+ ' + m : '− ' + (-m)) + ')';
            return ['二次函數 f(x) 對所有實數 x 都滿足 ' + lhs + ' = ' + rhs + '，則 y = f(x) 圖形的對稱軸為何？', O('x = ' + n(m), ['x = ' + n(-m), 'x = ' + n(2 * m), 'x = 0', 'x = ' + n(m + 1)]),
              '把 x 換成 −x 後值不變，代表 ' + n(m) + ' 左右等距的點函數值相同 → 對稱軸 x = ' + n(m) + '。'];
          } },
          ['多項式除法', '多項式 f(x) 除以 g(x) 的商式 q(x)、餘式 r(x)，下列何者一定成立？', ['r(x) 的次數 < g(x) 的次數', 'r(x) 的次數 < q(x) 的次數', 'q(x) 的次數 = g(x) 的次數', 'r(x) 一定是常數'], 'f(x) = g(x)q(x) + r(x)，deg r < deg g。判斷選項「可能為 f(x)」時就看餘式次數。'],
          ['多項式除法', 'f(x) 除以 (x − 1)(x − 2) 的餘式「不可能」是下列何者？', ['x² − 1', '3x + 2', '5', '−x'], '除式是二次，餘式次數必須小於 2（一次式或常數），x² − 1 是二次，不可能。']
        ]
      },
      {
        name: '直線與圓',
        qs: [
          { t: '斜率', g: function (R) {
            var x1 = R.int(-6, 6), y1 = R.int(-6, 6), dx = R.nz(-6, 6), dy = R.nz(-6, 6), x2 = x1 + dx, y2 = y1 + dy;
            return ['通過 A' + H.pt(x1, y1) + '、B' + H.pt(x2, y2) + ' 的直線斜率為何？', FO(dy, dx, [F(dx, dy), F(-dy, dx), F(y1 + y2, x1 + x2 || 1)]),
              '斜率 = (y2 − y1) ÷ (x2 − x1) = ' + n(dy) + ' ÷ ' + n(dx) + ' = ' + F(dy, dx) + '。'];
          } },
          { t: '垂直與平行', g: function (R) {
            var a = R.nz(-6, 6), b = R.nz(-6, 6), c = R.int(-9, 9);
            return ['與直線 ' + line(a, b, c) + ' 垂直的直線，斜率為何？', FO(b, a, [F(-a, b), F(a, b), F(-b, a)]),
              '原直線斜率 = −a ÷ b = ' + F(-a, b) + '；垂直 ⇔ 斜率相乘 = −1，所以斜率 = ' + F(b, a) + '。'];
          } },
          { t: '點到直線距離', g: function (R) {
            var t = R.pick(NORM), A = t[0] * R.sign(), B = t[1] * R.sign(), N = t[2], x0 = R.int(-5, 5), y0 = R.int(-5, 5), d = R.int(1, 5);
            var Cc = R.sign() * d * N - A * x0 - B * y0;
            return ['點 P' + H.pt(x0, y0) + ' 到直線 ' + line(A, B, Cc) + ' 的距離為何？', NO(d, [d * N, d + 1, Math.abs(A * x0 + B * y0) || d + 2]),
              'd = |ax0 + by0 + c| ÷ √(a² + b²) = ' + d * N + ' ÷ ' + N + ' = ' + d + '。'];
          } },
          { t: '平行線距離', g: function (R) {
            var t = R.pick(NORM), A = t[0], B = t[1] * R.sign(), N = t[2], c1 = R.int(-12, 12), d = R.int(1, 4), c2 = c1 + R.sign() * d * N, dbl = Math.random() < 0.5;
            var L2 = dbl ? line(2 * A, 2 * B, 2 * c2) : line(A, B, c2);
            return ['兩平行線 ' + line(A, B, c1) + ' 與 ' + L2 + ' 的距離為何？', NO(d, [dbl ? Math.abs(2 * c2 - c1) / N : 2 * d, d * N, d + 1].map(function (x) { return Math.round(x * 100) / 100; })),
              (dbl ? '先把第二式除以 2，讓 x、y 係數相同：' + line(A, B, c2) + '。' : '') + 'd = |c1 − c2| ÷ √(a² + b²) = ' + Math.abs(c1 - c2) + ' ÷ ' + N + ' = ' + d + '。'];
          } },
          { t: '圓的方程式', g: function (R) {
            var h = R.int(-5, 5), k = R.int(-5, 5), r = R.int(1, 6), D = -2 * h, E = -2 * k, Fc = h * h + k * k - r * r;
            var eq = 'x² + y²' + (D ? (D < 0 ? ' − ' : ' + ') + Math.abs(D) + 'x' : '') + (E ? (E < 0 ? ' − ' : ' + ') + Math.abs(E) + 'y' : '') + (Fc ? (Fc < 0 ? ' − ' : ' + ') + Math.abs(Fc) : '') + ' = 0';
            return ['圓 ' + eq + ' 的圓心與半徑為何？', O('圓心 ' + H.pt(h, k) + '，半徑 ' + r, ['圓心 ' + H.pt(-h, -k) + '，半徑 ' + r, '圓心 ' + H.pt(h, k) + '，半徑 ' + r * r, '圓心 ' + H.pt(-h, -k) + '，半徑 ' + r * r, '圓心 ' + H.pt(h, k) + '，半徑 ' + (r + 1), '圓心 ' + H.pt(-h, -k) + '，半徑 ' + (r + 1)]),
              '配方成 ' + sq(h) + ' + ' + sq(k, 'y') + ' = ' + r * r + '，圓心 ' + H.pt(h, k) + '，半徑 ' + r + '。'];
          } },
          { t: '直線與圓的關係', g: function (R) {
            var t = R.pick(NORM), A = t[0] * R.sign(), B = t[1] * R.sign(), N = t[2], h = R.int(-4, 4), k = R.int(-4, 4), r = R.int(2, 6), c = R.pick([0, 1, 2]);
            var d = c === 0 ? R.int(0, r - 1) : c === 1 ? r : r + R.int(1, 3), Cc = R.sign() * d * N - A * h - B * k;
            var ans = c === 0 ? '相交於兩點' : c === 1 ? '相切' : '不相交';
            return ['圓 ' + sq(h) + ' + ' + sq(k, 'y') + ' = ' + r * r + ' 與直線 ' + line(A, B, Cc) + ' 的關係為何？', O(ans, ['相交於兩點', '相切', '不相交', '直線通過圓心']),
              '圓心到直線距離 d = ' + d * N + ' ÷ ' + N + ' = ' + d + '，半徑 r = ' + r + '。d < r 交兩點、d = r 相切、d > r 不相交。'];
          } },
          { t: '圓與坐標軸相切', g: function (R) {
            var r = R.int(1, 7), sx = R.sign(), sy = R.sign(), q = sx > 0 ? (sy > 0 ? '一' : '四') : (sy > 0 ? '二' : '三');
            return ['圓心在第' + q + '象限、半徑 ' + r + '，且與兩坐標軸都相切的圓，圓心坐標為何？', O(H.pt(sx * r, sy * r), [H.pt(-sx * r, sy * r), H.pt(sx * r, -sy * r), H.pt(-sx * r, -sy * r)]),
              '與兩軸都相切 ⇔ |h| = |k| = r，再依象限決定正負號。'];
          } },
          { t: '中垂線與摺紙', g: function (R) {
            var x1 = R.int(-5, 5), y1 = R.int(-5, 5), dx = 2 * R.nz(-3, 3), dy = 2 * R.nz(-3, 3);
            return ['把坐標紙對摺，使 A' + H.pt(x1, y1) + ' 落在 B' + H.pt(x1 + dx, y1 + dy) + '，摺痕所在直線的斜率為何？', FO(-dx, dy, [F(dy, dx), F(dx, dy), F(-dy, dx)]),
              '摺痕是 AB 的中垂線：過中點 ' + H.pt(x1 + dx / 2, y1 + dy / 2) + '，斜率是 AB 斜率 ' + F(dy, dx) + ' 的負倒數 ' + F(-dx, dy) + '。'];
          } }
        ]
      },
      {
        name: '數列與級數',
        qs: [
          { t: '等差數列', g: function (R) {
            var a = R.int(-10, 20), d = R.nz(-5, 6), k = R.int(8, 30), an = a + (k - 1) * d;
            return ['等差數列首項 ' + n(a) + '、公差 ' + n(d) + '，第 ' + k + ' 項為何？', NO(an, [a + k * d, a + (k - 2) * d, k * d]),
              'an = a1 + (n − 1)d = ' + n(a) + ' + ' + (k - 1) + ' × ' + pr(d) + ' = ' + n(an) + '。'];
          } },
          { t: '等差數列', g: function (R) {
            var a = R.int(1, 15), d = R.int(2, 6), k = R.int(5, 20), last = a + (k - 1) * d, ask = Math.random() < 0.5;
            if (ask) return ['等差數列 ' + a + ', ' + (a + d) + ', ' + (a + 2 * d) + ', …, ' + last + ' 共有幾項？', NO(k, [k - 1, k + 1, Math.round(last / d)]),
              '項數 = (末項 − 首項) ÷ 公差 + 1 = (' + last + ' − ' + a + ') ÷ ' + d + ' + 1 = ' + k + '。不要漏掉 +1。'];
            var S = k * (a + last) / 2;
            return ['等差數列 ' + a + ', ' + (a + d) + ', ' + (a + 2 * d) + ', …, ' + last + ' 的總和為何？', NO(S, [(k - 1) * (a + last) / 2, k * (a + last), S + last]),
              '共 ' + k + ' 項，Sn = n(a1 + an) ÷ 2 = ' + k + ' × (' + a + ' + ' + last + ') ÷ 2 = ' + S + '。'];
          } },
          { t: '等比數列', g: function (R) {
            var r = R.pick([2, 3, -2]), a = R.pick([1, 2, 3, 5]), k = r === 3 ? R.int(3, 5) : R.int(4, 7), ak = a * Math.pow(r, k - 1);
            return ['等比數列首項 ' + a + '、公比 ' + n(r) + '，第 ' + k + ' 項為何？', NO(ak, [a * Math.pow(r, k), a * Math.pow(r, k - 2), a * r * (k - 1)]),
              'an = a1 × r^(n−1) = ' + a + ' × (' + n(r) + ')^' + (k - 1) + ' = ' + n(ak) + '。'];
          } },
          { t: '等比數列', g: function (R) {
            var r = R.pick([2, 3]), a = R.pick([1, 2, 3]), k = r === 3 ? R.int(3, 5) : R.int(4, 7), S = a * (Math.pow(r, k) - 1) / (r - 1);
            return ['等比數列首項 ' + a + '、公比 ' + r + '，前 ' + k + ' 項和為何？', NO(S, [a * Math.pow(r, k - 1), a * (Math.pow(r, k + 1) - 1) / (r - 1), S - a]),
              'Sn = a1(rⁿ − 1) ÷ (r − 1) = ' + a + '(' + r + '^' + k + ' − 1) ÷ ' + (r - 1) + ' = ' + S + '。'];
          } },
          { t: '遞迴與穩定值', g: function (R) {
            var p = R.pick([0.5, 0.6, 0.75, 0.8, 0.9]), c = R.pick([20, 40, 60, 80, 100, 200]), q = Math.round(c * (1 - p) * 100) / 100;
            return ['水槽每天流失前一天水量的 ' + Math.round((1 - p) * 100) + '%，接著再補入 ' + q + ' 公升。長期下來水量會趨近多少公升？', NO(c, [Math.round(q / p * 100) / 100, q, c * 2]),
              'a(n+1) = ' + p + '·an + ' + q + '；穩定值 c 滿足 c = ' + p + 'c + ' + q + ' → c = ' + q + ' ÷ ' + Math.round((1 - p) * 100) / 100 + ' = ' + c + '。'];
          } },
          ['等比數列', '已知 a1, a2, a3, … 是正項等比數列，下列何者「不一定」是等比數列？', ['a1 + 1, a2 + 1, a3 + 1, …', 'a1, −a2, a3, −a4, …（交錯變號）', '1/a1, 1/a2, 1/a3, …', 'a1a2a3, a2a3a4, a3a4a5, …'], '交錯變號、倒數、相鄰三項相乘都仍是等比；每項加 1 就不一定。取 log 會變成等差。']
        ]
      },
      {
        name: '排列組合',
        qs: [
          { t: '有相同物的排列', g: function (R) {
            var cnt = [R.int(1, 3), R.int(1, 3), R.int(1, 2)], L = ['A', 'B', 'C'], word = '', tot = 0, den = 1;
            cnt.forEach(function (c, i) { for (var j = 0; j < c; j++) word += L[i]; tot += c; den *= fact(c); });
            var ans = fact(tot) / den;
            return ['把 ' + word.split('').join('、') + ' 共 ' + tot + ' 個字母排成一列，有幾種排法？', NO(ans, [fact(tot), fact(tot) / Math.max(fact(cnt[0]), fact(cnt[1])), ans * 2]),
              '有相同物：' + tot + '! ÷ (' + cnt.map(function (c) { return c + '!'; }).join(' × ') + ') = ' + ans + '。'];
          } },
          { t: '相鄰與不相鄰', g: function (R) {
            var k = R.int(5, 7), adj = Math.random() < 0.5, ans = adj ? 2 * fact(k - 1) : fact(k) - 2 * fact(k - 1);
            return [k + ' 人排成一列，甲乙兩人' + (adj ? '必須相鄰' : '不可相鄰') + '，有幾種排法？', NO(ans, [adj ? fact(k - 1) : fact(k) - fact(k - 1), adj ? fact(k) - 2 * fact(k - 1) : 2 * fact(k - 1), fact(k)]),
              adj ? '甲乙綁成一塊：(' + (k - 1) + ')! × 2!（塊內可交換）= ' + ans + '。' : '全部 − 相鄰 = ' + k + '! − 2 × ' + (k - 1) + '! = ' + ans + '。（也可先排其他人再插空）'];
          } },
          { t: '相鄰與不相鄰', g: function (R) {
            var m = R.int(7, 12), k = R.int(2, 4), ans = C(m - k + 1, k);
            return ['一排 ' + m + ' 棟房子中選 ' + k + ' 棟漆成紅色，且紅色房子互不相鄰，有幾種選法？', NO(ans, [C(m, k), C(m - k, k), C(m - k + 1, k - 1)]),
              '在 n 個位置選 k 個互不相鄰：C(n − k + 1, k) = C(' + (m - k + 1) + ', ' + k + ') = ' + ans + '。'];
          } },
          { t: '組合與餘事件', g: function (R) {
            var b = R.int(4, 7), g = R.int(3, 6), k = R.int(3, 4), ans = C(b + g, k) - C(b, k);
            return ['從 ' + b + ' 位男生、' + g + ' 位女生中選 ' + k + ' 人，至少有 1 位女生的選法有幾種？', NO(ans, [C(b + g, k), C(g, 1) * C(b + g - 1, k - 1), ans - C(g, k)]),
              '餘事件：全部 − 全是男生 = C(' + (b + g) + ', ' + k + ') − C(' + b + ', ' + k + ') = ' + C(b + g, k) + ' − ' + C(b, k) + ' = ' + ans + '。'];
          } },
          { t: '分組分配', g: function (R) {
            var k = R.int(4, 7), ans = Math.pow(2, k) - 2;
            return [k + ' 位不同的人要分到 A、B 兩個部門，每個部門至少 1 人，有幾種分法？', NO(ans, [Math.pow(2, k), Math.pow(2, k - 1) - 1, Math.pow(2, k) - 1]),
              '每人 2 種選擇共 2^' + k + ' 種，扣掉全在 A 或全在 B：2^' + k + ' − 2 = ' + ans + '。部門不同，不用除以 2。'];
          } },
          { t: '特殊計數', g: function (R) {
            var m = R.int(8, 20), o = Math.ceil(m / 2), e = Math.floor(m / 2), ans = C(o, 2) + C(e, 2);
            return ['從 1, 2, …, ' + m + ' 中選出三個數 a < b < c 成等差數列，有幾組？', NO(ans, [C(m, 2), C(o, 2), C(m, 3) / 3 | 0]),
              'a、c 同奇偶時 b = (a + c) ÷ 2 唯一決定。奇數 ' + o + ' 個、偶數 ' + e + ' 個 → C(' + o + ', 2) + C(' + e + ', 2) = ' + ans + '。'];
          } },
          ['計數原理', '題目條件很多的計數問題，較好的策略是？', ['先處理最嚴格的條件，必要時用餘事件', '直接用 n! 計算', '先處理最寬鬆的條件', '把所有情況都列出來'], '先處理最嚴格的條件；「不全在同側」＝ 全部 − 全在同側。'],
          ['計數原理', '「從甲地到乙地有 3 條路、乙地到丙地有 4 條路，甲經乙到丙有幾種走法」應使用？', ['乘法原理，3 × 4 = 12 種', '加法原理，3 + 4 = 7 種', '排列 P(7, 2) = 42 種', '組合 C(7, 2) = 21 種'], '分步完成用乘法原理；分類（擇一）用加法原理。']
        ]
      },
      {
        name: '機率',
        qs: [
          { t: '古典機率', g: function (R) {
            var r = R.int(2, 6), b = R.int(2, 6), T = C(r + b, 2), s = C(r, 2) + C(b, 2);
            return ['袋中有紅球 ' + r + ' 顆、藍球 ' + b + ' 顆，任取 2 顆，兩顆同色的機率為何？', FO(s, T, [F(T - s, T), F(r, r + b), F(s, (r + b) * (r + b))]),
              'P = [C(' + r + ', 2) + C(' + b + ', 2)] ÷ C(' + (r + b) + ', 2) = ' + s + '/' + T + ' = ' + F(s, T) + '。異色機率 = 1 − 同色。'];
          } },
          { t: '餘事件', g: function (R) {
            var k = R.int(2, 6), t = R.int(2, 3), num = Math.pow(k, t) - Math.pow(k - 1, t), den = Math.pow(k, t);
            return ['某遊戲每次成功機率為 1/' + k + '，各次獨立。玩 ' + t + ' 次，至少成功一次的機率為何？', FO(num, den, [F(t, k), F(Math.pow(k - 1, t), den), F(den - 1, den)]),
              'P(至少一次) = 1 − P(都失敗) = 1 − (' + (k - 1) + '/' + k + ')^' + t + ' = ' + F(num, den) + '。'];
          } },
          { t: '古典機率', g: function (R) {
            var s = R.int(3, 11), c = 6 - Math.abs(s - 7);
            return ['同時擲兩顆公正骰子，點數和為 ' + s + ' 的機率為何？', FO(c, 36, [F(c, 6), F(c + 1, 36), F(1, 11)]),
              '共 36 種等可能結果，和為 ' + s + ' 的有 ' + c + ' 種 → ' + F(c, 36) + '。'];
          } },
          { t: '獨立事件', g: function (R) {
            var a = R.int(1, 8), b = R.int(1, 8), ans = a / 10 + b / 10 - a * b / 100;
            return ['A、B 為獨立事件，P(A) = ' + a / 10 + '、P(B) = ' + b / 10 + '，則 P(A ∪ B) 為何？', O(H.dec(ans, 2), [H.dec(a / 10 + b / 10, 2), H.dec(a * b / 100, 2), H.dec(1 - a * b / 100, 2)]),
              '獨立 ⇔ P(A ∩ B) = P(A)P(B) = ' + H.dec(a * b / 100, 2) + '；P(A ∪ B) = P(A) + P(B) − P(A ∩ B) = ' + H.dec(ans, 2) + '。'];
          } },
          { t: '由機率反推', g: function (R) {
            var m = R.int(6, 12), k = R.int(2, m - 2), p = C(k, 2), q = C(m, 2), g = gcd(p, q);
            return ['袋中共有 ' + m + ' 顆球，其中紅球若干顆。任取 2 顆都是紅球的機率為 ' + F(p, q) + '，紅球有幾顆？', NO(k, [k + 1, k - 1, m - k]),
              'C(k, 2) ÷ C(' + m + ', 2) = ' + F(p, q) + ' → C(k, 2) = ' + p + ' → k = ' + k + '。'];
          } },
          ['古典機率', '計算古典機率時，下列做法何者正確？', ['分子與分母要用同一種數法（都有序或都無序）', '分子用排列、分母用組合', '只要分子算對就好', '每個結果機率不相等也能直接相除'], '古典機率需每個結果機率相等，且分子分母同一種數法。']
        ]
      },
      {
        name: '數據分析',
        qs: [
          { t: '平均與標準差', g: function (R) {
            var P = R.pick([[[-1, 1], 1], [[-2, -2, 2, 2], 4], [[-3, -1, 1, 3], 5], [[-4, 0, 0, 4], 8], [[-2, -1, 0, 1, 2], 2], [[-4, -2, 0, 2, 4], 8], [[-3, -3, 3, 3], 9]]);
            var s = R.pick([1, 2]), mu = R.int(10, 80), data = P[0].map(function (o) { return mu + o * s; }), v = P[1] * s * s;
            return ['資料 ' + data.join('、') + ' 的標準差（母體，除以 n）為何？', O(H.sqrtS(v), [String(v), H.sqrtS(v * 2), H.sqrtS(v + 1), H.sqrtS(v * data.length)]),
              '平均 μ = ' + mu + '；變異數 = Σ(xi − μ)² ÷ n = ' + v + '；標準差 σ = √' + v + ' = ' + H.sqrtS(v) + '。'];
          } },
          { t: '資料線性變換', g: function (R) {
            var mu = R.int(40, 70), sg = R.int(4, 12), a = R.pick([2, 1.5, 0.5, -1, 3]), b = R.int(-10, 20), askS = Math.random() < 0.5;
            var my = a * mu + b, sy = Math.abs(a) * sg;
            return ['原始分數平均 ' + mu + '、標準差 ' + sg + '，調分 y = ' + poly([a, b]) + ' 後，新的' + (askS ? '標準差' : '平均') + '為何？',
              askS ? NO(sy, [a * sg + b, sg, a * a * sg]) : NO(my, [mu + b, a * mu, my + b]),
              'y = ax + b → μy = aμx + b = ' + H.dec(my, 2) + '；σy = |a|σx = ' + H.dec(sy, 2) + '（加減常數不影響標準差）。'];
          } },
          { t: '百分位數', g: function (R) {
            var m = R.pick([20, 25, 30, 40, 50]), k = R.pick([10, 20, 25, 30, 40, 60, 75, 80, 90]), v = m * k / 100, ans, wrong;
            if (v === Math.floor(v)) { ans = '第 ' + v + ' 名與第 ' + (v + 1) + ' 名的平均'; wrong = ['第 ' + v + ' 名', '第 ' + (v + 1) + ' 名', '第 ' + (v - 1) + ' 名與第 ' + v + ' 名的平均']; }
            else { var c = Math.ceil(v); ans = '第 ' + c + ' 名'; wrong = ['第 ' + Math.floor(v) + ' 名', '第 ' + Math.floor(v) + ' 名與第 ' + c + ' 名的平均', '第 ' + (c + 1) + ' 名']; }
            return ['全班 ' + m + ' 人成績由小到大排列，第 ' + k + ' 百分位數（P' + k + '）應如何取？', O(ans, wrong),
              '算 n × k% = ' + m + ' × ' + k + '% = ' + v + '。不是整數 → 取下一個整數名次；是整數 m → 第 m 與 m + 1 名的平均。'];
          } },
          { t: '相關與迴歸', g: function (R) {
            var r = R.pick([0.5, 0.6, 0.8, -0.5, -0.6]), sx = R.pick([2, 4, 5]), sy = R.pick([3, 6, 10]), mx = R.int(10, 30), my = R.int(40, 80), slope = r * sy / sx;
            if (Math.random() < 0.5) return ['x、y 相關係數 ' + n(r) + '，σx = ' + sx + '、σy = ' + sy + '，y 對 x 的迴歸直線斜率為何？', O(H.dec(slope, 3), [H.dec(r * sx / sy, 3), H.dec(r, 3), H.dec(sy / sx, 3)]),
              '迴歸直線斜率 = r × σy ÷ σx = ' + n(r) + ' × ' + sy + ' ÷ ' + sx + ' = ' + H.dec(slope, 3) + '。'];
            return ['x 的平均 ' + mx + '、y 的平均 ' + my + '，相關係數 ' + n(r) + '。用 y 對 x 的迴歸直線預測 x = ' + mx + ' 時的 y 值為何？', NO(my, [mx, Math.round(my * Math.abs(r)), my + mx]),
              '迴歸直線必通過 (μx, μy)，x 代平均值時預測值就是 y 的平均 ' + my + '。'];
          } },
          ['相關與迴歸', '把每位學生的身高 x（公分）換算成公尺 y = x ÷ 100，則 x 與「體重」的相關係數會？', ['不變', '變成原來的 1/100', '變成原來的 100 倍', '變號'], '兩變數各自乘正數倍，相關係數不變（乘負數才變號）；但迴歸斜率會變。'],
          ['平均與標準差', '若一組資料的每一筆都落在 μ ± 0.1 之內（μ 為平均），則標準差 σ 必定？', ['≤ 0.1', '= 0.1', '≥ 0.1', '無法判斷'], '每筆離平均都 ≤ 0.1，平方平均開根號也 ≤ 0.1。']
        ]
      },
      {
        name: '三角比',
        qs: [
          { t: '直角三角形', g: function (R) {
            var t = R.pick(TRI), a = t[0], b = t[1], c = t[2], which = R.pick(['sin', 'cos', 'tan']);
            var ans = which === 'sin' ? F(a, c) : which === 'cos' ? F(b, c) : F(a, b);
            return ['直角三角形 ABC 中 ∠C = 90°，BC = ' + a + '、AC = ' + b + '、AB = ' + c + '，' + which + 'A 為何？', O(ans, [F(a, c), F(b, c), F(a, b), F(b, a)]),
              'sinA = 對邊 ÷ 斜邊 = ' + F(a, c) + '；cosA = 鄰邊 ÷ 斜邊 = ' + F(b, c) + '；tanA = 對邊 ÷ 鄰邊 = ' + F(a, b) + '。'];
          } },
          { t: '仰角俯角', g: function (R) {
            var ang = R.pick([30, 45, 60]), d = ang === 30 ? 3 * R.int(2, 10) : R.int(5, 40), ans = ang === 45 ? String(d) : ang === 60 ? d + '√3' : (d / 3) + '√3';
            return ['在平地上距塔底 ' + d + ' 公尺處，測得塔頂仰角為 ' + ang + '°，塔高為多少公尺？', O(ans, [String(d), d + '√3', (d / 3 | 0 || 1) + '√3', d + '√2', String(2 * d)]),
              '塔高 = 距離 × tan' + ang + '° = ' + d + ' × ' + (ang === 45 ? '1' : ang === 60 ? '√3' : '√3/3') + ' = ' + ans + '。仰角是視線與「水平線」的夾角。'];
          } },
          { t: '餘弦定理', g: function (R) {
            var use60 = Math.random() < 0.5, t = R.pick(use60 ? T60 : T120), b = t[0], c = t[1], a = t[2];
            return ['△ABC 中，AB = ' + c + '、AC = ' + b + '、∠A = ' + (use60 ? 60 : 120) + '°，BC 長為何？', NO(a, [use60 ? Math.round(Math.sqrt(b * b + c * c + b * c)) : Math.round(Math.sqrt(b * b + c * c - b * c)), b + c - 1, a + 1]),
              'a² = b² + c² − 2bc·cosA = ' + b * b + ' + ' + c * c + (use60 ? ' − ' : ' + ') + b * c + ' = ' + a * a + '，a = ' + a + '。'];
          } },
          { t: '三角形面積', g: function (R) {
            var a = R.int(3, 12), b = R.int(3, 12), C = R.pick([30, 150, 90, 60, 120]), ab = a * b, ans;
            if (C === 30 || C === 150) ans = F(ab, 4); else if (C === 90) ans = F(ab, 2); else ans = rad(ab, 3, 4);
            return ['△ABC 中，a = ' + a + '、b = ' + b + '、∠C = ' + C + '°，面積為何？', O(ans, [F(ab, 2), F(ab, 4), rad(ab, 3, 4), rad(ab, 3, 2), String(ab)]),
              '面積 = ½ab·sinC，sin' + C + '° = ' + (C === 90 ? '1' : C === 30 || C === 150 ? '1/2' : '√3/2') + '，面積 = ' + ans + '。'];
          } },
          { t: '正弦定理', g: function (R) {
            var a = R.int(3, 15), A = R.pick([30, 90, 150, 45]), ans = A === 90 ? F(a, 2) : A === 45 ? rad(a, 2, 2) : String(a);
            return ['△ABC 中，BC = ' + a + '、∠A = ' + A + '°，外接圓半徑 R 為何？', O(ans, [String(2 * a), F(a, 2), String(a), rad(a, 2, 2), rad(a, 3, 3)]),
              '正弦定理 a ÷ sinA = 2R → R = ' + a + ' ÷ (2 × sin' + A + '°) = ' + ans + '。'];
          } },
          { t: '仰角俯角', g: function (R) {
            var t = R.pick([[3, 4, 5], [5, 12, 13], [8, 15, 17]]), L = t[2] * R.int(2, 6), off = L / t[2] * t[0], top = L / t[2] * t[1], ask = Math.random() < 0.5;
            return ['一座高 ' + L + ' 公尺的塔傾斜，塔身與鉛直線夾角 θ，sinθ = ' + t[0] + '/' + t[2] + '。塔頂' + (ask ? '偏離塔底正上方的水平距離' : '離地面的高度') + '為多少公尺？', NO(ask ? off : top, [ask ? top : off, L, Math.round(L * t[0] / t[1])]),
              '偏移距離 = 塔高 × sinθ = ' + off + '；塔頂高度 = 塔高 × cosθ = ' + L + ' × ' + t[1] + '/' + t[2] + ' = ' + top + '。'];
          } }
        ]
      },
      {
        name: '指數與對數',
        qs: [
          { t: '對數運算', g: function (R) {
            var a = R.int(0, 4), b = R.int(0, 3), c = R.int(-2, 2); if (!a && !b) a = 1;
            var v = a * 0.3010 + b * 0.4771 + c, txt = (a ? '2' + (a > 1 ? SUP[a] || '^' + a : '') : '') + (b ? (a ? '×' : '') + '3' + (b > 1 ? SUP[b] || '^' + b : '') : '') + (c ? '×10' + (c === 1 ? '' : c === -1 ? '⁻¹' : c === 2 ? '²' : '⁻²') : '');
            return ['已知 log 2 ≈ 0.3010、log 3 ≈ 0.4771，log(' + txt + ') ≈ ?', O(H.dec(v, 4), [H.dec(b * 0.3010 + a * 0.4771 + c, 4), H.dec(v + 1, 4), H.dec(a * 0.3010 * b * 0.4771 + c, 4), H.dec(v - 1, 4)]),
              'log(MN) = log M + log N、log Mᵖ = p·log M：' + a + ' × 0.3010 + ' + b + ' × 0.4771' + (c ? sg(c) : '') + ' = ' + H.dec(v, 4) + '。'];
          } },
          { t: '對數運算', g: function (R) {
            var base = R.pick([2, 3]), L = base === 2 ? 0.30103 : 0.47712, k, v;
            do { k = R.int(15, 80); v = k * L; } while (v - Math.floor(v) < 0.03 || v - Math.floor(v) > 0.97);
            var dg = Math.floor(v) + 1;
            return [base + '^' + k + ' 是幾位數？（log 2 ≈ 0.3010、log 3 ≈ 0.4771）', NO(dg, [dg - 1, dg + 1, Math.round(v)]),
              'log ' + base + '^' + k + ' = ' + k + ' × ' + (base === 2 ? '0.3010' : '0.4771') + ' ≈ ' + H.dec(v, 2) + '，首數 ' + Math.floor(v) + ' → ' + dg + ' 位數。'];
          } },
          { t: '指數成長', g: function (R) {
            var A = R.pick([100, 200, 500, 1000]), T = R.pick([2, 3, 4, 6]), k = R.int(2, 6), t = T * k;
            return ['某細菌每 ' + T + ' 小時數量加倍，初始 ' + A + ' 隻，' + t + ' 小時後有幾隻？', NO(A * Math.pow(2, k), [A * 2 * k, A * Math.pow(2, k - 1), A * Math.pow(2, k + 1)]),
              'A = A0 × 2^(t ÷ T) = ' + A + ' × 2^' + k + ' = ' + A * Math.pow(2, k) + '。先算「有幾段」當指數。'];
          } },
          { t: '指數成長', g: function (R) {
            var r = R.pick([10, 20, 30, 50]), tot = Math.round((Math.pow(1 + r / 100, 2) - 1) * 100);
            return ['某公司營收兩年內共成長了 ' + tot + '%，平均每年成長率為多少？', O(r + '%', [(tot / 2) + '%', (r + 1) + '%', (r - 5) + '%']),
              '(1 + r)² = ' + H.dec(1 + tot / 100, 2) + ' → 1 + r = ' + H.dec(1 + r / 100, 2) + '，r = ' + r + '%。平均成長率要用幾何平均，不能直接除以 2。'];
          } },
          { t: '指數方程式', g: function (R) {
            var a = R.int(1, 4), b = R.int(1, 4), x = 3 * a + 2 * b;
            return ['若 2ˣ = ' + pw(8, a) + ' × ' + pw(4, b) + '，則 x = ?', NO(x, [a + b, 3 * a * 2 * b, x + 1]),
              '化成同底：' + pw(8, a) + ' = ' + pw(2, 3 * a) + '、' + pw(4, b) + ' = ' + pw(2, 2 * b) + '，x = ' + 3 * a + ' + ' + 2 * b + ' = ' + x + '。'];
          } },
          { t: '連續複利', g: function (R) {
            var r = R.pick([2, 3, 5, 7, 10]), t = 0.693 / (r / 100);
            return ['連續複利 A = P·e^(rt)，年利率 ' + r + '%，本金變成 2 倍約需幾年？（ln 2 ≈ 0.693）', O(H.dec(t, 1), [H.dec(t * 2, 1), H.dec(100 / r, 1), H.dec(t / 2, 1)]),
              '2 = e^(' + r / 100 + 't) → t = ln 2 ÷ ' + r / 100 + ' = ' + H.dec(t, 1) + ' 年。'];
          } },
          ['對數比大小', '若 0 < a < 1，下列何者正確？', ['log a < 0，且 log a² < log a', 'log a > 0', 'log a² > log a', 'log a = 0'], '0 < a < 1 時 log a < 0；log a² = 2log a，負數乘 2 更小。'],
          ['對數比大小', '若 1 < a < 10，則 log a 的範圍為何？', ['0 < log a < 1', 'log a < 0', '1 < log a < 10', 'log a > 1'], 'log 1 = 0、log 10 = 1。']
        ]
      },
      {
        name: '三角函數與週期現象',
        qs: [
          { t: '弧度', g: function (R) {
            var d = 15 * R.int(1, 24), toRad = Math.random() < 0.6;
            if (toRad) return [d + '° 等於多少弳？', O(H.piFrac(d, 180), [H.piFrac(d, 360), H.piFrac(2 * d, 180), H.piFrac(d + 15, 180)]), '角度 × π/180 = ' + H.piFrac(d, 180) + '。'];
            return [H.piFrac(d, 180) + ' 弳等於幾度？', NO(d, [d * 2, d / 2, d + 30]), 'π 弳 = 180°，所以 ' + H.piFrac(d, 180) + ' = ' + d + '°。'];
          } },
          { t: '弧長', g: function (R) {
            var r = R.int(2, 12), p = R.pick([[1, 6], [1, 4], [1, 3], [1, 2], [2, 3], [3, 4], [5, 6]]);
            return ['半徑 ' + r + ' 的圓，圓心角 ' + H.piFrac(p[0], p[1]) + ' 所對的弧長為何？', O(H.piFrac(r * p[0], p[1]), [H.piFrac(r * r * p[0], p[1]), H.piFrac(r * p[0], 2 * p[1]), H.piFrac(2 * r * p[0], p[1])]),
              '弧長 s = rθ = ' + r + ' × ' + H.piFrac(p[0], p[1]) + ' = ' + H.piFrac(r * p[0], p[1]) + '（θ 一定用弳）。'];
          } },
          { t: '正弦函數圖形', g: function (R) {
            var a = R.nz(-5, 5), b = R.pick([1, 2, 3, 4, 6]), d = R.int(-4, 6), ask = R.pick(['T', 'max', 'min']);
            var f = 'y = ' + co(a) + 'sin(' + (b === 1 ? '' : b) + 'x)' + (d ? (d < 0 ? ' − ' + (-d) : ' + ' + d) : '');
            if (ask === 'T') return [f + ' 的週期為何？', O(H.piFrac(2, b), [H.piFrac(1, b), H.piFrac(2 * b, 1), H.piFrac(4, b)]), '週期 = 2π ÷ |b| = ' + H.piFrac(2, b) + '。'];
            var ans = ask === 'max' ? d + Math.abs(a) : d - Math.abs(a);
            return [f + ' 的' + (ask === 'max' ? '最大值' : '最小值') + '為何？', NO(ans, [ask === 'max' ? d - Math.abs(a) : d + Math.abs(a), Math.abs(a), d]),
              '振幅 |a| = ' + Math.abs(a) + '，中心線 y = ' + n(d) + '；最大 d + |a| = ' + n(d + Math.abs(a)) + '，最小 d − |a| = ' + n(d - Math.abs(a)) + '。'];
          } },
          { t: '週期現象', g: function (R) {
            var p1 = R.int(4, 12), p2 = R.int(4, 15); while (p2 === p1) p2 = R.int(4, 15);
            var L = lcm(p1, p2);
            return ['甲燈每 ' + p1+ ' 秒閃一次、乙燈每 ' + p2 + ' 秒閃一次，現在兩燈同時閃，下一次同時閃是幾秒後？', NO(L, [p1 * p2 === L ? L + p1 : p1 * p2, p1 + p2, Math.max(p1, p2) * 2]),
              '取最小公倍數 [' + p1 + ', ' + p2 + '] = ' + L + '。'];
          } },
          { t: '週期現象', g: function (R) {
            var g = R.int(20, 50), y = 3, r = R.int(20, 40), L = g + y + r, t = R.int(100, 900), m = t % L;
            var ans = m < g ? '綠燈' : m < g + y ? '黃燈' : '紅燈';
            return ['紅綠燈依序綠燈 ' + g + ' 秒、黃燈 3 秒、紅燈 ' + r + ' 秒循環。若第 0 秒剛轉綠燈，第 ' + t + ' 秒是什麼燈？', O(ans, ['綠燈', '黃燈', '紅燈', '無法判斷']),
              '一個週期 ' + L + ' 秒，' + t + ' ÷ ' + L + ' 餘 ' + m + '：0～' + (g - 1) + ' 綠、' + g + '～' + (g + 2) + ' 黃、其餘紅 → ' + ans + '。'];
          } },
          ['正弦函數圖形', '下列何者與 y = sin x 的圖形「相同」？', ['y = −sin(x + π)', 'y = sin(x + π)', 'y = sin(2x)', 'y = 2sin x'], 'sin(θ + π) = −sinθ，所以 −sin(x + π) = sin x。改 x 的係數會改週期。'],
          ['週期現象', '某函數在 t = 0 到 t = 12 之間為正、兩端為 0，且只有一個高峰，以正弦函數描述時，這一段是？', ['半個週期', '一個週期', '兩個週期', '四分之一週期'], '0 到 12 為正、兩端為 0 → 正好半個週期，週期 = 24。']
        ]
      },
      {
        name: '平面向量',
        qs: [
          { t: '向量長度', g: function (R) {
            var t = R.pick(TRI), ax = R.int(-5, 5), ay = R.int(-5, 5), sw = Math.random() < 0.5, dx = (sw ? t[1] : t[0]) * R.sign(), dy = (sw ? t[0] : t[1]) * R.sign();
            return ['A' + H.pt(ax, ay) + '、B' + H.pt(ax + dx, ay + dy) + '，向量 AB 的長度為何？', NO(t[2], [Math.abs(dx) + Math.abs(dy), t[2] + 1, t[2] * t[2]]),
              'AB = B − A = ' + vec(dx, dy) + '，|AB| = √(' + dx * dx + ' + ' + dy * dy + ') = ' + t[2] + '。'];
          } },
          { t: '內積', g: function (R) {
            var a = R.int(-5, 5), b = R.int(-5, 5), c = R.int(-5, 5), d = R.int(-5, 5), dot = a * c + b * d;
            if (Math.random() < 0.5) return ['u = ' + vec(a, b) + '、v = ' + vec(c, d) + '，u · v = ?', NO(dot, [a * d + b * c, a * c - b * d, (a + c) * (b + d)]), 'u · v = x1x2 + y1y2 = ' + n(a * c) + sg(b * d) + ' = ' + n(dot) + '。'];
            if (dot === 0) a += 1, dot = a * c + b * d;
            if ((a === 0 && b === 0) || (c === 0 && d === 0)) { a = 2; b = 1; c = 1; d = -3; dot = -1; }
            var ans = dot > 0 ? '銳角' : dot === 0 ? '直角' : '鈍角';
            return ['u = ' + vec(a, b) + '、v = ' + vec(c, d) + '，兩向量的夾角是？', O(ans, ['銳角', '直角', '鈍角', '平角']), 'u · v = ' + n(dot) + '。內積 > 0 銳角、= 0 垂直、< 0 鈍角。'];
          } },
          { t: '內積', g: function (R) {
            var p = 2 * R.int(1, 5), q = R.int(1, 8), th = R.pick([60, 90, 120]), dot = th === 60 ? p * q / 2 : th === 90 ? 0 : -p * q / 2;
            return ['|u| = ' + p + '、|v| = ' + q + '、u · v = ' + n(dot) + '，u 與 v 的夾角為何？', O(th + '°', ['60°', '90°', '120°', '30°', '150°']),
              'cosθ = u · v ÷ (|u||v|) = ' + n(dot) + ' ÷ ' + p * q + ' = ' + (th === 60 ? '1/2' : th === 90 ? '0' : '−1/2') + '，θ = ' + th + '°。'];
          } },
          { t: '內積', g: function (R) {
            var p = R.int(2, 8), q = R.int(2, 8), th = R.pick([60, 120]), dot = th === 60 ? p * q / 2 : -p * q / 2, v2 = p * p + q * q - 2 * dot;
            return ['|u| = ' + p + '、|v| = ' + q + '，夾角 ' + th + '°，|u − v| = ?', O(H.sqrtS(v2), [H.sqrtS(p * p + q * q + 2 * dot), H.sqrtS(p * p + q * q), String(Math.abs(p - q) || p + q)]),
              '|u − v|² = |u|² + |v|² − 2u·v = ' + p * p + ' + ' + q * q + ' − 2(' + n(dot) + ') = ' + v2 + '，|u − v| = ' + H.sqrtS(v2) + '。'];
          } },
          { t: '向量旋轉', g: function (R) {
            var a = R.nz(-6, 6), b = R.nz(-6, 6), ccw = Math.random() < 0.5;
            return ['向量 ' + vec(a, b) + ' 繞原點' + (ccw ? '逆' : '順') + '時針旋轉 90° 後為何？', O(ccw ? vec(-b, a) : vec(b, -a), [ccw ? vec(b, -a) : vec(-b, a), vec(-a, -b), vec(b, a)]),
              '(a, b) 逆時針轉 90° → (−b, a)；順時針轉 90° → (b, −a)。'];
          } },
          { t: '向量線性組合', g: function (R) {
            var A, B, det; do { A = [R.int(-3, 4), R.int(-3, 4)]; B = [R.int(-3, 4), R.int(-3, 4)]; det = A[0] * B[1] - A[1] * B[0]; } while (det === 0);
            var al = R.int(-3, 3), be = R.int(-3, 3), P = [al * A[0] + be * B[0], al * A[1] + be * B[1]];
            return ['OA = ' + vec(A[0], A[1]) + '、OB = ' + vec(B[0], B[1]) + '，若 OP = ' + vec(P[0], P[1]) + ' = α·OA + β·OB，則 (α, β) = ?', O(H.pt(al, be), [H.pt(be, al), H.pt(-al, be), H.pt(al, -be), H.pt(al + 1, be)]),
              '分量列聯立：' + pr(A[0]) + 'α + ' + pr(B[0]) + 'β = ' + n(P[0]) + '、' + pr(A[1]) + 'α + ' + pr(B[1]) + 'β = ' + n(P[1]) + '，解得 α = ' + n(al) + '、β = ' + n(be) + '。'];
          } }
        ]
      },
      {
        name: '矩陣',
        qs: [
          { t: '矩陣乘法', g: function (R) {
            var A = [R.int(-3, 4), R.int(-3, 4), R.int(-3, 4), R.int(-3, 4)], B = [R.int(-3, 4), R.int(-3, 4), R.int(-3, 4), R.int(-3, 4)], i = R.int(0, 1), j = R.int(0, 1);
            var v = A[2 * i] * B[j] + A[2 * i + 1] * B[2 + j], w = A[j] * B[2 * i] + A[2 + j] * B[2 * i + 1];
            return ['A = ' + mat(A) + '、B = ' + mat(B) + '，AB 的第 ' + (i + 1) + ' 列第 ' + (j + 1) + ' 行元素為何？', NO(v, [A[2 * i] * B[2 * i] + A[2 * i + 1] * B[2 * i + 1] === v ? v + 2 : A[2 * i] * B[2 * i] + A[2 * i + 1] * B[2 * i + 1], v === w ? v - 1 : w, A[2 * i + j] * B[2 * i + j]]),
              '(AB) 第 i 列第 j 行 = A 的第 ' + (i + 1) + ' 列 · B 的第 ' + (j + 1) + ' 行 = ' + pr(A[2 * i]) + '×' + pr(B[j]) + ' + ' + pr(A[2 * i + 1]) + '×' + pr(B[2 + j]) + ' = ' + n(v) + '。'];
          } },
          { t: '反方陣', g: function (R) {
            var a, b, c, d; do { a = R.pick([1, 2, 3, -1]); b = R.int(-3, 3); c = R.int(-3, 3); } while ((1 + b * c) % a !== 0 || Math.abs((1 + b * c) / a) > 9);
            d = (1 + b * c) / a;
            return ['A = ' + mat([a, b, c, d]) + '，A⁻¹ = ?', O(mat([d, -b, -c, a]), [mat([d, b, c, a]), mat([a, -b, -c, d]), mat([-d, b, c, -a]), mat([d, -b, -c, a + 1]), mat([d + 1, -b, -c, a])]),
              '行列式 ad − bc = ' + n(a * d) + ' − ' + pr(b * c) + ' = 1；A⁻¹ = 1/(ad − bc) × [[d, −b], [−c, a]] = ' + mat([d, -b, -c, a]) + '。'];
          } },
          { t: '矩陣與線性組合', g: function (R) {
            var p = [R.int(-4, 4), R.int(-4, 4)], q = [R.int(-4, 4), R.int(-4, 4)], m = R.nz(-3, 3), k = R.nz(-3, 3), ans = vec(m * p[0] + k * q[0], m * p[1] + k * q[1]);
            return ['已知矩陣 A 滿足 A' + vec(1, 0) + ' = ' + vec(p[0], p[1]) + '、A' + vec(0, 1) + ' = ' + vec(q[0], q[1]) + '（直行向量），則 A' + vec(m, k) + ' = ?', O(ans, [vec(m * p[0] + k * p[1], m * q[0] + k * q[1]), vec(p[0] + q[0], p[1] + q[1]), vec(m * p[0], k * q[1])]),
              vec(m, k) + ' = ' + pr(m) + '·' + vec(1, 0) + ' + ' + pr(k) + '·' + vec(0, 1) + '，所以 A' + vec(m, k) + ' = ' + pr(m) + '·' + vec(p[0], p[1]) + ' + ' + pr(k) + '·' + vec(q[0], q[1]) + ' = ' + ans + '。不必解出 A。'];
          } },
          { t: '方陣次方', g: function (R) {
            var a = R.int(-3, 3), b = R.nz(-3, 3), c = R.nz(-2, 2), k = a * a + b * c; if (k === 0) { b = 1; c = 1; k = a * a + 1; }
            return ['A = ' + mat([a, b, c, -a]) + '，A⁴ = kI（I 為單位方陣），k = ?', NO(k * k, [k, 4 * k, k * k * k]),
              '先算 A² = ' + mat([k, 0, 0, k]) + ' = ' + n(k) + 'I，所以 A⁴ = (A²)² = ' + n(k * k) + 'I。'];
          } },
          ['矩陣乘法', '用 [[0, 1], [1, 0]] 從「左邊」乘一個 2×2 矩陣 A，效果是？', ['交換 A 的上下兩列', '交換 A 的左右兩行', 'A 不變', 'A 的每個元素變號'], '左乘交換矩陣 → 換列；右乘 → 換行。矩陣乘法沒有交換律。']
        ]
      },
      {
        name: '條件機率與貝氏定理',
        qs: [
          { t: '貝氏定理', g: function (R) {
            var a = R.pick([10, 20, 25, 40]), b = R.pick([60, 70, 80, 90]), c = R.pick([10, 20, 30]);
            var num = a * b, den = a * b + (100 - a) * c;
            return ['某病盛行率 ' + a + '%。有病者檢驗陽性的機率 ' + b + '%，沒病者檢驗陽性的機率 ' + c + '%。某人檢驗陽性，他真的有病的機率為何？', FO(num, den, [F(b, 100), F(a * b, 10000), F(a, a + c), F(b, b + c), F((100 - a) * c, den)]),
              '樹狀圖：有病且陽性 = ' + a + '% × ' + b + '%；沒病且陽性 = ' + (100 - a) + '% × ' + c + '%。P(有病 | 陽性) = ' + num + ' ÷ (' + num + ' + ' + (100 - a) * c + ') = ' + F(num, den) + '。'];
          } },
          { t: '條件機率', g: function (R) {
            var s = R.pick([4, 6, 8, 10]), tot = 6 - Math.abs(s - 7), ev = R.pick(['dbl', 'gt']), cnt = 0;
            for (var i = 1; i <= 6; i++) for (var j = 1; j <= 6; j++) if (i + j === s) { if (ev === 'dbl' ? i === j : i > j) cnt++; }
            return ['擲兩顆公正骰子，已知點數和為 ' + s + '，' + (ev === 'dbl' ? '兩顆點數相同' : '第一顆點數大於第二顆') + '的機率為何？', FO(cnt, tot, [F(cnt, 36), F(tot, 36), F(cnt + 1, tot)]),
              '條件「和為 ' + s + '」共 ' + tot + ' 種（分母），其中符合的有 ' + cnt + ' 種 → ' + F(cnt, tot) + '。條件機率 = P(A ∩ B) ÷ P(B)。'];
          } },
          { t: '列聯表', g: function (R) {
            var a = R.int(5, 30), b = R.int(5, 30), c = R.int(5, 30), d = R.int(5, 30);
            return ['調查某校學生：近視且蛀牙 ' + a + ' 人、近視無蛀牙 ' + b + ' 人、無近視有蛀牙 ' + c + ' 人、無近視無蛀牙 ' + d + ' 人。已知某生近視，他有蛀牙的機率為何？', FO(a, a + b, [F(a, a + c), F(a, a + b + c + d), F(b, a + b)]),
              '條件是「近視」→ 分母是近視人數 ' + (a + b) + '；P = ' + a + ' ÷ ' + (a + b) + ' = ' + F(a, a + b) + '。'];
          } },
          ['貝氏定理', '「沒找到的人中，有 90% 未裝定位器」，則沒找到的人中有裝定位器的比例是？', ['10%', '90%', '無法判斷', '0%'], '易錯：沒找到且有裝的是 1 − 90% = 10%。'],
          ['條件機率', '等可能的情形下，條件機率的分母應是？', ['滿足「已知條件」的情況數', '全部樣本空間', '事件 A 的情況數', '事件 A 不發生的情況數'], '「在 B 的條件下」→ 分母是 B。條件越嚴，條件機率可能越大。']
        ]
      },
      {
        name: '空間概念（球面、經緯度、透視）',
        qs: [
          { t: '經緯度與球面', g: function (R) {
            var th = R.pick([30, 45, 60]), val = { 30: '√3/2', 45: '√2/2', 60: '1/2' }, sinv = { 30: '1/2', 45: '√2/2', 60: '√3/2' };
            return ['北緯 ' + th + '° 的緯線長是赤道長的幾倍？', O(val[th], [sinv[th] === val[th] ? '1' : sinv[th], '1/3', String(th / 90 === 0.5 ? '2/3' : F(th, 90))]),
              '緯線圈半徑 = R·cosθ，緯線長 = 2πR·cosθ，所以是赤道的 cos' + th + '° = ' + val[th] + ' 倍（是 cos 不是 sin）。'];
          } },
          { t: '經緯度與球面', g: function (R) {
            var p1 = 5 * R.int(0, 12), p2 = 5 * R.int(1, 12), south = Math.random() < 0.5, diff = south ? p1 + p2 : Math.abs(p1 - p2); if (!diff) diff = p2;
            if (!south && p1 === p2) p1 = 0;
            diff = south ? p1 + p2 : Math.abs(p1 - p2);
            return ['地球半徑 R，A 在北緯 ' + p1 + '°、B 在' + (south ? '南' : '北') + '緯 ' + p2 + '°，兩地在同一條經線上，沿經線的最短弧長為何？', O(H.piFrac(diff, 180) + '·R', [H.piFrac(south ? Math.abs(p1 - p2) || 5 : p1 + p2, 180) + '·R', H.piFrac(diff, 360) + '·R', diff + 'R']),
              '沿經線弧長 = R × 緯度差（弳）。緯度差 = ' + diff + '° = ' + H.piFrac(diff, 180) + '。' + (south ? '南北半球要相加。' : '同半球相減。')];
          } },
          { t: '立體圖形', g: function (R) {
            var a = R.int(2, 9), b = R.int(2, 9), c = R.int(2, 9);
            return ['四面體 OABC 中，OA、OB、OC 兩兩垂直，OA = ' + a + '、OB = ' + b + '、OC = ' + c + '，體積為何？', FO(a * b * c, 6, [String(a * b * c), F(a * b * c, 3), F(a * b * c, 2)]),
              '以 △OAB 為底（面積 ' + F(a * b, 2) + '）、OC 為高：V = ⅓ × ' + F(a * b, 2) + ' × ' + c + ' = abc ÷ 6 = ' + F(a * b * c, 6) + '。'];
          } },
          { t: '立體圖形', g: function (R) {
            var P = R.pick([['正立方體', 6, 8], ['正四面體', 4, 4], ['正八面體', 8, 6]]), k = R.int(1, P[2]);
            return ['把一個' + P[0] + '（' + P[1] + ' 個面、' + P[2] + ' 個頂點）截去 ' + k + ' 個角（每刀只切掉一個頂點附近），新立體有幾個面？', NO(P[1] + k, [P[1], P[1] + 2 * k, P[1] + k - 1]),
              '每截一個角多一個面：' + P[1] + ' + ' + k + ' = ' + (P[1] + k) + '。'];
          } },
          ['單點透視', '單點透視畫中，與畫面垂直的一組平行線，在畫面上會？', ['交於同一個消失點', '仍然互相平行', '變成鉛直線', '長度比例不變'], '與畫面垂直的平行線交於消失點；與畫面平行的線（如鉛直線）保持平行、比例不變。'],
          ['單點透視', '空間中等距排列的點（如電線桿）畫在透視圖上，下列何者「不變」？', ['交比', '相鄰兩點的距離', '相鄰距離的比', '點到消失點的距離'], '等距的空間點畫在紙上不等距，但交比 K = (P1P4 × P2P3) ÷ (P1P3 × P2P4) 不變。'],
          ['經緯度與球面', '經度 0° 與經度 180° 上、同為北緯 60° 的兩地，最短路徑會經過？', ['北極', '赤道', '北緯 60° 緯線', '南極'], '經度 0° 與 180° 合成同一個大圓（經過兩極），最短路徑走大圓 → 經過北極。']
        ]
      },
      {
        name: '圓錐曲線',
        qs: [
          { t: '圓錐截痕', g: function (R) {
            var al = R.pick([20, 30, 40, 45]), c = R.pick([0, 1, 2, 3]), be = c === 0 ? 90 : c === 1 ? al + 5 * R.int(1, Math.floor((85 - al) / 5)) : c === 2 ? al : 5 * R.int(0, al / 5 - 1);
            var ans = ['圓', '橢圓', '拋物線', '雙曲線'][c], full = Math.random() < 0.5;
            return ['手電筒光錐' + (full ? '的全角為 ' + 2 * al + '°' : '的半頂角為 ' + al + '°') + '，照在與光錐軸夾角 ' + be + '° 的平面上（平面不過頂點），光的邊界是什麼圖形？', O(ans, ['圓', '橢圓', '拋物線', '雙曲線']),
              '半頂角 α = ' + al + '°' + (full ? '（全角的一半）' : '') + '、平面與軸夾角 β = ' + be + '°。β = 90° 圓；β > α 橢圓；β = α 拋物線；β < α 雙曲線。'];
          } },
          { t: '標準式', g: function (R) {
            var a = R.int(3, 9), b = R.int(1, a - 1), el = Math.random() < 0.5;
            if (el) return ['橢圓 x²/' + a * a + ' + ' + (b === 1 ? 'y²' : 'y²/' + b * b) + ' = 1 的長軸長為何？', NO(2 * a, [a, 2 * b, a * a]), 'a² = ' + a * a + ' → a = ' + a + '，長軸長 2a = ' + 2 * a + '。'];
            return ['雙曲線 x²/' + a * a + ' − ' + (b === 1 ? 'y²' : 'y²/' + b * b) + ' = 1 的貫軸長為何？', NO(2 * a, [a, 2 * b, 2 * a * a]), 'a² = ' + a * a + ' → a = ' + a + '，貫軸長 2a = ' + 2 * a + '。'];
          } },
          { t: '標準式', g: function (R) {
            var c = R.nz(-5, 5);
            return ['拋物線 y² = ' + n(4 * c) + 'x 的焦點坐標為何？', O(H.pt(c, 0), [H.pt(4 * c, 0), H.pt(0, c), H.pt(-c, 0)]), 'y² = 4cx 的焦點 (c, 0)：4c = ' + n(4 * c) + ' → c = ' + n(c) + '。'];
          } },
          ['圓錐截痕', '截平面與圓錐的軸平行（且不過頂點），截痕是？', ['雙曲線', '拋物線', '橢圓', '圓'], '平面與軸平行 → β = 0° < α → 雙曲線。'],
          ['圓錐截痕', '截平面與圓錐的某一條母線平行，截痕是？', ['拋物線', '雙曲線', '橢圓', '圓'], '與母線平行 ⇔ β = α → 拋物線。']
        ]
      }
    ]
  });
})();
