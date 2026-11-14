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
      { id: "mercado", numero: "01", titulo: "El mercado de capitales", bajada: "Quién es quién, para qué sirve el mercado y dónde encaja el asesor.", capitulos: "Cap. 1", disponible: false },
      { id: "perfil", numero: "02", titulo: "Perfil, riesgo y carteras", capitulos: "Cap. 2, 3 y 7", disponible: true }
    ]
  },
  {
    bloque: "Renta fija",
    descripcion: "Bonos soberanos, ONs e instrumentos en pesos.",
    modulos: [
      { id: "bonos", numero: "03", titulo: "Bonos: precio, TIR y duration", capitulos: "Cap. 4", disponible: true },
      { id: "rfarg", numero: "04", titulo: "Renta fija argentina", capitulos: "Cap. 12", disponible: true }
    ]
  },
  {
    bloque: "Renta variable y fondos",
    descripcion: "Acciones, CEDEARs, ETFs y vehículos colectivos.",
    modulos: [
      { id: "acciones", numero: "05", titulo: "Acciones, CEDEARs y ETFs", bajada: "Qué se compra cuando se compra una acción y cómo acceder al mundo desde Argentina.", capitulos: "Cap. 5", disponible: false },
      { id: "fci", numero: "06", titulo: "Fondos comunes de inversión", bajada: "Money market, renta fija, mixtos: cómo elegir y explicar un FCI.", capitulos: "Cap. 6", disponible: false },
      { id: "fundamental", numero: "07", titulo: "Análisis fundamental", bajada: "Leer un balance, P/E y comparables para responder con fundamento.", capitulos: "Cap. 11", disponible: false }
    ]
  },
  {
    bloque: "Operatoria",
    descripcion: "De la decisión a la orden: cómo se ejecuta bien.",
    modulos: [
      { id: "operatoria", numero: "08", titulo: "Cómo se opera", bajada: "Tipos de órdenes, costos y el circuito de una operación.", capitulos: "Cap. 9", disponible: false },
      { id: "opargentina", numero: "09", titulo: "Operar desde Argentina", bajada: "MEP, cable, parking, plazos de liquidación y caja de puntas.", capitulos: "Cap. 10", disponible: false }
    ]
  },
  {
    bloque: "Criterio profesional",
    descripcion: "Unir todo para asesorar con juicio propio.",
    modulos: [
      { id: "mpt", numero: "10", titulo: "Teoría moderna de portafolios", bajada: "Correlación, frontera eficiente y por qué diversificar funciona.", capitulos: "Cap. 8", disponible: false },
      { id: "macro", numero: "11", titulo: "Macro argentina para asesores", bajada: "Inflación, tasas, reservas y riesgo país: qué mirar y cómo conectarlo con la cartera.", capitulos: "Contenido nuevo", disponible: false },
      { id: "criterio", numero: "12", titulo: "Integración y criterio", bajada: "La hoja de decisión del asesor y casos integradores.", capitulos: "Cap. 13", disponible: false }
    ]
  }
];

/* Recorrido sugerido: el orden en que conviene hacer los módulos disponibles. */
AULA.recorrido = ["perfil", "bonos", "rfarg"];
