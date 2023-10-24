import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  private emailApiUrl = 'http://localhost:8080/send-email'; // URL API Spring Boot

  constructor(private http: HttpClient) { }

//   sendEmail(emailData: EmailData) {
//     return this.http.post(this.emailApiUrl, emailData);
//   }
}
