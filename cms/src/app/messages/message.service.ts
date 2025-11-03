import { Injectable, EventEmitter } from '@angular/core';
import { Message } from './message.model';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  messages: Message[] = [
    new Message("1", "Assignment grades", "The grades for this assignment have been posted", "Bro. Jackson"),
    new Message("2", "Assignment 3 due", "When is assignment 3 due", "Steve Johnson"),
    new Message("3", "Assignment 3 is due on Saturday at 11:30 PM", "", "Bro. Jackson"),
    new Message("4", "Can I meet with you sometime, I need help with assignment 3", "", "Mark Smith"),
    new Message("5", "I can meet with you today at 4:00 PM in my office", "", "Bro. Jackson")
  ];

  messageChangedEvent = new EventEmitter<Message[]>();

  getMessages(): Message[] {
    return this.messages.slice();
  }

  addMessage(message: Message) {
    this.messages.push(message);
    // emit a copy
    this.messageChangedEvent.emit(this.messages.slice());
  }
}
import { Injectable, EventEmitter } from '@angular/core';
import { Message } from './message.model';
import { MOCKMESSAGES } from '../../../../lesson5Files/MOCKMESSAGES';

@Injectable({ providedIn: 'root' })
export class MessageService {
  messages: Message[] = [];
  messageChangedEvent: EventEmitter<Message[]> = new EventEmitter<Message[]>();

  constructor() {
    this.messages = MOCKMESSAGES;
  }

  getMessages(): Message[] {
    return this.messages.slice();
  }

  getMessage(id: string): Message | null {
    for (const msg of this.messages) {
      if (msg.id === id) {
        return msg;
      }
    }
    return null;
  }

  addMessage(message: Message) {
    this.messages.push(message);
    this.messageChangedEvent.emit(this.messages.slice());
  }
}
