const fs = require("fs")


class ProductManager {
    constructor(path) {
        this.products = []
        this.path = path
        this.init(path)
    }
    init(path) {
        let file = fs.existsSync(path)
        if(!file) {
            fs.writeFileSync(path,"[]")
                return "file created"
        } else{
            this.products = JSON.parse(fs.readFileSync(path,"utf-8"))
            return
        }
    }
async addProduct({name,model,talle,carts}) {
   try{
      let data = {name,model,talle,carts}
        if (this.products.length>0){
            let nexID = this.products[this.products.length-1].id+1
            data.id = nexID
        }else {
       data.id = 1
    }
   this.products.push(data)
    let data_json = JSON.stringify(this.products,null,2)
     await fs.promises.writeFile(this.path,data_json)
    console.log("ids:" + data.id)
    return "id" + data.id

    }catch(error){
        return "error creating user"
    }

  }
  async getProducById(id){
    let produc = this.products.find(each=>each.id===id)
    for (let prop in id){
        produc[prop] = id[prop]
    }
    console.log("produc " + id)
     return "produc " + id
  }
  async updateProducts(id,data){
    try{
        let product = this.getProducById(id)
        for (let prop in data) {
            product[prop]= data[prop]
        }
        let data_json = JSON.stringify(this.products,null,2)
        await fs.promises.writeFile(this.path,data_json)
        console.log("product " + id)
        return "product " + id
    }catch(error){
        return "error not product"
    }
  }
}
async function manager(){
    let manager = new ProductManager("./data/data.json")
//    await manager.addProduct({name:"Adidas", model:"Sport",talle:"39",carts:[]})
//    await manager.addProduct({name:"Adidas",model:"Urbano",talle:"38",carts:[]})
//    await manager.addProduct({name:"Adidas",model:"Sport",talle:"37",carts:[]})
//    await manager.addProduct({name:"Adidas",model:"Urbano",talle:"40",carts:[]})
//    await manager.addProduct({name:"Adidas",model:"Sport",talle:"43",carts:[]})
//    await manager.addProduct({name:"Adidas",model:"Urbano",talle:"45",carts:[]})
//    await manager.addProduct({name:"Adidas",model:"Sport",talle:"44",carts:[]})
//    await manager.addProduct({name:"Adidas",model:"Urbano",talle:"36",carts:[]})
//    await manager.addProduct({name:"Adidas",model:"Sport",talle:"39",carts:[]})
//    await manager.addProduct({name:"Adidas",model:"Urbano",talle:"42",carts:[]})
//    await manager.addProduct({name:"Adidas",model:"Sport",talle:"41",carts:[]})
//    await manager.addProduct({name:"Adidas",model:"Urbano",talle:"40",carts:[]})
//    await manager.addProduct({name:"Adidas",model:"Sport",talle:"45",carts:[]})
//    await manager.addProduct({name:"Adidas",model:"Urbano",talle:"38",carts:[]})
   await manager.getProducById(11)
}
manager()