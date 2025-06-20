import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { EmployeeModel } from '../models/employee.model';


@Injectable({ providedIn: 'root' })
export class EmployeeService {
  private apiUrl = 'http://localhost:5151/api/employees';
  private employees$ = new BehaviorSubject<EmployeeModel[]>([]);

  constructor(private http: HttpClient) {
    this.loadEmployees(); // load once on service init
  }

  getEmployees(): Observable<EmployeeModel[]> {
    return this.employees$.asObservable();
  }

  loadEmployees() {
    this.http.get<EmployeeModel[]>(this.apiUrl).subscribe(data => {
      this.employees$.next(data);
    });
  }

  getById(id: number) {
    return this.http.get<EmployeeModel>(`${this.apiUrl}/${id}`);
  }

  create(emp: EmployeeModel) {
    return this.http.post<EmployeeModel>(this.apiUrl, emp).pipe(
      tap(() => this.loadEmployees()) // ✅ auto-refresh after create
    );
  }

  update(id: number, emp: EmployeeModel) {
    return this.http.put(`${this.apiUrl}/${id}`, emp).pipe(
      tap(() => this.loadEmployees()) // ✅ auto-refresh after update
    );
  }

  delete(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`).pipe(
      tap(() => this.loadEmployees()) // ✅ auto-refresh after delete
    );
  }
}