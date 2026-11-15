/* ============================================================
   MÓDULO · Analizar una empresa (acciones, CEDEARs y ETFs)
   Base: capítulos 5 y 11 del Book, fusionados.
   Empresas hilo: MercadoLibre (MELI), Vista (VIST) y JPMorgan (JPM).
   Comparables: XOM, NU, GLOB y tecnológicas grandes.
   Datos: resultados del 3er trimestre de 2026 (oct–nov 2026).
   ============================================================ */
window.AULA = window.AULA || { modulos: {} };

AULA.modulos.empresas = {
  id: "empresas",
  numero: "05",
  titulo: "Analizar una empresa",
  bajada: "Pensar en el negocio antes que en el ticker: cómo gana plata una empresa, qué dicen sus números, si el precio tiene sentido y cómo convertir todo eso en una tesis que se pueda explicar.",
  fuente: "Book, capítulos 5 y 11 · datos del tercer trimestre de 2026",
  practica: [
    { titulo: "¿Qué hago si...?", desc: "Incluye el escenario de CEDEAR vs. acción directa vs. ETF y el de sectores (tecnología, energía, bancos).", href: "simulador.html" },
    { titulo: "Práctica diaria · Renta Variable", desc: "Preguntas del banco sobre acciones, CEDEARs y ETFs.", href: "practica.html" }
  ],
  evaluacion: {
    cantidad: 10,
    ids: ["EMP-MC-001","EMP-MC-002","EMP-MC-003","EMP-MC-004","EMP-MC-005","EMP-MC-006","EMP-MC-007","EMP-MC-008",
          "EMP-CASO-001","EMP-CASO-002","RV-MC-002","RV-MC-012","RV-MC-014","RV-MC-015"]
  },
  lecciones: [

  /* ------------------------------------------------------------ */
  {
    id: "e1",
    titulo: "Qué comprás cuando comprás una acción",
    minutos: 10,
    objetivo: "Entender que el precio de una acción refleja lo que el mercado espera que gane la empresa, y ubicar en qué momento del trabajo entra el análisis fundamental.",
    bloques: [
      { t: "p", html: `Una acción no es un número que sube y baja en la pantalla: es <strong>una parte de un negocio</strong>. Quien compra una acción de MercadoLibre es dueño de una porción minúscula de sus centros logísticos, de su billetera virtual y de todo lo que esa empresa gane (o pierda) en el futuro.` },
      { t: "idea", titulo: "La frase que ordena todo el módulo", html: `El precio de una acción se mueve por lo que el mercado <strong>espera</strong> que la empresa gane en el futuro, no por lo que ya ganó. Por eso una empresa puede presentar resultados récord y su acción bajar el mismo día: lo que importa es si esos resultados mejoran o empeoran lo que se esperaba.` },
      { t: "h", texto: "Dos casos de este mes" },
      { t: "mercado", titulo: "MercadoLibre: vende 45% más y la acción cae", html: `En el tercer trimestre de 2026, MercadoLibre facturó <strong>USD 10.750 millones, 45% más</strong> que un año antes. Pero su ganancia operativa <strong>bajó</strong> de 724 a 676 millones, porque gastó más en envíos y marketing. La acción cayó cerca de <strong>20% entre el 5 de octubre y el 10 de noviembre</strong>. El mercado no dudó de que MELI crezca; dudó de cuánta ganancia le va a quedar de ese crecimiento.`, fuente: "MercadoLibre, resultados del 3T 2026 (4/11/2026); TIKR, 10/11/2026" },
      { t: "mercado", titulo: "Vista: producción récord y la acción en rojo", html: `Vista presentó el 28 de octubre una producción récord, <strong>33% más</strong> que un año antes, y un EBITDA (lo que genera la operación antes de intereses, impuestos y amortizaciones) de <strong>USD 841 millones</strong>. Al día siguiente la acción caía 2,6% en Buenos Aires, en una jornada en la que el petróleo Brent bajaba 1,3%. Los resultados miran hacia atrás; el precio del petróleo, hacia adelante.`, fuente: "Vista Energy, resultados del 3T 2026; iProfesional y EcosistemaStartup, 29/10/2026" },
      { t: "ej", id: "e1", tipo: "mc",
        enunciado: `Un cliente te dice: "No entiendo nada: MercadoLibre vendió 45% más y la acción se cayó. ¿El mercado está loco?". ¿Cuál es la mejor respuesta?`,
        opciones: [
          { txt: "El mercado sobrerreaccionó: con ventas creciendo 45% la acción tendría que subir, así que conviene comprar más.", ok: false, fb: "Puede ser una oportunidad, pero esta respuesta ignora por qué cayó. Primero hay que entender qué cambió." },
          { txt: "El mercado ya esperaba que vendiera mucho; lo que sorprendió fue que bajara la ganancia operativa.", ok: true, fb: "Exacto: el dato que cambió la expectativa fue la rentabilidad, no las ventas." },
          { txt: "Las acciones se mueven al azar en el corto plazo, así que no tiene sentido buscarle una explicación a la caída.", ok: false, fb: "Hay mucho ruido en el corto plazo, pero acá hay una causa identificable. Decir 'es azar' le quita al cliente la explicación que necesita." }
        ],
        explicacion: `Este es el cambio de cabeza más importante del módulo: <strong>no alcanza con que a la empresa le vaya bien; tiene que irle mejor de lo que el precio ya descuenta</strong>. Una empresa excelente comprada demasiado cara puede ser una mala inversión.` },
      { t: "h", texto: "Qué es el análisis fundamental" },
      { t: "p", html: `El <span class="term" data-term="fundamental">análisis fundamental</span> es estudiar el <strong>negocio y sus números</strong> para formarse una opinión sobre cuánto vale una empresa, y compararla con lo que cuesta en el mercado. Responde dos preguntas: <em>¿es un buen negocio?</em> y <em>¿el precio de hoy tiene sentido?</em>` },
      { t: "tabla", cab: ["Enfoque", "Qué mira", "Pregunta que responde"], filas: [
        ["Análisis fundamental", "El negocio, sus ventas, ganancias, deuda y perspectivas", "¿Qué empresa comprar y a qué precio?"],
        ["Análisis técnico", "El gráfico del precio y el volumen", "¿Cuándo entrar o salir?"],
        ["Análisis macro", "Inflación, tasas, riesgo país, dólar, ciclo económico", "¿Qué tipo de activos favorece el contexto?"]
      ], nota: "No compiten entre sí: son herramientas para preguntas distintas. Este módulo se concentra en la primera." },
      { t: "h", texto: "¿En qué momento del trabajo entra?" },
      { t: "grafico", id: "proceso-inversion" },
      { t: "p", html: `El análisis fundamental <strong>no es el primer paso</strong>. Antes vienen el perfil del cliente y cuánto de su cartera va a acciones (módulo 02). Recién cuando sabés que una parte va a renta variable, aparece la pregunta "¿cuáles?", y ahí entra el fundamental. Vuelve a aparecer en el seguimiento: cada vez que una empresa presenta resultados trimestrales, hay que chequear si la razón por la que se compró sigue en pie.` },
      { t: "ej", id: "e2", tipo: "mc",
        enunciado: `Una clienta conservadora te pide que le analices a fondo Globant porque "le gusta la empresa". ¿Qué es lo primero?`,
        opciones: [
          { txt: "Analizar los números de Globant en detalle y, si dan bien, recomendarle una posición importante.", ok: false, fb: "Saltea los pasos previos: el análisis de la empresa no dice si encaja en su cartera." },
          { txt: "Definir cuánto de su cartera puede ir a acciones; recién ahí analizar Globant como candidata.", ok: true, fb: "Exacto: primero la asignación, después la selección." },
          { txt: "Mirar el gráfico de los últimos meses para ver si es buen momento de entrar antes de analizar nada.", ok: false, fb: "El gráfico responde 'cuándo', pero todavía no está claro 'si' ni 'cuánto'." }
        ],
        explicacion: `Que a una clienta le guste una empresa es un buen punto de partida para una conversación, pero el orden profesional es: <strong>perfil → cuánto en acciones → qué empresas → a qué precio → seguimiento</strong>.` },
      { t: "cliente", titulo: "Cómo se lo explicás al cliente", html: `"Cuando comprás una acción te estás asociando a un negocio. El precio de hoy ya tiene adentro lo que el mercado espera de esa empresa. Para ganar, no alcanza con que le vaya bien: le tiene que ir mejor de lo que todos esperan, o tenés que haberla comprado a un precio razonable."` }
    ]
  },

  /* ------------------------------------------------------------ */
  {
    id: "e2",
    titulo: "Entender el negocio en cinco preguntas",
    minutos: 11,
    objetivo: "Describir cualquier empresa con cinco preguntas simples, antes de mirar un solo número.",
    bloques: [
      { t: "p", html: `Antes de abrir un balance hay que poder explicar el negocio en voz alta. Si no podés contarle a un cliente en dos minutos cómo gana plata una empresa, todavía no estás en condiciones de recomendarla. Estas cinco preguntas sirven para cualquier empresa:` },
      { t: "lista", items: [
        `<strong>¿Cómo gana plata?</strong> Qué vende y cómo cobra.`,
        `<strong>¿Quién le paga y por qué la elige?</strong> Sus clientes y la razón por la que no se van con otro.`,
        `<strong>¿De qué depende que gane más?</strong> Las dos o tres variables que mueven sus resultados. En la jerga se las llama <em>drivers</em>.`,
        `<strong>¿Qué la amenaza?</strong> Competencia, regulación, cambios tecnológicos, el precio de lo que vende.`,
        `<strong>¿Qué la protege?</strong> Lo que a un competidor le costaría mucho copiar: escala, red, marca, costos bajos, regulación.`
      ]},
      { t: "h", texto: "Las cinco preguntas aplicadas a las tres empresas del módulo" },
      { t: "tabla", cab: ["Pregunta", "MercadoLibre (MELI)", "Vista (VIST)", "JPMorgan (JPM)"], filas: [
        ["¿Cómo gana plata?", "Comisiones del marketplace, envíos, publicidad y, cada vez más, intereses de los créditos de Mercado Pago", "Vende petróleo y gas que extrae en Vaca Muerta; exporta la mayor parte del crudo", "Presta y cobra intereses, cobra comisiones por pagos, inversiones, banca de inversión y trading"],
        ["¿De qué depende?", "Cuánto se vende en la plataforma, el costo de los envíos y que los créditos se cobren", "El precio del petróleo, cuánto produce y cuánto le cuesta producir", "Las tasas de interés, cuánto presta, cuántos préstamos no se pagan y la actividad de los mercados"],
        ["¿Qué la amenaza?", "Competidores en Brasil (Shopee, por ejemplo) y morosidad en los créditos", "Una baja del petróleo, cambios en las reglas para exportar, infraestructura de transporte", "Una recesión que aumente los préstamos impagos, cambios regulatorios de capital"],
        ["¿Qué la protege?", "Red logística propia y un ecosistema: quien compra, paga y se financia en la misma app", "Costos de extracción muy bajos: unos USD 4,7 por barril en el 3T 2026", "Escala: es el mayor banco de depósitos minoristas de EE.UU. y un nombre que inspira confianza"]
      ], nota: "Fuentes: resultados del 3T 2026 de cada empresa y TIKR / Rallies.ai para la competencia de MELI en Brasil." },
      { t: "ej", id: "e1", tipo: "multi",
        enunciado: `Un cliente quiere comprar Vista. Marcá <strong>todas</strong> las variables que más pueden mover sus resultados en el próximo año.`,
        opciones: [
          { txt: "El precio internacional del petróleo (Brent).", ok: true, fb: "Es el driver principal: Vista vende un commodity cuyo precio no controla." },
          { txt: "Cuántos barriles produce por día y cuántos pozos nuevos conecta.", ok: true, fb: "El volumen es la otra mitad de la ecuación: precio por cantidad." },
          { txt: "La cantidad de usuarios activos en su aplicación y su frecuencia de uso mensual.", ok: false, fb: "Es una métrica clave para MELI o NU, no para una petrolera." },
          { txt: "El costo de sacar cada barril (lifting cost).", ok: true, fb: "Define cuánto le queda de cada barril vendido." },
          { txt: "Las reglas y la infraestructura para exportar crudo desde Argentina.", ok: true, fb: "Vista exporta cerca de tres cuartos de su crudo: si se complica exportar, se complica el negocio." },
          { txt: "La tasa de morosidad de su cartera de préstamos a consumidores.", ok: false, fb: "Aplica a bancos y fintechs como JPM, NU o Mercado Pago, no a una petrolera." }
        ],
        explicacion: `Identificar los drivers es lo que te permite leer una noticia y saber si importa. "Bajó el Brent" es una noticia relevante para VIST y XOM; para MSFT casi no lo es.` },
      { t: "h", texto: "Cuando la amenaza se materializa: el caso Globant" },
      { t: "p", html: `Globant vende servicios de desarrollo de software e inteligencia artificial a grandes empresas. Cobra por los equipos de profesionales que pone a trabajar para sus clientes. Su driver principal es cuántos proyectos le encargan, y eso depende de cuánto quieran gastar en tecnología sus clientes.` },
      { t: "mercado", titulo: "Lo que muestran sus números de 2026", html: `En el segundo trimestre de 2026 Globant facturó USD 614 millones, prácticamente lo mismo que un año antes, y bajó su proyección de ventas para todo el año. Pasó de 30.084 a 27.411 empleados en un año. Al mismo tiempo, impulsa un modelo nuevo de suscripción con "AI Pods" (equipos que combinan personas e inteligencia artificial).`, fuente: "Globant, resultados del 2T 2026 y guía para el 3T (agosto de 2026)" },
      { t: "ej", id: "e2", tipo: "mc",
        enunciado: `Con las cinco preguntas en mente, ¿cuál es la lectura más útil del caso Globant para un cliente que la tiene en cartera?`,
        opciones: [
          { txt: "Es una empresa argentina reconocida y siempre se recupera, así que conviene mantenerla sin mirar demasiado.", ok: false, fb: "La reputación pasada no responde las preguntas sobre el futuro del negocio." },
          { txt: "Se frenó la demanda de proyectos, su driver principal: hay que seguir si el modelo nuevo vuelve a hacer crecer las ventas.", ok: true, fb: "Exacto: identifica qué cambió y qué señal mirar." },
          { txt: "Bajar la cantidad de empleados siempre es mala señal: hay que venderla inmediatamente en cuanto se conozca el dato.", ok: false, fb: "Puede ser una mala señal o un ajuste de eficiencia. La decisión no sale de un solo dato." }
        ],
        explicacion: `Las cinco preguntas no son un examen de una vez: se vuelven a hacer cada trimestre. Cuando una respuesta cambia (acá, "de qué depende" y "qué la amenaza"), hay que revisar por qué se tiene la acción.` },
      { t: "ojo", titulo: "Repetir no es analizar", html: `"MELI es la Amazon de Latinoamérica" o "Vaca Muerta es el futuro" son frases que todos repiten. No son falsas, pero no ayudan a decidir: no dicen de qué depende la ganancia ni a qué precio tiene sentido comprar. Cuando te escuches repitiendo una frase así, preguntate: <em>¿y qué número tendría que mirar para saber si eso sigue siendo cierto?</em>` },
      { t: "cliente", titulo: "Cómo se lo explicás al cliente", html: `"Vista gana plata vendiendo petróleo de Vaca Muerta, y la mayor parte lo exporta. Le va bien si el petróleo vale caro, si sigue aumentando lo que produce y si le cuesta poco sacarlo. Lo que más le puede pegar es que el petróleo baje fuerte. Lo que la protege es que le cuesta muy poco sacar cada barril."` }
    ]
  },

  /* ------------------------------------------------------------ */
  {
    id: "e3",
    titulo: "Los números sin ser contadora",
    minutos: 12,
    objetivo: "Leer las cuatro líneas que importan de un estado contable y preguntarse si el negocio mejora o empeora.",
    bloques: [
      { t: "p", html: `No hace falta saber contabilidad para leer lo esencial de los resultados de una empresa. Alcanza con seguir el camino de la plata: <strong>cuánto entra, cuánto queda después de operar, cuánto queda al final y cuánto debe</strong>.` },
      { t: "tabla", cab: ["Línea", "Qué es", "Pregunta que hacerse"], filas: [
        ["Ventas (ingresos)", "Todo lo que facturó en el período", "¿Crece? ¿Más o menos rápido que antes?"],
        ["Resultado operativo", "Lo que queda después de los costos del negocio, antes de intereses e impuestos", "¿Qué porcentaje de las ventas queda? ¿Sube o baja?"],
        ["Ganancia neta", "Lo que queda para los accionistas al final", "¿Sube por el negocio o por algo extraordinario?"],
        ["Deuda neta", "Deuda menos la caja que tiene", "¿Cuántos años de generación necesita para pagarla?"]
      ]},
      { t: "p", html: `Hay un quinto número muy usado: el <span class="term" data-term="ebitda">EBITDA</span>, que es el resultado operativo antes de descontar amortizaciones. Sirve para comparar empresas con mucha inversión en equipos, como las petroleras. Y uno más importante todavía: el <span class="term" data-term="fcf">flujo de caja libre</span>, la plata que efectivamente sobra después de invertir.` },
      { t: "h", texto: "Los márgenes: de cada 100 dólares que entran, ¿cuántos quedan?" },
      { t: "p", html: `El <span class="term" data-term="margen">margen</span> es el resultado dividido por las ventas. Es la forma de comparar empresas de tamaños muy distintos. Con los números reales del tercer trimestre de 2026:` },
      { t: "grafico", id: "margenes" },
      { t: "ej", id: "e1", tipo: "estimar",
        enunciado: `MercadoLibre facturó USD 10.750 millones en el trimestre y su resultado operativo fue de USD 676 millones. ¿Cuál fue su margen operativo? Respondé en %.`,
        unidad: "%", respuesta: 6.3, tolerancia: 0.2,
        explicacion: `676 ÷ 10.750 = <strong>6,3%</strong>. De cada 100 dólares que factura, le quedan unos 6 después de operar. La empresa informó que el margen bajó 0,4 p.p. respecto del trimestre anterior por mayores costos de envío y de marketing. En una empresa que factura cerca de 40.000 millones por año, cada punto porcentual de margen son cientos de millones de dólares.` },
      { t: "ojo", titulo: "Un margen bajo no es automáticamente malo", html: `MELI tiene un margen mucho menor que Vista o JPMorgan, pero crece 45% por año y está invirtiendo para ganar participación de mercado. Vista tiene un margen altísimo porque vende un commodity con costos muy bajos, pero no controla el precio. <strong>Los márgenes se comparan contra la misma empresa en el tiempo y contra empresas parecidas</strong>, no entre negocios distintos.` },
      { t: "h", texto: "La calidad de la ganancia" },
      { t: "ej", id: "e2", tipo: "mc",
        enunciado: `La ganancia neta de MELI subió 6% (de 421 a 448 millones), pero su resultado operativo bajó 6,6%. Un analista señala que la tasa efectiva de impuestos bajó bastante en el trimestre. ¿Qué conclusión sacás?`,
        opciones: [
          { txt: "Que la ganancia subió por un efecto impositivo, no porque el negocio sea más rentable.", ok: true, fb: "Exacto: la mejora vino de abajo del resultado operativo, no del negocio." },
          { txt: "Que es una buena noticia: lo importante para el accionista es la ganancia final, y esa subió en el trimestre.", ok: false, fb: "La ganancia final importa, pero una mejora que viene de impuestos no necesariamente se repite." },
          { txt: "Que los números no son confiables y conviene no tomar ninguna decisión hasta que la empresa los aclare.", ok: false, fb: "Los números son públicos y auditados; el trabajo es interpretarlos, no descartarlos." }
        ],
        explicacion: `Se llama <strong>calidad de la ganancia</strong>: una ganancia que sale de vender más con buen margen es de mejor calidad que una que sale de un impuesto más bajo, de una venta de activos o de una ganancia por única vez. A Vista le pasó lo contrario: su ganancia neta bajó 7%, porque el año anterior había tenido una ganancia por única vez de una adquisición, mientras su negocio crecía fuerte.` },
      { t: "h", texto: "La deuda: ¿cuántos años tarda en pagarla?" },
      { t: "formula", html: `Deuda neta ÷ EBITDA anual = años de generación para pagar la deuda`, nota: "Una regla orientativa para empresas no financieras: por debajo de 2 veces suele considerarse manejable; por encima de 4, exigente. Depende mucho del sector." },
      { t: "mercado", titulo: "Vista en números", html: `Al cierre del tercer trimestre de 2026, Vista tenía una deuda neta de <strong>USD 2.857 millones</strong> y una relación deuda neta / EBITDA de <strong>1,12 veces</strong>, contra 1,83 un año antes. Invirtió más de USD 2.300 millones en doce meses (incluida la compra de activos de Equinor) y aun así bajó su endeudamiento relativo, porque su generación creció más rápido que su deuda. En el trimestre generó USD 334 millones de flujo de caja libre.`, fuente: "Vista Energy, 3T 2026; El Economista, 29/10/2026" },
      { t: "ej", id: "e3", tipo: "estimar",
        enunciado: `Con esos datos (deuda neta de USD 2.857 millones y 1,12 veces EBITDA), ¿cuál es aproximadamente el EBITDA de Vista de los últimos 12 meses? Respondé en millones de USD.`,
        unidad: "M USD", respuesta: 2551, tolerancia: 60,
        explicacion: `2.857 ÷ 1,12 ≈ <strong>USD 2.550 millones</strong>. Leer el ratio al revés ayuda a dimensionar: con la generación de un año, Vista podría cancelar casi toda su deuda neta. Para una empresa que está invirtiendo fuerte para crecer, es un nivel cómodo.` },
      { t: "cliente", titulo: "Cómo se lo explicás al cliente", html: `"De cada 100 dólares que factura MercadoLibre, después de pagar todo lo que necesita para funcionar le quedan unos 6. Ese número bajó un poco este trimestre porque están gastando para crecer. Lo que el mercado quiere ver es que, en algún momento, de esos 100 le queden más."` }
    ]
  },

  /* ------------------------------------------------------------ */
  {
    id: "e4",
    titulo: "¿Cara o barata? Los múltiplos",
    minutos: 13,
    objetivo: "Usar el P/E y otros múltiplos para discutir si un precio tiene sentido, entendiendo por qué un múltiplo alto puede estar justificado.",
    bloques: [
      { t: "p", html: `Saber que un negocio es bueno no alcanza: hay que saber si el precio lo refleja. La herramienta más usada es el <span class="term" data-term="pe">P/E</span> (en castellano, relación precio/ganancia): cuánto pagás hoy por cada dólar de ganancia anual de la empresa.` },
      { t: "formula", html: `P/E = Precio de la acción ÷ Ganancia por acción del año`, nota: "Una forma intuitiva de leerlo: cuántos años de la ganancia actual estás pagando por adelantado. Un P/E de 20 equivale a pagar 20 años de ganancias de hoy." },
      { t: "idea", titulo: "Por qué un P/E alto puede ser razonable", html: `Si la ganancia de la empresa va a crecer mucho, el P/E de hoy exagera lo que estás pagando. Un P/E de 40 sobre la ganancia de este año puede convertirse en un P/E de 20 sobre la ganancia de dentro de dos años, <strong>si</strong> ese crecimiento ocurre. Pagar un múltiplo alto es apostar a que el crecimiento llegue.` },
      { t: "mercado", titulo: "MercadoLibre a USD 1.490", html: `El 10 de noviembre la acción de MELI cerró en <strong>USD 1.490</strong>. Los analistas esperan, en promedio, una ganancia por acción de <strong>USD 38,26 en 2026</strong> y de <strong>USD 55,89 en 2027</strong> (46% más). Su P/E sobre ganancias esperadas a 12 meses estaba en torno a 41 veces a comienzos de noviembre, contra un promedio de unas 63 veces en los últimos cinco años.`, fuente: "TIKR, consenso de analistas al 2/11/2026 y precio al 10/11/2026" },
      { t: "ej", id: "e1", tipo: "estimar",
        enunciado: `Con precio USD 1.490 y la ganancia por acción esperada para 2027 (USD 55,89), ¿qué P/E estás pagando sobre las ganancias de 2027?`,
        unidad: "veces", respuesta: 26.7, tolerancia: 1,
        explicacion: `1.490 ÷ 55,89 ≈ <strong>26,7 veces</strong>. Sobre las ganancias de 2026 serían unas 39 veces. El mismo precio parece caro o razonable según qué ganancia mirás. Por eso la pregunta clave no es "¿el P/E es alto?" sino <strong>"¿creo que la ganancia va a crecer como espera el mercado?"</strong>. Si los márgenes siguen bajando, esos 55,89 no van a llegar.` },
      { t: "h", texto: "Probalo: crecimiento, múltiplo y rendimiento" },
      { t: "p", html: `El resultado de una acción en el largo plazo depende de dos cosas: <strong>cuánto crece la ganancia</strong> y <strong>qué múltiplo le pone el mercado al final</strong>. Probá qué pasa con una empresa que crece mucho pero cuyo múltiplo se achica.` },
      { t: "herramienta", id: "pe-crecimiento" },
      { t: "ej", id: "e2", tipo: "estimar",
        enunciado: `Usá la herramienta con los valores iniciales (precio 1.490, ganancia 38,26, crecimiento 30% anual durante 3 años y un P/E final de 25). ¿Qué rendimiento anual daría la acción? Respondé en %.`,
        unidad: "%", respuesta: 12.1, tolerancia: 1,
        explicacion: `La ganancia pasaría de 38,26 a unos 84 dólares por acción. Con un P/E de 25, el precio sería de unos USD 2.100: un rendimiento de alrededor de <strong>12% anual</strong>. Fijate que la ganancia crece 30% por año pero la acción rinde 12%, porque el múltiplo baja de 39 a 25. <strong>Una buena empresa comprada cara puede dar un resultado mediocre.</strong> No es una predicción sobre MELI: es la mecánica.` },
      { t: "h", texto: "Cada sector tiene su múltiplo preferido" },
      { t: "tabla", cab: ["Múltiplo", "Qué compara", "Dónde se usa más"], filas: [
        ["P/E", "Precio contra ganancia neta", "Empresas con ganancias estables: consumo, tecnología madura"],
        ["EV/EBITDA", "Valor de toda la empresa (incluida la deuda) contra su generación operativa", "Empresas con mucha deuda o mucha inversión: energía, industria, servicios públicos"],
        ["Precio / valor libros (P/BV)", "Precio contra el patrimonio contable", "Bancos: su negocio es su balance"]
      ]},
      { t: "p", html: `El <span class="term" data-term="ev">EV</span> (valor de empresa) suma la deuda neta al valor de las acciones. Importa porque dos petroleras con el mismo precio por acción pueden valer muy distinto si una debe mucho más que la otra: quien compra la empresa también se hace cargo de su deuda.` },
      { t: "ej", id: "e3", tipo: "estimar",
        enunciado: `La acción de JPMorgan cerraba en torno a USD 333 a comienzos de octubre de 2026, y su valor libros por acción al 30 de septiembre era de USD 132,30. ¿A cuántas veces su valor libros cotiza?`,
        unidad: "veces", respuesta: 2.5, tolerancia: 0.1,
        explicacion: `333 ÷ 132,30 ≈ <strong>2,5 veces</strong>. Se paga 2,5 dólares por cada dólar de patrimonio porque JPMorgan gana mucho sobre ese patrimonio: su rentabilidad sobre el capital tangible (ROTCE) fue de 20% en el trimestre. Un banco que gana 8% sobre su capital difícilmente justifique cotizar tan por encima de sus libros.` },
      { t: "ej", id: "e4", tipo: "mc",
        enunciado: `Un cliente compara: "La empresa A tiene P/E 12 y la B, P/E 35. Claramente A está más barata". ¿Qué falta en ese razonamiento?`,
        opciones: [
          { txt: "Nada: un P/E más bajo siempre significa que la acción está más barata y que tiene más margen de suba.", ok: false, fb: "Un P/E bajo puede reflejar que el mercado espera que la ganancia caiga." },
          { txt: "Falta mirar cuánto crecerá la ganancia de cada una: un P/E bajo puede reflejar un negocio en declive.", ok: true, fb: "Exacto: el múltiplo se lee junto con el crecimiento y contra comparables." },
          { txt: "Que el P/E no sirve para nada y lo único confiable es el gráfico del precio de los últimos meses.", ok: false, fb: "El P/E tiene límites, pero es una herramienta útil bien usada." }
        ],
        explicacion: `A una acción con P/E bajo cuyo negocio se está deteriorando se la llama "trampa de valor": parece barata y sigue bajando. El múltiplo es una pregunta, no una respuesta.` }
    ]
  },

  /* ------------------------------------------------------------ */
  {
    id: "e5",
    titulo: "Qué mirar según el sector",
    minutos: 10,
    objetivo: "Saber qué indicadores revisar en cada tipo de empresa, comparando cada empresa del módulo con un par.",
    bloques: [
      { t: "p", html: `Cada sector tiene sus propios drivers, y por eso sus propios indicadores. Una forma muy útil de aprender es <strong>comparar de a pares</strong>: dos empresas del mismo sector con estrategias distintas.` },
      { t: "h", texto: "Energía: Vista vs. ExxonMobil" },
      { t: "tabla", cab: ["", "Vista (VIST)", "ExxonMobil (XOM)"], filas: [
        ["Producción", "169.000 barriles equivalentes por día", "4,5 millones por día"],
        ["Crecimiento de producción", "+33% interanual", "Estable respecto del trimestre anterior"],
        ["Qué hace con la plata", "La reinvierte para crecer: USD 460 millones invertidos en el trimestre", "La devuelve: USD 9.400 millones en dividendos y recompras en el trimestre"],
        ["Negocio", "Solo extracción, casi todo en Vaca Muerta", "Integrada: extracción, refinación y química en todo el mundo"]
      ], nota: "Datos del 3T 2026. Fuentes: Vista Energy, ExxonMobil (30/10/2026), El Economista." },
      { t: "p", html: `Son dos apuestas distintas sobre el mismo commodity. Vista es <strong>crecimiento</strong>: más barriles cada año, más sensible al petróleo y al riesgo argentino. Exxon es <strong>madurez</strong>: produce parecido, diversificada en refinación (que este trimestre compensó la baja del crudo) y devuelve caja a sus accionistas. Qué indicadores mirar en energía: precio del petróleo, producción, costo por barril, inversión y deuda.` },
      { t: "ej", id: "e1", tipo: "mc",
        enunciado: `La gerencia de Vista indicó que su EBITDA del segundo semestre se mueve unos USD 200 millones por cada USD 10 de cambio en el precio del petróleo. Si el Brent baja USD 10, ¿qué esperarías?`,
        opciones: [
          { txt: "Un golpe directo a Vista; a Exxon también la afecta, pero su refinación puede amortiguar parte.", ok: true, fb: "Exacto: la integración de Exxon reduce su sensibilidad al crudo." },
          { txt: "Que las dos empresas se vean afectadas exactamente en la misma proporción, porque ambas venden el mismo producto.", ok: false, fb: "Venden el mismo commodity, pero Exxon tiene refinación y química, que reaccionan distinto." },
          { txt: "Que no pase nada importante, porque Vista exporta su crudo y cobra en dólares sin importar el precio.", ok: false, fb: "Cobrar en dólares la protege del peso, no del precio internacional del petróleo." }
        ],
        explicacion: `Esta sensibilidad es el número más útil para hablar de Vista con un cliente: traduce "baja el petróleo" en un impacto concreto sobre la generación de la empresa.` },
      { t: "h", texto: "Bancos: JPMorgan vs. Nubank" },
      { t: "p", html: `Un banco gana con el <strong>margen de interés</strong> (cobra más por lo que presta que lo que paga por los depósitos) y con <strong>comisiones</strong>. Su gran riesgo es que los préstamos no se paguen. En el tercer trimestre de 2026, el margen de interés neto de JPMorgan creció 13%, a USD 27.100 millones, y apartó USD 2.700 millones para cubrir préstamos incobrables. Nubank, en cambio, es un banco digital que crece rápido en Brasil, México y Colombia con más de 100 millones de clientes: más crecimiento, más riesgo de crédito y menos historia.` },
      { t: "ej", id: "e2", tipo: "multi",
        enunciado: `Marcá <strong>todos</strong> los indicadores que conviene mirar al analizar un banco.`,
        opciones: [
          { txt: "El margen de interés neto y cómo cambia con las tasas.", ok: true, fb: "Es su principal fuente de ingresos." },
          { txt: "La morosidad y lo que aparta para préstamos incobrables (previsiones).", ok: true, fb: "Es su principal riesgo." },
          { txt: "La rentabilidad sobre el patrimonio (ROE o ROTCE).", ok: true, fb: "Dice cuánto gana con el capital de los accionistas y justifica (o no) cotizar sobre su valor libros." },
          { txt: "El margen bruto sobre ventas, igual que en una empresa industrial.", ok: false, fb: "Un banco no tiene 'ventas' en el sentido tradicional: el margen bruto no aplica." },
          { txt: "El ratio de capital (cuánto colchón tiene frente a pérdidas).", ok: true, fb: "Define cuánto puede perder sin poner en riesgo a los depositantes. JPM tenía 13,9% a septiembre de 2026." },
          { txt: "El costo de extracción por unidad producida y su evolución trimestral.", ok: false, fb: "Es un indicador de petroleras, no de bancos." }
        ],
        explicacion: `En bancos el P/E se usa menos que el precio sobre valor libros, justamente porque lo que hay que evaluar es su balance: cuánto presta, a quién y con cuánto colchón.` },
      { t: "h", texto: "Plataformas y tecnología: MELI frente a las grandes" },
      { t: "p", html: `En plataformas como MercadoLibre importan el crecimiento de usuarios y de volumen, la frecuencia de uso y la evolución del margen. Las grandes tecnológicas que operan sus clientes (Microsoft, Apple, Alphabet) son negocios más maduros, con márgenes altos y mucha generación de caja: allí la pregunta es menos "¿va a crecer?" y más "¿cuánto puede sostener el crecimiento y a qué precio?". MELI está en una etapa distinta: lleva 31 trimestres seguidos creciendo más de 30%, pero todavía está demostrando cuánto margen le puede sacar a ese tamaño.` },
      { t: "tabla", cab: ["Sector", "Los 3 indicadores que más importan"], filas: [
        ["Energía (VIST, XOM)", "Precio del petróleo · producción · costo por barril"],
        ["Bancos (JPM, NU)", "Margen de interés · morosidad · rentabilidad sobre el patrimonio"],
        ["Plataformas (MELI)", "Crecimiento de volumen y usuarios · margen operativo · morosidad del crédito propio"],
        ["Tecnología madura (MSFT, AAPL, GOOGL)", "Crecimiento de ventas · margen · flujo de caja libre"],
        ["Servicios de tecnología (GLOB)", "Crecimiento de ventas · cantidad de profesionales · margen operativo"]
      ], nota: "Un ayudamemoria para tener a mano antes de leer los resultados de cualquier empresa." }
    ]
  },

  /* ------------------------------------------------------------ */
  {
    id: "e6",
    titulo: "CEDEARs y ETFs: cómo se invierte desde Argentina",
    minutos: 10,
    objetivo: "Entender qué hay adentro del precio de un CEDEAR y cuándo conviene un ETF en lugar de elegir empresas.",
    bloques: [
      { t: "p", html: `Un <span class="term" data-term="cedear">CEDEAR</span> es un certificado que se negocia en BYMA y representa una fracción de una acción del exterior. El <span class="term" data-term="ratio">ratio</span> dice cuántos CEDEARs equivalen a una acción: en MercadoLibre es 120 a 1, en Vista es 3 a 1.` },
      { t: "idea", titulo: "Lo que hay adentro del precio en pesos", html: `El precio de un CEDEAR en pesos combina dos cosas: <strong>el precio de la acción en dólares</strong> y <strong>el dólar contado con liquidación (CCL)</strong>. Por eso un cliente con CEDEARs tiene dos exposiciones a la vez: a la empresa y al tipo de cambio.` },
      { t: "formula", html: `Precio del CEDEAR en pesos ≈ (Precio de la acción en USD ÷ Ratio) × Dólar CCL`, nota: "Puede haber pequeñas diferencias por horarios de cotización y liquidez, pero el arbitraje mantiene esta relación muy cerca." },
      { t: "ejemplo", titulo: "El CEDEAR de MELI el 3 de noviembre", pasos: [
        `La acción de MELI en el Nasdaq: <strong>USD 1.662,16</strong>. Ratio: <strong>120 CEDEARs por acción</strong>. Dólar CCL: <strong>$1.673,75</strong>.`,
        `Cada CEDEAR representa 1.662,16 ÷ 120 = <strong>USD 13,85</strong> de acción.`,
        `En pesos: 13,85 × 1.673,75 ≈ <strong>$23.184</strong>.`,
        `En BYMA cerró en <strong>$23.190</strong>: prácticamente lo mismo.`
      ], conclusion: `Si mañana la acción no se mueve pero el CCL sube 3%, el CEDEAR sube alrededor de 3% en pesos. Para un cliente que mide su cartera en pesos, eso no es "ganancia de MercadoLibre", es dólar.` },
      { t: "ej", id: "e1", tipo: "estimar",
        enunciado: `Con esos mismos datos podés despejar el dólar implícito en el CEDEAR: precio del CEDEAR × ratio ÷ precio de la acción. ¿Qué CCL implícito da? Respondé en pesos.`,
        unidad: "$", respuesta: 1674, tolerancia: 5,
        explicacion: `23.190 × 120 ÷ 1.662,16 ≈ <strong>$1.674</strong>, casi igual al CCL de ese día. Este cálculo es útil para chequear si un CEDEAR está caro o barato respecto de su acción: si el CCL implícito es bastante más alto que el CCL de mercado, estás pagando un sobreprecio.` },
      { t: "ej", id: "e2", tipo: "mc",
        enunciado: `Un día la acción de MELI sube 2% en Nueva York, pero el CEDEAR cierra en baja en BYMA. El cliente piensa que hay un error. ¿Qué es lo más probable?`,
        opciones: [
          { txt: "Que ese día el dólar CCL bajó más de lo que subió la acción en Nueva York.", ok: true, fb: "Exacto: el precio en pesos combina acción y tipo de cambio." },
          { txt: "Que el emisor del CEDEAR cobró una comisión extraordinaria, que se descuenta del precio.", ok: false, fb: "No hay comisiones que se descuenten así del precio diario." },
          { txt: "Que los CEDEARs no siguen a la acción original, así que pueden moverse en cualquier dirección.", ok: false, fb: "La siguen muy de cerca a través del arbitraje; la diferencia viene del tipo de cambio." }
        ],
        explicacion: `Antes de explicarle a un cliente por qué se movió un CEDEAR, separá las dos partes: <strong>¿qué hizo la acción en dólares?</strong> y <strong>¿qué hizo el CCL?</strong>.` },
      { t: "ojo", titulo: "El cambio de ratio no cambia el valor", html: `Cuando el emisor cambia el ratio (por ejemplo, MELI pasó de 60 a 120 en 2024), el precio de cada CEDEAR baja a la mitad y el cliente pasa a tener el doble de certificados. Su inversión vale lo mismo. Es como cambiar un billete de $1.000 por dos de $500.` },
      { t: "h", texto: "¿Empresas individuales o ETF?" },
      { t: "p", html: `Un <span class="term" data-term="etf">ETF</span> es un fondo que cotiza como una acción y replica un índice o un sector. Con un CEDEAR del SPY (las 500 empresas más grandes de EE.UU.) o del XLE (energía), el cliente compra una canasta entera en una sola operación.` },
      { t: "tabla", cab: ["Conviene...", "Cuando..."], filas: [
        ["Un ETF", "No hay una tesis concreta sobre una empresa; el cliente quiere exposición a un mercado o sector; no se va a poder hacer seguimiento trimestral de cada empresa"],
        ["Una empresa individual", "Hay una tesis clara y medible (lección siguiente); el cliente entiende que puede salir mal aunque el sector vaya bien; el peso en la cartera es acotado"]
      ]},
      { t: "ej", id: "e3", tipo: "mc",
        enunciado: `Un cliente moderado quiere "tener algo de petróleo en la cartera" pero no tiene opinión sobre ninguna empresa en particular. ¿Qué le propondrías?`,
        opciones: [
          { txt: "Todo en Vista, porque es la que más crece del sector y el cliente conoce bien el contexto argentino.", ok: false, fb: "Es una apuesta concentrada en una empresa y en Argentina, para alguien sin tesis." },
          { txt: "Un ETF del sector energía: le da exposición al petróleo sin depender de una sola empresa.", ok: true, fb: "Exacto: la exposición que pide es al sector, y el ETF es la herramienta para eso." },
          { txt: "No invertir en energía hasta que tenga una tesis sólida sobre al menos tres petroleras diferentes.", ok: false, fb: "Puede tener exposición al sector sin necesidad de elegir empresas." }
        ],
        explicacion: `Elegir empresas individuales tiene sentido cuando hay algo que decir sobre esa empresa en particular. Si el pedido es "el sector", la herramienta natural es el ETF.` }
    ]
  },

  /* ------------------------------------------------------------ */
  {
    id: "e7",
    titulo: "Del análisis al cliente: la tesis de inversión",
    minutos: 11,
    objetivo: "Escribir una tesis de inversión en tres líneas, con una señal concreta que indique cuándo dejó de valer.",
    bloques: [
      { t: "p", html: `Todo el módulo desemboca acá. Una <span class="term" data-term="tesis">tesis de inversión</span> es la razón, explicada en pocas líneas, por la que tiene sentido comprar una acción a este precio. Lo que la diferencia de una opinión es que dice <strong>qué tendría que pasar para estar equivocado</strong>.` },
      { t: "formula", html: `Compro <em>[empresa]</em> porque <em>[motivo de negocio]</em>.<br>El precio es razonable porque <em>[múltiplo y crecimiento]</em>.<br>Dejaría de tener sentido si <em>[señal concreta y medible]</em>.`, nota: "Si no podés completar la tercera línea, no tenés una tesis: tenés una esperanza." },
      { t: "h", texto: "Una tesis buena y una mala sobre la misma empresa" },
      { t: "tabla", cab: ["Tesis débil", "Tesis con criterio"], filas: [
        ["\"Compro MELI porque es la mejor empresa de Latinoamérica y bajó mucho, tiene que rebotar.\"", "\"Compro MELI porque sigue creciendo más de 30% y su crédito se cobra (morosidad estable en 7%). A 27 veces las ganancias esperadas para 2027 el precio es razonable si los márgenes dejan de caer. Dejaría de tener sentido si el margen operativo sigue bajando dos trimestres más o si sube la morosidad.\""]
      ], nota: "La tesis con criterio es una postura, no una recomendación: otro asesor puede llegar a una conclusión distinta con los mismos datos. Lo importante es que se pueda verificar." },
      { t: "ej", id: "e1", tipo: "multi",
        enunciado: `Para una tesis sobre Vista, marcá <strong>todas</strong> las señales que sirven como "dejaría de tener sentido si...".`,
        opciones: [
          { txt: "Si la producción deja de crecer en los próximos trimestres sin una explicación puntual.", ok: true, fb: "Es medible y ataca el corazón de la tesis de crecimiento." },
          { txt: "Si el Brent se mantiene por debajo de un nivel en el que el negocio deja de generar caja suficiente para invertir.", ok: true, fb: "Ata la tesis al driver principal con un umbral concreto." },
          { txt: "Si la acción baja un 10% en una semana por un movimiento general del mercado.", ok: false, fb: "Un movimiento de precio no invalida el negocio; puede incluso mejorar el punto de entrada." },
          { txt: "Si cambian las reglas para exportar crudo de una forma que reduzca sus ingresos en dólares.", ok: true, fb: "Exporta cerca de tres cuartos de su crudo: es un riesgo central." },
          { txt: "Si algún analista conocido en las redes sociales empieza a hablar mal de la empresa.", ok: false, fb: "No es una señal del negocio. La tesis se revisa con datos, no con opiniones." }
        ],
        explicacion: `Las buenas señales de salida hablan del <strong>negocio</strong> (drivers, márgenes, deuda), no del precio de la semana ni de la opinión de terceros.` },
      { t: "h", texto: "La tesis también define el tamaño" },
      { t: "p", html: `Una acción individual, por buena que sea la tesis, no debería ser una parte grande de la cartera de un cliente que no es agresivo. La tesis puede fallar por razones imposibles de prever. Una regla práctica: que el peso de una sola acción sea tal que, si cae 40%, la cartera total lo aguante sin cambiar los planes del cliente.` },
      { t: "ej", id: "e2", tipo: "estimar",
        enunciado: `Un cliente moderado tiene USD 100.000 y quiere poner USD 15.000 en una sola acción. Si esa acción cae 40%, ¿cuánto cae la cartera total por ese motivo? Respondé en %.`,
        unidad: "%", respuesta: 6, tolerancia: 0.3,
        explicacion: `15.000 × 40% = USD 6.000 de pérdida, que sobre USD 100.000 es un <strong>6%</strong> de la cartera. Para un perfil moderado puede ser tolerable. Con USD 40.000 en esa acción, la misma caída sería 16% de la cartera: probablemente demasiado. El tamaño es parte de la recomendación, no un detalle.` },
      { t: "ej", id: "e3", tipo: "caso",
        enunciado: `Elegí JPMorgan o Globant y escribí su tesis en tres líneas, con el formato de la lección. Usá lo que viste en el módulo (drivers, números, múltiplos).`,
        rubrica: [
          "La primera línea explica un motivo de negocio, no una frase repetida (\"es líder\", \"bajó mucho\").",
          "La segunda línea dice algo sobre el precio: un múltiplo o una comparación con el crecimiento.",
          "La tercera línea tiene una señal concreta y medible para revisar la tesis.",
          "Podría explicársela a un cliente en menos de un minuto."
        ],
        modelo: `JPMorgan: "Compro JPM porque es el banco más grande de EE.UU., con un margen de interés que creció 13% interanual y una rentabilidad sobre el capital cercana al 20%. Pagar 2,5 veces su valor libros es razonable para un banco que gana 20% sobre su patrimonio. Dejaría de tener sentido si la rentabilidad cae de forma sostenida por debajo de 15% o si las previsiones por préstamos incobrables se disparan." — Globant: "Compro GLOB porque su modelo de suscripción con inteligencia artificial puede volver a hacer crecer las ventas, y el precio ya descuenta una empresa estancada. Dejaría de tener sentido si en los próximos dos trimestres las ventas siguen sin crecer y la proyección anual vuelve a bajar."` },
      { t: "cliente", titulo: "Cómo se lo explicás al cliente", html: `"Te propongo esta acción por esta razón concreta. A este precio tiene sentido si pasa esto. Y te digo desde ahora qué tendría que ver para recomendarte venderla. Así, si cae, sabemos si es una mala semana o si nos equivocamos."` }
    ]
  }
  ]
};
