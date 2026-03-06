import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { HeaderComponent } from '../header/header';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.css',
  imports: [
    RouterOutlet,
    HeaderComponent
  ]
})
export class MainLayoutComponent {}