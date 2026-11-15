/* ============================================================
   HERRAMIENTAS DEL MÓDULO DE CRITERIO
   Supuestos didácticos, en dólares y a un año. No son proyecciones.
   ============================================================ */
(function () {
  const H = AULA.herramientas;
  const fmt = (n, d = 1) => Number(n).toLocaleString("es-AR", { minimumFractionDigits: d, maximumFractionDigits: d });
  const sg = (n, d = 1) => (n > 0 ? "+" : n < 0 ? "−" : "") + fmt(Math.abs(n), d) + "%";
  const $ = (r, s) => r.querySelector(s), $$ = (r, s) => Array.from(r.querySelectorAll(s));

  /* ======================================================
     1 · ¿QUÉ 7% GANA?
     ====================================================== */
  H["siete-siete"] = {
    render() {
      return `
        <div class="tool tool-77">
          <div class="tool-head"><span class="tool-kicker">Herramienta</span><h4>¿Qué 7% gana?</h4></div>
          <p class="tool-hint">Un bono CER que paga CER + 7% contra un bono en dólares que rinde 7%. Elegí qué pasa en los próximos 12 meses y mirá cuánto termina rindiendo cada uno <strong>medido en dólares</strong>.</p>
          <div class="pf-ctrl">
            <label class="tool-field">Inflación <output data-o="inf"></output>
              <input type="range" min="10" max="60" step="1" value="25" data-i="inf"></label>
            <label class="tool-field">Suba del dólar <output data-o="dev"></output>
              <input type="range" min="0" max="80" step="1" value="10" data-i="dev"></label>
          </div>
          <div class="s77-bars" data-bars></div>
          <p class="pf-msg" data-msg></p>
          <div class="s77-presets"><span>Probá:</span>
            <button type="button" class="chip" data-p="25,3">Lo que pasó en 2026</button>
            <button type="button" class="chip" data-p="25,25">Dólar acompaña a la inflación</button>
            <button type="button" class="chip" data-p="30,55">Salto cambiario</button>
          </div>
          <p class="tool-foot">Cuenta simplificada: no incluye el rezago del CER ni cambios de precio por tasas. Sirve para ver de qué depende cada 7%, no para calcularlo al centavo.</p>
        </div>`;
    },
    init(raiz) {
      const inf = $(raiz, "[data-i=inf]"), dev = $(raiz, "[data-i=dev]");
      function pintar() {
        const I = +inf.value / 100, D = +dev.value / 100;
        $(raiz, "[data-o=inf]").textContent = fmt(I * 100, 0) + "%";
        $(raiz, "[data-o=dev]").textContent = fmt(D * 100, 0) + "%";
        const cerP = ((1 + I) * 1.07 - 1) * 100, cerU = ((1 + I) * 1.07 / (1 + D) - 1) * 100, usd = 7;
        const max = Math.max(30, Math.abs(cerU), usd) * 1.1;
        const bar = (n, v, sub) => `<div class="s77-row"><span>${n}<small>${sub}</small></span>
          <div class="s77-track"><i class="${v < 0 ? "neg" : ""}" style="${v < 0 ? `right:50%;width:${-v / max * 50}%` : `left:50%;width:${v / max * 50}%`}"></i><em></em></div><b class="${v < 0 ? "neg" : ""}">${sg(v)}</b></div>`;
        $(raiz, "[data-bars]").innerHTML =
          bar("Bono CER + 7%", cerU, `en pesos rinde ${sg(cerP, 0)}`) + bar("Bono en dólares 7%", usd, "rinde 7% en dólares, pase lo que pase con el peso");
        const real = ((1 + I) / (1 + D) - 1) * 100;
        let m;
        if (Math.abs(cerU - usd) < 1) m = `<strong>Empate:</strong> el dólar subió lo mismo que la inflación. Los dos 7% valen lo mismo.`;
        else if (cerU > usd) m = `<strong>Gana el CER:</strong> el dólar subió ${fmt(D * 100, 0)}%, menos que la inflación (${fmt(I * 100, 0)}%). Medido en dólares, el peso se fortaleció ${fmt(real, 0)}%, y el CER se lleva esa diferencia.`;
        else m = `<strong>Gana el bono en dólares:</strong> el dólar subió ${fmt(D * 100, 0)}%, más que la inflación (${fmt(I * 100, 0)}%). El CER te protegió de los precios, pero no del salto del dólar.`;
        $(raiz, "[data-msg]").innerHTML = m + ` <span class="s77-rule">Regla: gana el CER si el dólar sube <em>menos</em> que la inflación; gana el dólar si sube <em>más</em>.</span>`;
      }
      [inf, dev].forEach(x => x.addEventListener("input", pintar));
      raiz.addEventListener("click", ev => {
        const b = ev.target.closest("[data-p]"); if (!b) return;
        const [a, c] = b.dataset.p.split(","); inf.value = a; dev.value = c; pintar();
      });
      pintar();
    }
  };

  /* ======================================================
     2 · CONSTRUCTOR DE CARTERA
     ====================================================== */
  const ACT = [
    { k: "acc", s: "Acciones arg.", n: "Acciones argentinas", c: "#A8453A", arg: 1, pesos: 0, esc: [60, 12, -40, -25], vol: 45 },
    { k: "ced", s: "CEDEARs", n: "CEDEARs", c: "#B68A3D", arg: 0, pesos: 0, esc: [20, 8, 3, -22], vol: 18 },
    { k: "on", s: "ONs", n: "ONs en dólares", c: "#7A8B5C", arg: 1, pesos: 0, esc: [11, 8, -2, -1], vol: 6 },
    { k: "sob", s: "Soberanos", n: "Soberanos en dólares", c: "#C26A3A", arg: 1, pesos: 0, esc: [30, 11, -25, -6], vol: 20 },
    { k: "lec", s: "LECAPs", n: "LECAPs", c: "#4D8A8E", arg: 1, pesos: 1, esc: [14, 6, -20, 0], vol: 15 },
    { k: "cer", s: "CER", n: "Bonos CER", c: "#2D6A6E", arg: 1, pesos: 1, esc: [16, 6, -15, -2], vol: 18 },
    { k: "fci", s: "FCI Latam", n: "FCI Latam sin Argentina", c: "#9FB3A8", arg: 0, pesos: 0, esc: [5.5, 4.5, 4, 0.5], vol: 3 }
  ];
  const ESC = [
    { n: "Año bueno", d: "Baja el riesgo país y el mundo acompaña", p: 0.25 },
    { n: "Año normal", d: "Sin grandes sorpresas", p: 0.5 },
    { n: "Año malo argentino", d: "Estrés electoral, sube el riesgo país, salta el dólar", p: 0.15 },
    { n: "Año malo global", d: "Caen las bolsas del mundo", p: 0.1 }
  ];
  const CORR = [
    [1, .3, .6, .8, .4, .5, .1],
    [.3, 1, .2, .25, 0, .05, .3],
    [.6, .2, 1, .7, .3, .4, .3],
    [.8, .25, .7, 1, .4, .5, .2],
    [.4, 0, .3, .4, 1, .7, 0],
    [.5, .05, .4, .5, .7, 1, .05],
    [.1, .3, .3, .2, 0, .05, 1]
  ];
  ACT.forEach(a => { a.er = a.esc.reduce((s, v, i) => s + v * ESC[i].p, 0); });

  function calc(w) { // w: pesos en %, suma 100
    const x = ACT.map(a => (w[a.k] || 0) / 100);
    const er = ACT.reduce((s, a, i) => s + x[i] * a.er, 0);
    let v = 0;
    for (let i = 0; i < 7; i++) for (let j = 0; j < 7; j++) v += x[i] * x[j] * ACT[i].vol * ACT[j].vol * CORR[i][j];
    const esc = ESC.map((e, s) => ACT.reduce((t, a, i) => t + x[i] * a.esc[s], 0));
    const arg = ACT.reduce((s, a, i) => s + x[i] * a.arg, 0) * 100;
    const pesos = ACT.reduce((s, a, i) => s + x[i] * a.pesos, 0) * 100;
    const maxW = Math.max(...x) * 100, maxK = ACT[x.indexOf(Math.max(...x))];
    return { er, vol: Math.sqrt(v), esc, arg, pesos, maxW, maxK };
  }
  const perfil = v => v < 7 ? ["Conservador", "ok"] : v <= 14 ? ["Moderado", "mid"] : ["Agresivo", "bad"];

  const PRESETS = {
    cons: { n: "Conservadora", w: { acc: 0, ced: 5, on: 30, sob: 5, lec: 20, cer: 10, fci: 30 } },
    mod: { n: "Moderada", w: { acc: 10, ced: 20, on: 20, sob: 15, lec: 10, cer: 10, fci: 15 } },
    agr: { n: "Agresiva", w: { acc: 30, ced: 35, on: 5, sob: 20, lec: 0, cer: 5, fci: 5 } },
    miedo: { n: "\"Saco todo de Argentina\"", w: { acc: 0, ced: 60, on: 0, sob: 0, lec: 0, cer: 0, fci: 40 } }
  };

  const CLIENTES = {
    rosa: { n: "Rosa", t: "68 años, jubilada. USD 80.000. Sus gastos son en pesos y retira algo todos los meses. Dice: \"No quiero ver la cartera caer más de un 5% en un año\".",
      checks: [
        ["Volatilidad de 5% o menos", r => r.vol <= 5],
        ["Al menos 15% en pesos (LECAPs o CER) para sus gastos", r => r.pesos >= 15],
        ["Acciones argentinas en 5% o menos", (r, w) => (w.acc || 0) <= 5],
        ["En el año malo argentino no pierde más de 5%", r => r.esc[2] >= -5]
      ] },
    martin: { n: "Martín", t: "45 años, perfil moderado. USD 200.000 a 3–5 años. Le preocupan las elecciones de 2027, pero no quiere \"salir corriendo\" de Argentina.",
      checks: [
        ["Volatilidad entre 7% y 14% (moderado)", r => r.vol >= 7 && r.vol <= 14],
        ["Exposición argentina de 60% o menos", r => r.arg <= 60],
        ["Al menos 15% en renta variable (acciones o CEDEARs) para su horizonte de 3 a 5 años", (r, w) => (w.acc || 0) + (w.ced || 0) >= 15],
        ["Sigue teniendo algo de Argentina (al menos 30%)", r => r.arg >= 30],
        ["En el año malo argentino no pierde más de 10%", r => r.esc[2] >= -10]
      ] },
    sofia: { n: "Sofía", t: "32 años, perfil agresivo, horizonte de 10 años. USD 30.000. Quiere \"todo en NVDA, que está volando\".",
      checks: [
        ["Volatilidad mayor a 14%: acorde a su perfil agresivo", r => r.vol > 14],
        ["Al menos 50% en renta variable (acciones y CEDEARs)", (r, w) => (w.acc || 0) + (w.ced || 0) >= 50],
        ["Ninguna clase de activo pasa de 50%", r => r.maxW <= 50],
        ["CEDEARs entre 25% y 50%: le das parte de lo que quiere, sin concentrar todo", (r, w) => (w.ced || 0) >= 25 && (w.ced || 0) <= 50],
        ["Al menos 2 clases con más de 10%", (r, w) => Object.values(w).filter(v => v > 10).length >= 2]
      ] }
  };

  function scatter(r) {
    const W = 360, Hh = 230, X = v => 34 + v / 50 * (W - 50), Y = v => Hh - 26 - (v + 1) / 15 * (Hh - 40);
    return `<svg viewBox="0 0 ${W} ${Hh}" class="cc-sc" role="img" aria-label="Riesgo y retorno">
      <line x1="34" y1="${Hh - 26}" x2="${W - 8}" y2="${Hh - 26}" class="ax"/><line x1="34" y1="10" x2="34" y2="${Hh - 26}" class="ax"/>
      <text x="${W - 8}" y="${Hh - 32}" class="lab" text-anchor="end">Volatilidad →</text>
      <text x="38" y="16" class="lab">Retorno esperado ↑</text>
      ${[0, 5, 10].map(v => `<text x="28" y="${Y(v) + 4}" class="tk" text-anchor="end">${v}%</text>`).join("")}
      ${[0, 10, 20, 30, 40].map(v => `<text x="${X(v)}" y="${Hh - 12}" class="tk" text-anchor="middle">${v}</text>`).join("")}
      ${ACT.map(a => `<circle cx="${X(a.vol)}" cy="${Y(a.er)}" r="5" fill="${a.c}"><title>${a.n}: ${fmt(a.er)}% esperado, ${a.vol}% de volatilidad</title></circle><text x="${X(a.vol) + (a.k === "lec" || a.k === "acc" ? -8 : 8)}" y="${Y(a.er) + 3.5}" class="dl" text-anchor="${a.k === "lec" || a.k === "acc" ? "end" : "start"}">${a.s}</text>`).join("")}
      <circle cx="${X(r.vol)}" cy="${Y(r.er)}" r="9" class="cc-me"/><text x="${X(r.vol)}" y="${Y(r.er) - 14}" class="me" text-anchor="middle">Tu cartera</text>
    </svg>`;
  }

  function constructor(modo) {
    return {
      render() {
        return `
        <div class="tool tool-cc" data-modo="${modo}">
          <div class="tool-head"><span class="tool-kicker">Herramienta</span><h4>${modo === "caso" ? "Armá la cartera del cliente" : "Constructor de carteras"}</h4></div>
          ${modo === "caso"
            ? `<div class="cc-clientes">${Object.entries(CLIENTES).map(([k, c], i) => `<button type="button" class="chip ${i === 0 ? "is-on" : ""}" data-cl="${k}">${c.n}</button>`).join("")}</div><p class="cc-brief" data-brief></p>`
            : `<p class="tool-hint">Mové los porcentajes o arrancá de una cartera tipo. Todo medido en dólares, a un año.</p>
               <div class="cc-clientes">${Object.entries(PRESETS).map(([k, p]) => `<button type="button" class="chip" data-pr="${k}">${p.n}</button>`).join("")}</div>`}
          <div class="cc-grid">
            <div class="cc-sliders">
              ${ACT.map(a => `<label class="cc-sl"><span><i style="background:${a.c}"></i>${a.n}</span><output data-ow="${a.k}">0%</output>
                <input type="range" min="0" max="100" step="5" value="0" data-w="${a.k}"></label>`).join("")}
              <div class="cc-total" data-total></div>
            </div>
            <div class="cc-out">
              <div class="fee-kpis cc-kpis">
                <div class="kpi"><span>Retorno esperado</span><b data-k="er"></b></div>
                <div class="kpi"><span>Volatilidad</span><b data-k="vol"></b></div>
                <div class="kpi"><span>Perfil</span><b data-k="perf"></b></div>
              </div>
              <p class="cc-range" data-range></p>
              <div class="cc-esc" data-esc></div>
              <div data-sc></div>
            </div>
          </div>
          <div class="cc-checks" data-checks></div>
          <p class="tool-foot">Supuestos didácticos en dólares a un año, armados a partir de cuatro escenarios con probabilidades fijas (bueno 25%, normal 50%, malo argentino 15%, malo global 10%). No son proyecciones: sirven para ver el trade-off entre riesgo y retorno, y cómo la diversificación baja la volatilidad.</p>
        </div>`;
      },
      init(raiz) {
        const w = {}; ACT.forEach(a => w[a.k] = 0);
        let cliente = "rosa";
        const setW = obj => { ACT.forEach(a => { w[a.k] = obj[a.k] || 0; $(raiz, `[data-w=${a.k}]`).value = w[a.k]; }); pintar(); };
        function pintar() {
          ACT.forEach(a => $(raiz, `[data-ow=${a.k}]`).textContent = w[a.k] + "%");
          const tot = ACT.reduce((s, a) => s + w[a.k], 0);
          const tEl = $(raiz, "[data-total]");
          tEl.innerHTML = `Total: <b>${tot}%</b>${tot === 100 ? " ✓" : tot < 100 ? ` · te falta asignar ${100 - tot}%` : ` · te pasaste ${tot - 100}%`}`;
          tEl.className = "cc-total " + (tot === 100 ? "ok" : "bad");
          const out = $(raiz, ".cc-out"), chk = $(raiz, "[data-checks]");
          if (tot !== 100) { out.classList.add("is-off"); if (chk) chk.innerHTML = modo === "caso" ? `<p class="cc-wait">Completá el 100% para ver si la cartera le sirve a ${CLIENTES[cliente].n}.</p>` : ""; return; }
          out.classList.remove("is-off");
          const r = calc(w), [pn, pc] = perfil(r.vol);
          $(raiz, "[data-k=er]").textContent = fmt(r.er) + "%";
          $(raiz, "[data-k=vol]").textContent = fmt(r.vol) + "%";
          const pe = $(raiz, "[data-k=perf]"); pe.textContent = pn; pe.className = "perf-" + pc;
          $(raiz, "[data-range]").innerHTML = `En 2 de cada 3 años, el resultado debería quedar entre <b>${sg(r.er - r.vol)}</b> y <b>${sg(r.er + r.vol)}</b>. Exposición a Argentina: <b>${fmt(r.arg, 0)}%</b> · En pesos: <b>${fmt(r.pesos, 0)}%</b>`;
          const mx = Math.max(25, ...r.esc.map(Math.abs));
          $(raiz, "[data-esc]").innerHTML = ESC.map((e, i) => `<div class="s77-row cc-er"><span>${e.n}<small>${e.d}</small></span>
            <div class="s77-track"><i class="${r.esc[i] < 0 ? "neg" : ""}" style="${r.esc[i] < 0 ? `right:50%;width:${-r.esc[i] / mx * 50}%` : `left:50%;width:${r.esc[i] / mx * 50}%`}"></i><em></em></div><b class="${r.esc[i] < 0 ? "neg" : ""}">${sg(r.esc[i])}</b></div>`).join("");
          $(raiz, "[data-sc]").innerHTML = scatter(r);
          if (modo === "caso") {
            const c = CLIENTES[cliente], res = c.checks.map(([t, f]) => [t, f(r, w)]), ok = res.filter(x => x[1]).length;
            chk.innerHTML = `<div class="cc-chead ${ok === res.length ? "ok" : ""}">${ok === res.length ? `La cartera cumple todo lo que pidió ${c.n}. Ahora, ¿cómo se la explicarías?` : `${ok} de ${res.length} criterios para ${c.n}`}</div>
              ${res.map(([t, v]) => `<div class="cc-ck ${v ? "ok" : "bad"}"><span>${v ? "✓" : "✗"}</span>${t}</div>`).join("")}`;
          } else if (chk) {
            const av = [];
            if (r.maxW > 50) av.push(`Más de la mitad está en ${r.maxK.n}: mucha concentración en una sola clase.`);
            if (r.arg > 85) av.push(`El ${fmt(r.arg, 0)}% depende de Argentina: un año malo local pega en casi toda la cartera.`);
            if (r.arg < 10) av.push(`Casi nada en Argentina: menos riesgo local, pero también se resigna el rendimiento extra del país.`);
            chk.innerHTML = av.length ? av.map(t => `<div class="cc-ck mid"><span>!</span>${t}</div>`).join("") : "";
          }
        }
        $$(raiz, "[data-w]").forEach(s => s.addEventListener("input", () => { w[s.dataset.w] = +s.value; pintar(); }));
        raiz.addEventListener("click", ev => {
          const p = ev.target.closest("[data-pr]");
          if (p) { $$(raiz, "[data-pr]").forEach(x => x.classList.toggle("is-on", x === p)); setW(PRESETS[p.dataset.pr].w); return; }
          const c = ev.target.closest("[data-cl]");
          if (c) { cliente = c.dataset.cl; $$(raiz, "[data-cl]").forEach(x => x.classList.toggle("is-on", x === c)); $(raiz, "[data-brief]").textContent = CLIENTES[cliente].t; setW({}); }
        });
        if (modo === "caso") { $(raiz, "[data-brief]").textContent = CLIENTES[cliente].t; pintar(); }
        else { $(raiz, "[data-pr=mod]").classList.add("is-on"); setW(PRESETS.mod.w); }
      }
    };
  }

  /* ======================================================
     CORRELACIÓN (lección 6 del módulo de Perfil)
     ====================================================== */
  H["correlacion"] = {
    render() {
      return `
        <div class="tool tool-corr">
          <div class="tool-head"><span class="tool-kicker">Herramienta</span><h4>Dos activos, una cartera</h4></div>
          <p class="tool-hint">Los activos A y B rinden 8% esperado y tienen 20% de volatilidad cada uno. Cambiá cuánto se mueven juntos y cuánto ponés en cada uno.</p>
          <div class="pf-ctrl">
            <label class="tool-field">Correlación <output data-o="c"></output>
              <input type="range" min="-1" max="1" step="0.1" value="0.3" data-i="c"></label>
            <label class="tool-field">Peso de A <output data-o="w"></output>
              <input type="range" min="0" max="100" step="5" value="50" data-i="w"></label>
          </div>
          <div class="corr-grid"><div data-chart></div>
            <div class="corr-kpis">
              <div class="kpi"><span>Retorno esperado</span><b>8,0%</b></div>
              <div class="kpi"><span>Volatilidad de la cartera</span><b data-o="vol"></b></div>
              <div class="kpi"><span>Riesgo que te ahorrás</span><b data-o="ah"></b></div>
            </div></div>
          <p class="pf-msg" data-o="msg"></p>
        </div>`;
    },
    init(raiz) {
      const c = $(raiz, "[data-i=c]"), w = $(raiz, "[data-i=w]"), o = k => $(raiz, `[data-o=${k}]`);
      const vol = (x, r) => Math.sqrt(x * x * 400 + (1 - x) * (1 - x) * 400 + 2 * x * (1 - x) * r * 400);
      function pintar() {
        const r = +c.value, x = +w.value / 100, v = vol(x, r);
        o("c").textContent = (r > 0 ? "+" : r < 0 ? "−" : "") + fmt(Math.abs(r), 1);
        o("w").textContent = `${Math.round(x * 100)}% A · ${Math.round((1 - x) * 100)}% B`;
        o("vol").textContent = fmt(v) + "%"; o("ah").textContent = fmt(20 - v) + " pp";
        const W = 380, Hh = 190, X = t => 40 + t * (W - 60), Y = t => Hh - 30 - t / 22 * (Hh - 50);
        const pts = r2 => Array.from({ length: 21 }, (_, i) => `${X(i / 20)},${Y(vol(i / 20, r2))}`).join(" ");
        $(raiz, "[data-chart]").innerHTML = `<svg viewBox="0 0 ${W} ${Hh}" class="corr-svg" role="img" aria-label="Volatilidad según la mezcla">
          <line x1="40" y1="${Hh - 30}" x2="${W - 20}" y2="${Hh - 30}" class="ax"/><line x1="40" y1="12" x2="40" y2="${Hh - 30}" class="ax"/>
          ${[0, 10, 20].map(t => `<text x="34" y="${Y(t) + 4}" class="tk" text-anchor="end">${t}%</text>`).join("")}
          <text x="40" y="${Hh - 12}" class="tk" text-anchor="middle">100% B</text><text x="${W - 20}" y="${Hh - 12}" class="tk" text-anchor="middle">100% A</text>
          <polyline points="${pts(1)}" class="ref"/><text x="${W - 22}" y="${Y(20) - 6}" class="lab" text-anchor="end">correlación +1</text>
          <polyline points="${pts(r)}" class="cur"/>
          <circle cx="${X(x)}" cy="${Y(v)}" r="6" class="dot"/>
        </svg>`;
        let m;
        if (r >= 0.95) m = `<strong>Con correlación +1 no hay beneficio:</strong> mezclar es como tener uno solo. Es lo que pasa con dos activos argentinos en una crisis.`;
        else if (r <= -0.95 && Math.abs(x - 0.5) < 0.01) m = `<strong>Correlación −1 y mitad y mitad:</strong> uno compensa exactamente al otro. Existe en los libros; en la práctica, casi nunca.`;
        else if (x === 0 || x === 1) m = `Con todo en un solo activo, la volatilidad es la de ese activo: 20%. Mové el peso para ver el efecto de mezclar.`;
        else m = `Con correlación ${o("c").textContent}, la cartera oscila <strong>${fmt(v)}%</strong> en lugar de 20%, con el mismo retorno esperado. Cuanto más baja la correlación, más baja la curva.`;
        o("msg").innerHTML = m;
      }
      [c, w].forEach(x => x.addEventListener("input", pintar)); pintar();
    }
  };

  H["constructor"] = constructor("libre");
  H["cartera-cliente"] = constructor("caso");
  AULA.criterio = { calc, ACT, ESC, PRESETS };
})();
