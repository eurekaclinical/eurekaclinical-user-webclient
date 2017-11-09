import { Component, OnInit, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

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
        private router: Router
    ) { }

    ngOnInit() {

        this.titleService.setTitle( 'Euerka! Clinical User Web Client' );

    }

    ngOnDestroy() {
    }

}
