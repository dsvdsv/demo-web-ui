import {Component, OnInit, OnDestroy} from "@angular/core";
import {Router} from "@angular/router-deprecated";
import {FORM_DIRECTIVES, FormBuilder, Validators, ControlGroup, NgIf} from "@angular/common";
import {AuthService} from "../services/auth-service";

interface LoginData {
    username:string;
    password:string;
}

@Component({
    selector: 'login',
    templateUrl: 'app/login/login.html',
    providers: [],
    directives: [FORM_DIRECTIVES, NgIf],
    pipes: []
})
export class Login implements OnInit, OnDestroy {
    form:ControlGroup;
    error:boolean = false;

    constructor(fb:FormBuilder, public router:Router, public auth:AuthService) {
        this.form = fb.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        })
    }

    onSubmit(data:LoginData) {
        this.auth.login(data.username, data.password)
            .subscribe(
                (res:boolean) => {
                    if (res) {
                        this.router.navigate(['Home']);
                    } else {
                        this.error = true;
                    }
                }
            )
    }

    ngOnInit() {
        document.body.classList.add('gray-bg');
    }

    ngOnDestroy() {
        document.body.classList.remove('gray-bg');
    }
}
