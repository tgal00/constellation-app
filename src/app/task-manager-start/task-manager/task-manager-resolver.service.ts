import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { DataService } from "src/app/data.service";
import { Note } from "src/app/note-start/notes/note.model";
import { TaskManagerModel } from "./task-manager.model";
import { TaskManagerService } from "./task-manager.service";


@Injectable({ providedIn: 'root' })
export class TaskManagerResolverService implements Resolve<TaskManagerModel[]>{

   constructor(private dataService: DataService, private taskManagerService: TaskManagerService) { }

   resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): TaskManagerModel[] | Observable<TaskManagerModel[]> | Promise<TaskManagerModel[]> {
      this.taskManagerService.init();
      const tasks = this.taskManagerService.getTasks();

      if (tasks.length === 0) {
         return this.dataService.getTasks();
      } else {
         return tasks;
      }
   }
}