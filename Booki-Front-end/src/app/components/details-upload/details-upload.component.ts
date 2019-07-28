import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-details-upload',
  templateUrl: './details-upload.component.html',
  styleUrls: ['./details-upload.component.scss']
})
export class DetailsUploadComponent implements OnInit {
  @Input()
  fileUpload: string;

  constructor() { }

  ngOnInit() {
    this.fileUpload += '?Bearer ' + localStorage.getItem('access_token');
    console.log(this.fileUpload += '?Bearer ' + localStorage.getItem('access_token'));
  }

}
