/* ============================================================
   LA CARTERA · Año 1 (diciembre 2026 a noviembre 2027)
   Esqueleto escrito a mano: qué pasa cada mes y qué dice cada cliente.
   Los números exactos salen del motor (cambian un poco en cada partida).
   Elecciones: solo como variable de mercado, sin opinión política.
   Datos de empresas ficticios.
   ============================================================ */
(function () {
  "use strict";
  const C = window.CARTERA, { fmt, sg, A, usd, pct } = C.u;
  const G = () => C.CLI.g, Mt = () => C.CLI.m;
  const hG = i => C.held(G(), i), hM = i => C.held(Mt(), i);
  const Rm = (w, X) => C.R(w, X.ret);
  const sube = x => x >= 0 ? "subió" : "bajó";

  C.CLI = {
    g: { id: "g", regla: "conservador", nombre: "Graciela Ríos", corto: "Graciela", ini: "GR", color: "#7A8B5C", edad: 63, det: "Jubilada hace un año. Ex docente.",
      perfil: "Conservadora", monto: 80000, conf: 70, tags: ["Horizonte: 2 años", "Quiere cuidar sus dólares"], facts: [],
      cita: "Quiero dormir tranquila. Lo que junté en 30 años de trabajo no lo puedo perder. En marzo voy a necesitar 15 mil para arreglar el techo.",
      cart: { gd35: 50, on: 20, mm: 20, gd30: 10 } },
    m: { id: "m", regla: "agresivo", nombre: "Martín Sosa", corto: "Martín", ini: "MS", color: "#A8453A", edad: 38, det: "Ingeniero en una empresa de software.",
      perfil: "Agresivo", monto: 40000, conf: 70, tags: ["Horizonte: 5 años o más", "No va a retirar"], facts: [["Se informa", "Twitter financiero"]],
      cita: "No me asusta que la cartera se mueva. Quiero que la plata trabaje, no que esté quieta. Y si veo una oportunidad, te la voy a traer.",
      cart: { spy: 40, gd35: 35, lecap: 25 } }
  };

  C.MESES = [
  /* ================= DICIEMBRE 2026 ================= */
  { fecha: "Diciembre 2026", corto: "diciembre", infMes: "nov.",
    base: { rp: 103, tasa: 1, inf: 2.4, infEsp: 2.1, mep: 3, spx: 1.5, nvda: 4 }, altF: {},
    need: { g: 15000 }, needTxt: "en marzo, para el techo",
    whyX: { nvda: X => `Subió ${A(X.F.nvda, 0)}% con un balance récord.` },
    titular: X => ({ kick: "Mercados · Lunes 7 de diciembre",
      h: `El riesgo país saltó a ${X.L.rp} puntos básicos: el mercado duda de cómo se financian los vencimientos de 2027`,
      p: "Los bonos en dólares tuvieron su peor semana desde julio. En el mercado atribuyen la suba a la falta de acuerdo sobre el presupuesto y a la cercanía del año electoral.",
      also: [[`Inflación de noviembre: ${fmt(X.F.inf)}%`, `El mercado esperaba ${fmt(X.F.infEsp)}%. Las tasas en pesos subieron 1 p.p.`], [`Dólar MEP: ${sg(X.F.mep)}%`, "Algo de cobertura ante la incertidumbre."], ["Wall Street, firme", `El S&P 500 subió ${A(X.F.spx)}%; Nvidia, ${A(X.F.nvda, 0)}%, con un balance récord.`]],
      chain: [`Sube el riesgo país ${sg(X.F.rp, 0)} pb`, `Sube ${fmt(X.F.rp / 100, 2)} p.p. la TIR que se le pide a la Argentina`, "Caen los bonos en dólares, más cuanto más duration", "Lo de afuera (CEDEARs) no se entera"] }),
    g: {
      via: "Llamado · martes 9:40",
      dice: () => "Hola, querida. Vi en el noticiero que el riesgo país se disparó y me agarró un susto bárbaro. ¿No será mejor vender todo y pasarlo a algo seguro? Acordate de que en marzo necesito los 15 mil para el techo.",
      nota: X => `<div class="callout"><b>Fijate de dónde vino la pérdida.</b><br>Casi todo el ${sg(Rm(G().cart, X))}% sale de una sola línea: el GD35, que es la mitad de la cartera. Antes de pensar qué contestarle, preguntate si esa cartera era la adecuada para una jubilada conservadora que necesita plata en marzo.</div>`,
      msgs: X => [
        { t: "\"Quedate tranquila, no pasa nada. Estas subas del riesgo país son ruido de corto plazo: en un par de meses los bonos vuelven a donde estaban y ni te vas a acordar. No hace falta tocar nada ni preocuparse por lo de marzo.\"", sc: 6, d: "Prometés algo que no sabés. Si en enero vuelve a caer, perdés credibilidad.", conf: 3 },
        { t: "\"La caída es real y viene del riesgo argentino. Tu cartera tenía más riesgo del que te corresponde: te propongo ajustarla y separar ya lo de marzo. Puede haber más movimientos, pero esa plata no va a depender de eso.\"", sc: 25, d: "Explicás la causa en criollo, reconocés el problema y anticipás que puede volver a moverse.", conf: 7 },
        { t: `"El GD35 tiene duration 6 y la TIR subió ${fmt(X.F.rp / 100, 2)} p.p.; es una corrección de precio esperable por sensibilidad a tasa. El interés que paga sigue intacto y la curva soberana mantiene su pendiente, así que el posicionamiento es correcto."`, sc: 12, d: "Técnicamente impecable, pero a Graciela no le dice nada.", conf: -3 }],
      incoh: (k, m, w, r) => k === "2" && (!r.needOk || pct(w, "gd35") >= 45) ? "Le dijiste que ajustabas la cartera y separabas lo de marzo, pero la propuesta no lo hace. Lo que decís y lo que proponés tienen que coincidir." : null,
      key(m, w, r) {
        if (r.perfil[0] < 20 && m.sens > 2.5) return "El titular dejó a la vista que la cartera heredada no era para ella, y sigue sin serlo. Si el riesgo país sube otros 100 puntos básicos antes de marzo, va a tener que vender más abajo.";
        if (!r.needOk) return "Bajaste el riesgo, pero lo de marzo todavía depende del mercado. Lo que se necesita en pocos meses no puede estar en algo que cambia de precio.";
        if (m.sens < 0.8 && m.acc === 0) return "Resolviste el susto, aunque vendiendo de más: con la cartera muy defensiva, una pérdida que se recuperaba con intereses queda fija. El problema no era el titular, era el GD35.";
        if (r.perfil[0] < 20 || r.div[0] < 20 || r.liq[0] < 20) return null;
        return "Corregiste la cartera, no el titular: ese era el problema de fondo. Y apartar lo de marzo hace que esa plata no dependa de lo que pase con el riesgo país.";
      },
      conf(m, w, r) { let x = 0; if (pct(w, "gd35") <= 25) x += 3; if (pct(w, "gd35") >= 45) x -= 3; if (r.needOk) x += 2; if (m.acc > 40) x -= 3; return x; },
      resp(m, w, k) {
        if (m.sens > 2.5) return "Bueno... si vos decís. Pero sigo nerviosa, la verdad.";
        if (m.sens < 0.8) return "Ay, qué alivio. Sí, hacelo así, prefiero dormir tranquila.";
        return k === "3" ? "Mirá, no entendí mucho lo de la duration, pero confío en vos. Dale." : "Bueno, ahora entiendo qué pasaba. Me quedo más tranquila sabiendo que lo de marzo está aparte. Confirmo.";
      }
    },
    m: {
      via: "WhatsApp · jueves 22:14",
      dice: () => "Che, ¿viste NVDA? No para de subir. Quiero pasar TODO ahí, el resto de la cartera no hace nada. Mandame la orden mañana y la confirmo.",
      nota: X => `<div class="callout teal"><b>El mismo GD35 cayó lo mismo que en la cartera de Graciela.</b><br>Pero para Martín, con 5 años de horizonte, que el precio baje y la TIR suba de ≈ ${fmt(X.L.tir35prev)}% a ≈ ${fmt(X.L.tir35)}% significa que lo que va a rendir de acá en adelante es mejor. Rendimiento pasado y rendimiento esperado se movieron en direcciones opuestas.</div>`,
      msgs: () => [
        { t: "\"NVDA ya subió demasiado y está cara por donde la mires. No conviene entrar ahora: esperemos a que corrija fuerte, que seguro pasa pronto, y ahí vemos de comprar algo.\"", sc: 8, d: "Es una opinión sobre el momento que nadie puede saber. Si sigue subiendo, quedás mal parada.", conf: -4 },
        { t: "\"Podemos sumar una parte. Si ponés 10% y NVDA cae 30%, tu cartera pierde 3%; si ponés todo, perdés 30%. Te propongo una porción y lo revisamos en tres meses.\"", sc: 25, d: "Traducís la concentración en números que él entiende y dejás una fecha de revisión.", conf: 5 },
        { t: "\"Dale, es tu plata y vos seguís el tema de cerca. Si estás convencido, armo la orden para pasar todo a NVDA mañana a primera hora y me la confirmás. Vos sabés lo que hacés.\"", sc: 3, d: "Renunciás a tu rol. Si sale mal, la relación sufre igual.", conf: 2 }],
      incoh(k, m, w) { const nv = pct(w, "nvda"); if (k !== "2" || (nv > 0 && nv <= 25)) return null;
        return nv === 0 ? "Le dijiste que sumaban una parte, pero NVDA no está en la propuesta." : `Hablaste de una porción, pero propusiste ${nv}%. Lo que decís y lo que proponés tienen que coincidir.`; },
      key(m, w, r, X) { const nv = pct(w, "nvda");
        if (nv > 25) return "Proponer exactamente lo que el cliente pide no es asesorar. Un perfil agresivo tolera volatilidad, no tener todo en una sola empresa: NVDA ya cayó más de 40% en 2022.";
        if (nv === 0) return "La cartera queda prolija, pero Martín siente que no lo escuchaste. Un cliente así, si le decís que no a todo, termina operando solo o con otro asesor.";
        if (pct(w, "gd35") < 20) return `Le diste lugar a NVDA con un tamaño razonable. Ojo con el GD35: lo vendiste justo cuando rinde más que antes (≈ ${fmt(X.L.tir35)}%). Para 5 años de horizonte, la caída no era una razón para salir.`;
        return `Encauzaste la idea en vez de bloquearla: una porción que se nota si sale bien y no lo destruye si sale mal. Y el GD35 cayó, pero ahora rinde ≈ ${fmt(X.L.tir35)}%: para su horizonte, mantenerlo tiene sentido.`; },
      conf(m, w) { const nv = pct(w, "nvda"); return nv === 0 ? -8 : nv <= 25 ? 4 : 6; },
      resp(m, w) { const nv = pct(w, "nvda");
        if (nv === 0) return "Mmm. Siempre tan conservadora vos. Lo voy a pensar.";
        if (nv > 25) return "¡Genial! Mañana confirmo. A la luna 🚀";
        return `${nv}% me parece poco, pero tiene sentido lo de la caída. Va, confirmo y lo hablamos en marzo.`; }
    },
    leccion: () => ({ h: "El GD35 cayó lo mismo para los dos. Para Graciela era una señal de que la cartera estaba mal armada; para Martín, una oportunidad.",
      p: "La pregunta nunca es \"¿el mercado va a subir o bajar?\", sino \"¿esta cartera le sirve a este cliente si el mercado se mueve en contra?\". Una jubilada que necesita plata en 4 meses no puede tener la mitad en duration 6. Un agresivo con 5 años de horizonte sí, y una suba de la TIR lo favorece." }),
    cierreH: "Mismo titular, dos respuestas distintas",
    cierreLead: "El resultado de este mes no fue tuyo: las carteras venían heredadas. Lo que sí fue tuyo es el criterio de lo que hiciste después."
  },

  /* ================= ENERO 2027 ================= */
  { fecha: "Enero 2027", corto: "enero", infMes: "dic.",
    base: { rp: -140, tasa: -1.5, inf: 2.2, infEsp: 2.3, mep: 1, spx: -2, nvda: -12 },
    altF: { rp: 140, tasa: 1, mep: 4.5 },
    cf: { p: "En diciembre nadie sabía para dónde iba el riesgo país. Así le habría ido a cada cartera en los dos casos:", a: X => `Bajó ${A(X.F.rp, 0)} pb`, b: () => "Subía 140 pb" },
    need: { g: 15000 }, needTxt: "en marzo, para el techo",
    whyX: { nvda: X => `Cayó ${A(X.F.nvda, 0)}% por dudas sobre cuánto van a seguir gastando las empresas en inteligencia artificial. Es el riesgo de una sola empresa: el SPY, que también la incluye, cayó solo ${A(X.F.spx)}%.` },
    titular: X => ({ kick: "Mercados · Martes 12 de enero",
      h: `Se aprobó el presupuesto y el riesgo país bajó a ${X.L.rp} puntos básicos: los bonos en dólares tuvieron su mejor mes desde junio`,
      p: "El acuerdo en el Congreso despejó la duda sobre el financiamiento de 2027. Afuera, en cambio, las tecnológicas tuvieron un mal comienzo de año.",
      also: [[`Inflación de diciembre: ${fmt(X.F.inf)}%`, "Algo por debajo de lo esperado. Las tasas en pesos bajaron 1,5 p.p."], [`Dólar MEP: ${sg(X.F.mep)}%`, "Tranquilo, en línea con la inflación."], ["Golpe a la inteligencia artificial", `Nvidia cayó ${A(X.F.nvda, 0)}% por dudas sobre el gasto en IA; el S&P 500, ${A(X.F.spx)}%.`]],
      chain: [`Baja el riesgo país ${sg(X.F.rp, 0)} pb`, `Baja ${fmt(-X.F.rp / 100, 2)} p.p. la TIR`, "Suben los bonos en dólares, más cuanto más duration", "A los CEDEARs les pega lo de afuera, no lo argentino"] }),
    g: {
      via: "Llamado · lunes 9:15",
      rama: () => pct(hG(1), "gd35") < 45 ? "redujo" : "mantuvo",
      dice() { return this.rama() === "redujo"
        ? "Hola, querida. Vi que los bonos subieron un montón este mes, y nosotros justo vendimos el GD35. ¿Hicimos mal? Me quedé pensando..."
        : "¡Viste que volvió! Menos mal que no vendimos. ¿Dejamos todo así entonces? Lo del techo sigue siendo en marzo, eh."; },
      nota(X) { return this.rama() === "redujo"
        ? `<div class="callout"><b>El GD35 que vendiste subió ${A(X.ret.gd35)}% este mes.</b><br>¿Fue un error venderlo? Antes de contestarle, mirá el cuadro de abajo: qué pasó, y qué podía haber pasado.</div>`
        : `<div class="callout"><b>La cartera se recuperó.</b><br>Salió bien. La pregunta es si salió bien porque estaba bien armada o por suerte. Mirá el cuadro de abajo antes de contestarle.</div>`; },
      msgs(X) { const peor = A(C.R(G().cart, X.alt)); return this.rama() === "redujo" ? [
        { t: "\"Sí, nos apuramos: vendimos justo antes de la suba. Volvamos a comprar GD35 ahora para no perdernos la próxima, que con el presupuesto aprobado el riesgo país va a seguir bajando y todavía hay recorrido.\"", sc: 4, d: "Juzgás la decisión de diciembre por el resultado de un mes. La cartera heredada no era para ella, haya subido el bono o no.", conf: -2 },
        { t: `"No sabíamos si iba a subir o bajar; nadie lo sabía. Armamos tu cartera para que aguante los dos casos: si el riesgo país hubiera subido, con la de antes hoy estarías perdiendo ${peor}% y lo de marzo correría peligro. Y lo que te quedó en bonos también subió."`, sc: 25, d: "Le explicás que una decisión se juzga por lo que podía pasar, no solo por lo que pasó, con números concretos.", conf: 5 },
        { t: "\"El mercado es impredecible y estas cosas no se pueden saber de antemano. A veces se gana y a veces se pierde, es así. Lo importante es no hacerse mala sangre: lo que se dejó de ganar hoy se recupera en otro momento.\"", sc: 12, d: "Es cierto, pero no le explica por qué la decisión estuvo bien.", conf: 0 }] : [
        { t: "\"¿Viste? Por eso siempre hay que aguantar: el mercado argentino asusta, pero al final vuelve. La próxima vez que caiga hacemos lo mismo y listo, sin tocar nada de la cartera.\"", sc: 4, d: "Sacás una regla equivocada de un resultado que fue suerte. La próxima vez puede no volver antes de marzo.", conf: 3 },
        { t: "\"Salió bien, pero fue suerte: si el riesgo país hubiera seguido subiendo, hoy faltaría plata para marzo. Aprovechemos que se recuperó para separar lo del techo y bajar el riesgo.\"", sc: 25, d: "Reconocés que el resultado fue bueno sin confundirlo con una buena decisión, y aprovechás para corregir.", conf: 4 },
        { t: "\"Me alegro de que haya vuelto. Dejemos todo como está, que viene funcionando, y en marzo, cuando necesites la plata del techo, vemos qué conviene vender según cómo esté el mercado.\"", sc: 8, d: "Postergás el problema: marzo es en dos meses.", conf: 1 }]; },
      incoh(k, m, w, r) {
        if (this.rama() === "mantuvo" && k === "2" && (!r.needOk || pct(w, "gd35") >= 45)) return "Le dijiste que separabas lo del techo y bajabas el riesgo, pero la propuesta no lo hace.";
        if (this.rama() === "redujo" && k === "1" && pct(w, "gd35") <= pct(hG(1), "gd35")) return "Le dijiste que volvían a comprar GD35, pero la propuesta no lo hace.";
        return null; },
      key(m, w, r) { const red = this.rama() === "redujo";
        if (r.perfil[0] < 20 && m.sens > 2.5) return red ? "Volviste a una cartera que no era para ella porque el bono subió. Un buen mes no cambia que una jubilada que necesita plata en marzo no puede tener tanta duration."
          : "Que el GD35 se haya recuperado fue suerte, no una razón para seguir igual. Marzo está a dos meses y la plata del techo sigue dependiendo del riesgo país.";
        if (!r.needOk) return "Lo de marzo está a dos meses y todavía depende del mercado.";
        if (r.perfil[0] < 20 || r.div[0] < 20 || r.liq[0] < 20) return null;
        return red ? "Mantuviste el rumbo aunque el resultado de corto plazo jugó en contra. Es lo más difícil del oficio: no cambiar una buena decisión por un mal resultado."
          : "Aprovechaste la recuperación para hacer lo que faltaba: bajar el riesgo y separar lo de marzo, esta vez sin vender en la baja."; },
      conf(m, w, r) { let x = 0; if (r.needOk) x += 2; if (m.acc > 40) x -= 3; return x; },
      shock: () => [2, "El mes fue bueno para su cartera."],
      resp(m, w, k, r) { const red = this.rama() === "redujo";
        if (red) return k === "2" ? "Ah, claro, visto así tiene sentido. Mientras lo del techo esté seguro, yo estoy tranquila." : k === "1" ? "Bueno, dale... aunque me da miedo que vuelva a bajar." : "Bueno... no me quedó muy claro, pero confío en vos.";
        if (k === "2" && (!r.needOk || pct(w, "gd35") >= 45)) return "Bueno... ¿pero entonces qué cambiamos? Me dijiste que íbamos a separar lo del techo.";
        return k === "2" ? "Tenés razón, no quiero llegar a marzo con el corazón en la boca. Hagámoslo." : k === "1" ? "¡Eso! Yo sabía que había que aguantar." : "Bueno, en marzo hablamos entonces."; }
    },
    m: {
      via: "WhatsApp · miércoles 8:02",
      nv: () => pct(hM(1), "nvda"),
      rama() { const n = this.nv(); return n === 0 ? "sin" : n <= 25 ? "parte" : "mucho"; },
      avisado: () => C.dec(0, Mt()).msg === "2",
      dice(X) { const n = this.nv(), r = this.rama(), cae = A(X.F.nvda, 0);
        if (r === "sin") return `NVDA cayó ${cae}% esta semana. Ahora sí está barata, ¿no? Metamos todo, esta es la oportunidad.`;
        if (r === "parte") return `Uff, NVDA cayó ${cae}%. ¿La vendo antes de que siga bajando?`;
        return `Perdí ${usd(C.montoAntes(Mt(), 1) * n / 100 * Math.abs(X.F.nvda) / 100)} con NVDA en una semana. ¿Esto no me lo podías haber avisado? ¿Vendo todo?`; },
      nota(X) { const n = this.nv();
        if (!n) return `<div class="callout teal"><b>No tiene NVDA, pero la caída lo tienta igual.</b><br>Que un papel haya bajado no lo hace "barato": el riesgo de concentrarse es el mismo que en diciembre.</div>`;
        return `<div class="callout"><b>NVDA cayó ${A(X.F.nvda, 0)}% y le costó a la cartera ${fmt(n * Math.abs(X.F.nvda) / 100)}%.</b><br>${this.avisado() ? "En diciembre le habías anticipado que podía pasar, con números. Eso amortigua el golpe en su confianza." : "En diciembre no le habías anticipado esta posibilidad con números. Por eso el golpe en su confianza es más fuerte."}</div>`; },
      msgs(X) { const n = this.nv(), r = this.rama(), cae = A(X.F.nvda, 0);
        if (r === "sin") return [
          { t: "\"Ahora sí: cayó fuerte en una semana y está barata. Es la oportunidad que estabas esperando, metamos todo antes de que rebote y se nos escape otra vez. Te armo la orden.\"", sc: 4, d: "Que haya bajado no cambia el riesgo de tener todo en una sola empresa.", conf: 4 },
          { t: "\"Que haya caído no la hace ni barata ni cara: el riesgo de tener todo en una sola empresa es el mismo. Si querés, entramos con una parte, 10%, y lo revisamos en tres meses.\"", sc: 25, d: "Separás el precio del riesgo y le das un lugar acotado a la idea.", conf: 3 },
          { t: "\"Te dije que no convenía, ¿viste? Menos mal que no entramos en diciembre. Esto confirma que es una acción demasiado volátil: mejor olvidate de NVDA y sigamos con lo que tenemos.\"", sc: 6, d: "Te quedás con el crédito de un resultado que no podías anticipar.", conf: -3 }];
        if (r === "parte") return [
          { t: "\"Vendamos ya, antes de que caiga más. Cuando una acción empieza a bajar así, lo mejor es salir rápido y cortar la pérdida; después, si se recupera, vemos de volver a entrar más adelante.\"", sc: 6, d: "Vender por la caída de un mes una posición pensada para 5 años, sin que haya cambiado nada de fondo.", conf: 1 },
          { t: `"Es justo lo que hablamos: la posición es chica a propósito. NVDA cayó ${cae}%, pero a tu cartera le costó ${fmt(n * Math.abs(X.F.nvda) / 100)}%. Mantengamos y la revisamos en marzo, como quedamos."`, sc: 25, d: "Le recordás el plan y le mostrás que el tamaño hizo su trabajo.", conf: 4 },
          { t: "\"Al contrario: aprovechemos y compremos más ahora que está más barata. Así bajamos el precio promedio de compra y, cuando rebote, recuperamos lo perdido mucho más rápido.\"", sc: 10, d: "Duplicar la apuesta porque bajó no es criterio. Si la agrandás mucho, volvés al problema de concentración.", conf: 2 }];
        return [
          { t: "\"Vendamos todo ya y pasemos a algo tranquilo hasta que aclare. Con una caída así, lo mejor es salir y no mirar atrás; después vemos cómo seguimos.\"", sc: 8, d: "Hacés definitiva la pérdida sin analizar. El problema no era NVDA, era el tamaño.", conf: -2 },
          { t: "\"Tenés razón, debí advertirte mejor. Te propongo bajar NVDA a una parte acotada y volver a diversificar: así, una caída como esta te cuesta poco.\"", sc: 25, d: "Te hacés cargo y corregís lo que estaba mal: el tamaño.", conf: 4 },
          { t: "\"Tranquilo, va a volver. Las grandes tecnológicas siempre se recuperan de estas caídas: no vendas en el piso, que en un par de meses vas a estar de nuevo arriba.\"", sc: 4, d: "Prometés lo que no sabés, otra vez.", conf: -4 }]; },
      incoh(k, m, w) { const nv = pct(w, "nvda"), prev = this.nv(), r = this.rama();
        if (r === "sin" && k === "2" && (nv === 0 || nv > 20)) return "Le propusiste entrar con una parte, pero la cartera no lo refleja.";
        if (r === "parte" && k === "2" && nv !== prev) return "Le dijiste que mantenían NVDA, pero la propuesta la cambia.";
        if (r === "mucho" && k === "2" && nv > 25) return "Le dijiste que bajabas NVDA a una parte acotada, pero sigue siendo grande.";
        return null; },
      key(m, w, r, X) { const nv = pct(w, "nvda"), ra = this.rama();
        if (nv > 25) return `Una caída de ${A(X.F.nvda, 0)}% en una sola empresa ya mostró el problema: con una posición grande, la cartera depende de un solo papel.`;
        if (ra === "parte" && nv === 0) return "Vendiste en la primera caída una posición que se armó pensando en 5 años. Si no cambió nada de fondo, el plan era revisarla en marzo.";
        if (r.perfil[0] < 20 || r.div[0] < 20 || r.liq[0] < 20) return null;
        if (ra === "mucho") return "Corregiste el tamaño. Lo que queda para la próxima: el tamaño de una apuesta se decide antes de que caiga, no después.";
        if (ra === "sin" && nv > 0) return "Le diste lugar a la idea con un tamaño razonable. La caída no la hacía \"barata\": lo que cambió es que ahora la posición es acotada.";
        if (ra === "sin") return "Mantuviste la cartera diversificada. Ojo con la confianza: es el segundo mes que Martín trae una idea y queda afuera.";
        return "Mantuviste el plan: una posición acotada que este mes costó poco. Para eso servía el tamaño."; },
      conf(m, w) { const nv = pct(w, "nvda"), r = this.rama(); if (r === "sin") return nv === 0 ? -6 : 3; return 0; },
      shock(X) { const n = this.nv(); if (!n) return [0, "NVDA no estaba en su cartera."];
        const a = this.avisado(), x = -Math.round(n * (a ? 0.15 : 0.45));
        return [x, a ? "NVDA cayó, pero se lo habías anticipado: el golpe es menor." : "NVDA cayó y no se lo habías anticipado con números."]; },
      resp(m, w, k) { const r = this.rama(), nv = pct(w, "nvda");
        if (r === "sin") return nv > 25 ? "¡Por fin! Confirmo ya." : nv > 0 ? "Bueno, algo es algo. Dale, confirmo." : "Siempre lo mismo con vos...";
        if (r === "parte") return nv === 0 ? "Ok, vendamos. Qué mala suerte." : k === "2" ? "Tenés razón, fue lo que hablamos. Sigo." : "Dale.";
        return nv <= 25 ? "Ok. Me dolió, pero entiendo. Hagámoslo así." : "Bueno, veamos qué pasa."; }
    },
    leccion: () => ({ h: "El resultado del mes y la calidad de la decisión no siempre van juntos.",
      p: "Si en diciembre bajaste el riesgo de Graciela, este mes \"perdiste\" la suba del GD35. Si le diste a Martín una parte acotada de NVDA, este mes le costó plata. Ninguna de las dos cosas dice que las decisiones fueron malas: una decisión se juzga por lo que podía pasar en el momento de tomarla, no solo por lo que terminó pasando. Explicárselo al cliente es parte del trabajo." }),
    cierreH: "Lo que pasó no siempre dice si decidiste bien",
    cierreLead: "Este mes ya fue con las carteras que dejaste en diciembre. El resultado empieza a ser tuyo; el criterio, como siempre, se mide por lo que hiciste con lo que sabías."
  },

  /* ================= FEBRERO 2027 ================= */
  { fecha: "Febrero 2027", corto: "febrero", infMes: "ene.",
    base: { rp: -20, tasa: 2.5, inf: 2.6, infEsp: 2.2, mep: 4, spx: -1, nvda: -9 },
    altF: { nvda: 10, mep: 0, spx: 1 },
    cf: { p: "En enero nadie sabía si Nvidia iba a rebotar o a seguir cayendo, ni si el dólar se iba a mover. Así le habría ido a cada cartera en los dos casos:", a: X => `NVDA ${sg(X.F.nvda, 0)}%, dólar ${sg(X.F.mep)}%`, b: () => "NVDA rebotaba +10%, dólar quieto" },
    flujo: { g: -15000 }, motivo: "el techo",
    whyX: { nvda: X => `Siguió cayendo: ${sg(X.F.nvda, 0)}% en febrero, ≈ ${sg((X.L.nvda / C.X(0).L.nvda - 1) * 100, 0)}% desde el pico de diciembre. Lo que cayó en enero no rebotó. Una caída no trae una suba garantizada detrás.` },
    titular: X => ({ kick: "Mercados · Jueves 11 de febrero",
      h: `La inflación de enero fue ${fmt(X.F.inf)}% y sorprendió al mercado: suben las tasas en pesos y el dólar MEP salta ${A(X.F.mep)}%`,
      p: "El dato quedó por encima de lo esperado por los cambios de precios regulados de principio de año. Los bonos en dólares, en cambio, siguieron tranquilos.",
      also: [["Riesgo país estable", `Cerró en ${X.L.rp} pb. Sin novedades de fondo.`], ["La tasa en pesos sube", `Los plazos fijos de bancos grandes ya pagan ${fmt(X.L.tasa, 0)}% anual.`], ["Nvidia no rebota", `Cayó otro ${A(X.F.nvda, 0)}%: acumula ≈ ${sg((X.L.nvda / C.X(0).L.nvda - 1) * 100, 0)}% desde diciembre.`]],
      chain: ["Inflación más alta de lo esperado", "Suben las tasas en pesos y el dólar", "Lo que está en pesos pierde medido en dólares", "Los bonos en dólares, casi sin cambios"] }),
    g: {
      via: "Llamado · viernes 10:30",
      listo: () => C.retiro(G(), 2).vendido < 1,
      dice: X => `¡Arrancan con el techo! El arquitecto quiere los 15 mil la semana que viene. Y otra cosa: mi vecina me dijo que los plazos fijos ahora pagan ${fmt(X.L.tasa, 0)}%. ¿No me conviene pasar el resto a pesos? Es mucho más que lo que me da el fondo en dólares.`,
      nota: X => `<div class="callout"><b>Dos temas en un llamado.</b><br>Uno es operativo: el retiro. El otro es la tentación de la tasa en pesos, el mismo mes en que el dólar subió ${A(X.F.mep)}%. Una LECAP ganó en pesos y perdió medida en dólares.</div>`,
      msgs: X => [
        { t: `"Sí, ${fmt(X.L.tasa, 0)}% es mucho más que el 3,6% del fondo en dólares. Pasemos una parte a pesos mientras la tasa esté así de alta y, cuando baje, volvemos a dólares: con esa diferencia, es plata que hoy estás dejando de ganar. Los 15 mil te los transfiero esta semana."`, sc: 4, d: "Comparás una tasa en pesos con una en dólares como si fueran lo mismo. Es el error del 7% CER contra el 7% en dólares.", conf: 3 },
        { t: `"Ese ${fmt(X.L.tasa, 0)}% es en pesos y por año: con una inflación de ${fmt(X.F.inf)}% por mes, apenas le gana a los precios. Y si el dólar sube como este mes, en dólares perdés. Vos querés cuidar dólares: quedate donde estás. Los 15 mil te los transfiero esta semana."`, sc: 25, d: "Pasás la tasa a la misma moneda y al mismo plazo que le importa a ella, con el dato del mes.", conf: 5 },
        { t: "\"Los plazos fijos son de los bancos y eso no lo manejo yo: tendrías que consultarlo en tu sucursal. Yo me ocupo de la cuenta comitente. Lo que sí hago es transferirte los 15 mil del techo esta semana.\"", sc: 8, d: "Es cierto, pero la dejás sola con la duda. Si no le explicás, lo va a hacer igual.", conf: -3 }],
      incoh: (k, m) => k === "2" && m.pesos > 0 ? "Le dijiste que se quede en dólares, pero la propuesta incluye pesos." : k === "1" && m.pesos === 0 ? "Le dijiste que pasaban una parte a pesos, pero la propuesta no lo hace." : null,
      key(m, w, r, X) {
        if (m.pesos > 0) return `Ganarle a la inflación en pesos no es lo mismo que cuidar dólares. Este mes el dólar subió ${A(X.F.mep)}% y lo que estaba en pesos perdió medido en dólares, aunque en pesos ganó.`;
        if (r.perfil[0] < 20 || r.div[0] < 20) return null;
        return this.listo() ? "El retiro salió del money market sin vender nada: para eso estaba separado. Y no te dejaste llevar por la tasa en pesos."
          : "No caíste en la tasa en pesos. Pero el retiro obligó a vender bonos: esta vez a buen precio porque el riesgo país había bajado; la próxima, puede tocar en una mala semana."; },
      conf: m => m.pesos > 0 ? 1 : 0,
      shock() { return this.listo() ? [2, "El retiro estuvo listo sin vueltas."] : [-3, "Tuvo que esperar a que se vendieran bonos para cobrar."]; },
      resp(m, w, k) {
        if (k === "2" && m.pesos === 0) return "Ah, no lo había pensado en dólares. Me quedo tranquila donde estoy. Gracias por lo del techo.";
        if (k === "1") return "¡Buenísimo! Le voy a contar a mi vecina.";
        return "Bueno... igual me quedé con la duda."; }
    },
    m: {
      via: "WhatsApp · domingo 19:40",
      nv: () => pct(hM(2), "nvda"),
      rama() { const n = this.nv(); return n === 0 ? "sin" : n <= 25 ? "parte" : "mucho"; },
      explico: () => C.scMsg(Mt(), 1) === 25,
      pico: X => Math.abs((X.L.nvda / C.X(0).L.nvda - 1) * 100),
      dice(X) { const r = this.rama(), p = fmt(this.pico(X), 0);
        if (r === "sin") return `NVDA ya cayó ${p}% desde el pico. ¿Ahora sí entramos? Más no puede bajar.`;
        if (r === "parte") return `NVDA sigue cayendo, ya pierdo ${p}% ahí. Dijimos de revisarla en marzo, pero esto no para. ¿Qué hacemos?`;
        return "NVDA sigue cayendo. Ya perdí un montón. ¿Por qué no me frenaste?"; },
      nota(X) { const n = this.nv();
        if (!n) return `<div class="callout teal"><b>No tiene NVDA.</b><br>La caída de enero no rebotó: siguió. Que algo haya caído mucho no dice nada sobre lo que viene.</div>`;
        return `<div class="callout"><b>NVDA cayó otro ${A(X.F.nvda, 0)}% y le costó a la cartera ${fmt(n * Math.abs(X.F.nvda) / 100)}%.</b><br>En enero cayó; en febrero, en vez de rebotar, siguió bajando.${pct(hM(2), "lecap") ? ` Además, la LECAP perdió ${A(X.ret.lecap)}% en dólares por la suba del MEP.` : ""}</div>`; },
      msgs(X) { const r = this.rama(), n = this.nv(), p = this.pico(X);
        if (r === "sin") return [
          { t: "\"Sí, después de caer tanto ya tocó piso. Es el momento de entrar fuerte, antes de que el resto se dé cuenta y rebote.\"", sc: 4, d: "Nadie sabe dónde está el piso. En enero también parecía barata.", conf: 4 },
          { t: "\"Puede seguir bajando, como este mes: haber caído no la hace barata. Si querés tenerla, una parte chica, y entrando de a poco.\"", sc: 25, d: "Separás la caída del precio de la decisión, y le das una forma prudente de entrar.", conf: 3 },
          { t: "\"No, NVDA ya fue: cuando una acción cae dos meses seguidos es porque algo anda mal. Mejor ni mirarla y buscar otra cosa.\"", sc: 8, d: "Tan arbitrario como decir que tocó piso.", conf: -3 }];
        if (r === "parte") return [
          { t: "\"Compremos más ahora que está barata: si sumamos a este precio bajamos el promedio de compra, y con un rebote chico ya quedás hecho. Es lo que hacen los inversores que saben. Y de paso aprovechás la baja.\"", sc: 8, d: "Agrandar una posición solo porque bajó: si sigue cayendo, el problema crece.", conf: 2 },
          { t: `"En total te cuesta ≈ ${fmt(n * p / 100)}% de la cartera. La pregunta no es cuánto cayó, sino si cambió algo de fondo en la empresa. En marzo salen sus resultados: lo decidimos con esos números, como quedamos."`, sc: 25, d: "Pone la pérdida en perspectiva y lleva la decisión a los fundamentos, no al precio.", conf: 4 },
          { t: "\"Ya va a volver, siempre vuelve. Es una de las mejores empresas del mundo y estas caídas son normales: lo peor que podés hacer es mirar el precio todos los días. Paciencia.\"", sc: 4, d: "Esta vez no volvió: ya son dos meses de caída. Que algo rebote no es una ley.", conf: -2 }];
        return [
          { t: "\"Esperemos, ya va a volver: vender ahora sería hacer definitiva la pérdida. Aguantemos un par de meses más y, cuando recupere, ahí sí bajamos la posición.\"", sc: 4, d: "\"Ya va a volver\" no es un análisis. Lleva dos meses sin volver.", conf: -4 },
          { t: "\"Bajemos NVDA a un tamaño que puedas aguantar y volvamos a diversificar. Lo que quede, lo decidimos con los números de la empresa, no con el precio.\"", sc: 25, d: "Corregís el tamaño y llevás la decisión a los fundamentos.", conf: 4 },
          { t: "\"Vos me pediste todo en NVDA y yo te armé la orden que me pediste. Las decisiones las confirmás vos; yo no puedo frenarte si estás convencido.\"", sc: 6, d: "Puede ser cierto, pero proponer era tu trabajo.", conf: -6 }]; },
      incoh(k, m, w) { const n = pct(w, "nvda"), prev = this.nv(), r = this.rama();
        if (r === "sin" && k === "2" && n > 15) return "Le hablaste de una parte chica, pero la propuesta pone mucho más.";
        if (r === "parte" && k === "2" && n !== prev) return "Le dijiste que lo decidían en marzo, pero la propuesta ya cambia NVDA.";
        if (r === "parte" && k === "1" && n <= prev) return "Le dijiste que compraban más, pero la propuesta no lo hace.";
        if (r === "mucho" && k === "2" && n > 25) return "Le dijiste que bajabas NVDA, pero sigue siendo grande.";
        return null; },
      key(m, w, r) { const n = pct(w, "nvda"), prev = this.nv(), ra = this.rama();
        if (n > 25) return "La posición sigue siendo demasiado grande. Dos meses seguidos de caída lo muestran: con un tamaño así, la cartera depende de un solo papel.";
        if (ra === "parte" && n > prev) return "Agrandaste una posición que viene cayendo, sin un dato nuevo de la empresa. Si sigue bajando, el problema es más grande.";
        if (ra === "parte" && n === 0) return "Vendiste NVDA. Puede estar bien si cambió algo de fondo en la empresa; si fue solo por el precio, es vender por miedo antes de la revisión que habían acordado.";
        if (ra === "sin" && n > 15) return "Entrar fuerte porque \"ya cayó mucho\" supone que tocó piso, y nadie lo sabe.";
        if (r.perfil[0] < 20 || r.div[0] < 20 || r.liq[0] < 20) return null;
        if (ra === "sin" && n > 0) return "Le diste una parte chica, sin suponer que había tocado piso.";
        if (ra === "sin") return "Mantuviste la cartera diversificada y le explicaste que una caída no hace barato a un papel. Ojo con la confianza: es la tercera vez que trae la idea y queda afuera.";
        if (ra === "mucho") return "Bajaste el tamaño. Lo que cuesta aprender: después de dos meses de caída no hay que esperar a que \"vuelva\" para corregir lo que estaba mal armado.";
        return "Mantuviste el plan aunque la caída siguió: una posición acotada cuesta poco aunque no rebote. Por eso se puede sostener hasta tener datos nuevos."; },
      conf(m, w) { return this.rama() === "sin" && pct(w, "nvda") === 0 ? -4 : 0; },
      shock() { const n = this.nv(); if (!n) return [0, "No tenía NVDA."];
        const e = this.explico(), x = -Math.round(n * (e ? 0.1 : 0.25));
        return [x, e ? "Otra caída de NVDA, pero en enero le habías explicado el plan." : "Otra caída de NVDA, y no había un plan claro para esta situación."]; },
      resp(m, w, k) { const r = this.rama(), n = pct(w, "nvda");
        if (r === "sin") return n > 15 ? "¡Vamos! Confirmo." : n > 0 ? "Dale, de a poco entonces." : "Bueno, vos sabrás.";
        if (r === "parte") return k === "2" ? "Ok, tiene sentido. Espero los resultados." : k === "3" ? "Ojalá..." : "Va, confirmo.";
        return n <= 25 ? "Bueno. Me duele, pero tiene sentido." : "Esperemos a ver qué pasa."; }
    },
    leccion: () => ({ h: "En enero, los bonos rebotaron. En febrero, Nvidia siguió cayendo. Ninguna de las dos cosas se podía saber.",
      p: "\"Ya va a volver\" no es un análisis: a veces vuelve y a veces no. Lo que protege a un cliente no es adivinar, sino que ninguna posición sea tan grande como para hundirlo si sigue cayendo, y que lo que necesita en el corto plazo esté donde no dependa del mercado, como los 15 mil del techo de Graciela." }),
    cierreH: "Una caída no garantiza un rebote",
    cierreLead: "Un mes sin grandes titulares argentinos, pero con dos trampas: la tasa en pesos y una caída que no rebotó."
  },

  /* ================= MARZO 2027 ================= */
  { fecha: "Marzo 2027", corto: "marzo", infMes: "feb.",
    base: { rp: -30, tasa: -1, inf: 2.3, infEsp: 2.4, mep: 1, spx: 3, nvda: 2 },
    altF: { nvda: -15, mep: 5 },
    cf: { p: "En febrero nadie sabía cómo iban a caer los resultados de Nvidia ni qué iba a hacer el dólar. Así le habría ido a cada cartera en los dos casos:", a: X => `NVDA ${sg(X.F.nvda, 0)}%, dólar ${sg(X.F.mep)}%`, b: () => "NVDA decepcionaba (−15%), dólar +5%" },
    vence: { lecap: "caucion" },
    whyX: { nvda: X => `Presentó resultados: ventas +60% contra el año pasado, mejor de lo esperado. Pero la acción subió solo ${A(X.F.nvda, 0)}%: el mercado ya esperaba números buenos. Un buen dato no siempre mueve el precio.` },
    titular: X => ({ kick: "Mercados · Miércoles 10 de marzo",
      h: `La inflación de febrero bajó a ${fmt(X.F.inf)}% y el riesgo país cerró en ${X.L.rp} puntos básicos; afuera, Nvidia presentó resultados récord pero la acción casi no se movió`,
      p: "Calma en el mercado local, con las tasas en pesos estables. Vencen las LECAP de marzo y muchos inversores tienen que decidir qué hacer con esos pesos.",
      also: [[`Inflación de febrero: ${fmt(X.F.inf)}%`, `Algo por debajo de lo esperado. Las tasas en pesos, en ${fmt(X.L.tasa, 0)}%.`], ["Vence la LECAP de marzo", "Quienes la tenían cobran su valor final en pesos."], ["Nvidia: ventas +60%", `Mejor de lo esperado. La acción subió solo ${A(X.F.nvda, 0)}%: el mercado ya lo daba por hecho.`]],
      chain: ["Resultados de Nvidia mejores de lo esperado", "Pero el mercado ya esperaba buenos números", "El precio casi no se mueve", "Buen negocio no es lo mismo que suba garantizada"] }),
    g: {
      via: "WhatsApp · martes 18:20",
      dice: () => "Hola, querida. Mi sobrino, que trabaja en un banco, dice que tengo que comprar bonos CER porque protegen de la inflación. Con lo que fue la inflación de enero, ¿no tendría que tener algo de eso?",
      nota: () => `<div class="callout teal"><b>Mes tranquilo para su cartera, pero llega una idea de la familia.</b><br>El CER protege de la inflación en pesos. Graciela mide todo en dólares. Es el mismo razonamiento de "¿Qué 7% gana?": el CER gana si el dólar sube menos que la inflación, y pierde si sube más.</div>`,
      msgs: () => [
        { t: "\"Sí, tu sobrino tiene razón: con esta inflación, el CER es lo más seguro que hay, porque te devuelve todo lo que suben los precios más una tasa. Pasemos una buena parte de la cartera a bonos CER y te olvidás del tema. Es lo que hace la gente que sabe.\"", sc: 4, d: "El CER protege de la inflación en pesos, no de una suba del dólar. Para alguien que mide todo en dólares, no es \"lo más seguro\".", conf: 3 },
        { t: "\"El CER te cubre si los precios suben más rápido que el dólar. Pero vos pensás en dólares: si el dólar salta más que la inflación, como en febrero, el CER pierde medido en dólares. Para lo que buscás, tu cartera en dólares te cuida mejor.\"", sc: 25, d: "Explicás de qué protege el CER y de qué no, con un ejemplo que ella vivió el mes pasado.", conf: 5 },
        { t: "\"Lo que diga tu sobrino no es asesoramiento: una cosa es trabajar en un banco y otra conocer tu situación. Tu cartera está bien como está y no conviene andar cambiándola por lo que comenta alguien de la familia.\"", sc: 6, d: "Descalificás al sobrino en vez de explicar. Ella se queda con la duda y con un conflicto familiar.", conf: -5 }],
      incoh: (k, m, w) => k === "2" && pct(w, "cer") > 0 ? "Le explicaste que el CER no es para ella, pero la propuesta incluye CER." : k === "1" && pct(w, "cer") === 0 ? "Le diste la razón al sobrino, pero la propuesta no incluye CER." : null,
      key(m, w) {
        if (pct(w, "cer") > 0) return "Le sumaste CER a alguien que mide todo en dólares. El CER le gana a la inflación, no al dólar: en un mes como febrero habría perdido medido en dólares.";
        return null; },
      okKey: "Explicaste de qué protege el CER y de qué no. Para Graciela, el riesgo que importa es el dólar, no la inflación en pesos.",
      shock: () => [1, "Mes tranquilo para su cartera."],
      resp(m, w, k) {
        if (k === "2" && pct(w, "cer") === 0) return "Ahh, ahora entiendo. Se lo voy a explicar a mi sobrino, a ver qué me dice.";
        if (k === "1") return "¡Qué bueno! Mi sobrino va a estar contento.";
        return "Bueno... no te enojes, era una pregunta nomás."; }
    },
    m: {
      via: "Mail · jueves 9:05",
      prev: () => pct(hM(3), "nvda"),
      tieneLecap: () => pct(hM(3), "lecap") > 0,
      dice(X) { const p = this.prev(), l = this.tieneLecap() ? " Ah, y me venció la LECAP: los pesos quedaron en caución. ¿Qué hago con eso?" : "";
        return p > 0 ? `Salieron los resultados de Nvidia: ventas +60%, mejor de lo esperado. Pero la acción subió apenas ${A(X.F.nvda, 0)}%. Es la revisión que habíamos quedado en hacer: ¿qué hacemos con NVDA?${l}`
          : `Salieron los resultados de Nvidia y fueron buenísimos. ¿Ahora sí entramos?${l}`; },
      nota(X) {
        return `<div class="callout"><b>${this.prev() > 0 ? "La revisión prometida." : "Los resultados de Nvidia."}</b><br>Ventas +60% contra el año pasado y ganancias por encima de lo esperado. La acción subió solo ${A(X.F.nvda, 0)}%: el mercado ya esperaba números buenos. Para decidir, la pregunta es si cambió algo de fondo en el negocio, no qué hizo el precio. <span class="hint">Datos de la empresa ficticios.</span></div>`
          + (this.tieneLecap() ? `<div class="callout teal"><b>Venció la LECAP.</b><br>Esos pesos están en caución, rindiendo ≈ 30% anual mientras se decide. Es plata estacionada: para un cliente con 5 años de horizonte, hay que asignarla.</div>` : ""); },
      msgs() { const p = this.prev();
        if (p > 0) return [
          { t: "\"Los números fueron buenos y aun así casi no subió: quiere decir que el mercado no la quiere. Si con un balance así no reacciona, mejor vender ahora y buscar otra cosa.\"", sc: 6, d: "Confundís el precio con el negocio. Que no suba con buenos números puede significar que ya estaba en el precio, no que el negocio ande mal.", conf: -2 },
          { t: "\"Los números confirman que el negocio sigue fuerte, que es por lo que la tenemos. Que no haya subido más es porque el mercado ya lo esperaba. La mantenemos, con un tamaño acotado.\"", sc: 25, d: "Decidís con los fundamentos, como habían acordado, y separás el negocio del precio.", conf: 5 },
          { t: "\"Ahora que se confirmó que el negocio es buenísimo, ya no hay motivo para tenerla chica: subámosla a 40% de la cartera, que con estos números el riesgo es mucho menor.\"", sc: 6, d: "Buena empresa no es lo mismo que buena idea para el 40% de una cartera.", conf: 4 }];
        return [
          { t: "\"Con estos números ya no hay dudas: entremos fuerte, antes de que el mercado termine de reaccionar al balance y la acción se escape.\"", sc: 6, d: "Un buen balance no cambia el riesgo de concentrarse en una sola empresa.", conf: 4 },
          { t: "\"Los números son buenos, y eso es un dato del negocio, no del precio. Si querés tenerla, con una parte acotada, alrededor de 10%.\"", sc: 25, d: "Usás el dato correcto para decidir y mantenés el tamaño bajo control.", conf: 4 },
          { t: "\"Ya se perdió la oportunidad: si con un balance así casi no subió, es que lo bueno ya pasó. Mejor esperar a la próxima.\"", sc: 8, d: "Tan arbitrario como decir que es el momento: nadie sabe.", conf: -3 }]; },
      incoh(k, m, w) { const n = pct(w, "nvda"), p = this.prev();
        if (k === "2" && (n === 0 || n > (p > 0 ? 25 : 15))) return p > 0 ? "Le dijiste que la mantenían con un tamaño acotado, pero la propuesta no lo refleja." : "Le propusiste una parte acotada, pero la cartera no lo refleja.";
        return null; },
      key(m, w, r) { const n = pct(w, "nvda"), p = this.prev();
        if (n > 25) return "Buenos resultados no cambian la regla del tamaño: una sola empresa, por buena que sea, no puede ser la cartera.";
        if (p > 0 && n === 0) return "Vendiste justo cuando la empresa confirmó que el negocio va bien. Si la razón para tenerla sigue en pie, el precio de corto plazo no era motivo para salir.";
        if (r.perfil[0] < 20 || r.div[0] < 20 || r.liq[0] < 20) return null;
        if (p === 0 && n > 0) return "Entraste con una parte acotada y por un dato del negocio, no por el precio. Es la forma.";
        if (p > 0) return "Revisaste NVDA con los números de la empresa, como habían acordado, y no con el precio. El tamaño sigue acotado.";
        return "Dejaste afuera a NVDA otra vez. Con buenos números del negocio, una parte chica era razonable; Martín lo va a sentir."; },
      conf(m, w) { return this.prev() === 0 && pct(w, "nvda") === 0 ? -5 : 0; },
      shock() { return this.prev() > 0 ? [2, "Llegó la revisión que le habías prometido para marzo."] : [0, "Mes tranquilo."]; },
      resp(m, w, k) { const n = pct(w, "nvda"), p = this.prev();
        if (n > 25) return "¡Eso! Por fin.";
        if (p > 0 && n === 0) return "Bueno... justo ahora que dio buenos números. Dale.";
        if (k === "2") return "Me gusta que lo miremos con los números de la empresa. Confirmo.";
        return "Ok, dale."; }
    },
    leccion: () => ({ h: "Un buen dato no siempre mueve el precio, y que el precio no se mueva no dice que el dato fue malo.",
      p: "Nvidia presentó números muy buenos y casi no subió: el mercado ya los esperaba. Lo que se decide con fundamentos (¿sigue en pie la razón para tenerla?) no se decide con el precio de una semana. Y con Graciela: el CER protege de la inflación, no del dólar. Para alguien que mide todo en dólares, no es \"lo más seguro\"." }),
    cierreH: "Fundamentos, no precio",
    cierreLead: "Un vencimiento, los resultados de una empresa y un consejo de familia: tres decisiones que no dependen del titular del mes."
  },

  /* ================= ABRIL 2027 ================= */
  { fecha: "Abril 2027", corto: "abril", infMes: "mar.",
    base: { rp: -15, tasa: 0, inf: 2.1, infEsp: 2.2, mep: 1.5, spx: 1, nvda: 3 },
    altF: { rp: 90, mep: 4 },
    cf: { p: "Fue un mes tranquilo, pero nadie lo sabía de antemano. Así le habría ido a cada cartera si el riesgo país se movía:", a: () => "Mes tranquilo", b: () => "Riesgo país +90 pb, dólar +4%" },
    titular: X => ({ kick: "Mercados · Viernes 9 de abril",
      h: `Un mes sin sobresaltos: el riesgo país se mantuvo cerca de ${X.L.rp} puntos básicos y la inflación de marzo fue ${fmt(X.F.inf)}%`,
      p: "Sin novedades de peso en la Argentina ni afuera. Los bonos cobraron sus intereses y Wall Street subió un poco.",
      also: [["Tasas en pesos, sin cambios", `La LECAP sigue en ${fmt(X.L.tasa, 0)}% anual.`], [`Dólar MEP: ${sg(X.F.mep)}%`, "Por debajo de la inflación del mes."], ["Wall Street", `El S&P 500 subió ${A(X.F.spx)}%; Nvidia, ${A(X.F.nvda, 0)}%.`]],
      chain: ["Sin noticias que cambien el panorama", "Las tasas casi no se mueven", "Los bonos ganan su interés del mes", "No todos los meses hay algo que hacer"] }),
    g: {
      via: "Llamado · jueves 11:00",
      dice: () => "Hola, querida. Todo tranquilo, ¿no? Te cuento: mi amiga Susana dice que ella con acciones ganó muchísimo más que yo. ¿No estaré siendo demasiado miedosa? ¿Y si ponemos la mitad en acciones?",
      nota: () => `<div class="callout"><b>La tentación de mirar el resultado de otro.</b><br>Susana cuenta cuando gana. Graciela es conservadora, tiene 2 años de horizonte y quiere dormir tranquila. Para ese perfil, la renta variable tiene un techo de 40%; la mitad lo supera.</div>`,
      msgs: () => [
        { t: "\"Tenés razón, te estás perdiendo la suba. Con lo bien que viene Wall Street, pongamos la mitad en acciones: tu cartera es demasiado tranquila y así, a fin de año, vas a estar tan contenta como Susana.\"", sc: 4, d: "Cambiás el perfil de una clienta por el resultado de una amiga. Si las acciones caen 20%, pierde 10% de sus ahorros.", conf: 3 },
        { t: "\"Susana te cuenta cuando gana, no cuando pierde. Tu cartera está armada para cuidar lo que juntaste y que duermas tranquila. Si querés algo de acciones, puede ser una parte chica y repartida en muchas empresas, nunca la mitad.\"", sc: 25, d: "Le recordás para qué está armada su cartera y dejás abierta una opción acorde a su perfil.", conf: 4 },
        { t: "\"Las acciones son muy riesgosas y no son para alguien de tu edad: olvidate. Lo de Susana es pura suerte y en cualquier momento pierde todo. Vos quedate con tus bonos y tu fondo, que es lo único seguro. A tu edad no hay tiempo para recuperarse de una caída.\"", sc: 10, d: "Cerrás la puerta sin explicar. Con 2 años de horizonte, una parte chica y diversificada no era una locura.", conf: -2 }],
      incoh: (k, m) => k === "1" && m.acc < 40 ? "Le dijiste que ponían la mitad en acciones, pero la propuesta no lo hace." : k === "2" && m.acc > 20 ? `Le hablaste de una parte chica, pero la propuesta pone ${m.acc}% en acciones.` : k === "3" && m.acc > 0 ? "Le dijiste que se olvide de las acciones, pero la propuesta las incluye." : null,
      okKey: m => m.acc > 0 ? "Le diste lugar a su inquietud con una parte chica, dentro del techo de su perfil. El perfil no cambia porque a una amiga le fue bien." : "Mantuviste la cartera. El perfil de un cliente no cambia porque a otra persona le fue bien un año.",
      resp: ["Tenés razón, Susana nunca me cuenta cuando pierde. Hagamos como decís.", "Bueno... igual me quedé pensando en lo de Susana.", "¡Dale! A ver si la alcanzo a Susana."]
    },
    m: {
      via: "WhatsApp · lunes 13:30",
      estac: () => pct(C.base(Mt(), 4), "caucion") > 10,
      dice() { return this.estac() ? "Che, está todo muy quieto. Y sigo con esos pesos en caución sin hacer nada. ¿Movemos algo?" : "Che, está todo muy quieto. ¿No tendríamos que mover algo? Siento que si no hacemos nada estamos perdiendo plata."; },
      nota() { return this.estac() ? `<div class="callout"><b>Hay plata estacionada.</b><br>Los pesos en caución siguen sin asignar desde marzo. Acá sí hay un motivo para mover.</div>`
        : `<div class="callout teal"><b>Mes sin novedades.</b><br>No hacer nada también es una decisión. Cada cambio cuesta comisiones y la diferencia entre puntas (precio de compra y de venta). Sin un motivo, mover la cartera no suma.</div>`; },
      msgs() { return this.estac() ? [
        { t: "\"Dejémoslos en caución: rinde bien, no tiene riesgo y los tenés disponibles para cuando aparezca una oportunidad clara. No hay apuro por asignarlos.\"", sc: 8, d: "Rinde en pesos; con 5 años de horizonte, esa plata tendría que estar invertida según su perfil.", conf: 0 },
        { t: "\"Tenés razón con la caución: es plata estacionada y con tu horizonte conviene asignarla. El resto de la cartera está bien como está: no hace falta tocarlo.\"", sc: 25, d: "Distinguís lo que tiene un motivo para moverse de lo que no.", conf: 4 },
        { t: "\"Sí, aprovechemos para rotar un poco todo: vendemos lo que subió, compramos lo que quedó atrás y así la cartera no se queda quieta mientras el mercado se mueve.\"", sc: 6, d: "Mover por mover cuesta comisiones y no tiene una razón.", conf: 2 }] : [
        { t: "\"Sí, tenés razón: hace rato que no movemos nada. Rotemos un poco para aprovechar, vendiendo lo que más subió y comprando lo que quedó atrás, así la plata no se queda quieta y sentís que estamos encima.\"", sc: 6, d: "Mover por mover cuesta comisiones y diferencia entre puntas, y no tiene una razón.", conf: 2 },
        { t: "\"Si la cartera sigue siendo la adecuada para vos y no cambió nada de fondo, no tocarla es la decisión correcta. Cada cambio cuesta comisiones y diferencia entre puntas. Te aviso cuando haya un motivo.\"", sc: 25, d: "Le explicás por qué no hacer nada es una decisión, no una omisión.", conf: 3 },
        { t: "\"No hay nada para hacer este mes. Cuando haya algo te aviso; mientras tanto no te preocupes, que la cartera se maneja sola y no hace falta que estés mirando el mercado todos los días.\"", sc: 12, d: "Es cierto, pero sin explicar por qué: se queda con la sensación de que no lo atendés.", conf: -2 }]; },
      incoh(k, m, w) { const rot = C.rot(Mt(), 4), e = this.estac();
        if (!e && k === "2" && rot > 5) return "Le dijiste que no tocaban nada, pero la propuesta cambia la cartera.";
        if (!e && k === "1" && rot === 0) return "Le dijiste que rotaban, pero la propuesta no cambia nada.";
        if (e && k === "2" && pct(w, "caucion") > 10) return "Le dijiste que asignabas la caución, pero sigue ahí.";
        return null; },
      key(m, w) { const rot = C.rot(Mt(), 4);
        if (!this.estac() && rot > 15) return `Rotaste ≈ ${fmt(rot, 0)}% de la cartera en un mes sin novedades. Cada cambio cuesta comisiones y diferencia entre puntas; sin un motivo, no suma.`;
        return null; },
      okKey() { return "No moviste la cartera por moverla: los cambios necesitan un motivo."; },
      resp: ["Ok, tiene lógica. Avisame cuando haya algo.", "Mmm, bueno.", "¡Dale, movamos!"]
    },
    leccion: () => ({ h: "No hacer nada también es una decisión.",
      p: "Hay meses sin titulares. La tentación es \"hacer algo\": comparar con lo que ganó otro, rotar por rotar. Cada operación cuesta comisiones y diferencia entre puntas, y el perfil de un cliente no cambia porque a un conocido le fue bien. Lo que sí hay que mover es lo que tiene un motivo: plata estacionada, un retiro que se acerca, una posición que quedó demasiado grande." }),
    cierreH: "Un mes tranquilo",
    cierreLead: "Sin noticias, la presión viene de otro lado: de lo que ganó una amiga y de las ganas de mover algo."
  },

  /* ================= MAYO 2027 ================= */
  { fecha: "Mayo 2027", corto: "mayo", infMes: "abr.",
    base: { rp: 60, tasa: 0.5, inf: 2.0, infEsp: 2.1, mep: 2.5, spx: -6, nvda: -14 },
    altF: { rp: -10, mep: 1, spx: 2, nvda: 4 },
    cf: { p: "En abril nadie sabía que el susto iba a venir de afuera. Así le habría ido a cada cartera en los dos casos:", a: X => `S&P ${sg(X.F.spx)}%, NVDA ${sg(X.F.nvda, 0)}%`, b: () => "Wall Street tranquilo (+2%)" },
    titular: X => ({ kick: "Mercados · Jueves 13 de mayo",
      h: `Wall Street tuvo su peor mes del año: el S&P 500 cayó ${A(X.F.spx)}% por el temor a que la Reserva Federal suba la tasa`,
      p: `La Reserva Federal (el banco central de Estados Unidos) advirtió que la inflación allá no cede. Cayeron las acciones de todo el mundo y hubo algo de contagio: el riesgo país argentino subió a ${X.L.rp} puntos básicos.`,
      also: [["Tecnológicas, las más golpeadas", `Nvidia cayó ${A(X.F.nvda, 0)}%.`], [`Dólar MEP: ${sg(X.F.mep)}%`, "Algo de cobertura por el ruido externo."], [`Inflación de abril: ${fmt(X.F.inf)}%`, "Sigue bajando de a poco."]],
      chain: ["La Reserva Federal podría subir la tasa", "Caen las acciones del mundo, más las tecnológicas", "Los CEDEARs caen aunque en la Argentina no pasó nada", "Algo de contagio: sube un poco el riesgo país"] }),
    g: {
      via: "Llamado · viernes 9:30",
      acc: () => pct(hG(5), "spy") + pct(hG(5), "nvda"),
      dice() { return this.acc() > 0 ? "Vi que cayó Wall Street. ¿Eso que compramos de Estados Unidos no era lo seguro? ¿Lo vendemos?" : "Vi en el noticiero que cayó Wall Street. ¿A mí eso me afecta?"; },
      nota(X) { return `<div class="callout teal"><b>Lo de afuera no tiene riesgo argentino, pero tiene riesgo.</b><br>${this.acc() > 0 ? `Sus acciones le costaron a la cartera ${fmt(Math.abs(X.ret.spy * pct(hG(5), "spy") + X.ret.nvda * pct(hG(5), "nvda")) / 100)}% este mes.` : "No tiene acciones, pero cuando el mundo se asusta el riesgo país sube algo y sus bonos bajan un poco."} Diversificar no evita las caídas: evita que todo caiga a la vez.</div>`; },
      msgs() { return this.acc() > 0 ? [
        { t: "\"Sí, vendamos: quedó claro que lo de afuera resultó más riesgoso que lo argentino. Tus bonos casi no se movieron y las acciones cayeron fuerte, así que mejor quedarnos solo con lo que conocemos.\"", sc: 5, d: "Un mes no dice eso. Y vendés después de la caída.", conf: 1 },
        { t: "\"Lo de afuera no depende de la Argentina, pero las acciones siempre pueden caer: por eso son una parte chica de tu cartera. Este mes cayeron ellas y tus bonos casi no; otros meses fue al revés. Para eso se reparte.\"", sc: 25, d: "Explicás qué riesgo tiene cada cosa y para qué sirve repartir.", conf: 4 },
        { t: "\"No te preocupes, Wall Street siempre se recupera: lleva cien años subiendo. En unos meses esto es una anécdota, así que ni mires la cuenta. No hace falta cambiar nada ni pensar en el tamaño. Lo dicen todos los que saben de esto.\"", sc: 6, d: "\"Siempre se recupera\" es una promesa. Puede tardar más que su horizonte de 2 años.", conf: 1 }] : [
        { t: "\"No, vos no tenés nada de afuera: tu cartera son bonos y un fondo de liquidez. Lo de Wall Street no te toca en absoluto, así que quedate tranquila y no mires más el noticiero.\"", sc: 14, d: "Es cierto, pero incompleto: el contagio le pegó un poco a sus bonos.", conf: 2 },
        { t: "\"Directamente, no: no tenés acciones. Indirectamente, un poco: cuando el mundo se asusta, el riesgo país sube algo y tus bonos bajan un poco. Como son cortos, el efecto es chico.\"", sc: 25, d: "Respondés lo que preguntó y le explicás el canal por el que sí le llega.", conf: 4 },
        { t: "\"Sí, cuando cae Wall Street cae todo, y lo argentino más que nada. Conviene que vendamos una parte de los bonos ahora, antes de que el contagio llegue a tu cartera.\"", sc: 6, d: "La asustás sin precisión: a su cartera le pegó muy poco.", conf: -3 }]; },
      incoh(k, m) { return this.acc() > 0 && k === "1" && m.acc > 0 ? "Le dijiste que vendían lo de afuera, pero sigue en la propuesta." : this.acc() > 0 && k === "2" && m.acc === 0 ? "Le explicaste por qué conviene tener una parte afuera, pero la propuesta la vende." : null; },
      okKey: "Le explicaste el riesgo de cada parte de la cartera sin cambiarla por un mes malo.",
      resp: ["Ah, ahora entiendo para qué está repartida. Me quedo tranquila.", "Bueno, si vos decís...", "Sí, mejor. No quiero sorpresas."]
    },
    m: {
      via: "WhatsApp · viernes 23:10",
      dice: X => `El SPY cayó ${A(X.F.spx)}% y NVDA ${A(X.F.nvda, 0)}%. ¿Esto es una oportunidad o el principio de algo peor?`,
      nota: X => `<div class="callout"><b>La cartera perdió ${A(Rm(hM(5), X))}% en el mes.</b><br>Martín pregunta lo que nadie puede contestar. Lo que sí se puede contestar: si su cartera aguanta una caída así sin que tenga que vender, y qué le conviene a alguien que aporta todos los meses y tiene 5 años por delante.</div>`,
      msgs: () => [
        { t: "\"Puede ser el principio de algo peor. Vendamos todo lo de afuera, esperemos en liquidez a que aclare el panorama y volvemos a entrar cuando el mercado se haya calmado y los precios sean más bajos. Es lo más prudente.\"", sc: 5, d: "Es adivinar. Y después hay que adivinar de nuevo cuándo volver a entrar.", conf: -1 },
        { t: "\"No lo sé, y nadie lo sabe. Lo que sí sé es que tu cartera está armada para aguantar una caída así sin que tengas que vender. Con tu horizonte y aportando todos los meses, comprar más barato te juega a favor.\"", sc: 25, d: "Admitís lo que no se puede saber y le das lo que sí: su plan aguanta los dos casos.", conf: 4 },
        { t: "\"Es una oportunidad única: estas caídas no se dan seguido. Pongamos todo en acciones ahora que están de oferta, que con tu horizonte de 5 años es imposible que salga mal.\"", sc: 6, d: "La apuesta contraria, igual de ciega.", conf: 3 }],
      incoh(k, m) { const rot = C.rot(Mt(), 5);
        return k === "2" && rot > 15 ? "Le dijiste que la cartera estaba armada para aguantar, pero la propuesta la cambia bastante." : k === "1" && m.acc > 0 ? "Le dijiste que vendían todo lo de afuera, pero sigue en la propuesta." : k === "3" && m.acc < 80 ? "Le dijiste que ponían todo en acciones, pero la propuesta no lo hace." : null; },
      okKey: "No intentaste adivinar si era oportunidad o crisis: verificaste que la cartera aguante las dos.",
      resp: ["Ok. Me sirve pensarlo así. Sigo aportando.", "Mmm. No sé si me convence.", "¡Dale! Confirmo."]
    },
    leccion: () => ({ h: "Los CEDEARs no tienen riesgo argentino, pero tienen riesgo.",
      p: "Este mes cayó lo de afuera y lo argentino casi no se movió; en diciembre fue al revés. Diversificar entre la Argentina y el mundo no evita las caídas: evita que todo caiga junto. Y ante un \"¿es oportunidad o crisis?\", la respuesta honesta es \"no lo sé\", seguida de lo que sí se sabe: si la cartera aguanta los dos casos." }),
    cierreH: "Cuando el susto viene de afuera",
    cierreLead: "Por primera vez en la partida, el problema no fue argentino."
  },

  /* ================= JUNIO 2027 ================= */
  { fecha: "Junio 2027", corto: "junio", infMes: "may.",
    base: { rp: -10, tasa: -0.5, inf: 1.9, infEsp: 2.0, mep: 1, spx: 3, nvda: 6, onX: -3.5 },
    altF: { onX: 0 },
    cf: { p: "En mayo nadie sabía que iba a caer el petróleo. Así le habría ido a cada cartera en los dos casos:", a: () => "Petróleo −15%: cae la ON", b: () => "Petróleo estable" },
    whyX: { on: X => `El riesgo país casi no se movió, pero cayó el petróleo y el mercado le pide más tasa a YPF: su TIR subió ≈ 1 p.p. Con duration 3,5, el precio cae cerca de 3,5%; con el interés del mes queda en ${sg(X.ret.on)}%. Es riesgo de la empresa, no del país.` },
    titular: X => ({ kick: "Mercados · Martes 8 de junio",
      h: "El petróleo cayó 15% y las obligaciones negociables de las petroleras bajaron de precio; Wall Street recuperó parte de lo perdido",
      p: `Los bonos del Tesoro casi no se movieron: el riesgo país cerró en ${X.L.rp} puntos básicos. El golpe fue para un sector, no para el país.`,
      also: [["Rebote afuera", `El S&P 500 subió ${A(X.F.spx)}% y Nvidia ${A(X.F.nvda, 0)}%, después de la caída de mayo.`], [`Inflación de mayo: ${fmt(X.F.inf)}%`, "La más baja del año."], ["Tasas en pesos", `Bajaron a ${fmt(X.L.tasa, X.L.tasa % 1 ? 1 : 0)}%.`]],
      chain: ["Cae el petróleo", "Las petroleras van a ganar menos", "El mercado les pide más tasa a sus ONs", "Baja el precio de la ON, aunque el riesgo país no se movió"] }),
    g: {
      via: "Llamado · miércoles 10:15",
      on: () => pct(hG(6), "on"),
      dice() { return this.on() > 0 ? "Hola, querida. Me habías dicho que las ONs eran de lo más tranquilo, pero vi que la de YPF bajó. ¿Qué pasó? ¿YPF no paga?" : "Hola, querida. Leí que bajaron las ONs de las petroleras. ¿Yo tengo algo de eso?"; },
      nota(X) { const o = this.on(); return o > 0 ? `<div class="callout"><b>La ON de YPF es el ${o}% de su cartera y le costó ${fmt(o * Math.abs(X.ret.on) / 100)}% este mes.</b><br>No hubo ningún problema de pago: cayó el precio porque cayó el petróleo. Pero es una sola empresa. Fijate en el dato "posición más grande (un emisor)" cuando armes la propuesta.</div>`
        : `<div class="callout teal"><b>No tiene ONs.</b><br>Un mes en que el riesgo vino de una empresa y no del país: buen momento para explicarle la diferencia.</div>`; },
      msgs() { return this.on() > 0 ? [
        { t: "\"YPF es la empresa más grande del país y el Estado es su accionista: no hay ningún riesgo de que no pague. La baja es puro ruido, así que quedate tranquila y ni lo pienses.\"", sc: 5, d: "Ninguna empresa está libre de riesgo, y grande no es lo mismo que segura.", conf: 2 },
        { t: "\"YPF sigue pagando normalmente: bajó el precio porque cayó el petróleo, no porque haya un problema de pago. Pero es una sola empresa, y conviene que ninguna pese demasiado en tu cartera.\"", sc: 25, d: "Separás precio de capacidad de pago y sacás la conclusión correcta: el tamaño.", conf: 4 },
        { t: "\"Ante la duda, vendamos todas las ONs y quedémonos solo con bonos del Tesoro. Con las empresas nunca se sabe, y vos no estás para andar siguiendo el precio del petróleo.\"", sc: 8, d: "Cambiás el riesgo de una empresa por más riesgo país, después de la caída.", conf: 0 }] : [
        { t: "\"No, vos no tenés ONs de YPF en la cartera, así que esa noticia no te afecta para nada. Quedate tranquila, que no hay nada que hacer.\"", sc: 18, d: "Correcto y simple, aunque se pierde la oportunidad de explicar.", conf: 2 },
        { t: "\"No tenés ONs. Y es un buen ejemplo de por qué no conviene que una sola empresa pese mucho en una cartera: puede caer aunque al país no le pase nada.\"", sc: 25, d: "Respondés y aprovechás para explicar la diferencia entre riesgo de una empresa y riesgo país.", conf: 3 },
        { t: "\"No sé, tendría que fijarme bien qué tenés en la cartera. Dejame revisarlo con tiempo y la semana que viene te llamo y te cuento.\"", sc: 4, d: "No conocer la cartera de tu clienta le quita confianza.", conf: -5 }]; },
      incoh(k, m, w) { return this.on() > 0 && k === "2" && pct(w, "on") > 30 ? `Le dijiste que ninguna empresa debía pesar demasiado, pero la ON sigue siendo el ${pct(w, "on")}% de la cartera.` : this.on() > 0 && k === "3" && pct(w, "on") > 0 ? "Le dijiste que vendían las ONs, pero siguen en la propuesta." : null; },
      okKey: "Le explicaste la diferencia entre el riesgo de una empresa y el riesgo del país, y cuidaste que ningún emisor pese demasiado.",
      resp: ["Ah, entonces no es que no paga. Me quedo más tranquila.", "Bueno... igual me asusté.", "Sí, mejor, no quiero más sustos."]
    },
    m: {
      via: "WhatsApp · jueves 20:45",
      dice: () => "¿Viste? Rebotó todo. Había que comprar en mayo. La próxima vez que caiga, compramos fuerte y listo, ¿no?",
      nota: X => `<div class="callout teal"><b>Rebotó una parte de lo que cayó en mayo.</b><br>Nvidia subió ${A(X.F.nvda, 0)}%. En febrero, en cambio, siguió cayendo. Juzgar la decisión de mayo por lo que pasó en junio es el mismo error que juzgar la de diciembre por enero.</div>`,
      msgs: () => [
        { t: "\"Tenés razón: nos perdimos una parte del rebote. La próxima caída no lo dudamos y compramos fuerte, que quedó demostrado que el mercado siempre termina recuperando lo que pierde. Con tu perfil, hay que aprovechar cada baja para sumar.\"", sc: 6, d: "Prometés una regla que en febrero habría salido mal.", conf: 2 },
        { t: "\"Esta vez rebotó; en febrero, Nvidia siguió cayendo. Como no se puede saber de antemano, lo que hacemos es tener siempre un tamaño que aguante los dos casos. Y tus aportes de todos los meses ya compran más barato cuando cae.\"", sc: 25, d: "Usás lo que vivieron juntos para desarmar la regla, y le mostrás que ya tiene un mecanismo.", conf: 3 },
        { t: "\"No se puede comprar siempre que cae: a veces sale bien y a veces mal. Esta vez tuvimos mala suerte y nos quedamos cortos. Es lo que hay; ya vendrán otras oportunidades.\"", sc: 12, d: "Cierto, pero sin explicarle por qué.", conf: -1 }],
      incoh(k) { return k === "2" && C.rot(Mt(), 6) > 15 ? "Le hablaste de mantener el tamaño, pero la propuesta cambia bastante la cartera." : null; },
      okKey: "No convertiste un rebote en una regla. A veces rebota y a veces no: lo que se controla es el tamaño.",
      resp: ["Es verdad, en febrero me habría salido mal. Ok.", "Mmm. Bueno.", "¡Eso! La próxima no se me escapa."]
    },
    leccion: () => ({ h: "Riesgo país y riesgo de una empresa son dos cosas distintas.",
      p: "Este mes el país estuvo tranquilo y aun así cayó una ON, por algo propio de su sector. Una obligación negociable depende de una sola empresa: aunque pague siempre, su precio se mueve. Por eso se mira cuánto pesa cada emisor en la cartera. Y sobre el rebote de las acciones: que esta vez haya vuelto no lo convierte en regla." }),
    cierreH: "El riesgo de un solo emisor",
    cierreLead: "El titular no fue ni argentino ni global: fue de un sector."
  },

  /* ================= JULIO 2027 ================= */
  { fecha: "Julio 2027", corto: "julio", infMes: "jun.",
    base: { rp: 120, tasa: 3, inf: 2.2, infEsp: 2.0, mep: 6, spx: 1, nvda: 2 },
    altF: { rp: -80, mep: 0.5, tasa: -1 },
    cf: { p: "En junio nadie sabía cómo iban a venir las encuestas. Así le habría ido a cada cartera en los dos casos:", a: X => `Riesgo país ${sg(X.F.rp, 0)} pb, dólar ${sg(X.F.mep)}%`, b: () => "Riesgo país −80 pb, dólar quieto" },
    titular: X => ({ kick: "Mercados · Lunes 19 de julio",
      h: `A tres meses de las elecciones, las encuestas muestran un resultado abierto: el riesgo país sube a ${X.L.rp} puntos básicos y el dólar MEP salta ${A(X.F.mep)}%`,
      p: "Los inversores se cubren ante la incertidumbre: compran dólares y venden bonos. También subieron las tasas en pesos.",
      also: [["Tasas en pesos", `La LECAP pasó a ${fmt(X.L.tasa, X.L.tasa % 1 ? 1 : 0)}% anual.`], [`Inflación de junio: ${fmt(X.F.inf)}%`, "Algo por encima de lo esperado."], ["Afuera, calma", `El S&P 500 subió ${A(X.F.spx)}%.`]],
      chain: ["Incertidumbre electoral", "Los inversores se cubren: compran dólares y venden bonos", "Sube el riesgo país y el dólar MEP", "Lo que está en pesos pierde medido en dólares"] }),
    g: {
      via: "Llamado · martes 8:50",
      dice: () => "Querida, estoy asustada. En la tele dicen que después de las elecciones puede pasar cualquier cosa. ¿Vendemos todo y compro dólares billete? Los guardo en casa y listo.",
      nota: X => `<div class="callout"><b>Su cartera ${Rm(hG(7), X) < 0 ? "bajó" : "subió"} ${A(Rm(hG(7), X))}% este mes.</b><br>Mirá el cuadro de abajo: cuánto habría perdido con la cartera que heredaste. Nadie sabe qué va a pasar en octubre. Lo que se puede revisar hoy es si la cartera aguanta los dos resultados y si va a necesitar plata antes de fin de año.</div>`,
      msgs: X => [
        { t: "\"Sí, mejor vendamos todo antes de las elecciones y lo pasamos al fondo de liquidez. Así dormís tranquila hasta octubre y, cuando pase el ruido y se sepa quién gana, volvemos a comprar los mismos bonos.\"", sc: 4, d: "Vendés después de la caída y apostás a un resultado. Si el mercado se calma, se queda afuera.", conf: 3 },
        { t: `"Nadie sabe qué va a pasar en octubre, yo tampoco. Por eso tu cartera tiene bonos cortos y liquidez: con todo este ruido, se movió ${sg(Rm(hG(7), X))}% en el mes. Si vas a necesitar plata antes de fin de año, decímelo y la separamos ahora."`, sc: 25, d: "No prometés nada, le mostrás con números que su cartera aguanta y preguntás por lo único que cambiaría el plan.", conf: 5 },
        { t: "\"No va a pasar nada, son ruidos de campaña que se repiten siempre. El mercado exagera antes de votar y después se acomoda solo. No toques nada y vas a ver que en noviembre está todo igual. Lo vi muchas veces y siempre termina igual.\"", sc: 5, d: "Es una promesa sobre algo que no sabés.", conf: 1 }],
      incoh: (k, m) => k === "1" && m.arg > 20 ? "Le dijiste que vendían todo, pero la propuesta no lo hace." : k === "2" && m.sens > 2.5 ? "Le dijiste que su cartera tiene bonos cortos y liquidez, pero la propuesta tiene bastante duration." : null,
      okKey: "No intentaste adivinar la elección: revisaste que la cartera aguante los dos resultados y preguntaste por lo único que cambiaría el plan.",
      resp: ["Bueno. Si vos me decís que aguanta, me quedo. Dejame pensar lo de la plata y te aviso.", "Mmm... no sé si me quedo tranquila.", "Sí, sí, vendé todo. No quiero saber nada."]
    },
    m: {
      via: "WhatsApp · lunes 21:30",
      dice: () => "Antes de las elecciones hay que salir de todo lo argentino. Vendé los bonos y pasemos todo a CEDEARs. Después de octubre vemos.",
      nota: X => { const a = C.met(hM(7), Mt(), 1).arg; return `<div class="callout"><b>Hoy tiene ${a}% de la cartera con riesgo argentino.</b><br>Salir de todo es apostar a que el resultado va a ser malo para el mercado, justo después de una caída. La alternativa a adivinar es decidir un tamaño: cuánto riesgo argentino quiere tener pase lo que pase.</div>`; },
      msgs: () => { const a = C.met(hM(7), Mt(), 1).arg; return [
        { t: "\"De acuerdo, salgamos de todo lo argentino ya. Con las encuestas así, no tiene sentido quedarse: vendemos hoy, esperamos afuera el resultado y, cuando se aclare el panorama, volvemos a entrar con todo y a mejores precios.\"", sc: 6, d: "Es una apuesta a un resultado, y vende después de la baja. Si el mercado se calma, queda afuera.", conf: 3 },
        { t: `"No sé quién gana ni cómo va a reaccionar el mercado: puede salir para cualquiera de los dos lados. En vez de apostar todo a un resultado, miremos el tamaño: hoy tenés ${a}% con riesgo argentino. Decidamos cuánto querés tener pase lo que pase, y lo dejamos ahí."`, sc: 25, d: "Cambiás la pregunta de \"¿qué va a pasar?\" a \"¿cuánto quiero tener?\", que sí se puede contestar.", conf: 4 },
        { t: "\"Ni loco: es justo al revés. Con el riesgo país en estos niveles los bonos están regalados, así que hay que comprar más. Los que venden antes de las elecciones son los que siempre terminan perdiéndose la suba. Es cuestión de animarse cuando todos los demás tienen miedo.\"", sc: 6, d: "La apuesta contraria, igual de ciega.", conf: -2 }]; },
      incoh(k, m) { const a0 = C.met(hM(7), Mt(), 1).arg;
        return k === "1" && m.arg > 10 ? "Le dijiste que salían de todo lo argentino, pero la propuesta no lo hace." : k === "3" && m.arg <= a0 ? "Le dijiste que compraban más bonos, pero la propuesta no lo hace." : null; },
      key(m) { return m.arg < 10 ? "Saliste de casi todo lo argentino después de la caída. Eso no es bajar el riesgo: es apostar a que el resultado va a ser malo para el mercado." : null; },
      okKey: "No apostaste a un resultado: decidiste un tamaño de riesgo argentino que se puede sostener pase lo que pase.",
      resp: ["Ok, me parece más sensato que adivinar. Lo dejamos en ese tamaño.", "No sé... yo saldría de todo.", "Dale, confirmo."]
    },
    leccion: () => ({ h: "No hace falta adivinar una elección: hace falta que la cartera aguante los dos resultados.",
      p: "Los dos clientes pidieron lo mismo: salir de todo. Vender después de una caída y antes de un evento es apostar a un resultado. Lo que sí está en manos del asesor es el tamaño del riesgo y que lo que se necesita pronto esté separado. Las elecciones son una variable más del mercado, como el petróleo o la tasa de Estados Unidos." }),
    cierreH: "Tres meses antes de votar",
    cierreLead: "Empieza el tramo electoral. Los dos clientes quieren lo mismo, por motivos distintos."
  },

  /* ================= AGOSTO 2027 ================= */
  { fecha: "Agosto 2027", corto: "agosto", infMes: "jul.",
    base: { rp: 150, tasa: 4, inf: 2.9, infEsp: 2.4, mep: 8, spx: 0.5, nvda: -3 },
    altF: { rp: -150, mep: -2, tasa: -3 },
    cf: { p: "En julio nadie sabía si la caída iba a seguir o a revertirse. Así le habría ido a cada cartera en los dos casos:", a: X => `Riesgo país ${sg(X.F.rp, 0)} pb, dólar ${sg(X.F.mep)}%`, b: () => "Riesgo país −150 pb, dólar −2%" },
    need: { g: 8000 }, needTxt: "en octubre, para el casamiento",
    titular: X => ({ kick: "Mercados · Viernes 13 de agosto",
      h: `La incertidumbre no afloja: el riesgo país llega a ${X.L.rp} puntos básicos y el dólar MEP sube otro ${A(X.F.mep)}%`,
      p: `La caída de julio no rebotó: siguió. La inflación de julio fue ${fmt(X.F.inf)}%, por encima de lo esperado, y las tasas en pesos volvieron a subir.`,
      also: [["Bonos largos, los más golpeados", `El GD35 ya rinde ≈ ${fmt(X.L.tir35)}% anual.`], ["Pesos", "LECAP y CER pierden medidos en dólares por el salto del MEP."], ["Afuera", `El S&P 500, ${sg(X.F.spx)}%.`]],
      chain: ["La caída de julio no rebotó", "Más cobertura en dólares", "Suben las tasas en pesos: caen LECAP y CER medidos en dólares", "Los bonos largos, otra vez los más golpeados"] }),
    g: {
      via: "Llamado · sábado 11:20",
      dice: () => "Querida, en medio de tanto lío te tengo que contar algo lindo: ¡se casa mi hija en noviembre! Voy a necesitar unos 8 mil dólares en octubre para ayudarla con la fiesta. ¿Se puede?",
      nota: () => `<div class="callout"><b>Un retiro nuevo, con fecha: USD 8.000 en octubre.</b><br>Octubre es el mes de las elecciones. Si esa plata queda en bonos, el precio al que se vendan va a depender de cómo esté el mercado esa semana. Es la misma situación que el techo en diciembre.</div>`,
      msgs: () => [
        { t: "\"¡Felicitaciones! Sí, claro, se puede. No te preocupes por eso ahora: cuando llegue octubre vemos cómo está el mercado y vendemos lo que haga falta para juntar los 8 mil.\"", sc: 6, d: "En octubre no vas a elegir el precio: puede tocar la peor semana del año.", conf: 2 },
        { t: "\"¡Felicitaciones! Sí, se puede. Y como es en octubre, justo después de las elecciones, la separo ahora en el fondo de liquidez: así no depende de cómo esté el mercado esa semana.\"", sc: 25, d: "Separás hoy lo que se necesita pronto, sin esperar a ver qué pasa.", conf: 5 },
        { t: "\"Uy, justo ahora, con el mercado así... Esperemos a ver cómo viene después de las elecciones y ahí te confirmo si conviene sacar esa plata o si es mejor que la consigas por otro lado.\"", sc: 5, d: "Le transmitís tu duda y dejás su plata dependiendo del mercado.", conf: -3 }],
      incoh: (k, m, w, r) => k === "2" && !r.needOk ? "Le dijiste que separabas ahora los 8 mil, pero la propuesta no tiene esa plata en liquidez." : null,
      okKey: "Separaste hoy lo del casamiento. Vender algo en un mal mes duele, pero duele más tener que vender en octubre al precio que haya.",
      resp: ["¡Ay, gracias! Una preocupación menos. Estoy tan contenta...", "Bueno, pero que esté, eh. Es el casamiento de mi hija.", "Bueno, pero que esté, eh. Es el casamiento de mi hija."]
    },
    m: {
      via: "WhatsApp · domingo 17:00",
      dice: X => `Los bonos están regalados: el GD35 rinde ${fmt(X.L.tir35)}%. Ahora sí quiero poner todo ahí. Si sale bien la elección, vuela.`,
      nota: X => `<div class="callout"><b>En julio quería salir de todo lo argentino; en agosto quiere poner todo.</b><br>Una TIR de ≈ ${fmt(X.L.tir35)}% es alta porque el riesgo es alto. En julio también parecía barato, y siguió cayendo.</div>`,
      msgs: X => [
        { t: "\"Sí: con una TIR así, a estos precios es una oportunidad única. Pasemos todo al GD35 ahora, que cuando pasen las elecciones el riesgo país se desploma y esto vuela. Es ahora o nunca. Estas tasas no se ven todos los años.\"", sc: 5, d: "Una apuesta a un solo bono y a un solo resultado.", conf: 4 },
        { t: `"Puede volar o puede seguir cayendo: en julio también parecía barato. Una TIR de ${fmt(X.L.tir35)}% es alta porque el riesgo es alto. Si querés más bonos, sumemos una parte, sin pasar de un tamaño que puedas aguantar si sale mal."`, sc: 25, d: "Reconocés el atractivo, explicás de dónde sale esa TIR y volvés al tamaño.", conf: 3 },
        { t: "\"No, es demasiado riesgoso: ni un bono más hasta después de las elecciones. Con este nivel de incertidumbre puede pasar cualquier cosa, así que lo mejor es no tocar nada y esperar.\"", sc: 10, d: "Para un agresivo de largo plazo, sumar algo a estos precios era razonable. Cerrás sin explicar.", conf: -3 }],
      incoh(k, m, w) { return k === "1" && pct(w, "gd35") < 80 ? "Le dijiste que ponían todo en el GD35, pero la propuesta no lo hace." : k === "2" && pct(w, "gd35") > 50 ? `Le hablaste de un tamaño que pueda aguantar, pero el GD35 queda en ${pct(w, "gd35")}% de la cartera.` : null; },
      okKey: "No pasaste de un extremo al otro con él: una TIR alta es el precio de un riesgo alto, y el tamaño sigue siendo lo que se controla.",
      resp: ["Tiene sentido. Una parte, entonces.", "Vos siempre con el freno de mano...", "¡Vamos! Confirmo ya."]
    },
    leccion: X => ({ h: "Dos meses seguidos de caída. Una TIR alta no es un regalo: es el precio de un riesgo.",
      p: `El GD35 rinde ≈ ${fmt(X.L.tir35)}% porque el mercado duda. Puede salir muy bien o seguir cayendo, y en julio tampoco se sabía. Lo que no depende de la suerte: Graciela avisó que necesita plata en octubre, y esa plata se separa hoy, no en octubre.` }),
    cierreH: "La caída que siguió",
    cierreLead: "Julio no rebotó. Y en medio del ruido, llegó un retiro con fecha."
  },

  /* ================= SEPTIEMBRE 2027 ================= */
  { fecha: "Septiembre 2027", corto: "septiembre", infMes: "ago.",
    base: { rp: -40, tasa: -1, inf: 3.2, infEsp: 3.0, mep: 2, spx: 2, nvda: 5 },
    altF: { rp: 120, mep: 7 },
    cf: { p: "Fue un mes de espera. Así le habría ido a cada cartera si el mercado se asustaba otra vez:", a: X => `Riesgo país ${sg(X.F.rp, 0)} pb`, b: () => "Riesgo país +120 pb, dólar +7%" },
    need: { g: 8000 }, needTxt: "en octubre, para el casamiento",
    titular: X => ({ kick: "Mercados · Miércoles 15 de septiembre",
      h: `Un mes de espera: el riesgo país baja apenas a ${X.L.rp} puntos básicos y la inflación de agosto fue ${fmt(X.F.inf)}%, la más alta del año`,
      p: "El salto del dólar de julio y agosto empezó a pasar a los precios. El mercado espera las elecciones del mes que viene.",
      also: [["Bonos CER", "Cobran la inflación alta, pero siguen dependiendo de qué haga el dólar."], [`Dólar MEP: ${sg(X.F.mep)}%`, "Más tranquilo que en los meses anteriores."], ["Afuera", `El S&P 500 subió ${A(X.F.spx)}%.`]],
      chain: ["El salto del dólar de julio y agosto pasa a los precios", "Sube la inflación", "Los CER la cobran", "Pero medidos en dólares dependen de qué haga el MEP"] }),
    g: {
      via: "Llamado · jueves 9:00",
      dice: () => "Falta un mes para las elecciones y no pego un ojo. Decime la verdad: ¿qué pasa con mi plata según cómo salgan?",
      nota: () => `<div class="callout teal"><b>Pide una predicción. Lo que se le puede dar es un rango.</b><br>El dato "si las tasas suben 1 p.p., pierde..." sirve para esto: con una suba de 150 puntos básicos como la de agosto, la cartera pierde más o menos una vez y media ese número. Y lo del casamiento, si está separado, no se mueve.</div>`,
      msgs: () => { const s = C.met(hG(9), G(), 1).sens; return [
        { t: "\"Quedate tranquila, va a salir todo bien. El mercado ya descontó lo peor y después de las elecciones siempre viene la calma, así que tu cartera se va a recuperar sola. No hay nada de qué preocuparse.\"", sc: 5, d: "Prometés un resultado que no conocés.", conf: 2 },
        { t: `"No sé cómo van a salir, pero sí qué le pasa a tu cartera en cada caso: si el mercado se asusta como en agosto, puede bajar alrededor de ${fmt(s * 1.5)}%; si se calma, sube algo parecido. Y los 8 mil del casamiento no se mueven en ningún caso."`, sc: 25, d: "No predecís: le das el rango de lo que puede pasar con su cartera y le asegurás lo que sí depende de vos.", conf: 5 },
        { t: "\"Mi consejo es que no mires la cuenta hasta noviembre: con tanto ruido, verla subir y bajar todos los días solo te va a poner nerviosa. Cuando pase todo te llamo yo y te cuento cómo quedó. Así llegás tranquila al casamiento y sin amargarte.\"", sc: 8, d: "Evitar la información no la tranquiliza: lo que tranquiliza es entender qué puede pasar.", conf: -2 }]; },
      incoh: (k, m, w, r) => k === "2" && !r.needOk ? "Le dijiste que los 8 mil del casamiento no se mueven, pero no están separados en liquidez." : null,
      okKey: "Le diste un rango en vez de una predicción, y le aseguraste lo único que se podía asegurar: lo del casamiento.",
      resp: ["Bueno. Eso lo puedo aguantar. Gracias por decirme la verdad.", "Mmm. Igual no voy a dormir.", "Ojalá tengas razón..."]
    },
    m: {
      via: "WhatsApp · jueves 14:10",
      pes: () => C.met(hM(9), Mt(), 1).pesos,
      dice(X) { return this.pes() > 0 ? `La inflación fue ${fmt(X.F.inf)}%. Lo que tengo en pesos, ¿no conviene pasarlo todo a CER?` : `La inflación fue ${fmt(X.F.inf)}%. ¿No tendría que tener algo en CER para cubrirme?`; },
      nota: () => `<div class="callout"><b>Hay dos preguntas mezcladas.</b><br>Una: dentro de los pesos, ¿tasa fija o CER? El CER cobra la inflación; la LECAP, no. Otra, anterior: ¿cuántos pesos quiere tener? Porque contra una suba del dólar, ninguno de los dos lo cubre.</div>`,
      msgs: () => [
        { t: "\"Sí: con la inflación alta, el CER siempre gana, porque cobra todo lo que suben los precios y encima una tasa. Pasemos los pesos de la LECAP a CER y quedás cubierto contra cualquier cosa que pase de acá a fin de año. Es la mejor cobertura que existe en pesos y en dólares.\"", sc: 6, d: "Depende de la tasa real a la que comprás y de qué haga el dólar. \"Siempre\" no existe.", conf: 2 },
        { t: "\"El CER cobra la inflación, así que contra una LECAP a tasa fija te cubre si la inflación sigue alta. Pero contra el dólar no te cubre: si el MEP sube más que los precios, perdés medido en dólares. Antes de elegir cuál, decidamos cuántos pesos querés tener.\"", sc: 25, d: "Separás las dos preguntas: qué instrumento en pesos, y cuántos pesos.", conf: 4 },
        { t: "\"Ninguna de las dos: salí de todos los pesos ya. Con las elecciones cerca, el dólar va a saltar seguro y cualquier cosa en pesos pierde. Pasemos todo a dólares hoy y después vemos.\"", sc: 10, d: "Puede ser razonable, pero es otra apuesta, y sin explicar.", conf: 0 }],
      incoh(k, m, w) { return k === "1" && pct(w, "cer") === 0 ? "Le dijiste que el CER convenía, pero la propuesta no lo incluye." : k === "3" && m.pesos > 0 ? "Le dijiste que salían de todos los pesos, pero la propuesta los mantiene." : null; },
      okKey: "Separaste dos preguntas que suelen mezclarse: CER contra tasa fija, y pesos contra dólares.",
      resp: ["Claro, son dos cosas distintas. Ok.", "Mmm, bueno.", "Dale, confirmo."]
    },
    leccion: () => ({ h: "CER contra tasa fija es una pregunta; pesos contra dólares es otra.",
      p: "Con inflación alta, el CER le gana a una LECAP. Pero los dos están en pesos: si el dólar sube más que los precios, los dos pierden medidos en dólares. Primero se decide cuántos pesos tener; después, en qué. Y cuando un cliente pide una predicción, lo que se le puede dar es un rango: cuánto puede bajar su cartera y cuánto puede subir." }),
    cierreH: "El mes de la espera",
    cierreLead: "Poco movimiento en los precios y mucha ansiedad en los clientes."
  },

  /* ================= OCTUBRE 2027 ================= */
  { fecha: "Octubre 2027", corto: "octubre", infMes: "sep.",
    base: v => v === "A" ? { rp: -230, tasa: -5, inf: 2.8, infEsp: 2.9, mep: -4, spx: 1, nvda: 1 } : { rp: 180, tasa: 5, inf: 2.8, infEsp: 2.9, mep: 10, spx: 1, nvda: 1 },
    altF: v => v === "A" ? { rp: 180, tasa: 5, mep: 10 } : { rp: -230, tasa: -5, mep: -4 },
    cf: { p: "Antes de las elecciones nadie sabía cómo iba a reaccionar el mercado. Así le habría ido a cada cartera en los dos casos:", a: X => X.v === "A" ? "El mercado se calmó" : "El mercado se asustó", b: X => X.v === "A" ? "El mercado se asustaba" : "El mercado se calmaba" },
    flujo: { g: -8000 }, motivo: "el casamiento",
    titular: X => X.v === "A" ? ({ kick: "Mercados · Lunes 25 de octubre",
      h: `Pasaron las elecciones y el mercado respiró: el riesgo país cayó a ${X.L.rp} puntos básicos y el dólar MEP bajó ${A(X.F.mep)}%`,
      p: "El mercado leyó el resultado como menos incertidumbre para los próximos años. Los bonos largos, los más castigados en julio y agosto, fueron los que más subieron.",
      also: [["Tasas en pesos", `Bajaron a ${fmt(X.L.tasa, X.L.tasa % 1 ? 1 : 0)}% anual.`], ["Bonos largos", `El GD35 subió ${A(X.ret.gd35)}% en el mes.`], ["Afuera", `El S&P 500, ${sg(X.F.spx)}%.`]],
      chain: ["Menos incertidumbre", "Baja la TIR que se le pide a la Argentina", "Suben los bonos, más cuanto más duration", "Baja el dólar: lo que está en pesos gana medido en dólares"] })
      : ({ kick: "Mercados · Lunes 25 de octubre",
      h: `Pasaron las elecciones y el mercado reaccionó mal: el riesgo país saltó a ${X.L.rp} puntos básicos y el dólar MEP subió ${A(X.F.mep)}%`,
      p: "El mercado leyó el resultado como más incertidumbre para los próximos años. Los bonos largos volvieron a ser los más golpeados.",
      also: [["Tasas en pesos", `Subieron a ${fmt(X.L.tasa, X.L.tasa % 1 ? 1 : 0)}% anual.`], ["Bonos largos", `El GD35 cayó ${A(X.ret.gd35)}% en el mes.`], ["Afuera", `El S&P 500, ${sg(X.F.spx)}%.`]],
      chain: ["Más incertidumbre", "Sube la TIR que se le pide a la Argentina", "Caen los bonos, más cuanto más duration", "Salta el dólar: lo que está en pesos pierde medido en dólares"] }),
    g: {
      via: "Llamado · martes 9:10",
      listo: () => C.retiro(G(), 10).vendido < 1,
      dice(X) { return X.v === "A" ? "¡Subió todo! ¿Viste? Al final no pasó nada. Che, y ahora que terminó el lío, ¿por qué no ponemos todo en los bonos largos, que son los que más suben?"
        : "¡Qué desastre! Decime que lo del casamiento estaba aparte... Y con el resto, ¿qué hacemos? ¿Vendemos todo?"; },
      nota(X) { return X.v === "A" ? `<div class="callout"><b>Salió bien, y ahora quiere más riesgo.</b><br>Que el mercado haya subido no cambia su perfil: sigue siendo una jubilada que quiere dormir tranquila. Los bonos largos subieron mucho porque antes habían caído mucho.</div>`
        : `<div class="callout"><b>Salió mal, y quiere vender todo.</b><br>Su cartera ${Rm(hG(10), X) < 0 ? "bajó" : "se movió"} ${A(Rm(hG(10), X))}% en el mes; el GD35, ${A(X.ret.gd35)}%. Compará en el cuadro de abajo con la cartera que heredaste.</div>`; },
      msgs(X) { return X.v === "A" ? [
        { t: "\"Sí, ahora que pasó el riesgo, vayamos a los bonos largos, que son los que más suben cuando baja el riesgo país. Ya no hay motivo para ser tan prudentes y así recuperamos lo que dejamos de ganar.\"", sc: 5, d: "El riesgo no \"pasó\": los bonos largos siguen moviéndose mucho, y ella sigue siendo conservadora.", conf: 2 },
        { t: "\"Me alegro de que haya salido bien, pero no lo sabíamos. Y tu perfil no cambió con la elección: seguís necesitando una cartera que no te quite el sueño. Los bonos largos suben más, y también caen más. La dejamos como está.\"", sc: 25, d: "No te quedás con el crédito de la suerte y le recordás que el perfil no depende del mercado.", conf: 4 },
        { t: "\"¿Viste? Te dije que no iba a pasar nada. Las elecciones siempre asustan antes y después no pasa nada, así que la próxima vez ya sabés: ni te preocupes y dejá todo como está. El mercado argentino es así, hay que acostumbrarse.\"", sc: 5, d: "Te adjudicás un resultado que no podías saber. La próxima vez puede salir al revés.", conf: 1 }] : [
        { t: "\"Sí, vendamos todo antes de que siga cayendo. El mercado reaccionó mal y esto puede ser recién el comienzo: pasemos al fondo de liquidez y esperemos ahí hasta que aclare.\"", sc: 5, d: "Vender todo después de la caída convierte una baja en una pérdida definitiva.", conf: 1 },
        { t: `"Fue un mes malo, pero tu cartera está armada para esto: se movió ${sg(Rm(hG(10), X))}%, mucho menos que los bonos largos. Lo del casamiento ya lo retiraste. No hay nada que tengamos que vender apurados."`, sc: 25, d: "Le mostrás con números que el plan funcionó cuando hacía falta.", conf: 5 },
        { t: "\"Ya va a volver, quedate tranquila. Después de una caída así, el mercado siempre rebota, como pasó a principio de año: es cuestión de tener paciencia y no mirar la cuenta.\"", sc: 6, d: "Una promesa. En febrero viste que no siempre vuelve.", conf: 0 }]; },
      incoh(k, m, w, r, X) { const rot = C.rot(G(), 10);
        if (k === "2" && rot > 10) return "Le dijiste que no hacía falta tocar la cartera, pero la propuesta la cambia.";
        if (X.v === "A" && k === "1" && pct(w, "gd35") < 40) return "Le dijiste que iban a los bonos largos, pero la propuesta no lo hace.";
        if (X.v === "B" && k === "1" && m.arg > 20) return "Le dijiste que vendían todo, pero la propuesta no lo hace.";
        return null; },
      okKey: X => X.v === "A" ? "No cambiaste el perfil de Graciela porque el mercado subió. Lo que salió bien fue suerte; lo que estuvo bien fue la cartera." : "En el mes malo, la cartera hizo lo que tenía que hacer: bajar poco. No vendiste apurada.",
      shock() { return this.listo() ? [3, "El retiro del casamiento estuvo listo sin vender nada."] : [-5, "Para el casamiento hubo que vender bonos al precio de esa semana."]; },
      resp: ["Tenés razón. Lo importante es que el casamiento está pago y yo duermo.", "Bueno... si vos decís.", "Dale, hacelo."]
    },
    m: {
      via: "WhatsApp · lunes 22:40",
      arg: () => C.met(hM(10), Mt(), 1).arg,
      dice(X) { const t = this.arg() >= 15;
        if (X.v === "A") return t ? "¡Vamos! Los bonos volaron. Ahora vendamos todo y tomemos la ganancia, ¿no?" : "Los bonos volaron y nosotros afuera. ¿Entramos ahora antes de que sigan subiendo?";
        return t ? "Salió mal. Perdí un montón con los bonos. ¿Vendemos todo antes de que sea peor?" : "Menos mal que salimos. ¿Y ahora? Los bonos están regalados, ¿compramos todo?"; },
      nota(X) { return `<div class="callout"><b>Su cartera ${Rm(hM(10), X) >= 0 ? "ganó" : "perdió"} ${A(Rm(hM(10), X))}% en el mes.</b><br>Mirá en el cuadro de abajo cuánto habría sido en el otro resultado. En agosto nadie sabía cuál de los dos iba a tocar. Lo que quiere hacer ahora es decidir apurado por el movimiento de un mes.</div>`; },
      msgs(X) { return [
        { t: "\"Sí, hagámoslo ya, antes de que el precio cambie. Después de un movimiento así, hay que actuar rápido: te armo la orden hoy mismo por el total y la confirmás apenas la veas, sin darle más vueltas.\"", sc: 5, d: "Decidir apurado por lo que pasó en un mes: es correr detrás del precio.", conf: 2 },
        { t: "\"El resultado de un mes no dice si la decisión fue buena: en agosto no sabíamos esto, y pudo salir al revés. Volvamos a la pregunta de siempre: cuánto riesgo argentino querés tener para los próximos 5 años. Ajustamos a ese tamaño, sin apuro.\"", sc: 25, d: "Separás el resultado de la decisión y volvés a lo que se puede decidir: el tamaño.", conf: 4 },
        { t: X.v === "A" === (this.arg() >= 15) ? "\"¿Viste que yo tenía razón?\"" : "\"Nadie podía saberlo, no es mi culpa.\"", sc: 6, d: "Hablás de vos, no de su cartera. Ni el acierto ni el error eran previsibles.", conf: -2 }]; },
      incoh(k) { return k === "1" && C.rot(Mt(), 10) < 10 ? "Le dijiste que lo hacían ya, pero la propuesta casi no cambia." : null; },
      key(m) { return m.arg < 10 ? "Quedó casi sin riesgo argentino. Para un agresivo de largo plazo, eso es una apuesta a que al país le va a ir mal, no una posición neutral." : null; },
      okKey: "No corriste detrás del precio. El tamaño del riesgo argentino se decide por el horizonte de Martín, no por el mes que pasó.",
      resp: ["Ok. Tenés razón, me dejé llevar. Lo ajustamos tranquilos.", "Mmm, yo lo haría ya.", "¡Dale!"]
    },
    leccion: X => ({ h: X.v === "A" ? "Salió bien. En agosto, nadie lo sabía." : "Salió mal. En agosto, nadie lo sabía.",
      p: `Mirá el cuadro "lo que pasó y lo que podía pasar": la misma cartera habría tenido un mes muy distinto con el otro resultado. Lo que protegió a Graciela no fue adivinar: fue tener separado lo del casamiento y un riesgo acorde a su perfil. ${X.v === "A" ? "Que el mercado haya subido no convierte en buena idea haber apostado todo." : "Que el mercado haya caído no convierte en mala idea haber tenido una parte."} Si jugás este año de nuevo con otros números, el resultado de la elección puede ser el contrario.` }),
    cierreH: "El día después",
    cierreLead: "Pasó el evento que los tuvo en vilo tres meses. Ahora los dos clientes quieren actuar rápido."
  },

  /* ================= NOVIEMBRE 2027 ================= */
  { fecha: "Noviembre 2027", corto: "noviembre", infMes: "oct.",
    base: v => v === "A" ? { rp: -40, tasa: -1, inf: 2.6, infEsp: 2.7, mep: 1, spx: 2, nvda: 3 } : { rp: 30, tasa: 1, inf: 2.6, infEsp: 2.5, mep: 3, spx: 2, nvda: 3 },
    altF: v => v === "A" ? { rp: 60, mep: 4 } : { rp: -60, mep: 0 },
    cf: { p: "El último mes del año, en los dos casos:", a: X => `Riesgo país ${sg(X.F.rp, 0)} pb`, b: X => X.v === "A" ? "Riesgo país +60 pb" : "Riesgo país −60 pb" },
    titular: X => ({ kick: "Mercados · Viernes 19 de noviembre",
      h: `Cierra un año movido: el riesgo país termina noviembre en ${X.L.rp} puntos básicos, contra 857 de hace doce meses`,
      p: "El mercado se acomodó después de las elecciones. Para los asesores, es el momento de sentarse con cada cliente a repasar el año.",
      also: [[`Inflación de octubre: ${fmt(X.F.inf)}%`, "Todavía alta, pero bajando."], [`Dólar MEP: $${X.L.mep.toLocaleString("es-AR")}`, `Subió ${fmt((X.L.mep / 1500 - 1) * 100, 0)}% en doce meses.`], ["Wall Street", `El S&P 500 cierra el año ${sg((X.L.spy - 1) * 100, 0)}%.`]],
      chain: ["Termina el año", "Los clientes miran el resultado", "Y lo comparan con lo que mejor salió", "El asesor explica qué función cumplió la cartera"] }),
    g: {
      via: "Reunión · jueves 16:00",
      dice: () => "Bueno, querida, pasó un año. ¿Cómo me fue? ¿Gané o perdí? Mi sobrino dice que tengo que compararlo con lo que daba el plazo fijo.",
      nota(X) { return `<div class="callout teal"><b>El balance del año.</b><br>En dólares, su cartera rindió ${sg(C.acum(G(), 11))}% en doce meses. La que heredaste, sin tocar, habría rendido ${sg(C.acumHer(G(), 11))}%. Pero el número solo no cuenta la historia: hubo dos retiros, y meses en que la cartera heredada habría caído mucho más.</div>`; },
      msgs() { const a = sg(C.acum(G(), 11)); return [
        { t: "\"Bien, aunque podríamos haber ganado más con los bonos largos, que fueron lo mejor del año. El año que viene arriesgamos un poco más, así te queda una diferencia más grande y le ganás tranquila al plazo fijo. Con todo lo que aprendimos este año, seguro se puede.\"", sc: 5, d: "Juzgás el año comparando con lo que mejor salió, y le cambiás el perfil por eso.", conf: 1 },
        { t: `"En dólares, tu cartera rindió ${a}% en el año. Y cumplió para lo que estaba: arreglaste el techo y ayudaste con el casamiento sin vender nada apurada, y en los meses feos se movió poco. Compararla con un plazo fijo en pesos no sirve: vos medís en dólares."`, sc: 25, d: "Le das el número y, sobre todo, le explicás qué función cumplió la cartera.", conf: 5 },
        { t: `"Rindió ${a}% en dólares en el año. Es un número razonable para una cartera conservadora en un año con elecciones; el detalle de cada mes lo tenés en el resumen de cuenta que te manda el broker."`, sc: 10, d: "Un número sin contexto: no sabe si es bueno o malo, ni para qué sirvió.", conf: 0 }]; },
      incoh(k, m) { return k === "1" && m.sens <= 2.5 ? "Le dijiste que iban a arriesgar más, pero la propuesta no lo hace." : null; },
      okKey: "Cerraste el año explicándole qué función cumplió su cartera, no solo cuánto rindió.",
      resp: ["Gracias, querida. Fue un año bravo y yo dormí bien. Seguimos el año que viene.", "Ah, bueno. ¿Y eso es mucho o poco?", "Bueno, sí, quiero ganar un poco más."]
    },
    m: {
      via: "Videollamada · viernes 19:00",
      dice: () => "Cierre de año. ¿Le gané al S&P? Porque si no le gano, compro SPY y listo, me ahorro el trabajo.",
      nota(X) { return `<div class="callout"><b>El balance del año.</b><br>Su cartera rindió ${sg(C.acum(Mt(), 11))}% en dólares; el S&P 500, ${sg((X.L.spy - 1) * 100)}%. La que heredaste, sin tocar, habría rendido ${sg(C.acumHer(Mt(), 11))}%. La comparación con el S&P tiene sentido para la parte de acciones, no para toda la cartera.</div>`; },
      msgs(X) { const a = sg(C.acum(Mt(), 11)), s = sg((X.L.spy - 1) * 100); return [
        { t: "\"Tu amigo tuvo un buen año, pero el que viene le ganamos seguro: pasamos más plata a acciones de Estados Unidos, sacamos los bonos argentinos que frenaron la cartera y listo. No te vas a quedar atrás de nuevo. Con tu perfil y tu horizonte, es lo que corresponde hacer.\"", sc: 4, d: "Prometés un resultado.", conf: 2 },
        { t: `"Tu cartera rindió ${a}% en dólares; el S&P, ${s}%. Compararte con el S&P sirve para la parte de acciones, pero también tenés bonos argentinos, que se mueven por otros motivos. Si querés parecerte más al S&P, es decidir cuánto riesgo argentino tener: lo podemos ver."`, sc: 25, d: "Das los dos números, explicás por qué no son comparables del todo y le devolvés la decisión.", conf: 4 },
        { t: "\"Compararse con el S&P no sirve para nada: son cosas distintas y cada cartera es un mundo. Tu amigo seguro te cuenta solo lo que le salió bien. Lo importante es que vos ganaste, y con eso alcanza.\"", sc: 8, d: "Descartás una pregunta razonable sin explicar.", conf: -3 }]; },
      okKey: "Cerraste el año con los números sobre la mesa y la comparación bien planteada.",
      resp: ["Bien. Me gusta que me lo plantees así. Lo pienso para el año que viene.", "Mmm. No me contestaste.", "¡Así me gusta!"]
    },
    leccion: () => ({ h: "Un año se juzga por si la cartera cumplió su función, no por un solo número.",
      p: "Al cierre, todos comparan con lo que mejor salió. La cartera de Graciela no estaba para ganarle al bono largo: estaba para pagar un techo y un casamiento sin sobresaltos. La de Martín, para crecer a 5 años aguantando caídas. Ahora viene el repaso de tus doce decisiones." }),
    cierreH: "Cierre del año",
    cierreLead: "Doce meses, veinticuatro decisiones. Lo último: explicarle el año a cada cliente."
  }
  ];
})();
