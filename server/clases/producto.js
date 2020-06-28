module.exports = class Producto {
    nombre = new String;
    categoria = new String;
    precio = new Number;
    existencia = new Number;
    constructor(nombre, categoria, precio, existencia) {
        this.nombre = nombre;
        this.categoria = categoria;
        this.precio = precio;
        this.existencia = existencia;
    }

    getDatos() {
        datos = {
            nombre: this.nombre,
            categoria: this.categoria,
            precio: this.precio,
            existencia: this.existencia
        }
        return datos;
    }
}

