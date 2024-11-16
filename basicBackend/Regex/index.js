import express from "express"

import mongoose from "mongoose"

const app = express()
app.use(express.json())
mongoose.connect("mongodb://localhost:27017/timepass").then(() => console.log("connect")
).catch(() => console.log("error",))
const books = new mongoose.Schema({

})
const data = mongoose.model("books", books)


app.get('/', async (req, res) => {
    const value = await data.find({})
    res.json({ success: true, data: value })
})
app.get('/body', async (req, res) => {
    const  {id}  = req.body
    console.log(id);
    res.json({ success: true, id })

})
app.listen(3000, () => {
    console.log("app listening on 3000");

})