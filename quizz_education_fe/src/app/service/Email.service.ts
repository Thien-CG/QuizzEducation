import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  // private emailApiUrl = 'http://localhost:8080/quizzeducation/api/send-email'; 

  // constructor(private http: HttpClient) { }

  // sendEmail(emailData: any) {
  //   return this.http.post(this.emailApiUrl, emailData);
  // }
}
