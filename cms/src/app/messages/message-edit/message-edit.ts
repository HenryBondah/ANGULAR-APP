import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { Message } from '../message.model';
import { MessageService } from '../message.service';
import { ContactService } from '../../contacts/contact.service';
import { Contact } from '../../contacts/contact.model';
@Component({
  selector: 'cms-message-edit',
  standalone: false,
  templateUrl: './message-edit.html',
  styleUrl: './message-edit.css'
})
export class MessageEdit implements OnInit {
  @ViewChild('subject', { static: false }) subjectInputRef: ElementRef | undefined;
  @ViewChild('msgText', { static: false }) msgTextInputRef: ElementRef | undefined;
  currentSender: string = '';
  contacts: Contact[] = [];

  constructor(private messageService: MessageService, private contactService: ContactService) {}

  ngOnInit(): void {
    this.contacts = this.contactService.getContacts();
    // subscribe so the dropdown updates when contacts change elsewhere
    this.contactService.contactsChanged.subscribe((contacts: Contact[]) => {
      this.contacts = contacts;
      if (!this.currentSender && contacts.length > 0) {
        this.currentSender = contacts[0].id;
      }
    });

    if (this.contacts.length > 0) {
      this.currentSender = this.contacts[0].id;
    }
  }

  onSendMessage() {
    const subjectValue = this.subjectInputRef?.nativeElement.value;
    const msgTextValue = this.msgTextInputRef?.nativeElement.value;

    if (!subjectValue || !msgTextValue) {
      return; // Don't send empty messages
    }

    const newMessage = new Message(
      Math.random().toString(),
      subjectValue,
      msgTextValue,
      this.currentSender
    );

    this.messageService.addMessage(newMessage);
    this.onClear();
  }

  onClear() {
    if (this.subjectInputRef) {
      this.subjectInputRef.nativeElement.value = '';
    }
    if (this.msgTextInputRef) {
      this.msgTextInputRef.nativeElement.value = '';
    }
  }
}