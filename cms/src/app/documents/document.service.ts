import { Injectable } from '@angular/core';
import { Document } from './document.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  documents: Document[] = [
    new Document('1', 'Sample Doc 1', 'A sample document', '#'),
    new Document('2', 'Sample Doc 2', 'Another sample document', '#')
  ];
  private maxDocumentId: number = 2;

  documentListChangedEvent = new Subject<Document[]>();
  documentSelectedEvent = new Subject<Document>();

  constructor() {
    this.maxDocumentId = this.getMaxId();
  }

  getDocuments(): Document[] {
    return this.documents.slice();
  }

  getMaxId(): number {
    let maxId = 0;
    for (const doc of this.documents) {
      const currentId = parseInt(doc.id, 10);
      if (currentId > maxId) {
        maxId = currentId;
      }
    }
    return maxId;
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
    if (!doc) {
      return;
    }
    this.maxDocumentId++;
    doc.id = this.maxDocumentId.toString();
    this.documents.push(doc);
    const documentsListClone = this.documents.slice();
    this.documentListChangedEvent.next(documentsListClone);
  }

  updateDocument(originalDocument: Document, newDocument: Document) {
    if (!originalDocument || !newDocument) {
      return;
    }
    const pos = this.documents.indexOf(originalDocument);
    if (pos < 0) {
      return;
    }
    newDocument.id = originalDocument.id;
    this.documents[pos] = newDocument;
    const documentsListClone = this.documents.slice();
    this.documentListChangedEvent.next(documentsListClone);
  }

  deleteDocument(document: Document) {
    if (!document) {
      return;
    }
    const pos = this.documents.indexOf(document);
    if (pos < 0) {
      return;
    }
    this.documents.splice(pos, 1);
    const documentsListClone = this.documents.slice();
    this.documentListChangedEvent.next(documentsListClone);
  }
}
 

