import {Component} from '@angular/core';
import {Http} from '@angular/http';
import {ROUTER_DIRECTIVES} from '@angular/router-deprecated';

@Component({
  selector: 'navigation',
  templateUrl: 'app/home/components/navigation/navigation.html',
  providers: [],
  directives: [ ROUTER_DIRECTIVES],
  pipes: []
})
export class Navigation {

  constructor() {}
}
