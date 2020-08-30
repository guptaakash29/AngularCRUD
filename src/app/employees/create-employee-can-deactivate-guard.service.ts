import { CanDeactivate } from '@angular/router';
import { CreateEmployeesComponent } from './create-employees.component';
import { Injectable } from '@angular/core';

@Injectable()
export class CreateEmployeeCanDeactivateGuardService implements CanDeactivate<CreateEmployeesComponent>{
    canDeactivate(component: CreateEmployeesComponent): boolean {
        if(component.createEmployeeForm.dirty){
            return confirm('Are you sure you want to discard your changes?')
        }
        return true;
    }
}