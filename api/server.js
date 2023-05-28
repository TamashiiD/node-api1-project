// BUILD YOUR SERVER HERE
const express = require('express')
const User = require("./users/model")
const server = express()
server.use(express.json())




server.put('/api/users/:id', async (req, res)=> {
    const possibleuser = await User.findById(req.params.id)
try{ 
    if (!possibleuser){
    res.status(404).json({message: 'The user with the specified ID does not exist'})
}
else{
    if(!req.body.name || !req.body.bio){
        res.status(400).json({
            message: 'please provide name and bio for the user'
        })
    }
    else{
      const stuff =  await User.update(
        req.params.id, 
        req.body)
      res.status(200).json(stuff)
    }
}
}

catch(err){ 
    res.status(500).json({
    message: "error getting user",
    err: err.message,
    stack: err.stack
})
}
})






server.delete('/api/users/:id', async (req, res)=>{
const possibleuser = await User.findById(req.params.id)

    if (!possibleuser){
        res.status(404).json({message: 'The user with the specified ID does not exist'})
    }
    else{
        const deleteduser = await User.remove(req.params.id)
        res.status(200).json(deleteduser)

    
    }

})



server.post("/api/users",  async (req, res) => {
  
     const user = req.body;
    if (!user.name || !user.bio) {
        res.status(400).json({
            message: "Please provide name and bio for the user"
        })
    }
   else{
     User.insert(user)
     .then(createdUser => {
        res.status(201).json(createdUser)
     }) 

     .catch(err => {
    res.status(500).json({
        message: "error getting user",
        err: err.message,
        stack: err.stack
   })
})
}
})
  

server.get("/api/users", (req, res) => {
    User.find()
        .then(users => {
            res.json(users)
        })
        .catch(err => {
            res.status(500).json({
                message: "error getting user",
                err: err.message,
                stack: err.stack
            })
        })
}
)

server.get("/api/users/:id", (req, res) => {
    User.findById(req.params.id)
        .then(user => {
           if(!user){
            res.status(404).json({
                message: 'The user with the specified ID does not exist'
            })
           }
           res.json(user)
        })
        .catch(err => {
            res.status(500).json({
                message: "error getting user",
                err: err.message,
                stack: err.stack
            })
        })
}
)



// server.use('*', (req, res) => {
//     res.status(404).json({ message: 'not found' })
// })

module.exports = server; // EXPORT YOUR SERVER instead of {}
