import { Component, EventEmitter, Output } from '@angular/core';
import { Message } from './message.model';

@Component({
  selector: 'cms-messages',
  standalone: false,
  templateUrl: './messages.html',
  styleUrl: './messages.css'
})
export class Messages {
  @Output() addMessageEvent = new EventEmitter<Message>();
  
  messages: Message[] = [
    new Message("1", "Assignment grades", "The grades for this assignment have been posted", "Bro. Jackson"),
    new Message("2", "Assignment 3 due", "When is assignment 3 due", "Steve Johnson"),
    new Message("3", "Assignment 3 is due on Saturday at 11:30 PM", "", "Bro. Jackson"),
    new Message("4", "Can I meet with you sometime, I need help with assignment 3", "", "Mark Smith"),
    new Message("5", "I can meet with you today at 4:00 PM in my office", "", "Bro. Jackson")
  ];

  currentSender: string = "Bro. Jackson";

  onAddMessage(message: Message) {
    this.messages.push(message);
  }
}