import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [


  {
    title: true,
    name: 'Kỳ Thi'
  },
  {
    name: 'Quản lý kỳ thi',
    url: '/admin/exam',
    iconComponent: { name: 'cil-notes' },
    children: [
      {
        name: 'Quản lý đợt thi',
        url: '/admin/exam/contest'
      },
      {
        name: 'Quản lý môn thi',
        url: '/admin/exam/exam-subjects'
      },
      {
        name: 'Quản lý lớp thi',
        url: '/admin/exam/exam-class'
      }
    ]
  },
  {
    title: true,
    name: 'Người dùng'
  },
  {
    name: 'Quản lý người dùng',
    url: '/admin/account',
    iconComponent: { name: 'cil-star' },
    children: [
      {
        name: 'Quản lý giáo viên',
        url: '/admin/account/teacher'
      },
      {
        name: 'Quản lý học sinh',
        url: '/admin/account/user'
      },
    ]
  }, 
  // {
  //   title: true,
  //   name: 'Đề thi'
  // },
  // {
  //   name: 'Quản lý đề thi',
  //   url: '/admin/exam-papers-main',
  //   iconComponent: { name: 'cil-star' },
  //   children: [
  //     {
  //       name: 'Quản lý đề thi',
  //       url: '/admin/exam-papers-main/exam-papers'
  //     },
  //     {
  //       name: 'Quản lý câu hỏi',
  //       url: '/admin/exam-papers-main/exam-request'
  //     },
  //     {
  //       name: 'Quản lý câu trả lời',
  //       url: '/admin/exam-papers-main/exam-answer'
  //     },
  //   ]
  // },
  {
    title: true,
    name: 'Thống kê'
  },
  {
    name: 'Thống kê',
    iconComponent: { name: 'cil-description' },
    class: 'mt-auto',
    url: '/report'
  }
];
