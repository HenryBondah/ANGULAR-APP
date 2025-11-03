import { Component, Input, OnInit } from '@angular/core';
import { Message } from '../message.model';
import { ContactService } from '../../contacts/contact.service';

@Component({
  selector: 'cms-message-item',
  standalone: false,
  templateUrl: './message-item.html',
  styleUrl: './message-item.css'
})
export class MessageItem implements OnInit {
  @Input() message: Message | null = null;
  messageSender: string = '';

  constructor(private contactService: ContactService) {}

  ngOnInit(): void {
    if (this.message) {
      const contact = this.contactService.getContact(this.message.sender);
      this.messageSender = contact ? contact.name : this.message.sender;
    }
  }
}
