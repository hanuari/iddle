
import { trabajarMapa, botonElegidoMapa, seleccionarGrupoEnMenu } from "./mapa-engranaje.js";


document.addEventListener("click", (evento) => {
    const boton = evento.target.closest(".tarjeta-mapa.tarjeta-ubicaciones");

    if (!boton) return;
    trabajarMapa(boton)

});


document.addEventListener("click", (evento) => {
    const elegir = evento.target.closest(".btn-mover-personaje")

    if (!elegir) { return }
    const boton = elegir.dataset.id

    if (!boton) { return }
    botonElegidoMapa(boton)

})

document.addEventListener("click", (e) => {
    if (e.target.closest(".lista-caras-mapa-boton")) {
        const idcompleta = e.target.id
        const idGrupo = Number(idcompleta.split("-")[2])
        seleccionarGrupoEnMenu(idGrupo)
    }
})

