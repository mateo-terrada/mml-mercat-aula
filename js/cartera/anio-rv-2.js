/* ============================================================
   SIMULACIÓN DE RENTA VARIABLE · Parte 2 (abril a julio)
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
  function nota(c, i, X, h, p, teal) {
    const w = C.held(c, i), ar = C.ORDEN.filter(k => pct(w, k)).map(k => [k, X.ret[k] * pct(w, k) / 100]).sort((a, b) => Math.abs(b[1]) - Math.abs(a[1]));
    const top = ar[0] ? ` Lo que más pesó: ${L(ar[0][0])} (${sg(ar[0][1], 1)} p.p. del ${sg(Rm(w, X))}% del mes).` : "";
    return `<div class="callout${teal ? " teal" : ""}"><b>${h}</b><br>${p}${top}</div>`;
  }

  C.MESES.push(
  /* ================= ABRIL 2027 ================= */
  { fecha: "Abril 2027", corto: "abril", infMes: "mar.",
    base: { mkt: 3, oil: 2, rp: 70, tech: 3, fin: 1, eur: 1.5, em: 1, meli: 1, tn: -0.1 },
    altF: { mkt: -3, rp: -30, tech: -2, oil: -3 },
    cf: { p: "En marzo nadie sabía si el rebote global iba a llegar a Argentina. Así le habría ido a cada cartera en los dos casos:", a: X => `S&P ${sg(X.F.mkt)}%, riesgo país ${sg(X.F.rp, 0)} pb`, b: () => "Cae el mundo y Argentina se recupera" },
    titular: X => ({ kick: "Mercados · Jueves 8 de abril",
      h: `Wall Street rebota ${A(X.F.mkt)}%, pero Argentina no acompaña: el riesgo país sube otros ${A(X.F.rp, 0)} puntos básicos, a ${X.L.rp}`,
      p: "El mercado global recuperó parte de lo perdido. Las acciones argentinas, en cambio, siguen cayendo: pesan las dudas sobre el programa económico y la cercanía de las elecciones.",
      also: [["Tecnología lidera el rebote", `El Nasdaq ${sg(X.ret.nas)}%.`], ["Galicia sigue bajando", `${sg(X.ret.ggal)}% en el mes, con el riesgo país en alza.`], ["Europa y emergentes", `Acompañan: ${sg(X.ret.eur)}% y ${sg(X.ret.eem)}%.`]],
      chain: ["El mercado global se recupera", "Suben las empresas que dependen de él", "Argentina tiene su propio factor: el riesgo país", "Lo argentino no rebota aunque el mundo sí"] }),
    g: {
      via: "Mail · miércoles 10:00",
      dice: () => "Wall Street se recuperó pero mis acciones argentinas siguen bajando. ¿Las mantengo? ¿O vendo y entro a lo de afuera?",
      nota: X => nota(G(), 4, X, "Dos mercados, dos motores.", `Lo de afuera dependía del mercado global, que rebotó. Lo argentino depende además del riesgo país, que siguió subiendo (${sg(X.F.rp, 0)} pb).`, true),
      msgs: () => [
        op("Esperá: lo argentino siempre rebota fuerte y después compensa lo perdido. Mantené todo como está, que cuando el riesgo país se acomode vuelve a subir y recuperás todo de una vez.", 5, "Prometés un rebote que no está garantizado.", 3),
        op("Lo de afuera se recuperó porque depende del mercado global; lo argentino depende además de Argentina, y ahí no hay rebote por ahora. No vendemos por un mes malo, pero no sumaría más: ya pesa mucho en tu perfil.", 25, "Distinguís los dos motores y fijás un criterio, no una predicción.", 7),
        op("Cada mercado tiene su ritmo y no conviene compararlos entre sí. Es muy pronto para sacar conclusiones, así que veamos cómo se comporta lo argentino en las próximas semanas antes de definir qué hacer.", 10, "Cierto, pero la dejás con la duda.", -2)],
      incoh: (k, m) => k === "2" && m.arg > 40 ? "Le dijiste que no sumabas más a lo argentino, pero la propuesta sigue muy argentina." : null,
      okKey: "Separaste el rebote global del problema argentino y no apostaste a que una caída se revierta sola.",
      resp: ["Ya entiendo: es otro mercado con otras reglas. Me quedo más tranquila.", "Bueno. Ojalá vuelvan.", "Entonces no sé si conviene tener esas acciones."]
    },
    m: {
      via: "WhatsApp · viernes 20:20",
      dice: () => "Argentina está regalada: YPF y Galicia se cayeron un montón. ¿Compramos? Cuando se acomode, se dispara.",
      nota: X => nota(T(), 4, X, "Barato no es lo mismo que va a rebotar.", `El riesgo país siguió subiendo (${sg(X.F.rp, 0)} pb): las acciones argentinas bajan aunque el mundo suba.`),
      msgs: () => [
        op("Sí, barato es barato: pasemos fuerte a acciones argentinas. Cuando el riesgo país se acomode es lo que más sube, y el que compra ahora se queda con todo el rebote.", 5, "Confundís precio bajo con rebote seguro, y apostás fuerte a un solo país.", 3),
        op("Puede haber valor, pero 'barato' no es 'va a rebotar': el riesgo país sigue subiendo. Si querés exponerte, que sea acotado, hasta 15 o 20% entre acciones argentinas.", 25, "Ponés un límite que permite la idea y protege la cartera.", 7),
        op("Es una trampa: las acciones argentinas parecen baratas, pero con el riesgo país subiendo pueden seguir cayendo por meses. No tocaría nada argentino ahora y esperaría una señal clara de que cambió la tendencia.", 10, "Descartás sin explicar; hay posiciones razonables.", -2)],
      incoh: (k, m) => k === "2" && m.argAcc > 25 ? `Le dijiste que hasta 15 o 20% en acciones argentinas, pero la propuesta tiene ${m.argAcc}% entre YPF y Galicia.` : null,
      okKey: "Dejaste entrar la idea con un tope, sin convertir 'barato' en una promesa.",
      resp: ["Está bien, de a poco. Me convence.", "Mmm, sigo pensando que es oportunidad.", "Qué decepción: siempre cauteloso."]
    },
    leccion: () => ({ h: "No toda caída rebota, y menos si tiene su propio motivo.", p: "El mundo se recuperó; Argentina no, porque su problema era otro. Cuando algo cae, la pregunta no es cuánto cayó sino por qué. Si el motivo sigue vigente, el rebote no está garantizado." }),
    cierreH: "Cierre de abril", cierreLead: "Un mes en que lo global y lo local se separaron."
  },

  /* ================= MAYO 2027 ================= */
  { fecha: "Mayo 2027", corto: "mayo", infMes: "abr.",
    base: { mkt: 0.8, oil: -1, rp: -10, tech: 1, fin: 0, eur: 0, em: 0, meli: 0.5, tn: 0 },
    altF: { mkt: -4, rp: 50, tech: -3, oil: -4 },
    need: { g: 12000 }, needTxt: "en agosto, para los estudios de su nieta",
    cf: { p: "En abril nadie sabía si mayo iba a ser tranquilo o iba a venir otra caída. Así le habría ido a cada cartera en los dos casos:", a: X => `S&P ${sg(X.F.mkt)}%`, b: () => "Vuelve la caída (S&P −4%)" },
    titular: X => ({ kick: "Mercados · Lunes 10 de mayo",
      h: "Un mes tranquilo: el mercado casi no se mueve y el riesgo país se queda en torno de " + X.L.rp + " puntos básicos",
      p: "Sin noticias fuertes, los precios apenas cambian. Es el mes en que muchos inversores aprovechan a revisar sus carteras con calma.",
      also: [["S&P 500", `${sg(X.F.mkt)}% en el mes.`], ["Petróleo", `USD ${X.L.oil}, ${sg(X.F.oil, 0)}%.`], ["Riesgo país", `${X.L.rp} pb, ${sg(X.F.rp, 0)}.`]],
      chain: ["Pocas noticias", "El mercado casi no cambia", "Buen momento para revisar el reparto", "No hacer nada también es una decisión"] }),
    g: {
      via: "Llamado · martes 11:00",
      dice: () => "Mi nieta entra a la universidad en el exterior y en agosto necesito 12 mil dólares. Hoy tengo mucho en acciones. ¿Vendo algo ahora o esperamos a agosto?",
      nota: X => nota(G(), 5, X, "Mes tranquilo, pero con un compromiso a la vista.", "Lo que se necesita en pocos meses no puede depender de cómo esté el mercado ese día. Es el mejor momento para separarlo.", true),
      msgs: () => [
        op("No te preocupes, en agosto vemos. Seguro la plata va a estar, el mercado suele estar bien en esa época del año y si hace falta vendemos algo ese mismo mes sin problema.", 5, "Dejás para después algo que ya sabés que va a pasar.", 3),
        op("Separemos ya los 12 mil en liquidez en dólares, así no dependés de cómo esté el mercado en agosto. Lo demás sigue como está y no hace falta venderlo ahora, ni cambiar nada de lo que tenés.", 25, "Conectás el plazo del gasto con el tipo de instrumento.", 7),
        op("Qué lindo para tu nieta, me alegra que puedas ayudarla con los estudios. Más adelante, cuando se acerque la fecha, vemos de dónde conviene sacar la plata y cómo hacerlo con tranquilidad.", 10, "Cálido, pero sin plan.", -2)],
      incoh: (k, m) => k === "2" && m.mm < m.need - 0.01 ? "Le dijiste que separabas los 12 mil, pero la propuesta no los separa." : null,
      okKey: "Separaste el gasto de agosto del resto: esa plata no depende de lo que haga el mercado.",
      resp: ["Qué alivio tenerlo separado. Gracias.", "Bueno, confío en que se resuelva.", "Mmm, me quedo con la duda de si va a alcanzar."]
    },
    m: {
      via: "WhatsApp · jueves 19:30",
      dice: () => "Mes aburrido. ¿Hacemos algo o la dejamos como está? Ya se me pasó la ansiedad de marzo.",
      nota: X => nota(T(), 5, X, "Un mes quieto es un buen momento para revisar.", `Con la cartera como la dejaste, tecnología pesa ${mt(T(), 5).secMax || 0}% y la mayor empresa, ${mt(T(), 5).max}%. Mirá si sigue como la pensaste o si el mercado la corrió.`),
      msgs: () => [
        op("Aprovechemos para pasar todo a lo que más subió este año: esas son las ganadoras y el mercado premia la tendencia. Con un mes tranquilo es el momento ideal para concentrarse.", 5, "Perseguís el rendimiento pasado.", 3),
        op("Un mes tranquilo es buen momento para revisar si la cartera sigue como la pensaste. Mirando pesos y sectores, ajustemos lo que se haya corrido y dejemos el resto como está, sin sumar nada nuevo.", 25, "Hablás de revisar con criterio, no de operar por operar.", 7),
        op("Mejor no hacer nada: el que opera mucho pierde, y cada movimiento tiene costos de comisiones e impuestos. Si la cartera funciona, lo más rentable suele ser dejarla quieta y esperar con paciencia.", 12, "Prudente, pero sin revisar si la cartera sigue bien armada.", -1)],
      okKey: "Aprovechaste la calma para revisar el reparto, sin operar por operar.",
      resp: ["Sí, tiene sentido. Mirémoslo con calma.", "Ok, aunque me dio ganas de moverme.", "Bueno... aburrido pero tranquilo."]
    },
    leccion: () => ({ h: "Un mes tranquilo también es un turno.", p: "Cuando no pasa nada, la tentación es operar por operar o ignorar la cartera. Lo útil es revisar si el reparto sigue siendo el que pensaste, y separar lo que se va a necesitar pronto." }),
    cierreH: "Cierre de mayo", cierreLead: "Un mes de calma, con un gasto anunciado."
  },

  /* ================= JUNIO 2027 ================= */
  { fecha: "Junio 2027", corto: "junio", infMes: "may.",
    base: { mkt: 1.5, oil: 0, rp: -30, tech: -2, fin: 0, eur: 4, em: 3, meli: 0, tn: 0 },
    altF: { eur: -2, em: -1.5, tech: 2, mkt: 0 },
    need: { g: 12000 }, needTxt: "en agosto, para los estudios de su nieta",
    cf: { p: "En mayo nadie sabía qué región iba a liderar. Así le habría ido a cada cartera en los dos casos:", a: X => `Europa ${sg(X.ret.eur)}%, emergentes ${sg(X.ret.eem)}%`, b: () => "EE.UU. sigue liderando" },
    titular: X => ({ kick: "Mercados · Martes 8 de junio",
      h: `Europa y los emergentes superan a Wall Street: suben ${A(X.ret.eur)}% y ${A(X.ret.eem)}%, contra ${A(X.F.mkt)}% del S&P 500`,
      p: "Los inversores empiezan a mirar mercados más baratos fuera de EE.UU. La tecnología estadounidense descansa tras una racha larga.",
      also: [["Brasil", `El ETF de Brasil ${sg(X.ret.bra)}%, contra ${sg(X.ret.eem)}% del bloque de emergentes.`], ["Riesgo país", `Baja ${A(X.F.rp, 0)} pb, a ${X.L.rp}.`], ["Nasdaq", `${sg(X.ret.nas)}% en el mes.`]],
      chain: ["Los inversores buscan mercados más baratos", "Europa y emergentes suben más que EE.UU.", "Quien tenía exposición afuera, lo siente a favor", "Los ciclos geográficos rotan sin avisar"] }),
    g: {
      via: "WhatsApp · lunes 17:10",
      dice: () => "Mi nieto dice que Europa subió mucho. ¿Debería tener algo de eso? ¿O me quedo con lo que tengo?",
      nota: X => nota(G(), 6, X, "Un mes en que lo de afuera ayudó.", "Quien tenía algo fuera de EE.UU. lo notó. Quien no, no se enteró.", true),
      msgs: () => [
        op("Sí, cambiemos buena parte de lo que tenés a Europa y emergentes: la rotación recién empieza y el que llega primero se queda con la mejor parte de la suba que todavía falta.", 5, "Pasás todo a lo que acaba de subir.", 3),
        op("Una parte pequeña en un ETF de Europa suma diversificación: no es para ganar más, sino para no depender de un solo país. Eso sí, no cambia tu tope de 40% en acciones, ni el resto del reparto.", 25, "Explicás el motivo de diversificar, sin prometer rendimiento.", 7),
        op("No hace falta cambiar nada: lo que tenés está bien y no conviene mover la cartera por lo que se comenta en la familia. Una cartera sólida no se rearma cada vez que cambia la moda del mercado.", 8, "Descartás sin escuchar.", -3)],
      incoh: (k, m) => k === "2" && m.acc > 40 ? "Le dijiste que no cambia el tope de 40%, pero la propuesta lo supera." : null,
      okKey: "Sumaste otra geografía para diversificar, no para perseguir una suba.",
      resp: ["Ah, claro, es para no depender de un solo lugar. Me gusta.", "Bueno, aunque no sé si es lo mío.", "No me siento escuchada."]
    },
    m: {
      via: "WhatsApp · miércoles 21:15",
      dice: () => "Europa y emergentes subieron mucho más que EE.UU. ¿Cambio todo lo de EE.UU. a Europa? Parece que ahí está la plata.",
      nota: X => nota(T(), 6, X, "El que tenía algo afuera lo sintió a favor.", `Si tu cartera estaba toda en EE.UU. (${mt(T(), 6).us}% hoy), este mes te quedaste afuera.`),
      msgs: () => [
        op("Sí, cambiemos todo a Europa y emergentes: la rotación recién empieza y el que llega primero gana. Después de lo que subieron, ahí está el dinero este año, y quedarse afuera es perder la ola.", 5, "Perseguís el último ganador.", 3),
        op("Justamente por esto conviene tener de todo: este mes ayudó lo de afuera de EE.UU. Si todavía no lo tenés, sumemos una porción; pasar todo a lo que subió sería perseguir al último ganador.", 25, "Convertís el mes en una lección de diversificación.", 7),
        op("Los ciclos geográficos son impredecibles, y nadie sabe qué región va a liderar el año que viene. Mejor no intentar anticiparlos: dejemos la cartera como está y sigamos con el plan que armamos.", 12, "Cierto, pero no ofrecés una acción concreta.", -2)],
      incoh: (k, m) => k === "2" && m.us > 80 ? "Le dijiste que sumaban una porción de afuera, pero la propuesta sigue casi toda en EE.UU." : null,
      okKey: "Sumaste otras geografías sin dejar que el mes pasado defina la cartera.",
      resp: ["Tiene lógica: no todo en un lugar. Hacelo.", "Me quedo con ganas de más Europa.", "Siempre llego tarde a lo que sube."]
    },
    leccion: () => ({ h: "La geografía rota sin avisar.", p: "Un año EE.UU. lidera; otro, Europa o los emergentes. No se puede saber cuál viene. Tener un poco de cada una no busca ganar más: busca no quedar atado a una sola economía." }),
    cierreH: "Cierre de junio", cierreLead: "Otra geografía lideró. Nadie lo había anunciado."
  },

  /* ================= JULIO 2027 ================= */
  { fecha: "Julio 2027", corto: "julio", infMes: "jun.",
    base: { mkt: 1.5, oil: 1, rp: 20, tech: 3, fin: 1, eur: 0, em: 0, meli: -16, tn: 0 },
    altF: { meli: 8 },
    need: { g: 12000 }, needTxt: "en agosto, para los estudios de su nieta",
    whyX: { meli: X => `Presentó resultados peores de lo esperado: ${sg(X.F.meli, 0)}% propio de la empresa, aunque el Nasdaq subió. Una sola empresa puede fallar aunque su sector suba.` },
    cf: { p: "En junio nadie sabía cómo iban a salir los resultados de MercadoLibre. Así le habría ido a cada cartera en los dos casos:", a: X => `MELI ${sg(X.ret.meli)}%`, b: () => "MELI sorprende para bien (+8% propio)" },
    titular: X => ({ kick: "Mercados · Jueves 15 de julio",
      h: `MercadoLibre cae ${A(X.ret.meli, 0)}% tras presentar resultados por debajo de lo esperado, mientras el Nasdaq sube ${A(X.ret.nas)}%`,
      p: "El margen del negocio financiero se achicó y las ventas crecieron menos de lo previsto. Fue una caída de la empresa, no del sector: el resto de la tecnología siguió subiendo.",
      also: [["Nasdaq", `${sg(X.ret.nas)}%: la tecnología, firme.`], ["JPMorgan", `${sg(X.ret.jpm)}% en el mes.`], ["Riesgo país", `${X.L.rp} pb, ${sg(X.F.rp, 0)}.`]],
      chain: ["Resultados peores de lo esperado en una empresa", "La acción cae aunque el sector suba", "Quien tenía mucho en esa empresa pierde más", "Por eso se limita el peso de cada empresa"] }),
    g: {
      via: "Mail · martes 9:30",
      dice: () => "Vi lo de MercadoLibre. ¿Eso me afecta? ¿Y eso es lo que le pasó a mi anterior asesor, que ponía todo en una o dos cosas?",
      nota: X => nota(G(), 7, X, "Una empresa, no un sector.", `MELI cayó ${A(X.ret.meli, 0)}% y la tecnología subió. Si tenías mucho en una sola empresa, eso pesa más que cualquier sector.`, true),
      msgs: () => [
        op("Es un mal trimestre y nada más. Mantené todo: una empresa buena siempre vuelve y comprar abajo es lo mejor que podés hacer. Si tenés liquidez, sumá un poco más en lo que cayó.", 5, "Prometés que 'siempre vuelve'. No todas las empresas lo hacen.", 3),
        op("Una sola empresa puede fallar aunque el sector suba, por eso conviene limitar cuánto pesa cada una: para vos, no más de 10%. Revisemos qué tenés en una sola empresa y ajustémoslo si hace falta.", 25, "Convertís el titular en una regla de tamaño.", 7),
        op("Eso es normal en bolsa: unas empresas suben y otras bajan, y no tiene sentido buscarle una explicación a cada movimiento. Con una visión de largo plazo, lo mejor es dejar que el tiempo haga su trabajo.", 8, "Descartás un tema que te sirve para ordenar la cartera.", -3)],
      incoh: (k, m) => k === "2" && m.max > 10 ? "Le dijiste que no más de 10% por empresa, pero la propuesta lo supera." : null,
      okKey: "Usaste el golpe a una empresa para fijar un tope por empresa.",
      resp: ["Claro: nunca todo en una. Me quedo más tranquila.", "Ah, bueno. ¿Y esto se arregla?", "No entiendo qué hago ahora."]
    },
    m: {
      via: "WhatsApp · viernes 8:45",
      dice: () => mt(T(), 7).max >= 20 ? "MELI se cayó un montón con los resultados, y yo tengo una parte enorme ahí. No entiendo: el Nasdaq subió. ¿Qué hago?"
        : "MELI cayó con los resultados, aunque el Nasdaq subió. Menos mal que no tengo tanto. ¿Compramos más a este precio?",
      nota: X => nota(T(), 7, X, "Una empresa contra el sector.", `El Nasdaq subió ${A(X.ret.nas)}% y MELI cayó ${A(X.ret.meli, 0)}%. Quien tenía mucho en MELI perdió aunque el sector estuviera bien.`),
      msgs: () => [
        op("Es un mal trimestre: comprá más a este precio. Una empresa buena siempre vuelve y es una oportunidad de bajar tu costo promedio en MELI mientras el resto del mercado sube.", 4, "Prometés una recuperación y subís el peso de una sola empresa.", 3),
        op("Una sola empresa puede fallar aunque su sector suba: por eso conviene limitar cada una a 10 o 15%. Revisemos si los resultados cambian tu tesis sobre MELI, no el precio, y dejemos su peso acotado.", 25, "Separás el precio de la tesis y fijás un tope.", 7),
        op("Es la volatilidad normal de cualquier acción individual y no hay que sacar conclusiones de un solo trimestre. Con tu horizonte, un mal resultado puntual no cambia la historia de la empresa.", 10, "Cierto, pero no revisás el peso.", -2)],
      incoh: (k, m) => k === "2" && m.max > 15 ? "Le dijiste que no más de 10 o 15% por empresa, pero la propuesta lo supera." : null,
      okKey: "Dejaste una sola empresa en un peso que la cartera puede absorber.",
      resp: ["Ok, tiene sentido. Me quedo con 10 o 15% máximo.", "Mmm, me quedo con la duda de si hay que comprar.", "No me convence, pero hacelo."]
    },
    leccion: () => ({ h: "Una empresa puede fallar aunque el sector vaya bien.", p: "MercadoLibre cayó fuerte mientras el Nasdaq subía. Es el riesgo de concentrar en un solo nombre. Por eso se fija un tope por empresa: no por desconfiar de una, sino porque cualquiera puede fallar." }),
    cierreH: "Cierre de julio", cierreLead: "El riesgo de una empresa sola, a la vista."
  }
  );
})();
