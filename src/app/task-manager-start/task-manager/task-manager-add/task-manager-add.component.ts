
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { AuthService } from 'src/app/auth/auth.service';
import { TaskManagerModel } from '../task-manager.model';
import { TaskManagerService } from '../task-manager.service';



@Component({
  selector: 'app-task-manager-add',
  templateUrl: './task-manager-add.component.html',
  styleUrls: ['./task-manager-add.component.scss']
})
export class TaskManagerAddComponent implements OnInit {

  task!: TaskManagerModel;
  taskKeywords: string[] = [];
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;

  taskForm!: FormGroup;
  newItemCounter: number = 0;
  @Output() tabChange = new EventEmitter<number>();




  constructor(private auth: AuthService, private taskService: TaskManagerService) { }


  ngOnInit(): void {
    this.initForm();
  }

  get taskItemControls() {
    return (<FormArray>this.taskForm.get('taskItems')).controls;
  }

  onAddTaskItem() {
    (<FormArray>this.taskForm.get('taskItems')).push(new FormGroup({
      'taskItemHeadline': new FormControl("", Validators.required),
      'taskItemDescription': new FormControl("", Validators.required)
    }))
    this.newItemCounter += 1;
  }


  onSubmit() {
    this.tabChange.emit(0);
    const newTask: TaskManagerModel = {
      taskTitle: this.taskForm.get("title")?.value,
      taskStatus: this.taskForm.get("status")?.value,
      taskDescription: this.taskForm.get("description")?.value,
      taskDateStarted: this.taskForm.get("dateStarted")?.value,
      taskDateEnding: this.taskForm.get("dateEnding")?.value,
      taskItems: this.taskForm.get("taskItems")?.value,
      taskKeywords: this.taskKeywords,
      userId: this.auth.getUserId(),
      taskId: ""
    }

    this.taskService.addTask(newTask);

    this.taskKeywords = [];
    if (this.newItemCounter > 0) {

      for (let i = 0; i < this.newItemCounter; i++) {
        (<FormArray>this.taskForm.get('taskItems')).removeAt(0);
      }
    }
    this.newItemCounter = 0;

    this.taskForm.reset();

    this.tabChange.emit(0);
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value) {
      this.taskKeywords.push(value);
    }

    event.chipInput!.clear();
  }

  remove(keyword: string): void {
    const index = this.taskKeywords.indexOf(keyword);

    if (index >= 0) {
      this.taskKeywords.splice(index, 1);
    }
  }

  initForm() {

    let taskStatus = '';
    let taskTitle = '';
    let taskDescription = '';
    let taskDateStarted = Date();
    let taskDateEnding = Date();
    let taskItems = new FormArray([]);



    this.taskForm = new FormGroup({
      'status': new FormControl(taskStatus, Validators.required),
      'title': new FormControl(taskTitle, Validators.required),
      'description': new FormControl(taskDescription, Validators.required),
      'dateStarted': new FormControl(taskDateStarted, Validators.required),
      'dateEnding': new FormControl(taskDateEnding, Validators.required),
      "taskItems": taskItems
    });


  }

}
