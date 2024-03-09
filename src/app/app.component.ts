import { Component } from '@angular/core';
import { Event, Router, RouterEvent } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Shopping Center';
  showMemberSection = true;

  constructor(private router: Router) {
    this.router.events.pipe(
      filter((e: Event | RouterEvent): e is RouterEvent => e instanceof RouterEvent)
    ).subscribe(e => this.modifyHeader(e));
  }

  modifyHeader(location: RouterEvent): void {
    console.log(location.url)
    if (['/register', '/login'].includes(location.url)) {
      this.showMemberSection = false;
    } else {
      this.showMemberSection = true;
    }
  }
}
