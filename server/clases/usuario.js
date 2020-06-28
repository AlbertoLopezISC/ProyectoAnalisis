module.exports = class Cliente {
    usuario = new String;
    correo = new String;
    uid = new String;
    compras = [];
    constructor(uid, usuario, correo, compras){
        this.correo = correo;
        this.usuario = usuario;
        this.uid = uid;
        this.compras = compras;
    }

}