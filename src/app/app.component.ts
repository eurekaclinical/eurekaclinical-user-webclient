import { Component, OnInit, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ConfigurationService } from './config.service'

@Component( {
    selector: 'my-app',
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit, OnDestroy {

    displayModal: boolean;

    displayConfirmationModal: boolean;

    authenticated: boolean;

    public constructor(
        private titleService: Title,
        private router: Router,
        private configService: ConfigurationService
    ) { 
        let tmp = this.configService.appProperties;
    }

    ngOnInit() {
        this.titleService.setTitle( 'Eureka! Clinical User Portal' );
    }

    ngOnDestroy() {
    }

}
