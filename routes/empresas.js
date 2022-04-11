const express=require('express');
const Empresa=require('../models/empresas_models');
const ruta=express.Router();

ruta.get('/',(req,res)=>{
    let resultado=listarEmpresa();
    resultado.then(empresas=>{
        res.json(empresas)
    }).catch(err=>{
        res.status(400).json({
            error:err
        })
    })
    })

ruta.post('/',(req,res)=>{
    let resultado= crearEmpresa(body);
    resultado.then(valor=>{
        valor:valor;
    }).catch(err=>{
        res.status(400).json({
            error:err
        })
    })
})







async function crearEmpresa(body){
    let empresa =new Empresa({
        email:body.email,
        password:body.password,
        nombre:body.nombre,
        ubicacion:body.ubicacion,
        contacto:body.contacto
    });
    return await empresa.save();
}

async function listarEmpresa(){
    let empresas=await Empresa.find({estado:true});
    return empresas
}

async function actualizarEmpresa(email, body){
    let empresa =await Empresa.findOneAndUpdate({email:email},{
        $set:{
            nombre:body.nombre,
            ubicacion:body.ubicacion,
            contacto:body.contacto,
            password:body.password,
        }
    },{new:true});
    return empresa;
}

async function desactivarEmpresa(email, body){
    let empresa = await Empresa.findOneAndUpdate({email:email},{
        $set:{
            estado:false
        }
    },{new:true})
    return empresa
}

module.exports=ruta;