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


ruta.post('/',(req,res) => {

    if(!req.body.nombre || req.body.nombre.length <= 3){
        res.status(400).send('DEBES INGRESAR UN NOMBRE QUE TENGA MINIMO 4 LETRAS');
        return;
    }else if(!req.body.email ){
        res.status(400).send('CORREO ELECTRONICO INVALIDO')
        return;
    }else if(!req.body.password || req.body.password.length <=8){
        res.status(400).send('CONTRASEÑA INVALIDA')
        return;
    }

    let body=req.body;
    let resultado= crearEmpresa(body);
    const emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

    if(emailRegex.test(req.body.email)){
    resultado.then(empre=>{
        res.json({
            valor:empre
        })
    }).catch(err=>{
        res.status(400).json({
            error:err
        })
    });}else { res.status(400).send('EL CORREO NO CUMPLE CON LOS CARACTERES')}
});

ruta.put('/:email',(req,res)=>{
    let resultado=actualizarEmpresa(req.params.email, req.body)
    resultado.then(valor=>{
        res.json({
            valor:valor
        })
    }).catch(err=>{
        res.status(400).json({
            error:err
        })
    })
})

ruta.delete('/:email',(req,res)=>{
    let resultado= desactivarEmpresa(req.params.email);
    resultado.then(valor=>{
        res.json({
            usuario:valor
        })
    }).catch(err=>{
        res.status(400).json({
            error:err
        })
    });
});






async function crearEmpresa(body){
    let empresa =new Empresa({
        email:body.email,
        password:body.password,
        nombre:body.nombre,
        ubicacion:body.ubicacion,
        contacto:body.contacto,

    });
    return await empresa.save();
}

async function listarEmpresa(){
    let empresas=await Empresa.find({estado:true})
    .select({nombre:1,email:1});
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

async function desactivarEmpresa(email){
    let empresa = await Empresa.findOneAndUpdate({email:email},{
        $set:{
            estado:false
        }
    },{new:true})
    return empresa
}

module.exports=ruta;