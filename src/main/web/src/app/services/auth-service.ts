import {Injectable} from '@angular/core';
import {Http, URLSearchParams, Response, Headers} from '@angular/http';
import {Observable}     from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()
export class AuthService {
    token:string;

    constructor(private http:Http) {
        this.token = localStorage.getItem('token');
    }

    login(username:string, password:string):Observable<boolean> {
        const creds = "username=" + username + "&password=" + password;
        return this.http.post('api/login', creds, {
            headers: new Headers({
                'Content-Type': 'application/x-www-form-urlencoded'
            })
        })
            .map((res:Response) => {
                this.token = 'token';
                localStorage.setItem('token', this.token);
                return Observable.of(true);
            })
            .catch((error:any) => {
                return Observable.of(false);
            })

    }

    logout():Observable<boolean> {
        return this.http.get('api/logout')
            .map((res:Response) => {
                this.token = undefined;
                localStorage.removeItem('token');
                return Observable.of(true);
            })
            .catch((error:any) => {
                return Observable.of(false);
            })
    }
}
