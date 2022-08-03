import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";
import { TaskManagerModel } from "../task-manager.model";
import { TaskManagerService } from "../task-manager.service";


@Component({
  selector: 'app-task-manager-list',
  templateUrl: './task-manager-list.component.html',
  styleUrls: ['./task-manager-list.component.scss']
})
export class TaskManagerListComponent implements OnInit, OnDestroy {

  taskList:TaskManagerModel[] = [];

  private subscription:Subscription = new Subscription();

  constructor(private taskMangerService:TaskManagerService) { }

  ngOnInit(): void {
    this.taskMangerService.init();
    let sub = this.taskMangerService.taskSubject.subscribe(res => this.taskList = res);
    this.subscription.add(sub);
  }

  onDelete(task:TaskManagerModel){
    this.taskMangerService.deleteTask(task.taskId);
  }

  onChangeStatusUp(task:TaskManagerModel){
    if (task.taskStatus=="notStarted"){
      task.taskStatus="inProgress"
    }else if(task.taskStatus=="inProgress"){
      task.taskStatus="complete"
    }
    this.taskMangerService.editTask(task);
  }

  onChangeStatusDown(task:TaskManagerModel){
    if (task.taskStatus=="complete"){
      task.taskStatus="inProgress"
    }else if(task.taskStatus=="inProgress"){
      task.taskStatus="notStarted"
    }
    this.taskMangerService.editTask(task);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
