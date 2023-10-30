import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChartjsModule } from '@coreui/angular-chartjs';
import { CalendarModule } from 'primeng/calendar';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ChartjsModule,
    CalendarModule,
    FormsModule
  ]
})
export class DashboardComponent implements OnInit {
  accList: any[]
  studentList: any[]
  teacherList: any[]
  resultList: any[]
  filterList: any[]
  avgMark: number
  avgAbove: number[]
  avgBelow: number[]
  data: any
  data2: any
  currentDate: Date = new Date();
  changeDate: Date = this.currentDate


  constructor(
    private httpClient: HttpClient
  ) { }
  ngOnInit() {
    this.getData();
  }

  getData() {
    this.httpClient.get<[]>(`http://localhost:8080/quizzeducation/api/bocauhoidalam`).subscribe(
      (response) => {
        this.resultList = response
        var total = 0;
        var count = 0;
        this.resultList.forEach((item) => {
          total += item.diemSo;
          count++;
        })
        this.avgMark = total / count
        this.data2 = {
          labels: ['Giỏi', 'Khá', 'Trung Bình', 'Yếu'],
          datasets: [
            {
              label: 'Tổng',
              backgroundColor: ['#36a2eb', '#6aa07f', '#ffce56', '#ff4645'],
              data: [
                this.resultList.filter(result => result.diemSo > 8 && new Date(result.deThi.chiTietKyThi.kyThi.thoiGianBatDau).getFullYear() == this.changeDate.getFullYear()).length,
                this.resultList.filter(result => result.diemSo > 6 && result.diemSo <= 8 && new Date(result.deThi.chiTietKyThi.kyThi.thoiGianBatDau).getFullYear() == this.changeDate.getFullYear()).length,
                this.resultList.filter(result => result.diemSo >= 5 && result.diemSo <= 6 && new Date(result.deThi.chiTietKyThi.kyThi.thoiGianBatDau).getFullYear() == this.changeDate.getFullYear()).length,
                this.resultList.filter(result => result.diemSo < 5 && new Date(result.deThi.chiTietKyThi.kyThi.thoiGianBatDau).getFullYear() == this.changeDate.getFullYear()).length
              ]
            }
          ]
        };
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
                this.resultList.filter(result => new Date(result.deThi.chiTietKyThi.kyThi.thoiGianBatDau).getFullYear() == this.changeDate.getFullYear()
                  && new Date(result.deThi.chiTietKyThi.kyThi.thoiGianBatDau).getMonth() == 1 && result.diemSo >= 5).length,
                this.resultList.filter(result => new Date(result.deThi.chiTietKyThi.kyThi.thoiGianBatDau).getFullYear() == this.changeDate.getFullYear()
                  && new Date(result.deThi.chiTietKyThi.kyThi.thoiGianBatDau).getMonth() == 2 && result.diemSo >= 5).length,
                this.resultList.filter(result => new Date(result.deThi.chiTietKyThi.kyThi.thoiGianBatDau).getFullYear() == this.changeDate.getFullYear()
                  && new Date(result.deThi.chiTietKyThi.kyThi.thoiGianBatDau).getMonth() == 3 && result.diemSo >= 5).length,
                this.resultList.filter(result => new Date(result.deThi.chiTietKyThi.kyThi.thoiGianBatDau).getFullYear() == this.changeDate.getFullYear()
                  && new Date(result.deThi.chiTietKyThi.kyThi.thoiGianBatDau).getMonth() == 4 && result.diemSo >= 5).length,
                this.resultList.filter(result => new Date(result.deThi.chiTietKyThi.kyThi.thoiGianBatDau).getFullYear() == this.changeDate.getFullYear()
                  && new Date(result.deThi.chiTietKyThi.kyThi.thoiGianBatDau).getMonth() == 5 && result.diemSo >= 5).length,
                this.resultList.filter(result => new Date(result.deThi.chiTietKyThi.kyThi.thoiGianBatDau).getFullYear() == this.changeDate.getFullYear()
                  && new Date(result.deThi.chiTietKyThi.kyThi.thoiGianBatDau).getMonth() == 6 && result.diemSo >= 5).length,
                this.resultList.filter(result => new Date(result.deThi.chiTietKyThi.kyThi.thoiGianBatDau).getFullYear() == this.changeDate.getFullYear()
                  && new Date(result.deThi.chiTietKyThi.kyThi.thoiGianBatDau).getMonth() == 7 && result.diemSo >= 5).length,
                this.resultList.filter(result => new Date(result.deThi.chiTietKyThi.kyThi.thoiGianBatDau).getFullYear() == this.changeDate.getFullYear()
                  && new Date(result.deThi.chiTietKyThi.kyThi.thoiGianBatDau).getMonth() == 8 && result.diemSo >= 5).length,
                this.resultList.filter(result => new Date(result.deThi.chiTietKyThi.kyThi.thoiGianBatDau).getFullYear() == this.changeDate.getFullYear()
                  && new Date(result.deThi.chiTietKyThi.kyThi.thoiGianBatDau).getMonth() == 9 && result.diemSo >= 5).length,
                this.resultList.filter(result => new Date(result.deThi.chiTietKyThi.kyThi.thoiGianBatDau).getFullYear() == this.changeDate.getFullYear()
                  && new Date(result.deThi.chiTietKyThi.kyThi.thoiGianBatDau).getMonth() == 10 && result.diemSo >= 5).length,
                this.resultList.filter(result => new Date(result.deThi.chiTietKyThi.kyThi.thoiGianBatDau).getFullYear() == this.changeDate.getFullYear()
                  && new Date(result.deThi.chiTietKyThi.kyThi.thoiGianBatDau).getMonth() == 11 && result.diemSo >= 5).length,
                this.resultList.filter(result => new Date(result.deThi.chiTietKyThi.kyThi.thoiGianBatDau).getFullYear() == this.changeDate.getFullYear()
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
                this.resultList.filter(result => new Date(result.deThi.chiTietKyThi.kyThi.thoiGianBatDau).getFullYear() == this.changeDate.getFullYear()
                  && new Date(result.deThi.chiTietKyThi.kyThi.thoiGianBatDau).getMonth() == 1 && result.diemSo < 5).length,
                this.resultList.filter(result => new Date(result.deThi.chiTietKyThi.kyThi.thoiGianBatDau).getFullYear() == this.changeDate.getFullYear()
                  && new Date(result.deThi.chiTietKyThi.kyThi.thoiGianBatDau).getMonth() == 2 && result.diemSo < 5).length,
                this.resultList.filter(result => new Date(result.deThi.chiTietKyThi.kyThi.thoiGianBatDau).getFullYear() == this.changeDate.getFullYear()
                  && new Date(result.deThi.chiTietKyThi.kyThi.thoiGianBatDau).getMonth() == 3 && result.diemSo < 5).length,
                this.resultList.filter(result => new Date(result.deThi.chiTietKyThi.kyThi.thoiGianBatDau).getFullYear() == this.changeDate.getFullYear()
                  && new Date(result.deThi.chiTietKyThi.kyThi.thoiGianBatDau).getMonth() == 4 && result.diemSo < 5).length,
                this.resultList.filter(result => new Date(result.deThi.chiTietKyThi.kyThi.thoiGianBatDau).getFullYear() == this.changeDate.getFullYear()
                  && new Date(result.deThi.chiTietKyThi.kyThi.thoiGianBatDau).getMonth() == 5 && result.diemSo < 5).length,
                this.resultList.filter(result => new Date(result.deThi.chiTietKyThi.kyThi.thoiGianBatDau).getFullYear() == this.changeDate.getFullYear()
                  && new Date(result.deThi.chiTietKyThi.kyThi.thoiGianBatDau).getMonth() == 6 && result.diemSo < 5).length,
                this.resultList.filter(result => new Date(result.deThi.chiTietKyThi.kyThi.thoiGianBatDau).getFullYear() == this.changeDate.getFullYear()
                  && new Date(result.deThi.chiTietKyThi.kyThi.thoiGianBatDau).getMonth() == 7 && result.diemSo < 5).length,
                this.resultList.filter(result => new Date(result.deThi.chiTietKyThi.kyThi.thoiGianBatDau).getFullYear() == this.changeDate.getFullYear()
                  && new Date(result.deThi.chiTietKyThi.kyThi.thoiGianBatDau).getMonth() == 8 && result.diemSo < 5).length,
                this.resultList.filter(result => new Date(result.deThi.chiTietKyThi.kyThi.thoiGianBatDau).getFullYear() == this.changeDate.getFullYear()
                  && new Date(result.deThi.chiTietKyThi.kyThi.thoiGianBatDau).getMonth() == 9 && result.diemSo < 5).length,
                this.resultList.filter(result => new Date(result.deThi.chiTietKyThi.kyThi.thoiGianBatDau).getFullYear() == this.changeDate.getFullYear()
                  && new Date(result.deThi.chiTietKyThi.kyThi.thoiGianBatDau).getMonth() == 10 && result.diemSo < 5).length,
                this.resultList.filter(result => new Date(result.deThi.chiTietKyThi.kyThi.thoiGianBatDau).getFullYear() == this.changeDate.getFullYear()
                  && new Date(result.deThi.chiTietKyThi.kyThi.thoiGianBatDau).getMonth() == 11 && result.diemSo < 5).length,
                this.resultList.filter(result => new Date(result.deThi.chiTietKyThi.kyThi.thoiGianBatDau).getFullYear() == this.changeDate.getFullYear()
                  && new Date(result.deThi.chiTietKyThi.kyThi.thoiGianBatDau).getMonth() == 12 && result.diemSo < 5).length
              ]
            }
          ]
        };
      },
      (error) => {
        console.error(error.message)
      }
    )

    this.httpClient.get<[]>(`http://localhost:8080/quizzeducation/api/taikhoan`).subscribe(
      (response) => {
        this.accList = response
        this.studentList = this.accList.filter(acc => acc.vaiTro.maVaiTro == 1)
        this.teacherList = this.accList.filter(acc => acc.vaiTro.maVaiTro == 2)
      },
      (error) => {
        console.error(error.message)
      }
    )
  }

  changeYear(date: Date) {
    this.changeDate = date
    this.getData()
  }

  handleChartRef($chartRef: any) {
    if ($chartRef) {
      setTimeout(() => {
        $chartRef?.update();
      }, 3000);
    }
  }
}
