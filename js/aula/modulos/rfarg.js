/* ============================================================
   MÓDULO · Renta fija argentina: curvas, riesgo país e indexación
   Base: capítulo 12 del Book + contenido nuevo de coyuntura (nov. 2026).
   ============================================================ */
window.AULA = window.AULA || { modulos: {} };

AULA.modulos.rfarg = {
  id: "rfarg",
  numero: "04",
  titulo: "Renta fija argentina",
  bajada: "Curvas, riesgo país, tasa fija, CER y dollar-linked: cómo leer el mercado de bonos local y qué riesgo cobra cada instrumento.",
  fuente: "Book, capítulo 12 · coyuntura actualizada a noviembre de 2026",
  practica: [
    { titulo: "Curvas de bonos", desc: "Curvas hard dollar, CER, LECAP y dollar-linked para leer y comparar.", href: "simulador.html" },
    { titulo: "Decisiones de rotación", desc: "¿Rotar o quedarse? Comparaciones reales entre instrumentos en pesos y en dólares.", href: "simulador.html" },
    { titulo: "¿Qué hago si...?", desc: "Riesgo país que sube, cliente que pide dólares que no bajen, pesos de corto plazo.", href: "simulador.html" }
  ],
  evaluacion: {
    cantidad: 12,
    ids: ["RF-MC-004","RF-MC-005","RF-MC-006","RF-MC-007","RF-MC-008","RF-MC-016","RF-MC-017","RF-MC-018",
          "RF-MC-019","RF-MC-021","RF-MC-025","MACRO-MC-001","MACRO-MC-002","MACRO-MC-009","MACRO-MC-010",
          "MACRO-MC-021","TRAMPA-MC-004","TRAMPA-MC-005","TRAMPA-MC-019","TRAMPA-MC-023",
          "RF-CASO-002","RF-CASO-005","MACRO-CASO-002"]
  },
  lecciones: [

  /* ------------------------------------------------------------ */
  {
    id: "a1",
    titulo: "Cómo leer una curva de bonos",
    minutos: 10,
    objetivo: "Interpretar pendiente, jorobas y bonos que se salen de la curva, con duration en el eje horizontal.",
    bloques: [
      { t: "p", html: `Una <span class="term" data-term="curva">curva de rendimientos</span> pone en un gráfico bonos comparables: en el eje vertical, cuánto rinden (TIR); en el horizontal, cuánto duran. En los informes argentinos (Inviu, PPI y otros) casi siempre el eje horizontal es la <strong>duration modificada</strong>, y eso la convierte en un mapa: <em>cuánto rendimiento me dan por cuánto riesgo de precio</em>.` },
      { t: "ojo", titulo: "Antes de mirar nada", html: `Una curva tiene sentido solo si compara cosas parecidas: misma moneda, mismo emisor o calidad, misma ley. Si mezclás un soberano con una ON de una empresa chica, la diferencia de TIR no te habla del plazo sino del emisor.` },
      { t: "h", texto: "Las tres formas que vas a ver" },
      { t: "grafico", id: "formas-curva" },
      { t: "lista", items: [
        `<strong>Normal (ascendente):</strong> los bonos más largos rinden más. El mercado pide un premio por esperar más y asumir más incertidumbre. Es lo habitual.`,
        `<strong>Plana:</strong> rinde parecido a cualquier plazo. Suele ser una transición, o una señal de que el mercado no ve grandes cambios.`,
        `<strong>Invertida:</strong> los cortos rinden más que los largos. En pesos, suele aparecer cuando hay estrés de corto plazo (falta de liquidez, tasas de caución muy altas) o cuando se espera que las tasas o la inflación bajen.`
      ]},
      { t: "h", texto: "La lectura que más vale: el bono que se sale de la curva" },
      { t: "p", html: `Cuando un bono rinde bastante más (o menos) que sus vecinos de duration parecida, hay algo para entender. Puede ser una oportunidad, pero muchas veces es una advertencia: poca liquidez, una cláusula peor, otra ley, una estructura de pagos distinta.` },
      { t: "grafico", id: "curva-outlier" },
      { t: "ej", id: "e1", tipo: "mc",
        enunciado: `En la curva ilustrativa de arriba, ¿qué bono se sale claramente de la tendencia?`,
        opciones: [
          { txt: "El bono B", ok: false, fb: "B está sobre la línea, en línea con sus vecinos." },
          { txt: "El bono D", ok: true, fb: "Exacto: rinde mucho más que lo que correspondería a su duration." },
          { txt: "El bono F", ok: false, fb: "F es el más largo y rinde más, pero sigue la pendiente de la curva." }
        ],
        explicacion: `Detectar el bono que se sale es fácil; lo profesional es lo que sigue: <strong>¿por qué?</strong> ¿Tiene menos volumen? ¿Distinta ley? ¿Amortiza distinto? Recién con esa respuesta podés decir si es "barato" o si tiene un riesgo extra que lo justifica.` },
      { t: "ej", id: "e2", tipo: "multi",
        enunciado: `Un bono rinde 1,5 p.p. más de TIR que sus vecinos de la misma duration. Marcá <strong>todas</strong> las explicaciones posibles que deberías chequear.`,
        opciones: [
          { txt: "Tiene menos liquidez y el mercado pide un premio por eso.", ok: true, fb: "Muy común en bonos chicos o poco negociados." },
          { txt: "Está bajo otra legislación (por ejemplo, ley local en lugar de Nueva York).", ok: true, fb: "En Argentina es una de las diferencias más importantes." },
          { txt: "Tiene una estructura de pagos distinta (amortización o cupones).", ok: true, fb: "Dos bonos con la misma duration pueden tener flujos muy distintos." },
          { txt: "Es un error de precio de la plataforma, así que conviene ignorarlo.", ok: false, fb: "Puede pasar, pero no es lo primero que hay que suponer." },
          { txt: "Es una oportunidad clara: rinde más por el mismo riesgo de duration.", ok: false, fb: "Puede ser una oportunidad, pero nunca es 'segura' sin saber por qué paga más." }
        ],
        explicacion: `Un rendimiento extra casi siempre es el pago por algún riesgo extra. El trabajo es identificarlo y decidir si al cliente le conviene cobrarlo.` },
      { t: "cliente", titulo: "Cómo se lo explicás al cliente", html: `"Este gráfico es un mapa: más arriba, más rinde; más a la derecha, más se mueve el precio. Lo que buscamos es el punto que te pague bien por el riesgo que estás dispuesto a tomar, no simplemente el que esté más arriba."` }
    ]
  },

  /* ------------------------------------------------------------ */
  {
    id: "a2",
    titulo: "Riesgo país, ley y bonos en dólares",
    minutos: 11,
    objetivo: "Entender qué mide el riesgo país, cómo impacta en el precio de los bonos y por qué los Bonares rinden más que los Globales.",
    bloques: [
      { t: "p", html: `El <span class="term" data-term="riesgopais">riesgo país</span> es el rendimiento extra que el mercado le exige a la Argentina por prestarle en dólares, comparado con lo que rinden los bonos del Tesoro de Estados Unidos. Se mide en puntos básicos: <strong>100 puntos básicos = 1 punto porcentual</strong>. El índice de referencia es el EMBI de JP Morgan.` },
      { t: "formula", html: `TIR de un bono argentino en USD ≈ Tasa del Tesoro de EE.UU. + Riesgo país`, nota: `Si el Tesoro de EE.UU. a un plazo parecido rinde alrededor de 4% y el riesgo país es 900, un soberano argentino rinde cerca de 13%. Es una aproximación: cada bono tiene su propio spread.` },
      { t: "h", texto: "Lo que pasó en los últimos meses" },
      { t: "grafico", id: "riesgopais" },
      { t: "mercado", titulo: "Foto de noviembre de 2026", html: `El riesgo país estaba en torno a <strong>430 puntos básicos en julio</strong>, terminó octubre en <strong>787</strong> y el <strong>6 de noviembre llegó a 939</strong>, el nivel más alto en más de un año. El <strong>10 de noviembre</strong> bajó a <strong>857</strong>. Los analistas lo atribuyen a factores externos y a dudas sobre los vencimientos de deuda de 2027 y 2028. El dólar mayorista, mientras tanto, se mantuvo cerca de $1.550: una crisis financiera no siempre viene con una crisis cambiaria.`, fuente: "Invecq, Forbes Argentina y Perfil, 5 al 10 de noviembre de 2026" },
      { t: "ej", id: "e1", tipo: "estimar",
        enunciado: `Un cliente tiene un Global largo con duration modificada cercana a 5,5. Si el riesgo país subió unos 500 puntos básicos (de 430 a 930), ¿cuánto estimás que cayó su bono? Respondé en %, sin el signo menos.`,
        unidad: "%", respuesta: 27.5, tolerancia: 3,
        explicacion: `500 puntos básicos son 5 p.p. de TIR. Con duration 5,5: 5,5 × 5 ≈ <strong>27,5%</strong>. En la práctica la caída fue algo menor por la convexidad y porque no todos los bonos se movieron lo mismo, pero el orden de magnitud explica por qué los clientes con bonos largos vieron caídas fuertes. Ese es el riesgo que se cobra en la TIR.` },
      { t: "h", texto: "Globales y Bonares: la diferencia de ley" },
      { t: "p", html: `El Tesoro tiene dos familias de bonos en dólares con fechas de pago casi iguales: los <strong>Globales</strong> (GD, ley de Nueva York) y los <strong>Bonares</strong> (AL, AE, ley argentina). Si pagan parecido, ¿por qué rinden distinto?` },
      { t: "p", html: `Porque ante una reestructuración, un bono bajo ley extranjera ofrece más herramientas de defensa al acreedor que uno bajo ley local, que puede modificarse con una ley del Congreso. El mercado le cobra ese riesgo extra al Bonar con un rendimiento más alto.` },
      { t: "tabla", cab: ["Bono", "Ley", "TIR al 6/11/2026"], filas: [
        ["GD30", "Nueva York", "10,94%"],
        ["AL30", "Argentina", "13,03%"],
        ["GD35", "Nueva York", "12,39%"],
        ["GD38", "Nueva York", "12,37%"],
        ["GD41", "Nueva York", "12,22%"],
        ["GD46", "Nueva York", "11,88%"]
      ], nota: "Fuente: Forbes Argentina, 6 de noviembre de 2026. Las TIR cambian todos los días: usalas como foto, no como dato para operar." },
      { t: "ej", id: "e2", tipo: "estimar",
        enunciado: `Con la tabla: ¿cuántos puntos porcentuales (p.p.) de TIR de diferencia hay entre el AL30 y el GD30?`,
        unidad: "p.p.", respuesta: 2.09, tolerancia: 0.06,
        explicacion: `13,03% − 10,94% = <strong>2,09 p.p.</strong> (en la jerga, 209 puntos básicos). Ese es el "precio" que el mercado le pone a la diferencia de legislación (y, en parte, de liquidez) entre dos bonos con pagos casi idénticos. Cuando ese spread se amplía mucho, algunos analistas recomiendan pasar de GD a AL para cobrarlo; cuando se achica, al revés.` },
      { t: "h", texto: "Las ONs en dólares: un piso que pone el soberano" },
      { t: "formula", html: `TIR de una ON en USD ≈ Tesoro de EE.UU. + Riesgo país + Spread de la empresa`, nota: "No es una igualdad exacta: algunas empresas exportadoras o con buena calidad pueden rendir menos que el soberano. Pero cuando sube el riesgo país, casi todas las ONs lo sienten." },
      { t: "ej", id: "e3", tipo: "mc",
        enunciado: `Con el riesgo país subiendo, un cliente pregunta si sus ONs de empresas sólidas "también van a bajar, si la empresa no tiene nada que ver con el Gobierno". ¿Qué le respondés?`,
        opciones: [
          { txt: "No: si la empresa es sólida y no depende del Gobierno, sus ONs no tienen por qué verse afectadas.", ok: false, fb: "Se ven afectadas, aunque suelen caer menos que los soberanos." },
          { txt: "Suelen sentirlo, aunque menos: el riesgo país funciona como piso para casi todo el crédito argentino.", ok: true, fb: "Exacto. El 'techo soberano' afecta a casi todos los emisores locales." },
          { txt: "Sí, y caen lo mismo que los soberanos, porque el mercado no distingue entre los emisores argentinos.", ok: false, fb: "Caen en general menos: depende de la empresa, su duration y su negocio." }
        ],
        explicacion: `Por eso en una cartera argentina diversificar solo entre bonos y ONs locales no protege del riesgo argentino: cambia la intensidad, no la dirección.` }
    ]
  },

  /* ------------------------------------------------------------ */
  {
    id: "a3",
    titulo: "Pesos a tasa fija: LECAP, BONCAP y cómo leer las tasas",
    minutos: 12,
    objetivo: "Pasar de TEM a TNA y TEA sin confundirse, y calcular el dólar que hace indiferente estar en pesos o en dólares.",
    bloques: [
      { t: "p", html: `Las <span class="term" data-term="lecap">LECAP</span> (letras) y <strong>BONCAP</strong> (bonos) son instrumentos del Tesoro en pesos a tasa fija: se compran con descuento y al vencimiento pagan un monto en pesos conocido desde el principio. El inversor sabe exactamente cuántos pesos va a cobrar; lo que no sabe es cuánto van a valer esos pesos.` },
      { t: "h", texto: "Tres formas de expresar la misma tasa" },
      { t: "tabla", cab: ["Sigla", "Nombre", "Qué es"], filas: [
        ["TEM", "Tasa efectiva mensual", "Lo que rinde por mes, con interés compuesto. Es la forma más usada en el mercado local."],
        ["TNA", "Tasa nominal anual", "La TEM × 12, sin capitalizar. Es la que se usa en plazos fijos. Subestima el rendimiento real del año."],
        ["TEA / TIREA", "Tasa efectiva anual", "Lo que rinde en un año reinvirtiendo mes a mes: (1 + TEM)¹² − 1."]
      ]},
      { t: "herramienta", id: "tasas" },
      { t: "mercado", titulo: "La última licitación del Tesoro", html: `El 11 de noviembre de 2026 el Tesoro colocó la LECAP <strong>S29E7</strong> (vence el 29 de enero de 2027) al <strong>2,08% TEM</strong> (28,08% efectiva anual) y la BONCAP <strong>T30J7</strong> (vence el 30 de junio de 2027) al <strong>2,23% TEM</strong> (30,36% efectiva anual). La curva a tasa fija tiene pendiente positiva: los plazos más largos pagan más.`, fuente: "Ámbito, 11 de noviembre de 2026" },
      { t: "ej", id: "e1", tipo: "estimar",
        enunciado: `Usá la herramienta o calculalo: una TEM de 2,23% ¿a qué tasa efectiva anual equivale? Respondé en %.`,
        unidad: "%", respuesta: 30.36, tolerancia: 0.3,
        explicacion: `(1 + 0,0223)¹² − 1 = <strong>30,3%</strong>, que coincide con lo informado en la licitación. En TNA sería 2,23 × 12 = 26,8%: casi 4 p.p. menos. Cuando compares con un plazo fijo, compará siempre la misma tasa (TEM contra TEM o TEA contra TEA).` },
      { t: "h", texto: "El dólar breakeven: la pregunta que el cliente entiende" },
      { t: "p", html: `Un cliente no piensa en TEM: piensa en dólares. La pregunta útil es <strong>"¿hasta qué dólar me conviene haber estado en pesos?"</strong>. Si al vencimiento el dólar está por debajo de ese nivel, ganó haciendo tasa en pesos (lo que se llama <span class="term" data-term="carry">carry trade</span>); si está por encima, le habría convenido dolarizarse.` },
      { t: "formula", html: `Dólar breakeven = Dólar de hoy × (1 + rendimiento en pesos del período)`, nota: "El rendimiento del período sale de la TEM elevada a la cantidad de meses (o fracción de meses) hasta el vencimiento." },
      { t: "ejemplo", titulo: "Breakeven de una LECAP a enero", pasos: [
        `Dólar mayorista hoy: cerca de <strong>$1.550</strong>. LECAP a fines de enero: <strong>2,08% TEM</strong>, unos 76 días (2,5 meses).`,
        `Rendimiento del período: (1,0208)<sup>2,53</sup> − 1 ≈ <strong>5,3%</strong>.`,
        `Dólar breakeven: 1.550 × 1,053 ≈ <strong>$1.633</strong>.`,
        `Lectura: si a fines de enero el dólar mayorista está por debajo de $1.633, estar en la LECAP le ganó al dólar. Si está por encima, no.`
      ], conclusion: `El cálculo no dice qué va a pasar: transforma una tasa abstracta en una pregunta concreta que el cliente puede evaluar con su propia expectativa. Es ilustrativo: el precio real de compra en el mercado secundario puede dar una tasa distinta a la de la licitación.` },
      { t: "herramienta", id: "breakeven-fx" },
      { t: "ej", id: "e2", tipo: "mc",
        enunciado: `Un cliente con pesos que va a necesitar en pesos dentro de 3 meses (para pagar una obra) pregunta si le conviene comprar dólares "por las dudas". ¿Cuál es el razonamiento correcto?`,
        opciones: [
          { txt: "Que se dolarice: en Argentina comprar dólares siempre es la opción más segura para no perder.", ok: false, fb: "Si el gasto es en pesos, dolarizarse agrega un riesgo (que el dólar baje o no suba) que no necesita tomar." },
          { txt: "Una LECAP que venza antes del pago calza moneda y plazo; dolarizarse sería apostar al dólar.", ok: true, fb: "Exacto: calzar moneda y plazo del gasto es la decisión más defensiva." },
          { txt: "Una BONCAP a 2027, porque rinde más que una LECAP y puede venderla cuando necesite la plata.", ok: false, fb: "Rinde más, pero vence después de cuando necesita la plata: tendría que venderla a precio de mercado." }
        ],
        explicacion: `La primera pregunta en pesos no es "¿cuánto rinde?" sino <strong>"¿en qué moneda y cuándo vas a usar esta plata?"</strong>. Calzar moneda y plazo elimina riesgos que el cliente no necesita.` }
    ]
  },

  /* ------------------------------------------------------------ */
  {
    id: "a4",
    titulo: "Bonos CER: inflación más una tasa real",
    minutos: 9,
    objetivo: "Leer la TIR de un bono CER y saber qué cubre y qué no cubre.",
    bloques: [
      { t: "p", html: `Un bono CER (BONCER, LECER y otros) ajusta su capital por el <span class="term" data-term="cer">CER</span>, un índice que elabora el BCRA a partir de la inflación del INDEC. Encima de ese ajuste paga una <strong>tasa real</strong>. Por eso su TIR se lee distinto:` },
      { t: "idea", titulo: "La TIR de un CER es real", html: `Cuando un BONCER muestra "TIR 10,5%", significa <strong>inflación + 10,5%</strong> por año (si se mantiene hasta el vencimiento). Para compararlo con una tasa fija hay que sumarle la inflación esperada. Un CER al 10,5% no rinde menos que una LECAP al 28%: rinde 10,5% <em>por encima</em> de la inflación.` },
      { t: "mercado", titulo: "Un dato real", html: `En la licitación del 11 de noviembre de 2026, el Tesoro colocó el BONCER <strong>TZX28</strong> (vence en junio de 2028) a una tasa real del <strong>10,50%</strong> anual sobre CER.`, fuente: "Ámbito, 11 de noviembre de 2026" },
      { t: "ej", id: "e1", tipo: "estimar",
        enunciado: `Un BONCER rinde CER + 10,5%. Si la inflación de los próximos 12 meses es 25%, ¿cuánto rinde aproximadamente en pesos? Respondé en %.`,
        unidad: "%", respuesta: 38.1, tolerancia: 1.5,
        explicacion: `1,25 × 1,105 − 1 ≈ <strong>38%</strong> en pesos. A ojo alcanza con sumar: 25 + 10,5 ≈ 35,5%; la cuenta exacta da un poco más porque los porcentajes se multiplican.` },
      { t: "p", html: `¿Cuándo conviene un CER y cuándo una tasa fija? Depende de qué inflación esperás: lo trabajás a fondo, y a ojo, en el <strong>Taller: entender el CER</strong>.` },
      { t: "h", texto: "Lo que el CER no cubre (los errores más comunes)" },
      { t: "lista", items: [
        `<strong>No cubre la devaluación.</strong> Si el dólar salta más que la inflación, un CER pierde en dólares. Y un CER largo puede caer de precio en el corto plazo si el mercado empieza a esperar devaluación y la gente sale de los pesos, aunque su tasa real siga siendo positiva.`,
        `<strong>El rendimiento mensual no es exactamente la inflación.</strong> El CER se ajusta con un rezago de alrededor de un mes y medio, y además el precio del bono se mueve por cambios en la tasa real. En un mes cualquiera puede rendir bastante más o menos que el IPC de ese mes.`,
        `<strong>Casi no tiene liquidez en dólares.</strong> Un CER se negocia en pesos. Intentar venderlo directo contra dólares es exponerse a precios malos por falta de puntas: conviene venderlo en pesos y comprar los dólares en una operación aparte.`,
        `<strong>Sigue teniendo riesgo de precio.</strong> Un BONCER largo tiene duration alta: si sube la tasa real, cae su precio como cualquier bono.`
      ]},
      { t: "ej", id: "e2", tipo: "multi",
        enunciado: `Un cliente conservador dice: "Pongo todo en CER y me olvido, total me cubre de la inflación". Marcá <strong>todas</strong> las aclaraciones correctas.`,
        opciones: [
          { txt: "Lo cubre de la inflación si lo mantiene al vencimiento, pero no de una devaluación más fuerte que la inflación.", ok: true, fb: "Es la aclaración central." },
          { txt: "Un CER largo puede mostrar caídas de precio en el camino.", ok: true, fb: "Tiene duration y responde a la tasa real." },
          { txt: "Si en algún momento necesita dólares, conviene venderlo directo contra dólares para ahorrarse un paso.", ok: false, fb: "Al revés: casi no hay puntas en dólares. Se vende en pesos y se compra el dólar aparte." },
          { txt: "La TIR que ve en pantalla ya es una tasa por encima de la inflación.", ok: true, fb: "Exacto: es una tasa real." },
          { txt: "Mes a mes, el bono va a rendir exactamente la inflación que publique el INDEC para ese mes.", ok: false, fb: "No: el ajuste tiene rezago y el precio se mueve por la tasa real." }
        ],
        explicacion: `"Cubre la inflación" es verdad a lo largo de toda la vida del bono y con supuestos. En el camino, el CER puede tener sobresaltos que un cliente conservador tiene que conocer de antemano.` }
    ]
  },

  /* ------------------------------------------------------------ */
  {
    id: "a5",
    titulo: "Dollar-linked y duales: coberturas con letra chica",
    minutos: 9,
    objetivo: "Saber qué tipo de dólar cubre un dollar-linked y por qué un bono dual no es una ganancia sin costo.",
    bloques: [
      { t: "p", html: `Un bono <span class="term" data-term="dl">dollar-linked</span> se compra y se cobra en <strong>pesos</strong>, pero su capital se ajusta por el tipo de cambio <strong>oficial mayorista</strong>. Sirve como cobertura contra una devaluación del oficial sin tener que comprar dólares.` },
      { t: "h", texto: "Lo que cubre y lo que no" },
      { t: "tabla", cab: ["Escenario", "¿Lo cubre el dollar-linked?"], filas: [
        ["El dólar oficial sube fuerte", "Sí: el capital se ajusta por esa suba"],
        ["Sube el MEP o el CCL, pero el oficial no", "No: sigue el oficial, no los dólares financieros"],
        ["El cliente quiere tener dólares billete o en el exterior", "No: cobra en pesos"],
        ["La inflación supera la suba del dólar oficial", "No: pierde contra la inflación"]
      ]},
      { t: "ej", id: "e1", tipo: "mc",
        enunciado: `Una empresa importadora tiene que pagar mercadería en 6 meses, al tipo de cambio oficial, y tiene los pesos hoy. ¿Para qué le sirve un dollar-linked?`,
        opciones: [
          { txt: "Para nada: le conviene comprar dólar MEP, la cobertura más directa contra una devaluación.", ok: false, fb: "Puede hacerlo, pero su deuda está atada al oficial, no al MEP." },
          { txt: "Calza su riesgo: si sube el oficial, el bono sube en la misma proporción y le alcanza para pagar.", ok: true, fb: "Exacto: el dollar-linked es la cobertura natural para quien tiene un costo atado al oficial." },
          { txt: "Le sirve para ganarle a la inflación de esos seis meses mientras espera para pagar la mercadería.", ok: false, fb: "No es su función: sigue al dólar oficial, no a los precios." }
        ],
        explicacion: `El dollar-linked es ideal para quien tiene una obligación atada al dólar oficial. Para un ahorrista que quiere "tener dólares", es una cobertura parcial.` },
      { t: "h", texto: "Bonos duales: \"lo mejor de dos\" tiene precio" },
      { t: "p", html: `Un bono <span class="term" data-term="dual">dual</span> paga al vencimiento el <strong>mayor</strong> entre dos ajustes (por ejemplo, tasa fija o una tasa variable, o inflación o dólar, según la serie). Comercialmente se presenta como "doble cobertura", pero hay dos cosas que el cliente tiene que saber:` },
      { t: "lista", items: [
        `<strong>No todos los duales son iguales.</strong> Hay que leer la definición exacta de cada serie: qué dos cosas compara y cómo se calcula cada una.`,
        `<strong>La opción se paga.</strong> Elegir "lo mejor de dos" es un derecho que tiene valor, y el mercado lo descuenta en el precio. Por eso un dual suele rendir algo menos que cada alternativa por separado en el escenario base.`
      ]},
      { t: "ej", id: "e2", tipo: "mc",
        enunciado: `Un cliente dice: "El dual me paga lo mejor entre las dos opciones, así que gano seguro". ¿Qué le aclarás?`,
        opciones: [
          { txt: "Tiene razón: al cobrar siempre lo mejor de dos opciones, es una cobertura perfecta y sin costo extra.", ok: false, fb: "Reduce un riesgo, pero no elimina todos." },
          { txt: "Que esa elección ya está incluida en el precio, y que sigue teniendo riesgo de precio y de crédito.", ok: true, fb: "Exacto: es un seguro, y los seguros se pagan." },
          { txt: "Que los duales siempre rinden más que un bono común, justamente porque pagan lo mejor de dos.", ok: false, fb: "Al contrario: por la opción incluida, en el escenario base suelen rendir algo menos." }
        ],
        explicacion: `Una buena analogía para el cliente: <em>"Es como un seguro: te cubre si pasa lo malo, pero lo pagás aunque no pase"</em>.` },
      { t: "h", texto: "Mapa final: qué instrumento cubre qué" },
      { t: "tabla", cab: ["Si el cliente teme...", "Instrumento que lo cubre", "Lo que no cubre"], filas: [
        ["Inflación", "CER", "Devaluación más fuerte que la inflación"],
        ["Devaluación del oficial", "Dollar-linked", "Suba de MEP/CCL; inflación"],
        ["Necesitar pesos en una fecha", "LECAP / BONCAP al plazo", "Una inflación mayor a la esperada"],
        ["Tener dólares sí o sí", "Bonos o ONs en dólares (hard dollar)", "El riesgo país y el de crédito"]
      ], nota: "Esta tabla resume el módulo. Si podés explicar cada fila con un ejemplo de cliente, dominás la renta fija argentina." },
      { t: "ej", id: "e3", tipo: "caso",
        enunciado: `Una clienta te dice: "Tengo pesos y miedo a que todo se desmadre, no sé si cubrirme de la inflación o del dólar". Escribí en 4 o 5 líneas cómo la ayudarías a decidir.`,
        rubrica: [
          "Pregunta en qué moneda y cuándo va a usar la plata (calzar moneda y plazo).",
          "Explica la diferencia entre cubrirse de inflación (CER) y de devaluación (dollar-linked o hard dollar).",
          "Menciona que se puede combinar (por ejemplo, partes en CER y en dólares) en lugar de elegir una sola.",
          "Evita prometer qué va a pasar con la inflación o el dólar."
        ],
        modelo: `"Primero quiero saber para qué es esta plata y cuándo la vas a usar. Si tus gastos son en pesos, lo que te come es la inflación, y un bono CER te protege de eso. Si lo que te preocupa es que salte el dólar, podemos usar un dollar-linked o directamente pasar una parte a dólares. Como nadie sabe cuál de las dos cosas va a pasar, muchas veces lo más sensato es repartir: una parte en CER y otra dolarizada."` }
    ]
  }
  ]
};
