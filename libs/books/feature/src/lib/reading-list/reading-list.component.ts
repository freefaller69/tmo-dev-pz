import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  getReadingList,
  removeFromReadingList,
  addToReadingList,
  markBookAsCompleted
} from '@tmo/books/data-access';
import { Book, ReadingListItem } from '@tmo/shared/models';
import { Update } from '@ngrx/entity';

@Component({
  selector: 'tmo-reading-list',
  templateUrl: './reading-list.component.html',
  styleUrls: ['./reading-list.component.scss']
})
export class ReadingListComponent {
  readingList$ = this.store.select(getReadingList);

  constructor(private readonly store: Store) {}

  addBookToReadingList(book: Book) {
    this.store.dispatch(addToReadingList({ book }));
  }

  removeFromReadingList(item) {
    this.store.dispatch(removeFromReadingList({ item }));
  }

  markBookCompleted(book) {
    const updatedItem: ReadingListItem = {
      ...book,
      finished: true,
      finishedDate: new Date().toISOString()
    }

    const update: Update<ReadingListItem> = {
      id: updatedItem.bookId,
      changes: updatedItem
    }

    this.store.dispatch(markBookAsCompleted({ update }));
  }
}
