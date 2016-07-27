import {Injectable} from '@angular/core';
import {Http, URLSearchParams, Response} from '@angular/http';
import { Observable }  from 'rxjs/Observable';
import {Field, Provider} from './models'
import 'rxjs/Rx';
// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/catch';

@Injectable()
export class PaymentService {
    constructor(private http: Http) {}

    private apiUrl = 'api/payment/providers';

    getProviders(): Observable<Provider[]> {
        return this.http.get(this.apiUrl)
            .map(res => res.json());
    }
}
