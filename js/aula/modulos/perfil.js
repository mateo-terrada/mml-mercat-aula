/* ============================================================
   MÓDULO · Perfil, riesgo y carteras
   Base: capítulos 2, 3 y 7 del Book, reescritos en lecciones cortas.
   ============================================================ */
window.AULA = window.AULA || { modulos: {} };

AULA.modulos.perfil = {
  id: "perfil",
  numero: "02",
  titulo: "Perfil, riesgo y carteras",
  bajada: "Antes de elegir un instrumento, entender a la persona: qué puede tolerar, para qué invierte y cómo se arma una cartera que la deje dormir tranquila.",
  fuente: "Book, capítulos 2, 3 y 7",
  practica: [
    { titulo: "Decisiones de rotación", desc: "Compará instrumentos lado a lado y decidí qué le conviene a cada cliente.", href: "simulador.html" },
    { titulo: "¿Qué hago si...?", desc: "Árboles de decisión con clientes reales y trampas conceptuales.", href: "simulador.html" }
  ],
  evaluacion: {
    cantidad: 10,
    ids: ["PORT-MC-001","PORT-MC-002","PORT-MC-003","PORT-MC-004","PORT-MC-005","PORT-MC-006","PORT-MC-007",
          "PORT-MC-011","PORT-MC-012","PORT-MC-013","PORT-MC-014","PORT-MC-015","PORT-MC-016","PORT-MC-017",
          "TRAMPA-MC-001","TRAMPA-MC-011","TRAMPA-MC-018","TRAMPA-MC-020","TRAMPA-MC-021",
          "PORT-CASO-001","PORT-CASO-002"]
  },
  lecciones: [

  /* ------------------------------------------------------------ */
  {
    id: "p1",
    titulo: "El perfil no es de la persona, es del objetivo",
    minutos: 8,
    objetivo: "Reconocer los cinco factores que definen un perfil y entender por qué un mismo cliente puede tener dos perfiles a la vez.",
    bloques: [
      { t: "p", html: `Cuando un cliente se sienta frente a vos, la tentación es preguntarle "¿qué querés comprar?". El orden correcto es el inverso: primero entender <em>quién es y para qué invierte</em>, después elegir instrumentos. A eso lo llamamos <span class="term" data-term="perfil">perfil del inversor</span>.` },
      { t: "p", html: `El perfil responde una pregunta simple: <strong>¿cuánta incertidumbre puede tolerar esta persona, y qué espera ganar a cambio?</strong> Se suele resumir en tres tipos (conservador, moderado y agresivo), pero lo interesante está en lo que hay debajo.` },
      { t: "h", texto: "Los cinco factores que lo definen" },
      { t: "lista", items: [
        `<strong>Tolerancia al riesgo.</strong> ¿Cuánto puede caer su inversión sin que entre en pánico y venda en el peor momento?`,
        `<strong>Horizonte.</strong> ¿Cuándo va a necesitar la plata? A 1 año no hay tiempo de recuperarse de una caída; a 15 años, sí.`,
        `<strong>Situación financiera.</strong> Ingresos, estabilidad laboral, colchón de emergencia. No es lo mismo invertir el excedente que invertir los ahorros de toda una vida.`,
        `<strong>Objetivo.</strong> ¿Preservar, generar una renta o hacer crecer el patrimonio? ¿Necesita cobrar algo todos los meses?`,
        `<strong>Conocimiento.</strong> Alguien que no entiende un instrumento suele asustarse más cuando se mueve. Lo desconocido se vive como más riesgoso.`
      ]},
      { t: "idea", titulo: "La idea central de la lección", html: `El perfil depende del <strong>objetivo</strong>, no solo de la persona. Un mismo cliente puede ser conservador con la plata que va a usar para comprar un departamento el año que viene y agresivo con lo que ahorra para su jubilación dentro de 20 años. Por eso, en vez de "¿qué perfil es Juan?", conviene preguntar "¿qué perfil tiene <em>esta plata</em> de Juan?".` },
      { t: "ejemplo", titulo: "Un cliente, dos perfiles", pasos: [
        `Carlos tiene 52 años y USD 80.000. Te cuenta que en 12 meses quiere ayudar a su hija con USD 30.000 para la entrada de un departamento. El resto "no lo piensa tocar hasta jubilarse".`,
        `<strong>Los USD 30.000:</strong> horizonte de 1 año, uso concreto y fecha conocida. Si caen un 15% justo antes de necesitarlos, el problema es real. Perfil conservador: instrumentos cortos, de buena calidad y fáciles de vender.`,
        `<strong>Los USD 50.000:</strong> horizonte de 10 a 13 años, sin uso previsto. Acá puede asumir más volatilidad, porque el tiempo juega a su favor. Perfil moderado (o más, según su tolerancia real).`
      ], conclusion: `Si hubieras armado una sola cartera "moderada" con los USD 80.000, el riesgo de no llegar con la plata del departamento habría sido innecesario.` },
      { t: "ej", id: "e1", tipo: "mc",
        enunciado: `Graciela, de 63 años, cobra una jubilación que le alcanza para vivir. Tiene USD 40.000 que heredó y te dice: "Es para mis nietos, no lo voy a tocar en por lo menos 15 años. Igual, si baja mucho me pongo nerviosa". ¿Cuál es la lectura más profesional?`,
        opciones: [
          { txt: "Conservadora: por su edad y porque se pone nerviosa le corresponde renta fija corta, aunque piense dejar la plata 15 años.", ok: false, fb: "La edad es un indicio, pero no decide sola. Su horizonte es de 15 años y no depende de esta plata para vivir." },
          { txt: "Moderada cuidando las caídas: el horizonte permite riesgo, su tolerancia lo limita, y hay que anticiparle cuánto puede bajar.", ok: true, fb: "Exacto. Horizonte y situación empujan hacia más riesgo; la tolerancia lo frena. La solución es un punto intermedio, con la conversación sobre caídas hecha antes, no durante." },
          { txt: "Agresiva: con 15 años por delante y la jubilación cubierta, puede tener casi todo en acciones y aguantar las bajas.", ok: false, fb: "El horizonte lo permitiría, pero ella misma dijo que se pone nerviosa. Una cartera que la haga vender en pánico en la primera caída es peor que una más prudente." },
          { txt: "Todavía no se puede definir: primero hay que hacerle el test de perfil formal y recién ahí pensar la cartera.", ok: false, fb: "El test formal es obligatorio, pero ya tenés información suficiente para una lectura. El test confirma; el criterio lo ponés vos." }
        ],
        explicacion: `Los factores no siempre apuntan para el mismo lado. Cuando chocan, el que manda en la práctica suele ser la <strong>tolerancia real</strong>: una cartera que el cliente abandona en la primera caída no sirve, por buena que sea en teoría.` },
      { t: "h", texto: "Lo que dice el cliente vs. lo que hace" },
      { t: "p", html: `Casi nadie se declara "conservador" porque suena a poco ambicioso, y muchos se declaran "agresivos" en un mercado que viene subiendo. La pregunta que más información da no es "¿qué perfil sos?", sino <strong>"¿qué hiciste la última vez que tus inversiones cayeron fuerte?"</strong>. El comportamiento pasado predice mucho mejor que la autodefinición.` },
      { t: "ojo", titulo: "Trampa frecuente", html: `"Quiero ser agresivo porque escuché que en la bolsa se gana mucho" no es un perfil agresivo: es una expectativa de ganancia sin conciencia del riesgo. Antes de aceptarlo, preguntá cuánto tiempo puede esperar, qué pasa si la cartera cae un 25% y si alguna vez vivió una caída así.` },
      { t: "ej", id: "e2", tipo: "multi",
        enunciado: `Un cliente nuevo, de 34 años, te pide "una cartera bien agresiva". Marcá <strong>todas</strong> las preguntas que realmente te ayudan a validar ese perfil.`,
        opciones: [
          { txt: "¿Cuándo vas a necesitar esta plata?", ok: true, fb: "Clave: sin horizonte largo no hay perfil agresivo que aguante." },
          { txt: "¿Tenés un fondo para emergencias aparte de esto?", ok: true, fb: "Si no lo tiene, cualquier imprevisto lo obliga a vender en el peor momento." },
          { txt: "¿Qué acciones o empresas te gustan más?", ok: false, fb: "Es una pregunta de producto, no de perfil. Puede venir después." },
          { txt: "Si en seis meses la cartera vale 25% menos, ¿qué harías?", ok: true, fb: "Es la pregunta que separa la tolerancia declarada de la real." },
          { txt: "¿Cuánto te gustaría ganar por año?", ok: false, fb: "Sirve para calibrar expectativas, pero por sí sola no valida el perfil: todos quieren ganar mucho." }
        ],
        explicacion: `Validar un perfil es buscar evidencia de que la persona <em>puede</em> y <em>está dispuesta</em> a atravesar caídas: horizonte, colchón y reacción ante pérdidas.` },
      { t: "cliente", titulo: "Cómo se lo explicás al cliente", html: `"No te voy a preguntar solo qué te gustaría ganar, sino para qué es esta plata y cuándo la vas a necesitar. Puede que te arme dos carteras distintas: una tranquila para lo que tenés que usar pronto y otra más ambiciosa para lo que puede esperar."` }
    ]
  },

  /* ------------------------------------------------------------ */
  {
    id: "p2",
    titulo: "Qué es el riesgo (y qué no es)",
    minutos: 9,
    objetivo: "Distinguir volatilidad de pérdida permanente y reconocer los riesgos que más pesan en una cartera argentina.",
    bloques: [
      { t: "p", html: `En el lenguaje de todos los días, "riesgo" es la chance de perder. En finanzas es un poco más amplio: es la <strong>incertidumbre sobre el resultado</strong>. Un activo que un año gana 30% y al siguiente pierde 15% es más riesgoso que otro que rinde 5% todos los años, aunque en promedio el primero gane más.` },
      { t: "idea", titulo: "La regla que no tiene excepciones", html: `Más rendimiento esperado viene, casi siempre, con más riesgo. No existe en un mercado competitivo algo que rinda mucho, sea seguro y se pueda vender en cualquier momento. Cuando alguien promete eso, o no entendió el riesgo o lo está escondiendo.` },
      { t: "h", texto: "Volatilidad no es lo mismo que pérdida" },
      { t: "p", html: `La <span class="term" data-term="volatilidad">volatilidad</span> es cuánto sube y baja un precio en el camino. La <strong>pérdida permanente</strong> es que la plata no vuelva. Son cosas distintas:` },
      { t: "tabla", cab: ["Caso", "Volatilidad", "Riesgo de pérdida permanente"], filas: [
        ["Un ETF que replica el S&P 500, mirado a 10 años", "Alta (años de −20%)", "Bajo: históricamente se recuperó"],
        ["Un bono de un emisor en problemas que casi no se mueve", "Baja", "Alto: puede no pagar"],
        ["Una sola acción chica de moda", "Altísima", "Alto: la empresa puede no recuperarse"]
      ], nota: "La volatilidad se ve todos los días en la pantalla; la pérdida permanente se ve una sola vez, cuando ya es tarde." },
      { t: "ej", id: "e1", tipo: "mc",
        enunciado: `Un cliente te dice: "Este bono es súper seguro, mirá: hace tres meses que no se mueve". ¿Qué le respondés?`,
        opciones: [
          { txt: "Tiene razón: si el precio casi no se mueve, el riesgo es bajo y es un buen lugar para estacionar plata.", ok: false, fb: "Esa es justamente la confusión: poca volatilidad no garantiza que el emisor pague." },
          { txt: "Que no se mueva habla de su volatilidad, no de si el emisor va a pagar: eso hay que mirarlo aparte.", ok: true, fb: "Bien. Si además rinde mucho más que bonos parecidos, eso es una señal para investigar, no una ganga." },
          { txt: "Que no se mueva indica que nadie lo opera, así que conviene venderlo antes de que sea tarde.", ok: false, fb: "Puede ser poco líquido, pero eso no implica venderlo automáticamente. Es una conclusión apresurada." }
        ],
        explicacion: `En renta fija, el riesgo más importante (el de no cobrar) muchas veces no se ve en el precio diario hasta que se materializa.` },
      { t: "h", texto: "Los riesgos que más pesan en Argentina" },
      { t: "lista", items: [
        `<strong>Riesgo de crédito:</strong> que el emisor no pague o reestructure. Con el soberano argentino no es teórico: pasó varias veces, la última en 2020.`,
        `<strong>Riesgo de tipo de cambio:</strong> si invertís en pesos y el dólar salta, perdés poder de compra en dólares. Si invertís en dólares y el dólar se queda quieto con inflación, también perdés poder de compra en pesos.`,
        `<strong>Riesgo de inflación:</strong> que lo que ganás nominalmente no alcance para compensar la suba de precios.`,
        `<strong>Riesgo de tasa:</strong> si las tasas del mercado suben, los bonos que ya tenés valen menos. Lo vemos a fondo en el módulo de renta fija.`,
        `<strong>Riesgo de liquidez:</strong> que necesites vender y no haya compradores a un precio razonable. Típico de ONs chicas o de bonos CER en dólares.`
      ]},
      { t: "h", texto: "El riesgo que se puede diversificar y el que no" },
      { t: "p", html: `Si un cliente tiene toda su plata en una sola acción, está expuesto a todo lo que le pase a esa empresa. Si la reparte entre 20 empresas de distintos sectores, que le vaya mal a una pesa poco. Ese riesgo "propio de cada empresa" se llama <strong>riesgo específico</strong>, y la diversificación lo reduce muchísimo.` },
      { t: "p", html: `Pero hay un riesgo que la diversificación no toca: el <strong>riesgo de mercado o sistémico</strong>. Cuando sube fuerte el riesgo país, caen juntos los bonos soberanos, las ONs y las acciones argentinas. Tener diez activos argentinos distintos no protege contra un shock argentino.` },
      { t: "mercado", titulo: "Lo que pasó en estos meses", html: `El riesgo país pasó de unos <strong>430 puntos básicos en julio</strong> a <strong>939 el 6 de noviembre</strong>, su nivel más alto en más de un año, con dudas sobre los vencimientos de deuda de 2027 y 2028. Un cliente "diversificado" solo en activos argentinos lo sintió en toda la cartera a la vez. Esa es la diferencia entre diversificar <em>instrumentos</em> y diversificar <em>riesgos</em>.`, fuente: "Invecq / Forbes Argentina, noviembre 2026" },
      { t: "ej", id: "e2", tipo: "mc",
        enunciado: `Un cliente tiene AL30, GD35, una ON de YPF y acciones de Pampa. Te dice: "Estoy bien diversificado, tengo cuatro cosas distintas". ¿Qué le falta entender?`,
        opciones: [
          { txt: "Nada: combina soberanos, una ON y acciones, que son tres clases de activo distintas.", ok: false, fb: "Son instrumentos distintos, pero comparten el mismo riesgo de fondo." },
          { txt: "Que todos dependen del riesgo argentino: ante un shock local, es probable que caigan todos juntos.", ok: true, fb: "Exacto. Diversificar es combinar activos que no reaccionen igual ante el mismo evento." },
          { txt: "Que le convendría pasar todo a bonos, porque las acciones son lo que hace riesgosa la cartera.", ok: false, fb: "Eso cambia el nivel de riesgo, pero no resuelve el problema de concentración en Argentina." }
        ],
        explicacion: `Una buena pregunta para el cliente: "¿Qué evento haría caer todo lo que tenés al mismo tiempo?". Si la respuesta es "una crisis argentina", la cartera está concentrada aunque tenga muchos tickers.` }
    ]
  },

  /* ------------------------------------------------------------ */
  {
    id: "p3",
    titulo: "El triángulo: liquidez, riesgo y rentabilidad",
    minutos: 7,
    objetivo: "Usar el triángulo para explicarle a un cliente por qué ningún instrumento lo tiene todo.",
    bloques: [
      { t: "p", html: `Hay tres cosas que cualquier inversor quiere: que la plata <strong>rinda</strong>, que <strong>no se pierda</strong> y poder <strong>sacarla cuando quiera</strong>. El problema es que no se pueden tener las tres al máximo a la vez. Siempre se resigna algo.` },
      { t: "grafico", id: "triangulo" },
      { t: "lista", items: [
        `<strong>Liquidez + seguridad:</strong> se resigna rendimiento. Caución corta, fondo money market, cuenta remunerada.`,
        `<strong>Rendimiento + liquidez:</strong> se resigna seguridad. Acciones líderes o bonos soberanos largos: se venden en segundos, pero el precio puede estar mucho más abajo ese día.`,
        `<strong>Rendimiento + seguridad:</strong> se resigna liquidez. Instrumentos a plazo que hay que esperar, o activos poco negociados que pagan un premio por inmovilizarse.`
      ]},
      { t: "idea", titulo: "Cómo usarlo con un cliente", html: `Cuando un cliente pide "algo que rinda mucho, sin riesgo y que pueda sacar mañana", el triángulo te permite responder sin decir que no: <em>"Elegí dos de las tres y te muestro qué opciones hay"</em>. La conversación pasa de un pedido imposible a una decisión.` },
      { t: "ej", id: "e1", tipo: "mc",
        enunciado: `Un cliente quiere estacionar pesos que va a usar en 20 días para pagar una seña, sin sorpresas. ¿Qué vértice del triángulo debería resignar?`,
        opciones: [
          { txt: "Liquidez: que la inmovilice unos meses en algo más largo, que paga una tasa bastante mayor.", ok: false, fb: "Necesita la plata en 20 días: la liquidez no se negocia." },
          { txt: "Seguridad: que compre una acción líder, que se vende en segundos y puede subir en el mes.", ok: false, fb: "Si baja, no llega con la seña. La seguridad tampoco se negocia." },
          { txt: "Rentabilidad: algo corto y seguro, como caución o una LECAP que venza antes del pago.", ok: true, fb: "Exacto. Para plata con destino y fecha, el rendimiento es lo que se resigna." }
        ],
        explicacion: `Para plata con fecha de uso cercana, el orden de prioridades es casi siempre: <strong>seguridad → liquidez → rendimiento</strong>.` },
      { t: "ojo", titulo: "La liquidez también tiene matices", html: `"Se puede vender" no es lo mismo que "se puede vender bien". Una ON con poco volumen se puede vender, pero quizás con un descuento grande respecto del último precio. Antes de prometer liquidez, mirá la <span class="term" data-term="puntas">caja de puntas</span>: cuántos compradores hay y a qué precio.` },
      { t: "ej", id: "e2", tipo: "caso",
        enunciado: `Un cliente te escribe: "Quiero algo que me dé 20% en dólares por año, sin riesgo y que pueda retirar cuando quiera". Escribí en 3 o 4 líneas cómo le responderías, sin decirle simplemente que no.`,
        rubrica: [
          "Reconoce el pedido sin descalificarlo.",
          "Explica que rendimiento, seguridad y liquidez no se pueden tener al máximo a la vez (el triángulo).",
          "Le ofrece elegir prioridades: dos de las tres.",
          "Ancla expectativas con un orden de magnitud realista de lo que rinde algo seguro y líquido en dólares."
        ],
        modelo: `"Entiendo lo que buscás y te cuento cómo funciona: nadie puede darte a la vez mucho rendimiento, cero riesgo y disponibilidad inmediata. Si querés poder sacarla cuando quieras y no correr riesgo, hoy eso rinde un dígito bajo en dólares. Si estás dispuesto a esperar o a aceptar que el valor se mueva, podemos buscar más. ¿Qué es lo más importante para vos de las tres cosas?"` }
    ]
  },

  /* ------------------------------------------------------------ */
  {
    id: "p4",
    titulo: "Armar la cartera por bloques",
    minutos: 12,
    objetivo: "Construir una cartera en tres bloques (liquidez, defensa y crecimiento) y ver cómo cambia su comportamiento según el peso de cada uno.",
    bloques: [
      { t: "p", html: `La decisión que más explica el resultado de una cartera no es qué bono o qué acción elegiste, sino <strong>cuánto pusiste en cada tipo de activo</strong>. A eso se lo llama <span class="term" data-term="assetallocation">asignación de activos</span>. Elegir el ticker viene después.` },
      { t: "h", texto: "Una forma simple de pensarla: tres bloques" },
      { t: "tabla", cab: ["Bloque", "Para qué está", "Instrumentos típicos"], filas: [
        ["Liquidez", "Imprevistos y oportunidades. No está para rendir.", "Caución, FCI money market, LECAP muy corta"],
        ["Defensa", "Estabilidad y renta. Amortigua las caídas.", "ONs de buena calidad, bonos cortos, CER corto"],
        ["Crecimiento", "Hacer crecer el patrimonio a largo plazo. Acepta caídas.", "Acciones, CEDEARs, ETFs, bonos largos"]
      ], nota: "El perfil del cliente define el tamaño de cada bloque; el contexto de mercado define qué instrumento va adentro." },
      { t: "idea", titulo: "Por qué funciona", html: `Separar en bloques ayuda al cliente a entender su propia cartera. Cuando el bloque de crecimiento cae un 20%, le podés mostrar que la liquidez y la defensa siguen ahí, y que la plata que tiene que usar pronto no está en juego. Eso evita la venta en pánico.` },
      { t: "h", texto: "Probalo: armá una cartera y mirá cómo se comporta" },
      { t: "p", html: `Mové los controles para cambiar el peso de cada tipo de activo. Los números son <strong>supuestos ilustrativos en dólares</strong> (no son una proyección): sirven para ver la lógica, no para prometerle un rendimiento a nadie.` },
      { t: "herramienta", id: "cartera" },
      { t: "ej", id: "e1", tipo: "estimar",
        enunciado: `Usá la herramienta. Con <strong>20% liquidez, 50% renta fija corta, 10% renta fija larga y 20% acciones</strong>, ¿cuánto caería aproximadamente la cartera en un año malo? Respondé en %, sin el signo menos.`,
        unidad: "%", respuesta: 10.5, tolerancia: 1.5,
        explicacion: `Se calcula ponderando: 20% × (+2%) + 50% × (−5%) + 10% × (−20%) + 20% × (−32%) = 0,4 − 2,5 − 2 − 6,4 = <strong>−10,5%</strong> aproximadamente. Fijate que las acciones son solo el 20% de la cartera pero explican más de la mitad de la caída: el riesgo no se reparte en proporción al peso.` },
      { t: "ej", id: "e2", tipo: "mc",
        enunciado: `Moviendo la herramienta, ¿qué pasa cuando pasás de 20% a 60% en acciones?`,
        opciones: [
          { txt: "El rendimiento esperado sube un poco y la caída en un año malo sube mucho más.", ok: true, fb: "Exacto: el rendimiento extra es moderado y el costo en caída potencial es grande. Ese es el precio del crecimiento." },
          { txt: "El rendimiento sube y el riesgo baja, porque las acciones rinden más a largo plazo.", ok: false, fb: "Rinden más a largo plazo justamente porque en el camino caen más." },
          { txt: "Casi nada: el rendimiento esperado y la caída posible crecen más o menos en la misma proporción.", ok: false, fb: "Cambia muchísimo: pasás de un perfil moderado a uno agresivo." }
        ],
        explicacion: `Esta asimetría es lo más importante para transmitirle a un cliente que pide "un poco más de rendimiento": ese poco más suele venir con bastante más caída posible.` },
      { t: "h", texto: "Referencias por perfil" },
      { t: "tabla", cab: ["Perfil", "Liquidez", "Defensa", "Crecimiento"], filas: [
        ["Conservador", "15–25%", "65–80%", "0–15%"],
        ["Moderado", "10–15%", "45–60%", "30–40%"],
        ["Agresivo", "5–10%", "15–30%", "60–80%"]
      ], nota: "Rangos orientativos para discutir con el cliente, no reglas. No hay un número mágico: dos asesores serios pueden proponer carteras distintas para el mismo perfil." },
      { t: "ej", id: "e3", tipo: "mc",
        enunciado: `Te muestran una cartera: 8% caución, 22% ONs en dólares, 70% entre CEDEARs y acciones locales. ¿A qué perfil se parece más?`,
        opciones: [
          { txt: "Conservador", ok: false, fb: "Con 70% en acciones, las caídas pueden ser fuertes: no encaja con alguien que prioriza no perder." },
          { txt: "Moderado", ok: false, fb: "Un moderado suele tener más de la mitad en defensa." },
          { txt: "Agresivo", ok: true, fb: "Exacto: poca liquidez, defensa chica y el bloque de crecimiento domina." }
        ],
        explicacion: `Para inferir un perfil a partir de una cartera, mirá primero el bloque de crecimiento y después cuánta liquidez hay para atravesar una mala racha.` }
    ]
  },

  /* ------------------------------------------------------------ */
  {
    id: "p5",
    titulo: "Rebalancear y acompañar al cliente en las caídas",
    minutos: 9,
    objetivo: "Entender qué es rebalancear, cuándo hacerlo y cómo hablar con un cliente asustado.",
    bloques: [
      { t: "p", html: `Una cartera bien armada no se queda quieta: los activos que suben ganan peso y los que bajan lo pierden. Con el tiempo, una cartera moderada puede convertirse sin que nadie lo decida en una agresiva. <span class="term" data-term="rebalanceo">Rebalancear</span> es volver a los pesos acordados.` },
      { t: "ejemplo", titulo: "Rebalanceo con números", pasos: [
        `Un cliente moderado arranca con USD 100.000: <strong>60% defensa</strong> (USD 60.000) y <strong>40% crecimiento</strong> (USD 40.000).`,
        `Pasa un año muy bueno para las acciones: crecimiento +30% (pasa a USD 52.000) y defensa +5% (pasa a USD 63.000). Total: USD 115.000.`,
        `Los pesos ahora son 63.000 / 115.000 = <strong>54,8% defensa</strong> y 52.000 / 115.000 = <strong>45,2% crecimiento</strong>. La cartera se volvió más riesgosa sin que nadie lo decidiera.`,
        `Para volver a 60/40: defensa debería ser 60% × 115.000 = USD 69.000. Hay que <strong>vender USD 6.000 de acciones y comprar USD 6.000 de defensa</strong>.`
      ], conclusion: `Rebalancear obliga a hacer algo que cuesta emocionalmente: vender un poco de lo que viene subiendo y comprar lo que quedó atrás. Es "comprar barato y vender caro" con disciplina, sin intentar adivinar el mercado.` },
      { t: "ej", id: "e1", tipo: "estimar",
        enunciado: `Misma cartera, pero ahora con un año malo: crecimiento −20% (de USD 40.000 a 32.000) y defensa +3% (de 60.000 a 61.800). Para volver a 60/40, ¿cuántos dólares hay que pasar de defensa a crecimiento?`,
        unidad: "USD", respuesta: 5520, tolerancia: 250,
        explicacion: `Total: 61.800 + 32.000 = USD 93.800. El 40% de crecimiento debería ser 0,40 × 93.800 = USD 37.520. Hoy hay 32.000, así que hay que pasar <strong>USD 5.520</strong> de defensa a crecimiento. Es el movimiento que nadie quiere hacer en un año malo, y por eso es el que más valor agrega.` },
      { t: "h", texto: "Cuándo rebalancear" },
      { t: "lista", items: [
        `<strong>Por calendario:</strong> cada 6 o 12 meses, se revisa y se vuelve a los pesos acordados.`,
        `<strong>Por desvío:</strong> cuando un bloque se aleja más de 5 p.p. de su peso objetivo.`,
        `<strong>Por cambio de vida:</strong> si cambió el objetivo, el horizonte o la situación del cliente, no es un rebalanceo: es una cartera nueva.`
      ]},
      { t: "h", texto: "El cliente que llama asustado" },
      { t: "p", html: `Las caídas son el momento en que el asesor más vale. Un cliente que vende todo después de una baja del 15% convierte una pérdida temporal en una permanente, y suele volver a entrar más caro. Tu trabajo no es prometer que va a subir, sino recordarle el plan.` },
      { t: "lista", items: [
        `<strong>Primero escuchar.</strong> No arrancar con datos: el cliente necesita sentir que entendés su preocupación.`,
        `<strong>Separar los bloques.</strong> "La plata que necesitás en el corto plazo está en liquidez y defensa; lo que cayó es el bloque pensado para 10 años."`,
        `<strong>Volver al objetivo.</strong> ¿Cambió algo en su vida o su horizonte? Si no cambió, el plan sigue vigente.`,
        `<strong>Mostrar el costo de salir.</strong> Vender ahora fija la pérdida y obliga a acertar dos veces: cuándo salir y cuándo volver.`
      ]},
      { t: "ojo", titulo: "Lo que no hay que decir", html: `"Quedate tranquilo que esto vuelve" es una promesa que no podés hacer. Mejor: "No sé qué va a pasar en las próximas semanas, nadie lo sabe. Lo que sí sé es que esta cartera se armó pensando que estas caídas iban a pasar, y que la plata que necesitás pronto no está en juego."` },
      { t: "ej", id: "e2", tipo: "multi",
        enunciado: `Un cliente moderado ve su cartera −12% en un mes por la suba del riesgo país y quiere vender todo. Marcá <strong>todas</strong> las acciones adecuadas.`,
        opciones: [
          { txt: "Preguntarle si cambió algo en su vida o en sus planes para esta plata.", ok: true, fb: "Es la pregunta que define si hay que cambiar el plan o sostenerlo." },
          { txt: "Mostrarle que la liquidez y la defensa cubren lo que necesita en el corto plazo.", ok: true, fb: "Le baja la urgencia: lo que cayó no es lo que tiene que usar mañana." },
          { txt: "Tranquilizarlo diciéndole que seguro rebota en las próximas semanas.", ok: false, fb: "Es una promesa imposible de garantizar y te deja mal parada si no pasa." },
          { txt: "Evaluar si corresponde rebalancear, comprando un poco del bloque que cayó.", ok: true, fb: "Si el plan sigue vigente, la caída puede ser una oportunidad de rebalanceo." },
          { txt: "Vender todo, porque es su plata y lo importante es que el cliente esté tranquilo.", ok: false, fb: "Puede ser lo que pide, pero tu rol es mostrarle el costo de esa decisión. Si igual lo decide, que sea informado." }
        ],
        explicacion: `En una caída, el orden es: contener, separar lo urgente de lo que puede esperar, volver al objetivo y recién después hablar de instrumentos.` }
    ]
  },

  /* ------------------------------------------------------------ */
  {
    id: "p6",
    titulo: "Correlación: por qué diversificar funciona",
    minutos: 9,
    objetivo: "Entender qué es la correlación, por qué combinar activos que no se mueven juntos baja el riesgo de la cartera, y por qué en las crisis esa protección se achica.",
    bloques: [
      { t: "p", html: `En la lección 2 viste que diez activos argentinos no son una cartera diversificada. La razón tiene nombre: <strong>correlación</strong>. Mide qué tanto se mueven juntos dos activos, en una escala de −1 a +1.` },
      { t: "tabla", cab: ["Correlación", "Qué significa", "Qué pasa al combinarlos"], filas: [
        ["+1", "Se mueven siempre juntos", "No hay beneficio: es como tener uno solo"],
        ["0", "Se mueven por razones distintas", "La cartera oscila bastante menos que cada uno"],
        ["−1", "Cuando uno sube, el otro baja", "En teoría, se puede eliminar casi toda la oscilación"]
      ]},
      { t: "herramienta", id: "correlacion" },
      { t: "idea", titulo: "Lo que muestra la herramienta", html: `Con dos activos que rinden lo mismo y oscilan lo mismo, mezclarlos <strong>no cambia el rendimiento esperado</strong>, pero sí baja la volatilidad, salvo que la correlación sea +1. Es lo más parecido a algo gratis que hay en finanzas: menos riesgo sin resignar retorno.` },
      { t: "ej", id: "e1", tipo: "estimar",
        enunciado: `Dos activos con volatilidad de 20% cada uno y correlación 0. Una cartera 50% y 50%: ¿qué volatilidad tiene, aproximadamente? Respondé en %.`,
        unidad: "%", respuesta: 14.1, tolerancia: 0.8,
        explicacion: `Con correlación 0, la volatilidad de la mezcla es 20% ÷ √2 ≈ <strong>14,1%</strong>. Con correlación +1 seguiría en 20%. Probalo en la herramienta.` },
      { t: "h", texto: "Correlaciones típicas en una cartera argentina" },
      { t: "tabla", cab: ["Par de activos", "Correlación típica", "Por qué"], filas: [
        ["Soberanos en dólares y acciones argentinas", "Alta", "Los dos dependen del riesgo país"],
        ["Soberanos y ONs de buenas empresas", "Media a alta", "Comparten riesgo argentino, pero las empresas sólidas sufren menos"],
        ["LECAPs y bonos CER", "Media a alta", "Los dos dependen de las tasas en pesos y del dólar"],
        ["CEDEARs y activos argentinos", "Baja", "Los CEDEARs dependen sobre todo del mercado de EE.UU."],
        ["Fondo Latam sin Argentina y soberanos argentinos", "Baja", "Emisores y riesgos distintos"]
      ], nota: "Son relaciones típicas, no números fijos: cambian con el tiempo." },
      { t: "ojo", titulo: "En las crisis, las correlaciones suben", html: `Cuando hay pánico, muchos activos caen juntos, aunque en tiempos normales se muevan distinto. Entre julio y noviembre de 2026, con el riesgo país pasando de 430 a más de 900 puntos básicos, bajaron juntos bonos, ONs y acciones argentinas. Por eso la diversificación que sirve es la que combina <strong>riesgos distintos</strong> (país, moneda, sector), no solo instrumentos distintos.` },
      { t: "ej", id: "e2", tipo: "mc",
        enunciado: `Un cliente tiene GGAL, BMA y un Global largo. Quiere sumar un activo para diversificar. ¿Cuál baja más el riesgo de la cartera?`,
        opciones: [
          { txt: "Acciones de Supervielle: suma un tercer banco y reparte el riesgo entre más empresas del sector.", ok: false, fb: "Otro banco argentino: correlación alta con lo que ya tiene." },
          { txt: "Un CEDEAR diversificado, como SPY: depende de otros factores y casi no se mueve con Argentina.", ok: true, fb: "Exacto: suma un riesgo distinto." },
          { txt: "Otro Global de distinto plazo: al cambiar la duration, cambia también la correlación con el resto.", ok: false, fb: "Sigue dependiendo del riesgo país: se mueve casi igual." }
        ],
        explicacion: `Diversificar es sumar algo que reaccione distinto ante el mismo evento. La pregunta es siempre: "¿qué haría caer esto, y es lo mismo que haría caer lo que ya tengo?".` },
      { t: "cliente", titulo: "Cómo se lo explicás al cliente", html: `"No alcanza con tener muchas cosas: tienen que depender de cosas distintas. Si todo lo que tenés cae cuando Argentina anda mal, tenés una sola apuesta repetida varias veces. Sumar algo que dependa de otra cosa baja el riesgo sin bajar lo que esperás ganar."` }
    ]
  }
  ]
};
