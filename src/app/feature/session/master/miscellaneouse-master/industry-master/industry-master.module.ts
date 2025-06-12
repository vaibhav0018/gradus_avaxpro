import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IndustryMasterRoutingModule } from './industry-master-routing.module';
import { IndustryMasterMenuComponent } from './components/industry-master-menu/industry-master-menu.component';
import { CoreModule } from '../../../../../core/core.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../../../../shared/shared.module';

@NgModule({
  declarations: [IndustryMasterMenuComponent],
  imports: [
    CommonModule,
    IndustryMasterRoutingModule,
    CoreModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class IndustryMasterModule { }
