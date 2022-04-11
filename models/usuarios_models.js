const mongoose=require('mongoose');

const usuarioSchema = new mongoose.Schema({
    email:{
        type:String,
        require:true,
    },
    password:{
        type:String,
        require:true
    },
    estado:{
        type:Boolean,
        default:true
    },
    tipoUser:{
        type:Number
    },
    nombre:{
        type:String,
        require:true
    },
    ubicacion:{
        type:String,
    },
    descripcion:{
        type:String,
    },
    sexo:{
        type:Number,
    },
    contacto:{
        type:String
    },
    estudios:{
        type:String
    },
    aspiraciones:{
        type:String
    },
    software:{
        type:String
    },
    portaEvidencias:{
        proyecto:{
            type:String,
            //require:true
        },
        img:{
            type:String,
            //require:true
        },
        descripcion:{
            type:String,
           // require:true
        },
        evidencias:{
            descripcion:{
                type:String,
            },
            img:{
                type:String
            }
        },
    },
    exp:{
        trabajo:{
            type:String,
            //require:true
        },
        tiempo:{
            type:String,
            //require:true
        },
        opinion:{
            type:String,
            //require:true
        },
        cartaReco:{
            type:String,
            //require:true
        }
    }
});

module.exports=(mongoose.model('Usuario',usuarioSchema));