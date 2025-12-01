
const express = require('express');
const app = express();

const path = require('path');

const userModel = require("./models/User")
app.set("view engine","ejs");
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,"public")));

app.get("/",(req,res)=>{
    res.render("index")
});

app.get("/read", async (req,res)=>{
    const Users = await userModel.find()
    res.render("read",{Users})
})

app.post("/update/:userid", async (req,res)=>{
     await userModel.findOneAndUpdate({_id:req.params.userid},{name:req.body.Name,email:req.body.Email,image:req.body.Image},{new:true})
    res.redirect("/read")
})

app.get("/delete/:userid", async (req,res)=>{
    const Users = await userModel.findOneAndDelete({_id:req.params.userid})
    res.redirect("/read")
})


app.get("/edit/:userid", async (req,res)=>{
    const editUser = await userModel.findOne({_id:req.params.userid})
    res.render("edit",{editUser})
})


app.post("/create",async(req,res)=>{
     const create = await userModel.create({
        
        name:req.body.Name,
        email:req.body.Email,
        image:req.body.Image
     })
    res.redirect("/read")
})

app.listen(3000);