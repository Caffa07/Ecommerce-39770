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
  async update_cart(id,data) {
      try {
          let one = this.getCartsById(id)
          for ( let prop in data){
              one[prop] = data[prop]
          }
          let data_json = JSON.stringify(this.cart,null,2)
          await fs.promises(this.path,data_json)
          return 200
      } catch(error){
          return null
      }
  }
  async delete_cart(id){
    try{
        let cart = this.cart.find(each.id===id)
        if(cart){
            this.cart.filter(each=>each.id!==id)
            let data_json = JSON.stringify(this.cart,null,2)
            await fs.promises.writeFile(this.path,data_json)
            console.log("delete cart:" + id)
        }
        console.log("not found")
        return null
    }catch(error){
        return null
    }
  }
}


let manager = new cartManager("./src/data/cart.json")

export default manager