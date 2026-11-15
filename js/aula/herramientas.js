/* ============================================================
   HERRAMIENTAS INTERACTIVAS y GRÁFICOS de las lecciones.
   Cada herramienta tiene render() → HTML y init(raiz) → eventos.
   Sin handlers inline: todo se conecta con addEventListener.
   ============================================================ */
window.AULA = window.AULA || { modulos: {} };

(function () {
  const fmt = (n, d = 1) => Number(n).toLocaleString("es-AR", { minimumFractionDigits: d, maximumFractionDigits: d });
  const fmtSigno = (n, d = 1) => (n > 0 ? "+" : n < 0 ? "−" : "") + fmt(Math.abs(n), d);
  const $ = (raiz, sel) => raiz.querySelector(sel);
  const $$ = (raiz, sel) => Array.from(raiz.querySelectorAll(sel));

  /* ---------- Matemática de bonos (cupón anual, bullet, VN 100) ---------- */
  function precioBono(cupon, anios, tir) {
    const r = tir / 100, c = cupon;
    let p = 0;
    for (let t = 1; t <= anios; t++) p += (t === anios ? c + 100 : c) / Math.pow(1 + r, t);
    return p;
  }
  function durationMod(cupon, anios, tir) {
    const r = tir / 100, c = cupon;
    let p = 0, w = 0;
    for (let t = 1; t <= anios; t++) {
      const f = (t === anios ? c + 100 : c) / Math.pow(1 + r, t);
      p += f; w += t * f;
    }
    return (w / p) / (1 + r);
  }
  AULA.mat = { precioBono, durationMod };

  const H = {};

  /* ======================================================
     1 · ARMÁ LA CARTERA
     ====================================================== */
  const CLASES = [
    { k: "liq", nombre: "Liquidez",          ej: "Caución, money market",          esp: 3,   malo: 2,   color: "var(--c-liq)" },
    { k: "rfc", nombre: "Renta fija corta",  ej: "ONs y bonos de hasta 3 años",     esp: 6.5, malo: -5,  color: "var(--c-rfc)" },
    { k: "rfl", nombre: "Renta fija larga",  ej: "Soberanos largos",                esp: 10,  malo: -20, color: "var(--c-rfl)" },
    { k: "acc", nombre: "Acciones",          ej: "Acciones locales, CEDEARs, ETFs", esp: 11,  malo: -32, color: "var(--c-acc)" }
  ];

  H.cartera = {
    render() {
      const filas = CLASES.map((c, i) => `
        <div class="tool-row">
          <div class="tool-row-label">
            <span class="swatch" style="background:${c.color}"></span>
            <div><strong>${c.nombre}</strong><small>${c.ej}</small></div>
          </div>
          <input type="range" min="0" max="100" step="1" value="${[20, 50, 10, 20][i]}" data-clase="${c.k}" aria-label="${c.nombre}">
          <output class="tool-val" data-out="${c.k}">${[20, 50, 10, 20][i]}%</output>
        </div>`).join("");
      return `
        <div class="tool tool-cartera">
          <div class="tool-head"><span class="tool-kicker">Herramienta</span><h4>Armá la cartera</h4></div>
          <div class="tool-grid">
            <div class="tool-inputs">${filas}
              <p class="tool-hint">Los pesos se ajustan solos para sumar siempre 100%.</p>
            </div>
            <div class="tool-outputs">
              <div class="stackbar" data-stack></div>
              <div class="kpis">
                <div class="kpi"><span>Rendimiento esperado</span><strong data-k="esp">—</strong><small>por año, en USD</small></div>
                <div class="kpi kpi-neg"><span>Año malo</span><strong data-k="malo">—</strong><small>caída estimada</small></div>
                <div class="kpi"><span>Disponible en 48 h</span><strong data-k="liq">—</strong><small>sin vender a pérdida</small></div>
              </div>
              <div class="perfil-tag" data-k="perfil"></div>
              <div class="contrib">
                <span class="contrib-title">¿De dónde viene la caída del año malo?</span>
                <div data-contrib></div>
              </div>
            </div>
          </div>
          <p class="tool-foot">Supuestos ilustrativos, no proyecciones: liquidez +3% / +2%, renta fija corta +6,5% / −5%, renta fija larga +10% / −20%, acciones +11% / −32% (año normal / año malo).</p>
        </div>`;
    },
    init(raiz) {
      const sliders = $$(raiz, "input[type=range]");
      const pesos = () => Object.fromEntries(sliders.map(s => [s.dataset.clase, +s.value]));
      function rebalancear(cambiado) {
        const v = +cambiado.value;
        const otros = sliders.filter(s => s !== cambiado);
        const resto = 100 - v;
        const sumaOtros = otros.reduce((a, s) => a + +s.value, 0);
        let asignado = 0;
        otros.forEach((s, i) => {
          let nv = sumaOtros > 0 ? Math.round(+s.value * resto / sumaOtros) : Math.round(resto / otros.length);
          if (i === otros.length - 1) nv = resto - asignado;
          nv = Math.max(0, nv);
          s.value = nv; asignado += nv;
        });
      }
      function pintar() {
        const p = pesos();
        let esp = 0, malo = 0;
        CLASES.forEach(c => { esp += p[c.k] * c.esp / 100; malo += p[c.k] * c.malo / 100; });
        CLASES.forEach(c => { $(raiz, `[data-out=${c.k}]`).textContent = p[c.k] + "%"; });
        $(raiz, "[data-stack]").innerHTML = CLASES.map(c => p[c.k] > 0
          ? `<span style="width:${p[c.k]}%;background:${c.color}" title="${c.nombre}: ${p[c.k]}%">${p[c.k] >= 9 ? p[c.k] + "%" : ""}</span>` : "").join("");
        $(raiz, "[data-k=esp]").textContent = fmtSigno(esp) + "%";
        $(raiz, "[data-k=malo]").textContent = fmtSigno(malo) + "%";
        $(raiz, "[data-k=liq]").textContent = p.liq + "%";
        let perfil, desc;
        if (malo >= -6) { perfil = "conservador"; desc = "Caídas acotadas: prioriza preservar el capital."; }
        else if (malo >= -14) { perfil = "moderado"; desc = "Equilibrio entre estabilidad y crecimiento."; }
        else { perfil = "agresivo"; desc = "Busca crecimiento y acepta caídas fuertes en el camino."; }
        $(raiz, "[data-k=perfil]").innerHTML = `Esta cartera se comporta como la de un perfil <strong class="perfil-${perfil}">${perfil}</strong>. ${desc}`;
        const perdidas = CLASES.map(c => ({ c, v: p[c.k] * c.malo / 100 })).filter(x => x.v < 0);
        const totalPerd = perdidas.reduce((a, x) => a + x.v, 0) || -1;
        $(raiz, "[data-contrib]").innerHTML = perdidas.map(x => `
          <div class="contrib-row"><span>${x.c.nombre}</span>
            <div class="contrib-bar"><i style="width:${Math.round(x.v / totalPerd * 100)}%;background:${x.c.color}"></i></div>
            <b>${Math.round(x.v / totalPerd * 100)}%</b></div>`).join("") || `<p class="tool-hint">Sin pérdidas en el año malo.</p>`;
      }
      sliders.forEach(s => s.addEventListener("input", () => { rebalancear(s); pintar(); }));
      pintar();
    }
  };

  /* ======================================================
     2 · CALCULADORA DE BONO: TIR → PRECIO
     ====================================================== */
  H.bono = {
    render() {
      return `
        <div class="tool tool-bono">
          <div class="tool-head"><span class="tool-kicker">Herramienta</span><h4>Calculadora de precio y TIR</h4></div>
          <div class="tool-grid">
            <div class="tool-inputs">
              <label class="tool-field">Cupón anual <output data-o="cupon">8%</output>
                <input type="range" min="0" max="15" step="0.5" value="8" data-i="cupon"></label>
              <label class="tool-field">Años al vencimiento <output data-o="anios">3</output>
                <input type="range" min="1" max="15" step="1" value="3" data-i="anios"></label>
              <label class="tool-field tool-field-strong">TIR que exige el mercado <output data-o="tir">8,0%</output>
                <input type="range" min="0.5" max="25" step="0.1" value="8" data-i="tir"></label>
              <div class="kpis kpis-3">
                <div class="kpi"><span>Precio</span><strong data-k="precio">—</strong><small data-k="par"></small></div>
                <div class="kpi"><span>Rend. corriente</span><strong data-k="cy">—</strong><small>cupón ÷ precio</small></div>
                <div class="kpi"><span>Duration mod.</span><strong data-k="md">—</strong><small>sensibilidad</small></div>
              </div>
            </div>
            <div class="tool-outputs"><div class="chart" data-chart></div>
              <p class="tool-hint">La curva muestra el precio para cada TIR posible. El punto es tu bono hoy. Fijate que la curva es más empinada cuanto más largo es el bono.</p>
            </div>
          </div>
          <p class="tool-foot">Bono bullet de valor nominal 100 con cupón anual. Simplificación didáctica: los bonos reales suelen pagar cupones semestrales y pueden amortizar en cuotas.</p>
        </div>`;
    },
    init(raiz) {
      const inp = k => +$(raiz, `[data-i=${k}]`).value;
      function chart(cupon, anios, tir) {
        const W = 420, Hh = 250, m = { l: 44, r: 14, t: 14, b: 34 };
        const xs = [], N = 60, x0 = 0.5, x1 = 25;
        for (let i = 0; i <= N; i++) { const x = x0 + (x1 - x0) * i / N; xs.push([x, precioBono(cupon, anios, x)]); }
        const yMax = Math.max(160, Math.ceil(Math.max(...xs.map(p => p[1])) / 20) * 20);
        const yMin = Math.max(0, Math.floor(Math.min(...xs.map(p => p[1])) / 20) * 20);
        const X = x => m.l + (x - x0) / (x1 - x0) * (W - m.l - m.r);
        const Y = y => m.t + (1 - (y - yMin) / (yMax - yMin)) * (Hh - m.t - m.b);
        const path = xs.map((p, i) => (i ? "L" : "M") + X(p[0]).toFixed(1) + "," + Y(p[1]).toFixed(1)).join(" ");
        const py = precioBono(cupon, anios, tir);
        let grid = "";
        for (let y = yMin; y <= yMax; y += 20) grid += `<line class="g" x1="${m.l}" x2="${W - m.r}" y1="${Y(y)}" y2="${Y(y)}"/><text class="ax" x="${m.l - 6}" y="${Y(y) + 4}" text-anchor="end">${y}</text>`;
        for (let x = 5; x <= 25; x += 5) grid += `<text class="ax" x="${X(x)}" y="${Hh - 12}" text-anchor="middle">${x}%</text>`;
        const par = yMin <= 100 && 100 <= yMax ? `<line class="par" x1="${m.l}" x2="${W - m.r}" y1="${Y(100)}" y2="${Y(100)}"/><text class="par-t" x="${W - m.r}" y="${Y(100) - 5}" text-anchor="end">par (100)</text>` : "";
        const cup = cupon >= x0 && cupon <= x1 ? `<line class="cup" x1="${X(cupon)}" x2="${X(cupon)}" y1="${m.t}" y2="${Hh - m.b}"/>` : "";
        return `<svg viewBox="0 0 ${W} ${Hh}" class="svgchart" role="img" aria-label="Precio del bono según la TIR">
          ${grid}${par}${cup}
          <path class="curve" d="${path}"/>
          <line class="guide" x1="${X(tir)}" x2="${X(tir)}" y1="${Y(py)}" y2="${Hh - m.b}"/>
          <line class="guide" x1="${m.l}" x2="${X(tir)}" y1="${Y(py)}" y2="${Y(py)}"/>
          <circle class="dot" cx="${X(tir)}" cy="${Y(py)}" r="6"/>
          <text class="ax-title" x="${(W + m.l) / 2}" y="${Hh - 1}" text-anchor="middle">TIR</text>
          <text class="ax-title" transform="translate(11 ${Hh / 2}) rotate(-90)" text-anchor="middle">Precio</text>
        </svg>`;
      }
      function pintar() {
        const cupon = inp("cupon"), anios = inp("anios"), tir = inp("tir");
        $(raiz, "[data-o=cupon]").textContent = fmt(cupon, cupon % 1 ? 1 : 0) + "%";
        $(raiz, "[data-o=anios]").textContent = anios + (anios === 1 ? " año" : " años");
        $(raiz, "[data-o=tir]").textContent = fmt(tir) + "%";
        const p = precioBono(cupon, anios, tir);
        $(raiz, "[data-k=precio]").textContent = fmt(p, 2);
        const dif = Math.abs(tir - cupon) < 0.05 ? "a la par" : (tir > cupon ? "bajo la par" : "sobre la par");
        $(raiz, "[data-k=par]").textContent = dif;
        $(raiz, "[data-k=cy]").textContent = cupon > 0 ? fmt(cupon / p * 100, 2) + "%" : "—";
        $(raiz, "[data-k=md]").textContent = fmt(durationMod(cupon, anios, tir), 2);
        $(raiz, "[data-chart]").innerHTML = chart(cupon, anios, tir);
      }
      $$(raiz, "input").forEach(i => i.addEventListener("input", pintar));
      pintar();
    }
  };

  /* ======================================================
     3 · SHOCK DE TASAS SOBRE TRES BONOS
     ====================================================== */
  const BONOS_SHOCK = [
    { nombre: "Bono corto", desc: "cupón 6%, 2 años",  cupon: 6, anios: 2 },
    { nombre: "Bono medio", desc: "cupón 8%, 6 años",  cupon: 8, anios: 6 },
    { nombre: "Bono largo", desc: "cupón 7%, 15 años", cupon: 7, anios: 15 }
  ];
  H.sensibilidad = {
    render() {
      return `
        <div class="tool tool-shock">
          <div class="tool-head"><span class="tool-kicker">Herramienta</span><h4>¿Cuánto duele un movimiento de tasas?</h4></div>
          <label class="tool-field tool-field-strong">Cambio en la TIR del mercado <output data-o="shock">+100 pb</output>
            <input type="range" min="-500" max="500" step="25" value="100" data-i="shock"></label>
          <div class="shock-presets">
            <button type="button" class="chip" data-preset="-200">Baja fuerte (−200 pb)</button>
            <button type="button" class="chip" data-preset="-50">Baja leve (−50 pb)</button>
            <button type="button" class="chip" data-preset="100">Suba (+100 pb)</button>
            <button type="button" class="chip" data-preset="500">Crisis (+500 pb)</button>
          </div>
          <div class="shock-rows" data-rows></div>
          <div class="shock-legend"><span><i class="lg lg-est"></i>Estimación con duration</span><span><i class="lg lg-real"></i>Cambio exacto</span></div>
          <p class="tool-foot">Los tres bonos parten de una TIR de 10%. 100 puntos básicos (pb) = 1 p.p. de TIR.</p>
        </div>`;
    },
    init(raiz) {
      const slider = $(raiz, "[data-i=shock]");
      function pintar() {
        const s = +slider.value, base = 10;
        $(raiz, "[data-o=shock]").textContent = (s > 0 ? "+" : s < 0 ? "−" : "") + Math.abs(s) + " pb";
        const filas = BONOS_SHOCK.map(b => {
          const p0 = precioBono(b.cupon, b.anios, base), md = durationMod(b.cupon, b.anios, base);
          const real = (precioBono(b.cupon, b.anios, base + s / 100) / p0 - 1) * 100;
          const est = -md * s / 100;
          return { b, md, real, est };
        });
        const maxAbs = Math.max(12, ...filas.map(f => Math.max(Math.abs(f.real), Math.abs(f.est))));
        const bar = (v, cls) => {
          const w = Math.abs(v) / maxAbs * 50;
          return `<i class="${cls} ${v < 0 ? "neg" : "pos"}" style="width:${w}%;${v < 0 ? `right:50%` : `left:50%`}"></i>`;
        };
        $(raiz, "[data-rows]").innerHTML = filas.map(f => `
          <div class="shock-row">
            <div class="shock-name"><strong>${f.b.nombre}</strong><small>${f.b.desc} · duration ${fmt(f.md, 1)}</small></div>
            <div class="shock-track"><span class="zero"></span>${bar(f.est, "est")}${bar(f.real, "real")}</div>
            <div class="shock-num ${f.real < 0 ? "neg" : "pos"}">${fmtSigno(f.real)}%<small>est. ${fmtSigno(f.est)}%</small></div>
          </div>`).join("");
      }
      slider.addEventListener("input", pintar);
      $$(raiz, "[data-preset]").forEach(b => b.addEventListener("click", () => { slider.value = b.dataset.preset; pintar(); }));
      pintar();
    }
  };

  /* ======================================================
     4 · CONVERSOR DE TASAS: TEM ↔ TNA ↔ TEA
     ====================================================== */
  H.tasas = {
    render() {
      return `
        <div class="tool tool-tasas">
          <div class="tool-head"><span class="tool-kicker">Herramienta</span><h4>Conversor de tasas</h4></div>
          <p class="tool-hint">Escribí cualquiera de las tres y se calculan las otras dos.</p>
          <div class="tasas-row">
            <label class="num-field"><span>TEM</span><input type="number" step="0.01" value="2.08" data-t="tem" inputmode="decimal"><em>% mensual</em></label>
            <span class="tasas-eq">=</span>
            <label class="num-field"><span>TNA</span><input type="number" step="0.01" data-t="tna" inputmode="decimal"><em>% anual simple</em></label>
            <span class="tasas-eq">=</span>
            <label class="num-field"><span>TEA</span><input type="number" step="0.01" data-t="tea" inputmode="decimal"><em>% anual compuesta</em></label>
          </div>
          <p class="tool-foot" data-nota></p>
        </div>`;
    },
    init(raiz) {
      const f = k => $(raiz, `[data-t=${k}]`);
      function desde(k) {
        const v = parseFloat(f(k).value);
        if (!isFinite(v)) return;
        let tem;
        if (k === "tem") tem = v / 100;
        if (k === "tna") tem = v / 1200;
        if (k === "tea") tem = Math.pow(1 + v / 100, 1 / 12) - 1;
        if (k !== "tem") f("tem").value = (tem * 100).toFixed(2);
        if (k !== "tna") f("tna").value = (tem * 1200).toFixed(2);
        if (k !== "tea") f("tea").value = ((Math.pow(1 + tem, 12) - 1) * 100).toFixed(2);
        const tna = tem * 1200, tea = (Math.pow(1 + tem, 12) - 1) * 100;
        $(raiz, "[data-nota]").textContent = `La diferencia entre TEA y TNA (${fmt(tea - tna, 1)} p.p.) es el efecto de reinvertir los intereses todos los meses.`;
      }
      ["tem", "tna", "tea"].forEach(k => f(k).addEventListener("input", () => desde(k)));
      desde("tem");
    }
  };

  /* ======================================================
     5 · DÓLAR BREAKEVEN DE UNA LECAP
     ====================================================== */
  H["breakeven-fx"] = {
    render() {
      return `
        <div class="tool tool-befx">
          <div class="tool-head"><span class="tool-kicker">Herramienta</span><h4>¿Hasta qué dólar conviene estar en pesos?</h4></div>
          <div class="tasas-row">
            <label class="num-field"><span>Dólar hoy</span><input type="number" step="1" value="1550" data-i="fx"><em>$ por USD</em></label>
            <label class="num-field"><span>TEM</span><input type="number" step="0.01" value="2.08" data-i="tem"><em>% mensual</em></label>
            <label class="num-field"><span>Plazo</span><input type="number" step="1" value="76" data-i="dias"><em>días</em></label>
          </div>
          <div class="befx-result" data-res></div>
          <label class="tool-field">Si creés que al vencimiento el dólar va a estar en <output data-o="esp">$1.650</output>
            <input type="range" min="1300" max="2200" step="5" value="1650" data-i="esp"></label>
          <div class="verdict" data-verdict></div>
        </div>`;
    },
    init(raiz) {
      const v = k => parseFloat($(raiz, `[data-i=${k}]`).value);
      function pintar() {
        const fx = v("fx"), tem = v("tem") / 100, dias = v("dias"), esp = v("esp");
        if (![fx, tem, dias].every(isFinite)) return;
        const rend = Math.pow(1 + tem, dias / 30) - 1;
        const be = fx * (1 + rend);
        $(raiz, "[data-res]").innerHTML = `
          <div class="kpi"><span>Rendimiento en pesos del período</span><strong>${fmt(rend * 100, 2)}%</strong></div>
          <div class="kpi kpi-accent"><span>Dólar breakeven</span><strong>$${fmt(be, 0)}</strong></div>`;
        $(raiz, "[data-o=esp]").textContent = "$" + fmt(esp, 0);
        const difPct = (esp / be - 1) * 100;
        $(raiz, "[data-verdict]").className = "verdict " + (esp < be ? "ok" : "bad");
        $(raiz, "[data-verdict]").innerHTML = esp < be
          ? `Con un dólar de $${fmt(esp, 0)}, <strong>ganaste estando en pesos</strong>: el dólar subió menos que la tasa (${fmt(-difPct, 1)}% por debajo del breakeven).`
          : `Con un dólar de $${fmt(esp, 0)}, <strong>convenía dolarizarse</strong>: el dólar subió más que la tasa (${fmt(difPct, 1)}% por encima del breakeven).`;
      }
      $$(raiz, "input").forEach(i => i.addEventListener("input", pintar));
      pintar();
    }
  };

  /* ======================================================
     6 · INFLACIÓN BREAKEVEN: TASA FIJA vs CER
     ====================================================== */
  H["breakeven-cer"] = {
    render() {
      return `
        <div class="tool tool-becer">
          <div class="tool-head"><span class="tool-kicker">Herramienta</span><h4>Tasa fija o CER: ¿cuál gana?</h4></div>
          <div class="tasas-row">
            <label class="num-field"><span>Tasa fija</span><input type="number" step="0.1" value="30" data-i="fija"><em>% efectiva anual</em></label>
            <label class="num-field"><span>CER</span><input type="number" step="0.1" value="8" data-i="real"><em>% real anual</em></label>
          </div>
          <div class="befx-result" data-res></div>
          <label class="tool-field tool-field-strong">Inflación mensual que esperás <output data-o="inf">1,8%</output>
            <input type="range" min="0.5" max="4" step="0.1" value="1.8" data-i="inf"></label>
          <div class="duel" data-duel></div>
          <p class="tool-foot">Compará siempre instrumentos del mismo plazo. Los datos de entrada son hipotéticos: reemplazalos por los de la pantalla del día.</p>
        </div>`;
    },
    init(raiz) {
      const v = k => parseFloat($(raiz, `[data-i=${k}]`).value);
      function pintar() {
        const fija = v("fija") / 100, real = v("real") / 100, infM = v("inf") / 100;
        if (![fija, real].every(isFinite)) return;
        const beA = (1 + fija) / (1 + real) - 1, beM = Math.pow(1 + beA, 1 / 12) - 1;
        const infA = Math.pow(1 + infM, 12) - 1, cerNom = (1 + real) * (1 + infA) - 1;
        $(raiz, "[data-res]").innerHTML = `
          <div class="kpi kpi-accent"><span>Inflación breakeven</span><strong>${fmt(beM * 100, 2)}% mensual</strong><small>${fmt(beA * 100, 1)}% anual</small></div>`;
        $(raiz, "[data-o=inf]").textContent = fmt(infM * 100, 1) + "%";
        const max = Math.max(fija, cerNom) * 1.1;
        const gana = cerNom > fija ? "cer" : "fija";
        $(raiz, "[data-duel]").innerHTML = `
          <div class="duel-row ${gana === "fija" ? "win" : ""}"><span>Tasa fija</span><div class="duel-bar"><i style="width:${fija / max * 100}%"></i></div><b>${fmt(fija * 100, 1)}%</b></div>
          <div class="duel-row ${gana === "cer" ? "win" : ""}"><span>CER (nominal con tu inflación)</span><div class="duel-bar"><i style="width:${cerNom / max * 100}%"></i></div><b>${fmt(cerNom * 100, 1)}%</b></div>
          <p class="duel-msg">Con ${fmt(infM * 100, 1)}% mensual de inflación, <strong>${gana === "cer" ? "gana el CER" : "gana la tasa fija"}</strong>${Math.abs(cerNom - fija) < 0.005 ? " por muy poco: estás casi en el breakeven" : ""}.</p>`;
      }
      $$(raiz, "input").forEach(i => i.addEventListener("input", pintar));
      pintar();
    }
  };

  /* ======================================================
     7 · CRECIMIENTO, MÚLTIPLO Y RENDIMIENTO
     ====================================================== */
  H["pe-crecimiento"] = {
    render() {
      return `
        <div class="tool tool-pe">
          <div class="tool-head"><span class="tool-kicker">Herramienta</span><h4>¿Cuánto puede rendir una acción?</h4></div>
          <div class="tool-grid">
            <div class="tool-inputs">
              <div class="tasas-row">
                <label class="num-field"><span>Precio hoy</span><input type="number" step="1" value="1490" data-i="precio"><em>USD</em></label>
                <label class="num-field"><span>Ganancia por acción</span><input type="number" step="0.01" value="38.26" data-i="eps"><em>USD, este año</em></label>
              </div>
              <label class="tool-field">Crecimiento anual de la ganancia <output data-o="g">30%</output>
                <input type="range" min="-10" max="50" step="1" value="30" data-i="g"></label>
              <label class="tool-field">Años <output data-o="n">3</output>
                <input type="range" min="1" max="8" step="1" value="3" data-i="n"></label>
              <label class="tool-field tool-field-strong">P/E que le pone el mercado al final <output data-o="pef">25</output>
                <input type="range" min="8" max="60" step="1" value="25" data-i="pef"></label>
            </div>
            <div class="tool-outputs">
              <div class="kpis">
                <div class="kpi"><span>P/E de hoy</span><strong data-k="pe0">—</strong><small>precio ÷ ganancia</small></div>
                <div class="kpi"><span>Ganancia final</span><strong data-k="epsf">—</strong><small>por acción</small></div>
                <div class="kpi"><span>Precio final</span><strong data-k="pf">—</strong><small>ganancia × P/E final</small></div>
              </div>
              <div class="pe-result" data-res></div>
              <div class="pe-split" data-split></div>
            </div>
          </div>
          <p class="tool-foot">Valores iniciales: precio de MELI al 10/11/2026 y ganancia por acción esperada para 2026 según el consenso de analistas (TIKR). El resto son supuestos para jugar: no es una proyección. No incluye dividendos.</p>
        </div>`;
    },
    init(raiz) {
      const v = k => parseFloat($(raiz, `[data-i=${k}]`).value);
      function pintar() {
        const p = v("precio"), e = v("eps"), g = v("g") / 100, n = v("n"), pef = v("pef");
        $(raiz, "[data-o=g]").textContent = fmt(g * 100, 0) + "%";
        $(raiz, "[data-o=n]").textContent = n + (n === 1 ? " año" : " años");
        $(raiz, "[data-o=pef]").textContent = pef + " veces";
        if (!(p > 0 && e > 0)) return;
        const pe0 = p / e, ef = e * Math.pow(1 + g, n), pf = ef * pef;
        const anual = Math.pow(pf / p, 1 / n) - 1;
        const efMult = Math.pow(pef / pe0, 1 / n) - 1;
        $(raiz, "[data-k=pe0]").textContent = fmt(pe0, 1) + "x";
        $(raiz, "[data-k=epsf]").textContent = "$" + fmt(ef, 2);
        $(raiz, "[data-k=pf]").textContent = "$" + fmt(pf, 0);
        $(raiz, "[data-res]").className = "pe-result " + (anual >= 0 ? "ok" : "bad");
        $(raiz, "[data-res]").innerHTML = `<span>Rendimiento anual de la acción</span><strong>${fmtSigno(anual * 100)}%</strong>`;
        const max = Math.max(Math.abs(g), Math.abs(efMult), 0.05);
        const fila = (nombre, val) => `<div class="pe-row"><span>${nombre}</span><div class="pe-bar"><i class="${val < 0 ? "neg" : "pos"}" style="width:${Math.abs(val) / max * 50}%;${val < 0 ? "right:50%" : "left:50%"}"></i><b></b></div><em>${fmtSigno(val * 100)}%</em></div>`;
        $(raiz, "[data-split]").innerHTML = `<span class="contrib-title">De dónde sale (por año)</span>
          ${fila("Crecimiento de la ganancia", g)}${fila("Cambio del múltiplo", efMult)}`;
      }
      $$(raiz, "input").forEach(i => i.addEventListener("input", pintar));
      pintar();
    }
  };

  AULA.herramientas = H;

  /* ======================================================
     GRÁFICOS ESTÁTICOS
     ====================================================== */
  const G = {};

  G.triangulo = () => `
    <figure class="figura">
      <svg viewBox="0 0 520 330" class="svgchart tri" role="img" aria-label="Triángulo de liquidez, riesgo y rentabilidad">
        <polygon class="tri-shape" points="260,30 70,290 450,290"/>
        <circle class="tri-v" cx="260" cy="30" r="7"/><circle class="tri-v" cx="70" cy="290" r="7"/><circle class="tri-v" cx="450" cy="290" r="7"/>
        <text class="tri-label" x="260" y="16" text-anchor="middle">LIQUIDEZ</text>
        <text class="tri-label" x="60" y="318" text-anchor="middle">SEGURIDAD</text>
        <text class="tri-label" x="460" y="318" text-anchor="middle">RENTABILIDAD</text>
        <g class="tri-side"><text x="135" y="150" text-anchor="end">Caución, money market</text><text x="135" y="168" text-anchor="end" class="tri-sub">resigna rentabilidad</text></g>
        <g class="tri-side"><text x="385" y="150">Acciones, bonos largos</text><text x="385" y="168" class="tri-sub">resigna seguridad</text></g>
        <g class="tri-side"><text x="260" y="276" text-anchor="middle">Plazos largos, activos poco negociados</text><text x="260" y="258" text-anchor="middle" class="tri-sub">resigna liquidez</text></g>
      </svg>
      <figcaption>Cada lado del triángulo une dos virtudes y resigna la tercera.</figcaption>
    </figure>`;

  G["formas-curva"] = () => {
    const mini = (titulo, pts, cls) => {
      const d = pts.map((y, i) => (i ? "L" : "M") + (14 + i * 30) + "," + (80 - y)).join(" ");
      return `<div class="mini-curve"><svg viewBox="0 0 160 96" class="svgchart"><line class="g" x1="10" x2="154" y1="84" y2="84"/><line class="g" x1="10" x2="10" y1="8" y2="84"/><path class="curve ${cls}" d="${d}"/>${pts.map((y, i) => `<circle class="dot-s" cx="${14 + i * 30}" cy="${80 - y}" r="3"/>`).join("")}</svg><span>${titulo}</span></div>`;
    };
    return `<figure class="figura"><div class="mini-curves">
      ${mini("Normal", [14, 34, 47, 55, 60], "")}
      ${mini("Plana", [40, 42, 41, 43, 42], "c-flat")}
      ${mini("Invertida", [64, 50, 40, 34, 30], "c-inv")}
    </div><figcaption>Eje vertical: TIR. Eje horizontal: plazo o duration.</figcaption></figure>`;
  };

  G["curva-outlier"] = () => {
    const W = 520, Hh = 260, m = { l: 46, r: 20, t: 16, b: 38 };
    const bonos = [["A", 0.8, 6.1], ["B", 1.9, 7.6], ["C", 3.0, 8.4], ["D", 3.6, 10.6], ["E", 4.6, 9.2], ["F", 6.2, 9.7]];
    const X = x => m.l + (x / 7) * (W - m.l - m.r), Y = y => m.t + (1 - (y - 5) / 7) * (Hh - m.t - m.b);
    const fit = x => 5.6 + 2.15 * Math.log(1 + x);
    let d = ""; for (let x = 0.4; x <= 6.8; x += 0.1) d += (d ? "L" : "M") + X(x).toFixed(1) + "," + Y(fit(x)).toFixed(1);
    let grid = ""; for (let y = 6; y <= 12; y += 2) grid += `<line class="g" x1="${m.l}" x2="${W - m.r}" y1="${Y(y)}" y2="${Y(y)}"/><text class="ax" x="${m.l - 6}" y="${Y(y) + 4}" text-anchor="end">${y}%</text>`;
    for (let x = 1; x <= 6; x++) grid += `<text class="ax" x="${X(x)}" y="${Hh - 18}" text-anchor="middle">${x}</text>`;
    return `<figure class="figura"><svg viewBox="0 0 ${W} ${Hh}" class="svgchart" role="img" aria-label="Curva ilustrativa con un bono fuera de la tendencia">
      ${grid}<path class="curve c-fit" d="${d}"/>
      ${bonos.map(([n, x, y]) => `<circle class="dot ${n === "D" ? "" : "dot-plain"}" cx="${X(x)}" cy="${Y(y)}" r="7"/><text class="pt-label" x="${X(x)}" y="${Y(y) - 12}" text-anchor="middle">${n}</text>`).join("")}
      <text class="ax-title" x="${(W + m.l) / 2}" y="${Hh - 2}" text-anchor="middle">Duration modificada</text>
      <text class="ax-title" transform="translate(12 ${Hh / 2}) rotate(-90)" text-anchor="middle">TIR</text>
    </svg><figcaption>Curva ilustrativa (no son bonos reales): la línea es la tendencia de los bonos comparables.</figcaption></figure>`;
  };

  G.riesgopais = () => {
    const datos = AULA.mercado.riesgoPais;
    const W = 520, Hh = 250, m = { l: 46, r: 24, t: 20, b: 40 };
    const idx = Object.fromEntries(datos.map((p, i) => [p.fecha, i]));
    const X = f => m.l + 20 + idx[f] / (datos.length - 1) * (W - m.l - m.r - 40);
    const Y = v => m.t + (1 - (v - 300) / 700) * (Hh - m.t - m.b);
    const d = datos.map((p, i) => (i ? "L" : "M") + X(p.fecha).toFixed(1) + "," + Y(p.valor).toFixed(1)).join(" ");
    let grid = ""; for (let v = 400; v <= 1000; v += 200) grid += `<line class="g" x1="${m.l}" x2="${W - m.r}" y1="${Y(v)}" y2="${Y(v)}"/><text class="ax" x="${m.l - 6}" y="${Y(v) + 4}" text-anchor="end">${v}</text>`;
    return `<figure class="figura"><svg viewBox="0 0 ${W} ${Hh}" class="svgchart" role="img" aria-label="Evolución del riesgo país">
      ${grid}<path class="curve c-risk" d="${d}"/>
      ${datos.map(p => `<circle class="dot-s dot-risk" cx="${X(p.fecha)}" cy="${Y(p.valor)}" r="4.5"/><text class="pt-label" x="${X(p.fecha)}" y="${Y(p.valor) - 11}" text-anchor="middle">${p.valor}</text><text class="ax" x="${X(p.fecha)}" y="${Hh - 20}" text-anchor="middle">${p.etiqueta}</text>`).join("")}
    </svg><figcaption>Riesgo país en puntos básicos, puntos seleccionados (no es una serie diaria). Fuentes: Forbes Argentina, Invecq.</figcaption></figure>`;
  };

  G["proceso-inversion"] = () => {
    const pasos = [["Perfil", "¿Para qué es la plata y cuánto riesgo tolera?", 0], ["Asignación", "¿Cuánto va a acciones?", 0], ["Selección", "¿Qué empresas?", 1], ["Ejecución", "¿A qué precio y cómo opero?", 0], ["Seguimiento", "¿La razón de compra sigue en pie?", 1]];
    return `<figure class="figura"><ol class="proceso">${pasos.map(([t, d, f], i) => `
      <li class="${f ? "is-fund" : ""}"><span class="proceso-n">${i + 1}</span><strong>${t}</strong><small>${d}</small>${f ? `<em>Análisis fundamental</em>` : ""}</li>`).join("")}</ol>
      <figcaption>El análisis fundamental entra en la selección y vuelve en el seguimiento, cada vez que la empresa presenta resultados.</figcaption></figure>`;
  };

  G.margenes = () => {
    const datos = [
      { n: "MercadoLibre", t: "MELI", ventas: 10750, op: 676, neta: 448 },
      { n: "Vista", t: "VIST", ventas: 1234, op: null, neta: 293.5 },
      { n: "JPMorgan", t: "JPM", ventas: 50200, op: null, neta: 15300 }
    ];
    return `<figure class="figura"><div class="margen-grid">${datos.map(d => {
      const m = d.neta / d.ventas * 100;
      return `<div class="margen-card"><span class="margen-t">${d.t}</span><strong>${d.n}</strong>
        <div class="margen-bar"><i style="width:${m}%"></i></div>
        <p><b>${fmt(m, 0)}</b> de cada 100 dólares de ingresos quedan como ganancia neta</p>
        <small>Ingresos USD ${fmt(d.ventas, 0)} M · ganancia USD ${fmt(d.neta, 0)} M</small></div>`;
    }).join("")}</div>
    <figcaption>Tercer trimestre de 2026. Margen neto = ganancia neta ÷ ingresos. Fuentes: MercadoLibre (4/11), Vista Energy (28/10) y JPMorgan (13/10). En los bancos, "ingresos" son los ingresos netos de intereses y comisiones.</figcaption></figure>`;
  };

  AULA.graficos = G;
})();
