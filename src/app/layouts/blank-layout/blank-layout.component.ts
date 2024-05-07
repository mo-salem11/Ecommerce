import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { NavBlankComponent } from '../../components/nav-blank/nav-blank.component';
import { RouterOutlet,Router, NavigationEnd, RouterLink, RouterLinkActive } from '@angular/router';
import { FooterComponent } from '../../components/footer/footer.component';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-black-layout',
  standalone: true,
  imports: [CommonModule,RouterLink,RouterLinkActive,NavBlankComponent,RouterOutlet,FooterComponent],
  templateUrl: './blank-layout.component.html',
  styleUrl: './blank-layout.component.scss'
})
export class BlankLayoutComponent {
  constructor(
    ) { }


  ngOnInit(): void {

  }


  getRouterLink(breadcrumb: string): string[] {
    return ['/' + breadcrumb.toLowerCase()];
  }

 showScrollTopButton = false;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollThreshold = 200;
    const scrollY = window.scrollY;
    this.showScrollTopButton = scrollY > scrollThreshold;
  }

  goToUp(){
    scrollTo(0,0);
  }



}
