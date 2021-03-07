import { Injectable } from '@angular/core';
import{ GlobalConstants } from '../conf/global-constants';
import { HttpClient,HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AllJobInfoService {

 private baseUrl = '';

  constructor(private http:HttpClient) { 
    this.baseUrl = GlobalConstants.apiDBJobURL;
  }

    getAllJobs(): Observable<any> {
    return this.http.get(`${this.baseUrl}/getalljobs`);
  }

  

    getAllJobDetail(srcsupitem:object,page: number): Observable<Object> {
    let srcsupitemstr = JSON.stringify(srcsupitem);
    return this.http.get(`${this.baseUrl}/job-run-detail/${page}/${srcsupitemstr}`);
  }

}
