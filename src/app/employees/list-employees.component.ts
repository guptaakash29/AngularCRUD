import { Component, OnInit } from '@angular/core';
// import Employee Model
import { Employee } from '../models/employee.model';
import { EmployeeService } from './employee.service';
import { Router, ActivatedRoute } from '@angular/router';
import { EmployeeListResolverService } from './employee-list-resolver.service';

@Component({
  templateUrl: './list-employees.component.html',
  styleUrls: ['./list-employees.component.css']
})
export class ListEmployeesComponent implements OnInit {
  //dataFromChild: Employee;
  employees: Employee[];
  employeeList: Employee[];
  employeeToDisplay: Employee;
  filteredEmployees: Employee[];
  private _searchTerm: string;
  public get searchTerm(): string {
    return this._searchTerm;
  }
  public set searchTerm(value: string) {
    this._searchTerm = value;
    this.filteredEmployees = this.FilteredEmployees(value);
  }
  private arrayIndex = 1;
  constructor(//private _employeeService: EmployeeService,
    private _router: Router,
    private _route: ActivatedRoute) {
    this.employees = this._route.snapshot.data["employeeList"];
    if (this._route.snapshot.queryParamMap.has("searchString")) {
      this.searchTerm = this._route.snapshot.queryParamMap.get("searchString");
    }
    else {
      this.filteredEmployees = this.employees;
    }
  }

  ngOnInit() {
    // this._employeeService.getEmployees().subscribe((empList) => {
    //   this.employees = empList;
    //   this._route.queryParamMap.subscribe((queryParams) => {
    //     if (queryParams.has("searchString")) {
    //       this.searchTerm = queryParams.get("searchString");
    //     }
    //     else {
    //       this.filteredEmployees = this.employees;
    //     }
    //   });
    // }
    // );
    this.employeeToDisplay = this.employees[0];

    ///Snapshot method
    // if (this._route.snapshot.queryParamMap.has('searchString')){
    //   this.searchTerm = this._route.snapshot.queryParamMap.get('searchString');
    //   //this.filteredEmployees = this.FilteredEmployees(this.searchTerm);
    // } else{
    //   this.filteredEmployees = this.employees;
    // }

    ///Subscribe method


  }

  // onClick(employeeId: number) {
  //   this._router.navigate(['/employees', employeeId], {
  //     queryParams: {
  //       'name': this.employeeToDisplay.name,
  //       'searchString': this.searchTerm
  //     }
  //   });
  // }

  FilteredEmployees(searchString: string): Employee[] {
    return this.employees.filter(employee =>
      employee.name.toLowerCase().indexOf(searchString.toLowerCase()) !== -1);
  }

  // changeEmployeeName() {
  //   this.employees[0].name = 'Jordan';
  //   this.filteredEmployees = this.employees;//this.FilteredEmployees(this.searchTerm);
  // }

  // handleNotify(eventData: Employee){
  //   this.dataFromChild = eventData;
  // }
  // nextEmployee(){
  //   if(this.arrayIndex<=2){
  //     this.employeeToDisplay = this.employees[this.arrayIndex];
  //     this.arrayIndex++;
  //   }
  //   else{
  //     this.employeeToDisplay = this.employees[0];
  //     this.arrayIndex = 1;
  //   }
  // }

  onDeleteNotification(id: number){
    const i = this.filteredEmployees.findIndex(e => e.id === id);
        if(i !== -1){
            this.filteredEmployees.splice(i,1);
        }
  }
}