import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MakeMasterRoutingModule } from './components/make-master-routing.module';
import { MakeMasterMenuComponent } from './components/make-master-menu/make-master-menu.component';

import { SharedModule } from '../../../../../shared/shared.module';
// import { CoreModule } from 'src/app/core/core.module'
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ValidationDirective } from './components/make-master-menu/comman/validation.directive';
import { MakeMasterCompanyListComponent } from './components/make-master-company-list/make-master-company-list.component';



// ValidationDirective
@NgModule({
  declarations: [ MakeMasterMenuComponent,MakeMasterCompanyListComponent ],
  imports: [
    CommonModule,
    MakeMasterRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    ValidationDirective

    // MakeMasterRoutingModule,
    // CoreModule,
    // SharedModule,
    // ReactiveFormsModule,
    // FormsModule,
  ],
})
export class MakeMasterModule { }


