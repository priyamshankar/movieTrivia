const mongoose = require ("mongoose");
require("dotenv").config();

const url = "mongodb+srv://priyamshankar5:SmvnveSuVGkwgPLj@cluster0.wfzefyf.mongodb.net/?retryWrites=true&w=majority";

mongoose.set("strictQuery",false);
mongoose.connect(url).then(()=>{
    console.log("Remote db connected");
}).catch((e)=>{
    console.log(e);
})

