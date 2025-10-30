import express from "express"
import axios from "axios"
import cors from "cors"



const app = express()
const port = 3000;

app.use(cors())
app.use(express.json())


type libro = {
    "_id": string,
    "title": string,
    "author": string,
    "pages": number,
    "createdAt": Date,
    "updatedAt": Date
}

const ahora = new Date();
let libros : libro [] = [{_id: "1", title: "asdf", author: "asfff", pages: 40, createdAt: ahora, updatedAt: ahora },
    {_id: "2", title: "asdf2", author: "asfff2", pages: 402, createdAt: ahora, updatedAt: ahora }]



app.post("/api/books", (req, res)=>{
    const newId = crypto.randomUUID()
    const newTitle = req.body.title
    const newAuthor = req.body.author
    const newPages = Number(req.body.pages)
   
    
    if(typeof(newId) == "string" && typeof(newTitle) == "string" && typeof(newAuthor) == "string" && typeof(newPages) == "number"){
        const nuevoLibro : libro= {
        _id: newId,
        title: newTitle,
        author:newAuthor,
        pages: newPages,
        createdAt: ahora,
        updatedAt: ahora

    }
        libros.push(nuevoLibro)
        res.status(201).json(libros);
    }
    else{
        if(typeof(newTitle) !== "string"){
            res.status(400).send("Hay un error del title del body")

        }
        else if(typeof(newAuthor) !== "string"){
            res.status(400).send("Hay un error del author del body")
        }
        else if(typeof(newPages) !== "number"){
            res.status(400).send("Hay un error del pages del body")
        }
    }

})


app.get("/api/books", (req, res)=>{

    res.status(200).json(libros);
    
})
app.put("/api/books/:id", (req, res)=>{
    const newId = req.params.id
    const newTitle = req.body.title
    const newAuthor = req.body.author
    const newPages = Number(req.body.pages)

    const seguir = libros.some((n)=>newId === n._id)
   
   if(!seguir){
        res.status(404).json({message: "estas intentando eliminar un id que no existe"})
   }
    
    if((typeof(newId) !== "number" && typeof(newTitle) !== "string" && typeof(newAuthor) !== "string" && typeof(newPages) !== "number") || !seguir){
        res.status(400).json({message: "el body es incorrecto"})

    }

        libros = libros.map((n)=>{
           if(n._id === newId){
            n= {
                ...n, ...req.body
            }

           } 
           return n;
        })
         const librito = libros.find((n)=>newId ===n._id)
        res.status(200).json(librito);
    })
    

app.delete("/api/books/:id", (req, res)=>{
    const realID : string = req.params.id
    const libro = libros.some((n) => realID === n._id) 
    if(!libro){
        res.status(404).json({
            message: "No hay ningun equipo con ese id"
        })
    }
    
    libros = libros.filter((n) => realID != n._id) 
    res.status(200).json({message: "Deleted succesfully"})
})

app.listen(port, () => console.log("Servidor en http://localhost:3000"));

