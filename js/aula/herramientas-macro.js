/* ============================================================
   HERRAMIENTAS Y GRÁFICOS DEL MÓDULO DE MACRO
   Datos de coyuntura a noviembre de 2026.
   ============================================================ */
(function () {
  const H = AULA.herramientas, G = AULA.graficos;
  const fmt = (n, d = 1) => Number(n).toLocaleString("es-AR", { minimumFractionDigits: d, maximumFractionDigits: d });
  const $ = (r, s) => r.querySelector(s), $$ = (r, s) => Array.from(r.querySelectorAll(s));

  /* ======================================================
     1 · MAPA DE TRANSMISIÓN: DEL TITULAR A LA CARTERA
     ====================================================== */
  const ACTIVOS = [
    { k: "lecap", n: "LECAP corta / caución", g: "Pesos" },
    { k: "boncap", n: "BONCAP larga (tasa fija)", g: "Pesos" },
    { k: "cer", n: "Bono CER", g: "Pesos" },
    { k: "dl", n: "Dollar-linked", g: "Pesos" },
    { k: "gdc", n: "Global corto (GD30)", g: "Dólares" },
    { k: "gdl", n: "Global largo (GD35, GD41)", g: "Dólares" },
    { k: "on", n: "ONs en dólares", g: "Dólares" },
    { k: "acc", n: "Acciones locales (bancos, utilities)", g: "Acciones" },
    { k: "oil", n: "Petroleras (YPF, VIST)", g: "Acciones" },
    { k: "ced", n: "CEDEARs (medidos en dólares)", g: "Acciones" }
  ];
  // valor: 2 sube mucho, 1 sube, 0 neutro, -1 baja, -2 baja mucho
  const SHOCKS = {
    rp: { n: "Sube el riesgo país", d: "El mercado le pide más tasa a la Argentina, como entre julio y noviembre de 2026.", e: {
      lecap: [0, "Vence pronto: casi no se mueve. Puede incluso ganar demanda como refugio."],
      boncap: [-1, "Con estrés, suben las tasas en pesos y cae el precio de los bonos largos."],
      cer: [-1, "Suben las tasas reales que pide el mercado: los CER largos bajan de precio."],
      dl: [1, "Aumenta la demanda de cobertura contra una devaluación."],
      gdc: [-1, "Cae, pero poco: tiene poca duration."],
      gdl: [-2, "Es lo que más cae: mucha duration y riesgo argentino puro."],
      on: [-1, "El riesgo país es un piso para las empresas: caen, pero menos que los soberanos."],
      acc: [-2, "Las acciones argentinas suelen ser lo más sensible al riesgo país."],
      oil: [-1, "Caen por riesgo argentino, aunque sus ingresos en dólares las amortiguan."],
      ced: [0, "En dólares, el riesgo argentino no los toca. En pesos pueden subir si sube el CCL."]
    }},
    inf: { n: "La inflación sorprende para arriba", d: "El dato del mes sale por encima de lo que esperaba el mercado (el REM).", e: {
      lecap: [-1, "Rinde una tasa fija que, con más inflación, vale menos en términos reales."],
      boncap: [-2, "Tasa fija y larga: pierde poder de compra y además suben las tasas nominales."],
      cer: [1, "Gana demanda: es la cobertura natural contra la inflación."],
      dl: [0, "Sigue al dólar oficial, no a la inflación: efecto directo chico."],
      gdc: [0, "Efecto directo chico, salvo que la sorpresa genere dudas sobre el programa."],
      gdl: [0, "Efecto directo chico, salvo que la sorpresa genere dudas sobre el programa."],
      on: [0, "Efecto directo chico."],
      acc: [-1, "Más inflación suele traer tasas más altas y más incertidumbre."],
      oil: [0, "Sus ingresos son en dólares: el efecto directo es chico."],
      ced: [0, "Activo del exterior: no lo afecta en dólares."]
    }},
    fx: { n: "Salta el dólar oficial", d: "El tipo de cambio sube fuerte en pocos días. Todo medido en dólares.", e: {
      lecap: [-2, "Medida en dólares, pierde lo que subió el tipo de cambio."],
      boncap: [-2, "Pierde por el salto y, si hay estrés, también por suba de tasas."],
      cer: [-1, "Cubre la inflación que viene después, no el salto de hoy: en dólares pierde."],
      dl: [0, "Se ajusta por el oficial: en dólares oficiales queda cubierto. Para eso está."],
      gdc: [0, "Ya está en dólares: el salto no lo afecta directamente."],
      gdl: [-1, "En dólares no lo afecta directo, pero un salto suele venir con más riesgo país."],
      on: [0, "Ya están en dólares."],
      acc: [-1, "En dólares suelen caer: sus ingresos son en pesos y el salto trae incertidumbre."],
      oil: [1, "Venden en dólares y parte de sus costos son en pesos: el salto las favorece."],
      ced: [0, "En dólares no cambian. En pesos suben junto con el CCL."]
    }},
    tasa: { n: "Bajan las tasas en pesos", d: "El Tesoro convalida tasas más bajas en las licitaciones o baja la tasa de caución.", e: {
      lecap: [0, "Lo que ya tiene casi no cambia; lo nuevo rinde menos."],
      boncap: [2, "Es lo que más gana: tasa fija y duration alta."],
      cer: [1, "Si bajan también las tasas reales, los CER largos suben de precio."],
      dl: [0, "Efecto directo chico."],
      gdc: [0, "Efecto directo chico."],
      gdl: [0, "Efecto directo chico, salvo que la baja se lea como señal de confianza."],
      on: [0, "Efecto directo chico."],
      acc: [1, "Tasas más bajas suelen favorecer a las acciones locales."],
      oil: [0, "Efecto directo chico."],
      ced: [0, "Puede subir algo en pesos si los pesos buscan refugio en dólares."]
    }},
    fed: { n: "Sube la tasa de EE.UU.", d: "Los bonos del Tesoro de EE.UU. pagan más, como en septiembre y octubre de 2026.", e: {
      lecap: [0, "Efecto directo chico."],
      boncap: [0, "Efecto directo chico."],
      cer: [0, "Efecto directo chico."],
      dl: [0, "Efecto directo chico."],
      gdc: [-1, "Sube la tasa base de todos los bonos en dólares."],
      gdl: [-2, "Sube la tasa base y tiene mucha duration: es el más golpeado."],
      on: [-1, "Sube la tasa base de los bonos en dólares."],
      acc: [-1, "Los emergentes suelen perder atractivo cuando EE.UU. paga más."],
      oil: [-1, "Mismo efecto general sobre emergentes."],
      ced: [-1, "Las tasas altas pesan sobre las acciones, sobre todo las tecnológicas."]
    }},
    oilp: { n: "Cae el petróleo", d: "El Brent baja fuerte, como entre fines de octubre y noviembre de 2026.", e: {
      lecap: [0, "Efecto directo chico."],
      boncap: [0, "Efecto directo chico."],
      cer: [0, "Efecto directo chico."],
      dl: [0, "Efecto directo chico."],
      gdc: [0, "Efecto chico en el corto plazo."],
      gdl: [-1, "Menos dólares de Vaca Muerta a futuro: algo menos de capacidad de pago."],
      on: [-1, "Las ONs de petroleras sienten la baja; las de otros sectores, poco."],
      acc: [0, "Efecto directo chico."],
      oil: [-2, "Su ingreso depende directamente del precio del crudo."],
      ced: [0, "Depende del CEDEAR: XOM baja, las tecnológicas casi no lo sienten."]
    }}
  };
  const flecha = v => ({ 2: "▲▲", 1: "▲", 0: "=", "-1": "▼", "-2": "▼▼" }[v]);

  H["mapa-transmision"] = {
    render() {
      return `
        <div class="tool tool-mapa">
          <div class="tool-head"><span class="tool-kicker">Herramienta</span><h4>Del titular a la cartera</h4></div>
          <p class="tool-hint">Elegí qué pasó. Tocá cualquier activo para ver por qué se mueve así.</p>
          <div class="mapa-shocks">${Object.entries(SHOCKS).map(([k, s], i) => `<button type="button" class="chip ${i === 0 ? "is-on" : ""}" data-s="${k}">${s.n}</button>`).join("")}</div>
          <div class="mapa-desc" data-desc></div>
          <div class="mapa-grid" data-grid></div>
          <div class="mapa-why" data-why></div>
          <p class="tool-foot">Es el efecto típico de primer orden, no una ley: en cada episodio pueden pesar otras cosas. Sirve para ordenar la primera reacción, no para reemplazar el análisis.</p>
        </div>`;
    },
    init(raiz) {
      let actual = "rp";
      function pintar() {
        const s = SHOCKS[actual];
        $(raiz, "[data-desc]").textContent = s.d;
        let grupo = "";
        $(raiz, "[data-grid]").innerHTML = ACTIVOS.map(a => {
          const [v] = s.e[a.k];
          const head = a.g !== grupo ? `<div class="mapa-g">${(grupo = a.g)}</div>` : "";
          return head + `<button type="button" class="mapa-row v${v}" data-a="${a.k}"><span>${a.n}</span><b>${flecha(v)}</b></button>`;
        }).join("");
        $(raiz, "[data-why]").innerHTML = "";
      }
      $$(raiz, "[data-s]").forEach(b => b.addEventListener("click", () => {
        $$(raiz, "[data-s]").forEach(x => x.classList.toggle("is-on", x === b)); actual = b.dataset.s; pintar();
      }));
      $(raiz, "[data-grid]").addEventListener("click", ev => {
        const r = ev.target.closest("[data-a]"); if (!r) return;
        $$(raiz, ".mapa-row.is-sel").forEach(x => x.classList.remove("is-sel")); r.classList.add("is-sel");
        const a = ACTIVOS.find(x => x.k === r.dataset.a), [v, txt] = SHOCKS[actual].e[a.k];
        $(raiz, "[data-why]").innerHTML = `<strong>${a.n} ${flecha(v)}</strong> ${txt}`;
      });
      pintar();
    }
  };

  /* ======================================================
     GRÁFICOS
     ====================================================== */
  G.vencimientos = () => {
    const d = [["2026", 8.8], ["2027", 22.6]];
    const max = 25;
    return `<figure class="figura"><div class="venc">${d.map(([a, v]) => `
      <div class="venc-col"><div class="venc-bar"><i style="height:${v / max * 100}%"><b>USD ${fmt(v, 1)} mil M</b></i></div><span>${a}</span></div>`).join("")}
      <div class="venc-note"><strong>×2,6</strong><span>Los vencimientos en moneda dura de 2027 son más del doble que los de 2026, y caen en un año de elecciones presidenciales.</span></div></div>
      <figcaption>Vencimientos de deuda en moneda dura (capital e intereses). Fuente: El Cronista. Otras estimaciones (GMA Capital, Ministerio de Economía) dan entre USD 23.600 y 24.900 millones para 2027.</figcaption></figure>`;
  };

  G["curva-electoral"] = () => `
    <figure class="figura"><div class="elec">
      <div class="elec-tl">
        <div class="elec-top">
          <span style="left:4%"><b>Hoy</b><small>nov. 2026</small></span>
          <span class="vote" style="left:38%"><b>Elecciones</b><small>oct. 2027</small></span>
          <span class="ng" style="left:58%"><b>Asume el nuevo gobierno</b><small>dic. 2027</small></span>
        </div>
        <div class="elec-axis"><i class="mand" style="left:0;width:58%"></i><i class="next" style="left:58%;width:42%"></i></div>
        <div class="elec-bot">
          <span class="b27" style="left:44%"><b>AO27</b><small>vence 29/10/2027</small></span>
          <span class="b28" style="left:91%"><b>AO28</b><small>vence 31/10/2028</small></span>
        </div>
        <div class="elec-leg"><span><i class="mand"></i>Mandato actual</span><span><i class="next"></i>Próximo gobierno</span></div>
      </div>
      <div class="elec-bars">
        <div><span>AO27</span><i style="width:${4.37 / 12 * 100}%"></i><b>4,4%</b></div>
        <div class="late"><span>AO28</span><i style="width:${11.9 / 12 * 100}%"></i><b>11,9%</b></div>
      </div>
      <p class="elec-msg">Dos bonos casi iguales, del mismo emisor y la misma ley. La gran diferencia: el AO27 lo paga el gobierno actual y el AO28, <strong>el próximo</strong>. Los 750 puntos básicos de diferencia son, en gran parte, el precio que el mercado le pone a la incertidumbre electoral.</p>
    </div><figcaption>TIR en dólares al 29 de septiembre de 2026 (iProfesional). El 6 de noviembre el AO27 rendía 3,1% (Forbes Argentina).</figcaption></figure>`;

  G["onshore-offshore"] = () => {
    const niveles = [
      ["Bonares (AL, AE, AO)", "Riesgo argentino + ley argentina + custodia local", 4],
      ["Globales (GD)", "Riesgo argentino + ley de Nueva York + custodia local", 3],
      ["CEDEARs y ETFs vía CEDEAR", "Activo del exterior, pero certificado y custodia en Argentina", 2],
      ["Cuenta en el exterior", "Activo del exterior y custodia afuera: fuera del alcance de una restricción local", 1]
    ];
    return `<figure class="figura"><div class="onoff">${niveles.map(([n, d, r]) => `
      <div class="onoff-row"><div class="onoff-l"><strong>${n}</strong><small>${d}</small></div>
        <div class="onoff-bar"><i style="width:${r / 4 * 100}%;background:${["","var(--olive)","var(--gold)","#B0683C","var(--terracotta)"][r]}"></i></div></div>`).join("")}
      <div class="onoff-axis"><span>← menos riesgo argentino</span><span>más riesgo argentino →</span></div></div>
      <figcaption>De abajo hacia arriba, cada escalón suma una capa de riesgo argentino. Más arriba suele haber más rendimiento; más abajo, más protección.</figcaption></figure>`;
  };

  G.bandas = () => {
    const piso = 698.44, techo = 1989.12, may = 1543.62;
    const X = v => (v - 500) / (2100 - 500) * 100;
    return `<figure class="figura"><div class="bandas">
      <div class="bandas-track"><span class="bandas-zone" style="left:${X(piso)}%;width:${X(techo) - X(piso)}%"></span>
        <span class="bandas-mark piso" style="left:${X(piso)}%"><b>Piso</b>$${fmt(piso, 0)}</span>
        <span class="bandas-mark techo" style="left:${X(techo)}%"><b>Techo</b>$${fmt(techo, 0)}</span>
        <span class="bandas-now" style="left:${X(may)}%"><b>Mayorista hoy</b>$${fmt(may, 0)}</span></div>
      <p>Entre el piso y el techo, el dólar flota y el BCRA no está obligado a intervenir. Si toca el techo, vende dólares; si toca el piso, compra. Hoy el mayorista está a unos $445 del techo de fin de noviembre.</p>
    </div><figcaption>Bandas al 30 de noviembre de 2026 y mayorista del 9 de noviembre (iProfesional, Forbes Argentina).</figcaption></figure>`;
  };

  G["sorpresa-ipc"] = () => {
    const d = [["Nivel general", 2.2, 1.8], ["Núcleo", 1.5, 1.7]];
    const max = 2.6;
    return `<figure class="figura"><div class="sorp">${d.map(([n, real, esp]) => `
      <div class="sorp-row"><span>${n}</span>
        <div class="sorp-bars"><div><i class="esp" style="width:${esp / max * 100}%"></i><b>${fmt(esp)}% esperado</b></div>
        <div><i class="real ${real > esp ? "up" : "down"}" style="width:${real / max * 100}%"></i><b>${fmt(real)}% dato</b></div></div>
        <em class="${real > esp ? "up" : "down"}">${real > esp ? "+" : "−"}${fmt(Math.abs(real - esp))} pp</em></div>`).join("")}</div>
      <figcaption>Inflación de octubre de 2026 contra lo que esperaba el REM. Fuente: INDEC (12/11/2026) vía Rankia e Infobae.</figcaption></figure>`;
  };
})();
