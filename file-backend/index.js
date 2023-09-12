const express = require ("express")
const { connectDatabase } = require("./Connection/Connect");
const collection = require ("./Models/Model")
const cors = require("cors");


app.use(express.json());
app.use(cors());



app.get("/get" , (req, res)=>{
    res.json("hi there");
});

connectDatabase()
const PORT = 2000
app.listen(PORT , ()=>{
    console.log(`Server is running at port ${PORT} `)
})