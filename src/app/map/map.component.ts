import {Component, OnInit} from '@angular/core';
import {DataService} from '../shared/services/data.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  origin = {
    latitude: 0,
    longitude: 0
  };
  destination = {
    latitude: 0,
    longitude: 0
  };

  constructor(
    private dataService: DataService,
  ) {
    this.dataService.details.start.latitude.subscribe(val => this.origin.latitude = val);
    this.dataService.details.start.longitude.subscribe(val => this.origin.longitude = val);

    this.dataService.details.end.latitude.subscribe(val => this.destination.latitude = val);
    this.dataService.details.end.longitude.subscribe(val => this.destination.longitude = val);


  }

  ngOnInit(): void {
  }
}
