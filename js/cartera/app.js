/* ============================================================
   LA CARTERA · Pantallas, guardado y eventos
   La partida se guarda en este navegador (localStorage) después de
   cada cambio, para poder cortar y retomar.
   ============================================================ */
(function () {
  "use strict";
  const C = window.CARTERA, { fmt, sg, A, usd, usdS, cls, pct } = C.u;
  const $ = s => document.querySelector(s);
  /* Configuración de la simulación (cada paquete puede definir C.CFG; si no, valen estos textos) */
  const DEF = {
    clave: "elEscritorio_cartera_v1", titulo: "Simulador de carteras", etiqueta: "Año 1", periodo: "Diciembre 2026 a noviembre 2027",
    h1: "Doce meses, dos clientes, un mercado que no sabés para dónde va",
    lead: "Empezás a atender dos cuentas que te pasó un colega que dejó la sociedad. Cada mes llegan noticias, el mercado se mueve y tus clientes reaccionan. Vos proponés; ellos confirman.",
    nLiq: "Plazo, liquidez y moneda",
    metricas: (m0, m) => [["Si las tasas suben 1 p.p., pierde", "≈ " + fmt(m0.sens) + "%", "≈ " + fmt(m.sens) + "%"], ["En acciones", m0.acc + "%", m.acc + "%"],
      ["Con riesgo argentino", m0.arg + "%", m.arg + "%"], ["En pesos", m0.pesos + "%", m.pesos + "%"],
      ["Liquidez sin riesgo de precio", usd(m0.liqUSD), usd(m.liqUSD)], ["Posición más grande (un emisor)", m0.max + "%", m.max + "%"]],
    temas: [["perfil", "Encaje con el perfil", "perfil", "02 · Perfil, riesgo y carteras"], ["div", "Diversificación", "perfil", "02 · Perfil, riesgo y carteras"],
      ["liq", "Plazo, liquidez y moneda", "criterio", "09 · Integración y criterio"], ["com", "Comunicación", "criterio", "09 · Integración y criterio"]],
    extraFinal: () => ""
  };
  const K = Object.assign({}, DEF, C.CFG || {});
  const CLAVE = K.clave;
  document.title = K.titulo + " · El Escritorio";
  { const b = document.querySelector(".brand"); if (b) b.innerHTML = `<small>El Escritorio</small>${K.titulo}`; }
  const CL = () => [C.CLI.g, C.CLI.m];
  const N = C.MESES.length;

  /* ---------- Estado y guardado ---------- */
  const semillaNueva = () => 1 + Math.floor(Math.random() * 99999);
  const nuevo = seed => ({ v: 1, seed: seed || semillaNueva(), paso: 0, d: Array.from({ length: N }, () => ({ g: {}, m: {} })) });
  function cargar() {
    try { const s = JSON.parse(localStorage.getItem(CLAVE)); if (s && s.v === 1 && Array.isArray(s.d) && s.d.length === N) return s; } catch (e) { /* sin partida guardada */ }
    return null;
  }
  function guardar() {
    try { C.S.resumen = resumen(); localStorage.setItem(CLAVE, JSON.stringify(C.S)); } catch (e) { /* modo privado: sigue en memoria */ }
  }
  C.S = cargar() || nuevo();

  /* ---------- Flujo de pantallas ---------- */
  const FLUJO = [{ t: "Tus clientes", mes: 0, v: vIntro }];
  C.MESES.forEach((_, i) => FLUJO.push(
    { t: "El titular", mes: i, v: vTitular },
    { t: "Su cartera", mes: i, c: "g", v: vCartera }, { t: "Te escribe", mes: i, c: "g", v: vDecision }, { t: "Cómo cerró", mes: i, c: "g", v: vRespuesta },
    { t: "Su cartera", mes: i, c: "m", v: vCartera }, { t: "Te escribe", mes: i, c: "m", v: vDecision }, { t: "Cómo cerró", mes: i, c: "m", v: vRespuesta },
    { t: "Cierre del mes", mes: i, v: vCierre }));
  FLUJO.push({ t: "Repaso del año", mes: N - 1, v: vFinal });
  if (!(C.S.paso >= 0 && C.S.paso < FLUJO.length)) C.S.paso = 0;
  const actual = () => FLUJO[C.S.paso];
  const decididoHasta = () => { let n = -1; for (let i = 0; i < N; i++) { if (CL().every(c => C.evaluar(c, i))) n = i; else break; } return n; };

  /* ---------- Piezas ---------- */
  function torta(w, size = 104) {
    const Rr = 15.9155, partes = C.ORDEN.filter(k => pct(w, k) > 0), tot = partes.reduce((s, k) => s + w[k], 0) || 1; let acc = 0;
    const arcs = partes.map(k => { const p = w[k] / tot * 100, a = `<circle r="${Rr}" cx="21" cy="21" fill="none" stroke="${C.INS[k].c}" stroke-width="7" stroke-dasharray="${p} ${100 - p}" stroke-dashoffset="${25 - acc}"/>`; acc += p; return a; }).join("");
    return `<svg width="${size}" height="${size}" viewBox="0 0 42 42" role="img" aria-label="Composición de la cartera"><circle r="${Rr}" cx="21" cy="21" fill="none" stroke="#EFEADC" stroke-width="7"/>${arcs}</svg>`;
  }
  const leyenda = w => `<ul class="legend">${C.ORDEN.filter(k => pct(w, k) > 0).map(k => `<li><i style="background:${C.INS[k].c}"></i><span>${C.INS[k].n}</span><b>${w[k]}%</b></li>`).join("")}</ul>`;
  const cabecera = c => `<div class="client"><div class="avatar" style="background:${c.color}">${c.ini}</div><div><h2>${c.nombre}, ${c.edad}</h2><p>${c.det}</p></div></div>
      <div class="tags"><span class="tag prof">Perfil ${c.perfil.toLowerCase()}</span>${c.tags.map(t => `<span class="tag">${t}</span>`).join("")}</div>`;
  const numCli = c => c.id === "g" ? 1 : 2;

  /* ---------- Pantallas ---------- */
  function vIntro() {
    const card = c => `<div class="panel">${cabecera(c)}
      <blockquote class="meet">${c.cita}</blockquote>
      <div class="pie">${torta(c.cart)}${leyenda(c.cart)}</div>
      <p class="hint" style="margin:10px 0 0">Cartera heredada del asesor anterior · ${usd(c.monto)}</p></div>`;
    return `<div class="hero"><span class="eyebrow">${K.etiqueta} · ${K.periodo}</span>
      <h1>${K.h1}</h1>
      <p class="lead">${K.lead}</p></div>
      <div class="rules">
        <div class="rule"><h4>Un turno es un mes</h4><p>Leés lo que pasó, mirás cómo le pegó a cada cartera, atendés a cada cliente y proponés cambios si hacen falta. Son unos 5 minutos por mes; la partida se guarda sola.</p></div>
        <div class="rule"><h4>Dos marcadores</h4><p><b>Resultado:</b> cuánto ganaron o perdieron. Depende en parte de la suerte. <b>Criterio:</b> si cada decisión tenía sentido para ese cliente en el momento de tomarla. Es el que importa.</p></div>
        <div class="rule"><h4>La confianza</h4><p>Cada cliente confía más o menos en vos según cómo lo tratás. No siempre coincide con el criterio: a veces lo correcto no es lo que el cliente quiere escuchar.</p></div>
      </div>
      <h3 class="qh">Tus clientes</h3><p class="qs">Lo que te contaron en la primera reunión.</p>
      <div class="two" style="margin-top:6px">${CL().map(card).join("")}</div>
      <p class="note">Simulación con fines de estudio. Arranca de la foto de mercado de noviembre de 2026; lo que sigue es ficticio y cambia un poco en cada partida. No es una proyección ni una recomendación.</p>`;
  }

  function vTitular(i) {
    const X = C.X(i), T = X.M.titular(X);
    return `<span class="eyebrow">Lo que pasó en ${X.M.corto}</span>
      <article class="paper"><span class="kick">${T.kick}</span><h1>${T.h}</h1><p>${T.p}</p>
        <div class="also">${T.also.map(([b, t]) => `<div><b>${b}</b>${t}</div>`).join("")}</div></article>
      <div class="panel" style="margin-top:22px"><h3 style="font-size:20px">¿Cómo llega este titular a una cartera?</h3>
        <p class="hint" style="margin:4px 0 0">El mismo camino del mapa de transmisión del módulo 08.</p>
        <div class="chain">${T.chain.map(x => `<span>${x}</span>`).join("<i>→</i>")}</div></div>
      <p class="lead" style="margin-top:26px">${i === 0 ? "Mismo titular, mismo mercado. Veamos qué le hizo a cada uno." : `El mercado se movió sobre las carteras que dejaste en ${C.MESES[i - 1].corto}. Veamos cómo les fue.`}</p>`;
  }

  function lado(c, i, conf, w) {
    const f = [["En la cuenta", usd(C.montoDespues(c, i))]], nd = C.need(c, i);
    if (nd) f.push(["Va a retirar", usd(nd) + " " + C.MESES[i].needTxt]);
    for (let j = 0; j <= i; j++) if (C.flujo(c, j)) f.push(["Retiró en " + C.MESES[j].corto, usd(-C.flujo(c, j)) + " (" + C.MESES[j].motivo + ")"]);
    c.facts.forEach(x => f.push(x));
    return `${cabecera(c)}
      <ul class="facts">${f.map(([a, b]) => `<li><span>${a}</span><b>${b}</b></li>`).join("")}</ul>
      <div class="pie">${torta(w, 96)}${leyenda(w)}</div>
      <div class="meter"><div class="meter-h"><span>Confianza en vos</span><b>${conf}/100</b></div><div class="meter-t"><i style="width:${conf}%"></i></div></div>`;
  }

  function contrafactico(c, i) {
    const X = C.X(i), cf = X.M.cf, mia = C.held(c, i), her = c.cart, iguales = C.ORDEN.every(k => pct(mia, k) === pct(her, k));
    const fila = (n, w, mine) => { const a = C.R(w, X.ret), b = C.R(w, X.alt); return `<tr class="${mine ? "mine" : ""}"><td>${n}</td><td class="n ${cls(a)}">${sg(a)}%</td><td class="n ${cls(b)}">${sg(b)}%</td></tr>`; };
    return `<div class="cf"><h4>Lo que pasó y lo que podía pasar</h4><p>${cf.p}</p>
      <table><thead><tr><th>Cartera durante ${X.M.corto}</th><th class="n">${cf.a(X)}<small>(lo que pasó)</small></th><th class="n">${cf.b(X)}<small>(lo que podía pasar)</small></th></tr></thead>
      <tbody>${iguales ? fila("La heredada (nunca la tocaste)", her, true) : fila("La que dejaste en " + C.MESES[i - 1].corto, mia, true) + fila("La heredada, sin tocar nunca", her, false)}</tbody></table></div>`;
  }

  function bloqueRetiro(c, i) {
    const r = C.retiro(c, i), mot = C.MESES[i].motivo;
    return `<div class="callout teal"><b>Retiro de ${usd(r.total)} para ${mot}.</b><br>${r.vendido < 1
      ? "Sale entero del money market: no hace falta vender nada. Para eso estaba separado."
      : `En el money market había ${usd(r.deMM)}. Los ${usd(r.vendido)} que faltan salen de vender el resto al precio de esta semana: no lo elegiste vos.`}
      <br><span class="hint">La propuesta de este mes se arma sobre lo que queda: ${usd(C.montoDespues(c, i))}.</span></div>`;
  }

  function vCartera(i, c) {
    const X = C.X(i), cfg = X.M[c.id], w = C.held(c, i), r = C.R(w, X.ret), m0 = C.montoAntes(c, i);
    const filas = C.ORDEN.filter(k => pct(w, k)).map(k => { const p = w[k], v = X.ret[k], a = v * p / 100;
      return `<tr><td class="inst"><b><i style="background:${C.INS[k].c}"></i>${C.INS[k].n}</b><small>${C.INS[k].s}</small>
        <button type="button" class="whybtn" data-why>¿Por qué se movió?</button><div class="why">${C.why(k, X)}</div></td>
        <td class="n">${p}%</td><td class="n ${cls(v)}">${sg(v)}%</td><td class="n ${cls(a)}">${sg(a, 2)}%</td></tr>`; }).join("");
    let shock = "";
    if (i > 0) { const s = C.shock(c, i), c0 = C.evaluar(c, i - 1).conf, c1 = C.confInicio(c, i);
      shock = `<div class="shock">Confianza: <b>${c0} → ${c1}</b> · ${s[1]}</div>`; }
    return `<span class="eyebrow">Cliente ${numCli(c)} de 2 · Qué le pasó en ${X.M.corto}</span>
      <div class="grid2"><div class="panel">
        <table><thead><tr><th>${i ? "La cartera que dejaste en " + C.MESES[i - 1].corto : "Cartera heredada"}</th><th class="n">Peso</th><th class="n">Mes</th><th class="n">Aporte</th></tr></thead><tbody>${filas}</tbody>
        <tfoot><tr><td>Total <span class="hint" style="font-weight:400">· medido en dólares</span></td><td></td><td></td><td class="n ${cls(r)}">${sg(r)}%<br><span class="hint">${usdS(m0 * r / 100)}</span></td></tr></tfoot></table>
        ${C.flujo(c, i) ? bloqueRetiro(c, i) : ""}${cfg.nota(X)}${i > 0 ? contrafactico(c, i) : ""}</div>
      <aside class="panel">${lado(c, i, C.confInicio(c, i), w)}${shock}</aside></div>`;
  }

  function filaArmado(i, c, k) {
    const v = pct(C.dec(i, c).w, k), orig = pct(C.base(c, i), k), d = v - orig, I = C.INS[k];
    return `<tr data-row="${k}"><td class="inst"><b><i style="background:${I.c}"></i>${I.n}</b><small>${I.s}</small></td>
      <td class="was">${orig ? orig + "%" : "—"}</td>
      <td style="width:26%"><div class="track"><i style="width:${v}%;background:${I.c}"></i>${orig ? `<em style="left:${orig}%"></em>` : ""}</div></td>
      <td class="n"><div class="stepper"><button type="button" data-d="-5" data-k="${k}" aria-label="Bajar 5%">−</button><input type="number" min="0" max="100" step="5" value="${v}" data-in="${k}" aria-label="Porcentaje en ${I.n}"><button type="button" data-d="5" data-k="${k}" aria-label="Subir 5%">+</button></div></td>
      <td class="chg ${d > 0 ? "up" : d < 0 ? "dn" : "nt"}" style="width:56px;text-align:right">${d ? (d > 0 ? "+" : "−") + Math.abs(d) : ""}</td></tr>`;
  }

  function panelMetricas(i, c) {
    const monto = C.montoDespues(c, i), w = C.dec(i, c).w, h = C.base(c, i), nd = C.need(c, i), m = C.met(w, c, monto, nd), m0 = C.met(h, c, monto, nd);
    const fila = (n, a, b) => `<li><span>${n}</span><b>${a === b ? b : `<span class="hint">${a} →</span> ${b}`}</b></li>`;
    return `<h3 style="font-size:18px">Cómo queda</h3>
      <div class="pies" style="margin-top:14px"><figure>${torta(h, 80)}<figcaption>Hoy</figcaption></figure><span class="arrow">→</span><figure>${torta(w, 112)}<figcaption>Tu propuesta</figcaption></figure></div>
      <ul class="metrics">
        ${K.metricas(m0, m).map(r => fila(r[0], r[1], r[2])).join("")}
      </ul>
      <p class="hint" style="margin:12px 0 0">Son datos, no una nota: la evaluación llega cuando ${c.corto} responde.</p>`;
  }
  const remainTxt = tot => tot === 100 ? "Suma 100%. Lista para proponer." : tot < 100 ? `Te falta asignar <b>${100 - tot}%</b>` : `Te pasaste por <b>${tot - 100}%</b>`;

  function ordenMsgs(i, c) { const r = C.rng(i * 17 + numCli(c) * 5 + 3), o = [1, 2, 3];
    for (let j = 2; j > 0; j--) { const k = Math.floor(r() * (j + 1)); [o[j], o[k]] = [o[k], o[j]]; } return o; }

  function vDecision(i, c) {
    const X = C.X(i), cfg = X.M[c.id], e = C.dec(i, c);
    if (!e.w) e.w = Object.assign({}, C.base(c, i));
    const tot = C.met(e.w, c, 1).tot, msgs = cfg.msgs(X), hayDespues = i < N - 1 && CL().some(x => C.dec(i + 1, x).msg);
    return `<span class="eyebrow">Cliente ${numCli(c)} de 2 · ${c.nombre}</span>
      <div class="msg"><p class="via">${cfg.via}</p><div class="bubble">${cfg.dice(X)}</div></div>
      <h3 class="qh">Armá tu propuesta</h3>
      <p class="qs">Mové los porcentajes de a 5 o escribilos. La rayita gris marca dónde está hoy. Tiene que sumar 100%. Si no hace falta cambiar nada, dejala como está.</p>
      ${hayDespues ? `<p class="warn">Ya decidiste meses posteriores. Si cambiás algo acá, esas decisiones se borran, porque dependen de esta.</p>` : ""}
      <div class="grid2"><div class="panel" style="padding:18px 20px">
        <table class="alloc"><thead><tr><th>Instrumento</th><th>Hoy</th><th></th><th class="n">Propuesta</th><th></th></tr></thead>
        <tbody>${C.disp(i).map(k => filaArmado(i, c, k)).join("")}</tbody></table>
        <div class="remain ${tot !== 100 ? "bad" : ""}" id="remain"><span>${remainTxt(tot)}</span>
          <span class="presets"><button type="button" class="chip" data-preset="hoy">Volver a la actual</button><button type="button" class="chip" data-preset="cero">Empezar de cero</button></span></div>
      </div><aside class="panel sticky" id="metricas">${panelMetricas(i, c)}</aside></div>
      <h3 class="qh">¿Qué le decís?</h3>
      <p class="qs">Lo que le digas hoy define cómo va a reaccionar la próxima vez que el mercado se mueva.</p>
      <div class="opts">${ordenMsgs(i, c).map(k => `<button type="button" class="opt ${e.msg === String(k) ? "sel" : ""}" data-msg="${k}"><span class="dot"></span><span>${msgs[k - 1].t}</span></button>`).join("")}</div>`;
  }

  function critBox(n, [v, t]) {
    const col = v >= 20 ? "var(--teal)" : v >= 12 ? "var(--gold)" : "var(--terra)";
    return `<div class="crit"><span>${n}</span><b>${v}<small style="font-size:13px;color:var(--ink-faint)">/25</small></b><div class="mini"><i style="width:${v * 4}%;background:${col}"></i></div><p>${t}</p></div>`;
  }

  function vRespuesta(i, c) {
    const ev = C.evaluar(c, i);
    return `<span class="eyebrow">Cliente ${numCli(c)} de 2 · Cómo cerró</span>
      <div class="reply"><div class="avatar" style="background:${c.color}">${c.ini}</div><div class="bubble" style="font-size:17px">${ev.resp}</div></div>
      <div class="panel" style="margin-top:22px">
        <div style="display:flex;justify-content:space-between;align-items:baseline;gap:20px;flex-wrap:wrap">
          <div><span class="eyebrow">Criterio de esta decisión</span><h2 style="font-size:30px;margin-top:4px">${ev.total}<span style="font-size:17px;color:var(--ink-faint)"> / 100</span></h2></div>
          <div style="min-width:240px"><div class="meter-h"><span>Confianza de ${c.corto}</span><b>${ev.conf0} → ${ev.conf}</b></div><div class="meter-t"><i style="width:${ev.conf}%"></i></div></div></div>
        <p class="key">${ev.key}</p>
        <div class="score">${critBox("Encaje con el perfil", ev.perfil)}${critBox("Diversificación", ev.div)}${critBox(K.nLiq, ev.liq)}${critBox("Comunicación", ev.com)}</div>
        <p class="hint" style="margin:16px 0 0">El criterio se mide en el momento de decidir, sin saber qué va a pasar. Que el mes que viene el mercado suba o baje no cambia esta nota.</p></div>`;
  }

  const promCrit = (c, i) => Math.round(C.MESES.slice(0, i + 1).reduce((s, _, j) => s + C.evaluar(c, j).total, 0) / (i + 1));

  function vCierre(i) {
    const X = C.X(i), M = X.M, L = M.leccion(X);
    const card = c => { const ev = C.evaluar(c, i), r = C.R(C.held(c, i), X.ret);
      return `<div class="panel"><div class="client"><div class="avatar" style="background:${c.color}">${c.ini}</div><div><h2 style="font-size:21px">${c.nombre}</h2><p>Perfil ${c.perfil.toLowerCase()}</p></div></div>
        <div class="pies" style="margin-top:18px"><figure>${torta(C.base(c, i), 72)}<figcaption>Cómo la recibiste</figcaption></figure><span class="arrow" style="padding-bottom:56px">→</span><figure>${torta(C.dec(i, c).w, 100)}<figcaption>Cómo la dejaste</figcaption></figure></div>
        <div class="board"><div><span>Resultado del mes</span><b class="${cls(r)}">${sg(r)}%</b>${i ? `<span class="acc">Acumulado: ${sg(C.acum(c, i))}%</span>` : ""}</div>
          <div><span>Criterio</span><b>${ev.total}</b>${i ? `<span class="acc">Promedio: ${promCrit(c, i)}</span>` : ""}</div><div><span>Confianza</span><b>${ev.conf}</b></div></div></div>`; };
    return `<span class="eyebrow">Cierre de ${M.corto}</span>
      <h2 style="font-size:32px;margin-top:6px">${M.cierreH}</h2>
      <p class="lead">${M.cierreLead}</p>
      <div class="two">${CL().map(card).join("")}</div>
      <div class="lesson"><span class="eyebrow">Lo que te llevás de este mes</span><h3>${L.h}</h3><p>${L.p}</p></div>
      <p class="note">El acumulado mide el rendimiento de la cartera: los retiros de los clientes no cuentan como pérdida. La partida quedó guardada en este navegador.</p>`;
  }

  /* ---------- Repaso final ---------- */
  const TEMAS = K.temas;
  function promTemas() {
    return TEMAS.map(([k, n, mod, tit]) => { let s = 0, q = 0; CL().forEach(c => C.MESES.forEach((_, j) => { const ev = C.evaluar(c, j); if (ev) { s += ev[k][0]; q++; } }));
      return { k, n, mod, tit, v: q ? s / q : 0 }; });
  }
  function vFinal() {
    const u = N - 1, temas = promTemas(), peor = temas.reduce((a, b) => b.v < a.v ? b : a);
    const card = c => { const a = C.acum(c, u), h = C.acumHer(c, u), ev = C.evaluar(c, u);
      const filas = C.MESES.map((M, j) => { const e = C.evaluar(c, j), r = C.R(C.held(c, j), C.X(j).ret);
        return `<tr><td>${M.fecha.split(" ")[0]}</td><td class="n ${cls(r)}">${sg(r)}%</td><td class="n"><span class="pill ${e.total >= 85 ? "ok" : e.total >= 70 ? "mid" : "low"}">${e.total}</span></td><td class="n">${e.conf}</td><td class="rk">${e.key}</td></tr>`; }).join("");
      return `<div class="panel" style="margin-top:22px"><div class="client"><div class="avatar" style="background:${c.color}">${c.ini}</div><div><h2 style="font-size:22px">${c.nombre}</h2><p>Perfil ${c.perfil.toLowerCase()} · terminó el año con ${usd(C.montoDespues(c, u))}</p></div></div>
        <div class="board"><div><span>Criterio promedio</span><b>${promCrit(c, u)}</b></div>
          <div><span>Resultado del año</span><b class="${cls(a)}">${sg(a)}%</b><span class="acc">Heredada sin tocar: ${sg(h)}%</span>${K.extraFinal(c, u)}</div>
          <div><span>Confianza final</span><b>${ev.conf}</b><span class="acc">Empezó en ${c.conf}</span></div></div>
        <div class="rev"><table><thead><tr><th>Mes</th><th class="n">Resultado</th><th class="n">Criterio</th><th class="n">Confianza</th><th>Lo que se evaluó</th></tr></thead><tbody>${filas}</tbody></table></div></div>`; };
    return `<span class="eyebrow">Repaso del año</span>
      <h1 style="font-size:40px;line-height:1.1;margin-top:8px">Doce meses, veinticuatro decisiones</h1>
      <p class="lead">El resultado dependió en parte de cómo le fue al mercado. El criterio es tuyo: mide si cada propuesta tenía sentido para ese cliente con lo que se sabía en ese momento.</p>
      <div class="panel" style="margin-top:22px"><h3 style="font-size:20px">Tu criterio, por tema</h3>
        <p class="hint" style="margin:4px 0 0">Promedio de las veinticuatro decisiones, sobre 25.</p>
        <div class="score">${temas.map(t => critBox(t.n, [Math.round(t.v), t.k === peor.k ? "Tu punto más flojo este año." : ""])).join("")}</div>
        <p class="key" style="font-size:16.5px">Para repasar: <a href="index.html#/m/${peor.mod}">${peor.tit}</a> en el Aula, que es donde se trabaja «${peor.n.toLowerCase()}».</p></div>
      ${CL().map(card).join("")}
      <div class="lesson"><span class="eyebrow">Y ahora</span><h3>Jugalo de nuevo: el mismo año con otra estrategia, o un año con otros números.</h3>
        <p>Con los mismos números podés probar qué habría pasado decidiendo distinto. Con otros números, los titulares son los mismos pero las magnitudes cambian, y el mercado puede reaccionar al revés después de las elecciones.</p>
        <div class="nav" style="margin-top:20px;justify-content:flex-start"><button type="button" class="btn btn-inv" data-nueva="misma">↺ El mismo año, otra estrategia</button><button type="button" class="btn btn-inv" data-nueva="otra">Un año con otros números →</button></div></div>
      <p class="note">Este resumen se suma a "Mi informe" en el Aula.</p>`;
  }

  /* ---------- Resumen para "Mi informe" del Aula ---------- */
  function resumen() {
    const u = decididoHasta(); if (u < 0) return null;
    const L = [`${K.etiqueta} · ${u + 1} de ${N} meses jugados${u === N - 1 ? " (año terminado)" : ""}`];
    CL().forEach(c => L.push(`- ${c.nombre} (${c.perfil.toLowerCase()}): criterio promedio ${promCrit(c, u)}/100 · resultado acumulado ${sg(C.acum(c, u))}% (heredada sin tocar: ${sg(C.acumHer(c, u))}%) · confianza ${C.evaluar(c, u).conf}/100`));
    L.push("Criterio por tema (promedio sobre 25): " + promTemas().map(t => `${t.n.toLowerCase()} ${fmt(t.v)}`).join(" · "));
    const bajas = [];
    CL().forEach(c => { for (let j = 0; j <= u; j++) { const e = C.evaluar(c, j); if (e.total < 70) bajas.push(`- ${C.MESES[j].fecha} · ${c.corto} (${e.total}/100): ${e.key}`); } });
    L.push("Decisiones con criterio bajo (menos de 70):"); L.push(...(bajas.length ? bajas : ["Ninguna."]));
    return { fecha: new Date().toISOString().slice(0, 10), lineas: L };
  }

  /* ---------- Render ---------- */
  function listo() {
    const p = actual(); if (p.v !== vDecision) return true;
    const e = C.dec(p.mes, C.CLI[p.c]); return !!(e.msg && e.w && C.met(e.w, C.CLI[p.c], 1).tot === 100);
  }
  function nav() {
    const p = actual(); if (C.S.paso === FLUJO.length - 1) return `<div class="nav"><button type="button" class="btn" data-ir="${C.S.paso - 1}">← Atrás</button><span></span></div>`;
    const sig = FLUJO[C.S.paso + 1];
    const txt = C.S.paso === 0 ? "Empezar diciembre" : p.v === vCierre ? (sig.v === vFinal ? "Ver el repaso del año" : `Pasar a ${C.MESES[sig.mes].fecha.toLowerCase()}`)
      : p.v === vTitular ? "Ver la cartera de " + C.CLI.g.corto : p.v === vRespuesta && p.c === "g" ? "Ahora, " + C.CLI.m.corto : p.v === vRespuesta ? "Cerrar el mes" : p.v === vDecision ? "Mandar la propuesta" : "Seguir";
    return `<div class="nav" id="nav">${C.S.paso > 0 ? `<button type="button" class="btn" data-ir="${C.S.paso - 1}">← Atrás</button>` : "<span></span>"}
      <div style="display:flex;align-items:center;gap:14px"><span class="hint" id="navhint" ${listo() ? "hidden" : ""}>Armá la cartera (100%) y elegí qué le decís</span>
      <button type="button" class="btn btn-p" id="navsig" data-ir="${C.S.paso + 1}" ${listo() ? "" : "disabled"}>${txt} →</button></div></div>`;
  }
  /* Actualiza el botón sin reemplazarlo (si se reemplaza durante un clic, el clic se pierde) */
  function navEstado() { const b = $("#navsig"), h = $("#navhint"); if (!b) return; const ok = listo(); b.disabled = !ok; if (h) h.hidden = ok; }

  function render() {
    const p = actual(), X = C.X(p.mes), fin = p.v === vFinal;
    $("#mes").innerHTML = fin ? `<b>${K.etiqueta}</b>Terminado<div class="mesbar"><i style="width:100%"></i></div>` : `<b>${X.M.fecha}</b>Mes ${p.mes + 1} de ${N}<div class="mesbar"><i style="width:${(p.mes + 1) / N * 100}%"></i></div>`;
    $("#tape").innerHTML = C.tape(X).map(f => `<div class="fac"><span>${f[0]}</span><b>${f[1]}</b><em class="${f[3]}">${f[2]}</em></div>`).join("");
    $("#steps").innerHTML = fin ? "" : FLUJO.map((x, j) => x.mes !== p.mes || x.v === vFinal || (j === 0 && C.S.paso !== 0) ? "" :
      `<span class="step ${j === C.S.paso ? "on" : j < C.S.paso ? "ok" : ""}">${x.c ? `<span class="who">${C.CLI[x.c].ini}</span>` : ""}${x.t}</span>`).join("");
    const cuerpo = p.v === vIntro || fin ? p.v() : p.c ? p.v(p.mes, C.CLI[p.c]) : p.v(p.mes);
    $("#view").innerHTML = `<div class="fade">${cuerpo}</div>` + nav();
    $("#reinicio").hidden = true;
    guardar();
  }
  function repintarArmado(k) {
    const p = actual(), c = C.CLI[p.c], row = document.querySelector(`[data-row="${k}"]`);
    if (row) { const v = pct(C.dec(p.mes, c).w, k), d = v - pct(C.base(c, p.mes), k), chg = row.querySelector(".chg");
      row.querySelector(".track i").style.width = v + "%";
      const inp = row.querySelector("[data-in]"); if (+inp.value !== v) inp.value = v;
      chg.className = "chg " + (d > 0 ? "up" : d < 0 ? "dn" : "nt"); chg.textContent = d ? (d > 0 ? "+" : "−") + Math.abs(d) : ""; }
    $("#metricas").innerHTML = panelMetricas(p.mes, c);
    const tot = C.met(C.dec(p.mes, c).w, c, 1).tot, rm = $("#remain");
    rm.className = "remain" + (tot !== 100 ? " bad" : ""); rm.firstElementChild.innerHTML = remainTxt(tot);
    navEstado(); guardar();
  }
  const fijar = (k, val) => { const p = actual(); C.dec(p.mes, C.CLI[p.c]).w[k] = Math.max(0, Math.min(100, Math.round(val) || 0)); };
  /* Si cambia una decisión, las de los meses siguientes quedan sin efecto (dependen de ella) */
  function invalidarDesde(mes) { for (let j = mes + 1; j < N; j++) C.S.d[j] = { g: {}, m: {} }; }
  function empezar(seed) { C.S = nuevo(seed); C.limpiarCache(); render(); window.scrollTo({ top: 0 }); }

  document.addEventListener("click", ev => {
    const t = ev.target;
    const w = t.closest("[data-why]");
    if (w) { const tr = w.closest("tr"); tr.classList.toggle("open"); w.textContent = tr.classList.contains("open") ? "Ocultar" : "¿Por qué se movió?"; return; }
    const st = t.closest("[data-d]");
    if (st) { const p = actual(), k = st.dataset.k; fijar(k, pct(C.dec(p.mes, C.CLI[p.c]).w, k) + +st.dataset.d); invalidarDesde(p.mes); repintarArmado(k); return; }
    const pr = t.closest("[data-preset]");
    if (pr) { const p = actual(), c = C.CLI[p.c]; C.dec(p.mes, c).w = pr.dataset.preset === "hoy" ? Object.assign({}, C.base(c, p.mes)) : {}; invalidarDesde(p.mes); render(); return; }
    const mo = t.closest("[data-msg]");
    if (mo) { const p = actual(); C.dec(p.mes, C.CLI[p.c]).msg = mo.dataset.msg; invalidarDesde(p.mes);
      document.querySelectorAll("[data-msg]").forEach(b => b.classList.toggle("sel", b === mo)); navEstado(); guardar(); return; }
    const nu = t.closest("[data-nueva]");
    if (nu) { empezar(nu.dataset.nueva === "misma" ? C.S.seed : undefined); return; }
    if (t.closest("#btnReinicio")) { const r = $("#reinicio"); r.hidden = !r.hidden; if (!r.hidden) r.scrollIntoView({ block: "nearest" }); return; }
    if (t.closest("#btnCancelar")) { $("#reinicio").hidden = true; return; }
    const ir = t.closest("[data-ir]");
    if (ir && !ir.disabled) { C.S.paso = +ir.dataset.ir; render(); window.scrollTo({ top: 0, behavior: "smooth" }); }
  });
  document.addEventListener("change", ev => {
    const inp = ev.target.closest("[data-in]"); if (!inp) return;
    const p = actual(); fijar(inp.dataset.in, +inp.value); invalidarDesde(p.mes); repintarArmado(inp.dataset.in);
  });

  render();
})();
