import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Document } from '../document.model';
import { DocumentService } from '../document.service';

@Component({
  selector: 'cms-document-edit',
  standalone: false,
  templateUrl: './document-edit.html',
  styleUrls: ['./document-edit.css']
})
export class DocumentEdit implements OnInit {
  originalDocument: Document | null = null;
  document: Document | null = null;
  editMode: boolean = false;

  constructor(
    private documentService: DocumentService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const id = params['id'];
      if (!id || id === 'new') {
        this.editMode = false;
        this.document = new Document('', '', '', '');
        return;
      }
      
      this.originalDocument = this.documentService.getDocument(id);
      if (!this.originalDocument) {
        return;
      }
      
      this.editMode = true;
      this.document = { ...this.originalDocument };
    });
  }

  onSave() {
    if (!this.document) {
      return;
    }

    if (this.editMode && this.originalDocument) {
      this.documentService.updateDocument(this.originalDocument, this.document);
    } else {
      this.documentService.addDocument(this.document);
    }
    
    this.router.navigate(['/documents']);
  }

  onCancel() {
    this.router.navigate(['/documents']);
  }
}
