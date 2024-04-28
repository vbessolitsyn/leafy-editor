import { Injectable } from '@angular/core';
import { Alert } from './alert';

@Injectable({
  providedIn: 'root'
})
export class AlertsService {
  public Alerts: Array<TrackedAlert> = [];

  constructor() { }

  public AddAlert(alert: Alert) {
    const tAlert = new TrackedAlert(alert);
    this.Alerts.push(tAlert);
    console.log(`Added ${tAlert.Id}, total:${this.Alerts.length}`);
    const timer = setTimeout(
      () => {
        const id = this.Alerts.findIndex(a => a.Id === tAlert.Id)
        if (id >= 0) {
          this.Alerts.splice(id, 1);
          console.log(`Removed ${tAlert.Id}, total:${this.Alerts.length}`);
        }
      },
      5000)
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