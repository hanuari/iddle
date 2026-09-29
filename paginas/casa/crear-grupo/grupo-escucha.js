import { elegirGrupo, gestionarGrupo } from "./grupo-engranaje.js"


document.addEventListener("click", (evento) => {
    const botonElegir = evento.target.closest(".btn-gestionar");

    if (!botonElegir) { return }
    const accion = botonElegir.dataset.grupoAccion
    const botonId = botonElegir.dataset.grupoId

    if (accion === "elegir") {
        elegirGrupo(botonId)
    }

    if (accion === "gestionar") {
        gestionarGrupo(botonId)
    }


})
