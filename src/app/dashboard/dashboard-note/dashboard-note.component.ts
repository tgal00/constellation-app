import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map, Subscription, tap } from 'rxjs';
import { Note } from 'src/app/note-start/notes/note.model';
import { NoteService } from 'src/app/note-start/notes/note.service';

@Component({
  selector: 'app-dashboard-note',
  templateUrl: './dashboard-note.component.html',
  styleUrls: ['./dashboard-note.component.scss']
})
export class DashboardNoteComponent implements OnInit, OnDestroy {

  noteList: Note[] = [];
  private subscription: Subscription = new Subscription();

  constructor(private noteService: NoteService, private router: Router) { }

  ngOnInit(): void {
    this.noteService.init();
    const sub = this.noteService.noteSubject.pipe(map(notes=>{
      const list:Note[] = [];
      notes = notes.sort((a,b)=>+new Date(b.lastEdited)-+new Date(a.lastEdited))
      for(let key in notes){
        if(+key<3) list.push(notes[key])
      }
      return list;
    })).subscribe(res => this.noteList = res);
    this.subscription.add(sub);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
