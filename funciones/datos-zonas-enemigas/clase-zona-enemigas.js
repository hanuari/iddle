class ZonaEnemigaBase {
    constructor(data) {
        this.tipo = data.tipo || "desconocida"
        this.id_zonaEnemiga = data.id_zonaEnemiga;
        this.radio_ataque = data.radio_ataque || 1;
        this.nombre = data.nombre;
        this.enemigosPosibles = data.enemigosPosibles || [];
        this.grid = data.grid || { col: null, fila: null };
        this.imagen = data.imagen || null;
    }


}

class ZonaAgua extends ZonaEnemigaBase {
    constructor(data) {
        super(data);
    }


}

class ZonaBosque extends ZonaEnemigaBase {
    constructor(data) {
        super(data);
    }


}



class ZonaEnemigaFactory {
    static crearZonaEnemiga(arrayPersonaje) {
        return arrayPersonaje.map(data => {
            switch (data.tipo.toLowerCase()) {
                case "agua":
                    return new ZonaEnemigaBase(data);
                case "bosque":
                    return new ZonaBosque(data);
                default:
                    return new ZonaEnemigaBase(data);
            }
        });
    }
}


const zonasEnemigos = [
    {
        tipo: "bosque",
        id_zonaEnemiga: 1,
        radio_ataque: 1,
        nombre: "Picuchillos",
        enemigosPosibles: [
            {
                id_enemigo: 1,
                probabilidadEnemigo: 40,
            },
            {
                id_enemigo: 2,
                probabilidadEnemigo: 20,
            }
        ],
        grid: { col: null, fila: null },
        imagen: "src/img/mapa_personajes/icono_enemigo.png",
    },

    {
        tipo: "agua",
        id_zonaEnemiga: 2,
        radio_ataque: 1,
        nombre: "blue",
        enemigosPosibles: [
            {
                id_enemigo: 1,
                probabilidadEnemigo: 60,
            },
            {
                id_enemigo: 2,
                probabilidadEnemigo: 20,
            }
        ],
        grid: { col: null, fila: null },
        imagen: "src/img/mapa_personajes/icono_enemigo.png",
    }
]



export const cantidadZona = ZonaEnemigaFactory.crearZonaEnemiga(zonasEnemigos);

