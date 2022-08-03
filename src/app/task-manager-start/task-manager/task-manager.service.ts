import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { DataService } from "src/app/data.service";
import { TaskManagerModel } from "./task-manager.model";


@Injectable({
  providedIn: 'root'
})
export class TaskManagerService {

  private taskList: TaskManagerModel[] = [];
  taskSubject: BehaviorSubject<TaskManagerModel[]> = new BehaviorSubject<TaskManagerModel[]>([]);

  constructor(private dataService: DataService) {
  }

  init() {
    this.dataService.getTasks()
      .subscribe(res => {
        this.taskList = res;
        this.taskSubject.next(this.taskList.slice());
      })
  }

  addTask(task: TaskManagerModel) {
    this.dataService.addTask(task)
      .subscribe(res => {
        task.taskId = Object(res)["name"];
        this.taskList.push(task);
        this.taskSubject.next(this.taskList.slice())
      })
  }

  getTasks() {
    return this.taskList;
  }
  getTask(id:string){
    return this.taskList[this.taskList.findIndex(n => n.taskId == id)];
  }

  editTask(task: TaskManagerModel) {
    this.dataService.editTask(task)
      .subscribe(() => {
        this.taskList[this.taskList.findIndex(t => t.taskId == task.taskId)] = task;
        this.taskSubject.next(this.taskList.slice());
      }
      )
  }

  deleteTask(id: string) {
    this.dataService.deleteTask(id)
      .subscribe(() => {
        this.taskList = this.taskList.filter(t => t.taskId != id);
        this.taskSubject.next(this.taskList.slice());
      })
  }
}