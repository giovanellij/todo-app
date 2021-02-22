import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { firebaseCollections } from 'src/app/core/enums/firebase-collections.enum';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TodosService {

  priorityFilter$: BehaviorSubject<string|null>;
  completedFilter$: BehaviorSubject<boolean|null>;
  sorting$: BehaviorSubject<string|null>;

  private todosCollection: AngularFirestoreCollection<any>;

  constructor(private firestore: AngularFirestore) {

    this.priorityFilter$ = new BehaviorSubject(null);
    this.completedFilter$ = new BehaviorSubject(null);
    this.sorting$ = new BehaviorSubject(null);

    this.todosCollection = this.firestore
      .collection(firebaseCollections.todos);
  }

  add(todo) {
    return this.todosCollection.add(todo);
  }

  delete(todo: any) {
    return this.todosCollection.doc(todo.id).delete();
  }

  getAll() {
    return this.todosCollection.valueChanges({ idField: 'id'});
  }

  getByFilters(filters, sorting: string = undefined) {
    this.priorityFilter$.next(filters.priority);
    this.completedFilter$.next(filters.completed);
    this.sorting$.next(sorting);
    return combineLatest(
      this.priorityFilter$,
      this.completedFilter$,
      this.sorting$
    ).pipe(
      switchMap(([priority, completed, sorting]) =>
        this.firestore.collection('todos', ref => {
          let query : firebase.default.firestore.CollectionReference | firebase.default.firestore.Query = ref;
          if (priority) { query = query.where('priority', '==', priority) };
          if (completed) { query = query.where('completed', '==', completed) };
          if (sorting) { query = query.orderBy(sorting) };
          return query;
        }).valueChanges()
      )
    );
  }

  update(todo: any) {
    return this.todosCollection.doc(todo.id).set(todo);
  }
}
