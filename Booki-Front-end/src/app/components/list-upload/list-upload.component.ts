import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { UploadFileService } from 'src/app/services/upload-file.service';
@Component({
  selector: 'app-list-upload',
  templateUrl: './list-upload.component.html',
  styleUrls: ['./list-upload.component.scss']
})
export class ListUploadComponent implements OnInit {

  showFile = false;
  fileUploads: Observable<string[]>;
  img = '';
  code: any;
  constructor(private uploadService: UploadFileService, private http: HttpClient) { }

  ngOnInit() {
  }

  showFiles(enable: boolean) {
    this.showFile = enable;

   if (enable) {
      this.uploadService.getFiles().subscribe(
        res => { console.log(res); this.img = res[0]; },
        err => {},
        () => {
          this.http.get(this.img, { responseType: 'blob' }).subscribe(
            res => this.code = res,
            err => { this.code = err.error.text;   }
          );
        }
      );
    }
  }
}
