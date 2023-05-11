import fs from "fs"


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
  read_products(){
    console.log(this.products)
    return this.products
  }
  getProducById(id){
    let produc = this.products.find(each=>each.id===id)
        console.log(produc)
        return produc
    
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


  async deleteProduct(id){
    try{
        this.products = this.products.filter(each=>each.id==id)
        let data_json = JSON.stringify(this.products,null,2)
        await fs.promises.writeFiles(this.path,data_json)
        console.log("delete product " + id)
        return "delete produc " + id
    } catch(error){
        return "error"
    }
  }
}
let manager = new ProductManager("./src/data/product.json")

export default manager