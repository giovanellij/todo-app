import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { TodosRoutingModule } from './todos-routing.module';
import { TodosListComponent } from './todos-list/todos-list.component';
import { TodoFormComponent } from './todo-form/todo-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PrioritySelectorComponent } from '../core/components/priority-selector/priority-selector.component';
import { FiltersComponent } from '../core/components/filters/filters.component';


@NgModule({
  declarations: [TodosListComponent, TodoFormComponent, PrioritySelectorComponent, FiltersComponent],
  entryComponents: [TodoFormComponent, FiltersComponent],
  imports: [
    CommonModule,
    IonicModule,
    TodosRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class TodosModule { }
