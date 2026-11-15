/* ============================================================
   HERRAMIENTAS Y GRÁFICOS DEL MÓDULO DE FCI
   Datos de factsheets Balanz al 30/09/2026.
   ============================================================ */
(function () {
  const H = AULA.herramientas, G = AULA.graficos;
  const fmt = (n, d = 1) => Number(n).toLocaleString("es-AR", { minimumFractionDigits: d, maximumFractionDigits: d });
  const $ = (r, s) => r.querySelector(s), $$ = (r, s) => Array.from(r.querySelectorAll(s));

  /* ---------------- Datos de los dos factsheets ---------------- */
  const FONDOS = {
    lecaps: {
      nombre: "Balanz Lecaps", sub: "Performance II · FCI de renta fija en pesos",
      fecha: "Informe mensual al 30/09/2026",
      datos: [["Patrimonio", "$ 154.641 millones"], ["Moneda", "Pesos"], ["Horizonte", "Corto plazo"], ["Rescate", "T+0"], ["Inversión mínima", "$ 1.000"], ["Calificación", "AAAf(arg)"]],
      objetivo: "Apreciación del capital a través de un portafolio diversificado de Letras Capitalizables (Lecaps) de corto plazo e instrumentos de liquidez inmediata.",
      tir: "25,5%", dur: "0,2 años",
      comp: [["Lecaps menores a 90 días", 59.1], ["Lecaps mayores a 90 días", 15.1], ["Plazos fijos", 13.1], ["Bonos soberanos CER", 10.5], ["Liquidez", 2.2]],
      top: null,
      fees: [["Clase A", "2,45%"], ["Clase B", "2,00%"], ["Clase C", "1,65%"], ["Clase D", "1,60%"], ["Depositaria", "0,095%+IVA"]],
      rend: "2026 hasta septiembre: 21,97% (clase A)"
    },
    sudam: {
      nombre: "Balanz Sudamericano", sub: "Latam sin Argentina · FCI de renta fija en dólares",
      fecha: "Informe mensual al 30/09/2026",
      datos: [["Patrimonio", "USD 16,4 millones"], ["Moneda", "Dólares"], ["Horizonte", "Mediano plazo"], ["Rescate", "48 hs"], ["Inversión mínima", "USD 100"], ["Calificación", "AAAf(arg)"]],
      objetivo: "Maximizar el retorno con una cartera diversificada de renta fija en dólares (corporativa y soberana) de países del Mercosur y Chile, excluida Argentina.",
      tir: "5,33%", dur: "1,0 año",
      comp: [["Corporativos de Chile", 39.7], ["Soberanos de Brasil", 15.7], ["Soberanos de Uruguay", 15.3], ["Soberanos de Chile", 9.1], ["Soberanos de Paraguay", 8.6], ["Corporativos de Brasil", 7.8], ["Liquidez", 3.8]],
      top: ["Bono soberano de Brasil", "Bono soberano de Uruguay", "Bono soberano de Chile", "Banco de Crédito e Inversiones", "Petrobras", "Codelco", "Falabella", "Bono soberano de Paraguay", "Banco do Brasil", "Latam Airlines"],
      fees: [["Clase A", "1,00%"], ["Clase B", "0,75%"], ["Clase C", "0,60%"], ["Clase D", "0,60%"], ["Depositaria", "0,08%+IVA"]],
      rend: "2026 hasta septiembre: 1,24% (clase E)"
    }
  };

  const PUNTOS = {
    estrategia: { n: "1 · Estrategia", lecaps: {
        dice: "Lecaps de corto plazo e instrumentos de liquidez inmediata.",
        lee: "Es un fondo para pesos de corto plazo: rinde parecido a una Lecap corta, con rescate en el día.",
        pregunta: "¿Coincide con lo que necesita el cliente? ¿Y con lo que realmente tiene adentro? (Mirá la composición.)" },
      sudam: {
        dice: "Renta fija en dólares de Mercosur y Chile, sin Argentina.",
        lee: "Sirve para tener dólares rindiendo sin riesgo argentino. Que sea 'sin Argentina' es la clave: hay otro fondo Latam de Balanz que sí incluye Argentina.",
        pregunta: "¿El cliente quiere sacarse riesgo argentino, o solo quiere renta en dólares? Son fondos distintos." } },
    tir: { n: "2 · TIR", lecaps: {
        dice: "TIR de 25,5% anual.",
        lee: "Es lo que rinde hoy la cartera si los activos se mantienen hasta el vencimiento. No es una promesa, y en general está calculada antes de descontar las comisiones del fondo.",
        pregunta: "¿Le gana a la inflación esperada? ¿Cuánto le queda después de la comisión de su clase?" },
      sudam: {
        dice: "TIR de 5,33% anual en dólares.",
        lee: "Es una tasa de bonos de buena calidad: no esperes 9% o 10% como en un bono argentino. Ese menor rendimiento es el precio de no tener riesgo argentino.",
        pregunta: "Con 1% de comisión en la clase A, ¿cuánto le queda? (Spoiler: alrededor de 4,2%.)" } },
    dur: { n: "3 · Duration", lecaps: {
        dice: "Duration de 0,2 años.",
        lee: "Muy baja: si las tasas en pesos suben 1 p.p., la cuotaparte cae cerca de 0,2%. Por eso casi no tiene días malos.",
        pregunta: "¿Es coherente con 'corto plazo'? Sí. ¿Podría tener un mal día? Sí, pero chico: el peor fue −0,89%." },
      sudam: {
        dice: "Duration de 1 año.",
        lee: "Baja para un fondo de 'mediano plazo': si las tasas suben 1 p.p., la cuotaparte cae cerca de 1%. Aun así tuvo dos años negativos (2021 y 2022), cuando subieron las tasas en el mundo.",
        pregunta: "¿El cliente entiende que un fondo en dólares conservador también puede terminar un año en negativo?" } },
    comp: { n: "4 · Composición y top 10", lecaps: {
        dice: "74% en Lecaps, 13% en plazos fijos, 10,5% en bonos CER, 2% de liquidez.",
        lee: "Un cuarto de la cartera no son Lecaps: plazos fijos y bonos CER. Está dentro de lo que permite su reglamento, pero no es lo que sugiere el nombre.",
        pregunta: "¿Cambia algo para el cliente? Poco, pero el 10% en CER se comporta distinto que una Lecap. Y el factsheet no trae el top 10: hay que buscar la cartera completa." },
      sudam: {
        dice: "40% corporativos de Chile, 49% soberanos de Brasil, Uruguay, Chile y Paraguay, 8% corporativos de Brasil.",
        lee: "El top 10 muestra nombres (Brasil, Uruguay, Codelco, Petrobras...), pero sin porcentajes: no sabés cuánto pesa cada uno.",
        pregunta: "Si al cliente le preocupa Brasil (como pasó con la elección de Lula), ¿cuánto de este fondo es Brasil? Sumando: alrededor de 23%." } },
    fees: { n: "5 · Comisiones", lecaps: {
        dice: "Clase A 2,45%, clase D 1,60%, depositaria 0,095% + IVA. Sin comisión de entrada ni de salida.",
        lee: "Con una TIR de 25,5%, la clase A se lleva cerca de un décimo del rendimiento. La diferencia entre A y D es 0,85 p.p. por año, para el mismo fondo.",
        pregunta: "¿En qué clase está tu cliente? Depende del monto o del tipo de inversor: averiguá a cuál accede." },
      sudam: {
        dice: "Clase A 1,00%, clase D 0,60%, depositaria 0,08% + IVA.",
        lee: "La comisión parece más baja que en el fondo de Lecaps, pero sobre una TIR de 5,33% la clase A se come cerca de un 20% del rendimiento.",
        pregunta: "El cuadro de rentabilidad es de la clase E, que no figura en la lista de comisiones. ¿Qué clase vas a ofrecer y cuánto rindió esa?" } }
  };

  H["factsheet"] = {
    render() {
      return `
        <div class="tool tool-fs">
          <div class="tool-head"><span class="tool-kicker">Herramienta</span><h4>Leer un factsheet en cinco claves</h4></div>
          <p class="tool-hint">Elegí el fondo y tocá cada número. Es la misma rutina para cualquier fondo de cualquier gestora.</p>
          <div class="fs-switch">${Object.entries(FONDOS).map(([k, f], i) => `<button type="button" class="chip ${i === 0 ? "is-on" : ""}" data-f="${k}">${f.nombre}</button>`).join("")}</div>
          <div class="fs-grid"><div class="fs-sheet" data-sheet></div><div class="fs-panel" data-panel></div></div>
          <p class="tool-foot">Datos de los factsheets de Balanz al 30/09/2026. Estos números cambian todos los meses: siempre mirá el último informe.</p>
        </div>`;
    },
    init(raiz) {
      let fondo = "lecaps", punto = "estrategia";
      const pin = k => `<button type="button" class="fs-pin ${k === punto ? "is-on" : ""}" data-p="${k}">${PUNTOS[k].n.split(" ")[0]}</button>`;
      function hoja() {
        const f = FONDOS[fondo], max = Math.max(...f.comp.map(c => c[1]));
        $(raiz, "[data-sheet]").innerHTML = `
          <div class="fs-top"><div><strong>${f.nombre}</strong><small>${f.sub}</small></div><span>${f.fecha}</span></div>
          <div class="fs-row fs-obj ${punto === "estrategia" ? "hl" : ""}">${pin("estrategia")}<div><em>Objetivo y política de inversión</em><p>${f.objetivo}</p></div></div>
          <div class="fs-cols">
            <div class="fs-side">
              ${f.datos.map(([a, b]) => `<div class="fs-kv"><span>${a}</span><b>${b}</b></div>`).join("")}
              <div class="fs-kv big ${punto === "tir" ? "hl" : ""}">${pin("tir")}<span>TIR</span><b>${f.tir}</b></div>
              <div class="fs-kv big ${punto === "dur" ? "hl" : ""}">${pin("dur")}<span>Duration</span><b>${f.dur}</b></div>
              <div class="fs-fees ${punto === "fees" ? "hl" : ""}">${pin("fees")}<span>Honorarios</span>${f.fees.map(([a, b]) => `<div><i>${a}</i><b>${b}</b></div>`).join("")}</div>
            </div>
            <div class="fs-main ${punto === "comp" ? "hl" : ""}">${pin("comp")}
              <em>Composición de la cartera</em>
              ${f.comp.map(([a, v]) => `<div class="fs-bar"><span>${a}</span><i style="width:${v / max * 100}%"></i><b>${fmt(v)}%</b></div>`).join("")}
              <em class="fs-top10">Top 10</em>
              ${f.top ? `<ol>${f.top.map(t => `<li>${t}</li>`).join("")}</ol><small class="fs-note">Sin porcentajes</small>` : `<small class="fs-note">El factsheet no lo informa</small>`}
              <div class="fs-rend">${f.rend}</div>
            </div>
          </div>`;
      }
      function panel() {
        const p = PUNTOS[punto], d = p[fondo];
        $(raiz, "[data-panel]").innerHTML = `
          <span class="fs-pt">${p.n}</span>
          <div><em>Qué dice</em><p>${d.dice}</p></div>
          <div><em>Cómo se lee</em><p>${d.lee}</p></div>
          <div class="fs-q"><em>La pregunta que te hacés</em><p>${d.pregunta}</p></div>
          <div class="fs-nav">${Object.keys(PUNTOS).map(k => `<button type="button" data-p="${k}" class="${k === punto ? "is-on" : ""}" aria-label="${PUNTOS[k].n}"></button>`).join("")}</div>`;
      }
      function pintar() { hoja(); panel(); }
      raiz.addEventListener("click", ev => {
        const f = ev.target.closest("[data-f]");
        if (f) { fondo = f.dataset.f; $$(raiz, "[data-f]").forEach(x => x.classList.toggle("is-on", x === f)); pintar(); return; }
        const p = ev.target.closest("[data-p]");
        if (p) { punto = p.dataset.p; pintar(); }
      });
      pintar();
    }
  };

  /* ---------------- Calculadora de comisiones ---------------- */
  const PRESETS = {
    lecaps: { n: "Balanz Lecaps", tir: 25.5, dep: 0.115, mon: "$", monto: 10000000, clases: { A: 2.45, B: 2.0, C: 1.65, D: 1.6 } },
    sudam: { n: "Balanz Sudamericano", tir: 5.33, dep: 0.097, mon: "USD", monto: 20000, clases: { A: 1.0, B: 0.75, C: 0.6, D: 0.6 } }
  };
  H["fee-calc"] = {
    render() {
      return `
        <div class="tool tool-fee">
          <div class="tool-head"><span class="tool-kicker">Herramienta</span><h4>¿Cuánto se lleva la comisión?</h4></div>
          <p class="tool-hint">Elegí fondo y clase. La depositaria ya incluye IVA.</p>
          <div class="fee-ctrl">
            <div class="fee-chips">${Object.entries(PRESETS).map(([k, p], i) => `<button type="button" class="chip ${i === 0 ? "is-on" : ""}" data-fp="${k}">${p.n}</button>`).join("")}</div>
            <div class="fee-chips" data-clases></div>
          </div>
          <div class="fee-out" data-out></div>
          <p class="tool-foot">Cuenta aproximada: TIR de la cartera menos comisión de gerente y depositaria. Sirve para dimensionar, no para calcular al centavo.</p>
        </div>`;
    },
    init(raiz) {
      let f = "lecaps", c = "A";
      function pintar() {
        const p = PRESETS[f];
        $(raiz, "[data-clases]").innerHTML = Object.keys(p.clases).map(k => `<button type="button" class="chip ${k === c ? "is-on" : ""}" data-c="${k}">Clase ${k}</button>`).join("");
        const fee = p.clases[c] + p.dep, neta = p.tir - fee, pct = fee / p.tir * 100;
        const feeD = p.clases.D + p.dep, ahorro = (fee - feeD) / 100 * p.monto;
        $(raiz, "[data-out]").innerHTML = `
          <div class="fee-bar"><i class="neta" style="width:${neta / p.tir * 100}%"><b>Te queda ${fmt(neta, 2)}%</b></i><i class="com" style="width:${pct}%"></i></div>
          <div class="fee-kpis">
            <div class="kpi"><span>TIR de la cartera</span><b>${fmt(p.tir, 2)}%</b></div>
            <div class="kpi"><span>Comisión total</span><b>${fmt(fee, 2)}%</b></div>
            <div class="kpi"><span>Parte del rendimiento</span><b class="${pct > 15 ? "bad" : ""}">${fmt(pct, 0)}%</b></div>
          </div>
          <p class="fee-msg">${c === "D" || p.clases[c] === p.clases.D ? `Es la clase más barata del fondo.` : `Sobre ${p.mon} ${p.monto.toLocaleString("es-AR")}, pasar de la clase ${c} a la D ahorra unos <strong>${p.mon} ${Math.round(ahorro).toLocaleString("es-AR")} por año</strong>, por el mismo fondo con los mismos activos.`}</p>`;
      }
      raiz.addEventListener("click", ev => {
        const a = ev.target.closest("[data-fp]");
        if (a) { f = a.dataset.fp; $$(raiz, "[data-fp]").forEach(x => x.classList.toggle("is-on", x === a)); pintar(); return; }
        const b = ev.target.closest("[data-c]");
        if (b) { c = b.dataset.c; pintar(); }
      });
      pintar();
    }
  };


  /* ---------------- Pasado contra futuro ---------------- */
  H["pasado-futuro"] = {
    render() {
      return `
        <div class="tool tool-pf">
          <div class="tool-head"><span class="tool-kicker">Herramienta</span><h4>Lo que rindió contra lo que rinde hoy</h4></div>
          <p class="tool-hint">Un fondo de bonos en dólares arranca el año con una TIR de 8%. Elegí su duration y cuánto se movieron las tasas durante el año.</p>
          <div class="pf-ctrl">
            <label class="tool-field">Duration del fondo <output data-o="d"></output>
              <input type="range" min="0.5" max="8" step="0.5" value="5" data-i="d"></label>
            <label class="tool-field">Tasas en el año <output data-o="t"></output>
              <input type="range" min="-3" max="4" step="0.5" value="3" data-i="t"></label>
          </div>
          <div class="pf-cols">
            <div class="pf-card"><em>Mirando para atrás</em><span>Lo que rindió en el año (lo que muestra el cuadro de rentabilidad)</span><b data-o="past"></b></div>
            <div class="pf-arrow" data-o="arrow">→</div>
            <div class="pf-card"><em>Mirando para adelante</em><span>Lo que rinde hoy la cartera (la nueva TIR)</span><b data-o="fut"></b></div>
          </div>
          <p class="pf-msg" data-o="msg"></p>
          <p class="tool-foot">Cuenta aproximada: rendimiento del año ≈ TIR inicial − duration × movimiento de tasas. Supone que los bonos pagan; si las tasas subieron por más riesgo de crédito, la TIR más alta también trae más riesgo.</p>
        </div>`;
    },
    init(raiz) {
      const d = $(raiz, "[data-i=d]"), t = $(raiz, "[data-i=t]"), o = k => $(raiz, `[data-o=${k}]`);
      const sg = v => (v > 0 ? "+" : v < 0 ? "−" : "") + fmt(Math.abs(v), 1) + "%";
      function pintar() {
        const D = +d.value, T = +t.value, past = 8 - D * T, fut = 8 + T;
        o("d").textContent = fmt(D, 1) + (D === 1 ? " año" : " años");
        o("t").textContent = (T > 0 ? "suben " : T < 0 ? "bajan " : "") + (T === 0 ? "sin cambios" : fmt(Math.abs(T), 1) + " puntos");
        o("past").textContent = sg(past); o("past").className = past < 0 ? "neg" : "";
        o("fut").textContent = fmt(fut, 1) + "%";
        o("arrow").textContent = (past < 8 && fut > 8) || (past > 8 && fut < 8) ? "⇄" : "→";
        let m;
        if (past < 0) {
          const meses = Math.log(1 / (1 + past / 100)) / Math.log(1 + fut / 100) * 12;
          m = `<strong>El cuadro muestra un año malo, pero hoy la cartera rinde más que antes.</strong> El pasado y el futuro apuntan para lados opuestos. Si las tasas se quedan ahí, el fondo recupera la caída en unos <strong>${Math.max(1, Math.round(meses))} meses</strong>; si vuelven a bajar, antes. Quien vende después de la caída se lleva la pérdida y se pierde la tasa alta.`;
        } else if (T < 0) {
          m = `<strong>El cuadro muestra un año muy bueno, pero lo que viene rinde menos.</strong> La baja de tasas ya está cobrada en el precio: quien entra hoy por "lo que rindió el año pasado" compra una TIR de ${fmt(fut, 1)}%.`;
        } else if (past < 8) {
          m = `El año fue flojo por la suba de tasas, pero la cartera hoy rinde ${fmt(fut, 1)}%: un poco más que al principio.`;
        } else {
          m = `Sin movimiento de tasas, lo que rindió y lo que rinde coinciden: es el único caso en que el pasado sirve como guía.`;
        }
        o("msg").innerHTML = m;
      }
      [d, t].forEach(x => x.addEventListener("input", pintar)); pintar();
    }
  };

  /* ---------------- Gráficos ---------------- */
  G["mapa-fondos"] = () => {
    const filas = [
      ["Pesos", [
        ["Money Market Pesos", "T+0", "Cauciones, cuentas remuneradas, plazos fijos", 1, "ar"],
        ["Lecaps (Performance II)", "T+0", "Lecaps cortas", 1, "ar"],
        ["Ahorro Corto Plazo", "T+1", "Renta fija en pesos de corto plazo", 2, "ar"],
        ["Dólar Linked", "T+1", "Bonos atados al dólar oficial", 2, "ar"],
        ["ONs (Performance III)", "T+1", "Obligaciones negociables", 3, "ar"]
      ]],
      ["Dólares", [
        ["Money Market USD", "T+0", "Cauciones y cuentas en dólares", 1, "ar"],
        ["Dólar Corto Plazo (Estrategia I)", "T+1", "Renta fija en dólares corta, mayormente corporativa", 2, "ar"],
        ["Corporativo (Ahorro USD)", "T+1", "ONs argentinas en dólares", 3, "ar"],
        ["Latam (Estrategia III)", "T+1", "Bonos de Latam, con Argentina", 3, "mix"],
        ["Sudamericano (Latam sin Arg.)", "48 hs", "Mercosur y Chile, sin Argentina", 2, "ex"],
        ["Soberano (Renta Fija USD)", "T+1", "Bonos soberanos argentinos", 4, "ar"],
        ["Renta Variable Global", "48 hs", "Acciones y ETFs del exterior, en dólar cable", 5, "ex"]
      ]]
    ];
    const tag = { ar: "Riesgo argentino", mix: "Argentina + región", ex: "Sin riesgo argentino" };
    return `<figure class="figura"><div class="mapaf">
      ${filas.map(([mon, fs]) => `<div class="mapaf-g"><h5>${mon}</h5>${fs.map(([n, r, d, risk, t]) => `
        <div class="mapaf-row"><div class="mapaf-n"><strong>${n}</strong><small>${d}</small></div>
          <span class="mapaf-t ${t}">${tag[t]}</span><span class="mapaf-r">${r}</span>
          <span class="mapaf-risk">${[1, 2, 3, 4, 5].map(i => `<i class="${i <= risk ? "on" : ""}"></i>`).join("")}</span></div>`).join("")}</div>`).join("")}
      <div class="mapaf-leg"><span>Plazo de rescate</span><span>Riesgo relativo (1 a 5, orientativo)</span></div>
    </div><figcaption>Parte de la línea de fondos de Balanz y su plazo de rescate según balanz.com (noviembre de 2026). El riesgo de 1 a 5 es una guía didáctica nuestra, no una calificación oficial.</figcaption></figure>`;
  };

  G["nombre-adentro"] = () => {
    const d = [["Lecaps < 90 días", 59.1, "a"], ["Lecaps > 90 días", 15.1, "a"], ["Plazos fijos", 13.1, "b"], ["Bonos CER", 10.5, "c"], ["Liquidez", 2.2, "d"]];
    return `<figure class="figura"><div class="nad">
      <div class="nad-title"><span>El nombre dice</span><strong>"Lecaps"</strong></div>
      <div class="nad-bar">${d.map(([n, v, k]) => `<i class="${k}" style="width:${v}%" title="${n}: ${fmt(v)}%"></i>`).join("")}</div>
      <div class="nad-leg">${d.map(([n, v, k]) => `<span><i class="${k}"></i>${n} <b>${fmt(v)}%</b></span>`).join("")}</div>
      <div class="nad-brace"><span style="width:74.2%">74% Lecaps</span><span style="width:25.8%">26% otra cosa</span></div>
    </div><figcaption>Composición de Balanz Lecaps al 30/09/2026 (factsheet de la gestora).</figcaption></figure>`;
  };

  G["sudam-anual"] = () => {
    const d = [["2019", 2.57], ["2020", 4.12], ["2021", -0.59], ["2022", -0.54], ["2023", 2.79], ["2024", 3.89], ["2025", 4.15], ["2026*", 1.24]];
    const max = 4.5, min = -1, H0 = 180, Y = v => (max - v) / (max - min) * H0;
    return `<figure class="figura"><div class="anual"><svg viewBox="0 0 560 ${H0 + 34}" class="svgchart" role="img" aria-label="Rendimiento anual del fondo Sudamericano">
      <line x1="30" x2="550" y1="${Y(0)}" y2="${Y(0)}" class="ax"/>
      ${d.map(([a, v], i) => { const x = 46 + i * 64, y = v >= 0 ? Y(v) : Y(0), h = Math.abs(Y(v) - Y(0));
        return `<rect x="${x}" y="${y}" width="40" height="${Math.max(h, 1)}" rx="3" class="${v < 0 ? "neg" : "pos"}"/>
          <text x="${x + 20}" y="${v >= 0 ? y - 6 : y + h + 14}" class="val">${fmt(v, 1)}%</text>
          <text x="${x + 20}" y="${H0 + 26}" class="yr">${a}</text>`; }).join("")}
    </svg></div><figcaption>Rendimiento anual de Balanz Sudamericano en dólares (clase E). *2026 hasta septiembre. Fuente: factsheet al 30/09/2026.</figcaption></figure>`;
  };
})();
