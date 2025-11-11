import { Component, Input, OnInit } from '@angular/core';
import { Document } from '../document.model';
import { DocumentService } from '../document.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'cms-document-detail',
  standalone: false,
  templateUrl: './document-detail.html',
  styleUrl: './document-detail.css'
})
export class DocumentDetail {
  @Input() document: Document | null = null;
  isEditing: boolean = false;
  editName: string = '';
  editDesc: string = '';
  editUrl: string = '';

  constructor(private documentService: DocumentService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    // subscribe to route params if present
    this.route.params.subscribe((params: Params) => {
      const id = params['id'];
      if (id) {
        const doc = this.documentService.getDocument(id);
        if (doc) {
          this.document = doc;
        }
      }
    });
  }

  onView() {
    if (this.document && this.document.url) {
      window.open(this.document.url, '_blank');
    }
  }

  onEdit() {
    if (this.document) {
      this.editName = this.document.name;
      this.editDesc = this.document.description;
      this.editUrl = this.document.url || '';
    }
    this.isEditing = true;
  }

  onSave() {
    if (!this.document) { return; }
    const updated = new Document(this.document.id, this.editName || this.document.name, this.editDesc || this.document.description, this.editUrl || this.document.url);
    this.documentService.updateDocument(this.document, updated);
    this.document = updated;
    this.isEditing = false;
  }

  onCancel() {
    this.isEditing = false;
  }

  onDelete() {
    if (!this.document) { return; }
    this.documentService.deleteDocument(this.document);
    this.document = null;
  }
}