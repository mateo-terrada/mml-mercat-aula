/* ============================================================
   HERRAMIENTAS DEL TALLER DE DURATION
   Todo visual: pagos que se achican, balanza, tabla de bolsillo
   y un juego para estimar a ojo.
   ============================================================ */
(function () {
  const H = AULA.herramientas, G = AULA.graficos;
  const fmt = (n, d = 1) => Number(n).toLocaleString("es-AR", { minimumFractionDigits: d, maximumFractionDigits: d });
  const fmtSigno = (n, d = 1) => (n > 0 ? "+" : n < 0 ? "−" : "") + fmt(Math.abs(n), d);
  const $ = (r, s) => r.querySelector(s), $$ = (r, s) => Array.from(r.querySelectorAll(s));

  // Flujos de un bono con cupón anual. amort: "bullet" o "cuotas".
  function flujos(cupon, anios, amort = "bullet") {
    const out = []; let vivo = 100;
    for (let t = 1; t <= anios; t++) {
      const interes = vivo * cupon / 100;
      let capital = 0;
      if (amort === "bullet") capital = t === anios ? 100 : 0;
      else capital = 100 / anios;
      out.push({ t, monto: interes + capital });
      vivo -= capital;
    }
    return out;
  }
  const vp = (fl, tir) => fl.map(f => ({ t: f.t, monto: f.monto, vp: f.monto / Math.pow(1 + tir / 100, f.t) }));
  const precio = (fl, tir) => vp(fl, tir).reduce((a, f) => a + f.vp, 0);
  function macaulay(fl, tir) { const v = vp(fl, tir); const p = v.reduce((a, f) => a + f.vp, 0); return v.reduce((a, f) => a + f.t * f.vp, 0) / p; }

  /* ======================================================
     1 · LOS PAGOS LEJANOS SE ACHICAN MÁS
     ====================================================== */
  H["pagos-lejanos"] = {
    render() {
      return `
        <div class="tool tool-pagos">
          <div class="tool-head"><span class="tool-kicker">Herramienta</span><h4>¿Qué le pasa a cada pago cuando sube la tasa?</h4></div>
          <label class="tool-field tool-field-strong">TIR que exige el mercado <output data-o="tir">6,0%</output>
            <input type="range" min="1" max="14" step="0.5" value="6" data-i="tir"></label>
          <div class="pagos-presets">
            <button type="button" class="chip" data-p="3">Bajan las tasas (3%)</button>
            <button type="button" class="chip" data-p="6">Punto de partida (6%)</button>
            <button type="button" class="chip" data-p="9">Suben las tasas (9%)</button>
            <button type="button" class="chip" data-p="12">Suben mucho (12%)</button>
          </div>
          <div class="pagos-grid">
            <div class="pagos-bono" data-b="corto"></div>
            <div class="pagos-bono" data-b="largo"></div>
          </div>
          <div class="pagos-legend"><span><i class="lg-ghost"></i>Valor de hoy de cada pago con la tasa inicial (6%)</span><span><i class="lg-now"></i>Valor de hoy con la tasa elegida</span></div>
          <p class="tool-foot">Dos bonos del mismo emisor, cupón 6% anual, que arrancan valiendo 100. Cada barra es lo que vale <strong>hoy</strong> un pago futuro. En cada bono, el último pago incluye la devolución del capital.</p>
        </div>`;
    },
    init(raiz) {
      const bonos = { corto: { n: "Bono a 2 años", anios: 2 }, largo: { n: "Bono a 10 años", anios: 10 } };
      const slider = $(raiz, "[data-i=tir]");
      function pintarBono(el, b, tir) {
        const fl = flujos(6, b.anios), base = vp(fl, 6), ahora = vp(fl, tir);
        const p0 = precio(fl, 6), p = precio(fl, tir), cambio = (p / p0 - 1) * 100;
        const W = 300, Hh = 170, m = { l: 8, r: 8, t: 10, b: 22 };
        const maxV = 106, bw = (W - m.l - m.r) / 10;
        const Y = v => m.t + (1 - v / maxV) * (Hh - m.t - m.b);
        let bars = "";
        base.forEach((f, i) => {
          const x = m.l + i * bw + bw * 0.15, w = bw * 0.7;
          const a = ahora[i];
          const caida = (a.vp / f.vp - 1) * 100;
          bars += `<rect class="bar-ghost" x="${x}" y="${Y(f.vp)}" width="${w}" height="${Y(0) - Y(f.vp)}" rx="2"/>`;
          bars += `<rect class="bar-now ${tir > 6 ? "down" : tir < 6 ? "up" : ""}" x="${x + w * 0.18}" y="${Y(a.vp)}" width="${w * 0.64}" height="${Y(0) - Y(a.vp)}" rx="2"/>`;
          bars += `<text class="ax" x="${x + w / 2}" y="${Hh - 6}" text-anchor="middle">${f.t}</text>`;
          if (f.monto > 50 && Math.abs(caida) >= 0.5) bars += `<text class="bar-pct ${caida < 0 ? "neg" : "pos"}" x="${x + w / 2}" y="${Math.min(Y(f.vp), Y(a.vp)) - 5}" text-anchor="middle">${fmtSigno(caida, 0)}%</text>`;
        });
        el.innerHTML = `
          <header><strong>${b.n}</strong><span class="pagos-precio ${cambio < -0.05 ? "neg" : cambio > 0.05 ? "pos" : ""}">${fmt(p, 1)}<small>${Math.abs(cambio) < 0.05 ? "sin cambio" : fmtSigno(cambio) + "%"}</small></span></header>
          <svg viewBox="0 0 ${W} ${Hh}" class="svgchart" role="img" aria-label="${b.n}: valor de hoy de cada pago">${bars}</svg>
          <div class="pagos-x">años hasta cada pago</div>`;
      }
      function pintar() {
        const tir = +slider.value;
        $(raiz, "[data-o=tir]").textContent = fmt(tir) + "%";
        pintarBono($(raiz, "[data-b=corto]"), bonos.corto, tir);
        pintarBono($(raiz, "[data-b=largo]"), bonos.largo, tir);
      }
      slider.addEventListener("input", pintar);
      $$(raiz, "[data-p]").forEach(b => b.addEventListener("click", () => { slider.value = b.dataset.p; pintar(); }));
      pintar();
    }
  };

  /* ======================================================
     2 · LA BALANZA: DURATION COMO CENTRO DE GRAVEDAD
     ====================================================== */
  const BAL = [
    { k: "corto", n: "Bullet 3 años", d: "cupón 6%", cupon: 6, anios: 3, amort: "bullet" },
    { k: "bullet", n: "Bullet 10 años", d: "cupón 6%", cupon: 6, anios: 10, amort: "bullet" },
    { k: "cuotas", n: "Amortiza en cuotas", d: "10 años, cupón 6%", cupon: 6, anios: 10, amort: "cuotas" },
    { k: "cero", n: "Cupón cero", d: "10 años", cupon: 0, anios: 10, amort: "bullet" },
    { k: "alto", n: "Cupón alto", d: "10 años, cupón 12%", cupon: 12, anios: 10, amort: "bullet" }
  ];
  H.balanza = {
    render() {
      return `
        <div class="tool tool-balanza">
          <div class="tool-head"><span class="tool-kicker">Herramienta</span><h4>La balanza: dónde está el "peso" de un bono</h4></div>
          <div class="bal-tabs">${BAL.map((b, i) => `<button type="button" class="chip ${i === 1 ? "is-on" : ""}" data-k="${b.k}">${b.n}</button>`).join("")}</div>
          <div class="bal-stage" data-stage></div>
          <div class="bal-read" data-read></div>
          <p class="tool-foot">Cada bloque es lo que vale hoy un pago (descontado al 6%). El triángulo marca el punto donde la tabla queda en equilibrio: esa distancia, en años, es la duration.</p>
        </div>`;
    },
    init(raiz) {
      function pintar(k) {
        const b = BAL.find(x => x.k === k);
        const fl = flujos(b.cupon, b.anios, b.amort), v = vp(fl, 6);
        const mac = macaulay(fl, 6), md = mac / 1.06;
        const W = 560, Hh = 210, m = { l: 30, r: 20 };
        const X = t => m.l + t / 10 * (W - m.l - m.r);
        const baseY = 150, maxV = Math.max(...v.map(f => f.vp));
        const escala = 110 / Math.max(maxV, 30);
        let blocks = "";
        v.forEach(f => {
          const h = Math.max(2, f.vp * escala);
          blocks += `<rect class="bal-block" x="${X(f.t) - 14}" y="${baseY - h}" width="28" height="${h}" rx="3"/>`;
          if (f.vp > 8) blocks += `<text class="bal-val" x="${X(f.t)}" y="${baseY - h - 6}" text-anchor="middle">${fmt(f.vp, 0)}</text>`;
        });
        let ticks = "";
        for (let t = 0; t <= 10; t++) ticks += `<text class="ax" x="${X(t)}" y="${baseY + 44}" text-anchor="middle">${t}</text>`;
        $(raiz, "[data-stage]").innerHTML = `<svg viewBox="0 0 ${W} ${Hh}" class="svgchart" role="img" aria-label="Balanza de pagos del bono">
          <line class="bal-plank" x1="${X(0)}" x2="${X(10)}" y1="${baseY}" y2="${baseY}"/>
          ${blocks}
          <polygon class="bal-fulcrum" points="${X(mac)},${baseY + 3} ${X(mac) - 14},${baseY + 26} ${X(mac) + 14},${baseY + 26}"/>
          <text class="bal-dur" x="${Math.min(Math.max(X(mac), 90), W - 90)}" y="${baseY + 44 + 16}" text-anchor="middle">duration ≈ ${fmt(mac, 1)} años</text>
          ${ticks}
        </svg>`;
        const lecturas = {
          corto: "Todo el peso está cerca: el bono se mueve poco ante cambios de tasa.",
          bullet: "Los cupones reparten un poco el peso, pero el capital al final lo tira hacia la derecha.",
          cuotas: "Devolver capital en cuotas acerca el centro de gravedad: mismo plazo, mucha menos duration.",
          cero: "Todo el peso está en un solo pago al final: la duration es igual al plazo. Es el caso más sensible.",
          alto: "Cupones grandes ponen más peso en los primeros años: algo menos de duration que con cupón 6%."
        };
        $(raiz, "[data-read]").innerHTML = `<div class="kpi"><span>Plazo</span><strong>${b.anios} años</strong></div>
          <div class="kpi kpi-accent"><span>Duration</span><strong>${fmt(mac, 1)} años</strong></div>
          <div class="kpi"><span>Si la tasa sube 1 p.p.</span><strong class="neg">≈ ${fmtSigno(-md)}%</strong></div>
          <p>${lecturas[k]}</p>`;
      }
      $$(raiz, "[data-k]").forEach(b => b.addEventListener("click", () => {
        $$(raiz, "[data-k]").forEach(x => x.classList.toggle("is-on", x === b)); pintar(b.dataset.k);
      }));
      pintar("bullet");
    }
  };

  /* ======================================================
     3 · TABLA DE BOLSILLO
     ====================================================== */
  H["tabla-bolsillo"] = {
    render() {
      const durs = [1, 2, 3, 4, 5, 6, 8, 10], shocks = [-2, -1, -0.5, 0.5, 1, 2, 3];
      const max = 30;
      const celda = (d, s) => {
        const v = -d * s, a = Math.min(1, Math.abs(v) / max);
        const bg = v < 0 ? `rgba(168,69,58,${0.08 + a * 0.75})` : `rgba(122,139,92,${0.08 + a * 0.75})`;
        return `<td style="background:${bg};color:${a > 0.45 ? "#fff" : "var(--ink)"}" data-d="${d}" data-s="${s}">${fmtSigno(v, v % 1 ? 1 : 0)}%</td>`;
      };
      return `
        <div class="tool tool-bolsillo">
          <div class="tool-head"><span class="tool-kicker">Herramienta</span><h4>Tabla de bolsillo: cuánto se mueve el precio</h4></div>
          <div class="tabla-wrap"><table class="bolsillo">
            <thead><tr><th>Duration ↓ · TIR (p.p.) →</th>${shocks.map(s => `<th>${s > 0 ? "+" : "−"}${fmt(Math.abs(s), s % 1 ? 1 : 0)}</th>`).join("")}</tr></thead>
            <tbody>${durs.map(d => `<tr><th>${d}</th>${shocks.map(s => celda(d, s)).join("")}</tr>`).join("")}</tbody>
          </table></div>
          <div class="bolsillo-read" data-read>Tocá una celda para leerla.</div>
          <p class="tool-foot">Regla: cambio de precio ≈ − duration × cambio de TIR en puntos porcentuales, p.p. (si la TIR pasa de 8% a 9%, subió 1 p.p.). Con movimientos grandes el resultado real es un poco mejor que la tabla: la caída es algo menor y la suba algo mayor.</p>
        </div>`;
    },
    init(raiz) {
      $$(raiz, "td[data-d]").forEach(td => td.addEventListener("click", () => {
        $$(raiz, "td.is-sel").forEach(x => x.classList.remove("is-sel")); td.classList.add("is-sel");
        const d = +td.dataset.d, s = +td.dataset.s, v = -d * s;
        $(raiz, "[data-read]").innerHTML = `Un bono con <strong>duration ${d}</strong>, si su TIR ${s > 0 ? "sube" : "baja"} <strong>${fmt(Math.abs(s), s % 1 ? 1 : 0)} p.p.</strong> (por ejemplo, de 8% a ${fmt(8 + s, s % 1 ? 1 : 0)}%), ${v < 0 ? "pierde" : "gana"} aproximadamente <strong>${fmt(Math.abs(v), v % 1 ? 1 : 0)}%</strong> de precio. Sobre USD 10.000 invertidos, son unos <strong>USD ${fmt(Math.abs(v) * 100, 0)}</strong>.`;
      }));
    }
  };

  /* ======================================================
     4 · JUEGO: ESTIMÁ A OJO
     ====================================================== */
  H["juego-duration"] = {
    render() {
      return `
        <div class="tool tool-juego">
          <div class="tool-head"><span class="tool-kicker">Juego</span><h4>Estimá a ojo: ¿cuánto se mueve?</h4></div>
          <div class="juego-top"><span data-ronda>Ronda 1 de 8</span><span data-pts>0 ★</span></div>
          <div class="juego-card" data-card></div>
          <label class="tool-field tool-field-strong">Tu estimación del cambio de precio <output data-o="g">0%</output>
            <input type="range" min="-40" max="40" step="0.5" value="0" data-i="g"></label>
          <div class="juego-acc"><button type="button" class="btn btn-primary btn-sm" data-a="ver">Ver resultado</button>
            <button type="button" class="btn btn-ghost btn-sm" data-a="sig" hidden style="display:none">Siguiente ronda →</button></div>
          <div class="juego-res" data-res></div>
          <p class="tool-foot">Puntaje: 3 ★ si quedás a menos de 1,5% de la respuesta, 1 ★ si quedás a menos de 4%. Cada partida tiene bonos y movimientos distintos.</p>
        </div>`;
    },
    init(raiz) {
      const N = 8; let ronda = 0, pts = 0, actual = null, mejor = 0;
      try { mejor = +localStorage.getItem("aula_juego_duration") || 0; } catch (e) {}
      const slider = $(raiz, "[data-i=g]");
      const ctx = [
        d => `Un cliente tiene un bono con <strong>duration ${fmt(d, 1)}</strong>.`,
        d => `Una ON en dólares con <strong>duration ${fmt(d, 1)}</strong>.`,
        d => `Un Global con <strong>duration ${fmt(d, 1)}</strong>.`
      ];
      function nueva() {
        const d = [1, 1.5, 2, 3, 4, 4.5, 5, 5.5, 6, 7, 8][Math.floor(Math.random() * 11)];
        let s; do { s = [-3, -2, -1.5, -1, -0.5, 0.5, 1, 1.5, 2, 3, 4][Math.floor(Math.random() * 11)]; } while (Math.abs(d * s) > 38);
        const base = [6, 7, 8, 9, 10, 11][Math.floor(Math.random() * 6)];
        actual = { d, s, base, txt: ctx[Math.floor(Math.random() * ctx.length)](d) };
        $(raiz, "[data-card]").innerHTML = `${actual.txt}<br>Su TIR <strong class="${s > 0 ? "neg" : "pos"}">${s > 0 ? "sube" : "baja"} ${fmt(Math.abs(s), s % 1 ? 1 : 0)} p.p.</strong>: pasa de ${fmt(actual.base, 0)}% a ${fmt(actual.base + s, s % 1 ? 1 : 0)}%. ¿Cuánto cambia su precio?`;
        slider.value = 0; slider.disabled = false; pintarG();
        $(raiz, "[data-res]").innerHTML = "";
        $(raiz, "[data-a=ver]").style.display = ""; const sg = $(raiz, "[data-a=sig]"); sg.style.display = "none"; sg.hidden = true;
        $(raiz, "[data-ronda]").textContent = `Ronda ${ronda + 1} de ${N}`;
      }
      function pintarG() { $(raiz, "[data-o=g]").textContent = fmtSigno(+slider.value) + "%"; }
      function ver() {
        const real = -actual.d * actual.s, g = +slider.value, err = Math.abs(g - real);
        const p = err <= 1.5 ? 3 : err <= 4 ? 1 : 0; pts += p; ronda++;
        slider.disabled = true;
        const W = 520, X = v => 20 + (v + 40) / 80 * (W - 40);
        $(raiz, "[data-res]").innerHTML = `
          <svg viewBox="0 0 ${W} 54" class="svgchart juego-linea"><line class="g" x1="20" x2="${W - 20}" y1="24" y2="24"/>
            <line class="zero-l" x1="${X(0)}" x2="${X(0)}" y1="12" y2="36"/>
            <circle class="j-real" cx="${X(real)}" cy="24" r="8"/><text class="pt-label" x="${X(real)}" y="50" text-anchor="middle">real ${fmtSigno(real)}%</text>
            <circle class="j-tuya" cx="${X(g)}" cy="24" r="6"/><text class="pt-label" x="${X(g)}" y="9" text-anchor="middle">vos ${fmtSigno(g)}%</text></svg>
          <p class="${p === 3 ? "ok" : p ? "mid" : "bad"}"><strong>${p === 3 ? "¡Muy bien!" : p ? "Cerca." : "Lejos."}</strong> Duration ${fmt(actual.d, 1)} × ${fmt(Math.abs(actual.s), actual.s % 1 ? 1 : 0)} p.p. = ${fmt(Math.abs(real), 1)}% ${real < 0 ? "de caída" : "de suba"}. ${p ? `+${p} ★` : ""}</p>`;
        $(raiz, "[data-pts]").textContent = pts + " ★";
        $(raiz, "[data-a=ver]").style.display = "none";
        const sg = $(raiz, "[data-a=sig]"); sg.hidden = false; sg.style.display = "";
        sg.textContent = ronda >= N ? "Jugar de nuevo" : "Siguiente ronda →";
        if (ronda >= N) {
          if (pts > mejor) { mejor = pts; try { localStorage.setItem("aula_juego_duration", pts); } catch (e) {} }
          $(raiz, "[data-res]").innerHTML += `<div class="juego-fin"><strong>${pts} de ${N * 3} ★.</strong> ${pts >= 20 ? "Ya lo estimás a ojo." : pts >= 12 ? "Vas bien: una partida más y queda." : "Mirá la tabla de bolsillo y probá de nuevo."} <span>Tu mejor partida: ${mejor} ★.</span></div>`;
        }
      }
      slider.addEventListener("input", pintarG);
      $(raiz, "[data-a=ver]").addEventListener("click", ver);
      $(raiz, "[data-a=sig]").addEventListener("click", () => { if (ronda >= N) { ronda = 0; pts = 0; $(raiz, "[data-pts]").textContent = "0 ★"; } nueva(); });
      nueva();
    }
  };

  /* ======================================================
     GRÁFICO: ASIMETRÍA (convexidad sin la palabra)
     ====================================================== */
  G.asimetria = () => {
    const fl = flujos(6, 10);
    const p0 = precio(fl, 6);
    const filas = [1, 2, 3].map(s => ({ s, baja: (precio(fl, 6 - s) / p0 - 1) * 100, sube: (precio(fl, 6 + s) / p0 - 1) * 100 }));
    const max = 30, w = v => Math.abs(v) / max * 50;
    return `<figure class="figura"><div class="asim">${filas.map(f => `
      <div class="asim-row"><span class="asim-l">±${f.s} p.p.</span>
        <div class="asim-bar"><i class="neg" style="width:${w(f.sube)}%;right:50%"></i><i class="pos" style="width:${w(f.baja)}%;left:50%"></i><b></b></div>
        <span class="asim-v"><em class="neg">${fmtSigno(f.sube)}%</em> / <em class="pos">${fmtSigno(f.baja)}%</em></span></div>`).join("")}</div>
      <figcaption>Bono a 10 años, cupón 6%, que arranca a la par. A la izquierda, cuánto cae si la tasa sube; a la derecha, cuánto sube si la tasa baja lo mismo.</figcaption></figure>`;
  };
})();
