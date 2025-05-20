import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConstantsServiceAvaxPro } from '../../../core/services/constants_avaxpro.service';

export const MasterRoutingModule: Routes = [

    {
        path: '',        
        children: [
            {
                path: ConstantsServiceAvaxPro.ROUTE_MISCELLANEOS_MASTER,
                loadChildren: () => import('./miscellaneouse-master/miscellaneous-master-routing.module').then(m => m.MiscellaneousMasterRoutingModule),
                data: { breadcrumb: 'Miscellaneous Master' },
            },

        ]
    }
];

