const express = require ("express")
const cors = require("cors")
const { connectDatabase } = require("./Connection/Connect");

const app = express()

app.get("/get" , (req, res)=>{
    res.json("hi there");
});

connectDatabase()
const PORT = 2000
app.listen(PORT , ()=>{
    console.log(`Server is running at port ${PORT} `)
})