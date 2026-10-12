/* v1.6：學測的「變化圖」題型——每次出題，圖的形狀、位置、方向、資料都換，問法也會換。
 * 數B：絕對值數線、三次函數圖形、圓、圖形數列、棋盤路徑、轉盤機率、次數分配長條圖、指數圖形、正弦圖形、機率樹狀圖、橢圓
 * 社會：地圖比例尺與方位、氣候圖判讀（含南半球）、人口金字塔、供需雙移動
 * 需要先載入 add_v16_base.js（GF 繪圖工具）。只用 addEasy／addHard 往後接，不插隊、不刪題。
 */
(function () {
  var G = GF, H = QH, D = H.dec, n = H.n, F = H.frac, rad = G.rad;
  function O(ans, c, mf) { var r = H.opts(ans, c, mf); return r.length < 4 ? H.fill(r) : r; }
  function pick(a) { return a[Math.floor(Math.random() * a.length)]; }
  function ri(a, b) { return a + Math.floor(Math.random() * (b - a + 1)); }
  function shuffle(a) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)), t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
  function comb(a, b) { var r = 1; for (var i = 1; i <= b; i++) r = r * (a - b + i) / i; return Math.round(r); }
  function lin(a, v) { return a === 0 ? v : (a > 0 ? v + ' − ' + a : v + ' + ' + (-a)); }
  function gridAxes(cs, o, lim, noY) {
    cs = cs || 22; o = o || 140; lim = lim || 5; var s = '';
    for (var i = -lim; i <= lim; i++) { s += G.L(o + i * cs, o - lim * cs, o + i * cs, o + lim * cs, 'thin') + G.L(o - lim * cs, o + i * cs, o + lim * cs, o + i * cs, 'thin'); if (i) s += G.T(o + i * cs, o + 13, n(i), 'middle', 'small') + (noY ? '' : G.T(o - 5, o - i * cs + 4, n(i), 'end', 'small')); }
    s += G.A(o - lim * cs - 6, o, o + lim * cs + 10, o, 'thick') + G.A(o, o + lim * cs + 6, o, o - lim * cs - 10, 'thick') + G.T(o + lim * cs + 12, o + 4, 'x', 'start') + G.T(o + 6, o - lim * cs - 8, 'y', 'start');
    return { s: s, P: function (x, y) { return [o + x * cs, o - y * cs]; } };
  }
  function fillPath(pts, style) { return '<path d="M' + pts.map(function (p) { return G.r1(p[0]) + ',' + G.r1(p[1]); }).join(' L') + ' Z" style="' + style + '"/>'; }

  /* ================= 數B ================= */

  // 絕對值不等式的數線圖
  function absIneq() {
    var a = ri(-4, 4), b = ri(1, 4), out = Math.random() < 0.4, strict = Math.random() < 0.4, lo = a - b, hi = a + b;
    var X = function (v) { return 20 + (v + 9) * 17.5; }, y = 50, s = G.L(10, y, 350, y, 'thin');
    for (var v = -9; v <= 9; v++) s += G.L(X(v), y - 4, X(v), y + 4, 'thin') + G.T(X(v), y + 18, n(v), 'middle', 'small');
    if (out) s += G.A(X(lo), y, 12, y, 'thick acc') + G.A(X(hi), y, 348, y, 'thick acc'); else s += G.L(X(lo), y, X(hi), y, 'thick2 acc');
    [lo, hi].forEach(function (p) { s += '<circle cx="' + G.r1(X(p)) + '" cy="' + y + '" r="5" style="fill:' + (strict ? 'var(--bg)' : 'currentColor') + '"/>'; });
    var sym = function (o, st) { return o ? (st ? '>' : '≥') : (st ? '<' : '≤'); }, ex = function (A2, o, st) { return '|' + lin(A2, 'x') + '| ' + sym(o, st) + ' ' + b; };
    return ['數線上的陰影（實心點表示包含該點、空心點表示不包含）是哪一個不等式的解？', O(ex(a, out, strict), [ex(-a, out, strict), ex(a, !out, strict), ex(a, out, !strict), ex(-a, !out, strict)]),
      '|x − a| 表示 x 到 a 的距離。陰影以 ' + a + ' 為中心、向兩邊各 ' + b + ' 單位（' + lo + ' 到 ' + hi + '），' + (out ? '取兩側（距離大於）' : '取中間（距離小於）') + '，端點' + (strict ? '不含' : '包含') + ' → ' + ex(a, out, strict) + '。', G.svg(360, 80, s)];
  }

  // 三次函數圖形：三個整數根，首項正負隨機
  function cubic() {
    var r = shuffle([-4, -3, -2, -1, 0, 1, 2, 3, 4]).slice(0, 3).sort(function (p, q) { return p - q; }), sg = pick([1, -1]);
    var f = function (x) { return sg * (x - r[0]) * (x - r[1]) * (x - r[2]); }, mx = 0;
    for (var x = r[0] - 0.8; x <= r[2] + 0.8; x += 0.05) mx = Math.max(mx, Math.abs(f(x)));
    var k = 4.2 / mx, g = gridAxes(22, 140, 5, true), pts = [];
    for (x = -5.6; x <= 5.6; x += 0.05) pts.push(g.P(x, f(x) * k));
    var s = g.s + G.clip(30, 30, 220, 220, G.poly(pts, 'thick acc'));
    r.forEach(function (v) { var p = g.P(v, 0); s += G.C(p[0], p[1], 3.5, 'dot'); });
    s += G.T(140, 284, '（y 方向未依比例）', 'middle', 'small');
    var reg = function (j, st) { var le = st ? '<' : '≤'; return j === 0 ? 'x ' + le + ' ' + n(r[0]) : j === 3 ? 'x ' + (st ? '>' : '≥') + ' ' + n(r[2]) : n(r[j - 1]) + ' ' + le + ' x ' + le + ' ' + n(r[j]); };
    var pos = [0, 1, 2, 3].filter(function (j) { return sg * ((3 - j) % 2 ? -1 : 1) > 0; }), neg = [0, 1, 2, 3].filter(function (j) { return pos.indexOf(j) < 0; });
    var set = function (js, st) { return js.map(function (j) { return reg(j, st); }).join(' 或 '); }, ask = pick(['>', '<', '≥']);
    var ans = ask === '>' ? set(pos, true) : ask === '<' ? set(neg, true) : set(pos, false);
    var c = [set(pos, true), set(neg, true), set(pos, false), set(neg, false), set([1, 2], true), set([0, 3], true)].filter(function (x) { return x !== ans; });
    return ['如圖為三次函數 y = f(x) 的圖形，與 x 軸交於圖上三點，不等式 f(x) ' + ask + ' 0 的解為何？', O(ans, c),
      '看圖：曲線在 x 軸上方的部分 f(x) > 0、下方的部分 f(x) < 0。三根為 ' + r.join('、') + '，首項係數為' + (sg > 0 ? '正（最右邊往上）' : '負（最右邊往下）') + '。\nf(x) > 0：' + set(pos, true) + '；f(x) < 0：' + set(neg, true) + '。' + (ask === '≥' ? '\n含等號時把三個根也算進去。' : ''), G.svg(290, 292, s)];
  }

  // 圓：圓心、半徑隨機
  function circleQ() {
    var r = ri(1, 4), h = ri(-(5 - r), 5 - r), k = ri(-(5 - r), 5 - r), g = gridAxes(), c = g.P(h, k);
    var s = g.s + G.C(c[0], c[1], r * 22, 'thick acc') + G.C(c[0], c[1], 3, 'dot');
    var term = function (v, x) { return v === 0 ? x + '²' : '(' + lin(v, x) + ')²'; }, eq = function (h2, k2, r2) { return term(h2, 'x') + ' + ' + term(k2, 'y') + ' = ' + r2; };
    var fig = G.svg(290, 290, s), ask = pick(['eq', 'eq', 'xcut']), cnt = Math.abs(k) < r ? 2 : Math.abs(k) === r ? 1 : 0;
    if (ask === 'eq') return ['如圖，圓心為圖中黑點、圓通過的格點可由方格讀出，此圓的方程式為何？', O(eq(h, k, r * r), [eq(-h, -k, r * r), eq(h, k, r), eq(k, h, r * r), eq(h, -k, r * r)]),
      '由圖讀出圓心 (' + n(h) + ', ' + n(k) + ')、半徑 ' + r + ' → (x − h)² + (y − k)² = r² → ' + eq(h, k, r * r) + '。', fig];
    return ['如圖之圓（圓心為黑點），它與 x 軸有幾個交點？', O(cnt + ' 個', [(cnt + 1) % 3 + ' 個', (cnt + 2) % 3 + ' 個', '無限多個']),
      '圓心到 x 軸的距離 = |' + n(k) + '| = ' + Math.abs(k) + '，半徑 ' + r + '。距離 ' + (cnt === 2 ? '< 半徑 → 2 個交點' : cnt === 1 ? '= 半徑 → 相切，1 個交點' : '> 半徑 → 不相交') + '。', fig];
  }

  // 圖形數列：火柴棒或點陣，畫前三（或四）個圖形
  function pattern() {
    var tp = pick(['sq', 'tri', 'house', 'dots']), s = '', u = 14;
    var f = { sq: function (m) { return 3 * m + 1; }, tri: function (m) { return 2 * m + 1; }, house: function (m) { return 5 * m + 1; }, dots: function (m) { return m * (m + 1) / 2; } }[tp];
    var nm = { sq: '火柴棒排成一列正方形', tri: '火柴棒排成一列三角形', house: '火柴棒排成一列「房子」（正方形加屋頂）', dots: '點排成三角形' }[tp];
    var x = 12, stages = tp === 'dots' ? 4 : 3;
    for (var m = 1; m <= stages; m++) {
      var y = 90, x0 = x;
      if (tp === 'sq') { for (var i = 0; i <= m; i++) s += G.L(x + i * u, y - u, x + i * u, y, 'thick acc'); s += G.L(x, y - u, x + m * u, y - u, 'thick acc') + G.L(x, y, x + m * u, y, 'thick acc'); x += m * u; }
      else if (tp === 'tri') { var pts = []; for (i = 0; i <= m; i++) pts.push([x + i * u * 0.6, i % 2 ? y - u : y]); s += G.poly(pts, 'thick acc'); var top = pts.filter(function (_, i) { return i % 2; }), bot = pts.filter(function (_, i) { return !(i % 2); }); if (top.length > 1) s += G.L(top[0][0], top[0][1], top[top.length - 1][0], top[0][1], 'thick acc'); if (bot.length > 1) s += G.L(bot[0][0], y, bot[bot.length - 1][0], y, 'thick acc'); x += m * u * 0.6; }
      else if (tp === 'house') { for (i = 0; i < m; i++) { var hx = x + i * u; s += G.L(hx, y - u, hx, y, 'thick acc') + G.L(hx, y, hx + u, y, 'thick acc') + G.L(hx, y - u, hx + u, y - u, 'thick acc') + G.L(hx, y - u, hx + u / 2, y - u - 9, 'thick acc') + G.L(hx + u / 2, y - u - 9, hx + u, y - u, 'thick acc'); } s += G.L(x + m * u, y - u, x + m * u, y, 'thick acc'); x += m * u; }
      else { for (i = 0; i < m; i++) for (var j = 0; j <= i; j++) s += G.C(x + (j - i / 2) * 10 + m * 5, y - (m - 1 - i) * 10 - 4, 3, 'dot'); x += m * 10 + 4; }
      s += G.T((x0 + x) / 2, 112, '第 ' + m + ' 個', 'middle', 'small'); x += 28;
    }
    var kk = ri(8, 30), ans = f(kk), unit = tp === 'dots' ? '個點' : '根';
    return ['如圖，' + nm + '，依此規律，第 ' + kk + ' 個圖形需要幾' + unit + '？', O(ans + ' ' + unit, [f(kk + 1) + ' ' + unit, f(kk - 1) + ' ' + unit, (tp === 'dots' ? kk * kk : (f(2) - f(1) + 1) * kk) + ' ' + unit, (ans + 2) + ' ' + unit]),
      '數前幾個：' + [1, 2, 3].map(f).join('、') + (tp === 'dots' ? '、' + f(4) + '（三角形數，第 n 個 = n(n+1)/2）' : '（每次多 ' + (f(2) - f(1)) + ' 根，等差數列：第 n 個 = ' + (f(2) - f(1)) + 'n + 1）') + '\n第 ' + kk + ' 個 = ' + ans + '。', G.svg(360, 120, s)];
  }

  // 棋盤路徑：一定要經過或不能經過某點
  function gridPath() {
    var m = ri(3, 6), k = ri(2, 4), mode = pick(['plain', 'pass', 'pass', 'avoid', 'avoid']), px = ri(1, m - 1), py = ri(1, k - 1);
    var tot = comb(m + k, k), thr = comb(px + py, py) * comb(m - px + k - py, k - py), ans = mode === 'plain' ? tot : mode === 'pass' ? thr : tot - thr;
    var cs = Math.min(48, 260 / m), ox = 40, oy = 30 + k * cs, s = '';
    for (var i = 0; i <= m; i++) s += G.L(ox + i * cs, oy, ox + i * cs, oy - k * cs, 'thick');
    for (var j = 0; j <= k; j++) s += G.L(ox, oy - j * cs, ox + m * cs, oy - j * cs, 'thick');
    s += G.C(ox, oy, 4, 'dot') + G.T(ox - 8, oy + 16, 'A', 'end') + G.C(ox + m * cs, oy - k * cs, 4, 'dot') + G.T(ox + m * cs + 8, oy - k * cs - 4, 'B', 'start');
    if (mode !== 'plain') { var P = [ox + px * cs, oy - py * cs]; s += mode === 'pass' ? G.C(P[0], P[1], 5, 'dot') + G.T(P[0] + 8, P[1] - 6, 'P', 'start') : G.L(P[0] - 6, P[1] - 6, P[0] + 6, P[1] + 6, 'thick acc') + G.L(P[0] - 6, P[1] + 6, P[0] + 6, P[1] - 6, 'thick acc') + G.T(P[0] + 8, P[1] - 6, 'P（封閉）', 'start', 'small'); }
    var q = '如圖棋盤式街道，由 A 走到 B，每次只能向右或向上走一格（最短路徑），' + (mode === 'plain' ? '共有幾種走法？' : mode === 'pass' ? '且一定要經過 P 點，共有幾種走法？' : '但 P 路口封閉不能通過，共有幾種走法？');
    var ex = '向右 ' + m + ' 步、向上 ' + k + ' 步，總走法 = C(' + (m + k) + ', ' + k + ') = ' + tot + '。' + (mode === 'plain' ? '' : '\n經過 P：A→P 有 C(' + (px + py) + ', ' + py + ') = ' + comb(px + py, py) + '，P→B 有 C(' + (m - px + k - py) + ', ' + (k - py) + ') = ' + comb(m - px + k - py, k - py) + '，相乘 = ' + thr + '。' + (mode === 'avoid' ? '\n不經過 P = 全部 − 經過 P = ' + tot + ' − ' + thr + ' = ' + ans + '。' : ''));
    return [q, O(ans + ' 種', [tot + ' 種', thr + ' 種', (tot - thr) + ' 種', comb(m + k, k) * 2 + ' 種', (comb(px + py, py) + comb(m - px + k - py, k - py)) + ' 種'].filter(function (x) { return x !== ans + ' 種'; })), ex, G.svg(360, oy + 30, s)];
  }

  // 轉盤：扇形大小隨機（30° 的倍數）
  function spinner() {
    var names = shuffle(['紅', '藍', '黃', '綠']).slice(0, ri(3, 4)), parts, t = 0;
    do { parts = names.map(function () { return ri(1, 6); }); t++; } while (parts.reduce(function (a, b) { return a + b; }, 0) !== 12 && t < 500);
    if (parts.reduce(function (a, b) { return a + b; }, 0) !== 12) { names = ['紅', '藍', '黃']; parts = [6, 4, 2]; }
    var cx = 120, cy = 110, r = 90, a0 = 90, s = '', fills = ['var(--accent-soft)', 'var(--line)', 'var(--card)', 'var(--bg)'];
    parts.forEach(function (p, i) {
      var a1 = a0 - p * 30, x1 = cx + r * Math.cos(rad(a0)), y1 = cy - r * Math.sin(rad(a0)), x2 = cx + r * Math.cos(rad(a1)), y2 = cy - r * Math.sin(rad(a1));
      s += '<path d="M' + cx + ',' + cy + ' L' + G.r1(x1) + ',' + G.r1(y1) + ' A' + r + ',' + r + ' 0 ' + (p * 30 > 180 ? 1 : 0) + ',1 ' + G.r1(x2) + ',' + G.r1(y2) + ' Z" style="fill:' + fills[i] + '"/>';
      var am = (a0 + a1) / 2; s += G.T(cx + r * 0.6 * Math.cos(rad(am)), cy - r * 0.6 * Math.sin(rad(am)) + 4, names[i]) + G.T(cx + r * 0.6 * Math.cos(rad(am)), cy - r * 0.6 * Math.sin(rad(am)) + 18, p * 30 + '°', 'middle', 'small');
      a0 = a1;
    });
    s += G.A(cx, cy, cx + 30, cy - 52, 'thick') + G.C(cx, cy, 4, 'dot');
    var i0 = ri(0, names.length - 1), p0 = parts[i0], ask = pick(['one', 'same', 'atleast']), sq = 0; parts.forEach(function (p) { sq += p * p; });
    if (ask === 'one') return ['如圖轉盤（各扇形圓心角如圖），轉一次指針停在「' + names[i0] + '」的機率為何？', O(F(p0, 12), [F(1, names.length), F(p0, 360), F(12 - p0, 12), F(p0 + 1, 12)]), '機率 = 圓心角 / 360° = ' + p0 * 30 + '/360 = ' + F(p0, 12) + '。', G.svg(360, 220, s)];
    if (ask === 'same') return ['如圖轉盤（各扇形圓心角如圖），連轉兩次，兩次停在同一種顏色的機率為何？', O(F(sq, 144), [F(1, names.length), F(sq, 144 * 2), F(names.length, 12), F(144 - sq, 144)]), '兩次獨立：P = Σ(各色機率)² = ' + parts.map(function (p) { return '(' + F(p, 12) + ')²'; }).join(' + ') + ' = ' + F(sq, 144) + '。', G.svg(360, 220, s)];
    return ['如圖轉盤（各扇形圓心角如圖），連轉兩次，至少一次停在「' + names[i0] + '」的機率為何？', O(F(144 - (12 - p0) * (12 - p0), 144), [F(2 * p0, 12), F(p0 * p0, 144), F((12 - p0) * (12 - p0), 144), F(2 * p0 * (12 - p0), 144)]), '至少一次 = 1 − 兩次都不是 = 1 − (' + F(12 - p0, 12) + ')² = ' + F(144 - (12 - p0) * (12 - p0), 144) + '。', G.svg(360, 220, s)];
  }

  // 次數分配長條圖：求平均、中位數、眾數
  function histogram() {
    var scen = pick([['每週借書本數', [0, 1, 2, 3, 4, 5], '本'], ['小考成績', [5, 6, 7, 8, 9, 10], '分'], ['家中人數', [2, 3, 4, 5, 6], '人']]), vals = scen[1], fr, mxf, cntMax;
    do { fr = vals.map(function () { return ri(1, 9); }); mxf = Math.max.apply(null, fr); cntMax = fr.filter(function (f) { return f === mxf; }).length; } while (cntMax > 1);
    var N = fr.reduce(function (a, b) { return a + b; }, 0), sum = 0; vals.forEach(function (v, i) { sum += v * fr[i]; });
    var sorted = []; vals.forEach(function (v, i) { for (var j = 0; j < fr[i]; j++) sorted.push(v); });
    var med = N % 2 ? sorted[(N - 1) / 2] : (sorted[N / 2 - 1] + sorted[N / 2]) / 2, mode = vals[fr.indexOf(mxf)];
    var ox = 45, oy = 185, bw = 260 / vals.length, s = G.A(ox, oy, 340, oy, 'thin') + G.A(ox, oy, ox, 20, 'thin') + G.T(ox - 6, 24, '人數', 'end', 'small') + G.T(340, oy + 30, scen[2], 'end', 'small');
    vals.forEach(function (v, i) { var h = fr[i] * 16, x = ox + 10 + i * bw; s += G.Rc(x, oy - h, bw - 12, h, 'fill2 acc') + G.T(x + (bw - 12) / 2, oy - h - 5, fr[i], 'middle', 'small') + G.T(x + (bw - 12) / 2, oy + 15, v, 'middle', 'small'); });
    var ask = pick(['mean', 'med', 'med', 'mode']), U2 = function (x) { return D(x, 2) + ' ' + scen[2]; };
    var ex = '共 ' + N + ' 人。平均 = Σ(值×人數)/人數 = ' + sum + '/' + N + ' = ' + D(sum / N, 2) + '；\n由小到大排，中位數 = ' + (N % 2 ? '第 ' + (N + 1) / 2 + ' 個 = ' + med : '第 ' + N / 2 + '、' + (N / 2 + 1) + ' 個的平均 = ' + med) + '；眾數 = 人數最多的 ' + mode + '。';
    var q = '某班調查「' + scen[0] + '」，結果如圖（長條上的數字為人數），';
    if (ask === 'mean') return [q + '平均數為何？', O(U2(sum / N), [U2(med), U2(mode), U2(sum / vals.length), U2(N / vals.length)]), ex, G.svg(360, 220, s)];
    if (ask === 'med') return [q + '中位數為何？', O(U2(med), [U2(mode), U2(sum / N), U2(vals[Math.floor(vals.length / 2)]), U2(sorted[Math.floor(N / 2)] === med ? med + 1 : sorted[Math.floor(N / 2)])]), ex, G.svg(360, 220, s)];
    return [q + '眾數為何？', O(U2(mode), [U2(mxf), U2(med), U2(sum / N), U2(vals[vals.length - 1])]), ex + '\n注意：眾數是「值」，不是人數 ' + mxf + '。', G.svg(360, 220, s)];
  }

  // 指數函數圖形：底數大於 1 或介於 0 與 1
  function expGraph() {
    var bs = pick([[2, 1], [3, 1], [4, 1], [1, 2], [1, 3], [1, 4]]), a = bs[0] / bs[1], cx = 180, oy = 205, ux = 32, uy = 22, s = '';
    var P = function (x, y) { return [cx + x * ux, oy - y * uy]; };
    for (var i = -5; i <= 5; i++) s += G.L(P(i, 0)[0], oy, P(i, 0)[0], oy - 8.5 * uy, 'thin') + (i ? G.T(P(i, 0)[0], oy + 14, n(i), 'middle', 'small') : '');
    for (var j = 1; j <= 8; j++) s += G.L(cx - 5 * ux, oy - j * uy, cx + 5 * ux, oy - j * uy, 'thin') + G.T(cx - 5, oy - j * uy + 4, j, 'end', 'small');
    s += G.A(cx - 5 * ux - 6, oy, cx + 5 * ux + 10, oy, 'thick') + G.A(cx, oy + 4, cx, oy - 8.5 * uy - 8, 'thick');
    var pts = []; for (var x = -5.5; x <= 5.5; x += 0.05) { var y = Math.pow(a, x); if (y <= 8.6) pts.push(P(x, y)); }
    s += G.poly(pts, 'thick acc');
    var kx = a > 1 ? 1 : -1, ky = Math.pow(a, kx), q0 = P(kx, ky); s += G.C(q0[0], q0[1], 3.5, 'dot') + G.T(q0[0] + 8, q0[1] - 6, '(' + n(kx) + ', ' + ky + ')', 'start', 'small');
    var aT = F(bs[0], bs[1]), ask = pick(['a', 'val', 'mono']), k2 = pick([2, -2, 3, -3].filter(function (v) { return Math.abs(v * Math.log(a)) < Math.log(70); }));
    var v2 = k2 > 0 ? F(Math.pow(bs[0], k2), Math.pow(bs[1], k2)) : F(Math.pow(bs[1], -k2), Math.pow(bs[0], -k2));
    var ex = '圖形通過 (0, 1) 與 (' + n(kx) + ', ' + ky + ')：a^' + n(kx) + ' = ' + ky + ' → a = ' + aT + '。' + (a > 1 ? 'a > 1，函數遞增。' : '0 < a < 1，函數遞減。');
    if (ask === 'a') return ['如圖為 y = aˣ 的圖形，通過圖上標示的點，a 為何？', O(aT, [F(bs[1], bs[0]), String(ky), F(1, ky), String(ky * 2)]), ex, G.svg(360, 230, s)];
    if (ask === 'val') return ['如圖為 y = aˣ 的圖形，通過圖上標示的點，當 x = ' + n(k2) + ' 時 y 為何？', O(v2, [k2 > 0 ? F(Math.pow(bs[1], k2), Math.pow(bs[0], k2)) : F(Math.pow(bs[0], -k2), Math.pow(bs[1], -k2)), F(bs[0] * Math.abs(k2), bs[1]), n(k2 * (a > 1 ? 1 : -1))]), ex + '\nx = ' + n(k2) + '：y = (' + aT + ')^' + n(k2) + ' = ' + v2 + '。', G.svg(360, 230, s)];
    return ['如圖為 y = aˣ 的圖形，下列敘述何者正確？', O(a > 1 ? 'a > 1，x 越大 y 越大' : '0 < a < 1，x 越大 y 越小', [a > 1 ? '0 < a < 1，x 越大 y 越小' : 'a > 1，x 越大 y 越大', '圖形通過 (1, 0)', '當 x < 0 時 y < 0']), ex + '\n指數函數恆過 (0, 1)，y 恆大於 0。', G.svg(360, 230, s)];
  }

  // 正弦圖形：振幅、週期、上下平移隨機
  function sineGraph() {
    var A = pick([1, 2, 3]), Tp = pick([360, 180, 720, 120]), d = pick([0, 0, 1, -1, 2]), Bn = 360 / Tp, xmax = Tp <= 180 ? Tp * 3 : Tp * 1.5;
    var ox = 40, oy = 120, sx = 290 / xmax, sy = 18, s = G.A(ox, oy, 340, oy, 'thin') + G.A(ox, 225, ox, 15, 'thin') + G.T(344, oy + 4, 'x', 'start') + G.T(ox + 6, 18, 'y', 'start');
    var pts = []; for (var x = 0; x <= xmax; x += xmax / 300) pts.push([ox + x * sx, oy - (A * Math.sin(rad(Bn * x)) + d) * sy]);
    s += G.poly(pts, 'thick acc');
    [A + d, -A + d].forEach(function (v) { s += G.L(ox, oy - v * sy, 340, oy - v * sy, 'thin dash') + G.T(ox - 5, oy - v * sy + 4, n(v), 'end', 'small'); });
    for (var t = Tp / 4; t <= xmax + 1e-9; t += Tp / 4) s += G.L(ox + t * sx, oy - 3, ox + t * sx, oy + 3, 'thin') + G.T(ox + t * sx, oy + 15, t + '°', 'middle', 'small');
    var bx = Bn === 1 ? 'x' : Bn === 0.5 ? 'x/2' : Bn + 'x', eq = function (A2, b2, d2) { return 'y = ' + (A2 === 1 ? '' : A2) + 'sin ' + b2 + (d2 ? (d2 > 0 ? ' + ' + d2 : ' − ' + (-d2)) : ''); };
    var ask = pick(['eq', 'T', 'A']), fig = G.svg(360, 235, s), alt = Bn === 1 ? '2x' : 'x';
    var ex = '最大值 ' + (A + d) + '、最小值 ' + (-A + d) + ' → 振幅 = (最大 − 最小)/2 = ' + A + '、中心線 y = ' + d + '。\n一個完整波形的寬度 = 週期 ' + Tp + '°，y = sin(bx) 的週期 = 360°/b → b = ' + D(Bn, 2) + '。';
    if (ask === 'eq') return ['如圖為正弦函數的圖形（虛線為最大、最小值），其方程式為何？', O(eq(A, bx, d), [eq(A, alt, d), eq(A * 2, bx, d), eq(A, bx, -d || 1), eq(A + d, bx, 0)]), ex, fig];
    if (ask === 'T') return ['如圖為正弦函數的圖形，其週期為何？', O(Tp + '°', [Tp / 2 + '°', Tp * 2 + '°', Tp / 4 + '°', (Tp === 360 ? 180 : 360) * 1.5 + '°']), ex, fig];
    return ['如圖為正弦函數的圖形（虛線為最大、最小值），其振幅為何？', O(String(A), [String(A + d === A ? A * 2 : A + d), String(2 * A), String(A + Math.abs(d) + 1), String(A / 2)]), ex, fig];
  }

  // 機率樹狀圖：先驗與條件機率隨機，求全機率或貝氏
  function bayes() {
    var sc = pick([['甲工廠生產', '不良品'], ['罹患某病', '檢驗呈陽性'], ['下雨', '公車誤點']]), pA = pick([10, 20, 30, 40, 60]), pBA = pick([50, 60, 70, 80, 90]), pBn = pick([5, 10, 20, 30]);
    var s = '', P = { r: [30, 110], a: [140, 55], na: [140, 165], ab: [290, 25], anb: [290, 85], nab: [290, 135], nanb: [290, 195] };
    var ln = function (p, q, lab, up) { var mx = (P[p][0] + P[q][0]) / 2, my = (P[p][1] + P[q][1]) / 2; return G.L(P[p][0], P[p][1], P[q][0], P[q][1], 'acc') + G.T(mx, my + (up ? -6 : 14), lab, 'middle', 'small'); };
    s += ln('r', 'a', D(pA / 100, 2), true) + ln('r', 'na', D(1 - pA / 100, 2), false) + ln('a', 'ab', D(pBA / 100, 2), true) + ln('a', 'anb', D(1 - pBA / 100, 2), false) + ln('na', 'nab', D(pBn / 100, 2), true) + ln('na', 'nanb', D(1 - pBn / 100, 2), false);
    s += G.T(P.a[0] - 4, P.a[1] - 10, 'A', 'end') + G.T(P.na[0] - 4, P.na[1] + 18, 'A′', 'end') + G.T(P.ab[0] + 6, P.ab[1] + 4, 'B', 'start') + G.T(P.anb[0] + 6, P.anb[1] + 4, 'B′', 'start') + G.T(P.nab[0] + 6, P.nab[1] + 4, 'B', 'start') + G.T(P.nanb[0] + 6, P.nanb[1] + 4, 'B′', 'start');
    var ab = pA * pBA, nab = (100 - pA) * pBn, PB = ab + nab, ask = pick(['pb', 'post', 'post']);
    var ex = 'P(B) = P(A)P(B|A) + P(A′)P(B|A′) = ' + D(pA / 100, 2) + '×' + D(pBA / 100, 2) + ' + ' + D(1 - pA / 100, 2) + '×' + D(pBn / 100, 2) + ' = ' + D(PB / 10000, 4) + '\nP(A|B) = P(A∩B)/P(B) = ' + D(ab / 10000, 4) + '/' + D(PB / 10000, 4) + ' = ' + F(ab, PB) + '。';
    var q = '如圖樹狀圖，A 表示「' + sc[0] + '」、B 表示「' + sc[1] + '」，線上數字為機率，';
    if (ask === 'pb') return [q + '事件 B 發生的機率 P(B) 為何？', O(D(PB / 10000, 4), [D(ab / 10000, 4), D(pBA / 100, 2), D((pBA + pBn) / 200, 4), D(nab / 10000, 4)]), ex, G.svg(360, 215, s)];
    return [q + '已知 B 發生，則 A 發生的機率 P(A|B) 為何？', O(F(ab, PB), [F(nab, PB), F(pBA, 100), F(ab, 10000), F(pA, 100)]), ex, G.svg(360, 215, s)];
  }

  // 橢圓：長軸方向、中心、a、b 隨機
  function ellipse() {
    var a = ri(3, 5), b = ri(1, a - 1), hor = Math.random() < 0.5, h = ri(-(5 - (hor ? a : b)), 5 - (hor ? a : b)), k = ri(-(5 - (hor ? b : a)), 5 - (hor ? b : a)), c2 = a * a - b * b;
    var g = gridAxes(), cpt = g.P(h, k), rx = (hor ? a : b) * 22, ry = (hor ? b : a) * 22;
    var s = g.s + '<ellipse cx="' + cpt[0] + '" cy="' + cpt[1] + '" rx="' + rx + '" ry="' + ry + '" style="fill:none;stroke:var(--accent);stroke-width:2"/>' + G.C(cpt[0], cpt[1], 3, 'dot');
    var term = function (v, x) { return v === 0 ? x + '²' : '(' + lin(v, x) + ')²'; }, eq = function (A2, B2) { return term(h, 'x') + '/' + A2 + ' + ' + term(k, 'y') + '/' + B2 + ' = 1'; };
    var cT = H.sqrtS(c2), foc = function (c) { return hor ? '(' + (h ? n(h) + ' ± ' + c : '±' + c) + ', ' + n(k) + ')' : '(' + n(h) + ', ' + (k ? n(k) + ' ± ' + c : '±' + c) + ')'; };
    var ask = pick(['eq', 'eq', 'foci', 'major']), fig = G.svg(290, 290, s), A2 = hor ? a * a : b * b, B2 = hor ? b * b : a * a;
    var ex = '由圖讀出中心 (' + n(h) + ', ' + n(k) + ')，' + (hor ? '水平' : '鉛直') + '方向半軸 ' + a + '（長軸）、另一方向半軸 ' + b + '。\n方程式 ' + eq(A2, B2) + '；c² = a² − b² = ' + c2 + ' → c = ' + cT + '，焦點在長軸上：' + foc(cT) + '。';
    if (ask === 'eq') return ['如圖之橢圓（中心為黑點，與格線的交點可由方格讀出），其方程式為何？', O(eq(A2, B2), [eq(B2, A2), eq(hor ? a : b, hor ? b : a), term(-h, 'x') + '/' + A2 + ' + ' + term(-k, 'y') + '/' + B2 + ' = 1', eq(A2 * 4, B2 * 4)]), ex, fig];
    if (ask === 'foci') return ['如圖之橢圓（中心為黑點），其焦點坐標為何？', O(foc(cT), [foc(H.sqrtS(a * a + b * b)), hor ? '(' + n(h) + ', ' + (k ? n(k) + ' ± ' + cT : '±' + cT) + ')' : '(' + (h ? n(h) + ' ± ' + cT : '±' + cT) + ', ' + n(k) + ')', foc(String(a)), foc(String(b))]), ex, fig];
    return ['如圖之橢圓，其長軸長為何？', O(String(2 * a), [String(2 * b), String(a), String(a + b), String(2 * c2)]), ex + '\n長軸長 = 2a = ' + 2 * a + '。', fig];
  }

  /* ================= 社會 ================= */

  // 地圖比例尺與方位：A、B 位置、比例尺、表示法隨機
  function mapScale() {
    var den = pick([25000, 50000, 100000, 250000]), dirs = ['東', '東北', '北', '西北', '西', '西南', '南', '東南'], di = ri(0, 7), dcm = pick([2, 2.5, 3, 4, 5, 6]);
    var ang = di * 45 + ri(-8, 8), len = dcm * 26, Ax = 180 - len / 2 * Math.cos(rad(ang)), Ay = 115 + len / 2 * Math.sin(rad(ang)), Bx = 180 + len / 2 * Math.cos(rad(ang)), By = 115 - len / 2 * Math.sin(rad(ang));
    var s = G.Rc(20, 15, 320, 200, 'thin') + G.A(305, 70, 305, 30, 'thick') + G.T(305, 26, '北', 'middle', 'small') + G.L(Ax, Ay, Bx, By, 'thin dash') + G.C(Ax, Ay, 4, 'dot') + G.C(Bx, By, 4, 'dot') + G.T(Ax - 8, Ay + 4, 'A', 'end') + G.T(Bx + 8, By + 4, 'B', 'start');
    var bar = Math.random() < 0.5, km1 = den / 100000; // 1 cm 代表的公里
    if (bar) { s += G.L(40, 195, 40 + 52, 195, 'thick') + G.L(40, 190, 40, 200, 'thick') + G.L(92, 190, 92, 200, 'thick') + G.T(40, 186, '0', 'middle', 'small') + G.T(92, 186, D(km1 * 2, 2) + ' km', 'middle', 'small') + G.T(100, 199, '（線段長 2 cm）', 'start', 'small'); }
    else s += G.T(40, 200, '比例尺 1：' + den.toLocaleString('en-US'), 'start', 'small');
    s += G.T((Ax + Bx) / 2 + 10, (Ay + By) / 2 - 8, '圖上 ' + dcm + ' cm', 'start', 'small');
    var real = dcm * km1, ask = pick(['dist', 'dist', 'dir']), K = function (x) { return D(x, 2) + ' 公里'; };
    if (ask === 'dist') return ['如圖地圖，A、B 兩地在圖上相距 ' + dcm + ' cm，實際距離約為何？', O(K(real), [K(real * 10), K(real / 10), K(dcm * den / 1000), K(real * 2)]),
      (bar ? '線段比例尺：2 cm 代表 ' + D(km1 * 2, 2) + ' km → 1 cm 代表 ' + D(km1, 2) + ' km。' : '1：' + den + ' 表示圖上 1 cm = 實際 ' + den + ' cm = ' + D(km1, 2) + ' km。') + '\n實際距離 = ' + dcm + ' × ' + D(km1, 2) + ' = ' + K(real) + '。', G.svg(360, 230, s)];
    return ['如圖地圖（指北針朝上），B 地位於 A 地的哪一個方位？', O(dirs[di], [dirs[(di + 4) % 8], dirs[(di + 2) % 8], dirs[(di + 6) % 8], dirs[(di + 1) % 8]]),
      '以 A 為中心，看 B 在哪個方向：上北下南、右東左西。B 在 A 的' + dirs[di] + '方（反過來 A 在 B 的' + dirs[(di + 4) % 8] + '方）。', G.svg(360, 230, s)];
  }

  // 氣候圖判讀：類型隨機，部分類型可能在南半球（月份錯開半年）
  function climateQ() {
    var T = {
      '熱帶雨林氣候': [[27, 27, 27, 28, 28, 27, 27, 27, 27, 27, 27, 27], [250, 230, 260, 280, 240, 200, 190, 210, 220, 260, 270, 280], false],
      '熱帶莽原氣候': [[25, 26, 28, 30, 29, 27, 26, 26, 27, 27, 26, 25], [5, 5, 10, 40, 120, 200, 260, 250, 180, 60, 10, 5], true],
      '熱帶沙漠氣候': [[18, 20, 24, 28, 32, 34, 35, 34, 31, 27, 22, 19], [5, 4, 3, 1, 0, 0, 0, 0, 0, 1, 3, 5], true],
      '地中海型氣候': [[11, 12, 14, 17, 20, 24, 27, 27, 24, 20, 15, 12], [100, 85, 70, 40, 20, 5, 2, 5, 25, 70, 110, 120], true],
      '溫帶海洋性氣候': [[4, 5, 7, 9, 12, 15, 17, 17, 14, 11, 7, 5], [70, 55, 60, 55, 60, 55, 60, 65, 60, 75, 80, 80], true],
      '溫帶季風氣候': [[-3, 0, 6, 13, 19, 23, 27, 26, 21, 14, 6, -1], [15, 20, 40, 70, 110, 180, 300, 280, 140, 50, 30, 15], true],
      '溫帶大陸性氣候': [[-15, -12, -4, 6, 13, 18, 21, 19, 13, 5, -5, -12], [20, 15, 20, 30, 45, 70, 80, 75, 50, 35, 25, 20], true]
    };
    var keys = Object.keys(T), ty = pick(keys), d = T[ty], south = d[2] && Math.random() < 0.35;
    var temp = d[0].map(function (t) { return t + ri(-1, 1); }), rain = d[1].map(function (r) { return Math.max(0, Math.round(r * (0.85 + Math.random() * 0.3))); });
    if (south) { temp = temp.slice(6).concat(temp.slice(0, 6)); rain = rain.slice(6).concat(rain.slice(0, 6)); }
    var fig = QF.climate(temp, rain, '某地氣候圖'), ask = d[2] && ty !== '熱帶雨林氣候' && Math.random() < 0.3 ? 'hemi' : 'type';
    var why = { '熱帶雨林氣候': '全年高溫（月均溫都在 25℃ 以上）且全年多雨', '熱帶莽原氣候': '全年高溫、有明顯乾季與雨季', '熱帶沙漠氣候': '雨量極少、夏季酷熱', '地中海型氣候': '夏乾冬雨、冬季溫和', '溫帶海洋性氣候': '冬暖夏涼、年溫差小、全年有雨', '溫帶季風氣候': '夏季高溫多雨、冬季寒冷乾燥（雨熱同季）', '溫帶大陸性氣候': '冬季嚴寒（最冷月 < 0℃）、年溫差大、雨量少且集中夏季' }[ty];
    if (ask === 'hemi') return ['如圖氣候圖（橫軸為 1～12 月），此地最可能位於哪一個半球？', O(south ? '南半球' : '北半球', [south ? '北半球' : '南半球', '赤道上', '無法由氣候圖判斷']),
      '看氣溫曲線：' + (south ? '1 月前後最熱、7 月前後最冷 → 南半球（季節與北半球相反）。' : '7 月前後最熱、1 月前後最冷 → 北半球。') + '\n此氣候類型為' + ty + '（' + why + '）。', fig];
    var c = shuffle(keys.filter(function (k) { return k !== ty; })).slice(0, 3);
    return ['如圖為某地的氣候圖（折線為月均溫、長條為月雨量），最可能屬於哪一種氣候？', O(ty, c), ty + '：' + why + '。' + (south ? '\n本地氣溫在 1 月最高 → 位於南半球，判讀時月份要錯開半年。' : ''), fig];
  }

  // 人口金字塔：擴張、穩定、縮減
  function pyramidQ() {
    var groups = ['0-9', '10-19', '20-29', '30-39', '40-49', '50-59', '60-69', '70+'];
    var base = { '擴張型（人口增加）': [16, 14, 13, 11, 9, 7, 5, 3], '穩定型（人口成長停滯）': [11, 11, 11, 11, 11, 10, 9, 7], '縮減型（人口減少）': [6, 7, 9, 11, 12, 12, 11, 9] };
    var keys = Object.keys(base), ty = pick(keys), b = base[ty], male = b.map(function (v) { return Math.max(1, v / 2 + ri(-5, 5) / 10); }), female = b.map(function (v, i) { return Math.max(1, v / 2 + ri(-5, 5) / 10 + (i >= 6 ? 0.4 : 0)); });
    var fig = QF.pyramid(groups, male, female), ask = pick(['type', 'type', 'feat']);
    var feat = { '擴張型（人口增加）': '出生率高、幼年人口比例高（多為開發中國家）', '穩定型（人口成長停滯）': '出生率與死亡率都低且接近、各年齡層比例相近', '縮減型（人口減少）': '出生率低於死亡率、幼年人口少、老年人口比例高（少子高齡化）' };
    if (ask === 'type') return ['如圖人口金字塔，屬於哪一種類型？', O(ty, keys.filter(function (k) { return k !== ty; }).concat(['葫蘆型（人口移入）'])), ty + '：' + feat[ty] + '。\n判讀重點：看底部（幼年）與中間（青壯年）哪個寬。', fig];
    return ['如圖人口金字塔，下列敘述何者最正確？', O(feat[ty], keys.filter(function (k) { return k !== ty; }).map(function (k) { return feat[k]; }).concat(['青壯年人口大量移出，形成凹陷'])), '此為' + ty + '：' + feat[ty] + '。', fig];
  }

  // 供需雙移動：需求、供給各自可能右移、左移或不動
  function supplyDemand() {
    var ds, ss; do { ds = pick([1, -1, 0]); ss = pick([1, -1, 0]); } while (!ds && !ss);
    var x0 = 50, y0 = 200, s = G.A(x0, y0, x0, 18, 'thin') + G.A(x0, y0, 330, y0, 'thin') + G.T(x0 - 6, 28, 'P', 'end') + G.T(326, y0 + 16, 'Q', 'end');
    s += G.L(80, 60, 280, 180, 'acc thick') + G.T(284, 190, 'D', 'start') + G.L(80, 180, 280, 60, 'thick') + G.T(284, 58, 'S', 'start');
    if (ds) s += G.L(80 + 40 * ds, 60, 280 + 40 * ds, 180, 'acc dash') + G.T(284 + 40 * ds, 176, 'D′', 'start');
    if (ss) s += G.L(80 + 40 * ss, 180, 280 + 40 * ss, 60, 'dash') + G.T(284 + 40 * ss, 74, 'S′', 'start');
    // 價格：需求右移使價升、供給右移使價降；數量：兩者右移都使量升。兩個效果方向相反就「不確定」
    var w = function (a, b) { var v = a || b; if (a && b && a !== b) return '不確定'; return v > 0 ? '上升' : '下降'; };
    var pT = w(ds, -ss), qT = w(ds, ss);
    var ans = '價格' + pT + '、數量' + qT, all = [];
    ['上升', '下降', '不確定'].forEach(function (a) { ['上升', '下降', '不確定'].forEach(function (b) { var t = '價格' + a + '、數量' + b; if (t !== ans) all.push(t); }); });
    var mv = function (x, nm) { return x ? nm + (x > 0 ? '右移（增加）' : '左移（減少）') : nm + '不變'; };
    return ['如圖，某商品市場的' + mv(ds, '需求') + '、' + mv(ss, '供給') + '（虛線為移動後），新的均衡價格與數量如何變化？', O(ans, shuffle(all)),
      '單獨看：需求右移 → 價、量都升；需求左移 → 價、量都降；供給右移 → 價降量升；供給左移 → 價升量降。\n' + (ds && ss ? '兩條同時移動時，效果相同的方向可以確定、互相抵銷的方向「不確定」（要看移動幅度）。\n' : '') + '本題：' + ans + '。', G.svg(360, 215, s)];
  }

  var it = function (t, f) { return { t: t, g: function () { return f(); } }; };
  [addEasy, addHard].forEach(function (add) {
    add('math', 0, [it('絕對值不等式數線（看圖）', absIneq)]);
    add('math', 1, [it('三次函數圖形解不等式（看圖）', cubic)]);
    add('math', 2, [it('圓的方程式（看圖）', circleQ)]);
    add('math', 3, [it('圖形數列（看圖）', pattern)]);
    add('math', 4, [it('棋盤路徑（看圖）', gridPath)]);
    add('math', 5, [it('轉盤機率（看圖）', spinner)]);
    add('math', 6, [it('長條圖求平均中位眾數（看圖）', histogram)]);
    add('math', 8, [it('指數函數圖形（看圖）', expGraph)]);
    add('math', 9, [it('正弦函數圖形（看圖）', sineGraph)]);
    add('math', 12, [it('機率樹狀圖（看圖）', bayes)]);
    add('math', 14, [it('橢圓圖形（看圖）', ellipse)]);
    add('soc', 3, [it('地圖比例尺與方位（看圖）', mapScale)]);
    add('soc', 4, [it('氣候圖判讀（看圖）', climateQ)]);
    add('soc', 5, [it('人口金字塔判讀（看圖）', pyramidQ)]);
    add('soc', 9, [it('供需雙移動（看圖）', supplyDemand)]);
  });
})();
