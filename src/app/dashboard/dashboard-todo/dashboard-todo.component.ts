import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { TodoListService } from 'src/app/todo-list/todo-list.service';
import { ToDoTask } from 'src/app/todo-list/todoTask.model';

@Component({
  selector: 'app-dashboard-todo',
  templateUrl: './dashboard-todo.component.html',
  styleUrls: ['./dashboard-todo.component.scss']
})
export class DashboardTodoComponent implements OnInit, OnDestroy {


  todoList:ToDoTask[] = [];

  private subscription:Subscription = new Subscription();

  constructor(private todoService:TodoListService, private auth:AuthService) { }

  ngOnInit(): void {
    this.todoService.init();
    let sub = this.todoService.todoSubject.subscribe(res => this.todoList = res);
    this.subscription.add(sub);
  }

  getPendingTodos(){
    return this.todoList.filter(t => t.isDone == false);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
