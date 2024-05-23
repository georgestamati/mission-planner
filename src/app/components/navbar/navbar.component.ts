import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit {
  title = '';

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map(() => this.route.snapshot.firstChild?.data)
      )
      .subscribe((data) => {
        this.title = data ? data['title'] : '';
      });
  }

  goToGithubPage() {
    window.location.href = 'https://github.com/georgestamati/mission-planner';
  }
}
