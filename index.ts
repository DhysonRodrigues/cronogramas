import { AppDataSource } from "./src/databases/data-source"

const express =  require("express")

const app = express ()

app.use(express.json())

app.get("/",(request,response)=>{
    return response.json("lasqueira")
})

app.listen(3333, () => console.log("Saul devolve meu dinheiro")
)

AppDataSource.initialize()