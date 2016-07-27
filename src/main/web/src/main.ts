import {bootstrap} from "@angular/platform-browser-dynamic";
import {enableProdMode} from "@angular/core";
import {HTTP_PROVIDERS} from "@angular/http";
import {App} from "./app/app";


if (webpack.ENV === 'production') {
    enableProdMode();
}

bootstrap(App, [
    HTTP_PROVIDERS
])
    .catch(err => console.error(err));
