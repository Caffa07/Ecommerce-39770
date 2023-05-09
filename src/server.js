import express from "express"
import router from "./routes/index.js"
import error_handler from "./middlewares/error-handler.js"
import not_found from "./middlewares/not-found.js"


let server = express()

let PORT = 8080

let ready = ()=>console.log("server ready " + PORT)

server.use("public",express.static("public"))
server.use(express.json())
server.use(express.urlencoded({extended:true}))
server.use("/",router)
server.use(error_handler)
server.use(not_found)

server.listen(PORT,ready)




