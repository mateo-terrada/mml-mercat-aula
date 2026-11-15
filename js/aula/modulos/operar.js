/* ============================================================
   MÓDULO · Operar desde Argentina
   Base: capítulos 9 y 10 del Book, fusionados.
   Foco: los errores operativos que cuestan plata y la lectura
   de la caja de puntas antes de cargar una orden.
   Normativa verificada a noviembre de 2026.
   ============================================================ */
window.AULA = window.AULA || { modulos: {} };

AULA.modulos.operar = {
  id: "operar",
  numero: "07",
  titulo: "Operar desde Argentina",
  bajada: "Del 'qué comprar' al 'cómo ejecutarlo bien': monedas, plazos, la caja de puntas, los tipos de órdenes y los errores operativos que más plata cuestan.",
  fuente: "Book, capítulos 9 y 10 · normativa verificada a noviembre de 2026",
  practica: [
    { titulo: "Caja de puntas", desc: "Cinco libros de órdenes para interpretar antes de comprar o vender.", href: "simulador.html" },
    { titulo: "Práctica diaria · Operatoria", desc: "Preguntas del banco sobre plazos, órdenes y especies.", href: "practica.html" }
  ],
  evaluacion: {
    cantidad: 10,
    ids: ["OP-MC-001","OP-MC-002","OP-MC-003","OP-MC-004","OP-MC-005","OP-MC-006","OP-MC-007","OP-MC-008","OP-MC-009",
          "OP-CASO-001","OP-CASO-003","MACRO-MC-005","MACRO-MC-006","MACRO-MC-020",
          "TRAMPA-MC-009","TRAMPA-MC-010","TRAMPA-MC-014","RF-MC-016"]
  },
  lecciones: [

  /* ------------------------------------------------------------ */
  {
    id: "o1",
    titulo: "Quién es quién y qué te toca a vos",
    minutos: 8,
    objetivo: "Ubicar a cada participante del circuito de una operación y tener claro qué hace (y qué no hace) un agente productor.",
    bloques: [
      { t: "p", html: `Cada vez que un cliente compra un bono intervienen varios actores, cada uno con una responsabilidad distinta. Conocer el circuito sirve para dos cosas: saber a quién recurrir cuando algo falla y saber qué te corresponde a vos.` },
      { t: "grafico", id: "circuito" },
      { t: "tabla", cab: ["Participante", "Qué hace"], filas: [
        ["Cliente", "Decide e invierte. Su cuenta comitente está abierta en un ALyC."],
        ["Agente productor (AP)", "Difunde, capta clientes y los acompaña: les propone operaciones que ellos confirman. Trabaja con uno o más ALyC con los que tiene convenio."],
        ["ALyC (agente de liquidación y compensación)", "Abre la cuenta, recibe los fondos, ejecuta las órdenes en el mercado, liquida y custodia los activos del cliente."],
        ["Mercado (BYMA, A3, MAE)", "Donde se encuentran compradores y vendedores."],
        ["Caja de Valores", "Registra a nombre de quién están los títulos."],
        ["CNV", "Regula y controla a todos los anteriores."]
      ]},
      { t: "idea", titulo: "Lo que un agente productor no hace", html: `Según la normativa de la CNV, el agente productor <strong>no puede recibir fondos ni títulos de los clientes, ni custodiarlos</strong>: eso lo hace siempre el ALyC. La plata del cliente nunca pasa por tus manos, y eso lo protege a él y te protege a vos. Cuando en el Aula decimos "vendé" o "comprá", pensalo como la propuesta que le armás al cliente y que él confirma: así queda la decisión en él y registrada. El detalle de qué podés hacer y cómo está en el módulo 01.` },
      { t: "ej", id: "e1", tipo: "mc",
        enunciado: `Un cliente de confianza te dice: "Te transfiero los pesos a tu cuenta y vos me comprás los bonos, así es más fácil". ¿Qué le respondés?`,
        opciones: [
          { txt: "Que está bien si es por única vez y lo deja asentado en un mensaje, para tener constancia de la operación.", ok: false, fb: "Ni por única vez: un agente productor no puede recibir fondos de clientes." },
          { txt: "Que no puede ser: la plata va siempre directo a su cuenta en el ALyC, y desde ahí se opera.", ok: true, fb: "Exacto: los fondos del cliente nunca pasan por la cuenta del asesor." },
          { txt: "Que sí, pero que conviene que transfiera a la cuenta del ALyC a nombre de la asesora para ganar tiempo.", ok: false, fb: "La cuenta es siempre a nombre del cliente, en el ALyC." }
        ],
        explicacion: `Esta regla parece burocrática, pero es la que separa a un asesor profesional de un riesgo para el cliente. Explicarla bien también genera confianza: "tu plata está siempre a tu nombre".` },
      { t: "h", texto: "Cuándo se puede operar" },
      { t: "p", html: `En BYMA la negociación arranca a las <strong>10:30</strong>. Contado inmediato opera hasta las <strong>17:00</strong>. Desde el 2 de noviembre de 2026, las acciones y los CEDEARs con liquidación a 24 horas (T+1) se pueden operar hasta las <strong>18:00</strong>. Fuera de esos horarios, las órdenes quedan cargadas pero no se ejecutan.` },
      { t: "cliente", titulo: "Cómo se lo explicás al cliente", html: `"Tu cuenta está abierta en el agente de liquidación, a tu nombre, y tu plata y tus bonos quedan siempre ahí. Yo te asesoro y te acompaño en las decisiones, pero nunca toco tu dinero."` }
    ]
  },

  /* ------------------------------------------------------------ */
  {
    id: "o2",
    titulo: "Monedas y plazos: el ticker dice todo",
    minutos: 10,
    objetivo: "Leer el sufijo del ticker y el plazo de liquidación sin equivocarse, y entender cómo se arma un dólar MEP.",
    bloques: [
      { t: "p", html: `Muchos instrumentos se negocian en tres monedas distintas, y el ticker cambia según cuál. Es la fuente de errores operativos más común.` },
      { t: "tabla", cab: ["Ticker", "Moneda", "Qué recibís o pagás"], filas: [
        ["AL30", "Pesos", "Pesos"],
        ["AL30D", "Dólar MEP", "Dólares en una cuenta en Argentina"],
        ["AL30C", "Dólar cable (CCL)", "Dólares en una cuenta en el exterior"]
      ], nota: "Lo mismo vale para muchas ONs y CEDEARs: el mismo activo, tres pantallas. Algunas pantallas tienen muchos compradores y otras casi ninguno." },
      { t: "h", texto: "El dólar MEP, paso a paso" },
      { t: "p", html: `Comprar dólar MEP es, en realidad, hacer dos operaciones con un mismo bono: <strong>comprarlo en pesos</strong> (AL30) y <strong>venderlo en dólares</strong> (AL30D). El tipo de cambio que te queda es el precio en pesos dividido por el precio en dólares.` },
      { t: "formula", html: `Dólar MEP ≈ precio en pesos ÷ precio en dólares`, nota: "Ejemplo ilustrativo: AL30 a $97.500 y AL30D a USD 62,50 → MEP ≈ $1.560." },
      { t: "ej", id: "e1", tipo: "estimar",
        enunciado: `Un GD30 cotiza $101.400 en pesos y USD 65 en su pantalla en dólares MEP. ¿Qué dólar MEP implícito tiene? Respondé en pesos.`,
        unidad: "$", respuesta: 1560, tolerancia: 5,
        explicacion: `101.400 ÷ 65 = <strong>$1.560</strong>. Este cálculo también sirve para elegir con qué bono hacer el MEP: el que te dé el dólar más barato para comprar, o el más caro para vender.` },
      { t: "h", texto: "El plazo: T+1 es lo normal" },
      { t: "p", html: `El plazo de liquidación es cuándo se intercambian efectivamente la plata y los títulos. En el mercado argentino el estándar es <strong>T+1</strong>: se liquida el día hábil siguiente. <strong>Contado inmediato (CI)</strong> liquida en el día, y se usa cuando hay urgencia. Que el cliente "vendió hoy" no significa que tenga los fondos hoy.` },
      { t: "ej", id: "e2", tipo: "mc",
        enunciado: `Un cliente vende sus bonos el lunes en T+1 y quiere usar esos pesos el mismo lunes para comprar otra cosa en CI. ¿Qué pasa?`,
        opciones: [
          { txt: "No tiene los fondos todavía: la venta en T+1 se liquida el martes. Tendría que vender en CI o comprar en T+1.", ok: true, fb: "Exacto: hay que calzar los plazos de las dos patas." },
          { txt: "No hay problema: una vez que la venta se concertó, los pesos ya están disponibles para cualquier operación.", ok: false, fb: "Concertada no es liquidada: la plata llega el día hábil siguiente." },
          { txt: "La compra se ejecuta igual y la diferencia la cubre el mercado sin costo hasta que llegue la plata.", ok: false, fb: "Si no hay fondos, la compra queda descubierta: puede ser rechazada o generar un saldo deudor con costo." }
        ],
        explicacion: `Regla práctica: <strong>las dos patas de una operación encadenada tienen que estar en el mismo plazo</strong>, o la venta tiene que liquidar antes que la compra.` },
      { t: "h", texto: "Parking: qué quedó vigente" },
      { t: "p", html: `Durante años existió el "parking": había que esperar un plazo entre comprar un bono en pesos y venderlo en dólares. Desde abril de 2025 (Resolución General 1062 de la CNV) <strong>ya no rige para personas humanas residentes</strong>: pueden comprar y vender en el mismo día. Pero <strong>las personas jurídicas y los no residentes siguen teniendo que esperar un día hábil</strong>.` },
      { t: "ej", id: "e3", tipo: "mc",
        enunciado: `Una pyme cliente quiere comprar dólares MEP hoy para pagarle a un proveedor mañana a primera hora. ¿Qué tenés que prever?`,
        opciones: [
          { txt: "Nada especial: desde 2025 el parking ya no existe y cualquier cliente puede hacer el MEP en el día.", ok: false, fb: "Se eliminó para personas humanas residentes, no para personas jurídicas." },
          { txt: "Que como persona jurídica tiene que esperar un día hábil entre la compra en pesos y la venta en dólares.", ok: true, fb: "Exacto: hay que planificar con un día de anticipación." },
          { txt: "Que las empresas no pueden comprar dólar MEP, así que tiene que ir al banco a comprar en el oficial.", ok: false, fb: "Pueden; lo que cambia es que deben respetar el plazo mínimo." }
        ],
        explicacion: `Prometerle a una empresa "los dólares hoy" sin chequear el parking es un error clásico. Antes de planificar una operación en dos monedas, la primera pregunta es: <strong>¿el cliente es persona humana o jurídica?</strong>` }
    ]
  },

  /* ------------------------------------------------------------ */
  {
    id: "o3",
    titulo: "La caja de puntas: el costo de ejecutar",
    minutos: 11,
    objetivo: "Leer spread y profundidad en una caja de puntas, y estimar cuánto cuesta realmente vender o comprar una cantidad grande.",
    bloques: [
      { t: "p", html: `La <span class="term" data-term="puntas">caja de puntas</span> muestra, de un lado, quiénes quieren comprar y a qué precio, y del otro, quiénes quieren vender. Antes de cargar cualquier orden importante, hay que mirar tres cosas:` },
      { t: "lista", items: [
        `<strong><span class="term" data-term="spread">Spread</span>:</strong> la distancia entre la mejor punta compradora y la mejor vendedora. Es lo que perdés si comprás y vendés en el acto.`,
        `<strong>Profundidad:</strong> cuánta cantidad hay en cada nivel de precio. Si querés vender más de lo que hay en la mejor punta, vas a ir "bajando" de nivel.`,
        `<strong>Último operado:</strong> a qué precio se hizo la última operación. Útil, pero puede ser viejo: en un papel poco negociado, el último precio puede ser de hace horas.`
      ]},
      { t: "idea", titulo: "El precio que ves no es el precio que cobrás", html: `La mejor punta es el precio para la cantidad que está en ese nivel. Si tu orden es más grande, se ejecuta también contra los niveles siguientes, cada vez peores. El precio que realmente cobrás es el <strong>promedio</strong> de todos los niveles que usaste.` },
      { t: "herramienta", id: "libro" },
      { t: "ej", id: "e1", tipo: "mc",
        enunciado: `Probá la herramienta con la ON poco negociada y vendé 15.000 de valor nominal a mercado. ¿Qué observás?`,
        opciones: [
          { txt: "Que se vende todo a 98,50, porque esa es la mejor punta compradora que muestra la pantalla.", ok: false, fb: "En 98,50 solo hay 3.000: el resto se ejecuta en niveles peores." },
          { txt: "Que se ejecuta en varios niveles y el promedio queda bastante por debajo de la mejor punta.", ok: true, fb: "Exacto: barrer el libro tiene un costo que no se ve en la mejor punta." },
          { txt: "Que la venta no se puede hacer, porque la cantidad pedida supera lo que hay en la primera línea.", ok: false, fb: "Se puede hacer, pero usando varios niveles de precio." }
        ],
        explicacion: `Con el bono líquido, vender 300.000 casi no cuesta nada. Con la ON chica, vender 15.000 cuesta cerca de 1% contra la mejor punta. <strong>La misma orden, en dos papeles distintos, tiene costos muy distintos.</strong>` },
      { t: "ej", id: "e2", tipo: "estimar",
        enunciado: `En una pantalla, la mejor punta compradora es 98,00 y la mejor vendedora 99,50. ¿Cuál es el spread, en % sobre la punta compradora?`,
        unidad: "%", respuesta: 1.53, tolerancia: 0.1,
        explicacion: `(99,50 − 98,00) ÷ 98,00 ≈ <strong>1,5%</strong>. Si un cliente compra a mercado y al día siguiente quiere vender, arranca perdiendo 1,5% aunque el precio no se haya movido. En un bono que rinde 8% al año, son casi dos meses de rendimiento.` },
      { t: "ojo", titulo: "Cuándo frenar", html: `Si el spread es grande o la profundidad es poca respecto de lo que querés operar, hay tres opciones mejores que una orden a mercado: <strong>usar una orden límite y esperar</strong>, <strong>partir la operación</strong> en varias más chicas, o <strong>cambiar de instrumento</strong> si el costo de ejecución se come el rendimiento.` }
    ]
  },

  /* ------------------------------------------------------------ */
  {
    id: "o4",
    titulo: "Cómo y dónde vender: órdenes y monedas",
    minutos: 11,
    objetivo: "Elegir el tipo de orden adecuado y decidir en qué moneda conviene vender un activo que cotiza en varias pantallas.",
    bloques: [
      { t: "h", texto: "Los tipos de órdenes" },
      { t: "tabla", cab: ["Orden", "Prioriza", "Riesgo", "Cuándo usarla"], filas: [
        ["A mercado", "Ejecutar ya", "Pagar caro o vender barato si hay poca profundidad", "Papeles muy líquidos y montos chicos"],
        ["Límite", "El precio", "Que no se ejecute (o se ejecute en parte)", "Casi siempre, y sobre todo en papeles poco líquidos"],
        ["Stop (stop-loss)", "Limitar una pérdida", "Que se ejecute muy por debajo del precio de activación en una caída brusca", "Para salir automáticamente si el precio cae de cierto nivel"],
        ["Stop-limit", "Limitar la pérdida sin malvender", "Que no se ejecute si el precio cae de golpe", "Como el stop, pero con un piso de precio"]
      ]},
      { t: "ej", id: "e1", tipo: "mc",
        enunciado: `Una clienta quiere vender una ON poco negociada y "no tiene apuro". ¿Qué orden le conviene?`,
        opciones: [
          { txt: "Una orden límite cerca de la mejor punta, aceptando que puede tardar o ejecutarse en partes.", ok: true, fb: "Exacto: sin apuro, el precio es lo que hay que proteger." },
          { txt: "Una orden a mercado, porque así se asegura de vender rápido y no queda expuesta a otra baja.", ok: false, fb: "Sin apuro, pagar el costo de barrer el libro no tiene sentido." },
          { txt: "Una orden stop, que se activa sola cuando el precio llega al nivel que ella quiere vender.", ok: false, fb: "El stop sirve para limitar pérdidas en una caída, no para vender a un buen precio." }
        ],
        explicacion: `La urgencia del cliente define la orden: <strong>con apuro, se paga la ejecución; sin apuro, se protege el precio</strong>.` },
      { t: "h", texto: "La misma ON, dos pantallas: ¿dónde vender?" },
      { t: "p", html: `Esta parte mira solo la <strong>ejecución</strong>: cuánto cobrás en cada pantalla según la cantidad. La lección siguiente suma la otra mitad de la decisión: qué va a hacer el cliente con la plata después de vender.` },
      { t: "p", html: `Muchas ONs en dólares se pueden vender en pesos o en dólares. La intuición dice "si el cliente quiere dólares, vendo en dólares". Pero si la pantalla en dólares tiene poca profundidad, puede rendir más <strong>vender en pesos y comprar los dólares aparte</strong>. Antes de vender, hay que mirar el spread y la profundidad de cada pantalla, y comparar el precio llevado a la misma moneda.` },
      { t: "herramienta", id: "donde-vender" },
      { t: "ej", id: "e2", tipo: "mc",
        enunciado: `Con la herramienta, pasá de vender 5.000 a vender 20.000. ¿Qué cambia y por qué?`,
        opciones: [
          { txt: "Con 20.000 conviene vender en pesos: la pantalla en dólares no tiene profundidad y el promedio cae.", ok: true, fb: "Exacto: la mejor pantalla depende de cuánto hay que vender." },
          { txt: "Siempre conviene la pantalla en dólares, porque el cliente quiere dólares y así se ahorra un paso.", ok: false, fb: "Ahorrarse un paso puede salir caro si esa pantalla es finita." },
          { txt: "No cambia nada: el precio de la mejor punta en dólares es el mismo para cualquier cantidad.", ok: false, fb: "La mejor punta solo vale para la cantidad que hay en ese nivel." }
        ],
        explicacion: `Para montos chicos suele convenir la pantalla directa. Para montos grandes, la pantalla con más profundidad. Este chequeo lleva un minuto y puede ahorrar 1% o más.` },
      { t: "ojo", titulo: "Un caso extremo: los bonos CER", html: `Un bono CER prácticamente solo tiene compradores en pesos. Intentar venderlo directo contra dólares es exponerse a no encontrar comprador o a un precio muy malo. Si el cliente quiere dolarizarse, se vende en pesos y se compran los dólares en una operación aparte.` }
    ]
  },


  /* ------------------------------------------------------------ */
  {
    id: "o6",
    titulo: "¿Vendo en pesos o en dólares? Depende de qué viene después",
    minutos: 10,
    objetivo: "Elegir la moneda de venta de un CEDEAR, bono u ON según lo que el cliente va a hacer con la plata, y no por costumbre.",
    bloques: [
      { t: "p", html: `CEDEARs, bonos soberanos y ONs se pueden vender en pesos o en dólares. Antes de vender, vale la pena tomarse un minuto para una sola pregunta: <strong>¿qué va a pasar con esa plata después?</strong> La respuesta define la moneda casi siempre.` },
      { t: "tabla", cab: ["Si después el cliente...", "Conviene vender en...", "Por qué"], filas: [
        ["Compra otro activo en el momento (rotación)", "La moneda con más volumen; en CEDEARs, casi siempre pesos", "Venta y compra ocurren juntas: el tipo de cambio se compensa. Lo que importa es ejecutar bien"],
        ["Se queda líquido días o semanas", "Dólares", "Para no quedar expuesto a que el dólar suba mientras espera"],
        ["Retira dólares a su banco en Argentina", "Dólares MEP (D)", "Se acreditan en una cuenta local"],
        ["Transfiere al exterior", "Dólares cable (C)", "Se acreditan afuera"],
        ["Pasa a un FCI en dólares", "Dólares", "El destino es en dólares: no tiene sentido pasar por pesos"],
        ["Necesita pesos para gastar", "Pesos", "Vender en dólares y después venderlos es un paso y un costo de más"]
      ]},
      { t: "h", texto: "Por qué rotar en pesos no tiene riesgo cambiario" },
      { t: "p", html: `El precio en pesos de un CEDEAR lleva adentro el dólar CCL. Si vendés un CEDEAR en pesos y en el mismo momento comprás otro en pesos, <strong>el dólar de la venta y el de la compra son prácticamente el mismo</strong>: se cancelan. Seguís teniendo la misma exposición en dólares, solo que en otra empresa. Y como en pesos suele haber mucho más volumen que en dólares, el spread es menor y la ejecución, mejor.` },
      { t: "ejemplo", titulo: "Rotar de EWZ a SPY", pasos: [
        `Un cliente tiene CEDEARs de EWZ (el ETF de Brasil) y quiere pasarse a SPY (el S&P 500). Los dos cotizan en pesos con mucho volumen y en dólares con bastante menos.`,
        `<strong>Rotación en pesos:</strong> vende EWZ en pesos y en el mismo momento compra SPY en pesos. Las dos operaciones tienen adentro el mismo dólar CCL: la exposición en dólares no cambia.`,
        `<strong>Rotación en dólares:</strong> vende EWZD y compra SPYD. Llega al mismo lugar, pero opera en dos pantallas con menos volumen y más spread. Paga más por ejecutar, sin ningún beneficio.`
      ], conclusion: `Para una rotación inmediata entre CEDEARs, la moneda no cambia el riesgo; solo cambia el costo. Por eso, salvo excepciones, se rota en pesos.` },
      { t: "h", texto: "Por qué esperar en pesos sí tiene riesgo" },
      { t: "p", html: `Distinto es vender para <strong>quedarse afuera un tiempo</strong>. Si el cliente vende en pesos y espera tres semanas, durante esas tres semanas tiene pesos. Si en ese tiempo el dólar sube 5%, cuando vuelva a comprar un CEDEAR le va a alcanzar para 5% menos, aunque el activo no se haya movido. Si vende en dólares, espera en dólares y ese riesgo desaparece.` },
      { t: "herramienta", id: "decisor-moneda" },
      { t: "mercado", titulo: "Un caso típico: dos decisiones, dos monedas", html: `Antes de unas elecciones en Brasil, la idea es vender EWZ para esperar el resultado desde afuera. Si se vende en pesos, la plata: <strong>queda expuesta al dólar durante semanas</strong> sin necesidad. Una semana después, la idea es rotar lo que queda de EWZ a otros CEDEARs en el momento. Si se repite "la vez pasada era en dólares" y se rota en dólares, <strong>se paga más spread en una operación donde la moneda no importaba</strong>. Es un error muy común: aplicar la regla del caso anterior al caso siguiente. La pregunta correcta cada vez era la misma: ¿qué pasa con la plata después?` },
      { t: "ej", id: "e1", tipo: "mc",
        enunciado: `Un cliente quiere vender sus CEDEARs de EWZ antes de unas elecciones y volver a entrar "cuando se aclare el panorama", en dos o tres semanas. ¿En qué moneda conviene vender?`,
        opciones: [
          { txt: "En pesos, porque es la pantalla con más volumen y la que tiene menor spread para los CEDEARs de EWZ.", ok: false, fb: "El volumen importa, pero acá el riesgo principal es quedar semanas en pesos." },
          { txt: "En dólares: va a quedar líquido varias semanas, y así no queda expuesto a que el dólar suba mientras espera.", ok: true, fb: "Exacto: si va a esperar, que espere en dólares." },
          { txt: "Da lo mismo, porque cuando vuelva a comprar el CEDEAR el tipo de cambio se va a compensar solo.", ok: false, fb: "Se compensa solo si compra en el mismo momento. Con semanas de por medio, no." }
        ],
        explicacion: `Si la pantalla en dólares tiene poca profundidad para el monto, una alternativa es vender en pesos y comprar dólares MEP en el mismo momento con un bono líquido: el resultado es esperar en dólares.` },
      { t: "ej", id: "e2", tipo: "mc",
        enunciado: `Una semana después, el mismo cliente quiere pasar lo que le queda de EWZ a CEDEARs de empresas de EE.UU., todo en el mismo momento. ¿Cómo conviene hacerlo?`,
        opciones: [
          { txt: "En dólares, porque la vez anterior se vendió en dólares y conviene mantener siempre el mismo criterio.", ok: false, fb: "El criterio no es la moneda de antes, sino qué pasa con la plata ahora: acá no espera." },
          { txt: "Vender y comprar en pesos: al ser en el mismo momento, el dólar se compensa y en pesos hay más volumen.", ok: true, fb: "Exacto: rotación inmediata entre CEDEARs, en pesos." },
          { txt: "Vender en pesos y comprar en dólares, para quedar cubierto ante una suba del tipo de cambio en el medio.", ok: false, fb: "Mezclar monedas agrega un paso y un costo; si es en el mismo momento, no hay nada que cubrir." }
        ],
        explicacion: `Mismo cliente, mismo activo, distinta respuesta: lo que cambió es qué pasa con la plata después de vender.` },
      { t: "ej", id: "e3", tipo: "mc",
        enunciado: `Un cliente quiere rotar sus AL30 a GD30 en el momento. Los dos bonos tienen muchísimo volumen en pesos y en dólares. ¿Qué hacés?`,
        opciones: [
          { txt: "Siempre en pesos, porque en las rotaciones inmediatas la pantalla en pesos es la que conviene usar.", ok: false, fb: "En CEDEARs suele ser así porque el volumen está en pesos; acá hay volumen en las dos." },
          { txt: "Siempre en dólares, porque se trata de bonos en dólares y así el cliente nunca deja de estar dolarizado.", ok: false, fb: "En una rotación inmediata nunca deja de estar dolarizado, en ninguna de las dos monedas." },
          { txt: "Es casi indistinto: con mucho volumen en las dos, miro las puntas y uso la que mejor pague en ese momento.", ok: true, fb: "Exacto: cuando las dos pantallas son profundas, la diferencia es mínima." }
        ],
        explicacion: `La regla "rotar en pesos" no es una ley: es la consecuencia de que, en la mayoría de los CEDEARs, el volumen está en pesos. Cuando hay volumen de sobra en las dos monedas, la elección pasa a ser casi indistinta.` },
      { t: "ej", id: "e4", tipo: "multi",
        enunciado: `Marcá <strong>todas</strong> las situaciones en las que conviene vender en dólares.`,
        opciones: [
          { txt: "El cliente quiere llevarse los dólares a su cuenta en un banco argentino.", ok: true, fb: "Se vende en D (MEP)." },
          { txt: "El cliente va a quedar líquido un mes esperando una oportunidad para volver a entrar.", ok: true, fb: "Para no tener riesgo cambiario mientras espera." },
          { txt: "El cliente rota en el momento de un CEDEAR a otro con mucho más volumen en pesos.", ok: false, fb: "Rotación inmediata con volumen en pesos: se rota en pesos." },
          { txt: "El cliente va a suscribir un fondo común de inversión en dólares con lo que cobre.", ok: true, fb: "El destino es en dólares." },
          { txt: "El cliente necesita pagar la cuota del colegio de sus hijos en pesos esta semana.", ok: false, fb: "Si necesita pesos, se vende en pesos." }
        ],
        explicacion: `Resumen en una línea: <strong>si la plata se queda quieta o termina en dólares, vendé en dólares; si se reinvierte en el acto, vendé donde haya más volumen</strong>.` },
      { t: "ej", id: "e5", tipo: "caso",
        enunciado: `Un cliente te escribe: "Vendé mis CEDEARs de Brasil, quiero esperar a ver qué pasa". Una semana después: "Ahora comprá Microsoft y Google con lo que tenía de Brasil". Escribí cómo ejecutarías cada paso y por qué, en 4 o 5 líneas.`,
        rubrica: [
          "Primer paso: vende en dólares (o en pesos con compra simultánea de MEP) porque el cliente va a quedar líquido.",
          "Explica el motivo: evitar riesgo cambiario mientras espera.",
          "Segundo paso: identifica que, si la plata ya está en dólares, la compra se hace en dólares, o se pasa a pesos y se compra en pesos solo si conviene por volumen, en el mismo momento.",
          "Muestra que la moneda se decide en cada paso según qué pasa con la plata después, no por costumbre."
        ],
        modelo: `"Primero vendo los CEDEARs de Brasil en dólares, porque va a quedar líquido un tiempo y no quiero que lo afecte una suba del dólar mientras espera. Una semana después, con los dólares en la cuenta, miro las puntas de MSFT y GOOGL: si las pantallas en dólares tienen buena profundidad, compro ahí; si no, vendo dólares MEP y compro en pesos en el mismo momento, donde hay más volumen. Si en cambio me hubiera pedido rotar todo en el mismo momento, lo habría hecho directamente en pesos."` },
      { t: "ojo", titulo: "Un detalle fino para rotaciones grandes", html: `Cada CEDEAR tiene su propio dólar implícito, y a veces difieren un poco entre sí. Si el que vendés tiene un dólar implícito bajo y el que comprás uno alto, estás vendiendo "barato" y comprando "caro". En montos chicos no importa; en una rotación grande vale la pena chequearlo con la cuenta de la lección de CEDEARs (precio × ratio ÷ precio en dólares).` }
    ]
  },
  /* ------------------------------------------------------------ */
  {
    id: "o5",
    titulo: "Encontrá el error antes de confirmar",
    minutos: 9,
    objetivo: "Revisar una orden en segundos con un checklist fijo y detectar los errores operativos más comunes.",
    bloques: [
      { t: "p", html: `Casi todos los errores operativos caros vienen de no mirar un dato antes de confirmar. La defensa es un checklist corto que se repite siempre, hasta que sale solo.` },
      { t: "formula", html: `Instrumento · Moneda · Cantidad · Precio · Plazo · Tipo de orden`, nota: "Seis datos, en ese orden, antes de cada 'Confirmar'. Y después: revisar que la orden se haya ejecutado completa." },
      { t: "ej", id: "e1", tipo: "mc",
        enunciado: `<div class="boleta"><b>Venta</b> · AL30 · 10.000 VN · Precio: 62,40 · T+1 · Límite</div>El cliente quiere vender sus AL30 para tener dólares MEP. ¿Cuál es el error?`,
        opciones: [
          { txt: "El ticker: para cobrar dólares MEP tiene que vender AL30D; además 62,40 es un precio en dólares, no en pesos.", ok: true, fb: "Exacto: ticker de pesos con precio de dólares. Error doble." },
          { txt: "El plazo: para vender contra dólares MEP siempre hay que operar en contado inmediato y nunca en T+1.", ok: false, fb: "Se puede vender en T+1 sin problema: el plazo no es el error acá." },
          { txt: "La orden límite: para cobrar en dólares hay que usar siempre una orden a mercado en la pantalla en D.", ok: false, fb: "La orden límite es perfectamente válida." }
        ],
        explicacion: `Si esa orden saliera, intentaría vender en la pantalla en pesos a $62,40 cada 100, cuando vale más de $97.000. Por eso el segundo chequeo (moneda) va antes del precio.` },
      { t: "ej", id: "e2", tipo: "mc",
        enunciado: `<div class="boleta"><b>Compra</b> · ON poco negociada (D) · 20.000 VN · A mercado · T+1</div>En la pantalla hay 3.000 a la venta en la mejor punta y el resto bastante más caro. ¿Qué cambiarías?`,
        opciones: [
          { txt: "Nada: con una orden a mercado se asegura de comprar todo y a un precio parecido al de la pantalla.", ok: false, fb: "Va a barrer varios niveles y pagar bastante más que la mejor punta." },
          { txt: "La pasaría a orden límite, o partiría la compra en tramos, para no pagar caro por falta de profundidad.", ok: true, fb: "Exacto: en papeles poco líquidos, la orden a mercado es el error." },
          { txt: "El plazo: en papeles poco negociados conviene operar siempre en contado inmediato para asegurar precio.", ok: false, fb: "El plazo no cambia la profundidad de la pantalla." }
        ],
        explicacion: `El mismo checklist: el último dato, "tipo de orden", se decide mirando la caja de puntas.` },
      { t: "ej", id: "e3", tipo: "mc",
        enunciado: `<div class="boleta"><b>Compra</b> · CEDEAR KO · Monto: $1.000.000 · Precio límite: 28 · T+1</div>El CEDEAR cotiza alrededor de $28.000 en pesos. ¿Qué pasa con esta orden?`,
        opciones: [
          { txt: "Se ejecuta normalmente, porque el sistema interpreta que el precio está expresado en miles de pesos.", ok: false, fb: "El sistema no interpreta: toma el número tal cual." },
          { txt: "No se ejecuta (o la rechazan): pide comprar a $28 algo que vale $28.000. El precio está en otra escala.", ok: true, fb: "Exacto: error de unidad, típico al mezclar pantallas en pesos y en dólares." },
          { txt: "Se ejecuta a $28 y el cliente consigue una ganga, porque una orden límite siempre se respeta.", ok: false, fb: "Nadie vende a $28 algo que vale $28.000: la orden queda sin ejecutar o fuera de rango." }
        ],
        explicacion: `Si el precio que estás por escribir tiene una escala muy distinta a la de la pantalla (decenas contra miles), es una alarma: probablemente estás mezclando pesos y dólares.` },
      { t: "ej", id: "e4", tipo: "multi",
        enunciado: `Después de confirmar una orden, marcá <strong>todo</strong> lo que conviene revisar.`,
        opciones: [
          { txt: "Que el estado de la orden sea 'ejecutada' y no 'pendiente' o 'parcial'.", ok: true, fb: "Una orden puede quedar a medias sin que lo notes." },
          { txt: "Que la cantidad ejecutada coincida con la que se pidió originalmente.", ok: true, fb: "Las ejecuciones parciales son comunes en papeles poco líquidos." },
          { txt: "Que el precio promedio de ejecución sea razonable respecto de lo esperado.", ok: true, fb: "Sobre todo si fue a mercado." },
          { txt: "Que el precio del activo haya subido en los minutos siguientes a la compra.", ok: false, fb: "Eso es mercado, no un control operativo." },
          { txt: "Que el cliente reciba la confirmación con el plazo en que va a tener los fondos o los títulos.", ok: true, fb: "Evita el 'vendí y no tengo la plata'." }
        ],
        explicacion: `El checklist tiene dos momentos: <strong>antes de confirmar</strong> (los seis datos) y <strong>después</strong> (estado, cantidad, precio, aviso al cliente).` },
      { t: "ej", id: "e5", tipo: "caso",
        enunciado: `Un cliente te llama a las 16:45: "Necesito USD 20.000 en mi cuenta del banco mañana temprano. Tengo una ON en dólares que se negocia poco". Escribí en 4 o 5 líneas cómo lo resolverías.`,
        rubrica: [
          "Pregunta o tiene en cuenta si es persona humana o jurídica (parking).",
          "Mira la caja de puntas de la ON en cada moneda antes de elegir dónde vender.",
          "Elige un plazo de liquidación compatible con 'mañana temprano' (CI hoy, si llega antes del cierre de las 17:00).",
          "Evita la orden a mercado si la profundidad es poca, o le avisa al cliente el costo de ejecutar con apuro.",
          "Le explica qué va a recibir y cuándo, sin prometer un precio."
        ],
        modelo: `"Primero confirmo que la cuenta es a su nombre como persona humana, así no hay que esperar ningún plazo. Miro las puntas de la ON en dólares y en pesos: si la pantalla en dólares no alcanza para USD 20.000, vendo en pesos y compro los dólares aparte. Como quedan 15 minutos de mercado y necesita la plata mañana temprano, opero en contado inmediato. Le aviso que, con apuro y en un papel poco negociado, probablemente venda algo por debajo de la mejor punta."` }
    ]
  }
  ]
};
