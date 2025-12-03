import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
  private maxMessageId: number = 5;

  messageChangedEvent = new Subject<Message[]>();

  constructor(private http: HttpClient) {
    this.http.get<{ messages: Message[] }>('https://your-firebase-url.firebaseio.com/messages.json')
      .subscribe(
        (messages: { messages: Message[] }) => {
          this.messages = messages.messages;
          this.maxMessageId = this.getMaxId();
          // sort the list of messages
          this.messages.sort((a, b) => a.subject > b.subject ? 1 : -1);
          // emit the next message list change event
          this.messageChangedEvent.next(this.messages.slice());
        },
        // error method
        (error: any) => {
          console.log(error);
        }
      );
  }

  getMaxId(): number {
    let maxId = 0;
    for (const message of this.messages) {
      const currentId = parseInt(message.id, 10);
      if (currentId > maxId) {
        maxId = currentId;
      }
    }
    return maxId;
  }

  getMessages(): Message[] {
    return this.messages.slice();
  }

  addMessage(message: Message) {
    this.messages.push(message);
    // emit a copy using Subject
    this.messageChangedEvent.next(this.messages.slice());
    this.storeMessages();
  }

  storeMessages() {
    const messages = JSON.stringify(this.messages);
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http.put('https://your-firebase-url.firebaseio.com/messages.json', messages, { headers: headers })
      .subscribe(() => {
        this.messageChangedEvent.next(this.messages.slice());
      });
  }
}

