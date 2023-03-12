const express=require('express');
const app=express();
const dotenv=require('dotenv');
dotenv.config();
const port=process.env.PORT || 3000;
const mongoose=require('mongoose');
const URI=process.env.URI;
app.use(express.json());


app.use('/',require('./routes/url'));
app.get('/',(req,res)=>{
    res.json({
        message : "Welcome to URL Shortner"
    });
});



mongoose.set("strictQuery", false);
mongoose.connect(URI);
mongoose.connection.on('connected',()=>{
    app.listen(port, () => {
        console.log("Server is connected to mongoDB and running on port " + port);
      });    
});
mongoose.connection.on('error',(err)=>{
    console.log(err.message);
});


