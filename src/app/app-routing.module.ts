import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';

const appRoutes: Routes = [
    {path: '', redirectTo: '/home', pathMatch: 'full'},
    {path:'welcome', component:LoginComponent},
    {path:'welcome/:action', component:LoginComponent},
    {path:'login', component:LoginComponent},
    {path:'home', component:HomeComponent}
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
