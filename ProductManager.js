class ProductManager {


    constructor(){
        this.event = []
        
    }
    getProducts(){
        return this.event
    }
    getProductsById(product)
    addProduct({title,description,price,thumbnail,code,stock}){
        title = title
        description = description
        price = price
        thumbnail = thumbnail
        code = code
        stock = stock
        let id = 0
        if (this.event.length===0){
            id = 1
        }else{
            let lastEvent = this.event[this.event.length-1]
            id = lastEvent.id + 1
            };
        let product = {title,description,price,thumbnail,code,stock,id}
        this.product.push(product)
    }

}
let Products = new ProductManager()

Products.addProduct({title: "producto prueba", description: "Este es un producto prueba", price: 200, thumbnail: "sin imagen", code: "abc123", stock: 25});

