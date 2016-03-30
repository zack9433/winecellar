import {AuthenticationEndpoint} from "../../endpoints/AuthenticationEndpoint";
import {FormGroupTextbox} from "../../../common/components/form/form-group-textbox/form-group-textbox.component";
import {FormGroupPassword} from "../../../common/components/form/form-group-password/form-group-password.component";
import {FormGroupFooter} from "../../../common/components/form/form-group-footer/form-group-footer.component";
import {Panel} from "../../../common/components/panel/panel.component";

import {Component} from "angular2/core";
import {ControlGroup, Control, Validators} from "angular2/common";

@Component({
    selector: "login",
    directives: [FormGroupTextbox, FormGroupPassword, FormGroupFooter, Panel],
    styles: [require("./login.container.scss")],
    template: `
            <form [ngFormModel]="loginForm" class="form-horizontal" (ngSubmit)="onSubmit()">
                <form-group-textbox [label]="'Login (*)'" [control]="loginForm.controls['login']" [placeholder]="'Enter login'">
                </form-group-textbox>
                <form-group-password [label]="'Password (*)'" [control]="loginForm.controls['password']" [placeholder]="'Enter password'">
                </form-group-password>
                <form-group-footer>
                     <button type="submit" [disabled]="!loginForm.valid" class="btn btn-primary btn-block btn-lg">
                        <i class="fa fa-sign-in"></i>&nbsp;Sign in
                    </button>
                </form-group-footer>
            </form>
       `
})
export class Login {
    public loginForm: ControlGroup;

    constructor(private endpoint: AuthenticationEndpoint) {
        this.loginForm = new ControlGroup({
            "login": new Control("", Validators.required),
            "password": new Control("", Validators.required)
        });
    }

    public onSubmit(): void {
        this.endpoint.authenticate(this.loginForm.value);
    }
}