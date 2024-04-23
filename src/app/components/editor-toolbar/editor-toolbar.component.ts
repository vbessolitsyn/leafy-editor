import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import { DocumentService } from '../../services/document.service';
import { IDocument } from '../../interfaces/idocument';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-editor-toolbar',
  standalone: true,
  imports: [],
  providers: [DatePipe],
  templateUrl: './editor-toolbar.component.html',
  styleUrl: './editor-toolbar.component.scss'
})
export class EditorToolbarComponent {
  private readonly inputElementName: string = 'fileOpenInput';
  public $FileLoaded: Subject<IDocument> = new Subject();

  constructor(
    private datePipe: DatePipe,
    public docSrv: DocumentService
  ) {
    this.docSrv.SubscribeForFileOpened(this.$FileLoaded);
  }

  public OpenFile(): void {
    let input = document.createElement('input');
    input.type = 'file';
    input.id = this.inputElementName;
    input.accept = '.json';
    input.onchange = _ => {
        // ToDo more efficient way to read?
        if (!input.files)
          return;
        let files = Array.from(input.files);
        if (files.length < 1)
          return;
        files[0].arrayBuffer()
          .then(ab => {
            const doc = JSON.parse(new TextDecoder().decode(ab)) as IDocument;
            if (!doc)
              return;
            this.$FileLoaded.next(doc);
            document.getElementById(this.inputElementName)?.remove();
          });
      };
    input.click();
  }

  public SaveFile(): void {
    const link = document.createElement("a");
    const content = JSON.stringify(this.docSrv.Document() ?? '');
    console.log('saving', content);
    const file = new Blob([content], { type: 'text/plain' });
    link.href = URL.createObjectURL(file);
    link.download = `data-${this.datePipe.transform(Date(), 'yyMMdd-HHmm')}.json`;
    link.click();
    URL.revokeObjectURL(link.href);
  }
}
