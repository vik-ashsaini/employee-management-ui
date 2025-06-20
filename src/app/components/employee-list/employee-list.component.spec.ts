import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EmployeeListComponent } from './employee-list.component';
import { EmployeeService } from '../../services/employee.service';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';

describe('EmployeeListComponent', () => {
  let component: EmployeeListComponent;
  let fixture: ComponentFixture<EmployeeListComponent>;
  let mockService: any;

  const mockEmployees = [
    { id: 1, name: 'Emp A', position: 'Dev', salary: 5000 },
    { id: 2, name: 'Emp B', position: 'QA', salary: 6000 },
  ];

  beforeEach(() => {
    mockService = {
      getEmployees: () => of(mockEmployees),
      delete: jasmine.createSpy('delete').and.returnValue(of({})),
      loadEmployees: jasmine.createSpy('loadEmployees')
    };

    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [],
      providers: [
        { provide: EmployeeService, useValue: mockService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(EmployeeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should display employees', () => {
    expect(component.employees?.length).toBe(2);
  });

  it('should delete an employee', () => {
    spyOn(window, 'confirm').and.returnValue(true);
    component.delete(1);
    expect(mockService.delete).toHaveBeenCalledWith(1);
    expect(mockService.loadEmployees).toHaveBeenCalled();
  });
});
