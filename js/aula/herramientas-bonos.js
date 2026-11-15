/* ============================================================
   HERRAMIENTA: EL ELÁSTICO DE LA TIR (módulo de Bonos)
   ============================================================ */
(function () {
  const H = AULA.herramientas;
  const fmt = (n, d = 1) => Number(n).toLocaleString("es-AR", { minimumFractionDigits: d, maximumFractionDigits: d });
  const sg = (n, d = 1) => (n > 0 ? "+" : n < 0 ? "−" : "") + fmt(Math.abs(n), d) + "%";
  const $ = (r, s) => r.querySelector(s);

  const TIR = 12, PLAZO = 12;

  H["elastico"] = {
    render() {
      return `
        <div class="tool tool-elastico">
          <div class="tool-head"><span class="tool-kicker">Herramienta</span><h4>El elástico de la TIR</h4></div>
          <p class="tool-hint">Un bono a 12 meses que, al comprarlo, rendía <strong>12% hasta el vencimiento</strong>: paga 112 por cada 100 invertidos. Mové cuánto tiempo pasó y cuánto rindió hasta hoy, y mirá cuánto le queda.</p>
          <div class="pf-ctrl">
            <label class="tool-field">Meses que pasaron <output data-o="m"></output>
              <input type="range" min="1" max="11" step="1" value="6" data-i="m"></label>
            <label class="tool-field">Rendimiento hasta hoy <output data-o="r"></output>
              <input type="range" min="-15" max="18" step="0.5" value="10" data-i="r"></label>
          </div>
          <div class="s77-presets"><span>Probá:</span>
            <button type="button" class="chip" data-p="6,10">Buen semestre</button>
            <button type="button" class="chip" data-p="6,6">En línea</button>
            <button type="button" class="chip" data-p="6,-5">Mal semestre</button>
            <button type="button" class="chip" data-p="10,11">Casi al final, ya ganó casi todo</button>
          </div>
          <div data-chart></div>
          <div class="fee-kpis el-kpis">
            <div class="kpi"><span>Rindió hasta hoy</span><b data-k="hoy"></b></div>
            <div class="kpi"><span>Le queda hasta el vencimiento</span><b data-k="queda"></b></div>
            <div class="kpi"><span>Equivale, por año, a</span><b data-k="anual"></b></div>
          </div>
          <p class="pf-msg" data-msg></p>
          <p class="tool-foot">Simplificación: un bono que paga todo al vencimiento y un camino en línea recta (1% por mes). Con cupones la lógica es la misma, mirando el retorno total. El punto final está atado <strong>siempre que el emisor pague</strong>.</p>
        </div>`;
    },
    init(raiz) {
      const im = $(raiz, "[data-i=m]"), ir = $(raiz, "[data-i=r]");
      function pintar() {
        const m = +im.value, r = +ir.value, rest = PLAZO - m;
        const queda = ((100 + TIR) / (100 + r) - 1) * 100;      // lo que falta, en %
        const anual = queda * 12 / rest;                          // aproximación lineal
        $(raiz, "[data-o=m]").textContent = `${m} ${m === 1 ? "mes" : "meses"} (faltan ${rest})`;
        $(raiz, "[data-o=r]").textContent = sg(r);
        $(raiz, "[data-k=hoy]").textContent = sg(r);
        $(raiz, "[data-k=queda]").textContent = `${sg(queda)} en ${rest} ${rest === 1 ? "mes" : "meses"}`;
        const ka = $(raiz, "[data-k=anual]"); ka.textContent = `≈ ${fmt(anual)}%`;
        ka.className = anual < TIR - 2 ? "neg" : anual > TIR + 2 ? "pos" : "";

        // gráfico
        const W = 640, Hh = 300, L = 46, R = 20, T = 18, B = 40;
        const ymin = -16, ymax = 22;
        const X = t => L + t / PLAZO * (W - L - R), Y = v => T + (ymax - v) / (ymax - ymin) * (Hh - T - B);
        const ticksY = [-15, -10, -5, 0, 5, 10, 15, 20];
        const ticksX = [0, 3, 6, 9, 12];
        const esp = TIR * m / PLAZO;
        $(raiz, "[data-chart]").innerHTML = `
          <svg viewBox="0 0 ${W} ${Hh}" class="el-svg" role="img" aria-label="Camino del rendimiento hasta el vencimiento">
            ${ticksY.map(v => `<line x1="${L}" x2="${W - R}" y1="${Y(v)}" y2="${Y(v)}" class="${v === 0 ? "zero" : "grid"}"/><text x="${L - 8}" y="${Y(v) + 4}" class="tk" text-anchor="end">${v > 0 ? "+" : ""}${v}%</text>`).join("")}
            ${ticksX.map(t => `<text x="${X(t)}" y="${Hh - 16}" class="tk" text-anchor="${t === 0 ? "start" : t === 12 ? "end" : "middle"}">${t === 0 ? "Compra" : t === 12 ? "Vencimiento" : "Mes " + t}</text>`).join("")}
            <line x1="${X(m)}" x2="${X(m)}" y1="${T}" y2="${Hh - B}" class="hoy-l"/>
            <text x="${X(m)}" y="${T + 10}" class="hoy-t" text-anchor="middle">hoy</text>
            <line x1="${X(0)}" y1="${Y(0)}" x2="${X(PLAZO)}" y2="${Y(TIR)}" class="esperado"/>
            <polyline points="${X(0)},${Y(0)} ${X(m)},${Y(r)}" class="pasado ${r < esp ? "abajo" : "arriba"}"/>
            <polyline points="${X(m)},${Y(r)} ${X(PLAZO)},${Y(TIR)}" class="futuro"/>
            <line x1="${X(m)}" x2="${X(m)}" y1="${Y(r)}" y2="${Y(esp)}" class="gap"/>
            <circle cx="${X(m)}" cy="${Y(esp)}" r="4" class="pt-esp"/>
            <circle cx="${X(m)}" cy="${Y(r)}" r="7" class="pt-hoy"/>
            <circle cx="${X(PLAZO)}" cy="${Y(TIR)}" r="7" class="pt-fin"/>
            <text x="${X(PLAZO) - 10}" y="${Y(TIR) - 12}" class="lab-fin" text-anchor="end">+12% al vencimiento</text>
            <text x="${X(m) + (m > 8 ? -12 : 12)}" y="${Y(r) + (r >= esp ? -10 : 18)}" class="lab-hoy" text-anchor="${m > 8 ? "end" : "start"}">hoy ${sg(r)}</text>
          </svg>
          <div class="el-leg"><span><i class="l-esp"></i>Camino esperado al comprar (1% por mes)</span><span><i class="l-pas"></i>Lo que pasó (verde si fue mejor que lo esperado, rojo si fue peor)</span><span><i class="l-fut"></i>Lo que queda</span></div>`;

        let msg;
        if (anual < TIR - 2) {
          msg = `<strong>El bono adelantó rendimiento.</strong> Ya ganó ${sg(r)} en ${m} ${m === 1 ? "mes" : "meses"}, más que lo esperado (${sg(esp, 0)}). Como el punto final está atado en +12%, lo que queda rinde solo ${sg(queda)} en ${rest} ${rest === 1 ? "mes" : "meses"}, unos ${fmt(anual)}% por año. Su TIR hoy es baja. Si el cliente dice "me quedo porque rinde 12%", ese 12% era desde la compra, no desde hoy. Si hay bonos parecidos que rinden más, conviene evaluar <strong>tomar la ganancia y rotar</strong>.`;
        } else if (anual > TIR + 2) {
          msg = `<strong>El bono se atrasó.</strong> ${r < 0 ? `Va ${sg(r)}` : `Ganó solo ${sg(r)}`}, menos que lo esperado (${sg(esp, 0)}). Pero el punto final sigue en +12%: lo que queda rinde ${sg(queda)} en ${rest} ${rest === 1 ? "mes" : "meses"}, unos ${fmt(anual)}% por año, más que cuando lo compró. Si el emisor paga, la caída se recupera sola; vender ahora la vuelve definitiva. Antes de tranquilizar al cliente, revisá <strong>por qué cayó</strong>: si es por más riesgo de que no pague, ese rendimiento extra es el pago por ese riesgo.`;
        } else {
          msg = `<strong>Va en línea con lo esperado.</strong> Lo que queda rinde cerca de 12% por año, igual que al comprarlo. No hay nada que corregir: el elástico está sin estirar.`;
        }
        $(raiz, "[data-msg]").innerHTML = msg;
      }
      [im, ir].forEach(x => x.addEventListener("input", pintar));
      raiz.addEventListener("click", ev => {
        const b = ev.target.closest("[data-p]"); if (!b) return;
        const [a, c] = b.dataset.p.split(","); im.value = a; ir.value = c; pintar();
      });
      pintar();
    }
  };
})();
