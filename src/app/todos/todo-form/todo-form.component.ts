import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { dateToFirestamp } from 'src/app/core/extensions/date.extension';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.scss'],
})
export class TodoFormComponent implements OnInit {

  @Input() todo: any;
  form: FormGroup;

  constructor(
    private modalCtrl: ModalController,
    private fb: FormBuilder) {
  }

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.form = this.fb.group({
      title: [this.todo?.title || '', Validators.required],
      description: this.todo?.description || '',
      date: [this.todo ? new Date(this.todo.date.seconds * 1000).toISOString().substring(0,10) : new Date().toISOString().substring(0,10), Validators.required],
      completed: this.todo?.completed || false,
      priority: [this.todo?.priority || '', Validators.required],
    })
  }

  remove() {
    this.modalCtrl.dismiss({
      'remove': true
    });
  }

  onSelectionChange(event) {
    this.form.controls.priority.setValue(event);
  }

  save() {
    this.form.controls.date.setValue(dateToFirestamp(new Date(this.form.controls.date.value)));

    this.modalCtrl.dismiss({'todo': this.form.getRawValue()});
  }
}
