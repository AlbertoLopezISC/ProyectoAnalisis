module.exports = class Vendedora {
    nombre = new String;
    id = new String;
    correo = new String;
    ventas = new Number;
    productosDisponibles = [];
    constructor(id, nombre, correo, ventas, productosDisponibles) {
        this.id = id;
        this.nombre = nombre;
        this.correo = correo;
        this.ventas = ventas;
        this.productosDisponibles = productosDisponibles;
    }

    getDatos(){
        return {
            nombre: this.nombre,
            apellido: this.apellido,
            correo: this.correo,
            ventas: this.ventas,
            productosDisponibles: this.productosDisponibles
        }
    }
}