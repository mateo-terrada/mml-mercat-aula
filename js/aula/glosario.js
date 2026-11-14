/* ============================================================
   GLOSARIO — definiciones cortas que aparecen al tocar un término
   subrayado en las lecciones, y en la página de glosario.
   ============================================================ */
window.AULA = window.AULA || { modulos: {} };

AULA.glosario = {
  perfil:        { termino: "Perfil del inversor", def: "Combinación de tolerancia al riesgo, horizonte, situación, objetivo y conocimiento que define qué inversiones son adecuadas para una persona y para cada uno de sus objetivos." },
  volatilidad:   { termino: "Volatilidad", def: "Cuánto sube y baja el precio de un activo en el camino. Es una medida de incertidumbre, no de pérdida permanente." },
  puntas:        { termino: "Caja de puntas", def: "La pantalla que muestra las mejores ofertas de compra y de venta de un instrumento, con sus cantidades. Indica cuánta liquidez real hay." },
  assetallocation:{ termino: "Asignación de activos", def: "Cómo se reparte una cartera entre tipos de activos (liquidez, renta fija, acciones). Es la decisión que más explica el resultado de una cartera." },
  rebalanceo:    { termino: "Rebalanceo", def: "Volver a los pesos acordados en una cartera cuando los movimientos del mercado los alejaron: vender un poco de lo que subió y comprar de lo que bajó." },
  on:            { termino: "Obligación Negociable (ON)", def: "Bono emitido por una empresa. Funciona igual que un bono soberano, pero el riesgo de crédito es el de la empresa." },
  bullet:        { termino: "Bullet", def: "Bono que devuelve todo el capital en un solo pago al vencimiento." },
  residual:      { termino: "Valor residual", def: "La parte del valor nominal que todavía no fue amortizada. Los intereses se calculan sobre este valor." },
  tir:           { termino: "TIR (tasa interna de retorno)", def: "Rendimiento anual que obtiene quien compra un bono al precio de hoy, lo mantiene hasta el vencimiento y cobra todos los pagos prometidos. Se mueve al revés que el precio." },
  corridos:      { termino: "Intereses corridos", def: "Interés acumulado desde el último pago de cupón hasta hoy. En Argentina el precio de pantalla (precio sucio) ya los incluye." },
  valortecnico:  { termino: "Valor técnico", def: "Valor residual más intereses corridos: lo que el emisor pagaría si cancelara la deuda hoy." },
  paridad:       { termino: "Paridad", def: "Precio dividido valor técnico. Paridad 100% significa que el bono cotiza a lo que vale 'en los papeles'; menos de 100%, con descuento." },
  duration:      { termino: "Duration modificada", def: "Cuánto cambia, en porcentaje, el precio de un bono si su TIR se mueve 1 punto. Duration 5: ≈ 5% de cambio de precio por cada punto de TIR." },
  convexidad:    { termino: "Convexidad", def: "Corrección a la estimación por duration: la relación precio-TIR es curva, no recta, y con movimientos grandes la duration sola se equivoca." },
  curva:         { termino: "Curva de rendimientos", def: "Gráfico de bonos comparables con su TIR en el eje vertical y su plazo o duration en el horizontal." },
  riesgopais:    { termino: "Riesgo país", def: "Rendimiento extra que se exige a los bonos de un país en dólares sobre los bonos del Tesoro de EE.UU. Se mide en puntos básicos (100 pb = 1%). Referencia: EMBI de JP Morgan." },
  lecap:         { termino: "LECAP / BONCAP", def: "Letras y bonos del Tesoro en pesos a tasa fija. Se compran con descuento y pagan un monto de pesos conocido al vencimiento." },
  carry:         { termino: "Carry trade", def: "Estrategia de quedarse en pesos ganando tasa, apostando a que el dólar suba menos que esa tasa en el período." },
  cer:           { termino: "CER", def: "Coeficiente de Estabilización de Referencia: índice diario del BCRA basado en la inflación del INDEC, con un rezago de alrededor de un mes y medio. Ajusta el capital de los bonos CER." },
  breakeven:     { termino: "Breakeven", def: "Nivel que hace indiferentes dos alternativas. Inflación breakeven: la que iguala tasa fija y CER. Dólar breakeven: el que iguala estar en pesos y en dólares." },
  dl:            { termino: "Dollar-linked", def: "Bono en pesos cuyo capital se ajusta por el dólar oficial mayorista. Cubre una devaluación del oficial, no la suba del MEP o CCL." },
  dual:          { termino: "Bono dual", def: "Bono que paga el mayor entre dos ajustes posibles. La opción de cobrar lo mejor tiene un costo incluido en el precio." },
  tem:           { termino: "TEM", def: "Tasa efectiva mensual: lo que rinde un instrumento por mes con interés compuesto." },
  tna:           { termino: "TNA", def: "Tasa nominal anual: TEM × 12, sin capitalizar. Es la que se informa en plazos fijos." },
  tea:           { termino: "TEA", def: "Tasa efectiva anual: (1 + TEM)^12 − 1. Muestra lo que rinde un año reinvirtiendo mes a mes." },
  pb:            { termino: "Punto básico", def: "Un centésimo de punto porcentual. 100 puntos básicos = 1%." },
  t1:            { termino: "T+1 y CI", def: "Plazos de liquidación. En Argentina el estándar es T+1 (se liquida al día hábil siguiente); contado inmediato (CI) se usa cuando hay urgencia." },
  mep:           { termino: "Dólar MEP y CCL", def: "Tipos de cambio que surgen de comprar un bono en pesos y venderlo en dólares (MEP, dólares en Argentina) o en dólares en el exterior (CCL o cable)." }
};
