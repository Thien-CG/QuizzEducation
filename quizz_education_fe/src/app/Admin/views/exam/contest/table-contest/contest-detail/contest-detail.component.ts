// import { OnDestroy, Component, OnInit, Renderer2 } from '@angular/core';
// import { Subject } from 'rxjs';
// import { HttpSvService } from '../../../../../../service/API.service';
// import { HttpClient } from '@angular/common/http';
// import * as moment from 'moment';
// import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
// @Component({
//   selector: 'app-contest-detail',
//   templateUrl: './contest-detail.component.html',
//   styleUrls: ['./contest-detail.component.scss']
// })
// export class ContestDetailComponent implements OnInit {
//   constructor(private renderer: Renderer2, private httpService: HttpSvService, private http: HttpClient,
//     private formBuilder: FormBuilder,) { }

//   listChiTietKyThi: any;
//   listkyThi: any;
//   ngOnInit(): void {
//     this.getDataKyThi();
//     this.getData();
//     this.getDataKyThi2();

//   }
//   public getData() {
//     this.httpService.getList('chitietkythi').subscribe(response => {
//       this.listChiTietKyThi = response;
//     })
//   }
//   public getDataKyThi() {
//     this.httpService.getList('kythi').subscribe(response => {
//       this.listkyThi = response;
//     })
//   }

//   public getDataKyThi2() {
//     const url = `http://localhost:8080/quizzeducation/api/chitietkythi/kythi/11`;
//     this.http.get(url).subscribe(
//       (response: any) => {
//         this.listkyThi = response;
//         console.log(this.listkyThi); // In dữ liệu lấy được từ API ra console
//       },
//       (error: any) => {
//         console.error('Lỗi khi gọi API:', error);
//       }
//     );
//   }

//   // test chơi chơi
  


// }
