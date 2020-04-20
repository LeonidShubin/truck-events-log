import {Component, OnInit} from '@angular/core';
import {DataService} from './shared/services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  title = 'truckEventsLog';
  showDetails: boolean;

  constructor(
    private dataService: DataService,
  ) {
  }

  ngOnInit(): void {
    this.dataService.details.showDetails.subscribe(value => {
      this.showDetails = value;
    });
  }

}
