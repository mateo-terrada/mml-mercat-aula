/* ============================================================
   MÓDULO · Fondos comunes de inversión
   Base: Book cap. 6 + factsheets de Balanz al 30/09/2026.
   ============================================================ */
window.AULA = window.AULA || { modulos: {} };

AULA.modulos.fci = {
  id: "fci",
  numero: "06",
  titulo: "Fondos comunes de inversión",
  bajada: "Un fondo es lo que tiene adentro, no lo que dice su nombre. Cómo leer un factsheet en cinco claves, cuánto se lleva la comisión y cómo elegir el fondo para cada necesidad.",
  fuente: "Cap. 6 del Book · factsheets de Balanz al 30/09/2026",
  practica: [
    { titulo: "Práctica diaria · Fondos Comunes", desc: "Preguntas nuevas sobre factsheets, clases, comisiones y elección de fondos.", href: "practica.html" }
  ],
  evaluacion: {
    cantidad: 10,
    ids: ["FCI-MC-001","FCI-MC-002","FCI-MC-003","FCI-MC-004","FCI-MC-005","FCI-MC-006","FCI-MC-007","FCI-MC-008",
          "FCI-MC-009","FCI-MC-010","FCI-MC-011","FCI-CASO-001","TRAMPA-MC-006","PORT-MC-008"]
  },
  lecciones: [

  /* ------------------------------------------------------------ */
  {
    id: "f1",
    titulo: "Qué es un fondo (y qué no es)",
    minutos: 8,
    objetivo: "Entender cómo funciona la cuotaparte, quién cuida el dinero, qué significa que el rendimiento sea neto y qué riesgos no desaparecen por estar en un fondo.",
    bloques: [
      { t: "p", html: `Un fondo común de inversión junta el dinero de muchos inversores y lo invierte una sociedad gerente según una estrategia escrita en su reglamento. Cada inversor tiene <span class="term" data-term="cuotaparte">cuotapartes</span>: una porción de esa cartera común. El valor de la cuotaparte se publica todos los días y sube o baja con los activos que tiene el fondo.` },
      { t: "analogia", titulo: "Una forma de pensarlo", html: `Un fondo es como una canasta armada por otro. Vos no elegís cada producto, pero comprás una porción de la canasta entera. Si sube el precio de lo que hay adentro, tu porción vale más; si baja, vale menos. <strong>La canasta no tiene un valor propio: vale lo que vale su contenido.</strong>` },
      { t: "tabla", cab: ["Quién", "Qué hace", "En los factsheets de Balanz"], filas: [
        ["Sociedad gerente", "Decide qué comprar y vender", "Balanz Sociedad Gerente de FCI"],
        ["Sociedad depositaria", "Guarda los activos, separados de los de la gerente", "Banco de Valores S.A."],
        ["Auditor", "Revisa las cuentas", "KPMG"],
        ["CNV", "Regula y controla", "—"]
      ], nota: "Si la sociedad gerente quebrara, los activos del fondo siguen siendo de los cuotapartistas: están en la depositaria." },
      { t: "ej", id: "e1", tipo: "estimar",
        enunciado: `Un cliente invierte $2.000.000 en un fondo cuya cuotaparte vale $1.600. Un mes después la cuotaparte vale $1.632. ¿Cuánto vale su inversión? Respondé en pesos.`,
        unidad: "$", respuesta: 2040000, tolerancia: 2000,
        explicacion: `Compró 2.000.000 ÷ 1.600 = <strong>1.250 cuotapartes</strong>. Un mes después: 1.250 × 1.632 = <strong>$2.040.000</strong>, una suba de 2%. La cantidad de cuotapartes no cambia; cambia lo que vale cada una.` },
      { t: "h", texto: "Tres cosas que conviene tener claras" },
      { t: "lista", items: [
        `<strong>El rendimiento publicado es neto.</strong> Las comisiones se descuentan todos los días del valor de la cuotaparte. No hay una "factura" aparte: si el fondo cobra 2,45% por año, ya está restado.`,
        `<strong>No está garantizado.</strong> Todos los factsheets lo aclaran: un fondo no es un depósito bancario. Puede bajar.`,
        `<strong>El plazo de rescate cambia según el fondo.</strong> T+0 (en el día), T+1 o 48 horas. No es un detalle: si el cliente necesita la plata mañana, un fondo a 48 horas no le sirve.`
      ]},
      { t: "ej", id: "e2", tipo: "mc",
        enunciado: `Un cliente tiene dinero en el fondo Balanz Lecaps y te pregunta: "Si Balanz quebrara, ¿pierdo la plata del fondo?". ¿Qué le respondés?`,
        opciones: [
          { txt: "Que no por la quiebra en sí: los activos están en la depositaria, separados de los de la gerente.", ok: true, fb: "Exacto. Lo que sí sigue existiendo es el riesgo de los activos que el fondo tiene adentro." },
          { txt: "Que sí, porque el dinero del fondo forma parte del patrimonio de la sociedad gerente que lo administra.", ok: false, fb: "No: la ley separa los activos del fondo de los de la gerente." },
          { txt: "Que no, porque los fondos tienen garantía del Banco Central hasta un monto, igual que un plazo fijo.", ok: false, fb: "Los fondos no tienen la garantía de los depósitos. Lo dice cada factsheet." }
        ],
        explicacion: `Es una pregunta frecuente, sobre todo en clientes nuevos. La protección es la separación de patrimonios, no una garantía de rendimiento ni de capital.` },
      { t: "cliente", titulo: "Cómo se lo explicás al cliente", html: `"Un fondo es una cartera armada por profesionales en la que vos tenés una parte. Tu plata no está mezclada con la de la empresa que lo administra. Rinde lo que rinden los activos de adentro, menos una comisión que ya viene descontada. Por eso, antes de elegirlo, miramos qué tiene adentro."` }
    ]
  },

  /* ------------------------------------------------------------ */
  {
    id: "f2",
    titulo: "El mapa de fondos: para qué sirve cada uno",
    minutos: 10,
    objetivo: "Ubicar cada tipo de fondo según moneda, plazo de rescate y riesgo, y relacionarlo con una necesidad concreta del cliente.",
    bloques: [
      { t: "p", html: `La mejor forma de ordenar los fondos no es por nombre, sino por tres preguntas: <strong>¿en qué moneda?</strong>, <strong>¿cuándo puedo sacar la plata?</strong> y <strong>¿a qué riesgo estoy expuesto?</strong> Con eso ya sabés para qué cliente sirve cada uno.` },
      { t: "grafico", id: "mapa-fondos" },
      { t: "idea", titulo: "Lo que ya sabés, empaquetado", html: `Casi todo lo del Aula aplica acá. Un fondo de Lecaps se comporta como una Lecap corta; un fondo de soberanos en dólares, como los Globales (con su riesgo país y su duration); un fondo de ONs, como las ONs. <strong>El fondo no cambia el riesgo de los activos: lo diversifica y lo empaqueta.</strong>` },
      { t: "h", texto: "Los fondos que más vas a usar" },
      { t: "lista", items: [
        `<strong>Money market (pesos o dólares):</strong> el lugar para la plata que se va a usar pronto o que espera una decisión. Rescate en el día, rendimiento parecido a la caución.`,
        `<strong>Lecaps:</strong> un escalón más de rendimiento que el money market en pesos, con duration muy baja y también rescate en el día.`,
        `<strong>Latam (con Argentina):</strong> bonos en dólares de la región, incluida Argentina. Más rendimiento, pero con algo de riesgo argentino.`,
        `<strong>Latam sin Argentina (Sudamericano):</strong> dólares rindiendo sin riesgo de crédito argentino. Rinde menos porque los emisores son más sólidos.`
      ]},
      { t: "mercado", titulo: "¿Por qué los fondos 'Latam' son casi siempre Mercosur y Chile?", html: `Las normas de la CNV exigen que los fondos argentinos inviertan la mayor parte de su cartera (75%) en activos de Argentina o del Mercosur y Chile. Por eso un fondo "Latam sin Argentina" se concentra en Brasil, Chile, Uruguay y Paraguay, y casi no tiene México, Colombia o Perú.`, fuente: "El Cronista, sobre fondos latinoamericanos" },
      { t: "ej", id: "e1", tipo: "mc",
        enunciado: `Una clienta vendió un departamento, cobró en dólares y va a comprar otro en unas tres semanas. Mientras tanto, quiere que los dólares rindan algo. ¿Qué fondo encaja mejor?`,
        opciones: [
          { txt: "Sudamericano: dólares sin riesgo argentino, ideal para no exponerse a nada local mientras espera.", ok: false, fb: "Tiene rescate a 48 horas y puede tener semanas negativas: para tres semanas no hace falta ese riesgo." },
          { txt: "Money market en dólares: rescate en el día y casi sin oscilaciones, para un plazo tan corto.", ok: true, fb: "Exacto: la prioridad es tener la plata disponible y entera." },
          { txt: "Latam con Argentina, porque rinde más que los otros fondos en dólares y la diferencia compensa.", ok: false, fb: "Más rendimiento implica más riesgo de que el día de la compra valga menos." }
        ],
        explicacion: `Para plata con fecha de uso cercana, el criterio número uno es la disponibilidad y la estabilidad, no el rendimiento. Es la misma lógica de perfil y horizonte del módulo 02.` },
      { t: "h", texto: "Fondos en dólares: MEP o cable" },
      { t: "p", html: `Los fondos en dólares no siempre usan el mismo dólar. Algunos se suscriben y rescatan en dólar MEP (el dólar local) y otros en dólar cable (CCL, el dólar afuera), sobre todo los que invierten en el exterior, como Balanz Renta Variable Global. Antes de suscribir, chequeá en la ficha del fondo cuál usa. Si el cliente tiene MEP y el fondo opera en cable, hay un paso extra (y un costo, si hay diferencia entre los dos).` },
      { t: "ej", id: "e2", tipo: "multi",
        enunciado: `Marcá <strong>todas</strong> las combinaciones de cliente y fondo que tienen sentido.`,
        opciones: [
          { txt: "Pesos para pagar sueldos el viernes → money market en pesos.", ok: true, fb: "Rescate en el día y sin oscilaciones." },
          { txt: "Dólares a 2 o 3 años, sin querer riesgo argentino → Sudamericano.", ok: true, fb: "Es justamente para eso." },
          { txt: "Pesos que necesita en 10 días → un fondo de ONs en pesos.", ok: false, fb: "Tiene más duration y riesgo de crédito: no es para 10 días." },
          { txt: "Cliente preocupado por las elecciones de 2027 → Latam con Argentina.", ok: false, fb: "Sigue teniendo riesgo argentino: no resuelve su preocupación." },
          { txt: "Pesos de mediano plazo, buscando algo más que una caución → Lecaps.", ok: true, fb: "Un escalón más de rendimiento, con poco riesgo." }
        ],
        explicacion: `El fondo correcto sale de la necesidad del cliente (moneda, plazo y qué riesgo quiere evitar), no del fondo que más rindió.` }
    ]
  },

  /* ------------------------------------------------------------ */
  {
    id: "f3",
    titulo: "Leer el factsheet: las cinco claves",
    minutos: 12,
    objetivo: "Usar siempre la misma rutina para leer un factsheet: estrategia, TIR, duration, composición y top 10, y comisiones.",
    bloques: [
      { t: "p", html: `El <span class="term" data-term="factsheet">factsheet</span> es el informe mensual de una página que publica cada fondo. La descripción comercial ("Diversificá tus riesgos invirtiendo en Latam") dice lo que el fondo quiere ser. El factsheet muestra lo que es. Tu trabajo es leer el segundo, no repetir el primero.` },
      { t: "idea", titulo: "La rutina, siempre en el mismo orden", html: `<strong>1. Estrategia:</strong> ¿en qué invierte y para qué? · <strong>2. TIR:</strong> ¿cuánto rinde hoy la cartera? · <strong>3. Duration:</strong> ¿cuánto se mueve si cambian las tasas? · <strong>4. Composición y top 10:</strong> ¿qué tiene realmente y qué tan concentrado está? · <strong>5. Comisiones:</strong> ¿cuánto se lleva el fondo y en qué clase está el cliente?` },
      { t: "herramienta", id: "factsheet" },
      { t: "h", texto: "Cómo se usa cada número" },
      { t: "tabla", cab: ["Punto", "Para qué sirve", "Un error típico"], filas: [
        ["TIR", "Compararlo con alternativas: una Lecap, un bono, otro fondo", "Tomarla como promesa, o compararla con el rendimiento pasado"],
        ["Duration", "Saber cuánto puede caer si suben las tasas (el taller de duration)", "Pensar que 'fondo de renta fija' significa que no puede bajar"],
        ["Composición", "Ver qué riesgos hay realmente adentro", "Quedarse con el nombre del fondo"],
        ["Top 10", "Ver si depende de pocos emisores", "No mirarlo, o no notar que falta"],
        ["Comisiones", "Saber cuánto del rendimiento queda para el cliente", "Mirar solo la clase más barata, que el cliente quizás no tiene"]
      ]},
      { t: "ej", id: "e1", tipo: "estimar",
        enunciado: `El fondo Sudamericano tiene duration 1. Si las tasas de los bonos que tiene suben 1,5 p.p., ¿cuánto caería aproximadamente la cuotaparte? Respondé en % (como número positivo).`,
        unidad: "%", respuesta: 1.5, tolerancia: 0.3,
        explicacion: `Duration 1 × 1,5 p.p. ≈ <strong>1,5%</strong>. Es poco, pero alcanza para que un fondo "conservador" en dólares tenga un año negativo, como le pasó en 2021 y 2022.` },
      { t: "ej", id: "e2", tipo: "mc",
        enunciado: `El factsheet de Balanz Lecaps dice TIR 25,5% y el cuadro muestra que en 2025 el fondo rindió 35,15%. Un cliente pregunta cuánto va a ganar el año que viene. ¿Qué dato usás como referencia?`,
        opciones: [
          { txt: "El 35,15% de 2025, porque es un año completo y muestra lo que el fondo puede rendir en la práctica.", ok: false, fb: "Es pasado: las tasas en pesos de 2025 eran más altas que las de hoy." },
          { txt: "La TIR de 25,5%, menos la comisión de su clase: es lo que rinde hoy la cartera, sin ser una promesa.", ok: true, fb: "Exacto: la TIR mira hacia adelante; el cuadro de rendimientos, hacia atrás." },
          { txt: "Ninguno de los dos, porque en un fondo de renta fija es imposible estimar el rendimiento futuro.", ok: false, fb: "Se puede estimar razonablemente con la TIR, sobre todo con duration tan baja." }
        ],
        explicacion: `En 2026 hasta septiembre el fondo rindió 21,97%: mucho menos que en 2025, porque bajaron las tasas. Quien eligió el fondo por "el 35% del año pasado" se llevó una sorpresa.` },
      { t: "cliente", titulo: "Cómo se lo explicás al cliente", html: `"Este fondo hoy rinde alrededor de X% por año antes de comisiones; en tu clase te quedarían cerca de Y%. Invierte en tal cosa, y si las tasas se mueven, puede oscilar más o menos tanto. Lo que rindió el año pasado no es lo que va a rendir ahora."` }
    ]
  },

  /* ------------------------------------------------------------ */
  {
    id: "f4",
    titulo: "El nombre contra lo que tiene adentro",
    minutos: 9,
    objetivo: "Detectar cuándo el nombre, la descripción o el horizonte de un fondo no coinciden con lo que muestra su cartera.",
    bloques: [
      { t: "p", html: `El nombre de un fondo es una etiqueta comercial. El reglamento suele darle al gestor bastante margen, y la cartera puede tener cosas que el nombre no anticipa. No es necesariamente malo, pero tenés que saberlo antes que el cliente.` },
      { t: "grafico", id: "nombre-adentro" },
      { t: "p", html: `En el fondo Balanz Lecaps, un cuarto de la cartera no son Lecaps: hay plazos fijos y bonos CER. Para un fondo de corto plazo es razonable, pero el 10,5% en CER no se comporta igual que una Lecap: depende de la inflación y de las tasas reales.` },
      { t: "ej", id: "e1", tipo: "multi",
        enunciado: `Mirando los factsheets de Balanz Lecaps y Sudamericano, marcá <strong>todo</strong> lo que vale la pena señalar porque no se ve en la descripción comercial.`,
        opciones: [
          { txt: "El fondo de Lecaps tiene cerca de 26% en otros activos.", ok: true, fb: "Plazos fijos, CER y liquidez." },
          { txt: "El Sudamericano dice 'mediano plazo' pero tiene duration 1.", ok: true, fb: "Su sensibilidad a tasas es baja para lo que sugiere el horizonte." },
          { txt: "El top 10 del Sudamericano no trae porcentajes.", ok: true, fb: "No sabés cuánto pesa cada emisor." },
          { txt: "El Sudamericano tiene bonos soberanos argentinos.", ok: false, fb: "No: excluye Argentina, y su cartera lo confirma." },
          { txt: "El fondo de Lecaps cobra comisión de rescate.", ok: false, fb: "El factsheet aclara que no hay comisiones de entrada ni de salida." },
          { txt: "El cuadro de rendimientos del Sudamericano es de una clase que no figura en las comisiones.", ok: true, fb: "Es de la clase E: hay que confirmar cuál ofrecés." }
        ],
        explicacion: `Ninguno de estos puntos invalida a los fondos. Lo importante es que vos los sepas y puedas explicarlos antes de que el cliente los descubra solo.` },
      { t: "h", texto: "Mismo apellido, distinto riesgo" },
      { t: "p", html: `Balanz tiene dos fondos "Latam": el <strong>Latam (Estrategia III)</strong>, que incluye bonos argentinos, y el <strong>Sudamericano</strong>, que los excluye. Para un cliente que quiere sacarse riesgo argentino antes de 2027, la diferencia es enorme. La palabra "Latam" sola no alcanza: hay que ver si dice "sin Argentina" y confirmarlo en la composición.` },
      { t: "ej", id: "e2", tipo: "mc",
        enunciado: `Un cliente quiere bajar la exposición argentina antes de las elecciones de 2027 y te dice: "Pasame todo al fondo Latam, que es región". ¿Qué hacés primero?`,
        opciones: [
          { txt: "Lo suscribís en el Latam: es renta fija en dólares de la región, que es exactamente lo que él pidió.", ok: false, fb: "El Latam con Argentina no resuelve lo que le preocupa." },
          { txt: "Le explicás que hay dos 'Latam' y que solo uno excluye Argentina, y verificás eso en la composición.", ok: true, fb: "Exacto: primero entender qué quiere evitar y después verificar." },
          { txt: "Le recomendás no usar fondos, porque nunca se sabe con certeza qué tienen en cada momento.", ok: false, fb: "Sí se sabe: está en el factsheet y en la cartera publicada. Hay que leerla." }
        ],
        explicacion: `Es el error de "repetir la mini descripción": el nombre del fondo coincide con lo que pidió el cliente, pero el riesgo no.` },
      { t: "ojo", titulo: "Dónde buscar cuando el factsheet no alcanza", html: `Si falta el top 10 o los porcentajes, buscá la cartera completa en la web de la gestora o en la Cámara Argentina de FCI (CAFCI). Y si algo no te cierra, preguntale a la gestora: para eso tienen ejecutivos de cuenta.` }
    ]
  },

  /* ------------------------------------------------------------ */
  {
    id: "f5",
    titulo: "Comisiones y clases: el costo que no se ve",
    minutos: 9,
    objetivo: "Medir cuánto del rendimiento se lleva la comisión, entender las clases de cuotaparte y comparar el fondo con comprar los activos directo.",
    bloques: [
      { t: "p", html: `Un mismo fondo puede tener varias <span class="term" data-term="clase">clases</span> de cuotapartes: los mismos activos, pero distinta comisión según el monto o el tipo de inversor. La comisión parece un número chico, pero hay que compararla con lo que rinde el fondo, no con cero.` },
      { t: "herramienta", id: "fee-calc" },
      { t: "ej", id: "e1", tipo: "estimar",
        enunciado: `Sudamericano clase A: TIR 5,33%, comisión de gerente 1% y depositaria cerca de 0,1%. ¿Qué porcentaje del rendimiento se lleva la comisión? Respondé en %.`,
        unidad: "%", respuesta: 20, tolerancia: 3,
        explicacion: `1,1 ÷ 5,33 ≈ <strong>20%</strong>. Uno de cada cinco dólares de rendimiento queda para el fondo. En el fondo de Lecaps, clase A, la comisión es más alta (2,45%) pero sobre 25,5% es cerca de 10%. <strong>Una comisión "baja" sobre un rendimiento bajo puede pesar más que una comisión "alta" sobre un rendimiento alto.</strong>` },
      { t: "h", texto: "¿Fondo o comprar directo?" },
      { t: "p", html: `Con el monto suficiente, un cliente podría comprar las Lecaps directamente. Pagaría la comisión de compra una sola vez y ninguna comisión anual. A cambio, pierde lo que da el fondo: diversificación, reinversión automática y rescate en el día sin tener que vender en pantalla.` },
      { t: "tabla", cab: ["", "Fondo Lecaps", "Lecap directa"], filas: [
        ["Costo", "Comisión anual (1,60% a 2,45% según la clase)", "Comisión de compra y de venta"],
        ["Liquidez", "Rescate en el día", "Vender en el mercado, con su spread"],
        ["Reinversión", "Automática al vencer cada letra", "Hay que hacerla a mano"],
        ["Conviene más si...", "Monto chico, uso frecuente, poca gestión", "Monto grande, plazo definido, sin rescates"]
      ]},
      { t: "ej", id: "e2", tipo: "mc",
        enunciado: `Un cliente con $80 millones quiere invertir en Lecaps durante 6 meses, sin tocar la plata. Hoy está en la clase A del fondo. ¿Qué le planteás?`,
        opciones: [
          { txt: "Seguir en el fondo, clase A: es la opción más simple y la diferencia de costo no justifica el cambio.", ok: false, fb: "Con ese monto y plazo, 2,45% por año es mucho dinero." },
          { txt: "Comprar Lecaps directo o, si prefiere el fondo, ver si su monto le da una clase más barata.", ok: true, fb: "Exacto: con monto grande y plazo fijo, el costo del fondo pesa." },
          { txt: "Pasarlo a un money market, que tiene comisiones más bajas y rinde prácticamente lo mismo que el fondo.", ok: false, fb: "Rinde menos que una Lecap: cambia la inversión, no solo el costo." }
        ],
        explicacion: `Con $80 millones, 0,85 p.p. de diferencia entre la clase A y la D son unos $680.000 por año. Para plata que no se toca, el fondo no está agregando mucho valor por esa diferencia.` }
    ]
  },

  /* ------------------------------------------------------------ */
  {
    id: "f6",
    titulo: "Comparar y recomendar un fondo",
    minutos: 10,
    objetivo: "Evitar la trampa del rendimiento pasado, comparar fondos con criterio y explicar la recomendación al cliente.",
    bloques: [
      { t: "p", html: `La pregunta más común del cliente es "¿cuál rindió más?". Es la peor forma de elegir un fondo: el rendimiento pasado depende de un contexto que ya no está, y un fondo que rindió mucho suele haber tomado más riesgo.` },
      { t: "grafico", id: "sudam-anual" },
      { t: "p", html: `El Sudamericano, un fondo en dólares de bajo riesgo, terminó 2021 y 2022 en negativo. No fue una mala gestión: subieron las tasas en el mundo y los bonos bajaron de precio, como enseña la duration. Si un cliente entra mirando solo 2025 (+4,15%), puede asustarse ante un año así. Si entiende qué tiene el fondo, lo ve venir.` },
      { t: "h", texto: "Cuando el pasado y el futuro van para lados opuestos" },
      { t: "p", html: `Es fácil asumir que "si rindió bien, va a rendir bien" y "si rindió mal, va a rendir mal". En renta fija, sobre todo en la larga, muchas veces pasa lo contrario. Cuando las tasas suben fuerte, los bonos bajan de precio y el fondo muestra un rendimiento negativo. Pero esos mismos bonos, ahora más baratos, rinden más de acá en adelante: la TIR sube.` },
      { t: "herramienta", id: "pasado-futuro" },
      { t: "idea", titulo: "Dos números, dos preguntas", html: `El <strong>cuadro de rentabilidad</strong> responde "¿qué pasó?". La <strong>TIR</strong> responde "¿qué rinde hoy la cartera?". Después de una suba fuerte de tasas, el primero se ve feo y el segundo se ve mejor que nunca. Después de una baja, al revés. Por eso los dos números no se reemplazan: se leen juntos.` },
      { t: "mercado", titulo: "Lo que pasó en 2026", html: `Entre julio y noviembre el riesgo país pasó de unos 430 a más de 900 puntos básicos. Un fondo de bonos soberanos argentinos en dólares muestra en esos meses un rendimiento negativo, pero su TIR hoy es bastante más alta que en julio. Ojo con la diferencia: acá la tasa subió por <strong>riesgo de crédito</strong>, no solo por tasas internacionales. La recuperación depende de que se despejen esas dudas (lo viste en el módulo de macro).`, fuente: "Módulo 08 · datos de riesgo país de 2026" },
      { t: "ej", id: "e3", tipo: "mc",
        enunciado: `Un fondo de bonos en dólares con duration 5 cayó 8% en el año porque subieron las tasas; su TIR pasó de 7% a 10%. El cliente quiere rescatar "antes de que siga cayendo". ¿Qué es lo más importante que tiene que entender?`,
        opciones: [
          { txt: "Que la caída ya ocurrió y hoy rinde más: si vende ahora, fija la pérdida y deja la tasa alta.", ok: true, fb: "Exacto: el pasado malo y el futuro mejor son la misma suba de tasas vista desde dos lados." },
          { txt: "Que si cayó 8% este año, lo más probable es que el año que viene vuelva a caer una cifra parecida.", ok: false, fb: "Es la confusión típica: el rendimiento pasado no predice el futuro, y acá apunta al revés." },
          { txt: "Que la TIR de 10% ya está garantizada, así que no hay ningún motivo para pensar en rescatar.", ok: false, fb: "La TIR no es una promesa: si las tasas siguen subiendo, puede volver a caer." }
        ],
        explicacion: `Rescatar puede tener sentido si cambió su necesidad o su tolerancia, o si la suba de tasas refleja un riesgo de crédito que ya no quiere. Pero no porque el cuadro muestre un año negativo: esa caída es justamente la que hace que hoy el fondo rinda más.` },
      { t: "h", texto: "Cómo comparar dos fondos" },
      { t: "lista", items: [
        `<strong>Solo comparás fondos que hacen lo mismo:</strong> misma moneda, plazo parecido y mismo tipo de riesgo. Comparar un Latam sin Argentina con uno de soberanos argentinos no tiene sentido.`,
        `<strong>Mirás TIR y duration juntas:</strong> más TIR con más duration no es "mejor", es más riesgo.`,
        `<strong>Comparás en la misma clase</strong> o, mejor, en la clase a la que accede tu cliente.`,
        `<strong>Mirás el plazo de rescate y la moneda:</strong> T+0 o 48 horas; MEP o cable.`
      ]},
      { t: "ej", id: "e1", tipo: "mc",
        enunciado: `Dos fondos en dólares: el A rinde 5,3% de TIR con duration 1, sin riesgo argentino; el B rinde 8,5% con duration 3 e incluye bonos argentinos. Un cliente pregunta cuál es mejor. ¿Qué le respondés?`,
        opciones: [
          { txt: "El B, porque rinde 3 p.p. más con un riesgo parecido: los dos son renta fija en dólares de la región.", ok: false, fb: "El riesgo no es parecido: más duration y riesgo argentino." },
          { txt: "El A, porque los fondos sin riesgo argentino son siempre la opción correcta para cualquier cliente.", ok: false, fb: "No siempre: depende de qué riesgo quiere y puede asumir el cliente." },
          { txt: "Depende del objetivo: el B paga más porque tiene más duration y riesgo argentino.", ok: true, fb: "Exacto: la diferencia de TIR es el pago por un riesgo distinto." }
        ],
        explicacion: `"Depende" está bien solo si decís de qué depende. Acá es concreto: cuánto riesgo argentino quiere tener el cliente y cuánto puede tolerar que oscile.` },
      { t: "ej", id: "e2", tipo: "caso",
        enunciado: `Una clienta moderada tiene USD 50.000 en money market en dólares "porque es lo más seguro". No los necesita por al menos dos años, y le preocupa el riesgo argentino. Escribí en 4 o 5 líneas qué le propondrías y cómo se lo explicarías.`,
        rubrica: [
          "Reconoce que el money market es para plata de corto plazo y que para dos años rinde poco.",
          "Propone un fondo sin riesgo argentino (como el Sudamericano) para toda o parte de la plata.",
          "Usa datos del factsheet: TIR cercana a 5%, duration 1, comisión según la clase.",
          "Advierte que puede tener meses o años negativos, y que el rescate es a 48 horas.",
          "Sugiere dejar una parte en money market si quiere liquidez inmediata."
        ],
        modelo: `"Para plata que no vas a tocar en dos años, el money market te deja rendimiento sobre la mesa. Te propongo pasar una parte a un fondo de bonos de Chile, Brasil y Uruguay, sin Argentina: hoy la cartera rinde cerca de 5% anual en dólares, y después de la comisión te quedaría alrededor de 4,2% a 4,6% según la clase. Puede tener meses en negativo si suben las tasas en el mundo, y el rescate tarda 48 horas, por eso dejaría otra parte en money market para imprevistos."` },
      { t: "cliente", titulo: "Lo que querés que el cliente se lleve", html: `"No elegimos este fondo porque rindió mucho, sino porque invierte en lo que vos necesitás. Te muestro qué tiene adentro, cuánto rinde hoy, cuánto puede moverse y cuánto cobra."` }
    ]
  }
  ]
};
