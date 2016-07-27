 import {Component} from '@angular/core';

 import {Payment} from './pages/payment/payment';
 import {Footer} from './components/footer/footer';
 import {TopNavBar} from './components/topnavbar/topnavbar';

 @Component({
   selector: 'app',
   templateUrl: 'app/app.html',
   providers: [],
   directives: [ Footer, TopNavBar, Payment],
   pipes: []
 })
export class App {

  constructor() {}

}
