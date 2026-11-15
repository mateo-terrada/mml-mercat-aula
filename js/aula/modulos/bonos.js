/* ============================================================
   MÓDULO · Bonos: precio, TIR y duration
   Base: capítulo 4 del Book, reescrito en lecciones cortas.
   ============================================================ */
window.AULA = window.AULA || { modulos: {} };

AULA.modulos.bonos = {
  id: "bonos",
  numero: "03",
  titulo: "Bonos: precio, TIR y duration",
  bajada: "Las tres ideas que explican casi todo lo que le pasa a un bono: cuánto vale, cuánto rinde y cuánto se mueve cuando cambian las tasas.",
  fuente: "Book, capítulo 4",
  practica: [
    { titulo: "Curvas de bonos", desc: "Leé curvas reales de soberanos y respondé qué conviene y por qué.", href: "simulador.html" },
    { titulo: "Caja de puntas", desc: "Interpretá un libro de órdenes antes de comprar o vender un bono.", href: "simulador.html" }
  ],
  evaluacion: {
    cantidad: 10,
    ids: ["RF-MC-001","RF-MC-002","RF-MC-003","RF-MC-013","RF-MC-014","RF-MC-015","RF-MC-020","RF-MC-022",
          "RF-MC-023","RF-MC-024","TRAMPA-MC-003","TRAMPA-MC-013","TRAMPA-MC-017","RF-CASO-001","RF-CASO-003"]
  },
  lecciones: [

  /* ------------------------------------------------------------ */
  {
    id: "b1",
    titulo: "Anatomía de un bono",
    minutos: 8,
    objetivo: "Leer las condiciones de emisión de un bono y saber exactamente qué va a cobrar el inversor y cuándo.",
    bloques: [
      { t: "p", html: `Un bono es un <strong>préstamo partido en pedacitos</strong>. Un emisor (el Tesoro, una provincia o una empresa) necesita plata, y en vez de pedírsela a un banco se la pide a miles de inversores. Cada uno presta una parte y recibe a cambio la promesa de cobrar intereses y devolución del capital en fechas establecidas.` },
      { t: "p", html: `Cuando la emite una empresa se llama <span class="term" data-term="on">Obligación Negociable (ON)</span>; cuando la emite el Estado, bono soberano. La lógica es la misma.` },
      { t: "h", texto: "Las cinco piezas que tenés que encontrar siempre" },
      { t: "tabla", cab: ["Pieza", "Qué es", "Pregunta que responde"], filas: [
        ["Emisor", "Quién debe la plata", "¿A quién le estoy prestando?"],
        ["Valor nominal (VN)", "El capital sobre el que se calcula todo", "¿Sobre cuánto se pagan los intereses?"],
        ["Cupón", "La tasa de interés pactada sobre el VN", "¿Cuánto interés paga y cada cuánto?"],
        ["Amortización", "Cómo se devuelve el capital", "¿Todo al final o en cuotas?"],
        ["Vencimiento", "La fecha del último pago", "¿Hasta cuándo dura el préstamo?"]
      ], nota: "Hay una sexta pieza que en Argentina pesa mucho: la ley que rige el bono (argentina o Nueva York). La vemos en el módulo de renta fija argentina." },
      { t: "ejemplo", titulo: "Del prospecto al flujo de fondos", pasos: [
        `Una ON en dólares tiene: <strong>VN USD 100, cupón 8% anual pagadero semestralmente, vencimiento en 3 años, amortización 100% al vencimiento</strong> (lo que se llama <span class="term" data-term="bullet">bullet</span>).`,
        `Cupón semestral: 8% anual ÷ 2 = 4% por semestre. Sobre USD 100 de VN, son <strong>USD 4 cada seis meses</strong>.`,
        `Calendario: cinco pagos de USD 4 y, en el sexto semestre, USD 4 de interés + USD 100 de capital = <strong>USD 104</strong>.`,
        `Total a cobrar si se mantiene hasta el final: 6 × 4 + 100 = <strong>USD 124</strong> por cada USD 100 de nominal.`
      ], conclusion: `Esos USD 124 son lo que el bono promete. Cuánto conviene pagar hoy por esa promesa es la pregunta de la próxima lección.` },
      { t: "ej", id: "e1", tipo: "estimar",
        enunciado: `Una ON tiene VN USD 100, cupón 6% anual pagadero semestralmente y amortiza en dos cuotas iguales: 50% a los 2 años y 50% a los 3 años. ¿Cuánto paga de interés en el quinto semestre (después de la primera amortización)? Respondé en USD.`,
        unidad: "USD", respuesta: 1.5, tolerancia: 0.05,
        explicacion: `Después de devolver la mitad, el capital que queda vivo (<span class="term" data-term="residual">valor residual</span>) es USD 50. El cupón semestral es 3% sobre ese residual: 0,03 × 50 = <strong>USD 1,50</strong>. Los intereses siempre se calculan sobre lo que todavía se debe, no sobre el nominal original.` },
      { t: "ojo", titulo: "Una confusión muy común", html: `En pantalla, un bono que cotiza "67" no cuesta 67 dólares en total: es el precio <strong>por cada 100 de valor nominal</strong>. Si un cliente quiere invertir USD 10.000 en un bono que cotiza 67, compra unos 14.900 de nominal (10.000 ÷ 0,67). Aclararlo antes de cargar una orden evita errores de magnitud.` },
      { t: "ej", id: "e2", tipo: "mc",
        enunciado: `Un bono amortiza en 10 cuotas semestrales iguales a partir del año 3. Un cliente pregunta: "¿Por qué cada vez cobro menos interés si la tasa es la misma?". ¿Qué le respondés?`,
        opciones: [
          { txt: "Porque el emisor está pagando menos de lo prometido, y eso suele anticipar problemas financieros.", ok: false, fb: "No hay ningún problema: es lo que dice el prospecto." },
          { txt: "Porque cada cuota te devuelve capital, y el interés se calcula sobre lo que queda por devolver.", ok: true, fb: "Exacto. Menos capital vivo, menos interés, aunque la tasa sea la misma." },
          { txt: "Porque en este bono la tasa del cupón va bajando año a año, como dice el prospecto.", ok: false, fb: "Hay bonos con cupón escalonado, pero acá la tasa es fija. El efecto viene de la amortización." }
        ],
        explicacion: `Con bonos que amortizan, cada pago tiene dos partes: interés y devolución de capital. Para el cliente que vive de la renta es importante aclararlo: parte de lo que cobra es su propia plata que vuelve.` },
      { t: "cliente", titulo: "Cómo se lo explicás al cliente", html: `"Comprar un bono es prestarle plata a alguien. A cambio te paga un interés cada tanto y te devuelve lo que prestaste en las fechas que dice el contrato. Lo primero que miramos es a quién le prestás y si te va a poder pagar."` }
    ]
  },

  /* ------------------------------------------------------------ */
  {
    id: "b2",
    titulo: "Precio y TIR: dos caras de la misma moneda",
    minutos: 11,
    objetivo: "Entender qué es la TIR, por qué se mueve al revés que el precio y usarla para comparar bonos.",
    bloques: [
      { t: "p", html: `El bono promete flujos fijos. Lo que cambia todos los días es <strong>cuánto paga el mercado hoy por esos flujos</strong>. Y como un dólar dentro de tres años vale menos que un dólar hoy, el precio de un bono es siempre la suma de lo que valen hoy sus pagos futuros.` },
      { t: "idea", titulo: "Qué es la TIR, sin fórmulas", html: `La <span class="term" data-term="tir">TIR</span> (tasa interna de retorno) es el rendimiento anual que vas a obtener si comprás el bono <strong>al precio de hoy</strong>, lo mantenés hasta el vencimiento y cobrás todo lo prometido. Es la forma de comparar bonos con precios, cupones y plazos distintos usando un solo número.` },
      { t: "p", html: `De esto sale la relación más importante de la renta fija: <strong>si el precio baja, la TIR sube; si el precio sube, la TIR baja</strong>. No es que "la tasa sube y el bono gana": pagás menos por los mismos pagos futuros, así que tu rendimiento sobre lo invertido es mayor.` },
      { t: "analogia", html: `Es como una heladera en oferta: la heladera es la misma (los pagos del bono no cambian). Si la pagás menos, hiciste mejor negocio. El "rendimiento" de tu compra sube porque el precio bajó.` },
      { t: "h", texto: "Probalo: mové la TIR y mirá el precio" },
      { t: "p", html: `La calculadora valúa un bono bullet con cupón anual. Arranca con el bono de la lección anterior en versión simplificada: cupón 8%, 3 años. Mové la TIR que exige el mercado y fijate qué pasa con el precio.` },
      { t: "herramienta", id: "bono" },
      { t: "ej", id: "e1", tipo: "estimar",
        enunciado: `Antes de usar la calculadora, estimá: un bono de cupón 8% anual a 3 años, si el mercado exige una TIR del <strong>10%</strong>, ¿cotiza arriba o abajo de 100? ¿Más o menos a cuánto? (Respondé el precio.)`,
        unidad: "", respuesta: 95.0, tolerancia: 1.5,
        explicacion: `Si el mercado exige 10% y el bono paga 8%, nadie lo va a comprar a 100: tiene que bajar hasta que su rendimiento llegue a 10%. El precio exacto es <strong>95,03</strong>. Regla útil: <strong>TIR mayor que el cupón → cotiza bajo la par; TIR menor que el cupón → sobre la par; iguales → a la par (100)</strong>.` },
      { t: "ej", id: "e2", tipo: "mc",
        enunciado: `Un cliente compró un bono a 100 cuando su TIR era 8%. Hoy la TIR de mercado es 10%. Te pregunta: "Si ahora rinde 10%, ¿yo gano más?". ¿Qué le respondés?`,
        opciones: [
          { txt: "Sí: ahora tu bono rinde 10%, así que vas a cobrar más intereses de los que esperabas.", ok: false, fb: "El 10% es para quien compra hoy, a un precio más bajo." },
          { txt: "No: si lo mantenés al vencimiento ganás el 8% de tu compra; lo que bajó es el precio de hoy.", ok: true, fb: "Exacto. La TIR de compra es la que se fija para quien mantiene hasta el final; el precio de hoy refleja la TIR de hoy." },
          { txt: "Ganás más solo si lo vendés ahora, porque el mercado está pagando una tasa más alta que antes.", ok: false, fb: "Al revés: si vende ahora, vende a un precio más bajo que el de compra." }
        ],
        explicacion: `Distinguir la <strong>TIR de compra</strong> (la tuya, fija si mantenés hasta el vencimiento y el emisor paga) de la <strong>TIR de mercado</strong> (la de hoy, que mueve el precio) resuelve la mitad de las dudas de los clientes.` },
      { t: "h", texto: "Los supuestos que hay detrás de la TIR" },
      { t: "lista", items: [
        `<strong>Que el emisor pague todo.</strong> La TIR es una promesa calculada, no una garantía. Una TIR muy alta suele reflejar dudas sobre el pago.`,
        `<strong>Que mantengas hasta el vencimiento.</strong> Si vendés antes, tu resultado depende del precio de ese día.`,
        `<strong>Que reinviertas los cupones a la misma tasa.</strong> En la práctica, se reinvierten a lo que rinda el mercado en cada momento.`
      ]},
      { t: "ojo", titulo: "Trampa frecuente", html: `"Este bono rinde 18% y aquel 11%: compremos el de 18%". Una TIR mucho más alta que la de bonos parecidos no es una ganga gratis: es el mercado diciendo que ve más riesgo. Antes de recomendarla, preguntate <em>por qué</em> rinde más.` },
      { t: "ej", id: "e3", tipo: "mc",
        enunciado: `Dos ONs en dólares, mismo plazo. La de la empresa A rinde 7,5% y la de B, 14%. ¿Cuál es la lectura correcta?`,
        opciones: [
          { txt: "B es mejor: por el mismo plazo rinde casi el doble, y esa diferencia compensa el riesgo extra.", ok: false, fb: "Rinde más porque el mercado le asigna más riesgo. No es gratis." },
          { txt: "El mercado ve a B más riesgosa o menos líquida: antes de elegirla hay que entender por qué paga más.", ok: true, fb: "Exacto. La diferencia de TIR es información, no un regalo." },
          { txt: "A es mejor: una TIR más baja siempre indica un emisor más seguro, así que es la opción más prudente.", ok: false, fb: "Suele ir junto, pero no es una regla automática: también influyen la liquidez y la estructura." }
        ],
        explicacion: `La pregunta profesional nunca es "¿cuál rinde más?" sino "¿qué riesgo estoy cobrando con ese rendimiento extra, y lo quiero para este cliente?".` }
    ]
  },

  /* ------------------------------------------------------------ */
  {
    id: "b6",
    titulo: "El elástico: lo que rindió y lo que le queda",
    minutos: 10,
    objetivo: "Entender que el rendimiento hasta el vencimiento está atado: si el bono rindió de más en el camino, le queda menos; si rindió de menos, le queda más. Y usarlo para decidir cuándo rotar y cuándo esperar.",
    bloques: [
      { t: "p", html: `Cuando comprás un bono, la TIR te dice cuánto vas a ganar <strong>desde hoy hasta el vencimiento</strong>, si el emisor paga. El punto de llegada está atado: es lo que el bono paga. Lo que no está atado es el camino. En el medio, el precio sube y baja con las tasas, el riesgo país o las noticias de la empresa.` },
      { t: "analogia", titulo: "Una forma de pensarlo", html: `Es como un elástico atado a la meta. El precio se puede alejar del camino esperado, para arriba o para abajo, pero el elástico lo vuelve a llevar al mismo punto final. Lo que ganó de más al principio, lo deja de ganar después. Lo que perdió al principio, lo recupera después.` },
      { t: "herramienta", id: "elastico" },
      { t: "idea", titulo: "La pregunta que importa no es cuánto rindió, sino cuánto le queda", html: `El rendimiento pasado ya está en el bolsillo (o ya se perdió). Para decidir si seguir con un bono, lo único que cuenta es <strong>cuánto rinde desde hoy</strong>, y eso es su TIR de hoy, no la del día que lo compró.` },
      { t: "tabla", cab: ["Lo que pasó", "Lo que significa", "Qué hacer"], filas: [
        ["El bono subió mucho (bajaron las tasas, mejoró la empresa)", "Adelantó rendimiento: lo que queda rinde poco (su TIR bajó)", "Comparar esa TIR con otros bonos parecidos. Si rinden más, evaluar tomar la ganancia y rotar"],
        ["El bono cayó (subieron las tasas o el riesgo país)", "Se atrasó: lo que queda rinde más (su TIR subió)", "Si el emisor va a pagar y el cliente puede esperar, la caída se recupera sola. Antes, revisar por qué cayó"],
        ["Va en línea", "Lo que queda rinde parecido a la TIR de compra", "Nada que corregir"]
      ]},
      { t: "ej", id: "e1", tipo: "estimar",
        enunciado: `Un cliente compró un bono a 12 meses al 100, que paga 112 al vencimiento (TIR de 12%). A los 6 meses el bono ya vale 110. ¿Cuánto le queda por ganar en los 6 meses restantes? Respondé en %.`,
        unidad: "%", respuesta: 1.8, tolerancia: 0.3,
        explicacion: `Hoy vale 110 y al vencimiento paga 112: le quedan 112 ÷ 110 − 1 ≈ <strong>1,8%</strong> en 6 meses, cerca de 3,6% por año. Ya ganó 10% de los 12%: el elástico solo le deja 2 más.` },
      { t: "ej", id: "e2", tipo: "mc",
        enunciado: `Con ese mismo bono (vale 110 a 6 meses del vencimiento), el cliente dice: "Yo me quedo, porque al vencimiento rinde 12% anual". Hay otro bono parecido, del mismo riesgo, que hoy rinde 11% anual. ¿Qué le explicás?`,
        opciones: [
          { txt: "Que tiene razón: si lo compró con TIR de 12%, ese es el rendimiento que va a obtener hasta el final.", ok: false, fb: "El 12% era desde la compra. Desde hoy, lo que queda rinde cerca de 3,6% por año." },
          { txt: "Que el 12% era desde la compra; desde hoy rinde cerca de 3,6% anual, y el otro bono paga 11%.", ok: true, fb: "Exacto: la decisión se toma con la TIR de hoy." },
          { txt: "Que da lo mismo quedarse o rotar, porque los dos bonos tienen el mismo riesgo y vencen parecido.", ok: false, fb: "Mismo riesgo, pero uno rinde 3,6% por año desde hoy y el otro 11%." }
        ],
        explicacion: `Es el caso típico de tomar ganancia: el bono "adelantó" casi todo su rendimiento. Quedarse es aceptar un 3,6% anual por lo que falta. Rotar le permite volver a cobrar una TIR acorde al riesgo (descontando costos de operar).` },
      { t: "ej", id: "e3", tipo: "mc",
        enunciado: `Otro cliente compró el mismo tipo de bono al 100 (paga 112 al vencimiento). A los 6 meses cayó a 95 porque subieron las tasas, y quiere vender "antes de que siga cayendo". ¿Qué es lo más importante que tiene que entender?`,
        opciones: [
          { txt: "Que si el emisor paga, de 95 a 112 son casi 18% en 6 meses: la caída se recupera si espera.", ok: true, fb: "Exacto, siempre que el emisor pague." },
          { txt: "Que el bono va a seguir cayendo, porque cuando un bono baja 5% suele bajar otro tanto después.", ok: false, fb: "No hay una regla así; y el punto final no cambió." },
          { txt: "Que perdió 5% de manera definitiva, porque el bono ya no va a volver a valer lo que pagó.", ok: false, fb: "Al vencimiento paga 112, sin importar el precio de hoy, si el emisor paga." }
        ],
        explicacion: `La caída por suba de tasas es temporal si el emisor paga y el cliente puede esperar: el elástico lo lleva de vuelta. Pero si cayó porque aumentó el riesgo de que no pague, el rendimiento extra es el pago por ese riesgo, y ahí sí hay que revisar la decisión.` },
      { t: "ojo", titulo: "El elástico se corta si el emisor no paga", html: `Todo esto supone que el bono paga lo prometido. Si el emisor entra en default o reestructura, el punto final cambia. Por eso, ante una caída fuerte, la primera pregunta es: <strong>¿cayó porque subieron las tasas en general, o porque el mercado duda de este emisor?</strong>` },
      { t: "cliente", titulo: "Cómo se lo explicás al cliente", html: `"Este bono tiene una meta fija: al vencimiento paga lo mismo, pase lo que pase en el camino. Si en el medio sube mucho, lo que queda por ganar es poco, y quizás conviene pasarse a otro. Si en el medio baja, lo que queda por ganar es más, y si la empresa paga, lo recuperás esperando."` }
    ]
  },

  /* ------------------------------------------------------------ */
  {
    id: "b3",
    titulo: "Cupón, rendimiento corriente, precio sucio y paridad",
    minutos: 10,
    objetivo: "Interpretar correctamente los números que aparecen en una pantalla de bonos argentina.",
    bloques: [
      { t: "p", html: `En una pantalla de bonos aparecen varios números que se parecen y no son lo mismo. Confundirlos es el origen de muchas malas explicaciones a clientes.` },
      { t: "h", texto: "Cupón vs. TIR vs. rendimiento corriente" },
      { t: "tabla", cab: ["Concepto", "Qué mide", "Ejemplo: cupón 9%, precio 112"], filas: [
        ["Cupón", "El interés pactado sobre el nominal. Fijo desde la emisión.", "9% sobre 100 = USD 9 por año"],
        ["Rendimiento corriente", "El cupón dividido el precio que pagás hoy.", "9 ÷ 112 = 8,0%"],
        ["TIR", "El rendimiento total si mantenés hasta el final, incluido que al vencimiento cobrás 100 aunque pagaste 112.", "Menor al 8%: perdés 12 de capital en el camino"]
      ], nota: "Cuando un bono cotiza sobre la par, la TIR es menor que el cupón. Cuando cotiza bajo la par, es mayor." },
      { t: "ej", id: "e1", tipo: "mc",
        enunciado: `Un cliente quiere comprar una ON "porque paga 9% de cupón, mucho más que el plazo fijo". La ON cotiza a 112. ¿Qué es lo más importante aclararle?`,
        opciones: [
          { txt: "Que el 9% de cupón es exactamente lo que va a ganar por año si mantiene la ON hasta el final.", ok: false, fb: "Es lo que paga sobre el nominal, pero él no paga 100: paga 112." },
          { txt: "Que paga 112 y le devuelven 100: rinde menos del 9%, y para comparar hay que usar la TIR.", ok: true, fb: "Exacto. El cupón es el número de marketing; la TIR es el número de decisión." },
          { txt: "Que no conviene comprar bonos sobre la par, porque siempre terminan perdiendo plata.", ok: false, fb: "No hay nada malo en comprar sobre la par si la TIR resultante es atractiva." }
        ],
        explicacion: `La regla práctica: <strong>para comparar bonos, usá la TIR; el cupón sirve para saber cuánto vas a cobrar en cada pago</strong>.` },
      { t: "h", texto: "Precio sucio: la forma normal de cotizar en Argentina" },
      { t: "p", html: `Entre un pago de cupón y el siguiente, el interés se va acumulando día a día. A esa parte acumulada se la llama <span class="term" data-term="corridos">intereses corridos</span>. En el mercado argentino, los bonos cotizan por defecto a <strong>precio sucio</strong>: el precio de pantalla ya incluye esos intereses. Es la convención normal acá, no una excepción.` },
      { t: "p", html: `El <strong>precio limpio</strong> es el sucio menos los intereses corridos. Se usa sobre todo en mercados internacionales y en algunos análisis, porque permite ver el movimiento del precio sin el "serrucho" que se produce cada vez que se paga un cupón.` },
      { t: "ejemplo", titulo: "El serrucho del cupón", pasos: [
        `Un bono paga cupón semestral de USD 3. Pasaron 3 de los 6 meses desde el último pago: lleva acumulados USD 1,50 de intereses corridos.`,
        `En pantalla cotiza <strong>96 (precio sucio)</strong>. El precio limpio es 96 − 1,50 = <strong>94,50</strong>.`,
        `El día que paga el cupón, el bono cobra USD 3 y el precio sucio cae más o menos USD 3. No es que "el bono se desplomó": esa plata pasó del bono a la cuenta del inversor.`
      ], conclusion: `Si un cliente ve una caída brusca justo en la fecha de pago de un cupón, lo primero es chequear eso antes de asustarse.` },
      { t: "h", texto: "Valor técnico y paridad" },
      { t: "p", html: `El <span class="term" data-term="valortecnico">valor técnico</span> es lo que el emisor debería pagar si cancelara la deuda hoy: el capital que queda por devolver más los intereses corridos. La <span class="term" data-term="paridad">paridad</span> compara el precio con ese valor técnico:` },
      { t: "formula", html: `Paridad = Precio ÷ Valor técnico`, nota: `Paridad 100% significa que cotiza exactamente a lo que vale "en los papeles". Por debajo de 100, cotiza con descuento.` },
      { t: "ej", id: "e2", tipo: "estimar",
        enunciado: `Siguiendo el ejemplo: valor residual 100, intereses corridos 1,50, precio sucio 96. ¿Cuál es la paridad? Respondé en %.`,
        unidad: "%", respuesta: 94.6, tolerancia: 0.3,
        explicacion: `Valor técnico = 100 + 1,50 = 101,50. Paridad = 96 ÷ 101,50 = <strong>94,6%</strong>. En un bono que ya amortizó parte del capital, el valor técnico es mucho menor que 100, y por eso un precio que parece "bajo" puede tener una paridad alta.` },
      { t: "ojo", titulo: "Paridad baja no es sinónimo de barato", html: `Un bono con paridad 45% no es "una ganga que puede duplicarse". Puede estar ahí porque el mercado espera una reestructuración. La paridad es una primera referencia; la decisión se toma mirando la TIR, la duration y la calidad del emisor.` }
    ]
  },

  /* ------------------------------------------------------------ */
  {
    id: "b4",
    titulo: "Duration: cuánto se mueve un bono cuando cambian las tasas",
    minutos: 12,
    objetivo: "Usar la duration modificada para estimar cuánto puede ganar o perder un bono ante un cambio de TIR.",
    bloques: [
      { t: "p", html: `Dos bonos pueden tener la misma TIR y comportarse muy distinto cuando el mercado se mueve. Uno puede caer 2% y el otro 15% ante la misma noticia. Lo que los diferencia es la <span class="term" data-term="duration">duration</span>.` },
      { t: "idea", titulo: "La duration en una frase", html: `La <strong>duration modificada</strong> te dice cuánto cambia el precio de un bono, en porcentaje, si su TIR se mueve 1 p.p.. Un bono con duration 5 cae aproximadamente 5% si su TIR sube 1 p.p., y sube aproximadamente 5% si baja 1 p.p..` },
      { t: "formula", html: `Variación de precio ≈ − Duration modificada × Variación de TIR`, nota: `Ejemplo: duration 4, la TIR sube 0,5 p.p. (50 puntos básicos) → el precio cae ≈ 4 × 0,5 = 2%.` },
      { t: "h", texto: "Qué hace que la duration sea más alta" },
      { t: "lista", items: [
        `<strong>Más plazo:</strong> los pagos están más lejos, y la plata lejana es más sensible a la tasa con que se descuenta.`,
        `<strong>Menos cupón:</strong> si el bono paga poco en el camino, casi todo el valor está al final. Un cupón cero tiene la duration más alta posible para su plazo.`,
        `<strong>Amortización al final:</strong> un bullet tiene más duration que un bono del mismo plazo que devuelve capital en cuotas.`
      ]},
      { t: "h", texto: "Probalo: un shock de tasas sobre tres bonos" },
      { t: "p", html: `Elegí cuánto se mueve la TIR del mercado y compará cómo reacciona un bono corto, uno medio y uno largo. La barra clara muestra la estimación con duration; la oscura, el cambio de precio exacto.` },
      { t: "herramienta", id: "sensibilidad" },
      { t: "ej", id: "e1", tipo: "estimar",
        enunciado: `Un bono tiene duration modificada 5,5. Su TIR pasa de 8,5% a 12,4% (sube 3,9 p.p.). Estimá cuánto cayó su precio, en %. (Respondé sin el signo menos.)`,
        unidad: "%", respuesta: 21.5, tolerancia: 1.5,
        explicacion: `La TIR subió 3,9 p.p.. Con duration 5,5: 5,5 × 3,9 ≈ <strong>21,5%</strong> de caída. Un salto de TIR de ese tamaño es del orden de lo que vivieron los Globales largos entre julio y comienzos de noviembre de 2026, cuando el riesgo país pasó de unos 430 a más de 900 puntos básicos. Con movimientos tan grandes, la caída real suele ser algo menor que la estimada por duration: eso es la <span class="term" data-term="convexidad">convexidad</span>.` },
      { t: "ej", id: "e2", tipo: "mc",
        enunciado: `Un cliente conservador pregunta por qué le recomendás un bono a 2 años que rinde 7% en lugar de uno a 10 años que rinde 9%, del mismo emisor.`,
        opciones: [
          { txt: "Porque al ser más largo, el bono a 10 años tiene peor calidad crediticia que el de 2 años.", ok: false, fb: "Es el mismo emisor: la calidad crediticia es la misma." },
          { txt: "Porque el de 10 años cae mucho más si suben las tasas, y 2 p.p. extra no le compensan ese riesgo.", ok: true, fb: "Exacto. La diferencia de TIR paga el riesgo de tasa, y ese riesgo no encaja con su perfil." },
          { txt: "Porque los bonos cortos rinden más a largo plazo: al reinvertir seguido se captura más tasa.", ok: false, fb: "No hay una regla así. Acá la clave es el riesgo de precio." }
        ],
        explicacion: `Acortar duration es la herramienta más concreta para bajar el riesgo de precio de una cartera de renta fija. Alargarla es la forma de "apostar" a que las tasas bajen.` },
      { t: "h", texto: "La duration funciona para los dos lados" },
      { t: "p", html: `La misma sensibilidad que duele cuando las tasas suben es la que hace ganar cuando bajan. Si un analista dice "el riesgo país puede comprimir 200 puntos básicos", el bono que más gana es el de mayor duration. Por eso, en momentos de optimismo, el mercado busca bonos largos; en momentos de miedo, se refugia en los cortos.` },
      { t: "cliente", titulo: "Cómo se lo explicás al cliente", html: `"Pensalo como una palanca. Un bono corto tiene una palanca chiquita: se mueve poco para arriba y poco para abajo. Uno largo tiene una palanca grande: si las tasas bajan, ganás mucho; si suben, perdés mucho. La pregunta es cuánta palanca querés tener."` }
    ]
  },

  /* ------------------------------------------------------------ */
  {
    id: "b5",
    titulo: "Los riesgos de tener un bono",
    minutos: 8,
    objetivo: "Repasar los riesgos de la renta fija y tener un checklist antes de recomendar cualquier bono.",
    bloques: [
      { t: "p", html: `"Renta fija" suena a algo que no se mueve, pero lo único fijo son las condiciones del contrato. El precio y el resultado final dependen de varios riesgos que conviene revisar uno por uno.` },
      { t: "tabla", cab: ["Riesgo", "Qué es", "Cómo se mira"], filas: [
        ["Crédito", "Que el emisor no pague o reestructure", "Calidad del emisor, TIR contra pares, calificación"],
        ["Tasa", "Que suban las TIR del mercado y caiga el precio", "Duration"],
        ["Reinversión", "Tener que reinvertir los cupones a tasas más bajas", "Cupones altos + tasas en baja"],
        ["Liquidez", "No poder vender sin un descuento grande", "Volumen y caja de puntas"],
        ["Rescate anticipado", "Que el emisor cancele antes, justo cuando el bono rinde bien", "Cláusulas de call en el prospecto"],
        ["Moneda", "Que el instrumento esté en una moneda distinta a la que necesita el cliente", "Moneda de pago y de negociación"]
      ]},
      { t: "ej", id: "e1", tipo: "mc",
        enunciado: `Una ON con opción de rescate anticipado (call) a favor de la empresa cotiza a 108. ¿Por qué el call es un riesgo para el inversor?`,
        opciones: [
          { txt: "Porque si las tasas bajan, la empresa puede cancelar a un precio fijado (por ejemplo 101) y le quita la suba.", ok: true, fb: "Exacto: el call le pone techo a la ganancia justo en el escenario bueno." },
          { txt: "Porque le da a la empresa el derecho de dejar de pagar cupones mientras el bono cotice sobre la par.", ok: false, fb: "No: el call no permite dejar de pagar. Eso sería un default, que es riesgo de crédito." },
          { txt: "No es un riesgo: cobrar antes de tiempo siempre es bueno, porque te devuelven la plata más rápido.", ok: false, fb: "Cobrar antes a 101 un bono que compraste a 108 es una pérdida." }
        ],
        explicacion: `Si una ON con call cotiza bien arriba del precio de rescate, la TIR que importa es la calculada <em>hasta la fecha del call</em>, que puede ser bastante menor que la TIR hasta el vencimiento.` },
      { t: "ej", id: "e2", tipo: "multi",
        enunciado: `Antes de recomendarle un bono a un cliente, marcá <strong>todo</strong> lo que tendrías que haber chequeado.`,
        opciones: [
          { txt: "Quién es el emisor y si la TIR es coherente con bonos parecidos.", ok: true, fb: "Es el primer filtro: riesgo de crédito." },
          { txt: "La duration, y si encaja con el horizonte y el perfil del cliente.", ok: true, fb: "Define cuánto puede moverse el precio." },
          { txt: "La moneda en la que paga y en la que conviene negociarlo.", ok: true, fb: "Clave en Argentina: no todos los bonos tienen liquidez en todas las monedas." },
          { txt: "Que el cliente conozca el ticker y se sienta cómodo con el emisor.", ok: false, fb: "Que lo conozca no lo hace adecuado." },
          { txt: "Cuántos compradores y vendedores hay en la caja de puntas.", ok: true, fb: "Si después necesita vender, la liquidez importa." },
          { txt: "Cómo le fue al bono en el último mes, para ver si viene subiendo.", ok: false, fb: "El rendimiento pasado no dice si hoy es adecuado. Lo que importa es la TIR de hoy y el riesgo." }
        ],
        explicacion: `Un checklist de cinco preguntas (emisor, TIR contra pares, duration, moneda, liquidez) evita la mayoría de las malas recomendaciones de renta fija.` },
      { t: "ej", id: "e3", tipo: "caso",
        enunciado: `Un cliente te dice: "Quiero renta fija porque no quiero que mi plata se mueva". Escribí en 3 o 4 líneas cómo le explicás qué puede moverse en un bono y qué le propondrías.`,
        rubrica: [
          "Aclara que lo fijo son las condiciones del contrato, no el precio diario.",
          "Menciona al menos dos riesgos (tasa y crédito, idealmente).",
          "Conecta con una solución: bonos cortos (poca duration) de emisores de calidad.",
          "Usa lenguaje simple, sin jerga."
        ],
        modelo: `"Lo 'fijo' de la renta fija es lo que te prometen pagar, no el precio de todos los días. El precio puede bajar si suben las tasas o si el mercado duda de quien te debe. Si no querés sobresaltos, te propongo bonos de vencimiento corto y de emisores sólidos: se mueven poco, y si los mantenés hasta el final cobrás lo pactado."` }
    ]
  }
  ]
};
