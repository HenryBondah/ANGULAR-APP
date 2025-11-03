import { Component, Input } from '@angular/core';
import { Document } from '../document.model';
import { DocumentService } from '../document.service';

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

  constructor(private documentService: DocumentService) {}

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
    this.documentService.updateDocument(updated);
    this.isEditing = false;
  }

  onCancel() {
    this.isEditing = false;
  }

  onDelete() {
    if (!this.document) { return; }
    this.documentService.deleteDocument(this.document.id);
    this.document = null;
  }
}