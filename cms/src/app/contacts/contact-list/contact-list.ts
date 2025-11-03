import { Component, OnInit } from '@angular/core';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';

@Component({
  selector: 'cms-contact-list',
  standalone: false,
  templateUrl: './contact-list.html',
  styleUrl: './contact-list.css'
})
export class ContactList implements OnInit {
  contacts: Contact[] = [];

  constructor(private contactService: ContactService) {}

  ngOnInit(): void {
    this.contacts = this.contactService.getContacts();
    this.contactService.contactsChanged.subscribe((contacts: Contact[]) => {
      this.contacts = contacts;
    });
  }

  onSelectedContact(contact: Contact) {
    this.contactService.contactSelectedEvent.emit(contact);
  }

  onAddContact() {
    const id = Date.now().toString();
    const newContact = new Contact(id, 'New Contact', 'you@example.com', '', 'assets/images/default.png', null);
    this.contactService.addContact(newContact);
    this.contactService.contactSelectedEvent.emit(newContact);
  }
}
