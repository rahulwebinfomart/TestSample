import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders} from '@angular/common/http';  
import { Observable } from 'rxjs/Observable';  


@Injectable({
  providedIn: 'root'
})
export class DataService {

    constructor(private http: HttpClient) 
 { }

submitdata(data):Observable<any>
  {
    return this.http.post("http://localhost:3001/api/v1/post-data",data);
  }

getData():Observable<any>
  {
    return this.http.get("http://localhost:3001/api/v1/get-data");
  }


}
