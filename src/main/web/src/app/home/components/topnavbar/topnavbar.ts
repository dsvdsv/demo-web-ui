import {Component} from '@angular/core';
import {Http} from '@angular/http';
import {Router} from '@angular/router-deprecated';
import {AuthService} from '../../../services/auth-service';

@Component({
  selector: 'top-nav-bar',
  templateUrl: 'app/home/components/topnavbar/topnavbar.html',
  providers: [],
  directives: [],
  pipes: []
})
export class TopNavBar {

  constructor(public router: Router, public auth: AuthService) {}

  onLogout() {
    this.auth.logout()
     .subscribe(
       () => this.router.navigate(['Login'])
     );
  }
}
