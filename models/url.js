const mongoose=require('mongoose');
const urlSchema=new mongoose.Schema({
    shortId : {
        type : String,
        require : true,
        unique : true
    },
    redirectURL : {
        type : String,
        required : true
    },
    visiedHistory : [
        {
            timestamp : {
                type : Number
            }
        }
    ]

},{timeseries : true});

const URL=mongoose.model('URL',urlSchema);
module.exports=URL;