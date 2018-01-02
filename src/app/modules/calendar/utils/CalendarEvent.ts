import { EventColor } from './EventColor';
import { EventAction } from './EventAction';

export interface CalendarEvent<MetaType = any> {
    start: Date;
    end: Date;
    title: string;
    color: EventColor;
    actions?: EventAction[];
    allDay?: boolean;
    cssClass?: string;
    resizable?: {
      beforeStart?: boolean;
      afterEnd?: boolean;
    };
    draggable?: boolean;
    meta?: MetaType;
  }
