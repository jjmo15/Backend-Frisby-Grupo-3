const ServicePostgres = require('../services/postgres');

const _servicePg = new ServicePostgres()

const getOffer = async(request,response)=>{
    const sql = 'SELECT * FROM ofertas'
    let responseDB = await _servicePg.execute(sql);
    let rowCount = response.rowCount;
    let rows = responseDB.rows
    let responseJSON = {}
    responseJSON.ok = true
    responseJSON.message ='Ofertas en base de datos son:'
    responseJSON.info = rows
    responseJSON.metainfo = {total : rowCount}
    response.send(responseJSON);
    
};
const saveOffer = async(request,response)=>{
    
    let sql = " INSERT INTO public.ofertas(id,nombre,ciudad,requisitos,descripcion,cargo)";
       sql += "VALUES ($1,$2,$3,$4,$5,$6);";

    let body = request.body;
    let values =[body.id,body.nombre,body.ciudad,body.requisitos,body.descripcion,body.cargo]
    
    let responseDB = await _servicePg.execute(sql,values);
    let rowCount = response.rowCount;
    let rows = responseDB.rows;
    let responseJSON ={};
    responseJSON.ok = true
    responseJSON.message ='Oferta creada correctamente'
    responseJSON.info = body;
    response.send(responseJSON);

};
const updateOffer = async(request,response)  =>{
    let id =request.params.id;
    let sql = " UPDATE public.ofertas SET nombre=$1,ciudad=$2,requisitos=$3,descripcion=$4,cargo=$5 WHERE id=$6;";
    let body = request.body;
    let values =[body.nombre,body.ciudad,body.requisitos,body.descripcion,body.cargo,id]
 
 let responseDB = await _servicePg.execute(sql,values);
 let rowCount = response.rowCount;
 let rows = responseDB.rows;
 let responseJSON ={};
 responseJSON.ok = true
 responseJSON.message ='Oferta Actualizada '
 responseJSON.info = body;
 response.send(responseJSON);
  
};
const deleteOffer = async(request,response) =>{
    const sql = 'DELETE FROM ofertas WHERE id=$1';
    let id =request.params.id;
    let responseDB = await _servicePg.execute(sql,[id]);
    let rowCount = responseDB.rowCount;
    
    let responseJSON = {}
    responseJSON.ok = true
    responseJSON.message ='Oferta Eliminada'
    responseJSON.info = [];
    responseJSON.metainfo = {total : rowCount}
    response.send(responseJSON);
    
};

module.exports = {getOffer,saveOffer,updateOffer,deleteOffer};