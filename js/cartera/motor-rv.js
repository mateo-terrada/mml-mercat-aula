/* ============================================================
   SIMULACIÓN DE RENTA VARIABLE · Motor
   Mismo esquema que el motor del Simulador de carteras (mismas
   funciones públicas, para que las pantallas sirvan para ambos),
   con otro universo: trece vehículos para repartir entre geografías
   y sectores, y reglas de criterio pensadas para acciones.
   Todo en dólares. Supuestos didácticos, no proyecciones.
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

  /* ---------- Instrumentos ----------
     beta: cuánto se mueve respecto del mercado global. acc: es renta variable.
     arg: cuánto de su riesgo es argentino (0 a 1). sec: sector. unico: una sola empresa. */
  C.INS = {
    mm:   { n: "FCI Money Market USD", s: "Liquidez en dólares, sin riesgo de precio", c: "#9FB3A8", beta: 0, acc: 0, arg: 0, sec: null, unico: 0 },
    on:   { n: "ON YPF 2031", s: "Obligación negociable en dólares · renta fija, duration ≈ 3,5", c: "#7A8B5C", beta: 0.1, acc: 0, arg: 1, sec: null, unico: 0 },
    spy:  { n: "CEDEAR SPY", s: "EE.UU. · las 500 empresas grandes", c: "#B68A3D", beta: 1, acc: 1, arg: 0, sec: null, unico: 0, geo: "us" },
    eur:  { n: "CEDEAR EZU", s: "Europa · empresas de la zona euro", c: "#4D8A8E", beta: 0.9, acc: 1, arg: 0, sec: null, unico: 0, geo: "eur" },
    eem:  { n: "CEDEAR EEM", s: "Emergentes · China, India, Brasil y otros", c: "#D9A06A", beta: 0.9, acc: 1, arg: 0, sec: null, unico: 0, geo: "em" },
    bra:  { n: "CEDEAR EWZ", s: "Brasil · un solo país, empresas de todos los sectores", c: "#6F9A4F", beta: 1.1, acc: 1, arg: 0, sec: null, unico: 0, geo: "bra" },
    msft: { n: "CEDEAR Microsoft (MSFT)", s: "EE.UU. · tecnología: software y nube, una sola empresa", c: "#1F4D50", beta: 1.15, acc: 1, arg: 0, sec: "Tecnología", unico: 1, geo: "us" },
    nvda: { n: "CEDEAR Nvidia (NVDA)", s: "EE.UU. · tecnología: chips para inteligencia artificial, una sola empresa", c: "#2C7A6B", beta: 1.6, acc: 1, arg: 0, sec: "Tecnología", unico: 1, geo: "us" },
    jpm:  { n: "CEDEAR JPMorgan (JPM)", s: "EE.UU. · el banco más grande del país, una sola empresa", c: "#8E5B78", beta: 1.1, acc: 1, arg: 0, sec: "Finanzas", unico: 1, geo: "us" },
    xom:  { n: "CEDEAR ExxonMobil (XOM)", s: "EE.UU. · petrolera global, una sola empresa", c: "#C26A3A", beta: 0.8, acc: 1, arg: 0, sec: "Energía", unico: 1, geo: "us" },
    jnj:  { n: "CEDEAR Johnson & Johnson (JNJ)", s: "EE.UU. · salud, una empresa defensiva", c: "#5C8A7B", beta: 0.6, acc: 1, arg: 0, sec: "Salud", unico: 1, geo: "us" },
    ypf:  { n: "Acción YPF", s: "Argentina · petrolera, una sola empresa", c: "#A8453A", beta: 1.1, acc: 1, arg: 1, sec: "Energía", unico: 1, geo: "arg" },
    ggal: { n: "Acción Galicia", s: "Argentina · banco, una sola empresa", c: "#7E332A", beta: 1.2, acc: 1, arg: 1, sec: "Finanzas", unico: 1, geo: "arg" },
    meli: { n: "CEDEAR MELI", s: "MercadoLibre · tecnología regional, una sola empresa", c: "#2F6F75", beta: 1.3, acc: 1, arg: 0.5, sec: "Tecnología", unico: 1, geo: "reg" }
  };
  const ORDEN = C.ORDEN = ["mm", "on", "spy", "eur", "eem", "bra", "msft", "nvda", "jpm", "xom", "jnj", "ypf", "ggal", "meli"];
  C.disp = () => ORDEN;

  /* ---------- Azar con semilla ---------- */
  function mulberry(a) {
    return function () { a |= 0; a = a + 0x6D2B79F5 | 0; let t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
  }
  C.rng = (extra) => mulberry(C.S.seed * 9973 + extra);

  /* ---------- Capa 1: el mercado del mes ----------
     Factores: mkt (mercado global), oil (petróleo), rp (riesgo país, pb), tech (extra de tecnología),
     fin (extra de bancos), eur / em (extra de Europa / emergentes), meli (extra de MercadoLibre), tn (tasa EE.UU., p.p.),
     id (movimiento propio de cada empresa o país, ±2,5 %; NVDA ±4 %). "nas" es el índice Nasdaq: se muestra, pero no se compra. */
  function rets(F) {
    const o = {
      mm: 0.3,
      on: -1.75 * F.rp / 100 + 0.6,
      spy: F.mkt,
      eur: 0.9 * F.mkt + F.eur,
      eem: 0.85 * F.mkt + F.em,
      bra: 0.9 * F.mkt + 1.2 * F.em + F.id.bra,
      msft: 1.1 * F.mkt + 0.8 * F.tech + F.id.msft,
      nvda: 1.5 * F.mkt + 1.2 * F.tech + F.id.nvda,
      jpm: 1.0 * F.mkt + F.fin + F.id.jpm,
      xom: 0.55 * F.mkt + 0.35 * F.oil + F.id.xom,
      jnj: 0.5 * F.mkt + F.id.jnj,
      ypf: 0.4 * F.mkt + 0.4 * F.oil - 0.05 * F.rp,
      ggal: 0.6 * F.mkt - 0.07 * F.rp,
      meli: 1.1 * F.mkt + 0.5 * F.tech + F.meli,
      nas: 1.25 * F.mkt + F.tech
    };
    Object.keys(o).forEach(k => o[k] = r1(o[k]));
    return o;
  }
  let cache = {};
  C.limpiarCache = () => { cache = {}; };
  C.X = function (i) {
    const key = C.S.seed + ":" + i; if (cache[key]) return cache[key];
    const M = C.MESES[i], r = mulberry(C.S.seed * 9973 + i * 131 + 7);
    const v = r() < 0.5 ? "A" : "B";
    const b = typeof M.base === "function" ? M.base(v) : M.base;
    const k = () => 0.85 + 0.3 * r();
    const jit = x => r1((x || 0) * k());
    const F = { mkt: jit(b.mkt), oil: jit(b.oil), rp: Math.round((b.rp || 0) * k()), tech: jit(b.tech), fin: jit(b.fin), eur: jit(b.eur), em: jit(b.em), meli: jit(b.meli), tn: b.tn || 0 };
    const idr = () => r1((r() - 0.5) * 5);
    F.id = { bra: idr(), msft: idr(), jpm: idr(), xom: idr(), jnj: idr() };
    F.id.nvda = r1((r() - 0.5) * 8);
    const altF = Object.assign({}, F, typeof M.altF === "function" ? M.altF(v) : M.altF);
    const p = i ? C.X(i - 1).L : { rp: 857, oil: 78, tn: 4.2 };
    const L = { rp: p.rp + F.rp, oil: Math.round(p.oil * (1 + F.oil / 100)), tn: r1(p.tn + F.tn), prev: p };
    return cache[key] = { i, M, v, F, altF, L, ret: rets(F), alt: rets(altF) };
  };

  C.tape = function (X) {
    const F = X.F, R = X.ret, L = X.L;
    return [
      ["S&P 500", "en dólares", sg(F.mkt) + "%", cls(F.mkt)],
      ["Nasdaq 100", "tecnología", sg(R.nas) + "%", cls(R.nas)],
      ["Petróleo (Brent)", "USD " + L.oil, sg(F.oil) + "%", cls(F.oil)],
      ["Riesgo país", L.rp + " pb", sg(F.rp, 0) + " pb", F.rp > 5 ? "dn" : F.rp < -5 ? "up" : "nt"],
      ["Tasa a 10 años EE.UU.", fmt(L.tn) + "%", F.tn ? sg(F.tn) + " p.p." : "sin cambios", F.tn > 0.05 ? "dn" : F.tn < -0.05 ? "up" : "nt"]
    ];
  };

  /* Explicación de por qué se movió cada vehículo, con la cuenta a la vista */
  C.why = function (k, X) {
    const F = X.F, R = X.ret, wx = X.M.whyX && X.M.whyX[k];
    if (wx) return typeof wx === "function" ? wx(X) : wx;
    const s = x => x >= 0 ? "subió" : "cayó", e = (x, d = 1) => (x >= 0 ? "+" : "−") + fmt(Math.abs(x), d);
    switch (k) {
      case "mm": return "No tiene riesgo de precio: cobra su tasa (≈ 3,6% anual, 0,3% en el mes) pase lo que pase.";
      case "on": return Math.abs(F.rp) < 12 ? `El riesgo país casi no se movió (${sg(F.rp, 0)} pb): lo que ganó es, sobre todo, el interés del mes. Total: ${sg(R.on)}%.`
        : `El riesgo país ${F.rp > 0 ? "subió" : "bajó"} ${A(F.rp, 0)} puntos básicos y a una empresa le pega más o menos la mitad: su TIR ${F.rp > 0 ? "subió" : "bajó"} ≈ ${fmt(Math.abs(F.rp) / 200, 2)} p.p. Con duration 3,5, el precio ${F.rp > 0 ? "cae" : "sube"} cerca de ${fmt(3.5 * Math.abs(F.rp) / 200)}%. Con el interés del mes, ${sg(R.on)}%.`;
      case "spy": return `El S&P 500 ${s(F.mkt)} ${A(F.mkt)}%. Son las 500 empresas grandes de EE.UU.: el riesgo argentino no lo toca.`;
      case "eur": return `Acompaña al mercado global (${e(0.9 * F.mkt)}%)${F.eur ? ` y suma ${e(F.eur)}% propio de Europa este mes` : ""}. Total: ${sg(R.eur)}%.`;
      case "eem": return `Acompaña al mercado global (${e(0.85 * F.mkt)}%)${F.em ? ` y suma ${e(F.em)}% propio de los emergentes` : ""}. Total: ${sg(R.eem)}%.`;
      case "bra": return `Es un solo país y se mueve más que el bloque de emergentes: el mercado ${e(0.9 * F.mkt)}%${F.em ? `, más ${e(1.2 * F.em)}% por el ánimo hacia los emergentes (pesa 1,2 veces)` : ""}, más ${e(F.id.bra)}% propio de Brasil. Total: ${sg(R.bra)}%.`;
      case "msft": return `Es una sola empresa de tecnología: el mercado ${e(F.mkt)}% × 1,1 = ${e(1.1 * F.mkt)}%${F.tech ? `, más el ${e(0.8 * F.tech)}% que le toca del movimiento del sector` : ""}${F.tn > 0.05 ? ", con las tasas de EE.UU. subiendo, que pesan sobre las empresas de crecimiento" : F.tn < -0.05 ? ", con las tasas de EE.UU. bajando, que las favorece" : ""}, más ${e(F.id.msft)}% propio de la empresa. Total: ${sg(R.msft)}%.`;
      case "nvda": return `Es la empresa de chips de la inteligencia artificial y se mueve mucho más que el mercado: ${e(F.mkt)}% × 1,5 = ${e(1.5 * F.mkt)}%${F.tech ? `, más ${e(1.2 * F.tech)}% del movimiento de la tecnología (pesa 1,2 veces)` : ""}, más ${e(F.id.nvda)}% propio de la empresa. Total: ${sg(R.nvda)}%. Gana mucho en los buenos meses y pierde mucho en los malos.`;
      case "jpm": return `Un banco acompaña al mercado (${e(F.mkt)}%)${F.fin ? ` y este mes sumó ${e(F.fin)}% por el movimiento de tasas y morosidad del sector` : ""}, más ${e(F.id.jpm)}% propio de la empresa. Total: ${sg(R.jpm)}%.`;
      case "xom": return `Mezcla mercado y petróleo. El mercado ${e(F.mkt)}% × 0,55 y el petróleo ${e(F.oil)}% × 0,35 dan ${e(0.55 * F.mkt + 0.35 * F.oil)}%, más ${e(F.id.xom)}% propio de la empresa. Total: ${sg(R.xom)}%. Con el crudo en USD ${X.L.oil}. Como es una petrolera de EE.UU., no depende del riesgo país.`;
      case "jnj": return `Es una empresa defensiva: se mueve ≈ 0,5 veces el mercado. ${e(F.mkt)}% × 0,5 = ${e(0.5 * F.mkt)}%, más ${e(F.id.jnj)}% propio de la empresa. Total: ${sg(R.jnj)}%. Cae menos en las malas y sube menos en las buenas.`;
      case "ypf": return `Tres fuerzas: el mercado (${e(0.4 * F.mkt)}%), el petróleo (${e(0.4 * F.oil)}%) y el riesgo país, que ${F.rp > 0 ? "subió" : "bajó"} ${A(F.rp, 0)} pb (${e(-0.05 * F.rp)}%). Total: ${sg(R.ypf)}%. Una acción argentina depende del petróleo y de Argentina a la vez.`;
      case "ggal": return `El mercado (${e(0.6 * F.mkt)}%) y, sobre todo, el riesgo país: ${F.rp > 0 ? "subió" : "bajó"} ${A(F.rp, 0)} pb y a un banco argentino le pega fuerte (${e(-0.07 * F.rp)}%). Total: ${sg(R.ggal)}%.`;
      case "meli": return `Es una sola empresa y se mueve más que el mercado: ${e(F.mkt)}% × 1,1 = ${e(1.1 * F.mkt)}%${F.tech ? `, más la mitad del movimiento de la tecnología (${e(0.5 * F.tech)}%)` : ""}${F.meli ? `, más ${e(F.meli)}% propio de la empresa` : ""}. Total: ${sg(R.meli)}%.`;
    }
    return "";
  };

  /* ---------- Capa 3: memoria y cuentas de cada cartera ---------- */
  C.dec = (i, c) => C.S.d[i][c.id];
  const held = C.held = (c, i) => i === 0 ? c.cart : (C.dec(i - 1, c).w || c.cart);
  const Rw = C.R = (w, ret) => ORDEN.reduce((s, k) => s + (ret[k] || 0) * pct(w, k) / 100, 0);
  const flujo = C.flujo = (c, i) => (C.MESES[i].flujo || {})[c.id] || 0;
  C.need = (c, i) => (C.MESES[i].need || {})[c.id] || 0;
  const montoAntes = C.montoAntes = (c, i) => i === 0 ? c.monto : montoDespues(c, i - 1);
  const montoDespues = C.montoDespues = (c, i) => montoAntes(c, i) * (1 + Rw(held(c, i), C.X(i).ret) / 100) + flujo(c, i);
  /* Retiro: sale primero del money market; si no alcanza, se vende el resto en proporción */
  C.retiro = function (c, i) {
    const h = held(c, i), X = C.X(i), m0 = montoAntes(c, i), f = -flujo(c, i);
    const amt = {}; ORDEN.forEach(k => amt[k] = m0 * pct(h, k) / 100 * (1 + (X.ret[k] || 0) / 100));
    const deMM = Math.min(amt.mm, f); amt.mm -= deMM; const resto = f - deMM;
    const otros = ORDEN.filter(k => k !== "mm" && amt[k] > 0), sumO = otros.reduce((s, k) => s + amt[k], 0);
    if (resto > 0 && sumO > 0) otros.forEach(k => amt[k] -= resto * amt[k] / sumO);
    return { amt, deMM, vendido: resto, total: f };
  };
  C.base = function (c, i) {
    const h = held(c, i);
    if (!flujo(c, i)) return h;
    const { amt } = C.retiro(c, i), tot = ORDEN.reduce((s, k) => s + amt[k], 0), w = {};
    ORDEN.forEach(k => { const v = Math.round(amt[k] / tot * 100); if (v > 0) w[k] = v; });
    const dif = 100 - ORDEN.reduce((s, k) => s + pct(w, k), 0);
    if (dif) { const big = ORDEN.reduce((a, k) => pct(w, k) > pct(w, a) ? k : a, ORDEN[0]); w[big] += dif; }
    return w;
  };
  C.rot = (c, i) => { const w = C.dec(i, c).w, b = C.base(c, i); return ORDEN.reduce((s, k) => s + Math.abs(pct(w, k) - pct(b, k)), 0) / 2; };
  const camino = (c, i, wf) => { let x = 1; const p = [1]; for (let j = 0; j <= i; j++) { x *= 1 + Rw(wf(j), C.X(j).ret) / 100; p.push(x); } return p; };
  C.acum = (c, i) => (camino(c, i, j => held(c, j))[i + 1] - 1) * 100;
  C.acumHer = (c, i) => (camino(c, i, () => c.cart)[i + 1] - 1) * 100;
  C.acumRef = (c, i) => (camino(c, i, () => c.ref)[i + 1] - 1) * 100;
  const caidaDe = p => { let pico = p[0], peor = 0; p.forEach(v => { pico = Math.max(pico, v); peor = Math.min(peor, (v / pico - 1) * 100); }); return peor; };
  C.caidaMax = (c, i) => caidaDe(camino(c, i, j => held(c, j)));
  C.caidaMaxRef = (c, i) => caidaDe(camino(c, i, () => c.ref));

  /* Métricas de una cartera: lo que ven y lo que evalúan las reglas */
  C.met = function (w, c, monto, needAbs) {
    const r = { tot: 0, beta: 0, acc: 0, arg: 0, mm: pct(w, "mm"), max: 0, maxK: null, n: 0, sec: {}, secMax: 0, secK: null, us: 0, eur: 0, em: 0, argAcc: 0, sens: 0 };
    ORDEN.forEach(k => { const p = pct(w, k), I = C.INS[k]; r.tot += p; if (!p) return;
      r.beta += p / 100 * I.beta; r.acc += I.acc * p; r.arg += I.arg * p; if (I.geo === "arg") r.argAcc += p; if (p >= 5) r.n++;
      if (I.unico && p > r.max) { r.max = p; r.maxK = k; }
      if (I.sec) r.sec[I.sec] = (r.sec[I.sec] || 0) + p;
      if (I.geo === "us") r.us += p; if (I.geo === "eur") r.eur += p; if (I.geo === "em") r.em += p; });
    Object.entries(r.sec).forEach(([s, v]) => { if (v > r.secMax) { r.secMax = v; r.secK = s; } });
    r.liqUSD = monto * r.mm / 100; r.needAbs = needAbs || 0; r.need = needAbs ? needAbs / monto * 100 : 0;
    r.pesos = 0;
    return r;
  };

  /* ---------- Reglas de criterio por perfil ---------- */
  const nombre = k => C.INS[k].n;
  C.REGLAS = {
    /* Moderada: vive de su jubilación y ahorros. Tope de renta variable, caídas chicas, poca concentración. */
    conservador(m) {
      let p = 25, t = "Riesgo acorde a una jubilada: poca renta variable y caídas chicas.";
      if (m.beta > 0.4) { p -= (m.beta - 0.4) * 45; t = `Si el mercado cae 20%, esta cartera cae ≈ ${fmt(m.beta * 20, 0)}%. Es más de lo que le corresponde a una jubilada.`; }
      else if (m.acc < 10) { p = 19; t = "Muy defensiva: casi todo en renta fija y liquidez. Cuida el capital, pero con un horizonte de 15 años podía tener algo de acciones."; }
      if (m.acc > 40) { p -= 8 + (m.acc - 40) * 0.8; t += ` Además, ${m.acc}% en renta variable: el techo para este perfil es 40%.`; }
      let d = 25, td = "Repartida entre varios vehículos, sin depender de una empresa, un sector o un país.";
      if (m.max > 10) { d -= (m.max - 10) * 1.1; td = `${m.max}% en una sola empresa (${nombre(m.maxK)}): para este perfil, ninguna debería pasar del 10%.`; }
      if (m.secMax > 30) { d -= (m.secMax - 30) * 0.6; td += ` ${m.secMax}% en el sector ${m.secK.toLowerCase()}: demasiado para repartir.`; }
      if (m.arg > 25) { d -= (m.arg - 25) * 0.5; td += ` ${fmt(m.arg, 0)}% con riesgo argentino: todo depende de una sola economía.`; }
      if (m.n < 3) { d -= 8; td += " Pocos vehículos."; }
      let l, tl;
      if (!m.needAbs) { l = m.mm >= 10 ? 25 : 25 - (10 - m.mm) * 1.2; tl = m.mm >= 10 ? "Tiene un colchón de liquidez para imprevistos." : "Sin colchón: si hay un imprevisto, tiene que vender acciones en el momento que sea."; }
      else { const ok = m.mm >= m.need - 0.01; l = ok ? 25 : 25 * m.mm / m.need; tl = ok ? `Los ${usd(m.needAbs)} que va a retirar están separados, sin riesgo de precio.` : `Solo hay ${usd(m.liqUSD)} sin riesgo de precio para los ${usd(m.needAbs)} que va a retirar.`; }
      return { perfil: [clamp(p), t], div: [clamp(d), td], liq: [clamp(l), tl], needOk: !m.needAbs || m.mm >= m.need - 0.01 };
    },
    /* Agresivo: horizonte largo, no retira. Quiere crecer, pero sin apostar todo a una cosa. */
    agresivo(m) {
      let p = 25, t = "Riesgo acorde a un perfil de crecimiento con horizonte largo.";
      if (m.acc < 70) { p -= (70 - m.acc) * 0.55; t = `Solo ${m.acc}% en acciones: poco para alguien con 25 años de horizonte que no va a retirar.`; }
      const caja = m.mm; if (caja > 25) { p -= (caja - 25) * 0.4; t += ` ${caja}% en liquidez es mucho para quien no necesita la plata.`; }
      if (m.beta > 1.35) { p -= (m.beta - 1.35) * 30; t = `Beta ${fmt(m.beta, 2)}: si el mercado cae 30%, la cartera cae ≈ ${fmt(m.beta * 30, 0)}%. Es agresivo con razón, pero es mucho incluso para él.`; }
      let d = 25, td = "Bien repartida: ninguna posición ni sector lo puede hundir solo.";
      if (m.max > 15) { d -= (m.max - 15) * 0.6; td = `${m.max}% en una sola empresa (${nombre(m.maxK)}): si cae 40%, la cartera pierde ${fmt(m.max * 0.4, 0)}%.`; }
      if (m.secMax > 40) { d -= (m.secMax - 40) * 0.5; td += ` ${m.secMax}% en el sector ${m.secK.toLowerCase()}: si el sector sufre, sufre todo.`; }
      if (m.arg > 30) { d -= (m.arg - 30) * 0.4; td += ` ${fmt(m.arg, 0)}% con riesgo argentino.`; }
      if (m.us > 80) { d -= (m.us - 80) * 0.4; td += ` ${m.us}% en EE.UU.: nada del resto del mundo.`; }
      if (m.n < 4) { d -= 8; td += " Pocos vehículos."; }
      const l = m.mm < 3 ? [22, "Sin ningún colchón: aunque no retire, conviene tener algo para aprovechar caídas."] : [25, "Sin retiros previstos: el plazo no condiciona la cartera."];
      return { perfil: [clamp(p), t], div: [clamp(d), td], liq: l, needOk: true };
    }
  };

  /* ---------- Evaluación de una decisión (sin mirar el futuro) ---------- */
  function shockDef(c, i) {
    const ret = Rw(held(c, i), C.X(i).ret), tol = c.regla === "conservador" ? -1.5 : -7;
    if (ret < tol) { const aviso = i > 0 && C.scMsg(c, i - 1) === 25, x = -Math.max(1, Math.round((tol - ret) * (aviso ? 0.8 : 1.6)));
      return [x, aviso ? "Un mes de pérdida, pero el mes pasado le habías explicado qué podía pasar." : "Una pérdida más grande de lo que esperaba, y sin que se la hubieras anticipado."]; }
    return ret > 1.5 ? [1, "Buen mes para su cartera."] : [0, "Mes sin sobresaltos."];
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
