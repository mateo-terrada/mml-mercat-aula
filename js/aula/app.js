/* ============================================================
   AULA — navegación, pantallas, lecciones, ejercicios y evaluación.
   Rutas (en la dirección, después del #):
     #/                     inicio
     #/m/<modulo>           portada del módulo
     #/m/<modulo>/<leccion> lección
     #/m/<modulo>/evaluacion
     #/glosario
   ============================================================ */
(function () {
  const P = AULA.progreso;
  const app = document.getElementById("app");
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const fmt = (n, d = 0) => Number(n).toLocaleString("es-AR", { minimumFractionDigits: d, maximumFractionDigits: d });
  const BANCO = Object.fromEntries((typeof BANCO_PREGUNTAS !== "undefined" ? BANCO_PREGUNTAS : []).map(q => [q.id, q]));

  /* ---------- Datos derivados ---------- */
  const modulo = id => AULA.modulos[id];
  const disponibles = () => AULA.recorrido.map(modulo).filter(Boolean);
  const claveLec = (m, l) => m + "." + l;
  const ejerciciosDe = lec => lec.bloques.filter(b => b.t === "ej");
  const etiqueta = m => m.taller ? "Taller práctico" : "Módulo " + m.numero;

  function avanceModulo(m) {
    const total = m.lecciones.length;
    const hechas = m.lecciones.filter(l => P.leccionCompleta(claveLec(m.id, l.id))).length;
    const ev = P.evaluacion(m.id);
    return { total, hechas, pct: Math.round(hechas / total * 100), ev, aprobado: m.evaluacion ? !!(ev && ev.mejor >= 0.7) : hechas === total };
  }
  /* Simulaciones (AULA.simulaciones): cada una se habilita al completar sus módulos */
  function partidaDe(sim) {
    try { const s = JSON.parse(localStorage.getItem(sim.clave) || "null"); return s && s.resumen ? s.resumen : null; } catch (e) { return null; }
  }
  const faltanDe = sim => sim.req.map(modulo).filter(Boolean).filter(m => { const a = avanceModulo(m); return a.hechas < a.total; });
  function tarjetaSimulaciones() {
    const sims = AULA.simulaciones, abiertas = sims.filter(s => !faltanDe(s).length || partidaDe(s));
    const enCurso = sims.filter(s => partidaDe(s));
    const txt = !abiertas.length ? "La primera se habilita al terminar el Taller del CER o el Taller de carteras de acciones."
      : enCurso.length ? "Tenés " + (enCurso.length === 1 ? "una partida en curso" : enCurso.length + " partidas en curso") + ": " + enCurso.map(s => esc(partidaDe(s).lineas[0])).join(" · ") + "."
      : "Administrás las carteras de dos clientes durante un año. Unos 5 minutos por mes; se guarda sola.";
    return `
      <section class="diag-card ${enCurso.length ? "" : "is-new"}">
        <div><span class="eyebrow">Simulaciones</span>
          <strong>${abiertas.length} de ${sims.length} disponibles</strong>
          <p>${txt}</p></div>
        <div class="diag-card-act"><a class="btn btn-primary" href="#/simulaciones">Ver las simulaciones ${flecha}</a></div>
      </section>`;
  }
  function vistaSimulaciones() {
    const card = sim => {
      const faltan = faltanDe(sim), pc = partidaDe(sim), cerrada = faltan.length && !pc;
      return `<article class="panel sim-card ${cerrada ? "is-locked" : ""}">
        <span class="eyebrow">${esc(sim.tema)}</span>
        <h3>${esc(sim.titulo)}</h3>
        <p>${esc(sim.bajada)}</p>
        ${pc ? `<p class="hint"><strong>Tu partida:</strong> ${esc(pc.lineas[0])}.</p>` : ""}
        ${cerrada ? `<p class="hint">Se habilita al terminar el ${esc(sim.habilita)}. Te falta: ${faltan.map(m => esc(m.titulo)).join(" · ")}.</p><span class="tag">Bloqueada</span>
          <details class="sim-igual"><summary>Entrar igual</summary>
            <p>Esta simulación usa lo que se ve en ${faltan.length > 1 ? "esos módulos" : "ese módulo"}. Si entrás sin haberlo hecho, algunos términos y decisiones te van a quedar poco claros. Podés entrar igual y volver al curso cuando quieras.</p>
            <a class="btn btn-ghost" href="${sim.href}">Entrar de todos modos ${flecha}</a>
          </details>`
          : `<a class="btn btn-primary" href="${sim.href}">${pc ? "Seguir la partida" : "Empezar"} ${flecha}</a>`}
      </article>`;
    };
    app.innerHTML = `
      <nav class="crumbs"><a href="#/">Aula</a><span>/</span><span>Simulaciones</span></nav>
      <section class="panel">
        <p class="eyebrow">Practicar decidiendo</p>
        <h1>Simulaciones</h1>
        <p class="lede">Cada simulación entrena un tema distinto: los clientes y el mercado cambian, y vos proponés cada mes. Se van habilitando a medida que avanzás en el curso. Unos 15 a 20 minutos por sesión; la partida se guarda sola.</p>
      </section>
      <div class="sim-grid">${AULA.simulaciones.map(card).join("")}</div>`;
  }

  function estadoModulo(m) {
    const a = avanceModulo(m);
    if (a.hechas === a.total && a.aprobado) return "completo";
    if (a.hechas > 0 || a.ev) return "encurso";
    return "nuevo";
  }
  function siguientePaso() {
    for (const m of disponibles()) {
      for (const l of m.lecciones) if (!P.leccionCompleta(claveLec(m.id, l.id))) return { m, l };
      if (m.evaluacion && !avanceModulo(m).aprobado) return { m, eval: true };
    }
    return null;
  }
  function statsGlobales() {
    let lecTot = 0, lecOk = 0, ejTot = 0, ejResp = 0, ejOk = 0;
    disponibles().forEach(m => m.lecciones.forEach(l => {
      lecTot++; if (P.leccionCompleta(claveLec(m.id, l.id))) lecOk++;
      ejerciciosDe(l).forEach(e => {
        ejTot++; const r = P.ejercicio(claveLec(m.id, l.id) + "." + e.id);
        if (r) { ejResp++; if (r.ok) ejOk++; }
      });
    }));
    const aprob = disponibles().filter(m => avanceModulo(m).aprobado).length;
    return { lecTot, lecOk, ejTot, ejResp, ejOk, aprob, racha: P.racha() };
  }
  function paraRepasar() {
    const out = [];
    disponibles().forEach(m => m.lecciones.forEach(l => ejerciciosDe(l).forEach(e => {
      const r = P.ejercicio(claveLec(m.id, l.id) + "." + e.id);
      if (r && !r.ok) out.push({ m, l, e });
    })));
    return out;
  }

  /* ---------- Piezas visuales ---------- */
  function anillo(pct, size = 44) {
    const r = (size - 6) / 2, c = 2 * Math.PI * r;
    return `<svg class="ring" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" aria-hidden="true">
      <circle cx="${size / 2}" cy="${size / 2}" r="${r}" class="ring-bg"/>
      <circle cx="${size / 2}" cy="${size / 2}" r="${r}" class="ring-fg" stroke-dasharray="${c}" stroke-dashoffset="${c * (1 - pct / 100)}" transform="rotate(-90 ${size / 2} ${size / 2})"/>
      <text x="50%" y="54%" text-anchor="middle" dominant-baseline="middle">${pct}%</text></svg>`;
  }
  const check = `<svg viewBox="0 0 16 16" class="ico-check" aria-hidden="true"><path d="M3.5 8.5l3 3 6-7" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
  const flecha = `<span class="arrow" aria-hidden="true">→</span>`;

  /* ======================================================
     INICIO
     ====================================================== */
  function vistaInicio() {
    const s = statsGlobales();
    let sig = siguientePaso();
    const dgc = ultimoDiag();
    if (dgc && dgc.mod) {
      const pend = m => estadoModulo(m) !== "completo";
      const pri = modsDiag().find(m => (dgc.mod[m.id] || 0) === 0 && pend(m)) || modsDiag().find(m => (dgc.mod[m.id] || 0) === 1 && pend(m));
      if (pri) { const l = pri.lecciones.find(x => !P.leccionCompleta(claveLec(pri.id, x.id))); sig = l ? { m: pri, l } : { m: pri, eval: true }; }
    }
    const empezado = s.lecOk > 0 || s.ejResp > 0;
    let cta;
    if (!sig) cta = `<a class="btn btn-primary btn-lg" href="#/m/${AULA.recorrido[0]}">Repasar los módulos ${flecha}</a>`;
    else if (sig.eval) cta = `<a class="btn btn-primary btn-lg" href="#/m/${sig.m.id}/evaluacion"><span>Evaluación: ${esc(sig.m.titulo)}</span>${flecha}</a>`;
    else cta = `<a class="btn btn-primary btn-lg" href="#/m/${sig.m.id}/${sig.l.id}"><span><small>${empezado ? "Continuar" : "Empezar por"}</small>${esc(sig.l.titulo)}</span>${flecha}</a>`;

    const dg = ultimoDiag();
    const recorrido = disponibles().map((m, i) => {
      const a = avanceModulo(m), st = estadoModulo(m);
      const nv = dg && dg.mod && AULA.diagnostico[m.id] && st !== "completo" ? NIVEL(dg.mod[m.id] || 0) : null;
      return `<a class="journey-step st-${st}" href="#/m/${m.id}">
        <span class="journey-dot">${st === "completo" ? check : i + 1}</span>
        <span class="journey-num">${etiqueta(m)}</span>${nv ? `<span class="diag-tag t-${nv[0]} journey-diag">${nv[1]}</span>` : ""}
        <strong>${esc(m.titulo)}</strong>
        <span class="journey-meta">${a.hechas}/${a.total} lecciones${a.ev ? " · eval. " + Math.round(a.ev.mejor * 100) + "%" : ""}</span>
        <span class="journey-bar"><i style="width:${a.pct}%"></i></span>
      </a>`;
    }).join("");

    const mapa = AULA.catalogo.map(b => `
      <section class="bloque">
        <header class="bloque-head"><h3>${esc(b.bloque)}</h3><p>${esc(b.descripcion)}</p></header>
        <div class="mod-grid">${b.modulos.map(c => {
          const m = modulo(c.id);
          if (!c.disponible || !m) return `
            <div class="mod-card is-soon">
              <span class="mod-num">${c.numero}</span>
              <h4>${esc(c.titulo)}</h4>
              <p>${esc(c.bajada || "")}</p>
              <footer><span class="mod-chap">${esc(c.capitulos)}</span><span class="tag tag-soon">Próximamente</span></footer>
            </div>`;
          const a = avanceModulo(m), st = estadoModulo(m);
          return `
            <a class="mod-card st-${st}" href="#/m/${m.id}">
              <span class="mod-num">${m.numero}</span>
              <h4>${esc(m.titulo)}</h4>
              <p>${esc(m.bajada)}</p>
              <footer><span class="mod-chap">${esc(c.capitulos)} · ${m.lecciones.length} lecciones</span>
                ${st === "completo" ? `<span class="tag tag-ok">${check} Completo</span>` : st === "encurso" ? `<span class="tag tag-prog">${a.pct}%</span>` : `<span class="tag">Empezar</span>`}</footer>
              <span class="mod-bar"><i style="width:${a.pct}%"></i></span>
            </a>`;
        }).join("")}</div>
      </section>`).join("");

    const rep = paraRepasar();
    const repaso = rep.length ? `
      <section class="panel repaso">
        <header class="section-head"><span class="eyebrow">Para repasar</span><h2>Ejercicios que te costaron</h2></header>
        <ul class="repaso-list">${rep.slice(0, 6).map(x => `
          <li><a href="#/m/${x.m.id}/${x.l.id}?ej=${x.e.id}"><span class="repaso-mod">${esc(x.m.titulo)} · ${esc(x.l.titulo)}</span>
            <span class="repaso-q">${esc(textoPlano(x.e.enunciado).slice(0, 120))}${textoPlano(x.e.enunciado).length > 120 ? "…" : ""}</span></a></li>`).join("")}
        </ul>
      </section>` : "";

    app.innerHTML = `
      <section class="hero">
        <div class="hero-main">
          <p class="eyebrow">Aula · Versión 5.0</p>
          <h1>Aprender el mercado, <em>de a una lección por vez.</em></h1>
          <p class="lede">Teoría explicada sin vueltas, ejemplos con instrumentos argentinos reales y ejercicios para fijar cada idea. Avanzá módulo por módulo, a tu ritmo.</p>
          <div class="hero-cta">${cta}</div>
        </div>
        <aside class="hero-stats" aria-label="Tu progreso">
          <div class="stat-ring">${anillo(s.lecTot ? Math.round(s.lecOk / s.lecTot * 100) : 0, 92)}<span>del recorrido</span></div>
          <dl class="stat-list">
            <div><dt>Lecciones</dt><dd>${s.lecOk}<small>/${s.lecTot}</small></dd></div>
            <div><dt>Ejercicios bien</dt><dd>${s.ejOk}<small>/${s.ejResp || 0}</small></dd></div>
            <div><dt>Módulos aprobados</dt><dd>${s.aprob}<small>/${disponibles().length}</small></dd></div>
            <div><dt>Racha de días</dt><dd>${s.racha}</dd></div>
          </dl>
          <a class="hero-inf" href="#/informe">Exportar mi informe ${flecha}</a>
        </aside>
      </section>

      <section class="metodo">
        <div class="metodo-step"><span>1</span><strong>Leer</strong><p>Lecciones cortas, de 7 a 13 minutos, con el concepto y cómo explicárselo a un cliente.</p></div>
        <div class="metodo-step"><span>2</span><strong>Probar</strong><p>Herramientas interactivas para mover los números y ver qué pasa.</p></div>
        <div class="metodo-step"><span>3</span><strong>Practicar</strong><p>Ejercicios dentro de cada lección y casos aplicados en la mesa de operaciones y en el simulador de carteras.</p></div>
        <div class="metodo-step"><span>4</span><strong>Evaluar</strong><p>Una evaluación por módulo con preguntas del banco. Se aprueba con 70%.</p></div>
      </section>

      ${dg ? `
      <section class="diag-card">
        <div><span class="eyebrow">Tu diagnóstico · ${fechaLarga(dg.fecha)}</span>
          <strong>${dg.aciertos} de ${dg.total} bien</strong>
          <p>${(() => { const pr = modsDiag().filter(m => (dg.mod[m.id] || 0) === 0); return pr.length ? "Prioridad: " + pr.map(m => esc(m.titulo)).join(" · ") : "Sin temas en prioridad."; })()}</p></div>
        <div class="diag-card-act"><a class="btn btn-ghost btn-sm" href="#/diagnostico?ver=1">Ver resultado</a><a class="btn btn-ghost btn-sm" href="#/diagnostico">Repetirlo</a></div>
      </section>` : `
      <section class="diag-card is-new">
        <div><span class="eyebrow">Diagnóstico</span>
          <strong>¿Por dónde empezar?</strong>
          <p>22 preguntas, unos 15 minutos. Te muestra qué temas tenés firmes y cuáles conviene repasar primero.</p></div>
        <div class="diag-card-act"><a class="btn btn-primary" href="#/diagnostico">Hacer el diagnóstico ${flecha}</a></div>
      </section>`}

      ${tarjetaSimulaciones()}

      <section class="panel">
        <header class="section-head"><span class="eyebrow">Recorrido recomendado</span><h2>Por dónde seguir</h2></header>
        <div class="journey">${recorrido}</div>
      </section>

      ${repaso}

      <section class="panel">
        <header class="section-head"><span class="eyebrow">Plan de estudio</span><h2>Todos los módulos</h2>
          <p class="section-lede">Los capítulos del Book convertidos en módulos y talleres, ampliados con coyuntura.</p></header>
        ${mapa}
      </section>`;
  }

  /* ======================================================
     PORTADA DE MÓDULO
     ====================================================== */
  function vistaModulo(m) {
    const a = avanceModulo(m);
    const lecs = m.lecciones.map((l, i) => {
      const k = claveLec(m.id, l.id), ok = P.leccionCompleta(k);
      const ejs = ejerciciosDe(l).length;
      return `<a class="lec-row ${ok ? "is-done" : ""}" href="#/m/${m.id}/${l.id}">
        <span class="lec-idx">${ok ? check : i + 1}</span>
        <span class="lec-body"><strong>${esc(l.titulo)}</strong><small>${esc(l.objetivo)}</small></span>
        <span class="lec-meta">${l.minutos} min · ${ejs} ${ejs === 1 ? "ejercicio" : "ejercicios"}</span>
      </a>`;
    }).join("");
    const ev = a.ev;
    app.innerHTML = `
      <nav class="crumbs"><a href="#/">Aula</a><span>/</span><span>${etiqueta(m)}</span></nav>
      <section class="mod-hero">
        <div>
          <p class="eyebrow">${etiqueta(m)}</p>
          <h1>${esc(m.titulo)}</h1>
          <p class="lede">${esc(m.bajada)}</p>
          <p class="mod-src">${esc(m.fuente)}</p>
        </div>
        <div class="mod-hero-ring">${anillo(a.pct, 110)}<span>${a.hechas} de ${a.total} lecciones</span></div>
      </section>

      <section class="panel">
        <header class="section-head"><span class="eyebrow">Paso 1 y 2</span><h2>Lecciones</h2></header>
        <div class="lec-list">${lecs}</div>
      </section>

      <div class="two-col">
        <section class="panel">
          <header class="section-head"><span class="eyebrow">Paso 3</span><h2>Práctica aplicada</h2></header>
          <div class="practica-list">${m.practica.map(p => `
            <a class="practica-card" href="${p.href}"><strong>${esc(p.titulo)}</strong><p>${esc(p.desc)}</p><span class="link">Abrir la mesa de operaciones ${flecha}</span></a>`).join("")}
          </div>
        </section>
${m.evaluacion ? `        <section class="panel eval-card ${a.aprobado ? "is-ok" : ""}">
          <header class="section-head"><span class="eyebrow">Paso 4</span><h2>Evaluación del módulo</h2></header>
          <p>${m.evaluacion.cantidad} preguntas del banco de práctica, elegidas priorizando las que todavía no viste. Se aprueba con 70%.</p>
          ${ev ? `<div class="eval-score"><span>Mejor resultado</span><strong>${Math.round(ev.mejor * 100)}%</strong><small>${ev.intentos} ${ev.intentos === 1 ? "intento" : "intentos"}</small></div>` : ""}
          ${a.hechas < a.total ? `<p class="hint">Conviene terminar las lecciones antes, aunque podés hacerla cuando quieras.</p>` : ""}
          <a class="btn ${a.hechas === a.total ? "btn-primary" : "btn-ghost"}" href="#/m/${m.id}/evaluacion">${ev ? "Volver a hacerla" : "Empezar evaluación"} ${flecha}</a>
        </section>` : `<section class="panel eval-card"><header class="section-head"><span class="eyebrow">Taller</span><h2>Sin evaluación</h2></header><p>Es un taller de práctica: se completa terminando sus lecciones. Lo importante es el juego y los ejercicios.</p><a class="btn btn-ghost" href="#/">Volver al aula →</a></section>`}
      </div>`;
  }

  /* ======================================================
     LECCIÓN
     ====================================================== */
  function textoPlano(html) { const d = document.createElement("div"); d.innerHTML = html; return d.textContent; }

  function renderBloque(b, ctx) {
    switch (b.t) {
      case "p": return `<p>${b.html}</p>`;
      case "h": return `<h2 class="lec-h">${esc(b.texto)}</h2>`;
      case "lista": return `<ul class="lec-list-items">${b.items.map(i => `<li>${i}</li>`).join("")}</ul>`;
      case "idea": return `<aside class="callout c-idea"><span class="callout-k">Idea clave</span><h3>${esc(b.titulo)}</h3><p>${b.html}</p></aside>`;
      case "ojo": return `<aside class="callout c-ojo"><span class="callout-k">Ojo</span><h3>${esc(b.titulo)}</h3><p>${b.html}</p></aside>`;
      case "cliente": return `<aside class="callout c-cliente"><span class="callout-k">Con el cliente</span><h3>${esc(b.titulo)}</h3><p class="quote">${b.html}</p></aside>`;
      case "analogia": return `<aside class="callout c-analogia"><span class="callout-k">Para imaginarlo</span><p>${b.html}</p></aside>`;
      case "mercado": return `<aside class="callout c-mercado"><span class="callout-k">Mercado hoy</span><h3>${esc(b.titulo)}</h3><p>${b.html}</p>${b.fuente ? `<cite>Fuente: ${esc(b.fuente)}</cite>` : ""}</aside>`;
      case "formula": return `<div class="formula"><div class="formula-eq">${b.html}</div>${b.nota ? `<p>${b.nota}</p>` : ""}</div>`;
      case "tabla": return `<div class="tabla-wrap"><table class="tabla"><thead><tr>${b.cab.map(c => `<th>${esc(c)}</th>`).join("")}</tr></thead>
        <tbody>${b.filas.map(f => `<tr>${f.map(c => `<td>${c}</td>`).join("")}</tr>`).join("")}</tbody></table>${b.nota ? `<p class="tabla-nota">${b.nota}</p>` : ""}</div>`;
      case "ejemplo": return `<section class="ejemplo"><header><span class="callout-k">Ejemplo resuelto</span><h3>${esc(b.titulo)}</h3></header>
        <ol>${b.pasos.map(p => `<li>${p}</li>`).join("")}</ol>${b.conclusion ? `<p class="ejemplo-concl">${b.conclusion}</p>` : ""}</section>`;
      case "herramienta": return `<div class="tool-slot" data-tool="${b.id}">${AULA.herramientas[b.id].render()}</div>`;
      case "grafico": return AULA.graficos[b.id]();
      case "ej": return renderEjercicio(b, ctx);
      default: return "";
    }
  }

  function vistaLeccion(m, l, foco) {
    const idx = m.lecciones.indexOf(l);
    const k = claveLec(m.id, l.id);
    P.leccionVista(k);
    const ctx = { m, l, n: 0 };
    const cuerpo = l.bloques.map(b => { if (b.t === "ej") ctx.n++; return renderBloque(b, ctx); }).join("");
    const sig = m.lecciones[idx + 1], ant = m.lecciones[idx - 1];
    const lateral = m.lecciones.map((x, i) => `
      <a class="side-lec ${x === l ? "is-current" : ""} ${P.leccionCompleta(claveLec(m.id, x.id)) ? "is-done" : ""}" href="#/m/${m.id}/${x.id}">
        <span>${P.leccionCompleta(claveLec(m.id, x.id)) ? check : i + 1}</span>${esc(x.titulo)}</a>`).join("");

    app.innerHTML = `
      <div class="read-progress"><i id="readBar"></i></div>
      <div class="lesson-layout">
        <aside class="lesson-side">
          <a class="side-mod" href="#/m/${m.id}"><small>${etiqueta(m)}</small>${esc(m.titulo)}</a>
          <nav>${lateral}</nav>
          ${m.evaluacion ? `<a class="side-lec side-eval" href="#/m/${m.id}/evaluacion"><span>✓</span>Evaluación del módulo</a>` : ""}
        </aside>
        <article class="lesson">
          <nav class="crumbs"><a href="#/">Aula</a><span>/</span><a href="#/m/${m.id}">${esc(m.titulo)}</a></nav>
          <p class="eyebrow">Lección ${idx + 1} de ${m.lecciones.length} · ${l.minutos} min</p>
          <h1>${esc(l.titulo)}</h1>
          <div class="objetivo"><span>Al terminar vas a poder</span><p>${esc(l.objetivo)}</p></div>
          <div class="lesson-body">${cuerpo}</div>
          <footer class="lesson-end" id="lessonEnd"></footer>
        </article>
      </div>`;

    // Conectar herramientas
    app.querySelectorAll("[data-tool]").forEach(el => AULA.herramientas[el.dataset.tool].init(el));
    // Restaurar ejercicios ya respondidos
    app.querySelectorAll(".ej").forEach(restaurarEjercicio);
    pintarFinLeccion(m, l, sig, ant);

    if (foco) {
      const el = app.querySelector(`.ej[data-ej="${foco}"]`);
      if (el) setTimeout(() => el.scrollIntoView({ behavior: "smooth", block: "center" }), 80);
    } else window.scrollTo(0, 0);
  }

  function pintarFinLeccion(m, l, sig, ant) {
    const k = claveLec(m.id, l.id);
    const ejs = ejerciciosDe(l);
    const resp = ejs.filter(e => P.ejercicio(k + "." + e.id)).length;
    const completa = P.leccionCompleta(k);
    const faltan = ejs.length - resp;
    const navSig = sig ? `<a class="btn btn-primary" href="#/m/${m.id}/${sig.id}"><span><small>Siguiente</small>${esc(sig.titulo)}</span>${flecha}</a>`
                       : m.evaluacion ? `<a class="btn btn-primary" href="#/m/${m.id}/evaluacion"><span><small>Último paso</small>Evaluación del módulo</span>${flecha}</a>`
                       : `<a class="btn btn-primary" href="#/"><span><small>Taller terminado</small>Volver al aula</span>${flecha}</a>`;
    const end = document.getElementById("lessonEnd");
    if (!end) return;
    end.innerHTML = completa ? `
        <div class="end-done">${check}<div><strong>Lección completada</strong><p>${resp} de ${ejs.length} ejercicios respondidos.</p></div></div>
        <div class="end-nav">${ant ? `<a class="btn btn-ghost" href="#/m/${m.id}/${ant.id}">← Anterior</a>` : `<span></span>`}${navSig}</div>`
      : `
        <div class="end-pending">
          <p>${faltan > 0 ? `Te ${faltan === 1 ? "falta" : "faltan"} <strong>${faltan} ${faltan === 1 ? "ejercicio" : "ejercicios"}</strong> para cerrar la lección.` : "Respondiste todos los ejercicios."}</p>
          <button class="btn btn-primary" data-action="completar" ${faltan > 0 ? "disabled" : ""}>Marcar lección como terminada</button>
        </div>
        <div class="end-nav">${ant ? `<a class="btn btn-ghost" href="#/m/${m.id}/${ant.id}">← Anterior</a>` : `<span></span>`}${sig ? `<a class="btn btn-ghost" href="#/m/${m.id}/${sig.id}">Saltar a la siguiente →</a>` : ""}</div>`;
    const btn = end.querySelector("[data-action=completar]");
    if (btn) btn.addEventListener("click", () => {
      P.completarLeccion(k);
      pintarFinLeccion(m, l, sig, ant);
      app.querySelectorAll(".side-lec.is-current").forEach(a => { a.classList.add("is-done"); a.querySelector("span").innerHTML = check; });
      toast("Lección completada");
    });
  }

  /* ======================================================
     EJERCICIOS
     ====================================================== */
  const ETIQUETA = { mc: "Elegí una opción", multi: "Marcá todas las correctas", estimar: "Estimá antes de ver", caso: "Caso de cliente" };

  // Orden de opciones mezclado pero estable para cada ejercicio (así la correcta
  // no cae siempre en el mismo lugar y no cambia al recargar la página).
  function ordenMezclado(clave, n) {
    let h = 2166136261;
    for (const ch of clave) { h ^= ch.charCodeAt(0); h = Math.imul(h, 16777619); }
    const rnd = () => { h ^= h << 13; h ^= h >>> 17; h ^= h << 5; return (h >>> 0) / 4294967296; };
    const idx = Array.from({ length: n }, (_, i) => i);
    for (let i = n - 1; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); [idx[i], idx[j]] = [idx[j], idx[i]]; }
    return idx;
  }
  const opBtn = (el, j) => el.querySelector(`.ej-op[data-op="${j}"]`);

  function renderEjercicio(e, ctx) {
    const clave = claveLec(ctx.m.id, ctx.l.id) + "." + e.id;
    let cuerpo = "";
    if (e.tipo === "mc" || e.tipo === "multi") {
      cuerpo = `<div class="ej-ops ${e.tipo === "multi" ? "is-multi" : ""}">${ordenMezclado(clave, e.opciones.length).map(i => `
        <button type="button" class="ej-op" data-op="${i}"><span class="ej-mark"></span><span class="ej-txt">${e.opciones[i].txt}</span></button>`).join("")}</div>
        ${e.tipo === "multi" ? `<button type="button" class="btn btn-primary btn-sm" data-action="confirmar" disabled>Confirmar respuesta</button>` : ""}`;
    } else if (e.tipo === "estimar") {
      cuerpo = `<div class="ej-estimar"><label class="num-field num-field-lg"><input type="text" inputmode="decimal" placeholder="Tu número" data-input>${e.unidad ? `<em>${esc(e.unidad)}</em>` : ""}</label>
        <button type="button" class="btn btn-primary btn-sm" data-action="estimar" disabled>Ver respuesta</button></div>`;
    } else if (e.tipo === "caso") {
      cuerpo = `<textarea class="ej-texto" rows="5" placeholder="Escribí tu respuesta como si le hablaras al cliente…" data-input></textarea>
        <button type="button" class="btn btn-primary btn-sm" data-action="caso">Ver respuesta modelo</button>`;
    }
    return `<section class="ej" data-ej="${e.id}" data-clave="${clave}" data-tipo="${e.tipo}">
      <header><span class="ej-k">Ejercicio ${ctx.n} · ${ETIQUETA[e.tipo]}</span><span class="ej-status"></span></header>
      <div class="ej-enunciado">${e.enunciado}</div>
      ${cuerpo}
      <div class="ej-feedback" hidden style="display:none"></div>
    </section>`;
  }

  function buscarEj(el) {
    const [mid, lid] = el.dataset.clave.split(".");
    const l = modulo(mid).lecciones.find(x => x.id === lid);
    return { m: modulo(mid), l, e: ejerciciosDe(l).find(x => x.id === el.dataset.ej) };
  }

  function mostrarFeedback(el, html) {
    const fb = el.querySelector(".ej-feedback");
    fb.innerHTML = html; fb.hidden = false; fb.style.display = "block";
  }
  function setStatus(el, ok, parcial) {
    el.classList.remove("is-ok", "is-bad", "is-partial");
    el.classList.add(ok ? "is-ok" : parcial ? "is-partial" : "is-bad");
    el.querySelector(".ej-status").textContent = ok ? "Bien" : parcial ? "Casi" : "A repasar";
  }
  const btnReintentar = `<button type="button" class="link-btn" data-action="reintentar">Volver a intentar</button>`;

  function resolverMC(el, i, registrar) {
    const { e } = buscarEj(el);
    e.opciones.forEach((_, j) => {
      const b = opBtn(el, j);
      b.disabled = true;
      if (e.opciones[j].ok) b.classList.add("op-ok");
      if (j === i && !e.opciones[j].ok) b.classList.add("op-bad");
      if (j === i) b.classList.add("op-chosen");
    });
    const elegida = e.opciones[i], correcta = e.opciones.find(o => o.ok);
    setStatus(el, elegida.ok);
    mostrarFeedback(el, `
      <p class="fb-lead ${elegida.ok ? "ok" : "bad"}">${elegida.ok ? "Correcto." : "No es esa."} ${elegida.fb}</p>
      ${!elegida.ok ? `<p class="fb-right"><strong>La correcta:</strong> ${correcta.txt}. ${correcta.fb}</p>` : ""}
      <div class="fb-exp">${e.explicacion}</div>${elegida.ok ? "" : btnReintentar}`);
    if (registrar) P.registrarEjercicio(el.dataset.clave, elegida.ok, { r: i });
  }

  function resolverMulti(el, sel, registrar) {
    const { e } = buscarEj(el);
    let aciertos = 0;
    const items = e.opciones.map((o, j) => {
      const marcada = sel.includes(j);
      const btn = opBtn(el, j);
      btn.disabled = true;
      let cls, tag;
      if (o.ok && marcada) { cls = "op-ok"; tag = "Bien marcada"; aciertos++; }
      else if (!o.ok && marcada) { cls = "op-bad"; tag = "No correspondía"; }
      else if (o.ok && !marcada) { cls = "op-miss"; tag = "Te faltó"; }
      else { cls = "op-neutral"; tag = "Bien descartada"; aciertos++; }
      btn.classList.add(cls);
      return o.ok || marcada ? `<li class="${cls}"><strong>${tag}:</strong> ${o.fb}</li>` : "";
    });
    const ok = aciertos === e.opciones.length;
    const parcial = !ok && aciertos >= e.opciones.length - 1;
    setStatus(el, ok, parcial);
    el.querySelector("[data-action=confirmar]").style.display = "none";
    mostrarFeedback(el, `<p class="fb-lead ${ok ? "ok" : "bad"}">${ok ? "Perfecto: marcaste todas y solo las correctas." : `Acertaste ${aciertos} de ${e.opciones.length}.`}</p>
      <ul class="fb-list">${items.join("")}</ul><div class="fb-exp">${e.explicacion}</div>${ok ? "" : btnReintentar}`);
    if (registrar) P.registrarEjercicio(el.dataset.clave, ok, { r: sel });
  }

  function leerNumero(txt) {
    const t = String(txt).trim().replace(/\s|\$|%|USD|pb/gi, "");
    // admite "1.633,5", "1633.5", "1633,5" y "−10"
    let n = t.replace(/−/g, "-");
    if (n.includes(",")) n = n.replace(/\./g, "").replace(",", ".");
    else if (/^\-?\d{1,3}(\.\d{3})+$/.test(n)) n = n.replace(/\./g, "");
    return parseFloat(n);
  }

  function resolverEstimar(el, valor, registrar) {
    const { e } = buscarEj(el);
    const v = Math.abs(valor);
    const err = Math.abs(v - e.respuesta);
    const ok = err <= e.tolerancia, cerca = !ok && err <= e.tolerancia * 3;
    setStatus(el, ok, cerca);
    el.querySelector("[data-input]").disabled = true;
    el.querySelector("[data-action=estimar]").style.display = "none";
    const dec = e.respuesta % 1 ? (String(e.respuesta).split(".")[1] || "").length : 0;
    mostrarFeedback(el, `
      <div class="fb-compare"><div><span>Tu estimación</span><strong>${fmt(v, dec)}${e.unidad ? " " + esc(e.unidad) : ""}</strong></div>
        <div><span>Respuesta</span><strong>${fmt(e.respuesta, dec)}${e.unidad ? " " + esc(e.unidad) : ""}</strong></div></div>
      <p class="fb-lead ${ok ? "ok" : "bad"}">${ok ? "Muy bien, dentro del margen." : cerca ? "Cerca, pero fuera del margen." : "Lejos: mirá el razonamiento."}</p>
      <div class="fb-exp">${e.explicacion}</div>${ok ? "" : btnReintentar}`);
    if (registrar) P.registrarEjercicio(el.dataset.clave, ok, { r: v });
  }

  function mostrarCaso(el) {
    const { e } = buscarEj(el);
    el.querySelector("[data-action=caso]").style.display = "none";
    el.querySelector("[data-input]").readOnly = true;
    mostrarFeedback(el, `
      <div class="fb-rubrica"><span>Una buena respuesta…</span><ul>${e.rubrica.map(r => `<li>${r}</li>`).join("")}</ul></div>
      <div class="fb-modelo"><span>Respuesta modelo</span><p>${e.modelo}</p></div>
      <div class="autoeval"><span>Comparando con la rúbrica, tu respuesta…</span>
        <div><button type="button" class="chip" data-auto="ok">La cubrió bien</button>
        <button type="button" class="chip" data-auto="medio">A medias</button>
        <button type="button" class="chip" data-auto="mal">Le faltó bastante</button></div></div>`);
  }

  function restaurarEjercicio(el) {
    const r = P.ejercicio(el.dataset.clave);
    if (!r || r.r === undefined) return;
    const tipo = el.dataset.tipo;
    if (tipo === "mc") resolverMC(el, r.r, false);
    else if (tipo === "multi") { r.r.forEach(j => opBtn(el, j).classList.add("op-chosen")); resolverMulti(el, r.r, false); }
    else if (tipo === "estimar") { el.querySelector("[data-input]").value = String(r.r).replace(".", ","); resolverEstimar(el, r.r, false); }
    else if (tipo === "caso") {
      el.querySelector("[data-input]").value = r.texto || "";
      mostrarCaso(el);
      const b = el.querySelector(`[data-auto="${r.r}"]`); if (b) b.classList.add("is-on");
      setStatus(el, r.r === "ok", r.r === "medio");
    }
  }

  function reiniciarEjercicio(el) {
    const { m, l, e } = buscarEj(el);
    const ctx = { m, l, n: +el.querySelector(".ej-k").textContent.match(/\d+/)[0] };
    const tmp = document.createElement("div");
    tmp.innerHTML = renderEjercicio(e, ctx);
    el.replaceWith(tmp.firstElementChild);
  }

  // Delegación de eventos para ejercicios (sin onclick inline)
  app.addEventListener("click", ev => {
    const el = ev.target.closest(".ej");
    if (!el) return;
    const tipo = el.dataset.tipo;
    const op = ev.target.closest(".ej-op");
    if (op && !op.disabled) {
      if (tipo === "mc") { resolverMC(el, +op.dataset.op, true); refrescarFin(); }
      else { op.classList.toggle("op-chosen"); el.querySelector("[data-action=confirmar]").disabled = !el.querySelector(".op-chosen"); }
      return;
    }
    const act = ev.target.closest("[data-action]");
    if (act) {
      const a = act.dataset.action;
      if (a === "confirmar") {
        const sel = Array.from(el.querySelectorAll(".ej-op.op-chosen")).map(b => +b.dataset.op).sort((a, b) => a - b);
        resolverMulti(el, sel, true); refrescarFin();
      } else if (a === "estimar") {
        const v = leerNumero(el.querySelector("[data-input]").value);
        if (isFinite(v)) { resolverEstimar(el, v, true); refrescarFin(); }
      } else if (a === "caso") mostrarCaso(el);
      else if (a === "reintentar") reiniciarEjercicio(el);
      return;
    }
    const auto = ev.target.closest("[data-auto]");
    if (auto) {
      el.querySelectorAll("[data-auto]").forEach(b => b.classList.toggle("is-on", b === auto));
      const v = auto.dataset.auto;
      setStatus(el, v === "ok", v === "medio");
      P.registrarEjercicio(el.dataset.clave, v === "ok", { r: v, texto: el.querySelector("[data-input]").value });
      refrescarFin();
    }
  });
  app.addEventListener("input", ev => {
    const el = ev.target.closest(".ej");
    if (el && el.dataset.tipo === "estimar" && ev.target.matches("[data-input]")) {
      el.querySelector("[data-action=estimar]").disabled = !isFinite(leerNumero(ev.target.value));
    }
  });
  app.addEventListener("keydown", ev => {
    if (ev.key === "Enter" && ev.target.matches(".ej[data-tipo=estimar] [data-input]")) {
      const b = ev.target.closest(".ej").querySelector("[data-action=estimar]");
      if (b && !b.disabled) b.click();
    }
  });
  function refrescarFin() {
    const r = ruta();
    if (r.tipo === "leccion") {
      const idx = r.m.lecciones.indexOf(r.l);
      pintarFinLeccion(r.m, r.l, r.m.lecciones[idx + 1], r.m.lecciones[idx - 1]);
    }
  }

  /* ======================================================
     EVALUACIÓN DEL MÓDULO
     ====================================================== */
  let evalActual = null;

  function armarEvaluacion(m) {
    const prev = P.evaluacion(m.id);
    const vistas = new Set(prev ? prev.vistas : []), falladas = new Set(prev ? prev.falladas : []);
    const pool = (m.evaluacion.ids && m.evaluacion.ids.length ? m.evaluacion.ids
      : Object.values(BANCO).filter(q => q.categoria === m.evaluacion.categoria).map(q => q.id)).filter(id => BANCO[id]);
    const peso = id => (falladas.has(id) ? 3 : !vistas.has(id) ? 2 : 1) + Math.random() * 1.5;
    const elegidas = pool.map(id => [id, peso(id)]).sort((a, b) => b[1] - a[1]).slice(0, m.evaluacion.cantidad).map(x => x[0]);
    // casos abiertos al final
    elegidas.sort((a, b) => (BANCO[a].tipo === "caso_abierto") - (BANCO[b].tipo === "caso_abierto"));
    const orden = {};
    elegidas.forEach(id => { const n = (BANCO[id].opciones || []).length; const idx = Array.from({ length: n }, (_, i) => i); for (let i = n - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [idx[i], idx[j]] = [idx[j], idx[i]]; } orden[id] = idx; });
    return { m, ids: elegidas, i: 0, res: {}, orden };
  }

  function vistaEvaluacion(m) {
    if (!evalActual || evalActual.m !== m) evalActual = null;
    if (!evalActual) {
      const prev = P.evaluacion(m.id);
      app.innerHTML = `
        <nav class="crumbs"><a href="#/">Aula</a><span>/</span><a href="#/m/${m.id}">${esc(m.titulo)}</a><span>/</span><span>Evaluación</span></nav>
        <section class="eval-intro panel">
          <p class="eyebrow">Evaluación · Módulo ${m.numero}</p>
          <h1>${esc(m.titulo)}</h1>
          <p class="lede">${m.evaluacion.cantidad} preguntas del banco de práctica. Primero las de opción múltiple y al final, si tocan, algún caso abierto para autoevaluar con la rúbrica.</p>
          <ul class="eval-rules"><li>Se aprueba con <strong>70%</strong>.</li><li>Cada vez que la hacés, priorizamos las que fallaste y las que nunca viste.</li><li>Al final ves qué repasar.</li></ul>
          ${prev ? `<p class="hint">Tu mejor resultado hasta ahora: <strong>${Math.round(prev.mejor * 100)}%</strong>.</p>` : ""}
          <button class="btn btn-primary btn-lg" data-action="eval-start">Empezar ${flecha}</button>
        </section>`;
      app.querySelector("[data-action=eval-start]").addEventListener("click", () => { evalActual = armarEvaluacion(m); pintarPregunta(); });
      window.scrollTo(0, 0);
      return;
    }
    pintarPregunta();
  }

  function pintarPregunta() {
    const E = evalActual, m = E.m;
    if (E.i >= E.ids.length) return pintarResultado();
    const q = BANCO[E.ids[E.i]];
    const pct = Math.round(E.i / E.ids.length * 100);
    const esCaso = q.tipo === "caso_abierto";
    app.innerHTML = `
      <nav class="crumbs"><a href="#/">Aula</a><span>/</span><a href="#/m/${m.id}">${esc(m.titulo)}</a><span>/</span><span>Evaluación</span></nav>
      <section class="eval-q panel">
        <div class="eval-progress"><span>Pregunta ${E.i + 1} de ${E.ids.length}</span><div class="bar"><i style="width:${pct}%"></i></div></div>
        <p class="eyebrow">${esc(q.categoria)} · ${esc(q.subtema)}</p>
        <div class="eval-enunciado">${esc(q.enunciado)}</div>
        ${esCaso ? `<textarea class="ej-texto" rows="6" placeholder="Escribí tu respuesta…" id="evalTexto"></textarea>
          <button class="btn btn-primary btn-sm" data-action="eval-caso">Ver qué se espera</button>`
        : `<div class="ej-ops">${E.orden[q.id].map(i => `<button type="button" class="ej-op" data-q="${i}"><span class="ej-mark"></span><span class="ej-txt">${esc(q.opciones[i])}</span></button>`).join("")}</div>`}
        <div class="ej-feedback" hidden style="display:none"></div>
        <div class="eval-next" hidden style="display:none"><button class="btn btn-primary" data-action="eval-next">${E.i + 1 === E.ids.length ? "Ver resultado" : "Siguiente pregunta"} ${flecha}</button></div>
      </section>`;
    const sec = app.querySelector(".eval-q");
    const fb = sec.querySelector(".ej-feedback"), nx = sec.querySelector(".eval-next");
    const mostrar = html => { fb.innerHTML = html; fb.hidden = false; fb.style.display = "block"; nx.hidden = false; nx.style.display = "flex"; };
    sec.addEventListener("click", ev => {
      const b = ev.target.closest("[data-q]");
      if (b && !b.disabled) {
        const i = +b.dataset.q, ok = i === q.respuesta_correcta;
        sec.querySelectorAll("[data-q]").forEach(x => { const j = +x.dataset.q; x.disabled = true; if (j === q.respuesta_correcta) x.classList.add("op-ok"); if (j === i) x.classList.add("op-chosen"); if (j === i && !ok) x.classList.add("op-bad"); });
        E.res[q.id] = ok;
        mostrar(`<p class="fb-lead ${ok ? "ok" : "bad"}">${ok ? "Correcto." : "Incorrecto."}</p><div class="fb-exp">${esc(q.explicacion)}</div>`);
        return;
      }
      const au = ev.target.closest("[data-auto]");
      if (au) {
        sec.querySelectorAll("[data-auto]").forEach(x => x.classList.toggle("is-on", x === au));
        E.res[q.id] = au.dataset.auto === "ok" ? true : au.dataset.auto === "medio" ? 0.5 : false;
        nx.hidden = false; nx.style.display = "flex";
        return;
      }
      const a = ev.target.closest("[data-action]");
      if (!a) return;
      if (a.dataset.action === "eval-caso") {
        a.style.display = "none";
        mostrar(`<div class="fb-modelo"><span>Qué se espera en la respuesta</span><p>${esc(q.respuesta_modelo)}</p></div>
          <div class="autoeval"><span>Tu respuesta…</span><div>
          <button type="button" class="chip" data-auto="ok">La cubrió bien</button><button type="button" class="chip" data-auto="medio">A medias</button><button type="button" class="chip" data-auto="mal">Le faltó bastante</button></div></div>`);
        nx.style.display = "none";
      } else if (a.dataset.action === "eval-next") { E.i++; pintarPregunta(); window.scrollTo(0, 0); }
    });
  }

  function pintarResultado() {
    const E = evalActual, m = E.m;
    const vals = E.ids.map(id => E.res[id] === true ? 1 : E.res[id] === 0.5 ? 0.5 : 0);
    const puntaje = vals.reduce((a, b) => a + b, 0) / E.ids.length;
    const falladas = E.ids.filter(id => E.res[id] !== true);
    const antes = P.evaluacion(m.id);
    P.registrarEvaluacion(m.id, puntaje, falladas, E.ids);
    const aprobo = puntaje >= 0.7;
    const mejoro = antes && puntaje > antes.mejor;
    evalActual = null;
    app.innerHTML = `
      <nav class="crumbs"><a href="#/">Aula</a><span>/</span><a href="#/m/${m.id}">${esc(m.titulo)}</a><span>/</span><span>Resultado</span></nav>
      <section class="panel eval-result ${aprobo ? "is-ok" : ""}">
        <div class="result-ring">${anillo(Math.round(puntaje * 100), 140)}</div>
        <div>
          <p class="eyebrow">Resultado</p>
          <h1>${aprobo ? "Módulo aprobado" : "Todavía no"}</h1>
          <p class="lede">${aprobo ? (mejoro ? "Mejoraste tu marca anterior. " : "") + "Ya podés pasar al siguiente módulo del recorrido." : "Hace falta 70% para aprobar. Revisá las preguntas de abajo y volvé a intentarlo: la próxima vez van a aparecer primero."}</p>
          <div class="result-actions">
            <a class="btn btn-primary" href="#/">Volver al aula ${flecha}</a>
            <a class="btn btn-ghost" href="#/m/${m.id}/evaluacion">Hacerla de nuevo</a>
          </div>
        </div>
      </section>
      ${falladas.length ? `<section class="panel"><header class="section-head"><span class="eyebrow">Para repasar</span><h2>Preguntas a revisar</h2></header>
        <ol class="review-list">${falladas.map(id => `<li><p>${esc(BANCO[id].enunciado)}</p><small>${esc(BANCO[id].subtema)}</small></li>`).join("")}</ol></section>` : ""}`;
    window.scrollTo(0, 0);
  }


  /* ======================================================
     DIAGNÓSTICO
     ====================================================== */
  let diagActual = null;
  const NIVEL = n => n >= 2 ? ["dominado", "Dominado"] : n === 1 ? ["repasar", "Repasar"] : ["prioridad", "Prioridad"];
  const mezclarArr = a => { const b = a.slice(); for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [b[i], b[j]] = [b[j], b[i]]; } return b; };
  const fechaLarga = f => { const [y, mo, d] = f.split("-"); return `${+d}/${+mo}/${y}`; };
  const modsDiag = () => disponibles().filter(m => AULA.diagnostico && AULA.diagnostico[m.id]);
  const ultimoDiag = () => { const l = P.diagnosticos(); return l.length ? l[l.length - 1] : null; };

  function vistaDiagnostico(ver) {
    const ult = ultimoDiag();
    if (ver && ult) return pintarDiagResultado(ult, P.diagnosticos().slice(-2, -1)[0] || null, false);
    if (diagActual) return pintarDiagPregunta();
    const total = modsDiag().reduce((s, m) => s + AULA.diagnostico[m.id].filter(id => BANCO[id]).length, 0);
    app.innerHTML = `
      <nav class="crumbs"><a href="#/">Aula</a><span>/</span><span>Diagnóstico</span></nav>
      <section class="panel eval-intro diag-intro">
        <p class="eyebrow">Diagnóstico</p>
        <h1>¿Dónde estás parada hoy?</h1>
        <p class="lede">${total} preguntas, dos por cada módulo y taller del Aula. Unos 15 minutos. Al final ves qué temas tenés firmes, cuáles conviene repasar y por dónde empezar.</p>
        <ul class="eval-rules">
          <li>Si no sabés una respuesta, tocá <strong>"No sé"</strong>: es mejor que adivinar, porque el resultado te muestra lo que sabés de verdad.</li>
          <li>Las respuestas correctas las ves recién al final, con la explicación de cada una.</li>
          <li>Con dos preguntas por tema, el resultado es orientativo. Repetilo cada dos o tres meses para ver cómo avanzás.</li>
        </ul>
        ${ult ? `<p class="hint">Tu último diagnóstico fue el ${fechaLarga(ult.fecha)}: <strong>${Math.round(ult.aciertos / ult.total * 100)}%</strong>. <a href="#/diagnostico?ver=1">Ver ese resultado</a></p>` : ""}
        <button class="btn btn-primary btn-lg" data-action="diag-start">Empezar ${flecha}</button>
      </section>`;
    app.querySelector("[data-action=diag-start]").addEventListener("click", () => {
      const items = [];
      modsDiag().forEach(m => AULA.diagnostico[m.id].forEach(id => { if (BANCO[id]) items.push({ mid: m.id, id }); }));
      diagActual = { items: mezclarArr(items).map(it => Object.assign(it, { orden: mezclarArr(BANCO[it.id].opciones.map((_, i) => i)) })), i: 0, resp: {} };
      pintarDiagPregunta();
    });
  }

  function pintarDiagPregunta() {
    const D = diagActual;
    if (D.i >= D.items.length) return cerrarDiagnostico();
    const it = D.items[D.i], q = BANCO[it.id];
    const elegido = D.resp[it.id];
    app.innerHTML = `
      <nav class="crumbs"><a href="#/">Aula</a><span>/</span><span>Diagnóstico</span></nav>
      <section class="eval-q panel diag-q">
        <div class="eval-progress"><span>Pregunta ${D.i + 1} de ${D.items.length}</span><div class="bar"><i style="width:${Math.round(D.i / D.items.length * 100)}%"></i></div></div>
        <div class="eval-enunciado">${esc(q.enunciado)}</div>
        <div class="ej-ops">${it.orden.map(i => `<button type="button" class="ej-op ${elegido === i ? "op-chosen" : ""}" data-d="${i}"><span class="ej-mark"></span><span class="ej-txt">${esc(q.opciones[i])}</span></button>`).join("")}</div>
        <div class="diag-foot">
          <button type="button" class="btn btn-ghost diag-nose ${elegido === "nose" ? "is-on" : ""}" data-d="nose">No sé</button>
          <div class="diag-nav">
            ${D.i > 0 ? `<button type="button" class="btn btn-ghost" data-action="diag-prev">← Anterior</button>` : ""}
            <button type="button" class="btn btn-primary" data-action="diag-next" ${elegido === undefined ? "disabled" : ""}>${D.i + 1 === D.items.length ? "Ver resultado" : "Siguiente"} ${flecha}</button>
          </div>
        </div>
      </section>`;
    const sec = app.querySelector(".diag-q");
    sec.addEventListener("click", ev => {
      const b = ev.target.closest("[data-d]");
      if (b) {
        D.resp[it.id] = b.dataset.d === "nose" ? "nose" : +b.dataset.d;
        sec.querySelectorAll(".ej-op").forEach(x => x.classList.toggle("op-chosen", x === b));
        sec.querySelector(".diag-nose").classList.toggle("is-on", b.dataset.d === "nose");
        sec.querySelector("[data-action=diag-next]").disabled = false;
        return;
      }
      const a = ev.target.closest("[data-action]");
      if (!a) return;
      if (a.dataset.action === "diag-next") { D.i++; pintarDiagPregunta(); window.scrollTo(0, 0); }
      if (a.dataset.action === "diag-prev") { D.i--; pintarDiagPregunta(); window.scrollTo(0, 0); }
    });
  }

  function cerrarDiagnostico() {
    const D = diagActual, mod = {}, resp = {};
    let aciertos = 0, nose = 0;
    D.items.forEach(it => {
      const r = D.resp[it.id], ok = r === BANCO[it.id].respuesta_correcta;
      mod[it.mid] = (mod[it.mid] || 0) + (ok ? 1 : 0);
      if (ok) aciertos++; if (r === "nose") nose++;
      resp[it.id] = r;
    });
    const previo = ultimoDiag();
    const r = { mod, resp, aciertos, nose, total: D.items.length };
    P.registrarDiagnostico(r);
    diagActual = null;
    pintarDiagResultado(ultimoDiag(), previo, true);
  }

  function resumenTexto(r, previo) {
    const mods = modsDiag();
    const linea = n => mods.filter(m => NIVEL(r.mod[m.id] || 0)[0] === n).map(m => m.titulo).join(", ") || "ninguno";
    return `Diagnóstico del Aula (${fechaLarga(r.fecha)}): ${r.aciertos} de ${r.total} (${Math.round(r.aciertos / r.total * 100)}%)` +
      (previo ? `, antes ${previo.aciertos} de ${previo.total}` : "") + `. "No sé": ${r.nose}.\n` +
      `Prioridad: ${linea("prioridad")}.\nRepasar: ${linea("repasar")}.\nDominado: ${linea("dominado")}.`;
  }

  function pintarDiagResultado(r, previo, recien) {
    const mods = modsDiag(), pct = Math.round(r.aciertos / r.total * 100);
    const orden = [...mods.filter(m => (r.mod[m.id] || 0) === 0), ...mods.filter(m => (r.mod[m.id] || 0) === 1)];
    const filas = mods.map(m => {
      const n = r.mod[m.id] || 0, [cls, txt] = NIVEL(n), antes = previo && previo.mod ? (previo.mod[m.id] || 0) : null;
      const delta = antes === null ? "" : n > antes ? `<span class="diag-d up">↑</span>` : n < antes ? `<span class="diag-d down">↓</span>` : "";
      return `<a class="diag-row" href="#/m/${m.id}"><span class="diag-mn">${etiqueta(m)}</span><strong>${esc(m.titulo)}</strong>
        <span class="diag-dots">${[0, 1].map(i => `<i class="${i < n ? "on" : ""}"></i>`).join("")}</span>${delta}<span class="diag-tag t-${cls}">${txt}</span></a>`;
    }).join("");
    const revisar = Object.keys(r.resp || {}).filter(id => BANCO[id] && r.resp[id] !== BANCO[id].respuesta_correcta);
    const texto = resumenTexto(r, previo);
    app.innerHTML = `
      <nav class="crumbs"><a href="#/">Aula</a><span>/</span><span>Diagnóstico</span></nav>
      <section class="panel eval-result diag-res">
        <div class="result-ring">${anillo(pct, 140)}</div>
        <div>
          <p class="eyebrow">${recien ? "Resultado del diagnóstico" : "Diagnóstico del " + fechaLarga(r.fecha)}</p>
          <h1>${r.aciertos} de ${r.total} bien</h1>
          <p class="lede">${previo ? `La vez anterior (${fechaLarga(previo.fecha)}) fueron ${previo.aciertos} de ${previo.total}. ` : ""}${r.nose ? `Marcaste "No sé" en ${r.nose} ${r.nose === 1 ? "pregunta" : "preguntas"}: eso también es información útil. ` : ""}${orden.length ? `Te sugerimos empezar por <strong>${esc(orden[0].titulo)}</strong>.` : "Tenés todos los temas firmes: usá el Aula para repasar y los casos de la mesa de operaciones para seguir practicando."}</p>
          <div class="result-actions">
            ${orden.length ? `<a class="btn btn-primary" href="#/m/${orden[0].id}">Empezar por ahí ${flecha}</a>` : `<a class="btn btn-primary" href="#/">Volver al aula ${flecha}</a>`}
            <button type="button" class="btn btn-ghost" data-action="diag-copiar">Copiar resumen para compartir</button>
          </div>
        </div>
      </section>
      <section class="panel">
        <header class="section-head"><span class="eyebrow">Tema por tema</span><h2>Qué tenés firme y qué no</h2>
          <p class="section-lede">Dos círculos por módulo: <span class="diag-tag t-dominado">Dominado</span> las dos bien, <span class="diag-tag t-repasar">Repasar</span> una, <span class="diag-tag t-prioridad">Prioridad</span> ninguna.${previo ? " Las flechas comparan con el diagnóstico anterior." : ""}</p></header>
        <div class="diag-list">${filas}</div>
      </section>
      ${orden.length ? `<section class="panel"><header class="section-head"><span class="eyebrow">Orden sugerido</span><h2>Por dónde seguir</h2></header>
        <ol class="diag-orden">${orden.map(m => `<li><a href="#/m/${m.id}">${esc(m.titulo)}</a> <span class="diag-tag t-${NIVEL(r.mod[m.id] || 0)[0]}">${NIVEL(r.mod[m.id] || 0)[1]}</span></li>`).join("")}</ol></section>` : ""}
      ${revisar.length ? `<section class="panel"><header class="section-head"><span class="eyebrow">Para aprender</span><h2>Las que no salieron</h2></header>
        <ol class="review-list diag-rev">${revisar.map(id => { const q = BANCO[id], a = r.resp[id]; return `<li>
          <p>${esc(q.enunciado)}</p>
          ${a === "nose" ? `<p class="diag-yo">Marcaste "No sé".</p>` : a !== undefined ? `<p class="diag-yo">Tu respuesta: ${esc(q.opciones[a])}</p>` : ""}
          <p class="diag-ok"><strong>Correcta:</strong> ${esc(q.opciones[q.respuesta_correcta])}</p>
          <p class="diag-exp">${esc(q.explicacion)}</p></li>`; }).join("")}</ol></section>` : ""}
      <section class="panel diag-share"><header class="section-head"><span class="eyebrow">Resumen</span><h2>Para compartir</h2></header>
        <textarea class="ej-texto" rows="5" readonly data-resumen>${esc(texto)}</textarea>
        <p class="hint"><a href="#/diagnostico">Hacer un diagnóstico nuevo</a></p></section>`;
    app.querySelector("[data-action=diag-copiar]").addEventListener("click", () => {
      const ta = app.querySelector("[data-resumen]");
      const ok = () => toast("Resumen copiado");
      if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(texto).then(ok, () => { ta.select(); document.execCommand("copy"); ok(); });
      else { ta.select(); document.execCommand("copy"); ok(); }
    });
    window.scrollTo(0, 0);
  }


  /* ======================================================
     MI INFORME (exportar progreso)
     ====================================================== */
  const corto = (t, n = 110) => { const x = textoPlano(t).replace(/\s+/g, " ").trim(); return x.length > n ? x.slice(0, n - 1) + "…" : x; };
  const AUTO = { ok: "La cubrió bien", medio: "A medias", mal: "Le faltó bastante" };

  function datosInforme() {
    const s = statsGlobales(), dias = (P.estado.dias || []).slice().sort();
    const mods = disponibles().map(m => {
      const a = avanceModulo(m); let resp = 0, bien = 0;
      m.lecciones.forEach(l => ejerciciosDe(l).forEach(e => { const r = P.ejercicio(claveLec(m.id, l.id) + "." + e.id); if (r) { resp++; if (r.ok) bien++; } }));
      const ejTot = m.lecciones.reduce((t, l) => t + ejerciciosDe(l).length, 0);
      return { m, a, resp, bien, ejTot };
    });
    const costaron = [], casos = [];
    disponibles().forEach(m => m.lecciones.forEach(l => ejerciciosDe(l).forEach(e => {
      const r = P.ejercicio(claveLec(m.id, l.id) + "." + e.id);
      if (!r) return;
      if (e.tipo === "caso") { casos.push({ m, l, e, r }); return; }
      if (!r.ok || r.intentos > 1) costaron.push({ m, l, e, r });
    })));
    const evalFall = disponibles().filter(m => m.evaluacion).map(m => ({ m, ev: P.evaluacion(m.id) }))
      .filter(x => x.ev && x.ev.falladas && x.ev.falladas.length);
    let practica = null;
    try {
      const raw = JSON.parse(localStorage.getItem("elEscritorio_progreso_v1") || "null");
      if (raw && raw.respuestas && Object.keys(raw.respuestas).length) {
        const cats = {}, fall = [];
        Object.entries(raw.respuestas).forEach(([id, r]) => {
          const q = BANCO[id]; if (!q) return;
          const c = cats[q.categoria] = cats[q.categoria] || { vistas: 0, bien: 0 };
          c.vistas++; if (r.correcta) c.bien++; else fall.push(q);
        });
        practica = { total: raw.totalRespondidas || 0, correctas: raw.totalCorrectas || 0, cats, fall, mejorRacha: raw.mejorRacha || 0 };
      }
    } catch (e) { /* sin datos de la práctica */ }
    return { s, dias, mods, costaron, casos, evalFall, practica, carteras: AULA.simulaciones.map(x => ({ sim: x, p: partidaDe(x) })), diag: ultimoDiag(), diagPrev: P.diagnosticos().slice(-2, -1)[0] || null };
  }

  function textoInforme(d) {
    const L = [], hoyTxt = new Date().toLocaleDateString("es-AR");
    L.push(`INFORME DEL AULA · ${hoyTxt}`, "");
    L.push(`Días con actividad: ${d.dias.length}${d.dias.length ? ` (desde el ${fechaLarga(d.dias[0])}, última el ${fechaLarga(d.dias[d.dias.length - 1])})` : ""} · Racha actual: ${d.s.racha}`);
    L.push(`Lecciones: ${d.s.lecOk}/${d.s.lecTot} · Ejercicios respondidos: ${d.s.ejResp}/${d.s.ejTot} (bien: ${d.s.ejOk}) · Módulos aprobados: ${d.s.aprob}/${disponibles().length}`, "");
    L.push("DIAGNÓSTICO");
    L.push(d.diag ? resumenTexto(d.diag, d.diagPrev) : "Todavía no hizo el diagnóstico.", "");
    L.push("POR MÓDULO");
    d.mods.forEach(x => {
      const ev = x.a.ev ? `evaluación: mejor ${Math.round(x.a.ev.mejor * 100)}%, última ${Math.round(x.a.ev.ultimo * 100)}% (${x.a.ev.intentos} ${x.a.ev.intentos === 1 ? "intento" : "intentos"})` : x.m.evaluacion ? "evaluación: sin hacer" : "taller sin evaluación";
      L.push(`- ${x.m.taller ? x.m.titulo : etiqueta(x.m) + " · " + x.m.titulo}: ${x.a.hechas}/${x.a.total} lecciones · ejercicios ${x.resp}/${x.ejTot} respondidos (${x.bien} bien) · ${ev}`);
    });
    L.push("", "EJERCICIOS QUE LE COSTARON");
    if (!d.costaron.length) L.push("Ninguno por ahora.");
    d.costaron.forEach(x => L.push(`- [${x.m.titulo} · ${x.l.titulo}] ${corto(x.e.enunciado)} → ${x.r.ok ? `bien después de ${x.r.intentos} intentos` : `todavía mal (${x.r.intentos} ${x.r.intentos === 1 ? "intento" : "intentos"})`}`));
    L.push("", "CASOS ESCRITOS");
    if (!d.casos.length) L.push("Todavía no respondió casos.");
    d.casos.forEach(x => { L.push(`- [${x.m.titulo} · ${x.l.titulo}] ${corto(x.e.enunciado, 140)}`); L.push(`  Su respuesta: "${(x.r.texto || "(sin texto)").trim()}"`); L.push(`  Autoevaluación: ${AUTO[x.r.r] || "-"}`); });
    L.push("", "EVALUACIONES · PREGUNTAS FALLADAS EN EL ÚLTIMO INTENTO");
    if (!d.evalFall.length) L.push("Ninguna.");
    d.evalFall.forEach(x => L.push(`- ${x.m.titulo}: ${x.ev.falladas.map(id => BANCO[id] ? BANCO[id].subtema : id).join(" · ")}`));
    L.push("", "PRÁCTICA DIARIA");
    if (!d.practica) L.push("Sin actividad registrada en este navegador.");
    else {
      L.push(`Respondidas: ${d.practica.total} (bien: ${d.practica.correctas}) · Mejor racha: ${d.practica.mejorRacha}`);
      Object.entries(d.practica.cats).forEach(([c, v]) => L.push(`- ${c}: ${v.bien}/${v.vistas} preguntas bien la última vez`));
      if (d.practica.fall.length) L.push(`Temas que falló la última vez: ${d.practica.fall.slice(0, 20).map(q => q.subtema).join(" · ")}${d.practica.fall.length > 20 ? ` (y ${d.practica.fall.length - 20} más)` : ""}`);
    }
    L.push("", "SIMULACIONES");
    d.carteras.forEach(x => { L.push(x.sim.titulo.toUpperCase()); if (!x.p) L.push("Todavía no empezó una partida en este navegador."); else x.p.lineas.forEach(y => L.push(y)); });
    return L.join("\n");
  }

  function vistaInforme() {
    const d = datosInforme(), texto = textoInforme(d);
    const blk = (titulo, html) => `<section class="inf-blk"><h3>${titulo}</h3>${html}</section>`;
    const pct = d.s.lecTot ? Math.round(d.s.lecOk / d.s.lecTot * 100) : 0;
    app.innerHTML = `
      <nav class="crumbs"><a href="#/">Aula</a><span>/</span><span>Mi informe</span></nav>
      <section class="panel inf-head">
        <div><p class="eyebrow">Mi informe</p><h1>Tu progreso, en un resumen para compartir</h1>
          <p class="lede">Incluye tu avance por módulo, los ejercicios que te costaron, tus respuestas a los casos, el diagnóstico y la práctica diaria. Mandalo cuando quieras recibir una devolución.</p></div>
        <div class="inf-act">
          ${navigator.share ? `<button type="button" class="btn btn-primary" data-act="share">Compartir ${flecha}</button>` : ""}
          <button type="button" class="btn ${navigator.share ? "btn-ghost" : "btn-primary"}" data-act="copy">Copiar el informe</button>
          <button type="button" class="btn btn-ghost" data-act="dl">Descargar (.txt)</button>
        </div>
      </section>
      <section class="panel inf-body">
        <div class="inf-kpis">
          <div class="kpi"><span>Recorrido</span><b>${pct}%</b></div>
          <div class="kpi"><span>Lecciones</span><b>${d.s.lecOk}/${d.s.lecTot}</b></div>
          <div class="kpi"><span>Ejercicios bien</span><b>${d.s.ejOk}/${d.s.ejResp}</b></div>
          <div class="kpi"><span>Días con actividad</span><b>${d.dias.length}</b></div>
        </div>
        ${blk("Por módulo", `<div class="inf-mods">${d.mods.map(x => `<div class="inf-mod"><span>${etiqueta(x.m)}</span><strong>${esc(x.m.titulo)}</strong>
          <span class="inf-bar"><i style="width:${x.a.pct}%"></i></span>
          <small>${x.a.hechas}/${x.a.total} lecciones · ${x.resp}/${x.ejTot} ejercicios (${x.bien} bien)${x.a.ev ? ` · eval. ${Math.round(x.a.ev.mejor * 100)}%` : ""}</small></div>`).join("")}</div>`)}
        ${blk("Ejercicios que te costaron", d.costaron.length ? `<ul class="inf-list">${d.costaron.map(x => `<li><span class="${x.r.ok ? "ok" : "bad"}">${x.r.ok ? "✓" : "✗"}</span><div><small>${esc(x.m.titulo)} · ${esc(x.l.titulo)}</small>${esc(corto(x.e.enunciado))}<em>${x.r.ok ? `Bien después de ${x.r.intentos} intentos` : `Todavía a repasar`}</em></div></li>`).join("")}</ul>` : `<p class="hint">Ninguno por ahora.</p>`)}
        ${blk("Tus casos escritos", d.casos.length ? `<ul class="inf-list">${d.casos.map(x => `<li><span>✎</span><div><small>${esc(x.m.titulo)} · ${esc(x.l.titulo)}</small>${esc(corto(x.e.enunciado, 140))}<blockquote>${esc((x.r.texto || "(sin texto)").trim())}</blockquote><em>Tu autoevaluación: ${AUTO[x.r.r] || "-"}</em></div></li>`).join("")}</ul>` : `<p class="hint">Todavía no respondiste casos.</p>`)}
        ${blk("Diagnóstico", d.diag ? `<p>${d.diag.aciertos} de ${d.diag.total} bien el ${fechaLarga(d.diag.fecha)}. <a href="#/diagnostico?ver=1">Ver el detalle</a></p>` : `<p class="hint">Todavía no lo hiciste. <a href="#/diagnostico">Hacerlo ahora</a></p>`)}
        ${blk("Práctica diaria", d.practica ? `<p>${d.practica.total} preguntas respondidas, ${d.practica.correctas} bien.</p>` : `<p class="hint">Sin actividad en este navegador.</p>`)}
      </section>
      <section class="panel"><header class="section-head"><span class="eyebrow">Vista previa</span><h2>El texto que se comparte</h2></header>
        <textarea class="ej-texto inf-txt" rows="14" readonly data-txt>${esc(texto)}</textarea></section>`;
    const ok = msg => toast(msg);
    app.querySelector(".inf-act").addEventListener("click", ev => {
      const b = ev.target.closest("[data-act]"); if (!b) return;
      if (b.dataset.act === "share") navigator.share({ title: "Informe del Aula", text: texto }).catch(() => {});
      if (b.dataset.act === "copy") {
        const ta = app.querySelector("[data-txt]");
        if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(texto).then(() => ok("Informe copiado"), () => { ta.select(); document.execCommand("copy"); ok("Informe copiado"); });
        else { ta.select(); document.execCommand("copy"); ok("Informe copiado"); }
      }
      if (b.dataset.act === "dl") {
        const a = document.createElement("a");
        a.href = URL.createObjectURL(new Blob([texto], { type: "text/plain;charset=utf-8" }));
        a.download = "informe-aula-" + new Date().toISOString().slice(0, 10) + ".txt";
        document.body.appendChild(a); a.click(); setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 500);
        ok("Informe descargado");
      }
    });
    window.scrollTo(0, 0);
  }

  /* ======================================================
     GLOSARIO
     ====================================================== */
  function vistaGlosario() {
    const items = Object.values(AULA.glosario).sort((a, b) => a.termino.localeCompare(b.termino, "es"));
    app.innerHTML = `
      <nav class="crumbs"><a href="#/">Aula</a><span>/</span><span>Glosario</span></nav>
      <section class="panel glosario">
        <p class="eyebrow">Referencia</p>
        <h1>Glosario</h1>
        <p class="lede">Los términos que aparecen subrayados en las lecciones. Tocá cualquiera dentro de una lección para ver su definición sin salir.</p>
        <input type="search" class="search" placeholder="Buscar un término…" id="glosBuscar">
        <dl class="glos-list">${items.map(g => `<div class="glos-item"><dt>${esc(g.termino)}</dt><dd>${esc(g.def)}</dd></div>`).join("")}</dl>
      </section>`;
    const input = document.getElementById("glosBuscar");
    input.addEventListener("input", () => {
      const q = input.value.toLowerCase();
      app.querySelectorAll(".glos-item").forEach(it => { it.style.display = it.textContent.toLowerCase().includes(q) ? "" : "none"; });
    });
    window.scrollTo(0, 0);
  }

  /* ======================================================
     TÉRMINOS (popover) y avisos
     ====================================================== */
  const pop = document.createElement("div");
  pop.className = "term-pop"; pop.hidden = true; pop.style.display = "none";
  document.body.appendChild(pop);
  function cerrarPop() { pop.hidden = true; pop.style.display = "none"; }
  document.addEventListener("click", ev => {
    const t = ev.target.closest(".term");
    if (!t) { if (!ev.target.closest(".term-pop")) cerrarPop(); return; }
    const g = AULA.glosario[t.dataset.term];
    if (!g) return;
    pop.innerHTML = `<strong>${esc(g.termino)}</strong><p>${esc(g.def)}</p><a href="#/glosario">Ver glosario completo</a>`;
    pop.hidden = false; pop.style.display = "block";
    const r = t.getBoundingClientRect();
    const w = Math.min(320, window.innerWidth - 24);
    pop.style.width = w + "px";
    let left = r.left + window.scrollX + r.width / 2 - w / 2;
    left = Math.max(12, Math.min(left, window.innerWidth - w - 12));
    pop.style.left = left + "px";
    pop.style.top = (r.bottom + window.scrollY + 8) + "px";
  });
  document.addEventListener("keydown", ev => { if (ev.key === "Escape") cerrarPop(); });

  function toast(msg) {
    const t = document.createElement("div");
    t.className = "toast"; t.innerHTML = check + " " + esc(msg);
    document.body.appendChild(t);
    requestAnimationFrame(() => t.classList.add("in"));
    setTimeout(() => { t.classList.remove("in"); setTimeout(() => t.remove(), 300); }, 2200);
  }

  // Barra de lectura
  window.addEventListener("scroll", () => {
    const bar = document.getElementById("readBar");
    if (!bar) return;
    const h = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = (h > 0 ? Math.min(100, window.scrollY / h * 100) : 0) + "%";
  }, { passive: true });

  /* ======================================================
     ROUTER
     ====================================================== */
  function ruta() {
    const [path, qs] = (location.hash.replace(/^#/, "") || "/").split("?");
    const partes = path.split("/").filter(Boolean);
    const params = new URLSearchParams(qs || "");
    if (partes[0] === "glosario") return { tipo: "glosario" };
    if (partes[0] === "simulaciones") return { tipo: "simulaciones" };
    if (partes[0] === "informe") return { tipo: "informe" };
    if (partes[0] === "diagnostico") return { tipo: "diagnostico", ver: params.get("ver") === "1" };
    if (partes[0] === "m" && modulo(partes[1])) {
      const m = modulo(partes[1]);
      if (!partes[2]) return { tipo: "modulo", m };
      if (partes[2] === "evaluacion" && m.evaluacion) return { tipo: "evaluacion", m };
      const l = m.lecciones.find(x => x.id === partes[2]);
      if (l) return { tipo: "leccion", m, l, foco: params.get("ej") };
    }
    return { tipo: "inicio" };
  }
  function navegar() {
    cerrarPop();
    const r = ruta();
    document.querySelectorAll(".nav-link").forEach(a => a.classList.toggle("is-active", a.dataset.nav === (r.tipo === "glosario" ? "glosario" : r.tipo === "simulaciones" ? "simulaciones" : "aula")));
    if (r.tipo !== "evaluacion") evalActual = null;
    if (r.tipo !== "diagnostico") diagActual = null;
    if (r.tipo === "inicio") vistaInicio();
    else if (r.tipo === "modulo") vistaModulo(r.m);
    else if (r.tipo === "leccion") vistaLeccion(r.m, r.l, r.foco);
    else if (r.tipo === "evaluacion") vistaEvaluacion(r.m);
    else if (r.tipo === "glosario") vistaGlosario();
    else if (r.tipo === "simulaciones") vistaSimulaciones();
    else if (r.tipo === "diagnostico") vistaDiagnostico(r.ver);
    else if (r.tipo === "informe") vistaInforme();
    if (r.tipo !== "leccion") window.scrollTo(0, 0);
    document.title = (r.l ? r.l.titulo + " — " : r.m ? r.m.titulo + " — " : r.tipo === "diagnostico" ? "Diagnóstico — " : r.tipo === "informe" ? "Mi informe — " : r.tipo === "simulaciones" ? "Simulaciones — " : "") + "Aula · El Escritorio";
  }

  // Borrar progreso (con confirmación propia, sin diálogos del navegador)
  const modal = document.getElementById("resetModal");
  document.getElementById("resetBtn").addEventListener("click", () => { modal.hidden = false; modal.style.display = "flex"; });
  document.getElementById("resetCancel").addEventListener("click", () => { modal.hidden = true; modal.style.display = "none"; });
  document.getElementById("resetOk").addEventListener("click", () => { P.borrar(); modal.hidden = true; modal.style.display = "none"; location.hash = "#/"; navegar(); toast("Progreso del aula borrado"); });

  window.addEventListener("hashchange", navegar);
  navegar();
})();
