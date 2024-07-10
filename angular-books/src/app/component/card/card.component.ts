import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Book } from 'src/app/models/book';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {
  @Input() book: Book;
  @Input() index: number;
  //@Output() delete = new EventEmitter<Book>();
  @Output() delete = new EventEmitter<number>()

  onDelete(): void{
    //this.delete.emit(this.book);
    this.delete.emit(this.book.id_book);
  }
}
