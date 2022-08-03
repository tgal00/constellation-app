import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { TodoListService } from './todo-list.service';
import { ToDoTask } from './todoTask.model';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit, OnDestroy {

  priorityControl = new FormControl<string | null>(null, Validators.required);
  taskControl = new FormControl<string | null>(null, Validators.required);
  todoList:ToDoTask[] = [];

  private subscription:Subscription = new Subscription();

  constructor(private todoService:TodoListService, private auth:AuthService) { }

  ngOnInit(): void {
    this.todoService.init();
    let sub = this.todoService.todoSubject.subscribe(res => this.todoList = res);
    this.subscription.add(sub);
  }

  onAdd(){
    const priority = this.priorityControl.value;
    const task = this.taskControl.value;

    const newTodo:ToDoTask ={priority:priority!,task:task!,isDone:false,userId:this.auth.getUserId(),taskId:""}
    this.todoService.addTodo(newTodo);

    this.priorityControl.reset();
    this.taskControl.reset();
  }

  deleteCompleted(){
    for(let task of this.todoList){
      if(task.isDone){
        this.todoService.deleteTodo(task.taskId);
      }
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
