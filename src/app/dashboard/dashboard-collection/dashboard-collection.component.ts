import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CollectionModel } from 'src/app/collection/collection.model';
import { CollectionService } from 'src/app/collection/collection.service';

@Component({
  selector: 'app-dashboard-collection',
  templateUrl: './dashboard-collection.component.html',
  styleUrls: ['./dashboard-collection.component.scss']
})
export class DashboardCollectionComponent implements OnInit {


  collectionList:CollectionModel[] = [];
  private subscription:Subscription = new Subscription();
  selectedCollection:CollectionModel|undefined;
  
  constructor(private collectionService:CollectionService) { }

  ngOnInit(): void {
    this.collectionService.init();
    let sub = this.collectionService.collectionSubject.subscribe(res => this.collectionList = res);
    this.subscription.add(sub);
  }

}
