import {Injectable} from '@angular/core';
import {Http, URLSearchParams, Response} from '@angular/http';
import { Observable }  from 'rxjs/Observable';
import {AmountState, GroupedActionCodes, PaymentState} from './models'
import 'rxjs/Rx';
// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/catch';


@Injectable()
export class StatisticService {
    constructor(private http: Http) {}

    private apiUrl = 'api/';

    getAmounts(): Observable<AmountState[]> {
        return this.http.get(this.apiUrl + 'stats/byAmount')
            .map(res => res.json());
    }

    getActionCodes(): Observable<GroupedActionCodes[]>{
        return this.http.get(this.apiUrl + 'stats/byActionCode')
            .map(res => res.json());
    }

    getPaymentState(): Observable<PaymentState[]>{
        return this.http.get(this.apiUrl + 'stats/byOrderState')
            .map(res => res.json());
    }
}