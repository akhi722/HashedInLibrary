import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ICart } from '../Interfaces/cart-interface';
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

    var retreivedObject = localStorage.getItem('Cart');
    if(retreivedObject != null)
    {
      var cart = JSON.parse(retreivedObject);
      this.CartCourses = cart.courseList;
      this.totalCartValue = cart.totalPrice;
    }
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
    
    //resetting the total value of the cart 
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

    //resetting the discount value of the cart
    this.actualPrice -= val[0].actual_price;
    //Removing the course by its Id
    this.CartCourses =  this.CartCourses.filter(item  => item.id != id);

    //updating our local storage
    var cart : ICart = {courseList : this.CartCourses, totalPrice : this.totalCartValue};   
    localStorage.setItem('Cart', JSON.stringify(cart)); 
  }

}
