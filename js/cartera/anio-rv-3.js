/* ============================================================
   SIMULACIÓN DE RENTA VARIABLE · Parte 3 (agosto a noviembre)
   Elecciones solo como variable de mercado, sin opinión política.
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
  const ELEC_A = { mkt: 1, oil: 0, rp: -150, tech: 0, fin: 1, eur: 0, em: 0.5, meli: 2, tn: 0 };
  const ELEC_B = { mkt: -2, oil: 0, rp: 130, tech: -1, fin: -1, eur: -1, em: -1.5, meli: -2, tn: 0 };

  C.MESES.push(
  /* ================= AGOSTO 2027 ================= */
  { fecha: "Agosto 2027", corto: "agosto", infMes: "jul.",
    base: { mkt: -1.5, oil: -2, rp: 90, tech: -1, fin: -0.5, eur: -0.5, em: -1, meli: -1, tn: 0 },
    altF: { rp: -30, mkt: 1 },
    flujo: { g: -12000 }, motivo: "los estudios de su nieta",
    cf: { p: "En julio nadie sabía si la incertidumbre electoral iba a empeorar o a calmarse. Así le habría ido a cada cartera en los dos casos:", a: X => `riesgo país ${sg(X.F.rp, 0)} pb`, b: () => "La incertidumbre se calma" },
    titular: X => ({ kick: "Mercados · Martes 10 de agosto",
      h: `La incertidumbre electoral empuja el riesgo país a ${X.L.rp} puntos básicos y las acciones argentinas vuelven a caer`,
      p: "Las encuestas dan resultados parejos y el mercado descuenta más volatilidad. Afuera, el mercado cae poco: el golpe es local.",
      also: [["Galicia y YPF", `${sg(X.ret.ggal)}% y ${sg(X.ret.ypf)}% en el mes.`], ["S&P 500", `${sg(X.F.mkt)}%.`], ["Petróleo", `USD ${X.L.oil}.`]],
      chain: ["Encuestas parejas antes de las elecciones", "Sube el riesgo país", "Caen las acciones argentinas, más los bancos", "Lo de afuera, casi sin cambios"] }),
    g: {
      via: "Mail · lunes 10:15",
      dice: () => "Gracias por mandar los 12 mil, mi nieta está feliz. Y ahora lo argentino vuelve a caer por las elecciones. ¿Cómo quedó mi cartera?",
      nota: X => nota(G(), 8, X, "Se pagó el gasto y la cartera quedó más chica.", "Después del retiro, el reparto cambió. Conviene mirar cómo quedó, no solo lo que se movió este mes.", true),
      msgs: () => {
        const vendido = C.retiro(G(), 8).vendido >= 1;
        return [
          op("No te preocupes por lo argentino: después de las elecciones vuelve todo, siempre pasa. Es cuestión de paciencia y de no hacer nada que arruine la recuperación que viene.", 5, "Prometés algo que no sabés.", 3),
          op(vendido ? "Para pagar los 12 mil hubo que vender un poco de todo y eso cambió tu reparto. Veamos cómo quedó y volvamos a uno cómodo: poco argentino y dentro de tu tope."
            : "Los 12 mil salieron de la plata separada, sin vender acciones. Veamos cómo quedó el reparto después del retiro y mantengámoslo cómodo: poco argentino y dentro de tu tope.", 25, "Conectás el retiro con el reparto y mantenés los límites.", 7),
          op("El mercado argentino es muy volátil en épocas electorales y es difícil saber para dónde va. En general conviene esperar a que pase el evento antes de tomar cualquier decisión sobre tu cartera.", 10, "Cierto, pero ella pregunta por su cartera.", -2)];
      },
      incoh: (k, m) => k === "2" && (m.acc > 40 || m.arg > 35) ? "Le dijiste que mantendrías poco argentino y dentro del tope, pero la propuesta no lo cumple." : null,
      okKey: "Después del retiro, revisaste que la cartera siguiera dentro de sus límites.",
      resp: ["Qué bueno que se pudo pagar sin apuro. Gracias.", "Bueno. Espero que se calme.", "No sé si entendí cómo quedó."]
    },
    m: {
      via: "WhatsApp · miércoles 22:00",
      dice: () => "Las encuestas mueven todo. Quiero entrar a acciones argentinas antes de las elecciones. Si sale bien, se dispara.",
      nota: X => nota(T(), 8, X, "Un evento con dos resultados posibles.", "Lo que vaya a pasar con las elecciones no se sabe. Apostar antes del resultado es apostar a una moneda al aire."),
      msgs: () => [
        op("Las elecciones siempre dan oportunidades: apostemos fuerte a acciones argentinas antes del resultado, porque el que entra antes es el que más gana cuando el mercado se mueve.", 5, "Apostás fuerte a un evento binario.", 3),
        op("Las elecciones son un evento con dos resultados posibles y nadie sabe cuál. Si querés algo argentino, que sea una porción que soportes perder: mantengamos las acciones argentinas acotadas, hasta 20 o 25%.", 25, "Das un tope y tratás el evento como un riesgo, no como una oportunidad segura.", 7),
        op("No tengo una opinión sobre el resultado de las elecciones y no creo que sea mi lugar darla. Hagas lo que hagas es tu decisión, y te acompaño en lo que decidas con la información que tenemos.", 8, "Evitás el tema en lugar de ayudarlo a decidir el tamaño.", -3)],
      incoh: (k, m) => k === "2" && m.argAcc > 30 ? `Le dijiste que mantengan las acciones argentinas acotadas (hasta 20 o 25%), pero la propuesta tiene ${m.argAcc}% entre YPF y Galicia.` : null,
      okKey: "Trataste las elecciones como un riesgo con un tope, no como una apuesta segura.",
      resp: ["Ok, una parte y veremos. Gracias por el límite.", "Mmm... me quedo con ganas de más.", "Siempre me frenás cuando hay una oportunidad."]
    },
    leccion: () => ({ h: "Con un evento binario, lo que importa es el tamaño.", p: "Las elecciones pueden ir para cualquier lado y nadie sabe cuál. En lugar de adivinar, se fija cuánto se está dispuesto a perder si sale mal." }),
    cierreH: "Cierre de agosto", cierreLead: "Un retiro, una cuenta más chica y un mercado local nervioso."
  },

  /* ================= SEPTIEMBRE 2027 ================= */
  { fecha: "Septiembre 2027", corto: "septiembre", infMes: "ago.",
    base: { mkt: 3.5, oil: 3, rp: -80, tech: 4, fin: 2, eur: 2, em: 2.5, meli: 3, tn: -0.2 },
    altF: { mkt: -2, rp: 60, tech: -2, oil: -2 },
    cf: { p: "En agosto nadie sabía si septiembre iba a ser un rebote o una continuación de la caída. Así le habría ido a cada cartera en los dos casos:", a: X => `S&P ${sg(X.F.mkt)}%, riesgo país ${sg(X.F.rp, 0)} pb`, b: () => "La caída sigue (S&P −2%)" },
    titular: X => ({ kick: "Mercados · Lunes 6 de septiembre",
      h: `Rebote generalizado: el S&P 500 sube ${A(X.F.mkt)}%, el Nasdaq ${A(X.ret.nas)}% y el riesgo país baja ${A(X.F.rp, 0)} puntos básicos`,
      p: "Un dato de inflación mejor de lo esperado en EE.UU. y encuestas que dan señales más claras traen alivio. Sube casi todo, y lo argentino más que el resto.",
      also: [["Galicia y YPF", `${sg(X.ret.ggal)}% y ${sg(X.ret.ypf)}%.`], ["Europa y emergentes", `${sg(X.ret.eur)}% y ${sg(X.ret.eem)}%.`], ["Petróleo", `USD ${X.L.oil}.`]],
      chain: ["Mejor dato de inflación y alivio electoral", "Suben todas las acciones", "Lo argentino sube más: venía muy golpeado", "Un mes bueno no borra los riesgos"] }),
    g: {
      via: "Llamado · martes 11:20",
      dice: () => "¡Todo rebotó! ¿Vuelvo a lo que tenía antes, así recupero lo perdido?",
      nota: X => nota(G(), 9, X, "Un rebote que tienta.", "Después de varios meses malos, un mes bueno hace querer recuperar todo de golpe. Pero tu tope y tu necesidad de estabilidad no cambiaron.", true),
      msgs: () => [
        op("Sí, volvamos a lo de antes: así recuperás todo lo que se había perdido en estos meses y volvés a tener el reparto que tenías cuando el mercado estaba en máximos.", 5, "Volvés a una cartera que no era para ella.", 3),
        op("Que haya rebotado no cambia lo que te conviene: tu tope sigue siendo 40% en acciones y necesitás estabilidad. Si el rebote corrió algún peso, rebalanceamos y volvemos a tu reparto.", 25, "Rebalanceás en vez de perseguir.", 7),
        op("No toquemos nada: todo está bien como está. La cartera se recuperó sola, como esperábamos, y cualquier movimiento ahora solo agregaría costos y riesgos que no hacen falta en este momento.", 10, "Dejás que el mercado cambie el reparto sin revisar.", -2)],
      incoh: (k, m) => k === "2" && (m.acc > 40 || m.arg > 35) ? "Le dijiste que mantenían el tope, pero la propuesta lo supera." : null,
      okKey: "No volviste a la cartera heredada por el rebote: mantuviste su reparto.",
      resp: ["Claro, no se trata de recuperar sino de estar cómoda. Gracias.", "Bueno, aunque pensé que era buen momento.", "Me hubiera gustado más."]
    },
    m: {
      via: "WhatsApp · jueves 20:00",
      dice: () => "Todo sube. ¿Ahora sí vamos con todo? Ya aguantamos el susto.",
      nota: X => nota(T(), 9, X, "Un rebote fuerte después de un mal tramo.", "Es fácil sentir que 'ahora sí'. Pero el reparto correcto en un mes bueno es el mismo que en uno malo."),
      msgs: () => [
        op("Sí, vamos con todo: pasemos toda la liquidez a lo que más subió y no perdamos el tren. Con 25 años de horizonte es mejor estar adentro que esperar el momento perfecto.", 5, "Perseguís el rebote con la cartera concentrada.", 3),
        op("Tu horizonte justifica ser agresivo, pero el reparto correcto es el mismo después de un mes bueno que de uno malo: vamos a lo pensado, con tope por empresa.", 25, "Mantenés el criterio aunque el mes tiente.", 7),
        op("Ojo que después de un rebote fuerte suele venir una corrección. Mejor esperar a ver si se confirma la tendencia antes de poner más plata: así evitamos comprar justo en el techo del movimiento.", 10, "Predecís un movimiento que no sabés.", -2)],
      incoh: (k, m) => k === "2" && (m.max > 15 || m.secMax > 45) ? "Le dijiste que mantendrían topes, pero la propuesta los supera." : null,
      okKey: "No cambiaste el criterio por un buen mes.",
      resp: ["Ok, mantenemos el plan. Gracias.", "Me quedo con ganas de más.", "Qué aburrido el mercado cuando sube."]
    },
    leccion: () => ({ h: "El rebote no cambia lo que le conviene al cliente.", p: "Después de meses malos, un mes bueno tienta a recuperarlo todo. Pero la cartera correcta para cada perfil no cambia con el humor del mercado." }),
    cierreH: "Cierre de septiembre", cierreLead: "Todo rebotó. La pregunta es qué hacer con eso."
  },

  /* ================= OCTUBRE 2027 ================= */
  { fecha: "Octubre 2027", corto: "octubre", infMes: "sep.",
    base: v => v === "A" ? ELEC_A : ELEC_B,
    altF: v => v === "A" ? ELEC_B : ELEC_A,
    cf: { p: "Antes de las elecciones nadie sabía cómo iba a reaccionar el mercado. Así le habría ido a cada cartera en los dos casos:", a: X => X.v === "A" ? "El mercado lo lee como alivio" : "El mercado lo lee como preocupación", b: X => X.v === "A" ? "El mercado lo leía como preocupación" : "El mercado lo leía como alivio" },
    titular: X => X.v === "A"
      ? ({ kick: "Mercados · Lunes 25 de octubre", h: `Tras las elecciones, el mercado lee el resultado como alivio: el riesgo país baja ${A(X.F.rp, 0)} puntos básicos, a ${X.L.rp}`,
        p: "Las acciones argentinas suben fuerte, sobre todo los bancos. Afuera, el mercado estable. Los inversores interpretan el resultado como una señal de previsibilidad.",
        also: [["Galicia y YPF", `${sg(X.ret.ggal)}% y ${sg(X.ret.ypf)}%.`], ["ON YPF 2031", `${sg(X.ret.on)}%.`], ["S&P 500", `${sg(X.F.mkt)}%.`]],
        chain: ["Resultado electoral leído como previsibilidad", "Baja el riesgo país", "Suben las acciones argentinas, más los bancos", "Lo de afuera, casi sin cambios"] })
      : ({ kick: "Mercados · Lunes 25 de octubre", h: `Tras las elecciones, el mercado lee el resultado como incertidumbre: el riesgo país sube ${A(X.F.rp, 0)} puntos básicos, a ${X.L.rp}`,
        p: "Las acciones argentinas caen fuerte, sobre todo los bancos. Afuera, el mercado cae algo. Los inversores interpretan el resultado como una señal de incertidumbre.",
        also: [["Galicia y YPF", `${sg(X.ret.ggal)}% y ${sg(X.ret.ypf)}%.`], ["ON YPF 2031", `${sg(X.ret.on)}%.`], ["S&P 500", `${sg(X.F.mkt)}%.`]],
        chain: ["Resultado electoral leído como incertidumbre", "Sube el riesgo país", "Caen las acciones argentinas, más los bancos", "Lo de afuera, algo más débil"] }),
    g: {
      via: "Llamado · martes 9:50",
      dice: X => X.v === "A" ? "Las elecciones salieron y el mercado reaccionó bien. ¿Cómo me fue? ¿Debería tener más de lo argentino?" : "Las elecciones salieron y el mercado reaccionó mal. ¿Cómo me afecta? ¿Vendo lo argentino?",
      nota: X => nota(G(), 10, X, "Un evento que movió a Argentina.", "Lo que haya pasado con la cartera depende de cuánto tenías en acciones argentinas.", true),
      msgs: X => [
        op(X.v === "A" ? "Qué bien: ahora sí conviene tener más argentino, que después de esta suba va a seguir subiendo. Aprovechemos que el mercado cambió de humor antes de que se vuelva caro." : "Vendamos todo lo argentino ya mismo, que esto se pone peor. Después de esta caída conviene salir de todo lo que depende de Argentina y esperar a que se aclare el panorama.", 5, X.v === "A" ? "Perseguís la suba." : "Vendés por pánico después de la caída.", 3),
        op("Ninguna elección debería definir tu cartera. Tu reparto ya contempla que Argentina pueda subir o bajar: lo importante es no tener más de lo que soportás perder. Revisemos que siga así.", 25, "Convertís el evento en una revisión del reparto.", 7),
        op("Los eventos electorales generan mucha volatilidad y reaccionar rápido casi nunca sale bien. Hay que ser pacientes y dejar pasar el ruido antes de tomar cualquier decisión sobre lo argentino.", 10, "Cierto, pero no ayudás a decidir.", -2)],
      incoh: (k, m) => k === "2" && (m.acc > 40 || m.arg > 35) ? "Le dijiste que mantendrías su reparto en límites, pero la propuesta los supera." : null,
      okKey: "No dejaste que una elección definiera la cartera: revisaste que siguiera dentro de sus límites.",
      resp: ["Ya entiendo: no es para apostar a las elecciones. Gracias.", "Bueno, aunque me quedé con dudas.", "No sé qué hago."]
    },
    m: {
      via: "WhatsApp · martes 8:00",
      dice: X => X.v === "A" ? "Las acciones argentinas volaron con las elecciones. ¿Pongo más? Esto recién empieza." : "Las acciones argentinas se hundieron con el resultado. ¿Vendo todo o compro más? No sé qué hacer.",
      nota: X => nota(T(), 10, X, "Lo que hizo el mercado depende de lo que tenías.", "Con un evento binario, el resultado no dice si la decisión era buena: dice cuánta suerte hubo."),
      msgs: X => [
        op(X.v === "A" ? "Sí, pongamos mucho más: el mercado ya mostró para dónde va, y no tiene sentido quedarse afuera ahora que la tendencia está definida y el riesgo país bajó." : "Compremos fuerte: lo que más cayó es lo que más rebota, y esta es la oportunidad de entrar barato antes de que el resto del mercado se dé cuenta.", 4, X.v === "A" ? "Subís el peso después de la suba." : "Prometés un rebote.", 3),
        op("El resultado de una elección no dice si tu decisión era buena: dice cuánta suerte hubo. Mantengamos las acciones argentinas dentro del tope que fijamos, gane o pierda este mes.", 25, "Separás el resultado de la calidad de la decisión.", 7),
        op("Es una buena oportunidad o una mala, depende de cómo lo mires: hay argumentos para los dos lados. No te puedo decir qué conviene, es una decisión que depende de cuánto riesgo quieras tomar.", 8, "Evitás dar un criterio.", -3)],
      incoh: (k, m) => k === "2" && m.argAcc > 30 ? `Le dijiste que mantendrían las acciones argentinas dentro del tope, pero la propuesta tiene ${m.argAcc}% entre YPF y Galicia.` : null,
      okKey: "Separaste el resultado de la elección de la calidad de la decisión.",
      resp: ["Tiene sentido: mantengo el tope. Gracias.", "Mmm, me quedo con ganas.", "No me convence, pero ok."]
    },
    leccion: X => ({ h: "El resultado no es lo mismo que la decisión.", p: "Una elección puede mover a Argentina para cualquier lado. Si la cartera tenía un tope, la decisión era buena sin importar el resultado. Eso es lo que se mide como criterio." }),
    cierreH: "Cierre de octubre", cierreLead: "Un evento con dos finales posibles. Tu criterio fue el mismo en los dos."
  },

  /* ================= NOVIEMBRE 2027 ================= */
  { fecha: "Noviembre 2027", corto: "noviembre", infMes: "oct.",
    base: { mkt: 1, oil: 0, rp: -10, tech: 1, fin: 0.5, eur: 0.5, em: 0.5, meli: 1, tn: 0 },
    altF: { mkt: -2, rp: 20 },
    cf: { p: "En octubre nadie sabía cómo iba a cerrar el año. Así le habría ido a cada cartera en los dos casos:", a: X => `S&P ${sg(X.F.mkt)}%`, b: () => "El año cierra con una baja (S&P −2%)" },
    titular: X => ({ kick: "Mercados · Lunes 8 de noviembre",
      h: "Cierra un año de rotaciones: ganó quien repartió, no quien apostó a una sola cosa",
      p: "Tecnología, energía, Europa y Argentina lideraron en momentos distintos. Pocos acertaron cuál venía; los que tenían de todo un poco atravesaron el año con menos sobresaltos.",
      also: [["S&P 500 en el mes", `${sg(X.F.mkt)}%.`], ["Riesgo país", `${X.L.rp} pb.`], ["Petróleo", `USD ${X.L.oil}.`]],
      chain: ["Cada trimestre lideró algo distinto", "Nadie acertó siempre cuál venía", "Quien tenía de todo un poco, sufrió menos", "Lo que importa: que la cartera cumpla su función"] }),
    g: {
      via: "Videollamada · viernes 11:00",
      dice: () => "Cerró el año. Mi amigo ganó más que yo en Nasdaq. ¿Mi año fue bueno?",
      nota: X => `<div class="callout"><b>El balance del año.</b><br>Su cartera rindió ${sg(C.acum(G(), 11))}% en dólares, con una caída máxima de ${sg(C.caidaMax(G(), 11))}%. La referencia simple (40% S&P 500, 60% liquidez) rindió ${sg(C.acumRef(G(), 11))}%, con una caída de ${sg(C.caidaMaxRef(G(), 11))}%.</div>`,
      msgs: X => [
        op("El año que viene arriesgamos más para que le ganes a tu amigo. Con todo lo que aprendimos se puede, y un poco más de acciones le daría a tu cartera el impulso que le faltó este año.", 4, "Le prometés más retorno con más riesgo, justo a la persona que quería dormir tranquila.", 3),
        op(`Tu cartera rindió ${sg(C.acum(G(), 11))}% en dólares y su peor caída fue ${sg(C.caidaMax(G(), 11))}%. La referencia simple rindió ${sg(C.acumRef(G(), 11))}%, con una caída de ${sg(C.caidaMaxRef(G(), 11))}%. Tu objetivo es cuidar lo que juntaste, no ganarle a un índice.`, 25, "Das el número con la caída y lo comparás con lo que corresponde a su perfil.", 7),
        op(`Rindió ${sg(C.acum(G(), 11))}% en dólares, que es un número razonable para el año. El detalle de las posiciones y los movimientos lo tenés en el resumen que te manda el broker, donde se ve cada operación.`, 10, "Un número sin contexto: no sabe si es bueno ni para qué sirve.", -2)],
      incoh: (k, m) => k === "1" && m.acc <= 40 ? "Le dijiste que iban a arriesgar más, pero la propuesta no lo hace." : null,
      okKey: "Cerraste el año explicando para qué sirve su cartera, no solo cuánto rindió.",
      resp: ["Gracias, querida. Fue un año con sustos, pero dormí bien. Seguimos.", "Ah, bueno. ¿Y eso es mucho o poco?", "Bueno, sí, quiero ganar un poco más."]
    },
    m: {
      via: "Videollamada · viernes 19:00",
      dice: () => "Cierre de año. ¿Le gané al S&P? Porque si no le gano, compro SPY y me ahorro el trabajo.",
      nota: X => `<div class="callout"><b>El balance del año.</b><br>Su cartera rindió ${sg(C.acum(T(), 11))}% en dólares, con una caída máxima de ${sg(C.caidaMax(T(), 11))}%. El S&P 500 rindió ${sg(C.acumRef(T(), 11))}%, con una caída de ${sg(C.caidaMaxRef(T(), 11))}%. La heredada, sin tocar: ${sg(C.acumHer(T(), 11))}%.</div>`,
      msgs: X => [
        op("Tu amigo tuvo un buen año, pero el que viene le ganamos seguro: pasamos todo a lo que mejor anda y listo. Con lo aprendido y tu horizonte, es cuestión de animarse a concentrar un poco más.", 4, "Prometés ganar el año que viene sin saber nada.", 3),
        op(`Tu cartera rindió ${sg(C.acum(T(), 11))}% en dólares, con una caída máxima de ${sg(C.caidaMax(T(), 11))}%. El S&P rindió ${sg(C.acumRef(T(), 11))}%, con una caída de ${sg(C.caidaMaxRef(T(), 11))}%. La pregunta es si valió el riesgo extra: miremos qué sumó y qué restó cada decisión.`, 25, "Comparás retorno y caída contra la referencia y abrís la discusión.", 7),
        op("Compararse con el S&P no sirve: son cosas distintas y cada cartera es un mundo. Tu amigo tiene su estilo y vos el tuyo, y lo que importa es que te sientas cómodo con lo que armaste este año.", 8, "Descartás una pregunta razonable sin explicar.", -3)],
      incoh: (k, m) => k === "1" && m.max > 20 ? "Le dijiste que iban a ganarle al mercado pero la propuesta tiene una apuesta concentrada." : null,
      okKey: "Cerraste el año con los números sobre la mesa: retorno y caída contra la referencia.",
      resp: ["Bien. Me gusta que lo plantees así. Lo pienso para el año que viene.", "Mmm. No me contestaste.", "¡Así me gusta!"]
    },
    leccion: () => ({ h: "Un año se juzga por si la cartera cumplió su función, no por un solo número.", p: "Al cierre todos comparan con lo que mejor salió. La cartera de Elena no estaba para ganarle al Nasdaq: estaba para cuidar y pagar un gasto. La de Tomás, para crecer aguantando caídas. Ahora viene el repaso de tus doce decisiones." }),
    cierreH: "Cierre del año", cierreLead: "Doce meses, veinticuatro decisiones. Lo último: explicarle el año a cada cliente."
  }
  );
})();
