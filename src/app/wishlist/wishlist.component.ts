import { Component, OnInit } from '@angular/core';
import { ICart } from '../Interfaces/cart-interface';
import { ICourse } from '../Interfaces/course-interface';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {

  wishlistCourses: ICourse[] = []; 
  cartCourses: ICourse[] =  [];
  cartValue: number = 0;
  constructor() { 
    //retreiving items present in the wishlist from the local storage
    var retreivedObject1 = localStorage.getItem('Wishlist'); 
    if(retreivedObject1 != null)
    {
      var wishlist = JSON.parse(retreivedObject1);
      this.wishlistCourses = wishlist;
    }
  
    //checking if there are any items already in cart
    var retreivedObject2 = localStorage.getItem('Cart');
    if(retreivedObject2 != null)
    {
      var cart = JSON.parse(retreivedObject2);
      this.cartCourses = cart.courseList;
      this.cartValue = cart.totalPrice;
    }
    console.log(this.cartCourses);
  }

  ngOnInit(): void {

      

      
  }

  addToCart(course :ICourse)
  {

        //checking if the item is not already present in cart
        var temp =  this.cartCourses.filter(item  => item.id == course.id); 
        if(temp.length == 0)
        {
           this.cartCourses.push(course);

           //adding actual price or discounted price to the total sum if exists
       
           if(course.discounted_price != null)
           {
             var sum = 0;
             sum = Number(course.discounted_price);
             this.cartValue = this.cartValue + sum;
           }
           else{
             var sum = 0;
             sum = Number(course.actual_price);
             this.cartValue = this.cartValue + sum;
           }
           var cart : ICart = {courseList : this.cartCourses, totalPrice : this.cartValue};
           localStorage.setItem('Cart', JSON.stringify(cart));
        }
  }

  removeItemFromWishlist(id: string)
  {
    this.wishlistCourses =  this.wishlistCourses.filter(item  => item.id != id);

    //updating our local storage   
    localStorage.setItem('Wishlist', JSON.stringify(this.wishlistCourses)); 
  }

  alreadyAddedToCart(course :ICourse) : boolean
  { 
    //checking if item is already added into the cart or not
    var temp =  this.cartCourses.filter(item  => item.id == course.id);
    if(temp.length == 0)
    {
      return false;
    }
    else
    return true;

  }
}
