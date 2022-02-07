import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'src/app/services/notification.service';
import { LoginModuleService } from '../login-module.service';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.css'],
})
export class VerifyEmailComponent implements OnInit {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private loginModuleService: LoginModuleService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.verifyEmail();
  }

  verifyEmail() {
    const token = this.route.snapshot.paramMap.get('token');
    const data = {
      token: token,
    };
    this.loginModuleService.verifyEmail(token).subscribe(
      (response) => {
        if (response.statusCode == 201) {
          this.notificationService.createNotification(
            'success',
            'Success',
            response.message
          );
          this.router.navigate(['/login']);
        } else if (response.statusCode == 400) {
          this.notificationService.createNotification(
            'error',
            'Error',
            response.message
          );
          this.router.navigate(['/verify/' + token]);
        }
      },
      (error: any) => {
        console.log(error);
      }
    );
  }
}
