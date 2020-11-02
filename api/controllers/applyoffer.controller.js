const ServicePostgres = require('../services/postgres');

const _servicePg = new ServicePostgres()

const getApplyOffer = async(request,response)=>{
    try{
    const sql = 'SELECT * FROM aplicar_ofertas'
    let responseDB = await _servicePg.execute(sql);
    let rowCount = response.rowCount;
    let rows = responseDB.rows
    let responseJSON = {}
    responseJSON.ok = true
    responseJSON.message ='Ofertas que se han aplicado:'
    responseJSON.info = rows
    responseJSON.metainfo = {total : rowCount}
    response.send(responseJSON);
    }catch(error){

        console.log(error);
        let responseJSON={}
        responseJSON.ok=false
        responseJSON.message ="Error al aplicar a ofertas";
        responseJSON.info =error
        response.status(400).send(responseJSON);
    } 
};
const saveApplyOffer = async(request,response)=>{
    try{
    let sql = " INSERT INTO public.aplicar_ofertas(id,usuario,oferta)";
       sql += "VALUES ($1,$2,$3);";

    let body = request.body;
    let values =[body.id,body.usuario,body.oferta]
    
    let responseDB = await _servicePg.execute(sql,values);
    let rowCount = response.rowCount;
    let rows = responseDB.rows;
    let responseJSON ={};
    responseJSON.ok = true
    responseJSON.message ='Oferta aplicada '
    responseJSON.info = body;
    response.send(responseJSON);
    }catch(error){

        console.log(error);
        let responseJSON={}
        responseJSON.ok=false
        responseJSON.message ="Error al guardar el requerimiento";
        responseJSON.info =error
        response.status(400).send(responseJSON);
    }
};
const updateApplyOffer = async(request,response)  =>{
    try{
    let id =request.params.id;
    let sql = " UPDATE public.aplicar_ofertas SET usuario=$1,oferta=$2 WHERE id=$3;";
    let body = request.body;
    let values =[body.usuario,body.oferta,id]
 
 let responseDB = await _servicePg.execute(sql,values);
 let rowCount = response.rowCount;
 let rows = responseDB.rows;
 let responseJSON ={};
 responseJSON.ok = true
 responseJSON.message ='Aplicacion Actualizada '
 responseJSON.info = body;
 response.send(responseJSON);
    }catch(error){

        console.log(error);
        let responseJSON={}
        responseJSON.ok=false
        responseJSON.message ="Error al actualizar";
        responseJSON.info =error
        response.status(400).send(responseJSON);
    }
};
const deleteApplyOffer = async(request,response) =>{
    try{
    const sql = 'DELETE FROM aplicar_ofertas WHERE id=$1';
    let id =request.params.id;
    let responseDB = await _servicePg.execute(sql,[id]);
    let rowCount = responseDB.rowCount;
    
    let responseJSON = {}
    responseJSON.ok = true
    responseJSON.message ='Aplicacion de Oferta Eliminada'
    responseJSON.info = [];
    responseJSON.metainfo = {total : rowCount}
    response.send(responseJSON);
    }catch(error){

        console.log(error);
        let responseJSON={}
        responseJSON.ok=false
        responseJSON.message ="Error al Eliminar";
        responseJSON.info =error
        response.status(400).send(responseJSON);
    }
};

module.exports = {getApplyOffer,saveApplyOffer,updateApplyOffer,deleteApplyOffer};