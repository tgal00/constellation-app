import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './auth/auth.guard';
import { CollectionComponent } from './collection/collection.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { NoteStartComponent } from './note-start/note-start.component';
import { NoteDetailComponent } from './note-start/notes/note-detail/note-detail.component';
import { NoteResolverService } from './note-start/notes/note-resolver.service';
import { NotesComponent } from './note-start/notes/notes.component';
import { TaskManagerStartComponent } from './task-manager-start/task-manager-start.component';
import { TaskManagerDetailComponent } from './task-manager-start/task-manager/task-manager-detail/task-manager-detail.component';
import { TaskManagerResolverService } from './task-manager-start/task-manager/task-manager-resolver.service';
import { TaskManagerComponent } from './task-manager-start/task-manager/task-manager.component';
import { TodoListComponent } from './todo-list/todo-list.component';


const routes: Routes = [
  { path: "", redirectTo: "/home", pathMatch: 'full' },
  { path: 'auth', component: AuthComponent },
  {
    path: "home", component: HomeComponent, canActivate: [AuthGuard], children: [
      { path: "", component: DashboardComponent },
      { path: "todo", component: TodoListComponent },
      {
        path: "notes", component: NoteStartComponent, children: [
          { path: "", component: NotesComponent },
          { path: "details/:id", component: NoteDetailComponent, resolve: [NoteResolverService] }
        ]
      },
      {
        path: "taskManager", component: TaskManagerStartComponent, children: [
          { path: "", component: TaskManagerComponent },
          { path: "details/:id", component: TaskManagerDetailComponent, resolve: [TaskManagerResolverService] },
        ]
      },
      { path: "collection", component: CollectionComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, /*{ scrollPositionRestoration: '' }*/)],
  exports: [RouterModule]
})


export class AppRoutingModule { }
