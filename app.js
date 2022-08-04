const express = require('express');
const app = express();
const studentRoute = require('./api/routes/student')
const userRoute = require('./api/routes/user')

const mongoose = require('mongoose');
const bodyParser = require('body-parser');

mongoose.connect('mongodb+srv://sudip_user:user@sidcluster.gjnadsl.mongodb.net/?retryWrites=true&w=majority');

mongoose.connection.on('error',err=>{
    console.log('db connection failed');
});

mongoose.connection.on('connected',connected=>{
    console.log('db connection successful');
})

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use('/student',studentRoute)
app.use('/user',userRoute)


app.use((req,res,next)=> {
    // res.status(200).json({
    //     message:'app is running.'
    // })
    res.status(404).json({
        error:'bad request'
    })
})

module.exports = app;