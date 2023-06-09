const express = require('express')
const app = express()

// 5
let {usuarios} = require("./models/usuario")
let {productos} = require('./models/producto')

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

/**
 * parte del punto 12 en adelante...
 */

// 7
app.get('/productos', (req, res) => {
    res.json(productos)
})

// 8
// app.get('/productos/:id', (req, res) => {
//     const id_producto = req.params.id
//     const filtro = productos.filter((producto) => producto.id_producto == id_producto)

//     if (filtro.length > 0) {
//         return res.json(filtro)

//     } else {
//         return res.status(404).json({status: "El producto no esta disponible..."})
//     }
// })

// 9
app.post('/productos', (req, res) => {
    let body = req.body
    body.id_producto = productos.length+1
    productos.push(body)

    return res.status(201).json(body)
})

// 10
app.put('/productos/:id', (req, res) => {
    let id_producto = req.params.id
    let body = req.body

    const filtro = productos.filter((producto) => producto.id_producto == id_producto)

    if (filtro.length > 0) {
        productos = productos.filter((producto) => producto.id_producto != id_producto)
        productos.push(body)

        return res.status(201).json(body)

    } else {
        return res.status(201).json({status: 'El producto no existe'})
    }
})

// 11
app.delete('/productos/:id', (req, res) => {
    let id_producto = req.params.id
    const filtro = productos.filter((producto) => producto.id_producto == id_producto)

    if (filtro.length > 0) {
        productos = productos.filter((producto) => producto.id_producto != id_producto)

        return res.status(200).json(filtro)

    } else
        return res.status(404).json({status: 'El producto no esta disponible'})
})

// 13
// app.get('/productos/:marca', (req, res) => {
//     const marca = req.params.marca
//     const filtro = productos.filter((producto) => producto.marca == marca)

//     if (filtro.length > 0)
//         return res.status(200).json(filtro)

//     else
//         return res.status(404).json({status: 'El producto no se encuentra'})
// })

// 14
// app.get('/productos/:precio', (req, res) => {
//     const precio = req.params.precio
//     const filter = productos.filter((producto) => producto.precio >= precio)

//     if (filter.length > 0)
//         return res.status(200).json(filter)

//     else
//         return res.status(404).json({status: 'No hay producto scon ese precio'})
// })

// 15
app.get('/productos/:precio', (req, res) => {
    const precio = req.params.precio
    const filter = productos.filter((producto) => producto.precio <= precio)

    if (filter.length > 0)
        return res.status(200).json(filter)

    else
        return res.status(404).json({status: 'No hay producto scon ese precio'})
})



app.listen(8080, () => {
    console.log("Se ha levantado el servidor 8080...");
})