import { } from "./grupo-logica.js"


export function renderizarGrupoEnUI(grupo) {
    const contenedorGrupo = document.getElementById('vista-grupo');

    const htmlCaras = grupo.datosMiembros.map(personaje =>
        `
        <div class="tarjeta-miembro">
            <img src="${personaje.avatar}" alt="${personaje.nombre}" class="cara-personaje" />
        </div>
    `).join('');

    contenedorGrupo.innerHTML += `
        <h3>${grupo.nombre}</h3>
        <div class="lista-caras">
            ${htmlCaras}
            <button class="btn-gestionar" data-grupo-accion="gestionar" data-grupo-id="${grupo.id_grupo}">Gestionar</button>
            <button class="btn-gestionar" data-grupo-accion="elegir" data-grupo-id="${grupo.id_grupo}">Elegir</button>
        </div>
    `;
}