import { Component, Input } from '@angular/core';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';

@Component({
  selector: 'cms-contact-detail',
  standalone: false,
  templateUrl: './contact-detail.html',
  styleUrl: './contact-detail.css'
})
export class ContactDetail {
  @Input() contact: Contact | null = new Contact(
    "1",
    "R. Kent Jackson",
    "jacksonk@byui.edu",
    "208-496-3771",
    "assets/images/jacksonk.jpg",
    null
  );

  isEditing: boolean = false;
  editName: string = '';
  editEmail: string = '';
  editPhone: string = '';

  constructor(private contactService: ContactService) {}

  onEdit() {
    if (this.contact) {
      this.editName = this.contact.name;
      this.editEmail = this.contact.email || '';
      this.editPhone = this.contact.phone || '';
    }
    this.isEditing = true;
  }

  onSave() {
    if (!this.contact) { return; }
    const updated = new Contact(this.contact.id, this.editName || this.contact.name, this.editEmail || this.contact.email, this.editPhone || this.contact.phone, this.contact.imageUrl, this.contact.group);
    this.contactService.updateContact(updated);
    this.isEditing = false;
  }

  onCancel() {
    this.isEditing = false;
  }

  onDelete() {
    if (!this.contact) { return; }
    this.contactService.deleteContact(this.contact.id);
    this.contact = null;
  }
}
