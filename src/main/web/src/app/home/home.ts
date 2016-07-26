import {Component} from '@angular/core';
import {Router, RouteConfig, ROUTER_DIRECTIVES} from '@angular/router-deprecated';

import {Dashboard} from './pages/dashboard/dashboard';
import {About} from './pages/about/about';
import {Users} from './pages/users/users';
import {AuthService} from '../services/auth-service';
import {Footer} from './components/footer/footer';
import {TopNavBar} from './components/topnavbar/topnavbar';
import {Navigation} from './components/navigation/navigation';

@Component({
  selector: 'home',
  templateUrl: 'app/home/home.html',
  providers: [],
  directives: [ ROUTER_DIRECTIVES, Footer, TopNavBar, Navigation ],
  pipes: []
})
@RouteConfig([
  { path: '/dashboard',  component: Dashboard,   name: 'Dashboard',  useAsDefault: true },
  { path: '/users',      component: Users,       name: 'Users' },
  { path: '/about',      component: About,       name: 'About' }
])
export class Home {

  constructor(public router: Router, public auth: AuthService) {}

  ngOnInit() {
  }

  onLogout() {
    this.auth.logout()
     .subscribe(
       () => this.router.navigate(['Login'])
     );
  }
}
