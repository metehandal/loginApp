import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, MenuController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  credentials: any;
  constructor(
    private authService: AuthService,
    private router: Router,
    private menuCtrl: MenuController,
    private formBuilder: FormBuilder,
    private alertCtrl: AlertController
  ) {}

  ngOnInit() {
    this.menuCtrl.enable(false);
    this.credentials = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  get username() {
    return this.credentials.get('username');
  }

  get password() {
    return this.credentials.get('password');
  }

  onSubmit() {
    this.authService.login(this.credentials.value).subscribe(
      (res) => {
        this.router.navigateByUrl('/tabs/tab1', { replaceUrl: true });
      },
      (err) => {
        console.log(err);
        this.showAlert();
      }
    );
  }

  showAlert() {
    let alert = this.alertCtrl.create({
      header: 'Login Failed',
      message: 'Wrong credentials',
      buttons: ['OK'],
    });
    alert.then((alert) => alert.present());
  }
}
