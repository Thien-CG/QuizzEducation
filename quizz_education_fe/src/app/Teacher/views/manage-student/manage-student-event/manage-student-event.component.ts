import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { KyThi } from 'src/app/models/KyThi.entity';

@Component({
  selector: 'app-manage-student-home',
  templateUrl: './manage-student-event.component.html',
  styleUrls: ['./manage-student-event.component.scss'],
})
export class ManageStudentHomeComponent implements OnInit {
  public listKyThi: KyThi[];
  constructor(private httpClient: HttpClient, private formBuilder: FormBuilder,) { }

  ngOnInit(): void {
    this.httpClient.get<KyThi[]>(`http://localhost:8080/quizzeducation/api/kythi`)
      .subscribe(data => {
        this.listKyThi = data
      });
  }

  public getValueSearch() {
    return this.formFilter.get('search')?.value;
  }

  public formFilter = this.formBuilder.group({
    setRows: new FormControl(5),
    search: new FormControl('')
  })
}
