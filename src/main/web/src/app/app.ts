 import {Component} from '@angular/core';
import {Router, RouteConfig, ROUTER_DIRECTIVES} from '@angular/router-deprecated';

import {LoggedInRouterOutlet} from "./logged-in-outlet";
import {Home} from './home/home';
import {Login} from './login/login';

@Component({
  selector: 'app',
  providers: [],
  pipes: [],
  directives: [LoggedInRouterOutlet],
  templateUrl: 'app/app.html'
})
@RouteConfig([
  { path: "/login", component: Login, as: "Login" },
  { path: '/home/...', component: Home, name: 'Home', useAsDefault: true}
])
export class App {

  constructor() {}

}
