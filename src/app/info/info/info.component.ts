import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
  
export class InfoComponent implements OnInit {
  loginTime: string = '';
  logOutTime: Date | undefined;
  ngOnInit(): void {
    // Retrieve loginTime from localStorage
    this.loginTime = localStorage.getItem('loginTime') || '';
    this.logOutTime = new Date
  }
  
  

}
