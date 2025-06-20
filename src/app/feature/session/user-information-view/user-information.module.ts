import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserInformationRoutingModule } from './user-information-routing.module';
import { FilterComponent } from './filter/filter.component';
import { SharedModule } from '../../../shared/shared.module';
import { CoreModule } from '../../../core/core.module';
import { SharedMaterialModule } from '../../../shared/share-material';
import { ViewUserInfoComponent } from './view-user-info/view-user-info.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [FilterComponent],
  imports: [
    CommonModule,
    UserInformationRoutingModule,
    CoreModule, SharedModule,
    SharedMaterialModule,ReactiveFormsModule
  ],
  exports: [FilterComponent],
  // Removed entryComponents as it is no longer needed in Angular 9+
})

export class UserInformationModule { }
