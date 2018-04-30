import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  whatTime: Observable<Date>;
  constructor() {
    this.whatTime = Observable.interval(1000).map(x => new Date()).share();
  }

  ngOnInit() {
  }

}
