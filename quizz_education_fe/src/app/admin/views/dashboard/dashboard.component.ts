import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChartjsModule } from '@coreui/angular-chartjs';
import { CalendarModule } from 'primeng/calendar';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { TableModule } from 'primeng/table';
import { KetQuaTrungBinh } from './../../../models/KetQuaTrungBinh.entity';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ChartjsModule,
    CalendarModule,
    FormsModule,
    InputTextModule,
    TableModule,
    MultiSelectModule
  ]
})
export class DashboardComponent implements OnInit {
  accList: any[] = []
  eventList: any[] = []
  studentList: any[] = []
  teacherList: any[] = []
  subjectList: any[] = []
  resultList: any[] = []
  resultFilterList: any[]
  eventFilterList: any[]
  studentResultList: KetQuaTrungBinh[] = []
  avgAbove: number[] = []
  avgBelow: number[] = []
  data: any
  data2: any
  data3: any
  currentDate: Date = new Date();
  changeDate: Date = this.currentDate
  _selectedColumns: any[];

  constructor(
    private httpClient: HttpClient
  ) { }

  @Input() get selectedColumns(): any[] {
    return this._selectedColumns;
  }

  set selectedColumns(val: any[]) {
    this._selectedColumns = this.subjectList.filter(col => val.includes(col));
  }

  ngOnInit() {
    this.getData();
    this.getStudentResult()
  }

  getData() {
    this.httpClient.get<[]>(`http://localhost:8080/quizzeducation/api/bocauhoidalam`).subscribe(
      (response) => {
        this.resultList = response
        this.resultFilterList = this.resultList
        this.httpClient.get<[]>(`http://localhost:8080/quizzeducation/api/monthi`).subscribe(
          (response) => {
            this.subjectList = response
            this._selectedColumns = this.subjectList
            this.setData()
          },
          (error) => {
            console.error(error.message)
          }
        )
      },
      (error) => {
        console.error(error.message)
      }
    )
    this.httpClient.get<[]>(`http://localhost:8080/quizzeducation/api/kythi`).subscribe(
      (response) => {
        this.eventList = response
        this.eventFilterList = this.eventList.filter(event => new Date(event.thoiGianBatDau).getFullYear() == this.changeDate.getFullYear())
      },
      (error) => {
        console.error(error.message)
      }
    )

  }

  setData() {
    this.data = {
      labels: [],
      datasets: [
        {
          label: 'Số bài trung bình trở lên',
          backgroundColor: 'rgba(220, 220, 220, 0.2)',
          borderColor: 'rgba(220, 220, 220, 1)',
          pointBackgroundColor: 'rgba(220, 220, 220, 1)',
          pointBorderColor: '#fff',
          data: []
        },
        {
          label: 'Số bài dưới trung bình',
          backgroundColor: 'rgba(151, 187, 205, 0.2)',
          borderColor: 'rgba(151, 187, 205, 1)',
          pointBackgroundColor: 'rgba(151, 187, 205, 1)',
          pointBorderColor: '#fff',
          data: []
        }
      ]
    };
    for (let i = 1; i <= 12; i++) {
      this.data.labels.push('Thg ' + i)
      this.data.datasets[0].data.push(this.resultFilterList.filter(result => new Date(result.deThi.chiTietKyThi.kyThi.thoiGianBatDau).getFullYear() == this.changeDate.getFullYear()
        && new Date(result.deThi.chiTietKyThi.kyThi.thoiGianBatDau).getMonth() == i && result.diemSo >= 5).length)
      this.data.datasets[1].data.push(this.resultFilterList.filter(result => new Date(result.deThi.chiTietKyThi.kyThi.thoiGianBatDau).getFullYear() == this.changeDate.getFullYear()
        && new Date(result.deThi.chiTietKyThi.kyThi.thoiGianBatDau).getMonth() == i && result.diemSo < 5).length)
    }

    this.data2 = {
      labels: ['Giỏi', 'Khá', 'Trung Bình', 'Yếu'],
      datasets: [
        {
          label: 'Tổng',
          backgroundColor: ['#36a2eb', '#6aa07f', '#ffce56', '#ff4645'],
          data: [
            this.resultFilterList.filter(result => result.diemSo > 8 && new Date(result.deThi.chiTietKyThi.kyThi.thoiGianBatDau).getFullYear() == this.changeDate.getFullYear()).length,
            this.resultFilterList.filter(result => result.diemSo > 6 && result.diemSo <= 8 && new Date(result.deThi.chiTietKyThi.kyThi.thoiGianBatDau).getFullYear() == this.changeDate.getFullYear()).length,
            this.resultFilterList.filter(result => result.diemSo >= 5 && result.diemSo <= 6 && new Date(result.deThi.chiTietKyThi.kyThi.thoiGianBatDau).getFullYear() == this.changeDate.getFullYear()).length,
            this.resultFilterList.filter(result => result.diemSo < 5 && new Date(result.deThi.chiTietKyThi.kyThi.thoiGianBatDau).getFullYear() == this.changeDate.getFullYear()).length
          ]
        }
      ]
    };

    this.data3 = {
      labels: this.subjectList.map(labels => {
        return labels.tenMon
      }),
      datasets: [
        {
          label: 'Tỉ lệ % qua môn',
          backgroundColor: '#f87939',
          data: this.subjectList.map(labels => {
            return this.getPercentage(labels.tenMon)
          })
        }
      ]
    };

    this.getStudentResult()
  }

  getStudentResult() {
    this.studentResultList = []
    this.httpClient.get<[]>(`http://localhost:8080/quizzeducation/api/taikhoan`).subscribe(
      (response) => {
        this.accList = response
        this.studentList = this.accList.filter(acc => acc.vaiTro.maVaiTro == 1)
        this.teacherList = this.accList.filter(acc => acc.vaiTro.maVaiTro == 2)
        var result: KetQuaTrungBinh[] = []
        this.studentList.forEach(student => {
          var object: KetQuaTrungBinh = {
            tenDangNhap: student.tenDangNhap,
            hoVaTen: student.hoVaTen,
            diemTB: this.getStudentAvgMark(student.tenDangNhap)
          }
          result.push(object)
        })
        this.studentResultList = result
      },
      (error) => {
        console.error(error.message)
      }
    )
  }

  changeYear(date: Date) {
    this.changeDate = date
    this.eventFilterList = this.eventList.filter(event => new Date(event.thoiGianBatDau).getFullYear() == this.changeDate.getFullYear())
    this.resultFilterList = this.resultList
    this.setData()
  }

  changeEvent() {
    var selected = (<HTMLInputElement>document.getElementById("filterEvent")).value
    if (selected) {
      this.resultFilterList = this.resultList.filter(result => result.deThi.chiTietKyThi.kyThi.maKyThi == selected)
    } else {
      this.resultFilterList = this.resultList
    }
    this.setData()
  }

  getPercentage(subjectName: string): number {
    var resultList = this.resultFilterList.filter(result => new Date(result.deThi.chiTietKyThi.kyThi.thoiGianBatDau).getFullYear() == this.changeDate.getFullYear() && result.deThi.monThi.tenMon == subjectName)
    var resultAboveAvgList = this.resultFilterList.filter(result => new Date(result.deThi.chiTietKyThi.kyThi.thoiGianBatDau).getFullYear() == this.changeDate.getFullYear() && result.deThi.monThi.tenMon == subjectName && result.diemSo >= 5)
    if (resultList.length > 0 && resultAboveAvgList.length > 0) {
      return resultAboveAvgList.length / resultList.length * 100
    } else {
      return 0;
    }
  }

  getStudentAvgMark(username: string): number {
    var total = 0;
    var count = 0;
    this.resultFilterList.filter(result => result.taiKhoan.tenDangNhap == username && new Date(result.deThi.chiTietKyThi.kyThi.thoiGianBatDau).getFullYear() == this.changeDate.getFullYear())
      .forEach((result) => { total += result.diemSo; count++ })
    if (count > 0) {
      return total / count;
    } else {
      return null;
    }
  }

  getStudentAvgMarkOfEachSubject(username: string, subjectId: number): number {
    var total = 0;
    var count = 0;
    this.resultFilterList.filter(result => result.taiKhoan.tenDangNhap == username && result.deThi.chiTietKyThi.monThi.maMon == subjectId && new Date(result.deThi.chiTietKyThi.kyThi.thoiGianBatDau).getFullYear() == this.changeDate.getFullYear())
      .forEach((result) => { total += result.diemSo; count++ })
    if (count > 0) {
      return total / count;
    } else {
      return null
    }
  }

  handleChartRef($chartRef: any) {
    if ($chartRef) {
      setTimeout(() => {
        $chartRef?.update();
      }, 2000);
    }
  }
}
