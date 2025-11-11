import { Component, OnInit } from '@angular/core';
import { Document } from '../document.model';
import { DocumentService } from '../document.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'cms-document-list',
  standalone: false,
  templateUrl: './document-list.html',
  styleUrl: './document-list.css'
})
export class DocumentList implements OnInit {
  documents: Document[] = [];
  private subscription: Subscription = new Subscription();

  constructor(private documentService: DocumentService) {}

  ngOnInit(): void {
    this.documents = this.documentService.getDocuments();
    this.subscription = this.documentService.documentListChangedEvent.subscribe((docs: Document[]) => {
      this.documents = docs;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onSelectedDocument(document: Document) {
    this.documentService.documentSelectedEvent.next(document);
  }

  onAddDocument() {
    const id = Date.now().toString();
    const newDoc = new Document(id, 'New Document', 'Enter description...', '#');
    this.documentService.addDocument(newDoc);
    // select the newly added doc
    this.documentService.documentSelectedEvent.next(newDoc);
  }
}