import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  getReadingList,
  removeFromReadingList,
  addToReadingList
} from '@tmo/books/data-access';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Book } from '@tmo/shared/models';

@Component({
  selector: 'tmo-reading-list',
  templateUrl: './reading-list.component.html',
  styleUrls: ['./reading-list.component.scss']
})
export class ReadingListComponent {
  readingList$ = this.store.select(getReadingList);

  constructor(private readonly store: Store, private snackBar: MatSnackBar) {}

  addBookToReadingList(book: Book) {
    this.store.dispatch(addToReadingList({ book }));
    this.openSnackBar(`${book.title} added`, 'Undo', book);
  }

  removeFromReadingList(item) {
    this.store.dispatch(removeFromReadingList({ item }));
    this.openSnackBar(`${item.title} removed`, 'Undo', item);
  }

  openSnackBar(message: string, action: string, book: Book) {
    const snackBarRef = this.snackBar.open(message, action, {
      duration: 5000
    });
    snackBarRef.onAction().subscribe(() => this.addBookToReadingList(book));
  }
}
