import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { DataService } from "../data.service";
import { CollectionModel } from "./collection.model";

@Injectable({
  providedIn: 'root'
})
export class CollectionService {


  private collectionList: CollectionModel[] = [];
  collectionSubject: BehaviorSubject<CollectionModel[]> = new BehaviorSubject<CollectionModel[]>([]);

  constructor(private dataService: DataService) {
  }

  init() {
    this.dataService.getCollections()
      .subscribe(res => {
        this.collectionList = res;
        this.collectionSubject.next(this.collectionList.slice());
      })
  }

  addCollection(collection: CollectionModel) {
    this.dataService.addCollection(collection)
      .subscribe(res => {
        collection.collectionId = Object(res)["name"];
        this.collectionList.push(collection);
        this.collectionSubject.next(this.collectionList.slice())
      })
  }

  getCollection(id:string){
    return this.collectionList[this.collectionList.findIndex(n => n.collectionId == id)];
  }

  getCollections() {
    return this.collectionList;
  }


  editCollection(collection: CollectionModel) {
    this.dataService.editCollection(collection)
      .subscribe(() => {
        this.collectionList[this.collectionList.findIndex(t => t.collectionId == collection.collectionId)] = collection;
        this.collectionSubject.next(this.collectionList.slice());
      }
      )
  }

  deleteCollection(id: string) {
    this.dataService.deleteCollection(id)
      .subscribe(() => {
        this.collectionList = this.collectionList.filter(t => t.collectionId != id);
        this.collectionSubject.next(this.collectionList.slice());
      })
  }
}