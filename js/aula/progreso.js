/* ============================================================
   PROGRESO del Aula — se guarda en el navegador (localStorage).
   Es independiente del progreso de la Práctica diaria.
   ============================================================ */
window.AULA = window.AULA || { modulos: {} };

AULA.progreso = (function () {
  const CLAVE = "elEscritorio_aula_v1";
  const vacio = () => ({ lecciones: {}, ejercicios: {}, evaluaciones: {}, diagnosticos: [], ultimaLeccion: null, dias: [] });
  let estado;

  function cargar() {
    try { estado = Object.assign(vacio(), JSON.parse(localStorage.getItem(CLAVE)) || {}); }
    catch (e) { estado = vacio(); }
    return estado;
  }
  function guardar() {
    try { localStorage.setItem(CLAVE, JSON.stringify(estado)); } catch (e) { /* modo privado: seguimos en memoria */ }
  }
  function hoy() {
    const d = new Date();
    return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
  }
  function marcarDia() {
    const h = hoy();
    if (!estado.dias.includes(h)) { estado.dias.push(h); estado.dias = estado.dias.slice(-120); }
  }

  cargar();

  return {
    get estado() { return estado; },
    leccionVista(clave) {
      estado.lecciones[clave] = Object.assign({ completa: false }, estado.lecciones[clave], { vista: true });
      estado.ultimaLeccion = clave; marcarDia(); guardar();
    },
    completarLeccion(clave) {
      estado.lecciones[clave] = Object.assign({}, estado.lecciones[clave], { vista: true, completa: true, fecha: hoy() });
      marcarDia(); guardar();
    },
    leccionCompleta(clave) { return !!(estado.lecciones[clave] && estado.lecciones[clave].completa); },
    registrarEjercicio(clave, ok, extra) {
      const prev = estado.ejercicios[clave] || { intentos: 0 };
      estado.ejercicios[clave] = Object.assign({}, prev, extra || {}, { ok: !!ok, intentos: prev.intentos + 1, fecha: hoy() });
      marcarDia(); guardar();
    },
    ejercicio(clave) { return estado.ejercicios[clave] || null; },
    registrarEvaluacion(modulo, puntaje, falladas, vistas) {
      const prev = estado.evaluaciones[modulo] || { mejor: 0, intentos: 0, vistas: [] };
      estado.evaluaciones[modulo] = {
        mejor: Math.max(prev.mejor, puntaje), ultimo: puntaje, intentos: prev.intentos + 1,
        falladas: falladas, vistas: Array.from(new Set([...(prev.vistas || []), ...vistas])), fecha: hoy()
      };
      marcarDia(); guardar();
    },
    evaluacion(modulo) { return estado.evaluaciones[modulo] || null; },
    registrarDiagnostico(r) {
      estado.diagnosticos = (estado.diagnosticos || []).concat([Object.assign({ fecha: hoy() }, r)]).slice(-12);
      marcarDia(); guardar();
    },
    diagnosticos() { return estado.diagnosticos || []; },
    racha() {
      const set = new Set(estado.dias);
      let n = 0; const d = new Date();
      if (!set.has(hoy())) d.setDate(d.getDate() - 1);
      while (true) {
        const k = d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
        if (!set.has(k)) break;
        n++; d.setDate(d.getDate() - 1);
      }
      return n;
    },
    borrar() { estado = vacio(); guardar(); }
  };
})();
