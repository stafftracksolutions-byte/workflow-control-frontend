import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    NavbarComponent,
    SidebarComponent
  ],
  template: `
    <app-navbar></app-navbar>

    <div class="layout">
      <app-sidebar></app-sidebar>

      <main class="content">
        <router-outlet></router-outlet>
      </main>
    </div>
  `,
  styleUrls: ['./main-layout.component.css']
})
export class MainLayoutComponent {}
