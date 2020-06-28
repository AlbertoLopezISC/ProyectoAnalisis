const firebase = require('firebase');
const firebaseConfig = {
    apiKey: "AIzaSyBkRw4G5HvvRUBYB4jMvpRTDNKkN_jAwYI",
    authDomain: "thefeeuaa.firebaseapp.com",
    databaseURL: "https://thefeeuaa.firebaseio.com",
    projectId: "thefeeuaa",
    storageBucket: "thefeeuaa.appspot.com",
    messagingSenderId: "178469236768",
    appId: "1:178469236768:web:67a178f56a6f5476dc0c45",
    measurementId: "G-DZFYYRZ6Z1"
};
firebase.initializeApp(firebaseConfig);
require('firebase/database');

const Producto = require('./producto');

module.exports = class Conexion {
    constructor(){}

    actualizarProducto(tipo, consultora, producto){
        var newData = {
            precio: producto.precio,
            categoria: producto.categoria,
            existencia: producto.existencia
        }
        var updates = {};
        if(tipo == 'consultora'){
            updates['/Analisis/vendedoras/consultoras/' + consultora + '/productoDisponibles/' + producto.categoria + '/' + producto.nombre ] = newData;
        } else {
            updates['/Analisis/vendedoras/directoras/' + consultora + '/productoDisponibles/' + producto.categoria + '/' + producto.nombre ] = newData;
        }

        return new Promise((resolve, reject) => {
                           
            firebase.database().ref().update(updates).then(() => {
                console.log('entro a acuralizar el producto');
                resolve({success: true})
            })
            .catch((err) => {
                reject({success: false, error: err});
            });
        });       
    }

    getDatosVendedora(tipo, vendedora){
        var ref;
        if(tipo == 'consultora'){
            ref = firebase.database().ref('/Analisis/vendedoras/consultoras/'+vendedora)
        } else {
            ref = firebase.database().ref('/Analisis/vendedoras/directoras/'+vendedora)
        }
        return new Promise((resolve, reject) => {
            ref.once('value').then((data) => {
                if(data.exists()){
                    resolve(data.val())
                }
            }).catch((err) => {
                console.log(err);
                reject(err);
            });
        });       
    }

    altaProducto(tipo, consultora, producto){
        var ref;
        if(tipo == 'consultora'){
            ref = firebase.database().ref('/Analisis/vendedoras/consultoras/'+ consultora + '/productoDisponibles/' + producto.categoria + '/' + producto.nombre)
        } else {
            ref = firebase.database().ref('/Analisis/vendedoras/directoras/'+ consultora + '/productoDisponibles/' + producto.categoria + '/' + producto.nombre)
        }
        return new Promise((resolve, reject) => {
            ref.set({
                existencia: producto.existencia,
                precio: producto.precio,
                categoria: producto.categoria
            }).then(() => {
                resolve({success: true});
            }).catch((err) => {
                reject({success: false, error: err});
            })
        })
    }

    bajaProducto(tipo, consultora, producto){
        var updates = {};
        var newData = null;
        if(tipo == 'consultora'){
            updates['/Analisis/vendedoras/consultoras/'+ consultora + '/productoDisponibles/' + producto.categoria + '/' + producto.nombre ] = newData;
        } else {
            updates['/Analisis/vendedoras/directoras/'+ consultora + '/productoDisponibles/' + producto.categoria + '/' + producto.nombre ] = newData;
        }
        return new Promise((resolve, reject) => {
            console.log(consultora);
            
            firebase.database().ref().update(updates).then(() => {
                resolve({success: true})
            })
            .catch((err) => {
                reject({success: false, error: err});
            });
        });
    }

    getDatosProducto(tipo, consultora, nombre,categoria){
        var ref;
        if(tipo == 'consultora'){
            ref = firebase.database().ref(`Analisis/vendedoras/consultoras/${consultora}/productoDisponibles/${categoria}/${nombre}`)
        } else {
            ref = firebase.database().ref(`Analisis/vendedoras/directoras/${consultora}/productoDisponibles/${categoria}/${nombre}`)
        }
        return new Promise((resolve, reject) => {
            ref.once('value')
            .then((data) => {
                if(data.exists()){
                    resolve(data.val())
                }
            }).catch((err) => {
                reject(err);
            })
        });
    }

    altaVendedora(tipo, idDirectora, vendedora){
        var ref;
        if(tipo == 'consultora'){
            console.log(vendedora.id);
            ref = firebase.database().ref(`Analisis/vendedoras/consultoras/${vendedora.id}/`);
            return new Promise((resolve, reject) => {
                ref.set({
                    nombre: vendedora.nombre,
                    correo: vendedora.correo,
                    ventas: vendedora.ventas
                }).then(() => {
                    firebase.database().ref(`Analisis/vendedoras/directoras/${idDirectora}/vendAs/${vendedora.id}`)
                    .set({
                        id: vendedora.id
                    }).then(() => {
                        resolve({success: true});
                    }).catch((err) => {
                        reject({success: false, error: err});
                    })
                }).catch((err) => {
                    reject({success: false, error: err});
                });
            });
        } else {
            ref = firebase.database().ref(`Analisis/vendedoras/directoras/${vendedora.id}`);
            return new Promise((resolve, reject) => {
                ref.set({
                    nombre: vendedora.nombre,
                    correo: vendedora.correo,
                    ventas: vendedora.ventas
                }).then(() => {
                    resolve({success: true});
                }).catch(() => {
                    reject({success: false, error: err});
                });
            })
        }

    }

    bajaVendedora(tipo, idDirectora, idConsultora){
        var updates = {};
        var newData = null;
        if(tipo == 'consultora'){
            updates['/Analisis/vendedoras/consultoras/'+ idConsultora] = newData;
            return new Promise((resolve, reject) => {
                firebase.database().ref().update(updates).then(() => {
                    updates[`/Analisis/vendedoras/directoras/${idDirectora}/vendAs/${idConsultora}`] = newData;
                    firebase.database().ref().update(updates).then(() => {
                        resolve({success: true});
                    });
                })
                .catch((err) => {
                    reject({success: false, error: err});
                });
            });
        } else {
            updates[`/Analisis/vendedoras/directoras/${idDirectora}`] = newData;
            return new Promise((resolve, reject) => {
                firebase.database().ref().update(updates).then(() => {
                    resolve({success: true});
                }).catch((err) => {
                    reject({success: false, error: err});
                });
            })
        }
    }

    todo(){
        return new Promise((resolve, reject) => {
            firebase.database().ref(`Analisis/`).once('value').then((data) => {
                resolve({success: true, data: data.val()});
            }).catch((err) => {
                reject({success: false, error: err});
            })
        })
    }

    altaCliente(cliente){
        return new Promise((resolve, reject) => {
            firebase.database().ref(`Analisis/clientes/${cliente.uid}`).set({
                usuario: cliente.usuario,
                correo: cliente.correo
            }).then(() => {
                resolve({success: true});
            }).catch((err) => {
                resolve({success: false, error: err});
            })
        })
    }

    setCompras(uid, productos, idCompra){
        return new Promise((resolve, reject) => {
            firebase.database().ref(`Analisis/clientes/${uid}/compras/${idCompra}/`).set({
                estatus: 'Sin Pagar',
                compra: productos
            }).then(() => {
                resolve({success: true});
            }).catch((err) => {
                reject({success: false, error: err});
            });
        });
    }

    getCompras(uid){
        return new Promise((resolve, reject) => {
            firebase.database().ref(`Analisis/clientes/${uid}/compras`).once('value').then((data) => {
                console.log(data.val());
                resolve({success: true, data: data.val()});
            }).catch((err) => {
                reject({success: false, error: err});
            });
        });
    }

    cambiaEstado(uid,estado,idCompra){
        return new Promise((resolve, reject) => {
            var updates = {};
            var newData = estado;
            updates[`Analisis/clientes/${uid}/compras/${idCompra}/estatus`] = newData;
            firebase.database().ref().update(updates).then(() => {
                resolve({success: true});
            }).catch((err) => {
                reject({success: false, error: err});
            });
        });
    }
}