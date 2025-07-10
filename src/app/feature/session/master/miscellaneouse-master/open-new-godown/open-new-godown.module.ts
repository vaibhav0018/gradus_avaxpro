import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OpenNewGodownRoutingModule } from './open-new-godown-routing.module';
import { GodwonMenuComponent } from './components/godwon-menu/godwon-menu.component';
import { AddGodwonComponent } from './components/add-godwon/add-godwon.component';
import { CoreModule } from '../../../../../core/core.module';
import { SharedModule } from '../../../../../shared/shared.module';
import { ViewGodwonComponent } from './components/view-godwon/view-godwon.component';
import { ModifyGodwonComponent } from './components/modify-godwon/modify-godwon.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [GodwonMenuComponent, AddGodwonComponent, ViewGodwonComponent, ModifyGodwonComponent],
  imports: [
    CommonModule,
    OpenNewGodownRoutingModule,
    CoreModule,
    SharedModule,
    ReactiveFormsModule,
  ]
})
export class OpenNewGodownModule { }
