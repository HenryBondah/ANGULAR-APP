import { Component, OnInit } from '@angular/core';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'cms-contact-list',
  standalone: false,
  templateUrl: './contact-list.html',
  styleUrl: './contact-list.css'
})
export class ContactList implements OnInit {
  contacts: Contact[] = [];
  private subscription: Subscription = new Subscription();

  constructor(private contactService: ContactService) {}

  ngOnInit(): void {
    this.contacts = this.contactService.getContacts();
    this.subscription = this.contactService.contactListChangedEvent.subscribe((contacts: Contact[]) => {
      this.contacts = contacts;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onSelectedContact(contact: Contact) {
    this.contactService.contactSelectedEvent.next(contact);
  }

  onAddContact() {
    const id = Date.now().toString();
    const newContact = new Contact(id, 'New Contact', 'you@example.com', '', 'assets/images/default.png', null);
    this.contactService.addContact(newContact);
    this.contactService.contactSelectedEvent.next(newContact);
  }
}
