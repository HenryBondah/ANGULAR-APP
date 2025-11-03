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
import { Injectable, EventEmitter } from '@angular/core';
import { Document } from './document.model';
import { MOCKDOCUMENTS } from '../../../../lesson5Files/MOCKDOCUMENTS';

@Injectable({ providedIn: 'root' })
export class DocumentService {
  documents: Document[] = [];
  documentSelectedEvent: EventEmitter<Document> = new EventEmitter<Document>();

  constructor() {
    this.documents = MOCKDOCUMENTS;
  }

  getDocuments(): Document[] {
    return this.documents.slice();
  }

  getDocument(id: string): Document | null {
    for (const doc of this.documents) {
      if (doc.id === id) {
        return doc;
      }
    }
    return null;
  }
}
