const express = require('express')
const routes = express.Router()

const bcrypt = require('bcrypt')



const users = []

routes.get('/users',(req,res)=>{
    res.json(users)
})

routes.post('/users', async (req,res)=>{
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        const user = { name: req.body.name, password: hashedPassword}
        users.push(user)
        res.status(201).send() 
    } catch{
        res.status(500).send()
    }
})


routes.post('/users/login', async (req,res)=>{
    const user = users.find(user => user.name = req.body.name)
    if (user== null) {
        return res.status(400).send('Cannot find user')
    }
    try {
        if (await bcrypt.compare(req.body.password, user.password)) {
            res.send('Success')
        } else {
            res.send('Not Allowed')
        }
    } catch {res.status(500).send()}
})






module.exports = routes