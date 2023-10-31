import { Component, OnInit, Renderer2 } from '@angular/core';
import { HttpSvService } from '../../../../../../service/API.service';
import { HttpClient } from '@angular/common/http';
@Component({
    selector: 'app-contest-detail',
    templateUrl: './contest-detail.component.html',
    styleUrls: ['./contest-detail.component.scss']
})
export class ContestDetailComponent implements OnInit {
    constructor(private renderer: Renderer2, private httpService: HttpSvService, private http: HttpClient) { }

    listChiTietKyThi: any;
    listkyThi: any;
    ngOnInit(): void {
        this.getDataKyThi();
        this.getData();

    }
    public getData() {
        this.httpService.getList('chitietkythi').subscribe(response => {
            this.listChiTietKyThi = response;
        })
    }
    public getDataKyThi() {
        this.httpService.getList('kythi').subscribe(response => {
            this.listkyThi = response;
        })
    }


}
