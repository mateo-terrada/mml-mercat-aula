/* ============================================================
   LA CARTERA · Motor
   Tres capas:
   1) Mercado: unos pocos factores por mes (riesgo país, tasa en pesos,
      inflación, dólar, mercado global). Cada año tiene un esqueleto
      escrito a mano; el azar (con semilla) solo cambia las magnitudes.
      Cada instrumento reacciona con la lógica del Aula.
   2) Situaciones: lo que dice cada cliente, según lo que pasó y lo que
      se decidió antes (están en el archivo del año).
   3) Memoria: las decisiones anteriores, que las situaciones consultan.
   Supuestos didácticos. No son proyecciones.
   ============================================================ */
window.CARTERA = (function () {
  "use strict";
  const C = {};
  const fmt = (n, d = 1) => Number(n).toLocaleString("es-AR", { minimumFractionDigits: d, maximumFractionDigits: d });
  const sg = (n, d = 1) => (n > 0 ? "+" : n < 0 ? "−" : "") + fmt(Math.abs(n), d);
  const A = (n, d = 1) => fmt(Math.abs(n), d);
  const usd = n => (n < 0 ? "−" : "") + "USD " + Math.abs(Math.round(n)).toLocaleString("es-AR");
  const usdS = n => (n > 0 ? "+" : "") + usd(n);
  const cls = n => n > 0.05 ? "up" : n < -0.05 ? "dn" : "nt";
  const clamp = (v, a = 0, b = 25) => Math.round(Math.max(a, Math.min(b, v)));
  const pct = (w, k) => (w && w[k]) || 0;
  const r1 = x => Math.round(x * 10) / 10;
  C.u = { fmt, sg, A, usd, usdS, cls, clamp, pct };

  /* ---------- Instrumentos ---------- */
  C.INS = {
    mm:      { n: "FCI Money Market USD", s: "Liquidez en dólares, sin riesgo de precio", c: "#9FB3A8", dur: 0, arg: 0, pesos: 0, accion: 0, unico: 0 },
    gd30:    { n: "GD30", s: "Soberano en dólares, corto · duration ≈ 1,7", c: "#D9A06A", dur: 1.7, arg: 1, pesos: 0, accion: 0, unico: 1 },
    on:      { n: "ON YPF 2031", s: "Obligación negociable en dólares · duration ≈ 3,5", c: "#7A8B5C", dur: 3.5, arg: 1, pesos: 0, accion: 0, unico: 1 },
    gd35:    { n: "GD35", s: "Soberano en dólares, largo · duration ≈ 6", c: "#C26A3A", dur: 6, arg: 1, pesos: 0, accion: 0, unico: 1 },
    lecap:   { n: "LECAP marzo 2027", s: "Letra en pesos a tasa fija", c: "#4D8A8E", dur: 0.25, arg: 1, pesos: 1, accion: 0, unico: 1 },
    caucion: { n: "Caución en pesos", s: "Préstamo de pesos de 1 a 7 días", c: "#A9C4C6", dur: 0, arg: 1, pesos: 1, accion: 0, unico: 0 },
    lecap2:  { n: "LECAP diciembre 2027", s: "Letra en pesos a tasa fija", c: "#2F6F75", dur: 0.4, arg: 1, pesos: 1, accion: 0, unico: 1 },
    cer:     { n: "Bono CER TZX28", s: "En pesos, ajusta por inflación · duration ≈ 1,2", c: "#8E5B78", dur: 1.2, arg: 1, pesos: 1, accion: 0, unico: 1 },
    spy:     { n: "CEDEAR SPY", s: "Las 500 empresas grandes de EE.UU.", c: "#B68A3D", dur: 0, arg: 0, pesos: 0, accion: 1, unico: 0 },
    nvda:    { n: "CEDEAR NVDA", s: "Una sola empresa: Nvidia", c: "#1F4D50", dur: 0, arg: 0, pesos: 0, accion: 1, unico: 1 }
  };
  const ORDEN = C.ORDEN = ["mm", "gd30", "on", "gd35", "lecap", "caucion", "lecap2", "cer", "spy", "nvda"];
  const DISP0 = ["mm", "gd30", "on", "gd35", "lecap", "spy", "nvda"];
  const DISP1 = ["mm", "gd30", "on", "gd35", "caucion", "lecap2", "cer", "spy", "nvda"];
  C.disp = i => i < 3 ? DISP0 : DISP1;

  /* ---------- Azar con semilla: misma semilla, mismo año ---------- */
  function mulberry(a) {
    return function () { a |= 0; a = a + 0x6D2B79F5 | 0; let t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
  }
  C.rng = (extra) => mulberry(C.S.seed * 9973 + extra);

  /* ---------- Capa 1: el mercado del mes ---------- */
  function rets(F, i) {
    const d = F.rp / 100, enUSD = p => ((1 + p / 100) / (1 + F.mep / 100) - 1) * 100;
    const pes = { caucion: 2.5, lecap: i <= 3 ? 2.5 - 0.3 * F.tasa : 2.5, lecap2: 2.6 - 0.4 * F.tasa, cer: F.inf + 0.5 - 0.6 * F.tasa };
    const o = { mm: 0.3, gd30: -1.7 * d + 0.8, gd35: -6 * d + 0.8, on: -3.5 * 0.5 * d + 0.6 + (F.onX || 0), spy: F.spx, nvda: F.nvda };
    Object.keys(pes).forEach(k => o[k] = enUSD(pes[k]));
    Object.keys(o).forEach(k => o[k] = r1(o[k]));
    return { ret: o, pes };
  }
  let cache = {};
  C.limpiarCache = () => { cache = {}; };
  C.X = function (i) {
    const key = C.S.seed + ":" + i; if (cache[key]) return cache[key];
    const M = C.MESES[i], r = mulberry(C.S.seed * 9973 + i * 131 + 7);
    const v = r() < 0.5 ? "A" : "B";
    const b = typeof M.base === "function" ? M.base(v) : M.base;
    const k = () => 0.85 + 0.3 * r();
    const F = { rp: Math.round(b.rp * k()), tasa: b.tasa, inf: b.inf, infEsp: b.infEsp, mep: r1(b.mep * k()), spx: r1(b.spx * k()),
      nvda: Math.round(b.nvda * k()) || Math.sign(b.nvda), onX: b.onX || 0 };
    const altF = Object.assign({}, F, typeof M.altF === "function" ? M.altF(v) : M.altF);
    const p = i ? C.X(i - 1).L : { rp: 857, mep: 1500, tasa: 30, nvda: 1, spy: 1 };
    const L = { rp: p.rp + F.rp, mep: Math.round(p.mep * (1 + F.mep / 100)), tasa: p.tasa + F.tasa, nvda: p.nvda * (1 + F.nvda / 100), spy: p.spy * (1 + F.spx / 100), prev: p };
    L.tir35 = 10 + (L.rp - 857) / 100; L.tir35prev = 10 + (p.rp - 857) / 100;
    const a = rets(F, i), al = rets(altF, i);
    return cache[key] = { i, M, v, F, altF, L, ret: a.ret, pes: a.pes, alt: al.ret };
  };

  C.tape = function (X) {
    const F = X.F, L = X.L;
    return [
      ["Riesgo país", L.rp + " pb", sg(F.rp, 0) + " pb", F.rp > 5 ? "dn" : F.rp < -5 ? "up" : "nt"],
      ["Tasa LECAP", "TNA " + fmt(L.tasa, L.tasa % 1 ? 1 : 0) + "%", F.tasa ? sg(F.tasa, F.tasa % 1 ? 1 : 0) + " p.p." : "sin cambios", F.tasa > 0 ? "dn" : F.tasa < 0 ? "up" : "nt"],
      ["Inflación " + X.M.infMes, fmt(F.inf) + "%", "esperaban " + fmt(F.infEsp) + "%", F.inf > F.infEsp ? "dn" : F.inf < F.infEsp ? "up" : "nt"],
      ["Dólar MEP", "$" + L.mep.toLocaleString("es-AR"), sg(F.mep) + "%", F.mep >= 3.5 ? "dn" : "nt"],
      ["S&P 500", "en dólares", sg(F.spx) + "%", cls(F.spx)]
    ];
  };

  /* Explicación de por qué se movió cada instrumento: la misma cuenta del Aula */
  C.why = function (k, X) {
    const F = X.F, R = X.ret, wx = X.M.whyX && X.M.whyX[k];
    if (wx) return typeof wx === "function" ? wx(X) : wx;
    const d = Math.abs(F.rp) / 100, sube = F.rp > 0, I = C.INS[k];
    const bono = (D, mov, carry, extra) => Math.abs(F.rp) < 12
      ? `El riesgo país casi no se movió (${sg(F.rp, 0)} pb): lo que ganó es, sobre todo, el interés del mes. Total: ${sg(R[k])}%.`
      : `El riesgo país ${sube ? "subió" : "bajó"} ${A(F.rp, 0)} puntos básicos${mov < 1 ? ", y a las empresas les pega más o menos la mitad" : ""}: su TIR ${sube ? "subió" : "bajó"} ≈ ${fmt(d * mov, 2)} p.p. Con duration ${fmt(D, D % 1 ? 1 : 0)}, el precio ${sube ? "cae" : "sube"} cerca de ${fmt(D, D % 1 ? 1 : 0)} × ${fmt(d * mov, 2)} ≈ ${fmt(D * d * mov)}%. Sumando el interés del mes (+${fmt(carry)}%), queda en ${sg(R[k])}%.${extra || ""}`;
    const enPesos = (txt) => `${txt} El MEP ${F.mep >= 0 ? "subió" : "bajó"} ${A(F.mep)}%: <strong>medido en dólares, ${sg(R[k])}%</strong>.`;
    switch (k) {
      case "mm": return "No tiene riesgo de precio: cobra su tasa (≈ 3,6% anual, 0,3% en el mes) pase lo que pase.";
      case "gd30": return bono(1.7, 1, 0.8);
      case "gd35": return bono(6, 1, 0.8, Math.abs(F.rp) >= 12 ? ` <strong>Ojo:</strong> ahora rinde ≈ ${fmt(X.L.tir35)}% de acá en adelante; antes rendía ≈ ${fmt(X.L.tir35prev)}%. ${sube ? "Lo que perdió de precio lo gana en rendimiento futuro." : "Lo que ya ganó de precio no lo vuelve a ganar."}` : "");
      case "on": return bono(3.5, 0.5, 0.6);
      case "lecap": return X.i === 3 ? enPesos(`Venció a principios de mes y cobró su valor final en pesos (≈ ${sg(X.pes.lecap)}%). Esos pesos pasan a caución hasta que decidas qué hacer.`)
        : enPesos(`En pesos ganó ≈ ${fmt(X.pes.lecap)}%${F.tasa > 0 ? " (su tasa, menos algo de precio porque subieron las tasas)" : F.tasa < 0 ? " (su tasa, más algo de precio porque bajaron las tasas)" : ""}.`);
      case "caucion": return enPesos("Rinde ≈ 30% anual: unos 2,5% en el mes, en pesos.");
      case "lecap2": return enPesos(`En pesos ganó ≈ ${fmt(X.pes.lecap2)}%${F.tasa > 0 ? " (su tasa, menos precio porque subieron las tasas)" : ""}.`);
      case "cer": return enPesos(`Cobró la inflación (${fmt(F.inf)}%) más su tasa real${F.tasa > 0 ? ", pero perdió algo de precio porque subieron las tasas" : ""}: en pesos, ≈ ${sg(X.pes.cer)}%.`) + " Protege de los precios, no del dólar.";
      case "spy": return `El S&P 500 ${F.spx >= 0 ? "subió" : "cayó"} ${A(F.spx)}%. Medido en dólares, el riesgo argentino no lo toca: depende de lo que pase afuera.`;
      case "nvda": return `Nvidia ${F.nvda >= 0 ? "subió" : "cayó"} ${A(F.nvda, 0)}% en el mes. Es una sola empresa: se mueve mucho más que el SPY, que tiene 500.`;
    }
    return "";
  };

  /* ---------- Capa 3: memoria (decisiones) y cuentas de cada cartera ---------- */
  C.dec = (i, c) => C.S.d[i][c.id];
  const held = C.held = (c, i) => i === 0 ? c.cart : (C.dec(i - 1, c).w || c.cart);
  const Rw = C.R = (w, ret) => ORDEN.reduce((s, k) => s + (ret[k] || 0) * pct(w, k) / 100, 0);
  const flujo = C.flujo = (c, i) => (C.MESES[i].flujo || {})[c.id] || 0;
  C.need = (c, i) => (C.MESES[i].need || {})[c.id] || 0;
  const montoAntes = C.montoAntes = (c, i) => i === 0 ? c.monto : montoDespues(c, i - 1);
  const montoDespues = C.montoDespues = (c, i) => montoAntes(c, i) * (1 + Rw(held(c, i), C.X(i).ret) / 100) + flujo(c, i);
  /* Retiro: sale primero del money market; si no alcanza, se venden los demás en proporción */
  C.retiro = function (c, i) {
    const h = held(c, i), M = C.MESES[i], X = C.X(i), m0 = montoAntes(c, i), f = -flujo(c, i);
    const amt = {}; ORDEN.forEach(k => amt[k] = m0 * pct(h, k) / 100 * (1 + (X.ret[k] || 0) / 100));
    if (M.vence) Object.entries(M.vence).forEach(([a, b]) => { amt[b] += amt[a]; amt[a] = 0; });
    const deMM = Math.min(amt.mm, f); amt.mm -= deMM; const resto = f - deMM;
    const otros = ORDEN.filter(k => k !== "mm" && amt[k] > 0), sumO = otros.reduce((s, k) => s + amt[k], 0);
    if (resto > 0 && sumO > 0) otros.forEach(k => amt[k] -= resto * amt[k] / sumO);
    return { amt, deMM, vendido: resto, total: f };
  };
  /* Cartera de partida para decidir: la del mes, después de vencimientos y retiros */
  C.base = function (c, i) {
    const M = C.MESES[i], h = held(c, i);
    if (!flujo(c, i) && !(M.vence && Object.keys(M.vence).some(k => pct(h, k)))) return h;
    const { amt } = C.retiro(c, i), tot = ORDEN.reduce((s, k) => s + amt[k], 0), w = {};
    ORDEN.forEach(k => { const v = Math.round(amt[k] / tot * 100); if (v > 0) w[k] = v; });
    const dif = 100 - ORDEN.reduce((s, k) => s + pct(w, k), 0);
    if (dif) { const big = ORDEN.reduce((a, k) => pct(w, k) > pct(w, a) ? k : a, ORDEN[0]); w[big] += dif; }
    return w;
  };
  C.rot = (c, i) => { const w = C.dec(i, c).w, b = C.base(c, i); return ORDEN.reduce((s, k) => s + Math.abs(pct(w, k) - pct(b, k)), 0) / 2; };
  C.acum = (c, i) => (C.MESES.slice(0, i + 1).reduce((x, _, j) => x * (1 + Rw(held(c, j), C.X(j).ret) / 100), 1) - 1) * 100;
  C.acumHer = (c, i) => (C.MESES.slice(0, i + 1).reduce((x, _, j) => x * (1 + Rw(c.cart, C.X(j).ret) / 100), 1) - 1) * 100;

  C.met = function (w, c, monto, needAbs) {
    const r = { tot: 0, sens: 0, acc: 0, arg: 0, pesos: 0, mm: pct(w, "mm"), max: 0, maxK: null, n: 0 };
    ORDEN.forEach(k => { const p = pct(w, k), I = C.INS[k]; r.tot += p; if (!p) return;
      r.sens += p / 100 * I.dur; r.acc += I.accion * p; r.arg += I.arg * p; r.pesos += I.pesos * p;
      if (p >= 5) r.n++; if (I.unico && p > r.max) { r.max = p; r.maxK = k; } });
    r.liqUSD = monto * r.mm / 100; r.needAbs = needAbs || 0; r.need = needAbs ? needAbs / monto * 100 : 0;
    return r;
  };

  /* ---------- Reglas de criterio por perfil (validadas por Teo) ---------- */
  C.REGLAS = {
    conservador(m) {
      let p = 25, t = "Riesgo acorde a una conservadora con 2 años de horizonte.";
      if (m.sens > 2.5) { p -= (m.sens - 2.5) * 9; t = `Si las tasas suben 1 p.p., la cartera pierde ≈ ${fmt(m.sens)}%. Es mucho para una conservadora.`; }
      else if (m.sens < 0.8 && m.acc === 0) { p = 19; t = "Muy defensiva: cuida el capital, pero con 2 años de horizonte podía tener algo de renta fija corta que rinda más."; }
      if (m.acc > 40) { p -= 8 + (m.acc - 40) * 0.8; t += ` Además, ${m.acc}% en renta variable: el techo para una conservadora es 40%.`; }
      let d = 25, td = "Repartida entre varios instrumentos, sin depender de uno solo.";
      if (m.max > 35) { d -= (m.max - 35) * 0.6; td = `${m.max}% en un solo emisor (${C.INS[m.maxK].n}).`; }
      if (m.n < 2) { d -= 15; td = "Todo en un único instrumento."; } else if (m.n < 3) { d -= 7; td = "Solo dos instrumentos."; }
      const ok = m.mm >= m.need - 0.01;
      let l, tl;
      if (!m.needAbs) { l = 25; tl = "Sin retiros previstos: no hace falta más liquidez que la que tiene."; }
      else { l = ok ? 25 : 25 * m.mm / m.need; tl = ok ? `Los ${usd(m.needAbs)} que va a retirar están separados, sin riesgo de precio.` : `Solo hay ${usd(m.liqUSD)} sin riesgo de precio para los ${usd(m.needAbs)} que va a retirar.`; }
      if (m.pesos > 0) { l -= Math.min(10, m.pesos * 0.5); tl = (m.needAbs ? tl + " " : "") + `Ella quiere cuidar dólares: el ${m.pesos}% en pesos la expone a una suba del dólar.`; }
      return { perfil: [clamp(p), t], div: [clamp(d), td], liq: [clamp(l), tl], needOk: ok, marzoOk: ok };
    },
    agresivo(m, w) {
      const nv = pct(w, "nvda");
      let p = 25, t = "Riesgo acorde a un agresivo de largo plazo.";
      if (m.acc < 30) { p -= (30 - m.acc) * 0.6; t = `Solo ${m.acc}% en acciones: poco para un agresivo con 5 años de horizonte.`; }
      const caja = m.mm + m.pesos; if (caja > 35) { p -= (caja - 35) * 0.4; t += ` ${caja}% en liquidez y pesos es mucho para alguien que no va a retirar.`; }
      let d = 25, td = "Diversificada: ninguna posición lo puede hundir sola.";
      if (nv > 15) { d -= (nv - 15) * 0.45; td = `${nv}% en una sola empresa: si NVDA cae 40%, la cartera pierde ${fmt(nv * 0.4, 0)}%.`; }
      if (m.maxK !== "nvda" && m.max > 45) { d -= (m.max - 45) * 0.4; td = `${m.max}% en un solo emisor (${C.INS[m.maxK].n}).`; }
      if (m.arg > 60) { d -= (m.arg - 60) * 0.4; td += ` ${m.arg}% con riesgo argentino: depende demasiado de un solo país.`; }
      if (m.n < 3) { d -= 8; td += " Pocos instrumentos."; }
      const cau = pct(w, "caucion");
      const liq = m.acc > 90 ? [20, "Sin ningún colchón: si necesita algo, tiene que vender acciones en el momento que sea."]
        : cau > 10 ? [18, `${cau}% en caución: está bien mientras se decide, pero es plata estacionada. Para 5 años de horizonte, hay que asignarla.`]
        : [25, "Sin retiros previstos: el plazo no condiciona la cartera."];
      return { perfil: [clamp(p), t], div: [clamp(d), td], liq, needOk: true };
    }
  };

  /* ---------- Evaluación de una decisión (sin mirar el futuro) ---------- */
  function shockDef(c, i) {
    const ret = Rw(held(c, i), C.X(i).ret), tol = c.regla === "conservador" ? -1.5 : -4;
    if (ret < tol) { const aviso = i > 0 && C.scMsg(c, i - 1) === 25, x = -Math.max(1, Math.round((tol - ret) * (aviso ? 0.8 : 2)));
      return [x, aviso ? "Un mes de pérdida, pero el mes pasado le habías explicado qué podía pasar." : "Una pérdida más grande de lo que esperaba, y sin que se la hubieras anticipado."]; }
    return ret > 1 ? [1, "Buen mes para su cartera."] : [0, "Mes sin sobresaltos."];
  }
  C.shock = function (c, i) { if (i === 0) return [0, ""]; const cfg = C.MESES[i][c.id]; return cfg.shock ? cfg.shock(C.X(i)) : shockDef(c, i); };
  C.confInicio = function (c, i) {
    if (i === 0) return c.conf;
    return Math.max(0, Math.min(100, C.evaluar(c, i - 1).conf + C.shock(c, i)[0]));
  };
  C.scMsg = function (c, i) { const ev = C.evaluar(c, i); return ev ? ev.com[0] : 0; };
  C.evaluar = function (c, i) {
    const e = C.dec(i, c); if (!e.w || !e.msg) return null;
    const X = C.X(i), cfg = C.MESES[i][c.id], w = e.w, m = C.met(w, c, montoDespues(c, i), C.need(c, i));
    const r = C.REGLAS[c.regla](m, w), msg = cfg.msgs(X)[+e.msg - 1];
    const inc = cfg.incoh ? cfg.incoh(e.msg, m, w, r, X) : null, com = inc ? [12, inc] : [msg.sc, msg.d];
    let key = cfg.key ? cfg.key(m, w, r, X, e.msg) : null;
    if (!key) { const peor = [r.perfil, r.div, r.liq].reduce((a, b) => b[0] < a[0] ? b : a);
      key = peor[0] < 20 ? peor[1] : com[0] < 20 ? com[1] : (typeof cfg.okKey === "function" ? cfg.okKey(m, w, r, X) : cfg.okKey); }
    let resp;
    if (typeof cfg.resp === "function") resp = cfg.resp(m, w, e.msg, r, X);
    else resp = inc ? "Mmm... me decís una cosa, pero lo que me proponés es otra. No me queda claro." : cfg.resp[com[0] >= 20 ? 0 : com[0] >= 10 ? 1 : 2];
    const c0 = C.confInicio(c, i), conf = Math.max(0, Math.min(100, c0 + (inc ? -4 : msg.conf) + (cfg.conf ? cfg.conf(m, w, r, X) : 0)));
    return { perfil: r.perfil, div: r.div, liq: r.liq, com, total: r.perfil[0] + r.div[0] + r.liq[0] + com[0], key, resp, conf, conf0: c0, m, r };
  };

  return C;
})();
