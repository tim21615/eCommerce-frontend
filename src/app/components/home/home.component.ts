import { Component } from '@angular/core';
import { AuthServiceService } from 'src/app/service/auth-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  username: string = '';

  constructor(private authService: AuthServiceService) { }
  ngOnInit(): void {
    this.authService.getUser().subscribe(user => {
      this.username = user.name;
    })

  }

  logout() {
    this.authService.logout();
  }
}
