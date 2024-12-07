const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());
const stringsEntered = new Set();

app.post('/', async (req, res) =>{
    const {string} = req.body;
    if(stringsEntered.has(string)){
        console.log(`${string} is duplicate`);
        return res.status(200).json({present: 1});
    }
    console.log(`${string} is not duplicate`);
    stringsEntered.add(string);
    res.status(201).json({present: 0});
})

app.listen('3000', (err) => {
    if(err) {
        console.log(err.message);
    }else{
        console.log("server started on port 3000");
    }
})
