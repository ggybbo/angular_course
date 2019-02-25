import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { Subscription } from 'rxjs/Subscription';

import 'rxjs/Rx';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  myOwnObservable: Subscription;

  constructor() {}

  ngOnInit() {
    const myObservable = Observable.create((observer: Observer<string>) => {
      setTimeout(() => {
        observer.next('first package');
      }, 2000);
      setTimeout(() => {
        observer.next('Second package');
      }, 5000);
      setTimeout(() => {
        // observer.error('error package');
        observer.complete();
      }, 7000);
    });
    this.myOwnObservable = myObservable.subscribe(
      (data: string) => {
        console.log(data);
      },
      (error: string) => {
        console.error(error);
      },
      () => {
        console.log('completed');
      }
    );
  }
  ngOnDestroy() {
    this.myOwnObservable.unsubscribe();
  }
}
