import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Note } from '../note.model';
import { NoteService } from '../note.service';

@Component({
  selector: 'app-note-detail',
  templateUrl: './note-detail.component.html',
  styleUrls: ['./note-detail.component.scss']
})
export class NoteDetailComponent implements OnInit {

  note!: Note;
  id!: string;

  editMode:boolean=false;
  editNote!:Note;
  fontSize:number = 14;

  constructor(private route: ActivatedRoute, private noteService: NoteService) { }

  ngOnInit(): void {
    this.route.params.subscribe(res => {
      this.id = res['id'];
      this.note = this.noteService.getNote(this.id);
      this.editNote = {...this.note};
    });

  }

  onSave(){
    this.editNote.lastEdited = new Date();
    this.noteService.editNote(this.editNote);
    this.editMode = false;
    this.note = this.editNote;
  }

  fontDecrease(){
    if(this.fontSize>=15){
    this.fontSize-=4;
    }
  }
  fontIncrease(){
    this.fontSize+=4;
  }

  getFontSize(){
    return this.fontSize+"px";
  }
}
