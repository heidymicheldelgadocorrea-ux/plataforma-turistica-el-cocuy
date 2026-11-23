const btnEnviar = document.getElementById("btnEnviar");
const preguntaUsuario = document.getElementById("preguntaUsuario");
const chatMensajes = document.getElementById("chatMensajes");

const registrosPrueba = [];

/* Base de conocimiento validada */

const conocimiento = [

    {
        palabras: [
            "sendero", "senderos", "ruta", "rutas",
            "recorrido", "recorridos", "caminar"
        ],
        respuesta:
            "Los senderos habilitados que tenemos registrados son: Lagunillas - Púlpito, Laguna Grande de la Sierra y Ritacuba. Antes de visitar el parque debes verificar disponibilidad de cupos y condiciones actuales de ingreso."
    },

    {
    palabras: [
        "actividad", "actividades",
        "planes", "plan", "ecoturismo",
        "que puedo hacer", "qué puedo hacer"
    ],
        respuesta:
            "Entre las actividades registradas se encuentran senderismo, fotografía de naturaleza, observación de aves, observación de flora y fauna y educación ambiental."
    },

    {
        palabras: [
            "aves", "ave", "avistamiento",
            "fauna", "flora", "naturaleza"
        ],
        respuesta:
            "En el área protegida pueden realizarse actividades de observación de aves, fauna y flora, procurando mantener una distancia adecuada y evitando alterar los ecosistemas."
    },

    {
        palabras: [
            "alojamiento", "hotel", "hoteles",
            "hostal", "hostales", "hospedaje",
            "cabaña", "cabañas", "dormir", "hospedar"
        ],
        respuesta:
            "En El Cocuy existen diferentes alternativas de alojamiento, como hoteles, hostales y cabañas. Antes de contratar un servicio te recomendamos verificar disponibilidad y el registro vigente del prestador."
    },

    {
        palabras: [
            "restaurante", "restaurantes",
            "comida", "comer", "alimentación",
            "alimentacion"
        ],
        respuesta:
            "El prototipo contempla la categoría de servicios de alimentación para visitantes. Antes de elegir un establecimiento se recomienda verificar la disponibilidad y las condiciones actuales del servicio."
    },

    {
        palabras: [
            "transporte", "llegar", "llego",
            "viajar", "desplazamiento", "desplazar"
        ],
        respuesta:
            "Existen opciones de transporte y desplazamiento hacia El Cocuy y los diferentes sectores turísticos. Se recomienda verificar previamente las condiciones de acceso y disponibilidad del servicio."
    },

    {
        palabras: [
            "ubicación", "ubicacion", "donde queda",
            "dónde queda", "parque", "atractivo",
            "atractivos"
        ],
        respuesta:
            "El Parque Nacional Natural El Cocuy se encuentra en los Andes nororientales de Colombia y tiene presencia en los departamentos de Boyacá, Arauca y Casanare. Protege ecosistemas de alta montaña, páramo, bosque andino y zonas glaciares."
    },

    {
        palabras: [
            "fuente", "fuentes", "informacion",
            "información", "datos", "oficial"
        ],
        respuesta:
            "La información turística del prototipo utiliza como fuentes principales Parques Nacionales Naturales de Colombia y el Sistema de Información Turística de Boyacá."
    }

];

/* Agregar mensajes al chat */

function agregarMensaje(texto, tipo) {

    const mensaje = document.createElement("div");

    mensaje.classList.add("mensaje", tipo);

    if (tipo === "usuario") {
        mensaje.innerHTML = "<strong>Tú:</strong> " + texto;
    } else {
        mensaje.innerHTML = "<strong>Asistente:</strong> " + texto;
    }

    chatMensajes.appendChild(mensaje);

    chatMensajes.scrollTop = chatMensajes.scrollHeight;
}


/* Buscar respuesta */

function obtenerRespuesta(pregunta) {

    const texto = pregunta.toLowerCase();

    for (const tema of conocimiento) {

        for (const palabra of tema.palabras) {

            if (texto.includes(palabra)) {
                return tema.respuesta;
            }

        }

    }

    return "No dispongo de información validada para responder esa consulta. Te recomiendo consultar una fuente oficial de turismo o formular una pregunta sobre atractivos, senderos, actividades o servicios turísticos de El Cocuy.";
}


/* Procesar pregunta */

function enviarPregunta() {

    const pregunta = preguntaUsuario.value.trim();

    if (pregunta === "") {
        return;
    }

    agregarMensaje(pregunta, "usuario");

    const inicio = performance.now();

    const respuesta = obtenerRespuesta(pregunta);

    const fin = performance.now();

    const tiempoRespuesta = fin - inicio;

    const registro = {
    consulta: pregunta,
    respuesta: respuesta,
    tiempoRespuesta: tiempoRespuesta.toFixed(2) + " ms",
    fecha: new Date().toLocaleString(),
    resultado: "Ejecutada"
};

registrosPrueba.push(registro);

console.log("Registro de prueba:", registro);
console.log("Historial de pruebas:", registrosPrueba);

    agregarMensaje(
        respuesta +
        "<br><small>Tiempo de respuesta: " +
        tiempoRespuesta.toFixed(2) +
        " ms</small>",
        "bot"
    );

    console.log(
        "Tiempo de respuesta:",
        tiempoRespuesta.toFixed(2),
        "ms"
    );

    preguntaUsuario.value = "";

    preguntaUsuario.focus();
}


/* Botón Enviar */

btnEnviar.addEventListener("click", enviarPregunta);


/* También permite enviar con Enter */

preguntaUsuario.addEventListener("keydown", function(evento) {

    if (evento.key === "Enter") {
        enviarPregunta();
    }

});