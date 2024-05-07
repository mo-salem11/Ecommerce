import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ActivatedRouteSnapshot } from '@angular/router';
@Component({
  selector: 'app-bread-crums',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './bread-crums.component.html',
  styleUrl: './bread-crums.component.scss'
})
export class BreadCrumsComponent implements OnInit{
  breadcrumbs!: string[];

  constructor(private router: Router) {}

  ngOnInit() {
    this.breadcrumbs = this.buildBreadcrumbs();
  }

  buildBreadcrumbs(): string[] {
    const breadcrumbs = [];
    const url = this.router.url;
    const urlSegments = url.split('/');

    let currentRoute: ActivatedRouteSnapshot = this.router.routerState.snapshot.root;
    while (currentRoute) {
      const data = currentRoute.data; // Access data directly from ActivatedRouteSnapshot

      // Extract breadcrumb from route data if provided
      if (data['breadcrumb']) {
        breadcrumbs.push(data['breadcrumb']);
      } else {
        // Otherwise, use path segments with some logic for clarity and handling specific routes
        const segment = urlSegments.shift() || ''; // Use empty string for root
        if (segment === 'home') {
          breadcrumbs.push('Home'); // Use a more descriptive label for home
        } else if (segment.match(/^\d+$/)) { // Handle product details route dynamically
          breadcrumbs.push('Products'); // Assuming product details are nested under products
        } else {
          breadcrumbs.push(segment.charAt(0).toUpperCase() + segment.slice(1)); // Capitalize first letter
        }
      }

      currentRoute != currentRoute.firstChild; // Use firstChild for nested routes
    }

    return breadcrumbs;
  }
}
