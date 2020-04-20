import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {MapComponent} from './map/map.component';
import {AgmCoreModule} from '@agm/core';
import { TimelineComponent } from './timeline/timeline.component';
import { Ng2GoogleChartsModule } from 'ng2-google-charts';
import { EventInfoComponent } from './event-info/event-info.component';
import {AgmDirectionModule} from 'agm-direction';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    TimelineComponent,
    EventInfoComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBrJJPjO7QDaFWV4DpizI00zMF-rR_SjLI'
    }),
    AgmDirectionModule,
    Ng2GoogleChartsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
