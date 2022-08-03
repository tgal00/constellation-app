import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { FormControl } from "@angular/forms";
import { AuthService } from "src/app/auth/auth.service";
import { Note } from "../note.model";
import { NoteService } from "../note.service";


@Component({
  selector: 'app-note-add',
  templateUrl: './note-add.component.html',
  styleUrls: ['./note-add.component.scss']
})
export class NoteAddComponent implements OnInit {

  noteTitleControl = new FormControl<string>("");
  noteCategoryControl = new FormControl<string>("");
  noteTextControl = new FormControl<string>("");
  @Output() tabChange = new EventEmitter<number>();

  
  constructor(private noteService:NoteService, private auth:AuthService) { }

  ngOnInit(): void {

  }

  onAddNote(){
    const title = this.noteTitleControl.value;
    const category = this.noteCategoryControl.value;
    const text = this.noteTextControl.value;

    const newNote:Note = 
    {noteTitle:title!,noteCategory:category!,noteText:text!,userId:this.auth.getUserId(), created:new Date(), lastEdited:new Date(), noteId:""};

    this.noteService.addNote(newNote);
    this.tabChange.emit(0);


    this.noteCategoryControl.setValue("");
    this.noteTextControl.setValue("");
    this.noteTitleControl.setValue("")

  }

}
