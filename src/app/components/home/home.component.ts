import { Component } from '@angular/core';
import { GITHUB_URL } from '../../shared/constants';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  githubUrl = GITHUB_URL;
}
