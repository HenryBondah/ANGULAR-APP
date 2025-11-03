import { Component, OnInit } from '@angular/core';
import { Message } from './message.model';
import { MessageService } from './message.service';

@Component({
  selector: 'cms-messages',
  standalone: false,
  templateUrl: './messages.html',
  styleUrl: './messages.css'
})
export class Messages implements OnInit {
  messages: Message[] = [];

  constructor(private messageService: MessageService) {}

  ngOnInit(): void {
    this.messages = this.messageService.getMessages();
    this.messageService.messageChangedEvent.subscribe((msgs: Message[]) => {
      this.messages = msgs;
    });
  }
}