const express = require('express');
const path = require('path'); 
const app = express();
const userModel = require('./models/user');
const user = require('./models/user');

app.set('view engine','ejs');
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,'public')));


app.get('/',function(req,res){
    res.render("index");
})
app.get('/read',async function(req,res){
    let rusers = await userModel.find();
    res.render("read",{users:rusers});
})

app.post('/create',async function(req,res){
    let {name,email,image} = req.body;
    let cuser = await userModel.create({
        name:name,
        email:email,
        image:image
    })
    res.render('/read');
})
app.get('/delete/:id',async function(req,res){
    let duser = await userModel.findOneAndDelete({_id: req.params.id});
    res.redirect("/read");
})

app.listen('3000');