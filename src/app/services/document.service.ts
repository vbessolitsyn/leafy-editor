import { Injectable } from '@angular/core';
import { interval, Observable, Subject } from 'rxjs';
import { IDocument } from '../interfaces/idocument';
import { ILeaf } from '../interfaces/ileaf';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  private document: IDocument | undefined;
  private tags: Set<string> = new Set();
  private activeLeaf: ILeaf | undefined;
  private saveChangesInterval: Observable<number> | undefined;

  public $DocumentReady: Subject<IDocument> = new Subject();
  public $LeafChanged: Subject<ILeaf> = new Subject();

  public Tags(): ReadonlySet<string> {
    return this.tags;
  }

  public Document(): IDocument | undefined {
    return this.document;
  }

  constructor()
  { }

  public SubscribeForFileOpened(subject: Subject<IDocument>) {
    subject.subscribe({
      next: (content) => {
        this.document = content;
        this.ParseDocument(this.document);
        this.$DocumentReady.next(this.document);
      },
      error: (e) => console.error(e),
      complete: () => console.info('complete') 
    });
  }

  public SetLeaf(id: string): void {
    this.activeLeaf = this.document?.Leafs.find(leaf => leaf.Id === id);
    if (this.activeLeaf) {
      this.$LeafChanged.next(this.activeLeaf);
      this.saveChangesInterval = interval(5000);
      this.saveChangesInterval.subscribe(x => this.SaveChanges());
    }
  }

  private SaveChanges() {
    const leaf = this.document?.Leafs.find(l => l.Id === this.activeLeaf?.Id);
    if (leaf) {
      leaf.Content = this.activeLeaf?.Content;
      console.log('changes saved');
    }
  }

  private ParseDocument(doc: IDocument): void {
    this.tags = new Set(doc.Tags);
    if (doc.Leafs.length > 0)
      this.SetLeaf(doc.Leafs[0].Id);
  }
}
