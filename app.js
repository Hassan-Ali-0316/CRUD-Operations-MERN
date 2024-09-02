const express = require('express');
const path = require('path'); 
const app = express();
const userModel = require('./models/user');
//const user = require('./models/user');

app.set('view engine','ejs');
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,'public')));


app.get('/',function(req,res){
    res.render("index");
})

app.post('/create',async function(req,res){
    let {name,email,image} = req.body;
    let cuser = await userModel.create({
        name:name,
        email:email,
        image:image
    })
    res.redirect('/read');
})
app.get('/read', async function(req, res) {
    let us = await userModel.find();
    console.log('Fetched users:', us); // Add this line to debug
    res.render("read", {us});
});

app.get('/update/:id',async function(req,res){
    let us = await userModel.findOne({_id: req.params.id});
    res.render('update',{us});
})
app.post('/update/:id',async function(req,res){
    let {name,email,image} = req.body;
    let uuser = await userModel.findOneAndUpdate({_id: req.params.id},{name,email,image},{new:true});
    res.redirect('/read');
})
app.get('/delete/:id',async function(req,res){
    let duser = await userModel.findOneAndDelete({_id: req.params.id});
    res.redirect("/read");
})

app.listen('3000', () => {
    console.log('Server is running on port 3000');
});