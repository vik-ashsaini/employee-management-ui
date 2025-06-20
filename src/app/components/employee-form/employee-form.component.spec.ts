import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EmployeeFormComponent } from './employee-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { EmployeeService } from '../../services/employee.service';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('EmployeeFormComponent', () => {
  let component: EmployeeFormComponent;
  let fixture: ComponentFixture<EmployeeFormComponent>;
  let mockService: any;

  beforeEach(() => {
    mockService = {
      getById: jasmine.createSpy().and.returnValue(of({ name: 'Jane', position: 'PM', salary: 7000 })),
      create: jasmine.createSpy().and.returnValue(of({})),
      update: jasmine.createSpy().and.returnValue(of({}))
    };

    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, RouterTestingModule],
      providers: [
        { provide: EmployeeService, useValue: mockService },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { paramMap: { get: () => null } }
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(EmployeeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create form with 3 controls', () => {
    expect(component.form.contains('name')).toBeTruthy();
    expect(component.form.contains('position')).toBeTruthy();
    expect(component.form.contains('salary')).toBeTruthy();
  });

  it('should validate required fields', () => {
    component.form.setValue({ name: '', position: '', salary: 0 });
    expect(component.form.valid).toBeFalsy();
  });

  it('should call create on submit if id is not set', () => {
    component.form.setValue({ name: 'A', position: 'Dev', salary: 5000 });
    component.submit();
    expect(mockService.create).toHaveBeenCalled();
  });
});
