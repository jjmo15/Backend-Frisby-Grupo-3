const ServicePostgres = require('../services/postgres');

const _servicePg = new ServicePostgres()

const getUsers =async (request,response)=>{

    const sql = 'SELECT * FROM usuarios'
    let responseDB = await _servicePg.execute(sql);
    let rowCount = response.rowCount;
    let rows = responseDB.rows
    let responseJSON = {}
    responseJSON.ok = true
    responseJSON.message ='Usuarios mostrados son:'
    responseJSON.info = rows
    responseJSON.metainfo = {total : rowCount}
    response.send(responseJSON);
};
const saveUsers = async(request,response)=>{
    
    let sql = " INSERT INTO public.usuarios(identificacion, nombre, apellido, correo, telefono, clave, ciudad, descripcion, direccion, hoja_de_vida)";
       sql += "VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10);";

    let body = request.body;
    let values =[body.identificacion,body.nombre,body.apellido,body.correo,body.telefono,body.clave,body.ciudad,body.descripcion,body.direccion,body.hoja_de_vida];
    
    let responseDB = await _servicePg.execute(sql,values);
    let rowCount = response.rowCount;
    let rows = responseDB.rows;
    let responseJSON ={};
    responseJSON.ok = true
    responseJSON.message ='Usuario Creado'
    responseJSON.info = body;
    response.send(responseJSON);

};
const updateUsers = async(request,response)  =>{
    let identificacion =request.params.identificacion;
    let sql = "UPDATE public.usuarios SET nombre=$1,apellido=$2,correo=$3,telefono=$4,ciudad=$5,descripcion=$6,direccion=$7 WHERE identificacion=$8;";
    let body = request.body;
    let values =[body.nombre,body.apellido,body.correo,body.telefono,body.ciudad,body.descripcion,body.direccion,identificacion]
 
 let responseDB = await _servicePg.execute(sql,values);
 let rowCount = response.rowCount;
 let rows = responseDB.rows;
 let responseJSON ={};
 responseJSON.ok = true
 responseJSON.message ='Usuario Actualizado '
 responseJSON.info = body;
 response.send(responseJSON);
  
};
const deleteUsers = async(request,response) =>{
    const sql = 'DELETE FROM usuarios WHERE identificacion=$1';
    let identificacion =request.params.identificacion;
    let responseDB = await _servicePg.execute(sql,[identificacion]);
    let rowCount = responseDB.rowCount;
    
    let responseJSON = {}
    responseJSON.ok = true
    responseJSON.message ='Usuario Eliminado'
    responseJSON.info = [];
    responseJSON.metainfo = {total : rowCount}
    response.send(responseJSON);
    
};

module.exports = {getUsers,saveUsers,updateUsers,deleteUsers};