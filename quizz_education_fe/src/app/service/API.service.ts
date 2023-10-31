import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})


export class HttpSvService {
  private REST_API_ED = "http://localhost:8080/quizzeducation/api";


  constructor(private httpClient: HttpClient) { }

  public getList(nameApi: string): Observable<any> {
    const url = `${this.REST_API_ED}/${nameApi}`;
    return this.httpClient.get<any>(url);
  }

  public getItem(nameApi: string, idItem: string | number): Observable<any> {
    const url = `${this.REST_API_ED}/${nameApi}/${idItem}`;
    return this.httpClient.get<any>(url);
  }

  public getItems(nameApi: string, khoaNgoai: string, idItem: string | number): Observable<any> {
    const url = `${this.REST_API_ED}/${nameApi}/${khoaNgoai}/${idItem}`;
    return this.httpClient.get<any>(url);
  }

  public postItem(nameApi: string, dataItem: any): Observable<any> {
    const url = `${this.REST_API_ED}/${nameApi}`;
    return this.httpClient.post<any>(url, dataItem);
  }

  public putItem(nameApi: string, idItem: string | number, dataItem: any): Observable<any> {
    const url = `${this.REST_API_ED}/${nameApi}/${idItem}`;
    return this.httpClient.put<any>(url, dataItem);
  }


  public deleteItem(nameApi: string, idItem: string | number): Observable<any> {
    const url = `${this.REST_API_ED}/${nameApi}/${idItem}`;
    return this.httpClient.delete<any>(url);
  }

 
}
