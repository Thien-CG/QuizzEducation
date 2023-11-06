import { KetQuaTrungBinh } from './../../../models/KetQuaTrungBinh.entity';
import { TaiKhoan } from './../../../models/TaiKhoan.entity';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChartjsModule } from '@coreui/angular-chartjs';
import { data } from 'jquery';
import { forEach } from 'lodash-es';
import { CalendarModule } from 'primeng/calendar';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';


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
    TableModule
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


  constructor(
    private httpClient: HttpClient
  ) { }
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
      labels: ['Thg 1', 'Thg 2', 'Thg 3', 'Thg 4', 'Thg 5', 'Th 6', 'Thg 7', 'Thg 8', 'Thg 9', 'Thg 10', 'Thg 11', 'Thg 12'],
      datasets: [
        {
          label: 'Số bài trên trung bình',
          backgroundColor: 'rgba(220, 220, 220, 0.2)',
          borderColor: 'rgba(220, 220, 220, 1)',
          pointBackgroundColor: 'rgba(220, 220, 220, 1)',
          pointBorderColor: '#fff',
          data: [
            this.resultFilterList.filter(result => new Date(result.deThi.chiTietKyThi.kyThi.thoiGianBatDau).getFullYear() == this.changeDate.getFullYear()
              && new Date(result.deThi.chiTietKyThi.kyThi.thoiGianBatDau).getMonth() == 1 && result.diemSo >= 5).length,
            this.resultFilterList.filter(result => new Date(result.deThi.chiTietKyThi.kyThi.thoiGianBatDau).getFullYear() == this.changeDate.getFullYear()
              && new Date(result.deThi.chiTietKyThi.kyThi.thoiGianBatDau).getMonth() == 2 && result.diemSo >= 5).length,
            this.resultFilterList.filter(result => new Date(result.deThi.chiTietKyThi.kyThi.thoiGianBatDau).getFullYear() == this.changeDate.getFullYear()
              && new Date(result.deThi.chiTietKyThi.kyThi.thoiGianBatDau).getMonth() == 3 && result.diemSo >= 5).length,
            this.resultFilterList.filter(result => new Date(result.deThi.chiTietKyThi.kyThi.thoiGianBatDau).getFullYear() == this.changeDate.getFullYear()
              && new Date(result.deThi.chiTietKyThi.kyThi.thoiGianBatDau).getMonth() == 4 && result.diemSo >= 5).length,
            this.resultFilterList.filter(result => new Date(result.deThi.chiTietKyThi.kyThi.thoiGianBatDau).getFullYear() == this.changeDate.getFullYear()
              && new Date(result.deThi.chiTietKyThi.kyThi.thoiGianBatDau).getMonth() == 5 && result.diemSo >= 5).length,
            this.resultFilterList.filter(result => new Date(result.deThi.chiTietKyThi.kyThi.thoiGianBatDau).getFullYear() == this.changeDate.getFullYear()
              && new Date(result.deThi.chiTietKyThi.kyThi.thoiGianBatDau).getMonth() == 6 && result.diemSo >= 5).length,
            this.resultFilterList.filter(result => new Date(result.deThi.chiTietKyThi.kyThi.thoiGianBatDau).getFullYear() == this.changeDate.getFullYear()
              && new Date(result.deThi.chiTietKyThi.kyThi.thoiGianBatDau).getMonth() == 7 && result.diemSo >= 5).length,
            this.resultFilterList.filter(result => new Date(result.deThi.chiTietKyThi.kyThi.thoiGianBatDau).getFullYear() == this.changeDate.getFullYear()
              && new Date(result.deThi.chiTietKyThi.kyThi.thoiGianBatDau).getMonth() == 8 && result.diemSo >= 5).length,
            this.resultFilterList.filter(result => new Date(result.deThi.chiTietKyThi.kyThi.thoiGianBatDau).getFullYear() == this.changeDate.getFullYear()
              && new Date(result.deThi.chiTietKyThi.kyThi.thoiGianBatDau).getMonth() == 9 && result.diemSo >= 5).length,
            this.resultFilterList.filter(result => new Date(result.deThi.chiTietKyThi.kyThi.thoiGianBatDau).getFullYear() == this.changeDate.getFullYear()
              && new Date(result.deThi.chiTietKyThi.kyThi.thoiGianBatDau).getMonth() == 10 && result.diemSo >= 5).length,
            this.resultFilterList.filter(result => new Date(result.deThi.chiTietKyThi.kyThi.thoiGianBatDau).getFullYear() == this.changeDate.getFullYear()
              && new Date(result.deThi.chiTietKyThi.kyThi.thoiGianBatDau).getMonth() == 11 && result.diemSo >= 5).length,
            this.resultFilterList.filter(result => new Date(result.deThi.chiTietKyThi.kyThi.thoiGianBatDau).getFullYear() == this.changeDate.getFullYear()
              && new Date(result.deThi.chiTietKyThi.kyThi.thoiGianBatDau).getMonth() == 12 && result.diemSo >= 5).length
          ]
        },
        {
          label: 'Số bài dưới trung bình',
          backgroundColor: 'rgba(151, 187, 205, 0.2)',
          borderColor: 'rgba(151, 187, 205, 1)',
          pointBackgroundColor: 'rgba(151, 187, 205, 1)',
          pointBorderColor: '#fff',
          data: [
            this.resultFilterList.filter(result => new Date(result.deThi.chiTietKyThi.kyThi.thoiGianBatDau).getFullYear() == this.changeDate.getFullYear()
              && new Date(result.deThi.chiTietKyThi.kyThi.thoiGianBatDau).getMonth() == 1 && result.diemSo < 5).length,
            this.resultFilterList.filter(result => new Date(result.deThi.chiTietKyThi.kyThi.thoiGianBatDau).getFullYear() == this.changeDate.getFullYear()
              && new Date(result.deThi.chiTietKyThi.kyThi.thoiGianBatDau).getMonth() == 2 && result.diemSo < 5).length,
            this.resultFilterList.filter(result => new Date(result.deThi.chiTietKyThi.kyThi.thoiGianBatDau).getFullYear() == this.changeDate.getFullYear()
              && new Date(result.deThi.chiTietKyThi.kyThi.thoiGianBatDau).getMonth() == 3 && result.diemSo < 5).length,
            this.resultFilterList.filter(result => new Date(result.deThi.chiTietKyThi.kyThi.thoiGianBatDau).getFullYear() == this.changeDate.getFullYear()
              && new Date(result.deThi.chiTietKyThi.kyThi.thoiGianBatDau).getMonth() == 4 && result.diemSo < 5).length,
            this.resultFilterList.filter(result => new Date(result.deThi.chiTietKyThi.kyThi.thoiGianBatDau).getFullYear() == this.changeDate.getFullYear()
              && new Date(result.deThi.chiTietKyThi.kyThi.thoiGianBatDau).getMonth() == 5 && result.diemSo < 5).length,
            this.resultFilterList.filter(result => new Date(result.deThi.chiTietKyThi.kyThi.thoiGianBatDau).getFullYear() == this.changeDate.getFullYear()
              && new Date(result.deThi.chiTietKyThi.kyThi.thoiGianBatDau).getMonth() == 6 && result.diemSo < 5).length,
            this.resultFilterList.filter(result => new Date(result.deThi.chiTietKyThi.kyThi.thoiGianBatDau).getFullYear() == this.changeDate.getFullYear()
              && new Date(result.deThi.chiTietKyThi.kyThi.thoiGianBatDau).getMonth() == 7 && result.diemSo < 5).length,
            this.resultFilterList.filter(result => new Date(result.deThi.chiTietKyThi.kyThi.thoiGianBatDau).getFullYear() == this.changeDate.getFullYear()
              && new Date(result.deThi.chiTietKyThi.kyThi.thoiGianBatDau).getMonth() == 8 && result.diemSo < 5).length,
            this.resultFilterList.filter(result => new Date(result.deThi.chiTietKyThi.kyThi.thoiGianBatDau).getFullYear() == this.changeDate.getFullYear()
              && new Date(result.deThi.chiTietKyThi.kyThi.thoiGianBatDau).getMonth() == 9 && result.diemSo < 5).length,
            this.resultFilterList.filter(result => new Date(result.deThi.chiTietKyThi.kyThi.thoiGianBatDau).getFullYear() == this.changeDate.getFullYear()
              && new Date(result.deThi.chiTietKyThi.kyThi.thoiGianBatDau).getMonth() == 10 && result.diemSo < 5).length,
            this.resultFilterList.filter(result => new Date(result.deThi.chiTietKyThi.kyThi.thoiGianBatDau).getFullYear() == this.changeDate.getFullYear()
              && new Date(result.deThi.chiTietKyThi.kyThi.thoiGianBatDau).getMonth() == 11 && result.diemSo < 5).length,
            this.resultFilterList.filter(result => new Date(result.deThi.chiTietKyThi.kyThi.thoiGianBatDau).getFullYear() == this.changeDate.getFullYear()
              && new Date(result.deThi.chiTietKyThi.kyThi.thoiGianBatDau).getMonth() == 12 && result.diemSo < 5).length
          ]
        }
      ]
    };

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
