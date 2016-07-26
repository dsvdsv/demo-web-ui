import {Request, XHRBackend, BrowserXhr, ResponseOptions} from "@angular/http";
import {Observable} from "rxjs/Observable";

export class AuthXHRBackend extends XHRBackend {

    constructor(browserXHR:BrowserXhr, baseResponseOptions:ResponseOptions) {
        super(browserXHR, baseResponseOptions);
    }

    createConnection(request:Request) {
        let xhrConnection = super.createConnection(request);
        xhrConnection.response = xhrConnection.response.catch((error:any) => {
            if (error.status === 401) {
                console.log('The authentication session expires. Force refresh of the current page.');

                localStorage.removeItem('token');
                window.location.href = window.location.href + '?' + new Date().getMilliseconds();
            }
            return Observable.throw(error);
        });
        return xhrConnection;
    }

}
