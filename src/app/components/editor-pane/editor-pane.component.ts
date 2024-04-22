import { Component } from '@angular/core';
import { DocumentService } from '../../services/document.service';
import { ILeaf } from '../../interfaces/ileaf';

@Component({
    selector: 'app-editor-pane',
    standalone: true,
    templateUrl: './editor-pane.component.html',
    styleUrl: './editor-pane.component.scss'
})
export class EditorPaneComponent {
public Leaf: ILeaf | undefined;

constructor(
  public docSrv: DocumentService
)
{
  docSrv.$LeafChanged.subscribe(leaf => {
    this.Leaf = leaf;
  });
}

onNameChange(arg: any) {
  console.log('content changed', arg);
}

}
