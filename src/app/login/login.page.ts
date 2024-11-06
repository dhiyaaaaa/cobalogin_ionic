import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../service/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  username: any;
  password: any;
  constructor(private authService: AuthenticationService, private router: Router) { }

  ngOnInit() {
  }

  login() {
    if (this.username != null && this.password != null) {
        const data = {
            username: this.username,
            password: this.password
        };
        console.log("Data yang dikirim:", data); // Tambahkan log untuk debugging
        this.authService.postMethod(data, 'login.php').subscribe({
            next: (res) => {
                if (res.status_login == "berhasil") {
                    this.authService.saveData(res.token, res.username);
                    this.router.navigateByUrl('/home');
                } else {
                    this.authService.notifikasi('Username atau Password Salah');
                }
            },
            error: (e) => {
                console.error('Error saat login:', e);
                this.authService.notifikasi('Login Gagal Periksa Koneksi Internet Anda');
            }
        });
    } else {
        this.authService.notifikasi('Username atau Password Tidak Boleh Kosong');
    }
}

}