import {Injectable} from '@angular/core';
import {ITruckEvent} from '../interfaces/truck-event.interface';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  eventsLog: ITruckEvent[];
  details: BehaviorSubject<any> = new BehaviorSubject(null);

  constructor() {
  }

  gatherDetails(itemIndex) {
    const details = {
      type: this.eventsLog[itemIndex].type,
      start: {
        time: this.eventsLog[itemIndex].time,
        latitude: this.eventsLog[itemIndex].latitude,
        longitude: this.eventsLog[itemIndex].longitude,
      },
      end: {
        time: this.eventsLog[itemIndex + 1].time,
        latitude: this.eventsLog[itemIndex + 1].latitude,
        longitude: this.eventsLog[itemIndex + 1].longitude,
      },
    };

    this.details.next(details);
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
