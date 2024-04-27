import { Component, ChangeDetectionStrategy  } from '@angular/core';
import { AlertsService } from './alerts.service';
import { Alert } from './alert';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-alerts',
  standalone: true,
  imports: [NgFor],
  templateUrl: './alerts.component.html',
  styleUrl: './alerts.component.scss',
  changeDetection: ChangeDetectionStrategy.Default
})
export class AlertsComponent {
  constructor(
    private alertsSrv: AlertsService
  ) {
    this.Alerts = this.alertsSrv.Alerts().map(a => a.alert);
  }

  ItemId(index: number, item: any) {
    return item.Id; 
  }

  public Alerts: Array<Alert>;
}
