import { Component, EventEmitter, Output, ViewChild, ElementRef } from '@angular/core';
import { Message } from '../message.model';

@Component({
  selector: 'cms-message-edit',
  standalone: false,
  templateUrl: './message-edit.html',
  styleUrl: './message-edit.css'
})
export class MessageEdit {
  @ViewChild('subject', { static: false }) subjectInputRef: ElementRef | undefined;
  @ViewChild('msgText', { static: false }) msgTextInputRef: ElementRef | undefined;
  @Output() addMessageEvent = new EventEmitter<Message>();
  
  currentSender: string = "Bro. Jackson";

  onSendMessage() {
    const subjectValue = this.subjectInputRef?.nativeElement.value;
    const msgTextValue = this.msgTextInputRef?.nativeElement.value;
    
    const newMessage = new Message(
      Math.random().toString(),
      subjectValue,
      msgTextValue,
      this.currentSender
    );
    
    this.addMessageEvent.emit(newMessage);
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