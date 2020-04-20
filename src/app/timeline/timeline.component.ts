import {Component, OnInit} from '@angular/core';
import {DataService} from '../shared/services/data.service';

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
  selectedItem = {
    original: null,
    clone: null,
  };

  constructor(
    private dataService: DataService
  ) {
  }

  ngOnInit(): void {
    this.dataService.setDemoLog();
    this.initTimeLine();
    this.dataService.details.showDetails.subscribe(val => {
      if (!val) {
        this.removeSelection();
        this.reInitTimeLine();
      }
    });
  }

  initTimeLine() {
    const field = document.querySelector('.tl_events-field');
    const dataArr = this.dataService.eventsLog;
    this.params.initWidth = field.clientWidth;
    this.params.fullDuration = +dataArr[dataArr.length - 1].time - +dataArr[0].time;

    dataArr.forEach((item, i, arr) => {
      if (!arr[i + 1]) {
        return;
      }

      const element = {
        left: this.msToPx(+item.time - +arr[0].time),
        right: this.msToPx(+arr[arr.length - 1].time - +arr[i + 1].time),
        duration: +arr[i + 1].time - +item.time,
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
    if (!event.target.classList.contains('tl_event-bar_item')) {
      return;
    }

    this.removeSelection();
    this.selectedItem.clone = {...evItem};
    this.selectedItem.original = evItem;

    this.dataService.gatherDetails(evItem.index);
    this.dataService.details.showDetails.next(true);

    event.target.classList.add('tl_event-bar_item--selected');

    this.createDragItems(event.target, evItem, this);
  }

  createDragItems(container: HTMLElement, evItem, context) {
    const arr = context.dataService.eventsLog;

    const leftDrag = document.createElement('div');
    const rightDrag = document.createElement('div');
    leftDrag.classList.add('item_left-drag');
    rightDrag.classList.add('item_right-drag');
    container.appendChild(leftDrag);
    container.appendChild(rightDrag);

    leftDrag.addEventListener('mousedown', lev => {
      const initLeft = evItem.left;

      leftDrag.addEventListener('mousemove', handler);

      leftDrag.addEventListener('mouseup', () => {
        leftDrag.removeEventListener('mousemove', handler);
      });

      function handler(event) {
        const expression = initLeft + event.clientX - lev.clientX;
        const conditionMin = () => {
          if (arr[evItem.index - 1]) {
            return expression <= context.msToPx(arr[evItem.index - 1].time - arr[0].time);
          } else {
            return !expression;
          }
        };

        if (conditionMin()) {
          return;
        }

        evItem.left = expression;

        context.dataService.details.start.time.next(new Date(+arr[0].time + context.pxToMs(evItem.left)));
      }
    });

    rightDrag.addEventListener('mousedown', rev => {
      const initRight = evItem.right;

      rightDrag.addEventListener('mousemove', handler);

      rightDrag.addEventListener('mouseup', () => {
        rightDrag.removeEventListener('mousemove', handler);
      });

      function handler(event) {
        const expression = initRight + rev.clientX - event.clientX;
        const conditionMax = () => {
          if (arr[evItem.index + 1]) {
            return expression <= initRight;
          } else {
            return !expression;
          }
        };

        if (conditionMax()) {
          return;
        }

        evItem.right = expression;

        context.dataService.details.end.time
          .next(new Date(context.dataService.eventsLog[context.dataService.eventsLog.length - 1].time - context.pxToMs(evItem.right)));
      }
    });

  }

  msToPx(duration): number {
    return (this.params.initWidth * +duration) / this.params.fullDuration;
  }

  pxToMs(px): number {
    return (this.params.fullDuration * px) / this.params.initWidth;
  }

  sumDurations(eventArr): number {
    return eventArr.reduce((acc, item) => acc + item.duration, 0);
  }

  removeSelection() {
    if (document.querySelector('.tl_event-bar_item--selected')) {
      document.querySelector('.tl_event-bar_item--selected').classList.remove('tl_event-bar_item--selected');
    }

    if (document.querySelector('.item_left-drag')) {
      document.querySelector('.item_left-drag').remove();
      document.querySelector('.item_right-drag').remove();
    }

    if (this.selectedItem.original) {
      this.selectedItem.original.right = this.selectedItem.clone.right;
      this.selectedItem.original.left = this.selectedItem.clone.left;
    }
  }

  reInitTimeLine() {
    this.events.onEvents = [];
    this.events.sbEvents = [];
    this.events.dEvents = [];
    this.events.offEvents = [];
    this.initTimeLine();
  }
}
