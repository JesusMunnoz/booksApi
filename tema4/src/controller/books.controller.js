const Book = require("../models/book");

let arrBooks = [];

function getBooks (req, res){
    let respuesta = {error: false, codigo: 200, data: arrBooks}
    res.json(respuesta);
}

function createBooks (req, res) {
    let {title, type, author, price, photo, id_book, id_user} = req.body;

    if(arrBooks.some(book => book.id_book === id_book)){
        let repuesta = {error:true, codigo:400, mensaje: "ya existe libro"}
        return res.status(400).json(repuesta);
    }

    let newBook = new Book (title, type, author, price, photo, id_book, id_user);
    arrBooks.push(newBook);
    let respuesta = {error: false, codigo: 201, data: newBook};
    res.status(201).json(respuesta);
}

function updateBooks (req, res) {
    let {id_book, title, type, author, price, photo} = req.body;
    let bookIndex = arrBooks.findIndex(book => book.id_book == id_book);

    if(bookIndex !== -1) {
        arrBooks[bookIndex].title = title;
        arrBooks[bookIndex].type = type;
        arrBooks[bookIndex].author = author;
        arrBooks[bookIndex].price = price;
        arrBooks[bookIndex].photo = photo;

        let respuesta = {error: false, codigo: 200, data: arrBooks[bookIndex]}
        res.json(respuesta);
    }else{
        let respuesta = {error: true, codigo: 404, mensaje: "error, libro no encontrado"};
        res.status(404).json(respuesta);
    }
}

function deleteBooks (req, res) {
    let {id_book} = req.body;
    let bookIndex = arrBooks.findIndex(book => book.id_book == id_book);
    
    if (bookIndex !== -1){
        let deleteBook = arrBooks.splice(bookIndex, 1);
        
        let respuesta = {error: false, codigo: 200, data: deleteBook[0]};
        res.json(respuesta);
    }else{
        let respuesta = {error: true, codigo: 404, mensaje: "error, libro no encontrado"};
        res.status(404).json(respuesta);
    }
}

function getBooksId(req, res) {
    let {id} = req.params;
    let book = arrBooks.find(book => book.id_book == parseInt(id));
    if (book){
        let respuesta = {error: false, codigo: 200, data: book};
        res.json(respuesta);
    }else{
        let respuesta = {error: true, codigo: 404, mensaje: "error, libro no encontrado"};
        res.status(404).json(respuesta);
    }
}

module.exports = {getBooks, createBooks, updateBooks, deleteBooks, getBooksId}
