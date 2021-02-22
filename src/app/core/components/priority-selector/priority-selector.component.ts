import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-priority-selector',
  templateUrl: './priority-selector.component.html',
  styleUrls: ['./priority-selector.component.scss'],
})
export class PrioritySelectorComponent implements OnChanges {

  @Input() initial: any;

  @Output() selectedPriority: EventEmitter<string> = new EventEmitter<string>();

  selected = '';

  constructor() { }

  ngOnChanges() {
    if (this.initial) {
      this.selected = this.initial;
    }
  }

  onSelected(): void {
    this.selectedPriority.emit(this.selected);
  }
}
