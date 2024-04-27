import { Injectable } from '@angular/core';
import { Alert } from './alert';

@Injectable({
  providedIn: 'root'
})
export class AlertsService {
  private alerts: Array<TrackedAlert> = [];

  constructor() { }

  public AddAlert(alert: Alert) {
    const tAlert = new TrackedAlert(alert);
    this.alerts.push(tAlert);
    console.log(`Added ${tAlert.Id}, total:${this.alerts.length}`);
    const timer = setTimeout(
      () => {
        const id = this.alerts.findIndex(a => a.Id === tAlert.Id)
        if (id >= 0) {
          this.alerts.splice(id, 1);
          console.log(`Removed ${tAlert.Id}, total:${this.alerts.length}`);
        }
      },
      3000)
  }

  public Alerts(): ReadonlyArray<TrackedAlert> {
    return this.alerts;
  }
}

class TrackedAlert {
  static _id: number = 0;

  public Id: number;

  constructor(
    public alert: Alert
  ) {
    this.Id = TrackedAlert._id++;
  }
}