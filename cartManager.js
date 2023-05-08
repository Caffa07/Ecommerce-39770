import fs from "fs"


class cartManager {
    constructor(path) {
        this.cart = []
        this.path = path
        this.init(path)
    }
    init(path) {
        let file = fs.existsSync(path)
        if(!file) {
            fs.writeFileSync(path,"[]")
                return "file created"
        } else{
            this.cart = JSON.parse(fs.readFileSync(path,"utf-8"))
            return
        }
    }
async addCart({name,user}) {
   try{
      let data = {name,user}
        if (this.cart.length>0){
            let nexID = this.cart[this.cart.length-1].id+1
            data.id = nexID
        }else {
       data.id = 1
    }
   this.cart.push(data)
    let carts_json = JSON.stringify(this.cart,null,2)
     await fs.promises.writeFile(this.path,carts_json)
    console.log("ids:" + data.id)
    return "id" + data.id

    }catch(error){
        return "error creating user"
    }

  }
  getCarts(){
    console.log(this.cart)
    return this.cart
  }
  getCartsById(id){
    let cart = this.cart.find(each=>each.id===id)
        //console.log(one)
        return cart
    
  }
}
let managerCarts = new cartManager("./data/cart.json")

async function managerCart(){
    // await managerCarts.addCart({name:"Carrito", user:"12"})
    // await managerCarts.addCart({name:"Carrito", user:"3"})
    // await managerCarts.addCart({name:"Carrito", user:"2"})
    // await managerCarts.addCart({name:"Carrito", user:"1"})
    await managerCarts.getCartsById(2)
    await managerCarts.getCarts()
}
//managerCart()

export default managerCarts