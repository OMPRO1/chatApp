const express = require('express');
const path = require('path');
const app = express();
const mongoose = require('mongoose');
const { error } = require('console');
const PORT = 3000;
const Chat = require("./models/chat.js");
let methodOverride = require('method-override')



app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,"public")));
app.use(methodOverride("_method"));

app.listen(PORT, () => {
    console.log(`App is listening on ${PORT}`);
});

async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/fakewhatsapp");
}


main()
.then((res) => {
    console.log("connection successful");
})
.catch((err) => {
    console.log(err);
});

app.get("/", (req,res) => {
    res.send("Root Working");
});

app.get("/chats",async (req,res) => {
    let chats = await Chat.find();

    res.render("index.ejs",{chats});
});

app.get("/chats/new",(req,res) => {
    res.render("new.ejs");
});

app.post("/chats" , (req,res) => {
    let {from,msg,to} = req.body;
    let chat1 = new Chat({
        from:from,
        msg:msg,
        to:to,
        created_at:new Date(),
    });
    chat1.save();
    res.redirect("/chats");
});

app.get("/chats/:id/edit" , async (req,res) => {
    let {id} = req.params;
    let chat = await Chat.findById(id);
    res.render("edit.ejs",{chat});
});


app.put("/chats/:id",async (req,res) => {
    let {id} = req.params;
    let oldchat = Chat.findById(id);
    let {msg : newChat} = req.body; 
    let updatedChat = await Chat.findByIdAndUpdate(id,{msg : newChat}, {new:true});
    console.log(updatedChat);

    res.redirect("/chats");

});

app.delete("/chats/:id", async (req,res) => {
    let {id} = req.params;
    let deletechat = await Chat.findByIdAndDelete(id);
    console.log(deletechat);
    res.redirect("/chats");
});

app.use((err,req,res,next) => {
    let {status=500,message= "Some Error"} = err;

    res.status(status).send(message);
});