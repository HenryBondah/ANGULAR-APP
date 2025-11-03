import { Injectable, EventEmitter } from '@angular/core';
import { Contact } from './contact.model';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  contacts: Contact[] = [
    new Contact('1', 'R. Kent Jackson', 'jacksonk@byui.edu', '208-496-3771', 'assets/images/jacksonk.jpg', null),
    new Contact('2', 'Rex Barzee', 'barzeer@byui.edu', '208-496-3768', 'assets/images/barzeer.jpg', null)
  ];

  contactSelectedEvent: EventEmitter<Contact> = new EventEmitter<Contact>();
  contactsChanged: EventEmitter<Contact[]> = new EventEmitter<Contact[]>();

  getContacts(): Contact[] {
    return this.contacts.slice();
  }

  getContact(id: string): Contact | null {
    for (const c of this.contacts) {
      if (c.id === id) {
        return c;
      }
    }
    return null;
  }

  addContact(contact: Contact) {
    this.contacts.push(contact);
    this.contactsChanged.emit(this.getContacts());
  }

  updateContact(updated: Contact) {
    const idx = this.contacts.findIndex(c => c.id === updated.id);
    if (idx > -1) {
      this.contacts[idx] = updated;
      this.contactsChanged.emit(this.getContacts());
      this.contactSelectedEvent.emit(updated);
    }
  }

  deleteContact(id: string) {
    const idx = this.contacts.findIndex(c => c.id === id);
    if (idx > -1) {
      this.contacts.splice(idx, 1);
      this.contactsChanged.emit(this.getContacts());
    }
  }
}
