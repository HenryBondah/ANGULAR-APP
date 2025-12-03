import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  constructor(private http: HttpClient) {
    this.maxDocumentId = this.getMaxId();
    this.http.get<{ documents: Document[] }>('https://your-firebase-url.firebaseio.com/documents.json')
      .subscribe(
        (documents: { documents: Document[] }) => {
          this.documents = documents.documents;
          this.maxDocumentId = this.getMaxId();
          // sort the list of documents
          this.documents.sort((a, b) => a.name > b.name ? 1 : -1);
          // emit the next document list change event
          this.documentListChangedEvent.next(this.documents.slice());
        },
        // error method
        (error: any) => {
          console.log(error);
        }
      );
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
    this.storeDocuments();
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
    this.storeDocuments();
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
    this.storeDocuments();
  }

  storeDocuments() {
    const documents = JSON.stringify(this.documents);
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http.put('https://your-firebase-url.firebaseio.com/documents.json', documents, { headers: headers })
      .subscribe(() => {
        this.documentListChangedEvent.next(this.documents.slice());
      });
  }
}
 



