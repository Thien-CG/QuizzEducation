import { INavData } from '@coreui/angular';

export const navTeacherItems: INavData[] = [


  {
    name: 'Quản lý đề thi',
    url: '/teacher',
    iconComponent: { name: 'cil-notes' },
    children: [
      {
        name: 'Lịch phân công & Tạo đề',
        url: 'exam-management/assignment-schedule-&-exam-creation'
      },
      {
        name: 'Danh sách đề thi',
        url: 'exam-management/exam-list'
      }
    ]
  },
  {
    name: 'Quản Lý Lớp',
    url: 'manage-class',
    iconComponent: { name: 'cil-list'}
  },
  {
    name: 'Kết Quả Học Sinh',
    url: 'manage-student',
    iconComponent: { name: 'cil-list' }
  }
  // {
  //   title: true,
  //   name: 'Extras'
  // },
  // {
  //   name: 'Pages',
  //   url: '/login',
  //   iconComponent: { name: 'cil-star' },
  //   children: [
  //     {
  //       name: 'Login',
  //       url: '/login'
  //     },
  //     {
  //       name: 'Register',
  //       url: '/register'
  //     },
  //     {
  //       name: 'Error 404',
  //       url: '/404'
  //     },
  //     {
  //       name: 'Error 500',
  //       url: '/500'
  //     }
  //   ]
  // },
  // {
  //   title: true,
  //   name: 'Links',
  //   class: 'py-0'
  // },
  // {
  //   name: 'Docs',
  //   url: 'https://coreui.io/angular/docs/templates/installation',
  //   iconComponent: { name: 'cil-description' },
  //   attributes: { target: '_blank', class: '-text-dark' },
  //   class: 'mt-auto'
  // },
  // {
  //   name: 'Try CoreUI PRO',
  //   url: 'https://coreui.io/product/angular-dashboard-template/',
  //   iconComponent: { name: 'cil-layers' },
  //   attributes: { target: '_blank' }
  // }
];
