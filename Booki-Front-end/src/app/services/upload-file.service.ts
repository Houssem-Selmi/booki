import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {

  constructor(private http: HttpClient) { }
  URL_BASE = environment.apiBaseUrl;
  URL_POST = '/post';
  URL_GET_ALL = '/getallfiles';
  switchImageEvent = new EventEmitter<string>();

  pushFileToStorage(file: File): Observable<HttpEvent<{}>> {
    const formdata: FormData = new FormData();

    formdata.append('file', file);

    const req = new HttpRequest('POST', this.URL_BASE + this.URL_POST, formdata, {
      reportProgress: true,
      responseType: 'text'
    });

    return this.http.request(req);
  }

  getFiles(): Observable<any> {
    return this.http.get(this.URL_BASE + this.URL_GET_ALL);
  }

imgChanged(imgName: string) {
    this.switchImageEvent.emit(imgName);
}
}
