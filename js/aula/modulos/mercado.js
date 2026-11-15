/* ============================================================
   MÓDULO · El mercado de capitales
   Base: Book cap. 1 + normativa CNV (RG 709/2017 y modificatorias).
   Ojo: la lección g2 resume normativa; no es asesoramiento legal.
   ============================================================ */
window.AULA = window.AULA || { modulos: {} };

AULA.modulos.mercado = {
  id: "mercado",
  numero: "01",
  titulo: "El mercado de capitales",
  bajada: "Para qué sirve el mercado, qué dice la norma sobre el rol del agente productor y cómo está protegido el cliente.",
  fuente: "Cap. 1 del Book · Normas CNV",
  practica: [
    { titulo: "Práctica diaria · Operatoria de Mercado", desc: "Preguntas sobre licitaciones, circuito y protección del inversor.", href: "practica.html" }
  ],
  evaluacion: {
    cantidad: 8,
    ids: ["MERC-MC-001","MERC-MC-002","MERC-MC-003","MERC-MC-004","MERC-MC-005","MERC-MC-006",
          "RF-MC-009","RF-MC-010","RF-MC-011","RF-MC-012","TRAMPA-MC-001"]
  },
  lecciones: [

  /* ------------------------------------------------------------ */
  {
    id: "g1",
    titulo: "Para qué sirve el mercado: primario y secundario",
    minutos: 9,
    objetivo: "Distinguir el mercado primario del secundario y entender cómo funciona una licitación: tramo competitivo, no competitivo, tasa de corte y prorrateo.",
    bloques: [
      { t: "p", html: `El mercado de capitales conecta a quien tiene ahorro con quien necesita financiarse. Un gobierno o una empresa emite un bono o una acción; un inversor lo compra. Eso pasa en dos etapas muy distintas.` },
      { t: "tabla", cab: ["", "Mercado primario", "Mercado secundario"], filas: [
        ["Qué es", "La primera venta: el título se emite", "Los inversores se compran y venden entre ellos"],
        ["Quién recibe la plata", "El emisor (el Tesoro, la empresa)", "El inversor que vende"],
        ["Ejemplos", "Licitación de LECAPs, colocación de una ON", "Comprar AL30 o GGAL en la pantalla"],
        ["Para qué sirve", "Financiar al emisor", "Dar liquidez y formar precios"]
      ]},
      { t: "idea", titulo: "Por qué importa el secundario", html: `Nadie compraría un bono a 5 años si no pudiera venderlo antes. El secundario es lo que permite salir, y su precio de cada día le dice al emisor a qué tasa podría volver a financiarse.` },
      { t: "h", texto: "Cómo funciona una licitación" },
      { t: "lista", items: [
        `<strong>Tramo competitivo:</strong> ofrecés una tasa (o un precio). Si tu oferta queda dentro de lo que el emisor acepta, te adjudican.`,
        `<strong>Tramo no competitivo:</strong> no ofrecés tasa: aceptás la que salga. Es lo habitual para montos chicos.`,
        `<strong>Tasa de corte:</strong> la tasa más alta que el emisor acepta. Todos los adjudicados reciben esa misma tasa.`,
        `<strong>Prorrateo:</strong> si a la tasa de corte hay más ofertas que lo que se emite, a cada uno le adjudican solo una parte.`
      ]},
      { t: "ej", id: "e1", tipo: "mc",
        enunciado: `Una clienta entra al tramo no competitivo de una colocación de ONs. La tasa de corte sale 7,5%, pero ella había leído que "se esperaba 8%". ¿Qué tasa recibe?`,
        opciones: [
          { txt: "8%, porque es la tasa que el mercado esperaba antes de la colocación y que figuraba en el aviso.", ok: false, fb: "La expectativa previa no obliga a nadie." },
          { txt: "7,5%, la tasa de corte: en el no competitivo se acepta la tasa que resulte de la licitación.", ok: true, fb: "Exacto: no compite por tasa, recibe la de corte." },
          { txt: "Un promedio entre la tasa que se esperaba y la de corte, porque así se reparte la diferencia.", ok: false, fb: "No hay promedio: todos los adjudicados reciben la tasa de corte." }
        ],
        explicacion: `Entrar en el no competitivo es cómodo, pero conviene avisarle al cliente que la tasa final puede ser distinta de la que se comentaba en el mercado.` },
      { t: "ej", id: "e2", tipo: "estimar",
        enunciado: `Un cliente ofrece USD 50.000 a la tasa de corte. A esa tasa hubo ofertas por el doble de lo que quedaba por adjudicar, así que se prorratea al 50%. ¿Cuánto le adjudican? Respondé en USD.`,
        unidad: "USD", respuesta: 25000, tolerancia: 100,
        explicacion: `50.000 × 50% = <strong>USD 25.000</strong>. Los otros 25.000 quedan disponibles en su cuenta. Por eso, en colocaciones muy demandadas, conviene avisarle al cliente que puede recibir menos de lo que pidió.` }
    ]
  },

  /* ------------------------------------------------------------ */
  {
    id: "g2",
    titulo: "Tu rol como agente productor: lo que dice la norma",
    minutos: 10,
    objetivo: "Conocer qué permite, qué prohíbe y qué exige la normativa de la CNV al agente productor, y por qué conviene tenerlo claro con tu ALyC.",
    bloques: [
      { t: "p", html: `El agente productor (AP) está regulado por la CNV. La norma central es la Resolución General 709 de 2017, que redefinió la figura dentro del Título VII de las Normas de la CNV. Lo que sigue es un resumen de lo que dice ese texto.` },
      { t: "tabla", cab: ["La norma permite", "La norma prohíbe"], filas: [
        ["Captar clientes para que los dé de alta el ALyC con el que tenés contrato", "Recibir o custodiar fondos o títulos de clientes"],
        ["Informar sobre los servicios de ese ALyC", "Usar las contraseñas o firmas electrónicas del cliente"],
        ["Entregarle al cliente la documentación del ALyC para abrir la cuenta", "Gestionar órdenes o administrar carteras de clientes"],
        ["Cobrar una parte de la comisión, cedida por el ALyC", "Presentarte con el nombre del ALyC como si fuera propio, o delegar tu tarea en terceros"]
      ], nota: "Resumen de los artículos 6 y 9 del Capítulo IV del Título VII de las Normas de la CNV, según la RG 709/2017." },
      { t: "h", texto: "Lo que la norma te exige" },
      { t: "lista", items: [
        `<strong>Conducta:</strong> actuar con honestidad, imparcialidad, profesionalidad, diligencia y lealtad en el mejor interés del cliente, y evitar conflictos de interés.`,
        `<strong>Idoneidad:</strong> estar inscripta en el Registro de Idóneos de la CNV.`,
        `<strong>Publicidad:</strong> en toda comunicación pública, identificarte como "Agente Productor de" tu ALyC, con tu número de registro en la CNV, y no decir nada que pueda confundir.`,
        `<strong>Comisiones:</strong> el ALyC no puede cobrarle más comisión a un cliente por venir de un agente productor.`
      ]},
      { t: "h", texto: "La letra de la norma y el día a día" },
      { t: "p", html: `En la práctica, que el agente productor intervenga en las operaciones de sus clientes se canaliza por dos caminos, según lo que admita cada ALyC:` },
      { t: "lista", items: [
        `<strong>Órdenes sugeridas y confirmadas por el cliente:</strong> vos armás la propuesta (qué comprar o vender, en qué moneda, a qué plazo) y el cliente la confirma antes de que se ejecute. La decisión queda en él y queda registrada.`,
        `<strong>Mandato específico firmado:</strong> el cliente autoriza por escrito ciertas operaciones. Es una zona gris en lo jurídico, porque la norma le prohíbe al AP gestionar órdenes; por eso conviene que el alcance esté bien definido y acordado con el ALyC.`
      ]},
      { t: "ojo", titulo: "Cuidarte a vos y al cliente", html: `Lo más seguro es que cada operación quede <strong>propuesta por vos y confirmada por el cliente</strong>, por un canal que deje registro (la plataforma, un mail, el sistema del ALyC). Si trabajás con mandato, tenelo por escrito, con su alcance claro, y consultalo con el área de cumplimiento de tu ALyC. Esta lección resume la norma; no reemplaza un asesoramiento legal.` },
      { t: "ej", id: "e1", tipo: "multi",
        enunciado: `Según el texto de la RG 709, marcá <strong>todo</strong> lo que un agente productor <strong>no</strong> puede hacer.`,
        opciones: [
          { txt: "Recibir en su cuenta la transferencia de un cliente para invertirla.", ok: true, fb: "Prohibido: los fondos van siempre al ALyC." },
          { txt: "Pedirle al cliente su usuario y clave para \"ahorrarle trabajo\".", ok: true, fb: "Prohibido: no puede usar sus claves ni firmas." },
          { txt: "Explicarle al cliente los servicios del ALyC con el que trabaja.", ok: false, fb: "Permitido: es parte de su actividad." },
          { txt: "Administrar la cartera del cliente decidiendo por él.", ok: true, fb: "Prohibido según el texto de la norma." },
          { txt: "Entregarle la documentación para abrir la cuenta comitente.", ok: false, fb: "Permitido." }
        ],
        explicacion: `La lógica de la norma es clara: el AP difunde, capta y acompaña; el ALyC tiene la cuenta, los fondos, los títulos y las órdenes. Todo lo que mezcle esos roles es riesgoso para el cliente y para vos.` },
      { t: "ej", id: "e2", tipo: "mc",
        enunciado: `Un cliente mayor te dice: "Yo no entiendo la plataforma, te paso mi usuario y clave y vos hacés las operaciones que te parezcan". ¿Qué hacés?`,
        opciones: [
          { txt: "Aceptás, porque es un pedido del propio cliente y le estás haciendo un favor que él mismo te pidió.", ok: false, fb: "La norma lo prohíbe expresamente, aunque lo pida el cliente." },
          { txt: "Le explicás que no podés usar su clave, y buscás con el ALyC una forma de que él dé sus órdenes.", ok: true, fb: "Exacto: lo ayudás sin cruzar la línea." },
          { txt: "Aceptás solo para operaciones chicas y le mandás un resumen por mail de todo lo que hiciste.", ok: false, fb: "El monto no cambia nada: sigue estando prohibido." }
        ],
        explicacion: `Los ALyC suelen tener alternativas para clientes que no manejan la plataforma (órdenes por teléfono grabado, por mail, con la mesa). Consultalo con tu ALyC: así el cliente queda bien atendido y vos cubierta.` }
    ]
  },

  /* ------------------------------------------------------------ */
  {
    id: "g3",
    titulo: "Cómo está protegido el cliente",
    minutos: 8,
    objetivo: "Explicar al cliente dónde están sus inversiones, qué pasa si una entidad tiene problemas y qué señales indican una estafa.",
    bloques: [
      { t: "p", html: `Una de las preguntas que más tranquiliza responder bien es "¿y si les pasa algo a ustedes?". La respuesta tiene varias capas.` },
      { t: "lista", items: [
        `<strong>La cuenta es del cliente.</strong> La cuenta comitente está a su nombre en el ALyC, no a nombre del asesor.`,
        `<strong>Los títulos están registrados a su nombre.</strong> Bonos, acciones y CEDEARs se registran en Caja de Valores en una subcuenta del cliente.`,
        `<strong>Los fondos comunes están separados.</strong> Los activos de un FCI están en la sociedad depositaria, aparte de la sociedad gerente (lo viste en el módulo de fondos).`,
        `<strong>El ALyC tiene que conocer al cliente.</strong> Antes de operar, el ALyC arma su perfil de inversor; las recomendaciones deberían respetarlo.`
      ]},
      { t: "ej", id: "e1", tipo: "mc",
        enunciado: `Un cliente pregunta: "¿Cómo sé que los bonos que compré están realmente a mi nombre?". ¿Qué le respondés?`,
        opciones: [
          { txt: "Que confíe en el resumen que le manda el asesor por WhatsApp, que es el registro oficial de sus tenencias.", ok: false, fb: "El asesor no lleva el registro de los títulos." },
          { txt: "Que los títulos se registran en Caja de Valores a su nombre, y que puede consultar sus tenencias ahí.", ok: true, fb: "Exacto: es un registro independiente del asesor." },
          { txt: "Que no hay forma de saberlo, porque los títulos quedan a nombre del ALyC hasta que el cliente los venda.", ok: false, fb: "Quedan en una subcuenta a nombre del cliente." }
        ],
        explicacion: `Mostrarle al cliente que puede verificar sus tenencias por su cuenta genera mucha confianza, sobre todo en el que recién empieza.` },
      { t: "h", texto: "Señales de alerta" },
      { t: "p", html: `Muchos clientes reciben ofertas por redes o por WhatsApp. Ayudarlos a reconocer una estafa también es parte de tu trabajo.` },
      { t: "ej", id: "e2", tipo: "multi",
        enunciado: `Un cliente te reenvía una propuesta que le llegó por Instagram. Marcá <strong>todas</strong> las señales de alerta.`,
        opciones: [
          { txt: "Promete 5% mensual en dólares \"garantizado\".", ok: true, fb: "Ningún rendimiento alto puede estar garantizado." },
          { txt: "Pide transferir a la cuenta personal de un \"asesor\".", ok: true, fb: "La plata va siempre a una cuenta a nombre del cliente en una entidad registrada." },
          { txt: "La empresa no figura en los registros de la CNV.", ok: true, fb: "Se puede verificar en la web de la CNV." },
          { txt: "Muestra el número de registro en la CNV del agente y del ALyC.", ok: false, fb: "Es lo que exige la norma: es una buena señal, aunque igual conviene verificarlo." },
          { txt: "Presiona para decidir \"hoy, que quedan pocos cupos\".", ok: true, fb: "La urgencia artificial es un clásico de las estafas." }
        ],
        explicacion: `La regla simple para el cliente: rendimiento garantizado + urgencia + plata a una cuenta personal = no. Y ante la duda, verificar el registro en la CNV.` },
      { t: "cliente", titulo: "Cómo se lo explicás al cliente", html: `"Tu cuenta está a tu nombre en el ALyC, y tus títulos están registrados a tu nombre en Caja de Valores: los podés consultar vos mismo. Yo te asesoro y te acompaño, pero tu plata nunca pasa por mis manos."` }
    ]
  }
  ]
};
