import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { CollectionModel } from '../collection.model';
import { CollectionService } from '../collection.service';

@Component({
  selector: 'app-collection-detail',
  templateUrl: './collection-detail.component.html',
  styleUrls: ['./collection-detail.component.scss']
})
export class CollectionDetailComponent implements OnInit, OnChanges {

  @Input() collection!: CollectionModel|null;
  addMode: boolean = false;
  addItem: string = "";
  searchText: string = "";
  @Output() close = new EventEmitter();

  constructor(private collectionService: CollectionService) { }

  ngOnInit(): void {

  }

  ngOnChanges(changes: SimpleChanges): void {
    this.addMode = false;
    this.addItem = "";
  }

  onAdd() {
    this.collection!.items.push(this.addItem);
    this.addItem = "";
    this.addMode = false;
    this.collectionService.editCollection(this.collection!);
    this.searchText = "";
  }

  onClose(){
    this.close.emit(undefined);
  }

  deleteItem(index: number) {

    this.collection!.items.splice(index, 1);
    this.collectionService.editCollection(this.collection!);
  }

}
