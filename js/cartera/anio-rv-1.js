/* ============================================================
   SIMULACIÓN DE RENTA VARIABLE · Parte 1 (diciembre a marzo)
   Configuración, clientes y los primeros cuatro meses.
   Esqueleto escrito a mano; los números salen del motor y cambian
   un poco en cada partida. Elecciones: solo como variable de mercado.
   Todo es ficticio, con fines de estudio.
   ============================================================ */
(function () {
  "use strict";
  const C = window.CARTERA, { fmt, sg, A, usd, pct } = C.u;
  const G = () => C.CLI.g, T = () => C.CLI.m;
  const Rm = (w, X) => C.R(w, X.ret);
  const q = s => "“" + s + "”";
  const op = (t, sc, d, conf) => ({ t: q(t), sc, d, conf });
  const mt = (c, i) => C.met(C.held(c, i), c, 1);
  const L = k => C.INS[k].n;

  /* La nota de cada cliente: una idea del mes y lo que más pesó en su cartera */
  function nota(c, i, X, h, p, teal) {
    const w = C.held(c, i), ar = C.ORDEN.filter(k => pct(w, k)).map(k => [k, X.ret[k] * pct(w, k) / 100]).sort((a, b) => Math.abs(b[1]) - Math.abs(a[1]));
    const top = ar[0] ? ` Lo que más pesó: ${L(ar[0][0])} (${sg(ar[0][1], 1)} p.p. del ${sg(Rm(w, X))}% del mes).` : "";
    return `<div class="callout${teal ? " teal" : ""}"><b>${h}</b><br>${p}${top}</div>`;
  }

  C.CFG = {
    clave: "elEscritorio_cartera_rv_v1", titulo: "Simulación de renta variable", etiqueta: "Año de acciones", periodo: "Diciembre 2026 a noviembre 2027",
    h1: "Doce meses, catorce vehículos, dos clientes y un mercado que no avisa",
    lead: "Heredás dos cuentas de un colega que se fue. Una jubilada necesita estabilidad; un inversor joven quiere crecer. Tenés geografías, sectores y empresas para repartir: cada mes el mercado se mueve, ellos reaccionan y vos proponés.",
    nLiq: "Plazo y liquidez",
    metricas: (m0, m) => {
      const sec = x => x.secK ? x.secK.toLowerCase() + " " + x.secMax + "%" : "ninguno";
      return [["Si el mercado cae 20%, la cartera cae", "≈ " + fmt(m0.beta * 20, 0) + "%", "≈ " + fmt(m.beta * 20, 0) + "%"], ["En acciones", m0.acc + "%", m.acc + "%"],
        ["Con riesgo argentino", fmt(m0.arg, 0) + "%", fmt(m.arg, 0) + "%"], ["En EE.UU.", m0.us + "%", m.us + "%"],
        ["Sector más pesado", sec(m0), sec(m)], ["Una sola empresa, la mayor", m0.max + "%", m.max + "%"],
        ["Liquidez sin riesgo de precio", usd(m0.liqUSD), usd(m.liqUSD)]];
    },
    temas: [["perfil", "Encaje con el perfil", "perfil", "02 · Perfil, riesgo y carteras"], ["div", "Diversificación", "carterasrv", "T3 · Armar una cartera de acciones"],
      ["liq", "Plazo y liquidez", "perfil", "02 · Perfil, riesgo y carteras"], ["com", "Comunicación", "criterio", "09 · Integración y criterio"]],
    extraFinal: (c, u) => `<span class="acc">Referencia (${c.refN}): ${sg(C.acumRef(c, u))}%</span><span class="acc">Caída máxima del año: ${sg(C.caidaMax(c, u))}% (referencia: ${sg(C.caidaMaxRef(c, u))}%)</span>`
  };

  C.CLI = {
    g: { id: "g", regla: "conservador", nombre: "Elena Ferrero", corto: "Elena", ini: "EF", color: "#7A8B5C", edad: 67, det: "Jubilada. Ex contadora.",
      perfil: "Moderada", monto: 150000, conf: 70, tags: ["Horizonte: 15 años", "Tope de acciones: 40%"], facts: [["Vive de", "su jubilación y de un poco de renta"]],
      cita: "Mi jubilación alcanza, pero no quiero ver que lo que ahorré se achique de golpe. Mi anterior asesor me puso en cosas que no entiendo bien, y mi nieto me dice que compre tecnología.",
      cart: { ypf: 20, ggal: 15, meli: 10, spy: 15, on: 30, mm: 10 }, ref: { spy: 40, mm: 60 }, refN: "40% S&P 500 y 60% liquidez" },
    m: { id: "m", regla: "agresivo", nombre: "Tomás Quiroga", corto: "Tomás", ini: "TQ", color: "#2F6F75", edad: 36, det: "Product manager en una fintech.",
      perfil: "Agresivo", monto: 60000, conf: 70, tags: ["Horizonte: 25 años", "No va a retirar"], facts: [["Se informa", "newsletters y redes"]],
      cita: "Trabajo en tecnología y creo en ella. Tengo 25 años por delante: que se mueva no me asusta. Pero quiero que mi plata crezca de verdad, no que esté quieta.",
      cart: { meli: 35, msft: 30, spy: 15, mm: 20 }, ref: { spy: 100 }, refN: "100% S&P 500" }
  };

  C.MESES = [
  /* ================= DICIEMBRE 2026 ================= */
  { fecha: "Diciembre 2026", corto: "diciembre", infMes: "nov.",
    base: { mkt: 2.5, oil: -2, rp: 25, tech: 3, fin: 0, eur: 0, em: -0.5, meli: 3, tn: 0.1 },
    altF: { mkt: -2.5, tech: -4, meli: -5 },
    cf: { p: "En noviembre nadie sabía si el rally tecnológico seguía o se cortaba. Así le habría ido a cada cartera en los dos casos:", a: X => `Nasdaq ${sg(X.ret.nas)}%`, b: () => "El rally se corta (Nasdaq ≈ −7%)" },
    titular: X => ({ kick: "Mercados · Lunes 7 de diciembre",
      h: `Wall Street cierra el mes en máximos: el Nasdaq sube ${A(X.ret.nas)}% impulsado por la inteligencia artificial`,
      p: `Las grandes tecnológicas lideran. Los CEDEARs de tecnología cotizan en máximos en BYMA. Las acciones argentinas, en cambio, acompañan poco: el riesgo país está en ${X.L.rp} puntos básicos.`,
      also: [["Nvidia, la estrella del mes", `${sg(X.ret.nvda)}%, contra ${sg(X.F.mkt)}% del S&P 500: una sola empresa se mueve mucho más que el índice.`], ["Salud y energía, rezagadas", "Los sectores defensivos suben menos cuando el mercado está optimista."], ["Riesgo país sin sobresaltos", `Sube ${A(X.F.rp, 0)} puntos básicos en el mes.`]],
      chain: ["Optimismo por la inteligencia artificial", "Suben las tecnológicas más que el resto", "El Nasdaq se mueve más que el S&P 500 (beta 1,25)", "Lo argentino no participa: depende del riesgo país"] }),
    g: {
      via: "Mail · martes 9:10",
      dice: () => "Querida, mi nieto me dice que todo el mundo compra tecnología, y yo tengo YPF, Galicia y algo de MercadoLibre, que casi no se mueven. ¿No debería vender eso y comprar tecnología de afuera?",
      nota: X => nota(G(), 0, X, "Una cartera heredada, con muchas decisiones juntas.", `Tiene ${mt(G(), 0).acc}% en acciones y ${fmt(mt(G(), 0).arg, 0)}% con riesgo argentino. Para una jubilada con tope de 40% en acciones, mirá primero cuánto tiene, no qué subió.`),
      msgs: () => [
        op("Tu nieto tiene razón: la tecnología es lo que mejor anda y es el momento de entrar. Vendamos lo argentino y pasemos esa plata a Microsoft y Nvidia, que van a seguir subiendo por la inteligencia artificial.", 6, "Perseguís lo que más subió y le pedís más riesgo a una jubilada.", 3),
        op("Antes de agregar nada, miremos qué tenés: 60% en acciones es más de lo que te corresponde y casi todo es Argentina. Propongo bajar acciones y repartir mejor.", 25, "Cambiás la pregunta (qué te corresponde) y proponés algo concreto.", 7),
        op("Tu cartera tiene un beta de 0,71 y 70% de exposición a un solo país. La política de inversión para tu perfil recomienda reducir ambas métricas antes de evaluar cualquier cambio de composición.", 12, "Tiene razón técnica pero ella no entiende nada.", -3)],
      incoh: (k, m) => k === "2" && (m.acc > 40 || m.arg > 35) ? "Le dijiste que ibas a bajar acciones y la dependencia de Argentina, pero la propuesta no lo hace." : null,
      okKey: "Corregiste lo de fondo (peso en acciones y en Argentina), no el último ranking de rendimientos.",
      resp: ["Ah, no lo había pensado así. Prefiero tener menos nervios. Dale.", "Bueno... ¿entonces compro tecnología o no?", "No entendí nada, pero vos sabés."]
    },
    m: {
      via: "WhatsApp · martes 22:15",
      dice: () => "Nasdaq en máximos y MELI volando. Quiero pasar la plata que tengo quieta a MELI y a Microsoft. Tengo 25 años por delante: no necesito colchón.",
      nota: X => nota(T(), 0, X, "Buen mes, pero la cartera depende de una sola idea.", `Tecnología pesa ${mt(T(), 0).secMax}% del total y MELI sola, ${mt(T(), 0).max}%. Cuando funciona, se siente como una buena estrategia.`),
      msgs: () => [
        op("Dale, te armo todo en MELI y Microsoft: con tu horizonte aguantás lo que venga y la tendencia está clarísima. Si cae, comprás más y bajás el precio promedio de entrada.", 6, "Le das la razón y subís la concentración.", 3),
        op("Me gusta tu convicción y tu horizonte justifica ser agresivo, pero hoy 65% de tu cartera es tecnología y 35% una sola empresa. Mantengamos tu idea y repartamos el resto en otras geografías y sectores.", 25, "Respetás su idea y la separás del riesgo de concentración.", 7),
        op("El Nasdaq cotiza a múltiplos exigentes y hay riesgo de corrección: las valuaciones sugieren cautela en el corto plazo, así que conviene revisar con calma antes de decidir cualquier compra nueva.", 12, "Dudás del mercado, pero no le proponés qué hacer.", -2)],
      incoh: (k, m) => k === "2" && (m.max > 15 || m.secMax > 45) ? "Le dijiste que ibas a repartir, pero la propuesta sigue concentrada." : null,
      okKey: "Respetaste su idea y la ordenaste: tecnología sí, pero sin que una empresa o un sector decidan todo.",
      resp: ["Tiene sentido. Mi idea sigue, pero no todo en un solo canasto. Hacelo.", "Está bien... pero no me dijiste qué hago.", "¿Entonces no puedo apostar a lo que creo? Qué aburrido."]
    },
    leccion: X => ({ h: "Un mes bueno no prueba que la cartera esté bien armada.", p: `Este mes la tecnología subió ${A(X.ret.nas)}%. Para Tomás confirma su idea; para Elena es una tentación. La pregunta del asesor es otra: si el mercado se da vuelta, ¿qué parte de la cartera depende de una sola cosa?` }),
    cierreH: "Cierre de diciembre", cierreLead: "Primer mes: dos carteras heredadas, dos clientes con ideas propias."
  },

  /* ================= ENERO 2027 ================= */
  { fecha: "Enero 2027", corto: "enero", infMes: "dic.",
    base: { mkt: -1.5, oil: 3, rp: 15, tech: -7, fin: 3.5, eur: 1, em: 0.5, meli: -3, tn: 0.4 },
    altF: { tech: 2, tn: -0.1, fin: -1.5, mkt: 0.5 },
    cf: { p: "En diciembre nadie sabía si las tasas de EE.UU. iban a subir. Así le habría ido a cada cartera en los dos casos:", a: X => `tasas ${sg(X.F.tn)} p.p., Nasdaq ${sg(X.ret.nas)}%`, b: () => "Las tasas quietas y la tecnología siguiendo" },
    titular: X => ({ kick: "Mercados · Jueves 14 de enero",
      h: `La tasa a 10 años de EE.UU. sube a ${fmt(X.L.tn)}% y la tecnología corrige: el Nasdaq cae ${A(X.ret.nas)}%`,
      p: "Cuando suben las tasas, las empresas de crecimiento valen menos y los bancos ganan más por prestar. El S&P 500 cayó poco porque los bancos y la energía compensaron parte de la baja.",
      also: [["Los bancos de EE.UU. suben", `JPMorgan, el banco más grande del país, ${X.ret.jpm >= 0 ? "ganó" : "perdió"} ${A(X.ret.jpm)}%.`], ["Petróleo en alza", `El Brent llegó a USD ${X.L.oil}.`], ["Riesgo país", `${X.L.rp} puntos básicos, ${sg(X.F.rp, 0)} en el mes.`]],
      chain: ["Suben las tasas en EE.UU.", "Las empresas de crecimiento valen menos", "Cae la tecnología; suben bancos y energía", "El S&P cae menos que el Nasdaq: los sectores se compensan"] }),
    g: {
      via: "Llamado · viernes 10:30",
      dice: () => "Vi que la tecnología se cayó. Menos mal que no compré lo que decía mi nieto. Pero una cosa: ¿por qué mis acciones del banco argentino no subieron cuando subieron los bancos de afuera?",
      nota: X => nota(G(), 1, X, "Mismo sector, distinto país.", `Los bancos de EE.UU. ganaron por las tasas de allá. Galicia depende sobre todo del riesgo país (${sg(X.F.rp, 0)} pb este mes).`, true),
      msgs: () => [
        op("Los bancos argentinos y los de afuera son el mismo sector, así que tarde o temprano van a seguir el mismo camino. Quedate tranquila: lo que sube allá termina subiendo acá.", 6, "Ignorás que lo argentino responde al riesgo país, no a las tasas de EE.UU.", 3),
        op("Son el mismo sector pero otro país: a los bancos de EE.UU. los ayudan las tasas de allá; a Galicia la mueve el riesgo país, que subió. Por eso conviene tener de los dos y no depender de uno.", 25, "Explicás la diferencia con una frase y la conectás con diversificar.", 7),
        op("Cada acción tiene su propia dinámica y las comparaciones directas entre mercados distintos suelen ser engañosas. Mejor mirar cada empresa por separado, con sus números, y decidir después.", 10, "Cierto, pero no ayuda a entender.", -2)],
      incoh: (k, m) => k === "2" && m.arg > 40 ? "Le dijiste que conviene no depender de un solo país, pero la propuesta sigue muy argentina." : null,
      okKey: "Aprovechaste la pregunta para mostrar que sector y país son dos ejes distintos.",
      resp: ["Ahora lo entiendo: son bancos, pero no es lo mismo. Gracias.", "Mmm... no me quedó claro, pero bueno.", "Bueno, será así."]
    },
    m: {
      via: "WhatsApp · domingo 19:40",
      dice: X => mt(T(), 1).secMax >= 50 ? "Se cayó la tecnología y yo tengo casi todo ahí. ¿Es momento de comprar más barato? Siempre rebota."
        : "Se cayó la tecnología. ¿Aprovechamos para comprar más barato? Siempre rebota.",
      nota: X => nota(T(), 1, X, "Una corrección, no un colapso.", `Cuánto te pegó depende de cuánto tenías en tecnología. Fijate también quién subió: los bancos y la energía. Que algo haya caído no garantiza que vaya a rebotar.`),
      msgs: () => [
        op("Sí, comprá la caída: la tecnología siempre rebota y el que compra abajo gana. Pasemos todo lo que puedas a Microsoft y MELI antes de que el mercado se dé cuenta y los precios vuelvan.", 4, "Le prometés un rebote que no sabés y aumentás la concentración.", 3),
        op("Una corrección de −7% por suba de tasas no es señal de compra ni de venta. Si tu idea sigue, sumemos algo de tecnología sin pasar del 40%: así la próxima corrección no te define el año.", 25, "Le das una regla de tamaño y separás la idea del timing.", 7),
        op("No puedo saber si este es el piso de la corrección, y es cierto que nadie lo sabe. Lo prudente es esperar a que se estabilicen las tasas y recién ahí volver a mirar si tiene sentido sumar algo.", 10, "Honesto, pero lo dejás sin criterio.", -2)],
      incoh: (k, m) => k === "2" && m.secMax > 45 ? "Le dijiste que no pasaban del 40% en tecnología, pero la propuesta lo pasa." : null,
      okKey: "No convertiste una caída en una señal: fijaste cuánto aguanta tu cartera si sigue.",
      resp: ["Mmm, tiene lógica. Pongo un poco y listo.", "Ok, ¿entonces compro o no?", "Qué lástima. Yo sentía que era la oportunidad."]
    },
    leccion: () => ({ h: "Cuando algo cae, ver quién sube.", p: "La tecnología cayó 7%; los bancos de EE.UU. y la energía subieron. Eso es lo que hace útil mezclar sectores: no evita la caída, la hace más chica. Y una caída no trae un rebote garantizado detrás." }),
    cierreH: "Cierre de enero", cierreLead: "Las tasas se movieron y los sectores respondieron distinto."
  },

  /* ================= FEBRERO 2027 ================= */
  { fecha: "Febrero 2027", corto: "febrero", infMes: "ene.",
    base: { mkt: -0.5, oil: 12, rp: -20, tech: 1, fin: 0.5, eur: -1, em: 0, meli: 1, tn: 0.1 },
    altF: { oil: -6, rp: 30, mkt: -1 },
    cf: { p: "En enero nadie sabía si el petróleo iba a seguir subiendo o iba a volver. Así le habría ido a cada cartera en los dos casos:", a: X => `Brent ${sg(X.F.oil, 0)}%`, b: () => "El petróleo se corrige (−6%)" },
    titular: X => ({ kick: "Mercados · Martes 9 de febrero",
      h: `El petróleo salta ${A(X.F.oil, 0)}% por la tensión en Medio Oriente y las petroleras lideran la suba`,
      p: `El Brent llegó a USD ${X.L.oil}. Las energéticas de EE.UU. suben, y YPF acompaña. El resto del mercado, estable.`,
      also: [["YPF y Vaca Muerta", `La acción ${X.ret.ypf >= 0 ? "subió" : "cayó"} ${A(X.ret.ypf)}% en el mes.`], ["Bajan las expectativas de tasas", "Tecnología y mercado, casi sin cambios."], ["Riesgo país", `${X.L.rp} pb, ${sg(X.F.rp, 0)} en el mes.`]],
      chain: ["Sube el petróleo por un hecho puntual", "Ganan las energéticas, que venden crudo", "YPF gana por dos vías: crudo y menor riesgo país", "El efecto puede revertirse si el hecho se resuelve"] }),
    g: {
      via: "WhatsApp · martes 18:20",
      dice: () => "El petróleo sube y mi YPF también. ¿No conviene poner más en YPF ahora que anda bien?",
      nota: X => nota(G(), 2, X, "Ganó lo que ya tenía.", "YPF depende del petróleo y de Argentina a la vez. Más peso ahí es más riesgo, aunque este mes haya acompañado.", true),
      msgs: () => [
        op("Sí, YPF va a seguir al petróleo: pasemos más plata ahí y aprovechás la suba mientras dure. Ya cobraste un buen mes y el crudo no suele frenarse de golpe.", 6, "Perseguís el último ganador con una empresa sola.", 3),
        op("El petróleo sube por un hecho puntual y puede volver a bajar. YPF depende del crudo y de Argentina: más peso ahí sube tu riesgo. Si querés energía, mejor afuera, como ExxonMobil, y con poco peso.", 25, "Das una alternativa que mantiene la idea sin concentrar.", 7),
        op("El petróleo es imposible de predecir y los que intentan anticiparlo suelen equivocarse. Prefiero no hacer movimientos y mirar cómo evoluciona el mercado en las próximas semanas antes de tocar nada.", 10, "Cierto, pero no mirás cómo está armada hoy.", -2)],
      incoh: (k, m) => k === "2" && pct(C.dec(2, G()).w, "ypf") > 20 ? "Le dijiste que más YPF suma riesgo, pero la propuesta le sube el peso." : null,
      okKey: "No cambiaste de cartera por un hecho puntual: mantuviste el límite por empresa.",
      resp: ["Ah, claro, no lo había pensado como una apuesta al crudo. Gracias.", "Bueno, dejémoslo así.", "Pero entonces me pierdo la suba..."]
    },
    m: {
      via: "WhatsApp · jueves 21:00",
      dice: () => "El petróleo se disparó y me estoy perdiendo la fiesta. Quiero entrar fuerte en YPF y en energía.",
      nota: X => nota(T(), 2, X, "Un buen mes para la energía, no para su cartera.", "Una cartera sin energía no la sintió. Entrar después de la suba es otra cosa que haber estado antes."),
      msgs: () => [
        op("Dale, pasemos una parte grande a YPF y a energía de afuera mientras dure la suba: el crudo puede seguir y el que llega primero se queda con la mejor parte del movimiento, que recién empieza.", 5, "Entrás tarde y con mucho peso a una apuesta que depende de un evento.", 3),
        op("Puede ser una apuesta táctica: no más de 10 o 15% entre ExxonMobil e YPF, sabiendo que si el crudo revierte, cae. Y mejor energía de afuera, como ExxonMobil, que YPF sola: no suma riesgo argentino.", 25, "Le das un tamaño y un criterio, sin decirle que no.", 7),
        op("El petróleo ya subió 12% en el mes: la oportunidad pasó y entrar ahora es comprar caro. Me parece mejor quedarnos afuera y esperar una corrección antes de armar cualquier posición de energía.", 10, "Puede ser cierto, pero no sabés si seguirá subiendo.", -2)],
      incoh: (k, m, w) => k === "2" && pct(w, "ypf") + pct(w, "xom") > 20 ? "Le dijiste que no más de 10 o 15% en energía, pero la propuesta lo supera." : null,
      okKey: "Dejaste lugar para su idea sin que el petróleo decida la cartera.",
      resp: ["Ok, una parte alcanza. Veamos cómo sigue.", "Mmm... no sé, me da bronca.", "Siempre me decís que no. ¿Cuál es la gracia?"]
    },
    leccion: () => ({ h: "Entrar después de la suba no es lo mismo que haber estado.", p: "Cuando algo sube mucho, hay una presión a sumarlo. La energía subió por un hecho puntual: si el hecho se resuelve, revierte. Lo que cuenta es cuánto dejás en esa apuesta, no si acertó el mes pasado." }),
    cierreH: "Cierre de febrero", cierreLead: "El mercado ofrece historias nuevas todos los meses. El tamaño de la apuesta es lo que decide."
  },

  /* ================= MARZO 2027 ================= */
  { fecha: "Marzo 2027", corto: "marzo", infMes: "feb.",
    base: { mkt: -5.5, oil: -6, rp: 110, tech: -2, fin: -2, eur: -1, em: -2, meli: -4, tn: -0.3 },
    altF: { mkt: -1, oil: 0, rp: 20, tech: 2, fin: 0, em: 0, meli: 1, eur: 0 },
    cf: { p: "En febrero nadie sabía si venía una caída global o un mes tranquilo. Así le habría ido a cada cartera en los dos casos:", a: X => `S&P ${sg(X.F.mkt)}%, riesgo país ${sg(X.F.rp, 0)} pb`, b: () => "Mes tranquilo (S&P −1%)" },
    titular: X => ({ kick: "Mercados · Miércoles 10 de marzo",
      h: `Semana negra: el S&P 500 cae ${A(X.F.mkt)}% por dudas sobre el crecimiento y el riesgo país trepa a ${X.L.rp} puntos básicos`,
      p: "Cae casi todo a la vez: tecnología, bancos, energía, Europa, emergentes y Argentina. Lo defensivo, como la salud, cae menos. El dinero busca refugio en liquidez.",
      also: [["Salud, la que menos cae", `Johnson & Johnson ${X.ret.jnj >= 0 ? "sube" : "baja"} ${A(X.ret.jnj)}%.`], ["Argentina, la que más sufre", `YPF ${sg(X.ret.ypf)}%, Galicia ${sg(X.ret.ggal)}%.`], ["Petróleo", `Cae ${A(X.F.oil, 0)}% y también arrastra a las energéticas.`]],
      chain: ["Dudas sobre el crecimiento global", "Venden acciones de todos los sectores", "La diversificación baja la caída, no la elimina", "A Argentina se suma el riesgo país: cae más que el resto"] }),
    g: {
      via: "Llamado · lunes 9:00",
      dice: () => "¡Se cayó todo! Mis nietos preguntan si vendo todo. Yo pensé que diversificar protegía. ¿Qué pasó?",
      nota: X => nota(G(), 3, X, "El día en que la diversificación se prueba.", "En un mes así casi todo cae junto. Lo que cambia es cuánto: una cartera con menos acciones y más liquidez cae menos.", true),
      msgs: () => [
        op("Quedate tranquila: esto rebota en un mes, como siempre. No vendas ni toques nada, que enseguida se recupera y en poco tiempo vas a haber recuperado todo lo que cayó, sin hacer nada.", 5, "Prometés un rebote que no sabés. Si sigue cayendo, perdés credibilidad.", 3),
        op("Diversificar no evita las caídas, las achica: en un mes así casi todo cae junto. Tu cartera cayó menos que el mercado. No vendas por susto; revisemos si el reparto te deja tranquila.", 25, "Explicás qué hace y qué no hace la diversificación, sin prometer nada.", 7),
        op("Con el S&P cayendo 5,5% y un beta de 0,5, el efecto estimado en tu cartera es de alrededor de 3%. Es un movimiento dentro de lo esperable para el nivel de riesgo que tiene hoy tu cartera.", 8, "Correcto pero frío: ella no pregunta por el número.", -3)],
      incoh: (k, m) => k === "2" && m.beta > 0.6 ? "Le dijiste que tu cartera cayó menos porque es defensiva, pero la propuesta sube el riesgo." : null,
      okKey: "No vendiste por miedo ni le prometiste un rebote: le explicaste qué hace la diversificación.",
      resp: ["Ah, entonces es normal que baje algo. Me quedo más tranquila.", "Bueno, ojalá se recupere.", "No sé... sigo con miedo."]
    },
    m: {
      via: "WhatsApp · lunes 8:15",
      dice: () => "Todo en rojo. Ahora sí compro la caída, ¿no? Lo que más cayó es lo que más rebota.",
      nota: X => nota(T(), 3, X, "Cuando todo cae, la correlación sube.", "Lo que parecía distinto (tecnología, MELI, Europa) cayó junto. Que algo haya caído mucho no dice cuánto va a rebotar, ni cuándo."),
      msgs: () => [
        op("Sí, ahora sí: pasemos todo lo que tenés líquido a lo que más cayó. Lo que más baja es lo que más rebota, y con tu horizonte podés aguantar cualquier volatilidad.", 4, "Prometés un rebote y concentrás sin saber si fue el piso.", 3),
        op("Con tu horizonte, comprar caídas puede ser buena idea, pero de a poco y sin concentrarte: una parte ahora y dejar algo por si sigue cayendo. No sabemos si este fue el piso, y no hace falta acertarlo.", 25, "Das un método (de a partes) y reconocés lo que no se sabe.", 7),
        op("Esperemos a que el mercado se aclare un poco. No conviene decidir en medio de una caída fuerte: hagamos una pausa, veamos cómo cierra el mes y después revisamos la cartera con más información.", 10, "Prudente, pero con 25 años de horizonte una caída así es parte del camino.", -2)],
      incoh: (k, m) => k === "2" && m.max > 20 ? "Le dijiste que iban de a poco y sin concentrarte, pero la propuesta concentra en una empresa." : null,
      okKey: "Usaste la caída sin convertirla en una apuesta a un solo nombre.",
      resp: ["Ok, de a partes me parece bien. Me deja tranquilo.", "Está bien... pero siento que me quedo con ganas.", "Siempre cauteloso. Así no se gana."]
    },
    leccion: () => ({ h: "La diversificación achica las caídas, no las evita.", p: "En una crisis la correlación sube y casi todo cae junto. Lo que se nota es el tamaño: lo defensivo y la liquidez cayeron menos. Por eso importa pensar en qué cartera podría tolerar el cliente, no solo en cómo se movió en un año tranquilo." }),
    cierreH: "Cierre de marzo", cierreLead: "Primer golpe fuerte del año: cada cliente lo vivió según cómo estaba armada su cartera."
  }
  ];
})();
