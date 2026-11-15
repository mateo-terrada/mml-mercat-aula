/* ============================================================
   HERRAMIENTAS DEL MÓDULO DE OPERATORIA
   Libro de órdenes interactivo y comparador de dónde vender.
   Los libros son ilustrativos (no son cotizaciones reales).
   ============================================================ */
(function () {
  const H = AULA.herramientas;
  const fmt = (n, d = 2) => Number(n).toLocaleString("es-AR", { minimumFractionDigits: d, maximumFractionDigits: d });
  const $ = (r, s) => r.querySelector(s), $$ = (r, s) => Array.from(r.querySelectorAll(s));

  // Ejecuta una venta a mercado contra las puntas compradoras.
  function barrer(niveles, cant) {
    let resto = cant, total = 0; const fills = [];
    for (const [px, q] of niveles) {
      if (resto <= 0) break;
      const t = Math.min(q, resto);
      fills.push({ px, q: t, lleno: t === q }); total += t * px / 100; resto -= t;
    }
    const ejecutado = cant - resto;
    return { fills, ejecutado, sinEjecutar: resto, total, prom: ejecutado ? total / ejecutado * 100 : 0 };
  }

  /* ======================================================
     1 · LIBRO DE ÓRDENES: VENDER A MERCADO
     ====================================================== */
  const LIBROS = {
    liquido: {
      n: "Bono soberano líquido", mon: "USD",
      bids: [[61.20, 150000], [61.15, 220000], [61.10, 300000], [61.00, 400000], [60.90, 500000]],
      asks: [[61.30, 120000], [61.35, 200000], [61.45, 260000], [61.55, 350000], [61.70, 450000]],
      min: 10000, max: 1500000, step: 10000, def: 300000
    },
    iliquido: {
      n: "ON chica, poco negociada", mon: "USD",
      bids: [[98.50, 3000], [97.80, 5000], [97.00, 8000], [95.50, 10000], [94.00, 15000]],
      asks: [[100.20, 2000], [100.90, 4000], [101.80, 6000], [103.00, 8000], [104.50, 10000]],
      min: 1000, max: 40000, step: 1000, def: 15000
    }
  };
  H.libro = {
    render() {
      return `
        <div class="tool tool-libro">
          <div class="tool-head"><span class="tool-kicker">Herramienta</span><h4>Vender a mercado: ¿a qué precio salís de verdad?</h4></div>
          <div class="bal-tabs"><button type="button" class="chip is-on" data-l="liquido">Bono líquido</button><button type="button" class="chip" data-l="iliquido">ON poco negociada</button></div>
          <div class="libro-grid">
            <div class="libro-tabla" data-tabla></div>
            <div class="libro-side">
              <label class="tool-field tool-field-strong">Cantidad a vender (valor nominal) <output data-o="q"></output>
                <input type="range" data-i="q"></label>
              <div class="kpis" data-k></div>
              <div class="verdict" data-v></div>
            </div>
          </div>
          <p class="tool-foot">Libros ilustrativos, precios cada 100 de valor nominal. Una orden de venta a mercado se ejecuta contra las puntas compradoras, de la mejor hacia abajo, hasta completar la cantidad.</p>
        </div>`;
    },
    init(raiz) {
      let L = LIBROS.liquido;
      const s = $(raiz, "[data-i=q]");
      function config() { s.min = L.min; s.max = L.max; s.step = L.step; s.value = L.def; }
      function pintar() {
        const q = +s.value, r = barrer(L.bids, q);
        $(raiz, "[data-o=q]").textContent = fmt(q, 0);
        const usado = new Map(r.fills.map(f => [f.px, f]));
        const maxQ = Math.max(...L.bids.map(b => b[1]), ...L.asks.map(a => a[1]));
        const filas = L.asks.slice().reverse().map(([px, qq]) => `<tr class="ask"><td></td><td></td><td class="px">${fmt(px)}</td><td class="qty"><span class="qbar" style="width:${qq / maxQ * 100}%"></span><span class="qn">${fmt(qq, 0)}</span></td></tr>`).join("")
          + `<tr class="spread-row"><td colspan="4">Spread: ${fmt(L.asks[0][0] - L.bids[0][0])} (${fmt((L.asks[0][0] / L.bids[0][0] - 1) * 100, 2)}%)</td></tr>`
          + L.bids.map(([px, qq]) => { const f = usado.get(px); const pct = f ? f.q / qq * 100 : 0;
              return `<tr class="bid ${f ? "hit" : ""}"><td class="qty"><span class="qbar" style="width:${qq / maxQ * 100}%"></span><span class="qfill" style="width:${qq / maxQ * pct}%"></span><span class="qn">${fmt(qq, 0)}</span></td><td class="px">${fmt(px)}</td><td></td><td></td></tr>`; }).join("");
        $(raiz, "[data-tabla]").innerHTML = `<table class="libro"><thead><tr><th>Compran</th><th>Precio</th><th>Precio</th><th>Venden</th></tr></thead><tbody>${filas}</tbody></table>`;
        const mejor = L.bids[0][0], costo = (r.prom / mejor - 1) * 100;
        $(raiz, "[data-k]").innerHTML = `
          <div class="kpi"><span>Mejor punta</span><strong>${fmt(mejor)}</strong><small>lo que "ves"</small></div>
          <div class="kpi kpi-accent"><span>Precio promedio</span><strong>${fmt(r.prom)}</strong><small>lo que cobrás</small></div>
          <div class="kpi"><span>Te cuesta barrer</span><strong class="${costo < -0.3 ? "neg" : ""}">${fmt(costo, 2)}%</strong><small>${r.fills.length} ${r.fills.length === 1 ? "nivel" : "niveles"}</small></div>`;
        const v = $(raiz, "[data-v]");
        if (r.sinEjecutar > 0) { v.className = "verdict bad"; v.innerHTML = `No hay compradores suficientes: quedan <strong>${fmt(r.sinEjecutar, 0)}</strong> sin vender.`; }
        else if (costo < -1) { v.className = "verdict bad"; v.innerHTML = `Vender todo a mercado te cuesta <strong>${fmt(-costo, 1)}%</strong> contra la mejor punta. Conviene orden límite, partir la venta o esperar.`; }
        else if (costo < -0.2) { v.className = "verdict mid"; v.innerHTML = `Costo moderado: <strong>${fmt(-costo, 2)}%</strong>. Si no hay apuro, una orden límite cerca de la mejor punta puede salir mejor.`; }
        else { v.className = "verdict ok"; v.innerHTML = `Hay profundidad: vender a mercado casi no te cuesta (<strong>${fmt(-costo, 2)}%</strong>).`; }
      }
      $$(raiz, "[data-l]").forEach(b => b.addEventListener("click", () => {
        $$(raiz, "[data-l]").forEach(x => x.classList.toggle("is-on", x === b)); L = LIBROS[b.dataset.l]; config(); pintar();
      }));
      s.addEventListener("input", pintar); config(); pintar();
    }
  };

  /* ======================================================
     2 · ¿DÓNDE VENDO LA ON: EN PESOS O EN DÓLARES (MEP)?
     ====================================================== */
  H["donde-vender"] = {
    render() {
      return `
        <div class="tool tool-donde">
          <div class="tool-head"><span class="tool-kicker">Herramienta</span><h4>La misma ON, dos pantallas: ¿dónde conviene vender?</h4></div>
          <div class="donde-grid">
            <div class="donde-libro"><header><strong>En pesos</strong><small>ticker sin sufijo · precio en $</small></header><div data-b="ars"></div></div>
            <div class="donde-libro"><header><strong>En dólares MEP</strong><small>ticker con D · precio en USD</small></header><div data-b="usd"></div></div>
          </div>
          <div class="tasas-row">
            <label class="tool-field tool-field-strong" style="flex:2">Cantidad a vender (valor nominal) <output data-o="q">5.000</output>
              <input type="range" min="1000" max="30000" step="1000" value="5000" data-i="q"></label>
            <label class="num-field"><span>Dólar MEP</span><input type="number" step="5" value="1560" data-i="mep"><em>$ por USD</em></label>
          </div>
          <div class="donde-res" data-res></div>
          <p class="tool-foot">Libros ilustrativos. Para comparar, los pesos se pasan a dólares al MEP. En la práctica, pasar de pesos a dólares MEP tiene un pequeño costo extra (comprar un bono en pesos y venderlo en dólares), que conviene sumar si la diferencia es chica.</p>
        </div>`;
    },
    init(raiz) {
      const ARS = [[154500, 40000], [153800, 30000], [152000, 50000]];
      const USD = [[99.60, 5000], [98.40, 8000], [96.50, 10000]];
      const v = k => +$(raiz, `[data-i=${k}]`).value;
      function tabla(niv, r, moneda) {
        const usado = new Map(r.fills.map(f => [f.px, f]));
        return `<table class="libro mini"><thead><tr><th>Compran</th><th>Precio (${moneda})</th></tr></thead><tbody>${niv.map(([px, q]) =>
          `<tr class="bid ${usado.has(px) ? "hit" : ""}"><td class="qty">${fmt(q, 0)}</td><td class="px">${moneda === "$" ? fmt(px, 0) : fmt(px)}</td></tr>`).join("")}</tbody></table>`;
      }
      function pintar() {
        const q = v("q"), mep = v("mep");
        $(raiz, "[data-o=q]").textContent = fmt(q, 0);
        const ra = barrer(ARS, q), ru = barrer(USD, q);
        $(raiz, "[data-b=ars]").innerHTML = tabla(ARS, ra, "$");
        $(raiz, "[data-b=usd]").innerHTML = tabla(USD, ru, "USD");
        const usdDesdePesos = ra.total / mep, usdDirecto = ru.total;
        const pxA = ra.ejecutado ? usdDesdePesos / ra.ejecutado * 100 : 0, pxU = ru.prom;
        const gana = ru.sinEjecutar > 0 ? "ars" : (usdDesdePesos / ra.ejecutado > usdDirecto / ru.ejecutado ? "ars" : "usd");
        $(raiz, "[data-res]").innerHTML = `
          <div class="donde-op ${gana === "ars" ? "win" : ""}"><span>Vendiendo en pesos y pasando a MEP</span><strong>USD ${fmt(usdDesdePesos, 0)}</strong><small>equivale a ${fmt(pxA)} cada 100</small></div>
          <div class="donde-op ${gana === "usd" ? "win" : ""}"><span>Vendiendo directo en dólares</span><strong>${ru.sinEjecutar > 0 ? "No alcanza" : "USD " + fmt(usdDirecto, 0)}</strong><small>${ru.sinEjecutar > 0 ? `quedan ${fmt(ru.sinEjecutar, 0)} sin comprador` : `promedio ${fmt(pxU)} cada 100`}</small></div>
          <p class="donde-msg">${gana === "usd" ? "Con poca cantidad, la pantalla en dólares paga mejor." : "Con esta cantidad, la pantalla en dólares no tiene profundidad: rinde más vender en pesos y comprar los dólares aparte."}</p>`;
      }
      $$(raiz, "input").forEach(i => i.addEventListener("input", pintar)); pintar();
    }
  };

  /* ======================================================
     3 · DECISOR: ¿VENDO EN PESOS O EN DÓLARES?
     ====================================================== */
  H["decisor-moneda"] = {
    render() {
      return `
        <div class="tool tool-decisor">
          <div class="tool-head"><span class="tool-kicker">Herramienta</span><h4>¿En qué moneda vendo?</h4></div>
          <div class="dec-q"><span class="dec-n">1</span><div><strong>¿Qué hace el cliente con la plata después de vender?</strong>
            <div class="dec-ops" data-g="uso">
              <button type="button" class="chip is-on" data-v="rota">Compra otro activo ya</button>
              <button type="button" class="chip" data-v="espera">Se queda líquido unos días o semanas</button>
              <button type="button" class="chip" data-v="banco">Retira dólares a su banco en Argentina</button>
              <button type="button" class="chip" data-v="exterior">Transfiere dólares al exterior</button>
              <button type="button" class="chip" data-v="fciusd">Pasa a un FCI en dólares</button>
              <button type="button" class="chip" data-v="pesos">Necesita pesos para gastar</button>
            </div></div></div>
          <div class="dec-q" data-q2><span class="dec-n">2</span><div><strong>¿Dónde hay volumen en lo que vende (y en lo que compra)?</strong>
            <div class="dec-ops" data-g="vol">
              <button type="button" class="chip is-on" data-v="pesos">Mucho más en pesos</button>
              <button type="button" class="chip" data-v="ambas">Mucho en las dos monedas</button>
              <button type="button" class="chip" data-v="usd">Mucho más en dólares</button>
            </div></div></div>
          <div class="dec-res" data-res></div>
        </div>`;
    },
    init(raiz) {
      const sel = { uso: "rota", vol: "pesos" };
      const R = {
        rota: {
          pesos: ["Pesos, en las dos patas", "Vendés y comprás en el mismo momento, así que el tipo de cambio de la venta y el de la compra se compensan: no hay riesgo cambiario. Lo que sí importa es la ejecución, y en pesos hay más volumen y menos spread. Es el caso típico de rotar CEDEARs."],
          ambas: ["Da casi lo mismo", "Con mucho volumen en las dos monedas, la diferencia de ejecución es mínima. Mirá las puntas de las dos pantallas y elegí la que dé mejor precio en ese momento. Ejemplo típico: rotar de AL30 a GD30."],
          usd: ["Dólares, en las dos patas", "Si la profundidad está en la pantalla en dólares, se rota ahí. Es poco común en CEDEARs, pero pasa con algunos bonos u ONs."]
        },
        espera: ["Dólares", "Mientras espera, la plata queda quieta. Si queda en pesos, está expuesta a que el dólar suba en esas semanas: cuando vuelva a comprar, le va a alcanzar para menos. Vender en dólares elimina ese riesgo. Si la pantalla en dólares es finita, se puede vender en pesos y comprar los dólares MEP en el mismo momento."],
        banco: ["Dólares MEP (ticker con D)", "Los dólares MEP se acreditan en una cuenta en Argentina y se pueden transferir a su banco local. Si la pantalla en D tiene poca profundidad, vender en pesos y hacer el MEP aparte en un bono líquido puede salir mejor."],
        exterior: ["Dólares cable (ticker con C)", "El cable liquida en una cuenta en el exterior. Venderlo en D y después intentar mandarlo afuera es un paso de más."],
        fciusd: ["Dólares", "El destino es en dólares: vender en pesos lo expondría al tipo de cambio entre la venta y la suscripción, y sumaría un paso innecesario."],
        pesos: ["Pesos", "Si lo que necesita son pesos para gastar, vender en dólares y después venderlos agrega un costo y un paso sin ningún beneficio."]
      };
      function pintar() {
        const r = sel.uso === "rota" ? R.rota[sel.vol] : R[sel.uso];
        $(raiz, "[data-q2]").style.opacity = sel.uso === "rota" ? "1" : ".45";
        $(raiz, "[data-res]").innerHTML = `<span>Conviene vender en</span><strong>${r[0]}</strong><p>${r[1]}</p>`;
      }
      $$(raiz, "[data-g]").forEach(g => g.addEventListener("click", ev => {
        const b = ev.target.closest("[data-v]"); if (!b) return;
        g.querySelectorAll("[data-v]").forEach(x => x.classList.toggle("is-on", x === b));
        sel[g.dataset.g] = b.dataset.v; pintar();
      }));
      pintar();
    }
  };

  AULA.graficos.circuito = () => `
    <figure class="figura"><div class="circuito">
      <div class="circ-top"><span class="circ-box circ-cnv">CNV<small>regula y controla</small></span></div>
      <div class="circ-row">
        <span class="circ-box circ-ap">Agente productor<small>propone y acompaña</small></span>
        <span class="circ-link">propone a</span>
        <span class="circ-box circ-cli">Cliente<small>decide y confirma</small></span>
        <span class="circ-arrow">→</span>
        <span class="circ-box circ-alyc">ALyC<small>cuenta, fondos, órdenes, custodia</small></span>
        <span class="circ-arrow">→</span>
        <span class="circ-box">Mercado<small>BYMA · A3 · MAE</small></span>
        <span class="circ-arrow">→</span>
        <span class="circ-box">Caja de Valores<small>registra los títulos</small></span>
      </div></div>
      <figcaption>La plata y los títulos del cliente van siempre del cliente al ALyC: nunca pasan por el agente productor.</figcaption></figure>`;
})();
