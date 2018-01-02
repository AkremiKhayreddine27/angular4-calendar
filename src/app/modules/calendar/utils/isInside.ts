import { CalendarEvent } from './CalendarEvent';
import * as dateFns from 'date-fns';

  export const validateEvents = (events: CalendarEvent[]) => {
    const warn = (...args: any[]) => console.warn('angular-calendar', ...args);
    return validateEventsWithoutLog(events, warn);
  };

  export function isInside(outer: ClientRect, inner: ClientRect): boolean {
    return (
      outer.left <= inner.left &&
      inner.left <= outer.right &&
      outer.left <= inner.right &&
      inner.right <= outer.right &&
      outer.top <= inner.top &&
      inner.top <= outer.bottom &&
      outer.top <= inner.bottom &&
      inner.bottom <= outer.bottom
    );
  }
  export function validateEventsWithoutLog(
    events: CalendarEvent[],
    log: (...args: any[]) => void
  ): boolean {
    let isValid = true;

    function isError(msg: string, event: CalendarEvent): void {
      log(msg, event);
      isValid = false;
    }

    if (!Array.isArray(events)) {
      log(EventValidationErrorMessage.NotArray, events);
      return false;
    }

    events.forEach(event => {
      if (!event.start) {
        isError(EventValidationErrorMessage.StartPropertyMissing, event);
      } else if (!dateFns.isDate(event.start)) {
        isError(EventValidationErrorMessage.StartPropertyNotDate, event);
      }

      if (event.end) {
        if (!dateFns.isDate(event.end)) {
          isError(EventValidationErrorMessage.EndPropertyNotDate, event);
        }
        if (event.start > event.end) {
          isError(EventValidationErrorMessage.EndsBeforeStart, event);
        }
      }
    });

    return isValid;
}
export enum EventValidationErrorMessage {
    NotArray = 'Events must be an array',
    StartPropertyMissing = 'Event is missing the `start` property',
    StartPropertyNotDate = 'Event `start` property should be a javascript date object. Do `new Date(event.start)` to fix it.',
    EndPropertyNotDate = 'Event `end` property should be a javascript date object. Do `new Date(event.end)` to fix it.',
    EndsBeforeStart = 'Event `start` property occurs after the `end`'
}
