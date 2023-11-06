import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { HttpSvService } from '../../../../../../service/API.service';
@Component({
	selector: 'app-contest-detail',
	templateUrl: './contest-detail.component.html',
	styleUrls: ['./contest-detail.component.scss'],
	providers: [MessageService, DialogService, ConfirmationService],

	// standalone: true,
	// imports: [NgbDatepickerModule],
})
export class ContestDetailComponent implements OnInit {
	myForm: FormGroup;
	myFormMonThi: FormGroup; // Khai báo FormGroup
	constructor(private HttpSvService: HttpSvService, private fb: FormBuilder, private confirmationService: ConfirmationService, private messageService: MessageService) {
		this.myForm = this.fb.group({
			tenKyThi: ['', [Validators.required]],
			tenMon: ['', [Validators.required]]
		});

		this.myFormMonThi = this.fb.group({
			tenMonThi: ['', [Validators.required]]
		});
	}
	ngOnInit(): void {
		this.getData();
	}

	// Lấy dử liệu từ api về 
	listLopThi: any;
	listKyThi: any;
	kyThiOptions: any[] = [];
	listMonThi: any[] = [];
	listChiTietKyThi: any;
	getData() {
		this.HttpSvService.getList('lopthi').subscribe((response: any) => {
			this.listLopThi = response;
		});
		this.HttpSvService.getList('monthi').subscribe((response: any) => {
			this.listMonThi = response;
		});

		this.HttpSvService.getList('kythi').subscribe(kyThiResponse => {
			this.listKyThi = kyThiResponse;
			this.initializeKyThiOptions();
		});
		this.HttpSvService.getList('chitietkythi').subscribe(Response => {
			this.listChiTietKyThi = Response;
		});
	}

	// bắt lỗi nếu kỳ thi này đã thi rồi thì không hiển thị nữa
	initializeKyThiOptions() {

		this.kyThiOptions = this.listKyThi.map(kyThi => {
			return { name: kyThi.tenKyThi, code: kyThi.maKyThi };
		});

	}



	selectedOption: any;
	listChiTietKy_KyThi: any[] = [];
	idKyThi: number;
	onSelectChange(event: any) {
		if (event) {
			this.idKyThi = event.code;
			this.HttpSvService.getItem('chitietkythi/kythi/create', this.idKyThi).subscribe(
				(response) => {
					this.listChiTietKy_KyThi = response;
					// Cập nhật danh sách lớp sau khi có dữ liệu mới
					this.initializeMonThiOptions();

				},
				(error) => {
					// Xử lý lỗi khi mã code không tồn tại
					this.listChiTietKy_KyThi = [];
					// Cập nhật danh sách lớp để hiển thị tất cả lớp
					this.initializeMonThiOptions();
				}

			);
		}


	}

	// select Lớp thi
	// lopThiOptions: any[] = [];
	// initializeLopOptions() {
	// this.lopThiOptions = this.listLopThi.map((lop) => {
	// 	return { name: lop.tenLop, code: lop.maLopThi };
	// });

	// this.monThiOptions = this.listMonThi.map((lop) => {
	// 	return { name: lop.tenMon, code: lop.maMon };
	// });
	// }

	// select theo môn thi
	monThiOptions: any[] = [];
	// lopThiOptions: any[] = [];
	initializeMonThiOptions() {
		// Lấy danh sách tất cả các môn học
		this.HttpSvService.getList('monthi').subscribe((response) => {
			const allMonThi = response;
			const usedMonCodes = this.listChiTietKy_KyThi.map((chitiet) => chitiet.monThi.maMon);

			// Lọc ra các môn chưa được sử dụng
			this.monThiOptions = allMonThi.filter((mon) => !usedMonCodes.includes(mon.maMon)).map((mon) => {
				return { name: mon.tenMon, code: mon.maMon };
			});
		});


	}

	// lấy dử liệu từ MyForm về chuẩn bị tạo mới
	createChiTietKyThi() {

		if (this.myForm.invalid) {
			for (const control in this.myForm.controls) {
				if (this.myForm.controls.hasOwnProperty(control)) {
					this.myForm.controls[control].markAsTouched();
				}
			}
			return;
		}

		// Lấy giá trị của `tenMon` từ `this.myForm`
		const selectedMon = this.myForm.get('tenMon').value;
		// Tạo một danh sách dữ liệu chi tiết kỳ thi từ giá trị được chọn
		const dataChiTietKyThi_monThi = selectedMon.map((mon) => ({
			thoiGianBatDau: null,
			thoiGianKetThuc: null,
			kyThi: {
				maKyThi: this.idKyThi,
			},
			monThi: {
				maMon: mon.code,
			},
			lopThi: null,
		}));

		// Duyệt qua từng mục và gửi lên API
		dataChiTietKyThi_monThi.forEach((item) => {
			this.HttpSvService.postItem('chitietkythi', item).subscribe((response) => {
			});
		});
		this.messageService.add({ severity: 'success', summary: 'Thông báo thêm môn thi vào kỳ thi', detail: 'Thông báo thêm môn thi vào kỳ thi thành công' });
		setTimeout(() => {
			location.reload();
		}, 2000);
	}


	// chỉnh sửa môn thi
	isEditing: boolean = false;
	idMonThi: number;
	nameMonThi: any;
	editMonThi(id: number) {
		this.isEditing = true;
		this.idMonThi = id;
		this.HttpSvService.getItem('monthi', id).subscribe((response: any) => {
			this.nameMonThi = response
			this.myFormMonThi.get('tenMonThi').setValue(this.nameMonThi.tenMon);
		});
	}

	cancelOrSave() {
		this.isEditing = false;
		this.myForm.get('tenMonThi').setValue('');
	}

	createMonThi() {

		if (this.myFormMonThi.invalid) {
			for (const control in this.myFormMonThi.controls) {
				if (this.myFormMonThi.controls.hasOwnProperty(control)) {
					this.myFormMonThi.controls[control].markAsTouched();
				}
			}
			return;
		}

		const DataMonThi = {
			tenMon: this.myFormMonThi.get('tenMonThi').value,
		}
		this.HttpSvService.postItem('monthi', DataMonThi).subscribe(data => {
			this.messageService.add({ severity: 'success', summary: 'Thông báo tạo mới môn thi', detail: 'Tạo mới môn thi thành công' });

			this.myFormMonThi.get('tenMonThi').setValue('');
			this.getData();
			this.initializeMonThiOptions()
		},
		)
	}

	updataMonThi() {

		if (this.myFormMonThi.invalid) {
			for (const control in this.myFormMonThi.controls) {
				if (this.myFormMonThi.controls.hasOwnProperty(control)) {
					this.myFormMonThi.controls[control].markAsTouched();
				}
			}
			return;
		}
		const DataMonThi = {
			maMon: this.idMonThi,
			tenMon: this.myFormMonThi.get('tenMonThi').value,
		}
		this.HttpSvService.putItem('monthi', this.idMonThi, DataMonThi).subscribe(data => {
			this.myFormMonThi.get('tenMonThi').setValue('');
			this.messageService.add({ severity: 'success', summary: 'Thông báo cập nhật môn thi', detail: 'Cập nhật môn thi thành công' });
			this.getData();
			this.initializeMonThiOptions()
		})
	}

	deleteMonThi(id: number) {
		this.HttpSvService.deleteItem('monthi', id).subscribe(data => {
			this.messageService.add({ severity: 'success', summary: 'Thông báo xóa môn thi', detail: 'Xóa thành công môn thi' });
			this.getData();
			this.initializeMonThiOptions()
		}, error => {
			this.messageService.add({ severity: 'error', summary: 'Thông báo xóa môn thi', detail: 'Xóa thất bại vì môn này đã được thêm vào kỳ thi' });
		})
	}




}



