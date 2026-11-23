/* ============================================================
   HERRAMIENTAS DEL TALLER DE CARTERAS DE ACCIONES
   1 · corr-rv: dos acciones, cuánto baja el riesgo del conjunto
   2 · mapa-rv: pesos por país y por sector de tres carteras
   3 · caida-rv: beta, caída de la cartera y suba necesaria
   Los valores son ilustrativos, no mediciones de mercado.
   ============================================================ */
(function () {
  const H = AULA.herramientas;
  const fmt = (n, d = 1) => Number(n).toLocaleString("es-AR", { minimumFractionDigits: d, maximumFractionDigits: d });
  const $ = (r, s) => r.querySelector(s), $$ = (r, s) => Array.from(r.querySelectorAll(s));

  /* ======================================================
     1 · CORRELACIÓN
     ====================================================== */
  H["corr-rv"] = {
    render() {
      return `
        <div class="tool tool-rvcorr">
          <div class="tool-head"><span class="tool-kicker">Herramienta</span><h4>Dos acciones, mitad y mitad</h4></div>
          <label class="tool-field tool-field-strong">Cuánto se parecen sus movimientos (correlación) <output data-o="rho">0,8</output>
            <input type="range" min="-5" max="10" step="1" value="8" data-i="rho"></label>
          <div class="pagos-presets">
            <button type="button" class="chip" data-p="10">Idénticas (1,0)</button>
            <button type="button" class="chip" data-p="7">Muy parecidas (0,7)</button>
            <button type="button" class="chip" data-p="3">Poco relacionadas (0,3)</button>
            <button type="button" class="chip" data-p="0">Sin relación (0)</button>
            <button type="button" class="chip" data-p="-5">Se compensan (−0,5)</button>
          </div>
          <div class="rv-bars" data-bars></div>
          <p class="tool-foot">Cada acción, sola, tiene una volatilidad de 30% (cuánto se mueve en un año). La cartera es mitad y mitad entre las dos. Con correlación 1 no se gana nada; cuanto más baja la correlación, más se compensan. Valores ilustrativos.</p>
        </div>`;
    },
    init(raiz) {
      const s = $(raiz, "[data-i=rho]");
      function pintar() {
        const rho = +s.value / 10;
        const vol = 30 * Math.sqrt((1 + rho) / 2);
        const ahorro = (1 - vol / 30) * 100;
        $(raiz, "[data-o=rho]").textContent = fmt(rho, 1);
        const fila = (txt, v, cls) => `<div class="rv-row"><span class="rv-l">${txt}</span><span class="rv-track"><i class="${cls}" style="width:${Math.max(v / 30 * 100, 1)}%"></i></span><span class="rv-v">${fmt(v, 1)}%</span></div>`;
        $(raiz, "[data-bars]").innerHTML =
          fila("Una sola acción", 30, "rv-neutral") +
          fila("Las dos, mitad y mitad", vol, "rv-accent") +
          `<p class="rv-result">${ahorro < 0.5 ? "Sin beneficio: se mueven igual, así que mezclarlas no reduce el riesgo." : `El riesgo baja <strong>${fmt(ahorro, 0)}%</strong> respecto de tener una sola.`}</p>`;
      }
      s.addEventListener("input", pintar);
      $$(raiz, "[data-p]").forEach(b => b.addEventListener("click", () => { s.value = b.dataset.p; pintar(); }));
      pintar();
    }
  };

  /* ======================================================
     2 · MAPA DE CARTERA
     ====================================================== */
  const CARTERAS = {
    tech: {
      n: "Cinco tecnológicas de EE.UU.",
      pos: [
        ["NVDA", 20, "EE.UU.", "Tecnología"], ["MSFT", 20, "EE.UU.", "Tecnología"], ["AAPL", 20, "EE.UU.", "Tecnología"],
        ["META", 20, "EE.UU.", "Tecnología"], ["GOOGL", 20, "EE.UU.", "Tecnología"]
      ]
    },
    arg: {
      n: "Tres acciones argentinas",
      pos: [["YPF", 34, "Argentina", "Energía"], ["Galicia", 33, "Argentina", "Bancos"], ["Vista", 33, "Argentina", "Energía"]]
    },
    rep: {
      n: "Cartera repartida",
      pos: [
        ["ETF S&P 500", 30, "EE.UU.", "ETF amplio"], ["ETF Europa", 15, "Europa", "ETF amplio"], ["ETF Brasil", 10, "Brasil", "ETF amplio"],
        ["Johnson & Johnson", 10, "EE.UU.", "Salud"], ["JPMorgan", 10, "EE.UU.", "Bancos"], ["ExxonMobil", 10, "EE.UU.", "Energía"],
        ["YPF", 10, "Argentina", "Energía"], ["Galicia", 5, "Argentina", "Bancos"]
      ]
    }
  };
  const suma = (pos, i) => { const m = {}; pos.forEach(p => { m[p[i]] = (m[p[i]] || 0) + p[1]; }); return Object.entries(m).sort((a, b) => b[1] - a[1]); };

  H["mapa-rv"] = {
    render() {
      return `
        <div class="tool tool-rvmapa">
          <div class="tool-head"><span class="tool-kicker">Herramienta</span><h4>¿Dónde está concentrada esta cartera?</h4></div>
          <div class="pagos-presets">${Object.entries(CARTERAS).map(([k, c], i) => `<button type="button" class="chip ${i === 0 ? "is-on" : ""}" data-c="${k}">${c.n}</button>`).join("")}</div>
          <div data-out></div>
          <p class="tool-foot">Carteras de ejemplo con pesos redondos. En los ETF de país o de índice, el sector figura como "ETF amplio" porque ya incluyen empresas de varios sectores. No es una recomendación de compra.</p>
        </div>`;
    },
    init(raiz) {
      const grupo = (tit, datos) => `<div class="rv-grupo"><h5>${tit}</h5>${datos.map(([k, v]) => `<div class="rv-row"><span class="rv-l">${k}</span><span class="rv-track"><i class="${v >= 70 ? "rv-alert" : "rv-accent"}" style="width:${v}%"></i></span><span class="rv-v">${fmt(v, 0)}%</span></div>`).join("")}</div>`;
      function pintar(k) {
        const c = CARTERAS[k];
        const pais = suma(c.pos, 2), sec = suma(c.pos, 3);
        const mayor = [...c.pos].sort((a, b) => b[1] - a[1])[0];
        const avisos = [];
        if (pais[0][1] >= 70) avisos.push(`<strong>${fmt(pais[0][1], 0)}% en ${pais[0][0]}</strong>: casi todo depende de una sola economía.`);
        const secSin = sec.filter(x => x[0] !== "ETF amplio");
        if (secSin.length && secSin[0][1] >= 60) avisos.push(`<strong>${fmt(secSin[0][1], 0)}% en ${secSin[0][0]}</strong>: casi todo depende de un solo sector.`);
        $(raiz, "[data-out]").innerHTML = `
          <div class="rv-cols">${grupo("Por país o región", pais)}${grupo("Por sector", sec)}</div>
          <p class="rv-result ${avisos.length ? "rv-warn" : ""}">${avisos.length ? "Ojo: " + avisos.join(" ") : "Sin concentración fuerte en un solo país o sector."} Mayor posición: <strong>${mayor[0]} (${mayor[1]}%)</strong>.</p>`;
      }
      $$(raiz, "[data-c]").forEach(b => b.addEventListener("click", () => {
        $$(raiz, "[data-c]").forEach(x => x.classList.toggle("is-on", x === b));
        pintar(b.dataset.c);
      }));
      pintar("tech");
    }
  };

  /* ======================================================
     3 · CAÍDA Y RECUPERO
     ====================================================== */
  H["caida-rv"] = {
    render() {
      return `
        <div class="tool tool-rvcaida">
          <div class="tool-head"><span class="tool-kicker">Herramienta</span><h4>Cuánto cae y cuánto hay que subir para volver</h4></div>
          <label class="tool-field tool-field-strong">El mercado cae <output data-o="mkt">20%</output>
            <input type="range" min="5" max="50" step="1" value="20" data-i="mkt"></label>
          <label class="tool-field tool-field-strong">Beta de la cartera <output data-o="beta">1,0</output>
            <input type="range" min="4" max="16" step="1" value="10" data-i="beta"></label>
          <div class="pagos-presets">
            <button type="button" class="chip" data-b="6">Defensiva (0,6)</button>
            <button type="button" class="chip" data-b="10">Como el mercado (1,0)</button>
            <button type="button" class="chip" data-b="14">Agresiva (1,4)</button>
          </div>
          <div class="rv-bars" data-bars></div>
          <p class="tool-foot">Cliente con USD 100.000. La caída de la cartera es una estimación: beta × caída del mercado. Para volver al punto de partida hace falta subir 1 ÷ (1 − caída) − 1.</p>
        </div>`;
    },
    init(raiz) {
      const m = $(raiz, "[data-i=mkt]"), b = $(raiz, "[data-i=beta]");
      function pintar() {
        const mk = +m.value, beta = +b.value / 10;
        const caida = Math.min(mk * beta, 95), restante = 100 - caida;
        const sube = (100 / restante - 1) * 100;
        $(raiz, "[data-o=mkt]").textContent = fmt(mk, 0) + "%";
        $(raiz, "[data-o=beta]").textContent = fmt(beta, 1);
        const fila = (txt, w, cls, v) => `<div class="rv-row"><span class="rv-l">${txt}</span><span class="rv-track"><i class="${cls}" style="width:${Math.min(w, 100)}%"></i></span><span class="rv-v">${v}</span></div>`;
        $(raiz, "[data-bars]").innerHTML =
          fila("Cae la cartera", caida, "rv-alert", "−" + fmt(caida, 1) + "%") +
          fila("Saldo que queda", restante, "rv-neutral", "USD " + fmt(restante * 1000, 0)) +
          fila("Suba para volver", Math.min(sube, 100), "rv-accent", "+" + fmt(sube, 1) + "%") +
          `<p class="rv-result">Pierde unos <strong>USD ${fmt(caida * 1000, 0)}</strong>. Para recuperarlos tiene que subir <strong>${fmt(sube, 1)}%</strong> desde el piso, más que lo que cayó.</p>`;
      }
      m.addEventListener("input", pintar); b.addEventListener("input", pintar);
      $$(raiz, "[data-b]").forEach(x => x.addEventListener("click", () => { b.value = x.dataset.b; pintar(); }));
      pintar();
    }
  };
})();
