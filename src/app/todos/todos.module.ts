import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { TodosRoutingModule } from './todos-routing.module';
import { MaterialModule } from '../common/material/material.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    IonicModule,
    TodosRoutingModule,
    MaterialModule,
  ]
})
export class TodosModule { }
