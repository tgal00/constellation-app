import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { HttpClientModule } from '@angular/common/http';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { SidenavComponent } from './sidenav/sidenav.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { FooterComponent } from './footer/footer.component';
import { MatListModule } from '@angular/material/list';
import { TodoListComponent } from './todo-list/todo-list.component';
import { MatTabsModule } from '@angular/material/tabs';
import { TodoListItemComponent } from './todo-list/todo-list-item/todo-list-item.component';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {MatBadgeModule} from '@angular/material/badge';

import {MatMenuModule} from '@angular/material/menu';
import { NoteStartComponent } from './note-start/note-start.component';
import { NoteAddComponent } from './note-start/notes/note-add/note-add.component';
import { NoteDetailComponent } from './note-start/notes/note-detail/note-detail.component';
import { NoteListComponent } from './note-start/notes/note-list/note-list.component';
import { NotesComponent } from './note-start/notes/notes.component';
import {MatChipsModule} from '@angular/material/chips';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import { TaskManagerStartComponent } from './task-manager-start/task-manager-start.component';
import { TaskManagerAddComponent } from './task-manager-start/task-manager/task-manager-add/task-manager-add.component';
import { TaskManagerListComponent } from './task-manager-start/task-manager/task-manager-list/task-manager-list.component';
import { TaskManagerComponent } from './task-manager-start/task-manager/task-manager.component';
import { TaskManagerDetailComponent } from './task-manager-start/task-manager/task-manager-detail/task-manager-detail.component';
import { CollectionDetailComponent } from './collection/collection-detail/collection-detail.component';
import { CollectionComponent } from './collection/collection.component';
import { SearchPipe } from './collection/search.pipe';
import { FilterCategoryPipe } from './note-start/notes/filterCategory.pipe';
import {MatTooltipModule} from '@angular/material/tooltip';
import { DashboardCollectionComponent } from './dashboard/dashboard-collection/dashboard-collection.component';
import { DashboardNoteComponent } from './dashboard/dashboard-note/dashboard-note.component';
import { DashboardTaskComponent } from './dashboard/dashboard-task/dashboard-task.component';
import { DashboardTodoComponent } from './dashboard/dashboard-todo/dashboard-todo.component';
import { DashboardComponent } from './dashboard/dashboard.component';







@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    HomeComponent,
    HeaderComponent,
    SidenavComponent,
    FooterComponent,
    TodoListComponent,
    TodoListItemComponent,
    NotesComponent,
    NoteAddComponent,
    NoteListComponent,
    NoteDetailComponent,
    NoteStartComponent,
    TaskManagerComponent,
    TaskManagerStartComponent,
    TaskManagerListComponent,
    TaskManagerAddComponent,
    TaskManagerDetailComponent,
    CollectionComponent,
    CollectionDetailComponent,
    SearchPipe,
    FilterCategoryPipe,
    DashboardComponent,
    DashboardTodoComponent,
    DashboardCollectionComponent,
    DashboardNoteComponent,
    DashboardTaskComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatTabsModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatBadgeModule,
    MatMenuModule,
    MatChipsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTooltipModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
