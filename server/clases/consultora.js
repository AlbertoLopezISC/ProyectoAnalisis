const Producto = require('./producto');
const modelDatos = require('../modelo');
const Conexion = require('./conexion');
const Vendedora = require('./vendedora');

module.exports = class Consultora extends Vendedora {
    conex = new Conexion();
    
    constructor(id, nombre, correo, ventas, productosDisponibles){
        super(id, nombre, correo, ventas, productosDisponibles);
    }

    getDatos(){
        return super.getDatos();
    }

    modificarProducto(producto){
        this.conex.actualizarProducto(producto);
    }

}