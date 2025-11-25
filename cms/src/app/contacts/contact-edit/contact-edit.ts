import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
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
  groupContacts: Contact[] = [];

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
      // Clone the original contact using JSON parse/stringify
      this.contact = JSON.parse(JSON.stringify(this.originalContact));
      
      // If contact has a group, clone the group array
      if (this.contact && this.contact.group) {
        this.groupContacts = JSON.parse(JSON.stringify(this.contact.group));
      }
    });
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    
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
