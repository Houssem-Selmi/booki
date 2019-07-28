import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search-livre',
  templateUrl: './search-livre.component.html',
  styleUrls: ['./search-livre.component.scss']
})
export class SearchLivreComponent implements OnInit {
  @Output()
  searchListen = new EventEmitter<String>();
  searchText: any;

  constructor() { }

  ngOnInit() {
  }


  changeit() {
    this.searchListen.emit(this.searchText);
  }
}
