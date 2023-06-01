import { AppDataSource } from "./src/databases/connections/data-source"
AppDataSource.initialize()

const express = require("express") 
const app = express()
app.use(express.json())

app.get('/', (request, response) => {
    return response.json("E ai, Beleza?")
})

<<<<<<< HEAD
app.listen(3333, () => console.log("O server esta ON na porta 3333."))
=======
app.listen(3333, () => console.log("O server esta ON na porta 3333."))

>>>>>>> a6fb1cef3915014d17acc4072c90f2fb84db35d2
