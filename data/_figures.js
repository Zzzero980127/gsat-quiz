/* 題目示意圖（自繪 SVG／表格，數字跟著類題一起變）
 * 產生器回傳 [題目, 選項, 解析, 圖] 的第 4 個元素放 QF.xxx(...) 的結果即可。
 * 顏色一律用 currentColor / CSS 變數，深淺色模式都看得清楚。
 */
window.QF = (function () {
  function r1(x) { return Math.round(x * 10) / 10; }
  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }
  function svg(w, h, body) {
    return '<svg viewBox="0 0 ' + w + ' ' + h + '" xmlns="http://www.w3.org/2000/svg" role="img" class="qfig">' +
      '<defs><marker id="qfa" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="currentColor"/></marker></defs>' + body + '</svg>';
  }
  function L(x1, y1, x2, y2, cls) { return '<line x1="' + r1(x1) + '" y1="' + r1(y1) + '" x2="' + r1(x2) + '" y2="' + r1(y2) + '" class="' + (cls || '') + '"/>'; }
  function A(x1, y1, x2, y2, cls) { return '<line x1="' + r1(x1) + '" y1="' + r1(y1) + '" x2="' + r1(x2) + '" y2="' + r1(y2) + '" class="' + (cls || '') + '" marker-end="url(#qfa)"/>'; }
  function T(x, y, s, anchor, cls) { return '<text x="' + r1(x) + '" y="' + r1(y) + '" text-anchor="' + (anchor || 'middle') + '" class="' + (cls || '') + '">' + esc(s) + '</text>'; }
  function Rect(x, y, w, h, cls) { return '<rect x="' + r1(x) + '" y="' + r1(y) + '" width="' + r1(Math.max(w, 0)) + '" height="' + r1(Math.max(h, 0)) + '" class="' + (cls || '') + '"/>'; }
  function C(x, y, r, cls) { return '<circle cx="' + r1(x) + '" cy="' + r1(y) + '" r="' + r1(r) + '" class="' + (cls || '') + '"/>'; }
  function P(d, cls) { return '<path d="' + d + '" class="' + (cls || '') + '"/>'; }
  function niceMax(v) { var p = Math.pow(10, Math.floor(Math.log(v) / Math.LN10)), m = v / p; return (m <= 1 ? 1 : m <= 2 ? 2 : m <= 5 ? 5 : 10) * p; }

  return {
    // 長條圖：labels、values、單位、標題
    bars: function (labels, values, unit, title) {
      var W = 360, Hh = 230, x0 = 46, y0 = 190, top = 34, mx = niceMax(Math.max.apply(null, values) * 1.05), bw = (W - x0 - 20) / labels.length;
      var s = title ? T(W / 2, 18, title) : '';
      s += L(x0, top, x0, y0) + L(x0, y0, W - 10, y0);
      for (var k = 0; k <= 4; k++) { var y = y0 - (y0 - top) * k / 4; s += L(x0 - 4, y, W - 10, y, 'thin dash') + T(x0 - 7, y + 4, r1(mx * k / 4), 'end', 'small'); }
      labels.forEach(function (lb, i) {
        var h = (y0 - top) * values[i] / mx, x = x0 + i * bw + bw * 0.18;
        s += Rect(x, y0 - h, bw * 0.64, h, 'fill2 acc') + T(x + bw * 0.32, y0 - h - 4, values[i], 'middle', 'small') + T(x + bw * 0.32, y0 + 15, lb, 'middle', 'small');
      });
      s += T(x0 - 6, top - 10, unit, 'start', 'small');
      return svg(W, Hh, s);
    },
    // 折線圖：labels、series [{name, vals}]、單位
    lines: function (labels, series, unit, title) {
      var W = 360, Hh = 240, x0 = 46, y0 = 190, top = 34, all = [];
      series.forEach(function (se) { all = all.concat(se.vals); });
      var mx = niceMax(Math.max.apply(null, all) * 1.05), dx = (W - x0 - 30) / (labels.length - 1);
      var s = title ? T(W / 2, 18, title) : '';
      s += L(x0, top, x0, y0) + L(x0, y0, W - 10, y0);
      for (var k = 0; k <= 4; k++) { var y = y0 - (y0 - top) * k / 4; s += L(x0 - 4, y, W - 10, y, 'thin dash') + T(x0 - 7, y + 4, r1(mx * k / 4), 'end', 'small'); }
      labels.forEach(function (lb, i) { s += T(x0 + i * dx, y0 + 15, lb, 'middle', 'small'); });
      series.forEach(function (se, j) {
        var d = se.vals.map(function (v, i) { return (i ? 'L' : 'M') + r1(x0 + i * dx) + ',' + r1(y0 - (y0 - top) * v / mx); }).join(' ');
        s += P(d, j ? 'dash thick' : 'acc thick');
        se.vals.forEach(function (v, i) { s += C(x0 + i * dx, y0 - (y0 - top) * v / mx, 2.5, 'dot'); });
        var lx = x0 + (labels.length - 1) * dx, ly = y0 - (y0 - top) * se.vals[se.vals.length - 1] / mx;
        s += T(lx + 4, ly - 6 + j * 14, se.name, 'end', 'small');
      });
      s += T(x0 - 6, top - 10, unit, 'start', 'small');
      return svg(W, Hh, s);
    },
    // 表格（HTML）
    table: function (head, rows, caption) {
      return '<table class="qtab">' + (caption ? '<caption>' + esc(caption) + '</caption>' : '') + '<tr>' + head.map(function (h) { return '<th>' + esc(h) + '</th>'; }).join('') + '</tr>' +
        rows.map(function (r) { return '<tr>' + r.map(function (c) { return '<td>' + esc(c) + '</td>'; }).join('') + '</tr>'; }).join('') + '</table>';
    },
    // 氣候圖：月均溫（折線）與月雨量（長條）
    climate: function (temp, rain, name) {
      var W = 360, Hh = 240, x0 = 40, x1 = 320, y0 = 195, top = 30, bw = (x1 - x0) / 12;
      var tMin = Math.min(-10, Math.floor(Math.min.apply(null, temp) / 10) * 10), tMax = 40, rMax = Math.max(400, niceMax(Math.max.apply(null, rain)));
      function ty(t) { return y0 - (y0 - top) * (t - tMin) / (tMax - tMin); }
      var s = T(W / 2, 16, name || '氣候圖') + L(x0, top, x0, y0) + L(x1, top, x1, y0) + L(x0, y0, x1, y0);
      for (var t = tMin; t <= tMax; t += 10) s += L(x0 - 3, ty(t), x0, ty(t)) + T(x0 - 5, ty(t) + 4, t, 'end', 'small');
      for (var k = 0; k <= 4; k++) { var y = y0 - (y0 - top) * k / 4; s += L(x1, y, x1 + 3, y) + T(x1 + 5, y + 4, rMax * k / 4, 'start', 'small'); }
      rain.forEach(function (r, i) { var h = (y0 - top) * r / rMax; s += Rect(x0 + i * bw + 2, y0 - h, bw - 4, h, 'fill2'); s += T(x0 + i * bw + bw / 2, y0 + 13, i + 1, 'middle', 'small'); });
      s += P(temp.map(function (t, i) { return (i ? 'L' : 'M') + r1(x0 + i * bw + bw / 2) + ',' + r1(ty(t)); }).join(' '), 'acc thick');
      if (tMin < 0) s += L(x0, ty(0), x1, ty(0), 'thin dash');
      s += T(x0 - 4, top - 8, '℃', 'end', 'small') + T(x1 + 4, top - 8, 'mm', 'start', 'small') + T(W / 2, Hh - 6, '月', 'middle', 'small');
      return svg(W, Hh, s);
    },
    // 人口金字塔：各年齡組男、女占比（由年輕到年老）
    pyramid: function (groups, male, female) {
      var W = 360, Hh = 230, cx = 180, top = 22, rowH = (Hh - top - 30) / groups.length, mx = Math.max.apply(null, male.concat(female)), sc = 130 / mx;
      var s = T(cx - 70, 14, '男', 'middle', 'small') + T(cx + 70, 14, '女', 'middle', 'small');
      groups.forEach(function (g, i) {
        var y = top + (groups.length - 1 - i) * rowH;
        s += Rect(cx - 16 - male[i] * sc, y + 2, male[i] * sc, rowH - 4, 'fill2 acc') + Rect(cx + 16, y + 2, female[i] * sc, rowH - 4, 'fill');
        s += T(cx, y + rowH / 2 + 4, g, 'middle', 'small');
      });
      s += L(20, Hh - 26, W - 20, Hh - 26, 'thin') + T(cx, Hh - 8, '各年齡組占總人口 %（示意）', 'middle', 'small');
      return svg(W, Hh, s);
    },
    // 供需圖：shift 為 'D+','D-','S+','S-'
    supply: function (shift) {
      var x0 = 50, y0 = 200, W = 320, top = 20;
      var s = A(x0, y0, x0, top) + A(x0, y0, W, y0) + T(x0 - 6, top + 10, 'P', 'end') + T(W - 4, y0 + 16, 'Q', 'end');
      s += L(80, 60, 280, 180, 'acc thick') + T(286, 186, 'D', 'start') + L(80, 180, 280, 60, 'thick') + T(286, 60, 'S', 'start');
      var d = shift[0] === 'D', up = shift[1] === '+', o = up ? 45 : -45;
      if (d) s += L(80 + o, 60, 280 + o, 180, 'acc dash') + T(286 + o, 172, 'D′', 'start');
      else s += L(80 + o, 180, 280 + o, 60, 'dash') + T(286 + o, 72, 'S′', 'start');
      s += C(180, 120, 3, 'dot') + T(186, 116, 'E', 'start');
      return svg(W + 50, 215, s);
    },
    // 地形格點（數字為海拔，觀測點 O 與目標甲乙丙丁）
    grid: function (H, marks) {
      var n = H.length, m = H[0].length, cs = 40, x0 = 10, y0 = 10, s = '';
      for (var i = 0; i < n; i++) for (var j = 0; j < m; j++) {
        var x = x0 + j * cs, y = y0 + i * cs, mk = marks[i + ',' + j];
        s += Rect(x, y, cs, cs, mk ? 'fill2' : 'thin') + T(x + cs / 2, y + (mk ? 17 : 25), H[i][j], 'middle', 'small');
        if (mk) s += T(x + cs / 2, y + 33, mk, 'middle', 'small');
      }
      return svg(x0 * 2 + m * cs, y0 * 2 + n * cs, s);
    },
    // 坐標平面：lines [a,b,c,label]（ax+by+c=0）、circles [h,k,r]、pts [x,y,label]、fns [function, label]
    plot: function (o) {
      var R = o.range || 10, W = 300, sc = (W / 2 - 20) / R, cx = W / 2, cy = W / 2;
      function X(x) { return cx + x * sc; } function Y(y) { return cy - y * sc; }
      var s = '<clipPath id="qfc"><rect x="10" y="10" width="' + (W - 20) + '" height="' + (W - 20) + '"/></clipPath>';
      s += A(10, cy, W - 6, cy, 'thin') + A(cx, W - 10, cx, 6, 'thin') + T(W - 8, cy - 6, 'x', 'end', 'small') + T(cx + 8, 16, 'y', 'start', 'small') + T(cx - 4, cy + 13, 'O', 'end', 'small');
      var step = R > 12 ? 5 : R > 6 ? 2 : 1;
      for (var t = -R; t <= R; t += step) if (t) { s += L(X(t), cy - 2, X(t), cy + 2, 'thin') + L(cx - 2, Y(t), cx + 2, Y(t), 'thin'); }
      s += T(X(step * Math.floor(R / step)), cy + 13, step * Math.floor(R / step), 'middle', 'small');
      var g = '<g clip-path="url(#qfc)">';
      (o.circles || []).forEach(function (c) { g += C(X(c[0]), Y(c[1]), c[2] * sc, 'acc thick'); });
      (o.lines || []).forEach(function (l) {
        var a = l[0], b = l[1], c = l[2], p1, p2;
        if (Math.abs(b) > 1e-9) { p1 = [-R * 1.2, (-c - a * -R * 1.2) / b]; p2 = [R * 1.2, (-c - a * R * 1.2) / b]; }
        else { p1 = [-c / a, -R * 1.2]; p2 = [-c / a, R * 1.2]; }
        g += L(X(p1[0]), Y(p1[1]), X(p2[0]), Y(p2[1]), l[4] || 'thick');
      });
      (o.fns || []).forEach(function (f) {
        var d = '', first = true;
        for (var x = -R; x <= R + 1e-9; x += R / 80) { var y = f[0](x); if (!isFinite(y) || Math.abs(y) > R * 3) { first = true; continue; } d += (first ? 'M' : 'L') + r1(X(x)) + ',' + r1(Y(y)); first = false; }
        g += P(d, 'acc thick');
      });
      g += '</g>';
      s += g;
      (o.lines || []).forEach(function (l) { if (l[3]) { var px = l[5] !== undefined ? l[5] : R * 0.6, py = Math.abs(l[1]) > 1e-9 ? (-l[2] - l[0] * px) / l[1] : 0; if (Math.abs(l[1]) <= 1e-9) px = -l[2] / l[0]; s += T(X(px) + 6, Math.min(Math.max(Y(py) - 6, 20), W - 14), l[3], 'start', 'small'); } });
      (o.fns || []).forEach(function (f) { if (f[1]) s += T(X(f[2] || R * 0.5) + 6, Math.min(Math.max(Y(f[0](f[2] || R * 0.5)) - 6, 20), W - 14), f[1], 'start', 'small'); });
      (o.pts || []).forEach(function (p) { s += C(X(p[0]), Y(p[1]), 3, 'dot') + T(X(p[0]) + 5, Y(p[1]) - 5, p[2] || '', 'start', 'small'); });
      return svg(W, W, s);
    },
    // 正弦圖形：y = a·sin(bx) + d，畫一個多週期，x 軸以 π 標示（不標 a、b、d 讓學生判讀）
    sine: function (a, b, d) {
      var W = 340, Hh = 220, x0 = 30, x1 = 320, span = 2 * Math.PI, ymax = Math.max(Math.abs(d) + Math.abs(a), 1) + 1, cy = Hh / 2, sy = (Hh / 2 - 20) / ymax;
      function X(x) { return x0 + (x1 - x0) * x / span; } function Y(y) { return cy - y * sy; }
      var s = A(x0 - 10, cy, W - 4, cy, 'thin') + A(x0, Hh - 8, x0, 6, 'thin') + T(W - 6, cy - 6, 'x', 'end', 'small') + T(x0 - 4, cy + 13, 'O', 'end', 'small');
      ['π/2', 'π', '3π/2', '2π'].forEach(function (lb, i) { var x = X((i + 1) * Math.PI / 2); s += L(x, cy - 3, x, cy + 3, 'thin') + T(x, cy + 15, lb, 'middle', 'small'); });
      [d + Math.abs(a), d - Math.abs(a)].forEach(function (v) { s += L(x0, Y(v), x1, Y(v), 'thin dash') + T(x0 - 4, Y(v) + 4, v < 0 ? '−' + (-v) : v, 'end', 'small'); });
      var p = '';
      for (var k = 0; k <= 200; k++) { var x = span * k / 200; p += (k ? 'L' : 'M') + r1(X(x)) + ',' + r1(Y(a * Math.sin(b * x) + d)); }
      return svg(W, Hh, s + P(p, 'acc thick'));
    },
    // 樹狀圖（貝氏）：p1 = P(A)，p2 = P(B|A)，p3 = P(B|A')，標籤
    tree: function (lab, p1, p2, p3) {
      var s = '', ox = 20, oy = 110;
      s += L(ox, oy, 130, 50) + L(ox, oy, 130, 170) + T(60, 64, p1, 'middle', 'small') + T(60, 162, '', 'middle', 'small');
      s += T(136, 54, lab[0], 'start') + T(136, 174, lab[1], 'start');
      s += L(190, 50, 300, 20) + L(190, 50, 300, 80) + L(190, 170, 300, 140) + L(190, 170, 300, 200);
      s += T(242, 26, p2, 'middle', 'small') + T(242, 146, p3, 'middle', 'small');
      s += T(306, 24, lab[2], 'start', 'small') + T(306, 84, lab[3], 'start', 'small') + T(306, 144, lab[2], 'start', 'small') + T(306, 204, lab[3], 'start', 'small');
      return svg(360, 215, s);
    },
    // 地球與緯線
    globe: function (lat, label) {
      var cx = 150, cy = 120, R = 95, rr = (lat * Math.PI) / 180, y = cy - R * Math.sin(rr), hw = R * Math.cos(rr);
      var s = C(cx, cy, R, 'thick') + '<ellipse cx="' + cx + '" cy="' + cy + '" rx="' + R + '" ry="16" class="thin" fill="none" stroke="currentColor"/>' + T(cx + R + 6, cy + 4, '赤道', 'start', 'small');
      s += '<ellipse cx="' + cx + '" cy="' + r1(y) + '" rx="' + r1(hw) + '" ry="' + r1(16 * Math.cos(rr)) + '" class="acc thick" fill="none" stroke="currentColor"/>';
      s += L(cx, cy, cx + hw, y, 'dash') + L(cx, cy, cx + R, cy, 'dash') + T(cx + 26, cy - 6, lat + '°', 'start', 'small') + C(cx, cy, 2.5, 'dot') + T(cx - 6, cy + 14, 'O', 'end', 'small');
      s += C(cx, cy - R, 2.5, 'dot') + T(cx, cy - R - 6, 'N', 'middle', 'small') + T(cx - hw - 6, y - 4, label || ('北緯 ' + lat + '°'), 'end', 'small');
      return svg(300, 240, s);
    },
    // 三角形：三頂點標籤、邊長文字、角度文字
    tri: function (sides, angA) {
      // 以 A 在左下、B 在右下、C 在上的示意（不按比例）
      var s = P('M40,170 L280,170 L170,40 z', 'thick fill2');
      s += T(30, 184, 'A') + T(290, 184, 'B') + T(170, 30, 'C');
      s += T(160, 190, sides[0] || '', 'middle', 'small') + T(240, 100, sides[1] || '', 'start', 'small') + T(92, 100, sides[2] || '', 'end', 'small');
      if (angA) s += P('M70,170 A30,30 0 0 0 63,151', '') + T(82, 160, angA, 'start', 'small');
      return svg(320, 200, s);
    },
    // 方位圖：指北箭頭 + 河流方向箭頭
    compass: function (deg) {
      var cx = 150, cy = 110, r = 80, rad = (deg - 90) * Math.PI / 180;
      var s = A(40, 190, 40, 140) + T(40, 132, 'N', 'middle', 'small') + C(cx, cy, r, 'thin dash');
      s += A(cx - Math.cos(rad) * r * 0.9, cy - Math.sin(rad) * r * 0.9, cx + Math.cos(rad) * r * 0.9, cy + Math.sin(rad) * r * 0.9, 'acc thick2') + T(cx + 8, cy - 8, '水流', 'start', 'small');
      return svg(300, 210, s);
    }
  };
})();
