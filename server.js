import express from "express"
import manager from "./scrip.js"
import managerCarts from "./cartManager.js"

let server = express()

let PORT = 8080

let ready = ()=>console.log("server ready " + PORT)

server.listen(PORT,ready)

server.use(express.urlencoded({extended:true}))


let products_route = "/api/products/:id"
let product_function = (req,res)=> {
    let parametrs = req.params
    let id = Number(parametrs.id)
    console.log(parametrs)
    let product = manager.getProducById(id)
    console.log(product)
    if (product){
        return res.send({
            sucess: true,
            product: product
        })
    }else{
        return res.send({
            sucess: false,
            product:"inexistente"
        })
    }
}
server.get(products_route,product_function)

let limit_route = "/api/products"
let limit_function = (req,res) =>{
    let limit = req.query.limit ?? 14
   let products = manager.read_products().slice(0,limit)
   if(products.length>0){
       return res.send({
       sucess: true,
        products
       })
   }else{
    return res.send({
        sucess: false,
        products: "not found"
    })
   }
}
server.get(limit_route,limit_function)

let cart_route = "/api/carts"
let cart_funtion = (req,res)=>{
    let limit = req.query.limit ?? 10
    let limitCart = managerCarts.getCarts().slice(0,limit)
    console.log(limitCart)
    return res.send({
        succes: true,
        reponse: limitCart
    })
}
server.get(cart_route,cart_funtion)

let cartId_route = "/api/cart/:id"
let cartId_function = (req,res)=> {
    let parametrs = req.params
    let id = Number(parametrs.id)
    console.log(parametrs)
    let product = managerCarts.getCartsById(id)
    console.log(product)
    if (product){
        return res.send({
            sucess: true,
            product: product
        })
    }else{
        return res.send({
            sucess: false,
            product:"inexistente"
        })
    }
}
server.get(cartId_route,cartId_function)

