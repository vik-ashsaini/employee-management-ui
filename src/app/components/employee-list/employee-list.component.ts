import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeService } from '../../services/employee.service';
import { Router, RouterModule } from '@angular/router';
import { EmployeeModel } from '../../models/employee.model';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './employee-list.component.html'
})
export class EmployeeListComponent implements OnInit {

  constructor(
  private empService:EmployeeService,
  private router :Router){}

  employees: EmployeeModel[] = [];

  ngOnInit() {
    this.empService.getEmployees().subscribe(data => this.employees = data);
  }

  delete(id: number) {
    if (confirm('Are you sure to delete?')) {
      this.empService.delete(id).subscribe(() => this.empService.loadEmployees());
    }
  }

  edit(id: number) {
    this.router.navigate(['/edit', id]);
  }

  add() {
    this.router.navigate(['/add']);
  }
}