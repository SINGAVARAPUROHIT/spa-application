import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private users: User[] = [
    { id: '1', username: 'admin', password: 'admin123', role: 'Admin', name: 'Admin User' },
    { id: '2', username: 'user', password: 'user123', role: 'General User', name: 'General User' }
  ];

  private currentUser: User | null = null;

  login(username: string, password: string): Observable<User | null> {
    const user = this.users.find(u => u.username === username && u.password === password);
    if (user) {
      this.currentUser = user;
      return of(user).pipe(delay(1000)); // Simulate API delay
    }
    return of(null).pipe(delay(1000));
  }

  getCurrentUser(): User | null {
    return this.currentUser;
  }

  logout(): void {
    this.currentUser = null;
  }

  getAllUsers(): Observable<User[]> {
    return of(this.users).pipe(delay(1500)); // Simulate API delay
  }

  addUser(user: User): Observable<User> {
    const newUser = { ...user, id: (this.users.length + 1).toString() };
    this.users.push(newUser);
    return of(newUser).pipe(delay(1000));
  }
}