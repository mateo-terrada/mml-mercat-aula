/* ============================================================
   MÓDULO · Integración y criterio
   Base: Book cap. 13 + casos reales de asesoramiento.
   ============================================================ */
window.AULA = window.AULA || { modulos: {} };

AULA.modulos.criterio = {
  id: "criterio",
  numero: "09",
  titulo: "Integración y criterio",
  bajada: "Todo junto, frente a un cliente real: comparar tasas que no se comparan, responderle al que viene con su idea, enseñarle al que recién empieza y armar una cartera mirando riesgo, retorno y escenarios.",
  fuente: "Cap. 13 del Book · casos de asesoramiento",
  practica: [
    { titulo: "¿Qué hago si...?", desc: "Los escenarios de la mesa de operaciones son la mejor práctica para este módulo.", href: "simulador.html" },
    { titulo: "Práctica diaria · Portafolios y Asesoramiento", desc: "Preguntas de criterio, perfiles y armado de carteras.", href: "practica.html" }
  ],
  evaluacion: {
    cantidad: 10,
    ids: ["CRIT-MC-001","CRIT-MC-002","CRIT-MC-003","CRIT-MC-004","CRIT-MC-005","CRIT-MC-006","CRIT-MC-007","CRIT-MC-008",
          "CRIT-CASO-001","TRAMPA-MC-002","TRAMPA-MC-008","TRAMPA-MC-017","TRAMPA-MC-012","TRAMPA-CASO-001"]
  },
  lecciones: [

  /* ------------------------------------------------------------ */
  {
    id: "c1",
    titulo: "Antes de recomendar: el método",
    minutos: 9,
    objetivo: "Usar siempre las mismas cuatro preguntas antes de recomendar algo, y reconocer qué tipo de cliente tenés enfrente.",
    bloques: [
      { t: "p", html: `Todo lo que viste en el Aula (bonos, CER, empresas, fondos, macro) son herramientas. El criterio es saber cuál usar con cada cliente. Y el criterio arranca antes de mirar el mercado: arranca con el cliente.` },
      { t: "idea", titulo: "Las cuatro preguntas", html: `<strong>1. ¿Para qué es la plata y cuándo la necesita?</strong> · <strong>2. ¿En qué moneda gasta?</strong> · <strong>3. ¿Cuánto puede ver caer sin desesperarse?</strong> · <strong>4. ¿Qué tiene ya?</strong> (en la cuenta, en el banco, en propiedades). Con estas cuatro respuestas, la mayoría de las recomendaciones se ordenan solas.` },
      { t: "h", texto: "Dos clientes, dos roles" },
      { t: "tabla", cab: ["", "El que recién empieza", "El que viene con su idea"], filas: [
        ["Qué trae", "Dudas, miedo a equivocarse, poco vocabulario", "Una opinión: \"quiero NVDA\", \"vendo todo Argentina\""],
        ["Tu rol", "Enseñar por el camino, sin abrumar", "Advertir riesgos, dimensionar y ofrecer alternativas"],
        ["El error típico", "Usar jerga o explicar todo de golpe", "Decir que sí sin advertir, o decir que no sin escuchar"],
        ["Lo que querés lograr", "Que entienda lo que tiene y no se asuste", "Que decida sabiendo qué riesgo toma"]
      ]},
      { t: "ej", id: "e1", tipo: "mc",
        enunciado: `Un cliente nuevo te escribe: "Tengo USD 40.000, ¿dónde los pongo?". ¿Qué hacés primero?`,
        opciones: [
          { txt: "Le mandás la cartera moderada del mes, que es la que mejor rindió y la que usa la mayoría de tus clientes.", ok: false, fb: "Sin saber para qué es la plata, no sabés si le sirve." },
          { txt: "Le preguntás para qué es la plata, cuándo la necesita, en qué moneda gasta y cuánto tolera caer.", ok: true, fb: "Exacto: primero el cliente, después el producto." },
          { txt: "Le recomendás un money market en dólares hasta que el mercado se aclare, porque así no corre ningún riesgo.", ok: false, fb: "Puede ser parte de la respuesta, pero todavía no sabés si encaja." }
        ],
        explicacion: `La recomendación correcta para un cliente puede ser la peor para otro. Las cuatro preguntas son la diferencia entre asesorar y vender un producto.` },
      { t: "h", texto: "El checklist operativo" },
      { t: "p", html: `Una vez decidido qué hacer, hay detalles que no son de criterio, pero que si salen mal le cuestan plata al cliente. Varios ya los viste en el Aula:` },
      { t: "lista", items: [
        `<strong>Moneda de la operación:</strong> si rota ya, opera en la moneda con más volumen (en CEDEARs, pesos); si se queda líquido un tiempo, en dólares. Es el caso de EWZ del módulo de operatoria.`,
        `<strong>Plazo:</strong> T+1 por defecto; contado inmediato solo si hay urgencia.`,
        `<strong>Tipo de orden:</strong> límite en activos con poco volumen.`,
        `<strong>Si es un fondo:</strong> la clase, el plazo de rescate y si opera en MEP o cable.`
      ]},
      { t: "ej", id: "e2", tipo: "multi",
        enunciado: `Un cliente quiere vender sus CEDEARs de Brasil y quedarse en dólares "un par de semanas, hasta ver qué pasa". Marcá <strong>todo</strong> lo que corresponde.`,
        opciones: [
          { txt: "Vender contra dólares, para no quedar expuesto al tipo de cambio mientras espera.", ok: true, fb: "Si se queda líquido, en dólares." },
          { txt: "Vender contra pesos porque hay más volumen, y comprar dólares cuando decida.", ok: false, fb: "Eso conviene para rotar ya, no para esperar semanas." },
          { txt: "Dejar los dólares en un money market en dólares mientras decide.", ok: true, fb: "Rinden algo y están disponibles en el día." },
          { txt: "Usar orden límite si el CEDEAR tiene poco volumen en dólares.", ok: true, fb: "Evita pagar un spread grande." },
          { txt: "Operar en contado inmediato para que no pierda un día de mercado.", ok: false, fb: "No hay urgencia: T+1 alcanza." }
        ],
        explicacion: `Primero la decisión (salir de Brasil y esperar), después la ejecución (moneda, plazo, orden y dónde dejar la plata). Las dos partes importan.` }
    ]
  },

  /* ------------------------------------------------------------ */
  {
    id: "c2",
    titulo: "7% no es 7%: tasas que no se comparan",
    minutos: 11,
    objetivo: "Entender por qué una TIR de 7% en un bono CER y una de 7% en un bono en dólares son apuestas distintas, y qué tiene que pasar con el dólar y la inflación para que gane cada una.",
    bloques: [
      { t: "p", html: `Un bono CER que paga "CER + 7%" y un bono en dólares que rinde "7%" parecen iguales. No lo son: el primero te paga 7% <strong>por encima de la inflación, en pesos</strong>; el segundo te paga 7% <strong>en dólares</strong>. Cuál conviene depende de una sola pregunta: <strong>¿el dólar va a subir más o menos que la inflación?</strong>` },
      { t: "herramienta", id: "siete-siete" },
      { t: "idea", titulo: "La regla", html: `Si el dólar sube <strong>menos</strong> que la inflación (el peso se fortalece en términos reales), gana el CER. Si sube <strong>más</strong> (el peso se debilita), gana el bono en dólares. Si suben parecido, empatan.` },
      { t: "mercado", titulo: "Por qué esto importa hoy", html: `En 2026, hasta mediados de octubre, el dólar mayorista subió apenas 3% mientras la inflación acumulaba más de 20%. Quien estuvo en CER le ganó por mucho al que estuvo en dólares. Pero eso dejó un dólar "barato" contra los precios internos, y viene un año electoral. Cuanto más atrasado está el dólar, más probable es que en algún momento suba más que la inflación, y en ese caso el CER pierde contra el dólar.`, fuente: "Módulo 08 · datos de 2026" },
      { t: "ej", id: "e1", tipo: "estimar",
        enunciado: `Un bono CER + 7%. En el año la inflación es 25% y el dólar sube 40%. ¿Cuánto rindió medido en dólares? Respondé en % (puede ser negativo).`,
        unidad: "%", respuesta: -4.5, tolerancia: 1,
        explicacion: `En pesos: 1,25 × 1,07 = 1,3375, o sea +33,75%. En dólares: 1,3375 ÷ 1,40 ≈ 0,955, o sea <strong>−4,5%</strong>. El bono hizo su trabajo (le ganó 7% a la inflación), pero el dólar subió más. Un bono en dólares al 7% habría rendido +7%.` },
      { t: "ej", id: "e2", tipo: "mc",
        enunciado: `Una clienta tiene todos sus ahorros en bonos CER "porque rinden CER + 7%, igual que los bonos en dólares pero protegidos de la inflación". Sus gastos son en pesos, pero dentro de dos años quiere comprar un departamento en dólares. ¿Qué le planteás?`,
        opciones: [
          { txt: "Que está bien cubierta: el CER le protege la inflación y eso equivale a protegerse del dólar en el largo plazo.", ok: false, fb: "No equivale: en 2026 el dólar subió mucho menos que la inflación, y puede pasar lo contrario." },
          { txt: "Que la compra del departamento es en dólares, y el CER no la cubre si el dólar sube más que los precios.", ok: true, fb: "Exacto: la moneda del objetivo manda." },
          { txt: "Que pase todo a bonos en dólares ahora, porque en un año electoral el dólar siempre sube más que la inflación.", ok: false, fb: "\"Siempre\" no existe: es una probabilidad, no una certeza. Y sus gastos son en pesos." }
        ],
        explicacion: `La moneda en la que el cliente va a gastar define en qué moneda tiene que medir su riesgo. Para el departamento, el riesgo es en dólares; para los gastos del mes, en pesos. Las dos partes de su plata necesitan instrumentos distintos.` },
      { t: "cliente", titulo: "Cómo se lo explicás al cliente", html: `"Este bono te gana a la inflación, y aquel te paga en dólares. Si el dólar sube menos que los precios, como pasó este año, gana el primero; si sube más, gana el segundo. Nadie sabe cuál va a pasar, y menos en un año electoral. Por eso, si vas a gastar en dólares, conviene tener una parte en dólares."` }
    ]
  },

  /* ------------------------------------------------------------ */
  {
    id: "c3",
    titulo: "El cliente que viene con su idea",
    minutos: 12,
    objetivo: "Responderle a un cliente que trae su propia idea sin decirle que sí sin advertir ni que no sin escuchar: validar, preguntar, dimensionar, advertir y dejar registro.",
    bloques: [
      { t: "p", html: `Algunos clientes no preguntan "¿qué hago?", sino que llegan con la decisión tomada. Tu rol no es convencerlos de lo contrario ni ejecutar sin pensar: es asegurarte de que decidan sabiendo qué riesgo toman y con un tamaño razonable.` },
      { t: "idea", titulo: "Cinco pasos", html: `<strong>1. Validar</strong> lo que tiene de cierto la idea. · <strong>2. Preguntar</strong> qué espera que pase y en cuánto tiempo. · <strong>3. Dimensionar:</strong> ¿qué parte de la cartera? · <strong>4. Advertir</strong> el riesgo concreto, con un número si se puede. · <strong>5. Dejar registro</strong> de la advertencia (un mail o un mensaje).` },
      { t: "tabla", cab: ["La idea del cliente", "Lo que tiene de cierto", "El riesgo que tenés que advertir"], filas: [
        ["\"Compro XOM porque el petróleo está alto\"", "Una petrolera gana más con el crudo caro", "El precio alto ya está en la acción. Si el petróleo baja, cae: el Brent pasó de unos USD 116 a 92 en dos semanas, entre octubre y noviembre de 2026"],
        ["\"Quiero NVDA, está de moda\"", "Es una empresa excelente que crece mucho", "\"De moda\" significa expectativas altísimas: cualquier decepción la hace caer fuerte. Es una sola acción: el problema no es tenerla, es tener demasiado"],
        ["\"Vendo todo lo argentino por las elecciones\"", "El riesgo electoral es real y el mercado lo está cobrando", "No todo lo argentino tiene el mismo riesgo: ONs de buenas empresas o bonos que vencen dentro del mandato actual se mueven muy distinto que un soberano largo. Y vender todo también tiene un costo si no pasa nada"]
      ]},
      { t: "ej", id: "e1", tipo: "multi",
        enunciado: `Sofía, 32 años, perfil agresivo, quiere poner sus USD 30.000 en NVDA "porque está volando". Marcá <strong>todo</strong> lo que es una buena respuesta de tu parte.`,
        opciones: [
          { txt: "Reconocer que es una gran empresa y que entiende por qué le gusta.", ok: true, fb: "Validar abre la conversación." },
          { txt: "Preguntarle qué haría si cayera 40% en unos meses.", ok: true, fb: "Le pasó varias veces en su historia: es la pregunta clave." },
          { txt: "Proponer que sea una parte de la cartera, con otros CEDEARs o un ETF.", ok: true, fb: "Dimensionar sin negarle la idea." },
          { txt: "Decirle que no, porque una sola acción es demasiado riesgosa para cualquier cliente.", ok: false, fb: "Es su plata y su perfil es agresivo: tu rol es advertir y dimensionar, no prohibir." },
          { txt: "Ejecutar sin más: si el perfil es agresivo, no hace falta advertir nada.", ok: false, fb: "Perfil agresivo no significa concentrar todo en un activo sin conversarlo." },
          { txt: "Dejar por escrito que le advertiste el riesgo de concentración.", ok: true, fb: "Te protege a vos y deja clara la decisión." }
        ],
        explicacion: `El objetivo no es ganarle la discusión, sino que la decisión sea informada y que el tamaño de la apuesta sea uno que pueda soportar.` },
      { t: "ej", id: "e2", tipo: "mc",
        enunciado: `Un cliente moderado dice: "Vendeme todo lo argentino, no quiero saber nada hasta después de las elecciones". Tiene Globales largos, ONs de YPF y Pampa, y LECAPs para sus gastos. ¿Cuál es la mejor respuesta?`,
        opciones: [
          { txt: "Vender todo como pide: es su plata, y además el riesgo electoral justifica salir de todos los activos argentinos.", ok: false, fb: "Ejecutar sin diferenciar: no le explicaste que su riesgo no es parejo." },
          { txt: "Diferenciar: lo más expuesto son los Globales largos; las ONs sufren menos y las LECAPs son para gastos.", ok: true, fb: "Exacto: bajar lo más sensible sin desarmar todo." },
          { txt: "Convencerlo de no tocar nada, porque las elecciones siempre se terminan resolviendo y el mercado se recupera.", ok: false, fb: "Ignora un riesgo real y su preocupación legítima." }
        ],
        explicacion: `"Todo lo argentino" no es un solo riesgo. Los Globales largos son lo más sensible al riesgo país; las ONs de buenas empresas caen menos; las LECAPs cortas apenas se mueven y él las necesita para gastar. Bajar exposición donde más pega suele ser mejor que vender todo.` },
      { t: "ej", id: "e3", tipo: "caso",
        enunciado: `Un cliente te escribe: "Quiero poner el 40% de mi cartera en XOM, el petróleo está altísimo". Escribí en 4 o 5 líneas cómo le contestarías.`,
        rubrica: [
          "Valida la lógica: el crudo caro favorece a las petroleras.",
          "Explica que el precio alto ya está reflejado en la acción, y que la acción gana si el petróleo sube más, no si se queda alto.",
          "Menciona que el petróleo es volátil (dato concreto: la baja de fines de octubre de 2026).",
          "Dimensiona: propone una parte menor o diversificar dentro del sector.",
          "No le prohíbe la operación: deja la decisión en el cliente, con la advertencia clara."
        ],
        modelo: `"Entiendo la idea: con el petróleo caro, a Exxon le va bien. El tema es que eso el mercado ya lo sabe y está en el precio de la acción; para ganar, el petróleo tiene que subir todavía más. Y es muy volátil: a fines de octubre el Brent bajó de 116 a 92 dólares en dos semanas. Te propongo entrar con una parte más chica, un 10% por ejemplo, y si querés más energía, sumar algo más diversificado. Si preferís igual el 40%, lo hacemos, pero que sea sabiendo ese riesgo."` }
    ]
  },

  /* ------------------------------------------------------------ */
  {
    id: "c4",
    titulo: "El cliente que recién empieza: enseñar sin abrumar",
    minutos: 7,
    objetivo: "Explicar lo justo para que el cliente entienda lo que tiene, anticipar las caídas antes de que pasen y chequear que entendió.",
    bloques: [
      { t: "p", html: `Con el cliente que no sabe nada, el riesgo no es que se equivoque en una decisión: es que <strong>se asuste</strong> y venda en el peor momento porque nadie le explicó que eso podía pasar.` },
      { t: "lista", items: [
        `<strong>Una idea por vez.</strong> En la primera reunión no hace falta explicar duration, CER y riesgo país. Alcanza con "esto es para tus gastos, esto es para el largo plazo".`,
        `<strong>Analogías antes que términos.</strong> "Un fondo es una canasta armada por otro" funciona mejor que "un vehículo de inversión colectiva".`,
        `<strong>Anticipá la caída antes de que ocurra.</strong> "En un año malo esta parte puede bajar un 10%" dicho hoy vale más que cualquier explicación después.`,
        `<strong>Preguntá qué entendió.</strong> "¿Cómo se lo contarías a tu hermano?" revela en segundos si quedó claro.`
      ]},
      { t: "ej", id: "e1", tipo: "mc",
        enunciado: `Un cliente nuevo te llama preocupado: su bono en dólares bajó 4% en la semana. ¿Cuál es la mejor explicación?`,
        opciones: [
          { txt: "\"Subió el riesgo país, por eso aumentaron las TIR y bajaron los precios por la duration del bono.\"", ok: false, fb: "Es correcto, pero para él son cuatro conceptos nuevos de golpe." },
          { txt: "\"El mercado está nervioso con Argentina y paga menos. Si no lo vendés, al vencer cobrás lo mismo.\"", ok: true, fb: "Exacto: simple, cierta y le dice qué hacer." },
          { txt: "\"No te preocupes, son movimientos normales del mercado que no tienen ninguna importancia para tu cartera.\"", ok: false, fb: "Le quita importancia sin explicarle nada: la próxima vez se va a asustar más." }
        ],
        explicacion: `La explicación técnica es la misma; cambia el idioma. El cliente nuevo necesita entender qué pasó y qué significa para él, no la mecánica completa.` },
      { t: "cliente", titulo: "La frase que más te va a servir", html: `"Antes de invertir, te cuento qué puede salir mal y cuánto podría bajar en un año malo. Si eso te parece demasiado, lo ajustamos ahora, no cuando pase."` }
    ]
  },

  /* ------------------------------------------------------------ */
  {
    id: "c5",
    titulo: "Riesgo y retorno en una cartera",
    minutos: 13,
    objetivo: "Ver el trade-off entre retorno esperado y volatilidad, cómo le va a una cartera en un año bueno y en uno malo, y por qué diversificar baja el riesgo.",
    bloques: [
      { t: "p", html: `Cada activo tiene un retorno esperado (lo que rinde en promedio) y una volatilidad (cuánto se aleja de ese promedio). Más retorno esperado suele venir con más volatilidad. Pero en una cartera pasa algo interesante: <strong>la volatilidad total es menor que el promedio de las volatilidades</strong>, porque los activos no se mueven todos juntos.` },
      { t: "tabla", cab: ["Concepto", "Qué significa para el cliente"], filas: [
        ["Retorno esperado", "Lo que debería rendir en promedio, a lo largo de varios años"],
        ["Volatilidad", "Cuánto puede alejarse un año cualquiera: en 2 de cada 3 años, el resultado queda entre \"esperado − volatilidad\" y \"esperado + volatilidad\""],
        ["Escenarios", "Cuánto ganaría o perdería en un año bueno, uno normal y uno malo"]
      ]},
      { t: "herramienta", id: "constructor" },
      { t: "idea", titulo: "Tres cosas para mirar en la herramienta", html: `<strong>1.</strong> En el gráfico, la cartera suele quedar más a la izquierda (menos volatilidad) que los activos que la componen: eso es la diversificación. · <strong>2.</strong> Compará la moderada con "Saco todo de Argentina": sin activos argentinos, el año malo local casi no la toca, pero rinde menos en promedio y la volatilidad casi no baja, porque concentra todo en CEDEARs. · <strong>3.</strong> Mirá el año malo argentino: ahí se ve la diferencia real entre perfiles.` },
      { t: "ej", id: "e1", tipo: "mc",
        enunciado: `En la herramienta, la cartera "Saco todo de Argentina" (60% CEDEARs, 40% FCI Latam) tiene una volatilidad parecida a la moderada. ¿Por qué?`,
        opciones: [
          { txt: "Porque los CEDEARs no tienen riesgo, así que la volatilidad sale toda del FCI Latam sin Argentina.", ok: false, fb: "Al revés: el FCI casi no se mueve; la volatilidad viene de los CEDEARs." },
          { txt: "Porque sacó el riesgo argentino, pero concentró en acciones del exterior, que se mueven mucho.", ok: true, fb: "Exacto: cambió de riesgo, no lo eliminó." },
          { txt: "Porque la herramienta mide todo en pesos, y en pesos cualquier activo en dólares parece muy volátil.", ok: false, fb: "Todo está medido en dólares." }
        ],
        explicacion: `Salir de Argentina protege del año malo local (en ese escenario esa cartera gana), pero la deja muy expuesta a un año malo global, y resigna el rendimiento extra de los activos argentinos: en promedio rinde menos que la moderada. "Sin riesgo argentino" no significa "sin riesgo".` },
      { t: "ej", id: "e2", tipo: "estimar",
        enunciado: `Una cartera tiene retorno esperado de 6,7% y volatilidad de 11,5%. En 2 de cada 3 años, ¿cuál sería aproximadamente el peor resultado? Respondé en % (puede ser negativo).`,
        unidad: "%", respuesta: -4.8, tolerancia: 0.6,
        explicacion: `6,7 − 11,5 = <strong>−4,8%</strong>. Y en 1 de cada 6 años puede ser peor que eso. Esta cuenta, dicha antes de invertir, es la que evita que el cliente se asuste cuando pasa.` },
      { t: "ojo", titulo: "Lo que la herramienta no es", html: `Los números son supuestos didácticos para ver el trade-off, no una predicción. En la realidad, las correlaciones cambian (en una crisis, muchas cosas caen juntas) y los escenarios pueden ser peores. Sirve para razonar, no para prometer.` }
    ]
  },

  /* ------------------------------------------------------------ */
  {
    id: "c6",
    titulo: "Tu turno: armá la cartera",
    minutos: 15,
    objetivo: "Armar una cartera completa para tres clientes reales, cumpliendo sus restricciones, y explicarla por escrito.",
    bloques: [
      { t: "p", html: `Tres clientes, tres carteras. Cada uno tiene restricciones distintas, y la herramienta te dice cuáles cumple tu cartera. No hay una sola respuesta correcta: hay muchas carteras que cumplen, y algunas son mejores que otras.` },
      { t: "herramienta", id: "cartera-cliente" },
      { t: "ojo", titulo: "No te quedes en los tildes", html: `Que la cartera cumpla todo no la hace buena. Preguntate también: ¿le estoy dando a Rosa los pesos que necesita en un instrumento que pueda usar? ¿A Martín le dejé algo de Argentina para no resignar todo el rendimiento? ¿A Sofía le di parte de lo que quería, o solo le dije que no?` },
      { t: "ej", id: "e1", tipo: "caso",
        enunciado: `Armá la cartera de Martín (45 años, moderado, USD 200.000 a 3–5 años, preocupado por 2027) hasta que cumpla todo. Después escribí en 5 o 6 líneas cómo se la presentarías: qué tiene, por qué, cuánto espera ganar y cuánto podría perder en un año malo.`,
        rubrica: [
          "Explica la cartera por funciones (qué parte es para qué), no como una lista de porcentajes.",
          "Responde a su preocupación electoral: qué parte está protegida y qué parte sigue expuesta, y por qué.",
          "Da el retorno esperado y un rango, aclarando que no es una promesa.",
          "Dice cuánto podría perder en el año malo argentino, con el número de la herramienta.",
          "Usa lenguaje simple y cierra con qué haría si pasa el escenario malo."
        ],
        modelo: `"Te armé una cartera en tres partes. Un 40% sin riesgo argentino (CEDEARs y un fondo de bonos de Chile, Brasil y Uruguay), para que las elecciones no te toquen toda la plata. Un 45% en ONs de buenas empresas, algo de bonos del Tesoro y un poco de acciones argentinas, que es donde está el rendimiento extra del país. Y un 15% en pesos, para aprovechar la tasa. En promedio debería rendir cerca de 6% por año en dólares; en un año malo para Argentina podría bajar alrededor de 7%. Si pasa, no la desarmamos: revisamos si cambió tu situación, no solo el mercado."` },
      { t: "cliente", titulo: "El cierre de todo el Aula", html: `Un buen asesor no es el que acierta qué va a pasar. Es el que arma carteras que el cliente puede sostener en cualquier escenario y le explica, antes de que pase, qué puede salir mal.` }
    ]
  }
  ]
};
