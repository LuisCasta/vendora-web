import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'


@Component({
  selector:'app-dashboard-page',
  standalone:true,
  imports:[CommonModule, RouterModule],
  templateUrl:'./dashboard-page.html',
  styleUrl:'./dashboard-page.css'
})
export class DashboardPageComponent {}