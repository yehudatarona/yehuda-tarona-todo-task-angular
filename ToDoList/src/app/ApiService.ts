import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import {Todo} from './todo'
import {  Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
  })
export class apiService {

   
    // private  _url:string = "http://localhost:3000/todo";
   
    getData(_url): Observable<Todo[]>
    {
        return this.httpClient.get<Todo[]>(_url);
        
    }
    postData(_url,_body): Observable<Todo[]>
    {
        return this.httpClient.post<Todo[]>(_url,_body);
        
    }
  
    constructor(private httpClient:HttpClient ) { }
    
    
  }