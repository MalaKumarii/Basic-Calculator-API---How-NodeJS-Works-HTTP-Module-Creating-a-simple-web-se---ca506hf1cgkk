const express = require('express')
const app = express()
const bodyParser = require("body-parser");
const port = 3000
app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());

const maxflow = 1000000; 

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())
// your code goes here
app.get('/',(req,res)=>{res.send('Hello world!')});

app.post('/add',(req,res)=>{
    const {num1,num2} = req.body;
    if(isNaN(num1) || isNaN(num2)){
        return res.json({status:'error',message:'Invalid data types'})
    }
    const result = Number(num1)+Number(num2);
    if(num1<(-maxflow) || num2<(-maxflow) || result <(-maxflow)) {
        return res.json({status:"error",message:'Underflow'})
    }
    if(num1>maxflow || num2>maxflow || result >maxflow) {
        return res.json({status:"error",message:'Overflow'})
    }
    return res.json({status:'success',message:'the sum of given two numbers',sum:result})
})
app.post('/sub',(req,res)=>{
    const {num1,num2} = req.body;
    if(isNaN(num1) || isNaN(num2)){
        return res.json({status:'error',message:'Invalid data types'})
    }
    const result = num1-num2;
    if(num1<(-maxflow) || num2<(-maxflow) || result <(-maxflow)) {
        return res.json({status:"error",message:'Underflow'})
    }
    if(num1>maxflow || num2>maxflow || result >maxflow) {
        return res.json({status:"error",message:'Overflow'})
    }
    return res.json({status:'success',message:'the difference of given two numbers',difference:result})
})
app.post('/multiply',(req,res)=>{
    const {num1,num2} = req.body;
    if(isNaN(num1) || isNaN(num2)){
        return res.json({status:'error',message:'Invalid data types'})
    }
    const result = num1*num2;
    if(num1<(-maxflow) || num2<(-maxflow) || result <(-maxflow)) {
        return res.json({status:"error",message:'Underflow'})
    }
    if(num1>maxflow || num2>maxflow || result >maxflow) {
        return res.json({status:"error",message:'Overflow'})
    }
    return res.json({status:'success',message:'The product of given numbers',result})
})
app.post('/divide',(req,res)=>{
    const {num1,num2} = req.body;
    if(isNaN(num1) || isNaN(num2)){
        return res.json({status:'error',message:'Invalid data types'})
    }
    if(num2 == 0){
        return res.json({status:'error',message:'Cannot divide by zero'});
    }
    const result = num1/num2;
    if(num1<(-maxflow) || num2<(-maxflow) || result <(-maxflow)) {
        return res.json({status:"error",message:'Underflow'})
    }
    if(num1>maxflow || num2>maxflow || result >maxflow) {
        return res.json({status:"error",message:'Overflow'})
    }
    return res.json({status:'success',message:'The division of given numbers',result})
})

app.listen(port, () => console.log(`App listening on port ${port}!`))

module.exports = app;
