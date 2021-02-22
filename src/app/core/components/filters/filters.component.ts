import { Component, Input, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss'],
})
export class FiltersComponent implements OnInit {

  @Input() filters: any;

  constructor(public popoverController: PopoverController) { }

  ngOnInit() {}

  applyFilters() {
    this.popoverController.dismiss({'filters': this.filters});
  }

  clearFilters() {
    this.filters.priority = undefined;
    this.filters.completed = undefined;
    this.applyFilters();
  }

  onSelectionChange(event) {
    this.filters.priority = event;
  }
}
