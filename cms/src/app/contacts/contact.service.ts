import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Contact } from './contact.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  contacts: Contact[] = [
    new Contact('1', 'R. Kent Jackson', 'jacksonk@byui.edu', '208-496-3771', 'assets/images/jacksonk.jpg', null),
    new Contact('2', 'Rex Barzee', 'barzeer@byui.edu', '208-496-3768', 'assets/images/barzeer.jpg', null)
  ];
  private maxContactId: number = 2;

  contactListChangedEvent = new Subject<Contact[]>();
  contactSelectedEvent = new Subject<Contact>();

  constructor(private http: HttpClient) {
    this.maxContactId = this.getMaxId();
    this.http.get<{ contacts: Contact[] }>('https://your-firebase-url.firebaseio.com/contacts.json')
      .subscribe(
        (contacts: { contacts: Contact[] }) => {
          this.contacts = contacts.contacts;
          this.maxContactId = this.getMaxId();
          // sort the list of contacts
          this.contacts.sort((a, b) => a.name > b.name ? 1 : -1);
          // emit the next contact list change event
          this.contactListChangedEvent.next(this.contacts.slice());
        },
        // error method
        (error: any) => {
          console.log(error);
        }
      );
  }

  getContacts(): Contact[] {
    return this.contacts.slice();
  }

  getMaxId(): number {
    let maxId = 0;
    for (const contact of this.contacts) {
      const currentId = parseInt(contact.id, 10);
      if (currentId > maxId) {
        maxId = currentId;
      }
    }
    return maxId;
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
    if (!contact) {
      return;
    }
    this.maxContactId++;
    contact.id = this.maxContactId.toString();
    this.contacts.push(contact);
    const contactsListClone = this.contacts.slice();
    this.contactListChangedEvent.next(contactsListClone);
    this.storeContacts();
  }

  updateContact(originalContact: Contact, newContact: Contact) {
    if (!originalContact || !newContact) {
      return;
    }
    const pos = this.contacts.indexOf(originalContact);
    if (pos < 0) {
      return;
    }
    newContact.id = originalContact.id;
    this.contacts[pos] = newContact;
    const contactsListClone = this.contacts.slice();
    this.contactListChangedEvent.next(contactsListClone);
    this.storeContacts();
  }

  deleteContact(contact: Contact) {
    if (!contact) {
      return;
    }
    const pos = this.contacts.indexOf(contact);
    if (pos < 0) {
      return;
    }
    this.contacts.splice(pos, 1);
    const contactsListClone = this.contacts.slice();
    this.contactListChangedEvent.next(contactsListClone);
    this.storeContacts();
  }

  storeContacts() {
    const contacts = JSON.stringify(this.contacts);
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http.put('https://your-firebase-url.firebaseio.com/contacts.json', contacts, { headers: headers })
      .subscribe(() => {
        this.contactListChangedEvent.next(this.contacts.slice());
      });
  }
}
