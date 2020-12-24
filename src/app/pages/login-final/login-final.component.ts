import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CommomService } from 'src/app/services/commom.service';
import { LoginService } from 'src/app/services/login.service';
import { User } from 'src/app/_models/user';
import arrowBack from '@iconify/icons-ic/keyboard-backspace';
import icVisibility from '@iconify/icons-ic/twotone-visibility';
import icVisibilityOff from '@iconify/icons-ic/twotone-visibility-off';
import { Observable } from 'rxjs';

@Component({
  selector: 'vex-login-final',
  templateUrl: './login-final.component.html',
  styleUrls: ['./login-final.component.scss']
})
export class LoginFinalComponent implements OnInit {


  form: FormGroup;
  arrowBack = arrowBack;
  inputType = 'password';
  visible = false;
  user = new User();
  nomeUrl =  '';

  icVisibility = icVisibility;
  icVisibilityOff = icVisibilityOff;

  falhaLogin: boolean = false;
  consumo: any = [];

  constructor(private router: Router,
              private fb: FormBuilder,
              private cd: ChangeDetectorRef,
              private snackbar: MatSnackBar,
              private commomService: CommomService,
              private loginService: LoginService,
  ) {}

  login(){
    let username = this.form.get('email').value
    let password = this.form.get('password').value
    return this.loginService
        .login(username, password)
        .subscribe((response) => {
          // console.log(response.body.nomeUsuario);
          // console.log(response.body.tipoUsuario);
          // console.log(response.body.token);
          localStorage.setItem("currentUser", JSON.stringify(response.body.nomeUsuario))
          localStorage.setItem("token", JSON.stringify(response.body.token))
          localStorage.setItem("typeUser", JSON.stringify(response.body.tipoUsuario))
          this.router.navigate(['/']);
        })
}

ngOnInit(): void {
    this.form = this.fb.group({
        email: ["", [Validators.required]],
        password: ["", Validators.required],
    });
}

  toggleVisibility() {
    if (this.visible) {
      this.inputType = 'password';
      this.visible = false;
      this.cd.markForCheck();
    } else {
      this.inputType = 'text';
      this.visible = true;
      this.cd.markForCheck();
    }
  }

}
