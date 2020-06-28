const Vendedora = require('./vendedora');

module.exports = class Directora extends Vendedora {
    vendedoras = []
    constructor(id, nombre, correo, ventas, productosDisponibles) {
        super(id,nombre,correo,ventas, productosDisponibles);
        this.vendedoras = [];
    }

    getDatos(){
      return super.getDatos();
    }

    
}