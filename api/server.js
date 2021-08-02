// BUILD YOUR SERVER HERE
const express = require('express')
const User = require('./users/model')
const server = express()

server.use(express.json())

server.get('/api/users', (req, res) => {
    User.find()
        .then(users => {
            res.status(200).json(users)
        })
        .catch(err => {
            res.status(500).json({message: err.message})
        })   
})

server.get('/api/users/:id', (req, res) => {
    const id = req.params.id
    User.findById(id)
        .then(user => {
            if(!user){
                res.status(404).json({message: "The user with the specified ID does not exist"})
            }else{
                res.status(200).json(user)
            }
        })
        .catch(err => {
            res.status(500).json({message: err.message})
        })
})

server.post('/api/users', (req, res) => {
    const {name, bio} = req.body
    if(!name || !bio){
        res.status(400).json({ message: "Please provide name and bio for the user" })
    }else{
        User.insert({name, bio})
            .then(user => {
                res.status(201).json(user)
            })
            .catch(err => {
                res.status(500).json({message: err.message})
            })
    }
})

server.put('/api/users/:id', (req, res) => {
    const {name, bio} = req.body
    const {id} = req.params
    if(!name || !bio){
        res.status(400).json({ message: "Please provide name and bio for the user" })
    }else{
        User.update(id, {name, bio})
            .then(updated => {
                if(!updated){
                    res.status(404).json({message: "The user with the specified ID does not exist"})
                }else{
                    res.json(updated)
                }
            })
            .catch(err => {
                res.status(500).json({message: err.message})
            })
    }
})

server.delete('/api/users/:id', async (req, res) => {
    const possibleUser = await User.findById(req.params.id)
        if(!possibleUser){
            res.status(404).json({message: "The user with the specified ID does not exist"})
        }else{
            const deletedUser = await User.remove(possibleUser.id)
            // console.log(deletedUser)
            res.status(200).json(deletedUser)
        }
})




module.exports = server; // EXPORT YOUR SERVER instead of {}
