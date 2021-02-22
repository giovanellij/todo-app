import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { firebaseCollections } from 'src/app/core/enums/firebase-collections.enum';

@Injectable({
  providedIn: 'root'
})
export class TodosService {
  private todosCollection: AngularFirestoreCollection<any>;

  constructor(private firestore: AngularFirestore) {
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

  getByFilters(filters, sorting: string = '') {
    console.log(filters);
    console.log(sorting);
    this.todosCollection = this.firestore.collection<any>(firebaseCollections.todos, ref => {
      let query = ref;

      if(sorting.length > 0)
        query.orderBy(sorting);

      if(filters.priority?.length > 0)
        query.where('priority', '==', filters.priority);

      if(filters.completed)
        query.where('completed', '==', filters.completed);

      return query
    });

    return this.todosCollection.valueChanges({ idField: 'id'})
  }

  update(todo: any) {
    return this.todosCollection.doc(todo.id).set(todo);
  }
}
