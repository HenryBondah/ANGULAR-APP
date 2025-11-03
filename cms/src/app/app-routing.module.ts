import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Documents } from './documents/documents';
import { Messages } from './messages/messages';
import { Contacts } from './contacts/contacts';

const appRoutes: Routes = [
  { path: '', redirectTo: '/documents', pathMatch: 'full' },
  { path: 'documents', component: Documents },
  { path: 'messages', component: Messages },
  { path: 'contacts', component: Contacts }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
