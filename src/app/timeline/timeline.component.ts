import {Component, OnInit, ViewChild} from '@angular/core';
import {DataService} from '../shared/services/data.service';

declare const google: any;

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})

export class TimelineComponent implements OnInit {
  params = {
    initWidth: 0,
    fullDuration: 0
  };
  events = {
    offEvents: [],
    sbEvents: [],
    dEvents: [],
    onEvents: [],
    durations: {
      offd: 0,
      sb: 0,
      d: 0,
      ond: 0,
    }
  };
  test = 0;

  constructor(
    private dataService: DataService
  ) {
  }

  ngOnInit(): void {
    this.dataService.setDemoLog();
    this.initTimeLine();
  }

  initTimeLine() {
    const field = document.querySelector('.tl_events-field');
    this.params.initWidth = field.clientWidth;
    this.params.fullDuration = this.dataService.eventsLog[this.dataService.eventsLog.length - 1].time - this.dataService.eventsLog[0].time;

    this.dataService.eventsLog.forEach((item, i, arr) => {
      if (!arr[i + 1]) {
        return;
      }
      const element = {
        left:  this.msToPx(item.time - arr[0].time),
        right: this.msToPx(arr[arr.length - 1].time - arr[i + 1].time),
        duration: arr[i + 1].time - item.time,
        index: i
      };
      switch (item.type) {
        case 'driving':
          this.events.dEvents.push(element);
          break;
        case 'off duty':
          this.events.offEvents.push(element);
          break;
        case 'on duty':
          this.events.onEvents.push(element);
          break;
        case 'sleeper berth':
          this.events.sbEvents.push(element);
          break;
        default:
          console.error('invalid type of event');
      }
    });

    this.events.durations.offd = this.sumDurations(this.events.offEvents);
    this.events.durations.sb = this.sumDurations(this.events.sbEvents);
    this.events.durations.d = this.sumDurations(this.events.dEvents);
    this.events.durations.ond = this.sumDurations(this.events.onEvents);

  }

  itemSelectHandler(event, evItem) {
    this.dataService.gatherDetails(evItem.index);

    if (document.querySelector('.tl_event-bar_item--selected')) {
      document.querySelector('.tl_event-bar_item--selected').classList.remove('tl_event-bar_item--selected');
    }
    event.target.classList.add('tl_event-bar_item--selected');
    this.createDragItems(event.target, evItem);
  }

  createDragItems(container: HTMLElement, evItem) {
    if (document.querySelector('.item_left-drag')) {
      document.querySelector('.item_left-drag').remove();
      document.querySelector('.item_right-drag').remove();
    }
    const leftDrag = document.createElement('div');
    const rightDrag = document.createElement('div');
    leftDrag.classList.add('item_left-drag');
    rightDrag.classList.add('item_right-drag');
    container.appendChild(leftDrag);
    container.appendChild(rightDrag);

    leftDrag.addEventListener('mousedown', lev => {
      const initLeft = evItem.left;
      leftDrag.addEventListener('mousemove', le => {
        evItem.left = (initLeft + le.clientX - lev.clientX);
      });
    });

    rightDrag.addEventListener('mousedown', rev => {
      const initRight = evItem.right;
      rightDrag.addEventListener('mousemove', re => {
        evItem.right = (initRight + rev.clientX - re.clientX);
      });
    });

  }

  msToPx(duration: Date): number {
    return (this.params.initWidth * duration) / this.params.fullDuration;
  }

  pxToMs(px): number {
    return (this.params.fullDuration * px) / this.params.initWidth;
  }

  sumDurations(eventArr): number {
    return eventArr.reduce((acc, item) => acc + item.duration, 0);
  }
}

//
// console.log( new Date (+this.dataService.eventsLog[0].time + this.pxToMs(evItem.left)));
// console.log( new Date (this.dataService.eventsLog[this.dataService.eventsLog.length - 1].time - this.pxToMs(evItem.right)));
