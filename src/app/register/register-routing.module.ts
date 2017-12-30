import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RegisterComponent } from './register.component';

const routes: Routes = [
    {
        path: 'register/oauth/:provider',
        component: RegisterComponent
    },
    {
        path: 'register',
        component: RegisterComponent
    },
];

@NgModule( {
    imports: [ RouterModule.forChild( routes ) ],
    exports: [ RouterModule ]
})
export class RegisterRoutingModule { }
