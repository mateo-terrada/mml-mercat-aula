/* ============================================================
   TALLER · Armar una cartera de acciones
   Del análisis de una empresa (módulo 05) a la cartera:
   correlación y diversificación real, ejes de reparto
   (geografía, sector, moneda) y riesgo de la cartera
   (beta, caída máxima, recuperación y cartera de referencia).
   Los números de las herramientas son ilustrativos, no mediciones.
   ============================================================ */
window.AULA = window.AULA || { modulos: {} };

AULA.modulos.carterasrv = {
  id: "carterasrv",
  numero: "T3",
  taller: true,
  titulo: "Taller: armar una cartera de acciones",
  bajada: "Ya sabés analizar una empresa. Ahora la pregunta es otra: cuánto poner en cada lugar, qué se mueve junto con qué y cuánto puede doler.",
  fuente: "Taller práctico · complementa el módulo 05",
  practica: [
    { titulo: "Práctica diaria · Portafolios y Renta Variable", desc: "Preguntas del banco sobre diversificación, concentración y beta.", href: "practica.html" }
  ],
  lecciones: [

  /* ------------------------------------------------------------ */
  {
    id: "r1",
    titulo: "Diversificar no es tener muchos tickers",
    minutos: 9,
    objetivo: "Entender por qué dos inversiones que se mueven juntas no diversifican, y aprender a preguntar qué las mueve.",
    bloques: [
      { t: "p", html: `Un cliente te muestra su cartera: ocho acciones, todas conocidas. Nvidia, Microsoft, Apple, Meta, Alphabet, Amazon, Tesla y AMD. Te dice: <strong>"Tengo ocho empresas distintas, estoy bien diversificado"</strong>. ¿Lo está?` },
      { t: "p", html: `Si mañana las tasas suben y el mercado le pierde el gusto a la tecnología, las ocho caen casi a la vez. Tiene ocho tickers, pero está apostando a <strong>una sola cosa</strong>. Diversificar no es cuántas posiciones tenés: es <strong>si se mueven todas igual o no</strong>.` },
      { t: "idea", titulo: "La idea en una frase", html: `Diversificar es juntar inversiones que no suben ni bajan todas a la vez, para que las caídas de unas se compensen con las subas de otras. A cuánto se mueven en conjunto dos inversiones se le llama <span class="term" data-term="correlacion">correlación</span>.` },
      { t: "analogia", html: `Imaginá dos vendedores en una playa. Uno vende helados y el otro paraguas. Si los dos venden helados, un día nublado los arruina a ambos. Si uno vende helados y el otro paraguas, un día de sol le va bien al primero y uno de lluvia al segundo: <strong>entre los dos, el ingreso es mucho más parejo</strong>. El que suma un segundo vendedor de helados no diversificó nada.` },
      { t: "h", texto: "Probalo: dos acciones, un solo número" },
      { t: "p", html: `La herramienta combina dos acciones igual de movidas, mitad y mitad. Cambiá cuánto se parecen y mirá cuánto baja el riesgo del conjunto. Usamos la <span class="term" data-term="volatilidad">volatilidad</span> como medida de cuánto se mueve cada una.` },
      { t: "herramienta", id: "corr-rv" },
      { t: "ej", id: "e1", tipo: "estimar",
        enunciado: `Dos acciones, cada una con volatilidad de 30%, y correlación 0 (no tienen ninguna relación entre sí). Armás una cartera mitad y mitad. Usá la herramienta: ¿qué volatilidad tiene la cartera? Respondé en %.`,
        unidad: "%", respuesta: 21.2, tolerancia: 1,
        explicacion: `Con correlación 0, el conjunto se mueve cerca de <strong>21%</strong>, bastante menos que el 30% de cada una por separado. Se compensan en parte sin que ninguna deje de ser tan movida como antes: eso es el beneficio de diversificar.` },
      { t: "ojo", titulo: "El beneficio se achica cuando más lo necesitás", html: `En las crisis, la correlación entre activos de riesgo suele subir: casi todo cae junto. Por eso no alcanza con mirar los números de un año tranquilo. Hay que preguntarse <strong>qué las mueve</strong>, no solo cómo se movieron.` },
      { t: "h", texto: "La pregunta clave: ¿qué mueve a cada una?" },
      { t: "p", html: `Dos inversiones se mueven juntas cuando las empuja la misma fuerza. Las más comunes: el <strong>sector</strong> (el mismo negocio), el <strong>país</strong> (la misma economía, y en Argentina, el mismo riesgo país), y un <strong>factor común</strong> como las tasas de interés o el precio del petróleo.` },
      { t: "ej", id: "e2", tipo: "mc",
        enunciado: `El cliente de las ocho tecnológicas de EE.UU. insiste: "Pero son ocho empresas distintas, con productos distintos". ¿Qué le respondés?`,
        opciones: [
          { txt: "Tiene razón: cada empresa tiene su propio negocio y sus propios productos, así que con ocho nombres distintos ya está bien repartido.", ok: false, fb: "Cuántas empresas hay importa menos que qué las mueve." },
          { txt: "Son ocho empresas, pero reaccionan a lo mismo: las tasas y el ánimo hacia la tecnología. En un mal momento caen juntas.", ok: true, fb: "Exacto: el riesgo común pesa más que la cantidad de nombres." },
          { txt: "No está diversificado, porque lo correcto es tener como mínimo veinte acciones en cartera, sin importar cuáles ni de qué sector.", ok: false, fb: "No hay un número mágico: veinte acciones del mismo sector siguen siendo una apuesta al sector." },
          { txt: "Tiene que vender todas ya mismo, porque la tecnología siempre cae más que el resto del mercado y no se recupera.", ok: false, fb: "No siempre: el punto no es que la tecnología sea mala, sino que sola concentra el riesgo." }
        ],
        explicacion: `Un buen lenguaje con el cliente es: "no se trata de cuántas, sino de si se mueven por las mismas razones". Se puede seguir creyendo en esas empresas y, aun así, no poner todo en ellas.` },
      { t: "ej", id: "e3", tipo: "multi",
        enunciado: `Marcá <strong>todo</strong> lo que hace que dos inversiones tiendan a moverse juntas.`,
        opciones: [
          { txt: "Que sean del mismo sector.", ok: true, fb: "Las mueven los mismos precios, costos y demanda." },
          { txt: "Que dependan del mismo país, como el riesgo país en Argentina.", ok: true, fb: "Una mala noticia local las afecta a todas." },
          { txt: "Que las compres en el mismo ALyC.", ok: false, fb: "Dónde las tenés depositadas no cambia lo que las mueve." },
          { txt: "Que las afecte el mismo factor, por ejemplo las tasas o el petróleo.", ok: true, fb: "Un mismo movimiento las empuja a ambas." },
          { txt: "Que coticen al mismo precio por acción.", ok: false, fb: "El precio por acción no dice nada sobre qué la mueve." }
        ],
        explicacion: `Sector, país y factores comunes son los tres lugares donde buscar. Con eso en la cabeza, la segunda lección los convierte en una forma de repartir.` },
      { t: "cliente", titulo: "Cómo se lo explicás al cliente", html: `"No te digo que las vendas ni que dejes de creer en la tecnología. Te propongo pensar en cuántas cosas distintas tenés. Si tu cartera depende de una sola, un mal momento de esa cosa te pega a todo. Si depende de varias, es más difícil que todas fallen a la vez."` }
    ]
  },

  /* ------------------------------------------------------------ */
  {
    id: "r2",
    titulo: "Geografía, sector y moneda",
    minutos: 11,
    objetivo: "Repartir una cartera de acciones por geografía y sector, ver la concentración que no se ve a simple vista y entender cómo cuenta la moneda.",
    bloques: [
      { t: "p", html: `Para repartir una cartera de acciones hay tres ejes principales: <strong>dónde</strong> están las empresas (geografía), <strong>a qué se dedican</strong> (sector) y <strong>en qué moneda</strong> las mide el cliente. Los dos primeros se eligen; el tercero hay que entenderlo.` },
      { t: "h", texto: "Geografía: cada lugar tiene su propio motor" },
      { t: "p", html: `EE.UU. pesa mucho en cualquier índice global, y tiene empresas de todos los sectores. Europa, los países emergentes y Brasil son otras economías con otros ciclos. Y Argentina es un caso aparte: <strong>sus acciones comparten un motor común, el riesgo país</strong>.` },
      { t: "ojo", titulo: "Argentina: otro sector no es otro riesgo", html: `Un banco, una petrolera y una eléctrica argentinos son tres negocios distintos, pero todos sufren cuando sube el riesgo país y todos se alegran cuando baja. Entre ellos se diversifica menos de lo que parece. Para diversificar de verdad hay que sumar <strong>exposición fuera del país</strong>, por ejemplo con un ETF o con CEDEARs.` },
      { t: "h", texto: "Sector: qué empuja a cada uno" },
      { t: "tabla", cab: ["Sector", "Qué lo mueve", "Cómo suele comportarse"], filas: [
        ["Tecnología", "Tasas de interés y expectativas de crecimiento", "Sube mucho cuando el mercado está optimista; sufre cuando suben las tasas"],
        ["Energía", "Precio del petróleo", "Sigue al crudo; da dividendos en las grandes del rubro"],
        ["Bancos", "Tasas, ciclo económico y morosidad", "Va con el ciclo: gana cuando hay actividad y préstamos que se pagan"],
        ["Salud y consumo básico", "Demanda estable, poco atada al ciclo", "Cae menos en las malas, pero también sube menos en las buenas"]
      ], nota: "Descripción general para orientarse. En cada empresa pesan además sus números, como se vio en el módulo 05." },
      { t: "h", texto: "ETF o empresa: depende de la apuesta" },
      { t: "p", html: `Cuando la apuesta es a <strong>un país o una región</strong> (EE.UU., Europa, Brasil), un ETF es la herramienta natural: elegir una empresa para representar a todo un país sería arbitrario. Cuando la apuesta es a <strong>un sector</strong>, en cambio, conviene conocer las empresas que lo representan. Es lo que te permite explicarle al cliente qué está comprando y qué lo mueve.` },
      { t: "tabla", cab: ["Sector", "Empresas representativas de EE.UU.", "Qué te enseña cada una"], filas: [
        ["Tecnología", "Microsoft, Apple, Nvidia", "Crecimiento y tasas: las tres sufren cuando suben, aunque cada una con su propio negocio"],
        ["Bancos", "JPMorgan, Bank of America, Visa", "Ciclo económico y tasas; Visa, en cambio, vive de los pagos y no presta"],
        ["Energía", "ExxonMobil, Chevron", "Siguen al petróleo, pero son petroleras globales: no dependen del riesgo país"],
        ["Salud", "Johnson & Johnson, UnitedHealth, Pfizer", "Demanda estable: caen menos en las malas"]
      ], nota: "Ejemplos para reconocer el sector, no una recomendación. Una sola empresa suma además su propio riesgo: por eso se mira cuánto pesa en la cartera." },
      { t: "h", texto: "Mirá la cartera por dentro" },
      { t: "p", html: `Elegí una de las tres carteras. La herramienta suma cuánto pesa cada país y cada sector, y marca si algo se concentra. La cartera "repartida" combina ETFs de países (que traen varios sectores adentro) con empresas que representan un sector.` },
      { t: "herramienta", id: "mapa-rv" },
      { t: "ej", id: "e1", tipo: "mc",
        enunciado: `La cartera de tres acciones argentinas (YPF, Galicia y Vista) tiene sectores distintos: energía y finanzas. ¿Cuál es su concentración principal?`,
        opciones: [
          { txt: "En el sector energético, porque dos de las tres empresas son petroleras y pesan dos tercios de la cartera.", ok: false, fb: "Es una concentración real, pero no la más importante: el país pesa más." },
          { txt: "En ninguna: con tres empresas de dos sectores distintos ya tiene un reparto razonable para cualquier perfil.", ok: false, fb: "Las tres dependen de la misma economía." },
          { txt: "En el país: es 100% Argentina y el riesgo país mueve a las tres, sean del sector que sean.", ok: true, fb: "Exacto: el eje geográfico es el que no se diversificó." }
        ],
        explicacion: `Mirar un solo eje engaña. Esta cartera parece repartida por sector, pero el riesgo país es el motor de las tres. Por eso conviene revisar siempre geografía y sector a la vez.` },
      { t: "h", texto: "La moneda: el CEDEAR se ve en pesos, pero el cliente mide en dólares" },
      { t: "p", html: `Un <span class="term" data-term="cedear">CEDEAR</span> cotiza en pesos en BYMA. Pero un cliente que piensa en dólares mira el resultado en dólares, y en dólares el CEDEAR rinde, con diferencias chicas, <strong>lo mismo que la acción de afuera</strong>. Lo que mueve su resultado es lo que le pase a la empresa, no el tipo de cambio.` },
      { t: "idea", titulo: "Una forma práctica de pensarlo", html: `Para el cliente que mide en dólares, comprar el CEDEAR de una empresa de EE.UU. es comprar la acción de EE.UU. Si en cambio el cliente piensa en pesos, el tipo de cambio sí suma otro riesgo: ahí la misma cartera se ve distinta. Preguntale <strong>en qué moneda mide su patrimonio</strong> antes de armar nada.` },
      { t: "ej", id: "e2", tipo: "multi",
        enunciado: `Marcá <strong>todas</strong> las afirmaciones correctas para un cliente que mide su cartera en dólares.`,
        opciones: [
          { txt: "Su resultado depende sobre todo de lo que le pase a las empresas y a sus mercados.", ok: true, fb: "Es lo que mueve el valor en dólares." },
          { txt: "Un CEDEAR en pesos rinde, con diferencias chicas, lo mismo en dólares que la acción de afuera.", ok: true, fb: "El tipo de cambio entra en el precio en pesos, pero se compensa al medir en dólares." },
          { txt: "Que el CEDEAR cotice en pesos lo vuelve mucho más riesgoso que la acción del exterior.", ok: false, fb: "El riesgo es el de la empresa, no el de la moneda en que se ve el precio." },
          { txt: "Las acciones argentinas comparten el factor riesgo país, aunque coticen en dólares o en pesos.", ok: true, fb: "Ese factor las mueve sin importar la moneda de cotización." }
        ],
        explicacion: `La moneda importa según cómo piense el cliente. Para uno de dólares, el trabajo está en elegir bien geografía y sector, no en seguir el tipo de cambio.` },
      { t: "h", texto: "Cuánto poner: dos reglas de criterio" },
      { t: "p", html: `No hay un reparto único. Dos reglas prácticas que se usan mucho, no son norma pero ayudan a ordenar la conversación:` },
      { t: "tabla", cab: ["Regla", "Para qué sirve"], filas: [
        ["El perfil fija el total de acciones", "Un cliente conservador no debería superar un tope bajo, alrededor del 40% de su cartera. Más allá de lo que él diga, la caída posible tiene que ser tolerable."],
        ["Ninguna empresa individual pesa demasiado", "Se suele evitar que una sola empresa supere el 10 o 15% de la cartera, y menos aún en perfiles conservadores. Para el resto, los ETFs reparten el riesgo sin elegir una empresa."]
      ] },
      { t: "ej", id: "e3", tipo: "caso",
        enunciado: `Un cliente con cuatro acciones argentinas te dice: "Quiero diversificar, así que voy a sumar una quinta de otro sector argentino". Escribí en 4 o 5 líneas qué le sugerís.`,
        rubrica: [
          "Reconoce que sumar otra acción argentina agrega poco: sigue dependiendo del riesgo país.",
          "Propone agregar exposición fuera de Argentina, por ejemplo un ETF amplio o CEDEARs.",
          "Evita decirle que su elección de acciones argentinas está mal: lo que se corrige es el reparto.",
          "Menciona el criterio de no concentrar demasiado en una sola empresa o un solo país."
        ],
        modelo: `"Buena idea querer repartir. Un detalle: las cuatro ya dependen del riesgo país, así que una quinta de otro sector agrega menos de lo que parece, porque si el riesgo país sube las cinco se mueven juntas. Te propongo mantener lo que tenés y sumar algo de afuera, por ejemplo un ETF del mercado de EE.UU. o de varios países. Así, si a Argentina le va mal, no le pega a toda tu cartera."` },
      { t: "cliente", titulo: "Cómo se lo explicás al cliente", html: `"Pensá tu cartera como un mapa con tres preguntas: en qué países, en qué sectores y de qué tamaño es cada apuesta. Si todo el mapa está pintado de un solo color, aunque tengas muchos puntos, estás apostando a una sola zona."` }
    ]
  },

  /* ------------------------------------------------------------ */
  {
    id: "r3",
    titulo: "Cuánto puede doler: beta, caída y referencia",
    minutos: 11,
    objetivo: "Estimar a ojo cuánto puede caer una cartera, entender por qué recuperarse cuesta más que caer y medir si la cartera le ganó a una alternativa simple.",
    bloques: [
      { t: "p", html: `La pregunta que casi todo cliente hace, de una forma u otra, es: <strong>"¿cuánto puedo perder?"</strong>. En acciones no hay una respuesta exacta, pero sí tres ideas que ayudan a dar una respuesta honesta.` },
      { t: "h", texto: "Beta: cuánto se mueve respecto del mercado" },
      { t: "idea", titulo: "La idea en una frase", html: `El <span class="term" data-term="beta">beta</span> compara cuánto se mueve una acción o una cartera frente al mercado. Beta 1 se mueve como el mercado; beta 1,3 se mueve un 30% más; beta 0,6 se mueve bastante menos. Si el mercado cae 10%, una cartera con beta 1,3 cae aproximadamente 13%.` },
      { t: "ojo", titulo: "Es una estimación, no una promesa", html: `El beta resume lo que pasó en promedio. En un día o en una crisis puntual, una acción puede moverse distinto. Sirve para <strong>ordenar</strong> (esta cartera es más defensiva que aquella), no para predecir al punto.` },
      { t: "h", texto: "La caída máxima y el camino de vuelta" },
      { t: "p", html: `La <span class="term" data-term="drawdown">caída máxima</span> (drawdown) es lo que bajó la cartera desde su último máximo hasta su punto más bajo. Es el número que el cliente <em>siente</em>: no le importa el promedio del año, le importa cuánto vio bajar su saldo.` },
      { t: "p", html: `Y acá aparece una asimetría que conviene tener a mano: <strong>recuperar cuesta más que caer</strong>. Si perdés 50%, no alcanza con subir 50% para volver: tenés que subir 100%.` },
      { t: "herramienta", id: "caida-rv" },
      { t: "ej", id: "e1", tipo: "estimar",
        enunciado: `El mercado cae 20% y la cartera de un cliente tiene beta 1,3. A ojo, ¿cuánto cae su cartera? Respondé en %, sin el signo menos.`,
        unidad: "%", respuesta: 26, tolerancia: 1,
        explicacion: `1,3 × 20 = <strong>26%</strong>. Para un cliente con USD 100.000, son unos USD 26.000 menos en pantalla, antes de ver si se recupera.` },
      { t: "ej", id: "e2", tipo: "estimar",
        enunciado: `Una cartera cae 40% desde su máximo. ¿Cuánto tiene que subir desde ese piso para volver al punto de partida? Respondé en %. Podés usar la herramienta.`,
        unidad: "%", respuesta: 66.7, tolerancia: 2,
        explicacion: `Con una caída de 40% queda en 60. Para volver a 100 hay que subir 40 sobre 60, o sea <strong>66,7%</strong>. Cuanto más profunda la caída, más larga la vuelta. Por eso conviene mirar siempre el piso posible, no solo el potencial de suba.` },
      { t: "h", texto: "¿Le ganaste a quedarte quieto?" },
      { t: "p", html: `Una cartera armada con cuidado tiene que poder mostrar algo más que "subió". La pregunta es contra qué se compara. Una referencia simple, como un ETF amplio del mercado de EE.UU. en dólares, te dice qué habría pasado sin hacer nada complicado.` },
      { t: "p", html: `Si tu cartera rindió menos y además cayó más que la referencia, la complejidad no agregó valor. Si rindió más pero cayó mucho más, quizás no acertaste: <strong>asumiste más riesgo</strong>. Mirá siempre las dos cosas juntas: cuánto rindió y cuánto cayó en el camino.` },
      { t: "ej", id: "e3", tipo: "mc",
        enunciado: `Un año después, la cartera de tu cliente rindió +12% con una caída máxima de 25%. El ETF de referencia rindió +15% con una caída máxima de 20%. ¿Cómo lo leés?`,
        opciones: [
          { txt: "La referencia fue mejor en las dos: rindió más y cayó menos, así que esta vez la cartera no agregó valor.", ok: true, fb: "Exacto: menos retorno y más caída es la peor combinación." },
          { txt: "La cartera fue mejor, porque tiene más empresas y eso siempre justifica un rendimiento algo menor que el de la referencia.", ok: false, fb: "Más empresas no justifica menos retorno con más caída." },
          { txt: "No se pueden comparar: cada cliente tiene un perfil propio y el ETF es solo una referencia teórica que nadie compra.", ok: false, fb: "La referencia existe justamente para comparar; el perfil define cuánta caída es aceptable." },
          { txt: "Hay que esperar tres años antes de sacar cualquier conclusión sobre una cartera.", ok: false, fb: "Un año alcanza para revisar, aunque no para juzgar del todo." }
        ],
        explicacion: `Una cartera no tiene que ganarle siempre a la referencia: puede aceptar rendir algo menos si cae bastante menos y el cliente lo necesita. Pero cuando rinde menos y cae más, hay algo para corregir.` },
      { t: "ej", id: "e4", tipo: "caso",
        enunciado: `Una clienta jubilada, con 35% de su cartera en acciones, te escribe: "El mercado cayó 20% y mi parte de acciones bajó 18%. ¿Vendo todo?". Escribí en 4 o 5 líneas tu respuesta.`,
        rubrica: [
          "Pone la caída en perspectiva: ve en dólares cuánto representa sobre el total, no solo sobre las acciones.",
          "Distingue volatilidad de pérdida definitiva: si no vende, no la realiza.",
          "Revisa si la caída es tolerable para ella o si el peso de las acciones era alto para su perfil.",
          "No promete una recuperación ni una fecha; ofrece ajustar el reparto si ya no se siente cómoda."
        ],
        modelo: `"Entiendo que preocupe. Tus acciones son el 35% de tu cartera, así que esa caída de 18% en acciones representa algo más de 6% sobre el total; el resto, que está en instrumentos más estables, amortigua. No es una pérdida definitiva mientras no vendas. Lo que sí vale revisar es si ese 35% te deja tranquila: si no, podemos bajarlo con calma, sin vender todo de golpe. Lo decidimos juntas."` },
      { t: "cliente", titulo: "Cómo se lo explicás al cliente", html: `"Las acciones suben más a la larga, pero en el camino se caen. Antes de elegir cuánto poner, mirá cuánto estás dispuesto a ver bajar sin vender. Y recordá que para recuperar una caída grande hace falta una suba más grande todavía."` }
    ]
  }
  ]
};
