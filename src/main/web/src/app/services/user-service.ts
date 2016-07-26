import {Injectable} from '@angular/core';
import {Http, URLSearchParams, Response} from '@angular/http';
import { Observable }  from 'rxjs/Observable';
import {User} from './models'
import 'rxjs/Rx';
// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/catch';

@Injectable()
export class UserService {
  constructor(private http: Http) {}

  private apiUrl = 'api/';

  getUsers(): Observable<User[]> {
    return this.http.get(this.apiUrl + 'user')
                    .map(res => res.json());
  }
}
