const { Router } = require ("express")
const router = Router();
const booksCtrl = require("../controller/book.controller")

router.get("/book", booksCtrl.getBook);
router.post("/book", booksCtrl.createBook);
router.put("/book", booksCtrl.updateBook);
router.delete("/book", booksCtrl.deleteBook);

module.exports = router;