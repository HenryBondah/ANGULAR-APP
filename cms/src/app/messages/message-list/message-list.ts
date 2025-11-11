import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Message } from '../message.model';
import { MessageService } from '../message.service';

@Component({
  selector: 'cms-message-list',
  standalone: false,
  templateUrl: './message-list.html',
  styleUrl: './message-list.css'
})
export class MessageList implements OnInit, OnDestroy {
  messages: Message[] = [];
  private subscription: Subscription = new Subscription();

  constructor(private messageService: MessageService) {}

  ngOnInit(): void {
    this.messages = this.messageService.getMessages();
    this.subscription = this.messageService.messageChangedEvent.subscribe((msgs: Message[]) => {
      this.messages = msgs;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}