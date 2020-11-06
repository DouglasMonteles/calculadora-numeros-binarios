import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-langing-page',
  templateUrl: './langing-page.component.html',
  styleUrls: ['./langing-page.component.css']
})
export class LangingPageComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  dashboard(): void {
    this.router.navigateByUrl('dashboard');
  }

}
