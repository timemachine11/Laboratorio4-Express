const express = require('express')
const app = express()

// 5
let {usuarios} = require("./models/usuario")

// 9 middleware 
app.use(express.json())

// 7
app.get("/usuarios", (req, res) => {
    res.json(usuarios)
})

// 8
app.get("/usuarios/:id", (req, res) => {
    const id = req.params.id
    const filtro = usuarios.filter((usuario) => usuario.id == id)

    if (filtro.length > 0) 
        return res.json(filtro)

    else
        return res.status(404).json({status: "El usuario no se encuentra"})
})

// 9
app.post("/usuarios", (req, res) => {
    let body = req.body
    body.id = usuarios.length+1
    usuarios.push(body)

    return res.status(201).json(body)
})

// 10
app.put("/usuarios/:id", (req, res) => {
    let id = req.params.id
    let body = req.body

    const filtro = usuarios.filter((usuario) => usuario.id == id)

    if (filtro.length > 0) {
        usuarios = usuarios.filter((usuario) => usuario.id != id)
        usuarios.push(body)
        
        return res.status(201).json(body)
    
    } else
        return res.status(201).json({status: "El usuario no se encuentra"})
})

// 11
app.delete("/usuarios/:id", (req, res) => {
    let id = req.params.id
    const filtro = usuarios.filter((usuario) => usuario.id == id)

    if (filtro.length > 0) {
        usuarios = usuarios.filter((usuario) => usuario.id != id)
        
        return res.status(200).json(filtro)
    
    } else
        return res.status(404).json({status: "El usuario no se encuentra"})
})

// 6
app.listen(8080, () => {
    console.log("Se ha levantado el servidor...");
})