import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { EmployeeModel } from '../models/employee.model';


@Injectable({ providedIn: 'root' })
export class EmployeeService {
  private apiUrl = 'http://localhost:5000/api/employees';
  private employees$ = new BehaviorSubject<EmployeeModel[]>([]);

  constructor(private http: HttpClient) {
    this.loadEmployees();
  }

  loadEmployees() {
    this.http.get<EmployeeModel[]>(this.apiUrl).subscribe(data => this.employees$.next(data));
  }

  getEmployees(): Observable<EmployeeModel[]> {
    return this.employees$.asObservable();
  }

  getById(id: number) {
    return this.http.get<EmployeeModel>(`${this.apiUrl}/${id}`);
  }

  create(emp: EmployeeModel) {
    return this.http.post<EmployeeModel>(this.apiUrl, emp);
  }

  update(id: number, emp: EmployeeModel) {
    return this.http.put(`${this.apiUrl}/${id}`, emp);
  }

  delete(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}