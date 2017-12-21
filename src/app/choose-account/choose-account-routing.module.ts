import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ChooseAccountComponent } from './choose-account.component';

const routes: Routes = [
    {
        path: 'choose-account',
        component: ChooseAccountComponent
    }
];

@NgModule( {
    imports: [ RouterModule.forChild( routes ) ],
    exports: [ RouterModule ]
})
export class ChooseAccountRoutingModule { }
