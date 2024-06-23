const Book = require("../models/book");

let bookDB = {}

function getBook (req, res){
    let books = Object.values(bookDB);
    res.json(books);
};

function createBook (req, res) {
    let {title, type, author, price, photo, id_book, id_user} = req.body;

    if(bookDB[id_book]){
        return res.status(400).json({message: "Ya existe libro"})
    }

    let newBook = new Book (title, type, author, price, photo, id_book, id_user);
    bookDB[newBook.id_book] = newBook;
    res.status(201).json(newBook);
};

function updateBook (req, res) {
    let {id_book, title, type, author, price, photo}=req.body;
    let book = bookDB[id_book];

    /*let {id} = req.params;
    let {title, type, author, price, photo} = req.body;
    let book = bookDB[id];*/

    if(book) {  
        book.title = title;
        book.type = type;
        book.author = author;
        book.price = price;
        book.photo = photo;

        res.json(book)
    }else{
        res.status(404).json({message:"error, libro no encontrado"});
    }
};

function deleteBook (req, res) {
    let {id_book} = req.body;

    if(bookDB[id_book]){
        delete bookDB[id_book];
        res.json({message: "libro elimindo"});
    }else{
        res.status(404).json({message: "error"})
    }
};

module.exports = {getBook, createBook, updateBook, deleteBook}


/*
let usuario = null; //{nombre: "Jose", apellidos: "Garcia Garcia"}

function getStart(request, response)
{
    let respuesta = {error: true, codigo: 200, mensaje: 'Punto de inicio'};
    response.send(respuesta);
}


// function getUser(request, response)
// {
//     let respuesta;
//     if (usuario != null) 
//         respuesta = usuario;
//     else
//         respuesta = {error: true, codigo: 200, mensaje: "El usuario no existe"}
    
//     response.send(respuesta);   
// }

function getUser(request, response)
{
    let name = request.query.name;
    let respuesta;

    if (usuario != null && (!name || name === usuario.nombre))
        respuesta = {error: false, codigo: 200, data: usuario}

    else 
        respuesta = {error: true, codigo: 200, mensaje: "El usuario no existe"}

    response.send(respuesta);      
}

function postUser(request, response)
{
    let respuesta; 
    console.log(request.body)
    if (usuario === null)
    {
        usuario     = {nombre: request.body.data1, 
                       apellidos: request.body.data2}
        
        respuesta   = {error: false, codigo: 200, 
                        mensaje: 'Usuario creado',data: usuario};
    }
    else
        respuesta = {error: true, codigo: 200, 
                        mensaje: 'Usuario ya existe'};

    response.send(respuesta);
}

function putUser(request, response)
{
    let respuesta
    if (usuario !=  null)
    {
        usuario.nombre      = request.body.nombre1;
        usuario.apellidos   = request.body.apellido1;
        respuesta           = {error: false, codigo: 200, 
                                mensaje: 'Usuario actualizado',data: usuario};
    }
    else
        respuesta = {error: true, codigo: 200, 
                        mensaje: 'El usuario no existe',data: usuario};

    response.send(respuesta);
};

function deleteUser(request, response)
{
    let respuesta
    if (usuario != null)
    {    
        usuario     = null;
        respuesta   = {error: false, codigo: 200, 
                        mensaje: 'Usuario borrado',data: usuario};
    }  
    else
        respuesta   = {error: true, codigo: 200, 
                        mensaje: 'El usuario no existe',data: usuario};

    response.send(respuesta);
};

module.exports = {getStart, getUser, getUser2, postUser, putUser, deleteUser};
*/