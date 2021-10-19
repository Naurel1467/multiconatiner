import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.css']
})
export class SuccessComponent implements OnInit {
  href!: string;
  constructor( public router:Router) { }

  ngOnInit(): void {
    this.href = this.router.url;
  }

}
