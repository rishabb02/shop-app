const express = require('express')
const app = express()
const port = 4000

const products = [
    {
        id:1,
        serialNumber: 1,
        category: "electronic",
        tags: ["laptop", "personal", "computer"],
        name: "Macbook",
        description: "Apple made this",
        img: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2734&q=80",
        price: 1200
    },
    {
        id:2,
        serialNumber: 2,
        category: "home decor",
        tags: ["art", "canvas", "hobby"],
        name: "Painting",
        description: "Mom made this",
        img: "https://images.unsplash.com/photo-1617503752587-97d2103a96ea?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=838&q=80",
        price: 500
    },
    {
        id:3,
        serialNumber: 3,
        category: "food",
        tags: ["chocolate", "sweet", "hobby"],
        name: "Ghiradelli",
        description: "Made in San Fran",
        img: "https://images.unsplash.com/photo-1614088685112-0a760b71a3c8?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80",
        price: 15
    }
]

app.use(express.static('public'))

app.use(express.json())

app.get('/products', (req, res) => {
  res.send(products)
})

app.post('/products', (req, res) => {
    console.log(req.body)
    products.push(req.body)
    res.status(201).json({message: "Product added", data: products})
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})