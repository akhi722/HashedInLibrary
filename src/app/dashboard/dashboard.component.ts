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
  
  
  CourseList!: ICourse[];
  CartCourses: ICourse[] =  [];
  CartValue: number = 0;
  alert: string | undefined; 

  //varables for pagination
  currentPage: any = 1;
  totalRecords : any;
  constructor(private _dashboardService: DashboardService, private router: Router) { }
  

  
  //variable for using serach filter
  searchTerm!: string;
  ngOnInit(): void {


    //Retreiving the courses from the data source
    this._dashboardService.getAllCourses().subscribe(

      x => {
        this.CourseList = x;
        this.totalRecords = this.CourseList.length;
        console.log(this.CourseList[0].actual_price);
      },
      y => {
        console.log(y);
        this.alert = "Connection error..."

      },
      () => console.log("Successful retreival of courses")
    );
  }

  //Adding course list to the cart 
  addToCart(course :ICourse)
  {
      this.CartCourses.push(course);

      //adding actual price or discounted price to the total sum if exists
    
        if(course.discounted_price != null)
        {
          var sum = 0;
          sum = Number(course.discounted_price);
          this.CartValue = this.CartValue + sum;
        }
        else{
          var sum = 0;
          sum = Number(course.actual_price);
          this.CartValue = this.CartValue + sum;
        }
      
  }

  checkout()
  {
     this.router.navigateByUrl('/cart',{state : [ this.CartCourses, this.CartValue]});
  }


}
