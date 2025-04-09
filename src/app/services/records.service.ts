import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { Record } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class RecordsService {
  private records: Record[] = [
    { id: '1', title: 'Record 1', description: 'Description 1', userId: '1', createdAt: new Date() },
    { id: '2', title: 'Record 2', description: 'Description 2', userId: '2', createdAt: new Date() },
    { id: '3', title: 'Record 3', description: 'Description 3', userId: '1', createdAt: new Date() }
  ];

  getRecords(userId: string, delayMs: number = 1000): Observable<Record[]> {
    const userRecords = this.records.filter(r => r.userId === userId);
    return of(userRecords).pipe(delay(delayMs));
  }

  getAllRecords(delayMs: number = 1000): Observable<Record[]> {
    return of(this.records).pipe(delay(delayMs));
  }
}