const BANCO_PREGUNTAS = [
  {
    "id": "RF-MC-001",
    "categoria": "Renta Fija",
    "subtema": "Relación precio-TIR",
    "dificultad": "basica",
    "tipo": "multiple_choice",
    "enunciado": "Un cliente te dice: 'Compré un bono al 100 y ahora veo que cotiza a 95, pero el banco me dice que la TIR subió. ¿Cómo puede ser que el precio baje y la tasa suba al mismo tiempo?' ¿Cuál es la explicación correcta?",
    "opciones": [
      "El precio bajó porque la TIR bajó, no al revés esto es al revés de cómo funciona realmente la relación entre ambas variables",
      "La TIR solo cambia si cambia el cupón del bono ya que el cupón es fijo y por lo tanto la TIR debería mantenerse constante durante toda la vida del bono",
      "Es un error del sistema, precio y TIR deberían moverse en el mismo sentido y conviene reportarlo como una falla técnica de la plataforma",
      "Precio y TIR se mueven en sentidos opuestos: si el precio baja, el rendimiento exigido (TIR) sube, porque pagás menos por los mismos pagos futuros"
    ],
    "respuesta_correcta": 3,
    "explicacion": "Esta es LA relación que más cuesta interiorizar y la que más preguntan los clientes. Pensalo así: el bono te va a pagar los mismos flujos futuros (cupones + capital) pase lo que pase. Si hoy pagás menos por esos mismos flujos (precio baja), tu rendimiento sobre lo que pagaste es mayor (TIR sube). Es la misma lógica que comprar un electrodoméstico en oferta: si pagás menos por la misma heladera, hiciste mejor negocio relativo. Cuando expliques esto a un cliente, evitá la fórmula y andá directo al ejemplo concreto."
  },
  {
    "id": "RF-MC-002",
    "categoria": "Renta Fija",
    "subtema": "Duration y sensibilidad a tasas",
    "dificultad": "intermedia",
    "tipo": "multiple_choice",
    "enunciado": "Tenés dos bonos del mismo emisor y mismo riesgo crediticio: Bono A vence en 2 años, Bono B vence en 10 años. Si el mercado espera una suba de tasas, ¿cuál recomendás a un cliente que no quiere ver pérdidas de precio fuertes en el corto plazo?",
    "opciones": [
      "El Bono A, porque al tener menor duration es menos sensible a cambios de tasa",
      "El Bono B, porque al ser más largo compensa mejor la suba de tasas ya que un mayor plazo le da más tiempo a los cupones para ajustarse a la nueva tasa de mercado",
      "Da lo mismo, la duration no afecta la sensibilidad al precio porque lo único que determina el riesgo de un bono es el riesgo de crédito del emisor, no su plazo",
      "Ninguno, hay que vender toda la renta fija ante una suba de tasas porque cualquier suba de tasas afecta por igual a todos los bonos sin importar su plazo"
    ],
    "respuesta_correcta": 0,
    "explicacion": "Cuanto más lejano el vencimiento, mayor la duration, y mayor la sensibilidad del precio a cambios de tasa (para bien y para mal). Un bono a 10 años va a sufrir un golpe de precio mucho más fuerte ante una suba de tasas que uno a 2 años. Para un cliente conservador que no quiere sobresaltos, acortar duration es una herramienta concreta de gestión de riesgo, no solo un concepto teórico."
  },
  {
    "id": "RF-CASO-001",
    "categoria": "Renta Fija",
    "subtema": "Comunicación al cliente / TIR vs cupón",
    "dificultad": "intermedia",
    "tipo": "caso_abierto",
    "enunciado": "Un cliente nuevo te llama entusiasmado: vio una Obligación Negociable que paga 'cupón del 9%' y quiere comprar todo lo que pueda porque 'el banco le da 3% nomás'. Vos revisás la pantalla: ese bono hoy cotiza a USD 112 y la TIR real es 6,2%. Escribí en 4-5 líneas cómo le explicarías la diferencia entre el cupón anunciado y lo que realmente va a ganar si lo compra hoy y lo mantiene hasta el vencimiento, sin usar la palabra 'TIR' ni fórmulas.",
    "respuesta_modelo": "Puntos clave a evaluar en la respuesta: (1) que distinga cupón (fijo, definido al emitir) de rendimiento real (depende del precio de compra de hoy), (2) que use una analogía simple y evite jerga técnica, (3) que mencione que como el bono está más caro que su valor original, el rendimiento real es menor al cupón nominal, (4) que cierre con el número aproximado en términos concretos (alrededor de 6% y no 9%)."
  },
  {
    "id": "RF-MC-003",
    "categoria": "Renta Fija",
    "subtema": "Cupón cero / bono a descuento",
    "dificultad": "basica",
    "tipo": "multiple_choice",
    "enunciado": "Un bono 'cupón cero' no paga intereses periódicos. Entonces, ¿cómo gana dinero el inversor que lo compra?",
    "opciones": [
      "Solo gana si lo vende antes del vencimiento porque al llegar al vencimiento el bono deja de tener valor y no se cobra nada",
      "Lo compra a descuento (por debajo de 100) y al vencimiento cobra el valor nominal completo; la ganancia es esa diferencia",
      "No gana nada, son instrumentos sin rendimiento ya que al no pagar cupones periódicos no generan ningún tipo de retorno para el inversor",
      "Gana mediante dividendos trimestrales que la empresa emisora distribuye automáticamente durante la vida del bono"
    ],
    "respuesta_correcta": 1,
    "explicacion": "El cupón cero concentra todo el retorno en la diferencia entre lo que pagás hoy (descuento) y lo que cobrás al final (el 100% del nominal). No hay flujos intermedios. Es útil para explicarle a un cliente que se confunde porque 'no ve pagos': el retorno está, pero llega todo junto al vencimiento."
  },
  {
    "id": "RF-MC-004",
    "categoria": "Renta Fija",
    "subtema": "CER",
    "dificultad": "intermedia",
    "tipo": "multiple_choice",
    "enunciado": "Un cliente te dice: 'Quiero un bono CER porque así no pierdo nunca contra la inflación, ¿verdad?' ¿Cuál es la corrección más importante que le harías?",
    "opciones": [
      "Tiene razón, los bonos CER nunca pierden valor porque el ajuste por inflación los protege completamente de cualquier movimiento de precio en el mercado, incluso ante una suba fuerte de tasas",
      "CER y dólar son exactamente lo mismo ya que ambos mecanismos buscan preservar el poder adquisitivo del inversor de la misma manera, sin importar cómo se mueva el tipo de cambio oficial",
      "Los bonos CER solo sirven si la inflación es muy alta, porque con inflación baja el ajuste que reciben es tan chico que deja de tener sentido tenerlos en cartera frente a otras alternativas en pesos",
      "El capital se ajusta por inflación, pero el precio de mercado del bono igual puede subir o bajar, así que sí puede perder valor en el corto plazo aunque esté indexado"
    ],
    "respuesta_correcta": 3,
    "explicacion": "Acá hay una confusión muy común: la gente piensa que 'ajustado por CER' significa 'protegido siempre'. Pero el bono cotiza en el mercado y su precio puede moverse por tasas reales, demanda, contexto político, etc. El CER protege el capital contra inflación en términos de la fórmula del bono, no protege contra la volatilidad de precio de mercado. Conviene aclarar esto antes de vender el bono como 'sin riesgo'."
  },
  {
    "id": "RF-MC-005",
    "categoria": "Renta Fija",
    "subtema": "Dollar-linked",
    "dificultad": "intermedia",
    "tipo": "multiple_choice",
    "enunciado": "Un cliente compra un bono dollar-linked pensando que 'es lo mismo que tener dólares'. ¿Qué matiz importante le falta entender?",
    "opciones": [
      "El bono está en pesos y ajusta según el tipo de cambio OFICIAL, que no necesariamente se mueve igual que el dólar MEP o CCL que el cliente probablemente tiene en mente",
      "El dollar-linked es lo mismo que un bono CER porque ambos ajustan el capital según la misma referencia macroeconómica y terminan protegiendo igual al inversor",
      "El dollar-linked paga en dólares billete al vencimiento, así que el cliente puede retirar los billetes físicos directamente de su cuenta comitente sin pasar por el mercado",
      "Nada, es exactamente lo mismo que tener dólares en la mano porque el valor del bono sigue en todo momento, sin ninguna diferencia, la cotización del dólar libre en el mercado paralelo"
    ],
    "respuesta_correcta": 0,
    "explicacion": "El dollar-linked da cobertura sobre el tipo de cambio oficial, no sobre el dólar financiero (MEP/CCL) que es el que la mayoría de la gente tiene en la cabeza cuando dice 'dólar'. Si la brecha cambiaria se mueve (oficial vs. MEP/CCL se despegan), el dollar-linked puede no cubrir lo que el cliente esperaba. Vale la pena aclarar explícitamente 'a qué dólar' está atado el instrumento."
  },
  {
    "id": "RF-MC-006",
    "categoria": "Renta Fija",
    "subtema": "Bonos duales",
    "dificultad": "avanzada",
    "tipo": "multiple_choice",
    "enunciado": "Un bono dual paga 'el mejor entre CER o tipo de cambio'. Un cliente concluye: 'entonces es la inversión perfecta, siempre gano lo mejor de los dos mundos'. ¿Qué matiz le falta?",
    "opciones": [
      "Los bonos duales no existen en la práctica, son solamente un concepto teórico que no se emite realmente en el mercado argentino, más allá de lo que digan algunos prospectos de emisión",
      "El bono dual paga siempre la opción más baja, no la más alta porque así el emisor se asegura de pagar lo menos posible en cualquier escenario de mercado, algo habitual en este tipo de estructuras",
      "Tiene toda la razón, no hay ninguna contra porque el mercado no le pone ningún precio a ese tipo de cobertura adicional, así que la doble opción sale totalmente gratis para el tenedor",
      "Esa 'opción' tiene un costo implícito: cuando todo el mercado busca esa cobertura doble, el precio del bono sube y su rendimiento esperado baja, así que 'lo mejor de los dos mundos' no es gratis"
    ],
    "respuesta_correcta": 3,
    "explicacion": "Es un error de razonamiento común: tratar la opcionalidad como si fuera gratis. El mercado le pone precio a esa 'cobertura doble', así que cuando todos quieren ese instrumento, su rendimiento esperado se comprime. No es un combo mágico sin contrapartida; es una cobertura con un costo de oportunidad implícito en el precio."
  },
  {
    "id": "RF-MC-007",
    "categoria": "Renta Fija",
    "subtema": "Riesgo país / spread soberano",
    "dificultad": "basica",
    "tipo": "multiple_choice",
    "enunciado": "Un cliente pregunta: '¿El riesgo país es humo o sirve para algo?' ¿Cuál es la mejor respuesta?",
    "opciones": [
      "Solo importa para el gobierno, no para inversores individuales, porque a los tenedores de bonos particulares no les afecta cómo se financia el Estado ni el costo de la nueva deuda que emite, un argumento que muchos clientes repiten sin darse cuenta de que la deuda pública sí afecta el costo de financiamiento de toda la economía, incluido el sector privado",
      "Mide exclusivamente la inflación esperada y no tiene ninguna relación con la probabilidad de que el país no pague su deuda, aunque los diarios lo mencionen como si fuera lo mismo",
      "Sirve como termómetro: refleja el spread (diferencia de rendimiento) que el mercado le exige a la Argentina por sobre un bono considerado más seguro (como el Tesoro de EE.UU.), por el riesgo de no pago",
      "Es un invento de los medios, no tiene utilidad real y no tiene ninguna relación con el precio real de los bonos soberanos en el mercado ni con la forma en que se financia el país"
    ],
    "respuesta_correcta": 2,
    "explicacion": "El riesgo país es, en esencia, un spread de crédito: cuánto más exige cobrar el mercado para prestarle a Argentina en vez de a un emisor 'más seguro'. Cuando baja, indica que el mercado percibe menos riesgo de default y eso generalmente impulsa el precio de los bonos soberanos hacia arriba (y baja su TIR). Es un número con sentido económico concreto, no un dato decorativo de los noticieros."
  },
  {
    "id": "RF-MC-008",
    "categoria": "Renta Fija",
    "subtema": "Spread de crédito corporativo vs soberano",
    "dificultad": "intermedia",
    "tipo": "multiple_choice",
    "enunciado": "Estás comparando una Obligación Negociable (ON) de una empresa argentina sólida con un bono soberano argentino de duración similar. La ON rinde menos que el soberano. ¿Qué interpretación es razonable?",
    "opciones": [
      "Significa que la empresa está por default, así que conviene recomendarle al cliente vender esa posición de inmediato antes de que el mercado termine de descontar esa noticia",
      "Puede pasar: el mercado a veces percibe a ciertas empresas grandes y exportadoras como mejor riesgo de crédito que el propio Estado, sobre todo si generan dólares genuinos",
      "Significa que hay un error en los datos y conviene reportarlo antes de operar con esa información, porque una ON nunca debería cotizar con un rendimiento menor al de un bono soberano",
      "Es imposible, una ON siempre debe rendir más que el soberano porque el Estado siempre es el emisor más confiable de cualquier mercado local, sin importar el sector de la empresa"
    ],
    "respuesta_correcta": 1,
    "explicacion": "En Argentina es un fenómeno real y vale la pena que lo entienda: algunas empresas exportadoras grandes (energía, agro) pueden tener mejor percepción crediticia que el Estado, porque generan dólares propios y no dependen tanto de la macro local. No es un error de pantalla, es una lectura legítima de riesgo relativo que conviene poder explicarle a un cliente sorprendido."
  },
  {
    "id": "RF-CASO-002",
    "categoria": "Renta Fija",
    "subtema": "Comparación de bonos por duration y yield",
    "dificultad": "avanzada",
    "tipo": "caso_abierto",
    "enunciado": "Un cliente te pregunta cuál de estos dos bonos soberanos hard dollar conviene: Bono X rinde 8,68% con duration 6; Bono Y rinde 7,18% con duration 4,5. Explicá en 5-6 líneas cómo armarías tu respuesta (qué mirás primero, qué le preguntarías al cliente, y qué NO deberías responder).",
    "respuesta_modelo": "Una buena respuesta debería: (1) NO responder automáticamente 'el que más rinde', (2) comparar duration: el Bono X tiene más riesgo de precio ante cambios de tasa o spread, así que el rendimiento extra puede no compensar ese riesgo adicional, (3) preguntar el horizonte y tolerancia a volatilidad del cliente antes de recomendar, (4) plantear el trade-off explícitamente: más yield = generalmente más riesgo de precio (duration) o más riesgo de crédito/liquidez, (5) idealmente mencionar que conviene pensar en escenarios (qué pasa si el spread soberano se mueve) en vez de mirar solo el número estático de yield."
  },
  {
    "id": "RF-MC-009",
    "categoria": "Renta Fija",
    "subtema": "Licitación primaria - tasa de corte",
    "dificultad": "avanzada",
    "tipo": "multiple_choice",
    "enunciado": "En una licitación de Obligaciones Negociables bajo sistema holandés (precio único), la tasa de corte queda en 7,5%. Un cliente había ofertado pidiendo 8,5% (quería cobrar más). ¿Qué pasa con su orden?",
    "opciones": [
      "Se queda afuera de la licitación, porque pidió más tasa de la que la empresa terminó convalidando",
      "Entra solo por la mitad del monto, como penalización automática por haber pedido una tasa más alta que la de corte",
      "Entra automáticamente al mejor precio disponible en el mercado secundario, porque las órdenes que no entran en la licitación primaria se derivan directamente ahí",
      "Entra igual, pero le pagan 7,5% (la tasa de corte), ya que el sistema ajusta automáticamente cualquier tasa pedida a la de corte final"
    ],
    "respuesta_correcta": 0,
    "explicacion": "En el sistema holandés, si pediste una tasa MAYOR a la de corte, quiere decir que le exigiste a la empresa pagar más de lo que finalmente terminó convalidando, así que tu orden queda afuera. Solo entran las ofertas que pidieron una tasa igual o menor a la de corte. Es un punto donde los clientes se confunden seguido: 'pedir más tasa' no es 'pedir mejor precio', es quedar fuera de precio."
  },
  {
    "id": "RF-MC-010",
    "categoria": "Renta Fija",
    "subtema": "Licitación primaria - tramo no competitivo",
    "dificultad": "avanzada",
    "tipo": "multiple_choice",
    "enunciado": "Un cliente entra al tramo NO competitivo de una licitación (es decir, no ofertó una tasa específica, aceptó 'lo que salga'). La tasa de corte terminó en 7,5%. ¿Qué tasa cobra finalmente este cliente?",
    "opciones": [
      "Cobra la tasa de corte (7,5%), la misma que obtuvieron los oferentes competitivos que entraron",
      "Cobra una tasa fija predefinida, independiente del resultado de la licitación, que la empresa emisora anuncia de antemano antes de que se conozca la demanda real",
      "Cobra el promedio entre todas las tasas ofertadas, calculado entre todas las ofertas del tramo competitivo y no competitivo juntas",
      "No cobra ninguna tasa, solo participan del tramo competitivo, ya que el tramo no competitivo está pensado solamente para observar el proceso sin invertir"
    ],
    "respuesta_correcta": 0,
    "explicacion": "El tramo no competitivo está pensado para inversores más chicos que prefieren asegurar su entrada sin 'apostar' a un número. A cambio de esa certeza de entrar, reciben la tasa de corte que define el mercado (los oferentes competitivos), ni mejor ni peor. Es una buena opción para explicarle a un cliente conservador que no quiere quedar afuera por pedir de más."
  },
  {
    "id": "RF-MC-011",
    "categoria": "Renta Fija",
    "subtema": "Prorrateo en licitaciones",
    "dificultad": "avanzada",
    "tipo": "multiple_choice",
    "enunciado": "Una licitación tuvo mucha demanda y el factor de prorrateo terminó siendo 40% (por cada 100 pedido, se entregan 40). Un cliente competitivo que ofertó exactamente en la tasa de corte y pidió USD 50.000, ¿cuánto recibe aproximadamente?",
    "opciones": [
      "USD 50.000 más un bono extra de compensación que la empresa emisora entrega como beneficio adicional a los primeros oferentes competitivos",
      "USD 0, porque ofertar exactamente en la tasa de corte significa quedar afuera, igual que le pasa a quienes pidieron una tasa más alta que la finalmente convalidada",
      "USD 50.000 completos, porque ofertó justo en la tasa de corte, ya que entrar exactamente en el corte lo exime de cualquier tipo de prorrateo posterior",
      "Aproximadamente USD 20.000 (el 40% de lo pedido), porque el prorrateo se aplica también a quienes entran justo en la tasa de corte cuando hay sobresuscripción"
    ],
    "respuesta_correcta": 3,
    "explicacion": "Entrar en la tasa de corte garantiza que tu orden participa, pero si hubo sobresuscripción (mucha más demanda que monto a emitir), igual te prorratean: te dan una proporción de lo que pediste, no el total. Esto suele sorprender a los clientes que piensan 'si entré, entré completo'. Vale la pena explicarlo antes de la licitación, no después."
  },
  {
    "id": "RF-MC-012",
    "categoria": "Renta Fija",
    "subtema": "Mercado secundario post-licitación",
    "dificultad": "intermedia",
    "tipo": "multiple_choice",
    "enunciado": "Un bono que se licitó con cupón 7,5% empieza a cotizar en el mercado secundario al día siguiente. Mucha gente se quedó afuera de la licitación y sale a comprarlo, empujando el precio de USD 100 a USD 105. Si un cliente lo compra ahora a USD 105, su rendimiento (TIR) va a ser:",
    "opciones": [
      "Menor al 7,5%, porque pagó más caro por los mismos flujos de pago",
      "Exactamente 7,5%, el precio no afecta la TIR, porque la TIR de un bono queda fija en el momento de la emisión y no cambia después",
      "Mayor al 7,5%, porque pagó más, ya que pagar un precio más alto por el mismo bono siempre implica un rendimiento mayor",
      "Imposible de saber sin más datos, porque el precio de mercado no aporta ninguna información relevante para calcular el rendimiento"
    ],
    "respuesta_correcta": 0,
    "explicacion": "Misma lógica de siempre: precio sube, TIR baja. El cupón del 7,5% es fijo, pero como ahora hay que pagar más para acceder a esos mismos flujos, el rendimiento real para quien compra a USD 105 es menor al 7,5% original. Es un excelente ejemplo para mostrarle a un cliente la diferencia entre 'cupón' y 'rendimiento real según el precio de entrada'."
  },
  {
    "id": "RF-MC-013",
    "categoria": "Renta Fija",
    "subtema": "Convención de precios (lámina)",
    "dificultad": "basica",
    "tipo": "multiple_choice",
    "enunciado": "Un cliente nuevo ve en la calculadora de bonos un precio de 'USD 67' para un bono y se asusta: '¿pero entonces compro el bono por 67 dólares en total?' ¿Cómo le explicás la confusión?",
    "opciones": [
      "Los bonos siempre cuestan su valor nominal, así que un precio de 67 en pantalla no debería ser posible",
      "Es un error del sistema: hay que ignorar ese número y cargar la orden usando el valor nominal completo",
      "Tiene razón: ese es el precio total, y puede comprar el bono completo pagando apenas 67 dólares",
      "El precio se expresa cada 100 de valor nominal: 67 significa USD 67 por cada 100 nominales"
    ],
    "respuesta_correcta": 3,
    "explicacion": "Esta confusión es de las más frecuentes con clientes nuevos. En Argentina los bonos cotizan cada 100 de valor nominal original: un bono que aparece a '67' en pantalla cuesta USD 67 por cada 100 nominales, lo cual no significa 67 dólares de costo total. Conviene siempre aclarar la unidad antes de que el cliente cargue una orden, para evitar errores de carga por mal entendido de magnitud."
  },
  {
    "id": "RF-MC-014",
    "categoria": "Renta Fija",
    "subtema": "Paridad de bonos",
    "dificultad": "basica",
    "tipo": "multiple_choice",
    "enunciado": "En su versión simplificada (precio contra valor nominal, sin considerar amortizaciones ni intereses corridos), ¿qué significa que un bono cotice con una paridad de 40?",
    "opciones": [
      "Que el bono vale 40 dólares fijos, sin importar cuántos nominales compre el cliente",
      "Que paga un cupón del 40% anual durante toda la vida del bono",
      "Que le quedan 40 años hasta el vencimiento desde su emisión",
      "Que el precio de mercado equivale al 40% de su valor nominal"
    ],
    "respuesta_correcta": 3,
    "explicacion": "Esta es la versión simplificada. La definición técnica compara el precio con el valor técnico (valor residual más intereses corridos), no con el nominal: en un bono que ya amortizó parte del capital, las dos cifras pueden ser muy distintas. Lo viste en el módulo de bonos. Como atajo, la paridad sirve para hablar de 'caro o barato' en términos de precio relativo. Pero ojo: dos bonos con la misma paridad pueden tener TIR y riesgos completamente distintos según su cupón, plazo y estructura. Es útil como primera referencia, no como única variable de decisión."
  },
  {
    "id": "RF-MC-015",
    "categoria": "Renta Fija",
    "subtema": "Cupón cero y sensibilidad a tasas",
    "dificultad": "intermedia",
    "tipo": "multiple_choice",
    "enunciado": "¿Por qué un bono cupón cero es más sensible a cambios de tasa que un bono con cupón alto del mismo vencimiento?",
    "opciones": [
      "Porque tiene más riesgo de default, ya que al no pagar cupones el emisor concentra todo el riesgo de no pago al final, lo que lo hace más sensible a cambios en las tasas",
      "No es cierto, ambos tienen la misma sensibilidad, porque la duration depende únicamente del plazo hasta el vencimiento, no de la estructura de pagos que tenga cada instrumento",
      "Porque cotiza en una moneda distinta, y esa moneda tiene, por definición, mayor volatilidad frente a cambios de tasa que la moneda en la que cotiza un bono con cupón alto",
      "Porque al no pagar cupones intermedios, todo el flujo se concentra al vencimiento, lo que hace que su duration (y por lo tanto su sensibilidad a tasas) sea más alta"
    ],
    "respuesta_correcta": 3,
    "explicacion": "La duration es, en esencia, un promedio ponderado de cuándo recibís tus flujos. Un bono con cupón alto te devuelve plata 'antes' (vía cupones periódicos), lo que acorta esa duration promedio. El cupón cero, al no pagar nada hasta el final, tiene toda su 'masa' de flujo en el vencimiento, lo que lo hace más sensible a cualquier cambio en la tasa de descuento."
  },
  {
    "id": "RF-CASO-003",
    "categoria": "Renta Fija",
    "subtema": "Sensibilidad de precio con duration",
    "dificultad": "avanzada",
    "tipo": "caso_abierto",
    "enunciado": "Tenés un bono con duration 4 y otro con duration 7, ambos con yield similar hoy. El mercado espera un shock de +50 puntos básicos (0,5 p.p.) en las tasas. Estimá (de forma aproximada, usando duration) qué bono va a sufrir una caída de precio mayor, y escribí un párrafo de cómo se lo explicarías a un cliente conservador versus uno agresivo.",
    "respuesta_modelo": "El bono de duration 7 va a caer aproximadamente el doble que el de duration 4 ante el mismo shock de tasas (aprox. -3,5% vs -2%, usando duration como aproximación lineal: %cambio de precio ≈ -duration x cambio de yield). Para el cliente conservador: enfatizar que el bono más largo puede mostrar caídas de precio más marcadas en el corto plazo, aunque a largo plazo el efecto se diluye si se mantiene hasta el vencimiento; sugerir acortar duration si no tolera ver el número en rojo. Para el cliente agresivo: se puede plantear que la mayor sensibilidad también juega a favor si las tasas bajan, así que el bono largo puede ser una apuesta táctica si el escenario esperado es de compresión de tasas. La respuesta debe distinguir claramente 'riesgo de precio en el camino' de 'rendimiento si se sostiene hasta el final'."
  },
  {
    "id": "OP-MC-001",
    "categoria": "Operatoria de Mercado",
    "subtema": "Liquidación CI vs T+1",
    "dificultad": "basica",
    "tipo": "multiple_choice",
    "enunciado": "Un cliente te escribe el lunes a la mañana: 'Necesito tener los dólares en mi cuenta bancaria HOY mismo, vendo lo que sea'. Tenés bonos en cartera que operan tanto en CI (contado inmediato) como en T+1. ¿Qué le decís?",
    "opciones": [
      "Que para tener el dinero disponible el mismo día hay que vender en CI (liquida en el día); si vende en T+1, el dinero recién va a estar disponible al día hábil siguiente",
      "Que solo los bonos en pesos liquidan en el día, mientras que los bonos en dólares siempre liquidan al día hábil siguiente sin excepción, sin importar la modalidad elegida",
      "Que no se puede vender el mismo día bajo ninguna modalidad, así que el cliente va a tener que esperar como mínimo hasta el día siguiente sin excepción para tener el dinero",
      "Que da igual, en ambos casos el dinero está disponible el mismo día, porque ambas modalidades liquidan exactamente en el mismo plazo operativo según el reglamento del mercado"
    ],
    "respuesta_correcta": 0,
    "explicacion": "Esta pregunta aparece todo el tiempo en la práctica diaria, sobre todo con clientes apurados. CI (contado inmediato, T+0) liquida el mismo día; T+1 liquida al día hábil siguiente. Si el cliente tiene urgencia real, hay que operar en CI y avisarle con anticipación, porque la diferencia de un día puede ser la diferencia entre cumplir o no con un pago que tenía comprometido."
  },
  {
    "id": "OP-MC-002",
    "categoria": "Operatoria de Mercado",
    "subtema": "Caja de puntas / spread",
    "dificultad": "basica",
    "tipo": "multiple_choice",
    "enunciado": "Una acción tiene en la caja de puntas: mejor compra (bid) $49, mejor venta (ask) $50. Un cliente pregunta por qué a veces 'paga más de lo que ve en pantalla'. ¿Cuál es la explicación correcta?",
    "opciones": [
      "Si compra a mercado, se ejecuta contra el mejor precio de venta disponible (el ask, $50), no contra el precio de compra ($49) que es lo que ve como referencia más baja; esa diferencia es el spread",
      "Siempre paga el promedio entre bid y ask, que es el precio de referencia que usa el sistema para ejecutar cualquier orden a mercado, tanto de compra como de venta",
      "El precio en pantalla es solo informativo y no se puede operar a ese valor, ya que el sistema arma internamente un precio distinto para cada orden que ingresa, por lo que ningún operador debería tomarlo como referencia real al decidir",
      "Es un error de la plataforma que conviene reportar al soporte técnico antes de seguir operando con ese activo, ya que el precio mostrado no debería variar de esa forma"
    ],
    "respuesta_correcta": 0,
    "explicacion": "El spread (diferencia entre bid y ask) es un costo implícito que muchos clientes no perciben porque están acostumbrados a mirar 'el último precio operado', no la caja de puntas completa. Comprar a mercado significa cruzar al ask; vender a mercado significa cruzar al bid. Explicar esto de entrada evita la sorpresa de 'compré más caro de lo que vi'."
  },
  {
    "id": "OP-MC-003",
    "categoria": "Operatoria de Mercado",
    "subtema": "Orden límite vs orden a mercado",
    "dificultad": "intermedia",
    "tipo": "multiple_choice",
    "enunciado": "Un cliente quiere comprar un bono poco líquido (poca profundidad en la caja de puntas) y no tiene apuro. ¿Qué tipo de orden recomendás como primera opción?",
    "opciones": [
      "Orden límite, fijando un precio máximo aceptable, aunque la ejecución no sea inmediata",
      "No se puede operar bonos poco líquidos bajo ninguna modalidad, así que hay que esperar a que mejore la liquidez antes de intentar cualquier operación",
      "Orden a mercado, para asegurar la ejecución inmediata, ya que en un bono poco líquido la velocidad de ejecución siempre debería priorizarse sobre el precio",
      "Orden stop-loss, para protegerse de pérdidas, que es la herramienta pensada específicamente para comprar en activos con poca profundidad de mercado"
    ],
    "respuesta_correcta": 0,
    "explicacion": "En activos poco líquidos, una orden a mercado puede ejecutarse a precios muy desfavorables porque 'barre' varias líneas de la caja de puntas. Si el cliente no tiene urgencia, la orden límite da control de precio a cambio de aceptar que tal vez no se ejecute de inmediato (o no se ejecute del todo). Es el trade-off central que hay que poder explicar: precio vs. probabilidad de ejecución."
  },
  {
    "id": "OP-CASO-001",
    "categoria": "Operatoria de Mercado",
    "subtema": "Spread grande y poca profundidad",
    "dificultad": "intermedia",
    "tipo": "caso_abierto",
    "enunciado": "Un cliente te insiste con comprar YA un bono que tiene spread grande y poca profundidad porque 'vio una oportunidad'. Proponé en 5-6 líneas dos alternativas (una agresiva y una conservadora), especificando para cada una tipo de orden, precio aproximado y qué riesgo asume. Cerrá con tu recomendación.",
    "respuesta_modelo": "Alternativa agresiva: orden a mercado o límite muy cercano al ask, para asegurar entrada inmediata; riesgo: paga el spread completo y puede sufrir slippage si la cantidad excede la primera línea de la caja de puntas. Alternativa conservadora: orden límite por debajo del ask actual (por ejemplo, cerca del bid o un poco por encima), aceptando que puede no ejecutarse hoy o ejecutarse solo parcialmente; riesgo: 'perderse' la oportunidad si el precio sigue subiendo sin tocar ese nivel. Recomendación final: depende de cuán convencido está el cliente de la oportunidad y de su tolerancia a pagar de más por seguridad de ejecución; en general, para un cliente que 'no tiene apuro real' (solo entusiasmo), conviene la alternativa conservadora."
  },
  {
    "id": "OP-MC-004",
    "categoria": "Operatoria de Mercado",
    "subtema": "Orden iceberg",
    "dificultad": "avanzada",
    "tipo": "multiple_choice",
    "enunciado": "Un cliente institucional necesita comprar un monto grande de un bono respecto al volumen habitual. ¿En qué escenario tiene sentido usar una orden iceberg (que muestra solo una parte de la cantidad total)?",
    "opciones": [
      "Solo quiere usarse en mercados muy líquidos donde no hay riesgo de impacto, porque en mercados líquidos ocultar el tamaño de la orden aporta mayor beneficio relativo",
      "Iceberg es lo mismo que una orden stop-loss, ya que ambas se activan automáticamente cuando el precio toca un nivel determinado definido previamente por el operador",
      "Cuando el tamaño es grande respecto a la liquidez disponible y se busca minimizar el impacto de mercado, evitando que otros participantes 'se adelanten' al ver la orden completa",
      "Siempre, en cualquier operación grande, sin excepción, incluso en mercados muy líquidos donde el tamaño de la orden no genera ningún impacto real sobre el precio ni sobre la ejecución final"
    ],
    "respuesta_correcta": 2,
    "explicacion": "El iceberg sirve específicamente para ocultar el tamaño real de una orden grande, evitando que el mercado reaccione anticipadamente y mueva el precio en contra. No es magia: si el activo es muy ilíquido, igual puede haber costo de ejecución, pero ayuda a reducirlo en comparación con mostrar la orden completa de una sola vez."
  },
  {
    "id": "OP-MC-005",
    "categoria": "Operatoria de Mercado",
    "subtema": "Orden stop vs stop-limit",
    "dificultad": "intermedia",
    "tipo": "multiple_choice",
    "enunciado": "Un cliente quiere protegerse de una caída fuerte en una acción con una orden stop-loss tradicional. ¿Qué le advertís?",
    "opciones": [
      "Que el stop solo funciona para compras, nunca para ventas, porque el mecanismo de activación automática está diseñado únicamente para ese sentido de la operación en cartera",
      "Que las órdenes stop no existen en el mercado argentino, así que conviene usar únicamente órdenes límite tradicionales para cualquier estrategia de cobertura de una posición abierta",
      "Que el stop le garantiza vender exactamente al precio que él definió, sin importar cuán rápido se mueva el mercado en el momento en que se activa la orden",
      "Que cuando se activa el stop, generalmente se convierte en una orden a mercado, así que en un mercado muy volátil o con gaps de precio puede ejecutarse a un precio peor del esperado"
    ],
    "respuesta_correcta": 3,
    "explicacion": "Un error frecuente es pensar que el stop-loss 'garantiza' el precio de salida. En realidad, una vez activado, suele dispararse como orden a mercado, lo que significa que en momentos de alta volatilidad (gaps, baja liquidez) puede ejecutarse bastante por debajo del nivel que el cliente tenía en mente. Para más control de precio (a costa de no garantizar ejecución), existe la variante stop-limit."
  },
  {
    "id": "OP-MC-006",
    "categoria": "Operatoria de Mercado",
    "subtema": "Slippage",
    "dificultad": "intermedia",
    "tipo": "multiple_choice",
    "enunciado": "¿Qué es el slippage y por qué un asesor debería tenerlo en cuenta al estimar costos de una operación grande?",
    "opciones": [
      "Es una comisión fija que cobra el broker, que figura detallada en el resumen de gastos de cada operación realizada, sin importar el tamaño ni la volatilidad del mercado",
      "Es un impuesto que se aplica solo a operaciones en dólares, establecido por la normativa impositiva vigente, que el broker retiene automáticamente y detalla aparte en cada liquidación, de forma similar a como se retienen otros gravámenes del mercado de capitales local",
      "Es lo mismo que el spread bid-ask, ya que ambos conceptos miden exactamente la misma diferencia de precio en la caja de puntas al momento de ejecutar una orden grande",
      "Es la diferencia entre el precio esperado y el precio real de ejecución, que puede aparecer al cruzar varias líneas de la caja de puntas con una orden grande o en mercados volátiles; es un costo 'invisible' que no figura como comisión pero igual afecta el resultado"
    ],
    "respuesta_correcta": 3,
    "explicacion": "Muchos clientes (y asesores nuevos) solo miran la comisión explícita y olvidan el slippage, que muchas veces termina siendo más relevante en el costo total de la operación, especialmente en activos poco líquidos o con órdenes grandes a mercado. Parte del valor que aporta un buen asesor es justamente anticipar y minimizar este costo invisible."
  },
  {
    "id": "OP-MC-007",
    "categoria": "Operatoria de Mercado",
    "subtema": "Especie ARS/D/C",
    "dificultad": "basica",
    "tipo": "multiple_choice",
    "enunciado": "Antes de confirmar cualquier orden, ¿qué dos chequeos operativos básicos siempre deberías hacer (más allá del precio)?",
    "opciones": [
      "Solo el monto a invertir, ya que ese es el único dato que puede generar un error costoso si se carga mal",
      "El horario de cierre de la rueda, nada más, porque fuera de ese horario cualquier orden cargada se ejecuta automáticamente al día siguiente",
      "Solo el nombre del cliente, para confirmar que la cuenta desde la que se opera corresponde efectivamente a esa persona",
      "La especie (en qué moneda/segmento se opera: pesos, dólar MEP, dólar cable) y el plazo de liquidación (CI o T+1)"
    ],
    "respuesta_correcta": 3,
    "explicacion": "Es un chequeo simple pero crítico: operar la especie equivocada (por ejemplo, cargar en 'D' cuando el cliente quería 'C', o al revés) o el plazo equivocado puede generar errores costosos y difíciles de revertir. Convertirlo en hábito antes de cada confirmación de orden previene la mayoría de los errores operativos evitables."
  },
  {
    "id": "OP-CASO-002",
    "categoria": "Operatoria de Mercado",
    "subtema": "Preguntas típicas sin jerga",
    "dificultad": "basica",
    "tipo": "caso_abierto",
    "enunciado": "Redactá una respuesta corta (3-5 líneas), profesional y sin tecnicismos, para esta pregunta de un cliente: '¿Por qué no compramos a mercado y listo? ¿Para qué complicarse con una orden límite?'",
    "respuesta_modelo": "Una buena respuesta debería explicar: que una orden a mercado prioriza la velocidad de ejecución por sobre el control del precio, lo cual puede salir caro si el activo tiene poca liquidez o spread grande, porque podés terminar pagando un precio bastante peor al que viste en pantalla. La orden límite te da control sobre el precio máximo (o mínimo) que aceptás, a cambio de aceptar que quizás no se ejecute de inmediato. La elección depende de si lo que más te importa es la velocidad o el precio."
  },
  {
    "id": "OP-MC-008",
    "categoria": "Operatoria de Mercado",
    "subtema": "Precio limpio vs precio sucio",
    "dificultad": "avanzada",
    "tipo": "multiple_choice",
    "enunciado": "Un cliente nota que el precio de un bono 'sube un poco cada día' aunque el mercado parece estar tranquilo, y se preocupa pensando que algo raro está pasando. ¿Cuál es la explicación más probable?",
    "opciones": [
      "Es un error de la plataforma que hay que reportar, porque ningún bono debería mostrar variaciones de precio todos los días sin una noticia de por medio que lo justifique",
      "El bono está por hacer default, y esa suba diaria refleja que el mercado está reduciendo su exposición antes del evento, lo cual explica el movimiento sostenido de precio",
      "Es el efecto del cupón corrido acumulándose día a día en el precio 'sucio' (dirty price), que incluye los intereses devengados desde el último pago de cupón",
      "Hay manipulación de precios por parte de algún participante grande que está queriendo mover el mercado a su favor, aprovechando la poca liquidez del bono en cuestión"
    ],
    "respuesta_correcta": 2,
    "explicacion": "El precio sucio (dirty price) incluye el cupón corrido, que se va acumulando día a día entre pagos de cupón. Esto hace que el precio 'suba' levemente de forma constante sin que haya ningún movimiento real de mercado. El precio limpio excluye ese efecto. Es importante saber distinguir esto para no generar alarma innecesaria en un cliente atento que mira la pantalla todos los días."
  },
  {
    "id": "PORT-MC-001",
    "categoria": "Portafolios y Asesoramiento",
    "subtema": "Rebalanceo",
    "dificultad": "intermedia",
    "tipo": "multiple_choice",
    "enunciado": "Armaste una cartera moderada con 50% renta variable y 30% renta fija para un cliente. Después de un año muy bueno para las acciones, la cartera quedó en 65% renta variable y 20% renta fija. ¿Qué deberías hacer, en principio?",
    "opciones": [
      "Vender parte de la renta variable y recomponer renta fija, para volver al perfil de riesgo original del cliente (rebalanceo)",
      "Vender toda la renta fija y pasar 100% a renta variable, ya que está funcionando mejor, profundizando la estrategia que mejor viene rindiendo en el último tiempo",
      "Esperar a que la renta variable baje para recién ahí actuar, tratando de anticipar el mejor momento posible antes de hacer cualquier ajuste",
      "Nada, dejar correr porque está ganando, ya que interferir con una cartera que viene funcionando bien suele ser un error"
    ],
    "respuesta_correcta": 0,
    "explicacion": "El portafolio 'se corrió' de su perfil de riesgo original: ahora tiene más exposición a renta variable de la que el cliente había aceptado. El rebalanceo no es una apuesta de mercado, es disciplina: vender lo que subió y recomponer lo que bajó de peso relativo, para sostener el riesgo que el cliente realmente eligió. Es contraintuitivo (estás vendiendo lo que 'viene bien'), pero es justamente lo que evita que un cliente termine con más riesgo del que toleraría psicológicamente ante una caída."
  },
  {
    "id": "PORT-MC-002",
    "categoria": "Portafolios y Asesoramiento",
    "subtema": "Diversificación",
    "dificultad": "basica",
    "tipo": "multiple_choice",
    "enunciado": "Un cliente quiere poner el 80% de su cartera en una sola acción 'porque está muy convencido de la empresa'. ¿Cuál es el riesgo principal que le señalás?",
    "opciones": [
      "Concentración: si a esa empresa puntual le va mal (por motivos propios, no del mercado en general), gran parte del patrimonio del cliente se ve afectado; diversificar reduce esa dependencia de un solo emisor",
      "El único riesgo es el de tipo de cambio, que desaparece por completo si la empresa opera únicamente en pesos argentinos, sin ninguna exposición internacional en ventas, costos o financiamiento, ni tampoco frente a caídas puntuales en la cotización local de esa empresa por noticias propias del negocio",
      "Ninguno, si está convencido es una buena decisión, porque la convicción personal del cliente elimina cualquier riesgo de mercado asociado a esa empresa en particular",
      "Que la acción no paga dividendos, lo cual la vuelve automáticamente una mala elección sin importar ningún otro factor de la empresa ni del contexto de mercado actual"
    ],
    "respuesta_correcta": 0,
    "explicacion": "La convicción sobre una empresa no elimina el riesgo de concentración. Diversificar no es 'no creer' en ninguna inversión, es reconocer que ninguna convicción es 100% infalible y que el costo de estar equivocado en una posición muy concentrada es mucho mayor que en una cartera diversificada. Vale la pena cuantificar el riesgo: ¿qué pasa con el patrimonio del cliente si esa empresa puntual cae 40%?"
  },
  {
    "id": "PORT-MC-003",
    "categoria": "Portafolios y Asesoramiento",
    "subtema": "Perfil del inversor",
    "dificultad": "basica",
    "tipo": "multiple_choice",
    "enunciado": "Un cliente de 60 años, a punto de jubilarse, te pide que le arms una cartera 'agresiva' porque escuchó que 'así se gana más rápido'. ¿Cuál es tu primer paso como asesor?",
    "opciones": [
      "Negarse directamente a trabajar con ese cliente, ya que un pedido así demuestra que no está en condiciones de invertir en absoluto ni de tomar decisiones sobre su propio dinero",
      "Armar la cartera agresiva tal cual la pide, porque el cliente siempre tiene la razón, sin necesidad de indagar nada más sobre su situación particular ni su horizonte de inversión real",
      "Armar una cartera 100% conservadora sin consultarle, por las dudas, asumiendo que esa decisión unilateral es siempre la más prudente para cualquier cliente mayor de 60 años, ya que a esa edad cualquier pérdida de corto plazo sería imposible de recuperar antes de jubilarse",
      "Indagar su horizonte real, necesidad de liquidez y tolerancia emocional a la volatilidad antes de avanzar; un horizonte corto y necesidad cercana de los fondos suele ser incompatible con un perfil agresivo, más allá de lo que el cliente 'cree' querer"
    ],
    "respuesta_correcta": 3,
    "explicacion": "El pedido del cliente ('quiero agresivo') no siempre coincide con lo que realmente le conviene dado su horizonte y necesidad de liquidez. El trabajo del asesor es diagnosticar el problema real detrás del pedido literal, no ejecutar órdenes ciegamente. Esto no significa imponer la propia opinión, sino educar sobre el trade-off antes de avanzar, dejando la decisión final informada en manos del cliente."
  },
  {
    "id": "PORT-CASO-001",
    "categoria": "Portafolios y Asesoramiento",
    "subtema": "Cliente emocional en caída de mercado",
    "dificultad": "avanzada",
    "tipo": "caso_abierto",
    "enunciado": "El mercado cayó fuerte esta semana. Un cliente con perfil moderado te manda un audio alterado: 'Vendamos todo, esto se va a cero'. Su horizonte de inversión es de 5 años y no necesita el dinero en el corto plazo. Redactá cómo le responderías, en no más de 6 líneas, combinando contención emocional, un argumento racional y una propuesta concreta (no tiene que ser 'no hacer nada', pero tiene que estar justificada).",
    "respuesta_modelo": "Una buena respuesta debería: (1) validar la emoción sin alimentar el pánico ('entiendo que asusta ver números en rojo'), (2) traer de vuelta el horizonte y el plan original ('armamos esta cartera pensando en 5 años, no en esta semana'), (3) ofrecer algo concreto y proporcionado, no todo o nada (por ejemplo: revisar si vale la pena un pequeño ajuste de riesgo, no liquidar todo). Lo que NO debería hacer: prometer que el mercado va a recuperarse pronto, ni ceder automáticamente a vender todo solo para calmar al cliente en el momento. El objetivo del ejercicio es practicar sostener un plan sin ser frío ni alimentar la ansiedad."
  },
  {
    "id": "PORT-MC-004",
    "categoria": "Portafolios y Asesoramiento",
    "subtema": "Liquidez en la cartera",
    "dificultad": "intermedia",
    "tipo": "multiple_choice",
    "enunciado": "María tiene 58 años, vendió un departamento y tiene USD 70.000 en pesos argentinos. Te pide 'algo seguro' y le angustian las pantallas en rojo, pero también le preocupa perder poder adquisitivo si el peso se devalúa. ¿Qué elemento NO podés dejar afuera del diseño de su cartera?",
    "opciones": [
      "No definir ninguna regla de cuánto queda líquido, para no 'perder rendimiento', priorizando en todo momento maximizar el retorno esperado de la cartera completa",
      "Una porción de liquidez disponible sin plazo, separada de lo que se invierte a más largo plazo",
      "Ignorar el riesgo cambiario porque pidió 'algo seguro' en pesos, ya que lo que el cliente pide explícitamente siempre debe primar por sobre cualquier otro riesgo",
      "Invertir el 100% en una sola acción de alto crecimiento, que le permitiría recuperar rápidamente cualquier pérdida de poder adquisitivo por devaluación"
    ],
    "respuesta_correcta": 1,
    "explicacion": "Para un perfil como el de María (conservador, con angustia ante la volatilidad, pero también preocupación por el poder adquisitivo), es clave definir explícitamente una regla de liquidez: cuánto queda disponible de forma inmediata y cuánto se invierte a plazo. Esto da tranquilidad emocional (sabe que tiene un colchón accesible) y permite diseñar el resto de la cartera con más foco en preservar poder adquisitivo, sin que la ansiedad por liquidez contamine cada decisión."
  },
  {
    "id": "PORT-MC-005",
    "categoria": "Portafolios y Asesoramiento",
    "subtema": "Asignación por bloques",
    "dificultad": "intermedia",
    "tipo": "multiple_choice",
    "enunciado": "Walter tiene 35 años, ingresos estables, puede ahorrar USD 500 por mes y quiere 'armar algo a largo plazo', tolerando caídas moderadas. Te pregunta: 'Si los CEDEARs rinden más, ¿por qué no voy 100% CEDEARs?' ¿Cuál es la mejor respuesta?",
    "opciones": [
      "Que la pregunta no tiene sentido y que no vale la pena dedicarle tiempo a explicarle el riesgo de concentración, porque en definitiva la decisión final siempre es del cliente",
      "Que el rendimiento pasado no garantiza el futuro, y que ir 100% a un solo tipo de activo lo deja sin diversificación de moneda, sector y clase de activo, aumentando la volatilidad de su cartera más allá de lo que probablemente tolere en una caída fuerte",
      "Que los CEDEARs no son una inversión seria, sino más bien un instrumento pensado únicamente para especular a muy corto plazo y no para armar una cartera de largo plazo",
      "Tiene razón, conviene ir 100% a lo que más rindió históricamente, porque el desempeño pasado de un activo es, en la práctica, el mejor indicador disponible de lo que va a rendir en el futuro, así que diversificar solo diluiría esa rentabilidad ya demostrada"
    ],
    "respuesta_correcta": 1,
    "explicacion": "Esta es una pregunta clásica de cliente con ahorro mensual que mira rendimientos pasados y quiere extrapolarlos. La respuesta no es decir que está mal entusiasmarse, sino mostrar el costo de la concentración: menos diversificación implica más volatilidad, y en una caída fuerte concentrada en un solo tipo de activo, la reacción emocional del cliente (vender en el peor momento) puede ser mucho más dañina que el rendimiento extra que buscaba."
  },
  {
    "id": "PORT-MC-006",
    "categoria": "Portafolios y Asesoramiento",
    "subtema": "Correlación",
    "dificultad": "avanzada",
    "tipo": "multiple_choice",
    "enunciado": "¿Por qué armar una cartera con activos de baja o negativa correlación entre sí reduce el riesgo total, aunque cada activo individual siga siendo volátil?",
    "opciones": [
      "Porque la correlación no tiene ningún efecto real sobre el riesgo de cartera, que depende únicamente de cuántos activos distintos se tengan, sin importar cómo se muevan entre sí",
      "Porque los activos de baja correlación siempre rinden más que los activos que se mueven todos en la misma dirección al mismo tiempo, más allá del riesgo que asuma cada uno",
      "Porque cuando los activos no se mueven exactamente igual entre sí, las pérdidas de unos pueden compensarse parcialmente con el comportamiento de otros, suavizando la variabilidad total de la cartera aunque cada activo individual mantenga su propio riesgo",
      "Porque la baja correlación elimina por completo el riesgo de cada activo individual, dejando la cartera completamente protegida frente a cualquier caída de mercado, sin necesidad de analizar la volatilidad propia de cada instrumento por separado, tratando la baja correlación como si fuera un seguro total en lugar de una simple reducción de la variabilidad conjunta de la cartera"
    ],
    "respuesta_correcta": 2,
    "explicacion": "Es la base conceptual de la diversificación moderna: no se trata solo de 'tener varios activos', sino de elegir activos que no se muevan todos en la misma dirección al mismo tiempo. Esto es lo que realmente reduce la volatilidad agregada de la cartera, más allá de cuántos activos distintos tengas. Es útil para explicarle a un cliente por qué 'tener 10 acciones del mismo sector' no diversifica tanto como parece."
  },
  {
    "id": "PORT-CASO-002",
    "categoria": "Portafolios y Asesoramiento",
    "subtema": "Diagnóstico del problema real del cliente",
    "dificultad": "intermedia",
    "tipo": "caso_abierto",
    "enunciado": "Un cliente te dice: 'Quiero dólares'. Describí en 4-5 líneas qué preguntas le harías antes de simplemente venderle dólares o un instrumento dollar-linked, y por qué el pedido literal puede no reflejar la necesidad real.",
    "respuesta_modelo": "Buenas preguntas a indagar: ¿para qué necesita los dólares (ahorro, pago concreto en el exterior, cobertura contra inflación, miedo a una devaluación)?, ¿cuándo los necesitaría?, ¿qué lo preocupa más: perder poder adquisitivo en pesos o directamente no tener dólares físicos disponibles? El punto central del ejercicio es mostrar que 'quiero dólares' puede esconder necesidades muy distintas (cobertura de inflación, necesidad de pago real en moneda extranjera, ansiedad generalizada), y cada una sugiere una solución distinta: no es lo mismo recomendar dólar billete, que un bono dollar-linked, que un bono CER, según cuál sea el verdadero problema detrás del pedido."
  },
  {
    "id": "PORT-MC-007",
    "categoria": "Portafolios y Asesoramiento",
    "subtema": "Diversificación por moneda",
    "dificultad": "intermedia",
    "tipo": "multiple_choice",
    "enunciado": "¿Por qué un portafolio armado en Argentina típicamente combina instrumentos en pesos (ej. ajustados por CER) con instrumentos en dólares (ej. bonos soberanos en USD, CEDEARs)?",
    "opciones": [
      "Para diversificar el riesgo cambiario: si el peso se devalúa fuertemente, las posiciones en dólares actúan como resguardo del poder adquisitivo, mientras que los instrumentos en pesos pueden ofrecer mejor rendimiento relativo en contextos de estabilidad",
      "No hay ninguna razón particular, es solo costumbre del mercado que se mantiene simplemente porque los asesores siempre lo hicieron de esa manera, una práctica heredada de otras épocas que no tendría por qué aplicarse igual en el contexto actual, y por eso conviene explicarle al cliente que no es una regla fija sino un criterio que se ajusta caso por caso",
      "Porque la ley obliga a tener ambas monedas en cualquier cartera que se arme para un cliente residente en Argentina, según la normativa vigente de la Comisión Nacional de Valores",
      "Porque los instrumentos en pesos no tienen ningún riesgo, a diferencia de los instrumentos en dólares que sí concentran todo el riesgo de la cartera, sin importar el emisor"
    ],
    "respuesta_correcta": 0,
    "explicacion": "La diversificación por moneda es central en el contexto argentino, dado el historial de volatilidad cambiaria. No se trata de elegir 'pesos o dólares' como una apuesta binaria, sino de construir una cartera que no dependa enteramente de un solo escenario macro. Es uno de los conceptos que más vale la pena dominar para trabajar con clientes locales."
  },
  {
    "id": "PORT-MC-008",
    "categoria": "Portafolios y Asesoramiento",
    "subtema": "Fondos comunes vs instrumentos individuales",
    "dificultad": "basica",
    "tipo": "multiple_choice",
    "enunciado": "Un cliente con un monto chico para invertir quiere diversificar en varias acciones argentinas, pero el monto no le alcanza para comprar muchas especies distintas sin pagar comisiones excesivas en cada una. ¿Qué alternativa le proponés?",
    "opciones": [
      "Que invierta todo en una sola acción, total 'es lo que hay', ya que con poco capital no vale la pena preocuparse por diversificar la cartera",
      "Un Fondo Común de Inversión (FCI) de renta variable local, que con una sola operación le da exposición a varias empresas a la vez",
      "Que espere a ahorrar más dinero antes de invertir nada, porque con montos chicos no existe ninguna alternativa razonable de diversificación disponible",
      "Que abra una cuenta en el exterior, aunque el monto sea chico, ya que eso le permitiría diversificar mejor sin importar los costos fijos de mantenimiento"
    ],
    "respuesta_correcta": 1,
    "explicacion": "Para montos chicos, los FCI son una herramienta muy práctica de diversificación instantánea: con una sola decisión y una sola comisión, el cliente accede a una canasta de activos en vez de tener que comprar uno por uno (lo cual sería caro e impráctico en montos pequeños). Vale la pena tenerlo presente como primera alternativa para clientes que recién empiezan."
  },
  {
    "id": "PORT-MC-009",
    "categoria": "Portafolios y Asesoramiento",
    "subtema": "Rotación táctica - ratio relativo",
    "dificultad": "avanzada",
    "tipo": "multiple_choice",
    "enunciado": "Estás evaluando una rotación táctica entre dos acciones del mismo sector (Empresa X e Y). El ratio de market cap X/Y está en 2,75x, mientras el promedio histórico de los últimos años ronda 2,43x. ¿Qué interpretación es la más razonable para plantear una rotación?",
    "opciones": [
      "Que hay que vender ambas acciones inmediatamente, porque un ratio por encima de su promedio histórico siempre anticipa una caída generalizada del sector en el corto plazo",
      "Que, en términos relativos, X viene sobreperformando a Y respecto a su relación histórica, lo cual puede sugerir una oportunidad táctica de rotar de X hacia Y apostando a una convergencia del ratio hacia su promedio, sin que esto implique una preferencia estructural por una empresa sobre la otra",
      "El ratio de market cap no tiene ninguna utilidad práctica para tomar decisiones de rotación entre empresas de un mismo sector, ya que ese tipo de comparación no refleja nada relevante del negocio",
      "Que la Empresa X es definitivamente mejor negocio que la Empresa Y, y por eso conviene mantenerse en X en lugar de considerar cualquier rotación, ya que esa divergencia respecto al promedio refleja una mejora estructural y permanente en la calidad relativa del negocio de X frente a Y, sin considerar que ese tipo de divergencias entre empresas comparables suele revertir con el tiempo más de lo que parece a simple vista"
    ],
    "respuesta_correcta": 1,
    "explicacion": "Este es un ejemplo de trade de valor relativo: no se trata de creer que una empresa es 'mejor' que la otra de forma permanente, sino de identificar que la relación de precios entre ambas se alejó de su promedio histórico y podría volver a acercarse. Es importante explicarle al cliente que este tipo de trade es táctico y conlleva su propio riesgo (el ratio puede seguir alejándose en vez de converger), no es una certeza."
  },
  {
    "id": "PORT-MC-010",
    "categoria": "Portafolios y Asesoramiento",
    "subtema": "Rotación por compresión de TIR",
    "dificultad": "intermedia",
    "tipo": "multiple_choice",
    "enunciado": "Un bono que el cliente tiene en cartera subió mucho de precio y ahora su TIR quedó en apenas 3,5% anual en dólares, un nivel que considerás poco atractivo para el riesgo que implica. ¿Qué argumento usarías para proponerle al cliente tomar ganancias y rotar hacia otra alternativa?",
    "opciones": [
      "Que no hay ningún motivo para vender un bono que subió, ya que un activo que viene funcionando bien siempre debería mantenerse en cartera, porque vender algo que está dando resultado suele ser un error de timing que le termina costando caro al cliente",
      "Que, desde estas paridades, el potencial de retorno futuro es limitado y no compensa adecuadamente el riesgo asumido; tomar ganancias ahora permite asegurar lo ganado y reasignar el capital hacia oportunidades con mejor relación riesgo-retorno",
      "Que el bono va a caer a cero pronto, así que hay que salir ya, porque una TIR baja es una señal directa de que el emisor está por entrar en default en el corto plazo",
      "Que hay que vender porque el cliente lo pide, sin ningún análisis adicional, sin necesidad de justificarle con ningún argumento concreto la decisión de rotar hacia otro activo"
    ],
    "respuesta_correcta": 1,
    "explicacion": "Esta es la lógica real detrás de muchas rotaciones de cartera: un activo puede haber sido una excelente inversión en el pasado y, justamente por eso (porque subió mucho), dejar de ser atractivo hacia adelante. El trabajo del asesor es identificar cuándo el rendimiento esperado futuro ya no justifica mantener la posición, y comunicarlo en términos de 'tomar ganancias' en vez de 'esto va a caer', que sería alarmista e impreciso."
  },
  {
    "id": "PORT-CASO-003",
    "categoria": "Portafolios y Asesoramiento",
    "subtema": "Encaje de una acción individual en cartera",
    "dificultad": "intermedia",
    "tipo": "caso_abierto",
    "enunciado": "Un cliente te pregunta si vale la pena invertir en una acción puntual que está de moda ('todo el mundo la compra'). Listá en 5-6 líneas qué aspectos mirarías antes de responder, y qué le dirías si el cliente quiere poner un porcentaje desmedido de su cartera en esa única acción.",
    "respuesta_modelo": "Aspectos a mirar (mínimo 4-5 de estos): el negocio de la empresa y de qué gana dinero, evolución de ingresos y ganancias, márgenes, nivel de deuda, valuación relativa a comparables del sector, riesgos cualitativos del negocio. Respecto al tamaño de la posición: aunque el análisis fundamental sea positivo, hay que explicarle al cliente que ninguna convicción individual debería significar arriesgar una porción desproporcionada del patrimonio total; conviene fijar un límite razonable de concentración (por ejemplo, un porcentaje acotado del portafolio) y explicar el motivo: si la empresa decepciona, el impacto en el patrimonio total del cliente debe ser manejable, no catastrófico."
  },
  {
    "id": "PORT-MC-011",
    "categoria": "Portafolios y Asesoramiento",
    "subtema": "Costos y liquidez al elegir instrumentos",
    "dificultad": "basica",
    "tipo": "multiple_choice",
    "enunciado": "Al armar una cartera, además del rendimiento esperado, ¿qué otros dos factores prácticos siempre hay que evaluar al elegir los instrumentos específicos?",
    "opciones": [
      "La calificación crediticia otorgada por una sola agencia, sin mirar ningún otro factor operativo del instrumento",
      "Nada más, el rendimiento esperado es el único factor relevante a la hora de decidir qué instrumento específico recomendarle a un cliente",
      "Solo el nombre del fondo o la marca del emisor, ya que un nombre reconocido siempre garantiza mejores condiciones de costos y liquidez",
      "Costos de transacción (comisiones, spreads) y liquidez del activo (facilidad para comprar/vender sin mover mucho el precio)"
    ],
    "respuesta_correcta": 3,
    "explicacion": "Un activo con un rendimiento esperado atractivo en el papel puede no ser una buena elección si tiene poca liquidez (difícil de vender sin afectar el precio) o costos de transacción elevados que erosionan ese rendimiento. Parte del criterio profesional del asesor es chequear estos factores prácticos antes de recomendar, no solo mirar el número de rendimiento aislado."
  },
  {
    "id": "MACRO-MC-001",
    "categoria": "Macro Argentina",
    "subtema": "Riesgo país - definición aplicada",
    "dificultad": "basica",
    "tipo": "multiple_choice",
    "enunciado": "Un cliente te pregunta: '¿Qué es exactamente el riesgo país? Lo escucho todo el tiempo en las noticias pero no entiendo qué mide.' ¿Cuál es la mejor explicación?",
    "opciones": [
      "Es la diferencia de rendimiento (spread) que el mercado exige a los bonos argentinos por sobre un bono considerado más seguro (como el Tesoro de EE.UU.), como compensación por el riesgo de que Argentina no pueda pagar su deuda",
      "Es un índice que mide cuántos turistas visitan el país por año, elaborado por el sector turístico junto con las cámaras de comercio locales, y que se actualiza mensualmente en base a encuestas realizadas en aeropuertos y pasos fronterizos",
      "Es un impuesto que cobra el gobierno a las inversiones extranjeras, que se descuenta automáticamente de cualquier operación con no residentes, tal como ocurre con otras retenciones que el fisco aplica sobre distintos movimientos de capitales hacia el exterior del país",
      "Es lo mismo que la tasa de inflación, así que cuando uno sube el otro necesariamente también tiene que subir en la misma magnitud, ya que ambos reflejan la misma dinámica de precios sin ninguna diferencia conceptual real entre ellos"
    ],
    "respuesta_correcta": 0,
    "explicacion": "El riesgo país (en su forma más usada, el índice EMBI o similar) es un spread de crédito: cuántos puntos básicos extra exige el mercado para prestarle a Argentina en vez de a EE.UU. Cuando baja, indica que el mercado percibe menor probabilidad de default; cuando sube, lo contrario. Es un número con lógica económica concreta detrás, útil para explicarle al cliente por qué los bonos soberanos suben o bajan en bloque."
  },
  {
    "id": "MACRO-MC-002",
    "categoria": "Macro Argentina",
    "subtema": "Riesgo país y precio de bonos",
    "dificultad": "intermedia",
    "tipo": "multiple_choice",
    "enunciado": "Si el riesgo país argentino comprime (baja) de forma sostenida, ¿qué efecto esperarías, en principio, sobre el precio de los bonos soberanos en dólares?",
    "opciones": [
      "Solo afecta a las acciones, no a los bonos, ya que el riesgo país es un indicador pensado exclusivamente para el mercado accionario, sin ninguna aplicación práctica para valuar instrumentos de renta fija emitidos por el Tesoro",
      "El precio de los bonos soberanos debería subir, porque al bajar el riesgo percibido, el mercado exige menos rendimiento (TIR) para sostenerlos, y precio y TIR se mueven inversamente",
      "El precio debería bajar, porque hay menos interés en el país, ya que un menor riesgo país siempre se interpreta como una señal de desinterés del mercado, lo cual llevaría a los inversores a desprenderse de sus tenencias en busca de alternativas más atractivas en otros mercados emergentes",
      "Ningún efecto, son cosas independientes, porque el riesgo país solamente afecta el humor político, no el precio de los instrumentos financieros, que se determina exclusivamente por la oferta y demanda de cada bono en el mercado secundario"
    ],
    "respuesta_correcta": 1,
    "explicacion": "Esta conexión es central para tu trabajo diario: riesgo país y precio de bonos soberanos están directamente vinculados. Si el riesgo país baja, significa que el spread exigido es menor, lo que implica menor TIR exigida, lo que (con la relación inversa precio-TIR) implica mayor precio. En contextos de fuerte compresión de riesgo país, el equity local también suele beneficiarse, porque mejora el clima general de inversión hacia activos argentinos."
  },
  {
    "id": "MACRO-MC-003",
    "categoria": "Macro Argentina",
    "subtema": "Calificación crediticia",
    "dificultad": "intermedia",
    "tipo": "multiple_choice",
    "enunciado": "Una agencia calificadora (como S&P o Fitch) sube la nota soberana de Argentina (por ejemplo, de CCC+ a B-). ¿Qué relación tiene esto, en general, con el riesgo país y el precio de los bonos?",
    "opciones": [
      "Las calificadoras solo afectan a las acciones, no a la renta fija, ya que sus informes están pensados únicamente para inversores del mercado accionario que buscan referencias sobre el desempeño esperado de las empresas cotizantes",
      "Una mejora de calificación siempre hace bajar el precio de los bonos, porque implica que el país ya no necesita ofrecer tanto rendimiento para financiarse, lo que reduce el atractivo relativo de esos bonos frente a otras alternativas de inversión disponibles",
      "Ninguna relación, son cosas completamente separadas, porque las calificadoras solo evalúan aspectos institucionales sin ningún impacto en los precios de mercado, que se mueven únicamente en función de la oferta y demanda diaria",
      "Una mejora de calificación suele ir acompañada de una compresión del riesgo país y una suba en el precio de los bonos, porque refleja una mejor percepción de la capacidad/voluntad de pago del país"
    ],
    "respuesta_correcta": 3,
    "explicacion": "Las calificaciones crediticias son una de las señales que el mercado mira para formar su percepción de riesgo. Una mejora de nota no garantiza nada por sí sola, pero suele coincidir con (o gatillar) una compresión de riesgo país y una suba de precios en bonos soberanos, porque reduce la probabilidad percibida de default. Vale la pena que sepas explicarle a un cliente la cadena completa: mejora de rating → mejora percepción de riesgo → compresión de riesgo país → suba de precio de bonos."
  },
  {
    "id": "MACRO-MC-004",
    "categoria": "Macro Argentina",
    "subtema": "Brecha cambiaria",
    "dificultad": "basica",
    "tipo": "multiple_choice",
    "enunciado": "Un cliente te pregunta: '¿Por qué hay tantos dólares distintos en Argentina? Vi que el oficial, el MEP y el CCL no son lo mismo.' ¿Cuál es la explicación más clara?",
    "opciones": [
      "La brecha cambiaria desapareció hace años en Argentina, así que hoy en día el oficial, el MEP y el CCL cotizan prácticamente al mismo valor, ya que las regulaciones cambiarias que generaban esa diferencia fueron eliminadas por completo hace varios años y el mercado se unificó de forma definitiva",
      "Son distintas formas de acceder a dólares con diferentes mecanismos y regulaciones: el oficial es el tipo de cambio regulado por el Banco Central, mientras que MEP y CCL surgen de operar instrumentos financieros en el mercado, y su precio puede diferir del oficial según la brecha cambiaria del momento",
      "El MEP y el CCL solo existen para empresas, nunca para personas físicas, que tienen acceso exclusivamente al tipo de cambio oficial regulado por el Banco Central, dado que la normativa cambiaria vigente reserva esas operatorias financieras específicas únicamente a sujetos jurídicos debidamente registrados",
      "Son exactamente el mismo precio, solo cambia el nombre que utiliza cada operador según en qué mercado o plataforma esté cargando la orden, ya que todos los mercados terminan arbitrando instantáneamente entre sí hasta igualar sus cotizaciones en cuestión de segundos"
    ],
    "respuesta_correcta": 1,
    "explicacion": "La existencia de múltiples tipos de cambio (oficial, MEP, CCL, entre otros) es una particularidad muy argentina, producto de regulaciones cambiarias. La 'brecha' es la diferencia porcentual entre estos dólares. Es importante que el cliente entienda que no son intercambiables sin más: acceder a cada uno tiene su propio mecanismo, costos y a veces restricciones."
  },
  {
    "id": "MACRO-MC-005",
    "categoria": "Macro Argentina",
    "subtema": "MEP vs CCL - diferencia práctica",
    "dificultad": "intermedia",
    "tipo": "multiple_choice",
    "enunciado": "Un cliente quiere dolarizar parte de sus ahorros pero los dólares los necesita disponibles en su cuenta local en Argentina, no afuera. ¿Qué operatoria le corresponde?",
    "opciones": [
      "Da exactamente lo mismo cuál elija, porque ambas operatorias depositan los dólares finales en la misma cuenta sin ninguna diferencia",
      "Ninguna de las dos sirve para ese objetivo, así que el cliente debería recurrir directamente al mercado de dólar oficial para dolarizarse",
      "Dólar CCL (cable), porque siempre conviene sacar los dólares al exterior incluso cuando el cliente explícitamente pidió tener los fondos disponibles en su cuenta local",
      "Dólar MEP, porque el resultado son dólares acreditados en su cuenta local, mientras que el CCL está pensado para quienes quieren los dólares fuera del país"
    ],
    "respuesta_correcta": 3,
    "explicacion": "La diferencia operativa central entre MEP y CCL es el destino final de los dólares: MEP los deja disponibles localmente (en la cuenta comitente argentina), CCL permite transferirlos a una cuenta en el exterior. El mecanismo de compra (comprar un activo en pesos y venderlo en su variante en dólares) es similar; lo que cambia es el ticker (terminación D para MEP, C para CCL/cable) y el destino de los fondos."
  },
  {
    "id": "MACRO-MC-006",
    "categoria": "Macro Argentina",
    "subtema": "Parking en operaciones MEP/CCL",
    "dificultad": "avanzada",
    "tipo": "multiple_choice",
    "enunciado": "Un cliente que es una persona jurídica (empresa) quiere comprar un bono en pesos hoy y venderlo en su versión MEP el mismo día para dolarizarse rápido. ¿Qué le advertís?",
    "opciones": [
      "Que las personas jurídicas no pueden operar MEP bajo ninguna circunstancia, y que esa operatoria está reservada exclusivamente para personas físicas residentes, dado que la normativa de la CNV excluye a las empresas de cualquier mecanismo de acceso al dólar financiero, aun cuando en la práctica esa restricción histórica aplicaba de forma distinta según el tipo de sujeto que operaba",
      "Que para personas jurídicas puede seguir aplicando el 'parking' (un plazo mínimo de permanencia, históricamente 1 día hábil) antes de poder vender en la otra moneda, así que conviene planificar con un día de anticipación y considerar que el precio puede moverse en el medio",
      "Que no hay ninguna restricción, puede hacerlo el mismo día sin problema, sin importar si se trata de una persona física o de una persona jurídica, porque el parking fue eliminado de la normativa cambiaria vigente para todo tipo de operaciones de dolarización",
      "Que el parking aplica únicamente a personas físicas, nunca a empresas, que pueden dolarizarse el mismo día sin ningún tipo de restricción normativa, ya que esa limitación temporal fue pensada exclusivamente para desalentar el arbitraje cambiario de pequeños ahorristas"
    ],
    "respuesta_correcta": 1,
    "explicacion": "Es un detalle operativo importante y que cambia según el tipo de cliente: para personas humanas, el parking en principio ya no aplica, pero para personas jurídicas puede seguir vigente. Conviene siempre confirmar la normativa vigente al momento de operar (puede cambiar) y explicarle al cliente jurídico que hay un día de exposición a movimiento de precio entre la compra y la venta si el parking aplica."
  },
  {
    "id": "MACRO-CASO-001",
    "categoria": "Macro Argentina",
    "subtema": "Brecha cambiaria - comunicación al cliente",
    "dificultad": "intermedia",
    "tipo": "caso_abierto",
    "enunciado": "Un cliente compara el dólar MEP con el dólar CCL y te pregunta por qué uno suele cotizar más caro que el otro si 'al final ambos son dólares'. Explicá en 4-5 líneas, sin tecnicismos, una razón posible de esa diferencia (brecha entre MEP y CCL) y qué implica para él en términos prácticos.",
    "respuesta_modelo": "Una buena respuesta debería mencionar que, aunque ambos representan formas de acceder a dólares, tienen mecanismos, demanda y a veces restricciones distintas (por ejemplo, el CCL involucra movimiento de fondos al exterior, lo cual puede tener mayor demanda en ciertos momentos por necesidades de dolarización fuera del país). La diferencia entre ambos (la 'brecha' entre MEP y CCL) puede ampliarse o comprimirse según el contexto de mercado y las expectativas. En términos prácticos para el cliente: el costo de 'sacar' dólares afuera (CCL) puede ser distinto al de tenerlos disponibles localmente (MEP), así que conviene elegir según su necesidad real, no asumiendo que ambos cuestan lo mismo en todo momento."
  },
  {
    "id": "MACRO-MC-007",
    "categoria": "Macro Argentina",
    "subtema": "Inflación e IPC",
    "dificultad": "basica",
    "tipo": "multiple_choice",
    "enunciado": "Un cliente te pregunta por qué le importa, como inversor, el dato mensual de inflación (IPC) que publica el INDEC. ¿Cuál es la respuesta más completa?",
    "opciones": [
      "No le importa en absoluto si invierte en dólares, ya que los instrumentos en moneda extranjera quedan completamente aislados del contexto local, porque su rendimiento depende únicamente de las tasas internacionales y no de la coyuntura económica argentina",
      "Porque afecta el poder adquisitivo de sus tenencias en pesos, influye en las expectativas de tasa de interés y es la base de ajuste de instrumentos indexados como los bonos CER; además, sorpresas en el dato (mejor o peor a lo esperado) suelen mover los precios de los bonos en pesos",
      "Solo le importa al gobierno, no a un inversor individual, ya que las decisiones de política monetaria no tienen ningún efecto sobre carteras privadas, dado que esas decisiones están dirigidas exclusivamente a corregir desequilibrios macroeconómicos y fiscales del Estado",
      "El IPC y la inflación son cosas completamente distintas sin relación, porque el IPC mide precios de consumo mientras que la inflación mide otra variable económica distinta, relacionada con el nivel de actividad y el empleo, sin ningún vínculo directo entre ambos indicadores, dos conceptos que en la jerga del mercado local terminan usándose casi como sinónimos, aunque técnicamente no lo sean"
    ],
    "respuesta_correcta": 1,
    "explicacion": "La inflación es un dato central para cualquier inversor en pesos argentinos, incluso para quien tiene parte de su cartera en dólares (porque afecta expectativas de tipo de cambio, tasas y el contexto macro general). Cuando el dato de IPC sale distinto a lo esperado por el mercado (REM o consenso de analistas), suele generar movimientos en la curva de bonos en pesos, especialmente en los ajustados por CER y en la tasa fija."
  },
  {
    "id": "MACRO-MC-008",
    "categoria": "Macro Argentina",
    "subtema": "Inflación núcleo vs general",
    "dificultad": "intermedia",
    "tipo": "multiple_choice",
    "enunciado": "Un cliente lee que 'la inflación núcleo bajó más que la general' y te pregunta qué significa eso. ¿Cuál es la explicación correcta?",
    "opciones": [
      "La inflación núcleo solo mide el precio del dólar oficial y su evolución mensual respecto a los principales indicadores cambiarios, sin ninguna relación con la evolución de los precios de bienes y servicios",
      "La inflación núcleo es un dato que publica el Banco Central, no el INDEC, que utiliza una metodología de cálculo completamente distinta a la del índice general, basada en encuestas de expectativas de mercado en lugar de relevamiento de precios, una confusión frecuente entre quienes recién empiezan a seguir de cerca los informes mensuales de precios",
      "Son exactamente lo mismo, solo cambia el nombre que usa cada medio de comunicación para referirse al mismo dato publicado por el INDEC, ya que no existe ninguna metodología diferenciada entre ambos conceptos dentro del índice de precios",
      "La inflación núcleo excluye los rubros más volátiles o estacionales (como ciertos alimentos o regulados), y suele considerarse una medida más representativa de la tendencia de fondo de los precios, menos afectada por factores puntuales o temporales"
    ],
    "respuesta_correcta": 3,
    "explicacion": "Distinguir inflación 'general' de 'núcleo' es útil para leer el dato con criterio: la núcleo filtra ítems más volátiles o estacionales, dando una mejor foto de la tendencia subyacente de precios. Si la núcleo baja más que la general, suele interpretarse como una señal más sólida de desinflación, ya que no depende de un factor estacional puntual (por ejemplo, una baja temporal en el precio de algún alimento)."
  },
  {
    "id": "MACRO-MC-009",
    "categoria": "Macro Argentina",
    "subtema": "Expectativas de inflación y curva CER",
    "dificultad": "avanzada",
    "tipo": "multiple_choice",
    "enunciado": "La curva de bonos CER permite estimar 'inflación implícita' o 'breakeven' comparando el rendimiento de un bono CER con uno de tasa fija de plazo similar. Si esa inflación implícita es más alta que lo que vos personalmente esperás para los próximos meses, ¿qué podría significar para un cliente que quiere cobertura inflacionaria?",
    "opciones": [
      "Que el mercado está 'pagando' (vía precio) una cobertura inflacionaria a un costo relativamente bajo respecto a lo que realmente se espera de inflación, lo que puede hacer atractivo el CER incluso si el ritmo de inflación implícito en la curva luce algo exigente",
      "Que la inflación implícita no tiene ninguna utilidad práctica para comparar instrumentos ajustados por CER contra los de tasa fija tradicional, ya que ambos tipos de instrumentos responden a lógicas de mercado completamente independientes entre sí",
      "Que hay que comprar dólares en vez de bonos CER, sin excepción, ya que la inflación implícita de la curva CER no aporta ninguna información sobre el dólar, siendo la cobertura cambiaria directa siempre preferible a cualquier instrumento en pesos",
      "Que no tiene sentido comprar bonos CER en ningún caso cuando la inflación implícita de la curva se ubica por encima de las expectativas propias, porque ese instrumento quedaría automáticamente sobrevaluado frente al resto de las alternativas disponibles, una conclusión apresurada que ignora que la comparación entre curvas depende de muchos supuestos y no de una regla mecánica"
    ],
    "respuesta_correcta": 0,
    "explicacion": "Comparar la inflación implícita en la curva CER contra tu propia visión de inflación futura es una herramienta de valor relativo: si el mercado está 'pricing' menos inflación de la que vos esperás, el CER puede estar relativamente barato (atractivo) como cobertura. Es un ejercicio que requiere comparar bonos CER y de tasa fija de duración similar, y entender que el resultado depende de supuestos, no es una certeza matemática."
  },
  {
    "id": "MACRO-MC-010",
    "categoria": "Macro Argentina",
    "subtema": "CER y poder adquisitivo",
    "dificultad": "basica",
    "tipo": "multiple_choice",
    "enunciado": "Un cliente conservador, preocupado por la inflación, te pregunta si un bono CER le 'garantiza' no perder poder adquisitivo. ¿Cuál es la respuesta más honesta?",
    "opciones": [
      "El capital se ajusta por inflación según la fórmula del bono, lo cual ayuda a proteger el poder adquisitivo del capital nominal, pero el precio de mercado del bono puede subir o bajar igualmente, así que en el corto plazo sí puede haber pérdidas de valor de mercado, aunque la indexación cumpla su función a través del tiempo",
      "Solo protege si se compra exactamente el día de emisión, perdiendo esa protección automáticamente a partir del primer día de cotización en el mercado secundario, momento en el cual el instrumento pasa a comportarse como un bono de tasa fija sin ningún tipo de ajuste, una idea que circula bastante entre clientes nuevos porque confunden el momento de compra con el mecanismo de ajuste del instrumento, cuando en realidad la fórmula de indexación sigue aplicando sin importar en qué momento se haya comprado el bono en el mercado secundario",
      "No, los bonos CER no tienen ninguna relación con la inflación, ya que su nombre hace referencia a otro tipo de ajuste completamente distinto, vinculado con la tasa de interés de referencia que fija el Banco Central para el sistema financiero",
      "Sí, los bonos CER garantizan al 100% no perder poder adquisitivo bajo cualquier circunstancia, ya que su estructura de ajuste automático por inflación elimina por completo cualquier riesgo de pérdida de valor real en el tiempo"
    ],
    "respuesta_correcta": 0,
    "explicacion": "Es importante no vender el CER como una garantía absoluta. La indexación por CER cumple su función sobre el capital del instrumento, pero el precio de mercado (lo que el cliente ve día a día en la pantalla) puede fluctuar por motivos distintos a la inflación pura (tasas reales, contexto político, demanda). Diferenciar 'protección estructural del instrumento' de 'volatilidad de precio de mercado en el corto plazo' es clave para gestionar expectativas."
  },
  {
    "id": "MACRO-MC-011",
    "categoria": "Macro Argentina",
    "subtema": "Tasa de interés y bonos en pesos",
    "dificultad": "intermedia",
    "tipo": "multiple_choice",
    "enunciado": "Si el Banco Central sube la tasa de interés de referencia, ¿qué efecto general esperarías sobre el precio de los bonos a tasa fija en pesos (no ajustados por CER)?",
    "opciones": [
      "No hay ningún efecto sobre bonos en pesos, porque la tasa de referencia del Banco Central solo influye sobre los créditos bancarios, sin ningún tipo de traslado hacia el precio de los instrumentos que cotizan en el mercado",
      "El precio debería bajar, porque al subir las tasas de referencia, el rendimiento exigido a esos bonos también sube, y por la relación inversa precio-TIR, el precio cae",
      "El precio debería subir, porque suben las tasas, ya que mayores tasas de referencia siempre mejoran la valuación de los instrumentos existentes, al volverlos más atractivos frente a las nuevas alternativas de inversión",
      "Solo afecta a los bonos en dólares, ya que los instrumentos en pesos no tienen ninguna relación con la tasa de referencia local, que impacta únicamente sobre los créditos denominados en moneda extranjera"
    ],
    "respuesta_correcta": 1,
    "explicacion": "Es la misma lógica de precio-TIR aplicada al contexto de tasas locales: si sube la tasa de referencia, el mercado exige mayor rendimiento a los instrumentos en pesos, lo que implica una caída de precio (para bonos con flujos fijos ya emitidos). Es importante que sepas explicar este mecanismo porque las decisiones de tasa del Banco Central impactan directamente las carteras en pesos de tus clientes."
  },
  {
    "id": "MACRO-MC-012",
    "categoria": "Macro Argentina",
    "subtema": "Reservas del BCRA y compra de divisas",
    "dificultad": "intermedia",
    "tipo": "multiple_choice",
    "enunciado": "Un cliente lee que 'el Banco Central viene comprando dólares todos los días' y te pregunta por qué eso sería positivo. ¿Cuál es una explicación razonable?",
    "opciones": [
      "Comprar dólares siempre genera inflación inmediata sin excepción, sin importar cómo se financie esa compra ni el contexto monetario del momento, ya que la emisión monetaria asociada se traslada automáticamente y en su totalidad a los precios",
      "No tiene ninguna relevancia para la economía en general, más allá de un impacto simbólico o comunicacional sin efectos concretos, ya que las reservas del Banco Central no condicionan de ninguna manera las expectativas de los agentes económicos",
      "Acumular reservas fortalece la capacidad del Banco Central de responder ante necesidades futuras (por ejemplo, pagos de deuda en moneda extranjera), lo cual suele ser interpretado por el mercado como una señal de mayor solidez macroeconómica",
      "Solo afecta a los exportadores, no al resto de la economía, ya que el nivel de reservas del Banco Central no tiene ninguna relación con el resto de los sectores productivos ni con la capacidad de pago de la deuda pública en moneda extranjera"
    ],
    "respuesta_correcta": 2,
    "explicacion": "La acumulación de reservas es un indicador que el mercado monitorea de cerca, porque afecta la percepción de capacidad de pago del país (relevante para el riesgo país) y la sostenibilidad del esquema cambiario. No es una variable aislada: hay que mirarla en conjunto con para qué se usan esas compras (por ejemplo, si se destinan a pagar deuda, el efecto neto sobre reservas disponibles puede ser distinto al que parece a primera vista)."
  },
  {
    "id": "MACRO-MC-013",
    "categoria": "Macro Argentina",
    "subtema": "Licitaciones del Tesoro y rollover",
    "dificultad": "avanzada",
    "tipo": "multiple_choice",
    "enunciado": "Una licitación del Tesoro logra un 'rollover superior al 120%'. Un cliente pregunta qué significa eso. ¿Cuál es la explicación correcta?",
    "opciones": [
      "Es un término que no tiene ninguna aplicación práctica para evaluar la capacidad de financiamiento del Tesoro en el mercado local, ya que ese indicador solo se utiliza en el contexto de licitaciones de deuda de gobiernos provinciales",
      "Que el 120% de los bonos en circulación entraron en default, lo cual explicaría por qué el Tesoro tuvo que salir a buscar financiamiento de urgencia, en un contexto de fuerte deterioro de la confianza de los inversores en la capacidad de pago del Estado",
      "Que el Tesoro pagó 120% de interés sobre lo emitido, una tasa extraordinariamente alta comparada con cualquier otra licitación reciente, lo cual reflejaría una situación de estrés severo en el financiamiento del Estado",
      "Que el Tesoro consiguió renovar (refinanciar) más deuda de la que vencía en ese período: por cada 100 que vencía, colocó 120 de deuda nueva, lo que implica que además de refinanciar lo que vencía, consiguió financiamiento adicional"
    ],
    "respuesta_correcta": 3,
    "explicacion": "El rollover mide qué porcentaje de la deuda que vence en una licitación logra renovarse con nueva emisión. Un rollover por encima del 100% significa que el Tesoro no solo refinanció todo lo que vencía, sino que además absorbió pesos adicionales del mercado (financiamiento neto positivo). Es un dato que el mercado mira de cerca porque refleja la capacidad del Tesoro de financiarse sin recurrir a otras fuentes (como emisión monetaria)."
  },
  {
    "id": "MACRO-CASO-002",
    "categoria": "Macro Argentina",
    "subtema": "Conectar riesgo país con decisión de cartera",
    "dificultad": "avanzada",
    "tipo": "caso_abierto",
    "enunciado": "Un cliente con perfil moderado-agresivo te pregunta si, dado que el riesgo país viene comprimiendo de forma sostenida en las últimas semanas, conviene aumentar la exposición a bonos soberanos argentinos en dólares. Redactá en 5-6 líneas cómo encararías esta conversación: qué le explicarías sobre la relación entre riesgo país y precio de bonos, y qué precauciones plantearías antes de simplemente decir 'sí, comprá más'.",
    "respuesta_modelo": "Una buena respuesta debería: (1) confirmar la lógica que el cliente intuye (si el riesgo país sigue comprimiendo, los bonos soberanos en dólares deberían seguir beneficiándose por la relación inversa precio-TIR), (2) aclarar que la compresión ya ocurrida no garantiza que continúe — gran parte del movimiento esperado puede ya estar reflejado en el precio actual, (3) plantear que aumentar exposición implica también aumentar el riesgo de cartera (concentración en activos argentinos, sensibilidad a un eventual cambio de sentimiento de mercado), (4) sugerir evaluar el tamaño de la posición en función del perfil de riesgo del cliente y no solo de la tendencia reciente, (5) idealmente mencionar la importancia de mirar duration de los bonos elegidos, porque la sensibilidad al movimiento de riesgo país no es igual en todos los tramos de la curva."
  },
  {
    "id": "MACRO-MC-014",
    "categoria": "Macro Argentina",
    "subtema": "Devaluación y cobertura",
    "dificultad": "intermedia",
    "tipo": "multiple_choice",
    "enunciado": "Un cliente quiere cubrirse específicamente ante el riesgo de una devaluación del tipo de cambio OFICIAL (no del CCL). ¿Qué instrumento, entre los vistos, es más directo para ese objetivo puntual?",
    "opciones": [
      "Un bono dollar-linked, porque su capital se ajusta específicamente según la evolución del tipo de cambio oficial",
      "Un bono CER, porque ajusta por inflación, que en el mediano plazo suele moverse en la misma dirección que el tipo de cambio oficial",
      "Una acción de cualquier empresa, no importa cuál, ya que el mercado accionario en su conjunto siempre se mueve en línea con la devaluación oficial",
      "Un plazo fijo tradicional en pesos, que ofrece una tasa fija pensada específicamente para cubrir movimientos del tipo de cambio"
    ],
    "respuesta_correcta": 0,
    "explicacion": "El dollar-linked es, por diseño, el instrumento más directo para cubrirse específicamente contra el tipo de cambio oficial. Es importante diferenciarlo del CER (que cubre inflación, no devaluación directamente) y recordar que no cubre necesariamente el riesgo de brecha cambiaria (la diferencia entre oficial y MEP/CCL), que es un riesgo distinto."
  },
  {
    "id": "MACRO-MC-015",
    "categoria": "Macro Argentina",
    "subtema": "Contexto internacional y mercados emergentes",
    "dificultad": "avanzada",
    "tipo": "multiple_choice",
    "enunciado": "Hay un contexto de alta volatilidad global (por ejemplo, tensiones geopolíticas que afectan el precio del petróleo y las expectativas de tasas globales). En general, ¿qué se esperaría que ocurra con activos de mercados emergentes y fronterizos como Argentina en un escenario de 'flight to quality' (huida hacia activos considerados más seguros)?",
    "opciones": [
      "Solo afecta a las acciones, nunca a los bonos soberanos, que quedan completamente aislados de los movimientos de aversión al riesgo global, ya que su rendimiento depende exclusivamente de las condiciones particulares de cada emisor y no del clima financiero internacional",
      "No hay ningún efecto sobre economías emergentes durante episodios de aversión al riesgo o tensión geopolítica internacional, ya que los flujos de capitales globales se mantienen completamente estables sin importar el apetito por riesgo de los inversores institucionales en ese momento, una lectura que suele sorprender a quienes recién empiezan a seguir de cerca cómo reaccionan los distintos mercados frente a este tipo de episodios de aversión al riesgo",
      "El flight to quality siempre beneficia a todos los mercados por igual, incluyendo a los mercados emergentes y fronterizos como Argentina sin ninguna excepción, ya que la búsqueda de refugio se reparte de manera uniforme entre todos los activos disponibles a nivel global, sin que el nivel de riesgo relativo de cada país cambie en nada esa distribución pareja de los flujos de inversión",
      "En general, el 'flight to quality' suele perjudicar a economías emergentes y fronterizas, ya que los inversores tienden a preferir activos considerados más seguros (como bonos del Tesoro de EE.UU.); sin embargo, esto no es automático: factores idiosincráticos locales (como una mejora de calificación crediticia) pueden hacer que un país emergente puntual tenga un desempeño positivo incluso en ese contexto global adverso"
    ],
    "respuesta_correcta": 3,
    "explicacion": "Es importante que entiendas la diferencia entre el contexto global (factor común a todos los emergentes) y los factores idiosincráticos (propios de cada país). Aunque la tendencia general en un escenario de aversión al riesgo global suele perjudicar a emergentes, eventos puntuales positivos a nivel local (como una mejora de rating o una buena noticia macro) pueden hacer que un país particular 'nade contra la corriente' del sentimiento global. Saber distinguir ambos factores te ayuda a explicarle al cliente por qué Argentina puede tener una semana mejor que el promedio de emergentes."
  },
  {
    "id": "MACRO-MC-016",
    "categoria": "Macro Argentina",
    "subtema": "Tasa de caución/repo",
    "dificultad": "avanzada",
    "tipo": "multiple_choice",
    "enunciado": "Un cliente con liquidez transitoria pregunta sobre la 'tasa de caución' como alternativa de muy corto plazo. ¿Qué es, en términos simples?",
    "opciones": [
      "Es la tasa que se obtiene (o se paga) en una operación de préstamo de muy corto plazo garantizada con activos, usada habitualmente para colocar liquidez transitoria de un día para otro o por pocos días",
      "Es un impuesto que cobra el Banco Central a los bancos por mantener depósitos ociosos sin prestarlos al resto de la economía, con el objetivo de incentivar una mayor circulación del crédito hacia las empresas y los hogares",
      "Es una tasa de interés que se cobra por mantener efectivo inmovilizado sin ningún uso, similar a un cargo por servicio que aplican los bancos a las cuentas con saldos ociosos durante un período prolongado",
      "Es lo mismo que la tasa de plazo fijo tradicional, con la única diferencia de que se paga en un plazo un poco más corto, ya que ambos instrumentos remuneran de la misma manera el dinero inmovilizado en una entidad bancaria"
    ],
    "respuesta_correcta": 0,
    "explicacion": "La caución (o repo) es una herramienta de gestión de liquidez de muy corto plazo: permite colocar pesos (u otros activos como garantía) por períodos cortos, generalmente de un día a unas pocas ruedas, obteniendo un rendimiento mientras se decide el destino final de esos fondos. Es útil para explicarle a un cliente que tiene plata 'parada' transitoriamente entre una venta y una nueva inversión, en vez de dejarla sin ningún rendimiento."
  },
  {
    "id": "MACRO-MC-017",
    "categoria": "Macro Argentina",
    "subtema": "Dato de inflación vs expectativas (sorpresa de mercado)",
    "dificultad": "intermedia",
    "tipo": "multiple_choice",
    "enunciado": "El mercado esperaba una inflación mensual de 2,3% (según el consenso de analistas) y el dato real publicado fue 2,1%. ¿Qué tipo de reacción es más probable ver en los precios de los bonos en pesos justo después de conocerse el dato?",
    "opciones": [
      "Una reacción favorable para los bonos en pesos (sobre todo de tasa fija), porque un dato de inflación mejor (más bajo) al esperado suele interpretarse como una señal de que el proceso de desinflación continúa, lo cual valida expectativas de baja de tasas hacia adelante",
      "Ninguna reacción, porque la diferencia es muy chica para importar, ya que el mercado solo reacciona ante sorpresas de más de un punto porcentual completo, dado que variaciones menores se consideran ruido estadístico sin ningún valor informativo real",
      "Una caída generalizada de todos los activos argentinos, porque cualquier dato de inflación, sin importar su dirección, siempre genera nerviosismo en el mercado, al recordarle a los inversores la persistencia del problema inflacionario en la economía local, una reacción exagerada que no tiene mucho sustento si el dato en cuestión resultó, de hecho, mejor al esperado por el consenso",
      "Solo afecta al precio del dólar, no a los bonos, que reacciona de forma aislada sin ningún impacto sobre la curva de tasas en pesos, ya que ambos mercados operan de manera totalmente desconectada entre sí en el corto plazo"
    ],
    "respuesta_correcta": 0,
    "explicacion": "Lo que mueve el mercado no es solo el dato en sí, sino la sorpresa respecto a lo esperado. Un dato de inflación mejor al consenso suele ser tomado como una buena noticia para los bonos en pesos, especialmente los de tasa fija, porque reduce las expectativas de inflación futura y valida la posibilidad de que las tasas de interés puedan seguir comprimiendo. Es un patrón importante para poder leer el contexto del día con tus clientes."
  },
  {
    "id": "MACRO-MC-018",
    "categoria": "Macro Argentina",
    "subtema": "Factores estacionales en el IPC",
    "dificultad": "avanzada",
    "tipo": "multiple_choice",
    "enunciado": "Un cliente se entusiasma mucho con un dato de inflación bajo, pero vos notás que gran parte de la mejora se explica por una caída estacional en el precio de un rubro puntual (por ejemplo, alimentos frescos en determinada época del año). ¿Qué deberías comunicarle?",
    "opciones": [
      "Que hay que ignorar completamente los datos oficiales de inflación, porque los factores estacionales invalidan por completo cualquier lectura del índice, ya que ningún componente del IPC resulta representativo de la evolución real de los precios en el tiempo",
      "Que el dato de inflación no tiene ninguna utilidad para un cliente que ya tiene bonos CER en su cartera de inversión, dado que el ajuste de esos instrumentos ya incorpora automáticamente cualquier variación de precios futura",
      "Que si bien el dato es una buena noticia, conviene ser prudente al extrapolarlo, porque parte de la mejora puede deberse a un factor estacional puntual que no necesariamente se repite en los próximos meses; conviene mirar también la inflación núcleo para una lectura más estructural",
      "Nada, simplemente confirmarle que la inflación está controlada para siempre, ya que un solo dato mensual bueno permite proyectar con certeza el resto del año, sin necesidad de monitorear ningún otro indicador económico o factor estacional en los próximos meses, una conclusión apresurada que ignora que un solo dato mensual, por bueno que sea, no alcanza para proyectar con certeza el resto del año"
    ],
    "respuesta_correcta": 2,
    "explicacion": "Parte del criterio profesional de un asesor es no extrapolar un solo dato sin matices. Reconocer factores estacionales (por ejemplo, estacionalidad en precios de alimentos) ayuda a separar 'ruido de corto plazo' de 'tendencia de fondo'. Comunicarle esto al cliente con cuidado (sin opacar la buena noticia, pero con prudencia) construye más confianza a largo plazo que validar entusiasmo sin matices."
  },
  {
    "id": "MACRO-MC-019",
    "categoria": "Macro Argentina",
    "subtema": "Riesgo idiosincrático vs riesgo global",
    "dificultad": "intermedia",
    "tipo": "multiple_choice",
    "enunciado": "Un cliente te pregunta por qué, si hay mucha incertidumbre en los mercados globales esa semana, el Merval (índice accionario argentino) tuvo una de sus mejores semanas del año. ¿Cuál es una explicación razonable?",
    "opciones": [
      "Es imposible, si hay incertidumbre global todos los mercados deben caer por igual, sin que ningún factor local pueda revertir esa tendencia generalizada, ya que los mercados emergentes siempre replican en forma automática el comportamiento de los índices globales, una simplificación que no tiene en cuenta que los activos de un país puntual pueden desacoplarse del humor global si hay noticias locales fuertes",
      "Es un error de los datos de mercado que conviene reportar a la bolsa antes de sacar cualquier conclusión sobre la semana, ya que un movimiento tan pronunciado en un contexto adverso solo puede explicarse por una falla técnica del sistema",
      "El Merval nunca se ve afectado por el contexto internacional, ya que se mueve completamente aislado de cualquier evento fuera de la Argentina, dado que sus componentes cotizan exclusivamente en función de variables macroeconómicas puramente domésticas",
      "Pueden coexistir un contexto global adverso con factores idiosincráticos (propios de Argentina) muy positivos, como una mejora de calificación crediticia o una baja sorpresiva de inflación local, que terminan pesando más sobre los activos argentinos en ese momento puntual que el clima internacional"
    ],
    "respuesta_correcta": 3,
    "explicacion": "Es importante que el cliente entienda que los activos argentinos no se mueven en el vacío ni tampoco son un espejo perfecto del humor global: hay un componente de riesgo global (común a todos los emergentes) y un componente idiosincrático (específico de Argentina). En semanas donde las noticias locales son muy positivas, el factor idiosincrático puede dominar por sobre el contexto internacional adverso."
  },
  {
    "id": "MACRO-MC-020",
    "categoria": "Macro Argentina",
    "subtema": "Sufijos de tickers O/D/C",
    "dificultad": "basica",
    "tipo": "multiple_choice",
    "enunciado": "Un cliente ve en su cuenta el ticker 'AL30D' y pregunta qué diferencia tiene con 'AL30' a secas. ¿Cuál es la explicación correcta?",
    "opciones": [
      "La 'D' indica que el bono está en default, una señal de alerta que debería llevar a vender esa posición de inmediato",
      "Son exactamente el mismo instrumento y la misma moneda, no hay diferencia, así que da exactamente lo mismo con cuál de los dos tickers se carga la orden",
      "AL30D es un bono completamente distinto a AL30, emitido por un ente diferente y con condiciones de pago totalmente distintas",
      "AL30 (sin sufijo) se opera en pesos, mientras que AL30D se opera en dólar MEP; el bono subyacente es el mismo, pero cambia la moneda de la operación"
    ],
    "respuesta_correcta": 3,
    "explicacion": "Confundir tickers por la moneda es uno de los errores operativos más comunes en Argentina, justamente porque el mismo instrumento subyacente se puede operar en distintas monedas cambiando solo el sufijo (sin sufijo o con 'O' para pesos, 'D' para MEP, 'C' para CCL/cable). Antes de cargar cualquier orden, conviene chequear explícitamente que el sufijo coincida con la moneda que el cliente realmente quiere operar."
  },
  {
    "id": "MACRO-CASO-003",
    "categoria": "Macro Argentina",
    "subtema": "Conectar macro con perfil de cliente",
    "dificultad": "avanzada",
    "tipo": "caso_abierto",
    "enunciado": "Un cliente jubilado, muy conservador, te pregunta si debería preocuparse por la suba reciente de la tasa de caución/repo por encima del 20% que viste en las noticias económicas. Explicá en 5-6 líneas cómo le bajarías este dato macro a algo relevante (o no) para su situación particular, sin abrumarlo con tecnicismos.",
    "respuesta_modelo": "Una buena respuesta debería: (1) explicar brevemente y sin jerga qué es esa tasa (el costo/rendimiento de colocar pesos por muy corto plazo), (2) evaluar honestamente si esto le afecta de forma directa a su cartera particular (depende de si tiene instrumentos de muy corto plazo o liquidez ociosa en pesos) — para un perfil conservador con cartera ya definida y de mediano/largo plazo, probablemente el impacto directo sea bajo, (3) evitar generar alarma innecesaria sobre un dato técnico de mercado de dinero que no necesariamente afecta su estrategia de fondo, (4) aprovechar la pregunta para reforzar la confianza en el plan ya armado, en vez de sumar ruido. El objetivo del ejercicio es practicar filtrar qué noticias macro son relevantes comunicar a cada perfil de cliente y cuáles solo generarían ansiedad sin aportar valor."
  },
  {
    "id": "MACRO-MC-021",
    "categoria": "Macro Argentina",
    "subtema": "Inflación y tasa real",
    "dificultad": "avanzada",
    "tipo": "multiple_choice",
    "enunciado": "Un bono CER rinde 'CER + 2%'. Un cliente pregunta qué significa ese '+2%' en términos prácticos. ¿Cuál es la mejor explicación?",
    "opciones": [
      "Que el bono paga 2% de interés fijo y nada más, sin ningún tipo de ajuste adicional por inflación durante toda su vida, comportándose en la práctica igual que cualquier otro instrumento de tasa fija tradicional en pesos",
      "Que el 2% es una comisión que cobra el broker por gestionar la compra de ese bono en particular dentro de la cartera del cliente, independientemente del rendimiento que finalmente obtenga con ese instrumento en particular",
      "Que el bono pierde 2% de valor cada año, independientemente de cómo evolucione la inflación durante ese período, como una especie de comisión implícita que cobra el emisor por el beneficio de la indexación",
      "Que, por encima del ajuste por inflación (CER), el bono ofrece un 2% adicional de rendimiento real, es decir, una ganancia de poder adquisitivo por sobre la sola compensación de la inflación"
    ],
    "respuesta_correcta": 3,
    "explicacion": "Distinguir 'tasa nominal' de 'tasa real' es un concepto que conviene dominar bien. En instrumentos CER, ese '+X%' representa la tasa real: lo que el inversor gana por encima de simplemente mantener el poder adquisitivo. Es la forma correcta de comparar instrumentos CER entre sí (mirando esa tasa real, no solo el nombre del bono), y de explicarle al cliente qué gana 'de verdad' más allá de la protección inflacionaria."
  },
  {
    "id": "MACRO-MC-022",
    "categoria": "Macro Argentina",
    "subtema": "Reapertura de mercado internacional de deuda",
    "dificultad": "avanzada",
    "tipo": "multiple_choice",
    "enunciado": "Se habla de que Argentina podría 'reabrir el mercado internacional de crédito' (poder volver a emitir deuda nueva en los mercados globales). ¿Por qué esto sería relevante para el riesgo de los bonos soberanos existentes?",
    "opciones": [
      "No tiene ninguna relevancia para los bonos ya emitidos, que quedan completamente desconectados de la capacidad de financiamiento futura del país, porque su precio depende exclusivamente de las condiciones fijadas al momento original de la emisión de cada instrumento",
      "Porque permitiría refinanciar vencimientos de deuda con nuevas emisiones, en vez de depender exclusivamente de reservas propias del Banco Central, lo cual reduciría el riesgo de refinanciamiento que históricamente explicó buena parte del spread soberano argentino",
      "Solo afectaría a los bonos que se emitan en el futuro, sin ningún efecto sobre los actuales, ya que cada emisión de deuda cotiza de manera completamente independiente del resto de la curva soberana",
      "Porque automáticamente eliminaría toda la deuda existente, dejando al país completamente libre de compromisos de pago futuros, ya que los nuevos acreedores absorberían la totalidad de las obligaciones contraídas previamente por el Estado"
    ],
    "respuesta_correcta": 1,
    "explicacion": "El 'riesgo de refinanciamiento' (poder pagar vencimientos sin agotar reservas) es uno de los componentes que el mercado pricea dentro del riesgo país. Si Argentina recupera la capacidad de emitir deuda nueva en mercados internacionales para cubrir vencimientos, eso reduce ese riesgo específico, lo cual puede traducirse en compresión adicional del riesgo país y, por la relación precio-TIR, en una suba de precio de los bonos soberanos existentes."
  },
  {
    "id": "MACRO-MC-023",
    "categoria": "Macro Argentina",
    "subtema": "Dollar-linked vs CCL en licitaciones",
    "dificultad": "avanzada",
    "tipo": "multiple_choice",
    "enunciado": "En una licitación del Tesoro, un bono dollar-linked de corto plazo se convalida a una tasa baja (buena para el Tesoro, poco atractiva en apariencia para el inversor) y aun así resulta muy demandado. ¿Qué es lo más razonable pensar sobre esa demanda?",
    "opciones": [
      "Que hay poco interés real en cubrirse del tipo de cambio, y que la demanda se explica solo porque los inversores tenían pesos ociosos para colocar en lo primero que apareciera disponible en esa licitación",
      "Que existe una demanda fuerte de cobertura cambiaria: los inversores aceptan una tasa baja porque valoran mucho asegurarse el tipo de cambio, algo que suele reflejar expectativas de que el dólar oficial podría subir con fuerza en el corto plazo",
      "Que el mercado espera que el dólar oficial se mantenga estable o suba muy poco, y por eso los inversores no necesitaron exigir una tasa más alta para entrar a esta licitación en particular, una lectura que muchos confunden porque piensan que tasa baja siempre significa poco riesgo percibido, sin distinguir el motivo real de esa demanda",
      "Que el Tesoro cometió un error al fijar esa tasa, y que conviene reportarlo antes de dar por válido el resultado de la licitación, ya que ningún inversor debería aceptar una tasa tan baja"
    ],
    "respuesta_correcta": 1,
    "explicacion": "Un dollar-linked paga en pesos pero ajustado por el tipo de cambio oficial. Si los inversores se pelean por entrar aceptando una tasa baja, es porque el verdadero atractivo no está en esa tasa sino en la cobertura cambiaria: cuanta más devaluación esperan, menos les importa la tasa explícita, porque el grueso de su ganancia esperada va a venir del ajuste por tipo de cambio. Por eso, tasa baja + demanda alta suele ser señal de que el mercado anticipa un salto del dólar oficial, no lo contrario."
  },
  {
    "id": "RV-MC-001",
    "categoria": "Renta Variable",
    "subtema": "CEDEAR - definición y mecánica",
    "dificultad": "basica",
    "tipo": "multiple_choice",
    "enunciado": "Un cliente pregunta qué es exactamente un CEDEAR y por qué puede comprar 'Apple' sin tener una cuenta en Estados Unidos. ¿Cuál es la explicación correcta?",
    "opciones": [
      "Es un certificado que representa una acción (o ETF) del exterior, listado y negociable en la bolsa local en pesos, lo que permite acceder a empresas internacionales sin abrir cuenta afuera",
      "Es una acción argentina que imita el comportamiento de Apple, pero no tiene relación real con la empresa, ya que se trata de un instrumento sintético creado localmente sin respaldo del activo extranjero",
      "Es lo mismo que comprar la acción directamente en NASDAQ, sin ninguna diferencia, incluyendo el mismo mecanismo de liquidación, la misma moneda de cotización y los mismos horarios de negociación del mercado americano",
      "Es un bono que paga una tasa fija relacionada con el desempeño de Apple, con un cupón que se ajusta trimestralmente según los resultados de la empresa y su nivel de endeudamiento reportado"
    ],
    "respuesta_correcta": 0,
    "explicacion": "El CEDEAR es un puente: representa la acción extranjera real, pero se opera localmente en pesos. Esto le da al cliente acceso práctico a empresas globales, aunque conviene que entienda que el precio en pesos del CEDEAR depende tanto de la acción subyacente como del tipo de cambio implícito, no es 'una acción argentina cualquiera'."
  },
  {
    "id": "RV-MC-002",
    "categoria": "Renta Variable",
    "subtema": "CEDEAR - doble exposición (acción + tipo de cambio)",
    "dificultad": "intermedia",
    "tipo": "multiple_choice",
    "enunciado": "La acción de MercadoLibre (MELI) sube 10% en dólares en un mes. En el mismo período, el dólar CCL implícito sube 5%. ¿Qué le pasaría aproximadamente al precio en pesos del CEDEAR de MELI?",
    "opciones": [
      "Subiría aproximadamente 15%, combinando la suba de la acción (10%) más la suba del tipo de cambio implícito (5%)",
      "Bajaría, porque ambos efectos se cancelan entre sí, ya que una suba de la acción y una suba del tipo de cambio siempre se compensan matemáticamente",
      "Subiría aproximadamente 10%, porque solo importa el precio de la acción en dólares",
      "No tendría ningún cambio, porque el CEDEAR no se ve afectado por el tipo de cambio"
    ],
    "respuesta_correcta": 0,
    "explicacion": "Esta es una de las confusiones más comunes con clientes nuevos en CEDEARs: el precio en pesos combina DOS efectos, el desempeño de la acción subyacente en su moneda original y el movimiento del tipo de cambio implícito (CCL). Por eso, en momentos de fuerte devaluación del peso, podés ver CEDEARs subiendo en pesos aunque la acción subyacente esté estable o incluso caiga levemente en dólares: el efecto cambiario domina."
  },
  {
    "id": "RV-MC-003",
    "categoria": "Renta Variable",
    "subtema": "CEDEAR como alternativa de dolarización",
    "dificultad": "intermedia",
    "tipo": "multiple_choice",
    "enunciado": "Un cliente te dice: 'Compro CEDEARs no porque crea en la empresa, sino porque quiero dolarizar mi cartera'. ¿Es una estrategia razonable, con qué matiz?",
    "opciones": [
      "Puede ser razonable como forma de ganar exposición al tipo de cambio implícito, pero hay que aclarar que el cliente también queda expuesto al riesgo de la acción subyacente (la empresa puede caer en dólares, neutralizando parte del beneficio cambiario)",
      "Los CEDEARs garantizan ganar exactamente lo mismo que comprar dólar MEP, sin ninguna diferencia sin importar cómo se comporte la acción subyacente ni cuánto suba o baje su cotización en el exterior durante el período invertido",
      "No tiene sentido, los CEDEARs nunca sirven para dolarizar una cartera bajo ninguna circunstancia, sin importar el objetivo del cliente, su horizonte de inversión, ni el tipo de empresa que esté detrás del certificado",
      "Es la única forma correcta de dolarizar una cartera en Argentina, ya que cualquier otra alternativa (como MEP o CCL) implica un riesgo mucho mayor y comisiones bancarias que la hacen directamente inviables para casi cualquier cliente minorista que recién empieza a operar"
    ],
    "respuesta_correcta": 0,
    "explicacion": "Es una estrategia que existe en la práctica y puede tener sentido, pero el asesor debe ser honesto sobre el riesgo adicional: a diferencia de comprar dólares (MEP/CCL) directamente, con un CEDEAR el cliente también está tomando riesgo de la empresa subyacente. Si la acción cae fuerte en dólares, ese efecto puede compensar (o superar) la ganancia cambiaria. Conviene diferenciar 'dolarizar puro' de 'dolarizar + apostar a una empresa'."
  },
  {
    "id": "RV-MC-004",
    "categoria": "Renta Variable",
    "subtema": "CEDEAR vs acción local vs ETF",
    "dificultad": "intermedia",
    "tipo": "multiple_choice",
    "enunciado": "Un cliente quiere exposición al sector financiero global y duda entre tres alternativas: (A) comprar la acción local de un banco argentino, (B) comprar el CEDEAR de un banco grande de EE.UU., (C) comprar un CEDEAR de un ETF financiero (que agrupa varios bancos). ¿Cuál ofrece mayor diversificación dentro del sector?",
    "opciones": [
      "Las tres opciones ofrecen exactamente la misma diversificación, sin importar si se trata de una empresa individual, un ETF, o una acción local, ya que todas cotizan bajo las mismas reglas de mercado",
      "El CEDEAR del ETF financiero, porque agrupa varias empresas del sector en un solo instrumento, diluyendo el riesgo específico de una sola entidad",
      "El CEDEAR del banco individual de EE.UU., porque al ser una empresa grande y sólida ya ofrece diversificación suficiente por sí sola frente a cualquier shock del sector financiero",
      "La acción local del banco argentino, ya que estar en el mercado local siempre reduce el riesgo específico de una sola entidad frente a cualquier alternativa listada en el exterior"
    ],
    "respuesta_correcta": 1,
    "explicacion": "Cada opción tiene un trade-off distinto: la acción local concentra todo en una empresa y en la economía argentina; el CEDEAR de un banco individual da calidad internacional pero sigue concentrado en una sola empresa; el ETF sectorial diversifica entre varias empresas del mismo sector, reduciendo el riesgo específico de una sola entidad a cambio de 'promediar' el desempeño del sector completo (sin las sorpresas positivas o negativas de una empresa puntual)."
  },
  {
    "id": "RV-MC-005",
    "categoria": "Renta Variable",
    "subtema": "Dividendos en CEDEARs",
    "dificultad": "basica",
    "tipo": "multiple_choice",
    "enunciado": "Un cliente tiene CEDEARs de una empresa que reparte dividendos trimestrales en EE.UU. ¿Qué le pasa a ese dividendo cuando lo tiene vía CEDEAR en Argentina?",
    "opciones": [
      "No recibe nada, los CEDEARs nunca pagan dividendos, ya que ese derecho económico se pierde por completo al operar la acción de forma indirecta a través de un certificado emitido localmente",
      "Recibe el dividendo pero solo si vende el CEDEAR primero, momento en el cual se le acredita automáticamente todo lo acumulado hasta esa fecha en su cuenta comitente local",
      "El dividendo se paga únicamente en acciones nuevas, nunca en efectivo, que se acreditan automáticamente en la cuenta comitente del cliente en Argentina según el ratio de conversión vigente en ese momento",
      "Recibe el dividendo proporcional a la cantidad de CEDEARs que tiene, generalmente convertido o acreditado según el mecanismo del depositario, menos eventuales comisiones o retenciones impositivas"
    ],
    "respuesta_correcta": 3,
    "explicacion": "Los CEDEARs trasladan al inversor local los derechos económicos de la acción subyacente, incluidos los dividendos, en proporción a la tenencia. Vale la pena que el cliente sepa que puede haber comisiones o retenciones en el proceso, así que el monto neto recibido no es necesariamente idéntico al dividendo bruto declarado por la empresa."
  },
  {
    "id": "RV-MC-006",
    "categoria": "Renta Variable",
    "subtema": "Análisis fundamental - definición",
    "dificultad": "basica",
    "tipo": "multiple_choice",
    "enunciado": "Un cliente pregunta qué es el 'análisis fundamental' y en qué se diferencia de simplemente 'mirar el gráfico'. ¿Cuál es la mejor explicación?",
    "opciones": [
      "Es un método que garantiza acertar si una acción va a subir o bajar, siempre que se calculen correctamente todos los indicadores financieros de la empresa y se los compare bien contra el sector, contra el promedio histórico de los últimos cinco años y contra los principales índices de referencia",
      "El análisis fundamental estudia los números reales del negocio (ventas, ganancias, deuda, eficiencia) para estimar si el precio de la acción está justificado por la salud de la empresa, mientras que el análisis técnico se enfoca en patrones de precios históricos en el gráfico",
      "Solo sirve para empresas que cotizan en Estados Unidos, ya que las empresas argentinas no publican suficiente información financiera auditada como para aplicarlo con el mismo rigor metodológico",
      "Es exactamente lo mismo que el análisis técnico, solo cambia el nombre que usan distintos analistas según su escuela de formación profesional y la plataforma de trading que utilicen habitualmente"
    ],
    "respuesta_correcta": 1,
    "explicacion": "Es la distinción central del capítulo: el análisis fundamental mira 'el negocio real' (como evaluar comprar una parte de una panadería: cuánto vende, cuánto gana, cuánta deuda tiene), mientras que el análisis técnico mira patrones de precio. Ninguno garantiza acertar, pero el fundamental le da al asesor argumentos sólidos para justificar una recomendación más allá de 'la veo bien en el gráfico'."
  },
  {
    "id": "RV-MC-007",
    "categoria": "Renta Variable",
    "subtema": "P/E - interpretación básica",
    "dificultad": "basica",
    "tipo": "multiple_choice",
    "enunciado": "Una acción cotiza a $50 y la empresa ganó $5 por acción en el último año. ¿Cuál es su P/E (Price/Earnings) y qué significa ese número?",
    "opciones": [
      "El P/E no se puede calcular con estos datos, porque hace falta conocer también el nivel de deuda total de la empresa",
      "P/E = 10, significa que los inversores están pagando $10 por cada $1 de ganancia anual que genera la empresa",
      "P/E = 5, significa que la empresa pierde dinero, ya que un P/E bajo siempre es sinónimo de resultados negativos en el balance",
      "P/E = 250, es el producto entre precio y ganancia, multiplicando directamente ambos valores sin dividir uno por el otro"
    ],
    "respuesta_correcta": 1,
    "explicacion": "El cálculo es simple (precio dividido ganancia por acción: 50/5 = 10), pero lo importante es la interpretación: el P/E te dice cuántos 'años de ganancia actual' estás pagando por la acción, en términos relativos. Un P/E de 10 no es ni 'bueno' ni 'malo' en el vacío: hay que compararlo con el sector y con el crecimiento esperado de la empresa."
  },
  {
    "id": "RV-MC-008",
    "categoria": "Renta Variable",
    "subtema": "P/E alto vs bajo",
    "dificultad": "intermedia",
    "tipo": "multiple_choice",
    "enunciado": "Un cliente ve que una acción tiene P/E de 50 y te pregunta: '¿eso es malo? ¿Debería evitarla?' ¿Cuál es la respuesta más completa?",
    "opciones": [
      "El P/E de 50 garantiza que la empresa va a quebrar en el corto plazo, sin importar cuál sea el sector, el crecimiento esperado, ni ningún otro dato de su balance, de su flujo de caja o de su posición competitiva dentro del mercado en el que opera actualmente frente a sus competidores directos",
      "No necesariamente: un P/E alto suele reflejar que el mercado tiene expectativas altas de crecimiento futuro, pero también implica mayor riesgo si esas expectativas no se cumplen; hay que evaluarlo en el contexto del sector y del crecimiento esperado de la empresa, no de forma aislada",
      "Sí, un P/E de 50 siempre significa que hay que evitar la acción, sin importar el sector, el crecimiento esperado, ni ningún otro factor cualitativo del negocio ni de su posición competitiva",
      "Un P/E alto siempre es mejor que uno bajo, sin excepción, porque refleja que el mercado confía más en esa empresa que en cualquier otra del mismo sector, sin importar sus fundamentos reales"
    ],
    "respuesta_correcta": 1,
    "explicacion": "Un P/E alto no es automáticamente una señal negativa: empresas de alto crecimiento (tecnología, por ejemplo) suelen cotizar con múltiplos más altos que empresas maduras, porque el mercado paga hoy por las ganancias futuras esperadas. El riesgo está en que, si ese crecimiento no se concreta, el precio puede ajustarse fuerte a la baja. La respuesta correcta evita el extremo de 'siempre evitar' o 'siempre comprar' solo por un número."
  },
  {
    "id": "RV-MC-009",
    "categoria": "Renta Variable",
    "subtema": "P/E comparado con el sector",
    "dificultad": "intermedia",
    "tipo": "multiple_choice",
    "enunciado": "Una empresa autopartista (ACME) tiene P/E de 8, mientras que el promedio de sus competidores directos del sector es 12. ¿Qué conclusión es la más razonable?",
    "opciones": [
      "ACME está relativamente más barata en términos de múltiplo, pero antes de concluir que es una oportunidad hay que preguntarse si existe una razón de fondo (riesgo particular, menor crecimiento esperado) que justifique ese descuento frente a sus pares",
      "El P/E de ACME está mal calculado, debería ser igual al promedio del sector, ya que todas las empresas de un mismo sector deberían cotizar exactamente al mismo múltiplo de ganancias sin excepción alguna, sin importar su tamaño ni su posición competitiva",
      "ACME definitivamente es una mejor inversión sin ninguna duda, solamente por tener un múltiplo más bajo que el promedio de sus competidores directos, sin necesidad de mirar ningún otro dato del negocio",
      "No tiene sentido comparar el P/E entre empresas distintas, ya que cada empresa tiene una estructura de negocio completamente única e incomparable con la de sus competidores directos del sector"
    ],
    "respuesta_correcta": 0,
    "explicacion": "El método de comparables (mirar el P/E relativo al sector) es una herramienta útil, pero no una conclusión automática. Un P/E más bajo que el promedio puede reflejar una oportunidad real, o puede reflejar que el mercado ya conoce un problema específico de esa empresa (mayor riesgo, menor crecimiento esperado, alguna debilidad competitiva). El análisis cuantitativo siempre debería complementarse con una pregunta cualitativa: ¿por qué el mercado valora distinto a esta empresa?"
  },
  {
    "id": "RV-MC-010",
    "categoria": "Renta Variable",
    "subtema": "ROE",
    "dificultad": "intermedia",
    "tipo": "multiple_choice",
    "enunciado": "Una empresa tiene ROE (Return on Equity) de 25%, mientras que otra del mismo sector tiene ROE de 6%. En principio, ¿qué te dice esto sobre la eficiencia de cada una?",
    "opciones": [
      "El ROE solo aplica a bancos, no a otras industrias, ya que el resto de los sectores utiliza indicadores de rentabilidad completamente distintos y no comparables entre sí bajo ningún criterio contable reconocido internacionalmente por los organismos reguladores de cada mercado local o regional",
      "La primera empresa genera, en relación a su patrimonio, mucho más beneficio que la segunda, lo cual sugiere un uso más eficiente del capital propio de los accionistas; aunque conviene revisar también el nivel de deuda, porque una empresa muy endeudada puede mostrar un ROE artificialmente alto",
      "Un ROE más alto siempre significa menor riesgo para el accionista, sin importar cómo esté financiada la estructura de capital ni cuánta deuda tenga tomada la empresa en su balance",
      "Nada, el ROE no mide eficiencia, sino que es simplemente un indicador contable sin ninguna aplicación práctica para el análisis de rentabilidad de una empresa frente a sus competidores"
    ],
    "respuesta_correcta": 1,
    "explicacion": "El ROE mide cuánta ganancia genera la empresa por cada peso de patrimonio de los accionistas, así que en general un ROE más alto indica mejor uso del capital propio. Pero hay un matiz importante: una empresa puede inflar artificialmente su ROE tomando mucha deuda (lo cual reduce el patrimonio relativo y aumenta el ROE), así que siempre conviene mirar el ROE junto con el nivel de endeudamiento para no llevarse una idea distorsionada de la eficiencia real."
  },
  {
    "id": "RV-MC-011",
    "categoria": "Renta Variable",
    "subtema": "Márgenes y eficiencia",
    "dificultad": "basica",
    "tipo": "multiple_choice",
    "enunciado": "Una empresa muestra que sus ingresos crecieron 20% este año, pero su margen neto (ganancia neta sobre ventas) bajó respecto al año anterior. ¿Qué podría estar indicando esto?",
    "opciones": [
      "Que la empresa definitivamente está quebrando en el corto plazo, sin importar el resto de los indicadores de su balance ni la evolución reciente de sus ventas totales",
      "Que, aunque vende más, está ganando proporcionalmente menos por cada peso vendido; puede deberse a mayores costos, descuentos para ganar mercado, o inversión en crecimiento, y conviene indagar la causa antes de sacar una conclusión",
      "Que el margen neto no tiene ninguna relación con la rentabilidad de una empresa, sino que mide únicamente un dato contable sin aplicación práctica para el análisis financiero real de ningún tipo de negocio, sea grande, mediano o pequeño",
      "Que la empresa dejó de vender productos, lo cual explicaría cualquier variación en sus indicadores financieros de este año y también de los años que vienen"
    ],
    "respuesta_correcta": 1,
    "explicacion": "Crecer en ventas y al mismo tiempo perder margen es una señal mixta que merece indagación: puede ser una mala señal (costos descontrolados, competencia agresiva en precios) o una decisión estratégica razonable (invertir en expansión, ganar mercado con menor margen transitorio). El asesor no debería sacar una conclusión automática solo con ese dato, sino entender la historia detrás de los números."
  },
  {
    "id": "RV-MC-012",
    "categoria": "Renta Variable",
    "subtema": "Nivel de deuda / apalancamiento",
    "dificultad": "intermedia",
    "tipo": "multiple_choice",
    "enunciado": "Una empresa tiene una deuda neta equivalente a 6 veces su ganancia operativa anual (deuda neta/EBITDA = 6x). ¿Cómo interpretás ese número?",
    "opciones": [
      "Ese ratio no tiene relación con el riesgo de la empresa, sino que es simplemente un dato contable adicional sin ninguna utilidad práctica para el análisis crediticio de la firma ni para evaluar su capacidad de pago",
      "Es un nivel de endeudamiento bajo y tranquilizador, comparable al de cualquier empresa sólida y con buena salud financiera dentro de su mismo sector de actividad",
      "Es un nivel de endeudamiento alto: tardaría aproximadamente 6 años de ganancia operativa completa en pagar su deuda neta, lo cual la hace más vulnerable ante subas de tasas de interés o caídas de ingresos",
      "Significa que la empresa no tiene ninguna deuda, y que ese número refleja simplemente su capacidad total de generar ganancias operativas año tras año, sin ninguna relación con su nivel de pasivos financieros"
    ],
    "respuesta_correcta": 2,
    "explicacion": "Deuda neta/EBITDA por encima de 3-4 veces suele considerarse un nivel elevado de apalancamiento. Un ratio de 6x indica que la empresa está significativamente endeudada en relación a su capacidad de generar ganancias operativas, lo que la vuelve más frágil ante shocks (suba de tasas, caída de ventas). Es un indicador clave para advertirle a un cliente sobre el riesgo financiero de una empresa, más allá de cuán atractivo luzca su negocio."
  },
  {
    "id": "RV-CASO-001",
    "categoria": "Renta Variable",
    "subtema": "Comunicación de valuación al cliente (caso Apple)",
    "dificultad": "intermedia",
    "tipo": "caso_abierto",
    "enunciado": "Un cliente te pregunta: '¿Vale la pena invertir en Apple?'. Sabés que Apple tiene márgenes muy altos, poca deuda neta, ROE elevado, pero cotiza con un P/E alto respecto al promedio del mercado (alrededor de 25-30x). Redactá en 4-5 líneas una respuesta que combine los fundamentos positivos con el matiz de la valuación exigente, evitando un simple 'sí' o 'no'.",
    "respuesta_modelo": "Una buena respuesta debería: (1) mencionar los fundamentos sólidos (márgenes altos, baja deuda, alta rentabilidad sobre el capital), (2) aclarar que la acción no está 'barata' en términos de múltiplo de ganancias, porque el mercado ya está pagando hoy por el crecimiento futuro esperado, (3) explicar el riesgo asociado: si ese crecimiento no se concreta al ritmo esperado, el precio podría ajustarse a la baja, (4) evitar una recomendación binaria tajante, ofreciendo en cambio una lectura matizada que el cliente pueda usar para decidir según su propio perfil y horizonte."
  },
  {
    "id": "RV-CASO-002",
    "categoria": "Renta Variable",
    "subtema": "Comunicación de valuación al cliente (caso YPF)",
    "dificultad": "avanzada",
    "tipo": "caso_abierto",
    "enunciado": "Un cliente nota que YPF cotiza con un P/E más bajo que otras petroleras latinoamericanas comparables y pregunta: '¿Entonces YPF está barata, conviene comprar?'. Sabés que YPF tiene un nivel de deuda relativamente alto y opera en un contexto regulatorio particular (Argentina). Redactá en 4-5 líneas una respuesta equilibrada.",
    "respuesta_modelo": "Una buena respuesta debería: (1) reconocer el dato objetivo (P/E más bajo que comparables regionales puede sugerir, en principio, que está relativamente barata), (2) inmediatamente matizar con el contexto: el descuento puede explicarse por factores de riesgo específicos como mayor nivel de deuda y la exposición al contexto regulatorio y macroeconómico argentino, que limitan su potencial relativo frente a pares de otros países, (3) evitar la conclusión automática de 'barata = comprar', invitando a pensar en si esos riesgos adicionales están justificadamente compensados por el descuento de valuación, (4) relacionar la decisión con el perfil de riesgo del cliente, no solo con el número de P/E."
  },
  {
    "id": "RV-MC-013",
    "categoria": "Renta Variable",
    "subtema": "Indicadores adicionales (P/B, EV/EBITDA)",
    "dificultad": "avanzada",
    "tipo": "multiple_choice",
    "enunciado": "Un banco cotiza con un ratio Precio/Valor Libro (P/B) menor a 1. ¿Qué podría estar reflejando esto?",
    "opciones": [
      "Que el banco definitivamente va a quebrar mañana, y que conviene recomendarle al cliente vender esa posición de forma inmediata sin analizar ningún otro dato del balance ni del contexto macroeconómico, regulatorio y competitivo del momento actual",
      "Que el banco no tiene ningún activo registrado en su balance, lo cual explicaría directamente por qué el mercado le asigna tan poco valor a la acción en este momento del ciclo",
      "Que el P/B siempre debe ser menor a 1 para empresas financieras, a diferencia de otros sectores donde ese ratio típicamente se ubica muy por encima de 1 sin ninguna excepción posible, dada la naturaleza propia del negocio bancario y su forma particular de generar utilidades para los accionistas",
      "Que el mercado está valuando la acción por debajo de su patrimonio contable, lo cual puede deberse a desconfianza sobre la calidad de esos activos o expectativas de menor rentabilidad futura, aunque también podría señalar una oportunidad si el mercado está siendo excesivamente pesimista"
    ],
    "respuesta_correcta": 3,
    "explicacion": "El P/B compara el valor de mercado con el valor contable del patrimonio. Un P/B por debajo de 1 (frecuente en algunos bancos en momentos de crisis o desconfianza) indica que el mercado le pone menos valor a la empresa del que figura en sus libros contables, lo cual puede reflejar dudas legítimas sobre la calidad de esos activos, o puede ser una oportunidad si el pesimismo del mercado resulta exagerado. Como con el P/E, no es una señal automática en ningún sentido."
  },
  {
    "id": "RV-MC-014",
    "categoria": "Renta Variable",
    "subtema": "Flujo de caja vs ganancia contable",
    "dificultad": "avanzada",
    "tipo": "multiple_choice",
    "enunciado": "Una empresa en crecimiento muestra ganancias contables positivas, pero su flujo de caja operativo es negativo (consume más efectivo del que genera). ¿Por qué esto debería llamar la atención del asesor?",
    "opciones": [
      "Porque la ganancia contable puede no reflejar la salud real del negocio en términos de efectivo disponible; si esta situación no se revierte, puede ser insostenible a mediano plazo, sin importar lo que digan las ganancias en el papel",
      "Porque significa automáticamente que la empresa está cometiendo fraude contable, y que conviene reportarlo de inmediato a los organismos de control correspondientes sin analizar ningún otro dato del balance ni del contexto del negocio",
      "El flujo de caja y la ganancia contable son siempre exactamente iguales, ya que ambos conceptos miden la misma cosa desde ángulos distintos del mismo balance contable anual",
      "No debería llamar la atención, la ganancia contable es lo único relevante, sin necesidad de mirar ningún otro indicador financiero de la empresa ni el detalle de su flujo de caja"
    ],
    "respuesta_correcta": 0,
    "explicacion": "Es un punto sutil pero importante, especialmente en empresas de alto crecimiento o startups: pueden mostrar ganancias contables modestas (o incluso positivas por motivos contables específicos) mientras consumen mucho efectivo real en su operación. Si esa dinámica no se revierte con el tiempo, la empresa puede tener problemas de sostenibilidad financiera, independientemente de lo que muestre la línea de 'ganancia neta' del estado de resultados."
  },
  {
    "id": "RV-MC-015",
    "categoria": "Renta Variable",
    "subtema": "Riesgo de concentración en una sola acción",
    "dificultad": "basica",
    "tipo": "multiple_choice",
    "enunciado": "Un cliente entusiasta quiere poner una parte muy grande de su cartera en una sola acción 'porque está segurísimo de que va a subir'. Más allá del análisis fundamental de la empresa, ¿qué riesgo adicional siempre existe en una posición muy concentrada?",
    "opciones": [
      "Ninguno, si el análisis fundamental es bueno no hay riesgo, sin importar cuán concentrada quede la cartera total del cliente en esa única empresa a lo largo del tiempo",
      "Comprar una sola acción elimina el riesgo de mercado por completo, dejando al inversor expuesto únicamente a movimientos generales sin ningún riesgo adicional propio de esa empresa en particular, siempre que la posición se mantenga en el largo plazo",
      "El riesgo específico de esa empresa (cambios regulatorios, problemas de gestión, eventos imprevistos) impacta de lleno en un patrimonio muy concentrado, mientras que en una cartera diversificada ese mismo evento tendría un efecto mucho más acotado",
      "El riesgo de concentración solo existe en bonos, no en acciones, ya que las acciones individuales no tienen ningún riesgo específico propio de la empresa que las emite en ningún caso"
    ],
    "respuesta_correcta": 2,
    "explicacion": "Ningún análisis fundamental, por más sólido que sea, elimina el riesgo de eventos imprevistos específicos de una empresa (cambios regulatorios, escándalos, problemas de gestión, shocks sectoriales). La concentración amplifica el impacto de esos eventos en el patrimonio total del cliente. Es un argumento que conviene tener siempre a mano, incluso frente a una empresa que parece 'una inversión segura'."
  },
  {
    "id": "RV-MC-016",
    "categoria": "Renta Variable",
    "subtema": "P/E negativo o no aplicable",
    "dificultad": "intermedia",
    "tipo": "multiple_choice",
    "enunciado": "Un cliente pregunta por qué no puede calcular el P/E de una empresa que tuvo pérdidas el último año. ¿Cuál es la explicación correcta?",
    "opciones": [
      "El P/E pierde sentido (resulta negativo o no se calcula) cuando la empresa tiene pérdidas, porque el ratio compara precio con ganancia y una ganancia negativa distorsiona la interpretación; en esos casos conviene usar otros indicadores (como ventas, flujo de caja o comparables sectoriales)",
      "Las empresas con pérdidas no pueden cotizar en bolsa, así que ese caso puntual no debería estar disponible para operar en el mercado bursátil argentino bajo ninguna circunstancia",
      "El P/E solo aplica a empresas tecnológicas, ya que el resto de los sectores utiliza métricas de valuación completamente distintas y no comparables entre sí bajo ningún criterio financiero reconocido por los analistas del mercado local e internacional que siguen de cerca a este tipo particular de empresas",
      "Se puede calcular normalmente, el P/E nunca tiene problemas con pérdidas, dando siempre un número interpretable sin importar el resultado del último año ni la tendencia de la empresa"
    ],
    "respuesta_correcta": 0,
    "explicacion": "Es una limitación práctica importante del P/E: cuando la ganancia es negativa, el ratio deja de ser interpretable de forma directa. En esos casos (común en empresas en etapa de fuerte inversión o en crisis puntuales), conviene recurrir a otros indicadores de valuación (ventas, EV/EBITDA si el EBITDA es positivo, flujo de caja) para no quedarse sin herramientas de análisis."
  },
  {
    "id": "RV-MC-017",
    "categoria": "Renta Variable",
    "subtema": "Beta y riesgo relativo",
    "dificultad": "avanzada",
    "tipo": "multiple_choice",
    "enunciado": "Una acción tiene un beta de 1,5 respecto al índice de mercado. ¿Qué implica esto, en términos simples, para un cliente conservador?",
    "opciones": [
      "Que la acción tiende a moverse, en promedio, con mayor amplitud que el mercado general (tanto al alza como a la baja); un beta de 1,5 sugiere mayor volatilidad relativa, lo cual puede no ser adecuado para un perfil muy conservador",
      "Que la acción nunca puede bajar de precio, ya que un beta positivo garantiza que el activo solamente se mueve al alza junto con el resto del mercado en cualquier escenario",
      "Que la acción es completamente independiente del mercado general, sin ninguna relación entre su comportamiento y el del índice de referencia utilizado para calcular ese beta",
      "Que el beta mide exclusivamente el nivel de dividendos que paga la empresa, y no tiene ninguna relación con la volatilidad del precio de la acción en el mercado en el que cotiza habitualmente todos los días hábiles de cada semana bursátil"
    ],
    "respuesta_correcta": 0,
    "explicacion": "El beta es una medida de volatilidad relativa al mercado: un beta mayor a 1 indica que la acción amplifica los movimientos del mercado general (sube más en las subas, pero también cae más en las bajas). Para un cliente conservador, una cartera con muchas acciones de beta alto puede generar más sobresaltos de los que está dispuesto a tolerar, incluso si los fundamentos de esas empresas son sólidos."
  },
  {
    "id": "RV-CASO-003",
    "categoria": "Renta Variable",
    "subtema": "Interpretar ingresos vs ganancia",
    "dificultad": "intermedia",
    "tipo": "caso_abierto",
    "enunciado": "Un cliente te dice: 'Vi que la empresa XYZ tuvo un aumento de ingresos muy grande este año, pero su ganancia neta bajó. ¿Eso es malo?' Redactá en 3-4 líneas una respuesta fundamentada, sin afirmar categóricamente que es bueno o malo sin más contexto.",
    "respuesta_modelo": "Una buena respuesta debería: (1) explicar que crecer en ingresos mientras la ganancia baja no es automáticamente negativo, puede deberse a mayores costos, inversión en expansión, o presión competitiva, (2) señalar que conviene mirar el margen (ganancia sobre ventas) para entender si la rentabilidad relativa se deterioró estructuralmente o es algo puntual, (3) invitar a indagar la causa específica (¿son costos que se pueden controlar? ¿es una inversión con retorno esperado a futuro?) antes de sacar una conclusión definitiva sobre si es 'bueno' o 'malo'."
  },
  {
    "id": "RV-MC-018",
    "categoria": "Renta Variable",
    "subtema": "Liquidez de CEDEARs y acciones locales",
    "dificultad": "intermedia",
    "tipo": "multiple_choice",
    "enunciado": "Un cliente quiere invertir un monto importante en una acción local de baja liquidez (poco volumen operado diariamente). ¿Qué deberías advertirle antes de avanzar?",
    "opciones": [
      "Que la liquidez solo importa al momento de vender, nunca al comprar, ya que las órdenes de compra nunca generan ningún impacto sobre el precio de mercado vigente en ese momento",
      "Que es imposible comprar acciones de baja liquidez bajo cualquier circunstancia, así que conviene descartar esa alternativa por completo para el cliente sin analizar otras opciones disponibles",
      "Que en activos de baja liquidez, una orden grande puede mover el precio significativamente en contra (impacto de mercado), por lo que conviene fraccionar la operación en tramos o usar órdenes límite en vez de ir todo de una vez a mercado",
      "Nada, la liquidez no afecta a las acciones, solo a los bonos, ya que el mercado accionario siempre tiene suficiente profundidad para cualquier monto que quiera operar el cliente en cualquier momento del día o de la rueda bursátil local vigente"
    ],
    "respuesta_correcta": 2,
    "explicacion": "El mismo concepto de profundidad de caja de puntas e impacto de mercado que se aplica a renta fija, aplica también a acciones poco líquidas. Para un cliente con un monto relevante respecto al volumen habitual del activo, conviene anticipar ese riesgo y proponer una ejecución fraccionada o con órdenes límite, en vez de una orden grande a mercado que puede terminar ejecutándose a precios bastante peores de los esperados."
  },
  {
    "id": "RV-MC-019",
    "categoria": "Renta Variable",
    "subtema": "Crecimiento vs valor (estilos de inversión)",
    "dificultad": "avanzada",
    "tipo": "multiple_choice",
    "enunciado": "Un cliente pregunta la diferencia entre invertir en 'empresas de crecimiento' y 'empresas de valor'. ¿Cuál es una buena distinción simple?",
    "opciones": [
      "Las empresas de crecimiento siempre son más seguras que las de valor, ya que su expansión constante las protege de cualquier caída fuerte de precio en momentos de crisis financiera o cambiaria",
      "Las empresas de crecimiento suelen tener múltiplos de valuación más altos porque el mercado paga por expectativas de expansión futura de ingresos y ganancias, mientras que las empresas de valor suelen cotizar a múltiplos más bajos en relación a sus fundamentos actuales, a veces por estar fuera de moda o en sectores más maduros",
      "Las empresas de valor nunca generan ganancias, a diferencia de las empresas de crecimiento que siempre son rentables desde el primer año de cotización en bolsa sin ninguna excepción, porque el mercado exige rentabilidad inmediata a cualquier empresa que decide salir a cotizar públicamente ante los inversores institucionales y minoristas",
      "Son exactamente lo mismo, solo cambia el nombre del estilo que usa cada gestor de fondos según su propia preferencia personal y la escuela de inversión en la que se formó originalmente"
    ],
    "respuesta_correcta": 1,
    "explicacion": "Es una distinción clásica en el análisis de acciones: 'crecimiento' (growth) se enfoca en empresas con expectativas de expansión acelerada (suelen tener P/E más altos), mientras que 'valor' (value) busca empresas que cotizan baratas en relación a sus fundamentos actuales, muchas veces en sectores más maduros o temporalmente desfavorecidos. Ninguno de los dos estilos es 'mejor' de forma absoluta: dependen del contexto de mercado y del perfil del cliente."
  },
  {
    "id": "RV-MC-020",
    "categoria": "Renta Variable",
    "subtema": "Comparables sectoriales - matiz cualitativo",
    "dificultad": "avanzada",
    "tipo": "multiple_choice",
    "enunciado": "Al comparar el P/E de una empresa con el promedio de su sector, ¿por qué no alcanza con quedarte solo con el número, según el criterio profesional que debería aplicar un asesor?",
    "opciones": [
      "Porque el número aislado no explica el 'por qué' de la diferencia: hace falta indagar si hay una razón cualitativa de fondo (riesgo regulatorio, calidad de management, posición competitiva, crecimiento esperado) que justifique que esa empresa cotice distinto a sus pares",
      "Porque el P/E del sector cambia todos los días y no sirve de referencia, así que conviene ignorarlo por completo al momento de tomar cualquier decisión de inversión con el cliente, sin importar el horizonte temporal ni el perfil de riesgo particular que tenga planteado para su cartera",
      "Porque el P/E del sector siempre está mal calculado, debido a errores metodológicos habituales en cómo se agregan los datos de las empresas que lo componen en cada informe sectorial",
      "Porque comparar empresas entre sí nunca tiene sentido, ya que cada negocio es completamente único e imposible de contrastar con otro, incluso dentro del mismo sector de actividad económica y con modelos de negocio parecidos"
    ],
    "respuesta_correcta": 0,
    "explicacion": "Esta es una de las ideas centrales del análisis fundamental aplicado: los números cuantitativos (como el P/E relativo) son el punto de partida, no la conclusión. El criterio profesional del asesor está en poder explicar el 'por qué' detrás de la diferencia con comparables, combinando el dato numérico con una lectura cualitativa del negocio y su contexto."
  },
  {
    "id": "RV-MC-021",
    "categoria": "Renta Variable",
    "subtema": "Dividend yield",
    "dificultad": "basica",
    "tipo": "multiple_choice",
    "enunciado": "Un cliente que busca ingresos periódicos (no solo apreciación de capital) pregunta qué mirar en una acción para ese objetivo. ¿Qué indicador es más relevante para él?",
    "opciones": [
      "El dividend yield (rendimiento por dividendo), que muestra qué porcentaje anual del precio de la acción representa el dividendo distribuido, dando una idea del 'ingreso' que genera la inversión más allá de la posible suba de precio",
      "El P/E exclusivamente, ignorando todo lo demás, ya que ese único indicador ya contempla el nivel de ingresos que genera la inversión para ese tipo de cliente en particular",
      "El beta de la acción, sin mirar ningún otro dato, ya que ese indicador por sí solo permite anticipar el ingreso periódico que va a recibir el cliente cada año calendario",
      "Ningún indicador es relevante para ese objetivo, porque no existe ninguna forma de estimar de antemano el ingreso que va a generar una acción a lo largo del tiempo invertido, ni siquiera revisando su historial completo de pagos previos"
    ],
    "respuesta_correcta": 0,
    "explicacion": "Para un cliente que prioriza generar ingresos periódicos (en vez de apostar únicamente a la apreciación del precio), el dividend yield es un indicador directamente relevante: le permite comparar distintas acciones en términos de cuánto 'flujo' generan anualmente en relación al capital invertido, de forma similar a como compararía el cupón de un bono."
  },
  {
    "id": "TRAMPA-MC-001",
    "categoria": "Preguntas Trampa",
    "subtema": "Riesgo-retorno / promesas imposibles",
    "dificultad": "basica",
    "tipo": "multiple_choice",
    "enunciado": "Un cliente te reclama: 'Quiero ganar un 20% anual en dólares sin ningún riesgo. ¿Qué me garantizás eso?' ¿Cuál es la respuesta correcta?",
    "opciones": [
      "Ofrecerle el instrumento que más rinde en ese momento, sin aclarar nada más, confiando en que ese rendimiento se va a sostener sin ningún riesgo adicional, porque viene rindiendo así de forma estable durante los últimos meses, sin ningún sobresalto que haga pensar lo contrario",
      "Explicarle que, en un mercado razonablemente eficiente, un retorno alto sin riesgo simplemente no existe: si algo promete mucho rendimiento 'garantizado', hay que sospechar, porque el riesgo (de crédito, de mercado, de liquidez) siempre está presente en alguna forma",
      "Decirle que sí existe, y ofrecerle un producto cualquiera para cerrar la venta, priorizando cerrar la operación por sobre explicarle honestamente el riesgo real",
      "Cambiar de tema para no contestar la pregunta, evitando cualquier compromiso concreto frente al pedido del cliente, porque es preferible no dejar nada por escrito que después se interprete como una promesa formal"
    ],
    "respuesta_correcta": 1,
    "explicacion": "Esta pregunta aparece muy seguido y la tentación es 'encontrar algo' para satisfacer al cliente. Pero la relación riesgo-retorno no es negociable: no existe rentabilidad alta garantizada sin riesgo en un mercado competitivo. Es mejor educar al cliente en este punto desde el principio que generar expectativas que después no se van a cumplir, lo cual daña mucho más la relación a largo plazo."
  },
  {
    "id": "TRAMPA-MC-002",
    "categoria": "Preguntas Trampa",
    "subtema": "Sesgo de 'todo el mundo lo compra'",
    "dificultad": "basica",
    "tipo": "multiple_choice",
    "enunciado": "Un cliente te dice: 'Pero todo el mundo está comprando esta acción, ¿por qué yo no?' ¿Cuál es la mejor forma de responder?",
    "opciones": [
      "Ignorar la pregunta y cambiar de tema, sin dedicar tiempo a explicarle por qué ese razonamiento puede ser riesgoso, porque total el cliente ya tomó su decisión y no vale la pena discutirla",
      "Explicar que la popularidad de un activo no es, por sí sola, una razón de inversión: conviene preguntarse por qué está de moda, si los fundamentos sostienen ese entusiasmo, y cómo encajaría en su cartera particular, en vez de seguir a la masa sin análisis propio",
      "Decirle que está equivocado y que nunca debería comprar esa acción, sin analizar primero si los fundamentos del negocio realmente justifican el entusiasmo, y aprovechar para venderle otra cosa distinta mientras tiene la guardia baja por la corrección y sin necesidad de revisar ningún dato adicional del negocio antes de emitir esa opinión tan tajante frente al cliente",
      "Comprarla de inmediato porque 'todo el mundo' tiene razón, ya que la popularidad de un activo es, por sí sola, garantía suficiente de que es una buena inversión"
    ],
    "respuesta_correcta": 1,
    "explicacion": "El argumento de 'todo el mundo lo compra' es un sesgo de comportamiento (efecto manada) muy común y muy peligroso, porque suele aparecer justo en los picos de entusiasmo del mercado. No significa que haya que negarse de plano, sino redirigir la conversación hacia el análisis propio: ¿por qué está de moda?, ¿los fundamentos sostienen ese precio?, ¿cómo encaja en SU cartera particular?"
  },
  {
    "id": "TRAMPA-MC-003",
    "categoria": "Preguntas Trampa",
    "subtema": "Yield alto como señal positiva sin matices",
    "dificultad": "intermedia",
    "tipo": "multiple_choice",
    "enunciado": "Un cliente ve dos bonos similares: uno rinde 8% y otro rinde 14%. Te dice: 'Dame el que más rinde, ¿para qué complicarse?' ¿Qué le respondés?",
    "opciones": [
      "Que no hay ninguna diferencia entre ambos bonos más allá del rendimiento, así que la única variable relevante para decidir es directamente el número más alto que muestra la pantalla en ese momento",
      "Que el rendimiento más alto siempre es un error de cálculo de la plataforma, que conviene reportar antes de considerar cualquier operación, ya que ningún bono real puede pagar tanto más que uno comparable",
      "Que un rendimiento mucho más alto en un instrumento similar generalmente refleja mayor riesgo percibido por el mercado (de crédito, liquidez o estructura), no es 'plata gratis'; antes de elegir, hay que entender por qué ese bono rinde tanto más",
      "Tiene razón, siempre hay que elegir el que más rinde, sin necesidad de preguntarse nunca por qué un instrumento rinde más que otro similar, ya que cuestionar el criterio del mercado no es tarea de un asesor financiero y menos todavía frente a un cliente que ya tomó su decisión con seguridad y no está pidiendo ninguna opinión adicional al respecto"
    ],
    "respuesta_correcta": 2,
    "explicacion": "Si dos instrumentos parecidos rinden muy distinto, el mercado está señalando algo: mayor riesgo de default, menor liquidez, alguna característica estructural particular. 'El que más rinde' sin entender por qué rinde tanto es la forma más común en que clientes (y asesores nuevos) terminan tomando riesgo de crédito sin saberlo. Siempre hay que indagar el origen de ese spread antes de recomendar."
  },
  {
    "id": "TRAMPA-MC-004",
    "categoria": "Preguntas Trampa",
    "subtema": "CER como protección absoluta",
    "dificultad": "intermedia",
    "tipo": "multiple_choice",
    "enunciado": "Un cliente afirma con total seguridad: 'El CER me cubre perfecto de la inflación, ¿no?' ¿Cuál es la corrección más importante?",
    "opciones": [
      "Confirmarle que tiene toda la razón, sin matices, ya que el ajuste por CER elimina por completo cualquier posibilidad de pérdida para quien invierte en ese tipo de instrumento",
      "Decirle que solo cubre la mitad de la inflación, siempre, sin importar cuál sea el precio de entrada ni las condiciones específicas del bono que esté considerando comprar",
      "Decirle que el CER no tiene ninguna relación con la inflación, y que el nombre del instrumento hace referencia a otra variable económica distinta, así que no vale la pena explicar en detalle cómo se calcula mes a mes y que además conviene evitar cualquier pregunta de seguimiento del cliente sobre cómo funciona realmente ese mecanismo de ajuste",
      "Aclarar que el CER indexa el capital según el IPC, pero el rendimiento final del cliente depende también del precio al que entró (la tasa real que está pagando o cobrando) y del riesgo del emisor; no es una cobertura 'perfecta' automática"
    ],
    "respuesta_correcta": 3,
    "explicacion": "Es de las confusiones más frecuentes: tratar el CER como un seguro perfecto e infalible. La indexación cumple su función sobre el capital nominal, pero el resultado final del inversor también depende de la tasa real implícita en el precio de entrada y del riesgo del emisor del bono. 'Cubre' no es lo mismo que 'garantiza ganar' en cualquier escenario."
  },
  {
    "id": "TRAMPA-MC-005",
    "categoria": "Preguntas Trampa",
    "subtema": "Bono dual como combo sin contrapartida",
    "dificultad": "avanzada",
    "tipo": "multiple_choice",
    "enunciado": "Un cliente concluye: 'Si el bono dual paga lo mejor entre dos opciones, entonces gano siempre, ¿no?' ¿Qué matiz le falta?",
    "opciones": [
      "Tiene razón, no hay ninguna contra, porque el mercado nunca le pone precio a ese tipo de cobertura combinada entre dos referencias distintas de rendimiento",
      "Que los bonos duales nunca pagan nada, ya que la combinación de dos referencias distintas anula cualquier tipo de pago al inversor, sin excepción alguna en ningún escenario de mercado",
      "Que esa 'opción de pagar lo mejor' tiene un costo implícito que el mercado descuenta en el precio (reduciendo el rendimiento esperado), y que el bono sigue teniendo riesgo de precio, liquidez y crédito según el caso; no es una ganancia garantizada sin contrapartida",
      "Que 'dual' significa que paga el doble de cupón respecto a un bono tradicional de las mismas características y plazo, así que conviene recomendarlo por sobre cualquier alternativa comparable sin analizar nada más al respecto y sin necesidad de aclararle al cliente que ese supuesto beneficio adicional no tiene ningún costo implícito escondido en el precio"
    ],
    "respuesta_correcta": 2,
    "explicacion": "Tratar la opcionalidad como gratuita es un error de razonamiento común. El mercado le pone precio a esa cobertura doble, así que cuando todos quieren ese instrumento, su rendimiento esperado se comprime. Además, sigue existiendo riesgo de precio de mercado, liquidez y crédito como en cualquier otro bono: 'paga lo mejor entre dos' reduce cierto riesgo específico, pero no elimina todos los riesgos."
  },
  {
    "id": "TRAMPA-MC-006",
    "categoria": "Preguntas Trampa",
    "subtema": "Caída de precio de un FCI interpretada como estafa",
    "dificultad": "basica",
    "tipo": "multiple_choice",
    "enunciado": "Un cliente te dice indignado: 'No quiero más fondos comunes, el otro día vi que bajó el valor de la cuotaparte. ¿Me estafaron?' ¿Cuál es la mejor respuesta?",
    "opciones": [
      "Sí, probablemente hubo un error o una estafa por parte de la sociedad gerente que administra ese fondo común de inversión, y conviene denunciarlo de inmediato ante los organismos de control",
      "Que los fondos comunes nunca pueden bajar de valor, ya que su estructura los protege completamente de cualquier caída del mercado, sin importar qué activos tengan adentro en cada momento",
      "Que la baja en el valor de la cuotaparte refleja simplemente la caída de los activos que componen el fondo en ese momento (el fondo 'es' lo que tiene adentro), no una estafa; así como puede bajar, también puede subir, según se mueva el mercado subyacente",
      "Que la cuotaparte solo baja si hay un fraude del administrador, y que mientras tanto conviene tranquilizar al cliente diciéndole que su reclamo ya está siendo investigado internamente por la sociedad gerente sin necesidad de mostrarle a esa altura ningún dato concreto sobre la composición real de los activos que forman parte de ese fondo"
    ],
    "respuesta_correcta": 2,
    "explicacion": "Es una confusión muy común en clientes nuevos en fondos: no entienden que el fondo es simplemente un 'paquete' de activos, y que su valor sube y baja según el desempeño de esos activos subyacentes, igual que si los tuviera comprados directamente. No hay ninguna 'rentabilidad mágica constante' en un fondo: refleja el mercado, para bien y para mal."
  },
  {
    "id": "TRAMPA-MC-007",
    "categoria": "Preguntas Trampa",
    "subtema": "Diversificar = tener varias cuentas bancarias",
    "dificultad": "basica",
    "tipo": "multiple_choice",
    "enunciado": "Un cliente pregunta: '¿Diversificar significa abrir muchas cuentas en distintos bancos?' ¿Cuál es la aclaración correcta?",
    "opciones": [
      "No, diversificar no tiene ninguna relación con reducir riesgo, sino que es simplemente una forma de organizar administrativamente el dinero del cliente entre distintas cuentas bancarias, algo prolijo de hacer pero sin ningún beneficio real más allá de ese orden administrativo, y que no cambia en nada la exposición real del patrimonio ante una caída puntual del mercado",
      "Diversificar es lo mismo que ahorrar en distintas monedas exclusivamente, sin necesidad de considerar ningún otro tipo de activo o sector económico, y por eso alcanza con mirar únicamente el número de monedas distintas que aparecen en la cartera",
      "No: diversificar se refiere a distribuir las inversiones entre distintos activos, sectores o monedas para reducir el riesgo de que un solo evento afecte todo el patrimonio; tener cuentas en distintos bancos no diversifica la inversión en sí misma, aunque puede tener sentido por otras razones (como límites de seguro de depósitos)",
      "Sí, exactamente eso es diversificar, ya que repartir el dinero entre distintas entidades bancarias reduce el riesgo de la inversión de la misma forma que repartirlo entre distintos activos"
    ],
    "respuesta_correcta": 2,
    "explicacion": "Confundir 'diversificar inversiones' con 'distribuir dinero en distintos bancos' es un error conceptual de base, frecuente en clientes que recién empiezan. Vale la pena aclarar la diferencia desde el principio: la diversificación relevante para el riesgo de cartera es entre activos, sectores, emisores y monedas, no entre entidades bancarias donde simplemente se guarda el dinero."
  },
  {
    "id": "TRAMPA-MC-008",
    "categoria": "Preguntas Trampa",
    "subtema": "Suba pasada como garantía de seguridad",
    "dificultad": "intermedia",
    "tipo": "multiple_choice",
    "enunciado": "Un cliente entusiasmado dice: 'Quiero invertir en la acción XYZ porque subió 50% este mes, ¡es una apuesta segura!' ¿Qué le respondés?",
    "opciones": [
      "Que las acciones que suben mucho nunca pueden bajar de precio, ya que una suba fuerte reciente elimina por completo el riesgo futuro de cualquier corrección posterior en esa acción",
      "Que tiene razón, una suba fuerte garantiza que seguirá subiendo de la misma manera durante los próximos meses, sin ningún riesgo de reversión ni de corrección del precio",
      "Que hay que vender inmediatamente cualquier acción que haya subido fuerte en poco tiempo, sin importar los fundamentos ni el contexto de esa suba, ya que el mercado tiende a corregir con fuerza cualquier suba pronunciada apenas los inversores más informados empiezan a tomar ganancias",
      "Que una suba fuerte y rápida suele ir de la mano de alta volatilidad, lo cual significa que también puede caer con la misma intensidad; el desempeño pasado no garantiza el comportamiento futuro, y 'apuesta segura' es justamente lo contrario de lo que describe ese tipo de movimiento"
    ],
    "respuesta_correcta": 3,
    "explicacion": "Es un sesgo cognitivo clásico: interpretar una suba fuerte reciente como evidencia de seguridad, cuando en realidad suele ser evidencia de alta volatilidad (lo cual implica que también puede caer fuerte). Es importante separar 'me gusta cómo viene funcionando' de 'es una apuesta segura', que son cosas completamente distintas."
  },
  {
    "id": "TRAMPA-MC-009",
    "categoria": "Preguntas Trampa",
    "subtema": "Comprar a mercado 'y listo'",
    "dificultad": "basica",
    "tipo": "multiple_choice",
    "enunciado": "Un cliente apurado te dice: '¿Por qué no lo comprás a mercado y listo? ¿Para qué tanta vuelta con el precio límite?' ¿Cuál es la respuesta correcta?",
    "opciones": [
      "Que una orden a mercado prioriza la velocidad por sobre el control de precio, lo cual puede salir caro en activos con spread grande o poca profundidad, porque podría terminar pagando bastante más de lo que vio en pantalla; la orden límite da control de precio a cambio de aceptar que tal vez no se ejecute de inmediato",
      "Tiene razón, siempre hay que usar orden a mercado para no perder tiempo, sin importar cuán amplio sea el spread ni cuán profundo esté el libro de órdenes en ese momento puntual",
      "Que da exactamente lo mismo, no hay ninguna diferencia entre ambos tipos de orden, ni en el precio de ejecución ni en la probabilidad de que la orden se cumpla, incluso tratándose de un activo poco líquido, donde esa diferencia podría terminar costándole bastante dinero al cliente sin que se dé cuenta de lo que pasó y sin que quede registrado en ningún lado",
      "Que las órdenes límite no existen en el mercado argentino, así que la única alternativa disponible para operar es siempre la orden a mercado, sin importar el activo que se quiera operar"
    ],
    "respuesta_correcta": 0,
    "explicacion": "Esta pregunta de impaciencia esconde una trampa real de costos: en activos líquidos con spread chico, ir a mercado puede ser razonable; en activos con spread grande o poca profundidad, puede significar pagar bastante más de lo esperado. El trade-off central (velocidad vs. control de precio) hay que poder explicarlo en una frase corta, sin sonar a excusa para demorar."
  },
  {
    "id": "TRAMPA-MC-010",
    "categoria": "Preguntas Trampa",
    "subtema": "Garantía de precio en una orden",
    "dificultad": "basica",
    "tipo": "multiple_choice",
    "enunciado": "Un cliente pregunta: '¿Me garantizás el precio al que voy a comprar?' ¿Cuál es la respuesta más honesta?",
    "opciones": [
      "Solo se puede garantizar el precio en operaciones de renta fija, no en acciones, debido a una diferencia normativa entre ambos tipos de mercado, así que para acciones conviene directamente evitar dar cualquier precisión sobre el precio esperado de ejecución",
      "Con una orden límite se puede controlar el precio máximo (o mínimo) que se acepta, pero no se garantiza que se vaya a ejecutar a ese nivel ni en qué momento; con una orden a mercado, se garantiza la ejecución rápida pero no el precio exacto",
      "Sí, siempre se puede garantizar el precio exacto, tanto en una orden límite como en una orden a mercado, sin ninguna diferencia entre ambas más allá de la velocidad de ejecución",
      "No, ningún tipo de orden da ningún control sobre el precio, así que da exactamente lo mismo qué tipo de orden se elija para cualquier operación en cualquier condición de mercado"
    ],
    "respuesta_correcta": 1,
    "explicacion": "Es importante ser honesto con esta pregunta desde el primer día: ningún tipo de orden 'garantiza' simultáneamente precio exacto y ejecución inmediata. Es un trade-off, no una garantía absoluta. Prometer algo que no se puede cumplir genera más problemas a futuro que explicar el funcionamiento real desde el principio."
  },
  {
    "id": "TRAMPA-MC-011",
    "categoria": "Preguntas Trampa",
    "subtema": "Vender todo en una caída fuerte",
    "dificultad": "intermedia",
    "tipo": "multiple_choice",
    "enunciado": "El mercado cae fuerte y un cliente con horizonte de 5 años te dice: '¿Y si esto sigue cayendo? Vendamos todo antes de perder más.' ¿Cuál es el riesgo de simplemente acceder sin más análisis?",
    "opciones": [
      "Ninguno, siempre conviene vender ante cualquier caída del mercado, sin importar el horizonte de inversión ni el perfil original del cliente, porque es mejor prevenir que lamentar",
      "Vender en pánico durante una caída puede cristalizar pérdidas que, de mantenerse el plan original (horizonte largo, perfil acorde), podrían haber sido transitorias; además, suele ser muy difícil 'volver a entrar' en el momento correcto después",
      "El único riesgo es perder tiempo respondiendo al cliente, ya que la decisión de vender en sí misma no tiene ninguna otra consecuencia relevante para su cartera de largo plazo",
      "Vender todo siempre protege mejor el capital del cliente, incluso cuando su horizonte de inversión todavía es de varios años hacia adelante, incluso si eso implica materializar una pérdida que, de haber esperado un poco más, probablemente se hubiera recuperado con el tiempo"
    ],
    "respuesta_correcta": 1,
    "explicacion": "Esta es una de las situaciones donde el rol del asesor pesa más: validar la emoción sin ceder automáticamente a una decisión que puede no estar alineada con el plan original del cliente. No significa ignorar el pedido, sino contextualizarlo con el horizonte y el perfil, y ayudar a que la decisión (la que sea) se tome con criterio y no solo por pánico del momento."
  },
  {
    "id": "TRAMPA-MC-012",
    "categoria": "Preguntas Trampa",
    "subtema": "Vender y re-entrar después (market timing)",
    "dificultad": "intermedia",
    "tipo": "multiple_choice",
    "enunciado": "Un cliente pregunta: 'Si el mercado va a bajar, ¿no conviene vender todo ahora y volver a entrar después, más abajo?' ¿Qué riesgo principal tiene esa estrategia?",
    "opciones": [
      "El único riesgo es pagar más comisiones por hacer dos operaciones en lugar de una sola, sin ningún otro riesgo asociado a los dos momentos de decisión que implica esta estrategia",
      "No hay ninguna diferencia entre esta estrategia y mantenerse invertido, ya que el resultado final termina siendo exactamente el mismo en cualquier escenario de mercado posible",
      "Requiere acertar DOS decisiones de timing (cuándo salir y cuándo volver a entrar), algo extremadamente difícil de hacer de forma consistente; el riesgo más común es vender, ver caer más, no animarse a volver a entrar a tiempo, y terminar perdiéndose la recuperación",
      "Ningún riesgo, es una estrategia infalible si uno está seguro de que va a bajar, porque los movimientos del mercado siempre se pueden anticipar con precisión analizando gráficos y noticias del día a día y sin necesidad de considerar que el mercado también puede sorprender en cualquier dirección aunque el análisis previo parezca sólido"
    ],
    "respuesta_correcta": 2,
    "explicacion": "El 'market timing' (entrar y salir prediciendo movimientos de corto plazo) suena lógico en la teoría, pero en la práctica exige acertar dos decisiones difíciles en vez de una. El patrón más común y costoso es vender en la caída y no animarse a volver a entrar hasta que el mercado ya recuperó gran parte del terreno perdido, terminando peor que si simplemente se hubiera sostenido el plan original."
  },
  {
    "id": "TRAMPA-MC-013",
    "categoria": "Preguntas Trampa",
    "subtema": "Confusión de magnitud de precio (bonos)",
    "dificultad": "basica",
    "tipo": "multiple_choice",
    "enunciado": "Un cliente nuevo ve un precio de bono en pantalla que dice '1,05' y se sorprende: '¿Eso vale un dólar con cinco centavos? ¿Es un regalo?' ¿Qué le explicás?",
    "opciones": [
      "Que los bonos siempre cuestan exactamente 1 dólar, sin excepciones, sin importar cuál sea la plataforma o el bono específico que se esté mirando en ese momento particular",
      "Que efectivamente está regalado y debería comprar todo lo que pueda de inmediato, antes de que otros participantes del mercado se den cuenta, porque ese tipo de oportunidades tan favorables suelen desaparecer en cuestión de minutos apenas alguien más las detecta, así que no vale la pena perder tiempo confirmando nada antes de operar",
      "Que es un error del sistema que hay que ignorar y que conviene cargar la orden usando el valor nominal completo directamente, sin confirmar antes ningún otro dato en pantalla",
      "Que conviene frenar y confirmar la convención de precio que usa esa plataforma específica: algunos sistemas muestran el precio del bono 'por unidad' (cercano a 1 dólar y centavos), mientras que otros lo multiplican por 100 (mostrando algo como '105'); antes de operar, siempre hay que confirmar qué convención está usando la pantalla"
    ],
    "respuesta_correcta": 3,
    "explicacion": "Esta es una trampa operativa muy real: distintas plataformas o calculadoras pueden mostrar el precio de un bono bajo distintas convenciones (por unidad nominal, o multiplicado por 100). Frente a un número que parece 'demasiado bueno para ser verdad' o inusual, el reflejo correcto es frenar y confirmar la convención exacta antes de cargar cualquier orden, no asumir y operar de inmediato."
  },
  {
    "id": "TRAMPA-MC-014",
    "categoria": "Preguntas Trampa",
    "subtema": "Confusión de tickers por moneda",
    "dificultad": "intermedia",
    "tipo": "multiple_choice",
    "enunciado": "Un cliente te pide 'comprame el bono X en dólares' y vos cargás la orden con el ticker terminado en 'D', pero el cliente en realidad solo tiene pesos disponibles en su cuenta. ¿Qué va a pasar probablemente?",
    "opciones": [
      "No hay ninguna diferencia entre operar en pesos o en dólares, ya que el sistema permite cursar cualquier orden sin importar el saldo disponible en la cuenta del cliente",
      "El sistema automáticamente le presta dólares al cliente sin que se entere, generando una deuda que se salda automáticamente con la próxima operación en pesos que realice en la cuenta",
      "La orden probablemente sea rechazada o no se pueda cursar, porque para operar la variante en dólares (terminación D) se necesita contar con saldo en esa moneda; hay que verificar previamente con qué moneda cuenta el cliente y, si es necesario, primero comprar en pesos para luego convertir",
      "La orden se va a ejecutar sin problemas, convirtiendo automáticamente los pesos del cliente a la moneda necesaria en el momento exacto de la ejecución, ya que las plataformas de trading suelen tener mecanismos automáticos que resuelven cualquier diferencia de moneda sin intervención humana"
    ],
    "respuesta_correcta": 2,
    "explicacion": "Es uno de los errores operativos más comunes y evitables: confundir el ticker (y por lo tanto la moneda) con la disponibilidad real de fondos del cliente. Antes de cargar cualquier orden, conviene verificar explícitamente con qué moneda cuenta el cliente, para evitar rechazos de orden o, peor, cargar la operación equivocada por apuro."
  },
  {
    "id": "TRAMPA-MC-015",
    "categoria": "Preguntas Trampa",
    "subtema": "Confiar ciegamente en datos no verificados",
    "dificultad": "avanzada",
    "tipo": "multiple_choice",
    "enunciado": "Un cliente te manda un dato de un informe de research que vio en redes sociales y te dice: 'Acá dice que tal bono rinde 15%, ¿lo cargamos ya?'. ¿Cuál es el paso correcto antes de avanzar?",
    "opciones": [
      "Cargar la orden de inmediato, total el cliente ya decidió, sin necesidad de confirmar si ese dato sigue siendo válido en el momento actual ni de dónde salió originalmente y confiar en que, si el dato termina siendo incorrecto, siempre se puede deshacer la operación después sin mayores complicaciones",
      "Decirle al cliente que nunca confíe en ningún informe de research, sin importar la fuente ni la reputación de quien lo elaboró, porque ningún dato externo merece ser considerado",
      "Ignorar completamente la información que trae el cliente, sin revisarla, ya que cualquier dato que no salga directamente de los sistemas internos de la sociedad de bolsa se considera poco confiable y no amerita ninguna atención",
      "Verificar ese dato en tu propia plataforma o fuente confiable antes de operar, porque los informes pueden tener datos desactualizados, errores, o estar fuera de contexto (por ejemplo, condiciones que cambiaron desde la publicación); el asesor es responsable de confirmar antes de ejecutar"
    ],
    "respuesta_correcta": 3,
    "explicacion": "Parte del criterio profesional es no operar 'a ciegas' solo porque el cliente trae un dato de afuera, por más entusiasmado que esté. Los datos pueden estar desactualizados, mal interpretados, o simplemente no aplicar más a las condiciones actuales del mercado. Verificar antes de ejecutar no es desconfiar del cliente, es parte de la responsabilidad profesional del asesor."
  },
  {
    "id": "TRAMPA-CASO-001",
    "categoria": "Preguntas Trampa",
    "subtema": "Cliente que compró y cayó 10%",
    "dificultad": "intermedia",
    "tipo": "caso_abierto",
    "enunciado": "Un cliente compró una acción 'de moda' hace dos semanas y ahora cayó 10%. Te escribe: '¿Salimos ya antes de que sea peor?'. Redactá en 4-5 líneas cómo encararías esta respuesta, sin decir simplemente 'sí, vendamos' ni 'no, aguantemos' de forma automática.",
    "respuesta_modelo": "Una buena respuesta debería: (1) no reaccionar de forma automática en ninguna dirección, (2) recuperar el motivo original de la compra y el horizonte que se había planteado (¿era una posición táctica de corto plazo o una convicción de mediano/largo plazo?), (3) evaluar si cambió algo estructural en los fundamentos de la empresa o si es simplemente volatilidad de corto plazo, (4) recordar el tamaño de la posición dentro de la cartera total (si era una posición chica y acotada, una caída del 10% no debería generar pánico; si era desproporcionada, ahí está el verdadero problema de fondo), (5) proponer una decisión basada en esos criterios, no en el miedo del momento."
  },
  {
    "id": "TRAMPA-MC-016",
    "categoria": "Preguntas Trampa",
    "subtema": "Comprar hoy y vender cuando suba un poco",
    "dificultad": "intermedia",
    "tipo": "multiple_choice",
    "enunciado": "Un cliente con horizonte de largo plazo pregunta: '¿Por qué no compramos hoy y vendemos en cuanto suba un 5%? Así aseguramos la ganancia rápido.' ¿Qué le señalás sobre esa lógica?",
    "opciones": [
      "Que esa lógica convierte una inversión de largo plazo en una operación de trading de corto plazo, con sus propias reglas (timing, costos de transacción más frecuentes, impuestos por ventas más seguidas) y que no necesariamente es coherente con el objetivo y horizonte que se había definido originalmente para esa cartera",
      "Que un 5% de suba es imposible de lograr en la práctica en ningún tipo de activo, sin importar el horizonte de inversión considerado ni las condiciones generales del mercado",
      "Que nunca hay que vender una inversión bajo ninguna circunstancia, sin importar cuánto haya subido ni cuáles sean los objetivos del cliente, porque modificar el plan original, aunque sea parcialmente, siempre termina perjudicando el resultado final de esa inversión a largo plazo, sin ninguna excepción posible, sin importar cuál sea el objetivo original de esa cartera",
      "Que es la mejor estrategia posible para cualquier inversor, sin importar cuál sea su horizonte de inversión original ni su perfil de riesgo declarado al abrir la cuenta"
    ],
    "respuesta_correcta": 0,
    "explicacion": "Es una confusión frecuente entre 'invertir' y 'especular' (operar de corto plazo apostando a movimientos de precio). No es que una sea mala y la otra buena, sino que son actividades distintas con reglas distintas, y mezclarlas sin ser consciente de eso suele terminar en decisiones incoherentes con el plan original que se había definido para esa cartera."
  },
  {
    "id": "TRAMPA-MC-017",
    "categoria": "Preguntas Trampa",
    "subtema": "Confundir nominal y real",
    "dificultad": "intermedia",
    "tipo": "multiple_choice",
    "enunciado": "Un cliente celebra: '¡Mi plazo fijo me dio un 5% este mes, estoy ganando plata!' Pero la inflación de ese mes fue del 8%. ¿Qué le explicás?",
    "opciones": [
      "Que la inflación no tiene ninguna relación con el rendimiento de un plazo fijo, ya que una es un fenómeno de precios generales y la otra un rendimiento financiero puntual, sin ningún vínculo entre ambas",
      "Que, en términos nominales, su saldo en pesos aumentó, pero en términos reales (ajustando por inflación) perdió poder adquisitivo, porque el 5% de retorno no alcanzó a compensar el 8% de inflación de ese período",
      "Que tiene razón, ganó plata sin ninguna duda, ya que lo único que importa es el número nominal que muestra su resumen de cuenta al final de cada mes calendario",
      "Que debería haber invertido en un plazo fijo distinto que sí le ganara a la inflación, sin importar el contexto, porque existen alternativas en el mercado que siempre logran superarla sin ningún riesgo adicional para el cliente"
    ],
    "respuesta_correcta": 1,
    "explicacion": "Distinguir rentabilidad nominal de rentabilidad real es uno de los conceptos más importantes para un cliente argentino. Un retorno nominal positivo puede esconder una pérdida real de poder adquisitivo si la inflación del período fue mayor. Ayudar al cliente a pensar 'en términos reales' es parte central de la educación financiera que un asesor debería transmitir."
  },
  {
    "id": "TRAMPA-MC-018",
    "categoria": "Preguntas Trampa",
    "subtema": "Confundir volatilidad con pérdida permanente",
    "dificultad": "intermedia",
    "tipo": "multiple_choice",
    "enunciado": "Un cliente ve que su cartera diversificada bajó 8% en un mes volátil y dice: 'Perdí 8% de mi plata para siempre'. ¿Qué matiz le falta?",
    "opciones": [
      "Que las carteras diversificadas nunca pueden bajar de valor, gracias a que la diversificación elimina por completo cualquier posibilidad de pérdida en cualquier escenario de mercado y que por eso no tiene ningún sentido explicarle al cliente la diferencia entre una pérdida realizada y una pérdida todavía no realizada",
      "Que debería vender inmediatamente para 'frenar' la pérdida, asegurando así que ese resultado negativo quede definitivamente cristalizado, ya que siempre es mejor pecar de cauteloso y liquidar la posición antes de analizar si el movimiento tiene alguna causa concreta",
      "Que una baja de precio en una cartera diversificada de activos líquidos suele ser, en principio, una pérdida 'de papel' o no realizada (mientras no se venda), distinta de una pérdida permanente como ocurriría, por ejemplo, ante un default; si no necesita vender en ese momento, esa baja puede revertirse con el tiempo",
      "Tiene razón, esa pérdida es definitiva y no se puede recuperar bajo ninguna circunstancia, sin importar cuánto tiempo pase ni cómo se comporte el mercado en los meses siguientes"
    ],
    "respuesta_correcta": 2,
    "explicacion": "Es clave diferenciar volatilidad (movimiento de precio que puede revertirse con el tiempo) de pérdida permanente de capital (como ocurriría ante un default o quiebra). Esta distinción es central para ayudar a un cliente a no tomar decisiones apresuradas en momentos de baja transitoria, sobre todo si su horizonte de inversión todavía es largo y no necesita liquidez inmediata."
  },
  {
    "id": "TRAMPA-MC-019",
    "categoria": "Preguntas Trampa",
    "subtema": "Tasa alta de licitación sin contexto",
    "dificultad": "avanzada",
    "tipo": "multiple_choice",
    "enunciado": "Un cliente ve que una nueva ON sale a buscar fondos pagando una tasa muy alta comparada con otras similares y te dice entusiasmado: '¡Esta sí que paga bien, metamos todo ahí!' ¿Qué deberías indagar antes de avanzar?",
    "opciones": [
      "Por qué esa empresa puntual necesita ofrecer una tasa tan por encima de comparables: puede reflejar mayor riesgo de crédito específico, menor calidad institucional, urgencia de fondeo, o condiciones de mercado particulares en el momento de la emisión",
      "Si el cliente tiene suficiente dinero disponible para invertir, sin mirar nada más, porque contar con el capital es, en la práctica, la única condición relevante, sin necesidad de revisar el balance del emisor ni su historial de pagos previo en emisiones anteriores",
      "El nombre comercial de la empresa emisora, sin necesidad de revisar ningún otro dato de su situación financiera actual ni de sus emisiones de deuda anteriores en el mercado",
      "Nada, una tasa alta siempre es una buena señal sin excepciones, ya que cuanto más paga un emisor, mejor es la oportunidad para el inversor que decide entrar en esa emisión"
    ],
    "respuesta_correcta": 0,
    "explicacion": "Una tasa significativamente más alta que comparables casi nunca es 'gratis': suele reflejar que el mercado le exige una prima de riesgo mayor a ese emisor específico, por la razón que sea (riesgo de crédito, urgencia de fondeo, menor trayectoria). El entusiasmo del cliente por el número alto es exactamente el momento donde más conviene frenar y analizar el porqué antes de recomendar."
  },
  {
    "id": "TRAMPA-MC-020",
    "categoria": "Preguntas Trampa",
    "subtema": "Perfil agresivo solicitado sin análisis",
    "dificultad": "intermedia",
    "tipo": "multiple_choice",
    "enunciado": "Un cliente de 30 años, sin experiencia previa en inversiones, te dice: 'Quiero invertir agresivamente todo mi dinero porque escuché que en la bolsa se gana mucho'. ¿Cuál es tu primer paso?",
    "opciones": [
      "Armar la cartera más agresiva posible de inmediato, porque eso es lo que pidió, sin necesidad de indagar nada más sobre su situación financiera real, ya que cuestionar el pedido de un cliente entusiasmado podría hacerle perder confianza en el asesor desde el primer contacto y ponerlo incómodo sin necesidad, arriesgando así toda la relación comercial que recién empieza",
      "Negarse directamente a trabajar con un cliente joven sin experiencia, ya que cualquier pedido de perfil agresivo de un cliente nuevo debería rechazarse de plano sin más conversación",
      "Decirle que la bolsa siempre es una mala idea para gente sin experiencia, y que debería directamente evitar cualquier tipo de inversión en renta variable durante toda su vida, ya que sin experiencia previa cualquier exposición a la bolsa termina resultando perjudicial para el patrimonio del cliente tarde o temprano",
      "Indagar más a fondo su situación real (estabilidad de ingresos, fondo de emergencia, horizonte real, tolerancia emocional probada ante caídas) antes de avanzar; para alguien sin experiencia previa, suele ser más prudente empezar con un perfil moderado e ir ajustando con el tiempo, en vez de saltar directo a 'todo agresivo' basado solo en un comentario entusiasta"
    ],
    "respuesta_correcta": 3,
    "explicacion": "El entusiasmo inicial de un cliente sin experiencia no es lo mismo que tolerancia al riesgo probada. Es común que alguien diga 'quiero ser agresivo' sin haber atravesado nunca una caída real de su propio dinero. Parte del trabajo del asesor es indagar más allá del primer impulso y, en casos así, considerar empezar de forma más gradual, ajustando con el tiempo según cómo reaccione realmente el cliente ante la volatilidad."
  },
  {
    "id": "TRAMPA-MC-021",
    "categoria": "Preguntas Trampa",
    "subtema": "Correlación perfecta y diversificación falsa",
    "dificultad": "avanzada",
    "tipo": "multiple_choice",
    "enunciado": "Un cliente arma una cartera con 8 acciones distintas, todas del mismo sector y país, y te dice: 'Ya está, diversifiqué bastante, tengo 8 activos diferentes'. ¿Qué le señalás?",
    "opciones": [
      "Que la correlación no tiene ninguna relevancia para el riesgo de cartera, que depende únicamente de la cantidad total de activos que se tengan, y por eso alcanza con mirar solamente el número de posiciones distintas que figuran en el resumen de la cartera, sin importar de qué se trate cada una, incluso si esas posiciones terminan reaccionando exactamente igual frente a la misma noticia del mercado",
      "Que tener más de 5 activos siempre es contraproducente para cualquier cartera, sin importar en qué sectores o países estén invertidos ni cómo se relacionen entre sí esos activos",
      "Que tiene razón, 8 activos siempre es suficiente diversificación, sin importar a qué sector o país pertenezcan esas ocho empresas, porque lo único que realmente importa para diversificar es tener una cantidad grande de activos distintos en la cartera",
      "Que la cantidad de activos no es lo único relevante: si todos pertenecen al mismo sector y país, es probable que estén altamente correlacionados (se muevan parecido ante los mismos eventos), por lo que la diversificación real lograda es mucho menor de lo que parece a simple vista por el número de activos"
    ],
    "respuesta_correcta": 3,
    "explicacion": "Es un error conceptual común: pensar que 'cantidad de activos' es sinónimo de 'diversificación'. Si todos los activos están altamente correlacionados (mismo sector, mismo país, mismos factores de riesgo), un evento negativo puntual puede golpear a todos al mismo tiempo, casi como si fuera una sola posición grande. La diversificación efectiva depende de combinar activos que NO se muevan todos igual, no solo de la cantidad."
  },
  {
    "id": "TRAMPA-MC-022",
    "categoria": "Preguntas Trampa",
    "subtema": "Pánico ante baja de un solo día",
    "dificultad": "basica",
    "tipo": "multiple_choice",
    "enunciado": "Un cliente te escribe alarmado un viernes a la tarde porque vio que su cartera bajó 1,5% durante el día. ¿Cuál es la respuesta más apropiada como primer paso?",
    "opciones": [
      "Contextualizar la magnitud del movimiento (una variación diaria de 1-2% es habitual y esperable en activos de renta variable o renta fija con algo de volatilidad) antes de considerar cualquier cambio de estrategia, y confirmar si hay algún evento puntual relevante detrás de ese movimiento o si es simplemente ruido normal de mercado",
      "Decirle que nunca más debería mirar la pantalla de su cartera, ya que revisarla seguido es la principal causa de las malas decisiones de inversión que toman los clientes, y que lo mejor es directamente alejarse de las inversiones si le genera tanta ansiedad revisar los números todos los días de la semana, sin importar cuán chico sea el movimiento que la haya alarmado",
      "Recomendarle vender todo de inmediato para evitar más pérdidas, antes de que la caída del viernes se profundice todavía más durante el fin de semana, porque siempre es mejor pecar de cauteloso y liquidar la posición antes de confirmar si hay alguna causa puntual detrás",
      "Ignorar completamente el mensaje del cliente sin responder, dejando que se calme solo con el paso de las horas, porque no hay nada útil que se pueda explicar en ese momento"
    ],
    "respuesta_correcta": 0,
    "explicacion": "Parte de la educación financiera del cliente es ayudarlo a calibrar qué magnitud de movimiento amerita preocupación real y cuál es simplemente la volatilidad normal y esperable de los mercados. Reaccionar con pánico ante variaciones diarias chicas (1-2%) sin contexto adicional puede llevar a decisiones apresuradas que dañan más que ayudan al plan de largo plazo."
  },
  {
    "id": "RF-MC-016",
    "categoria": "Renta Fija",
    "subtema": "Liquidez de bonos CER en dólares",
    "dificultad": "intermedia",
    "tipo": "multiple_choice",
    "enunciado": "Un cliente te pide vender un bono CER (por ejemplo el TZXD6) directamente contra dólares, porque quiere dolarizarse ya. ¿Qué le respondés?",
    "opciones": [
      "Casi no hay libro en dólares para un CER: mejor venderlo en pesos y comprar dólares aparte, para no operar a un precio inventado por falta de puntas",
      "Sin problema: los bonos CER tienen el mismo volumen en pesos que en dólares, así que la moneda de la orden no cambia nada",
      "No se puede vender un bono CER bajo ninguna circunstancia antes de que llegue su fecha de vencimiento final",
      "Se puede vender sin problema, pero se pierde automáticamente toda la ganancia acumulada por el ajuste CER hasta ese momento y no se puede recuperar ese dinero de ninguna manera"
    ],
    "respuesta_correcta": 0,
    "explicacion": "Cada instrumento tiene su 'moneda natural' de negociación, donde realmente hay compradores y vendedores activos. Los CER prácticamente solo tienen libro en pesos. Mandar una orden contra dólares en un papel sin ese libro es someterse a precios inventados o directamente a que no haya con quién operar. Separar el paso 'vender el CER' del paso 'comprar dólares' evita ese riesgo."
  },
  {
    "id": "RF-CASO-004",
    "categoria": "Renta Fija",
    "subtema": "Elegir moneda de venta según liquidez",
    "dificultad": "avanzada",
    "tipo": "caso_abierto",
    "enunciado": "Un cliente quiere vender una Obligación Negociable en dólares (por ejemplo YMCID) y te pregunta si conviene operarla contra pesos o contra dólares. En pantalla ves: contra pesos, el spread entre punta compradora y vendedora es de 0,3%, hay ofertas de ambos lados con nominales importantes, y la TIR implícita en esa punta es razonable comparada con papeles similares. Contra dólares, el spread es del 2%, hay pocas puntas y con nominales chicos, y la TIR implícita que muestra el precio es más alta de lo normal para ese papel. Explicale en 4-5 líneas, sin tecnicismos, por qué le recomendás operar contra pesos y qué señales concretas mirás vos en pantalla para decidirlo.",
    "respuesta_modelo": "Puntos clave a evaluar: (1) que identifique el spread angosto (0,3%) más las puntas con nominales grandes en pesos como señal de mercado líquido y sano, (2) que reconozca que un spread del 2% con pocas puntas chicas en dólares es señal de poca profundidad, (3) que entienda que una TIR implícita 'más alta de lo normal' no es una oportunidad sino una alerta de precio distorsionado por falta de operadores, (4) que concluya vendiendo contra pesos (mercado más profundo) y, si el cliente necesita dólares, convertirlos después como paso aparte."
  },
  {
    "id": "RF-MC-017",
    "categoria": "Renta Fija",
    "subtema": "TIR real vs TIR nominal en bonos CER",
    "dificultad": "intermedia",
    "tipo": "multiple_choice",
    "enunciado": "Te preguntan: 'La calculadora me muestra que el TZX26 tiene una TIR de CER + 2%. ¿Eso significa que voy a ganar 2% en el año?' ¿Qué le respondés?",
    "opciones": [
      "Sí: esa TIR ya es directamente el rendimiento total que vas a ganar en pesos durante el año, sin ajustar nada más",
      "El CER no calcula ninguna TIR: solamente va capitalizando el capital según la inflación pasada, sin otro componente y no depende en absoluto de la inflación futura del país",
      "No: esa TIR es real, por encima de la inflación. Para el rendimiento nominal hay que sumarle la inflación esperada del período",
      "No: vas a perder 2% en el año, porque el CER siempre rinde negativo en términos reales para cualquier inversor"
    ],
    "respuesta_correcta": 2,
    "explicacion": "Confundir tasa real con tasa nominal es uno de los errores más frecuentes con instrumentos CER. 'CER + X%' es el plus por encima de la inflación. Para hablarle al cliente en términos de '¿cuántos pesos más voy a tener?', hay que combinar ese rendimiento real con la inflación esperada (aproximadamente sumándolas), no confundir el 2% real con el rendimiento total en pesos."
  },
  {
    "id": "RF-MC-018",
    "categoria": "Renta Fija",
    "subtema": "Riesgo de un CER largo ante expectativas de devaluación",
    "dificultad": "avanzada",
    "tipo": "multiple_choice",
    "enunciado": "Un cliente tiene un bono CER largo (vence en 2033) con una TIR real positiva y te pregunta por qué igual podría perder plata en el corto plazo si las expectativas de devaluación suben fuerte. ¿Cuál es la explicación más precisa?",
    "opciones": [
      "Pierde plata únicamente si el Estado deja de publicar el índice de inflación que ajusta el capital del bono",
      "No puede perder plata nunca: un bono CER sigue exactamente a la inflación día a día, sin ningún otro factor de por medio incluso si el ajuste por inflación se sigue aplicando con normalidad",
      "El riesgo de devaluación no afecta de ninguna manera a los bonos CER, solamente a los bonos dollar-linked",
      "Si sube la expectativa de devaluación, muchos venden CER para pasarse a dólares, y eso golpea el precio; en un bono largo el golpe es más fuerte"
    ],
    "respuesta_correcta": 3,
    "explicacion": "Este es un punto que confunde mucho: el CER no tiene 'riesgo cambiario' de manera directa, pero sí sufre indirectamente cuando el mercado corre hacia el dólar, porque ese flujo de ventas golpea el precio. Cuanto más larga la duration del bono, más fuerte se siente ese golpe de precio, aunque el fundamento de mediano/largo plazo (tasa real positiva) no haya cambiado."
  },
  {
    "id": "RF-CASO-005",
    "categoria": "Renta Fija",
    "subtema": "Rendimiento intra-período de un CER: ajuste vs efecto precio",
    "dificultad": "avanzada",
    "tipo": "caso_abierto",
    "enunciado": "Un cliente te dice: 'Tengo un CER, así que este mes tiene que rendirme exactamente lo mismo que la inflación, ni un poco más ni un poco menos.' Explicale en pocas líneas por qué eso no es necesariamente así mes a mes, aunque a largo plazo (o sostenido hasta el vencimiento) sea más cierto.",
    "respuesta_modelo": "Puntos clave: (1) el ajuste CER actualiza el capital según la inflación pasada, pero el precio de mercado del bono se mueve además por oferta y demanda, cambios en la tasa real que pide el mercado, y liquidez del momento, (2) en el corto plazo ese 'efecto precio' puede hacer que el rendimiento observado sea mayor o menor a la inflación de ese mes puntual, (3) cuanto más se sostiene la posición hasta el vencimiento, ese efecto precio se diluye y el rendimiento converge más a lo esperado por la TIR real, (4) conviene explicarle que 'ajuste por inflación del capital' y 'variación de precio de mercado' son dos cosas distintas que conviven en el mismo instrumento."
  },
  {
    "id": "RF-MC-019",
    "categoria": "Renta Fija",
    "subtema": "CER vs dollar-linked: qué cubre cada uno",
    "dificultad": "intermedia",
    "tipo": "multiple_choice",
    "enunciado": "Un cliente confunde un bono dollar-linked con uno CER y te dice: 'da lo mismo, los dos me cubren de la inflación'. ¿Qué le aclarás?",
    "opciones": [
      "El dollar-linked siempre es mejor porque paga directamente en dólares, sin importar qué pase con la inflación o el tipo de cambio",
      "Tiene razón: ambos instrumentos ajustan exactamente por el mismo concepto y cubren lo mismo en cualquier escenario",
      "El CER siempre es mejor porque paga en pesos y evita cualquier tipo de riesgo cambiario para el cliente",
      "No es lo mismo: el CER ajusta por inflación y el dollar-linked por el dólar oficial; conviene uno u otro según cuál suba más"
    ],
    "respuesta_correcta": 3,
    "explicacion": "Son dos coberturas distintas que suelen confundirse porque ambos son instrumentos 'ajustables'. Cuál conviene depende de la relación esperada entre inflación y devaluación, no son intercambiables. Vale la pena preguntarle al cliente qué es lo que realmente quiere cubrir antes de elegir uno u otro."
  },
  {
    "id": "OP-MC-009",
    "categoria": "Operatoria de Mercado",
    "subtema": "Riesgo de liquidez en bonos provinciales",
    "dificultad": "intermedia",
    "tipo": "multiple_choice",
    "enunciado": "Un cliente con un monto grande quiere vender de una sola vez un bono provincial poco líquido. ¿Qué riesgo concreto le explicás antes de cargar la orden?",
    "opciones": [
      "Una orden grande en un papel poco líquido puede mover el precio en contra; conviene fraccionar o usar una orden límite con paciencia",
      "Que un bono provincial no se puede vender bajo ninguna circunstancia antes de llegar a su fecha de vencimiento sin importar cuán grande sea el monto que se quiera operar",
      "Que el único riesgo relevante ahí es el riesgo del emisor de no pagar, nunca un riesgo de mercado",
      "Ninguno: los bonos provinciales tienen exactamente la misma liquidez que los soberanos nacionales más operados"
    ],
    "respuesta_correcta": 0,
    "explicacion": "En papeles con poco volumen, el tamaño de la propia orden puede ser el problema: una orden grande a mercado 'se come' varias puntas del libro y termina ejecutando a un precio bastante peor que el que se veía antes de cargarla. Fraccionar o tener paciencia con una orden límite protege al cliente de ese impacto."
  },
  {
    "id": "RF-MC-020",
    "categoria": "Renta Fija",
    "subtema": "Riesgo de reinversión de cupones",
    "dificultad": "avanzada",
    "tipo": "multiple_choice",
    "enunciado": "Un colega te dice: 'si compro un bono a una TIR del 8%, tengo garantizado ganar 8% anual todos los años hasta el vencimiento'. ¿Es correcto?",
    "opciones": [
      "Depende únicamente de la cotización del dólar, no tiene ninguna relación con el nivel de tasas",
      "No del todo: la TIR asume reinvertir los cupones a esa misma tasa; si las tasas bajan, el rendimiento final termina siendo algo menor",
      "Sí, la TIR es una garantía absoluta: vas a ganar exactamente 8% todos los años pase lo que pase con las tasas porque así funciona siempre cualquier instrumento de renta fija",
      "No, la TIR nunca se termina cumpliendo en la práctica para ningún tipo de instrumento de renta fija"
    ],
    "respuesta_correcta": 1,
    "explicacion": "Es un supuesto escondido detrás del número de TIR que casi nadie menciona: asume reinversión de los flujos intermedios a la misma tasa. En la práctica, si las tasas se mueven, el rendimiento final realizado se aparta un poco de la TIR original. Cuanto más cupones paga el bono en el camino, más relevante es este efecto."
  },
  {
    "id": "RF-MC-021",
    "categoria": "Renta Fija",
    "subtema": "Costo implícito de la opción en bonos duales",
    "dificultad": "avanzada",
    "tipo": "multiple_choice",
    "enunciado": "Un cliente ve un bono dual (paga lo mejor entre tasa fija y CER, por ejemplo) y piensa: 'entonces es gratis, siempre gano lo mejor de los dos mundos'. ¿Qué le explicás?",
    "opciones": [
      "Tiene razón: no hay ningún costo escondido, es literalmente pagar lo mejor de los dos mundos sin resignar nada y el mercado nunca cobra nada extra por ofrecer esa combinación",
      "La opción tiene un precio: el mercado suele exigir algo menos de tasa a cambio de esa flexibilidad, y sigue habiendo riesgo de precio y crédito",
      "El bono dual no tiene ningún tipo de riesgo, ni de precio, ni de liquidez, ni del emisor",
      "El bono dual siempre rinde menos que cualquier bono simple, en absolutamente cualquier escenario posible"
    ],
    "respuesta_correcta": 1,
    "explicacion": "'Paga lo mejor entre dos' reduce cierta incertidumbre, pero esa opción no es gratis: el mercado la descuenta en el precio. Es importante que el cliente entienda que sigue habiendo riesgo de precio, liquidez y crédito, la opción solo resuelve una parte de la incertidumbre (cuál de las dos referencias termina pagando más), no todos los riesgos del instrumento."
  },
  {
    "id": "RF-MC-022",
    "categoria": "Renta Fija",
    "subtema": "Paridad baja no equivale a 'barato'",
    "dificultad": "intermedia",
    "tipo": "multiple_choice",
    "enunciado": "Un cliente ve dos bonos: uno cotiza a 60 (paridad baja) y otro a 95. Te dice: 'el de 60 es una ganga, está más barato'. ¿Qué le respondés?",
    "opciones": [
      "El de 95 siempre es mejor porque está más cerca del valor nominal de 100 al vencimiento",
      "El precio solo no dice si es barato: hay que mirar la TIR, porque un precio bajo suele reflejar más riesgo exigido por el mercado",
      "Tiene razón: siempre conviene el bono de menor precio, porque literalmente cuesta menos comprarlo hoy y por eso siempre hay que preferirlo sin mirar ningún otro dato",
      "La paridad no tiene ninguna relación con el nivel de riesgo percibido de un bono"
    ],
    "respuesta_correcta": 1,
    "explicacion": "Es una confusión frecuente en clientes nuevos: asociar precio bajo con oportunidad, como si fuera un producto de supermercado. En renta fija, un precio bajo suele reflejar mayor riesgo exigido por el mercado (crédito, plazo, liquidez), no necesariamente una ineficiencia a favor del comprador."
  },
  {
    "id": "RF-MC-023",
    "categoria": "Renta Fija",
    "subtema": "Riesgo de rescate anticipado (call)",
    "dificultad": "avanzada",
    "tipo": "multiple_choice",
    "enunciado": "Un bono corporativo tiene una 'Call Date' en 2 años, es decir, la empresa puede rescatarlo anticipadamente a la par desde esa fecha. El cliente solo mira la TIR calculada al vencimiento final (2033) y le parece muy atractiva. ¿Qué le advertís?",
    "opciones": [
      "Nada: la TIR calculada al vencimiento final es el único número que importa mirar en este caso",
      "Si la empresa puede rescatarlo antes, probablemente lo haga si le conviene refinanciar más barato; conviene mirar también el rendimiento a la fecha de call",
      "Un bono con opción de rescate anticipado nunca debería recomendarse a ningún tipo de cliente",
      "La Call Date no afecta en absoluto el rendimiento real que va a terminar recibiendo el inversor sin importar ninguna cláusula adicional que tenga el prospecto de emisión del bono"
    ],
    "respuesta_correcta": 1,
    "explicacion": "La opción de call juega a favor del emisor, no del inversor: la va a ejercer cuando le convenga a la empresa (típicamente si puede refinanciar a una tasa menor), no cuando le convenga al tenedor del bono. Por eso conviene mirar el rendimiento estimado tanto al vencimiento final como a la fecha de call más próxima."
  },
  {
    "id": "RF-MC-024",
    "categoria": "Renta Fija",
    "subtema": "Current yield vs TIR",
    "dificultad": "intermedia",
    "tipo": "multiple_choice",
    "enunciado": "Un bono paga un cupón anual del 9% y cotiza a USD 112. El cliente calcula 'cupón dividido precio' y dice que rinde 8% (9/112). Vos le mostrás la pantalla y la TIR real que figura es 6,2%. ¿Por qué son distintas esas dos cuentas?",
    "opciones": [
      "Una de las dos cuentas está mal hecha: solo puede existir un número posible de rendimiento para ese bono y por lo tanto una de las dos pantallas del sistema tiene un error de cálculo",
      "La TIR nunca toma en cuenta cuál fue el precio de compra pagado por el inversor",
      "Cupón/precio ignora que pagaste 112 y vas a cobrar 100 al final; la TIR sí incorpora esa pérdida de capital, por eso da menos",
      "El cupón del bono cambia de valor todos los años según cómo evolucione el mercado"
    ],
    "respuesta_correcta": 2,
    "explicacion": "El current yield (cupón/precio) es una cuenta rápida pero incompleta: ignora la diferencia entre lo que pagaste y lo que vas a cobrar al vencimiento. Cuando el bono está sobre la par (como acá, a 112), esa diferencia juega en contra y la TIR real queda por debajo del current yield."
  },
  {
    "id": "OP-CASO-003",
    "categoria": "Operatoria de Mercado",
    "subtema": "Checklist antes de vender en una moneda determinada",
    "dificultad": "intermedia",
    "tipo": "caso_abierto",
    "enunciado": "Armá una mini-guía de 3 o 4 puntos concretos para revisar en pantalla, antes de vender cualquier bono u Obligación Negociable en una moneda determinada, que ayude a decidir si conviene operar ahí o buscar otra vía.",
    "respuesta_modelo": "Puntos esperados: (1) el ancho del spread entre punta compradora y vendedora (spreads chicos, del orden de 0,3-0,5%, sugieren mercado sano; spreads de 2% o más son alerta), (2) la cantidad y el tamaño de las puntas de ambos lados (pocas puntas o con nominales muy chicos indican poca profundidad), (3) si la TIR implícita en el precio ofertado es razonable frente a papeles comparables o si está llamativamente distinta (señal de precio distorsionado por iliquidez), (4) comparar la misma operación en la otra moneda disponible antes de decidir, y si ambas muestran señales de iliquidez, considerar fraccionar la orden o esperar a otro momento."
  },
  {
    "id": "RF-CASO-006",
    "categoria": "Renta Fija",
    "subtema": "Rendimiento en pesos vs en dólares de un CER",
    "dificultad": "avanzada",
    "tipo": "caso_abierto",
    "enunciado": "Un cliente que tiene un bono CER te llama preocupado: vio que el dólar subió fuerte esta semana y un asesor de otro banco le dijo que 'perdió plata'. Explicale en 4-5 líneas la diferencia entre cómo le fue en pesos (medido contra la inflación) y cómo le fue en dólares (medido contra el tipo de cambio), y por qué pueden dar resultados distintos al mismo tiempo.",
    "respuesta_modelo": "Puntos clave: (1) el CER está pensado para preservar poder adquisitivo en pesos frente a la inflación, no frente al dólar, (2) si el dólar sube más que la inflación (por ejemplo, corrigiendo un atraso cambiario previo), medido en dólares el CER puede mostrar una pérdida aunque en pesos reales esté relativamente estable o positivo, (3) son dos mediciones distintas y ambas válidas según el objetivo del cliente (preservar poder de compra en pesos vs. mantener valor en dólares), (4) conviene preguntarle al cliente cuál es su objetivo real antes de aceptar como cierto que 'perdió plata'."
  },
  {
    "id": "TRAMPA-MC-023",
    "categoria": "Preguntas Trampa",
    "subtema": "CER conservador, pero no libre de sobresaltos",
    "dificultad": "avanzada",
    "tipo": "multiple_choice",
    "enunciado": "Un cliente conservador te dice: 'no quiero riesgo cambiario, así que prefiero todo en CER en vez de dollar-linked o dólares'. Vos coincidís en que el CER es razonable para su perfil, pero le agregás una advertencia importante. ¿Cuál?",
    "opciones": [
      "Que el CER solamente tiene algún riesgo cuando el bono fue emitido por una provincia",
      "Que en momentos de fuerte suba de expectativas de devaluación puede sufrir caídas de precio, aunque no tenga riesgo cambiario de forma directa",
      "Que no hay ninguna advertencia relevante para dar: el CER está completamente libre de todo riesgo ni siquiera ante escenarios extremos de mercado o de política económica",
      "Que el CER rinde siempre menos que un plazo fijo tradicional, en cualquier escenario posible"
    ],
    "respuesta_correcta": 1,
    "explicacion": "Elegir CER por perfil conservador tiene sentido, pero 'conservador' no es sinónimo de 'sin sobresaltos de corto plazo'. El cliente debería saber de antemano que puede ver caídas de precio puntuales ligadas a corridas hacia el dólar, para no asustarse y vender en el peor momento si eso ocurre."
  },
  {
    "id": "RF-MC-025",
    "categoria": "Renta Fija",
    "subtema": "Tipo de cambio breakeven en tasa fija (LECAP)",
    "dificultad": "avanzada",
    "tipo": "multiple_choice",
    "enunciado": "Un cliente quiere entender qué es el 'tipo de cambio breakeven' de una LECAP a 90 días que rinde una TNA del 22%. ¿Cómo se lo explicás en términos simples?",
    "opciones": [
      "Es el dólar hasta el cual te sigue conviniendo haber estado en pesos; si sube más que eso, convenía estar en dólares directamente",
      "Es el dólar al que va a estar el país en general, sin ninguna relación con esta inversión puntual y depende exclusivamente de decisiones que toma el Banco Central",
      "No tiene ninguna relación con las expectativas de devaluación que tenga el cliente",
      "Es el precio exacto al que el Banco Central se compromete a vender dólares ese mismo día"
    ],
    "respuesta_correcta": 0,
    "explicacion": "El breakeven cambiario es la forma de traducir una tasa en pesos a una pregunta que el cliente entiende mejor: '¿hasta qué dólar me sigue convenimiento haber estado en pesos?'. Es una herramienta útil para comparar carry trade en pesos contra simplemente dolarizarse, sin perderse en la tasa nominal en sí."
  },
  {
    "id": "PORT-MC-012",
    "categoria": "Portafolios y Asesoramiento",
    "subtema": "Armar cartera según perfil (perfil → composición)",
    "dificultad": "intermedia",
    "tipo": "multiple_choice",
    "enunciado": "Tenés un cliente de perfil conservador: no quiere ver caídas de más del 10-15% en un mal año y su horizonte es de mediano plazo. De estas cuatro combinaciones agregadas por clase de activo, ¿cuál se ajusta mejor a ese perfil?",
    "opciones": [
      "La mitad en criptomonedas y la otra mitad guardada en efectivo, sin invertir el resto",
      "El 100% del dinero puesto en un único bono soberano en dólares a diez años de plazo",
      "Unos 75% en acciones locales y CEDEARs, y el 25% restante en bonos y fondos de renta fija y suele recomendarse recién para clientes con mucha tolerancia al riesgo",
      "Unos 35% en acciones locales y CEDEARs, y 65% repartido entre Obligaciones Negociables, bonos públicos y FCIs"
    ],
    "respuesta_correcta": 3,
    "explicacion": "Para un perfil conservador, la porción en renta variable (acciones locales + CEDEARs) suele ser minoritaria, mientras que el grueso se reparte en instrumentos de renta fija diversificados (ONs, bonos públicos, FCIs), que aportan más estabilidad de precio y de flujo. La opción de 75% en variable corresponde más a un perfil agresivo, no conservador."
  },
  {
    "id": "PORT-MC-013",
    "categoria": "Portafolios y Asesoramiento",
    "subtema": "Inferir perfil desde una cartera (composición → perfil)",
    "dificultad": "intermedia",
    "tipo": "multiple_choice",
    "enunciado": "Mirás la cartera de un cliente y ves: 65% en acciones locales y CEDEARs, 25% en bonos públicos (CER/USD), y nada en Obligaciones Negociables ni en FCIs. ¿Qué perfil de riesgo y horizonte sugiere esta composición?",
    "opciones": [
      "Perfil conservador con horizonte corto, que necesita tener liquidez disponible de forma inmediata y que además prioriza no mover la cartera bajo ninguna circunstancia",
      "Perfil moderado que arma la cartera buscando únicamente cobertura contra el tipo de cambio",
      "No se puede inferir absolutamente nada del perfil mirando la composición de una cartera",
      "Perfil agresivo con horizonte largo, que puede tolerar caídas fuertes de corto plazo por mayor potencial de crecimiento"
    ],
    "respuesta_correcta": 3,
    "explicacion": "Una proporción alta y concentrada en renta variable, sin colchón de ONs ni FCIs de renta fija tradicionales, es característica de un cliente que prioriza crecimiento sobre estabilidad y que tiene tiempo por delante para absorber caídas de corto plazo: es decir, perfil agresivo con horizonte largo."
  },
  {
    "id": "PORT-CASO-004",
    "categoria": "Portafolios y Asesoramiento",
    "subtema": "Armar cartera agresiva a nivel de clase de activo",
    "dificultad": "avanzada",
    "tipo": "caso_abierto",
    "enunciado": "Un cliente de 30 años, sin necesidad de tocar el dinero en los próximos 8-10 años, te dice que está dispuesto a ver caer su cartera 30% en un mal año con tal de maximizar el crecimiento en el largo plazo. En términos de clases de activos (sin elegir instrumentos puntuales), ¿cómo armarías la cartera a nivel agregado? Explicá también por qué reducirías o eliminarías la porción de Obligaciones Negociables y FCIs de renta fija tradicionales frente a lo que harías con un perfil conservador.",
    "respuesta_modelo": "Puntos esperados: (1) la mayoría de la cartera en renta variable (acciones locales + CEDEARs), del orden de 70-80%, (2) el resto en algo de renta fija (por ejemplo bonos públicos) que aporte algo de estabilidad sin resignar demasiado potencial de suba, (3) que explique que ONs y FCIs de renta fija cumplen un rol defensivo (ingreso estable, menor volatilidad) que no es lo que busca este cliente, (4) que mencione que con un horizonte largo las caídas de corto plazo importan menos porque hay tiempo para recuperarse."
  },
  {
    "id": "PORT-MC-014",
    "categoria": "Portafolios y Asesoramiento",
    "subtema": "Inferir perfil desde una cartera moderada",
    "dificultad": "intermedia",
    "tipo": "multiple_choice",
    "enunciado": "Un cliente te muestra su cartera: aproximadamente la mitad en acciones locales y CEDEARs, y la otra mitad repartida entre Obligaciones Negociables, bonos públicos y un FCI de renta fija latinoamericana. ¿Qué perfil describe mejor esta combinación?",
    "opciones": [
      "Agresivo puro, porque tiene una parte relevante de la cartera puesta en acciones y CEDEARs",
      "Un perfil de trading de corto plazo, sin ninguna relación con el horizonte de inversión real",
      "Moderado: busca algo de crecimiento sin resignar una base sólida de estabilidad para el mediano plazo",
      "Conservador extremo, porque tiene una parte importante de la cartera en instrumentos de renta fija y que evita casi por completo cualquier exposición a renta variable"
    ],
    "respuesta_correcta": 2,
    "explicacion": "Un balance cercano a mitad y mitad entre renta variable y renta fija diversificada es la firma típica de un perfil moderado: busca crecimiento pero sin llevar la cartera a extremos de volatilidad."
  },
  {
    "id": "PORT-MC-015",
    "categoria": "Portafolios y Asesoramiento",
    "subtema": "Por qué baja la porción de renta fija defensiva al subir el riesgo",
    "dificultad": "intermedia",
    "tipo": "multiple_choice",
    "enunciado": "Comparás tres carteras reales: la conservadora tiene 20% en ONs y 20% en FCIs; la moderada tiene 15% en ONs y 10% en FCIs; la agresiva no tiene nada en ONs ni en FCIs. ¿Cuál es la lógica detrás de esa reducción progresiva?",
    "opciones": [
      "Las ONs y los FCIs directamente dejan de existir como opción para las carteras más grandes porque directamente ya no tienen demanda de ningún tipo de inversor en el mercado",
      "Es un error: todas las carteras deberían tener el mismo porcentaje en ONs y FCIs, sin importar el perfil",
      "A mayor tolerancia al riesgo y horizonte más largo, se prioriza el crecimiento de la renta variable sobre la estabilidad que dan ONs y FCIs",
      "Es simplemente una cuestión de moda entre asesores, sin relación real con el riesgo asumido"
    ],
    "respuesta_correcta": 2,
    "explicacion": "No es casualidad ni arbitrario: cada clase de activo cumple un rol. Las ONs y los FCIs de renta fija aportan estabilidad y flujo predecible, algo valioso para perfiles conservadores. A medida que el cliente puede tolerar más volatilidad y tiene más tiempo por delante, tiene sentido resignar parte de esa estabilidad a cambio de mayor potencial de crecimiento."
  },
  {
    "id": "PORT-CASO-005",
    "categoria": "Portafolios y Asesoramiento",
    "subtema": "Inferir perfil y horizonte desde una composición agregada",
    "dificultad": "avanzada",
    "tipo": "caso_abierto",
    "enunciado": "Un colega te pasa la composición de una cartera: 5% en acciones locales, 30% en CEDEARs, 20% en FCIs, 20% en Obligaciones Negociables y 25% en bonos públicos entre dólares y CER. Te pregunta a qué perfil de cliente y horizonte de inversión le asignarías esta cartera, y por qué. Respondé en 3-4 líneas.",
    "respuesta_modelo": "Puntos esperados: (1) identificar que la porción total en renta variable (acciones + CEDEARs) es del orden de 35%, minoritaria frente al 65% en renta fija diversificada (ONs, bonos públicos, FCIs), (2) que concluya que esto sugiere un perfil conservador o conservador-moderado, con horizonte de mediano plazo, que prioriza no ver sobresaltos grandes, (3) que mencione que la diversificación dentro de la porción de renta fija (varios instrumentos distintos) ayuda a reducir el riesgo específico de cada uno."
  },
  {
    "id": "PORT-MC-016",
    "categoria": "Portafolios y Asesoramiento",
    "subtema": "Perfil declarado vs horizonte real",
    "dificultad": "avanzada",
    "tipo": "multiple_choice",
    "enunciado": "Dos clientes dicen tener perfil 'moderado', pero uno tiene un horizonte de 1 año (necesita el dinero pronto) y el otro de 8 años. ¿Debería la cartera agregada por clase de activo ser idéntica para ambos?",
    "opciones": [
      "No necesariamente: el horizonte corto limita el tiempo para recuperarse de una caída, así que conviene bajar algo la renta variable",
      "Sí: si el perfil de riesgo declarado es el mismo, la cartera debe ser idéntica sin importar el horizonte y no hace falta charlar nunca con el cliente sobre sus plazos reales",
      "No: hay que poner absolutamente todo en efectivo cuando el horizonte de inversión es corto",
      "El horizonte temporal es irrelevante a la hora de armar cualquier tipo de cartera de inversión"
    ],
    "respuesta_correcta": 0,
    "explicacion": "El perfil de riesgo (cuánta volatilidad tolera emocionalmente el cliente) y el horizonte (cuánto tiempo tiene para recuperarse de una caída) son dos variables distintas que hay que combinar. Un mismo perfil 'moderado' puede traducirse en carteras algo distintas según cuán cerca esté el cliente de necesitar ese dinero."
  },
  {
    "id": "PORT-MC-017",
    "categoria": "Portafolios y Asesoramiento",
    "subtema": "No existe un número mágico único",
    "dificultad": "basica",
    "tipo": "multiple_choice",
    "enunciado": "Un cliente te pregunta: '¿Existe un número exacto y único de cuánto debería tener en acciones vs. bonos para mi perfil?' ¿Qué le respondés?",
    "opciones": [
      "Sí, existe una fórmula matemática única que todos los asesores del mercado usan exactamente igual",
      "No hay un número mágico único: hay rangos orientativos según perfil y horizonte, ajustados a la situación de cada cliente",
      "Los porcentajes se definen una sola vez al abrir la cuenta del cliente y nunca más se revisan",
      "No importa la distribución entre clases de activo, lo único que importa es elegir buenos activos individuales y ese enfoque funciona igual de bien sin importar el perfil del cliente"
    ],
    "respuesta_correcta": 1,
    "explicacion": "Es importante que el cliente entienda que los porcentajes que ve son orientativos, no una fórmula rígida universal. Sirven como punto de partida razonable, pero se ajustan según la situación particular de cada persona y se revisan con el tiempo."
  },
  {
    "id": "EMP-MC-001",
    "categoria": "Renta Variable",
    "subtema": "Precio y expectativas (caso MELI)",
    "dificultad": "intermedia",
    "tipo": "multiple_choice",
    "enunciado": "En el tercer trimestre de 2026, MercadoLibre vendió 45% más que un año antes, pero su resultado operativo bajó 6,6% y la acción cayó cerca de 20% en un mes. ¿Qué dato explica mejor la reacción del mercado?",
    "opciones": [
      "Las ventas: crecer 45% es poco para una empresa que viene creciendo más de 30% hace casi ocho años.",
      "La ganancia neta, que subió apenas 6% y quedó por debajo de lo que el mercado esperaba para el trimestre.",
      "El margen operativo, que bajó a 6,3%: el mercado duda de cuánta ganancia le dejará tanto crecimiento.",
      "El tipo de cambio en Brasil, que es lo único que mueve la acción de MELI en el corto plazo."
    ],
    "respuesta_correcta": 2,
    "explicacion": "El mercado ya descontaba que MELI iba a crecer mucho. Lo que cambió la expectativa fue la rentabilidad: de cada 100 dólares vendidos le quedaron 6,3 de resultado operativo, menos que antes, por más gastos de envío y marketing. El precio sigue a las ganancias futuras, no a las ventas. La ganancia neta subió, pero por un efecto impositivo, no por el negocio."
  },
  {
    "id": "EMP-MC-002",
    "categoria": "Renta Variable",
    "subtema": "Sensibilidad al petróleo (VIST vs XOM)",
    "dificultad": "intermedia",
    "tipo": "multiple_choice",
    "enunciado": "Un cliente tiene Vista (VIST) y ExxonMobil (XOM). El petróleo Brent cae USD 15 en un mes. ¿Qué es razonable esperar?",
    "opciones": [
      "Que VIST sufra más: es solo extracción y está en crecimiento; la refinación de XOM amortigua parte de la baja.",
      "Que XOM sufra más: al ser mucho más grande, la baja del petróleo le pega sobre muchos más barriles producidos.",
      "Que ambas se muevan casi igual, porque las dos venden el mismo commodity al mismo precio internacional.",
      "Que ninguna se vea muy afectada, porque las dos cobran en dólares y eso las protege de la baja del crudo."
    ],
    "respuesta_correcta": 0,
    "explicacion": "Vista solo extrae y vende crudo: su generación depende directamente del precio (la propia empresa estimó unos USD 200 millones de EBITDA semestral por cada USD 10 de Brent). Exxon está integrada: cuando el crudo baja, su negocio de refinación suele mejorar márgenes, como pasó en el tercer trimestre de 2026. Que sean más grandes no significa que sean más sensibles en proporción, y cobrar en dólares protege del peso, no del precio del petróleo."
  },
  {
    "id": "EMP-MC-003",
    "categoria": "Renta Variable",
    "subtema": "Cómo valuar un banco (JPM)",
    "dificultad": "intermedia",
    "tipo": "multiple_choice",
    "enunciado": "Querés evaluar si la acción de JPMorgan está cara o barata. ¿Qué combinación de indicadores es la más adecuada?",
    "opciones": [
      "El margen bruto sobre ventas y el P/E, como se haría con cualquier empresa industrial o de consumo masivo.",
      "El costo por unidad producida y la deuda neta sobre EBITDA de los últimos doce meses de la empresa.",
      "La cantidad de sucursales y el crecimiento de clientes, porque el valor de un banco depende de su tamaño.",
      "El precio sobre valor libros, junto con la rentabilidad sobre el patrimonio, la morosidad y el capital."
    ],
    "respuesta_correcta": 3,
    "explicacion": "El negocio de un banco es su balance: presta y capta depósitos. Por eso se lo valúa contra su patrimonio (P/BV) y se mira cuánto gana sobre ese patrimonio (ROE o ROTCE), cuántos préstamos no se pagan y cuánto colchón de capital tiene. JPMorgan cotizaba a unas 2,5 veces su valor libros con una rentabilidad cercana al 20%: el múltiplo alto se explica por la rentabilidad alta. 'Margen bruto' y 'deuda/EBITDA' no aplican a un banco."
  },
  {
    "id": "EMP-MC-004",
    "categoria": "Renta Variable",
    "subtema": "Calidad de la ganancia",
    "dificultad": "intermedia",
    "tipo": "multiple_choice",
    "enunciado": "Una empresa informa que su ganancia neta subió 40%, pero su resultado operativo cayó 10%. En las notas aclara que vendió un edificio en el trimestre. ¿Cuál es la lectura correcta?",
    "opciones": [
      "Fue un trimestre excelente: la ganancia neta es lo que le importa al accionista y creció con fuerza.",
      "La ganancia creció por una venta que no se repite; el negocio en sí empeoró y eso es lo que hay que seguir.",
      "Los números se contradicen, así que conviene esperar a que la empresa corrija sus estados contables.",
      "El resultado operativo no importa a largo plazo, porque las empresas siempre encuentran cómo compensarlo."
    ],
    "respuesta_correcta": 1,
    "explicacion": "Es un problema de calidad de la ganancia: una venta de un activo suma una vez y no se repite. El negocio que va a generar las ganancias futuras (el resultado operativo) empeoró. Le pasó algo parecido a MELI en el tercer trimestre de 2026 con un impuesto más bajo, y lo contrario a Vista, cuya ganancia neta bajó porque el año anterior había tenido una ganancia por única vez."
  },
  {
    "id": "EMP-MC-005",
    "categoria": "Renta Variable",
    "subtema": "P/E sobre ganancias futuras",
    "dificultad": "basica",
    "tipo": "multiple_choice",
    "enunciado": "Una acción cotiza a USD 90. Se espera que la empresa gane USD 6 por acción este año y USD 9 el año próximo. ¿Qué P/E estás pagando sobre la ganancia del año próximo?",
    "opciones": [
      "15 veces, porque siempre se divide el precio por la ganancia de este año, que es el único dato conocido.",
      "6 veces, porque la ganancia del próximo año es 50% mayor y eso reduce el múltiplo actual a la mitad.",
      "10 veces (90 ÷ 9). Sobre la ganancia de este año serían 15: es el mismo precio, leído de otra forma.",
      "No se puede calcular sin conocer también la deuda de la empresa y su valor libros por acción."
    ],
    "respuesta_correcta": 2,
    "explicacion": "P/E = precio ÷ ganancia por acción. Sobre la ganancia esperada del año próximo: 90 ÷ 9 = 10 veces. Sobre la de este año: 90 ÷ 6 = 15. Por eso, cuando alguien dice 'el P/E es X', siempre hay que preguntar sobre qué ganancia. Para MELI, a USD 1.490 en noviembre de 2026, eran unas 39 veces la ganancia esperada de 2026 y unas 27 veces la de 2027."
  },
  {
    "id": "EMP-MC-006",
    "categoria": "Renta Variable",
    "subtema": "Crecimiento vs. cambio de múltiplo",
    "dificultad": "avanzada",
    "tipo": "multiple_choice",
    "enunciado": "En cuatro años, la ganancia por acción de una empresa se duplica, pero el mercado pasa de pagarle un P/E de 40 a uno de 20. Sin contar dividendos, ¿qué pasó con el precio de la acción?",
    "opciones": [
      "Se duplicó, porque en el largo plazo el precio de una acción siempre acompaña a la ganancia de la empresa.",
      "Subió alrededor de 50%, porque la suba de la ganancia compensa solo una parte de la baja del múltiplo.",
      "Bajó a la mitad, porque el múltiplo se redujo a la mitad y eso es lo que más pesa en el precio de una acción.",
      "Quedó igual: la ganancia se duplicó y el múltiplo se redujo a la mitad, así que los dos efectos se cancelan."
    ],
    "respuesta_correcta": 3,
    "explicacion": "Precio = ganancia × P/E. Si la ganancia se multiplica por 2 y el P/E por 0,5, el precio se multiplica por 2 × 0,5 = 1: queda igual. Es la trampa de comprar una gran empresa demasiado cara: el negocio puede cumplir todo lo prometido y el accionista no ganar nada en cuatro años."
  },
  {
    "id": "EMP-MC-007",
    "categoria": "Renta Variable",
    "subtema": "CEDEAR: dólar implícito",
    "dificultad": "avanzada",
    "tipo": "multiple_choice",
    "enunciado": "El CEDEAR de MELI (ratio 120:1) cotiza a $24.000. La acción en el Nasdaq vale USD 1.600 y el dólar CCL de mercado está en $1.650. ¿Qué te dicen estos números?",
    "opciones": [
      "Que el CEDEAR está caro: su dólar implícito es $1.800 (24.000 × 120 ÷ 1.600), muy por encima del CCL.",
      "Que el CEDEAR está barato: como cotiza en pesos, conviene comprarlo antes de que se ajuste al dólar.",
      "Nada importante: las diferencias entre el CEDEAR y la acción son normales y no hace falta revisarlas.",
      "Que la acción en el Nasdaq está cara y probablemente baje para acomodarse al precio local del CEDEAR."
    ],
    "respuesta_correcta": 0,
    "explicacion": "Dólar implícito = precio del CEDEAR × ratio ÷ precio de la acción = 24.000 × 120 ÷ 1.600 = $1.800, un 9% más que el CCL de mercado. Quien compra ese CEDEAR paga un sobreprecio que va a perder cuando el arbitraje lo corrija. Antes de comprar un CEDEAR, sobre todo en momentos de poca liquidez, conviene chequear este número."
  },
  {
    "id": "EMP-MC-008",
    "categoria": "Renta Variable",
    "subtema": "Tesis de inversión: señal de salida",
    "dificultad": "intermedia",
    "tipo": "multiple_choice",
    "enunciado": "Tu tesis sobre MELI es: 'el crédito de Mercado Pago se cobra y los márgenes van a recuperarse'. ¿Cuál es la mejor señal para revisar esa tesis?",
    "opciones": [
      "Que la acción caiga 15% desde el precio de compra, porque eso confirma que la tesis estaba equivocada.",
      "Que la morosidad de 15 a 90 días suba de forma sostenida o que el margen operativo siga cayendo dos trimestres.",
      "Que un competidor anuncie una promoción agresiva en Brasil para la temporada de fiestas de fin de año.",
      "Que pasen seis meses sin que la acción suba, porque el mercado ya debería haber reconocido el valor."
    ],
    "respuesta_correcta": 1,
    "explicacion": "Una buena señal de salida mide el negocio que sostiene la tesis, no el precio. Si la tesis dice 'el crédito se cobra', el indicador es la morosidad (que estaba estable en 7% en el tercer trimestre de 2026). Si dice 'los márgenes se recuperan', el indicador es el margen operativo. Una caída de precio puede ser ruido o hasta una oportunidad; una promoción puntual de un competidor no alcanza para cambiar la tesis."
  },
  {
    "id": "EMP-CASO-001",
    "categoria": "Renta Variable",
    "subtema": "Revisar una tesis cuando el negocio cambia (Globant)",
    "dificultad": "avanzada",
    "tipo": "caso_abierto",
    "enunciado": "Un cliente tiene 12% de su cartera en Globant, comprada hace dos años. Leyó que las ventas no crecen, que la empresa bajó su proyección anual y que redujo personal. Te pregunta si vende todo. Escribí en 5 o 6 líneas cómo encararías la conversación.",
    "respuesta_modelo": "Puntos a evaluar: (1) vuelve a la razón de compra: ¿cuál era la tesis y qué parte cambió? (el driver principal, la demanda de proyectos, se frenó); (2) separa el negocio del precio: la pregunta no es cuánto cayó la acción sino si la empresa puede volver a crecer, por ejemplo con su modelo de suscripción con IA; (3) define una señal concreta para decidir (si en los próximos trimestres las ventas siguen sin crecer o vuelve a bajar la proyección); (4) revisa el tamaño: 12% en una sola acción es mucho para la mayoría de los perfiles, así que reducir parte puede tener sentido aunque la tesis siga en pie; (5) evita prometer un rebote."
  },
  {
    "id": "EMP-CASO-002",
    "categoria": "Renta Variable",
    "subtema": "Explicar un múltiplo alto al cliente (MELI)",
    "dificultad": "intermedia",
    "tipo": "caso_abierto",
    "enunciado": "Un cliente te dice: 'Me dijeron que MercadoLibre está carísima porque cotiza a 40 veces sus ganancias. ¿Es verdad?'. Escribí en 4 o 5 líneas cómo se lo explicarías, sin jerga.",
    "respuesta_modelo": "Puntos a evaluar: (1) traduce el P/E: pagar 40 veces es pagar hoy 40 años de la ganancia actual; (2) explica que un múltiplo alto puede tener sentido si la ganancia crece mucho (sobre la ganancia esperada para el año siguiente, el múltiplo baja a cerca de 27); (3) aclara que eso depende de que el crecimiento llegue, y que el riesgo concreto hoy son los márgenes que vienen bajando; (4) compara contra algo razonable (su propia historia o empresas parecidas), no contra una regla fija; (5) no da una respuesta de sí o no sin ese contexto."
  },
  {
    "id": "FCI-MC-001",
    "categoria": "Fondos Comunes",
    "subtema": "Cuotaparte y rendimiento neto",
    "dificultad": "basica",
    "tipo": "multiple_choice",
    "enunciado": "Un cliente pregunta por qué en su resumen no aparece ningún cobro de comisión del fondo común que tiene hace un año. ¿Qué le explicás?",
    "opciones": [
      "Que ese fondo en particular no cobra comisiones, porque es de renta fija y esos fondos están exentos.",
      "Que la comisión se cobra recién cuando rescata, como un único cargo sobre el total de lo que retire.",
      "Que la comisión se descuenta día a día de la cuotaparte: el rendimiento que ve ya es neto.",
      "Que la comisión la paga la sociedad depositaria, por eso no se refleja en la cuenta de ningún cliente."
    ],
    "respuesta_correcta": 2,
    "explicacion": "Los factsheets lo aclaran: los rendimientos publicados son netos de honorarios de la sociedad gerente y de la depositaria. Por eso la comisión es un costo 'invisible' que conviene mostrarle al cliente."
  },
  {
    "id": "FCI-MC-002",
    "categoria": "Fondos Comunes",
    "subtema": "Leer la TIR de un fondo",
    "dificultad": "intermedia",
    "tipo": "multiple_choice",
    "enunciado": "El factsheet de un fondo de renta fija en pesos dice 'TIR 25,5%' y la clase del cliente cobra 2,45% anual. ¿Cuál es la lectura más razonable?",
    "opciones": [
      "Que el cliente tiene asegurado un 25,5% anual mientras mantenga las cuotapartes en el fondo.",
      "Que hoy la cartera rinde cerca de 25,5% y, sin la comisión, al cliente le queda cerca de 23%.",
      "Que la TIR ya tiene descontada la comisión, así que el cliente va a recibir exactamente 25,5%.",
      "Que la TIR es lo que el fondo rindió en los últimos doce meses, medido en la clase más barata."
    ],
    "respuesta_correcta": 1,
    "explicacion": "La TIR es lo que rinde hoy la cartera si los activos se mantienen: no es una promesa ni un dato histórico, y en general está calculada antes de las comisiones del fondo."
  },
  {
    "id": "FCI-MC-003",
    "categoria": "Fondos Comunes",
    "subtema": "Duration de un fondo",
    "dificultad": "intermedia",
    "tipo": "multiple_choice",
    "enunciado": "Un fondo de bonos en dólares sin riesgo argentino tiene duration 1. Un cliente se sorprende porque el fondo cerró un año con −0,6%. ¿Cuál es la explicación más probable?",
    "opciones": [
      "Que subieron las tasas de los bonos que tiene el fondo y, por la duration, bajó un poco su precio.",
      "Que la gestora cometió un error, porque un fondo sin riesgo argentino no debería tener años negativos.",
      "Que el dólar se devaluó contra el peso y eso redujo el valor de la cuotaparte medido en dólares.",
      "Que el fondo cobró una comisión extraordinaria ese año para compensar los rescates de otros clientes."
    ],
    "respuesta_correcta": 0,
    "explicacion": "Es lo que le pasó al Balanz Sudamericano en 2021 y 2022. Baja duration significa poca sensibilidad a las tasas, no cero. Un fondo 'conservador' en dólares puede tener años levemente negativos."
  },
  {
    "id": "FCI-MC-004",
    "categoria": "Fondos Comunes",
    "subtema": "Nombre del fondo contra composición",
    "dificultad": "intermedia",
    "tipo": "multiple_choice",
    "enunciado": "Un fondo se llama 'Lecaps', pero su factsheet muestra 74% en Lecaps, 13% en plazos fijos y 10,5% en bonos CER. ¿Qué conclusión es la correcta?",
    "opciones": [
      "Que el fondo está violando su reglamento y conviene rescatar de inmediato hasta que se aclare.",
      "Que la composición no importa, porque lo que define el riesgo de un fondo es su nombre comercial.",
      "Que hay que avisarle a la CNV, porque un fondo solo puede tener los activos que figuran en su nombre.",
      "Que el nombre es una etiqueta comercial: el riesgo real se ve en la composición."
    ],
    "respuesta_correcta": 3,
    "explicacion": "Los reglamentos suelen dar margen al gestor. No es necesariamente un problema, pero el asesor tiene que saber qué hay adentro: un 10% en CER no se comporta igual que una Lecap."
  },
  {
    "id": "FCI-MC-005",
    "categoria": "Fondos Comunes",
    "subtema": "Latam con y sin Argentina",
    "dificultad": "intermedia",
    "tipo": "multiple_choice",
    "enunciado": "Un cliente quiere dólares rindiendo, pero sin ningún riesgo de crédito argentino. Le ofrecen un fondo llamado 'Latam'. ¿Qué verificás antes de recomendarlo?",
    "opciones": [
      "Que tenga calificación AAA, porque eso garantiza que no tiene bonos argentinos en la cartera.",
      "Que la composición confirme que excluye Argentina: hay fondos 'Latam' que incluyen bonos argentinos.",
      "Que rinda más de 5%, porque un fondo regional sin Argentina nunca rinde menos que eso.",
      "Que tenga rescate en el día, porque los fondos regionales con rescate más largo tienen bonos locales."
    ],
    "respuesta_correcta": 1,
    "explicacion": "En Balanz, por ejemplo, conviven el Latam (Estrategia III), con Argentina, y el Sudamericano, sin Argentina. La palabra 'Latam' sola no alcanza: hay que verlo en la composición."
  },
  {
    "id": "FCI-MC-006",
    "categoria": "Fondos Comunes",
    "subtema": "Comisión relativa al rendimiento",
    "dificultad": "avanzada",
    "tipo": "multiple_choice",
    "enunciado": "El fondo A rinde 25,5% con 2,45% de comisión; el fondo B rinde 5,3% con 1,1% de comisión. ¿En cuál se lleva la comisión una parte mayor del rendimiento?",
    "opciones": [
      "En el A, porque su comisión de 2,45% es más del doble que la del fondo B en términos absolutos.",
      "En ninguno: en los dos casos la comisión representa una proporción parecida del rendimiento total.",
      "En el B: 1,1 sobre 5,3 es cerca de 20% del rendimiento; en el A, 2,45 sobre 25,5 es cerca de 10%.",
      "No se puede saber sin el patrimonio de cada fondo, porque la comisión depende del monto administrado."
    ],
    "respuesta_correcta": 2,
    "explicacion": "La comisión hay que compararla con lo que rinde el fondo. Una comisión 'baja' sobre un rendimiento bajo puede pesar más que una 'alta' sobre un rendimiento alto."
  },
  {
    "id": "FCI-MC-007",
    "categoria": "Fondos Comunes",
    "subtema": "Clases de cuotaparte",
    "dificultad": "intermedia",
    "tipo": "multiple_choice",
    "enunciado": "Un mismo fondo tiene clase A con 2,45% de comisión y clase D con 1,60%. Un cliente pregunta si la clase D tiene activos de menor calidad. ¿Qué le respondés?",
    "opciones": [
      "Que no: las clases comparten la cartera; cambia la comisión según monto o tipo de inversor.",
      "Que sí: la clase más barata invierte en activos más riesgosos para compensar la menor comisión.",
      "Que sí: cada clase tiene su propia cartera, y la D suele estar más concentrada en pocos emisores.",
      "Que no se sabe: cada clase publica su propio factsheet y hay que compararlos activo por activo."
    ],
    "respuesta_correcta": 0,
    "explicacion": "Las clases son una forma de cobrar distinto por el mismo fondo. Por eso conviene averiguar a qué clase accede el cliente: la diferencia es rendimiento extra sin más riesgo."
  },
  {
    "id": "FCI-MC-008",
    "categoria": "Fondos Comunes",
    "subtema": "Plazo de rescate y necesidad",
    "dificultad": "basica",
    "tipo": "multiple_choice",
    "enunciado": "Una empresa necesita pagar sueldos dentro de dos días hábiles y tiene los pesos disponibles hoy. ¿Qué fondo encaja mejor?",
    "opciones": [
      "Un fondo de ONs en pesos, que rinde más y tiene rescate en 24 horas, alcanza para pagar a tiempo.",
      "Un fondo dollar linked, para cubrir los sueldos en caso de que el dólar oficial suba en estos días.",
      "Un fondo de renta fija de mediano plazo, porque rinde más y el rescate igual llega antes del pago.",
      "Un money market en pesos: rescate en el día y casi sin oscilaciones para un plazo tan corto."
    ],
    "respuesta_correcta": 3,
    "explicacion": "Para plata con fecha de uso cercana, lo primero es disponibilidad y estabilidad. Los fondos con más duration o riesgo de crédito pueden bajar justo antes del pago."
  },
  {
    "id": "FCI-MC-009",
    "categoria": "Fondos Comunes",
    "subtema": "Rendimiento pasado",
    "dificultad": "intermedia",
    "tipo": "multiple_choice",
    "enunciado": "Un fondo de Lecaps rindió 35% en 2025, pero su TIR actual es 25,5%. Un cliente quiere entrar 'porque rinde 35%'. ¿Qué le aclarás?",
    "opciones": [
      "Que el 35% es lo mínimo que puede esperar, porque los fondos de renta fija suelen repetir su rendimiento.",
      "Que el 35% fue con tasas más altas que las de hoy: lo que rinde hoy la cartera es cerca de 25,5%.",
      "Que la TIR no importa en fondos de corto plazo, porque el gestor puede cambiar la cartera todos los días.",
      "Que el 35% es neto y el 25,5% es bruto, así que en la práctica las dos cifras significan lo mismo."
    ],
    "respuesta_correcta": 1,
    "explicacion": "El rendimiento pasado refleja un contexto que ya no está. En 2026 hasta septiembre ese fondo rindió 21,97%, porque bajaron las tasas en pesos."
  },
  {
    "id": "FCI-MC-010",
    "categoria": "Fondos Comunes",
    "subtema": "Fondos en dólares: MEP o cable",
    "dificultad": "avanzada",
    "tipo": "multiple_choice",
    "enunciado": "Un cliente tiene dólares MEP en su cuenta y quiere suscribir un fondo de acciones del exterior que opera en dólar cable. ¿Qué tenés que tener en cuenta?",
    "opciones": [
      "Nada: un fondo en dólares acepta cualquier tipo de dólar y la conversión la hace la depositaria sin costo.",
      "Que primero tiene que vender sus dólares contra pesos y suscribir el fondo en pesos al tipo de cambio oficial.",
      "Que hay que pasar los dólares de MEP a cable, y si hay diferencia entre los dos, eso tiene un costo.",
      "Que no puede suscribirlo, porque los fondos en dólar cable solo están habilitados para personas jurídicas."
    ],
    "respuesta_correcta": 2,
    "explicacion": "Antes de suscribir un fondo en dólares, chequeá en la ficha si opera en MEP o en cable. Si no coincide con los dólares del cliente, hay un paso extra y un posible costo."
  },
  {
    "id": "FCI-CASO-001",
    "categoria": "Fondos Comunes",
    "subtema": "Leer un factsheet para un cliente",
    "dificultad": "intermedia",
    "tipo": "caso_abierto",
    "enunciado": "Un cliente te reenvía la descripción comercial de un fondo (\"Diversificá tus riesgos invirtiendo en Latam\") y te pregunta si le conviene. Escribí en 4 o 5 líneas qué mirarías en el factsheet antes de responderle y por qué.",
    "respuesta_modelo": "Puntos a evaluar: (1) no responde a partir de la descripción comercial; (2) revisa la estrategia y confirma si incluye o excluye Argentina; (3) mira la TIR y la compara con alternativas, aclarando que no es una promesa; (4) mira la duration para saber cuánto puede oscilar si cambian las tasas; (5) revisa composición y top 10 (concentración, países, emisores); (6) revisa comisiones de la clase a la que accede el cliente, plazo de rescate y si opera en MEP o cable; (7) relaciona todo con el objetivo y el horizonte del cliente."
  },
  {
    "id": "FCI-MC-011",
    "categoria": "Fondos Comunes",
    "subtema": "Rendimiento histórico contra esperado",
    "dificultad": "avanzada",
    "tipo": "multiple_choice",
    "enunciado": "Dos fondos de bonos largos en dólares, con la misma cartera y duration 6. El A muestra +12% en los últimos 12 meses (bajaron las tasas) y el B, −6% (subieron). Hoy el A tiene TIR de 6% y el B, de 10%. ¿Qué lectura es correcta?",
    "opciones": [
      "Conviene el A: un rendimiento de 12% muestra que su gestor elige mejor los bonos de la cartera.",
      "El B hoy rinde más hacia adelante: su caída vino de la misma suba de tasas que subió su TIR.",
      "Conviene el A: cuando un fondo cae 6% en un año, suele seguir cayendo durante el año siguiente.",
      "Son equivalentes: si tienen la misma cartera, el rendimiento futuro va a ser idéntico en ambos."
    ],
    "respuesta_correcta": 1,
    "explicacion": "En renta fija larga, el rendimiento pasado y el esperado pueden ir en sentidos opuestos. Una suba de tasas hace caer el precio (pasado malo) y a la vez sube la TIR (futuro mejor), siempre que los emisores paguen."
  },
  {
    "id": "CRIT-MC-001",
    "categoria": "Portafolios y Asesoramiento",
    "subtema": "CER + 7% contra dólar 7%",
    "dificultad": "intermedia",
    "tipo": "multiple_choice",
    "enunciado": "Un bono CER rinde CER + 7% y un bono en dólares rinde 7%. ¿En qué caso el bono CER termina rindiendo más medido en dólares?",
    "opciones": [
      "Siempre, porque además de la tasa de 7% le suma la inflación del período, que en Argentina es alta.",
      "Si el dólar sube menos que la inflación en el período: el peso se fortalece en términos reales.",
      "Nunca, porque un bono en pesos no puede ganarle a un bono en dólares cuando se lo mide en dólares.",
      "Solo si el bono CER tiene más duration que el bono en dólares y bajan las tasas de los dos mercados."
    ],
    "respuesta_correcta": 1,
    "explicacion": "El 7% del CER es por encima de la inflación en pesos; el 7% del bono en dólares es en dólares. Gana el CER si el dólar sube menos que la inflación (como en 2026) y gana el bono en dólares si sube más."
  },
  {
    "id": "CRIT-MC-002",
    "categoria": "Portafolios y Asesoramiento",
    "subtema": "Atraso cambiario y año electoral",
    "dificultad": "avanzada",
    "tipo": "multiple_choice",
    "enunciado": "En 2026 el dólar subió mucho menos que la inflación y en 2027 hay elecciones. Un cliente con gastos en pesos tiene todo en CER. ¿Qué riesgo conviene señalarle?",
    "opciones": [
      "Ninguno: el CER lo protege de la inflación, y para alguien que gasta en pesos esa es la única protección necesaria.",
      "Que el CER deja de ajustar en los años electorales, y por eso conviene pasar todo a bonos a tasa fija en pesos.",
      "Que si el dólar se corrige y sube más que la inflación, lo que tenga para objetivos en dólares va a quedar corto.",
      "Que en un año electoral los bonos CER se suspenden, y no va a poder vender hasta que termine la elección."
    ],
    "respuesta_correcta": 2,
    "explicacion": "Con el dólar atrasado y un año electoral por delante, aumenta la probabilidad de que el dólar suba más que la inflación. Para gastos en pesos, el CER sigue siendo buena cobertura; para objetivos en dólares, no alcanza."
  },
  {
    "id": "CRIT-MC-003",
    "categoria": "Portafolios y Asesoramiento",
    "subtema": "Cliente con idea propia: petróleo",
    "dificultad": "intermedia",
    "tipo": "multiple_choice",
    "enunciado": "Un cliente quiere comprar XOM \"porque el petróleo está alto\". ¿Cuál es la advertencia más importante?",
    "opciones": [
      "Que el crudo caro ya está en el precio: para ganar tiene que subir más, y es muy volátil.",
      "Que las petroleras no ganan más cuando sube el petróleo, porque sus costos suben en la misma proporción.",
      "Que no se pueden comprar acciones de petroleras de Estados Unidos desde Argentina por las regulaciones.",
      "Que XOM solo sube cuando baja el petróleo, porque se beneficia de los menores costos de refinación."
    ],
    "respuesta_correcta": 0,
    "explicacion": "La idea tiene lógica, pero el mercado ya sabe que el petróleo está alto. La acción reacciona a lo que cambia. Y el crudo es muy volátil: el Brent bajó de unos 116 a 92 dólares en dos semanas a fines de octubre de 2026."
  },
  {
    "id": "CRIT-MC-004",
    "categoria": "Portafolios y Asesoramiento",
    "subtema": "Concentración en una acción de moda",
    "dificultad": "intermedia",
    "tipo": "multiple_choice",
    "enunciado": "Una clienta agresiva quiere poner toda su cartera en NVDA. ¿Cuál es la mejor respuesta?",
    "opciones": [
      "Ejecutar sin comentarios: si su perfil es agresivo, cualquier decisión de concentración es aceptable.",
      "Negarte a hacerlo, porque concentrar en una sola acción no es aceptable para ningún perfil de cliente.",
      "Recomendarle comprar NVDA, pero solo después de esperar una caída de 20% para entrar a mejor precio.",
      "Validar la idea, mostrarle cuánto puede caer y proponer que sea solo una parte."
    ],
    "respuesta_correcta": 3,
    "explicacion": "El rol del asesor con un cliente que trae su idea no es prohibir ni ejecutar sin pensar: es advertir el riesgo concreto y dimensionar la apuesta para que sea una que pueda soportar."
  },
  {
    "id": "CRIT-MC-005",
    "categoria": "Portafolios y Asesoramiento",
    "subtema": "Riesgo electoral: diferenciar activos",
    "dificultad": "intermedia",
    "tipo": "multiple_choice",
    "enunciado": "Un cliente quiere vender todo lo argentino por las elecciones. Tiene Globales largos, ONs de empresas sólidas y LECAPs para sus gastos. ¿Qué es lo más expuesto al riesgo electoral?",
    "opciones": [
      "Las LECAPs, porque son deuda del Tesoro y el riesgo electoral afecta sobre todo al Estado nacional.",
      "Los Globales largos: mucha duration y riesgo país. Las ONs y LECAPs se mueven menos.",
      "Las ONs, porque las empresas privadas son siempre las primeras en dejar de pagar en una crisis argentina.",
      "Todos por igual, porque el riesgo electoral afecta de la misma forma a cualquier activo argentino."
    ],
    "respuesta_correcta": 1,
    "explicacion": "El riesgo argentino no es parejo. Los Globales largos son lo más sensible. Diferenciar permite bajar la exposición donde más pega sin desarmar todo."
  },
  {
    "id": "CRIT-MC-006",
    "categoria": "Portafolios y Asesoramiento",
    "subtema": "Volatilidad y rango de resultados",
    "dificultad": "intermedia",
    "tipo": "multiple_choice",
    "enunciado": "Una cartera tiene retorno esperado de 8% y volatilidad de 15%. ¿Qué le decís al cliente antes de invertir?",
    "opciones": [
      "Que va a ganar 8% por año, con una variación de 15% que se compensa entre los años buenos y los malos.",
      "Que la volatilidad de 15% significa que nunca puede perder más de 15% en un año calendario cualquiera.",
      "Que en 2 de cada 3 años debería quedar entre −7% y +23%, y que algún año puede ser peor que −7%.",
      "Que la volatilidad solo importa en carteras agresivas; con 8% esperado la cartera es conservadora."
    ],
    "respuesta_correcta": 2,
    "explicacion": "Retorno esperado ± volatilidad da el rango de 2 de cada 3 años. Decirlo antes de invertir evita que el cliente se asuste cuando llega el año malo."
  },
  {
    "id": "CRIT-MC-007",
    "categoria": "Portafolios y Asesoramiento",
    "subtema": "Sacar todo de Argentina no es eliminar riesgo",
    "dificultad": "avanzada",
    "tipo": "multiple_choice",
    "enunciado": "Un cliente pasa toda su cartera a CEDEARs para \"no tener riesgo\". ¿Qué le falta entender?",
    "opciones": [
      "Que los CEDEARs tienen riesgo argentino igual que un bono, porque cotizan en BYMA y están en pesos.",
      "Nada: sin riesgo argentino, una cartera de CEDEARs es la opción más segura para cualquier perfil.",
      "Que los CEDEARs no se pueden vender en un año electoral, así que pierde liquidez justo cuando la necesita.",
      "Que cambió de riesgo, no lo eliminó: las acciones del exterior pueden caer fuerte en un año malo global."
    ],
    "respuesta_correcta": 3,
    "explicacion": "Salir de Argentina protege del año malo local, pero concentrar en acciones del exterior deja la cartera expuesta a una caída global. 'Sin riesgo argentino' no es 'sin riesgo'."
  },
  {
    "id": "CRIT-MC-008",
    "categoria": "Portafolios y Asesoramiento",
    "subtema": "Explicarle a un cliente nuevo",
    "dificultad": "basica",
    "tipo": "multiple_choice",
    "enunciado": "Un cliente nuevo, que no sabe de finanzas, ve que su bono bajó 4% en la semana. ¿Qué explicación le das?",
    "opciones": [
      "Que el mercado está nervioso y paga menos, pero si lo mantiene cobra lo mismo al vencer.",
      "Que subió el riesgo país, aumentó la TIR y por la duration modificada bajó el precio del bono.",
      "Que no se preocupe porque son movimientos normales que no tienen importancia para su cartera.",
      "Que conviene venderlo antes de que siga bajando y volver a comprar cuando el mercado se calme."
    ],
    "respuesta_correcta": 0,
    "explicacion": "Con un cliente nuevo, la explicación tiene que ser cierta, simple y decirle qué significa para él. La versión técnica es correcta, pero le tira cuatro conceptos nuevos de golpe."
  },
  {
    "id": "CRIT-CASO-001",
    "categoria": "Portafolios y Asesoramiento",
    "subtema": "Cliente con idea propia y advertencia de riesgo",
    "dificultad": "avanzada",
    "tipo": "caso_abierto",
    "enunciado": "Un cliente moderado te dice: \"Vendé todos mis bonos y ONs argentinos y comprame CEDEARs de tecnológicas, que en 2027 acá se pudre todo\". Escribí en 4 o 5 líneas cómo le responderías.",
    "respuesta_modelo": "Puntos a evaluar: (1) valida la preocupación electoral sin discutir la predicción política; (2) diferencia los riesgos: soberanos largos muy expuestos, ONs de buenas empresas y bonos que vencen dentro del mandato mucho menos; (3) advierte que pasar todo a tecnológicas cambia de riesgo, no lo elimina: concentra en acciones volátiles del exterior; (4) propone una salida parcial y diversificada (por ejemplo, reducir soberanos largos, sumar CEDEARs variados o un fondo Latam sin Argentina); (5) recuerda que si no pasa nada malo, salir de todo también tiene un costo; (6) deja registro de la advertencia."
  },
  {
    "id": "MERC-MC-001",
    "categoria": "Operatoria de Mercado",
    "subtema": "Primario y secundario",
    "dificultad": "basica",
    "tipo": "multiple_choice",
    "enunciado": "Un cliente compra AL30 en la pantalla de BYMA. ¿Quién recibe la plata que paga?",
    "opciones": [
      "El Tesoro, porque es el emisor del bono y toda compra de un bono suyo lo financia.",
      "El inversor que le vendió el bono: es una operación del mercado secundario.",
      "La Caja de Valores, que retiene la plata hasta que el bono vence y paga al final.",
      "El ALyC, que se queda con el pago como contraparte y le entrega los títulos."
    ],
    "respuesta_correcta": 1,
    "explicacion": "En el secundario los inversores operan entre ellos: el emisor no recibe nada. Solo en el primario (licitación o colocación) la plata va al emisor."
  },
  {
    "id": "MERC-MC-002",
    "categoria": "Operatoria de Mercado",
    "subtema": "Tasa de corte",
    "dificultad": "intermedia",
    "tipo": "multiple_choice",
    "enunciado": "En una licitación, un cliente ofreció en el tramo competitivo una tasa de 6%. La tasa de corte fue 6,8%. ¿Qué tasa recibe?",
    "opciones": [
      "6%, porque es la tasa que ofreció y en el tramo competitivo cada uno recibe la suya.",
      "Un promedio entre su oferta y la tasa de corte, ponderado por el monto que ofreció.",
      "6,8%: todos los adjudicados reciben la tasa de corte, aunque hayan ofrecido menos.",
      "No le adjudican nada, porque su oferta quedó por debajo de la tasa de corte final."
    ],
    "respuesta_correcta": 2,
    "explicacion": "Las ofertas con tasa igual o menor a la de corte se adjudican, y todas reciben la tasa de corte. Ofrecer una tasa baja asegura entrar, no recibir esa tasa."
  },
  {
    "id": "MERC-MC-003",
    "categoria": "Operatoria de Mercado",
    "subtema": "Rol del agente productor",
    "dificultad": "basica",
    "tipo": "multiple_choice",
    "enunciado": "Según la normativa de la CNV (RG 709), ¿cuál de estas actividades le está prohibida a un agente productor?",
    "opciones": [
      "Captar clientes para que los dé de alta el ALyC con el que tiene contrato firmado.",
      "Informarle a un potencial cliente cuáles son los servicios que ofrece su ALyC.",
      "Entregarle al cliente la documentación del ALyC para abrir su cuenta comitente.",
      "Recibir en su propia cuenta los fondos de un cliente para invertirlos por él."
    ],
    "respuesta_correcta": 3,
    "explicacion": "El AP no puede recibir ni custodiar fondos o títulos de clientes: eso lo hace siempre el ALyC. Captar, informar y entregar documentación son sus actividades permitidas."
  },
  {
    "id": "MERC-MC-004",
    "categoria": "Operatoria de Mercado",
    "subtema": "Claves del cliente",
    "dificultad": "basica",
    "tipo": "multiple_choice",
    "enunciado": "Un cliente le ofrece a su agente productor su usuario y clave de la plataforma para que opere por él. ¿Qué dice la norma?",
    "opciones": [
      "Que el agente productor no puede usar contraseñas ni firmas electrónicas de clientes.",
      "Que está permitido si el cliente lo autoriza por escrito y el monto es menor al mínimo fijado.",
      "Que está permitido para clientes mayores de 70 años que no manejan la plataforma por sí mismos.",
      "Que la norma no dice nada al respecto, así que queda a criterio del asesor en cada caso."
    ],
    "respuesta_correcta": 0,
    "explicacion": "La RG 709 lo prohíbe expresamente. Para clientes que no manejan la plataforma, el ALyC suele tener otras formas de recibir sus órdenes."
  },
  {
    "id": "MERC-MC-005",
    "categoria": "Operatoria de Mercado",
    "subtema": "Dónde están los títulos del cliente",
    "dificultad": "intermedia",
    "tipo": "multiple_choice",
    "enunciado": "Un cliente pregunta qué pasa con sus bonos si el ALyC donde tiene la cuenta tiene problemas. ¿Cuál es la base de la respuesta?",
    "opciones": [
      "Que los bonos pasan a ser del ALyC hasta que el cliente los venda, así que depende de su solvencia.",
      "Que los títulos están registrados en Caja de Valores en una subcuenta a nombre del cliente.",
      "Que el Banco Central garantiza las tenencias de bonos de cualquier cliente hasta un monto fijo.",
      "Que el agente productor responde con su patrimonio por los títulos de los clientes que trajo."
    ],
    "respuesta_correcta": 1,
    "explicacion": "Los títulos se registran a nombre del cliente, separados del patrimonio del ALyC. Y el cliente puede verificar sus tenencias en Caja de Valores."
  },
  {
    "id": "MERC-MC-006",
    "categoria": "Operatoria de Mercado",
    "subtema": "Señales de estafa",
    "dificultad": "basica",
    "tipo": "multiple_choice",
    "enunciado": "Un cliente recibe por redes una oferta: \"4% mensual en dólares garantizado, transferí hoy a esta cuenta personal\". ¿Qué le decís?",
    "opciones": [
      "Que puede probar con un monto chico, porque si el rendimiento es real conviene no perder la oportunidad.",
      "Que tiene todas las señales de una estafa: rendimiento garantizado, urgencia y cuenta personal.",
      "Que está bien si la cuenta personal es de un agente registrado en la CNV, porque eso lo vuelve seguro.",
      "Que primero espere a ver si a sus conocidos les pagan durante algunos meses antes de entrar él."
    ],
    "respuesta_correcta": 1,
    "explicacion": "Ningún rendimiento alto está garantizado, y la plata nunca va a una cuenta personal: va a una cuenta a nombre del cliente en una entidad registrada."
  }
];
