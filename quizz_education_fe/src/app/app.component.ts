import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

import { Title } from '@angular/platform-browser';
import { IconSetService } from '@coreui/icons-angular';
import { PrimeNGConfig } from 'primeng/api';
import { iconSubset } from './Admin/icons/icon-subset';


@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent implements OnInit {
  title = 'Quizz Education';

  constructor(
    private router: Router,
    private titleService: Title,
    private iconSetService: IconSetService,
    private primengConfig: PrimeNGConfig
  ) {
    titleService.setTitle(this.title);
    // iconSet singleton
    iconSetService.icons = { ...iconSubset };
  }

  ngOnInit(): void {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
    });
  }
}
