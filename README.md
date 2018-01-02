# Angular4Calendar

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.6.0.

## Getting started

First install through npm:

```bash
npm install --save angular4-calendar
```

Finally import the calendar module into your apps module:

```typescript
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CalendarModule } from 'angular4-calendar';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    CalendarModule.forRoot()
  ]
})
export class MyModule {}
```
