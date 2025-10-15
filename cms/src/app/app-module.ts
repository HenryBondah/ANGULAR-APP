import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { App } from './app';
import { Header } from './header/header';
import { Contacts } from './contacts/contacts';
import { ContactList } from './contacts/contact-list/contact-list';
import { ContactDetail } from './contacts/contact-detail/contact-detail';
import { Documents } from './documents/documents';
import { DocumentList } from './documents/document-list/document-list';
import { DocumentDetail } from './documents/document-detail/document-detail';
import { DocumentItem } from './documents/document-item/document-item';
import { Messages } from './messages/messages';
import { MessageList } from './messages/message-list/message-list';
import { MessageItem } from './messages/message-item/message-item';
import { MessageEdit } from './messages/message-edit/message-edit';

@NgModule({
  declarations: [
    App,
    Header,
    Contacts,
    ContactList,
    ContactDetail,
    Documents,
    DocumentList,
  DocumentItem,
    DocumentDetail,
    Messages,
    MessageList,
    MessageItem,
    MessageEdit
  ],
  imports: [
    BrowserModule
  ],
  providers: [
    provideBrowserGlobalErrorListeners()
  ],
  bootstrap: [App]
})
export class AppModule { }
