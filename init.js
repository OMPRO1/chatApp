const mongoose = require('mongoose');
const Chat = require("./models/chat.js");

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

let allChats = [
    {
        from:"Shaddha",
        to:"Ruturaj",
        msg:"br",
        created_at: new Date()
    },
    {
        from:"Shaddha",
        to:"Ruturaj",
        msg:"Hmmmmm",
        created_at: new Date()
    },
];

Chat.deleteMany({}).then(() => {console.log("Delete successful");});

Chat.insertMany(allChats)
.then((res) => {
    console.log(res);
});