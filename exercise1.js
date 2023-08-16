const users = [
  {
    id: "1",
    email: "gadi@gmail",
    password: "123456",
  },
  {
    id: "2",
    email: "dana@gmail",
    password: "234567",
  },
  {
    id: "3",
    email: "salome@gmail",
    password: "345678",
  },
];

const express = require("express");
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");
const app = express();
const port = 3000;
app.use(express.json());

function checkEmail(newEmail) {
  users.forEach((user) => {
    if (user.email === newEmail) return 0;
  });
  return 1;
}

function validateEmail(email) {
    let regex = /\S+@\S+\.\S+/;
    return regex.test(email);
  }

  function checkPassword(password){
    let passw=/^(?=.*[a-z])(?=.*[A-Z]).{8,20}$/;
    return passw.test(password)
  }
 //function checkInput(){}

app.get("/", (req, res) => {
  res.send(users);
});
//stage 1
app.get("/users/:id", (req, res) => {
   let flag = users.find((user)=>user.id===req.params.id);
   console.log(flag)
    if(flag)
     res.send(flag);
    else  
     res.send("not exist");
});

app.post("/users", (req, res) => {
  let newUser = req.body;
  let newPassword = newUser.password;
  bcrypt.hash(newPassword, 10, function (err, hash) {
    newUser.password = hash;
    newUser.id = uuidv4();
    if (checkEmail(newUser.email)&&validateEmail(newUser.email) &&checkPassword(newPassword)){
      users.push(newUser);
      res.send(users);
    } else {
      res.send("inter correct input");
    }
  });
});

app.put("/users/:id", (req, res) => {
  let j=users.findIndex((user)=>user.id===req.params.id);
  if(j>=0){
    users[j] = req.body;
    res.send(users)
  }else{
    res.send("not exist");
  }
});

app.delete("/users/:id", (req, res) => {
    let j=users.findIndex((user)=>user.id == req.params.id);
    if(j>=0) users.splice(j, 1);
    j>=0?res.send(users):res.send("not exist");
});

app.post("/exist", (req, res) => {
  let exist =users.findIndex((user)=>user.email===req.body.email);
  if(exist>=0){
    let password=bcrypt.compareSync(users[exist].password, req.body.password);
    if (password || req.body.password === users[exist].password)
        res.send("User is connected")
  }
    else{
        res.send(" wrong credentials");
    }
});

app.listen(port, () => {
  console.log(`Server is up and running on port:${port}`);
});
