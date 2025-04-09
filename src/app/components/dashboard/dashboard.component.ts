import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { RecordsService } from '../../services/records.service';
import { User, Record } from '../../models/user.model';
import { UserManagementComponent } from '../user-management/user-management.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, UserManagementComponent],
  template: `
    <div class="dashboard-container">
      <header>
        <h1>Welcome, {{ currentUser?.name }}</h1>
        <button (click)="logout()">Logout</button>
      </header>

      <div class="user-info">
        <h2>User Details</h2>
        <p>Username: {{ currentUser?.username }}</p>
        <p>Role: {{ currentUser?.role }}</p>
      </div>

      <app-user-management *ngIf="isAdmin"></app-user-management>

      <div class="records-section">
        <h2>Records</h2>
        <div *ngIf="loading" class="loading">Loading records...</div>
        <table *ngIf="!loading">
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Created At</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let record of records">
              <td>{{ record.title }}</td>
              <td>{{ record.description }}</td>
              <td>{{ record.createdAt | date }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `,
  styles: [`
    .dashboard-container {
      padding: 20px;
    }
    header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
    }
    .user-info {
      margin-bottom: 30px;
      padding: 15px;
      background-color: #f5f5f5;
      border-radius: 5px;
    }
    table {
      width: 100%;
      border-collapse: collapse;
    }
    th, td {
      padding: 10px;
      border: 1px solid #ddd;
      text-align: left;
    }
    th {
      background-color: #f5f5f5;
    }
    .loading {
      text-align: center;
      padding: 20px;
      font-style: italic;
    }
  `]
})
export class DashboardComponent implements OnInit {
  currentUser: User | null = null;
  records: Record[] = [];
  loading = true;
  isAdmin = false;

  constructor(
    private authService: AuthService,
    private recordsService: RecordsService,
    private router: Router
  ) {}

  ngOnInit() {
    this.currentUser = this.authService.getCurrentUser();
    if (!this.currentUser) {
      this.router.navigate(['/login']);
      return;
    }

    this.isAdmin = this.currentUser.role === 'Admin';
    this.loadRecords();
  }

  loadRecords() {
    if (!this.currentUser) return;

    const loadFunction = this.isAdmin
      ? this.recordsService.getAllRecords(2000)
      : this.recordsService.getRecords(this.currentUser.id, 2000);

    loadFunction.subscribe(records => {
      this.records = records;
      this.loading = false;
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}