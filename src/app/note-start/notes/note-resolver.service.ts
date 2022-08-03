import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { DataService } from "src/app/data.service";
import { Note } from "./note.model";
import { NoteService } from "./note.service";

@Injectable({ providedIn: 'root' })
export class NoteResolverService implements Resolve<Note[]>{

   constructor(private dataService: DataService, private noteService: NoteService) { }

   resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Note[] | Observable<Note[]> | Promise<Note[]> {
      this.noteService.init();
      const notes = this.noteService.getNotes();

      if (notes.length === 0) {
         return this.dataService.getNotes();
      } else {
         return notes;
      }
   }
}