import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { OAuthCallbackComponent } from './oauthcallback.component';

const routes: Routes = [
    {
        path: 'oauthcallback/:provider',
        component: OAuthCallbackComponent
    }
];

@NgModule( {
    imports: [ RouterModule.forChild( routes ) ],
    exports: [ RouterModule ]
})
export class OAuthCallbackRoutingModule { }
