import { Injectable } from '@angular/core';
import { Pipe, PipeTransform } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class FormatService {
  
  transform(value: string): string {
    if (!value) return ''; // Xử lý giá trị null hoặc undefined
    const date = new Date(value);
    const day = date.getDate().toString().padStart(2, '0'); // Định dạng ngày
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Định dạng tháng (lưu ý +1 vì tháng bắt đầu từ 0)
    const year = date.getFullYear(); // Lấy năm
    return `${day}/${month}/${year}`;
  }

  transformLocalDate(value: string): string {
    if (!value) return ''; // Xử lý giá trị null hoặc undefined
    const date = new Date(value);
    const day = date.getDate().toString().padStart(2, '0'); // Định dạng ngày
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Định dạng tháng (lưu ý +1 vì tháng bắt đầu từ 0)
    const year = date.getFullYear(); // Lấy năm
    return `${year}-${month}-${day}`;
  }
  constructor() { }
}
