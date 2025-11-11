import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
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

  messageChangedEvent = new Subject<Message[]>();

  getMessages(): Message[] {
    return this.messages.slice();
  }

  addMessage(message: Message) {
    this.messages.push(message);
    // emit a copy using Subject
    this.messageChangedEvent.next(this.messages.slice());
  }
}

