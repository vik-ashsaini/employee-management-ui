import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { EmployeeService } from '../../../services/employee.service';
import { Router, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatTableDataSource } from '@angular/material/table';
import { EmployeeModel } from '../../../models/employee.model';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule, MatPaginatorModule, MatSortModule,
    MatInputModule, MatFormFieldModule, MatButtonModule,
    MatIconModule, MatCardModule
  ],
  templateUrl: './employee-list.component.html'
})
export class EmployeeListComponent implements OnInit {

  constructor(
  private service:EmployeeService,
  private router :Router){}

  displayedColumns: string[] = ['name', 'position', 'salary', 'actions'];
  dataSource = new MatTableDataSource<EmployeeModel>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  employees:EmployeeModel[] | undefined;

  ngOnInit() {
    this.service.getEmployees().subscribe(data => {
      this.dataSource.data = data;
      this.employees=data;
    });
  }

  ngAfterViewInit() {
    // Safe to assign paginator and sort now
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.dataSource.filter = value.trim().toLowerCase();
  }

  delete(id: number) {
    if (confirm('Are you sure?')) {
      this.service.delete(id).subscribe(() => this.service.loadEmployees());
    }
  }

  edit(id: number) {
    this.router.navigate(['/edit', id]);
  }

  add() {
    this.router.navigate(['/add']);
  }

  duplicate(emp: EmployeeModel) {
    const data = {
      id:emp.id,
      name: emp.name,
      position: emp.position,
      salary: emp.salary
    };
    this.service.create(emp).subscribe(() => {
      this.service.loadEmployees(); // refresh the list
    });
  }
}
