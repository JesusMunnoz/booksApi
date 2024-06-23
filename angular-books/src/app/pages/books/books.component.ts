import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/models/book';
import { BooksService } from 'src/app/shared/books.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})

export class BooksComponent implements OnInit {

  public books: Book[];
  public filteredBooks: Book[] = [];
  public filterBooks : string =  '';
  
  constructor(private booksService: BooksService){}

  getOneBook(filter: string){
    let id_book = Number(filter);
    if(id_book){
      let foundBook = this.booksService.getOne(id_book);

      console.log("Control 1, se introduce id"); 
      if(foundBook){
        console.log("Control 2, id encontrado"); 
        this.filteredBooks = [foundBook];
      }else{
        console.log("Control 3, id erroneo");
        this.filteredBooks = [];
      }

      console.log(this.filterBooks);    
    }

    else{
      this.filteredBooks = this.booksService.getAll();
      console.log("borras y se muestra todo");
      
    };
  }

  deleteBook(book:Book):void{
   //this.books = this.books.filter(b => b !== book);
   this.booksService.delete(book.id_book);
   this.books = this.booksService.getAll();
   this.getOneBook(this.filterBooks)
  }

  ngOnInit(): void{
    this.books = this.booksService.getAll(); 
    this.filteredBooks = this.books;
  }
}