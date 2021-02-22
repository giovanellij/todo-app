import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { TodosService } from '../services/todos.service';
import { TodoFormComponent } from '../todo-form/todo-form.component';
import { ModalController, PopoverController } from '@ionic/angular';
import { FiltersComponent } from '../../core/components/filters/filters.component';
import { ToastrService } from 'src/app/core/services/toastr.service';

@Component({
  selector: 'app-todos-list',
  templateUrl: './todos-list.component.html',
  styleUrls: ['./todos-list.component.scss'],
})
export class TodosListComponent implements OnInit {

  public dataSource$ = new Observable<any[]>();
  public dataSourceSub: Subscription;
  public dataSource = new BehaviorSubject<any[]>(null);

  public filters = {
    priority: undefined,
    completed: undefined
  }
  public sorting = ''

  constructor(
    public modalController: ModalController,
    public popoverController: PopoverController,
    private todos: TodosService,
    private toastr: ToastrService
    ) {
  }

  ngOnInit() {
    this.refresh();
  }

  async create() {
    await this.presentModal();
  }

  async update(todo) {
    await this.presentModal(todo);
  }

  getPriorityColor(priority) {
    switch (priority) {
      case 'Low':
        return 'success'
        break;
      case 'Medium':
        return 'warning'
        break;
      case 'High':
        return 'danger'
        break;
    }
  }

  refresh () {
    this.dataSource$ = this.loadFeed();
    this.dataSourceSub = this.dataSource$.subscribe(data => this.dataSource.next(data));
    this.dataSource.subscribe(res => console.log(res));
  }

  loadFeed() {
    return this.todos.getByFilters(this.filters, this.sorting);
  }

  markAsCompleted(event, todo) {
    todo.completed = event.detail.checked;
    this.todos.update(todo)
      .then(res => {
        this.toastr.show('Todo updated successfully!');
      })
      .catch(error => {
        console.log(error);
        this.toastr.show(`${error}`);
      });
  }

  onSelectionChange(event) {
    this.filters.priority = event;
    this.refresh();
  }

  async presentModal(todo = null) {
    const modal = await this.modalController.create({
      component: TodoFormComponent,
      componentProps: {
        todo
      }
    });

    await modal.present();

    await modal.onDidDismiss().then(modalResponse => {
      const remove = modalResponse.data?.remove;
      if (modalResponse.data?.todo) {
        if(todo) {
          this.todos.update({ id: todo.id, ...modalResponse.data.todo})
            .then(res => {
              this.toastr.show('Todo updated successfully!');
            })
            .catch(error => {
              console.log(error);
              this.toastr.show(`${error}`);
            });
        } else {
          this.todos.add(modalResponse.data?.todo)
            .then(res => {
              this.toastr.show('Todo created successfully!');
            })
            .catch(error => {
              console.log(error);
              this.toastr.show(`${error}`);
            });
        }
      }

      if(remove) {
        this.todos.delete(todo)
          .then(res => {
            this.toastr.show('Todo deleted successfully!');
          })
          .catch(error => {
            console.log(error);
            this.toastr.show(`${error}`);
          });
      }
    });
  }

  async presentPopover() {
    const popover = await this.popoverController.create({
      component: FiltersComponent,
      componentProps: {
        filters: this.filters
      },
      translucent: true
    });

    await popover.present();

    await popover.onDidDismiss().then(modalResponse => {

      const filters = modalResponse.data?.filters;

      if (filters) {
        this.filters.completed = filters.completed;
        this.filters.priority = filters.priority;
        this.refresh();
      }
    });
  }

  async setFilters() {
    await this.presentPopover();
  }
}
