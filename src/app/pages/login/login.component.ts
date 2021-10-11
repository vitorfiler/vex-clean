import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CommomService } from 'src/app/services/commom.service';
import { LoginService } from 'src/app/services/login.service';
import arrowBack from '@iconify/icons-ic/keyboard-backspace';
import icVisibility from '@iconify/icons-ic/twotone-visibility';
import icVisibilityOff from '@iconify/icons-ic/twotone-visibility-off';
import { Observable } from 'rxjs';
import { fadeInUp400ms } from 'src/@vex/animations/fade-in-up.animation';
import { stagger20ms } from 'src/@vex/animations/stagger.animation';

@Component({
  selector: 'vex-login-final',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
	animations: [
		fadeInUp400ms,
		stagger20ms
	]
})
export class LoginComponent implements OnInit {


  form: FormGroup;
  arrowBack = arrowBack;
  inputType = 'password';
  visible = false;
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
      localStorage.setItem("currentUser", JSON.stringify(response.nome))
      localStorage.setItem("token", response.body.token)
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
