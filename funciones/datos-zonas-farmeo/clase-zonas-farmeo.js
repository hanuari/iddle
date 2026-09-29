export class ZonaBase {
    constructor(datos) {

        this.tipo = datos.tipo;
        this.monstruosID = datos.monstruosID;
        this.terrenos = datos.terrenos

    }



}

class Norte extends ZonaBase {
    constructor(data) {
        super(data);
    }

}

class Andalucia extends ZonaBase {
    constructor(data) {
        super(data);
    }



}


class ZonasFarmeoFactory {
    static crear(array) {
        return array.map(data => {
            switch (data.tipo.toLowerCase()) {
                case "norte":
                    return new Norte(data);

                case "andalucia":
                    return new Andalucia(data);

                default:
                    return new ZonaBase(data);
            }
        });
    }

}

const zonasFarmeablesCreadas = [
    {
        tipo: "andalucia",
        monstruosID: [1, 2],
        terrenos: {
            bosque: {
                zonasEnemigos: [1, 2],
                recursosID: [1, 2, 12],
                fondoPantalla: "src/img/fondoPantalla/recursos/fondoPantalla_madera.png"

            },
            agua: {
                zonasEnemigos: [2],
                recursosID: [1],
                fondoPantalla: "src/img/fondoPantalla/recursos/fondoPantalla_agua.png"

            },
            montana: {
                zonasEnemigos: [],
                recursosID: [11, 12],
                fondoPantalla: "src/img/fondoPantalla/recursos/fondoPantalla_carbon.png"
            }
        }
    },
    {
        tipo: "norte",
        monstruosID: [3, 4],
        terrenos: {
            bosque: {
                zonasEnemigos: [3],
                recursosID: [3, 4, 15]
            },
            agua: {
                zonasEnemigos: [4],
                recursosID: [2]
            }
        }
    }
]


export const zonasGeneral = ZonasFarmeoFactory.crear(zonasFarmeablesCreadas);
