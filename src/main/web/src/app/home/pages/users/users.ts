import {Component} from '@angular/core';
import {UserService} from '../../../services/user-service';
import {User} from '../../../services/models';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'users',
  templateUrl: 'app/home/pages/users/users.html',
  providers: [ UserService ],
  directives: [],
  pipes: []
})
export class Users {
  users: Observable<User[]>;
  errorMessage: string;

  constructor(private service: UserService) {}


  ngOnInit() {
    this.users = this.service.getUsers();
  }
}
