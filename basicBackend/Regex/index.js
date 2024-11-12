import express from "express"

import mongoose from "mongoose"

const app = express()
mongoose.connect("mongodb://localhost:27017/lol").then(()=>console.log("connect")
).catch(()=>console.log("error",))

app.listen(3000,()=>{
    console.log("app listening on 3000");
    
})