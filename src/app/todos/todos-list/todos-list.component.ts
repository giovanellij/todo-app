import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { TodosService } from '../services/todos.service';

@Component({
  selector: 'app-todos-list',
  templateUrl: './todos-list.component.html',
  styleUrls: ['./todos-list.component.scss'],
})
export class TodosListComponent implements OnInit {

  protected dataSource$ = new Observable<any[]>();
  protected dataSourceSub: Subscription;
  protected dataSource = new BehaviorSubject<any[]>(null);

  constructor(
    private todos: TodosService
    ) {
  }

  ngOnInit() {
    this.dataSource$ = this.loadFeed();
    this.dataSourceSub = this.dataSource$.subscribe(data => this.dataSource.next(data));
    this.dataSource.subscribe(res => console.log(res));
  }

  loadFeed() {
    return this.todos.getAll();
  }
}
