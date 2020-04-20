import {Injectable} from '@angular/core';
import {ITruckEvent} from '../interfaces/truck-event.interface';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  eventsLog: ITruckEvent[];
  details = {
    type: new BehaviorSubject(null),
    index: new BehaviorSubject(null),
    start: {
      time: new BehaviorSubject(null),
      latitude: new BehaviorSubject(null),
      longitude: new BehaviorSubject(null),
    },
    end: {
      time: new BehaviorSubject(null),
      latitude: new BehaviorSubject(null),
      longitude: new BehaviorSubject(null),
    },
    showDetails: new BehaviorSubject(false)
  };

  constructor() {
  }

  gatherDetails(itemIndex) {
    this.details.index.next(itemIndex);
    this.details.type.next(this.eventsLog[itemIndex].type);
    this.details.start.time.next(this.eventsLog[itemIndex].time);
    this.details.start.latitude.next(this.eventsLog[itemIndex].latitude);
    this.details.start.longitude.next(this.eventsLog[itemIndex].longitude);
    this.details.end.time.next(this.eventsLog[itemIndex + 1].time);
    this.details.end.latitude.next(this.eventsLog[itemIndex + 1].latitude);
    this.details.end.longitude.next(this.eventsLog[itemIndex + 1].longitude);
  }

  setDemoLog() {
    this.eventsLog = [
      {
        type: 'sleeper berth',
        time: new Date(2020, 3, 1, 0, 0),
        latitude: 46.9655356,
        longitude: 32.000049,
      },
      {
        type: 'off duty',
        time: new Date(2020, 3, 1, 6, 6),
        latitude: 46.9655356,
        longitude: 32.000049,
      },
      {
        type: 'driving',
        time: new Date(2020, 3, 1, 7, 13),
        latitude: 46.9655356,
        longitude: 32.000049,
      },
      {
        type: 'on duty',
        time: new Date(2020, 3, 1, 10, 44),
        latitude: 46.9631499,
        longitude: 31.9599947,
      },
      {
        type: 'off duty',
        time: new Date(2020, 3, 1, 12, 3),
        latitude: 46.9631499,
        longitude: 31.9599947,
      },
      {
        type: 'driving',
        time: new Date(2020, 3, 1, 14, 0),
        latitude: 46.9631499,
        longitude: 31.9599947,
      },
      {
        type: 'on duty',
        time: new Date(2020, 3, 1, 16, 20),
        latitude: 46.9414184,
        longitude: 32.0517107,
      },
      {
        type: 'off duty',
        time: new Date(2020, 3, 1, 18, 13),
        latitude: 46.9655356,
        longitude: 32.000049,
      },
      {
        type: 'sleeper berth',
        time: new Date(2020, 3, 1, 23, 17),
        latitude: 46.9655356,
        longitude: 32.000049,
      },
    ];

  }
}
