
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';

import { TaskManagerModel } from '../task-manager.model';
import { TaskManagerService } from '../task-manager.service';

@Component({
  selector: 'app-task-manager-detail',
  templateUrl: './task-manager-detail.component.html',
  styleUrls: ['./task-manager-detail.component.scss']
})
export class TaskManagerDetailComponent implements OnInit {

  task!: TaskManagerModel;
  id!: string;

  editMode: boolean = false;
  editItemNum: number = -1;
  editString: string = "";
  addTaskItem: boolean = false;

  newTaskItem: {
    taskItemHeadline: string,
    taskItemDescription: string
  } = { taskItemDescription: "", taskItemHeadline: "" };

  constructor(private route: ActivatedRoute, private taskManagerService: TaskManagerService) { }

  ngOnInit(): void {
    

    this.route.params.subscribe(res => {
      this.id = res['id'];
      this.task = this.taskManagerService.getTask(this.id);
    });

  }

  onSave(id: number) {
    this.task.taskItems[id].taskItemDescription = this.editString;
    this.editItemNum = -1;
    this.editMode = false;
    this.editString = "";
    this.taskManagerService.editTask(this.task);
  }

  onAddNewTaskItem() {
    this.task.taskItems.push(this.newTaskItem);
    this.addTaskItem = false;
    this.newTaskItem = { taskItemDescription: "", taskItemHeadline: "" };
    this.taskManagerService.editTask(this.task);
  }

  onDelete(id: number) {
    this.editItemNum = -1;
    this.editMode = false;
    this.editString = "";
    this.task.taskItems.splice(id, 1);
    this.taskManagerService.editTask(this.task);

  }

}
