/* ============================================================
   HERRAMIENTAS DEL TALLER DE CER
   Poder de compra en changuitos, real → nominal, escenarios
   de inflación y la inflación que empata (a ojo).
   ============================================================ */
(function () {
  const H = AULA.herramientas;
  const fmt = (n, d = 1) => Number(n).toLocaleString("es-AR", { minimumFractionDigits: d, maximumFractionDigits: d });
  const fmtSigno = (n, d = 1) => (n > 0 ? "+" : n < 0 ? "−" : "") + fmt(Math.abs(n), d);
  const $ = (r, s) => r.querySelector(s), $$ = (r, s) => Array.from(r.querySelectorAll(s));

  const carrito = (cls) => `<svg class="cart ${cls}" viewBox="0 0 24 24" aria-hidden="true"><path d="M3 4h2.2l2.1 10.2a1.5 1.5 0 0 0 1.5 1.2h8.4a1.5 1.5 0 0 0 1.5-1.1L20.5 8H6.1" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/><circle cx="9.5" cy="19.5" r="1.6" fill="currentColor"/><circle cx="17" cy="19.5" r="1.6" fill="currentColor"/></svg>`;
  function filaCarritos(n) {
    const enteros = Math.floor(n), resto = n - enteros;
    let h = "";
    for (let i = 0; i < enteros; i++) h += carrito("full");
    if (resto > 0.05) h += `<span class="cart-part" style="--p:${Math.round(resto * 100)}%">${carrito("ghost")}<span class="cart-clip">${carrito("full")}</span></span>`;
    return h;
  }

  /* ======================================================
     1 · CHANGUITOS: PODER DE COMPRA
     ====================================================== */
  H.changuitos = {
    render() {
      return `
        <div class="tool tool-chang">
          <div class="tool-head"><span class="tool-kicker">Herramienta</span><h4>¿Cuántos changuitos compro dentro de un año?</h4></div>
          <p class="tool-hint">Hoy tenés $1.000.000 y un changuito del súper cuesta $100.000: comprás <strong>10</strong>. Elegí cuánta inflación hay en el año.</p>
          <label class="tool-field tool-field-strong">Inflación del año <output data-o="inf">30%</output>
            <input type="range" min="5" max="70" step="1" value="30" data-i="inf"></label>
          <div class="chang-rows" data-rows></div>
          <p class="tool-foot">Tasa fija: cobrás 30% en pesos pase lo que pase. Bono CER: el capital acompaña a la inflación y encima te paga 5% real. Números redondos para ver la lógica.</p>
        </div>`;
    },
    init(raiz) {
      const s = $(raiz, "[data-i=inf]");
      function pintar() {
        const inf = +s.value / 100;
        $(raiz, "[data-o=inf]").textContent = fmt(inf * 100, 0) + "%";
        const precio = 100000 * (1 + inf);
        const filas = [
          { n: "Debajo del colchón", m: 1000000 },
          { n: "Tasa fija al 30%", m: 1300000 },
          { n: "Bono CER + 5%", m: 1000000 * (1 + inf) * 1.05 }
        ];
        $(raiz, "[data-rows]").innerHTML = `<div class="chang-precio">El changuito pasa a costar <strong>$${fmt(precio, 0)}</strong></div>` + filas.map(f => {
          const c = f.m / precio, dif = c - 10;
          return `<div class="chang-row"><div class="chang-l"><strong>${f.n}</strong><small>Terminás con $${fmt(f.m, 0)}</small></div>
            <div class="chang-carts">${filaCarritos(c)}</div>
            <div class="chang-n ${dif > 0.05 ? "pos" : dif < -0.05 ? "neg" : ""}">${fmt(c, 1)}<small>${Math.abs(dif) < 0.05 ? "igual que hoy" : (dif > 0 ? "+" : "−") + fmt(Math.abs(dif), 1) + " vs. hoy"}</small></div></div>`;
        }).join("");
      }
      s.addEventListener("input", pintar); pintar();
    }
  };

  /* ======================================================
     2 · DE REAL A NOMINAL
     ====================================================== */
  H["real-nominal"] = {
    render() {
      return `
        <div class="tool tool-rn">
          <div class="tool-head"><span class="tool-kicker">Herramienta</span><h4>De la tasa real a lo que vas a cobrar en pesos</h4></div>
          <label class="tool-field">Tasa real del bono: CER + <output data-o="r">10,5%</output>
            <input type="range" min="-3" max="15" step="0.5" value="10.5" data-i="r"></label>
          <label class="tool-field tool-field-strong">Inflación que esperás para el año <output data-o="inf">25%</output>
            <input type="range" min="5" max="60" step="1" value="25" data-i="inf"></label>
          <div class="rn-bar" data-bar></div>
          <div class="kpis kpis-3" data-k></div>
          <p class="tool-foot">A ojo alcanza con sumar: inflación + tasa real. La cuenta exacta da un poco más, porque la tasa real también se aplica sobre el capital ya ajustado.</p>
        </div>`;
    },
    init(raiz) {
      const v = k => +$(raiz, `[data-i=${k}]`).value;
      function pintar() {
        const r = v("r"), inf = v("inf");
        $(raiz, "[data-o=r]").textContent = fmt(r, 1) + "%";
        $(raiz, "[data-o=inf]").textContent = fmt(inf, 0) + "%";
        const aprox = inf + r, exacta = ((1 + inf / 100) * (1 + r / 100) - 1) * 100;
        const total = Math.max(exacta, inf) * 1.08;
        const wInf = inf / total * 100, wR = Math.abs(r) / total * 100;
        $(raiz, "[data-bar]").innerHTML = `
          <div class="rn-track"><span class="rn-inf" style="width:${wInf}%">Inflación ${fmt(inf, 0)}%</span>${r >= 0
            ? `<span class="rn-real" style="width:${wR}%">${r >= 3 ? "+" + fmt(r, 1) + "%" : ""}</span>`
            : `<span class="rn-neg" style="width:${wR}%;margin-left:-${wR}%"></span>`}</div>
          <div class="rn-cap">${r >= 0 ? "Lo que te ajusta el CER + lo que el bono paga encima" : "El CER te ajusta, pero el bono rinde un poco menos que la inflación"}</div>`;
        $(raiz, "[data-k]").innerHTML = `
          <div class="kpi"><span>A ojo</span><strong>≈ ${fmt(aprox, 1)}%</strong><small>inflación + real</small></div>
          <div class="kpi kpi-accent"><span>Cuenta exacta</span><strong>${fmt(exacta, 1)}%</strong><small>en pesos, en el año</small></div>
          <div class="kpi"><span>Le ganás a los precios por</span><strong class="${r >= 0 ? "" : "neg"}">${fmtSigno(r, 1)}%</strong><small>pase lo que pase</small></div>`;
      }
      $$(raiz, "input").forEach(i => i.addEventListener("input", pintar)); pintar();
    }
  };

  /* ======================================================
     3 · TRES ESCENARIOS: CER vs TASA FIJA
     ====================================================== */
  H["escenarios-cer"] = {
    render() {
      return `
        <div class="tool tool-esc">
          <div class="tool-head"><span class="tool-kicker">Herramienta</span><h4>Mismo año, tres inflaciones posibles</h4></div>
          <div class="esc-tabs">
            <button type="button" class="chip" data-v="nom">Lo que cobrás en pesos</button>
            <button type="button" class="chip is-on" data-v="real">Lo que le ganás a los precios</button>
          </div>
          <div class="esc-grid" data-g></div>
          <p class="tool-foot">Tasa fija 35% contra CER + 5%. Los escenarios: inflación baja (15%), media (30%) y alta (45%). "Le ganás a los precios" es la tasa real: cuánto más podés comprar al final del año.</p>
        </div>`;
    },
    init(raiz) {
      const esc = [{ n: "Inflación baja", i: 15 }, { n: "Inflación media", i: 30 }, { n: "Inflación alta", i: 45 }];
      function pintar(modo) {
        const datos = esc.map(e => {
          const fijaNom = 35, cerNom = (1.05 * (1 + e.i / 100) - 1) * 100;
          const fijaReal = (1.35 / (1 + e.i / 100) - 1) * 100, cerReal = 5;
          return { ...e, fija: modo === "nom" ? fijaNom : fijaReal, cer: modo === "nom" ? cerNom : cerReal };
        });
        const vals = datos.flatMap(d => [d.fija, d.cer]);
        const maxP = Math.max(0, ...vals), maxN = Math.max(0, ...vals.map(v => -v));
        const H = 150, zero = maxN > 0 ? H * maxN / (maxP + maxN) : 0, esc_ = (H - 26) / (maxP + maxN);
        const bar = (v, cls) => {
          const h = Math.abs(v) * esc_, top = v >= 0 ? H - zero - h : H - zero;
          const ly = v >= 0 ? top - 16 : top + h + 2;
          return `<div class="esc-bar ${cls}"><i class="${v < 0 ? "neg" : ""}" style="top:${top}px;height:${h}px"></i><b style="top:${ly}px">${fmtSigno(v, 0)}%</b></div>`;
        };
        $(raiz, "[data-g]").innerHTML = datos.map(d => `
          <div class="esc-col"><div class="esc-bars" style="height:${H}px"><span class="esc-zero" style="top:${H - zero}px"></span>${bar(d.fija, "fija")}${bar(d.cer, "cer")}</div>
            <strong>${d.n}</strong><small>${d.i}% en el año</small></div>`).join("") +
          `<div class="esc-legend"><span><i class="lg-fija"></i>Tasa fija 35%</span><span><i class="lg-cer"></i>CER + 5%</span></div>`;
      }
      $$(raiz, "[data-v]").forEach(b => b.addEventListener("click", () => {
        $$(raiz, "[data-v]").forEach(x => x.classList.toggle("is-on", x === b)); pintar(b.dataset.v);
      }));
      pintar("real");
    }
  };

  /* ======================================================
     4 · BONUS: LA INFLACIÓN QUE EMPATA, A OJO
     ====================================================== */
  H["empate-ojo"] = {
    render() {
      return `
        <div class="tool tool-empate">
          <div class="tool-head"><span class="tool-kicker">Herramienta</span><h4>¿CER o tasa fija?</h4></div>
          <div class="tasas-row">
            <label class="num-field"><span>Tasa fija (LECAP / BONCAP)</span><input type="number" step="1" value="35" data-i="fija"><em>% anual</em></label>
            <label class="num-field"><span>Bono CER</span><input type="number" step="0.5" value="5" data-i="real"><em>CER + %</em></label>
          </div>
          <div class="empate-res" data-res></div>
          <label class="tool-field tool-field-strong">La inflación que vos esperás <output data-o="esp">25%</output>
            <input type="range" min="5" max="70" step="1" value="25" data-i="esp"></label>
          <div class="empate-linea" data-linea></div>
          <div class="verdict" data-v></div>
        </div>`;
    },
    init(raiz) {
      const v = k => parseFloat($(raiz, `[data-i=${k}]`).value);
      function pintar() {
        const fija = v("fija"), real = v("real"), esp = v("esp");
        if (![fija, real].every(isFinite)) return;
        const be = fija - real;
        $(raiz, "[data-o=esp]").textContent = fmt(esp, 0) + "%";
        $(raiz, "[data-res]").innerHTML = `<div class="kpi kpi-accent"><span>Inflación que los empata (a ojo)</span><strong>${fmt(fija, 0)} − ${fmt(real, 1)} ≈ ${fmt(be, 0)}%</strong></div>`;
        const W = 520, X = x => 20 + Math.min(Math.max(x, 0), 70) / 70 * (W - 40);
        $(raiz, "[data-linea]").innerHTML = `<svg viewBox="0 0 ${W} 74" class="svgchart">
          <rect class="zona-fija" x="20" y="22" width="${X(be) - 20}" height="16" rx="3"/>
          <rect class="zona-cer" x="${X(be)}" y="22" width="${W - 20 - X(be)}" height="16" rx="3"/>
          <text class="zona-t" x="${(20 + X(be)) / 2}" y="16" text-anchor="middle">conviene tasa fija</text>
          <text class="zona-t" x="${(X(be) + W - 20) / 2}" y="16" text-anchor="middle">conviene CER</text>
          <line class="be-l" x1="${X(be)}" x2="${X(be)}" y1="18" y2="44"/>
          <text class="pt-label" x="${X(be)}" y="58" text-anchor="middle">empate ${fmt(be, 0)}%</text>
          <circle class="j-tuya" cx="${X(esp)}" cy="30" r="8"/><text class="pt-label" x="${X(esp)}" y="72" text-anchor="middle">vos ${fmt(esp, 0)}%</text>
        </svg>`;
        const d = esp - be, el = $(raiz, "[data-v]");
        el.className = "verdict " + (Math.abs(d) <= 2 ? "mid" : "ok");
        el.innerHTML = Math.abs(d) <= 2
          ? `Esperás una inflación muy cerca del empate: <strong>da casi lo mismo</strong>. Ahí el CER funciona como seguro por si la inflación sorprende para arriba.`
          : d > 0
            ? `Esperás <strong>más</strong> inflación que el empate (${fmt(esp, 0)}% contra ${fmt(be, 0)}%): <strong>conviene el CER</strong>.`
            : `Esperás <strong>menos</strong> inflación que el empate (${fmt(esp, 0)}% contra ${fmt(be, 0)}%): <strong>conviene la tasa fija</strong>.`;
      }
      $$(raiz, "input").forEach(i => i.addEventListener("input", pintar)); pintar();
    }
  };
})();
