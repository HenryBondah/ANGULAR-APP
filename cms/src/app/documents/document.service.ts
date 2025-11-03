import { Injectable, EventEmitter } from '@angular/core';
import { Document } from './document.model';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  documents: Document[] = [
    new Document('1', 'Sample Doc 1', 'A sample document', '#'),
    new Document('2', 'Sample Doc 2', 'Another sample document', '#')
  ];

  documentSelectedEvent: EventEmitter<Document> = new EventEmitter<Document>();
  documentsChanged: EventEmitter<Document[]> = new EventEmitter<Document[]>();

  getDocuments(): Document[] {
    return this.documents.slice();
  }

  getDocument(id: string): Document | null {
    for (const d of this.documents) {
      if (d.id === id) {
        return d;
      }
    }
    return null;
  }

  addDocument(doc: Document) {
    this.documents.push(doc);
    this.documentsChanged.emit(this.getDocuments());
  }

  updateDocument(updated: Document) {
    const idx = this.documents.findIndex(d => d.id === updated.id);
    if (idx > -1) {
      this.documents[idx] = updated;
      this.documentsChanged.emit(this.getDocuments());
      this.documentSelectedEvent.emit(updated);
    }
  }

  deleteDocument(id: string) {
    const idx = this.documents.findIndex(d => d.id === id);
    if (idx > -1) {
      this.documents.splice(idx, 1);
      this.documentsChanged.emit(this.getDocuments());
      // clear selection by emitting null via a simple pattern: emit nothing
    }
  }
}
 

