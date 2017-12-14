import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';

const appRoutes: Routes = [
    {path: '', redirectTo: '/welcome', pathMatch: 'full'},
    {path:'welcome', component:LoginComponent},
    {path:'welcome/:action', component:LoginComponent},
    {path:'logout', component:LoginComponent}
];

@NgModule( {
    imports: [
        RouterModule.forRoot( appRoutes )
    ],
    declarations: [
        LoginComponent
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule { }
