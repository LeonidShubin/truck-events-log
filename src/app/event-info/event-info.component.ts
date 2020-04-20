import {Component, OnInit} from '@angular/core';
import {DataService} from '../shared/services/data.service';

@Component({
  selector: 'app-event-info',
  templateUrl: './event-info.component.html',
  styleUrls: ['./event-info.component.scss']
})
export class EventInfoComponent implements OnInit {
  details = {
    type: null,
    start: new Date(),
    end: new Date(),
  };

  constructor(
    private dataService: DataService
  ) {
  }

  ngOnInit(): void {
    this.dataService.details.type.subscribe(val => this.details.type = val);
    this.dataService.details.start.time.subscribe(val => this.details.start = val);
    this.dataService.details.end.time.subscribe(val => this.details.end = val);

  }

  saveChanges(e) {
    const index = this.dataService.details.index.getValue();
    this.dataService.eventsLog[index].time = this.dataService.details.start.time.getValue();
    this.dataService.eventsLog[index + 1].time = this.dataService.details.end.time.getValue();
    this.dataService.details.showDetails.next(false);
  }

}
