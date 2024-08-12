const express = require('express')
const mongoose = require('mongoose')
const cors = require("cors")
const getDepartmentModel = require("./models/dept")
const app = express()
app.use(express.json())
app.use(cors({
    origin:["http://localhost:5173"],
    methods:["GET","POST","PUT","DELETE"],
    credentials: true
}))

const MONGO_URI="mongodb://localhost:27017/UG"
mongoose.connect(MONGO_URI)
    .then(()=>{
        app.listen(4000,()=>{
            console.log('Listening on port 4000');
        })
    })
    .catch((error)=>{
        console.log(error)
    })

app.post("/",async(req,res)=>{
    try {
        const { collectionName, semester } = req.body;
        const Department_find = getDepartmentModel(collectionName);
        //console.log(Department_find)
        const subjects = await Department_find.find({ sem: semester });
        //console.log(subjects);
        res.json(subjects);
    } catch (err) {
        res.status(500).json({ message: "Cannot fetch the data" });
    }
        
})

