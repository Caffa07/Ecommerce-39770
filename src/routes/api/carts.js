import { Router } from "express";
import manager from "./../../manager/carts"


const router = Router()

router.post("/", async(req,res,next)=>{
    try{
        let response = await manager.addCart(req.body)
        if (response===201){
            return res.json({ status:400,massage: "cart creada"})
        }
        return res.json({status:400, message: "no fue creada"})
    } catch(error){
        next(error)
    }
})

router.get("/", async(req,res,next)=>{
    try{
        let all = manager.getCarts()
        if(all.length>0) {
            return res.json({ satatus:200,all})
        }
            return res.json({status:404, message:"not fund"})
    } catch(error){
        next(error)
    }
})

router.get("/:pid", async(req,res,next)=>{
    try{
        let id = Number(req.params.pid)
        let cart = manager.getCartsById(id)
        if(cart){
            return res.json({status:200,cart})
        }
        return res.json({status:404, message:"not fund"})
    } catch(error){
        next(error)
    }
})
router.put("/:pid", async(req,res,next)=>{
    try {
        let id = Number(req.params.pid)
        let data = req.body
        let response = await manager.update_cart(id,data)
        if(response===200){
            return res.json({status:200, message:"cart modificada"})
        }
        return res.json({status:404,message:"not found"})
    }catch(error){
        next(error)
    }
})

router.delete("/:pid",async(req,res,next)=>{
    try {
        let id = Number(req.params.pid)
        let response = await manager.delete_cart(id)
        if(response===200) {
            return res.json({status:200, message: "cart" + id + "delete"})
        }
    } catch (error) {
        next(error)
    }
})

export default router