const usuarios=require('./routes/usuarios');
const empresas=require('./routes/empresas');
const express=require('express');
const mongoose=require('mongoose');

//Conectar a la BD
mongoose.connect('mongodb://localhost:27017/GoodWork',{useNewUrlParser: true, useUnifiedTopology: true})
    .then(()=>console.log('Conectado a mongoDB'))
    .catch(()=>console.log('No se pudo conectar con mongodb', err));

const app=express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use('/api/usuarios', usuarios);
app.use('/api/empresas', empresas);

const port=process.env.PORT||3000;
app.listen(port,()=>{
    console.log('API RESTFULL oK, y ejecutandose');
})