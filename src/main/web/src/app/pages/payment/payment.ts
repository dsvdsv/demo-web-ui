import {Component, OnInit} from "@angular/core";
import {Http} from '@angular/http';

import {PaymentService} from '../../services/payment-service';
import {Field, Provider} from '../../services/models';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'payment',
  templateUrl: 'app/pages/payment/payment.html',
  styleUrls: ['app/pages/payment/payment.css'],
  providers: [ PaymentService ],
  directives: [],
  pipes: []
})
export class Payment implements OnInit{
  providers: Observable<Provider[]>;

  constructor(private service: PaymentService) {

  }

  ngOnInit() {
    this.providers = this.service.getProviders();
  }
}
