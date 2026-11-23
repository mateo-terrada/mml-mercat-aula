/* ============================================================
   CATÁLOGO del Aula: bloques temáticos, módulos y recorrido.
   Un módulo con `disponible: true` debe tener su archivo en js/aula/modulos/.
   ============================================================ */
window.AULA = window.AULA || { modulos: {} };

AULA.catalogo = [
  {
    bloque: "Fundamentos",
    descripcion: "Cómo funciona el mercado y cómo se piensa una inversión.",
    modulos: [
      { id: "mercado", numero: "01", titulo: "El mercado de capitales", bajada: "Primario y secundario, qué dice la norma sobre el agente productor y cómo está protegido el cliente.", capitulos: "Cap. 1", disponible: true },
      { id: "perfil", numero: "02", titulo: "Perfil, riesgo y carteras", capitulos: "Cap. 2, 3, 7 y 8", disponible: true }
    ]
  },
  {
    bloque: "Renta fija",
    descripcion: "Bonos soberanos, ONs e instrumentos en pesos.",
    modulos: [
      { id: "bonos", numero: "03", titulo: "Bonos: precio, TIR y duration", capitulos: "Cap. 4", disponible: true },
      { id: "duration", numero: "T1", titulo: "Taller: duration a ojo", capitulos: "Taller práctico", disponible: true },
      { id: "rfarg", numero: "04", titulo: "Renta fija argentina", capitulos: "Cap. 12", disponible: true },
      { id: "cer", numero: "T2", titulo: "Taller: entender el CER", capitulos: "Taller práctico", disponible: true }
    ]
  },
  {
    bloque: "Renta variable y fondos",
    descripcion: "Acciones, CEDEARs, ETFs y vehículos colectivos.",
    modulos: [
      { id: "empresas", numero: "05", titulo: "Analizar una empresa", capitulos: "Cap. 5 y 11", disponible: true },
      { id: "carterasrv", numero: "T3", titulo: "Taller: armar una cartera de acciones", capitulos: "Taller práctico", disponible: true },
      { id: "fci", numero: "06", titulo: "Fondos comunes de inversión", bajada: "Un fondo es lo que tiene adentro: leer el factsheet, medir la comisión y elegir el fondo para cada necesidad.", capitulos: "Cap. 6", disponible: true }
    ]
  },
  {
    bloque: "Operatoria",
    descripcion: "De la decisión a la orden: cómo se ejecuta bien.",
    modulos: [
      { id: "operar", numero: "07", titulo: "Operar desde Argentina", capitulos: "Cap. 9 y 10", disponible: true }
    ]
  },
  {
    bloque: "Criterio profesional",
    descripcion: "Unir todo para asesorar con juicio propio.",
    modulos: [
      { id: "macro", numero: "08", titulo: "Macro argentina para asesores", bajada: "Del titular a la cartera: riesgo país, dólar, inflación, tasas y el mundo, con las elecciones de 2027 como eje.", capitulos: "Contenido nuevo", disponible: true },
      { id: "criterio", numero: "09", titulo: "Integración y criterio", bajada: "Todo junto frente a un cliente real: tasas que no se comparan, clientes con ideas propias y una cartera armada con riesgo y retorno a la vista.", capitulos: "Cap. 13", disponible: true }
    ]
  }
];

/* Simulaciones: cada una se habilita cuando están completos los módulos de `req`. */
AULA.simulaciones = [
  { id: "anio1", titulo: "Simulador de carteras: renta fija y dólar", clave: "elEscritorio_cartera_v1", href: "cartera.html",
    req: ["mercado", "perfil", "bonos", "duration", "rfarg", "cer"], habilita: "Taller del CER",
    bajada: "Administrás las carteras de una jubilada conservadora y de un inversor agresivo durante un año. Riesgo país, inflación, dólar y tasas: leés los titulares, armás la propuesta y le explicás a cada uno.",
    tema: "Bonos, tasas, CER y dólar" },
  { id: "rv", titulo: "Simulación de renta variable", clave: "elEscritorio_cartera_rv_v1", href: "cartera.html?sim=rv",
    req: ["mercado", "perfil", "empresas", "carterasrv"], habilita: "Taller de carteras de acciones",
    bajada: "Una jubilada que necesita estabilidad y un inversor que quiere crecer, con catorce vehículos para repartir entre geografías y sectores. Concentración, correlación y caídas: qué pasa cuando todo cae junto y cuando una sola empresa falla.",
    tema: "Acciones, ETFs, geografías y sectores" }
];

/* Recorrido sugerido: el orden en que conviene hacer los módulos disponibles. */
AULA.recorrido = ["mercado", "perfil", "bonos", "duration", "rfarg", "cer", "empresas", "carterasrv", "fci", "operar", "macro", "criterio"];

/* Diagnóstico: 2 preguntas del banco por módulo o taller, en orden del recorrido.
   Fijas a propósito, para poder comparar un diagnóstico con el siguiente. */
AULA.diagnostico = {
  mercado: ["MERC-MC-001", "MERC-MC-003"],
  perfil: ["PORT-MC-016", "TRAMPA-MC-021"],
  bonos: ["RF-MC-001", "RF-MC-022"],
  duration: ["RF-MC-002", "RF-MC-015"],
  rfarg: ["RF-MC-017", "RF-MC-019"],
  cer: ["TRAMPA-MC-004", "MACRO-MC-009"],
  empresas: ["EMP-MC-001", "EMP-MC-004"],
  fci: ["FCI-MC-002", "FCI-MC-005"],
  operar: ["OP-MC-001", "OP-MC-007"],
  macro: ["MACRO-MC-017", "MACRO-MC-013"],
  criterio: ["CRIT-MC-001", "CRIT-MC-007"]
};
