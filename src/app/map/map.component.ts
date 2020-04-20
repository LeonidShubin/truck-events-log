import { Component, OnInit } from '@angular/core';
import {MapService} from '../shared/services/map.service';
import {DataService} from '../shared/services/data.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  showDirection: boolean;
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
    private  mapService: MapService
  ) {

    this.dataService.details.subscribe(value => {
      if (!value) { return; }
      this.showDirection = false;
      this.origin.latitude = value.start.latitude;
      this.origin.longitude = value.start.longitude;
      if (value.start.latitude !== value.end.latitude && value.start.longitude !== value.end.longitude) {
        this.showDirection = true;
        this.destination.latitude = value.end.latitude;
        this.destination.longitude = value.end.longitude;
      }
    });
  }

  ngOnInit(): void {
  }

}
