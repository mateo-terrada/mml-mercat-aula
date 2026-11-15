/* ============================================================
   TALLER · Entender el CER
   Objetivo: tasa real, rendimiento nominal esperado y qué protege
   (y qué no) un bono CER. Bonus: CER o tasa fija, a ojo.
   ============================================================ */
window.AULA = window.AULA || { modulos: {} };

AULA.modulos.cer = {
  id: "cer",
  numero: "T2",
  taller: true,
  titulo: "Taller: entender el CER",
  bajada: "Qué significa que un bono rinda 'CER + 5%', cuánto termina cobrando en pesos, de qué te protege y de qué no. Al final, un bonus: cómo elegir a ojo entre CER y tasa fija.",
  fuente: "Taller práctico · complementa el módulo 04",
  practica: [
    { titulo: "¿Qué hago si...?", desc: "El escenario de cobertura en pesos: tasa fija vs. CER vs. dollar-linked.", href: "simulador.html" },
    { titulo: "Curvas de bonos", desc: "La curva CER de la mesa de operaciones: el eje vertical es tasa real.", href: "simulador.html" }
  ],
  lecciones: [

  /* ------------------------------------------------------------ */
  {
    id: "c1",
    titulo: "Tasa real: ganarle a los precios",
    minutos: 8,
    objetivo: "Distinguir lo que rinde una inversión en pesos de lo que realmente gana en poder de compra.",
    bloques: [
      { t: "p", html: `Si una inversión rinde 30% en el año y los precios suben 30%, ¿ganaste algo? En pesos tenés más, pero con esos pesos comprás exactamente lo mismo que antes. Ganaste <strong>cero</strong> en lo que importa: lo que podés comprar.` },
      { t: "idea", titulo: "Nominal y real", html: `La <strong>tasa nominal</strong> es lo que rinde en pesos: el número que ves en pantalla. La <strong>tasa real</strong> es lo que le ganás a los precios: cuánto más podés comprar al final. A ojo: <strong>tasa real ≈ tasa nominal − inflación</strong>.` },
      { t: "herramienta", id: "changuitos" },
      { t: "p", html: `Mové la inflación y mirá las tres filas. Con la plata quieta, siempre comprás menos. Con la tasa fija, comprás más si la inflación queda por debajo de 30% y menos si queda por encima. Con el CER, comprás siempre un poco más: <strong>10,5 changuitos, con cualquier inflación</strong>. Ese 0,5 de más es el 5% real.` },
      { t: "ej", id: "e1", tipo: "estimar",
        enunciado: `Una inversión rinde 40% en pesos en un año en el que la inflación es 30%. A ojo, ¿cuál fue la tasa real? Respondé en %.`,
        unidad: "%", respuesta: 10, tolerancia: 2.5,
        explicacion: `A ojo: 40 − 30 = <strong>10%</strong> real. La cuenta exacta da un poco menos (1,40 ÷ 1,30 − 1 ≈ 7,7%), porque los precios también suben sobre lo ganado. Para conversar con un cliente, la resta alcanza.` },
      { t: "ej", id: "e2", tipo: "mc",
        enunciado: `Un cliente está contento: "Mi plazo fijo me dio 25% este año". La inflación del año fue 30%. ¿Qué le decís?`,
        opciones: [
          { txt: "Que le fue bien: un 25% en pesos es un rendimiento alto para algo tan seguro como un plazo fijo.", ok: false, fb: "Alto en pesos, pero por debajo de la inflación." },
          { txt: "Que en pesos ganó, pero en poder de compra perdió cerca de 5%: hoy compra menos que hace un año.", ok: true, fb: "Exacto: tasa real ≈ 25 − 30 = −5%." },
          { txt: "Que perdió plata, porque cualquier inversión que rinda por debajo del dólar es una pérdida.", ok: false, fb: "La comparación correcta acá es contra la inflación, no contra el dólar." }
        ],
        explicacion: `Es la confusión más común en un país con inflación: medir en pesos. Para un ahorrista que gasta en pesos, la pregunta es <strong>¿le gané a los precios?</strong>` },
      { t: "cliente", titulo: "Cómo se lo explicás al cliente", html: `"No importa tanto cuántos pesos tenés al final, sino cuántas cosas podés comprar con ellos. Si tu plata creció 30% y los precios también, quedaste igual. Lo que buscamos es crecer por encima de los precios."` }
    ]
  },

  /* ------------------------------------------------------------ */
  {
    id: "c2",
    titulo: "Cómo funciona un bono CER",
    minutos: 9,
    objetivo: "Entender que 'CER + 5%' es una tasa real, y estimar cuánto cobraría en pesos según la inflación esperada.",
    bloques: [
      { t: "p", html: `Un bono CER tiene su capital atado al <span class="term" data-term="cer">CER</span>, un índice que calcula el BCRA a partir de la inflación que mide el INDEC. Si los precios suben 30%, el capital del bono sube 30%. Encima de eso, paga una tasa: esa tasa es <strong>real</strong>, porque se gana por encima de la inflación.` },
      { t: "ejemplo", titulo: "Un año de un bono CER + 5%", pasos: [
        `Invertís 100. En el año, la inflación es 30%.`,
        `El CER ajusta el capital: 100 × 1,30 = <strong>130</strong>. Hasta acá, solo mantuviste el poder de compra.`,
        `El bono paga 5% real sobre ese capital ajustado: 130 × 1,05 = <strong>136,5</strong>.`,
        `En pesos ganaste 36,5%. En poder de compra, 5%.`
      ], conclusion: `Por eso, cuando en la pantalla ves que un BONCER tiene "TIR 5%", no significa que rinda 5% en pesos: significa inflación + 5%.` },
      { t: "idea", titulo: "Cómo leer la TIR de un CER", html: `TIR de un bono CER = <strong>tasa real</strong>. Para saber cuánto cobrarías en pesos, sumale la inflación que esperás: <strong>nominal esperada ≈ inflación esperada + TIR real</strong>.` },
      { t: "mercado", titulo: "Un dato real", html: `En la licitación del 11 de noviembre de 2026, el Tesoro colocó el BONCER <strong>TZX28</strong> (vence en junio de 2028) a <strong>CER + 10,50%</strong>. Si la inflación de los próximos doce meses fuera, por ejemplo, 25%, en pesos rendiría cerca de 35%.`, fuente: "Ámbito, 11 de noviembre de 2026" },
      { t: "herramienta", id: "real-nominal" },
      { t: "ej", id: "e1", tipo: "estimar",
        enunciado: `Un BONCER rinde CER + 8%. Si esperás 20% de inflación para el año, a ojo, ¿cuánto rendiría en pesos? Respondé en %.`,
        unidad: "%", respuesta: 28, tolerancia: 2,
        explicacion: `20 + 8 = <strong>28%</strong> a ojo (la cuenta exacta da 29,6%). Con 35% de inflación rendiría unos 43%, y con 10%, unos 18%: el número en pesos cambia, pero los 8 p.p. por encima de los precios se mantienen.` },
      { t: "ej", id: "e2", tipo: "mc",
        enunciado: `En la pantalla, una LECAP muestra "TIR 30%" y un BONCER "TIR 7%". Un cliente dice: "La LECAP rinde cuatro veces más". ¿Qué le aclarás?`,
        opciones: [
          { txt: "Que tiene razón: 30% contra 7% es una diferencia enorme a favor de la LECAP en cualquier escenario.", ok: false, fb: "Compara una tasa nominal con una real: no son el mismo tipo de número." },
          { txt: "Que el 7% del CER es por encima de la inflación: con 25% de inflación, rendiría cerca de 32% en pesos.", ok: true, fb: "Exacto: hay que llevar las dos al mismo idioma antes de comparar." },
          { txt: "Que el BONCER es mejor siempre, porque una tasa por encima de la inflación nunca puede perder contra una tasa fija.", ok: false, fb: "Depende de cuánta inflación haya: eso lo vemos en la lección bonus." }
        ],
        explicacion: `Comparar la TIR de una LECAP con la de un CER es comparar peras con manzanas: una está en pesos y la otra en poder de compra. Siempre hay que sumarle la inflación esperada al CER antes de comparar.` },
      { t: "ojo", titulo: "Si la tasa real es negativa", html: `A veces el mercado paga tanto por cubrirse que un CER rinde, por ejemplo, CER − 1%. Significa que vas a perder un poco de poder de compra, pero poco y con certeza. Es el precio de un seguro: no siempre es mala compra, depende de qué te cubre y contra qué alternativa lo comparás.` }
    ]
  },

  /* ------------------------------------------------------------ */
  {
    id: "c3",
    titulo: "De qué te protege (y de qué no)",
    minutos: 11,
    objetivo: "Explicar con claridad qué cubre un bono CER, qué riesgos sigue teniendo y cuándo es una buena herramienta para un cliente.",
    bloques: [
      { t: "p", html: `La gran ventaja del CER no es rendir más: es que <strong>el resultado en poder de compra casi no depende de cuánta inflación haya</strong>. Con la tasa fija pasa lo contrario: ganás mucho si la inflación baja y perdés si sube.` },
      { t: "herramienta", id: "escenarios-cer" },
      { t: "p", html: `En la vista "lo que le ganás a los precios", el CER da <strong>+5% en los tres escenarios</strong>. La tasa fija va de +17% (si la inflación baja) a −7% (si sube). En la vista "en pesos" se ve lo mismo al revés: la tasa fija es siempre 35%, y es el CER el que se mueve.` },
      { t: "idea", titulo: "La protección del CER", html: `Un bono CER es un <strong>seguro contra la sorpresa inflacionaria</strong>. Si la inflación se acelera, tu capital se ajusta solo. No vas a hacer una diferencia enorme si la inflación baja, pero tampoco vas a perder poder de compra si sube.` },
      { t: "ej", id: "e1", tipo: "mc",
        enunciado: `Una jubilada vive de sus ahorros en pesos y le preocupa que "se le escapen los precios". ¿Por qué el CER puede ser una buena herramienta para ella?`,
        opciones: [
          { txt: "Porque siempre rinde más que la tasa fija, así que es la opción que más pesos le va a dar en cualquier caso.", ok: false, fb: "No siempre rinde más: si la inflación baja, la tasa fija le gana." },
          { txt: "Porque su gasto es en pesos y lo que necesita es sostener el poder de compra, rinda lo que rinda la inflación.", ok: true, fb: "Exacto: el CER calza con su problema real, que son los precios." },
          { txt: "Porque la protege de todo: de la inflación, del dólar y de las caídas de precio del mercado.", ok: false, fb: "La protege de la inflación, pero no del dólar ni de las caídas de precio." }
        ],
        explicacion: `El CER es la herramienta natural para alguien cuyo problema es la inflación en pesos. Para alguien que piensa en dólares, no alcanza.` },
      { t: "h", texto: "Lo que el CER no cubre" },
      { t: "lista", items: [
        `<strong>El dólar.</strong> Si hay una devaluación más fuerte que la inflación, el CER pierde medido en dólares. Cubre precios, no tipo de cambio.`,
        `<strong>El precio en el camino.</strong> Un BONCER es un bono: si sube la tasa real que pide el mercado, su precio baja, y cuanto más largo, más baja (es lo que viste en el taller de duration). La protección completa es para quien llega al vencimiento.`,
        `<strong>El mes a mes.</strong> El CER se ajusta con un rezago de alrededor de un mes y medio. En un mes cualquiera, el bono no rinde exactamente la inflación de ese mes.`,
        `<strong>La salida en dólares.</strong> Casi no hay compradores de CER contra dólares. Si el cliente quiere dolarizarse, conviene vender en pesos y comprar los dólares aparte.`,
        `<strong>El emisor.</strong> Sigue siendo deuda del Tesoro: el riesgo de crédito no desaparece por estar indexada.`
      ]},
      { t: "ej", id: "e2", tipo: "multi",
        enunciado: `Un cliente dice: "Con el CER no pierdo nunca". Marcá <strong>todas</strong> las situaciones en las que podría ver una pérdida.`,
        opciones: [
          { txt: "El dólar sube mucho más que la inflación y él mide su patrimonio en dólares.", ok: true, fb: "El CER cubre precios, no tipo de cambio." },
          { txt: "Tiene un BONCER largo, sube la tasa real del mercado y necesita vender antes de que venza.", ok: true, fb: "Riesgo de precio: el bono tiene duration." },
          { txt: "La inflación del año sale mucho más alta de lo que se esperaba cuando compró.", ok: false, fb: "Es justo el escenario del que el CER lo protege." },
          { txt: "Compró a una tasa real negativa (CER − 1%) y lo mantiene hasta el vencimiento.", ok: true, fb: "Pierde un poco de poder de compra, aunque de forma acotada y conocida." },
          { txt: "La inflación baja a la mitad durante el año siguiente a la compra.", ok: false, fb: "Si la inflación baja, el CER sigue dando su tasa real: no pierde, aunque la tasa fija le habría ganado." }
        ],
        explicacion: `"No pierdo nunca" es una frase peligrosa. Lo correcto es: <strong>"no pierdo contra la inflación si lo mantengo hasta el final"</strong>. Las otras pérdidas posibles hay que decirlas antes de que pasen.` },
      { t: "ej", id: "e3", tipo: "caso",
        enunciado: `Un cliente quiere poner todos sus pesos en un BONCER a 2028 porque "es lo más seguro que hay". Va a necesitar parte de esa plata en 8 meses. Escribí en 4 o 5 líneas qué le dirías.`,
        rubrica: [
          "Valida que el CER lo protege de la inflación (es una buena herramienta para su problema).",
          "Advierte que un BONCER a 2028 tiene duration: si necesita vender en 8 meses, puede hacerlo con el precio abajo.",
          "Propone calzar plazos: la parte de 8 meses en algo más corto (un CER o una LECAP que venza antes) y el resto en el largo.",
          "Aclara que no lo cubre del dólar si eso le preocupa."
        ],
        modelo: `"El CER es muy buena idea para que no te coma la inflación. Pero un bono a 2028 es largo: si en 8 meses necesitás vender una parte y justo subieron las tasas, vas a tener que vender más barato. Te propongo separar: lo que vas a usar en 8 meses, en algo que venza antes de esa fecha; el resto, en el CER largo. Y tené en cuenta que te cubre de los precios, no del dólar."` }
    ]
  },

  /* ------------------------------------------------------------ */
  {
    id: "c4",
    titulo: "Bonus: ¿CER o tasa fija? La inflación que los empata",
    minutos: 7,
    objetivo: "Decidir a ojo entre un bono CER y uno a tasa fija comparando la inflación que esperás con la que los empata.",
    bloques: [
      { t: "p", html: `Con todo lo anterior, la elección entre CER y tasa fija se reduce a una pregunta: <strong>¿cuánta inflación creés que va a haber?</strong> Hay una inflación en la que los dos rinden lo mismo. A ojo, se calcula con una resta.` },
      { t: "formula", html: `Inflación que los empata ≈ tasa fija − tasa real del CER`, nota: "Con una LECAP al 35% y un CER + 5% del mismo plazo: 35 − 5 = 30% de inflación. La cuenta exacta da un poco menos, pero para decidir alcanza." },
      { t: "lista", items: [
        `<strong>Si esperás más de 30%:</strong> conviene el CER. La inflación alta le suma al CER y le resta a la tasa fija.`,
        `<strong>Si esperás menos de 30%:</strong> conviene la tasa fija. Te "congelás" un 35% que, con poca inflación, es mucho en términos reales.`,
        `<strong>Si esperás algo cerca de 30% o no tenés idea:</strong> da parecido, y el CER funciona como seguro por si la inflación sorprende para arriba.`
      ]},
      { t: "herramienta", id: "empate-ojo" },
      { t: "ej", id: "e1", tipo: "mc",
        enunciado: `Una BONCAP rinde 32% y un BONCER del mismo plazo, CER + 6%. Vos esperás una inflación de 20%. ¿Qué conviene?`,
        opciones: [
          { txt: "El CER, porque una tasa por encima de la inflación siempre termina ganándole a una tasa fija en Argentina.", ok: false, fb: "Solo si la inflación supera el empate, que acá es 26%." },
          { txt: "La tasa fija: la inflación que los empata es 26% (32 − 6) y vos esperás bastante menos.", ok: true, fb: "Exacto: esperás menos inflación que el empate." },
          { txt: "Da exactamente lo mismo, porque el mercado siempre pone las dos tasas para que rindan igual al final.", ok: false, fb: "El mercado iguala según su expectativa; si la tuya es distinta, una de las dos conviene más." }
        ],
        explicacion: `32 − 6 = 26% de empate. Con 20% esperado, la BONCAP rinde unos 12 p.p. reales y el CER, 6. Si te equivocás y la inflación termina en 35%, la que gana es el CER: por eso esta decisión también es una apuesta.` },
      { t: "ej", id: "e2", tipo: "estimar",
        enunciado: `Una LECAP rinde 28% y un CER del mismo plazo, CER + 3%. A ojo, ¿qué inflación los empata? Respondé en %.`,
        unidad: "%", respuesta: 25, tolerancia: 1.5,
        explicacion: `28 − 3 = <strong>25%</strong>. Si creés que la inflación va a estar arriba de 25%, conviene el CER; si creés que va a estar abajo, la LECAP.` },
      { t: "idea", titulo: "Lo que dice el empate sobre el mercado", html: `Esa inflación de empate es, aproximadamente, lo que el mercado <strong>espera</strong> que pase. Elegir CER es decir "creo que va a haber más inflación de la que cree el mercado"; elegir tasa fija es decir "menos". Y si el cliente no quiere apostar, puede tener una parte en cada uno.` },
      { t: "cliente", titulo: "Cómo se lo explicás al cliente", html: `"Con esta LECAP te asegurás 35% en pesos. Con este CER, 5% por encima de la inflación. Empatan si la inflación es 30%. Si creés que va a ser más, te conviene el CER; si creés que va a ser menos, la LECAP. Si no estás seguro, podemos repartir entre los dos."` }
    ]
  }
  ]
};
