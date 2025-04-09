import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="user-management">
      <h2>User Management</h2>
      
      <div class="add-user-form">
        <h3>Add New User</h3>
        <form (ngSubmit)="onSubmit()">
          <div class="form-group">
            <label for="username">Username:</label>
            <input type="text" id="username" [(ngModel)]="newUser.username" name="username" required>
          </div>
          <div class="form-group">
            <label for="password">Password:</label>
            <input type="password" id="password" [(ngModel)]="newUser.password" name="password" required>
          </div>
          <div class="form-group">
            <label for="name">Name:</label>
            <input type="text" id="name" [(ngModel)]="newUser.name" name="name" required>
          </div>
          <div class="form-group">
            <label for="role">Role:</label>
            <select id="role" [(ngModel)]="newUser.role" name="role" required>
              <option value="General User">General User</option>
              <option value="Admin">Admin</option>
            </select>
          </div>
          <button type="submit" [disabled]="loading">
            {{ loading ? 'Adding...' : 'Add User' }}
          </button>
        </form>
      </div>

      <div class="users-list">
        <h3>Existing Users</h3>
        <div *ngIf="loadingUsers" class="loading">Loading users...</div>
        <table *ngIf="!loadingUsers">
          <thead>
            <tr>
              <th>Username</th>
              <th>Name</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let user of users">
              <td>{{ user.username }}</td>
              <td>{{ user.name }}</td>
              <td>{{ user.role }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `,
  styles: [`
    .user-management {
      margin-top: 30px;
      padding: 20px;
      background-color: #f9f9f9;
      border-radius: 5px;
    }
    .add-user-form {
      margin-bottom: 30px;
    }
    .form-group {
      margin-bottom: 15px;
    }
    .form-group label {
      display: block;
      margin-bottom: 5px;
    }
    .form-group input, .form-group select {
      width: 100%;
      padding: 8px;
      border: 1px solid #ccc;
      border-radius: 4px;
    }
    button {
      padding: 10px 20px;
      background-color: #28a745;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
    button:disabled {
      background-color: #ccc;
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
export class UserManagementComponent implements OnInit {
  users: User[] = [];
  loadingUsers = true;
  loading = false;
  newUser: Partial<User> = {
    username: '',
    password: '',
    name: '',
    role: 'General User'
  };

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.authService.getAllUsers().subscribe(users => {
      this.users = users;
      this.loadingUsers = false;
    });
  }

  onSubmit() {
    if (!this.newUser.username || !this.newUser.password || !this.newUser.name || !this.newUser.role) {
      return;
    }

    this.loading = true;
    this.authService.addUser(this.newUser as User).subscribe({
      next: () => {
        this.loading = false;
        this.newUser = {
          username: '',
          password: '',
          name: '',
          role: 'General User'
        };
        this.loadUsers();
      },
      error: () => {
        this.loading = false;
      }
    });
  }
}