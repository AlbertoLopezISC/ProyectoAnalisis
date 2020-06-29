const express = require('express');
const router = express.Router();
const ctrlDatos = require('../controlador');


router.get('/api', ctrlDatos.api);

router.get('/api2/:id', ctrlDatos.api2);

router.post('/modificarProducto', ctrlDatos.modificarProducto);

router.post('/altaProducto', ctrlDatos.altaProducto);

router.post('/bajaProducto', ctrlDatos.bajaProducto);

router.post('/altaVendedora',ctrlDatos.altaVendedora);

router.post('/bajaVendedora', ctrlDatos.bajaVendedora);

router.get('/todo',ctrlDatos.todo);

router.post('/altaCliente', ctrlDatos.altaCliente);

router.post('/setCompras', ctrlDatos.setCompras);

router.post('/getCompras', ctrlDatos.getCompras);

router.post('/cambiaEstado', ctrlDatos.cambiaEstado);

router.post('/setEnvio', ctrlDatos.setEnvio);

router.post('/getEnviosPendientes', ctrlDatos.getEnviosPendientes);

router.post('/getProducto', ctrlDatos.getProducto);

router.post('/deleteVentaPendiente', ctrlDatos.deleteVentaPendiente);

module.exports = router;