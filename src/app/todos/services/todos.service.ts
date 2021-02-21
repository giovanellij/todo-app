import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { firebaseCollections } from 'src/app/common/enums/firebase-collections.enum';

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

  update(todo: any) {
    return this.todosCollection.doc(todo.id).set({todo});
  }
}
