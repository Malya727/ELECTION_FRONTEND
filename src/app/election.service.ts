import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ElectionService 
{
  baseUrl  = "https://india-2019-election.herokuapp.com/"
  constructor( private http: HttpClient ) { }

  state_names():Observable<any>
  {
    let url = `${this.baseUrl}getStates`;
    return this.http.get(url);
  }

  constituency_names(state):Observable<any>
  {
    let url = `${this.baseUrl}getConstituency/${state}`;
    return this.http.get(url);
  }

  constituency_details(state,constitu):Observable<any>
  {
    let url = `${this.baseUrl}getConstDetails/${state}/${constitu}`;
    return this.http.get(url);
  }
  winner_details(state,constitu):Observable<any>
  {
    let url = `${this.baseUrl}winner/${state}/${constitu}`;
    return this.http.get(url);
  }
}
