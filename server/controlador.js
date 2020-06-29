const modelDatos = require('./modelo');
const Producto = require('./clases/producto');
const Consultora = require('./clases/consultora');
const Conexion = require('./clases/conexion');
const Directora = require('./clases/directora');
const Vendedora = require('./clases/vendedora');
const Cliente = require('./clases/usuario');
const conex = new Conexion();

const ctrlDatos = {
    api: async (req, res) => {
        const data = await modelDatos.getEstado();
        res.json(data.data); //la respuesta del servidor se genera aqui
        
    },
    api2: async (req, res) => {
        const data = await modelDatos.getMunicipios(req.params.id);
        res.json(data.data);
    },

    modificarProducto: async(req, res) => {
        const {tipo, vendedora, nombre, categoria, existencia, precio} = req.body;
        auxProducto = new Producto(nombre, categoria, precio, existencia);
        aux = await conex.getDatosVendedora(tipo, vendedora);

        auxConstulora = new Consultora(vendedora, aux.nombre, aux.correo, aux.ventas,aux.productoDisponibles);
        res.json(await conex.actualizarProducto(tipo, vendedora, auxProducto));
    },

    altaProducto: async (req, res) => {
        const {tipo, vendedora, nombre, categoria, existencia, precio} = req.body;
        aux = new Producto(nombre, categoria, precio, existencia);
        res.json(await conex.altaProducto(tipo, vendedora, aux));
    },
    bajaProducto: async (req, res) => {
        const {tipo, vendedora, categoria, nombre} = req.body;
        data = await conex.getDatosProducto(tipo, vendedora, nombre, categoria);
        auxProducto = new Producto(nombre, categoria, data.precio, data.existencia);
        res.json(await conex.bajaProducto(tipo, vendedora, auxProducto));
    },
    altaVendedora: async (req, res) => {
        const {tipo, idDirectora, idConsultora, nombre, correo} = req.body;
        console.log(`${tipo} ${idDirectora}`);
        if(tipo == 'consultoras'){
            auxAlta = new Consultora(idConsultora, nombre,correo,0,[]);
        } else {
            auxAlta = new Directora(idDirectora,nombre,correo,0,[]);
        }

        console.log(auxAlta);

        res.json(await conex.altaVendedora(tipo,idDirectora, auxAlta));

    },
    bajaVendedora: async (req, res) => {
        const {tipo, idDirectora, idConsultora} = req.body;
        res.json(await conex.bajaVendedora(tipo,idDirectora,idConsultora));
    },
    todo: async (req, res) => {
        res.json(await conex.todo());
    },
    altaCliente: async (req, res) => {
        const {uid, usuario, correo} = req.body;
        auxCliente = new Cliente(uid, usuario, correo, []);

        res.json(await conex.altaCliente(auxCliente));
    },
    setCompras: async (req, res) => {
        const { uid,idCompra, productos} = req.body;
        console.log(productos);

        res.json(await conex.setCompras(uid, productos, idCompra));
    },
    getCompras: async (req, res) => {
        const {uid} = req.body;

        res.json(await conex.getCompras(uid));
    },
    cambiaEstado: async (req, res) => {
        const {uid, estado, idCompra} = req.body;

        res.json(await conex.cambiaEstado(uid,estado, idCompra));
    },
    setEnvio: async(req,res) => {
        const {compra} = req.body;
        auxCompra = JSON.parse(compra);

        res.json(await conex.setEnvio(auxCompra));
    },
    getEnviosPendientes: async (req, res) => {
        const {id, tipo} = req.body;
       
        res.json(await conex.getEnviosPendientes(id, tipo));
    },
    getProducto: async(req, res) => {
        const{tipo, id, nombre, categoria} = req.body;

        res.json(await conex.getDatosProducto(tipo,id,nombre,categoria));
    },
    deleteVentaPendiente: async (req, res) => {
        const {tipo, idVendedora, idVenta} = req.body;

        res.json(await conex.deleteVentaPendiente(tipo, idVendedora, idVenta));
    }


}

module.exports = ctrlDatos;