import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import { Router } from '@angular/router';
import { FormDialogComponent } from '../form-dialog/form-dialog.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  href!: string;

  constructor(private dialog: MatDialog, public router:Router) { }

  ngOnInit(): void {
    this.href = this.router.url;
  }
  openDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    this.dialog.open(FormDialogComponent, dialogConfig);
  }

}
