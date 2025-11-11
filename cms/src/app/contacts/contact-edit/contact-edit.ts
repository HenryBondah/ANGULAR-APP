import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';

@Component({
  selector: 'cms-contact-edit',
  standalone: false,
  templateUrl: './contact-edit.html',
  styleUrls: ['./contact-edit.css']
})
export class ContactEdit implements OnInit {
  originalContact: Contact | null = null;
  contact: Contact | null = null;
  editMode: boolean = false;

  constructor(
    private contactService: ContactService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const id = params['id'];
      if (!id || id === 'new') {
        this.editMode = false;
        this.contact = new Contact('', '', '', '', '', null);
        return;
      }
      
      this.originalContact = this.contactService.getContact(id);
      if (!this.originalContact) {
        return;
      }
      
      this.editMode = true;
      this.contact = { ...this.originalContact };
    });
  }

  onSave() {
    if (!this.contact) {
      return;
    }

    if (this.editMode && this.originalContact) {
      this.contactService.updateContact(this.originalContact, this.contact);
    } else {
      this.contactService.addContact(this.contact);
    }
    
    this.router.navigate(['/contacts']);
  }

  onCancel() {
    this.router.navigate(['/contacts']);
  }
}
