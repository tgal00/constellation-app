import { Component, OnInit } from "@angular/core";
import { TaskManagerService } from "./task-manager.service";


@Component({
  selector: 'app-task-manager',
  templateUrl: './task-manager.component.html',
  styleUrls: ['./task-manager.component.scss']
})
export class TaskManagerComponent implements OnInit {

  selectedValue:number = 0;
  constructor(private taskMangerService:TaskManagerService) { }

  ngOnInit(): void {
    this.taskMangerService.init();
  }

  onTabChange(data:number){
    this.selectedValue = data;
  }


}
