const Book = require("../models/book");

let arrBooks = [];

function getBooks (req, res){
    res.json(arrBooks);
};

function createBooks (req, res) {
    let {title, type, author, price, photo, id_book, id_user} = req.body;

    if(arrBooks.some(book => book.id_book === id_book)){
        return res.status(400).json({message: "ya existe libro"})
    }

    let newBook = new Book (title, type, author, price, photo, id_book, id_user);
    arrBooks.push(newBook);
    res.status(201).json(newBook);
};

function updateBooks (req, res) {
    let {id_book, title, type, author, price, photo} = req.body;
    let bookIndex = arrBooks.findIndex(book => book.id_book == id_book);

    if(bookIndex !== -1) {
        arrBooks[bookIndex].title = title;
        arrBooks[bookIndex].type = type;
        arrBooks[bookIndex].author = author;
        arrBooks[bookIndex].price = price;
        arrBooks[bookIndex].photo = photo;

        res.json(arrBooks[bookIndex])
    }else{
        res.status(404).json({message:"error, libro no encontrado"});
    }
};

function deleteBooks (req, res) {
    let {id_book} = req.body;
    let bookIndex = arrBooks.findIndex(book => book.id_book == id_book);
    
    if (bookIndex !== -1){
        let deleteBook = arrBooks.splice(bookIndex, 1);
        
        res.json(deleteBook[0]);
    }else{
        res.status(404).json({message:"error, libro no encontrado"});
    }
};

function getBooksId(req, res) {
    let {id} = req.params;
    let book = arrBooks.find(book => book.id_book == parseInt(id));
    if (book){
        res.json(book);
    }else{
        res.status(404).json({message: "error, libro no encontrado"})
    }
}

module.exports = {getBooks, createBooks, updateBooks, deleteBooks, getBooksId}
