const data=[{
    id: "1",
    email:'gadi@gmail',
    password:'123456'
},{
    id: "2",
    email:'dana@gmail',
    password:'234567'
},{
    id: "3",
    email:'salome@gmail',
    password:'345678'
}]

const express=require('express')
const app = express();
const port= 3000
app.use(express.json())
app.get('/',(req,res)=>{
    res.send(data)
})
app.get('/users/:id',(req,res)=>{
    let j=0
    for(let i=0;i<data.length;i++){
        if(data[i].id==req.params.id){
           res.send(data[i])
           j=1
        }
    }
    if(j==0){
        res.send('not exist')
    }
    
})

app.post('/users',(req,res)=>{
    let newUser=req.body;
    data.push(newUser)
   res.send(data);
})

app.put('/users/:id',(req,res)=>{
    for(let i=0;i<data.length;i++){
        if(data[i].id==req.params.id){
           data[i]=req.body
        }
    }
    res.send(data)
})

app.delete('/users/:id',(req,res)=>{
    for(let i=0;i<data.length;i++){
        if(data[i].id==req.params.id){
           data.splice(i,1)
        }
    }
    res.send(data)
})
app.listen(port,()=>{
    console.log(`Server is up and running on port:${port}`);
})

