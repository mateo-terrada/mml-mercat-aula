/* ============================================================
   MÓDULO · Macro argentina para asesores
   Contenido nuevo (no está en el Book). Datos atados a
   noviembre de 2026, a pedido: no se actualizan automáticamente.
   ============================================================ */
window.AULA = window.AULA || { modulos: {} };

AULA.modulos.macro = {
  id: "macro",
  numero: "08",
  titulo: "Macro argentina para asesores",
  bajada: "Del titular a la cartera: qué variable se movió, qué activos se mueven por eso y qué hacer con cada cliente. Con la foto de noviembre de 2026 y las elecciones de 2027 como eje.",
  fuente: "Contenido nuevo · datos a noviembre de 2026",
  practica: [
    { titulo: "¿Qué hago si...?", desc: "El escenario de riesgo país en suba y toma de ganancias, y el de cobertura en pesos.", href: "simulador.html" },
    { titulo: "Práctica diaria · Macro Argentina", desc: "26 preguntas del banco sobre inflación, tasas, reservas, riesgo país y dólar.", href: "practica.html" }
  ],
  evaluacion: {
    cantidad: 12,
    ids: ["MACRO-MC-001","MACRO-MC-002","MACRO-MC-003","MACRO-MC-004","MACRO-MC-005","MACRO-MC-007","MACRO-MC-008",
          "MACRO-MC-009","MACRO-MC-010","MACRO-MC-011","MACRO-MC-012","MACRO-MC-013","MACRO-MC-014","MACRO-MC-015",
          "MACRO-MC-016","MACRO-MC-017","MACRO-MC-018","MACRO-MC-019","MACRO-MC-021","MACRO-MC-022",
          "MACRO-CASO-001","MACRO-CASO-002","MACRO-CASO-003","TRAMPA-MC-019"]
  },
  lecciones: [

  /* ------------------------------------------------------------ */
  {
    id: "m1",
    titulo: "El mapa: del titular a la cartera",
    minutos: 10,
    objetivo: "Traducir una noticia macro en tres pasos: qué variable se movió, qué activos reaccionan y qué decisión implica para cada cliente.",
    bloques: [
      { t: "p", html: `Todos los días aparecen titulares: "sube el riesgo país", "la inflación sorprendió", "el dólar toca máximos". El cliente pregunta "¿y esto qué significa para mí?". Para responder no hace falta ser economista: hace falta un método de tres pasos.` },
      { t: "lista", items: [
        `<strong>¿Qué variable se movió?</strong> Casi todo lo que importa entra en cinco: inflación, tasas en pesos, dólar, riesgo país y el contexto internacional.`,
        `<strong>¿Qué activos reaccionan y para qué lado?</strong> Cada variable empuja a algunos instrumentos para arriba y a otros para abajo.`,
        `<strong>¿Cambia algo para este cliente?</strong> Muchas veces la respuesta es "no": la cartera ya estaba armada para que esto pudiera pasar.`
      ]},
      { t: "idea", titulo: "La pregunta que ordena todo", html: `Una noticia no es buena ni mala en abstracto: es buena para algunos activos y mala para otros. La pregunta profesional no es "¿qué pasó?" sino <strong>"¿qué parte de la cartera de este cliente está expuesta a esto?"</strong>.` },
      { t: "herramienta", id: "mapa-transmision" },
      { t: "ej", id: "e1", tipo: "mc",
        enunciado: `Con la herramienta: si el riesgo país sube fuerte, ¿qué parte de una cartera argentina suele caer más?`,
        opciones: [
          { txt: "Las LECAP cortas, porque son deuda del Tesoro y el riesgo país mide justamente el riesgo del Tesoro.", ok: false, fb: "Son del Tesoro, pero vencen pronto: casi no se mueven." },
          { txt: "Los Globales largos y las acciones locales: mucha duration o mucha sensibilidad al riesgo argentino.", ok: true, fb: "Exacto: es donde más pega un aumento del riesgo país." },
          { txt: "Los CEDEARs, porque cotizan en BYMA y por lo tanto también dependen del riesgo argentino.", ok: false, fb: "Cotizan acá, pero el activo es del exterior: en dólares no los afecta el riesgo argentino." }
        ],
        explicacion: `Es lo que pasó entre julio y noviembre de 2026: el riesgo país pasó de unos 430 a más de 900 puntos básicos, y los que más sufrieron fueron los bonos largos y las acciones locales.` },
      { t: "ej", id: "e2", tipo: "multi",
        enunciado: `El dato de inflación sale bastante por encima de lo esperado. Marcá <strong>todos</strong> los efectos típicos de primer orden.`,
        opciones: [
          { txt: "Los bonos CER ganan demanda como cobertura.", ok: true, fb: "Es su función." },
          { txt: "Las BONCAP largas a tasa fija pierden.", ok: true, fb: "Tasa fija y larga: lo más castigado por más inflación." },
          { txt: "Los CEDEARs medidos en dólares caen fuerte.", ok: false, fb: "Son activos del exterior: en dólares, la inflación argentina casi no los toca." },
          { txt: "Los Globales suben porque el país recauda más.", ok: false, fb: "No hay un efecto directo así; en todo caso, más inflación genera dudas." },
          { txt: "El dollar-linked casi no reacciona en lo inmediato.", ok: true, fb: "Sigue al dólar oficial, no a los precios." }
        ],
        explicacion: `El mapa no es una ley, pero ordena la primera reacción. Con práctica, ante cada titular vas a pensar automáticamente qué parte de cada cartera está expuesta.` },
      { t: "cliente", titulo: "Cómo se lo explicás al cliente", html: `"Lo que pasó afecta sobre todo a esta parte de tu cartera; esta otra no lo siente. Cuando la armamos, contamos con que algo así podía pasar. Lo que tenemos que ver es si cambia algo de tus planes, no solo de la noticia."` }
    ]
  },

  /* ------------------------------------------------------------ */
  {
    id: "m2",
    titulo: "Riesgo país, deuda y el muro de 2027",
    minutos: 11,
    objetivo: "Entender por qué subió el riesgo país en 2026, qué es el 'muro de vencimientos' de 2027 y qué señales podrían hacerlo bajar.",
    bloques: [
      { t: "p", html: `El riesgo país resume en un número cuánto duda el mercado de que la Argentina pague su deuda en dólares. Después de bajar con fuerza, en 2026 volvió a subir: estaba en torno a <strong>430 puntos básicos en julio</strong> y llegó a <strong>939 el 6 de noviembre</strong>.` },
      { t: "grafico", id: "riesgopais" },
      { t: "h", texto: "La razón de fondo: cuándo vence la deuda" },
      { t: "p", html: `Una parte importante de la explicación está en el calendario de pagos. En 2026 los vencimientos en dólares fueron manejables; en 2027 se multiplican, y coinciden con las elecciones presidenciales.` },
      { t: "grafico", id: "vencimientos" },
      { t: "p", html: `El Gobierno planteó cubrir esos pagos sin volver a emitir deuda en los mercados internacionales: con superávit fiscal, compras de dólares del BCRA, emisiones de bonos en dólares en el mercado local (los nuevos Bonares AO27 y AO28) y financiamiento de organismos. El mercado duda de que alcance, y esa duda se ve en el riesgo país.` },
      { t: "mercado", titulo: "Qué dicen los analistas", html: `En noviembre de 2026, los analistas atribuyen la suba a una combinación de factores externos (la volatilidad alrededor de las elecciones de medio término en EE.UU. del 3 de noviembre) y de dudas locales sobre los vencimientos de 2027 y 2028. Mientras tanto, el dólar mayorista se mantuvo estable: una tensión en los bonos no siempre viene con una corrida cambiaria.`, fuente: "Invecq, Perfil y The Rio Times, 5 al 9 de noviembre de 2026" },
      { t: "ej", id: "e1", tipo: "mc",
        enunciado: `Un cliente pregunta: "Si el dólar está tranquilo, ¿por qué se cayeron mis Globales?". ¿Qué le respondés?`,
        opciones: [
          { txt: "Que los Globales y el dólar se mueven siempre juntos, así que la caída tiene que ser un error de la pantalla del broker.", ok: false, fb: "Son dos cosas distintas que pueden moverse por separado." },
          { txt: "Que el dólar mide el tipo de cambio y los Globales, la confianza en que el país pague: la duda está en 2027.", ok: true, fb: "Exacto: riesgo de crédito y tipo de cambio son variables distintas." },
          { txt: "Que el dólar está tranquilo porque el BCRA lo controla, y por eso tienen que caer los bonos para compensar.", ok: false, fb: "No hay una compensación mecánica entre los dos." }
        ],
        explicacion: `En 2026 se dio una combinación poco intuitiva para muchos clientes: dólar estable y bonos en baja. Distinguir riesgo cambiario de riesgo de crédito es clave para explicarla.` },
      { t: "h", texto: "Qué podría hacer bajar el riesgo país" },
      { t: "lista", items: [
        `<strong>Que el BCRA siga comprando dólares.</strong> Más reservas significan más capacidad de pago. En 2026 lleva comprados más de USD 16.000 millones.`,
        `<strong>Un canje o refinanciación</strong> que estire los vencimientos de 2027.`,
        `<strong>Volver a emitir deuda en los mercados internacionales</strong> a una tasa razonable.`,
        `<strong>Menos incertidumbre electoral</strong> (el tema de la próxima lección).`,
        `<strong>Un contexto global más tranquilo:</strong> tasas más bajas en EE.UU., menos aversión al riesgo.`
      ]},
      { t: "ej", id: "e2", tipo: "estimar",
        enunciado: `Si el riesgo país bajara 300 puntos básicos (o sea, unos 3 p.p. de TIR), ¿cuánto subiría aproximadamente un Global con duration 5,5? Respondé en %.`,
        unidad: "%", respuesta: 16.5, tolerancia: 1.5,
        explicacion: `300 puntos básicos de riesgo país son 3 p.p. de TIR. Duration 5,5 × 3 ≈ <strong>16,5%</strong> (algo más por la curvatura, como viste en el taller de duration). Por eso, cuando el mercado espera una baja del riesgo país, busca bonos largos.` },
      { t: "cliente", titulo: "Cómo se lo explicás al cliente", html: `"El año que viene la Argentina tiene que pagar mucho más de lo que pagó este año, y justo es año electoral. El mercado duda de que esté todo cubierto y por eso le pide más tasa al país. Si las dudas se despejan, los bonos pueden recuperarse; si no, pueden seguir volátiles."` }
    ]
  },

  /* ------------------------------------------------------------ */
  {
    id: "m3",
    titulo: "Elecciones 2027: cómo se ve en los precios y qué hacer con la cartera",
    minutos: 13,
    objetivo: "Leer el riesgo electoral en la curva de bonos y ordenar la conversación sobre exposición onshore y offshore, sin hacer apuestas políticas.",
    bloques: [
      { t: "p", html: `Las elecciones presidenciales de octubre de 2027 ya están en los precios. No hace falta opinar sobre quién va a ganar: el mercado muestra cuánto le preocupa la incertidumbre, y eso es lo que importa para armar carteras.` },
      { t: "ojo", titulo: "Una regla de oro para esta lección", html: `Tu trabajo no es predecir elecciones ni decirle al cliente a quién votar. Es <strong>medir cuánto de su patrimonio depende de un resultado</strong> y que esa exposición sea la que él elige conscientemente, de acuerdo con su perfil.` },
      { t: "h", texto: "La curva cuenta la historia" },
      { t: "p", html: `El Tesoro emitió en 2026 dos Bonares muy parecidos: el <strong>AO27</strong>, que vence el 29 de octubre de 2027, y el <strong>AO28</strong>, que vence el 31 de octubre de 2028. Mismo cupón (6%), misma ley, mismo emisor. La diferencia clave: el AO27 lo paga el gobierno actual, cuyo mandato termina en diciembre de 2027; el AO28 lo tiene que pagar <strong>el gobierno que salga de las elecciones</strong>.` },
      { t: "grafico", id: "curva-electoral" },
      { t: "p", html: `Los analistas calculan con estos dos bonos la llamada <strong>tasa forward</strong>: cuánto tendría que rendir el AO27, reinvertido entre 2027 y 2028, para empatar al AO28. A fines de septiembre de 2026 llegó a un récord cercano al <strong>20% anual en dólares</strong>. Traducido: el mercado le pide un rendimiento altísimo a quien se quede expuesto al año que cruza la elección.` },
      { t: "ej", id: "e1", tipo: "mc",
        enunciado: `Un cliente conservador quiere dólares en bonos argentinos, pero le preocupa "lo que pueda pasar en 2027". ¿Qué alternativa encaja con eso?`,
        opciones: [
          { txt: "El AO28, porque rinde casi tres veces más que el AO27 y compensa de sobra cualquier riesgo electoral.", ok: false, fb: "Rinde más justamente porque cruza la elección: es lo opuesto a lo que pide." },
          { txt: "Bonos que vencen dentro del mandato actual, como el AO27: rinde poco, pero lo paga el gobierno actual.", ok: true, fb: "Exacto: el plazo es la herramienta más directa para no quedar expuesto a un evento." },
          { txt: "Ningún bono argentino, porque cualquier título del Tesoro tiene el mismo riesgo electoral sin importar el plazo.", ok: false, fb: "El plazo cambia mucho la exposición: la curva lo muestra." }
        ],
        explicacion: `El rendimiento bajo del AO27 es el "precio" de evitar el riesgo electoral. Para un conservador puede ser un precio razonable; para un agresivo, el AO28 puede ser una oportunidad si acepta la volatilidad. Las dos decisiones son válidas según el perfil.` },
      { t: "h", texto: "Lo que ya pasó una vez" },
      { t: "p", html: `En agosto de 2019, después de las elecciones primarias, los activos argentinos se desplomaron en un solo día. En las semanas siguientes se reperfilaron letras del Tesoro y volvió el control de cambios. No significa que vaya a repetirse, pero explica por qué el mercado cobra un premio alto por quedar expuesto a una elección.` },
      { t: "h", texto: "Onshore y offshore: las capas del riesgo argentino" },
      { t: "p", html: `Muchos clientes hoy preguntan "¿cuánto tengo que tener afuera?". Una forma ordenada de pensarlo es separar <strong>tres capas de riesgo</strong>: quién debe (el emisor), bajo qué ley (local o extranjera) y dónde está custodiado el activo (en Argentina o afuera).` },
      { t: "grafico", id: "onshore-offshore" },
      { t: "tabla", cab: ["Instrumento", "Protege de...", "No protege de..."], filas: [
        ["Bono que vence dentro del mandato actual (AO27)", "La incertidumbre sobre el próximo gobierno", "Lo que pase antes; el bajo rendimiento"],
        ["Globales (ley NY) en vez de Bonares", "Parte del riesgo legal en una reestructuración", "El riesgo de crédito argentino"],
        ["CEDEARs", "El riesgo de crédito argentino", "Restricciones locales para vender o transferir si vuelven controles"],
        ["Cuenta en el exterior", "Restricciones locales sobre los activos", "Nada de lo local, pero tiene costos y requisitos propios"]
      ], nota: "No hay una respuesta única: depende del perfil, del patrimonio total del cliente y de cuánto de su vida (ingresos, gastos, propiedades) ya depende de la Argentina." },
      { t: "ej", id: "e2", tipo: "multi",
        enunciado: `Un cliente moderado tiene 90% de su patrimonio financiero en activos argentinos y te pide "prepararse para 2027". Marcá <strong>todas</strong> las medidas razonables para discutir con él.`,
        opciones: [
          { txt: "Revisar cuánto de su cartera vence o se mueve después de octubre de 2027.", ok: true, fb: "Es el primer diagnóstico: medir la exposición." },
          { txt: "Sumar diversificación con CEDEARs o ETFs para bajar la dependencia del riesgo argentino.", ok: true, fb: "Baja la exposición al crédito argentino." },
          { txt: "Pasar todo a un bono largo que rinda mucho, para aprovechar la tasa alta que paga el mercado.", ok: false, fb: "Eso aumenta la exposición al evento que le preocupa." },
          { txt: "Preferir bonos que venzan dentro del mandato actual para la parte que no quiere arriesgar.", ok: true, fb: "Usa el plazo como herramienta." },
          { txt: "Decidir la cartera según quién creemos que va a ganar las elecciones.", ok: false, fb: "Es una apuesta, no una gestión de riesgo." },
          { txt: "Evaluar, según su patrimonio, si tiene sentido una parte custodiada en el exterior.", ok: true, fb: "Es la última capa de protección; tiene costos y requisitos que hay que evaluar." }
        ],
        explicacion: `El objetivo no es sacar todo de la Argentina ni quedarse quieto: es que la exposición al resultado electoral sea una decisión consciente y proporcional al perfil.` },
      { t: "ej", id: "e3", tipo: "caso",
        enunciado: `Un cliente te dice: "Estoy seguro de que en 2027 se pudre todo, quiero sacar todo afuera ya". Tiene perfil moderado y gastos en pesos. Escribí en 4 o 5 líneas cómo lo encararías.`,
        rubrica: [
          "No discute la predicción política ni da la propia.",
          "Separa el miedo (legítimo) de la decisión: cuánto de su patrimonio quiere exponer.",
          "Recuerda que sus gastos son en pesos: necesita una parte en pesos o accesible localmente.",
          "Propone pasos graduales y herramientas concretas (plazos dentro del mandato actual, CEDEARs, eventualmente custodia afuera).",
          "Menciona el costo de sobrerreaccionar: rendimiento resignado si el escenario no ocurre."
        ],
        modelo: `"Entiendo la preocupación, y no te voy a decir si va a pasar o no: nadie lo sabe. Lo que sí podemos hacer es que no dependa todo de eso. Como tus gastos son en pesos, una parte tiene que quedar disponible acá. Del resto, podemos bajar la exposición argentina en etapas: bonos que vencen dentro de este mandato, más CEDEARs y, si tiene sentido por el monto, una parte afuera. Si pasamos todo de golpe y no pasa nada, también tiene un costo."` }
    ]
  },

  /* ------------------------------------------------------------ */
  {
    id: "m4",
    titulo: "El dólar y el régimen de bandas",
    minutos: 10,
    objetivo: "Entender cómo funciona el esquema de bandas, qué hace el BCRA y por qué el dólar subió mucho menos que la inflación en 2026.",
    bloques: [
      { t: "p", html: `Desde 2025 el dólar oficial se mueve dentro de una <strong>banda</strong>: un piso y un techo. Entre los dos flota libremente. Desde enero de 2026, los límites se actualizan cada mes según la inflación de dos meses antes.` },
      { t: "grafico", id: "bandas" },
      { t: "h", texto: "Lo que pasó en 2026" },
      { t: "p", html: `El dato más importante del año: hasta mediados de octubre el dólar mayorista había subido apenas <strong>3,1%</strong>, mientras la inflación acumulaba más de 20%. Eso tiene dos lecturas, y el cliente va a escuchar las dos:` },
      { t: "lista", items: [
        `<strong>La lectura optimista:</strong> entran dólares (Vaca Muerta, campo, inversiones) y el BCRA pudo comprar más de USD 16.000 millones sin que el dólar suba.`,
        `<strong>La lectura cautelosa:</strong> el dólar está "barato" contra los precios internos (atraso cambiario). Si cambia el humor, hay mucho espacio para subir antes de tocar el techo.`
      ]},
      { t: "ej", id: "e1", tipo: "mc",
        enunciado: `El dólar mayorista está a unos $445 del techo de la banda. Un cliente dice: "Entonces el dólar no puede subir, el BCRA no lo deja". ¿Qué le aclarás?`,
        opciones: [
          { txt: "Que tiene razón: mientras exista la banda, el BCRA vende dólares todos los días para que el precio no suba nada.", ok: false, fb: "Dentro de la banda, el BCRA no está obligado a intervenir." },
          { txt: "Que dentro de la banda el dólar flota: podría subir casi 30% antes de que el BCRA esté obligado a vender.", ok: true, fb: "Exacto: el techo es un límite, no un precio que se defiende día a día." },
          { txt: "Que la banda se elimina automáticamente si el dólar sube más de 10% en un mes, así que no protege nada.", ok: false, fb: "No hay una regla así en el esquema." }
        ],
        explicacion: `El techo no es una predicción del precio del dólar: es el nivel en el que el BCRA se compromete a intervenir. Entre el precio actual y el techo hay mucho recorrido posible.` },
      { t: "h", texto: "Oficial, MEP y CCL" },
      { t: "p", html: `Con el fin de los controles para personas humanas en 2025, el dólar oficial, el MEP y el CCL quedaron muy cerca entre sí. La <strong>brecha</strong> (la diferencia entre el oficial y los financieros) es un termómetro: si empieza a abrirse, suele ser una señal de que el mercado busca cobertura o de que aparecen restricciones.` },
      { t: "ej", id: "e2", tipo: "multi",
        enunciado: `Marcá <strong>todas</strong> las señales que conviene seguir para anticipar presión sobre el dólar.`,
        opciones: [
          { txt: "Si el BCRA deja de comprar dólares o empieza a vender.", ok: true, fb: "Indica que la oferta de dólares se secó." },
          { txt: "Si la brecha entre el oficial y el MEP o CCL se abre.", ok: true, fb: "Muestra demanda de cobertura." },
          { txt: "Si los contratos de dólar futuro empiezan a acercarse al techo de la banda.", ok: true, fb: "Muestra lo que espera el mercado." },
          { txt: "Si sube el precio de las acciones tecnológicas de Estados Unidos.", ok: false, fb: "No es una señal directa sobre el dólar en Argentina." },
          { txt: "Si los dollar-linked empiezan a rendir mucho menos que las LECAP del mismo plazo.", ok: true, fb: "Más demanda de cobertura cambiaria baja su rendimiento." }
        ],
        explicacion: `Ningún indicador solo alcanza, pero varios a la vez cuentan una historia. Para el asesor, la clave es detectar el cambio de tendencia, no adivinar el precio.` },
      { t: "cliente", titulo: "Cómo se lo explicás al cliente", html: `"El dólar se mueve entre un piso y un techo. Este año estuvo muy tranquilo, lejos del techo, porque entraron muchos dólares. Eso no garantiza nada: puede subir bastante sin que nadie intervenga. Por eso no apostamos todo a que se quede quieto ni a que salte."` }
    ]
  },

  /* ------------------------------------------------------------ */
  {
    id: "m5",
    titulo: "Inflación: el dato contra lo esperado",
    minutos: 9,
    objetivo: "Leer un dato de inflación como lo lee el mercado: contra lo esperado y separando el ruido de la tendencia.",
    bloques: [
      { t: "p", html: `Cada mes, a mediados de mes, el INDEC publica la inflación del mes anterior. Los precios de los bonos no reaccionan al número en sí, sino a la <strong>diferencia con lo que se esperaba</strong>. Lo que se esperaba está en el <span class="term" data-term="rem">REM</span>, la encuesta que hace el BCRA a consultoras y bancos.` },
      { t: "grafico", id: "sorpresa-ipc" },
      { t: "mercado", titulo: "El dato de octubre de 2026", html: `La inflación de octubre fue <strong>2,2%</strong>, el dato más alto desde abril, contra un <strong>1,8%</strong> que esperaba el REM. Pero la <strong>núcleo</strong> (que deja afuera precios estacionales y regulados) fue <strong>1,5%</strong>, por debajo del 1,7% esperado y la más baja en más de un año. Los estacionales (verduras) subieron 5,5% y los regulados (gas, combustibles) 2,9%. La interanual bajó a 33,1%.`, fuente: "INDEC, 12/11/2026, vía Rankia, Infobae y MDZ" },
      { t: "idea", titulo: "General contra núcleo", html: `La inflación <strong>general</strong> es lo que siente el bolsillo. La <strong>núcleo</strong> muestra la tendencia de fondo, sin los saltos de precios estacionales ni las decisiones de tarifas. Un mes con general alta y núcleo baja (como octubre) suele leerse como un salto puntual, no como un cambio de tendencia.` },
      { t: "ej", id: "e1", tipo: "mc",
        enunciado: `Con el dato de octubre (general 2,2% contra 1,8% esperado; núcleo 1,5% contra 1,7% esperado), ¿cuál es la lectura más equilibrada?`,
        opciones: [
          { txt: "La inflación se está acelerando de forma sostenida y hay que pasar toda la renta fija en pesos a CER.", ok: false, fb: "La núcleo bajó: la evidencia de una aceleración de fondo es débil." },
          { txt: "El salto vino de verduras y tarifas; la núcleo mejoró. Es una sorpresa, no un cambio de rumbo.", ok: true, fb: "Exacto: separar el ruido de la tendencia." },
          { txt: "El dato no importa, porque la inflación interanual bajó y eso es lo único que miran los inversores.", ok: false, fb: "La interanual importa, pero el mercado reacciona al dato mensual contra lo esperado." }
        ],
        explicacion: `Para el cliente con plata en pesos, la decisión entre CER y tasa fija (el taller de CER) se apoya en esta lectura: una sorpresa puntual no justifica dar vuelta la cartera.` },
      { t: "h", texto: "Las expectativas hacia adelante" },
      { t: "p", html: `El REM de noviembre proyectaba una inflación de <strong>30,4% para todo 2026</strong>. Con 26,3% acumulado hasta octubre, faltan noviembre y diciembre. Estas expectativas son las que el mercado usa para fijar las tasas de las LECAP y los CER: si la inflación termina por encima, gana el CER; por debajo, la tasa fija.` },
      { t: "ej", id: "e2", tipo: "estimar",
        enunciado: `Si el REM espera 30,4% para 2026 y hasta octubre se acumuló 26,3%, ¿qué inflación mensual promedio aproximada están esperando para noviembre y diciembre? Respondé en %.`,
        unidad: "%", respuesta: 1.6, tolerancia: 0.3,
        explicacion: `1,304 ÷ 1,263 ≈ 1,032: unos 3,2 p.p. en dos meses, cerca de <strong>1,6% por mes</strong>. A ojo: 30,4 − 26,3 ≈ 4 p.p. en dos meses, unos 2% por mes; la cuenta exacta da algo menos porque los porcentajes se acumulan. Si noviembre vuelve a salir arriba de 2%, el año va a cerrar por encima de lo esperado.` }
    ]
  },

  /* ------------------------------------------------------------ */
  {
    id: "m6",
    titulo: "Tasas en pesos y licitaciones del Tesoro",
    minutos: 10,
    objetivo: "Entender qué es una tasa real positiva o negativa, por qué importan las licitaciones del Tesoro y qué es el carry trade.",
    bloques: [
      { t: "p", html: `Las tasas en pesos (de la caución, de las LECAP, de los plazos fijos) determinan si conviene estar en pesos o no. La pregunta clave siempre es la misma: <strong>¿la tasa le gana a la inflación esperada?</strong>` },
      { t: "tabla", cab: ["Si la tasa en pesos...", "Se llama", "Qué suele pasar"], filas: [
        ["Le gana a la inflación esperada", "Tasa real positiva", "Conviene quedarse en pesos; baja la presión sobre el dólar"],
        ["Queda por debajo", "Tasa real negativa", "Los pesos pierden poder de compra; aumenta la demanda de dólares"]
      ]},
      { t: "ej", id: "e1", tipo: "mc",
        enunciado: `En la licitación del 11 de noviembre de 2026, la LECAP a enero de 2027 se colocó al 2,08% mensual. La inflación de octubre fue 2,2% y el REM espera alrededor de 1,6% para los próximos meses. ¿Cómo leés esa tasa?`,
        opciones: [
          { txt: "Muy negativa: siempre hay que comparar contra el último dato de inflación, que fue 2,2% en octubre.", ok: false, fb: "Lo relevante es la inflación que viene, no solo la que pasó." },
          { txt: "Levemente positiva contra lo esperado (1,6%), pero ajustada: con inflación cerca de 2%, queda en cero.", ok: true, fb: "Exacto: la tasa real depende de la inflación esperada, y el margen es chico." },
          { txt: "Muy positiva, porque cualquier tasa por encima de 2% mensual le gana siempre a la inflación argentina.", ok: false, fb: "No hay un número mágico: depende de la inflación de cada período." }
        ],
        explicacion: `Una tasa real chica o dudosa es una señal a seguir: si la inflación no baja, los pesos pierden atractivo y puede aumentar la demanda de dólares.` },
      { t: "h", texto: "Las licitaciones: el termómetro de los pesos" },
      { t: "p", html: `Cada dos semanas, aproximadamente, el Tesoro licita LECAP, BONCAP, CER y otros títulos para pagar los que vencen. El dato clave es el <strong>rollover</strong>: qué porcentaje de lo que vence se renueva. Si es alto (100% o más), los inversores siguen eligiendo pesos. Si es bajo, el Tesoro devuelve pesos al mercado, que pueden ir a consumo, a otros activos o al dólar.` },
      { t: "mercado", titulo: "Lo que viene", html: `El 11 de noviembre de 2026 el Tesoro colocó $8,87 billones y logró un rollover del <strong>84%</strong>: devolvió pesos al mercado. Las próximas son exigentes: el <strong>30 de noviembre</strong> vencen títulos por <strong>$29,4 billones</strong> y el <strong>15 de diciembre</strong>, otros <strong>$36,6 billones</strong>.`, fuente: "Ámbito (11/11/2026) e iProfesional, noviembre de 2026" },
      { t: "ej", id: "e2", tipo: "mc",
        enunciado: `En la licitación de fin de noviembre, el Tesoro renueva solo el 70% de los vencimientos. ¿Qué efecto de primer orden esperarías?`,
        opciones: [
          { txt: "Más pesos en manos del mercado: pueden presionar sobre el dólar y las tasas cortas tienden a bajar.", ok: true, fb: "Exacto: un rollover bajo libera pesos." },
          { txt: "Que el Tesoro deje de pagar el 30% de los títulos que vencen, porque no consiguió con qué pagarlos.", ok: false, fb: "Paga todo: lo que no renueva lo paga con pesos que ya tenía depositados." },
          { txt: "Ningún efecto, porque las licitaciones en pesos no tienen relación con el dólar ni con las tasas.", ok: false, fb: "Son uno de los principales determinantes de la liquidez en pesos." }
        ],
        explicacion: `No es necesariamente malo: a veces el Tesoro decide devolver pesos porque la economía los necesita. Pero conviene seguirlo junto con el dólar y las tasas.` },
      { t: "h", texto: "El carry trade" },
      { t: "p", html: `Hacer <span class="term" data-term="carry">carry trade</span> es quedarse en pesos ganando tasa, apostando a que el dólar suba menos que esa tasa. En 2026 fue muy rentable: las tasas en pesos rondaron 2% mensual y el dólar subió apenas 3% en diez meses. El riesgo es que el dólar salte de golpe y se lleve meses de ganancia en pocos días.` },
      { t: "cliente", titulo: "Cómo se lo explicás al cliente", html: `"Estar en pesos este año rindió mucho más que el dólar. Pero es una ganancia que se gana de a poco y se puede perder de golpe. Por eso, salvo que vayas a gastar en pesos, no conviene tener todo ahí: lo que no vas a usar pronto conviene repartirlo."` }
    ]
  },

  /* ------------------------------------------------------------ */
  {
    id: "m7",
    titulo: "El mundo también mueve a la Argentina, y la rutina del asesor",
    minutos: 12,
    objetivo: "Reconocer los factores externos que más pesan en los activos argentinos y armar una rutina semanal para seguir la macro sin ahogarse en noticias.",
    bloques: [
      { t: "h", texto: "Cuatro canales externos" },
      { t: "tabla", cab: ["Factor", "Qué pasó en 2026", "Cómo llega a la Argentina"], filas: [
        ["Tasas de EE.UU.", "La Fed mantuvo su tasa entre 3,75% y 4% en octubre; el bono del Tesoro a 10 años llegó a superar 5%, máximos desde 2007", "Sube la tasa base de todos los bonos en dólares: pegan más en los largos"],
        ["Petróleo", "El Brent superó USD 115 a fines de octubre y bajó a unos USD 92 hacia el 10 de noviembre", "Vaca Muerta: exportaciones, dólares para el país, resultados de VIST e YPF"],
        ["Brasil", "Lula fue reelecto el 25 de octubre con 51,8%; al día siguiente la bolsa cayó cerca de 14% y el real se depreció más de 8%", "Principal socio comercial; EWZ en carteras argentinas"],
        ["Política de EE.UU.", "En las elecciones de medio término del 3 de noviembre, los demócratas ganaron las dos cámaras del Congreso", "Volatilidad global; vínculo financiero y diplomático con la Argentina"]
      ], nota: "Fuentes: EFE (28/10), Admiral Markets y Commodity Board (Brent), Primicias y La República (Brasil), The Rio Times. Datos a noviembre de 2026." },
      { t: "ej", id: "e1", tipo: "mc",
        enunciado: `El Brent pasó de unos USD 117 a unos USD 92 en dos semanas. Vista estimó que su EBITDA del semestre se mueve unos USD 200 millones por cada USD 10 de cambio en el petróleo. ¿Qué conclusión sacás?`,
        opciones: [
          { txt: "Que el impacto es grande: USD 25 menos de crudo, sostenidos, son unos USD 500 M de EBITDA por semestre.", ok: true, fb: "Exacto: 2,5 veces la sensibilidad de USD 200 millones." },
          { txt: "Que no la afecta, porque Vista vende su petróleo con contratos de largo plazo a precio fijo en dólares.", ok: false, fb: "Su ingreso depende del precio internacional; usa coberturas solo de corto plazo." },
          { txt: "Que la favorece, porque un petróleo más barato baja sus costos de producción y transporte en Vaca Muerta.", ok: false, fb: "Vista vende petróleo: un precio más bajo reduce sus ingresos." }
        ],
        explicacion: `Esta es la conexión que queremos que salga sola: un titular internacional, una variable (petróleo), un activo concreto (VIST) y un número aproximado del impacto.` },
      { t: "h", texto: "La rutina semanal del asesor" },
      { t: "p", html: `No hace falta leer todo. Hace falta mirar siempre lo mismo, en el mismo orden, y anotar si algo cambió.` },
      { t: "tabla", cab: ["Cuándo", "Qué mirar", "Pregunta para hacerse"], filas: [
        ["Todos los días (2 minutos)", "Riesgo país, dólar mayorista y CCL, tasa de caución", "¿Se movió algo más de lo normal?"],
        ["Cada licitación del Tesoro", "Rollover, tasas convalidadas, qué instrumentos se ofrecieron", "¿El mercado sigue eligiendo pesos?"],
        ["Mediados de mes", "Dato de inflación del INDEC contra el REM, general y núcleo", "¿Fue sorpresa? ¿De fondo o puntual?"],
        ["Comienzos de mes", "REM del BCRA", "¿Cambiaron las expectativas de inflación y dólar?"],
        ["Todas las semanas", "Compras del BCRA, distancia del dólar al techo de la banda", "¿Sigue entrando oferta de dólares?"],
        ["Cuando ocurren", "Reuniones de la Fed, precio del petróleo, Brasil", "¿Afecta a algún activo de mis clientes?"]
      ]},
      { t: "h", texto: "Cómo leer un informe de research en 5 minutos" },
      { t: "lista", items: [
        `<strong>Leé primero la conclusión</strong>, no el desarrollo: ¿qué recomiendan y por qué?`,
        `<strong>Buscá el supuesto clave</strong>: ¿de qué depende que la recomendación funcione? (por ejemplo, "si el riesgo país baja a 600").`,
        `<strong>Preguntate qué clientes tuyos están expuestos</strong> a lo que dice el informe.`,
        `<strong>No traslades la recomendación tal cual</strong>: un informe no conoce el perfil de tu cliente.`
      ]},
      { t: "ej", id: "e2", tipo: "caso",
        enunciado: `Titular del día: "El riesgo país sube 60 puntos básicos y la inflación de noviembre se proyecta por encima de 2%". Tenés tres clientes: uno conservador con LECAP y AO27; uno moderado con Globales largos, ONs y CEDEARs; uno agresivo con acciones argentinas. Escribí en 5 o 6 líneas qué revisarías con cada uno.`,
        rubrica: [
          "Identifica las dos variables que se movieron (riesgo país e inflación).",
          "Conservador: poco impacto en el AO27 por plazo; revisa la tasa real de las LECAP frente a la inflación esperada y evalúa CER.",
          "Moderado: los Globales largos y las ONs son lo más expuesto; los CEDEARs amortiguan; revisa si su horizonte tolera la volatilidad.",
          "Agresivo: las acciones locales son lo más sensible; revisa que la exposición sea la que eligió y no reacciona en pánico.",
          "No propone cambios drásticos por un solo titular."
        ],
        modelo: `"Se movieron el riesgo país y la inflación esperada. Al conservador casi no lo toca el riesgo país porque su AO27 vence pronto; con él reviso si las LECAP le siguen ganando a la inflación o si conviene sumar algo de CER. Al moderado lo que más le pega es la parte de Globales largos; los CEDEARs le amortiguan. Le recuerdo por qué los tiene y que su horizonte permite esperar. Al agresivo le va a pegar fuerte en las acciones; confirmo que esa exposición es la que eligió y que no está pensando en vender en el peor momento. Con ninguno cambio la cartera por un solo titular."` }
    ]
  }
  ]
};
