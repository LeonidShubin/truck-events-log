import { Component, OnInit } from '@angular/core';
import {IEventDetails} from '../shared/interfaces/event-details.interface';
import {DataService} from '../shared/services/data.service';

@Component({
  selector: 'app-event-info',
  templateUrl: './event-info.component.html',
  styleUrls: ['./event-info.component.scss']
})
export class EventInfoComponent implements OnInit {
  details: IEventDetails = {
    type: null,
    start: {
      time: new Date(),
      latitude: 0,
      longitude: 0,
    },
    end: {
      time: new Date(),
      latitude: 0,
      longitude: 0,
    }
  };

  constructor(
    private dataService: DataService
  ) { }

  ngOnInit(): void {
    this.dataService.details.subscribe(value => {
      this.details = value;
    });

  }

  saveChanges(e) {
    this.dataService.details.next(null);
  }

}
