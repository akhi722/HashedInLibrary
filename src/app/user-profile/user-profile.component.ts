import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  bannerMessage : string ='';
  constructor() { 
    
  }

  ngOnInit(): void {
    this.bannerMessage = "Your profile"
  }

}
