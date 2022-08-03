import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";
import { Note } from "../note.model";
import { NoteService } from "../note.service";


@Component({
  selector: 'app-note-list',
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.scss']
})
export class NoteListComponent implements OnInit, OnDestroy {

  noteList:Note[] = [];
  showMode:string = "list";
  searchCategoryText:string="";

  private subscription:Subscription = new Subscription();

  constructor(private noteService:NoteService) { }

  ngOnInit(): void {
    this.noteService.init();
    let sub = this.noteService.noteSubject.subscribe(res => this.noteList = res);
    this.subscription.add(sub);
  }

  onDeleteNote(id:string){
    this.noteService.deleteNote(id);
    this.searchCategoryText = "";
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
