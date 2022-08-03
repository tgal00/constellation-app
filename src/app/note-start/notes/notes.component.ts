import { Component, OnInit, ViewChild } from "@angular/core";
import { MatTabGroup } from "@angular/material/tabs";
import { NoteService } from "./note.service";


@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {

  selectedValue:number = 0;

  constructor(private noteService:NoteService) { }

  ngOnInit(): void {
    this.noteService.init();

  }

  onTabChange(data:number){
    this.selectedValue = data;
  }




}
