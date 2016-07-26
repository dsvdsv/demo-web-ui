import {LocationStrategy, HashLocationStrategy} from '@angular/common';
import {bootstrap} from '@angular/platform-browser-dynamic';
import {provide, enableProdMode} from '@angular/core';
import {Provider} from '@angular/core';
import {HTTP_PROVIDERS} from '@angular/http';
import {ROUTER_PROVIDERS} from '@angular/router-deprecated';
import {Http, ConnectionBackend, Request, RequestOptions, XHRBackend, BrowserXhr, ResponseOptions, BaseRequestOptions} from '@angular/http';

import {AuthService} from './app/services/auth-service';

if (webpack.ENV === 'production') {
  enableProdMode();
}
import {AuthXHRBackend} from './app/auth-xhr-backend';
import {App} from './app/app';

bootstrap(App, [
  ROUTER_PROVIDERS,
  HTTP_PROVIDERS,
  new Provider(XHRBackend, { useClass: AuthXHRBackend }),
  provide(LocationStrategy, {useClass: HashLocationStrategy}),
  AuthService
])
.catch(err => console.error(err));
