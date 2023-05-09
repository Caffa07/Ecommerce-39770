import { Router } from "express";
import manager from "../../manager/products";

const router = Router()

router.post("/", async(req,res,next)=>{
    try {
        let response = await manager.addProduct(req.body)
        if(response===201){
            return res.json({status:201, message: "produc creado"})
        }
        return res.json({status:404, message:"no creado"})
    } catch (error) {
        next(error)
    }
})

router.get("/", async(req,res,next)=>{
    try {
        let produc = manager.read_products()
        if(produc.length>0) {
            return res.json({status:200, produc})
        }
        return res.json({status:404, message:"not found"})
    } catch (error) {
        next(error)
    }
})

router.get("/:pid", async(req,res,next)=>{
    try {
        let id = Number(req.params.pid)
        let produc = manager.getProducById(id)
        if(produc){
            return res.json({status:200, produc})
        }
        return res.json({status:404, message:"not found"})
    } catch (error) {
        next(error)
    }
})

router.put("/:pid", async(req,res,next)=>{
    try {
        let id = Number(req.params.pid)
        let data = req.body
        let response = await manager.updateProducts(id,data)
        if(response===200){
            return res.json({status:200, message:"Produc modificado"})
        }
        return res.json({status:404, message:"not found"})
    } catch (error) {
        next(error)
    }
})

router.delete("/:pid", async(req,res,next)=>{
    try {
        let id= Number(req.params.pid)
        let response = await manager.deleteProduct(id)
        if(response===200){
            return res.json({status:200,message:"Produc "+id+" eliminado"})
        }
        return res.json({status:404,message:"not found"})
    } catch (error) {
        next(error)
    }
})

export default router