
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { CollectionModel } from './collection.model';
import { CollectionService } from './collection.service';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.scss'],
})
export class CollectionComponent implements OnInit, OnDestroy {

  categoryName:string="";
  collectionList:CollectionModel[] = [];
  private subscription:Subscription = new Subscription();
  addMode:boolean = false;
  selectedCollection:CollectionModel|undefined;
  
  constructor(private collectionService:CollectionService, private auth:AuthService) { }

  ngOnInit(): void {
    this.collectionService.init();
    let sub = this.collectionService.collectionSubject.subscribe(res => this.collectionList = res);
    this.subscription.add(sub);
  }

  addCategory(){

    const newCollection:CollectionModel = {categoryName:this.categoryName, userId:this.auth.getUserId(), items:[], collectionId:""}
    this.collectionService.addCollection(newCollection);
    this.categoryName = "";
    this.addMode = false;

  }


  onClose(event:any){
    this.selectedCollection = event;
  }
  deleteCollection(collId:string){
    this.collectionService.deleteCollection(collId);
    this.categoryName = "";
    this.addMode = false;
    this.selectedCollection = undefined;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
