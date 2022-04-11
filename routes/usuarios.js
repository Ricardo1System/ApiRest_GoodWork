const express=require('express');
const Usuario=require('../models/usuarios_models');
const ruta=express.Router();

ruta.get('/',(req, res) => {
    let resultado= listarUsuarios();
    resultado.then(usuarios=>{
        res.json(usuarios)
    }).catch(err=>{
        res.status(400).json({
            error:err
        })
    })
    });

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
    Usuario.findOne({email:body.email}, (err,user) => {
        if(err){
            return res.status(400).json({error:"server-error"});
        }
        if(user){
            return res.status(400).json({
                msg:"El usuario ya existe"
            });
        }
    });

    let resultado= crearUsuario(body);
    const emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

    if(emailRegex.test(req.body.email)){
    resultado.then(user=>{
        res.json({
            nombre:user.nombre,
            email :user.email,
        })
    }).catch(err=>{
        res.status(400).json({
            error:err
        })
    });}else { res.status(400).send('EL CORREO NO CUMPLE CON LOS CARACTERES')}
});

ruta.put('/:email', (req,res)=>{

    let resultado= actualizarUsuario(req.params.email, req.body);
    resultado.then(valor=>{
        res.json({
            nombre:valor.nombre,
            email :valor.email,
        })
    }).catch(err=>{
        res.status(400).json({
            error:err
        })
    })
})

ruta.delete('/:email',(req,res)=>{
    let resultado= desactivarUsuario(req.params.email);
    resultado.then(valor=>{
        res.json({
            nombre:valor.nombre,
            email:valor.email,
        })
    }).catch(err=>{
        res.status(400).json({
            error:err
        })
    });
});




async function listarUsuarios(){
    let usuarios= await Usuario.find({estado:true})
    .select({nombre:1,email:1});
    return usuarios
}


async function crearUsuario(body){
    let usuario = new Usuario({
        email: body.email,
        nombre: body.nombre,
        password: body.password,
    });
    return await usuario.save();
}


async function actualizarUsuario(email,body){
    let usuario =await Usuario.findOneAndUpdate({email:email}, {
        $set:{
            nombre: body.nombre,
            password: body.password
        }
    },{new : true});
    return usuario;
}


async function desactivarUsuario(email){
    let usuario=await Usuario.findOneAndUpdate({email:email},{
        $set:{
            estado:false
        }
    },{new:true});
    return usuario;
}


module.exports=ruta;

