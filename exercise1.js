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
function checkID(newID){
    data.forEach((element)=>{
        if(element.id===newID)return 0
    })
    return 1
}

const express=require('express')
const bcrypt=require('bcrypt')
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
    const {v4: uuidv4}=require('uuid')
    let newPassword=newUser.password
    bcrypt.hash(newPassword,10,function(err,hash){
       newUser.password=hash
       newUser.id=uuidv4()
       if(checkID(newUser.id)){
        data.push(newUser)
        res.send(data);
       }
       else{
        res.send("id is already exist")
       }
       
    })
    
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

app.post('/exist',(req,res)=>{
    let exist=0   
    let i=0 
    data.forEach((element)=>{
        console.log(element.password)
       if(element.email===req.body.email){
        let password=bcrypt.compareSync(element.password,req.body.password)
        if(password||req.body.password===element.password){
            exist=1
            res.send("User is connected");
        }
        // bcrypt.compare(req.body.password,element.password).then(function(err,result){
        //     console.log(element.password)
        //     if(result==true||element.password===req.body.password){
        //         exist=1
        //         console.log(element.password)
        //         res.send("User is connected");
        //     }
        // })
      }
       if(i==data.length-1&&exist==0){
        res.send(' wrong credentials')
      }
       
      i++;
    })
    
})


app.listen(port,()=>{
    console.log(`Server is up and running on port:${port}`);
})

