import { Component, OnInit } from '@angular/core';
import {  Router } from '@angular/router';
import { map, Subscription, tap } from 'rxjs';
import { TaskManagerModel } from 'src/app/task-manager-start/task-manager/task-manager.model';
import { TaskManagerService } from 'src/app/task-manager-start/task-manager/task-manager.service';

@Component({
  selector: 'app-dashboard-task',
  templateUrl: './dashboard-task.component.html',
  styleUrls: ['./dashboard-task.component.scss']
})
export class DashboardTaskComponent implements OnInit {

  taskList:TaskManagerModel[] = [];
  tasksNotStarted:TaskManagerModel[] = [];
  tasksInProgress:TaskManagerModel[] = [];

  private subscription:Subscription = new Subscription();

  constructor(private taskMangerService:TaskManagerService) { }

  ngOnInit(): void {
    this.taskMangerService.init();
   let sub = this.taskMangerService.taskSubject.pipe(map(task=>{
     let arr1 = [];
     let arr2 = [];
     let arr3 = [];
      for(let key in task){
        arr3.push(task[key]);
        if(task[key].taskStatus=="notStarted") arr1.push(task[key]);
        if(task[key].taskStatus=="inProgress") arr2.push(task[key]);
      }
      return [arr1,arr2,arr3];
    })).subscribe(res => {
      console.log(res);
      this.tasksNotStarted = res[0];
      this.tasksInProgress = res[1];
      this.taskList = res[2];
    });

    
    this.subscription.add(sub);
  }


}
