const axios = require('axios');

const modelDatos = {
    getEstado: async (estado) => {
        return await axios.get('https://thefeeuaa.firebaseio.com/Analisis.json')
            .then(data => {
                return data;
            })
            .catch(err => { console.log(err); return err });
    },


    getMunicipios: async (id) => {
        return await axios.get('https://gaia.inegi.org.mx/wscatgeo/mgee/' + id)
            .then(data => {
                let auxNombre = data.data.datos.nom_agee;
                return axios.get('https://gaia.inegi.org.mx/wscatgeo/mgem/' + id)
                    .then(data => {
                        data.data.estado = auxNombre;
                        return data;
                    })
                    .catch(err => { console.log(err); return err });
            })
            .catch(err => { console.log(err); return err });
    },

    actualizarProducto: async (url) => {
        return await axios.catch(url)
        .then(data => {
            return data;
        })
        .catch((err) => {
            console.log(err);
            return err;
        });
    }
}

module.exports = modelDatos;