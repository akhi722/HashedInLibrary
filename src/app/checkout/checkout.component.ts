import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ICourse } from '../Interfaces/course-interface';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  CartCourses : ICourse[] = [];
  actualPrice : number = 0; 
  totalCartValue : number = 0;
  constructor(private router:Router, private activatedRoute:ActivatedRoute) { 

    //fetching and storing the data from the route  
    this.CartCourses = history.state[0]; 
    this.totalCartValue = history.state[1];
    //Calculating total amount that the customer saved  
    for(var val of this.CartCourses)
    {
        var sum = 0;
        sum = Number(val.actual_price);
        this.actualPrice += sum; 
      }
  }
  

  ngOnInit(): void {
    
  }

  removeItemFromCart(id: string)
  {
    var val  = this.CartCourses.filter(item  => item.id == id);
    var sum = 0;
    if(val[0].discounted_price != null)
    {
      sum = val[0].discounted_price;
    }
    else
    {
      sum = val[0].actual_price;
    }

    this.totalCartValue = this.totalCartValue - sum;
    this.actualPrice -= val[0].actual_price;
    this.CartCourses =  this.CartCourses.filter(item  => item.id != id);
  }

}
