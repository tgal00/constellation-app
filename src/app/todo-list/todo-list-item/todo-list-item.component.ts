import { Component, Input, OnInit } from '@angular/core';
import { takeLast } from 'rxjs';
import { TodoListService } from '../todo-list.service';
import { ToDoTask } from '../todoTask.model';

@Component({
  selector: 'app-todo-list-item',
  templateUrl: './todo-list-item.component.html',
  styleUrls: ['./todo-list-item.component.scss']
})
export class TodoListItemComponent implements OnInit {

  @Input() task!: ToDoTask;
  @Input() fontSize!:number;
  isChecked !:boolean;

  constructor(private todoService:TodoListService) { }

  ngOnInit(): void {
    this.isChecked = this.task.isDone;
  }

  onCheck(){
    this.task.isDone = !this.task.isDone;
    this.todoService.editTodo(this.task);
  }

  getFontSize(){
    return this.fontSize+"px";
  }

}
