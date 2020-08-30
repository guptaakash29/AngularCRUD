//import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
//import { Component, OnInit, Input, Output,EventEmitter } from '@angular/core';
import { Component, OnInit, Input, Output,EventEmitter } from '@angular/core';
import { Employee } from '../models/employee.model';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from './employee.service';

@Component({
  selector: 'app-display-employee',
  templateUrl: './display-employee.component.html',
  styleUrls: ['./display-employee.component.css']
})
//export class DisplayEmployeeComponent implements OnInit, OnChanges {
  export class DisplayEmployeeComponent implements OnInit {
  private _employee: Employee;
  selectedEmployeeId: number;
  confirmDelete = false;
  panelExpanded = true;
  // @Output()
  // notify: EventEmitter<Employee> = new EventEmitter<Employee>();
  @Output() notifyDelete: EventEmitter<number> = new EventEmitter<number>();
  @Input() searchTerm: string;
  @Input() 
  set employee(val: Employee){
    //console.log('Previous : ' + (this.employee? this.employee.name:'Null'));
    this._employee = val;
    //console.log('Current : ' + this.employee.name);
  }
  get employee(){
    return this._employee;
  }
  constructor(private _route: ActivatedRoute,
              private _router: Router,
              private _employeeService: EmployeeService) { }

  ngOnInit() {
    this.selectedEmployeeId = +this._route.snapshot.paramMap.get('id');
  }

  // handleClick(){
  //   this.notify.emit(this.employee);
  // }

  // ngOnChanges(changes: SimpleChanges){
  //   const previousEmployee = <Employee>changes.employee.previousValue;
  //   const currentEmployee = <Employee>changes.employee.currentValue;
  //   console.log('Previous : ' + (previousEmployee ? previousEmployee.name : 'Null'));
  //   console.log('Current : ' + currentEmployee.name);
  // }
  getNameAndGender(): string{
    return this.employee.name + ' ' + this.employee.gender;
  }

  viewEmployee(){
    this._router.navigate(['/employees', this.employee.id], {
      queryParams: {
        'name': this.employee.name,
        'searchString': this.searchTerm
      }
    });
  }

  editEmployee(){
    this._router.navigate(['/edit',this.employee.id]);
  }
  deleteEmployee(){
    this._employeeService.deleteEmployee(this.employee.id);
    this.notifyDelete.emit(this.employee.id);
  }
}
