import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ICart } from '../Interfaces/cart-interface';
import { ICourse } from '../Interfaces/course-interface';
import { DashboardService } from '../services/dashboard-service/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  
  
  courseList!: ICourse[];
  cartCourses: ICourse[] =  [];
  wishlistCourses : ICourse[] =  [];
  cartValue: number = 0;
  alert: string | undefined; 
  currentCourseDetail! : ICourse;
  //varables for pagination
  currentPage: any = 1;
  totalRecords : any;
  bannerMessage: string = '';
  constructor(private _dashboardService: DashboardService, private router: Router) { 
   
    
    //checking if there is anything already present in wishlist
    var retreivedObject1 = localStorage.getItem('Wishlist');
    if(retreivedObject1 != null)
    {
      var wishList = JSON.parse(retreivedObject1);
      this.wishlistCourses = wishList;
     
    }
     //checking if there is anything already in the cart
    var retreivedObject2 = localStorage.getItem('Cart');
    if(retreivedObject2 != null)
    {
      var cart = JSON.parse(retreivedObject2);
      this.cartCourses = cart.courseList;
      this.cartValue = cart.totalPrice;
    }
    
  }
  

  
  //variable for using serach filter
  searchTerm!: string;
  ngOnInit(): void {

    this.bannerMessage = "Discover Latest Courses";

    //Retreiving the courses from the data source
    this._dashboardService.getAllCourses().subscribe(

      x => {
        this.courseList = x;
        this.totalRecords = this.courseList.length;
        this.currentCourseDetail = this.courseList[0];
        console.log(this.courseList[0].actual_price);
      },
      y => {
        console.log(y);
        this.alert = "Connection error..."

      },
      () => console.log("Successful retreival of courses")
    );
  }

  //Adding course list to the cart and local storage
  addToCart(course :ICourse)
  {

        //checking if the course is not already present in the cart
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

  checkout()
  {
    //adding the items in the local storage of the browser 
    this.router.navigate(['/cart']);
  }


  addToWishlist(course :ICourse)
  {
    //checking if the item is not already present in the wishlist
    var temp =  this.wishlistCourses.filter(item  => item.id == course.id);
    if(temp.length == 0)
    {
      this.wishlistCourses.push(course);
      localStorage.setItem('Wishlist', JSON.stringify(this.wishlistCourses));
    }
    //show some alert
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

  alreadyAddedToWishlist(course :ICourse) : boolean
  { 
    //checking if item is already added into the wishlist or not
    var temp =  this.wishlistCourses.filter(item  => item.id == course.id);
    if(temp.length == 0)
    {
      return false;
    }
    else
    return true;

  }

  removeItemFromWishlist(course : ICourse)
  {
    this.wishlistCourses =  this.wishlistCourses.filter(item  => item.id != course.id);

    //updating our local storage   
    localStorage.setItem('Wishlist', JSON.stringify(this.wishlistCourses)); 
  }

  openNav(course : ICourse) {
    this.currentCourseDetail = course;

    //console.log(this.currentCourseDetail);
    document.getElementById("myNav")!.style.width = "100%";
  }

 closeNav() {
    document.getElementById("myNav")!.style.width = "0%";
 }
}
