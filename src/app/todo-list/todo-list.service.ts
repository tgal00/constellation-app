import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { BehaviorSubject } from "rxjs";
import { AuthService } from "../auth/auth.service";
import { DataService } from "../data.service";
import { ToDoTask } from "./todoTask.model";

@Injectable({
  providedIn: 'root'
})

export class TodoListService {

  private todoList: ToDoTask[] = [];
  todoSubject: BehaviorSubject<ToDoTask[]> = new BehaviorSubject<ToDoTask[]>([]);

  constructor(private dataService: DataService) {
  }

  init() {
    this.dataService.getTodos()
      .subscribe(res => {
        this.todoList = res;
        this.todoSubject.next(this.todoList.slice());
      })
  }

  addTodo(todoTask: ToDoTask) {
    this.dataService.addTodo(todoTask)
      .subscribe(res => {
        todoTask.taskId = Object(res)["name"];
        this.todoList.push(todoTask);
        this.todoSubject.next(this.todoList.slice())
      })
  }

  getTodos() {
    return this.todoList;
  }

  editTodo(task: ToDoTask) {
    this.dataService.editTodo(task)
      .subscribe(() => {
        this.todoList[this.todoList.findIndex(t => t.taskId == task.taskId)] = task;
        this.todoSubject.next(this.todoList.slice());
      }
      )
  }

  deleteTodo(id: string) {
    this.dataService.deleteTodo(id)
      .subscribe(() => {
        this.todoList = this.todoList.filter(t => t.taskId != id);
        this.todoSubject.next(this.todoList.slice());
      })
  }


}