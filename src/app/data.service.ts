import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs";
import { AuthService } from "./auth/auth.service";
import { CollectionModel } from "./collection/collection.model";
import { Note } from "./note-start/notes/note.model";
import { TaskManagerModel } from "./task-manager-start/task-manager/task-manager.model";
import { ToDoTask } from "./todo-list/todoTask.model";



@Injectable(
  {
    providedIn: 'root'
  }
)
export class DataService {

  constructor(private http: HttpClient, private auth: AuthService) { }

  addTodo(task: ToDoTask) {
    return this.http.post("https://constellation-96902-default-rtdb.firebaseio.com/todos.json", task);
  }

  getTodos() {
    return this.http.get<ToDoTask[]>("https://constellation-96902-default-rtdb.firebaseio.com/todos.json")
      .pipe(
        map(todos => {
          const todoList: ToDoTask[] = [];
          for (let key in todos) {
            if (todos[key].userId == this.auth.getUserId())
              todoList.push({ ...todos[key], taskId: key });
          }
          return todoList;
        })
      );
  }

  editTodo(todo: ToDoTask) {
    return this.http.patch(`https://constellation-96902-default-rtdb.firebaseio.com/todos/${todo.taskId}/.json`, todo);
  }

  deleteTodo(id: string) {
    return this.http.delete(`https://constellation-96902-default-rtdb.firebaseio.com/todos/${id}.json`);

  }


  addNote(note: Note) {
    return this.http.post("https://constellation-96902-default-rtdb.firebaseio.com/notes.json", note);
  }

  getNotes() {
    return this.http.get<Note[]>("https://constellation-96902-default-rtdb.firebaseio.com/notes.json")
      .pipe(
        map(notes => {
          const notesList: Note[] = [];
          for (let key in notes) {
            if (notes[key].userId == this.auth.getUserId())
              notesList.push({ ...notes[key], noteId: key });
          }
          return notesList;
        })
      );
  }

  editNote(note: Note) {
    return this.http.patch(`https://constellation-96902-default-rtdb.firebaseio.com/notes/${note.noteId}/.json`, note);
  }

  deleteNote(id: string) {
    return this.http.delete(`https://constellation-96902-default-rtdb.firebaseio.com/notes/${id}.json`);

  }



  addTask(task: TaskManagerModel) {
    return this.http.post("https://constellation-96902-default-rtdb.firebaseio.com/tasks.json", task);
  }

  getTasks() {
    return this.http.get<TaskManagerModel[]>("https://constellation-96902-default-rtdb.firebaseio.com/tasks.json")
      .pipe(
        map(tasks => {
          const taskList: TaskManagerModel[] = [];
          for (let key in tasks) {
            if (tasks[key].userId == this.auth.getUserId()){
              if(tasks[key].taskItems == null) tasks[key].taskItems = [];
              taskList.push({ ...tasks[key], taskId: key });
            }
          }
          return taskList;
        })
      );
  }

  editTask(task: TaskManagerModel) {
    return this.http.patch(`https://constellation-96902-default-rtdb.firebaseio.com/tasks/${task.taskId}/.json`, task);
  }

  deleteTask(id: string) {
    return this.http.delete(`https://constellation-96902-default-rtdb.firebaseio.com/tasks/${id}.json`);

  }



  addCollection(collection: CollectionModel) {
    return this.http.post("https://constellation-96902-default-rtdb.firebaseio.com/collections.json", collection);
  }

  getCollections() {
    return this.http.get<CollectionModel[]>("https://constellation-96902-default-rtdb.firebaseio.com/collections.json")
      .pipe(
        map(collections => {
          const collList: CollectionModel[] = [];
          for (let key in collections) {
            if (collections[key].userId == this.auth.getUserId()) {
              if(collections[key].items == null) collections[key].items = [];
              collList.push({ ...collections[key], collectionId: key });
            }
          }
          return collList;
        })
      );
  }

  editCollection(collection: CollectionModel) {
    return this.http.patch(`https://constellation-96902-default-rtdb.firebaseio.com/collections/${collection.collectionId}/.json`, collection);
  }

  deleteCollection(id: string) {
    return this.http.delete(`https://constellation-96902-default-rtdb.firebaseio.com/collections/${id}.json`);

  }
}