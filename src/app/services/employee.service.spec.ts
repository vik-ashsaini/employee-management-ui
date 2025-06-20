import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { EmployeeService } from './employee.service';
import { EmployeeModel } from '../models/employee.model';

describe('EmployeeService', () => {
  let service: EmployeeService;
  let http: HttpTestingController;

  const mockEmployees: EmployeeModel[] = [
    { id: 1, name: 'Test A', position: 'Dev', salary: 5000 },
    { id: 2, name: 'Test B', position: 'QA', salary: 6000 },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [EmployeeService]
    });

    service = TestBed.inject(EmployeeService);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    http.verify();
  });

  it('should fetch employees from API', () => {
    service.loadEmployees();

    const req = http.expectOne('http://localhost:5000/api/employees');
    expect(req.request.method).toBe('GET');
    req.flush(mockEmployees);

    service.getEmployees().subscribe(data => {
      expect(data.length).toBe(2);
      expect(data[0].name).toBe('Test A');
    });
  });

  it('should create an employee', () => {
    const newEmp: EmployeeModel = { id: 3, name: 'New', position: 'PM', salary: 8000 };
    service.create(newEmp).subscribe();

    const req = http.expectOne('http://localhost:5000/api/employees');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newEmp);
    req.flush(newEmp);
  });

  it('should delete an employee', () => {
    service.delete(1).subscribe();

    const req = http.expectOne('http://localhost:5000/api/employees/1');
    expect(req.request.method).toBe('DELETE');
    req.flush({});
  });
});
