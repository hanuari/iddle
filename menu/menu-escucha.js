import { menuJuego } from "./menu-engranaje.js";
const menu = document.querySelectorAll(".btn-tab")

menu.forEach((boton) => {
    boton.addEventListener("click", (evento) => {
        const boton = evento.currentTarget.dataset.target;
        menuJuego(boton)
    })
})

