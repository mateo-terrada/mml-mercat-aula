/* ============================================================
   TALLER · Duration a ojo
   Objetivo: intuición visual de por qué más duration = más
   sensibilidad, y estimar a ojo el efecto precio de un cambio de tasas.
   Sin fórmulas para despejar: lógica, imágenes y práctica.
   ============================================================ */
window.AULA = window.AULA || { modulos: {} };

AULA.modulos.duration = {
  id: "duration",
  numero: "T1",
  taller: true,
  titulo: "Taller: duration a ojo",
  bajada: "Ver, más que calcular, por qué un bono largo se mueve más cuando cambian las tasas, y aprender a estimar el efecto en el precio sin calculadora.",
  fuente: "Taller práctico · complementa el módulo 03",
  practica: [
    { titulo: "Curvas de bonos", desc: "En las curvas de la mesa de operaciones, el eje horizontal es la duration: practicá leerlo como 'cuánto se mueve'.", href: "simulador.html" }
  ],
  lecciones: [

  /* ------------------------------------------------------------ */
  {
    id: "d1",
    titulo: "Por qué el bono largo se mueve más",
    minutos: 9,
    objetivo: "Entender, sin fórmulas, por qué cuanto más lejos están los pagos de un bono, más cambia su precio cuando se mueven las tasas.",
    bloques: [
      { t: "p", html: `Empecemos con una situación que no tiene nada de técnica. Hiciste un plazo fijo que te paga 6% por año y no lo podés cancelar. Al día siguiente, los bancos empiezan a pagar 9%. <strong>¿Cuánto vale tu plazo fijo para otra persona que te lo quiera comprar?</strong>` },
      { t: "p", html: `Menos de lo que pusiste: nadie te va a pagar lo mismo por un 6% si puede conseguir 9% en la ventanilla de al lado. Y acá viene la clave: <strong>el descuento depende de cuánto tiempo te quedan atado al 6%</strong>. Si vence en un mes, casi no importa. Si vence en diez años, vas a cobrar 3 p.p. menos que el mercado durante diez años: eso vale mucho menos.` },
      { t: "idea", titulo: "La idea en una frase", html: `Un bono es un contrato que te ata a una tasa. Cuando la tasa del mercado cambia, el precio del bono se ajusta para compensar <strong>todos los años que faltan</strong>. Más años atado, más grande el ajuste. Eso es la sensibilidad a tasas, y la <span class="term" data-term="duration">duration</span> es la forma de medirla.` },
      { t: "h", texto: "Miralo: cada pago se achica distinto" },
      { t: "p", html: `Abajo hay dos bonos idénticos salvo por el plazo: uno vence en 2 años y otro en 10. Cada barra muestra lo que vale <strong>hoy</strong> cada pago futuro. Subí la tasa y mirá qué barras se achican más.` },
      { t: "herramienta", id: "pagos-lejanos" },
      { t: "p", html: `Lo que se ve: cuando la tasa sube, <strong>todas</strong> las barras bajan, pero las de los pagos lejanos bajan muchísimo más. Un pago que llega en 10 años "sufre" la tasa más alta diez veces seguidas; uno que llega el año que viene, una sola vez. El bono a 2 años casi no tiene pagos lejanos, así que casi no se mueve. El de 10 años tiene su pago más grande (la devolución del capital) bien lejos.` },
      { t: "ej", id: "e1", tipo: "estimar",
        enunciado: `Con el botón "Suben las tasas (9%)", la tasa pasa de 6% a 9%. ¿Cuánto cae el precio del bono a 10 años? Respondé en %, sin el signo menos.`,
        unidad: "%", respuesta: 19.3, tolerancia: 1,
        explicacion: `Cae alrededor de <strong>19%</strong>, mientras el bono a 2 años cae apenas 5%. Mismo emisor, mismo cupón, misma suba de tasas: el plazo hace que uno pierda casi cuatro veces más que el otro.` },
      { t: "h", texto: "La duration: el centro de gravedad del bono" },
      { t: "p", html: `Si el plazo explica tanto, ¿por qué no usar directamente el plazo? Porque no todos los bonos de 10 años tienen sus pagos repartidos igual. Algunos devuelven capital en cuotas, otros pagan cupones grandes, otros pagan todo al final. La duration resume en un número <strong>dónde está el peso de los pagos</strong>.` },
      { t: "analogia", html: `Imaginá una tabla larga apoyada sobre un triángulo, con pesas encima: cada pesa es un pago del bono, más pesada cuanto más vale hoy. La duration es el punto donde tenés que poner el triángulo para que la tabla quede en equilibrio. Si el peso está al final, el punto de equilibrio se va lejos.` },
      { t: "herramienta", id: "balanza" },
      { t: "ej", id: "e2", tipo: "mc",
        enunciado: `Probá los cinco bonos de la balanza. Dos bonos vencen en 10 años: uno paga todo al final (cupón cero) y el otro devuelve el capital en diez cuotas anuales. Si las tasas suben, ¿cuál cae más?`,
        opciones: [
          { txt: "El que amortiza en cuotas, porque paga algo todos los años y eso lo expone más veces a la suba.", ok: false, fb: "Al revés: cobrar todos los años hace que una parte grande vuelva pronto." },
          { txt: "El cupón cero: todo su valor está en un pago a 10 años, así que su duration es igual al plazo.", ok: true, fb: "Exacto: el centro de gravedad está en el extremo, la duration es la máxima posible." },
          { txt: "Caen exactamente lo mismo, porque los dos bonos vencen el mismo día y son del mismo emisor.", ok: false, fb: "El vencimiento es el mismo, pero dónde está el peso de los pagos es muy distinto." }
        ],
        explicacion: `Mismo vencimiento no es mismo riesgo de tasa. El bono en cuotas tiene una duration de unos 5 años; el cupón cero, de 10. Ante la misma suba de tasas, el cupón cero cae aproximadamente el doble.` },
      { t: "ej", id: "e3", tipo: "multi",
        enunciado: `Marcá <strong>todo</strong> lo que hace que un bono tenga más duration (y por lo tanto se mueva más con las tasas).`,
        opciones: [
          { txt: "Que su vencimiento esté más lejos.", ok: true, fb: "Más años atado a la tasa original." },
          { txt: "Que pague cupones más bajos.", ok: true, fb: "Con poco cupón, casi todo el valor queda al final." },
          { txt: "Que devuelva el capital en cuotas a lo largo de su vida.", ok: false, fb: "Al contrario: las cuotas acercan el peso y bajan la duration." },
          { txt: "Que devuelva todo el capital en un solo pago al final.", ok: true, fb: "El pago más grande queda en el extremo." },
          { txt: "Que el emisor sea una empresa en lugar de un país.", ok: false, fb: "El emisor cambia el riesgo de crédito, no la duration." }
        ],
        explicacion: `Plazo largo, cupón bajo y capital al final empujan la duration hacia arriba. Amortizar en cuotas y pagar cupones altos la bajan.` },
      { t: "cliente", titulo: "Cómo se lo explicás al cliente", html: `"Comprar un bono es quedarte atado a una tasa. Si mañana el mercado paga más, tu bono vale menos, y vale tanto menos cuantos más años te quedan atado. Por eso los bonos largos se mueven mucho más que los cortos, para arriba y para abajo."` }
    ]
  },

  /* ------------------------------------------------------------ */
  {
    id: "d2",
    titulo: "A ojo: la regla de bolsillo",
    minutos: 11,
    objetivo: "Estimar mentalmente cuánto sube o baja un bono si su TIR se mueve, usando solo su duration.",
    bloques: [
      { t: "p", html: `La buena noticia: para estimar el efecto en el precio no hace falta calculadora. Alcanza con una multiplicación.` },
      { t: "p", html: `En todo el taller los movimientos de la TIR se miden en <strong>puntos porcentuales (p.p.)</strong>: si la TIR pasa de 8% a 9%, subió 1 p.p.; si pasa de 8% a 8,5%, subió medio punto porcentual (0,5 p.p.). Ojo: no es lo mismo que "subió 1%" (eso sería pasar de 8% a 8,08%). En los informes vas a ver también "puntos básicos": 100 puntos básicos = 1 p.p.` },
      { t: "formula", html: `Cambio de precio ≈ Duration × Cambio de TIR (en puntos porcentuales), con el signo al revés`, nota: "Si la TIR sube, el precio baja; si la TIR baja, el precio sube. Duration 5 y la TIR sube 2 p.p. → el precio cae cerca de 10%." },
      { t: "idea", titulo: "Una forma de recordarla", html: `La duration es <strong>cuánto se mueve el precio por cada punto porcentual de tasa</strong>. Duration 3: cada punto porcentual (1 p.p.) de tasa mueve el precio 3%. Duration 7: cada punto porcentual lo mueve 7%. Después, multiplicás por cuántos puntos porcentuales se movió la tasa.` },
      { t: "ojo", titulo: "La trampa del riesgo país", html: `El riesgo país se informa en puntos básicos, aunque en las noticias se diga solo "puntos". Si el riesgo país sube <strong>500 puntos básicos</strong>, la TIR de los soberanos sube cerca de <strong>5 p.p.</strong> (por ejemplo, de 8% a 13%). Antes de multiplicar por la duration, dividilo por 100.` },
      { t: "h", texto: "La tabla de bolsillo" },
      { t: "p", html: `Esta tabla es la regla aplicada a los casos más comunes. Fijate cómo el color se intensifica en dos direcciones: hacia abajo (más duration) y hacia los costados (más movimiento de tasa). Las dos cosas multiplican.` },
      { t: "herramienta", id: "tabla-bolsillo" },
      { t: "ej", id: "e1", tipo: "mc",
        enunciado: `A ojo, sin calculadora: un bono con duration 4, y su TIR pasa de 8% a 8,5%. ¿Cuánto cambia su precio?`,
        opciones: [
          { txt: "Cae alrededor de 0,5%, lo mismo que subió la TIR, porque se mueven en paralelo.", ok: false, fb: "La duration multiplica: por cada punto porcentual de TIR, el precio se mueve 4%." },
          { txt: "Cae alrededor de 2%: la TIR subió 0,5 p.p., y duration 4 por 0,5 da 2.", ok: true, fb: "Exacto: duration por p.p. de TIR." },
          { txt: "Sube alrededor de 2%, porque una TIR más alta significa que el bono rinde más.", ok: false, fb: "El bono rinde más para quien compra ahora porque su precio bajó." }
        ],
        explicacion: `De 8% a 8,5% es medio punto porcentual (0,5 p.p.). Duration 4 × 0,5 = 2: el precio cae cerca de 2%. Si en un informe leés "la TIR subió 50 puntos básicos", es exactamente lo mismo: 0,5 p.p.` },
      { t: "ej", id: "e2", tipo: "estimar",
        enunciado: `Un cliente tiene un bono con duration 6. Por una suba del riesgo país, la TIR del bono pasa de 9% a 11,5%. A ojo, ¿cuánto cae su precio? Respondé en %, sin el signo menos.`,
        unidad: "%", respuesta: 15, tolerancia: 1,
        explicacion: `De 9% a 11,5% son 2,5 p.p.. Duration 6 × 2,5 = <strong>15%</strong>. Si el cliente tenía USD 20.000 en ese bono, en pantalla va a ver unos USD 3.000 menos.` },
      { t: "h", texto: "Ahora jugá" },
      { t: "p", html: `La única forma de que la regla salga sola es practicarla muchas veces. El juego te muestra un bono y un movimiento de tasas; vos movés el control hasta tu estimación y después ves la respuesta. Ocho rondas por partida.` },
      { t: "herramienta", id: "juego-duration" },
      { t: "h", texto: "Un detalle a favor del inversor" },
      { t: "p", html: `La regla es una muy buena aproximación, pero con movimientos grandes aparece un efecto interesante: <strong>un bono gana más cuando la tasa baja de lo que pierde cuando la tasa sube lo mismo</strong>.` },
      { t: "grafico", id: "asimetria" },
      { t: "p", html: `Con 3 p.p. de movimiento, el bono a 10 años pierde 19% si la tasa sube, pero gana 26% si baja. Por eso la regla de bolsillo, con movimientos grandes, <strong>exagera un poco las caídas y se queda corta con las subas</strong>. En la jerga se lo llama <span class="term" data-term="convexidad">convexidad</span>; para estimar a ojo alcanza con saber que el error juega a favor de quien tiene el bono.` },
      { t: "ej", id: "e3", tipo: "mc",
        enunciado: `Un bono con duration 7. Si la TIR baja 2 p.p., la regla dice +14%. ¿Qué esperás que pase en la realidad?`,
        opciones: [
          { txt: "Que suba algo más de 14%, porque con movimientos grandes las subas superan a la estimación.", ok: true, fb: "Exacto: el efecto de curvatura juega a favor." },
          { txt: "Que suba bastante menos de 14%, porque la regla de bolsillo siempre es demasiado optimista.", ok: false, fb: "Con las subas es al revés: la regla se queda corta." },
          { txt: "Que suba exactamente 14%, porque la regla de duration es una fórmula exacta para cualquier caso.", ok: false, fb: "Es una aproximación: muy buena para movimientos chicos, menos precisa para grandes." }
        ],
        explicacion: `Para hablar con un cliente, la regla alcanza de sobra. Solo conviene recordar que, en movimientos grandes, la caída real suele ser un poco menor y la suba un poco mayor que la estimada.` }
    ]
  },

  /* ------------------------------------------------------------ */
  {
    id: "d3",
    titulo: "Duration en la cartera y con el cliente",
    minutos: 10,
    objetivo: "Usar la duration para comparar bonos reales, elegir según el horizonte del cliente y explicarle una caída de precio.",
    bloques: [
      { t: "p", html: `Con la regla incorporada, la duration se vuelve una herramienta de todos los días. En las curvas de los informes (Inviu, PPI y otros), el eje horizontal suele ser la duration: <strong>cuanto más a la derecha, más se mueve el bono</strong>.` },
      { t: "tabla", cab: ["Instrumento", "Duration aproximada", "Si la TIR sube 1 p.p."], filas: [
        ["Caución a 7 días", "≈ 0", "Prácticamente nada"],
        ["LECAP a 3 meses", "≈ 0,25", "≈ −0,25%"],
        ["GD30 (Global 2030)", "≈ 2", "≈ −2%"],
        ["GD35 (Global 2035)", "≈ 5,5", "≈ −5,5%"]
      ], nota: "Durations de referencia de los Globales según PPI y Rava (marzo de 2026). Cambian con el tiempo y con el precio: chequealas en la pantalla antes de usarlas con un cliente." },
      { t: "ej", id: "e1", tipo: "estimar",
        enunciado: `Entre julio y noviembre de 2026 el riesgo país subió fuerte, de unos 430 a más de 900 puntos básicos. Suponé que la TIR del GD30 y la del GD35 subieron 4 p.p. cada una (por ejemplo, de 8% a 12%). A ojo, ¿cuánto cayó el GD35? Respondé en %, sin el signo menos.`,
        unidad: "%", respuesta: 22, tolerancia: 1.5,
        explicacion: `Duration 5,5 × 4 p.p. ≈ <strong>22%</strong> (un poco menos en la realidad, por la curvatura). El GD30, con duration cercana a 2, habría caído unos 8%. Mismo emisor, mismo riesgo país, mismo shock: casi tres veces más caída en el bono largo.` },
      { t: "h", texto: "Lo más importante para el cliente: horizonte vs. duration" },
      { t: "p", html: `Una caída de precio por suba de tasas <strong>no es una pérdida definitiva</strong> si el cliente mantiene el bono hasta el vencimiento y el emisor paga: a medida que se acerca el final, el precio vuelve hacia lo que el bono paga. El problema aparece cuando el cliente necesita vender antes, en el peor momento.` },
      { t: "idea", titulo: "La regla de oro", html: `Que la duration del bono no supere, por mucho, el tiempo que el cliente puede esperar. Si va a necesitar la plata en un año, un bono con duration 6 lo expone a vender con una caída grande. Si no la va a tocar en ocho años, la misma caída es un momento incómodo, no un problema.` },
      { t: "ej", id: "e2", tipo: "mc",
        enunciado: `Una clienta necesita USD 30.000 en 12 meses para una operación. Le ofrecen un bono que rinde 2 p.p. más que otro, pero con duration 6 en lugar de 1. ¿Qué le recomendás?`,
        opciones: [
          { txt: "El de duration 6: rinde 2 p.p. más por año y eso compensa de sobra cualquier movimiento de precio.", ok: false, fb: "Con duration 6, una suba de 1,5 p.p. de TIR se come más de 4 años de esos 2 p.p. extra." },
          { txt: "El de duration 1: calza con su horizonte, y una suba de tasas no la obliga a vender con una caída grande.", ok: true, fb: "Exacto: calzar duration y horizonte es la decisión defensiva." },
          { txt: "Cualquiera de los dos, porque si espera hasta el vencimiento del bono nunca pierde nada.", ok: false, fb: "El bono de duration 6 vence mucho después de los 12 meses: va a tener que venderlo a precio de mercado." }
        ],
        explicacion: `Los 2 p.p. extra son el pago por asumir más riesgo de precio. Para alguien que va a vender en un año, ese riesgo es real y el pago no lo compensa.` },
      { t: "h", texto: "Cuándo conviene más duration" },
      { t: "p", html: `Así como duele cuando las tasas suben, la duration es la mejor aliada cuando bajan. Si el mercado espera que el riesgo país baje 200 puntos básicos, el bono con duration 6 subiría cerca de 12% y el de duration 2, cerca de 4%. Por eso, en momentos de optimismo, el mercado "estira duration" (compra bonos largos), y en momentos de miedo "acorta duration" (se refugia en los cortos).` },
      { t: "ej", id: "e3", tipo: "multi",
        enunciado: `Marcá <strong>todas</strong> las situaciones en las que tiene sentido preferir bonos de duration más alta.`,
        opciones: [
          { txt: "El cliente tiene un horizonte largo y tolera ver caídas temporales en pantalla.", ok: true, fb: "Puede esperar a que el precio se recupere." },
          { txt: "Se espera que las tasas o el riesgo país bajen en los próximos meses.", ok: true, fb: "La duration amplifica la suba de precio si eso ocurre." },
          { txt: "El cliente va a necesitar la plata dentro de pocos meses para una compra.", ok: false, fb: "Es el caso en que conviene la duration más baja posible." },
          { txt: "El cliente se pone muy nervioso cuando su cartera muestra números en rojo.", ok: false, fb: "Más duration significa más movimientos en pantalla: mala combinación." },
          { txt: "Se quiere asegurar una tasa alta durante muchos años, sin depender de reinvertir.", ok: true, fb: "Un bono largo 'congela' la tasa por más tiempo." }
        ],
        explicacion: `La duration no es buena ni mala: es una perilla. Se sube cuando el cliente puede esperar y el escenario acompaña; se baja cuando necesita estabilidad o la plata pronto.` },
      { t: "ej", id: "e4", tipo: "caso",
        enunciado: `Un cliente compró GD35 hace cuatro meses y hoy lo ve 18% abajo. Te escribe: "¿Me estafaron? ¡Es un bono, se supone que es seguro!". Escribí en 4 o 5 líneas tu respuesta.`,
        rubrica: [
          "Explica sin jerga por qué cayó: subió la tasa que pide el mercado (el riesgo país) y su bono es largo.",
          "Usa la idea de 'atado a una tasa durante muchos años' o una imagen equivalente.",
          "Separa caída de precio de pérdida definitiva: si mantiene y el Tesoro paga, el precio converge a lo prometido.",
          "Revisa si su horizonte encaja con ese bono, sin prometerle que va a recuperar en un plazo concreto."
        ],
        modelo: `"Entiendo la bronca. No es una estafa: el GD35 es un bono largo, y cuando el mercado empieza a pedirle más tasa a Argentina, como pasó estos meses con el riesgo país, los bonos largos son los que más se ajustan, porque te quedan muchos años atado a la tasa con la que compraste. Si no vas a necesitar esta plata en los próximos años y el país paga, el precio va volviendo hacia lo que el bono promete. Lo que sí quiero revisar con vos es si tu horizonte encaja con un bono tan largo."` }
    ]
  }
  ]
};
