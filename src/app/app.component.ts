import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { EditorToolbarComponent } from './components/editor-toolbar/editor-toolbar.component';
import { EditorPaneComponent } from "./components/editor-pane/editor-pane.component";
import { AlertsComponent } from "./components/alerts/alerts.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [RouterOutlet, EditorPaneComponent, EditorToolbarComponent, AlertsComponent]
})
export class AppComponent {
  title = 'leaf-editor';
}
