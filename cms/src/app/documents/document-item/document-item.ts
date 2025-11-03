import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Document } from '../document.model';

@Component({
  selector: 'cms-document-item',
  standalone: false,
  templateUrl: './document-item.html',
  styleUrl: './document-item.css'
})
export class DocumentItem {
  @Input() document: Document | null = null;
  @Output() selectDocument = new EventEmitter<Document>();

  onSelect() {
    if (this.document) {
      this.selectDocument.emit(this.document);
    }
  }
}
 