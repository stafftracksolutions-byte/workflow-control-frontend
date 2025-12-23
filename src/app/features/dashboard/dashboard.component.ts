import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';



@Component({
  standalone: true,
  selector: 'app-dashboard',
  imports: [CommonModule],
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  private auth = inject(AuthService);
  private router = inject(Router);

  user = this.auth.user; // snapshot inicial

  ngOnInit() {
    this.auth.currentUser$.subscribe(u => {
      this.user = u;
    });
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}

