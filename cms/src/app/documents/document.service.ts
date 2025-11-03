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
}
 

