import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { DataService } from "src/app/data.service";
import { Note } from "./note.model";


@Injectable({
  providedIn: 'root'
})
export class NoteService {


  private noteList: Note[] = [];
  noteSubject: BehaviorSubject<Note[]> = new BehaviorSubject<Note[]>([]);

  constructor(private dataService: DataService) {
  }

  init() {
    this.dataService.getNotes()
      .subscribe(res => {
        this.noteList = res;
        this.noteSubject.next(this.noteList.slice());
      })
  }

  addNote(note: Note) {
    this.dataService.addNote(note)
      .subscribe(res => {
        note.noteId = Object(res)["name"];
        this.noteList.push(note);
        this.noteSubject.next(this.noteList.slice())
      })
  }

  getNote(id:string){
    return this.noteList[this.noteList.findIndex(n => n.noteId == id)];
  }

  getNotes() {
    return this.noteList;
  }

  editNote(note: Note) {
    this.dataService.editNote(note)
      .subscribe(() => {
        this.noteList[this.noteList.findIndex(t => t.noteId == note.noteId)] = note;
        this.noteSubject.next(this.noteList.slice());
      }
      )
  }

  deleteNote(id: string) {
    this.dataService.deleteNote(id)
      .subscribe(() => {
        this.noteList = this.noteList.filter(t => t.noteId != id);
        this.noteSubject.next(this.noteList.slice());
      })
  }
}