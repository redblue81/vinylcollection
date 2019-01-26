import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgModule } from '@angular/core';
import { DataViewModule } from 'primeng/dataview';
import { DropdownModule } from 'primeng/dropdown';
import { PanelModule } from 'primeng/panel';
import { DialogModule } from 'primeng/dialog';
import { TabMenuModule } from 'primeng/tabmenu';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ToastModule } from 'primeng/toast';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';
import { FileUploadModule } from 'primeng/fileupload';

import { AppComponent } from './app.component';
import { AlbumsComponent } from './albums/albums.component';
import { AlbumDetailComponent } from './album-detail/album-detail.component';
import { AlbumCreateComponent } from './album-create/album-create.component';
import { AlbumEditComponent } from './album-edit/album-edit.component';
import { Routes, RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { AlbumService } from './album.service';
import { MessageService } from 'primeng/api';

const appRoutes: Routes = [
  {
    path: 'albums',
    component: AlbumsComponent,
    data: { title: 'Lista Album' }
  },
  {
    path: 'album-detail/:id',
    component: AlbumDetailComponent,
    data: { title: 'Dettaglio album' }
  },
  {
    path: 'add-album',
    component: AlbumCreateComponent,
    data: { title: 'Nuovo Album' }
  },
  {
    path: 'edit-album/:id',
    component: AlbumEditComponent,
    data: { title: 'Modifica Album' }
  },
  { path: '',
    redirectTo: '/albums',
    pathMatch: 'full'
  }
];

@NgModule({
  declarations: [
    AppComponent,
    AlbumsComponent,
    AlbumDetailComponent,
    AlbumCreateComponent,
    AlbumEditComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FontAwesomeModule,
    FormsModule,
    HttpClientModule,
    TabMenuModule,
    DataViewModule,
    DropdownModule,
    PanelModule,
    DialogModule,
    ButtonModule,
    InputTextModule,
    InputTextareaModule,
    ToastModule,
    MessageModule,
    MessagesModule,
    FileUploadModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  providers: [AlbumService, MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
